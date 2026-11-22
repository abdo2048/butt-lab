import type { APIRoute } from "astro";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { documentsDirectory, findDocument, listDocuments, MAX_STATIC_PDF_BYTES } from "../../lib/documents.ts";

/**
 * Serve the document shelf.
 *
 * One static route per `sources/<id>/document.pdf`. No checksum comparison and
 * no manifest lookup: the file on the shelf is the file served. A missing file
 * fails the build rather than silently producing a dead link.
 */

export function getStaticPaths() {
  return listDocuments().map(({ id, bytes }) => {
    if (bytes > MAX_STATIC_PDF_BYTES) {
      console.warn(`[documents] ${id} is ${(bytes / 1048576).toFixed(1)} MB and exceeds the 25 MiB static asset limit`);
    }
    return { params: { id }, props: { id } };
  });
}

export const GET: APIRoute<{ id: string }> = async ({ props: { id } }) => {
  if (!findDocument(id)) throw new Error(`Unknown document: ${id}`);
  const bytes = await readFile(join(documentsDirectory(), id, "document.pdf"));
  if (bytes.toString("ascii", 0, 5) !== "%PDF-") throw new Error(`Not a PDF: ${id}`);
  return new Response(Uint8Array.from(bytes), {
    headers: { "Content-Type": "application/pdf" },
  });
};
