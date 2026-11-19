/**
 * Publication-layer rules for the reader platform.
 *
 * These tests check the properties the reader-platform design makes about the
 * published layer itself, rather than about the contract tool:
 *
 *  - the layer declares the material and exactly the six stable method
 *    families, so the reader can navigate by family rather than by internal
 *    file name;
 *  - every published family keeps a pointer back to the internal audit trail
 *    (audit aliases), so a reader can follow the evidence without the
 *    internal identifiers dominating the page;
 *  - every quantitative claim states its denominator and mass basis, because
 *    "a number without a basis" is the failure mode this project exists to
 *    prevent;
 *  - no published record exposes a repository-local path or a session log,
 *    because the published bundle is public;
 *  - no published sentence asserts that a family is clean, safe, validated or
 *    superior, unless the same sentence carries the negation or uncertainty
 *    that makes the claim honest;
 *  - every family states its missing evidence and the human work that would
 *    close it.
 *
 * The file is written test-first: it fails against the empty Phase-1
 * manifest and passes only once the approved pilot content is published.
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

import { parse } from "yaml";

import { loadAndValidateManifest } from "../src/manifest-validation.ts";
import type { ContentRecord } from "../src/model/index.ts";
import { METHOD_FAMILY_IDS } from "../src/model/index.ts";

const PUBLICATION_ROOT = fileURLToPath(
  new URL("../../../publication/", import.meta.url),
);
const RUBRICS_PATH = fileURLToPath(
  new URL("../../../publication/contract/v1/rubrics.yaml", import.meta.url),
);
const LAYER_PAGES_DIR = fileURLToPath(new URL("../layer-data/pages/", import.meta.url));
const LAYER_PAGES_INDEX = fileURLToPath(
  new URL("../layer-data/pages.json", import.meta.url),
);

/**
 * The narrative pages the reader application routes point at. Each one is
 * written by the research assistant and published through the manifest, so
 * that a route never exists without content behind it.
 */
const NARRATIVE_PAGES: ReadonlyArray<{ id: string; route: string }> = [
  { id: "start-here", route: "/start/" },
  { id: "egypt-annex", route: "/egypt/" },
  { id: "how-the-research-works", route: "/research-method/" },
  { id: "limitations", route: "/limitations/" },
  { id: "evidence-map", route: "/methods/examples/" },
];

type FamilyRecord = Extract<ContentRecord, { kind: "method-family" }>;
type ClaimRecord = Extract<ContentRecord, { kind: "claim" }>;
type GapRecord = Extract<ContentRecord, { kind: "gap" }>;
type SourceRecord = Extract<ContentRecord, { kind: "source" }>;
type HypothesisRecord = Extract<ContentRecord, { kind: "hypothesis" }>;

function recordsOfKind<K extends ContentRecord["kind"]>(
  records: Iterable<ContentRecord>,
  kind: K,
  minimum = 1,
): Array<Extract<ContentRecord, { kind: K }>> {
  const matching = [...records].filter(
    (record): record is Extract<ContentRecord, { kind: K }> =>
      record.kind === kind,
  );
  assert.ok(
    matching.length >= minimum,
    `the published layer must contain at least ${minimum} ${kind} record(s), found ${matching.length}`,
  );
  return matching;
}

/** Every string value reachable from a record, for prose scanning. */
function collectStrings(value: unknown, found: string[] = []): string[] {
  if (typeof value === "string") {
    found.push(value);
    return found;
  }
  if (Array.isArray(value)) {
    for (const entry of value) {
      collectStrings(entry, found);
    }
    return found;
  }
  if (value !== null && typeof value === "object") {
    for (const entry of Object.values(value as Record<string, unknown>)) {
      collectStrings(entry, found);
    }
  }
  return found;
}

/** Prose only: identifiers, URLs and hashes are not sentences. */
function proseFragments(records: Iterable<ContentRecord>): string[] {
  const fragments: string[] = [];
  for (const record of records) {
    const copy: Record<string, unknown> = { ...record };
    delete copy["id"];
    delete copy["sha256"];
    delete copy["sourceId"];
    delete copy["auditAliases"];
    delete copy["auditReferences"];
    delete copy["originalUrl"];
    delete copy["localArtifact"];
    delete copy["derivatives"];
    delete copy["quantitativeBasis"];
    for (const text of collectStrings(copy)) {
      fragments.push(text);
    }
  }
  return fragments;
}

function sentences(text: string): string[] {
  return text
    .split(/(?<=[.!?])\s+|\r?\n/)
    .map((sentence) => sentence.trim())
    .filter((sentence) => sentence.length > 0);
}

/**
 * Assertion phrases the published layer must never make without the same
 * sentence also carrying a negation or an uncertainty marker.
 */
const UNSAFE_ASSERTION_TRIGGERS: readonly string[] = [
  "proven clean",
  "fully detoxified",
  "is detoxified",
  "commercially validated",
  "commercially proven",
  "environmentally superior",
  "novel process",
  "is patentable",
  "are patentable",
  "free of nicotine",
  "removes all nicotine",
  "zero nicotine",
  "100% clean",
  "safe to use",
  "safe for consumption",
  "safe and effective",
  "proven safe",
  "is harmless",
];

/**
 * Markers that turn an assertion phrase into an honest statement: a negation,
 * a refusal, or an explicit statement that the evidence is absent.
 */
const NEGATION_MARKERS: readonly string[] = [
  "not ",
  "no ",
  "never",
  "cannot",
  "without",
  "neither",
  "nor ",
  "unvalidated",
  "unproven",
  "unknown",
  "not located",
  "not demonstrated",
  "not established",
  "requires",
  "must ",
  "would ",
  "should ",
  "does not",
  "do not",
  "did not",
  "nothing",
  "absent",
  "missing",
  "no evidence",
  "none of",
  "neither of",
];

/** Units that make a number in prose a quantity rather than an identifier. */
const QUANTITY_PATTERN =
  /\d+(?:[.,]\d+)*\s*(?:%|mg\/kg|ng\/m3|µg\/m3|kg\/kWh|kWh\/kg|MJ\/kg|kg\/t|g\/L|mg\/L|ng\/L|g\/m3|ng|µg|mg|kg|kWh|MWh|Wh|MJ|GJ|kJ|MPa|kPa|Pa|hrs|hr|min|cycles|units|grams?|kilograms?|milligrams?|liters?|litres?|percent|hours?|minutes?|seconds?|°C|K)\b/i;

const REPOSITORY_LOCAL_PATTERNS: readonly string[] = [
  "session-log",
  ".superpowers",
  "state/workflow.yaml",
  "state/session-log.md",
  "reports/batch-02",
  "reports/final",
  "registry/methods",
  "materials/gap-closing",
  "docs/superpowers",
  "panels/batch-01",
  "tools/publication-contract",
  "dossier/",
  "C:\\",
  "/home/",
  "/Users/",
];

test("the publication layer declares one material and exactly the six stable method families", async () => {
  const loaded = await loadAndValidateManifest(PUBLICATION_ROOT);
  const families = recordsOfKind(loaded.records.values(), "method-family", 0);
  const materials = recordsOfKind(loaded.records.values(), "material", 0);

  assert.equal(materials.length, 1, "the layer must declare exactly one material");
  assert.deepEqual(
    families.map((family) => family.family).sort(),
    [...METHOD_FAMILY_IDS].sort(),
    "the layer must declare exactly the six stable method families",
  );
  assert.equal(
    new Set(families.map((family) => family.id)).size,
    families.length,
    "method family identifiers must be unique",
  );
});

test("every published method family keeps a pointer back to the internal audit trail", async () => {
  const loaded = await loadAndValidateManifest(PUBLICATION_ROOT);
  for (const family of recordsOfKind(loaded.records.values(), "method-family")) {
    assert.ok(
      family.auditAliases.length > 0,
      `${family.id} must name at least one internal audit alias`,
    );
  }
});

test("every published method family states its missing evidence and the human work that would close it", async () => {
  const loaded = await loadAndValidateManifest(PUBLICATION_ROOT);
  for (const family of recordsOfKind(loaded.records.values(), "method-family")) {
    assert.ok(
      family.gapIds.length > 0,
      `${family.id} must point at the evidence gaps that remain open`,
    );
    assert.ok(
      family.claimIds.length > 0,
      `${family.id} must point at the claims it makes`,
    );
    assert.ok(
      family.sinks.length > 0,
      `${family.id} must name the sink it produces`,
    );
  }
});

test("every published claim that states a quantity records its denominator and mass basis", async () => {
  const loaded = await loadAndValidateManifest(PUBLICATION_ROOT);
  for (const claim of recordsOfKind(loaded.records.values(), "claim")) {
    if (claim.quantitativeBasis !== undefined) {
      continue;
    }
    assert.ok(
      !QUANTITY_PATTERN.test(claim.proposition),
      `${claim.id} states a quantity without a mass basis: ${claim.proposition}`,
    );
  }
});

test("every published source-supported claim names its source and a locator inside it", async () => {
  const loaded = await loadAndValidateManifest(PUBLICATION_ROOT);
  for (const claim of recordsOfKind(loaded.records.values(), "claim")) {
    if (claim.evidenceState !== "source-supported") {
      continue;
    }
    assert.ok(claim.sourceId, `${claim.id} must name its supporting source`);
    assert.ok(claim.locator, `${claim.id} must name a locator inside its source`);
  }
});

test("no published source carries a local artifact without public-local-copy rights", async () => {
  const loaded = await loadAndValidateManifest(PUBLICATION_ROOT);
  for (const source of recordsOfKind(loaded.records.values(), "source")) {
    if (source.localArtifact === undefined) {
      continue;
    }
    assert.equal(
      source.rights,
      "public-local-copy",
      `${source.id} stores a local artifact without public-local-copy rights`,
    );
  }
});

// The hypothesis test lives with the invention, in the invention gate. The
// publication manifest admits only approved records, and the batch-02
// invention is still awaiting the operator's decision, so publishing a
// hypothesis record now would publish an unaccepted proposal.

test("no published record exposes a repository-local path", async () => {
  const loaded = await loadAndValidateManifest(PUBLICATION_ROOT);
  assert.ok(loaded.records.size > 0, "the published layer must publish records");
  const published = [...proseFragments(loaded.records.values())];
  for (const page of loaded.pages.values()) {
    published.push(page);
  }
  for (const text of published) {
    for (const pattern of REPOSITORY_LOCAL_PATTERNS) {
      assert.ok(
        !text.includes(pattern),
        `published content exposes the repository-local path "${pattern}": ${text.slice(0, 120)}`,
      );
    }
  }
});

test("no published sentence asserts that a family is clean, safe, validated or superior", async () => {
  const loaded = await loadAndValidateManifest(PUBLICATION_ROOT);
  assert.ok(loaded.records.size > 0, "the published layer must publish records");
  const published = [...proseFragments(loaded.records.values())];
  for (const page of loaded.pages.values()) {
    published.push(page);
  }

  const offences: string[] = [];
  for (const text of published) {
    for (const sentence of sentences(text)) {
      const lowered = sentence.toLowerCase();
      const trigger = UNSAFE_ASSERTION_TRIGGERS.find((phrase) =>
        lowered.includes(phrase),
      );
      if (trigger === undefined) {
        continue;
      }
      const negated = NEGATION_MARKERS.some((marker) =>
        lowered.includes(marker),
      );
      if (!negated) {
        offences.push(`${trigger} :: ${sentence.slice(0, 160)}`);
      }
    }
  }

  assert.deepEqual(
    offences,
    [],
    `published sentences assert a safety or superiority claim without negation:\n${offences.join("\n")}`,
  );
});

test("the published rubric catalog is the one the assessments are scored against", async () => {
  const rubrics = readFileSync(RUBRICS_PATH, "utf8");
  const parsed = parse(rubrics) as { rubricVersion?: unknown };
  assert.equal(typeof parsed.rubricVersion, "string");

  const loaded = await loadAndValidateManifest(PUBLICATION_ROOT);
  for (const assessment of recordsOfKind(loaded.records.values(), "assessment")) {
    assert.equal(
      assessment.rubricVersion,
      parsed.rubricVersion,
      `${assessment.id} must be scored against the active rubric version`,
    );
  }
});

test("every published gap names the human work that would close it", async () => {
  const loaded = await loadAndValidateManifest(PUBLICATION_ROOT);
  const gaps: GapRecord[] = recordsOfKind(loaded.records.values(), "gap");
  for (const gap of gaps) {
    assert.ok(
      gap.question.length > 0,
      `${gap.id} must state a plain-language question`,
    );
    assert.ok(
      gap.whyItMatters.length > 0,
      `${gap.id} must state why the gap matters`,
    );
    assert.ok(
      gap.affectedRecordIds.length > 0,
      `${gap.id} must name the records the gap affects`,
    );
  }
});

test("no published method family scores a criterion without a rationale or an explicit unknown reason", async () => {
  const loaded = await loadAndValidateManifest(PUBLICATION_ROOT);
  for (const assessment of recordsOfKind(
    loaded.records.values(),
    "assessment",
  )) {
    if (assessment.status === "scored") {
      assert.ok(
        assessment.rationale.length > 0,
        `${assessment.id} must explain the score it gives`,
      );
    } else if (assessment.status === "unknown") {
      assert.ok(
        assessment.unknownReason.length > 0,
        `${assessment.id} must say why the criterion is unknown`,
      );
    } else {
      assert.ok(
        assessment.notApplicableReason.length > 0,
        `${assessment.id} must say why the criterion does not apply`,
      );
    }
  }
});

test("the published layer keeps every claim attached to a method family it is about", async () => {
  const loaded = await loadAndValidateManifest(PUBLICATION_ROOT);
  const methodIds = new Set(
    recordsOfKind(loaded.records.values(), "method-family").map(
      (family) => family.id,
    ),
  );
  for (const claim of recordsOfKind(loaded.records.values(), "claim")) {
    for (const methodId of claim.methodIds) {
      assert.ok(
        methodIds.has(methodId),
        `${claim.id} points at unknown method family ${methodId}`,
      );
    }
  }
});

/**
 * Hypothesis gate: every published hypothesis must carry the explicit
 * new-unvalidated-hypothesis validation state, at least one falsifier,
 * at least one failure mode, and must link to concrete gaps via
 * validationQuestionIds. This is the reader-platform gate that prevents
 * an unvalidated hypothesis from being presented as established knowledge.
 */
test("every published hypothesis passes the new-unvalidated-hypothesis gate", async () => {
  const loaded = await loadAndValidateManifest(PUBLICATION_ROOT);
  const hypotheses = recordsOfKind(loaded.records.values(), "hypothesis", 0);

  for (const hypothesis of hypotheses) {
    // 1. validationState must be exactly "new-unvalidated-hypothesis"
    assert.equal(
      hypothesis.validationState,
      "new-unvalidated-hypothesis",
      `${hypothesis.id} must declare validationState: "new-unvalidated-hypothesis"`,
    );

    // 2. At least one falsifier (the measurement that could kill the hypothesis)
    assert.ok(
      hypothesis.falsifiers.length > 0,
      `${hypothesis.id} must name at least one falsifier (the measurement that could kill it)`,
    );

    // 3. At least one failure mode (how the hypothesis could be wrong)
    assert.ok(
      hypothesis.failureModes.length > 0,
      `${hypothesis.id} must name at least one failure mode (how it could be wrong)`,
    );

    // 4. At least one validationQuestionId linking to concrete gaps
    assert.ok(
      hypothesis.validationQuestionIds.length > 0,
      `${hypothesis.id} must link to at least one concrete gap via validationQuestionIds`,
    );

    // 5. Each validationQuestionId must resolve to a published gap
    const gapIds = new Set(
      recordsOfKind(loaded.records.values(), "gap").map((gap) => gap.id),
    );
    for (const qid of hypothesis.validationQuestionIds) {
      assert.ok(
        gapIds.has(qid),
        `${hypothesis.id} references unknown gap ${qid} in validationQuestionIds`,
      );
    }

    // 6. The hypothesis must name its source inputs
    assert.ok(
      hypothesis.sourceInputIds.length > 0,
      `${hypothesis.id} must name its source inputs`,
    );

    // 7. The hypothesis must declare assumptions
    assert.ok(
      hypothesis.assumptions.length > 0,
      `${hypothesis.id} must declare at least one assumption`,
    );

    // 8. The hypothesis must declare unresolved dependencies
    assert.ok(
      hypothesis.unresolvedDependencies.length > 0,
      `${hypothesis.id} must declare at least one unresolved dependency`,
    );

    // 9. The hypothesis must carry an evidenceState derived from sourced premises
    assert.equal(
      hypothesis.evidenceState,
      "derived-from-sourced-premises",
      `${hypothesis.id} must declare evidenceState: "derived-from-sourced-premises"`,
    );

    // 10. The hypothesis must name its reviewer
    assert.ok(
      hypothesis.reviewer.length > 0,
      `${hypothesis.id} must name its reviewer`,
    );

    // 11. The hypothesis must carry a recordVersion
    assert.ok(
      hypothesis.recordVersion.length > 0,
      `${hypothesis.id} must carry a recordVersion`,
    );

    // 12. The hypothesis must carry audit references
    assert.ok(
      hypothesis.auditReferences.length > 0,
      `${hypothesis.id} must carry at least one audit reference`,
    );

    // 13. Every method family must reference this hypothesis
    for (const family of recordsOfKind(loaded.records.values(), "method-family")) {
      assert.ok(
        family.hypothesisIds.includes(hypothesis.id),
        `${family.id} must reference hypothesis ${hypothesis.id} in hypothesisIds`,
      );
    }
  }
});

/**
 * Narrative-page gate.
 *
 * The reader application has routes for the four narrative pages: start here,
 * the Egypt annex, how the research was produced, and the limitations. A route
 * with no published page behind it is a broken route, so the manifest must
 * list all four, each at a stable path, with content.
 *
 * The narrative pages are authored by the research assistant, so they live in
 * the layer data and are published by the generator. The second test pins that
 * relationship: the published page must be byte-identical to its source, which
 * keeps the manifest reproducible and stops a page from being edited in place
 * behind the generator's back.
 */
test("the manifest publishes the narrative pages the reader routes need", async () => {
  const loaded = await loadAndValidateManifest(PUBLICATION_ROOT);

  assert.equal(
    loaded.manifest.pages.length,
    METHOD_FAMILY_IDS.length + NARRATIVE_PAGES.length,
    "the layer must publish one page per method family plus one per narrative page",
  );

  for (const page of NARRATIVE_PAGES) {
    const entry = loaded.manifest.pages.find((candidate) => candidate.id === page.id);
    assert.ok(entry, `the manifest must list the narrative page "${page.id}"`);
    assert.equal(
      entry.path,
      `pages/${page.id}.md`,
      `the narrative page "${page.id}" must be published at a stable path`,
    );

    const text = loaded.pages.get(page.id);
    assert.ok(
      text !== undefined && text.trim().length > 0,
      `the narrative page "${page.id}" must have content`,
    );
  }
});

test("every narrative page is reproducible from the layer-data source of truth", async () => {
  const loaded = await loadAndValidateManifest(PUBLICATION_ROOT);

  for (const page of NARRATIVE_PAGES) {
    const source = readFileSync(join(LAYER_PAGES_DIR, `${page.id}.md`), "utf8");
    const published = loaded.pages.get(page.id);
    assert.equal(
      published,
      source,
      `the published narrative page "${page.id}" must match its layer-data source byte for byte`,
    );
  }
});

test("the narrative-page index declares a route for every narrative page", async () => {
  const index = parse(readFileSync(LAYER_PAGES_INDEX, "utf8")) as {
    pages?: Array<{ id?: unknown; route?: unknown; file?: unknown }>;
  };
  assert.ok(Array.isArray(index.pages), "the narrative-page index must list pages");

  const byId = new Map(
    index.pages.map((page) => [String(page.id), page] as const),
  );

  for (const page of NARRATIVE_PAGES) {
    const entry = byId.get(page.id);
    assert.ok(entry, `the narrative-page index must list "${page.id}"`);
    assert.equal(
      String(entry.route),
      page.route,
      `the narrative page "${page.id}" must declare its reader route`,
    );
    assert.equal(
      String(entry.file),
      `${page.id}.md`,
      `the narrative page "${page.id}" must name its markdown file`,
    );
  }

  assert.equal(
    byId.size,
    NARRATIVE_PAGES.length,
    "the narrative-page index must not list pages the reader has no route for",
  );
});

test("every narrative page states that it does not authorise an experiment", async () => {
  const loaded = await loadAndValidateManifest(PUBLICATION_ROOT);

  for (const page of NARRATIVE_PAGES) {
    const text = loaded.pages.get(page.id) ?? "";
    assert.match(
      text,
      /does not authorise any experiment/i,
      `the narrative page "${page.id}" must say that it does not authorise any experiment`,
    );
  }
});
