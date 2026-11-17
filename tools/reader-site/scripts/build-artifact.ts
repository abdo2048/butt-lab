// Builds the deployable artifact: the built site, the exported bundle's manifest, and a
// content-addressed manifest of every file inside it.
//
// The artifact hash is the SHA-256 of the artifact manifest file. Because the manifest
// lists every file with its own hash, the hash identifies the artifact exactly: any
// changed byte, any added file and any removed file changes it.
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

export const ARTIFACT_MANIFEST_NAME = "artifact-manifest.json";

export interface ArtifactFile {
  path: string;
  sha256: string;
}

export interface ArtifactManifest {
  schemaVersion: number;
  publicationVersion: string;
  sourceCommit: string;
  files: ArtifactFile[];
}

export interface ArtifactMetadata {
  publicationVersion: string;
  sourceCommit: string;
}

export function sha256Hex(bytes: Buffer | string): string {
  return crypto.createHash("sha256").update(bytes).digest("hex");
}

function listFiles(root: string, current = root): string[] {
  const found: string[] = [];
  for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
    const absolute = path.join(current, entry.name);
    if (entry.isDirectory()) {
      found.push(...listFiles(root, absolute));
    } else if (entry.isFile()) {
      const relative = path.relative(root, absolute).split(path.sep).join("/");
      if (relative !== ARTIFACT_MANIFEST_NAME) {
        found.push(relative);
      }
    }
  }
  return found;
}

export function buildArtifactManifest(root: string, metadata: ArtifactMetadata): ArtifactManifest {
  const files = listFiles(root)
    .sort((left, right) => left.localeCompare(right))
    .map((relative) => ({
      path: relative,
      sha256: sha256Hex(fs.readFileSync(path.join(root, relative))),
    }));
  return {
    schemaVersion: 1,
    publicationVersion: metadata.publicationVersion,
    sourceCommit: metadata.sourceCommit,
    files,
  };
}

export function serializeArtifactManifest(manifest: ArtifactManifest): string {
  return JSON.stringify({
    schemaVersion: manifest.schemaVersion,
    publicationVersion: manifest.publicationVersion,
    sourceCommit: manifest.sourceCommit,
    files: manifest.files,
  });
}

export function artifactManifestHash(manifest: ArtifactManifest): string {
  return sha256Hex(serializeArtifactManifest(manifest));
}

export function readArtifactManifest(root: string): ArtifactManifest {
  const raw = fs.readFileSync(path.join(root, ARTIFACT_MANIFEST_NAME), "utf8");
  return JSON.parse(raw) as ArtifactManifest;
}

// Copies the built site and the bundle manifest into the artifact directory and writes
// the artifact manifest next to them.
export function buildArtifact(
  sourceDir: string,
  targetDir: string,
  metadata: ArtifactMetadata,
): ArtifactManifest {
  fs.rmSync(targetDir, { recursive: true, force: true });
  fs.mkdirSync(targetDir, { recursive: true });
  fs.cpSync(path.join(sourceDir, "dist"), path.join(targetDir, "site"), { recursive: true });
  fs.copyFileSync(
    path.join(sourceDir, "bundle-manifest.json"),
    path.join(targetDir, "bundle-manifest.json"),
  );
  const manifest = buildArtifactManifest(targetDir, metadata);
  fs.writeFileSync(path.join(targetDir, ARTIFACT_MANIFEST_NAME), serializeArtifactManifest(manifest));
  return manifest;
}

if (import.meta.filename === process.argv[1]) {
  const [sourceDir = ".", targetDir = "artifact"] = process.argv.slice(2);
  const publicationVersion = process.env.PUBLICATION_VERSION ?? "unknown";
  const sourceCommit = process.env.SOURCE_COMMIT ?? "unknown";
  const manifest = buildArtifact(sourceDir, targetDir, { publicationVersion, sourceCommit });
  console.log(
    `ARTIFACT version=${manifest.publicationVersion} commit=${manifest.sourceCommit} files=${manifest.files.length} sha256=${artifactManifestHash(manifest)}`,
  );
}
