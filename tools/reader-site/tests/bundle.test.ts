import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { test } from "node:test";

import { loadBundle } from "../src/lib/bundle.ts";

function makeBundle(): string {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "reader-bundle-"));
  fs.mkdirSync(path.join(dir, "pages"));
  fs.writeFileSync(
    path.join(dir, "records.json"),
    JSON.stringify([
      ["mechanical-physical", { id: "mechanical-physical", kind: "method-family", title: "Mechanical" }],
      ["a-claim", { id: "a-claim", kind: "claim", proposition: "A proposition." }],
    ]),
  );
  fs.writeFileSync(path.join(dir, "glossary.json"), JSON.stringify({ tar: "Sticky residue." }));
  fs.writeFileSync(
    path.join(dir, "relationships.json"),
    JSON.stringify([{ field: "claimIds", fromId: "mechanical-physical", targetKind: "claim", toId: "a-claim" }]),
  );
  fs.writeFileSync(
    path.join(dir, "backlinks.json"),
    JSON.stringify([{ field: "claimIds", sourceId: "mechanical-physical", targetId: "a-claim" }]),
  );
  fs.writeFileSync(path.join(dir, "pages", "start-here.md"), "# Start here\n\nBody.\n");
  fs.writeFileSync(
    path.join(dir, "bundle-manifest.json"),
    JSON.stringify({ schemaVersion: 1, publicationVersion: "test", outputFiles: [] }),
  );
  return dir;
}

test("loadBundle reads the records and groups them by kind", () => {
  const bundle = loadBundle(makeBundle());
  assert.equal(bundle.records.get("mechanical-physical")?.kind, "method-family");
  assert.deepEqual(bundle.byKind["method-family"], ["mechanical-physical"]);
  assert.deepEqual(bundle.byKind["claim"], ["a-claim"]);
});

test("loadBundle reads the pages keyed by file name", () => {
  const bundle = loadBundle(makeBundle());
  assert.equal(bundle.pages.get("start-here")?.markdown, "# Start here\n\nBody.\n");
});

test("loadBundle reads the glossary, relationships, backlinks and manifest", () => {
  const bundle = loadBundle(makeBundle());
  assert.equal(bundle.glossary["tar"], "Sticky residue.");
  assert.equal(bundle.relationships.length, 1);
  assert.equal(bundle.backlinks.length, 1);
  assert.equal(bundle.manifest.publicationVersion, "test");
});

test("loadBundle fails loudly when a required file is missing", () => {
  const dir = makeBundle();
  fs.rmSync(path.join(dir, "glossary.json"));
  assert.throws(() => loadBundle(dir), /BUNDLE_FILE_MISSING/);
});

test("loadBundle fails loudly when a record id is repeated", () => {
  const dir = makeBundle();
  fs.writeFileSync(
    path.join(dir, "records.json"),
    JSON.stringify([
      ["same", { id: "same", kind: "claim" }],
      ["same", { id: "same", kind: "claim" }],
    ]),
  );
  assert.throws(() => loadBundle(dir), /BUNDLE_DUPLICATE_RECORD_ID/);
});
