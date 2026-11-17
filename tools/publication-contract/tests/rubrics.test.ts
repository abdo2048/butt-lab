import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import { parse } from "yaml";

import {
  AssessmentRecordSchema,
  CRITERION_IDS,
  RubricCatalogSchema,
} from "../src/model/index.ts";

function loadCatalog(): Record<string, unknown> {
  const contents = readFileSync(
    new URL("../../../publication/contract/v1/rubrics.yaml", import.meta.url),
    "utf8",
  );
  return parse(contents) as Record<string, unknown>;
}

test("approved rubric catalog defines all eight ordered criteria", () => {
  const catalog = RubricCatalogSchema.parse(loadCatalog());

  assert.equal(catalog.criteria.length, 8);
  assert.deepEqual(
    catalog.criteria.map((criterion) => criterion.id),
    CRITERION_IDS,
  );
  for (const criterion of catalog.criteria) {
    assert.deepEqual(
      criterion.bands.map((band) => band.score),
      [1, 2, 3, 4, 5],
    );
    assert.equal(criterion.higherIsMoreFavorable, true);
  }
});

test("unknown assessment parses without a numeric score or basis", () => {
  const assessment = AssessmentRecordSchema.parse({
    schemaVersion: 1,
    kind: "assessment",
    id: "chemical-resource-burden-v1",
    title: "Chemical resource burden",
    publicationState: "approved",
    methodId: "chemical",
    criterionId: "resource-burden",
    rubricVersion: "1.0.0",
    status: "unknown",
    unknownReason: "Comparable functional units are not available.",
    supportingClaimIds: [],
    conflictingClaimIds: [],
    reviewer: "Contract reviewer",
    reviewDate: "2026-11-14",
  });

  assert.equal(assessment.status, "unknown");
  assert.equal("score" in assessment, false);
  assert.equal("basis" in assessment, false);
});

test("score one is a completed source-supported assessment", () => {
  const assessment = AssessmentRecordSchema.parse({
    schemaVersion: 1,
    kind: "assessment",
    id: "chemical-evidence-strength-v1",
    title: "Chemical evidence strength",
    publicationState: "approved",
    methodId: "chemical",
    criterionId: "evidence-strength",
    rubricVersion: "1.0.0",
    status: "scored",
    score: 1,
    label: "Minimal",
    rationale: "The completed review located no accessible direct support.",
    basis: "source-supported",
    supportingClaimIds: ["chemical-evidence-review"],
    conflictingClaimIds: [],
    reviewer: "Contract reviewer",
    reviewDate: "2026-11-14",
  });

  assert.equal(assessment.status, "scored");
  assert.equal(assessment.score, 1);
});

test("unknown assessment rejects a numeric score", () => {
  const result = AssessmentRecordSchema.safeParse({
    schemaVersion: 1,
    kind: "assessment",
    id: "chemical-resource-burden-v1",
    title: "Chemical resource burden",
    publicationState: "approved",
    methodId: "chemical",
    criterionId: "resource-burden",
    rubricVersion: "1.0.0",
    status: "unknown",
    unknownReason: "Comparable functional units are not available.",
    score: 1,
    supportingClaimIds: [],
    conflictingClaimIds: [],
    reviewer: "Contract reviewer",
    reviewDate: "2026-11-14",
  });

  assert.equal(result.success, false);
});

test("rubric catalog rejects duplicate criterion IDs", () => {
  const catalog = loadCatalog();
  const criteria = catalog.criteria as Array<Record<string, unknown>>;
  criteria[7] = { ...criteria[0] };

  assert.equal(RubricCatalogSchema.safeParse(catalog).success, false);
});

test("rubric catalog rejects a missing criterion ID", () => {
  const catalog = loadCatalog();
  const criteria = catalog.criteria as Array<Record<string, unknown>>;
  catalog.criteria = criteria.slice(0, -1);

  assert.equal(RubricCatalogSchema.safeParse(catalog).success, false);
});

test("rubric catalog rejects misordered score bands", () => {
  const catalog = loadCatalog();
  const criteria = catalog.criteria as Array<Record<string, unknown>>;
  const criterion = criteria[0];
  assert.ok(criterion);
  const bands = criterion.bands as Array<Record<string, unknown>>;
  const firstBand = bands[0];
  const secondBand = bands[1];
  assert.ok(firstBand);
  assert.ok(secondBand);
  criterion.bands = [secondBand, firstBand, ...bands.slice(2)];

  assert.equal(RubricCatalogSchema.safeParse(catalog).success, false);
});
