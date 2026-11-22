import { documentIdForRecord, findDocument, MAX_STATIC_PDF_BYTES } from "./documents.ts";

/**
 * A download offer, or nothing when the shelf holds no file for this record.
 *
 * The licence, rights and checksum gates that used to sit here are gone: the
 * shelf is the operator's own working corpus, shared with the research team,
 * and a record either has a document on the shelf or it does not.
 */
export function sourcePdf(source: { id: string }) {
  const documentId = documentIdForRecord(source.id);
  if (!documentId) return;
  const entry = findDocument(documentId);
  if (!entry) return;
  const filename = `${documentId}.pdf`;
  return {
    documentId,
    filename,
    url: `/documents/${documentId}.pdf`,
    bytes: entry.bytes,
    oversized: entry.bytes > MAX_STATIC_PDF_BYTES,
    hasText: entry.hasText,
  };
}

export { MAX_STATIC_PDF_BYTES } from "./documents.ts";
