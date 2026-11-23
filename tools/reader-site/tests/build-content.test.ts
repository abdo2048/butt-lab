import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import { stageBundle, verifyBundle } from "../scripts/build-content.ts";

function sha256(bytes: Buffer): string {
  return createHash("sha256").update(bytes).digest("hex");
}

interface BundleFixture {
  dir: string;
  target: string;
}

function makeBundle(files: Record<string, string>): BundleFixture {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "butt-lab-bundle-"));
  const outputFiles: Array<{ path: string; sha256: string }> = [];
  for (const [relative, content] of Object.entries(files)) {
    const target = path.join(dir, relative);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, content, "utf8");
    outputFiles.push({ path: relative, sha256: sha256(Buffer.from(content, "utf8")) });
  }
  const manifest = {
    schemaVersion: 1,
    publicationVersion: "test-fixture",
    outputFiles,
  };
  fs.writeFileSync(path.join(dir, "bundle-manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
  return { dir, target: path.join(dir, "..", `staged-${path.basename(dir)}`) };
}

const GOOD_FILES = {
  "records.json": '[{"id","record"}]\n',
  "glossary.json": '{}\n',
  "pages/start-here.md": "# Start here\n",
};

test("verifyBundle accepts a bundle whose listed files are present", () => {
  const { dir } = makeBundle(GOOD_FILES);
  const manifest = verifyBundle(dir);
  assert.equal(manifest.publicationVersion, "test-fixture");
  assert.deepEqual(
    manifest.outputFiles.map((file) => file.path),
    Object.keys(GOOD_FILES),
  );
});

test("verifyBundle no longer rejects a file whose bytes differ from its manifest hash", () => {
  // The per-file SHA-256 check was removed by operator decision (2026-11-23).
  // A swapped file is now accepted by the reader build; the deployment gate still
  // binds the exact published artifact separately.
  const { dir } = makeBundle(GOOD_FILES);
  fs.writeFileSync(path.join(dir, "records.json"), "[{\"id\",\"tampered\"}]\n", "utf8");
  const manifest = verifyBundle(dir);
  assert.equal(manifest.publicationVersion, "test-fixture");
});

test("verifyBundle rejects a file that the manifest does not list", () => {
  const { dir } = makeBundle(GOOD_FILES);
  fs.writeFileSync(path.join(dir, "extra.json"), "{}\n", "utf8");
  assert.throws(
    () => verifyBundle(dir),
    (error: unknown) => {
      assert.ok(error instanceof Error);
      assert.match(error.message, /BUNDLE_FILE_NOT_IN_MANIFEST/);
      assert.match(error.message, /extra\.json/);
      return true;
    },
  );
});

test("verifyBundle rejects a bundle whose manifest is missing", () => {
  const { dir } = makeBundle(GOOD_FILES);
  fs.rmSync(path.join(dir, "bundle-manifest.json"));
  assert.throws(
    () => verifyBundle(dir),
    (error: unknown) => {
      assert.ok(error instanceof Error);
      assert.match(error.message, /BUNDLE_MANIFEST_MISSING/);
      return true;
    },
  );
});

test("stageBundle copies only the verified files into the target directory", () => {
  const { dir, target } = makeBundle(GOOD_FILES);
  const manifest = stageBundle(dir, target);
  assert.equal(manifest.outputFiles.length, 3);
  assert.deepEqual(
    fs.readdirSync(target).sort(),
    ["bundle-manifest.json", "glossary.json", "pages", "records.json"],
  );
  assert.deepEqual(fs.readdirSync(path.join(target, "pages")), ["start-here.md"]);
  assert.equal(fs.readFileSync(path.join(target, "records.json"), "utf8"), GOOD_FILES["records.json"]);
  assert.equal(
    fs.readFileSync(path.join(target, "bundle-manifest.json"), "utf8"),
    fs.readFileSync(path.join(dir, "bundle-manifest.json"), "utf8"),
  );
});

test("stageBundle writes nothing into the target directory when a listed file is missing", () => {
  const { dir, target } = makeBundle(GOOD_FILES);
  fs.rmSync(path.join(dir, "glossary.json"));
  assert.throws(() => stageBundle(dir, target), /BUNDLE_FILE_MISSING/);
  assert.equal(fs.existsSync(target), false);
});

test("stageBundle replaces a previous staging instead of merging into it", () => {
  const { dir, target } = makeBundle(GOOD_FILES);
  fs.mkdirSync(target, { recursive: true });
  fs.writeFileSync(path.join(target, "stale.json"), "{}\n", "utf8");
  stageBundle(dir, target);
  assert.equal(fs.existsSync(path.join(target, "stale.json")), false);
});
