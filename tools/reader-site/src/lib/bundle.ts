import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import type {
  Backlink,
  BundleData,
  BundleManifest,
  BundlePage,
  BundleRecord,
  Relationship,
} from "./types.ts";

/**
 * Loader for the exported publication bundle.
 *
 * The reader app reads the bundle and nothing else: no source YAML, no registry,
 * no workflow state. The bundle is the allowlist - if a record is not in it, the
 * site cannot show it.
 */

const REQUIRED_FILES = [
  "records.json",
  "glossary.json",
  "relationships.json",
  "backlinks.json",
  "bundle-manifest.json",
];

function readText(rootDir: string, name: string): string {
  const file = path.join(rootDir, name);
  if (!fs.existsSync(file)) {
    throw new Error(`BUNDLE_FILE_MISSING: ${name} is not present in ${rootDir}`);
  }
  return fs.readFileSync(file, "utf8");
}

function readJson(rootDir: string, name: string): unknown {
  const text = readText(rootDir, name);
  try {
    return JSON.parse(text);
  } catch (error) {
    throw new Error(`BUNDLE_FILE_UNREADABLE: ${name} is not valid JSON (${String(error)})`);
  }
}

export function loadBundle(rootDir: string): BundleData {
  for (const name of REQUIRED_FILES) readText(rootDir, name);

  const rawRecords = readJson(rootDir, "records.json");
  if (!Array.isArray(rawRecords)) {
    throw new Error("BUNDLE_INVALID_RECORDS: records.json must be an array of [id, record] pairs");
  }

  const records = new Map<string, BundleRecord>();
  const byKind: Record<string, string[]> = {};
  for (const entry of rawRecords) {
    if (!Array.isArray(entry) || entry.length !== 2) {
      throw new Error("BUNDLE_INVALID_RECORDS: every entry must be an [id, record] pair");
    }
    const [id, record] = entry as [string, BundleRecord];
    if (typeof id !== "string" || typeof record !== "object" || record === null) {
      throw new Error("BUNDLE_INVALID_RECORDS: every entry must carry an id and a record object");
    }
    if (records.has(id)) {
      throw new Error(`BUNDLE_DUPLICATE_RECORD_ID: ${id} appears more than once`);
    }
    records.set(id, record);
    const kind = record.kind;
    if (typeof kind === "string") {
      byKind[kind] = [...(byKind[kind] ?? []), id];
    }
  }

  const pages = new Map<string, BundlePage>();
  const pagesDir = path.join(rootDir, "pages");
  if (fs.existsSync(pagesDir)) {
    for (const file of fs.readdirSync(pagesDir).sort()) {
      if (!file.endsWith(".md")) continue;
      const id = file.slice(0, -3);
      pages.set(id, { id, markdown: fs.readFileSync(path.join(pagesDir, file), "utf8") });
    }
  }

  const glossary = readJson(rootDir, "glossary.json") as Record<string, string>;
  const relationships = readJson(rootDir, "relationships.json") as Relationship[];
  const backlinks = readJson(rootDir, "backlinks.json") as Backlink[];
  const manifest = readJson(rootDir, "bundle-manifest.json") as BundleManifest;

  return { records, byKind, pages, glossary, relationships, backlinks, manifest };
}

/** The staged bundle inside the reader app. */
export function defaultBundleDirectory(): string {
  const candidates = [
    path.resolve(process.cwd(), "src", "content", "bundle"),
    fileURLToPath(new URL("../content/bundle/", import.meta.url)),
  ];
  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) return candidate;
  }
  throw new Error(
    `BUNDLE_NOT_STAGED: no bundle found in ${candidates.join(" or ")}. Run "npm run build:content" first.`,
  );
}

let cached: BundleData | undefined;

export function getBundle(): BundleData {
  cached ??= loadBundle(defaultBundleDirectory());
  return cached;
}

export function recordsOfKind<K extends BundleRecord["kind"]>(
  bundle: BundleData,
  kind: K,
): Array<Extract<BundleRecord, { kind: K }>> {
  const ids = bundle.byKind[kind] ?? [];
  return ids
    .map((id) => bundle.records.get(id))
    .filter((record): record is Extract<BundleRecord, { kind: K }> => record?.kind === kind);
}

export function terms(bundle: BundleData): Array<Extract<BundleRecord, { kind: "term" }>> {
  return recordsOfKind(bundle, "term");
}
