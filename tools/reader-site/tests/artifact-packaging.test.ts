import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import {
  buildArtifact,
  defaultSourceDir,
} from "../scripts/build-artifact.ts";

const here = dirname(fileURLToPath(import.meta.url));
const siteRoot = resolve(here, "..");
const repoRoot = resolve(siteRoot, "..", "..");

function sourceTree(t: { after: (fn: () => void) => void }): string {
  const source = mkdtempSync(join(tmpdir(), "artifact-source-"));
  t.after(() => {
    rmSync(source, { recursive: true, force: true });
  });
  mkdirSync(join(source, "dist"));
  writeFileSync(join(source, "dist", "index.html"), "<!doctype html>\n");
  return source;
}

test("the artifact builder finds the staged bundle manifest when the source root has no copy", (t) => {
  const source = sourceTree(t);
  mkdirSync(join(source, "src", "content", "bundle"), { recursive: true });
  writeFileSync(
    join(source, "src", "content", "bundle", "bundle-manifest.json"),
    '{"files":[]}\n',
  );

  const target = join(source, "artifact-output");
  const manifest = buildArtifact(source, target, {
    publicationVersion: "batch-02-pilot",
    sourceCommit: "1c0c402",
  });

  assert.ok(existsSync(join(target, "site", "index.html")), "the built site is copied");
  assert.ok(
    existsSync(join(target, "bundle-manifest.json")),
    "the bundle manifest travels with the artifact",
  );
  assert.equal(manifest.publicationVersion, "batch-02-pilot");
  assert.equal(manifest.sourceCommit, "1c0c402");
});

test("the artifact builder refuses a source that carries no bundle manifest", (t) => {
  const source = sourceTree(t);
  const target = join(source, "artifact-output");

  assert.throws(
    () =>
      buildArtifact(source, target, {
        publicationVersion: "batch-02-pilot",
        sourceCommit: "1c0c402",
      }),
    /bundle manifest/i,
    "the failure names the missing bundle manifest",
  );
});

test("the packaging command resolves its source directory to the reader site root", () => {
  assert.equal(
    defaultSourceDir(),
    siteRoot,
    "packaging must not depend on the directory it was invoked from",
  );
});

test("no packaging command is told to read the source from a parent directory", () => {
  const workflow = readFileSync(
    join(repoRoot, ".github", "workflows", "build.yml"),
    "utf8",
  );
  const guide = readFileSync(join(repoRoot, "docs", "DEPLOY.md"), "utf8");

  for (const [name, text] of [
    ["the release workflow", workflow],
    ["the deployment guide", guide],
  ] as const) {
    const lines = text
      .split("\n")
      .filter((line) => line.includes("build-artifact.ts"));
    assert.ok(lines.length > 0, `${name} packages the artifact`);
    for (const line of lines) {
      assert.doesNotMatch(
        line,
        /\.\.\/\.\./,
        `${name} must not point the packager at a parent directory`,
      );
    }
  }
});
