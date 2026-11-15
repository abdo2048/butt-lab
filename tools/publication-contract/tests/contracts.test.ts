import assert from "node:assert/strict";
import test from "node:test";

import {
  CONTENT_KINDS,
  ContentRecordSchema,
  DERIVATIVE_RIGHTS,
  EVIDENCE_STATES,
  generatedSchemas,
  HUMAN_WORK_CATEGORIES,
  HttpUrlSchema,
  METHOD_FAMILY_IDS,
  PUBLICATION_STATES,
  PublicationManifestSchema,
  RelativePathSchema,
  SOURCE_RIGHTS,
  VALIDATION_STATES,
} from "../src/model/index.ts";

type JsonObject = Record<string, unknown>;

function isJsonObject(value: unknown): value is JsonObject {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function findSchemasWithProperty(
  value: unknown,
  propertyName: string,
): JsonObject[] {
  const matches: JsonObject[] = [];

  function visit(candidate: unknown): void {
    if (Array.isArray(candidate)) {
      candidate.forEach(visit);
      return;
    }

    if (!isJsonObject(candidate)) {
      return;
    }

    const properties = candidate.properties;
    if (isJsonObject(properties) && propertyName in properties) {
      matches.push(candidate);
    }

    Object.values(candidate).forEach(visit);
  }

  visit(value);
  return matches;
}

function getPropertySchema(
  objectSchema: JsonObject,
  propertyName: string,
): JsonObject {
  assert.ok(isJsonObject(objectSchema.properties));
  const propertySchema = objectSchema.properties[propertyName];
  assert.ok(isJsonObject(propertySchema));
  return propertySchema;
}

test("closed vocabularies expose the Phase 1 contract", () => {
  assert.deepEqual(CONTENT_KINDS, [
    "claim",
    "inference",
    "ai-gap-closing-note",
    "hypothesis",
    "unresolved-question",
  ]);
  assert.deepEqual(EVIDENCE_STATES, [
    "source-supported",
    "source-conflicted",
    "source-not-located",
    "derived-from-sourced-premises",
    "not-applicable",
  ]);
  assert.deepEqual(PUBLICATION_STATES, ["draft", "approved", "excluded"]);
  assert.deepEqual(VALIDATION_STATES, [
    "desk-research-only",
    "requires-human-validation",
    "new-unvalidated-hypothesis",
    "not-applicable",
  ]);
  assert.deepEqual(METHOD_FAMILY_IDS, [
    "mechanical-physical",
    "thermal",
    "chemical",
    "biological",
    "material-incorporation",
    "product-routes",
  ]);
  assert.deepEqual(SOURCE_RIGHTS, [
    "public-local-copy",
    "link-only",
    "rights-unresolved",
  ]);
  assert.deepEqual(DERIVATIVE_RIGHTS, [
    "publish-full-text",
    "publish-excerpts",
    "metadata-only",
    "unresolved",
  ]);
  assert.deepEqual(HUMAN_WORK_CATEGORIES, [
    "source-retrieval",
    "analytical-method-work",
    "controlled-laboratory-evidence",
    "pilot-evidence",
    "independent-product-or-intended-use-testing",
    "treatment-acceptance",
    "regulatory-review",
  ]);
});

test("minimal approved material parses", () => {
  const material = ContentRecordSchema.parse({
    schemaVersion: 1,
    kind: "material",
    id: "cigarette-butts",
    title: "Cigarette butts",
    publicationState: "approved",
    description: "Post-consumer cigarette waste.",
    compositionSummary: "Predominantly cellulose acetate filters.",
    contaminants: ["nicotine"],
    termIds: ["cellulose-acetate"],
    jurisdictions: ["global"],
    tags: ["post-consumer"],
    methodFamilyIds: ["mechanical-physical"],
  });

  assert.equal(material.kind, "material");
  assert.equal(material.publicationState, "approved");
  assert.deepEqual(material.auditAliases, []);
});

test("manifest parses explicit empty collections", () => {
  const manifest = PublicationManifestSchema.parse({
    schemaVersion: 1,
    publicationVersion: "phase-1",
    records: [],
    pages: [],
    assets: [],
  });

  assert.deepEqual(manifest.records, []);
  assert.deepEqual(manifest.pages, []);
  assert.deepEqual(manifest.assets, []);
});

test("term records reject traversal-like IDs", () => {
  const result = ContentRecordSchema.safeParse({
    schemaVersion: 1,
    kind: "term",
    id: "../secret",
    title: "Secret",
    publicationState: "draft",
    preferredLabel: "Secret",
    aliases: [],
    tooltip: "Traversal-like identifier.",
    explanation: "This record must not parse.",
    methodIds: [],
    claimIds: [],
    sourceIds: [],
  });

  assert.equal(result.success, false);
});

test("relative paths accept normalized repository paths only", () => {
  const validPaths = [
    "records/materials/cigarette-butts.yaml",
    "assets/process-diagram.svg",
    "README.md",
  ];
  const invalidPaths = [
    "/absolute/path.yaml",
    "C:/windows/path.yaml",
    "records\\material.yaml",
    "records/../secret.yaml",
    "records/./material.yaml",
    "records//material.yaml",
    "records/materials/",
  ];

  for (const path of validPaths) {
    assert.equal(RelativePathSchema.safeParse(path).success, true, path);
  }
  for (const path of invalidPaths) {
    assert.equal(RelativePathSchema.safeParse(path).success, false, path);
  }
});

test("generated manifest schema preserves relative path restrictions", () => {
  const schema = generatedSchemas["publication-manifest.schema.json"];
  const pathContainers = findSchemasWithProperty(schema, "path");

  assert.equal(pathContainers.length, 3);
  for (const container of pathContainers) {
    const pathSchema = getPropertySchema(container, "path");
    assert.equal(typeof pathSchema.pattern, "string");
    const pattern = new RegExp(pathSchema.pattern as string);

    assert.equal(pattern.test("records/material.yaml"), true);
    assert.equal(pattern.test("/absolute.yaml"), false);
    assert.equal(pattern.test("C:/windows.yaml"), false);
    assert.equal(pattern.test("records\\material.yaml"), false);
    assert.equal(pattern.test("records/../secret.yaml"), false);
    assert.equal(pattern.test("records/./material.yaml"), false);
    assert.equal(pattern.test("records//material.yaml"), false);
    assert.equal(pattern.test("records/materials/"), false);
  }
});

test("generated content schema preserves HTTP URL restrictions", () => {
  assert.equal(HttpUrlSchema.safeParse("https://example.com/source").success, true);
  assert.equal(HttpUrlSchema.safeParse("ftp://example.com/source").success, false);
  assert.equal(HttpUrlSchema.safeParse("http://").success, false);

  const schema = generatedSchemas["content-record.schema.json"];
  const urlContainers = [
    ...findSchemasWithProperty(schema, "url"),
    ...findSchemasWithProperty(schema, "originalUrl"),
  ];
  assert.ok(urlContainers.length > 0);
  for (const container of urlContainers) {
    const propertyName = isJsonObject(container.properties) &&
        "url" in container.properties
      ? "url"
      : "originalUrl";
    const urlSchema = getPropertySchema(container, propertyName);
    assert.equal(urlSchema.format, "uri");
    assert.equal(typeof urlSchema.pattern, "string");
    const pattern = new RegExp(urlSchema.pattern as string);
    assert.equal(pattern.test("https://example.com"), true);
    assert.equal(pattern.test("ftp://example.com"), false);
    assert.equal(pattern.test("http://"), true);
    assert.equal(
      urlSchema.format === "uri" && URL.canParse("http://") &&
        pattern.test("http://"),
      false,
    );
  }
});

test("generated content schema treats audit aliases as optional input", () => {
  const schema = generatedSchemas["content-record.schema.json"];
  const recordSchemas = findSchemasWithProperty(schema, "auditAliases");
  assert.ok(recordSchemas.length > 0);
  for (const recordSchema of recordSchemas) {
    assert.ok(Array.isArray(recordSchema.required));
    assert.equal(recordSchema.required.includes("auditAliases"), false);
  }
});
