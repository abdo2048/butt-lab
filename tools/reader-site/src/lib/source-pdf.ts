/** A public PDF is tied to one source, its license and the original checksum. */
export function sourcePdf(source: {
  id: string;
  rights?: unknown;
  localArtifact?: unknown;
  redistributionLicense?: unknown;
}) {
  const { id, rights, localArtifact, redistributionLicense } = source;
  if (rights !== "public-local-copy" || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id)) return;
  const path = `assets/${id}.pdf`;
  if (
    !localArtifact || typeof localArtifact !== "object" ||
    !("path" in localArtifact) || localArtifact.path !== path ||
    !("sha256" in localArtifact) || typeof localArtifact.sha256 !== "string" ||
    !/^[a-f0-9]{64}$/.test(localArtifact.sha256)
  ) return;
  if (
    !redistributionLicense || typeof redistributionLicense !== "object" ||
    !("name" in redistributionLicense) || typeof redistributionLicense.name !== "string" ||
    !redistributionLicense.name.trim() || !("url" in redistributionLicense) ||
    typeof redistributionLicense.url !== "string" || !redistributionLicense.url.startsWith("https://")
  ) return;
  const filename = `${id}.pdf`;
  return {
    filename,
    url: `/documents/${filename}`,
    bundlePath: `assets/${id}-pdf.pdf`,
    sha256: localArtifact.sha256,
    license: { name: redistributionLicense.name, url: redistributionLicense.url },
  };
}

export const MAX_STATIC_PDF_BYTES = 25 * 1024 * 1024;
