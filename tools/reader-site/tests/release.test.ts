// Release-gate tests: the artifact must be content-addressed, the operator approval
// record must match it exactly, and the build workflow must have no way to deploy.
import assert from "node:assert/strict";
import { test } from "node:test";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  buildArtifact,
  buildArtifactManifest,
  artifactManifestHash,
  serializeArtifactManifest,
} from "../scripts/build-artifact.ts";
import { verifyApproval } from "../scripts/verify-approval.ts";

const here = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(here, "../../..");

function tempDir(): string {
  return fs.mkdtempSync(path.join(os.tmpdir(), "butt-lab-artifact-"));
}

function writeFile(root: string, relative: string, contents: string): void {
  const target = path.join(root, relative);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, contents);
}

function makeArtifact(): { root: string; manifest: ReturnType<typeof buildArtifactManifest> } {
  const root = tempDir();
  writeFile(root, "site/index.html", "<!doctype html><title>Butt Lab</title>");
  writeFile(root, "site/methods/index.html", "<!doctype html><title>Methods</title>");
  writeFile(root, "bundle-manifest.json", JSON.stringify({ publicationVersion: "batch-02-pilot" }));
  const manifest = buildArtifactManifest(root, {
    publicationVersion: "batch-02-pilot",
    sourceCommit: "abc123",
  });
  // A real artifact carries its own manifest, so a reader can see what was approved.
  writeFile(root, "artifact-manifest.json", serializeArtifactManifest(manifest));
  return { root, manifest };
}

const request = {
  approvedCommit: "abc123",
  publicationVersion: "batch-02-pilot",
  buildRunId: "42",
  artifactSha256: "",
};

test("the artifact manifest lists every file with its hash, sorted by path", () => {
  const { manifest } = makeArtifact();
  assert.deepEqual(
    manifest.files.map((file) => file.path),
    ["bundle-manifest.json", "site/index.html", "site/methods/index.html"],
  );
  for (const file of manifest.files) {
    assert.match(file.sha256, /^[0-9a-f]{64}$/);
  }
  assert.equal(manifest.publicationVersion, "batch-02-pilot");
  assert.equal(manifest.sourceCommit, "abc123");
});

test("the artifact hash is stable for the same content and changes when a file changes", () => {
  const { root, manifest } = makeArtifact();
  const first = artifactManifestHash(manifest);
  assert.equal(first, artifactManifestHash(buildArtifactManifest(root, {
    publicationVersion: "batch-02-pilot",
    sourceCommit: "abc123",
  })));
  writeFile(root, "site/index.html", "<!doctype html><title>Changed</title>");
  const second = artifactManifestHash(buildArtifactManifest(root, {
    publicationVersion: "batch-02-pilot",
    sourceCommit: "abc123",
  }));
  assert.notEqual(first, second);
});

test("buildArtifact copies the site and the bundle manifest into the artifact directory", () => {
  const source = tempDir();
  writeFile(source, "dist/index.html", "<!doctype html>");
  writeFile(source, "dist/methods/index.html", "<!doctype html>");
  writeFile(source, "bundle-manifest.json", "{}");
  const target = tempDir();
  buildArtifact(source, target, { publicationVersion: "batch-02-pilot", sourceCommit: "abc123" });
  assert.ok(fs.existsSync(path.join(target, "site/index.html")));
  assert.ok(fs.existsSync(path.join(target, "site/methods/index.html")));
  assert.ok(fs.existsSync(path.join(target, "bundle-manifest.json")));
  assert.ok(fs.existsSync(path.join(target, "artifact-manifest.json")));
});

test("a matching approval is accepted", () => {
  const { root, manifest } = makeArtifact();
  const approval = {
    approvedCommit: "abc123",
    publicationVersion: "batch-02-pilot",
    buildRunId: "42",
    artifactSha256: artifactManifestHash(manifest),
    approvedBy: "operator",
    approvedOn: "2026-11-17",
  };
  const result = verifyApproval({
    approval,
    request: { ...request, artifactSha256: approval.artifactSha256 },
    artifactRoot: root,
    manifest: { publicationVersion: "batch-02-pilot" },
  });
  assert.deepEqual(result.problems, []);
  assert.equal(result.ok, true);
});

test("a missing approval record is refused", () => {
  const { root, manifest } = makeArtifact();
  const result = verifyApproval({
    approval: undefined,
    request: { ...request, artifactSha256: artifactManifestHash(manifest) },
    artifactRoot: root,
    manifest: { publicationVersion: "batch-02-pilot" },
  });
  assert.equal(result.ok, false);
  assert.ok(result.problems.some((problem) => problem.includes("APPROVAL_RECORD_MISSING")));
});

test("an approval for a different commit is refused", () => {
  const { root, manifest } = makeArtifact();
  const hash = artifactManifestHash(manifest);
  const result = verifyApproval({
    approval: {
      approvedCommit: "different",
      publicationVersion: "batch-02-pilot",
      buildRunId: "42",
      artifactSha256: hash,
      approvedBy: "operator",
      approvedOn: "2026-11-17",
    },
    request: { ...request, artifactSha256: hash },
    artifactRoot: root,
    manifest: { publicationVersion: "batch-02-pilot" },
  });
  assert.equal(result.ok, false);
  assert.ok(result.problems.some((problem) => problem.includes("APPROVAL_COMMIT_MISMATCH")));
});

test("an approval for a different publication version is refused", () => {
  const { root, manifest } = makeArtifact();
  const hash = artifactManifestHash(manifest);
  const result = verifyApproval({
    approval: {
      approvedCommit: "abc123",
      publicationVersion: "batch-01",
      buildRunId: "42",
      artifactSha256: hash,
      approvedBy: "operator",
      approvedOn: "2026-11-17",
    },
    request: { ...request, publicationVersion: "batch-01", artifactSha256: hash },
    artifactRoot: root,
    manifest: { publicationVersion: "batch-02-pilot" },
  });
  assert.equal(result.ok, false);
  assert.ok(result.problems.some((problem) => problem.includes("APPROVAL_VERSION_MISMATCH")));
});

test("an approval for a different build run is refused", () => {
  const { root, manifest } = makeArtifact();
  const hash = artifactManifestHash(manifest);
  const result = verifyApproval({
    approval: {
      approvedCommit: "abc123",
      publicationVersion: "batch-02-pilot",
      buildRunId: "99",
      artifactSha256: hash,
      approvedBy: "operator",
      approvedOn: "2026-11-17",
    },
    request: { ...request, artifactSha256: hash },
    artifactRoot: root,
    manifest: { publicationVersion: "batch-02-pilot" },
  });
  assert.equal(result.ok, false);
  assert.ok(result.problems.some((problem) => problem.includes("APPROVAL_BUILD_RUN_MISMATCH")));
});

test("an approval for a different artifact hash is refused", () => {
  const { root, manifest } = makeArtifact();
  const hash = artifactManifestHash(manifest);
  const result = verifyApproval({
    approval: {
      approvedCommit: "abc123",
      publicationVersion: "batch-02-pilot",
      buildRunId: "42",
      artifactSha256: "0".repeat(64),
      approvedBy: "operator",
      approvedOn: "2026-11-17",
    },
    request: { ...request, artifactSha256: hash },
    artifactRoot: root,
    manifest: { publicationVersion: "batch-02-pilot" },
  });
  assert.equal(result.ok, false);
  assert.ok(result.problems.some((problem) => problem.includes("APPROVAL_ARTIFACT_MISMATCH")));
});

test("an approval record with no person behind it is refused", () => {
  const { root, manifest } = makeArtifact();
  const hash = artifactManifestHash(manifest);
  const result = verifyApproval({
    approval: {
      approvedCommit: "abc123",
      publicationVersion: "batch-02-pilot",
      buildRunId: "42",
      artifactSha256: hash,
      approvedBy: "",
      approvedOn: "",
    },
    request: { ...request, artifactSha256: hash },
    artifactRoot: root,
    manifest: { publicationVersion: "batch-02-pilot" },
  });
  assert.equal(result.ok, false);
  assert.ok(result.problems.some((problem) => problem.includes("APPROVAL_RECORD_INCOMPLETE")));
});

test("a file changed inside the artifact after the approval is refused", () => {
  const { root, manifest } = makeArtifact();
  const hash = artifactManifestHash(manifest);
  writeFile(root, "site/index.html", "<!doctype html><title>Swapped after approval</title>");
  const result = verifyApproval({
    approval: {
      approvedCommit: "abc123",
      publicationVersion: "batch-02-pilot",
      buildRunId: "42",
      artifactSha256: hash,
      approvedBy: "operator",
      approvedOn: "2026-11-17",
    },
    request: { ...request, artifactSha256: hash },
    artifactRoot: root,
    manifest: { publicationVersion: "batch-02-pilot" },
  });
  assert.equal(result.ok, false);
  assert.ok(result.problems.some((problem) => problem.includes("APPROVAL_ARTIFACT_FILE_MISMATCH")));
});

test("an extra file smuggled into the artifact is refused", () => {
  const { root, manifest } = makeArtifact();
  const hash = artifactManifestHash(manifest);
  writeFile(root, "site/extra.html", "<!doctype html><title>Not in the manifest</title>");
  const result = verifyApproval({
    approval: {
      approvedCommit: "abc123",
      publicationVersion: "batch-02-pilot",
      buildRunId: "42",
      artifactSha256: hash,
      approvedBy: "operator",
      approvedOn: "2026-11-17",
    },
    request: { ...request, artifactSha256: hash },
    artifactRoot: root,
    manifest: { publicationVersion: "batch-02-pilot" },
  });
  assert.equal(result.ok, false);
  assert.ok(result.problems.some((problem) => problem.includes("APPROVAL_ARTIFACT_EXTRA_FILE")));
});

test("the build workflow cannot deploy anything", () => {
  const workflow = fs.readFileSync(path.join(repoRoot, ".github/workflows/build.yml"), "utf8");
  assert.equal(/wrangler\s+deploy/i.test(workflow), false);
  assert.equal(/cloudflare/i.test(workflow), false);
  assert.equal(/^\s*deploy:/m.test(workflow), false);
  assert.equal(/secrets\./.test(workflow), false);
});

test("the deploy workflow is manual only and verifies the approval before deploying", () => {
  const workflow = fs.readFileSync(path.join(repoRoot, ".github/workflows/deploy.yml"), "utf8");
  assert.match(workflow, /workflow_dispatch:/);
  assert.equal(/^\s*push:/m.test(workflow), false);
  assert.equal(/^\s*pull_request:/m.test(workflow), false);
  const verifyAt = workflow.indexOf("verify-approval");
  const deployAt = workflow.search(/wrangler\s+deploy/i);
  assert.ok(verifyAt > -1, "the deploy workflow must run the approval verification");
  assert.ok(deployAt > -1, "the deploy workflow must contain the deploy command");
  assert.ok(verifyAt < deployAt, "the approval must be verified before the deploy command runs");
});
