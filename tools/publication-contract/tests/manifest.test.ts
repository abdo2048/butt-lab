import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdir, rm, symlink, writeFile } from "node:fs/promises";
import { join } from "node:path";
import test, { type TestContext } from "node:test";

import { stringify } from "yaml";

import { ContractError } from "../src/diagnostics.ts";
import { sha256File } from "../src/load.ts";
import { loadAndValidateManifest } from "../src/manifest-validation.ts";
import { copyRubricsToFixture, makeTempDirectory, writeFixture } from "./helpers.ts";

type ManifestEntry = Readonly<{
  id: string;
  path: string;
  sha256: string;
}>;

type Manifest = Readonly<{
  schemaVersion: 1;
  publicationVersion: string;
  records: readonly ManifestEntry[];
  pages: readonly ManifestEntry[];
  assets: readonly ManifestEntry[];
}>;

const EMPTY_MANIFEST: Manifest = {
  schemaVersion: 1,
  publicationVersion: "phase-1-contract",
  records: [],
  pages: [],
  assets: [],
};



async function temporaryRoot(t: TestContext): Promise<string> {
  const root = await makeTempDirectory();
  t.after(() => rm(root, { force: true, recursive: true }));
  return root;
}

async function writeManifest(root: string, manifest: Manifest): Promise<void> {
  await writeFixture(root, "manifest.yaml", stringify(manifest));
}

async function entryFor(
  root: string,
  id: string,
  path: string,
  contents: string,
): Promise<ManifestEntry> {
  const file = await writeFixture(root, path, contents);
  return { id, path, sha256: await sha256File(file) };
}

async function expectContractCode(
  action: () => Promise<unknown>,
  code: string,
): Promise<void> {
  await assert.rejects(action, (caught: unknown) => {
    assert.ok(caught instanceof ContractError);
    assert.equal(caught.diagnostics[0]?.code, code);
    return true;
  });
}

function approvedTerm(id: string, sourceIds: readonly string[] = []): string {
  return stringify({
    schemaVersion: 1,
    kind: "term",
    id,
    title: "Listed term",
    publicationState: "approved",
    preferredLabel: "Listed term",
    aliases: [],
    tooltip: "A listed term.",
    explanation: "An approved term used to exercise manifest loading.",
    methodIds: [],
    claimIds: [],
    sourceIds,
  });
}

test("empty live manifest is valid", async (t) => {
  const root = await temporaryRoot(t);
  await writeManifest(root, EMPTY_MANIFEST);

  const loaded = await loadAndValidateManifest(root);

  assert.equal(loaded.manifest.publicationVersion, "phase-1-contract");
  assert.equal(loaded.records.size, 0);
  assert.equal(loaded.pages.size, 0);
  assert.equal(loaded.assets.size, 0);
});

test("duplicate IDs across manifest sections fail with MANIFEST_DUPLICATE_ID", async (t) => {
  const root = await temporaryRoot(t);
  const page = await entryFor(root, "shared-id", "pages/overview.md", "# Overview\n");
  const asset = await entryFor(root, "shared-id", "assets/data.txt", "data\n");
  await writeManifest(root, { ...EMPTY_MANIFEST, pages: [page], assets: [asset] });

  await expectContractCode(
    () => loadAndValidateManifest(root),
    "MANIFEST_DUPLICATE_ID",
  );
});

test("duplicate paths fail with MANIFEST_DUPLICATE_PATH", async (t) => {
  const root = await temporaryRoot(t);
  const first = await entryFor(root, "first", "shared.md", "# Shared\n");
  const second = { ...first, id: "second" };
  await writeManifest(root, {
    ...EMPTY_MANIFEST,
    pages: [first],
    assets: [second],
  });

  await expectContractCode(
    () => loadAndValidateManifest(root),
    "MANIFEST_DUPLICATE_PATH",
  );
});

test("canonical aliases fail with MANIFEST_DUPLICATE_PATH", async (t) => {
  const root = await temporaryRoot(t);
  const first = await entryFor(root, "first", "assets/Data.txt", "same bytes\n");
  let aliasPath: string;

  if (process.platform === "win32") {
    aliasPath = "assets/data.txt";
  } else {
    aliasPath = "assets/alias.txt";
    await symlink("Data.txt", join(root, aliasPath));
  }

  await writeManifest(root, {
    ...EMPTY_MANIFEST,
    pages: [first],
    assets: [{ ...first, id: "second", path: aliasPath }],
  });

  await expectContractCode(
    () => loadAndValidateManifest(root),
    "MANIFEST_DUPLICATE_PATH",
  );
});

test("wrong SHA-256 fails with MANIFEST_HASH_MISMATCH", async (t) => {
  const root = await temporaryRoot(t);
  const asset = await entryFor(root, "asset", "assets/data.txt", "actual\n");
  await writeManifest(root, {
    ...EMPTY_MANIFEST,
    assets: [{ ...asset, sha256: "0".repeat(64) }],
  });

  await expectContractCode(
    () => loadAndValidateManifest(root),
    "MANIFEST_HASH_MISMATCH",
  );
});

test("missing file fails with MANIFEST_FILE_MISSING", async (t) => {
  const root = await temporaryRoot(t);
  await writeManifest(root, {
    ...EMPTY_MANIFEST,
    assets: [{
      id: "missing",
      path: "assets/missing.txt",
      sha256: "0".repeat(64),
    }],
  });

  await expectContractCode(
    () => loadAndValidateManifest(root),
    "MANIFEST_FILE_MISSING",
  );
});

test("only listed entries enter closure and relationship targets are not included transitively", async (t) => {
  const root = await temporaryRoot(t);
  const record = await entryFor(
    root,
    "listed-term",
    "records/terms/listed-term.yaml",
    approvedTerm("listed-term", ["unlisted-source"]),
  );
  const page = await entryFor(root, "overview", "pages/overview.md", "# Overview\n");
  const asset = await entryFor(root, "data", "assets/data.txt", "data\n");

  await writeFixture(
    root,
    "records/sources/unlisted-source.yaml",
    "this unlisted file is deliberately not a valid record\n",
  );
  await writeFixture(root, "pages/unlisted.md", "<script>not loaded</script>\n");
  await writeManifest(root, {
    ...EMPTY_MANIFEST,
    records: [record],
    pages: [page],
    assets: [asset],
  });

  const loaded = await loadAndValidateManifest(root);

  assert.deepEqual([...loaded.records.keys()], ["listed-term"]);
  assert.deepEqual([...loaded.pages.keys()], ["overview"]);
  assert.deepEqual([...loaded.assets.keys()], ["data"]);
  assert.equal(loaded.records.has("unlisted-source"), false);
  assert.equal(loaded.pages.has("unlisted"), false);
  assert.equal(loaded.pages.get("overview"), "# Overview\n");
  assert.equal(
    new TextDecoder().decode(loaded.assets.get("data")),
    "data\n",
  );
});

test("validated pages and assets remain captured after files are replaced", async (t) => {
  const root = await temporaryRoot(t);
  const page = await entryFor(root, "overview", "pages/overview.md", "# Original\n");
  const asset = await entryFor(root, "data", "assets/data.txt", "original data\n");
  await writeManifest(root, { ...EMPTY_MANIFEST, pages: [page], assets: [asset] });

  const loaded = await loadAndValidateManifest(root);
  await writeFile(join(root, page.path), "# Replacement\n", "utf8");
  await writeFile(join(root, asset.path), "replacement data\n", "utf8");

  assert.equal(loaded.pages.get("overview"), "# Original\n");
  const firstRead = loaded.assets.get("data");
  assert.ok(firstRead instanceof Uint8Array);
  assert.equal(new TextDecoder().decode(firstRead), "original data\n");

  firstRead.fill(0);
  assert.equal(
    new TextDecoder().decode(loaded.assets.get("data")),
    "original data\n",
  );
});

test("passive asset types return captured bytes", async (t) => {
  const root = await temporaryRoot(t);
  const assets = await Promise.all([
    entryFor(root, "reviewed-pdf", "assets/reviewed.pdf", "%PDF-1.7\n"),
    entryFor(root, "figure", "assets/figure.png", "png bytes\n"),
    entryFor(root, "table", "assets/table.csv", "value\n1\n"),
  ]);
  await writeManifest(root, { ...EMPTY_MANIFEST, assets });

  const loaded = await loadAndValidateManifest(root);

  assert.equal(loaded.assets.size, 3);
  assert.equal(
    new TextDecoder().decode(loaded.assets.get("table")),
    "value\n1\n",
  );
});

test("active asset types fail with ASSET_UNSAFE_TYPE", async (t) => {
  const root = await temporaryRoot(t);

  for (const [index, extension] of [
    "html",
    "htm",
    "xhtml",
    "svg",
    "xml",
    "js",
    "mjs",
    "css",
    "wasm",
  ].entries()) {
    const asset = await entryFor(
      root,
      `active-${index}`,
      `assets/active.${extension}`,
      "active bytes\n",
    );
    await writeManifest(root, { ...EMPTY_MANIFEST, assets: [asset] });
    await expectContractCode(
      () => loadAndValidateManifest(root),
      "ASSET_UNSAFE_TYPE",
    );
  }
});

test("page or asset outside publication root fails with PATH_OUTSIDE_PUBLICATION_ROOT", async (t) => {
  const base = await temporaryRoot(t);
  const root = join(base, "publication");
  await mkdir(root);
  const outsidePath = await writeFixture(base, "outside.md", "# Outside\n");
  const outsideEntry = {
    id: "outside",
    path: "../outside.md",
    sha256: await sha256File(outsidePath),
  };

  for (const section of ["pages", "assets"] as const) {
    await writeManifest(root, { ...EMPTY_MANIFEST, [section]: [outsideEntry] });
    await expectContractCode(
      () => loadAndValidateManifest(root),
      "PATH_OUTSIDE_PUBLICATION_ROOT",
    );
  }
});

test("forbidden prefixes and session-log paths cannot resolve", async (t) => {
  const base = await temporaryRoot(t);
  const root = join(base, "publication");
  await mkdir(root);

  const cases = [
    ["../state/workflow.yaml", "PATH_OUTSIDE_PUBLICATION_ROOT"],
    ["../panels/report.md", "PATH_OUTSIDE_PUBLICATION_ROOT"],
    ["../packets/packet.md", "PATH_OUTSIDE_PUBLICATION_ROOT"],
    ["../materials/raw.md", "PATH_OUTSIDE_PUBLICATION_ROOT"],
    [".superpowers/private.md", "PATH_FORBIDDEN"],
    ["state/session-log.md", "PATH_FORBIDDEN"],
  ] as const;

  for (const [index, [path, code]] of cases.entries()) {
    const entry = await entryFor(
      root,
      `forbidden-${index}`,
      path,
      "private\n",
    );
    await writeManifest(root, { ...EMPTY_MANIFEST, assets: [entry] });
    await expectContractCode(() => loadAndValidateManifest(root), code);
  }
});

test("listed records must be approved", async (t) => {
  const root = await temporaryRoot(t);
  const draft = approvedTerm("draft-term").replace(
    "publicationState: approved",
    "publicationState: draft",
  );
  const record = await entryFor(
    root,
    "draft-term",
    "records/terms/draft-term.yaml",
    draft,
  );
  await writeManifest(root, { ...EMPTY_MANIFEST, records: [record] });

  await expectContractCode(
    () => loadAndValidateManifest(root),
    "RECORD_NOT_APPROVED",
  );
});

test("listed pages apply the raw HTML policy", async (t) => {
  const root = await temporaryRoot(t);
  const page = await entryFor(
    root,
    "unsafe",
    "pages/unsafe.md",
    "<script>alert(1)</script>\n",
  );
  await writeManifest(root, { ...EMPTY_MANIFEST, pages: [page] });

  await expectContractCode(
    () => loadAndValidateManifest(root),
    "MARKDOWN_RAW_HTML",
  );
});

test("validate CLI reports exact empty-manifest counts", async (t) => {
  const root = await temporaryRoot(t);
  await writeManifest(root, EMPTY_MANIFEST);
  // Semantic validation requires a rubrics catalog; an empty manifest must
  // still validate because there is no content to judge against it.
  await copyRubricsToFixture(root);

  const result = spawnSync(
    process.execPath,
    ["src/cli.ts", "validate", "--root", root],
    { cwd: new URL("..", import.meta.url), encoding: "utf8" },
  );

  assert.equal(result.status, 0, result.stderr);
  assert.equal(result.stdout, "VALID records=0 pages=0 assets=0\n");
  assert.equal(result.stderr, "");
});

test("validate CLI prints ContractError diagnostics and exits one", async (t) => {
  const root = await temporaryRoot(t);
  await writeManifest(root, {
    ...EMPTY_MANIFEST,
    assets: [{
      id: "missing",
      path: "assets/missing.txt",
      sha256: "0".repeat(64),
    }],
  });

  const result = spawnSync(
    process.execPath,
    ["src/cli.ts", "validate", "--root", root],
    { cwd: new URL("..", import.meta.url), encoding: "utf8" },
  );

  assert.equal(result.status, 1);
  // Diagnostics are now rendered in format: SEVERITY CODE path recordId message
  assert.match(result.stderr, /MANIFEST_FILE_MISSING/);
});
