import { mkdir, readFile, rename, rm, writeFile, readdir, stat } from "node:fs/promises";
import { join, resolve, dirname, relative, extname } from "node:path";
import { createHash } from "node:crypto";
import { parse, stringify } from "yaml";

import { ContractError, error } from "./diagnostics.ts";
import type { LoadedPublication } from "./manifest-validation.ts";
import { loadAndValidateManifest, isAllowedPassiveAsset } from "./manifest-validation.ts";
import { sha256Bytes, canonicalJson } from "./load.ts";
import type { RubricCatalog } from "./model/index.ts";
import { RubricCatalogSchema } from "./model/index.ts";
import {
  collectRelationships,
  buildBacklinks,
  type Relationship,
  type Backlink,
} from "./relationships.ts";
import { validatePublicationSemantics } from "./semantic-validation.ts";
import type { PublicationManifest } from "./model/index.ts";

export type ExportOptions = Readonly<{
  root: string;
  output: string;
  rubricsPath: string;
  /**
   * Filesystem rename used to promote the stage directory. Injected only for
   * tests that must observe the fail-closed rollback path; production uses the
   * real `rename`.
   */
  renamePath?: (source: string, destination: string) => Promise<void>;
}>;

export type ExportSummary = Readonly<{
  publicationVersion: string;
  recordCount: number;
  pageCount: number;
  assetCount: number;
  outputFiles: readonly OutputFile[];
}>;

export type OutputFile = Readonly<{
  path: string;
  sha256: string;
}>;

const BUNDLE_MANIFEST_SCHEMA_VERSION = 1 as const;

function computeSha256(bytes: Uint8Array): string {
  return createHash("sha256").update(bytes).digest("hex");
}

async function sha256File(path: string): Promise<string> {
  return sha256Bytes(await readFile(path));
}

async function writeSortedJson(path: string, value: unknown): Promise<string> {
  const json = canonicalJson(value);
  await writeFile(path, json, "utf8");
  return computeSha256(new TextEncoder().encode(json));
}

async function readdirRecursive(dir: string): Promise<string[]> {
  const result: string[] = [];
  async function walk(currentDir: string): Promise<void> {
    const entries = await readdir(currentDir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = join(currentDir, entry.name);
      if (entry.isDirectory()) {
        await walk(fullPath);
      } else if (entry.isFile()) {
        result.push(fullPath);
      }
    }
  }
  await walk(dir);
  return result;
}

async function stageDirectory(root: string, stageDir: string, rubricsPath: string): Promise<{
  outputFiles: OutputFile[];
  assetHashes: Map<string, string>;
  loaded: LoadedPublication;
}> {
  // 1. Load and validate the publication (includes semantic validation)
  const loaded = await loadAndValidateManifest(root);

  // 2. Load rubrics catalog from the caller-supplied path
  const rubricsYaml = await readFile(rubricsPath, "utf8");
  const rubricsResult = RubricCatalogSchema.safeParse(parse(rubricsYaml));
  if (!rubricsResult.success) {
    throw new ContractError([
      error(
        "RUBRICS_INVALID",
        `The rubrics catalog does not match RubricCatalogSchema: ${rubricsResult.error.message}`,
        rubricsPath,
      ),
    ]);
  }
  const rubrics: RubricCatalog = rubricsResult.data;

  // 3. Build deterministic relationship/backlink data structures
  const relationships = collectRelationships(loaded.records);
  const backlinks = buildBacklinks(relationships);

  // 4. Build glossary from term records (use tooltip + explanation as definition)
  const glossary: Record<string, string> = {};
  for (const [id, record] of loaded.records) {
    if (record.kind === "term") {
      glossary[id] = `${record.tooltip}\n\n${record.explanation}`;
    }
  }

  // 5. Compute input manifest hashes for bundle-manifest.json
  const inputManifestHashes: string[] = [];
  for (const entry of loaded.manifest.records) {
    const recordPath = join(root, entry.path);
    inputManifestHashes.push(await sha256File(recordPath));
  }
  for (const entry of loaded.manifest.pages) {
    const pagePath = join(root, entry.path);
    inputManifestHashes.push(await sha256File(pagePath));
  }
  for (const entry of loaded.manifest.assets) {
    const assetPath = join(root, entry.path);
    inputManifestHashes.push(await sha256File(assetPath));
  }
  inputManifestHashes.sort();

  // 6. Export allowlisted pages
  const outputFiles: OutputFile[] = [];
  const assetHashes = new Map<string, string>();

  for (const pageEntry of loaded.manifest.pages) {
    const pagePath = join(root, pageEntry.path);
    const pageBytes = await readFile(pagePath);
    const destPath = join(stageDir, `pages/${pageEntry.id}${extname(pageEntry.path)}`);
    await mkdir(dirname(destPath), { recursive: true });
    await writeFile(destPath, pageBytes);
    const hash = computeSha256(pageBytes);
    outputFiles.push({ path: `pages/${pageEntry.id}${extname(pageEntry.path)}`, sha256: hash });
  }

  // 7. Export allowlisted assets. A listed asset must be either copied with an
  // exact byte-for-byte hash or explicitly rejected; the shared passive-asset
  // policy is consulted by both manifest validation and the exporter, so an
  // allowed type is never silently skipped while still counted as an asset.
  for (const manifestAsset of loaded.manifest.assets) {
    const assetPath = join(root, manifestAsset.path);
    const assetBytes = await readFile(assetPath);

    // Verify the hash matches the manifest
    const expectedHash = manifestAsset.sha256;
    const actualHash = computeSha256(assetBytes);
    if (actualHash !== expectedHash) {
      throw new ContractError([
        error(
          "ASSET_HASH_MISMATCH",
          `Asset hash mismatch for ${manifestAsset.path}: expected ${expectedHash}, got ${actualHash}`,
          manifestAsset.path,
        ),
      ]);
    }

    const assetId = manifestAsset.id;

    // Check if this asset is a local artifact for a source with unresolved rights
    let shouldExport = true;
    for (const record of loaded.records.values()) {
      if (record.kind === "source") {
        if (record.rights === "rights-unresolved" && record.localArtifact) {
          if (record.localArtifact.path === manifestAsset.path) {
            shouldExport = false;
            break;
          }
        }
      }
    }

    if (!isAllowedPassiveAsset(manifestAsset.path)) {
      throw new ContractError([
        error(
          "ASSET_UNSAFE_TYPE",
          `Publication asset ${manifestAsset.path} is not an allowed passive file type and cannot be exported.`,
          manifestAsset.path,
        ),
      ]);
    }

    if (shouldExport) {
      const destPath = join(stageDir, `assets/${assetId}${extname(manifestAsset.path)}`);
      await mkdir(dirname(destPath), { recursive: true });
      await writeFile(destPath, assetBytes);
      const hash = computeSha256(assetBytes);
      assetHashes.set(assetId, hash);
      outputFiles.push({ path: `assets/${assetId}${extname(manifestAsset.path)}`, sha256: hash });
    }
  }

  // 8. Write deterministic JSON data files and record their hashes
  const recordsArray = Array.from(loaded.records.entries()).sort((a: [string, unknown], b: [string, unknown]) => a[0].localeCompare(b[0]));
  const recordsHash = await writeSortedJson(join(stageDir, "records.json"), recordsArray);
  outputFiles.push({ path: "records.json", sha256: recordsHash });

  const sortedRelationships = [...relationships].sort((a: Relationship, b: Relationship) => {
    const aKey = `${a.fromId}:${a.field}:${a.toId}`;
    const bKey = `${b.fromId}:${b.field}:${b.toId}`;
    return aKey.localeCompare(bKey);
  });
  const relationshipsHash = await writeSortedJson(join(stageDir, "relationships.json"), sortedRelationships);
  outputFiles.push({ path: "relationships.json", sha256: relationshipsHash });

  const sortedBacklinks = [...backlinks].sort((a: Backlink, b: Backlink) => {
    const aKey = `${a.targetId}:${a.sourceId}:${a.field}`;
    const bKey = `${b.targetId}:${b.sourceId}:${b.field}`;
    return aKey.localeCompare(bKey);
  });
  const backlinksHash = await writeSortedJson(join(stageDir, "backlinks.json"), sortedBacklinks);
  outputFiles.push({ path: "backlinks.json", sha256: backlinksHash });

  const glossaryHash = await writeSortedJson(join(stageDir, "glossary.json"), glossary);
  outputFiles.push({ path: "glossary.json", sha256: glossaryHash });

  // Sort outputFiles by path for deterministic ordering
  outputFiles.sort((a: OutputFile, b: OutputFile) => a.path.localeCompare(b.path));

  // 9. Compute input hashes hash (hash of sorted input manifest hashes)
  const inputHashesHash = computeSha256(new TextEncoder().encode(JSON.stringify(inputManifestHashes)));

  // 10. Write bundle-manifest.json last (its own hash is NOT included in outputFiles)
  const bundleManifest = {
    schemaVersion: BUNDLE_MANIFEST_SCHEMA_VERSION,
    publicationVersion: loaded.manifest.publicationVersion,
    inputManifestHashes,
    inputHashesHash,
    outputFiles: outputFiles.map((f) => ({ path: f.path, sha256: f.sha256 })),
  };
  await writeSortedJson(join(stageDir, "bundle-manifest.json"), bundleManifest);

  // 11. Verify stage closure: actual files must match exactly what bundle-manifest.json lists + bundle-manifest.json itself
  const expectedFiles = new Set<string>();
  for (const f of bundleManifest.outputFiles) {
    expectedFiles.add(f.path);
  }
  expectedFiles.add("bundle-manifest.json");

  const actualFiles = new Set<string>();
  const allStageFiles = await readdirRecursive(stageDir);
  for (const fullPath of allStageFiles) {
    const relativePath = relative(stageDir, fullPath).replace(/\\/g, "/");
    actualFiles.add(relativePath);
  }

  if (actualFiles.size !== expectedFiles.size) {
    throw new ContractError([
      error(
        "STAGE_CLOSURE_MISMATCH",
        `Stage closure mismatch: expected ${expectedFiles.size} files, found ${actualFiles.size}`,
      ),
    ]);
  }
  for (const f of expectedFiles) {
    if (!actualFiles.has(f)) {
      throw new ContractError([
        error(
          "STAGE_CLOSURE_MISMATCH",
          `Stage closure mismatch: missing file ${f}`,
        ),
      ]);
    }
  }

  return { outputFiles, assetHashes, loaded };
}

/**
 * Promotes a completed stage directory over the live output directory as a
 * single rollback-safe transaction.
 *
 * The previous output, if any, is first moved to a unique sibling backup. The
 * stage is then promoted in its place, and the backup is removed only after
 * promotion succeeds. If promotion fails at any point the backup is restored
 * over the (possibly partial) output and the stage is removed, so a failed
 * promotion can never leave a partial bundle in place of a valid one.
 *
 * `renamePath` is injected only for testing; production uses `rename`.
 */
export async function replaceOutputDirectory(
  outputDir: string,
  stageDir: string,
  renamePath: (source: string, destination: string) => Promise<void> = rename,
): Promise<void> {
  const backupDir = `${outputDir}.backup-${createHash("sha256")
    .update(outputDir)
    .update(String(process.pid))
    .digest("hex")
    .slice(0, 8)}`;

  let backupCreated = false;
  try {
    if (await stat(outputDir).then(() => true, () => false)) {
      await renamePath(outputDir, backupDir);
      backupCreated = true;
    }
    // When no output exists yet, promote the stage directly: pre-creating the
    // target would make the rename land on an existing directory, which
    // Windows rejects with EPERM (and POSIX only tolerates when empty).

    await renamePath(stageDir, outputDir);

    if (backupCreated) {
      await rm(backupDir, { recursive: true, force: true });
    }
  } catch (caught) {
    if (backupCreated && (await stat(backupDir).then(() => true, () => false))) {
      await rm(outputDir, { recursive: true, force: true });
      await renamePath(backupDir, outputDir);
    }
    await rm(stageDir, { recursive: true, force: true });
    throw caught;
  }
}

export async function exportPublication(options: ExportOptions): Promise<ExportSummary> {
  const { root, output, rubricsPath, renamePath } = options;

  // Check for symlink escape and unsafe Markdown before any output
  const loaded = await loadAndValidateManifest(root);

  const rubricsYaml = await readFile(rubricsPath, "utf8");
  const rubricsResult = RubricCatalogSchema.safeParse(parse(rubricsYaml));
  if (!rubricsResult.success) {
    throw new ContractError([
      error(
        "RUBRICS_INVALID",
        `The rubrics catalog does not match RubricCatalogSchema: ${rubricsResult.error.message}`,
        rubricsPath,
      ),
    ]);
  }
  const semanticResult = validatePublicationSemantics(loaded, rubricsResult.data);
  const semanticErrors = semanticResult.diagnostics.filter(
    (diagnostic) => diagnostic.severity === "error",
  );
  if (semanticErrors.length > 0) {
    throw new ContractError(semanticErrors);
  }

  // Check for symlink escape: ensure no manifest-listed path is a symlink escaping root
  const rootReal = await stat(root).then(() => root, () => { throw new Error(`Publication root not found: ${root}`); });
  const rootRealPath = await (await import("node:fs/promises")).realpath(rootReal);

  for (const entry of [...loaded.manifest.records, ...loaded.manifest.pages, ...loaded.manifest.assets]) {
    const entryPath = join(root, entry.path);
    const entryRealPath = await (await import("node:fs/promises")).realpath(entryPath).catch(() => null);
    if (entryRealPath && !entryRealPath.startsWith(rootRealPath)) {
      throw new ContractError([
        error(
          "SYMLINK_ESCAPE",
          `Symlink escape detected: ${entry.path} resolves to ${entryRealPath}`,
          entry.path,
        ),
      ]);
    }
  }

  // Check for unsafe Markdown in pages (already validated by semantic-validation.ts but double-check)
  // This is handled by validatePublicationSemantics which is called by loadAndValidateManifest

  // Use a staging directory for atomic output (sibling of output, not inside it)
  const stageDir = join(dirname(output), ".export-stage-" + createHash("sha256").update(Date.now().toString()).digest("hex").slice(0, 8));
  await mkdir(stageDir, { recursive: true });

  let stageCleaned = false;
  try {
    const { outputFiles, loaded: stagedLoaded } = await stageDirectory(root, stageDir, rubricsPath);
    await replaceOutputDirectory(output, stageDir, renamePath ?? rename);
    stageCleaned = true;

    return {
      publicationVersion: stagedLoaded.manifest.publicationVersion,
      recordCount: stagedLoaded.records.size,
      pageCount: stagedLoaded.manifest.pages.length,
      assetCount: stagedLoaded.manifest.assets.length,
      outputFiles,
    };
  } catch (caught) {
    // Failed export: clean up stage directory, preserve existing output
    if (!stageCleaned) {
      await rm(stageDir, { recursive: true, force: true });
    }
    throw caught;
  }
}
