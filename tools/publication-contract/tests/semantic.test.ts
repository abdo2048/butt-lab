import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFileSync, readdirSync } from "node:fs";
import { rm } from "node:fs/promises";
import { join } from "node:path";
import test, { type TestContext } from "node:test";
import { fileURLToPath } from "node:url";

import { parse, stringify } from "yaml";

import type { LoadedPublication } from "../src/manifest-validation.ts";
import { loadAndValidateManifest } from "../src/manifest-validation.ts";
import { sha256File } from "../src/load.ts";
import type {
  ContentRecord,
  RubricCatalog,
} from "../src/model/index.ts";
import { RubricCatalogSchema } from "../src/model/index.ts";
import {
  buildBacklinks,
  collectRelationships,
} from "../src/relationships.ts";
import type { ValidationResult } from "../src/semantic-validation.ts";
import { validatePublicationSemantics } from "../src/semantic-validation.ts";
import type { FixtureRecord } from "./helpers.ts";
import {
  addListedAsset,
  cloneFixtureRecords,
  createValidFixture,
  findFixtureRecord,
  makeTempDirectory,
  VALID_FIXTURE_RECORDS,
  writeFixture,
  writeFixtureRecords,
} from "./helpers.ts";

const rubrics: RubricCatalog = RubricCatalogSchema.parse(
  parse(
    readFileSync(
      new URL("../../../publication/contract/v1/rubrics.yaml", import.meta.url),
      "utf8",
    ),
  ),
);

async function temporaryRoot(t: TestContext): Promise<string> {
  const root = await makeTempDirectory();
  t.after(() => rm(root, { force: true, recursive: true }));
  return root;
}

async function loadFixture(
  t: TestContext,
  records: readonly FixtureRecord[],
): Promise<LoadedPublication> {
  const root = await temporaryRoot(t);
  await writeFixtureRecords(root, records);
  return loadAndValidateManifest(root);
}

function errorCodes(result: ValidationResult): readonly string[] {
  return result.diagnostics
    .filter((diagnostic) => diagnostic.severity === "error")
    .map((diagnostic) => diagnostic.code);
}

function warningCodes(result: ValidationResult): readonly string[] {
  return result.diagnostics
    .filter((diagnostic) => diagnostic.severity === "warning")
    .map((diagnostic) => diagnostic.code);
}

function scoredAssessment(
  records: readonly FixtureRecord[],
  overrides: Record<string, unknown> = {},
): FixtureRecord {
  const assessment = findFixtureRecord(records, "mechanical-resource-burden-v1");
  const criterion = rubrics.criteria.find(
    (candidate) => candidate.id === "resource-burden",
  );
  assert.ok(criterion);
  const band = criterion.bands.find((candidate) => candidate.score === 1);
  assert.ok(band);
  delete assessment["unknownReason"];
  Object.assign(assessment, {
    status: "scored",
    score: 1,
    label: band.label,
    rationale: "Fixture rationale for contract testing only.",
    basis: "source-supported",
    ...overrides,
  });
  return assessment;
}

/**
 * Builds a loaded publication directly from record objects.
 *
 * Some invariants are already enforced by the record schema. The semantic
 * layer must still enforce them independently, so those cases use records that
 * bypass schema validation rather than a manifest file.
 */
function syntheticPublication(
  records: readonly FixtureRecord[],
): LoadedPublication {
  const recordMap = new Map<string, ContentRecord>();
  for (const record of records) {
    const id = record["id"];
    if (typeof id !== "string") {
      throw new Error("Fixture records require a string id.");
    }
    recordMap.set(id, record as unknown as ContentRecord);
  }

  return {
    root: "synthetic",
    manifest: {
      schemaVersion: 1,
      publicationVersion: "phase-1-contract",
      records: [...recordMap.values()].map((record) => ({
        id: record.id,
        path: `synthetic/${record.kind}/${record.id}.yaml`,
        sha256: "0".repeat(64),
      })),
      pages: [],
      assets: [],
    },
    records: recordMap,
    pages: new Map(),
    assets: new Map(),
  };
}

test("createValidFixture writes records, a page, and a hash-accurate manifest", async (t) => {
  const root = await temporaryRoot(t);

  const created = await createValidFixture(root);

  assert.equal(created.root, root);
  assert.equal(created.manifest.schemaVersion, 1);
  assert.equal(created.manifest.publicationVersion, "phase-1-contract");
  assert.equal(created.manifest.records.length, VALID_FIXTURE_RECORDS.length);
  assert.equal(created.manifest.pages.length, 1);
  assert.equal(created.manifest.assets.length, 0);
  assert.equal(created.manifest.pages[0]?.id, "start-here");
  assert.equal(created.manifest.pages[0]?.path, "pages/start-here.md");

  for (const entry of created.manifest.records) {
    assert.equal(await sha256File(join(root, entry.path)), entry.sha256);
  }
  const pageEntry = created.manifest.pages[0];
  assert.ok(pageEntry);
  assert.equal(await sha256File(join(root, pageEntry.path)), pageEntry.sha256);

  const loaded = await loadAndValidateManifest(root);
  assert.equal(loaded.records.size, VALID_FIXTURE_RECORDS.length);
  assert.equal(loaded.pages.size, 1);
  assert.equal(loaded.assets.size, 0);
});

test("the valid fixture produces zero error diagnostics", async (t) => {
  const loaded = await loadFixture(t, cloneFixtureRecords());

  const result = validatePublicationSemantics(loaded, rubrics);

  assert.deepEqual(errorCodes(result), []);
});

test("ASSESSMENT_DUPLICATE_CRITERION reports two assessments for the same method and criterion", async (t) => {
  const existing = findFixtureRecord(
    cloneFixtureRecords(),
    "mechanical-resource-burden-v1",
  );
  assert.ok(existing);

  const records = [...cloneFixtureRecords(), {
    ...existing,
    id: "mechanical-resource-burden-duplicate-v1",
    title: "Fixture resource burden duplicate",
  }];
  const method = findFixtureRecord(records, "mechanical-physical");
  assert.ok(method);
  method["assessmentIds"] = [
    ...(method["assessmentIds"] as string[]),
    "mechanical-resource-burden-duplicate-v1",
  ];

  const loaded = await loadFixture(t, records);
  const result = validatePublicationSemantics(loaded, rubrics);

  assert.deepEqual(errorCodes(result), ["ASSESSMENT_DUPLICATE_CRITERION"]);
});

test("ASSESSMENT_CRITERION_MISSING reports a method without an assessment for every criterion", async (t) => {
  const records = cloneFixtureRecords().filter(
    (record) => record["id"] !== "mechanical-validation-maturity-v1",
  );
  const method = findFixtureRecord(records, "mechanical-physical");
  assert.ok(method);
  method["assessmentIds"] = (method["assessmentIds"] as string[]).filter(
    (id) => id !== "mechanical-validation-maturity-v1",
  );

  const loaded = await loadFixture(t, records);
  const result = validatePublicationSemantics(loaded, rubrics);

  assert.deepEqual(errorCodes(result), ["ASSESSMENT_CRITERION_MISSING"]);
});

test("SEMANTIC_DUPLICATE_RECORD_ID reports a stable ID used by two records", () => {
  const duplicate = cloneFixtureRecords()[0];
  assert.ok(duplicate);
  const publication: LoadedPublication = {
    root: "synthetic",
    manifest: {
      schemaVersion: 1,
      publicationVersion: "phase-1-contract",
      records: [],
      pages: [],
      assets: [],
    },
    records: new Map<string, ContentRecord>([
      ["cigarette-butts", duplicate as unknown as ContentRecord],
      ["duplicate-copy", duplicate as unknown as ContentRecord],
    ]),
    pages: new Map(),
    assets: new Map(),
  };

  const result = validatePublicationSemantics(publication, rubrics);

  assert.ok(
    result.diagnostics.some(
      (diagnostic) =>
        diagnostic.code === "SEMANTIC_DUPLICATE_RECORD_ID" &&
        diagnostic.severity === "error",
    ),
  );
});

test("RELATIONSHIP_TARGET_UNLISTED reports a relationship target that is not listed", async (t) => {
  const records = cloneFixtureRecords();
  const material = findFixtureRecord(records, "cigarette-butts");
  material["termIds"] = ["cellulose-acetate", "unlisted-term"];

  const loaded = await loadFixture(t, records);
  const result = validatePublicationSemantics(loaded, rubrics);

  const diagnostic = result.diagnostics.find(
    (candidate) => candidate.code === "RELATIONSHIP_TARGET_UNLISTED",
  );
  assert.ok(diagnostic);
  assert.equal(diagnostic.severity, "error");
  assert.match(diagnostic.message, /unlisted-term/);
});

test("CLAIM_SOURCE_REQUIRED reports a source-supported claim without a source", async (t) => {
  const records = cloneFixtureRecords();
  const claim = findFixtureRecord(records, "example-mechanism-claim");
  delete claim["sourceId"];

  const loaded = await loadFixture(t, records);
  const result = validatePublicationSemantics(loaded, rubrics);

  assert.ok(errorCodes(result).includes("CLAIM_SOURCE_REQUIRED"));
});

test("CLAIM_SOURCE_REQUIRED reports a source-supported claim whose source is not listed", async (t) => {
  const records = cloneFixtureRecords();
  const claim = findFixtureRecord(records, "example-mechanism-claim");
  claim["sourceId"] = "unlisted-source";

  const loaded = await loadFixture(t, records);
  const result = validatePublicationSemantics(loaded, rubrics);

  assert.ok(errorCodes(result).includes("CLAIM_SOURCE_REQUIRED"));
});

test("CLAIM_LOCATOR_REQUIRED reports a source-supported claim without a locator", async (t) => {
  const records = cloneFixtureRecords();
  const claim = findFixtureRecord(records, "example-mechanism-claim");
  delete claim["locator"];

  const loaded = await loadFixture(t, records);
  const result = validatePublicationSemantics(loaded, rubrics);

  assert.ok(errorCodes(result).includes("CLAIM_LOCATOR_REQUIRED"));
});

test("CLAIM_QUANTITATIVE_BASIS_REQUIRED reports a numeric proposition without a quantitative basis", async (t) => {
  const records = cloneFixtureRecords();
  const claim = findFixtureRecord(records, "example-mechanism-claim");
  claim["proposition"] = "The fixture yields 42 g of residue per batch.";

  const loaded = await loadFixture(t, records);
  const result = validatePublicationSemantics(loaded, rubrics);

  assert.ok(errorCodes(result).includes("CLAIM_QUANTITATIVE_BASIS_REQUIRED"));
});

test("CLAIM_QUANTITATIVE_BASIS_REQUIRED reports a six-digit magnitude without a quantitative basis", async (t) => {
  const records = cloneFixtureRecords();
  const claim = findFixtureRecord(records, "example-mechanism-claim");
  claim["proposition"] = "The fixture yields 250000 units of residue per batch.";

  const loaded = await loadFixture(t, records);
  const result = validatePublicationSemantics(loaded, rubrics);

  assert.ok(errorCodes(result).includes("CLAIM_QUANTITATIVE_BASIS_REQUIRED"));
});

test("CLAIM_QUANTITATIVE_BASIS_REQUIRED reports a seven-digit magnitude without a quantitative basis", async (t) => {
  const records = cloneFixtureRecords();
  const claim = findFixtureRecord(records, "example-mechanism-claim");
  claim["proposition"] = "The fixture batch contained 1500000 g of residue.";

  const loaded = await loadFixture(t, records);
  const result = validatePublicationSemantics(loaded, rubrics);

  assert.ok(errorCodes(result).includes("CLAIM_QUANTITATIVE_BASIS_REQUIRED"));
});

test("a comma-grouped magnitude without a quantitative basis is reported", async (t) => {
  const records = cloneFixtureRecords();
  const claim = findFixtureRecord(records, "example-mechanism-claim");
  claim["proposition"] = "The fixture yields 1,500,000 g of residue per batch.";

  const loaded = await loadFixture(t, records);
  const result = validatePublicationSemantics(loaded, rubrics);

  assert.ok(errorCodes(result).includes("CLAIM_QUANTITATIVE_BASIS_REQUIRED"));
});

test("a source identifier expressed as a prefixed document number does not require a quantitative basis", async (t) => {
  const records = cloneFixtureRecords();
  const claim = findFixtureRecord(records, "example-mechanism-claim");
  claim["proposition"] = "The fixture patent is US 6,123,456.";

  const loaded = await loadFixture(t, records);
  const result = validatePublicationSemantics(loaded, rubrics);

  assert.ok(!errorCodes(result).includes("CLAIM_QUANTITATIVE_BASIS_REQUIRED"));
});

test("a unit-bearing number is a magnitude even when it looks like an identifier", async (t) => {
  const flagged = [
    "The fixture yields 2000 g of residue per batch.",
    "The residue was yield-42g per batch.",
    "The residue was g-42 per batch.",
    "Table 500 kg of residue.",
    "See Figure 2500 kg of residue.",
    "The fixture residue was 120 ppm per batch.",
    "The fixture residue was 10 L per batch.",
    "The fixture residue was 25 kWh per batch.",
    "The fixture residue was 3 h per batch.",
    "The fixture residue was 20 °C per batch.",
    "The fixture residue was 250 mg/kg per batch.",
    "The fixture residue was 250000 ng/m3 per batch.",
  ];

  for (const proposition of flagged) {
    const records = cloneFixtureRecords();
    const claim = findFixtureRecord(records, "example-mechanism-claim");
    claim["proposition"] = proposition;

    const loaded = await loadFixture(t, records);
    const result = validatePublicationSemantics(loaded, rubrics);

    assert.ok(
      errorCodes(result).includes("CLAIM_QUANTITATIVE_BASIS_REQUIRED"),
      proposition,
    );
  }
});

test("a labelled figure reference does not require a quantitative basis", async (t) => {
  const records = cloneFixtureRecords();
  const claim = findFixtureRecord(records, "example-mechanism-claim");
  claim["proposition"] = "See Figure 2 of the fixture report.";

  const loaded = await loadFixture(t, records);
  const result = validatePublicationSemantics(loaded, rubrics);

  assert.ok(!errorCodes(result).includes("CLAIM_QUANTITATIVE_BASIS_REQUIRED"));
});

test("a labelled section reference does not require a quantitative basis", async (t) => {
  const records = cloneFixtureRecords();
  const claim = findFixtureRecord(records, "example-mechanism-claim");
  claim["proposition"] =
    "Per Section 3 of the fixture standard the material is fine.";

  const loaded = await loadFixture(t, records);
  const result = validatePublicationSemantics(loaded, rubrics);

  assert.ok(!errorCodes(result).includes("CLAIM_QUANTITATIVE_BASIS_REQUIRED"));
});

test("a year-only proposition does not require a quantitative basis", async (t) => {
  const records = cloneFixtureRecords();
  const claim = findFixtureRecord(records, "example-mechanism-claim");
  claim["proposition"] = "The fixture review was completed in 2026.";

  const loaded = await loadFixture(t, records);
  const result = validatePublicationSemantics(loaded, rubrics);

  assert.ok(!errorCodes(result).includes("CLAIM_QUANTITATIVE_BASIS_REQUIRED"));
});

test("source identifier forms do not require a quantitative basis", async (t) => {
  const accepted = [
    "The fixture patent is US1234567.",
    "The fixture record is example-patent-2.",
    "The fixture standard is ISO-13485.",
    "The fixture standard is ISO 14001.",
    "The fixture review was completed on 2026-11-14.",
    "The fixture review was completed in 2026.",
  ];

  for (const proposition of accepted) {
    const records = cloneFixtureRecords();
    const claim = findFixtureRecord(records, "example-mechanism-claim");
    claim["proposition"] = proposition;

    const loaded = await loadFixture(t, records);
    const result = validatePublicationSemantics(loaded, rubrics);

    assert.ok(
      !errorCodes(result).includes("CLAIM_QUANTITATIVE_BASIS_REQUIRED"),
      proposition,
    );
  }
});

test("a bare four-digit value without year context is reported as a magnitude", async (t) => {
  const records = cloneFixtureRecords();
  const claim = findFixtureRecord(records, "example-mechanism-claim");
  claim["proposition"] = "The fixture produced 2000 residue per batch.";

  const loaded = await loadFixture(t, records);
  const result = validatePublicationSemantics(loaded, rubrics);

  assert.ok(errorCodes(result).includes("CLAIM_QUANTITATIVE_BASIS_REQUIRED"));
});

test("a four-digit value with year context is not reported as a magnitude", async (t) => {
  const records = cloneFixtureRecords();
  const claim = findFixtureRecord(records, "example-mechanism-claim");
  claim["proposition"] = "The fixture batch was produced since 2000.";

  const loaded = await loadFixture(t, records);
  const result = validatePublicationSemantics(loaded, rubrics);

  assert.ok(!errorCodes(result).includes("CLAIM_QUANTITATIVE_BASIS_REQUIRED"));
});

test("a count in a year-shaped range after a cue word is reported as a magnitude", async (t) => {
  const records = cloneFixtureRecords();
  const claim = findFixtureRecord(records, "example-mechanism-claim");
  claim["proposition"] = "The fixture was tested in 2000 cases.";

  const loaded = await loadFixture(t, records);
  const result = validatePublicationSemantics(loaded, rubrics);

  assert.ok(errorCodes(result).includes("CLAIM_QUANTITATIVE_BASIS_REQUIRED"));
});

test("a count in a year-shaped range after a determiner is reported as a magnitude", async (t) => {
  const records = cloneFixtureRecords();
  const claim = findFixtureRecord(records, "example-mechanism-claim");
  claim["proposition"] = "The 2000 cases were reviewed.";

  const loaded = await loadFixture(t, records);
  const result = validatePublicationSemantics(loaded, rubrics);

  assert.ok(errorCodes(result).includes("CLAIM_QUANTITATIVE_BASIS_REQUIRED"));
});

test("a plain year introduced by a determiner is not reported as a magnitude", async (t) => {
  const records = cloneFixtureRecords();
  const claim = findFixtureRecord(records, "example-mechanism-claim");
  claim["proposition"] =
    "The 2026 review of the fixture found the residue acceptable.";

  const loaded = await loadFixture(t, records);
  const result = validatePublicationSemantics(loaded, rubrics);

  assert.ok(!errorCodes(result).includes("CLAIM_QUANTITATIVE_BASIS_REQUIRED"));
});

test("a long numeric run is scanned without quadratic blow-up", async (t) => {
  const records = cloneFixtureRecords();
  const claim = findFixtureRecord(records, "example-mechanism-claim");
  claim["proposition"] = "9".repeat(40_000);

  const loaded = await loadFixture(t, records);
  const startedAt = Date.now();
  const result = validatePublicationSemantics(loaded, rubrics);
  const elapsedMs = Date.now() - startedAt;

  assert.ok(
    elapsedMs < 3_000,
    `scanning a 40000 digit numeric run must stay linear, took ${elapsedMs}ms`,
  );
  assert.ok(errorCodes(result).includes("CLAIM_QUANTITATIVE_BASIS_REQUIRED"));
});

test("a numeric proposition with an explicit quantitative basis is accepted", async (t) => {
  const records = cloneFixtureRecords();
  const claim = findFixtureRecord(records, "example-mechanism-claim");
  claim["proposition"] = "The fixture yields 42 g of residue per batch.";
  claim["quantitativeBasis"] = {
    valueText: "42",
    units: "g",
    denominator: "one fixture batch",
    massBasis: "one fixture batch of fixture material",
  };

  const loaded = await loadFixture(t, records);
  const result = validatePublicationSemantics(loaded, rubrics);

  assert.ok(!errorCodes(result).includes("CLAIM_QUANTITATIVE_BASIS_REQUIRED"));
});

test("INFERENCE_PREMISES_REQUIRED reports an inference without premises", async (t) => {
  const records = cloneFixtureRecords();
  const inference = findFixtureRecord(records, "example-partition-inference");
  inference["premiseClaimIds"] = [];

  const loaded = await loadFixture(t, records);
  const result = validatePublicationSemantics(loaded, rubrics);

  assert.ok(errorCodes(result).includes("INFERENCE_PREMISES_REQUIRED"));
});

test("INFERENCE_PREMISES_REQUIRED reports an inference whose premise is not a sourced claim", async (t) => {
  const records = cloneFixtureRecords();
  const inference = findFixtureRecord(records, "example-partition-inference");
  inference["premiseClaimIds"] = ["example-partition-inference"];

  const loaded = await loadFixture(t, records);
  const result = validatePublicationSemantics(loaded, rubrics);

  assert.ok(errorCodes(result).includes("INFERENCE_PREMISES_REQUIRED"));
});

test("INFERENCE_PREMISES_REQUIRED reports an inference whose premise is not a listed record", async (t) => {
  const records = cloneFixtureRecords();
  const inference = findFixtureRecord(records, "example-partition-inference");
  inference["premiseClaimIds"] = ["unlisted-claim"];

  const loaded = await loadFixture(t, records);
  const result = validatePublicationSemantics(loaded, rubrics);

  assert.ok(errorCodes(result).includes("INFERENCE_PREMISES_REQUIRED"));
});

test("INFERENCE_REASONING_REQUIRED reports an inference without reasoning", async (t) => {
  const records = cloneFixtureRecords();
  const inference = findFixtureRecord(records, "example-partition-inference");
  delete inference["reasoning"];

  const loaded = await loadFixture(t, records);
  const result = validatePublicationSemantics(loaded, rubrics);

  assert.ok(errorCodes(result).includes("INFERENCE_REASONING_REQUIRED"));
});

test("INFERENCE_EVIDENCE_STATE_INVALID reports an inference with the wrong evidence state", async (t) => {
  const records = cloneFixtureRecords();
  const inference = findFixtureRecord(records, "example-partition-inference");
  inference["evidenceState"] = "source-not-located";

  const loaded = await loadFixture(t, records);
  const result = validatePublicationSemantics(loaded, rubrics);

  assert.ok(errorCodes(result).includes("INFERENCE_EVIDENCE_STATE_INVALID"));
});

test("HYPOTHESIS_VALIDATION_STATE_INVALID reports a hypothesis that is not an unvalidated hypothesis", async (t) => {
  const records = cloneFixtureRecords();
  const hypothesis = findFixtureRecord(
    records,
    "example-measured-purge-hypothesis",
  );
  hypothesis["validationState"] = "requires-human-validation";

  const loaded = await loadFixture(t, records);
  const result = validatePublicationSemantics(loaded, rubrics);

  assert.ok(errorCodes(result).includes("HYPOTHESIS_VALIDATION_STATE_INVALID"));
});

test("HYPOTHESIS_FALSIFIER_REQUIRED reports a hypothesis without a falsifier", () => {
  const records = cloneFixtureRecords();
  const hypothesis = findFixtureRecord(
    records,
    "example-measured-purge-hypothesis",
  );
  hypothesis["falsifiers"] = [];

  const result = validatePublicationSemantics(
    syntheticPublication(records),
    rubrics,
  );

  assert.ok(errorCodes(result).includes("HYPOTHESIS_FALSIFIER_REQUIRED"));
});

test("HYPOTHESIS_FALSIFIER_REQUIRED reports a hypothesis without a failure mode", () => {
  const records = cloneFixtureRecords();
  const hypothesis = findFixtureRecord(
    records,
    "example-measured-purge-hypothesis",
  );
  hypothesis["failureModes"] = [];

  const result = validatePublicationSemantics(
    syntheticPublication(records),
    rubrics,
  );

  assert.ok(errorCodes(result).includes("HYPOTHESIS_FALSIFIER_REQUIRED"));
});

test("SOURCE_LOCAL_COPY_RIGHTS_INVALID reports a local artifact without public-local-copy rights", async (t) => {
  const records = cloneFixtureRecords();
  const source = findFixtureRecord(records, "example-patent");
  source["localArtifact"] = {
    path: "assets/fixture-copy.pdf",
    sha256: "a".repeat(64),
  };

  const loaded = await loadFixture(t, records);
  const result = validatePublicationSemantics(loaded, rubrics);

  assert.ok(errorCodes(result).includes("SOURCE_LOCAL_COPY_RIGHTS_INVALID"));
});

test("SOURCE_LOCAL_COPY_RIGHTS_INVALID reports a local artifact that is not a manifest-listed asset", async (t) => {
  const records = cloneFixtureRecords();
  const source = findFixtureRecord(records, "example-patent");
  source["rights"] = "public-local-copy";
  source["localArtifact"] = {
    path: "assets/fixture-copy.pdf",
    sha256: "a".repeat(64),
  };

  const loaded = await loadFixture(t, records);
  const result = validatePublicationSemantics(loaded, rubrics);

  assert.ok(errorCodes(result).includes("SOURCE_LOCAL_COPY_RIGHTS_INVALID"));
});

test("SOURCE_DERIVATIVE_RIGHTS_UNRESOLVED reports a derivative without an explicit right", async (t) => {
  const records = cloneFixtureRecords();
  const source = findFixtureRecord(records, "example-patent");
  source["derivatives"] = [
    {
      id: "fixture-derivative",
      path: "assets/fixture-derivative.txt",
      sha256: "b".repeat(64),
      extractionMethod: "Fixture extraction.",
      pageMapping: "Fixture page mapping.",
      qualityWarnings: [],
      publicationRight: "unresolved",
    },
  ];

  const loaded = await loadFixture(t, records);
  const result = validatePublicationSemantics(loaded, rubrics);

  assert.ok(errorCodes(result).includes("SOURCE_DERIVATIVE_RIGHTS_UNRESOLVED"));
});

test("SOURCE_DERIVATIVE_RIGHTS_UNRESOLVED reports a metadata-only derivative that is manifest-listed", async (t) => {
  const records = cloneFixtureRecords();
  const source = findFixtureRecord(records, "example-patent");
  source["derivatives"] = [
    {
      id: "fixture-derivative",
      path: "pages/start-here.md",
      sha256: "b".repeat(64),
      extractionMethod: "Fixture extraction.",
      pageMapping: "Fixture page mapping.",
      qualityWarnings: [],
      publicationRight: "metadata-only",
    },
  ];

  const loaded = await loadFixture(t, records);
  const result = validatePublicationSemantics(loaded, rubrics);

  assert.ok(errorCodes(result).includes("SOURCE_DERIVATIVE_RIGHTS_UNRESOLVED"));
});

test("SOURCE_DERIVATIVE_PATH_INVALID reports a derivative whose path escapes the publication root", async (t) => {
  const records = cloneFixtureRecords();
  const source = findFixtureRecord(records, "example-patent");
  source["derivatives"] = [
    {
      id: "fixture-derivative",
      path: "../../state/workflow.yaml",
      sha256: "b".repeat(64),
      extractionMethod: "Fixture extraction.",
      pageMapping: "Fixture page mapping.",
      qualityWarnings: [],
      publicationRight: "publish-full-text",
    },
  ];

  const loaded = await loadFixture(t, records);
  const result = validatePublicationSemantics(loaded, rubrics);

  assert.ok(errorCodes(result).includes("SOURCE_DERIVATIVE_PATH_INVALID"));
});

test("SOURCE_DERIVATIVE_PATH_INVALID reports a derivative whose path enters a repository-local directory", async (t) => {
  const records = cloneFixtureRecords();
  const source = findFixtureRecord(records, "example-patent");
  source["derivatives"] = [
    {
      id: "fixture-derivative",
      path: "state/workflow.yaml",
      sha256: "b".repeat(64),
      extractionMethod: "Fixture extraction.",
      pageMapping: "Fixture page mapping.",
      qualityWarnings: [],
      publicationRight: "publish-full-text",
    },
  ];

  const loaded = await loadFixture(t, records);
  const result = validatePublicationSemantics(loaded, rubrics);

  assert.ok(errorCodes(result).includes("SOURCE_DERIVATIVE_PATH_INVALID"));
});

test("SOURCE_DERIVATIVE_PATH_INVALID reports a derivative whose path enters the CI configuration directory", async (t) => {
  const records = cloneFixtureRecords();
  const source = findFixtureRecord(records, "example-patent");
  source["derivatives"] = [
    {
      id: "fixture-derivative",
      path: ".github/workflows/build.yml",
      sha256: "b".repeat(64),
      extractionMethod: "Fixture extraction.",
      pageMapping: "Fixture page mapping.",
      qualityWarnings: [],
      publicationRight: "publish-full-text",
    },
  ];

  const loaded = await loadFixture(t, records);
  const result = validatePublicationSemantics(loaded, rubrics);

  assert.ok(errorCodes(result).includes("SOURCE_DERIVATIVE_PATH_INVALID"));
});

test("SOURCE_DERIVATIVE_HASH_MISMATCH reports a derivative whose hash does not match its manifest-listed path", async (t) => {
  const records = cloneFixtureRecords();
  const source = findFixtureRecord(records, "example-patent");
  source["derivatives"] = [
    {
      id: "fixture-derivative",
      path: "assets/fixture-derivative.txt",
      sha256: "b".repeat(64),
      extractionMethod: "Fixture extraction.",
      pageMapping: "Fixture page mapping.",
      qualityWarnings: [],
      publicationRight: "publish-full-text",
    },
  ];

  const root = await temporaryRoot(t);
  await writeFixtureRecords(root, records);
  await addListedAsset(
    root,
    "fixture-derivative",
    ".txt",
    new TextEncoder().encode("derivative text"),
  );

  const loaded = await loadAndValidateManifest(root);
  const result = validatePublicationSemantics(loaded, rubrics);

  assert.ok(errorCodes(result).includes("SOURCE_DERIVATIVE_HASH_MISMATCH"));
});

test("ASSESSMENT_RUBRIC_VERSION_MISMATCH reports an assessment on a stale rubric version", async (t) => {
  const records = cloneFixtureRecords();
  const assessment = findFixtureRecord(
    records,
    "mechanical-resource-burden-v1",
  );
  assessment["rubricVersion"] = "0.9.0";

  const loaded = await loadFixture(t, records);
  const result = validatePublicationSemantics(loaded, rubrics);

  assert.ok(errorCodes(result).includes("ASSESSMENT_RUBRIC_VERSION_MISMATCH"));
});

test("ASSESSMENT_SUPPORTING_CLAIM_UNLISTED reports an assessment whose supporting claim is not listed", async (t) => {
  const records = cloneFixtureRecords();
  scoredAssessment(records, { supportingClaimIds: ["unlisted-claim"] });

  const loaded = await loadFixture(t, records);
  const result = validatePublicationSemantics(loaded, rubrics);

  assert.ok(errorCodes(result).includes("ASSESSMENT_SUPPORTING_CLAIM_UNLISTED"));
});

test("a scored source-supported assessment requires at least one supporting claim", async (t) => {
  const records = cloneFixtureRecords();
  scoredAssessment(records, { supportingClaimIds: [] });

  const loaded = await loadFixture(t, records);
  const result = validatePublicationSemantics(loaded, rubrics);

  assert.ok(errorCodes(result).includes("ASSESSMENT_SUPPORTING_CLAIM_REQUIRED"));
});

test("a scored assessment label must match the selected rubric band", async (t) => {
  const records = cloneFixtureRecords();
  scoredAssessment(records, { label: "Not a rubric band label" });

  const loaded = await loadFixture(t, records);
  const result = validatePublicationSemantics(loaded, rubrics);

  assert.ok(errorCodes(result).includes("ASSESSMENT_LABEL_MISMATCH"));
});

test("METHOD_FAMILY_ID_MISMATCH reports a method family whose ID is not its family", async (t) => {
  const records = cloneFixtureRecords();
  const method = findFixtureRecord(records, "mechanical-physical");
  method["family"] = "thermal";

  const loaded = await loadFixture(t, records);
  const result = validatePublicationSemantics(loaded, rubrics);

  assert.ok(errorCodes(result).includes("METHOD_FAMILY_ID_MISMATCH"));
});

test("AUDIT_REFERENCE_UNSAFE reports a non-HTTPS audit reference", async (t) => {
  const records = cloneFixtureRecords();
  const method = findFixtureRecord(records, "mechanical-physical");
  method["auditReferences"] = [
    {
      label: "Insecure fixture audit reference",
      url: "http://example.invalid/audit/fixture-method",
      version: "fixture-v1",
    },
  ];

  const loaded = await loadFixture(t, records);
  const result = validatePublicationSemantics(loaded, rubrics);

  assert.ok(errorCodes(result).includes("AUDIT_REFERENCE_UNSAFE"));
});

test("AUDIT_REFERENCE_UNSAFE reports an audit reference that points at a repository-local path", async (t) => {
  const records = cloneFixtureRecords();
  const method = findFixtureRecord(records, "mechanical-physical");
  method["auditReferences"] = [
    {
      label: "Repository-local fixture audit reference",
      url: "https://example.invalid/state/workflow.yaml",
      version: "fixture-v1",
    },
  ];

  const loaded = await loadFixture(t, records);
  const result = validatePublicationSemantics(loaded, rubrics);

  assert.ok(errorCodes(result).includes("AUDIT_REFERENCE_UNSAFE"));
});

test("a public-safe audit reference is accepted without a manifest record target", async (t) => {
  const records = cloneFixtureRecords();
  const method = findFixtureRecord(records, "mechanical-physical");
  method["auditReferences"] = [
    {
      label: "Public fixture audit reference",
      url: "https://example.invalid/audit/fixture-method",
      version: "fixture-v1",
      internalId: "not-a-manifest-record",
    },
  ];

  const loaded = await loadFixture(t, records);
  const result = validatePublicationSemantics(loaded, rubrics);

  assert.deepEqual(errorCodes(result), []);
});

test("an AI gap-closing note requires sourced premises, assumptions, a falsifier, and human validation", async (t) => {
  const records = cloneFixtureRecords();
  const gap = findFixtureRecord(records, "example-fate-gap");
  gap["contentKind"] = "ai-gap-closing-note";
  gap["sourceInputIds"] = ["example-mechanism-claim"];
  gap["assumptions"] = ["Fixture assumption."];
  gap["evidenceState"] = "source-not-located";
  gap["validationState"] = "requires-human-validation";

  const loaded = await loadFixture(t, records);
  const result = validatePublicationSemantics(loaded, rubrics);

  assert.ok(errorCodes(result).includes("GAP_CLOSING_NOTE_INVALID"));
});

test("a compliant AI gap-closing note is accepted", async (t) => {
  const records = cloneFixtureRecords();
  const gap = findFixtureRecord(records, "example-fate-gap");
  gap["contentKind"] = "ai-gap-closing-note";
  gap["sourceInputIds"] = ["example-mechanism-claim"];
  gap["assumptions"] = ["Fixture assumption."];
  gap["evidenceState"] = "derived-from-sourced-premises";
  gap["validationState"] = "requires-human-validation";

  const loaded = await loadFixture(t, records);
  const result = validatePublicationSemantics(loaded, rubrics);

  assert.deepEqual(errorCodes(result), []);
});

test("warning diagnostics cover unknown assessments, source conflicts, and low-quality derivatives without changing record state", async (t) => {
  const records = cloneFixtureRecords();
  const claim = findFixtureRecord(records, "example-mechanism-claim");
  claim["evidenceState"] = "source-conflicted";
  const source = findFixtureRecord(records, "example-patent");
  source["derivatives"] = [
    {
      id: "fixture-derivative",
      path: "assets/fixture-derivative.txt",
      sha256: "c".repeat(64),
      extractionMethod: "Fixture extraction.",
      pageMapping: "Fixture page mapping.",
      qualityWarnings: ["low-resolution scan"],
      publicationRight: "publish-excerpts",
    },
  ];

  const loaded = await loadFixture(t, records);
  const result = validatePublicationSemantics(loaded, rubrics);

  const warnings = warningCodes(result);
  assert.ok(warnings.includes("ASSESSMENT_UNKNOWN"));
  assert.ok(warnings.includes("SOURCE_EVIDENCE_CONFLICT"));
  assert.ok(warnings.includes("DERIVATIVE_QUALITY_WARNING"));
  assert.deepEqual(errorCodes(result), []);

  const loadedClaim = loaded.records.get("example-mechanism-claim");
  assert.ok(loadedClaim);
  assert.equal(loadedClaim.publicationState, "approved");
  if (loadedClaim.kind === "claim") {
    assert.equal(loadedClaim.evidenceState, "source-conflicted");
  }
});

test("relationships use an explicit field map, exclude inline identifiers, and are sorted", async (t) => {
  const loaded = await loadFixture(t, cloneFixtureRecords());

  const relationships = collectRelationships(loaded.records);
  const targets = relationships.map((relationship) => relationship.toId);

  for (const inline of [
    "fixture-feed",
    "fixture-product",
    "fixture-product-stream",
    "fixture-sink",
    "fixture-step",
    "fixture-analyte",
    "fixture-method",
    "fixture-hypothesis",
  ]) {
    assert.equal(targets.includes(inline), false, inline);
  }

  assert.ok(targets.includes("example-mechanism-claim"));
  assert.ok(targets.includes("example-fate-gap"));
  assert.ok(targets.includes("mechanical-resource-burden-v1"));

  const sorted = [...relationships].sort((left, right) =>
    left.fromId === right.fromId
      ? left.field === right.field
        ? left.toId < right.toId
          ? -1
          : left.toId > right.toId
            ? 1
            : 0
        : left.field < right.field
          ? -1
          : 1
      : left.fromId < right.fromId
        ? -1
        : 1
  );
  assert.deepEqual(relationships, sorted);
});

test("backlinks are the reverse of the relationship graph and are sorted", async (t) => {
  const loaded = await loadFixture(t, cloneFixtureRecords());

  const relationships = collectRelationships(loaded.records);
  const backlinks = buildBacklinks(relationships);

  assert.equal(backlinks.length, relationships.length);
  for (const backlink of backlinks) {
    assert.ok(
      relationships.some(
        (relationship) =>
          relationship.fromId === backlink.sourceId &&
          relationship.toId === backlink.targetId &&
          relationship.field === backlink.field,
      ),
    );
  }

  const sorted = [...backlinks].sort((left, right) =>
    left.targetId === right.targetId
      ? left.sourceId === right.sourceId
        ? left.field < right.field
          ? -1
          : left.field > right.field
            ? 1
            : 0
        : left.sourceId < right.sourceId
          ? -1
          : 1
      : left.targetId < right.targetId
        ? -1
        : 1
  );
  assert.deepEqual(backlinks, sorted);
});

test("the semantic validator is pure and does not change the loaded publication", async (t) => {
  const loaded = await loadFixture(t, cloneFixtureRecords());
  const before = JSON.stringify([...loaded.records.values()]);

  validatePublicationSemantics(loaded, rubrics);
  validatePublicationSemantics(loaded, rubrics);

  assert.equal(JSON.stringify([...loaded.records.values()]), before);
});

test("RELATIONSHIP_TARGET_KIND_MISMATCH reports a claim whose source names a non-source record", async (t) => {
  const records = cloneFixtureRecords();
  const claim = findFixtureRecord(records, "example-mechanism-claim");
  claim["sourceId"] = "cellulose-acetate";

  const loaded = await loadFixture(t, records);
  const result = validatePublicationSemantics(loaded, rubrics);

  assert.ok(errorCodes(result).includes("RELATIONSHIP_TARGET_KIND_MISMATCH"));
});

test("RELATIONSHIP_TARGET_KIND_MISMATCH reports an inference whose premise is not a claim", async (t) => {
  const records = cloneFixtureRecords();
  const inference = findFixtureRecord(records, "example-partition-inference");
  inference["premiseClaimIds"] = ["example-patent"];

  const loaded = await loadFixture(t, records);
  const result = validatePublicationSemantics(loaded, rubrics);

  assert.ok(errorCodes(result).includes("RELATIONSHIP_TARGET_KIND_MISMATCH"));
});

test("RELATIONSHIP_TARGET_KIND_MISMATCH reports an assessment that names a non-claim record", async (t) => {
  const records = cloneFixtureRecords();
  scoredAssessment(records, { supportingClaimIds: ["cellulose-acetate"] });

  const loaded = await loadFixture(t, records);
  const result = validatePublicationSemantics(loaded, rubrics);

  assert.ok(errorCodes(result).includes("RELATIONSHIP_TARGET_KIND_MISMATCH"));
});

test("RELATIONSHIP_TARGET_KIND_MISMATCH reports an assessment that names a non-method record", async (t) => {
  const records = cloneFixtureRecords();
  const assessment = findFixtureRecord(
    records,
    "mechanical-resource-burden-v1",
  );
  assessment["methodId"] = "cellulose-acetate";

  const loaded = await loadFixture(t, records);
  const result = validatePublicationSemantics(loaded, rubrics);

  assert.ok(errorCodes(result).includes("RELATIONSHIP_TARGET_KIND_MISMATCH"));
});

test("RELATIONSHIP_TARGET_KIND_MISMATCH reports a source whose claim id names a term record", async (t) => {
  const records = cloneFixtureRecords();
  const source = findFixtureRecord(records, "example-patent");
  source["claimIds"] = ["cellulose-acetate"];

  const loaded = await loadFixture(t, records);
  const result = validatePublicationSemantics(loaded, rubrics);

  assert.ok(errorCodes(result).includes("RELATIONSHIP_TARGET_KIND_MISMATCH"));
});

test("RELATIONSHIP_TARGET_KIND_MISMATCH reports a hypothesis whose validation question is not a gap", async (t) => {
  const records = cloneFixtureRecords();
  const hypothesis = findFixtureRecord(
    records,
    "example-measured-purge-hypothesis",
  );
  hypothesis["validationQuestionIds"] = ["example-patent"];

  const loaded = await loadFixture(t, records);
  const result = validatePublicationSemantics(loaded, rubrics);

  assert.ok(errorCodes(result).includes("RELATIONSHIP_TARGET_KIND_MISMATCH"));
});

test("RELATIONSHIP_TARGET_KIND_MISMATCH reports a material whose method family names a term record", () => {
  const records = cloneFixtureRecords();
  const material = findFixtureRecord(records, "cigarette-butts");
  material["methodFamilyIds"] = ["cellulose-acetate"];

  const result = validatePublicationSemantics(
    syntheticPublication(records),
    rubrics,
  );

  assert.ok(errorCodes(result).includes("RELATIONSHIP_TARGET_KIND_MISMATCH"));
});

test("relationship edges are de-duplicated when a field repeats the same target", async (t) => {
  const records = cloneFixtureRecords();
  const material = findFixtureRecord(records, "cigarette-butts");
  material["termIds"] = ["cellulose-acetate", "cellulose-acetate"];

  const loaded = await loadFixture(t, records);
  const relationships = collectRelationships(loaded.records);
  const edges = relationships.filter(
    (relationship) =>
      relationship.fromId === "cigarette-butts" &&
      relationship.field === "termIds" &&
      relationship.toId === "cellulose-acetate",
  );

  assert.equal(edges.length, 1);
});

test("SOURCE_LOCAL_COPY_RIGHTS_INVALID reports a local artifact whose hash does not match the listed asset", async (t) => {
  const root = await temporaryRoot(t);
  const records = cloneFixtureRecords();
  const source = findFixtureRecord(records, "example-patent");
  source["rights"] = "public-local-copy";
  source["localArtifact"] = {
    path: "assets/fixture-copy.txt",
    sha256: "d".repeat(64),
  };
  const manifest = await writeFixtureRecords(root, records);
  const assetPath = await writeFixture(
    root,
    "assets/fixture-copy.txt",
    "fixture copy bytes\n",
  );
  manifest.assets = [
    {
      id: "fixture-copy",
      path: "assets/fixture-copy.txt",
      sha256: await sha256File(assetPath),
    },
  ];
  await writeFixture(root, "manifest.yaml", stringify(manifest));

  const loaded = await loadAndValidateManifest(root);
  const result = validatePublicationSemantics(loaded, rubrics);

  assert.ok(errorCodes(result).includes("SOURCE_LOCAL_COPY_RIGHTS_INVALID"));
});

test("SOURCE_DERIVATIVE_RIGHTS_UNRESOLVED reports a source whose own rights are unresolved", async (t) => {
  const records = cloneFixtureRecords();
  const source = findFixtureRecord(records, "example-patent");
  source["rights"] = "rights-unresolved";

  const loaded = await loadFixture(t, records);
  const result = validatePublicationSemantics(loaded, rubrics);

  assert.ok(errorCodes(result).includes("SOURCE_DERIVATIVE_RIGHTS_UNRESOLVED"));
});

test("AUDIT_REFERENCE_UNSAFE reports an audit reference with embedded credentials", async (t) => {
  const records = cloneFixtureRecords();
  const method = findFixtureRecord(records, "mechanical-physical");
  method["auditReferences"] = [
    {
      label: "Credential-bearing fixture audit reference",
      url: "https://user:pass@example.invalid/audit/fixture-method",
      version: "fixture-v1",
    },
  ];

  const loaded = await loadFixture(t, records);
  const result = validatePublicationSemantics(loaded, rubrics);

  assert.ok(errorCodes(result).includes("AUDIT_REFERENCE_UNSAFE"));
});

test("AUDIT_REFERENCE_UNSAFE reports an audit reference that points at a loopback host", async (t) => {
  const records = cloneFixtureRecords();
  const method = findFixtureRecord(records, "mechanical-physical");
  method["auditReferences"] = [
    {
      label: "Loopback fixture audit reference",
      url: "https://localhost/audit/fixture-method",
      version: "fixture-v1",
    },
  ];

  const loaded = await loadFixture(t, records);
  const result = validatePublicationSemantics(loaded, rubrics);

  assert.ok(errorCodes(result).includes("AUDIT_REFERENCE_UNSAFE"));
});

test("AUDIT_REFERENCE_UNSAFE reports an audit reference whose internal identifier is a path", async (t) => {
  const records = cloneFixtureRecords();
  const method = findFixtureRecord(records, "mechanical-physical");
  method["auditReferences"] = [
    {
      label: "Path-like internal identifier fixture audit reference",
      url: "https://example.invalid/audit/fixture-method",
      version: "fixture-v1",
      internalId: "state/workflow.yaml",
    },
  ];

  const loaded = await loadFixture(t, records);
  const result = validatePublicationSemantics(loaded, rubrics);

  assert.ok(errorCodes(result).includes("AUDIT_REFERENCE_UNSAFE"));
});

test("AUDIT_REFERENCE_UNSAFE reports an audit reference whose raw URL contains dot segments", async (t) => {
  const records = cloneFixtureRecords();
  const method = findFixtureRecord(records, "mechanical-physical");
  method["auditReferences"] = [
    {
      label: "Dot-segment fixture audit reference",
      url: "https://example.invalid/audit/../../internal/secret.md",
      version: "fixture-v1",
    },
  ];

  const loaded = await loadFixture(t, records);
  const result = validatePublicationSemantics(loaded, rubrics);

  assert.ok(errorCodes(result).includes("AUDIT_REFERENCE_UNSAFE"));
});

test("an unresolved-question gap does not create source input relationships", () => {
  const records = cloneFixtureRecords();
  const gap = findFixtureRecord(records, "example-fate-gap");
  gap["sourceInputIds"] = ["example-mechanism-claim"];

  const relationships = collectRelationships(
    syntheticPublication(records).records,
  );

  assert.equal(
    relationships.some(
      (relationship) =>
        relationship.fromId === "example-fate-gap" &&
        relationship.field === "sourceInputIds",
    ),
    false,
  );
});

test("an AI gap-closing note does create source input relationships", () => {
  const records = cloneFixtureRecords();
  const gap = findFixtureRecord(records, "example-fate-gap");
  gap["contentKind"] = "ai-gap-closing-note";
  gap["sourceInputIds"] = ["example-mechanism-claim"];
  gap["assumptions"] = ["Fixture assumption."];

  const relationships = collectRelationships(
    syntheticPublication(records).records,
  );

  assert.ok(
    relationships.some(
      (relationship) =>
        relationship.fromId === "example-fate-gap" &&
        relationship.field === "sourceInputIds" &&
        relationship.toId === "example-mechanism-claim",
    ),
  );
});

test("RECORD_SCHEMA_INVALID reports a malformed record instead of throwing", () => {
  const records = cloneFixtureRecords();
  const claim = findFixtureRecord(records, "example-mechanism-claim");
  delete claim["proposition"];

  const result = validatePublicationSemantics(
    syntheticPublication(records),
    rubrics,
  );

  assert.ok(errorCodes(result).includes("RECORD_SCHEMA_INVALID"));
});

test("RECORD_SCHEMA_INVALID reports a record with an unknown kind instead of throwing", () => {
  const records = cloneFixtureRecords();
  const claim = findFixtureRecord(records, "example-mechanism-claim");
  claim["kind"] = "not-a-kind";

  const result = validatePublicationSemantics(
    syntheticPublication(records),
    rubrics,
  );

  assert.ok(errorCodes(result).includes("RECORD_SCHEMA_INVALID"));
});

test("RECORD_SCHEMA_INVALID reports a hypothesis without failure modes instead of throwing", () => {
  const records = cloneFixtureRecords();
  const hypothesis = findFixtureRecord(
    records,
    "example-measured-purge-hypothesis",
  );
  delete hypothesis["failureModes"];

  const result = validatePublicationSemantics(
    syntheticPublication(records),
    rubrics,
  );

  assert.ok(errorCodes(result).includes("RECORD_SCHEMA_INVALID"));
});

test("RECORD_SCHEMA_INVALID reports a method without audit references instead of throwing", () => {
  const records = cloneFixtureRecords();
  const method = findFixtureRecord(records, "mechanical-physical");
  delete method["auditReferences"];

  const result = validatePublicationSemantics(
    syntheticPublication(records),
    rubrics,
  );

  assert.ok(errorCodes(result).includes("RECORD_SCHEMA_INVALID"));
});

/**
 * The semantic validator's deny-list covers the repository's own top-level
 * directories. Enumerate the directories that actually hold repository
 * content (files tracked by git) rather than every directory that happens to
 * sit in the working tree: an incidental scratch folder at the repository
 * root is not part of the repository and must not be able to fail this check.
 */
function repositoryTopLevelDirectories(repositoryRoot: URL): string[] {
  try {
    // -z separates on NUL and suppresses git's path quoting, so a directory
    // name containing a space or a non-ASCII character survives intact.
    const output = execFileSync("git", ["ls-files", "-z"], {
      cwd: fileURLToPath(repositoryRoot),
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    });
    const names = new Set<string>();
    for (const entry of output.split("\0")) {
      // Only paths that live inside a directory contribute a top-level
      // directory name; a tracked file at the repository root has no "/".
      const slash = entry.indexOf("/");
      if (slash > 0) {
        names.add(entry.slice(0, slash));
      }
    }
    return [...names].sort();
  } catch {
    // Without git, fall back to the working tree.
    return readdirSync(repositoryRoot, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name)
      .sort();
  }
}

test("every repository-local top-level directory is rejected as an audit reference", async (t) => {
  const repositoryRoot = new URL("../../../", import.meta.url);
  const internalDirectories = repositoryTopLevelDirectories(repositoryRoot)
    .filter((name) => !name.startsWith(".") && name !== "publication")
    .sort();

  assert.ok(internalDirectories.length > 0);
  assert.equal(internalDirectories.includes("publication"), false);

  for (const directory of internalDirectories) {
    const records = cloneFixtureRecords();
    const method = findFixtureRecord(records, "mechanical-physical");
    method["auditReferences"] = [
      {
        label: `Repository-local fixture audit reference for ${directory}`,
        url: `https://example.invalid/${directory}/internal-review.md`,
        version: "fixture-v1",
      },
    ];

    const loaded = await loadFixture(t, records);
    const result = validatePublicationSemantics(loaded, rubrics);

    assert.ok(
      errorCodes(result).includes("AUDIT_REFERENCE_UNSAFE"),
      directory,
    );
  }
});

test("the publication directory stays allowed as an audit reference target", async (t) => {
  const records = cloneFixtureRecords();
  const method = findFixtureRecord(records, "mechanical-physical");
  method["auditReferences"] = [
    {
      label: "Public fixture audit reference",
      url: "https://example.invalid/publication/contract/v1/rubrics.yaml",
      version: "fixture-v1",
    },
  ];

  const loaded = await loadFixture(t, records);
  const result = validatePublicationSemantics(loaded, rubrics);

  assert.deepEqual(errorCodes(result), []);
});
