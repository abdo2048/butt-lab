import { documentIdForRecord, findDocument, MAX_STATIC_PDF_BYTES, remoteDocument } from "./documents.ts";

/**
 * A download offer, or nothing when the shelf holds no file for this record.
 *
 * The licence, rights and checksum gates that used to sit here are gone: the
 * shelf is the operator's own working corpus, shared with the research team,
 * and a record either has a document on the shelf or it does not.
 *
 * A document too large for the host is linked at the repository instead of
 * being served from the site, so `remote` is true and the URL leaves the
 * domain.
 */
export function sourcePdf(source: { id: string }) {
  const documentId = documentIdForRecord(source.id);
  if (!documentId) return;
  const entry = findDocument(documentId);
  if (!entry) return;
  const filename = `${documentId}.pdf`;
  const remote = remoteDocument(documentId);
  return {
    documentId,
    filename,
    url: remote ? remote.url : `/documents/${documentId}.pdf`,
    remote: Boolean(remote),
    bytes: entry.bytes,
    oversized: entry.bytes > MAX_STATIC_PDF_BYTES,
    hasText: entry.hasText,
  };
}

export { MAX_STATIC_PDF_BYTES } from "./documents.ts";
