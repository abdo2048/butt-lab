import { readFile, realpath } from "node:fs/promises";
import { extname, isAbsolute, win32 } from "node:path";

import { ContractError, error } from "./diagnostics.ts";
import {
  loadYaml,
  loadYamlText,
  sha256Bytes,
} from "./load.ts";
import {
  ContentRecordSchema,
  PublicationManifestSchema,
} from "./model/index.ts";
import type {
  ContentRecord,
  PublicationManifest,
} from "./model/index.ts";
import {
  assertNoRawHtml,
  assertRecordNamespace,
  resolvePublicPath,
} from "./path-policy.ts";

export type LoadedPublication = Readonly<{
  root: string;
  manifest: PublicationManifest;
  records: ReadonlyMap<string, ContentRecord>;
  pages: ReadonlyMap<string, string>;
  assets: ReadonlyMap<string, Uint8Array>;
}>;

type ManifestSection = "records" | "pages" | "assets";

type ListedEntry = Readonly<{
  section: ManifestSection;
  id: string;
  path: string;
  sha256: string;
}>;

const PASSIVE_ASSET_EXTENSIONS = new Set([
  ".pdf",
  ".png",
  ".jpg",
  ".jpeg",
  ".gif",
  ".webp",
  ".avif",
  ".bmp",
  ".tif",
  ".tiff",
  ".txt",
  ".csv",
  ".tsv",
  ".json",
]);

/**
 * The single source of truth for which passive asset file types a publication
 * may list and export. Both manifest validation and the exporter consult this
 * set, so a listed asset is either copied with an exact byte-for-byte hash or
 * explicitly rejected; it is never silently skipped while still counted.
 */
export function isAllowedPassiveAsset(path: string): boolean {
  return PASSIVE_ASSET_EXTENSIONS.has(extname(path).toLowerCase());
}

class SnapshotByteMap implements ReadonlyMap<string, Uint8Array> {
  readonly #snapshots: ReadonlyMap<string, Uint8Array>;

  constructor(entries: Iterable<readonly [string, Uint8Array]>) {
    this.#snapshots = new Map(
      [...entries].map(([key, bytes]) => [key, Uint8Array.from(bytes)]),
    );
  }

  get size(): number {
    return this.#snapshots.size;
  }

  get(key: string): Uint8Array | undefined {
    const bytes = this.#snapshots.get(key);
    return bytes === undefined ? undefined : Uint8Array.from(bytes);
  }

  has(key: string): boolean {
    return this.#snapshots.has(key);
  }

  entries(): MapIterator<[string, Uint8Array]> {
    return this.copy().entries();
  }

  keys(): MapIterator<string> {
    return this.#snapshots.keys();
  }

  values(): MapIterator<Uint8Array> {
    return this.copy().values();
  }

  forEach(
    callbackfn: (value: Uint8Array, key: string, map: ReadonlyMap<string, Uint8Array>) => void,
    thisArg?: unknown,
  ): void {
    for (const [key, bytes] of this.#snapshots) {
      callbackfn.call(thisArg, Uint8Array.from(bytes), key, this);
    }
  }

  [Symbol.iterator](): MapIterator<[string, Uint8Array]> {
    return this.entries();
  }

  get [Symbol.toStringTag](): string {
    return "SnapshotByteMap";
  }

  private copy(): Map<string, Uint8Array> {
    return new Map(
      [...this.#snapshots].map(([key, bytes]) => [key, Uint8Array.from(bytes)]),
    );
  }
}

function fail(code: string, message: string, path?: string): never {
  throw new ContractError([error(code, message, path)]);
}

function isFileSystemError(caught: unknown): caught is NodeJS.ErrnoException {
  return caught instanceof Error && "code" in caught;
}

function pathEscapesRoot(path: string): boolean {
  return isAbsolute(path) ||
    win32.isAbsolute(path) ||
    path.split("/").includes("..");
}

function findEscapingManifestPath(value: unknown): string | undefined {
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    return undefined;
  }

  const candidate = value as Record<string, unknown>;
  for (const section of ["records", "pages", "assets"] as const) {
    const entries = candidate[section];
    if (!Array.isArray(entries)) {
      continue;
    }
    for (const entry of entries) {
      if (entry === null || typeof entry !== "object" || Array.isArray(entry)) {
        continue;
      }
      const path = (entry as Record<string, unknown>).path;
      if (typeof path === "string" && pathEscapesRoot(path)) {
        return path;
      }
    }
  }
  return undefined;
}

function assertAllowedListedPath(path: string): void {
  const segments = path.split("/");
  if (
    segments[0] === ".github" ||
    segments[0] === ".superpowers" ||
    segments.some((segment) => segment === "session-log" || segment === "session-log.md")
  ) {
    fail(
      "PATH_FORBIDDEN",
      "Internal planning, CI configuration and session-log paths may not be publication inputs.",
      path,
    );
  }
}

function canonicalPathIdentity(path: string): string {
  return process.platform === "win32" ? path.toLowerCase() : path;
}

function assertPassiveAssetPath(path: string): void {
  if (!isAllowedPassiveAsset(path)) {
    fail(
      "ASSET_UNSAFE_TYPE",
      "Publication assets must use an explicitly allowed passive file type.",
      path,
    );
  }
}

async function resolveListedPath(root: string, path: string): Promise<string> {
  try {
    return await resolvePublicPath(root, path);
  } catch (caught) {
    if (caught instanceof ContractError) {
      throw caught;
    }
    if (isFileSystemError(caught) && caught.code === "ENOENT") {
      fail("MANIFEST_FILE_MISSING", "A manifest-listed file does not exist.", path);
    }
    fail("MANIFEST_FILE_UNREADABLE", "A manifest-listed file could not be read.", path);
  }
}

async function loadListedYaml(path: string): Promise<unknown> {
  try {
    return await loadYaml(path);
  } catch (caught) {
    if (caught instanceof ContractError) {
      throw caught;
    }
    if (isFileSystemError(caught) && caught.code === "ENOENT") {
      fail("MANIFEST_FILE_MISSING", "A manifest-listed file does not exist.", path);
    }
    fail("MANIFEST_FILE_UNREADABLE", "A manifest-listed file could not be read.", path);
  }
}

async function captureListedFile(path: string): Promise<Uint8Array> {
  try {
    return await readFile(path);
  } catch (caught) {
    if (isFileSystemError(caught) && caught.code === "ENOENT") {
      fail("MANIFEST_FILE_MISSING", "A manifest-listed file does not exist.", path);
    }
    fail("MANIFEST_FILE_UNREADABLE", "A manifest-listed file could not be read.", path);
  }
}

export async function loadAndValidateManifest(
  root: string,
): Promise<LoadedPublication> {
  const manifestPath = await resolveListedPath(root, "manifest.yaml");
  const rawManifest = await loadListedYaml(manifestPath);
  const manifestResult = PublicationManifestSchema.safeParse(rawManifest);

  if (!manifestResult.success) {
    const escapingPath = findEscapingManifestPath(rawManifest);
    if (escapingPath !== undefined) {
      fail(
        "PATH_OUTSIDE_PUBLICATION_ROOT",
        "Publication paths may not traverse outside the publication root.",
        escapingPath,
      );
    }
    fail(
      "MANIFEST_SCHEMA_INVALID",
      "manifest.yaml does not match PublicationManifestSchema.",
      manifestPath,
    );
  }

  const manifest = manifestResult.data;
  const entries: ListedEntry[] = [
    ...manifest.records.map((entry) => ({ section: "records" as const, ...entry })),
    ...manifest.pages.map((entry) => ({ section: "pages" as const, ...entry })),
    ...manifest.assets.map((entry) => ({ section: "assets" as const, ...entry })),
  ];

  const ids = new Set<string>();
  for (const entry of entries) {
    if (ids.has(entry.id)) {
      fail(
        "MANIFEST_DUPLICATE_ID",
        `Manifest ID ${entry.id} appears more than once.`,
        entry.path,
      );
    }
    ids.add(entry.id);
  }

  const paths = new Set<string>();
  for (const entry of entries) {
    if (paths.has(entry.path)) {
      fail(
        "MANIFEST_DUPLICATE_PATH",
        `Manifest path ${entry.path} appears more than once.`,
        entry.path,
      );
    }
    paths.add(entry.path);
  }

  const capturedFiles = new Map<string, Uint8Array>();
  const canonicalPaths = new Set<string>();
  for (const entry of entries) {
    assertAllowedListedPath(entry.path);
    if (entry.section === "assets") {
      assertPassiveAssetPath(entry.path);
    }
    const resolvedPath = await resolveListedPath(root, entry.path);
    const canonicalPath = canonicalPathIdentity(resolvedPath);
    if (canonicalPaths.has(canonicalPath)) {
      fail(
        "MANIFEST_DUPLICATE_PATH",
        `Manifest path ${entry.path} resolves to a file already listed.`,
        entry.path,
      );
    }
    canonicalPaths.add(canonicalPath);
    const captured = await captureListedFile(resolvedPath);
    const actualHash = sha256Bytes(captured);
    if (actualHash !== entry.sha256) {
      fail(
        "MANIFEST_HASH_MISMATCH",
        `Manifest SHA-256 does not match ${entry.path}.`,
        entry.path,
      );
    }
    capturedFiles.set(entry.path, captured);
  }

  const records = new Map<string, ContentRecord>();
  for (const entry of manifest.records) {
    const captured = capturedFiles.get(entry.path);
    if (captured === undefined) {
      fail("MANIFEST_FILE_MISSING", "A manifest-listed record was not resolved.", entry.path);
    }
    const recordResult = ContentRecordSchema.safeParse(
      loadYamlText(new TextDecoder().decode(captured), entry.path),
    );
    if (!recordResult.success) {
      fail(
        "RECORD_SCHEMA_INVALID",
        "A manifest-listed record does not match ContentRecordSchema.",
        entry.path,
      );
    }
    const record = recordResult.data;
    if (record.id !== entry.id) {
      fail(
        "MANIFEST_RECORD_ID_MISMATCH",
        `Manifest ID ${entry.id} does not match record ID ${record.id}.`,
        entry.path,
      );
    }
    assertRecordNamespace(record.kind, record.id, entry.path);
    if (record.publicationState !== "approved") {
      fail(
        "RECORD_NOT_APPROVED",
        `Manifest-listed record ${record.id} is not approved.`,
        entry.path,
      );
    }
    records.set(entry.id, record);
  }

  const pages = new Map<string, string>();
  for (const entry of manifest.pages) {
    const captured = capturedFiles.get(entry.path);
    if (captured === undefined) {
      fail("MANIFEST_FILE_MISSING", "A manifest-listed page was not resolved.", entry.path);
    }
    const markdown = new TextDecoder().decode(captured);
    assertNoRawHtml(markdown);
    pages.set(entry.id, markdown);
  }

  const assetEntries: Array<readonly [string, Uint8Array]> = [];
  for (const entry of manifest.assets) {
    const captured = capturedFiles.get(entry.path);
    if (captured === undefined) {
      fail("MANIFEST_FILE_MISSING", "A manifest-listed asset was not resolved.", entry.path);
    }
    assetEntries.push([entry.id, captured]);
  }
  const assets = new SnapshotByteMap(assetEntries);

  return {
    root: await realpath(root),
    manifest,
    records,
    pages,
    assets,
  };
}
