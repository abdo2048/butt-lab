/**
 * The release audit (Phase D).
 *
 * One repeatable command that checks the built site and the published bundle
 * against the project's release requirements:
 *
 * - exposure: no repository-local path, no session-log reference, no
 *   credential-shaped string in the built output;
 * - rights: no source ships a local copy it does not have the right to ship,
 *   and no source's rights are unresolved;
 * - scientific discipline: every scored assessment carries a rationale, every
 *   unknown says why it is unknown, every hypothesis stays an unvalidated
 *   hypothesis with its assumptions, failure modes, falsifiers and unresolved
 *   dependencies intact, every gap names the human work that would close it,
 *   and no record points at a record that is not published;
 * - forbidden declarations: no statement claims that a route is safe, clean,
 *   detoxified, commercially validated, patentable, deployable or costed;
 * - accessibility: every page has a language, a title, a skip link and its
 *   landmarks; the stylesheet defines focus-visible styling and a
 *   reduced-motion block; text meets the WCAG AA contrast threshold against
 *   the surface it sits on; every decorative score band is accompanied by a
 *   text label, so no status is carried by colour alone.
 *
 * The audit refuses on blocking findings. It reports review findings for a
 * human to judge. It never approves anything.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { JSDOM } from "jsdom";

export type Severity = "blocking" | "review";

export interface Finding {
  code: string;
  severity: Severity;
  file?: string;
  message: string;
  detail?: string;
}

/** A published record as the audit sees it: identity plus whatever fields it carries. */
export interface BundleRecordLike {
  id: string;
  kind: string;
  [key: string]: unknown;
}

export interface AuditReport {
  passed: boolean;
  findings: Finding[];
  counts: {
    records: number;
    findings: number;
    blocking: number;
    review: number;
  };
}

// ---------------------------------------------------------------------------
// small helpers
// ---------------------------------------------------------------------------

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function stringField(record: BundleRecordLike, field: string): string {
  const value = record[field];
  return typeof value === "string" ? value : "";
}

function stringArray(record: BundleRecordLike, field: string): string[] {
  const value = record[field];
  if (!Array.isArray(value)) {
    return [];
  }
  return value.filter((entry): entry is string => typeof entry === "string");
}

function walkFiles(dir: string): string[] {
  const out: string[] = [];
  if (!fs.existsSync(dir)) {
    return out;
  }
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...walkFiles(full));
    } else if (entry.isFile()) {
      out.push(full);
    }
  }
  return out;
}

function relative(root: string, file: string): string {
  return path.relative(root, file).split(path.sep).join("/");
}

// ---------------------------------------------------------------------------
// exposure
// ---------------------------------------------------------------------------

const BINARY_EXTENSIONS = new Set([
  ".woff",
  ".woff2",
  ".ttf",
  ".otf",
  ".png",
  ".jpg",
  ".jpeg",
  ".gif",
  ".webp",
  ".avif",
  ".ico",
  ".pdf",
  ".zip",
  ".gz",
  ".br",
  ".mp4",
  ".webm",
]);

const REPOSITORY_PATH_PATTERNS: ReadonlyArray<{ pattern: RegExp; label: string }> = [
  {
    // A real leaked path always has a path character after the separator
    // ("C:\Users" or "C:/Users"). Requiring one keeps the compressed bytes of
    // a Pagefind fragment - which can contain a coincidental "a:/" - from
    // reading as a leak.
    pattern: /(^|[^A-Za-z0-9])([A-Za-z]):[\\/](?!\/)[A-Za-z0-9_.~-]/,
    label: "an absolute Windows path",
  },
  {
    pattern: /(^|[^A-Za-z0-9])\/(?:home|Users)\//,
    label: "an absolute POSIX home path",
  },
  {
    pattern:
      /(^|[\s"'`>(])((?:\.\.\/)*)(?:tools\/reader-site|tools\/publication-contract|src\/content\/bundle|publication|registry|state|docs|reports|panels|packets|materials|inventions|operator|reviews|dossier|experiments|agents)\/[^\s"'`<>]+/,
    label: "a repository-local path",
  },
];

const CREDENTIAL_PATTERNS: ReadonlyArray<{ pattern: RegExp; label: string }> = [
  { pattern: /-----BEGIN [A-Z ]*PRIVATE KEY-----/, label: "a private key header" },
  { pattern: /\bAKIA[0-9A-Z]{16}\b/, label: "an AWS access key id" },
  { pattern: /\bsk-[A-Za-z0-9_-]{20,}/, label: "a secret key" },
  { pattern: /\bgh[pousr]_[A-Za-z0-9]{20,}/, label: "a GitHub token" },
  { pattern: /\bgithub_pat_[A-Za-z0-9_]{20,}/, label: "a GitHub fine-grained token" },
  { pattern: /\bBearer\s+[A-Za-z0-9._~+/-]{20,}/, label: "a bearer token" },
  {
    pattern:
      /(?:api[_-]?key|password|passwd|client[_-]?secret|access[_-]?token)\s*[:=]\s*(?:"[^"']{6,}"|'[^"']{6,}'|(?=[A-Za-z0-9+/=_-]*[A-Za-z])(?=[A-Za-z0-9+/=_-]*\d)[A-Za-z0-9+/=_-]{12,})/i,
    label: "a credential assignment",
  },
];

/**
 * Scan built output for anything that exposes internal working state or a
 * secret. Binary files are skipped: a font is not text and a byte sequence
 * that happens to look like a token is not a leak.
 */
export function scanBuiltOutput(root: string): Finding[] {
  const findings: Finding[] = [];
  for (const file of walkFiles(root)) {
    if (BINARY_EXTENSIONS.has(path.extname(file).toLowerCase())) {
      continue;
    }
    const bytes = fs.readFileSync(file);
    const text = bytes.toString("utf8");
    const where = relative(root, file);

    for (const { pattern, label } of REPOSITORY_PATH_PATTERNS) {
      const match = pattern.exec(text);
      if (match !== null) {
        findings.push({
          code: "REPOSITORY_PATH_LEAK",
          severity: "blocking",
          file: where,
          message: `the built output exposes ${label}`,
          detail: match[0].trim().slice(0, 120),
        });
      }
    }

    if (/session[-_ ]?log/i.test(text)) {
      findings.push({
        code: "SESSION_LOG_REFERENCE",
        severity: "blocking",
        file: where,
        message: "the built output references a session log",
      });
    }

    for (const { pattern, label } of CREDENTIAL_PATTERNS) {
      const match = pattern.exec(text);
      if (match !== null) {
        findings.push({
          code: "CREDENTIAL_PATTERN",
          severity: "blocking",
          file: where,
          message: `the built output contains ${label}`,
          detail: match[0].slice(0, 60),
        });
      }
    }
  }
  return findings;
}

// ---------------------------------------------------------------------------
// rights
// ---------------------------------------------------------------------------

/**
 * A source may only carry a local copy when its rights say it may. A source
 * whose rights are unresolved may not ship anything at all.
 */
export function auditRights(records: BundleRecordLike[]): Finding[] {
  const findings: Finding[] = [];
  for (const record of records) {
    if (record.kind !== "source") {
      continue;
    }
    const rights = stringField(record, "rights");
    const derivatives = Array.isArray(record.derivatives) ? record.derivatives : [];

    if (rights === "rights-unresolved" || rights === "") {
      findings.push({
        code: "RIGHTS_UNRESOLVED",
        severity: "blocking",
        message: `source ${record.id} does not state a resolved publication right`,
        detail: `rights=${rights === "" ? "<missing>" : rights}`,
      });
    }

    if (derivatives.length > 0 && (rights === "link-only" || rights === "rights-unresolved")) {
      findings.push({
        code: "RIGHTS_DERIVATIVE_CONFLICT",
        severity: "blocking",
        message: `source ${record.id} ships ${derivatives.length} local derivative(s) while its rights are "${rights}"`,
      });
    }
  }
  return findings;
}

// ---------------------------------------------------------------------------
// scientific discipline
// ---------------------------------------------------------------------------

const REQUIRED_HYPOTHESIS_SECTIONS = [
  "assumptions",
  "failureModes",
  "falsifiers",
  "unresolvedDependencies",
] as const;

/**
 * Check that the published evidence states what it claims about itself: the
 * rationale behind a score, the reason behind an unknown, the unvalidated
 * status of a hypothesis, the human work that would close a gap, and the
 * existence of every record a record points at.
 */
export function auditScientific(records: BundleRecordLike[]): Finding[] {
  const findings: Finding[] = [];
  const ids = new Set(records.map((record) => record.id));

  for (const record of records) {
    if (record.kind === "assessment") {
      const status = stringField(record, "status");
      if (status === "scored" && stringField(record, "rationale").trim() === "") {
        findings.push({
          code: "ASSESSMENT_RATIONALE_MISSING",
          severity: "blocking",
          message: `assessment ${record.id} is scored but carries no rationale`,
        });
      }
      if (status === "unknown" && stringField(record, "unknownReason").trim() === "") {
        findings.push({
          code: "ASSESSMENT_UNKNOWN_REASON_MISSING",
          severity: "blocking",
          message: `assessment ${record.id} is unknown but does not say why`,
        });
      }
      if (
        status === "not-applicable" &&
        stringField(record, "notApplicableReason").trim() === ""
      ) {
        findings.push({
          code: "ASSESSMENT_NA_REASON_MISSING",
          severity: "blocking",
          message: `assessment ${record.id} is not applicable but does not say why`,
        });
      }
    }

    if (record.kind === "hypothesis") {
      const validationState = stringField(record, "validationState");
      if (validationState !== "new-unvalidated-hypothesis") {
        findings.push({
          code: "HYPOTHESIS_VALIDATION_STATE",
          severity: "blocking",
          message: `hypothesis ${record.id} claims validation state "${validationState}"`,
        });
      }
      for (const section of REQUIRED_HYPOTHESIS_SECTIONS) {
        if (stringArray(record, section).length === 0) {
          findings.push({
            code: "HYPOTHESIS_SECTION_MISSING",
            severity: "blocking",
            message: `hypothesis ${record.id} has no ${section}`,
          });
        }
      }
    }

    if (record.kind === "gap") {
      if (stringField(record, "falsifierOrDecisionCondition").trim() === "") {
        findings.push({
          code: "GAP_DECISION_CONDITION_MISSING",
          severity: "blocking",
          message: `gap ${record.id} names no falsifier or decision condition`,
        });
      }
      if (stringField(record, "nextHumanWork").trim() === "") {
        findings.push({
          code: "GAP_HUMAN_WORK_MISSING",
          severity: "blocking",
          message: `gap ${record.id} names no next human work`,
        });
      }
      const validationState = stringField(record, "validationState");
      if (validationState !== "requires-human-validation") {
        findings.push({
          code: "GAP_VALIDATION_STATE",
          severity: "blocking",
          message: `gap ${record.id} claims validation state "${validationState}"`,
        });
      }
    }

    for (const [field, value] of Object.entries(record)) {
      if (!field.endsWith("Ids") || !Array.isArray(value)) {
        continue;
      }
      for (const target of value) {
        if (typeof target !== "string") {
          continue;
        }
        if (!ids.has(target)) {
          findings.push({
            code: "DANGLING_REFERENCE",
            severity: "blocking",
            message: `${record.kind} ${record.id}.${field} points at "${target}", which is not published`,
          });
        }
      }
    }
  }
  return findings;
}

// ---------------------------------------------------------------------------
// forbidden declarations
// ---------------------------------------------------------------------------

const NON_PROSE_FIELDS = new Set([
  "id",
  "kind",
  "publicationState",
  "schemaVersion",
  "recordVersion",
  "reviewDate",
  "rubricVersion",
  "contentKind",
  "evidenceState",
  "validationState",
  "status",
  "basis",
  "gapType",
  "sourceType",
  "rights",
  "visibleLabel",
  "preferredLabel",
  "label",
  "auditAliases",
  "auditReferences",
  "schemaVersion",
]);

const FORBIDDEN_DECLARATIONS: ReadonlyArray<{ pattern: RegExp; label: string }> = [
  {
    pattern: /\b(?:is|are|was|were|proven|shown|certified|considered|regarded)\s+(?:safe|clean|detoxified|non-?toxic)\b/i,
    label: "a safety or cleanliness declaration",
  },
  { pattern: /\bcommercially\s+validated\b/i, label: "a commercial-validation claim" },
  { pattern: /\bfully\s+(?:validated|de-?risked)\b/i, label: "a completed-validation claim" },
  { pattern: /\bpatentable\b/i, label: "a patentability claim" },
  { pattern: /\bready\s+(?:to|for)\s+deploy(?:ment)?\b/i, label: "a deployability claim" },
  { pattern: /\b(?:is|are)\s+costed\b/i, label: "a costing claim" },
  { pattern: /\bnovel\b/i, label: "a novelty claim" },
];

const NEGATION_CUES =
  /\b(?:not|never|no|cannot|can't|unverified|unproven|unsupported|neither|nor|without|unestablished|undemonstrated)\b/i;

function collectProse(record: BundleRecordLike, field: string, out: string[]): void {
  const value = record[field];
  if (typeof value === "string") {
    if (!NON_PROSE_FIELDS.has(field)) {
      out.push(value);
    }
    return;
  }
  if (Array.isArray(value)) {
    for (const entry of value) {
      if (typeof entry === "string") {
        out.push(entry);
      } else if (isRecord(entry)) {
        for (const [key, nested] of Object.entries(entry)) {
          if (typeof nested === "string" && !NON_PROSE_FIELDS.has(key)) {
            out.push(nested);
          }
        }
      }
    }
    return;
  }
  if (isRecord(value)) {
    for (const [key, nested] of Object.entries(value)) {
      collectProse({ id: record.id, kind: record.kind, [key]: nested }, key, out);
    }
  }
}

/**
 * Flag statements that claim something the charter forbids this project from
 * claiming. A negated statement ("is not safe") is not a claim and must not be
 * flagged.
 */
export function auditDeclarations(records: BundleRecordLike[]): Finding[] {
  const findings: Finding[] = [];
  for (const record of records) {
    const prose: string[] = [];
    for (const field of Object.keys(record)) {
      collectProse(record, field, prose);
    }
    for (const text of prose) {
      const sentences = text.split(/(?<=[.!?;])\s+/);
      for (const sentence of sentences) {
        for (const { pattern, label } of FORBIDDEN_DECLARATIONS) {
          const match = pattern.exec(sentence);
          if (match === null) {
            continue;
          }
          const prefix = sentence.slice(0, match.index);
          if (NEGATION_CUES.test(prefix)) {
            continue;
          }
          findings.push({
            code: "FORBIDDEN_DECLARATION",
            severity: "review",
            message: `${record.kind} ${record.id} states ${label}`,
            detail: sentence.trim().slice(0, 160),
          });
        }
      }
    }
  }
  return findings;
}

// ---------------------------------------------------------------------------
// accessibility
// ---------------------------------------------------------------------------

interface CssRule {
  selector: string;
  declarations: Map<string, string>;
  media: string[];
}

function stripComments(css: string): string {
  return css.replace(/\/\*[\s\S]*?\*\//g, "");
}

function findMatchingBrace(css: string, openIndex: number): number {
  let depth = 1;
  let cursor = openIndex + 1;
  while (cursor < css.length && depth > 0) {
    const character = css[cursor];
    if (character === "{") {
      depth += 1;
    } else if (character === "}") {
      depth -= 1;
    }
    cursor += 1;
  }
  return cursor - 1;
}

function parseDeclarations(body: string): Map<string, string> {
  const declarations = new Map<string, string>();
  for (const part of body.split(";")) {
    const colon = part.indexOf(":");
    if (colon === -1) {
      continue;
    }
    const property = part.slice(0, colon).trim().toLowerCase();
    const value = part.slice(colon + 1).trim();
    if (property !== "" && value !== "") {
      declarations.set(property, value);
    }
  }
  return declarations;
}

function parseRules(css: string, media: string[]): CssRule[] {
  const rules: CssRule[] = [];
  let cursor = 0;
  while (cursor < css.length) {
    const open = css.indexOf("{", cursor);
    if (open === -1) {
      break;
    }
    const prelude = css.slice(cursor, open).trim();
    const close = findMatchingBrace(css, open);
    const body = css.slice(open + 1, close);
    if (prelude.startsWith("@")) {
      if (prelude.startsWith("@media")) {
        rules.push(...parseRules(body, [...media, prelude]));
      }
      // @font-face, @keyframes, @page and friends carry no text rules.
    } else if (prelude !== "") {
      rules.push({ selector: prelude, declarations: parseDeclarations(body), media });
    }
    cursor = close + 1;
  }
  return rules;
}

function parseTokens(css: string): Map<string, string> {
  const tokens = new Map<string, string>();
  const pattern = /--([A-Za-z0-9-]+)\s*:\s*([^;]+);/g;
  let match = pattern.exec(css);
  while (match !== null) {
    const name = match[1];
    const value = match[2];
    if (name !== undefined && value !== undefined) {
      tokens.set(name, value.trim());
    }
    match = pattern.exec(css);
  }
  return tokens;
}

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const normalized = hex.trim().toLowerCase();
  if (!normalized.startsWith("#")) {
    return null;
  }
  const digits = normalized.slice(1);
  if (digits.length === 3) {
    const r = digits[0];
    const g = digits[1];
    const b = digits[2];
    if (r === undefined || g === undefined || b === undefined) {
      return null;
    }
    return {
      r: Number.parseInt(r + r, 16),
      g: Number.parseInt(g + g, 16),
      b: Number.parseInt(b + b, 16),
    };
  }
  if (digits.length === 6) {
    return {
      r: Number.parseInt(digits.slice(0, 2), 16),
      g: Number.parseInt(digits.slice(2, 4), 16),
      b: Number.parseInt(digits.slice(4, 6), 16),
    };
  }
  return null;
}

function resolveColour(value: string, tokens: Map<string, string>, depth = 0): string | null {
  if (depth > 4) {
    return null;
  }
  const trimmed = value.trim();
  const variable = /^var\(\s*--([A-Za-z0-9-]+)\s*\)$/.exec(trimmed);
  const variableName = variable?.[1];
  if (variable !== null && variableName !== undefined) {
    const resolved = tokens.get(variableName);
    if (resolved === undefined) {
      return null;
    }
    return resolveColour(resolved, tokens, depth + 1);
  }
  if (trimmed === "transparent" || trimmed === "#0000" || trimmed === "rgba(0,0,0,0)") {
    return null;
  }
  return hexToRgb(trimmed) === null ? null : trimmed;
}

function luminance(hex: string): number {
  const rgb = hexToRgb(hex);
  if (rgb === null) {
    return 0;
  }
  const channel = (value: number): number => {
    const scaled = value / 255;
    return scaled <= 0.03928 ? scaled / 12.92 : ((scaled + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * channel(rgb.r) + 0.7152 * channel(rgb.g) + 0.0722 * channel(rgb.b);
}

export function contrastRatio(foreground: string, background: string): number {
  const a = luminance(foreground);
  const b = luminance(background);
  const lighter = Math.max(a, b);
  const darker = Math.min(a, b);
  return (lighter + 0.05) / (darker + 0.05);
}

function fontSizePx(value: string | undefined): number {
  if (value === undefined) {
    return 16;
  }
  const rem = /^(-?[\d.]+)rem$/.exec(value.trim());
  const remSize = rem?.[1];
  if (remSize !== undefined) {
    return Number.parseFloat(remSize) * 16;
  }
  const px = /^(-?[\d.]+)px$/.exec(value.trim());
  const pxSize = px?.[1];
  if (pxSize !== undefined) {
    return Number.parseFloat(pxSize);
  }
  const bare = /^(-?[\d.]+)$/.exec(value.trim());
  const bareSize = bare?.[1];
  if (bareSize !== undefined) {
    return Number.parseFloat(bareSize);
  }
  return 16;
}

function fontWeight(value: string | undefined): number {
  if (value === undefined) {
    return 400;
  }
  const trimmed = value.trim().toLowerCase();
  if (trimmed === "bold") {
    return 700;
  }
  const numeric = Number.parseInt(trimmed, 10);
  return Number.isNaN(numeric) ? 400 : numeric;
}

function backgroundOf(rule: CssRule, tokens: Map<string, string>): string | null {
  const own = rule.declarations.get("background-color") ?? rule.declarations.get("background");
  if (own === undefined) {
    return null;
  }
  if (/^var\(--[A-Za-z0-9-]+\)$/.test(own.trim())) {
    return resolveColour(own, tokens);
  }
  if (/^#[0-9a-fA-F]{3,8}$/.test(own.trim())) {
    return resolveColour(own, tokens);
  }
  return null;
}

function colourOf(rule: CssRule, tokens: Map<string, string>): string | null {
  const own = rule.declarations.get("color");
  if (own === undefined) {
    return null;
  }
  return resolveColour(own, tokens);
}

/**
 * Check the built pages and the stylesheet: page structure, focus visibility,
 * reduced-motion handling, contrast, and a status that is never carried by
 * colour alone.
 */
export function auditAccessibility(options: {
  distRoot: string;
  cssSources: string[];
}): Finding[] {
  const findings: Finding[] = [];
  const { distRoot, cssSources } = options;

  const cssText = cssSources
    .filter((source) => fs.existsSync(source))
    .map((source) => stripComments(fs.readFileSync(source, "utf8")))
    .join("\n");
  const tokens = parseTokens(cssText);

  if (!cssText.includes(":focus-visible")) {
    findings.push({
      code: "FOCUS_VISIBLE_MISSING",
      severity: "blocking",
      message: "the stylesheet defines no :focus-visible styling",
    });
  }
  if (!/prefers-reduced-motion/.test(cssText)) {
    findings.push({
      code: "REDUCED_MOTION_MISSING",
      severity: "blocking",
      message: "the stylesheet has no prefers-reduced-motion block",
    });
  }

  // Contrast: every rule that sets a text colour is checked against the
  // surface it declares, or against the page surface when it declares none.
  const defaultSurface = resolveColour("var(--paper)", tokens) ?? "#ffffff";
  for (const rule of parseRules(cssText, [])) {
    if (rule.media.some((media) => media.includes("print"))) {
      continue;
    }
    const foreground = colourOf(rule, tokens);
    if (foreground === null) {
      continue;
    }
    const surface = backgroundOf(rule, tokens) ?? defaultSurface;
    const size = fontSizePx(rule.declarations.get("font-size"));
    const weight = fontWeight(rule.declarations.get("font-weight"));
    const large = size >= 24 || (size >= 18.66 && weight >= 700);
    const threshold = large ? 3 : 4.5;
    const ratio = contrastRatio(foreground, surface);
    if (ratio < threshold) {
      findings.push({
        code: "CONTRAST_BELOW_AA",
        severity: "blocking",
        file: rule.selector,
        message: `${rule.selector} sets text at ${ratio.toFixed(2)}:1, below the AA threshold of ${threshold}:1`,
        detail: `colour ${foreground} on ${surface}, font-size ${size.toFixed(2)}px`,
      });
    }
  }

  // Page structure and non-colour status.
  for (const file of walkFiles(distRoot)) {
    if (path.extname(file).toLowerCase() !== ".html") {
      continue;
    }
    const html = fs.readFileSync(file, "utf8");
    const where = relative(distRoot, file);

    if (!/<html[^>]*\slang="[^"]+"/i.test(html)) {
      findings.push({
        code: "PAGE_LANG_MISSING",
        severity: "blocking",
        file: where,
        message: "the page declares no language",
      });
    }
    if (!/<title>[^<]+<\/title>/i.test(html)) {
      findings.push({
        code: "PAGE_TITLE_MISSING",
        severity: "blocking",
        file: where,
        message: "the page has no title",
      });
    }
    if (!/class="skip-link"[^>]*href="#main"/i.test(html)) {
      findings.push({
        code: "PAGE_SKIP_LINK_MISSING",
        severity: "blocking",
        file: where,
        message: "the page has no skip link to the main content",
      });
    }
    if (!/<main[^>]*id="main"/i.test(html)) {
      findings.push({
        code: "PAGE_MAIN_LANDMARK_MISSING",
        severity: "blocking",
        file: where,
        message: "the page has no main landmark",
      });
    }
    if (!/<nav[^>]*aria-label="Primary"/i.test(html)) {
      findings.push({
        code: "PAGE_NAV_LANDMARK_MISSING",
        severity: "blocking",
        file: where,
        message: "the page has no labelled primary navigation",
      });
    }

    const dom = new JSDOM(html);
    for (const band of Array.from(dom.window.document.querySelectorAll(".ticks"))) {
      let container: Element | null = band.parentElement;
      let labelled = false;
      for (let depth = 0; depth < 6 && container !== null; depth += 1) {
        const value = container.querySelector(".score-value, .chip");
        if (value !== null && value.textContent !== null && value.textContent.trim() !== "") {
          labelled = true;
          break;
        }
        container = container.parentElement;
      }
      if (!labelled) {
        findings.push({
          code: "STATUS_NOT_CONVEYRED_IN_TEXT",
          severity: "blocking",
          file: where,
          message: "a score band carries no text label, so its status is colour alone",
        });
      }
    }
    dom.window.close();
  }

  return findings;
}

// ---------------------------------------------------------------------------
// aggregate
// ---------------------------------------------------------------------------

/**
 * Run every check and return one report. `passed` is true only when no
 * blocking finding was raised.
 */
export function runReleaseAudit(options: {
  distRoot: string;
  records: BundleRecordLike[];
  cssSources: string[];
}): AuditReport {
  const findings = [
    ...scanBuiltOutput(options.distRoot),
    ...auditRights(options.records),
    ...auditScientific(options.records),
    ...auditDeclarations(options.records),
    ...auditAccessibility(options),
  ];
  const blocking = findings.filter((finding) => finding.severity === "blocking").length;
  const review = findings.filter((finding) => finding.severity === "review").length;
  return {
    passed: blocking === 0,
    findings,
    counts: {
      records: options.records.length,
      findings: findings.length,
      blocking,
      review,
    },
  };
}

// ---------------------------------------------------------------------------
// command line
// ---------------------------------------------------------------------------

function loadBundleRecords(bundleDir: string): BundleRecordLike[] {
  const file = path.join(bundleDir, "records.json");
  const pairs = JSON.parse(fs.readFileSync(file, "utf8")) as [string, BundleRecordLike][];
  return pairs.map(([, record]) => record);
}

function main(): number {
  const scriptDir = path.dirname(fileURLToPath(import.meta.url));
  const siteRoot = path.resolve(scriptDir, "..");
  const distRoot = path.join(siteRoot, "dist");
  const bundleDir = path.join(siteRoot, "src", "content", "bundle");
  const cssSources = [
    path.join(siteRoot, "src", "styles", "tokens.css"),
    path.join(siteRoot, "src", "styles", "base.css"),
  ];

  if (!fs.existsSync(distRoot)) {
    process.stderr.write("dist/ is missing — run npm run build before the release audit\n");
    return 2;
  }
  if (!fs.existsSync(path.join(bundleDir, "records.json"))) {
    process.stderr.write("the staged bundle is missing — run npm run build:content first\n");
    return 2;
  }

  const report = runReleaseAudit({
    distRoot,
    records: loadBundleRecords(bundleDir),
    cssSources,
  });

  for (const finding of report.findings) {
    const where = finding.file === undefined ? "" : ` [${finding.file}]`;
    process.stdout.write(`${finding.severity.toUpperCase()} ${finding.code}${where}: ${finding.message}\n`);
  }
  process.stdout.write(
    `AUDIT records=${report.counts.records} findings=${report.counts.findings} blocking=${report.counts.blocking} review=${report.counts.review} passed=${report.passed}\n`,
  );
  return report.passed ? 0 : 1;
}

const invoked = process.argv[1];
if (invoked !== undefined && import.meta.url === pathToFileURL(path.resolve(invoked)).href) {
  process.exitCode = main();
}
