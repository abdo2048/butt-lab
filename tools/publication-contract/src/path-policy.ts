import { realpath } from "node:fs/promises";
import { isAbsolute, join, relative, sep, win32 } from "node:path";

import { ContractError, error } from "./diagnostics.ts";

const RECORD_DIRECTORIES: Readonly<Record<string, string>> = {
  material: "materials",
  "method-family": "methods",
  source: "sources",
  claim: "claims",
  gap: "gaps",
  hypothesis: "hypotheses",
  term: "terms",
  assessment: "assessments",
};

function fail(code: string, message: string, path?: string): never {
  throw new ContractError([error(code, message, path)]);
}

function assertNormalizedRelativePath(relativePath: string): void {
  if (isAbsolute(relativePath) || win32.isAbsolute(relativePath)) {
    fail(
      "PATH_OUTSIDE_PUBLICATION_ROOT",
      "Absolute paths are not allowed in publication content.",
      relativePath,
    );
  }

  if (relativePath.includes("\\")) {
    fail(
      "PATH_INVALID",
      "Publication paths must use forward slashes.",
      relativePath,
    );
  }

  const segments = relativePath.split("/");
  if (segments.includes("..")) {
    fail(
      "PATH_OUTSIDE_PUBLICATION_ROOT",
      "Publication paths may not traverse outside the publication root.",
      relativePath,
    );
  }

  if (
    relativePath.length === 0 ||
    segments.some((segment) => segment.length === 0 || segment === ".")
  ) {
    fail(
      "PATH_INVALID",
      "Publication paths must contain only non-empty normalized segments.",
      relativePath,
    );
  }
}

/**
 * Pure predicate form of {@link assertNormalizedRelativePath}.
 *
 * True when the path is a normalized relative path that cannot escape the
 * publication root: no absolute prefix, no backslash separator, and only
 * non-empty normalized segments.
 */
export function isNormalizedRelativePath(relativePath: string): boolean {
  if (relativePath.length === 0) {
    return false;
  }
  if (isAbsolute(relativePath) || win32.isAbsolute(relativePath)) {
    return false;
  }
  if (relativePath.includes("\\")) {
    return false;
  }
  return relativePath
    .split("/")
    .every(
      (segment) => segment.length > 0 && segment !== "." && segment !== "..",
    );
}

export async function resolvePublicPath(
  root: string,
  relativePath: string,
): Promise<string> {
  assertNormalizedRelativePath(relativePath);
  const rootRealpath = await realpath(root);
  const candidateRealpath = await realpath(join(rootRealpath, relativePath));
  return resolvePublicPathFromRealpath(rootRealpath, candidateRealpath);
}

export function resolvePublicPathFromRealpath(
  rootRealpath: string,
  candidateRealpath: string,
): string {
  const relation = relative(rootRealpath, candidateRealpath);
  if (
    relation === ".." ||
    relation.startsWith(`..${sep}`) ||
    isAbsolute(relation)
  ) {
    fail(
      "PATH_SYMLINK_ESCAPE",
      "Resolved path escapes the publication root.",
      candidateRealpath,
    );
  }

  return candidateRealpath;
}

export function assertSafePublicUrl(value: string): void {
  let url: URL;
  try {
    url = new URL(value);
  } catch {
    fail("URL_INVALID", "Public URLs must be absolute valid URLs.", value);
  }

  if (url.protocol !== "http:" && url.protocol !== "https:") {
    fail(
      "URL_UNSAFE_SCHEME",
      "Public URLs may use only HTTP or HTTPS.",
      value,
    );
  }

  if (!/^https?:\/\//.test(value)) {
    fail(
      "URL_INVALID",
      "Public URLs must include an explicit HTTP or HTTPS authority.",
      value,
    );
  }
}

function decodeSchemeCharacterReferences(value: string): string {
  return value
    .replace(
      /&#(?:x([0-9a-f]+)|([0-9]+));?/gi,
      (reference, hexadecimal: string | undefined, decimal: string | undefined) => {
        const codePoint = Number.parseInt(hexadecimal ?? decimal ?? "", hexadecimal === undefined ? 10 : 16);
        if (!Number.isFinite(codePoint) || codePoint > 0x10ffff) {
          return reference;
        }
        try {
          return String.fromCodePoint(codePoint);
        } catch {
          return reference;
        }
      },
    )
    .replace(/&colon;/gi, ":")
    .replace(/&tab;/gi, "\t")
    .replace(/&newline;/gi, "\n");
}

function normalizeCommonMarkEscapes(value: string): string {
  return value.replace(/\\([!-/:-@\[-`{-~])/g, "$1");
}

function maskRange(characters: string[], start: number, end: number): void {
  for (let index = start; index < end; index += 1) {
    if (characters[index] !== "\n" && characters[index] !== "\r") {
      characters[index] = " ";
    }
  }
}

function maskFencedCodeBlocks(markdown: string): string {
  const characters = markdown.split("");
  let fence: { marker: string; length: number } | undefined;

  for (let lineStart = 0; lineStart < characters.length;) {
    const newlineIndex = markdown.indexOf("\n", lineStart);
    const lineEnd = newlineIndex === -1 ? characters.length : newlineIndex + 1;
    const line = markdown.slice(lineStart, newlineIndex === -1 ? lineEnd : newlineIndex)
      .replace(/\r$/, "");

    if (fence === undefined) {
      const opener = /^[ ]{0,3}(`{3,}|~{3,})/.exec(line);
      if (opener?.[1] !== undefined) {
        fence = { marker: opener[1][0] as string, length: opener[1].length };
        maskRange(characters, lineStart, lineEnd);
      }
    } else {
      maskRange(characters, lineStart, lineEnd);
      const closer = /^[ ]{0,3}(`+|~+)[ \t]*$/.exec(line)?.[1];
      if (
        closer !== undefined &&
        closer[0] === fence.marker &&
        closer.length >= fence.length
      ) {
        fence = undefined;
      }
    }

    lineStart = lineEnd;
  }

  return characters.join("");
}

function maskInlineCodeSpans(markdown: string): string {
  const characters = markdown.split("");

  for (let start = 0; start < characters.length;) {
    if (characters[start] !== "`") {
      start += 1;
      continue;
    }

    let openerEnd = start;
    while (characters[openerEnd] === "`") {
      openerEnd += 1;
    }
    const openerLength = openerEnd - start;
    let cursor = openerEnd;
    let closingEnd: number | undefined;

    while (cursor < characters.length) {
      if (characters[cursor] !== "`") {
        cursor += 1;
        continue;
      }
      let runEnd = cursor;
      while (characters[runEnd] === "`") {
        runEnd += 1;
      }
      if (runEnd - cursor === openerLength) {
        closingEnd = runEnd;
        break;
      }
      cursor = runEnd;
    }

    if (closingEnd === undefined) {
      start = openerEnd;
      continue;
    }
    maskRange(characters, start, closingEnd);
    start = closingEnd;
  }

  return characters.join("");
}

function maskMarkdownCode(markdown: string): string {
  return maskInlineCodeSpans(maskFencedCodeBlocks(markdown));
}

function maskEscapedPunctuation(markdown: string): string {
  const characters = markdown.split("");
  for (let index = 0; index + 1 < characters.length; index += 1) {
    if (
      characters[index] === "\\" &&
      /^[!-/:-@\[-`{-~]$/.test(characters[index + 1] as string)
    ) {
      characters[index] = " ";
      characters[index + 1] = " ";
      index += 1;
    }
  }
  return characters.join("");
}

function markdownLinkDestinations(markdown: string): string[] {
  const destinations: string[] = [];
  const patterns = [
    /\]\(\s*(<[^>\n]*>|(?:\\.|[^\s)\n])+)/g,
    /^[ \t]{0,3}\[(?:\\[^\r\n]|(?!\])[^\\\r\n]|\r?\n(?![ \t]*\r?\n))+\]:[ \t]*(?:\r?\n[ \t]{0,3})?(<[^>\r\n]*>|(?:\\.|[^\s\r\n])+)/gm,
    /<([A-Za-z][A-Za-z0-9+.-]*:[^<>\s]*)>/g,
  ];

  for (const pattern of patterns) {
    for (const match of markdown.matchAll(pattern)) {
      const destination = match[1];
      if (destination !== undefined) {
        destinations.push(destination);
      }
    }
  }
  return destinations;
}

function hasUnsafeExplicitScheme(destination: string): boolean {
  let normalized = normalizeCommonMarkEscapes(
    decodeSchemeCharacterReferences(destination),
  ).trim();
  if (normalized.startsWith("<") && normalized.endsWith(">")) {
    normalized = normalized.slice(1, -1);
  }
  normalized = normalized.replace(/[\u0000-\u0020]+/g, "");

  const match = /^([A-Za-z][A-Za-z0-9+.-]*):/.exec(normalized);
  if (match === null) {
    return false;
  }
  const scheme = match[1]?.toLowerCase();
  return scheme !== "http" && scheme !== "https";
}

export function assertNoRawHtml(markdown: string): void {
  const codeMasked = maskMarkdownCode(markdown);
  const rawMarkupView = maskEscapedPunctuation(codeMasked);
  const containsUnsafeMarkup =
    /<!--|<![A-Z]|<\?/i.test(rawMarkupView) ||
    /<\/?[A-Za-z][A-Za-z0-9-]*(?=[\s/>])/.test(rawMarkupView) ||
    markdownLinkDestinations(codeMasked).some(hasUnsafeExplicitScheme);

  if (containsUnsafeMarkup) {
    fail("MARKDOWN_RAW_HTML", "Approved Markdown may not contain raw HTML.");
  }
}

export function assertRecordNamespace(
  kind: string,
  id: string,
  path: string,
): void {
  const directory = RECORD_DIRECTORIES[kind];
  const expectedPath = directory === undefined
    ? undefined
    : `records/${directory}/${id}.yaml`;

  if (path !== expectedPath) {
    fail(
      "RECORD_NAMESPACE_MISMATCH",
      `Record ${id} of kind ${kind} must use its exact record namespace.`,
      path,
    );
  }
}
