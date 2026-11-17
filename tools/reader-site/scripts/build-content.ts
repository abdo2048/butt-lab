import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

export interface BundleFile {
  path: string;
  sha256: string;
}

export interface BundleManifest {
  schemaVersion: number;
  publicationVersion: string;
  outputFiles: BundleFile[];
}

export const MANIFEST_NAME = "bundle-manifest.json";

function sha256(bytes: Buffer): string {
  return createHash("sha256").update(bytes).digest("hex");
}

function toPosix(relativePath: string): string {
  return relativePath.split(path.sep).join("/");
}

function listFilesRecursive(root: string, prefix = ""): string[] {
  const found: string[] = [];
  const entries = fs.readdirSync(path.join(root, prefix), { withFileTypes: true });
  for (const entry of entries) {
    const relative = prefix === "" ? entry.name : `${prefix}/${entry.name}`;
    if (entry.isDirectory()) {
      found.push(...listFilesRecursive(root, relative));
    } else if (entry.isFile()) {
      found.push(relative);
    }
  }
  return found;
}

function resolveInside(root: string, relativePath: string): string {
  const resolvedRoot = path.resolve(root);
  const resolved = path.resolve(resolvedRoot, relativePath);
  if (resolved !== resolvedRoot && !resolved.startsWith(resolvedRoot + path.sep)) {
    throw new Error(`BUNDLE_PATH_ESCAPE: ${relativePath} resolves outside the bundle directory`);
  }
  return resolved;
}

/**
 * Verifies an exported publication bundle against its own manifest.
 *
 * Every file the manifest lists must exist and still hash to the recorded value, and
 * the directory must contain nothing the manifest does not list. The manifest file
 * itself is not listed in its own `outputFiles`, so it is exempt from the orphan check.
 */
export function verifyBundle(sourceDir: string): BundleManifest {
  const manifestPath = path.join(sourceDir, MANIFEST_NAME);
  if (!fs.existsSync(manifestPath)) {
    throw new Error(`BUNDLE_MANIFEST_MISSING: ${MANIFEST_NAME} was not found in ${sourceDir}`);
  }

  let manifest: BundleManifest;
  try {
    manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8")) as BundleManifest;
  } catch (error) {
    throw new Error(`BUNDLE_MANIFEST_UNREADABLE: ${MANIFEST_NAME} could not be parsed as JSON`);
  }

  if (!Array.isArray(manifest.outputFiles)) {
    throw new Error("BUNDLE_MANIFEST_INVALID: outputFiles is missing or not an array");
  }

  const listed = new Set<string>();
  for (const file of manifest.outputFiles) {
    listed.add(file.path);
    const target = resolveInside(sourceDir, file.path);
    if (!fs.existsSync(target)) {
      throw new Error(`BUNDLE_FILE_MISSING: ${file.path} is listed in the manifest but not present`);
    }
    const actual = sha256(fs.readFileSync(target));
    if (actual !== file.sha256) {
      throw new Error(
        `BUNDLE_HASH_MISMATCH: ${file.path} expected sha256 ${file.sha256} but the bytes hash to ${actual}`,
      );
    }
  }

  for (const relative of listFilesRecursive(sourceDir)) {
    if (relative === MANIFEST_NAME) {
      continue;
    }
    if (!listed.has(relative)) {
      throw new Error(`BUNDLE_FILE_NOT_IN_MANIFEST: ${relative} is present in the bundle but not listed`);
    }
  }

  return manifest;
}

/**
 * Verifies a bundle and copies it into the target directory.
 *
 * The copy is built in a temporary sibling directory and swapped into place only after
 * every file has been written, so a failed verification never leaves a partial or
 * stale staging behind.
 */
export function stageBundle(sourceDir: string, targetDir: string): BundleManifest {
  const manifest = verifyBundle(sourceDir);
  const resolvedTarget = path.resolve(targetDir);
  const temporary = path.join(
    path.dirname(resolvedTarget),
    `.${path.basename(resolvedTarget)}.staging-${process.pid}-${Date.now()}`,
  );

  fs.rmSync(temporary, { recursive: true, force: true });
  fs.mkdirSync(temporary, { recursive: true });
  try {
    for (const file of manifest.outputFiles) {
      const source = resolveInside(sourceDir, file.path);
      const destination = path.join(temporary, ...file.path.split("/"));
      fs.mkdirSync(path.dirname(destination), { recursive: true });
      fs.copyFileSync(source, destination);
    }
    fs.writeFileSync(
      path.join(temporary, MANIFEST_NAME),
      fs.readFileSync(path.join(sourceDir, MANIFEST_NAME)),
    );
    fs.rmSync(resolvedTarget, { recursive: true, force: true });
    fs.mkdirSync(path.dirname(resolvedTarget), { recursive: true });
    fs.renameSync(temporary, resolvedTarget);
  } catch (error) {
    fs.rmSync(temporary, { recursive: true, force: true });
    throw error;
  }

  return manifest;
}

function defaultPaths(): { sourceDir: string; targetDir: string } {
  const scriptDir = path.dirname(fileURLToPath(import.meta.url));
  const packageRoot = path.resolve(scriptDir, "..");
  return {
    sourceDir: path.resolve(packageRoot, "..", "..", ".publication-build"),
    targetDir: path.join(packageRoot, "src", "content", "bundle"),
  };
}

function main(): void {
  const defaults = defaultPaths();
  const sourceDir = process.argv[2] ?? defaults.sourceDir;
  const targetDir = process.argv[3] ?? defaults.targetDir;
  const manifest = stageBundle(sourceDir, targetDir);
  console.log(
    `STAGED version=${manifest.publicationVersion} files=${manifest.outputFiles.length} target=${path.basename(targetDir)}`,
  );
}

const invokedPath = process.argv[1];
if (invokedPath !== undefined && import.meta.url === pathToFileURL(invokedPath).href) {
  main();
}
