import type { Diagnostic } from "./diagnostics.ts";
import { error } from "./diagnostics.ts";
import type { LoadedPublication } from "./manifest-validation.ts";
import { isNormalizedRelativePath } from "./path-policy.ts";
import type {
  ContentRecord,
  RubricCatalog,
} from "./model/index.ts";
import type {
  Backlink,
  Relationship,
} from "./relationships.ts";
import {
  buildBacklinks,
  collectRelationships,
} from "./relationships.ts";
import { CRITERION_IDS } from "./model/rubrics.ts";

export type ValidationResult = Readonly<{
  diagnostics: readonly Diagnostic[];
  relationships: readonly Relationship[];
  backlinks: readonly Backlink[];
}>;

type AuditReference = Readonly<{
  label: string;
  url: string;
  version: string;
  internalId?: string | undefined;
}>;

/**
 * Repository-local root directories. An audit reference that points into one
 * of them exposes internal working state instead of a public artifact.
 *
 * The list mirrors the actual top-level directories of the repository root.
 * `publication` is the public layer and is deliberately absent.
 */
const REPOSITORY_LOCAL_ROOT_SEGMENTS: ReadonlySet<string> = new Set([
  ".superpowers",
  "agents",
  "docs",
  "dossier",
  "experiments",
  "inventions",
  "materials",
  "mcp",
  "operator",
  "packets",
  "panels",
  "post-project",
  "registry",
  "reports",
  "reviews",
  "scripts",
  "session-log",
  "skills",
  "specs",
  "state",
  "tests",
  "tools",
]);

/**
 * True when a path enters a repository-local root directory. Such a path
 * exposes internal working state instead of a public artifact.
 */
function entersRepositoryLocalRoot(relativePath: string): boolean {
  const segments = relativePath.split("/");
  const first = segments[0];
  if (first !== undefined && REPOSITORY_LOCAL_ROOT_SEGMENTS.has(first)) {
    return true;
  }
  return segments.some(
    (segment) => segment === "session-log" || segment === "session-log.md",
  );
}

const DATE_PATTERN = /\d{4}-\d{2}-\d{2}|\d{4}\/\d{2}\/\d{2}/g;
const YEAR_PATTERN = /^(?:19|20)\d{2}$/;

/**
 * A whole token that is an identifier: `US1234567`, `example-patent-2`,
 * `ISO-13485`. The pattern is anchored to the whole token so that a token
 * which merely contains an identifier is not treated as one.
 */
const IDENTIFIER_TOKEN_PATTERN = /^[A-Za-z][A-Za-z0-9]*(?:[-_][A-Za-z0-9]+)*$/;

/**
 * A short uppercase prefix such as `US`, `EP`, `WO` or `ISO` introduces a
 * document number (`US 6,123,456`, `ISO 14001`) rather than a magnitude.
 */
const IDENTIFIER_PREFIX_PATTERN = /^[A-Z]{2,4}$/;

/**
 * Labels that introduce a cross-reference rather than a quantity.
 */
const REFERENCE_LABEL_PATTERN =
  /^(?:fig(?:ure)?s?|sec(?:tion)?s?|tables?|pages?|eq(?:uation)?s?|chapters?|appendi(?:x|ces)|clauses?)$/i;

/**
 * The shape of a cross-reference number such as `2`, `3.2`, `A2` or `2a`.
 */
const REFERENCE_NUMBER_PATTERN = /^[A-Za-z]?\d+(?:[.,]\d+)*[A-Za-z]?$/;

/**
 * Words that give a bare four-digit number genuine year context.
 */
const YEAR_CUE_WORDS: ReadonlySet<string> = new Set([
  "around",
  "circa",
  "completed",
  "dated",
  "during",
  "filed",
  "from",
  "in",
  "issued",
  "published",
  "since",
  "through",
  "until",
  "year",
  "years",
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
]);

/**
 * Count nouns that turn a year-shaped number into a magnitude. `in 2000 cases`
 * states a count and not a year, so a count noun overrides any year context.
 */
const COUNT_NOUNS: ReadonlySet<string> = new Set([
  "batch",
  "batches",
  "case",
  "cases",
  "experiment",
  "experiments",
  "iteration",
  "iterations",
  "measurement",
  "measurements",
  "observation",
  "observations",
  "participant",
  "participants",
  "patient",
  "patients",
  "replicate",
  "replicates",
  "run",
  "runs",
  "sample",
  "samples",
  "site",
  "sites",
  "specimen",
  "specimens",
  "subject",
  "subjects",
  "trial",
  "trials",
]);

/**
 * Determiners that introduce a named year (`the 2026 review`). They make a
 * year-shaped number a year rather than a magnitude.
 */
const YEAR_DETERMINERS: ReadonlySet<string> = new Set([
  "a",
  "all",
  "an",
  "another",
  "any",
  "both",
  "each",
  "either",
  "every",
  "few",
  "her",
  "his",
  "its",
  "many",
  "most",
  "my",
  "neither",
  "no",
  "our",
  "several",
  "some",
  "the",
  "their",
  "these",
  "this",
  "those",
  "your",
]);

const DATE_LIKE_TOKEN_PATTERN = /^\d{1,4}(?:[-/.]\d{1,4})+$/;

const NUMBER_PATTERN = /\d+(?:[.,]\d+)*/g;

/**
 * Units that turn a number into a magnitude. Compound and denominator forms
 * are listed first so that the longest match wins.
 */
const UNIT_ALTERNATIONS: readonly string[] = [
  "%",
  "mg/kg",
  "ng/m3",
  "µg/m3",
  "ug/m3",
  "kg/kWh",
  "kWh/kg",
  "MJ/kg",
  "kg/t",
  "g/L",
  "mg/L",
  "ng/L",
  "g/m3",
  "ng",
  "µg",
  "ug",
  "mg",
  "kg",
  "g",
  "t",
  "m3",
  "cm3",
  "mL",
  "ml",
  "cL",
  "dL",
  "L",
  "ppm",
  "ppb",
  "kWh",
  "MWh",
  "Wh",
  "MJ",
  "GJ",
  "kJ",
  "MPa",
  "kPa",
  "Pa",
  "hrs",
  "hr",
  "h",
  "min",
  "s",
  "days",
  "day",
  "d",
  "°C",
  "degC",
  "K",
  "cycles",
  "pieces",
  "units",
  "gram",
  "grams",
  "kilogram",
  "kilograms",
  "milligram",
  "milligrams",
  "liter",
  "liters",
  "litre",
  "litres",
  "percent",
  "hours",
  "minutes",
  "seconds",
];

/**
 * A number that carries a unit, either as a standalone word (`42 g`) or as a
 * suffix on the numeric token (`42g`, `1.5 kg`, `250000 ng/m3`, `20 °C`).
 *
 * The detection is a linear scan rather than a regular expression. The
 * equivalent pattern backtracks over every numeric prefix of the input and
 * therefore degrades quadratically on long digit runs, which turns an
 * unbounded free-text field into a denial-of-service vector.
 */
function isDigitCode(code: number): boolean {
  return code >= 48 && code <= 57;
}

function isAlphanumericCode(code: number): boolean {
  return (
    (code >= 48 && code <= 57) ||
    (code >= 65 && code <= 90) ||
    (code >= 97 && code <= 122)
  );
}

/**
 * Implements `\d+(?:[.,]\d+)*` in linear time.
 */
function isNumericText(value: string): boolean {
  const length = value.length;
  if (length === 0 || !isDigitCode(value.charCodeAt(0))) {
    return false;
  }
  let index = 1;
  while (index < length && isDigitCode(value.charCodeAt(index))) {
    index += 1;
  }
  while (
    index + 1 < length &&
    (value[index] === "." || value[index] === ",") &&
    isDigitCode(value.charCodeAt(index + 1))
  ) {
    index += 2;
    while (index < length && isDigitCode(value.charCodeAt(index))) {
      index += 1;
    }
  }
  return index === length;
}

/**
 * Returns the index just past the maximal numeric run that starts at `start`.
 */
function scanNumericRun(text: string, start: number): number {
  const length = text.length;
  let index = start;
  while (index < length && isDigitCode(text.charCodeAt(index))) {
    index += 1;
  }
  while (
    index + 1 < length &&
    (text[index] === "." || text[index] === ",") &&
    isDigitCode(text.charCodeAt(index + 1))
  ) {
    index += 2;
    while (index < length && isDigitCode(text.charCodeAt(index))) {
      index += 1;
    }
  }
  return index;
}

/**
 * True when a unit from the allowlist starts at `position` and is not
 * followed by another alphanumeric character.
 */
function matchesUnitAt(text: string, position: number): boolean {
  for (const unit of UNIT_ALTERNATIONS) {
    if (!text.startsWith(unit, position)) {
      continue;
    }
    const after = position + unit.length;
    if (after >= text.length || !isAlphanumericCode(text.charCodeAt(after))) {
      return true;
    }
  }
  return false;
}

/**
 * Detects a number that carries a unit, in linear time.
 */
function containsUnitBearingQuantity(text: string): boolean {
  const length = text.length;
  let index = 0;
  while (index < length) {
    if (!isDigitCode(text.charCodeAt(index))) {
      index += 1;
      continue;
    }
    const runEnd = scanNumericRun(text, index);
    if (matchesUnitAt(text, runEnd)) {
      return true;
    }
    if (text[runEnd] === "-" || text[runEnd] === " ") {
      if (matchesUnitAt(text, runEnd + 1)) {
        return true;
      }
    }
    index = runEnd;
  }
  return false;
}

/**
 * A unit that introduces the number instead of following it (`g-42`).
 */
function isUnitPrefixedQuantity(token: string): boolean {
  for (const unit of UNIT_ALTERNATIONS) {
    const prefix = `${unit}-`;
    if (!token.startsWith(prefix)) {
      continue;
    }
    if (isNumericText(token.slice(prefix.length))) {
      return true;
    }
  }
  return false;
}

const RECORD_KINDS: readonly string[] = [
  "material",
  "method-family",
  "source",
  "claim",
  "gap",
  "hypothesis",
  "term",
  "assessment",
];

/**
 * Fields that must be arrays for the semantic layer to read them safely.
 */
const REQUIRED_ARRAY_FIELDS: Readonly<Record<string, readonly string[]>> = {
  material: ["termIds", "methodFamilyIds"],
  "method-family": ["auditReferences"],
  source: ["derivatives"],
  claim: ["methodIds", "hypothesisIds", "counterevidenceClaimIds"],
  gap: ["affectedRecordIds"],
  hypothesis: [
    "failureModes",
    "falsifiers",
    "assumptions",
    "validationQuestionIds",
    "auditReferences",
  ],
  term: ["methodIds", "claimIds", "sourceIds"],
  assessment: ["supportingClaimIds", "conflictingClaimIds"],
};

/**
 * Fields that must be strings for the semantic layer to read them safely.
 */
const REQUIRED_STRING_FIELDS: Readonly<Record<string, readonly string[]>> = {
  material: [],
  "method-family": ["family"],
  source: [],
  claim: ["proposition"],
  gap: [],
  hypothesis: [],
  term: [],
  assessment: ["methodId", "rubricVersion"],
};

function compareText(left: string, right: string): number {
  if (left === right) {
    return 0;
  }
  return left < right ? -1 : 1;
}

function errorDiagnostic(
  code: string,
  message: string,
  recordId: string,
  path?: string,
): Diagnostic {
  return { ...error(code, message, path), recordId };
}

function warningDiagnostic(
  code: string,
  message: string,
  recordId: string,
  path?: string,
): Diagnostic {
  return {
    code,
    severity: "warning",
    message,
    recordId,
    ...(path === undefined ? {} : { path }),
  };
}

function stripEdgePunctuation(token: string): string {
  return token
    .replace(/^[^A-Za-z0-9°]+/, "")
    .replace(/[^A-Za-z0-9°]+$/, "");
}

function isWholeTokenIdentifier(token: string): boolean {
  return IDENTIFIER_TOKEN_PATTERN.test(token);
}

function isIdentifierPrefix(token: string): boolean {
  return IDENTIFIER_PREFIX_PATTERN.test(token);
}

function isReferenceLabel(token: string): boolean {
  return REFERENCE_LABEL_PATTERN.test(token);
}

function isReferenceNumber(token: string): boolean {
  return REFERENCE_NUMBER_PATTERN.test(token);
}

function hasYearContext(previous: string | undefined): boolean {
  if (previous === undefined) {
    return false;
  }
  if (YEAR_CUE_WORDS.has(previous.toLowerCase())) {
    return true;
  }
  return DATE_LIKE_TOKEN_PATTERN.test(previous);
}

function hasDeterminerContext(previous: string | undefined): boolean {
  return (
    previous !== undefined && YEAR_DETERMINERS.has(previous.toLowerCase())
  );
}

function isCountNoun(token: string | undefined): boolean {
  return token !== undefined && COUNT_NOUNS.has(token.toLowerCase());
}

/**
 * Decides whether a year-shaped number is used solely as a year.
 *
 * A four-digit value between 1900 and 2099 is a year when it carries year
 * context: a preceding year cue word (`in`, `since`, `during`, ...) or a
 * preceding determiner (`the 2026 review`). A count noun after the number
 * always wins over that context, because `in 2000 cases` states a count and
 * not a year.
 */
function isYearOnlyNumber(
  number: string,
  previous: string | undefined,
  next: string | undefined,
  remainder: string,
): boolean {
  if (!YEAR_PATTERN.test(number)) {
    return false;
  }
  if (isCountNoun(next) || isCountNoun(remainder)) {
    return false;
  }
  return hasYearContext(previous) || hasDeterminerContext(previous);
}

/**
 * Detects a quantity that is stated in free text.
 *
 * The rule is unit-first. A number that carries a unit, either as a
 * standalone word (`42 g`, `1.5 kg`, `250000 ng/m3`, `20 °C`, `250 mg/kg`) or
 * as a suffix or prefix on the numeric token (`42g`, `yield-42g`, `g-42`), is
 * always a magnitude and always needs an explicit quantitative basis. No
 * exemption applies to such a number.
 *
 * A number with no unit is exempt only when it is genuinely a source
 * identifier or a year:
 *
 * - identifier shape, matched against the whole token: `US1234567`,
 *   `example-patent-2`, `ISO-13485`;
 * - a document number introduced by a short uppercase prefix: `US 6,123,456`,
 *   `ISO 14001`;
 * - a cross-reference introduced by a reference label: `Figure 2`,
 *   `Section 3`;
 * - a bare four-digit year between 1900 and 2099 that carries genuine year
 *   context: a preceding year cue word (`in`, `since`, `year`, `during`,
 *   `completed`, `published`, `issued`, `filed`, `dated`, `circa`, `around`,
 *   `from`, `until`, `through`, or a month name) or an adjacent date token.
 *
 * Calendar dates (`2026-11-14`, `2026/11/14`) are removed before scanning and
 * are therefore never quantities.
 *
 * Every other number, however large, is a magnitude.
 */
function containsQuantitativeNumber(text: string): boolean {
  const withoutDates = text.replace(DATE_PATTERN, " ");
  const tokens = withoutDates
    .split(/\s+/)
    .map(stripEdgePunctuation)
    .filter((token) => token.length > 0);

  if (containsUnitBearingQuantity(withoutDates)) {
    return true;
  }
  for (const token of tokens) {
    if (isUnitPrefixedQuantity(token)) {
      return true;
    }
  }

  for (const [index, token] of tokens.entries()) {
    if (isWholeTokenIdentifier(token)) {
      continue;
    }

    const previous = index > 0 ? tokens[index - 1] : undefined;
    const next = index + 1 < tokens.length ? tokens[index + 1] : undefined;
    const numbers = [...token.matchAll(NUMBER_PATTERN)];
    if (numbers.length === 0) {
      continue;
    }

    for (const match of numbers) {
      const number = match[0];
      const offset = match.index ?? 0;
      if (
        previous !== undefined &&
        isIdentifierPrefix(previous) &&
        number.replace(/[.,]/g, "").length >= 4
      ) {
        continue;
      }
      if (
        previous !== undefined &&
        isReferenceLabel(previous) &&
        isReferenceNumber(token)
      ) {
        continue;
      }
      if (
        isYearOnlyNumber(
          number,
          previous,
          next,
          token.slice(offset + number.length),
        )
      ) {
        continue;
      }
      return true;
    }
  }

  return false;
}

function rawUrlPathSegments(rawUrl: string): readonly string[] {
  const schemeEnd = rawUrl.indexOf("://");
  const authorityStart = schemeEnd === -1 ? 0 : schemeEnd + 3;
  const pathStart = rawUrl.indexOf("/", authorityStart);
  if (pathStart === -1) {
    return [];
  }
  const path = rawUrl.slice(pathStart).split(/[?#]/)[0] ?? "";
  return path.split("/");
}

function auditReferenceProblem(reference: AuditReference): string | undefined {
  const rawSegments = rawUrlPathSegments(reference.url);
  if (rawSegments.includes("..")) {
    return "audit reference paths may not traverse directories";
  }

  let parsed: URL;
  try {
    parsed = new URL(reference.url);
  } catch {
    return "the audit reference URL is not a valid absolute URL";
  }

  if (parsed.protocol !== "https:") {
    return "audit references must use HTTPS";
  }
  if (parsed.username !== "" || parsed.password !== "") {
    return "audit reference URLs may not embed credentials";
  }

  const segments = parsed.pathname
    .split("/")
    .filter((segment) => segment.length > 0);
  const first = segments[0];
  if (first !== undefined && REPOSITORY_LOCAL_ROOT_SEGMENTS.has(first)) {
    return "audit references may not point at repository-local paths";
  }
  if (
    parsed.hostname === "localhost" ||
    parsed.hostname === "127.0.0.1" ||
    parsed.hostname === "::1"
  ) {
    return "audit references may not point at local hosts";
  }

  const internalId = reference.internalId;
  if (
    internalId !== undefined &&
    (internalId.includes("/") || internalId.includes("\\"))
  ) {
    return "audit reference internal identifiers may not be repository-local paths";
  }

  return undefined;
}

function auditReferenceDiagnostics(
  recordId: string,
  references: readonly AuditReference[],
  path: string | undefined,
): readonly Diagnostic[] {
  const diagnostics: Diagnostic[] = [];

  for (const reference of references) {
    const problem = auditReferenceProblem(reference);
    if (problem !== undefined) {
      diagnostics.push(
        errorDiagnostic(
          "AUDIT_REFERENCE_UNSAFE",
          `Audit reference "${reference.label}" on record ${recordId} is unsafe: ${problem}.`,
          recordId,
          path,
        ),
      );
    }
  }

  return diagnostics;
}

/**
 * Reports the shape problems that would make a record unreadable for the
 * semantic layer. A record that fails this check is reported with the stable
 * `RECORD_SCHEMA_INVALID` code instead of throwing.
 */
function recordShapeProblem(record: ContentRecord): string | undefined {
  const view = record as unknown as Record<string, unknown>;

  const id = view["id"];
  if (typeof id !== "string" || id.length === 0) {
    return "is missing a stable string id";
  }

  const kind = view["kind"];
  if (typeof kind !== "string" || !RECORD_KINDS.includes(kind)) {
    return `has an unknown kind ${JSON.stringify(kind ?? null)}`;
  }

  for (const field of REQUIRED_ARRAY_FIELDS[kind] ?? []) {
    if (!Array.isArray(view[field])) {
      return `is missing the ${field} list`;
    }
  }

  for (const field of REQUIRED_STRING_FIELDS[kind] ?? []) {
    if (typeof view[field] !== "string") {
      return `is missing the ${field} text`;
    }
  }

  return undefined;
}

/**
 * Cross-record scientific and rights invariants for a loaded publication.
 *
 * This function is pure: it performs no filesystem access, never throws, and
 * never mutates a record. It reports diagnostics only. Validation never
 * publishes; every publication version still requires explicit human operator
 * approval.
 */
export function validatePublicationSemantics(
  loaded: LoadedPublication,
  rubrics: RubricCatalog,
): ValidationResult {
  const diagnostics: Diagnostic[] = [];
  const records = loaded.records;

  const recordPaths = new Map<string, string>();
  for (const entry of loaded.manifest.records) {
    recordPaths.set(entry.id, entry.path);
  }
  const pathFor = (id: string): string | undefined => recordPaths.get(id);

  const listedPaths = new Set<string>();
  for (const entry of [
    ...loaded.manifest.records,
    ...loaded.manifest.pages,
    ...loaded.manifest.assets,
  ]) {
    listedPaths.add(entry.path);
  }
  const listedAssets = new Map<string, string>();
  for (const entry of loaded.manifest.assets) {
    listedAssets.set(entry.path, entry.sha256);
  }
  const listedHashes = new Map<string, string>();
  for (const entry of [
    ...loaded.manifest.records,
    ...loaded.manifest.pages,
    ...loaded.manifest.assets,
  ]) {
    listedHashes.set(entry.path, entry.sha256);
  }

  const recordById = new Map<string, ContentRecord>();
  const idCounts = new Map<string, number>();
  for (const record of records.values()) {
    const view = record as unknown as Record<string, unknown>;
    const id = view["id"];
    if (typeof id !== "string" || id.length === 0) {
      continue;
    }
    recordById.set(id, record);
    idCounts.set(id, (idCounts.get(id) ?? 0) + 1);
  }

  for (const [id, count] of [...idCounts.entries()].sort((left, right) =>
    compareText(left[0], right[0])
  )) {
    if (count > 1) {
      diagnostics.push(
        errorDiagnostic(
          "SEMANTIC_DUPLICATE_RECORD_ID",
          `Stable record ID ${id} is used by ${count} records.`,
          id,
          pathFor(id),
        ),
      );
    }
  }

  /**
   * Shape problems are reported before anything else is read from a record, so
   * that a malformed record is reported instead of throwing.
   */
  const validRecords = new Map<string, ContentRecord>();
  for (const record of records.values()) {
    const shapeProblem = recordShapeProblem(record);
    if (shapeProblem !== undefined) {
      const view = record as unknown as Record<string, unknown>;
      const id = typeof view["id"] === "string" ? view["id"] : "<unknown>";
      diagnostics.push(
        errorDiagnostic(
          "RECORD_SCHEMA_INVALID",
          `Record ${id} ${shapeProblem}.`,
          id,
          pathFor(id),
        ),
      );
      continue;
    }
    validRecords.set(record.id, record);
  }

  /**
   * One assessment per criterion per method.
   *
   * The comparison surface renders one cell per (method, criterion) pair, so a
   * second assessment for the same pair is a contradiction rather than extra
   * detail, and a method published without an answer for every criterion
   * leaves a hole that reads as silence. A missing answer is recorded
   * explicitly with the `unknown` assessment status instead.
   */
  const assessmentCellOwners = new Map<string, string>();
  for (const record of validRecords.values()) {
    if (record.kind !== "assessment") {
      continue;
    }
    const cell = `${record.methodId}|${record.criterionId}`;
    const previous = assessmentCellOwners.get(cell);
    if (previous !== undefined) {
      diagnostics.push(
        errorDiagnostic(
          "ASSESSMENT_DUPLICATE_CRITERION",
          `Assessments ${previous} and ${record.id} both answer criterion ${record.criterionId} for method ${record.methodId}.`,
          record.id,
          pathFor(record.id),
        ),
      );
      continue;
    }
    assessmentCellOwners.set(cell, record.id);
  }

  for (const record of validRecords.values()) {
    if (record.kind !== "method-family") {
      continue;
    }
    const answeredCriteria = new Set<string>();
    for (const assessment of validRecords.values()) {
      if (assessment.kind === "assessment" && assessment.methodId === record.id) {
        answeredCriteria.add(assessment.criterionId);
      }
    }
    for (const criterionId of CRITERION_IDS) {
      if (!answeredCriteria.has(criterionId)) {
        diagnostics.push(
          errorDiagnostic(
            "ASSESSMENT_CRITERION_MISSING",
            `Method ${record.id} has no assessment for criterion ${criterionId}.`,
            record.id,
            pathFor(record.id),
          ),
        );
      }
    }
  }

  const relationships = collectRelationships(validRecords);
  const backlinks = buildBacklinks(relationships);

  for (const relationship of relationships) {
    const target = validRecords.get(relationship.toId);
    if (target !== undefined) {
      const expectedKind = relationship.targetKind;
      if (expectedKind !== undefined && target.kind !== expectedKind) {
        diagnostics.push(
          errorDiagnostic(
            "RELATIONSHIP_TARGET_KIND_MISMATCH",
            `Record ${relationship.fromId} field ${relationship.field} references ${relationship.toId}, which is a ${String(target.kind)} record, not a ${expectedKind} record.`,
            relationship.fromId,
            pathFor(relationship.fromId),
          ),
        );
      }
      continue;
    }

    const from = validRecords.get(relationship.fromId);
    const fromPath = pathFor(relationship.fromId);

    if (from?.kind === "claim" && relationship.field === "sourceId") {
      diagnostics.push(
        errorDiagnostic(
          "CLAIM_SOURCE_REQUIRED",
          `Claim ${relationship.fromId} names source ${relationship.toId}, which is not a listed manifest record.`,
          relationship.fromId,
          fromPath,
        ),
      );
      continue;
    }
    if (
      from?.kind === "claim" &&
      from.contentKind === "inference" &&
      relationship.field === "premiseClaimIds"
    ) {
      diagnostics.push(
        errorDiagnostic(
          "INFERENCE_PREMISES_REQUIRED",
          `Inference ${relationship.fromId} names premise ${relationship.toId}, which is not a listed manifest record.`,
          relationship.fromId,
          fromPath,
        ),
      );
      continue;
    }
    if (
      from?.kind === "assessment" &&
      (relationship.field === "supportingClaimIds" ||
        relationship.field === "conflictingClaimIds")
    ) {
      diagnostics.push(
        errorDiagnostic(
          "ASSESSMENT_SUPPORTING_CLAIM_UNLISTED",
          `Assessment ${relationship.fromId} names claim ${relationship.toId}, which is not a listed manifest record.`,
          relationship.fromId,
          fromPath,
        ),
      );
      continue;
    }

    diagnostics.push(
      errorDiagnostic(
        "RELATIONSHIP_TARGET_UNLISTED",
        `Record ${relationship.fromId} field ${relationship.field} references ${relationship.toId}, which is not a listed manifest record.`,
        relationship.fromId,
        fromPath,
      ),
    );
  }

  for (const record of validRecords.values()) {
    const path = pathFor(record.id);

    try {
      diagnostics.push(
        ...validateRecordSemantics(record, rubrics, recordById, listedPaths, listedAssets, listedHashes, path),
      );
    } catch (caught) {
      const message = caught instanceof Error ? caught.message : String(caught);
      diagnostics.push(
        errorDiagnostic(
          "RECORD_SCHEMA_INVALID",
          `Record ${record.id} could not be validated: ${message}.`,
          record.id,
          path,
        ),
      );
    }
  }

  return {
    diagnostics: Object.freeze(diagnostics),
    relationships,
    backlinks,
  };
}

function validateRecordSemantics(
  record: ContentRecord,
  rubrics: RubricCatalog,
  recordById: ReadonlyMap<string, ContentRecord>,
  listedPaths: ReadonlySet<string>,
  listedAssets: ReadonlyMap<string, string>,
  listedHashes: ReadonlyMap<string, string>,
  path: string | undefined,
): readonly Diagnostic[] {
  const diagnostics: Diagnostic[] = [];

  if (record.kind === "method-family") {
    if (record.id !== record.family) {
      diagnostics.push(
        errorDiagnostic(
          "METHOD_FAMILY_ID_MISMATCH",
          `Method-family record ${record.id} must use its family identifier ${record.family} as its stable ID.`,
          record.id,
          path,
        ),
      );
    }
    diagnostics.push(
      ...auditReferenceDiagnostics(record.id, record.auditReferences, path),
    );
  }

  if (record.kind === "hypothesis") {
    if (record.validationState !== "new-unvalidated-hypothesis") {
      diagnostics.push(
        errorDiagnostic(
          "HYPOTHESIS_VALIDATION_STATE_INVALID",
          `Hypothesis ${record.id} must remain an unvalidated hypothesis, not ${record.validationState}.`,
          record.id,
          path,
        ),
      );
    }
    if (record.failureModes.length === 0) {
      diagnostics.push(
        errorDiagnostic(
          "HYPOTHESIS_FALSIFIER_REQUIRED",
          `Hypothesis ${record.id} must declare at least one failure mode.`,
          record.id,
          path,
        ),
      );
    }
    if (record.falsifiers.length === 0) {
      diagnostics.push(
        errorDiagnostic(
          "HYPOTHESIS_FALSIFIER_REQUIRED",
          `Hypothesis ${record.id} must declare at least one falsifier.`,
          record.id,
          path,
        ),
      );
    }
    diagnostics.push(
      ...auditReferenceDiagnostics(record.id, record.auditReferences, path),
    );
  }

  if (record.kind === "claim") {
    if (
      record.contentKind === "claim" &&
      (record.evidenceState === "source-supported" ||
        record.evidenceState === "source-conflicted")
    ) {
      const sourceId = record.sourceId;
      if (sourceId === undefined || sourceId.length === 0) {
        diagnostics.push(
          errorDiagnostic(
            "CLAIM_SOURCE_REQUIRED",
            `Source-supported claim ${record.id} must name the source that supports it.`,
            record.id,
            path,
          ),
        );
      }
      if (record.locator === undefined || record.locator.length === 0) {
        diagnostics.push(
          errorDiagnostic(
            "CLAIM_LOCATOR_REQUIRED",
            `Source-supported claim ${record.id} must record a locator inside its source.`,
            record.id,
            path,
          ),
        );
      }
    }

    if (record.contentKind === "inference") {
      const premises = record.premiseClaimIds ?? [];
      if (premises.length === 0) {
        diagnostics.push(
          errorDiagnostic(
            "INFERENCE_PREMISES_REQUIRED",
            `Inference ${record.id} must name at least one premise claim.`,
            record.id,
            path,
          ),
        );
      }
      for (const premiseId of premises) {
        const premise = recordById.get(premiseId);
        if (premise === undefined || premise.kind !== "claim") {
          continue;
        }
        if (
          premise.evidenceState !== "source-supported" &&
          premise.evidenceState !== "source-conflicted"
        ) {
          diagnostics.push(
            errorDiagnostic(
              "INFERENCE_PREMISES_REQUIRED",
              `Inference ${record.id} names premise ${premiseId}, which is not a source-supported or source-conflicted claim.`,
              record.id,
              path,
            ),
          );
        }
      }
      if (record.reasoning === undefined || record.reasoning.length === 0) {
        diagnostics.push(
          errorDiagnostic(
            "INFERENCE_REASONING_REQUIRED",
            `Inference ${record.id} must record the reasoning that derives it from its premises.`,
            record.id,
            path,
          ),
        );
      }
      if (record.evidenceState !== "derived-from-sourced-premises") {
        diagnostics.push(
          errorDiagnostic(
            "INFERENCE_EVIDENCE_STATE_INVALID",
            `Inference ${record.id} must carry the derived-from-sourced-premises evidence state, not ${record.evidenceState}.`,
            record.id,
            path,
          ),
        );
      }
    }

    if (
      containsQuantitativeNumber(record.proposition) &&
      record.quantitativeBasis === undefined
    ) {
      diagnostics.push(
        errorDiagnostic(
          "CLAIM_QUANTITATIVE_BASIS_REQUIRED",
          `Claim ${record.id} states a quantity without an explicit quantitative basis.`,
          record.id,
          path,
        ),
      );
    }
  }

  if (record.kind === "gap" && record.contentKind === "ai-gap-closing-note") {
    const sourceInputIds = Array.isArray(record.sourceInputIds)
      ? record.sourceInputIds
      : [];
    const assumptions = Array.isArray(record.assumptions)
      ? record.assumptions
      : [];
    const falsifier =
      typeof record.falsifierOrDecisionCondition === "string"
        ? record.falsifierOrDecisionCondition
        : "";

    const problems: string[] = [];
    if (sourceInputIds.length === 0) {
      problems.push("at least one listed source input");
    }
    if (assumptions.length === 0) {
      problems.push("at least one stated assumption");
    }
    if (falsifier.length === 0) {
      problems.push("a falsifier or decision condition");
    }
    if (record.evidenceState !== "derived-from-sourced-premises") {
      problems.push("the derived-from-sourced-premises evidence state");
    }
    if (record.validationState !== "requires-human-validation") {
      problems.push("the requires-human-validation state");
    }
    if (problems.length > 0) {
      diagnostics.push(
        errorDiagnostic(
          "GAP_CLOSING_NOTE_INVALID",
          `AI gap-closing note ${record.id} requires ${problems.join(", ")}.`,
          record.id,
          path,
        ),
      );
    }
  }

  if (record.kind === "source") {
    const localArtifact = record.localArtifact;
    if (localArtifact !== undefined) {
      if (record.rights !== "public-local-copy") {
        diagnostics.push(
          errorDiagnostic(
            "SOURCE_LOCAL_COPY_RIGHTS_INVALID",
            `Source ${record.id} stores a local artifact but does not hold public-local-copy rights.`,
            record.id,
            path,
          ),
        );
      } else {
        const listedHash = listedAssets.get(localArtifact.path);
        if (listedHash === undefined) {
          diagnostics.push(
            errorDiagnostic(
              "SOURCE_LOCAL_COPY_RIGHTS_INVALID",
              `Source ${record.id} local artifact ${localArtifact.path} is not a manifest-listed asset.`,
              record.id,
              path,
            ),
          );
        } else if (listedHash !== localArtifact.sha256) {
          diagnostics.push(
            errorDiagnostic(
              "SOURCE_LOCAL_COPY_RIGHTS_INVALID",
              `Source ${record.id} local artifact ${localArtifact.path} does not match its manifest-listed hash.`,
              record.id,
              path,
            ),
          );
        }
      }
    }

    if (record.rights === "rights-unresolved") {
      diagnostics.push(
        errorDiagnostic(
          "SOURCE_DERIVATIVE_RIGHTS_UNRESOLVED",
          `Source ${record.id} does not state an explicit publication right.`,
          record.id,
          path,
        ),
      );
    }

    for (const derivative of record.derivatives) {
      if (derivative === null || typeof derivative !== "object") {
        continue;
      }
      if (
        !isNormalizedRelativePath(derivative.path) ||
        entersRepositoryLocalRoot(derivative.path)
      ) {
        diagnostics.push(
          errorDiagnostic(
            "SOURCE_DERIVATIVE_PATH_INVALID",
            `Derivative ${derivative.id} of source ${record.id} names a path that is not a normalized path inside the publication root.`,
            record.id,
            path,
          ),
        );
      } else {
        const listedHash = listedHashes.get(derivative.path);
        if (listedHash !== undefined && listedHash !== derivative.sha256) {
          diagnostics.push(
            errorDiagnostic(
              "SOURCE_DERIVATIVE_HASH_MISMATCH",
              `Derivative ${derivative.id} of source ${record.id} does not match the manifest hash of ${derivative.path}.`,
              record.id,
              path,
            ),
          );
        }
      }
      if (derivative.publicationRight === "unresolved") {
        diagnostics.push(
          errorDiagnostic(
            "SOURCE_DERIVATIVE_RIGHTS_UNRESOLVED",
            `Derivative ${derivative.id} of source ${record.id} does not state an explicit right.`,
            record.id,
            path,
          ),
        );
      } else if (
        derivative.publicationRight === "metadata-only" &&
        listedPaths.has(derivative.path)
      ) {
        diagnostics.push(
          errorDiagnostic(
            "SOURCE_DERIVATIVE_RIGHTS_UNRESOLVED",
            `Derivative ${derivative.id} of source ${record.id} is manifest-listed but only holds metadata-only rights.`,
            record.id,
            path,
          ),
        );
      }
      const qualityWarnings = Array.isArray(derivative.qualityWarnings)
        ? derivative.qualityWarnings
        : [];
      if (qualityWarnings.length > 0) {
        diagnostics.push(
          warningDiagnostic(
            "DERIVATIVE_QUALITY_WARNING",
            `Derivative ${derivative.id} of source ${record.id} carries extraction quality warnings.`,
            record.id,
            path,
          ),
        );
      }
    }
  }

  if (record.kind === "assessment") {
    if (record.rubricVersion !== rubrics.rubricVersion) {
      diagnostics.push(
        errorDiagnostic(
          "ASSESSMENT_RUBRIC_VERSION_MISMATCH",
          `Assessment ${record.id} uses rubric version ${record.rubricVersion} instead of the active version ${rubrics.rubricVersion}.`,
          record.id,
          path,
        ),
      );
    }

    if (record.status === "scored") {
      const criterion = rubrics.criteria.find(
        (candidate) => candidate.id === record.criterionId,
      );
      const band = criterion?.bands.find(
        (candidate) => candidate.score === record.score,
      );
      if (band !== undefined && band.label !== record.label) {
        diagnostics.push(
          errorDiagnostic(
            "ASSESSMENT_LABEL_MISMATCH",
            `Assessment ${record.id} label "${record.label}" does not match the rubric band label "${band.label}" for score ${record.score}.`,
            record.id,
            path,
          ),
        );
      }
      if (
        (record.basis === "source-supported" || record.basis === "inference") &&
        record.supportingClaimIds.length === 0
      ) {
        diagnostics.push(
          errorDiagnostic(
            "ASSESSMENT_SUPPORTING_CLAIM_REQUIRED",
            `Assessment ${record.id} uses a ${record.basis} basis without a supporting claim.`,
            record.id,
            path,
          ),
        );
      }
    }

    if (record.status === "unknown") {
      diagnostics.push(
        warningDiagnostic(
          "ASSESSMENT_UNKNOWN",
          `Assessment ${record.id} is unknown and remains open for human review.`,
          record.id,
          path,
        ),
      );
    }
  }

  const evidenceState =
    record.kind === "claim" || record.kind === "gap" || record.kind === "hypothesis"
      ? record.evidenceState
      : undefined;
  if (evidenceState === "source-conflicted") {
    diagnostics.push(
      warningDiagnostic(
        "SOURCE_EVIDENCE_CONFLICT",
        `Record ${record.id} is marked source-conflicted and needs human reconciliation.`,
        record.id,
        path,
      ),
    );
  }

  return diagnostics;
}
