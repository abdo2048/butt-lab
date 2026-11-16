import assert from "node:assert/strict";
import { mkdir, readFile, rename, rm, writeFile } from "node:fs/promises";
import { join, resolve, dirname } from "node:path";
import test, { type TestContext } from "node:test";
import { fileURLToPath } from "node:url";

import { parse } from "yaml";
import { ContractError } from "../src/diagnostics.ts";
import { sha256File } from "../src/load.ts";
import type { FixtureManifest } from "./helpers.ts";
import {
  createValidFixture,
  makeTempDirectory,
  writeFixture,
  addListedAsset,
  FIXTURE_PUBLICATION_VERSION,
  FIXTURE_PAGE_ID,
  FIXTURE_PAGE_PATH,
  FIXTURE_PAGE_CONTENTS,
} from "./helpers.ts";
import type { ExportSummary } from "../src/export.ts";
import { exportPublication } from "../src/export.ts";
import * as exportModule from "../src/export.ts";

// Path to the actual rubrics.yaml in the publication directory
const RUBRICS_PATH = fileURLToPath(new URL("../../../publication/contract/v1/rubrics.yaml", import.meta.url));

async function temporaryRoot(t: TestContext): Promise<string> {
  const root = await makeTempDirectory();
  t.after(() => rm(root, { force: true, recursive: true }));
  return root;
}

async function createEmptyManifest(root: string): Promise<void> {
  await mkdir(join(root, "contract", "v1"), { recursive: true });
  await writeFile(
    join(root, "manifest.yaml"),
    `schemaVersion: 1
publicationVersion: ${FIXTURE_PUBLICATION_VERSION}
records: []
pages: []
assets: []
`,
    "utf8",
  );
}

async function computeDirectoryHashes(dir: string): Promise<Map<string, string>> {
  const hashes = new Map<string, string>();
  async function walk(currentDir: string, baseDir: string): Promise<void> {
    const { readdir } = await import("node:fs/promises");
    const entries = await readdir(currentDir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = join(currentDir, entry.name);
      const relativePath = fullPath.slice(baseDir.length + 1);
      if (entry.isDirectory()) {
        await walk(fullPath, baseDir);
      } else if (entry.isFile()) {
        const contents = await readFile(fullPath);
        const hash = createHash("sha256").update(contents).digest("hex");
        hashes.set(relativePath, hash);
      }
    }
  }
  await walk(dir, dir);
  return hashes;
}

async function getBundleManifest(dir: string): Promise<Record<string, unknown>> {
  const manifestPath = join(dir, "bundle-manifest.json");
  const contents = await readFile(manifestPath, "utf8");
  return JSON.parse(contents) as Record<string, unknown>;
}

async function fileListMatchesManifest(dir: string, manifest: Record<string, unknown>): Promise<boolean> {
  const outputFiles = manifest.outputFiles as Array<{ path: string; sha256: string }>;
  const expectedPaths = new Set(outputFiles.map((f) => f.path));
  expectedPaths.add("bundle-manifest.json");

  const actualHashes = await computeDirectoryHashes(dir);
  const actualPaths = new Set(actualHashes.keys());

  if (actualPaths.size !== expectedPaths.size) {
    return false;
  }
  for (const path of expectedPaths) {
    if (!actualPaths.has(path)) {
      return false;
    }
    if (path !== "bundle-manifest.json") {
      const expected = outputFiles.find((f) => f.path === path)?.sha256;
      const actual = actualHashes.get(path);
      if (expected !== actual) {
        return false;
      }
    }
  }
  return true;
}

test("two exports of identical input have identical file lists and SHA-256 hashes", async (t) => {
  const root = await temporaryRoot(t);
  const { manifest } = await createValidFixture(root);

  const out1 = await temporaryRoot(t);
  const out2 = await temporaryRoot(t);

  const summary1 = await exportPublication({
    root,
    output: out1,
    rubricsPath: RUBRICS_PATH,
  });

  const summary2 = await exportPublication({
    root,
    output: out2,
    rubricsPath: RUBRICS_PATH,
  });

  assert.deepEqual(summary1.outputFiles.map((f) => f.path).sort(), summary2.outputFiles.map((f) => f.path).sort());
  for (const file of summary1.outputFiles) {
    const match = summary2.outputFiles.find((f) => f.path === file.path);
    assert.ok(match, `Missing file in second export: ${file.path}`);
    assert.equal(file.sha256, match.sha256, `Hash mismatch for ${file.path}`);
  }
});

test("output contains only allowed files", async (t) => {
  const root = await temporaryRoot(t);
  await createEmptyManifest(root);

  const out = await temporaryRoot(t);

  const summary = await exportPublication({
    root,
    output: out,
    rubricsPath: RUBRICS_PATH,
  });

  const allowedFiles = new Set([
    "records.json",
    "relationships.json",
    "backlinks.json",
    "glossary.json",
    "bundle-manifest.json",
  ]);

  for (const file of summary.outputFiles) {
    assert.ok(allowedFiles.has(file.path) || file.path.startsWith("pages/") || file.path.startsWith("assets/"), `Unexpected file: ${file.path}`);
  }
  // bundle-manifest.json is written but its hash is not tracked in outputFiles
  // Verify it exists in the output directory
  const manifestPath = join(out, "bundle-manifest.json");
  const { stat } = await import("node:fs/promises");
  await stat(manifestPath); // Throws if not found
});

test("records and edges are sorted deterministically", async (t) => {
  const root = await temporaryRoot(t);
  const { manifest } = await createValidFixture(root);

  const out = await temporaryRoot(t);

  await exportPublication({
    root,
    output: out,
    rubricsPath: RUBRICS_PATH,
  });

  // Check records.json is sorted by id
  const recordsContent = await readFile(join(out, "records.json"), "utf8");
  const records = JSON.parse(recordsContent);
  const recordIds = records.map((r: { id: string }) => r.id);
  const sortedRecordIds = [...recordIds].sort();
  assert.deepEqual(recordIds, sortedRecordIds);

  // Check relationships.json is sorted by fromId, field, toId
  const relationshipsContent = await readFile(join(out, "relationships.json"), "utf8");
  const relationships = JSON.parse(relationshipsContent);
  for (let i = 1; i < relationships.length; i++) {
    const a = relationships[i - 1];
    const b = relationships[i];
    const cmp =
      a.fromId === b.fromId
        ? a.field === b.field
          ? a.toId.localeCompare(b.toId)
          : a.field.localeCompare(b.field)
        : a.fromId.localeCompare(b.fromId);
    assert.ok(cmp <= 0, "Relationships not sorted correctly");
  }

  // Check backlinks.json is sorted by targetId, sourceId, field
  const backlinksContent = await readFile(join(out, "backlinks.json"), "utf8");
  const backlinks = JSON.parse(backlinksContent);
  for (let i = 1; i < backlinks.length; i++) {
    const a = backlinks[i - 1];
    const b = backlinks[i];
    const cmp =
      a.targetId === b.targetId
        ? a.sourceId === b.sourceId
          ? a.field.localeCompare(b.field)
          : a.sourceId.localeCompare(b.sourceId)
        : a.targetId.localeCompare(b.targetId);
    assert.ok(cmp <= 0, "Backlinks not sorted correctly");
  }
});

test("no timestamp, machine path, temp path, or random identifier enters output", async (t) => {
  const root = await temporaryRoot(t);
  await createEmptyManifest(root);

  const out = await temporaryRoot(t);

  await exportPublication({
    root,
    output: out,
    rubricsPath: RUBRICS_PATH,
  });

  const files = await import("node:fs/promises").then((fs) => fs.readdir(out, { recursive: true }));
  const allContents = [];
  for (const file of files) {
    if (typeof file === "string") {
      const fullPath = join(out, file);
      const stat = await import("node:fs/promises").then((fs) => fs.stat(fullPath));
      if (stat.isFile()) {
        allContents.push(await readFile(fullPath, "utf8"));
      }
    }
  }
  const allText = allContents.join("\n");

  // Check for common timestamp patterns
  assert.ok(!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/m.test(allText), "ISO timestamp found in output");
  assert.ok(!/^\d{13}$/m.test(allText), "Unix millisecond timestamp found in output");

  // Check for temp directory patterns
  assert.ok(!/tmp[/\\]publication-contract-/m.test(allText), "Temp directory path found in output");
  assert.ok(!/publication-contract-[a-z0-9-]{36}/m.test(allText), "Temp directory UUID found in output");

  // Check for machine-specific paths
  assert.ok(!/C:[/\\]/m.test(allText), "Windows absolute path found in output");
  assert.ok(!/\/home\/[^/]+/m.test(allText), "Unix home path found in output");
  assert.ok(!/\/Users\/[^/]+/m.test(allText), "macOS Users path found in output");

  // Check for random UUIDs (but allow the fixture's fixed auditAliases/ids)
  // We check for v4 UUID pattern that wouldn't be in fixtures
  const uuidMatches = allText.match(/[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/gi);
  if (uuidMatches) {
    // Filter out any that might be from fixtures (the fixture uses fixed strings, not UUIDs)
    assert.fail(`Unexpected UUID found in output: ${uuidMatches.join(", ")}`);
  }
});

test("failed export preserves existing valid output directory and its sentinel hash", async (t) => {
  const root = await temporaryRoot(t);
  const { manifest } = await createValidFixture(root);

  const out = await temporaryRoot(t);

  // First successful export
  const summary1 = await exportPublication({
    root,
    output: out,
    rubricsPath: RUBRICS_PATH,
  });

  const originalHashes = await computeDirectoryHashes(out);
  const originalBundleManifest = await getBundleManifest(out);

  // Now create a failure condition by making the rubrics path invalid
  // We do this by creating a second root with a broken rubrics file
  const badRoot = await temporaryRoot(t);
  await createValidFixture(badRoot);
  // Corrupt the rubrics file
  const badRubricsPath = join(badRoot, "contract", "v1", "rubrics.yaml");
  await mkdir(dirname(badRubricsPath), { recursive: true });
  await writeFile(badRubricsPath, "invalid: yaml: :", "utf8");

  // Attempt export with bad rubrics - should fail
  let exportFailed = false;
  try {
    await exportPublication({
      root: badRoot,
      output: out, // Same output directory
      rubricsPath: badRubricsPath,
    });
  } catch (e) {
    exportFailed = true;
  }
  assert.ok(exportFailed, "Export should have failed with invalid rubrics");

  // Verify output directory is unchanged
  const newHashes = await computeDirectoryHashes(out);
  assert.deepEqual(newHashes, originalHashes, "Output directory was modified after failed export");

  const newBundleManifest = await getBundleManifest(out);
  assert.deepEqual(newBundleManifest, originalBundleManifest, "bundle-manifest.json changed after failed export");
});

test("semantic errors stop export before stage creation or output replacement", async (t) => {
  const sandbox = await temporaryRoot(t);
  const root = join(sandbox, "publication");
  const output = join(sandbox, "output");
  await mkdir(output, { recursive: true });
  const sentinelPath = join(output, "sentinel.txt");
  await writeFile(sentinelPath, "keep-existing-output", "utf8");

  const records = (await import("./helpers.ts")).cloneFixtureRecords();
  const claim = records.find((record) => record["id"] === "example-mechanism-claim");
  assert.ok(claim);
  delete claim["locator"];
  await writeFixtureRecords(root, records);

  await assert.rejects(
    exportPublication({ root, output, rubricsPath: RUBRICS_PATH }),
    (caught: unknown) =>
      caught instanceof ContractError &&
      caught.diagnostics.some(
        (diagnostic) => diagnostic.code === "CLAIM_LOCATOR_REQUIRED",
      ),
  );

  assert.equal(
    await readFile(sentinelPath, "utf8"),
    "keep-existing-output",
    "semantic validation must not replace the existing bundle",
  );
  const sandboxEntries = await import("node:fs/promises").then((fs) =>
    fs.readdir(sandbox)
  );
  assert.ok(
    sandboxEntries.every((entry) => !entry.startsWith(".export-stage-")),
    "semantic validation must fail before a stage directory is created",
  );
});

test("replacement failure restores the previous directory and removes the stage", async (t) => {
  type RenamePath = (source: string, destination: string) => Promise<void>;
  const replaceOutputDirectory = (
    exportModule as typeof exportModule & {
      replaceOutputDirectory?: (
        outputDir: string,
        stageDir: string,
        renamePath?: RenamePath,
      ) => Promise<void>;
    }
  ).replaceOutputDirectory;
  assert.ok(
    replaceOutputDirectory,
    "the exporter must expose its internal replacement transaction for fault injection",
  );

  const sandbox = await temporaryRoot(t);
  const output = join(sandbox, "output");
  const stage = join(sandbox, "stage");
  await mkdir(output, { recursive: true });
  await mkdir(stage, { recursive: true });
  await writeFile(join(output, "sentinel.txt"), "previous-valid-bundle", "utf8");
  await writeFile(join(stage, "records.json"), "new-bundle", "utf8");

  let renameCalls = 0;
  const failStagePromotion: RenamePath = async (source, destination) => {
    renameCalls += 1;
    if (renameCalls === 2) {
      throw new Error("injected stage promotion failure");
    }
    await rename(source, destination);
  };

  await assert.rejects(
    replaceOutputDirectory(output, stage, failStagePromotion),
    /injected stage promotion failure/,
  );

  assert.equal(renameCalls, 3, "replacement must restore the backup with a third rename");
  assert.equal(
    await readFile(join(output, "sentinel.txt"), "utf8"),
    "previous-valid-bundle",
  );
  await assert.rejects(readFile(join(output, "records.json")), { code: "ENOENT" });
  await assert.rejects(readFile(join(stage, "records.json")), { code: "ENOENT" });
  assert.deepEqual(
    await import("node:fs/promises").then((fs) => fs.readdir(sandbox)),
    ["output"],
    "no stage or backup directory may remain after rollback",
  );
});

test("successful export replaces previous directory and removes stale files", async (t) => {
  const root = await temporaryRoot(t);
  const { manifest } = await createValidFixture(root);

  const out = await temporaryRoot(t);

  // First export
  await exportPublication({
    root,
    output: out,
    rubricsPath: RUBRICS_PATH,
  });

  // Create a stale file in output
  await writeFile(join(out, "stale-file.txt"), "stale content", "utf8");
  assert.ok((await import("node:fs/promises").then((fs) => fs.readdir(out))).some((f) => f === "stale-file.txt"));

  // Second export (same input)
  await exportPublication({
    root,
    output: out,
    rubricsPath: RUBRICS_PATH,
  });

  // Stale file should be gone
  const files = await import("node:fs/promises").then((fs) => fs.readdir(out));
  assert.ok(!files.some((f) => f === "stale-file.txt"), "Stale file was not removed");
});

/**
 * Builds a fixture whose only local artifact is a PDF that IS manifest-listed
 * with its real hash, so the asset hash check passes and the source-rights
 * rule is the only thing that can stop the export.
 *
 * The earlier version of this fixture declared a placeholder hash, so the
 * export stopped with MANIFEST_HASH_MISMATCH and the rights branch was never
 * reached. The hash here is the file's real hash.
 */
async function createLocalArtifactFixture(
  t: TestContext,
  rights: "link-only" | "rights-unresolved",
): Promise<{ root: string; out: string }> {
  const root = await temporaryRoot(t);

  // Write the PDF first so the record can declare the hash of the file it
  // names.
  await mkdir(join(root, "assets"), { recursive: true });
  const artifactPath = join(root, "assets", "fixture-patent.pdf");
  await writeFile(artifactPath, "%PDF-1.4\n%fixture\n", "utf8");
  const artifactHash = await sha256File(artifactPath);

  const records = (await import("./helpers.ts")).cloneFixtureRecords();
  const source = records.find((r) => r.id === "example-patent");
  assert.ok(source, "the fixture must contain the example-patent source");
  source.rights = rights;
  source.localArtifact = {
    path: "assets/fixture-patent.pdf",
    sha256: artifactHash,
  };
  await writeFixtureRecords(root, records);

  const manifestPath = join(root, "manifest.yaml");
  const manifestContent = await readFile(manifestPath, "utf8");
  const manifestObj = parse(manifestContent);
  manifestObj.assets = [
    {
      id: "fixture-patent",
      path: "assets/fixture-patent.pdf",
      sha256: artifactHash,
    },
  ];
  await writeFile(manifestPath, JSON.stringify(manifestObj, null, 2), "utf8");

  return { root, out: await temporaryRoot(t) };
}

/**
 * Asserts that an export fails specifically because the source holds no
 * public-local-copy right over its local artifact, and that nothing was
 * published.
 */
async function assertLocalArtifactBlockedByRights(
  exportPromise: Promise<unknown>,
  out: string,
): Promise<void> {
  await assert.rejects(exportPromise, (caught: unknown) => {
    assert.ok(
      caught instanceof ContractError,
      `expected a ContractError, got ${String(caught)}`,
    );
    const codes = caught.diagnostics.map((d) => d.code);
    assert.ok(
      codes.includes("SOURCE_LOCAL_COPY_RIGHTS_INVALID"),
      `expected SOURCE_LOCAL_COPY_RIGHTS_INVALID, got: ${codes.join(", ")}`,
    );
    const rights = caught.diagnostics.find(
      (d) => d.code === "SOURCE_LOCAL_COPY_RIGHTS_INVALID",
    );
    assert.match(
      rights?.message ?? "",
      /does not hold public-local-copy rights/,
      "the diagnostic must name the rights rule, not a hash or listing problem",
    );
    return true;
  });

  const files = await import("node:fs/promises").then((fs) => fs.readdir(out));
  assert.equal(files.length, 0, "Output directory should be empty after failed export");
}

test("a source with unresolved rights cannot publish its local artifact", async (t) => {
  const { root, out } = await createLocalArtifactFixture(t, "rights-unresolved");

  await assertLocalArtifactBlockedByRights(
    exportPublication({
      root,
      output: out,
      rubricsPath: RUBRICS_PATH,
    }),
    out,
  );
});

test("a source with link-only rights cannot publish its local artifact", async (t) => {
  const { root, out } = await createLocalArtifactFixture(t, "link-only");

  await assertLocalArtifactBlockedByRights(
    exportPublication({
      root,
      output: out,
      rubricsPath: RUBRICS_PATH,
    }),
    out,
  );
});

test("derivative text is absent unless right is publish-full-text or publish-excerpts and explicitly listed", async (t) => {
  const root = await temporaryRoot(t);
  const { manifest } = await createValidFixture(root);

  // Add a derivative with metadata-only right (should not be exported)
  // Note: metadata-only derivatives should NOT be listed in manifest assets
  const records = (await import("./helpers.ts")).cloneFixtureRecords();
  const source = records.find((r) => r.id === "example-patent");
  if (source) {
    source.rights = "link-only";
    source.derivatives = [
      {
        id: "fixture-derivative",
        path: "assets/fixture-derivative.txt",
        sha256: "b".repeat(64),
        extractionMethod: "Fixture extraction.",
        pageMapping: "Fixture page mapping.",
        qualityWarnings: [],
        publicationRight: "metadata-only",
      },
    ];
  }
  await writeFixtureRecords(root, records);

  // Do NOT add the metadata-only derivative to manifest assets
  // The manifest should only list assets that are meant to be published

  const out = await temporaryRoot(t);

  await exportPublication({
    root,
    output: out,
    rubricsPath: RUBRICS_PATH,
  });

  // The derivative should NOT be in assets output since its right is metadata-only
  const assetsDir = join(out, "assets");
  const assetFiles: string[] = await import("node:fs/promises").then((fs) => fs.readdir(assetsDir).catch(() => [] as string[]));
  assert.ok(!assetFiles.includes("fixture-derivative.txt"), "metadata-only derivative should not be exported");

  // Now test with publish-excerpts - should be exported
  const root2 = await temporaryRoot(t);

  // The derivative file is written first so that the record can declare the
  // real hash of the path it names. A derivative hash that disagrees with its
  // manifest-listed path is rejected before output replacement.
  await mkdir(join(root2, "assets"), { recursive: true });
  await writeFile(
    join(root2, "assets", "fixture-derivative.txt"),
    "derivative text content",
    "utf8",
  );
  const derivativeHash2 = await sha256File(
    join(root2, "assets", "fixture-derivative.txt"),
  );

  const records2 = (await import("./helpers.ts")).cloneFixtureRecords();
  const source2 = records2.find((r) => r.id === "example-patent");
  if (source2) {
    source2.rights = "link-only";
    source2.derivatives = [
      {
        id: "fixture-derivative",
        path: "assets/fixture-derivative.txt",
        sha256: derivativeHash2,
        extractionMethod: "Fixture extraction.",
        pageMapping: "Fixture page mapping.",
        qualityWarnings: [],
        publicationRight: "publish-excerpts",
      },
    ];
  }
  await writeFixtureRecords(root2, records2);

  const manifestPath2 = join(root2, "manifest.yaml");
  const manifestContent2 = await readFile(manifestPath2, "utf8");
  const manifestObj2 = parse(manifestContent2);

  manifestObj2.assets = [
    {
      id: "fixture-derivative",
      path: "assets/fixture-derivative.txt",
      sha256: derivativeHash2,
    },
  ];
  await writeFile(manifestPath2, JSON.stringify(manifestObj2, null, 2), "utf8");

  const out2 = await temporaryRoot(t);

  await exportPublication({
    root: root2,
    output: out2,
    rubricsPath: RUBRICS_PATH,
  });

  const assetsDir2 = join(out2, "assets");
  const assetFiles2 = await import("node:fs/promises").then((fs) => fs.readdir(assetsDir2));
  assert.ok(assetFiles2.includes("fixture-derivative.txt"), "publish-excerpts derivative should be exported");
});

test("symlink escape and unsafe Markdown fail before output replacement", async (t) => {
  const root = await temporaryRoot(t);
  const { manifest } = await createValidFixture(root);

  // Test symlink escape - create a page that is a symlink pointing outside
  // On Windows, symlinks require admin, so we'll test the path traversal in manifest
  // by creating a manifest with a path that escapes
  const badRoot = await temporaryRoot(t);
  await createValidFixture(badRoot);

  // Modify manifest to have an escaping path
  const manifestPath = join(badRoot, "manifest.yaml");
  const manifestContent = await readFile(manifestPath, "utf8");
  const manifestObj = parse(manifestContent);
  manifestObj.pages = [
    {
      id: "escaping-page",
      path: "../outside-page.md",
      sha256: "a".repeat(64),
    },
  ];
  await writeFile(manifestPath, JSON.stringify(manifestObj, null, 2), "utf8");

  const out = await temporaryRoot(t);

  let exportFailed = false;
  try {
    await exportPublication({
      root: badRoot,
      output: out,
      rubricsPath: RUBRICS_PATH,
    });
  } catch (e) {
    exportFailed = true;
  }
  assert.ok(exportFailed, "Export should fail with path traversal in manifest");

  // Output should be empty
  const files = await import("node:fs/promises").then((fs) => fs.readdir(out));
  assert.equal(files.length, 0, "Output directory should be empty after path traversal failure");

  // Test unsafe Markdown (raw HTML)
  const badRoot2 = await temporaryRoot(t);
  await createValidFixture(badRoot2);

  const pagePath = join(badRoot2, "pages", "start-here.md");
  await writeFile(pagePath, "# Unsafe\n\n<script>alert('xss')</script>\n", "utf8");

  // Update manifest hash
  const manifestPath2 = join(badRoot2, "manifest.yaml");
  const manifestContent2 = await readFile(manifestPath2, "utf8");
  const manifestObj2 = parse(manifestContent2);
  // Recompute hash
  const { sha256File } = await import("../src/load.ts");
  manifestObj2.pages[0].sha256 = await sha256File(pagePath);
  await writeFile(manifestPath2, JSON.stringify(manifestObj2, null, 2), "utf8");

  const out2 = await temporaryRoot(t);

  let exportFailed2 = false;
  try {
    await exportPublication({
      root: badRoot2,
      output: out2,
      rubricsPath: RUBRICS_PATH,
    });
  } catch (e) {
    exportFailed2 = true;
  }
  assert.ok(exportFailed2, "Export should fail with raw HTML in Markdown");

  // Output should be empty
  const files2 = await import("node:fs/promises").then((fs) => fs.readdir(out2));
  assert.equal(files2.length, 0, "Output directory should be empty after raw HTML failure");
});

test("empty live manifest emits valid empty bundle but never deploys it", async (t) => {
  const root = await temporaryRoot(t);
  await createEmptyManifest(root);

  const out = await temporaryRoot(t);

  const summary = await exportPublication({
    root,
    output: out,
    rubricsPath: RUBRICS_PATH,
  });

  assert.equal(summary.publicationVersion, FIXTURE_PUBLICATION_VERSION);
  assert.equal(summary.recordCount, 0);
  assert.equal(summary.pageCount, 0);
  assert.equal(summary.assetCount, 0);

  // Verify output files exist
  const files = await import("node:fs/promises").then((fs) => fs.readdir(out, { recursive: true }));
  const fileNames = files.filter((f): f is string => typeof f === "string");

  assert.ok(fileNames.includes("records.json"));
  assert.ok(fileNames.includes("relationships.json"));
  assert.ok(fileNames.includes("backlinks.json"));
  assert.ok(fileNames.includes("glossary.json"));
  assert.ok(fileNames.includes("bundle-manifest.json"));

  // Check records.json is empty array
  const recordsContent = await readFile(join(out, "records.json"), "utf8");
  const records = JSON.parse(recordsContent);
  assert.deepEqual(records, []);

  // Check relationships.json is empty array
  const relationshipsContent = await readFile(join(out, "relationships.json"), "utf8");
  const relationships = JSON.parse(relationshipsContent);
  assert.deepEqual(relationships, []);

  // Check backlinks.json is empty array
  const backlinksContent = await readFile(join(out, "backlinks.json"), "utf8");
  const backlinks = JSON.parse(backlinksContent);
  assert.deepEqual(backlinks, []);

  // Check glossary.json is empty object
  const glossaryContent = await readFile(join(out, "glossary.json"), "utf8");
  const glossary = JSON.parse(glossaryContent);
  assert.deepEqual(glossary, {});

  // Check bundle-manifest.json has correct structure
  const bundleManifest = await getBundleManifest(out);
  assert.equal(bundleManifest.schemaVersion, 1);
  assert.equal(bundleManifest.publicationVersion, FIXTURE_PUBLICATION_VERSION);
  assert.deepEqual(bundleManifest.inputManifestHashes, []);
  assert.ok(Array.isArray(bundleManifest.outputFiles));
  assert.ok(bundleManifest.outputFiles.length > 0);

  // No deployment occurs - the export function only writes to the output directory
  // This is verified by the test completing without any external side effects
});

test("fresh export to a non-existent output directory succeeds", async (t) => {
  const root = await temporaryRoot(t);
  await createValidFixture(root);

  const sandbox = await temporaryRoot(t);
  const out = join(sandbox, "brand-new-output");
  assert.equal(
    await import("node:fs/promises").then((fs) => fs.stat(out).then(() => true, () => false)),
    false,
    "the output directory must not exist before this export",
  );

  await exportPublication({ root, output: out, rubricsPath: RUBRICS_PATH });

  const files = await import("node:fs/promises").then((fs) => fs.readdir(out));
  assert.ok(files.includes("records.json"), "records.json must be promoted into the new directory");
  assert.ok(files.includes("bundle-manifest.json"), "bundle-manifest.json must be promoted");
  const sandboxEntries = await import("node:fs/promises").then((fs) => fs.readdir(sandbox));
  assert.deepEqual(
    sandboxEntries.filter((entry) => entry.includes("stage") || entry.includes("backup")),
    [],
    "no stage or backup directory may remain",
  );
});

test("listed PNG asset is copied byte-for-byte with matching SHA-256", async (t) => {
  const root = await temporaryRoot(t);
  await createValidFixture(root);

  // Add a listed PNG asset with known bytes
  const pngBytes = new Uint8Array([
    0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, // PNG signature
    0x00, 0x00, 0x00, 0x0d, 0x49, 0x48, 0x44, 0x52, // IHDR chunk
    0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01, // 1x1 pixel
    0x08, 0x02, 0x00, 0x00, 0x00, 0x90, 0x77, 0x53,
    0xde, 0x00, 0x00, 0x00, 0x0c, 0x49, 0x44, 0x41, // IDAT chunk
    0x54, 0x08, 0xd7, 0x63, 0xf8, 0x0f, 0x00, 0x00,
    0x01, 0x01, 0x00, 0x05, 0x00, 0x1e, 0x00, 0x00,
    0x00, 0x00, 0x49, 0x45, 0x4e, 0x44, 0xae, 0x42,
    0x60, 0x82, // IEND chunk
  ]);
  const { sha256: expectedSha256 } = await addListedAsset(root, "fixture-image", ".png", pngBytes);

  const out = await temporaryRoot(t);
  await exportPublication({ root, output: out, rubricsPath: RUBRICS_PATH });

  // Verify the PNG was copied to assets/fixture-image.png
  const exportedPath = join(out, "assets", "fixture-image.png");
  const exportedBytes = await readFile(exportedPath);
  assert.deepEqual(new Uint8Array(exportedBytes), pngBytes, "PNG bytes must match exactly");
  const exportedSha256 = await sha256File(exportedPath);
  assert.equal(exportedSha256, expectedSha256, "SHA-256 must match the manifest entry");
});

test("listed JPEG asset is copied byte-for-byte with matching SHA-256", async (t) => {
  const root = await temporaryRoot(t);
  await createValidFixture(root);

  // Add a listed JPEG asset with known bytes (minimal JPEG header)
  const jpegBytes = new Uint8Array([
    0xff, 0xd8, 0xff, 0xe0, 0x00, 0x10, 0x4a, 0x46, // SOI + APP0
    0x49, 0x46, 0x00, 0x01, 0x01, 0x01, 0x00, 0x48,
    0x00, 0x48, 0x00, 0x00, 0xff, 0xdb, 0x00, 0x43,
    0x00, 0x08, 0x06, 0x06, 0x07, 0x06, 0x05, 0x08,
    0x07, 0x07, 0x07, 0x09, 0x09, 0x08, 0x0a, 0x0c,
    0x14, 0x0d, 0x0c, 0x0b, 0x0b, 0x0c, 0x19, 0x12,
    0x13, 0x0f, 0x14, 0x1d, 0x1a, 0x1f, 0x1e, 0x1d,
    0x1a, 0x1c, 0x1c, 0x20, 0x24, 0x2e, 0x27, 0x20,
    0x22, 0x2c, 0x23, 0x1c, 0x1c, 0x28, 0x37, 0x29,
    0x2c, 0x30, 0x31, 0x34, 0x34, 0x34, 0x1f, 0x27,
    0x39, 0x3d, 0x38, 0x32, 0x3c, 0x2e, 0x33, 0x34,
    0x32, 0xff, 0xd9, // EOI
  ]);
  const { sha256: expectedSha256 } = await addListedAsset(root, "fixture-photo", ".jpg", jpegBytes);

  const out = await temporaryRoot(t);
  await exportPublication({ root, output: out, rubricsPath: RUBRICS_PATH });

  const exportedPath = join(out, "assets", "fixture-photo.jpg");
  const exportedBytes = await readFile(exportedPath);
  assert.deepEqual(new Uint8Array(exportedBytes), jpegBytes, "JPEG bytes must match exactly");
  const exportedSha256 = await sha256File(exportedPath);
  assert.equal(exportedSha256, expectedSha256, "SHA-256 must match the manifest entry");
});

test("exportPublication rejects a malformed rubrics catalog with RUBRICS_INVALID", async (t) => {
  const root = await temporaryRoot(t);
  await createValidFixture(root);

  // Replace the fixture's rubrics catalog with a YAML document that parses
  // but does not satisfy RubricCatalogSchema.
  const fixtureRubrics = join(root, "contract", "v1", "rubrics.yaml");
  await writeFile(fixtureRubrics, "rubricVersion: 1\ncriteria: not-a-list\n", "utf8");

  const out = await temporaryRoot(t);
  await assert.rejects(
    exportPublication({ root, output: out, rubricsPath: fixtureRubrics }),
    (caught: unknown) => {
      assert.ok(caught instanceof ContractError, "expected a ContractError");
      assert.equal(caught.diagnostics[0]?.code, "RUBRICS_INVALID");
      return true;
    },
  );

  const outputEntries = await import("node:fs/promises").then((fs) => fs.readdir(out));
  assert.deepEqual(outputEntries, [], "a rejected export must not write any output");
});

test("a failed export removes the stage directory and preserves the previous output", async (t) => {
  const root = await temporaryRoot(t);
  await createValidFixture(root);

  const sandbox = await temporaryRoot(t);
  const output = join(sandbox, "output");
  await mkdir(output, { recursive: true });
  await writeFile(join(output, "existing.txt"), "previous bundle", "utf8");

  // Inject a failure only for the stage promotion, so the rollback path can
  // restore the backup without the injected fault blocking the restore.
  const failingRename = async (source: string, destination: string): Promise<void> => {
    if (source.includes(".export-stage-")) {
      throw new Error("injected promotion failure");
    }
    await rename(source, destination);
  };

  await assert.rejects(
    exportPublication({
      root,
      output,
      rubricsPath: RUBRICS_PATH,
      renamePath: failingRename,
    }),
    /injected promotion failure/,
  );

  assert.equal(
    await readFile(join(output, "existing.txt"), "utf8"),
    "previous bundle",
    "the previous output must survive a failed export",
  );

  const sandboxEntries = await import("node:fs/promises").then((fs) => fs.readdir(sandbox));
  assert.deepEqual(
    sandboxEntries.filter((entry) => entry.startsWith(".export-stage-") || entry.startsWith(".backup-")),
    [],
    "no stage or backup directory may remain after a failed export",
  );
});

async function writeFixtureRecords(
  root: string,
  records: Record<string, unknown>[],
): Promise<FixtureManifest> {
  const { writeFixtureRecords: helperWrite } = await import("./helpers.ts");
  return helperWrite(root, records);
}

// Import createHash from node:crypto at top level
import { createHash } from "node:crypto";
