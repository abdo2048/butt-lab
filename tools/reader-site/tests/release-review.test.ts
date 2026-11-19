/**
 * Regression tests for the final whole-branch review findings.
 *
 * Every test here was written BEFORE the fix it pins and was watched fail.
 * The findings came from a fresh-context review of the whole branch; the
 * ledger rows in docs/BUILD-PLAN.md §8 record them.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { scanBuiltOutput } from "../scripts/release-audit.ts";
import { verifyApproval } from "../scripts/verify-approval.ts";
import {
  buildArtifact,
  artifactManifestHash,
  readArtifactManifest,
} from "../scripts/build-artifact.ts";
import {
  buildDeploymentRequest,
  validateDeployInputs,
} from "../scripts/deployment-request.ts";
import { renderMarkdown } from "../src/lib/markdown.ts";

const here = dirname(fileURLToPath(import.meta.url));
const siteRoot = resolve(here, "..");
const repoRoot = resolve(siteRoot, "..", "..");
const dist = join(siteRoot, "dist");
const deployWorkflow = join(repoRoot, ".github", "workflows", "deploy.yml");

function tempDir(t: { after: (fn: () => void) => void }): string {
  const dir = mkdtempSync(join(process.env.TEMP ?? ".", "butt-lab-review-"));
  t.after(() => rmSync(dir, { recursive: true, force: true }));
  return dir;
}

function write(dir: string, relative: string, contents: string): void {
  const target = join(dir, relative);
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, contents);
}

function codes(findings: readonly { code: string }[]): string[] {
  return findings.map((finding) => finding.code);
}

/* ------------------------------------------------------------------ *
 * Finding 1 (Critical): workflow_dispatch input injection.
 * ------------------------------------------------------------------ */

test("the deploy workflow never interpolates a workflow input into a shell body", () => {
  const yaml = readFileSync(deployWorkflow, "utf8");
  const runLines = yaml
    .split("\n")
    .filter((line) => /^\s*run:/.test(line))
    .join("\n");
  assert.doesNotMatch(runLines, /\$\{\{/, "a run: body interpolates a workflow input");
  assert.doesNotMatch(yaml, /<<'?EOF'/, "the workflow writes a file with a heredoc");
  assert.match(
    yaml,
    /run:\s*node scripts\/deployment-request\.ts/,
    "the deployment request must be written by the structured writer",
  );
});

test("the deploy workflow passes the workflow inputs to the writer through env", () => {
  const yaml = readFileSync(deployWorkflow, "utf8");
  for (const key of ["APPROVED_COMMIT", "PUBLICATION_VERSION", "BUILD_RUN_ID", "ARTIFACT_SHA256"]) {
    assert.match(yaml, new RegExp(`${key}:\\s*\\$\\{\\{\\s*inputs\\.`), `${key} is not passed through env:`);
  }
});

test("the deploy workflow may read actions so it can download the approved artifact", () => {
  const yaml = readFileSync(deployWorkflow, "utf8");
  assert.match(yaml, /actions:\s*read/, "the workflow cannot download a cross-run artifact");
});

/* ------------------------------------------------------------------ *
 * Finding 1 support: the structured request writer.
 * ------------------------------------------------------------------ */

test("the deployment request writer accepts a well formed set of inputs", () => {
  const problems = validateDeployInputs({
    approvedCommit: "65d429f",
    publicationVersion: "batch-02-pilot",
    buildRunId: "1234567890",
    artifactSha256: "a".repeat(64),
  });
  assert.deepEqual(problems, []);
});

test("the deployment request writer rejects a shell injection attempt", () => {
  const problems = validateDeployInputs({
    approvedCommit: "abc1234\nEOF\nrm -rf /",
    publicationVersion: "batch-02-pilot",
    buildRunId: "123",
    artifactSha256: "a".repeat(64),
  });
  assert.ok(problems.length > 0, "an injected commit was accepted");
});

test("the deployment request writer rejects malformed identifiers", () => {
  const cases = [
    { approvedCommit: "ABCDEF1" },
    { approvedCommit: "abc" },
    { publicationVersion: "Batch 02!" },
    { buildRunId: "12; rm -rf /" },
    { artifactSha256: "abc" },
  ];
  for (const partial of cases) {
    const problems = validateDeployInputs({
      approvedCommit: "65d429f",
      publicationVersion: "batch-02-pilot",
      buildRunId: "123",
      artifactSha256: "a".repeat(64),
      ...partial,
    });
    assert.ok(problems.length > 0, `accepted a malformed value: ${JSON.stringify(partial)}`);
  }
});

test("the deployment request writer refuses to build a request from bad inputs", () => {
  const built = buildDeploymentRequest({
    approvedCommit: 'abc1234"; echo pwned; #',
    publicationVersion: "batch-02-pilot",
    buildRunId: "123",
    artifactSha256: "a".repeat(64),
  });
  assert.equal(built.request, undefined);
  assert.ok(built.problems.length > 0);
});

test("the deployment request writer builds a request from good inputs", () => {
  const built = buildDeploymentRequest({
    approvedCommit: "65d429f",
    publicationVersion: "batch-02-pilot",
    buildRunId: "123",
    artifactSha256: "a".repeat(64),
  });
  assert.deepEqual(built.problems, []);
  assert.deepEqual(built.request, {
    approvedCommit: "65d429f",
    publicationVersion: "batch-02-pilot",
    buildRunId: "123",
    artifactSha256: "a".repeat(64),
  });
});

/* ------------------------------------------------------------------ *
 * Finding 2 (Important): the artifact must be bound to the approved commit.
 * ------------------------------------------------------------------ */

function makeArtifact(
  t: { after: (fn: () => void) => void },
  metadata: { publicationVersion: string; sourceCommit: string },
): { root: string; sha256: string } {
  const base = tempDir(t);
  const source = join(base, "source");
  mkdirSync(join(source, "dist"), { recursive: true });
  writeFileSync(join(source, "dist", "index.html"), "<!doctype html><title>x</title>\n");
  writeFileSync(join(source, "bundle-manifest.json"), '{"files":[]}\n');
  const root = join(base, "artifact");
  buildArtifact(source, root, metadata);
  return { root, sha256: artifactManifestHash(readArtifactManifest(root)) };
}

test("the verifier refuses an artifact built from a different commit", (t) => {
  const approvedCommit = "a".repeat(40);
  const artifact = makeArtifact(t, {
    publicationVersion: "batch-02-pilot",
    sourceCommit: "b".repeat(40),
  });
  const result = verifyApproval({
    approval: {
      approvedCommit,
      publicationVersion: "batch-02-pilot",
      buildRunId: "123",
      artifactSha256: artifact.sha256,
      approvedBy: "operator",
      approvedOn: "2026-11-18",
    },
    request: {
      approvedCommit,
      publicationVersion: "batch-02-pilot",
      buildRunId: "123",
      artifactSha256: artifact.sha256,
    },
    artifactRoot: artifact.root,
    manifest: { publicationVersion: "batch-02-pilot" },
  });
  assert.equal(result.ok, false);
  assert.ok(
    result.problems.some((problem) => problem.includes("APPROVAL_ARTIFACT_COMMIT_MISMATCH")),
    `problems were: ${result.problems.join(" | ")}`,
  );
});

test("the verifier refuses an artifact built for a different publication version", (t) => {
  const approvedCommit = "a".repeat(40);
  const artifact = makeArtifact(t, {
    publicationVersion: "other-version",
    sourceCommit: approvedCommit,
  });
  const result = verifyApproval({
    approval: {
      approvedCommit,
      publicationVersion: "batch-02-pilot",
      buildRunId: "123",
      artifactSha256: artifact.sha256,
      approvedBy: "operator",
      approvedOn: "2026-11-18",
    },
    request: {
      approvedCommit,
      publicationVersion: "batch-02-pilot",
      buildRunId: "123",
      artifactSha256: artifact.sha256,
    },
    artifactRoot: artifact.root,
    manifest: { publicationVersion: "batch-02-pilot" },
  });
  assert.equal(result.ok, false);
  assert.ok(
    result.problems.some((problem) => problem.includes("APPROVAL_ARTIFACT_VERSION_MISMATCH")),
    `problems were: ${result.problems.join(" | ")}`,
  );
});

test("the verifier accepts an artifact built from the approved commit", (t) => {
  const approvedCommit = "a".repeat(40);
  const artifact = makeArtifact(t, {
    publicationVersion: "batch-02-pilot",
    sourceCommit: approvedCommit,
  });
  const result = verifyApproval({
    approval: {
      approvedCommit,
      publicationVersion: "batch-02-pilot",
      buildRunId: "123",
      artifactSha256: artifact.sha256,
      approvedBy: "operator",
      approvedOn: "2026-11-18",
    },
    request: {
      approvedCommit,
      publicationVersion: "batch-02-pilot",
      buildRunId: "123",
      artifactSha256: artifact.sha256,
    },
    artifactRoot: artifact.root,
    manifest: { publicationVersion: "batch-02-pilot" },
  });
  assert.equal(result.ok, true, `problems were: ${result.problems.join(" | ")}`);
});

/* ------------------------------------------------------------------ *
 * Finding 3 (Important): the exposure audit must not report green while
 * missing a path or a credential.
 * ------------------------------------------------------------------ */

test("the audit catches a repository path written inside markup", (t) => {
  const root = tempDir(t);
  write(root, "index.html", "<p><code>registry/internal/file.md</code></p>\n");
  assert.ok(codes(scanBuiltOutput(root)).includes("REPOSITORY_PATH_LEAK"));
});

test("the audit catches an unquoted credential assignment", (t) => {
  const root = tempDir(t);
  write(root, "notes.txt", "API_KEY=abcdef1234567890\n");
  assert.ok(codes(scanBuiltOutput(root)).includes("CREDENTIAL_PATTERN"));
});

test("the audit catches a GitHub fine-grained personal access token", (t) => {
  const root = tempDir(t);
  write(root, "notes.txt", "token github_pat_11ABCDEFG0abcdefghijklmnopqrstuvwxyz\n");
  assert.ok(codes(scanBuiltOutput(root)).includes("CREDENTIAL_PATTERN"));
});

test("the audit does not skip a text file merely because it contains a null byte", (t) => {
  const root = tempDir(t);
  write(root, "notes.txt", "API_KEY=abcdef1234567890\u0000trailing\n");
  assert.ok(codes(scanBuiltOutput(root)).includes("CREDENTIAL_PATTERN"));
});

/* ------------------------------------------------------------------ *
 * Findings 6 and 7 (Minor, re-graded as user-visible defects).
 * ------------------------------------------------------------------ */

test("a list item renders its emphasis instead of printing the markers", () => {
  const html = renderMarkdown("- **Bold** item\n", { terms: [] });
  assert.match(html, /<strong>Bold<\/strong>/);
  assert.doesNotMatch(html, /\*\*/);
});

test("a page title never repeats the site suffix", () => {
  for (const page of ["methods/biological/index.html", "sources/3d-printing-filament/index.html"]) {
    const html = readFileSync(join(dist, page), "utf8");
    assert.doesNotMatch(html, /— Butt Lab — Butt Lab/, `${page} repeats the suffix`);
  }
});

/* ------------------------------------------------------------------ *
 * Finding 4 (Important): the shipped disclosure must be true.
 * ------------------------------------------------------------------ */

test("the start-here page does not claim every record carries both labels", () => {
  const html = readFileSync(join(dist, "start", "index.html"), "utf8");
  assert.doesNotMatch(html, /Every published record carries two labels/);
  assert.match(html, /These labels describe findings and ideas/);
  assert.match(html, /bibliography or glossary entry/);
});

test("the site footer does not claim every statement carries an evidence state", () => {
  const html = readFileSync(join(dist, "index.html"), "utf8");
  assert.doesNotMatch(html, /Every statement carries its evidence state/);
  assert.match(html, /AI-assisted desk research/);
  assert.match(html, /No experiment was run by this project/);
});

test("the repository README does not claim every statement carries its basis", () => {
  const readme = readFileSync(join(repoRoot, "README.md"), "utf8");
  assert.doesNotMatch(readme, /every statement carries its basis/i);
});
