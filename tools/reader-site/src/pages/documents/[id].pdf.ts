import type { APIRoute } from "astro";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { defaultBundleDirectory, getBundle, recordsOfKind } from "../../lib/bundle.ts";
import { MAX_STATIC_PDF_BYTES, sourcePdf } from "../../lib/source-pdf.ts";

type SourcePdf = NonNullable<ReturnType<typeof sourcePdf>>;

export function getStaticPaths() {
  const bundle = getBundle();
  return recordsOfKind(bundle, "source").flatMap((source) => {
    const pdf = sourcePdf(source);
    if (!pdf) return [];
    if (!bundle.manifest.outputFiles.some(({ path, sha256 }) => path === pdf.bundlePath && sha256 === pdf.sha256)) {
      throw new Error(`No matching staged PDF for ${source.id}`);
    }
    return [{ params: { id: source.id }, props: { pdf } }];
  });
}

export const GET: APIRoute<{ pdf: SourcePdf }> = async ({ props: { pdf } }) => {
  const bytes = await readFile(join(defaultBundleDirectory(), pdf.bundlePath));
  if (
    bytes.toString("ascii", 0, 5) !== "%PDF-" || bytes.length > MAX_STATIC_PDF_BYTES ||
    createHash("sha256").update(bytes).digest("hex") !== pdf.sha256
  ) throw new Error(`Invalid static PDF: ${pdf.filename}`);
  return new Response(Uint8Array.from(bytes), { headers: { "Content-Type": "application/pdf" } });
};
