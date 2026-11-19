// Builds the deployable artifact: the built site, the exported bundle's manifest, and a
// content-addressed manifest of every file inside it.
//
// The artifact hash is the SHA-256 of the artifact manifest file. Because the manifest
// lists every file with its own hash, the hash identifies the artifact exactly: any
// changed byte, any added file and any removed file changes it.
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

export const ARTIFACT_MANIFEST_NAME = "artifact-manifest.json";

/**
 * The reader site root: the directory that holds `dist/` and the staged bundle.
 *
 * The packaging command resolves its source from this script's own location, so it
 * reads the site it just built no matter which directory it is invoked from.
 */
export function defaultSourceDir(): string {
  return path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
}

/**
 * Locates the exported bundle manifest inside a source tree.
 *
 * The manifest sits at the root of the exported bundle and is staged at
 * `src/content/bundle/bundle-manifest.json`. Prefer the staged bundle that actually
 * fed the reader build. A source
 * with neither is refused, because an artifact without its bundle manifest would
 * not describe the content it serves.
 */
export function resolveBundleManifestPath(sourceDir: string): string {
  const candidates = [
    path.join(sourceDir, "src", "content", "bundle", "bundle-manifest.json"),
    path.join(sourceDir, "bundle-manifest.json"),
  ];
  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) {
      return candidate;
    }
  }
  throw new Error(
    `No bundle manifest found under ${sourceDir}. Expected bundle-manifest.json or src/content/bundle/bundle-manifest.json.`,
  );
}

/** Build metadata must name the publication version of the bytes being packaged. */
export function readPublicationVersion(sourceDir: string, expected?: string): string {
  const data = JSON.parse(fs.readFileSync(resolveBundleManifestPath(sourceDir), "utf8"));
  const version: unknown = data.publicationVersion;
  if (typeof version !== "string" || version.trim() === "") {
    throw new Error("Bundle manifest has no publication version");
  }
  if (expected !== undefined && expected !== version) {
    throw new Error(`Expected publication version ${expected}; the staged bundle is ${version}`);
  }
  return version;
}

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
  const distDir = path.join(sourceDir, "dist");
  if (!fs.existsSync(distDir)) {
    throw new Error(
      `No built site found at ${distDir}. Run the site build before packaging the artifact.`,
    );
  }
  fs.cpSync(distDir, path.join(targetDir, "site"), { recursive: true });
  fs.copyFileSync(
    resolveBundleManifestPath(sourceDir),
    path.join(targetDir, "bundle-manifest.json"),
  );
  const manifest = buildArtifactManifest(targetDir, metadata);
  fs.writeFileSync(path.join(targetDir, ARTIFACT_MANIFEST_NAME), serializeArtifactManifest(manifest));
  return manifest;
}

if (import.meta.filename === process.argv[1]) {
  const [sourceArg, targetDir = "artifact"] = process.argv.slice(2);
  const sourceDir = sourceArg === undefined ? defaultSourceDir() : path.resolve(process.cwd(), sourceArg);
  const publicationVersion = readPublicationVersion(sourceDir, process.env.PUBLICATION_VERSION);
  const sourceCommit = process.env.SOURCE_COMMIT ?? "unknown";
  const manifest = buildArtifact(sourceDir, targetDir, { publicationVersion, sourceCommit });
  console.log(
    `ARTIFACT version=${manifest.publicationVersion} commit=${manifest.sourceCommit} files=${manifest.files.length} sha256=${artifactManifestHash(manifest)}`,
  );
}
