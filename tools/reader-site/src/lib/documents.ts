import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

/**
 * The document shelf.
 *
 * `sources/<id>/document.pdf` is the single copy of every paper, patent,
 * report and permit the project holds. The site serves that folder directly,
 * so adding a document to the shelf makes it downloadable without a second
 * registration step. `sources/<id>/text.md` is the machine extraction that an
 * AI reader uses; it is never served to readers.
 *
 * The PDF is what a person reads. If the text and the PDF disagree, the PDF
 * is right.
 */

export type DocumentEntry = {
  id: string;
  bytes: number;
  hasText: boolean;
};

const ID_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/** Cloudflare serves a single static asset up to 25 MiB. */
export const MAX_STATIC_PDF_BYTES = 25 * 1024 * 1024;

function hasShelf(candidate: string): boolean {
  try {
    return fs
      .readdirSync(candidate, { withFileTypes: true })
      .some(
        (entry) =>
          entry.isDirectory() &&
          ID_PATTERN.test(entry.name) &&
          fs.existsSync(path.join(candidate, entry.name, "document.pdf")),
      );
  } catch {
    return false;
  }
}

/**
 * Locate the shelf.
 *
 * A bundled build rewrites `import.meta.url`, so the path of this module is
 * not a reliable anchor. The build runs from `tools/reader-site` and the tests
 * run from the same place, but a script may run from the repository root, so
 * walk up until a folder that actually holds documents is found. The
 * `BUTT_LAB_SOURCES` override exists for anything that runs from elsewhere.
 */
function findShelf(): string {
  const override = process.env.BUTT_LAB_SOURCES;
  if (override && hasShelf(override)) return path.resolve(override);

  let dir = process.cwd();
  for (let depth = 0; depth < 5; depth += 1) {
    const candidate = path.join(dir, "sources");
    if (hasShelf(candidate)) return candidate;
    const parent = path.dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }

  return fileURLToPath(new URL("../../../../sources/", import.meta.url));
}

let resolved: string | undefined;

export function documentsDirectory(): string {
  resolved ??= findShelf();
  return resolved;
}

let cached: DocumentEntry[] | undefined;

export function listDocuments(): DocumentEntry[] {
  if (cached) return cached;
  const root = documentsDirectory();
  if (!fs.existsSync(root)) {
    cached = [];
    return cached;
  }
  const entries: DocumentEntry[] = [];
  for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
    if (!entry.isDirectory() || !ID_PATTERN.test(entry.name)) continue;
    const dir = path.join(root, entry.name);
    const pdf = path.join(dir, "document.pdf");
    if (!fs.existsSync(pdf)) continue;
    entries.push({
      id: entry.name,
      bytes: fs.statSync(pdf).size,
      hasText: fs.existsSync(path.join(dir, "text.md")),
    });
  }
  entries.sort((a, b) => a.id.localeCompare(b.id));
  cached = entries;
  return entries;
}

export function documentIds(): Set<string> {
  return new Set(listDocuments().map(({ id }) => id));
}

export function findDocument(id: string): DocumentEntry | undefined {
  return listDocuments().find((entry) => entry.id === id);
}

/**
 * Resolve a source record to the document on the shelf.
 *
 * Record ids are bibliographic (`marinello-2020-review`); shelf ids are file
 * identity (`marinello-2019-review`). The two agree for some records and
 * differ for others, so the mapping is curated data, not a guess. A record
 * with no mapped document simply has no download, which is correct: many
 * sources are link-only web pages and company pages we never downloaded.
 */
let links: Map<string, string> | undefined;

function loadLinks(): Map<string, string> {
  if (links) return links;
  links = new Map();
  const file = path.join(documentsDirectory(), "links.json");
  if (!fs.existsSync(file)) return links;
  const parsed: unknown = JSON.parse(fs.readFileSync(file, "utf8"));
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return links;
  for (const [recordId, documentId] of Object.entries(parsed as Record<string, unknown>)) {
    if (typeof documentId === "string") links.set(recordId, documentId);
  }
  return links;
}

export function documentIdForRecord(recordId: string): string | undefined {
  const mapped = loadLinks().get(recordId);
  if (mapped) return mapped;
  return findDocument(recordId) ? recordId : undefined;
}
