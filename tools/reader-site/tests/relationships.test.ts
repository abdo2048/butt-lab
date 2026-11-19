import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { backlinks, hrefFor, outgoing, ownedBy } from "../src/lib/relationships.ts";
import type { BundleData, BundleRecord } from "../src/lib/types.ts";

function makeBundle(): BundleData {
  const records = new Map<string, BundleRecord>();
  const add = (record: BundleRecord): void => {
    records.set(record.id, record);
  };

  add({
    id: "mechanical-physical",
    kind: "method-family",
    title: "Mechanical separation with aqueous washing",
    summary: "summary",
    mechanism: "mechanism",
    preparation: "preparation",
    feedstock: "feedstock",
    family: "mechanical-physical",
    inputs: [],
    steps: [],
    streams: [],
    products: [],
    sinks: [],
    organizations: [],
    assessmentIds: ["mechanical-physical-evidence-strength-assessment"],
    claimIds: ["mechanical-physical-claim-one"],
    gapIds: ["mechanical-physical-gap-one"],
    hypothesisIds: [],
    sourceIds: ["source-one"],
    termIds: ["nicotine"],
    auditAliases: ["F0"],
    auditReferences: [],
    publicationState: "approved",
    schemaVersion: 1,
  });

  add({
    id: "mechanical-physical-claim-one",
    kind: "claim",
    title: "A claim",
    proposition: "proposition",
    evidenceState: "source-supported",
    contentKind: "claim",
    methodIds: ["mechanical-physical"],
    hypothesisIds: [],
    counterevidenceClaimIds: [],
    auditAliases: [],
    reviewDate: "2026-11-16",
    reviewer: "reviewer",
    publicationState: "approved",
    schemaVersion: 1,
  });

  add({
    id: "mechanical-physical-gap-one",
    kind: "gap",
    title: "A gap",
    question: "question",
    whyItMatters: "why",
    falsifierOrDecisionCondition: "falsifier",
    nextHumanWork: "controlled-laboratory-evidence",
    validationState: "requires-human-validation",
    evidenceState: "source-not-located",
    gapType: "material-fate",
    contentKind: "unresolved-question",
    affectedRecordIds: ["mechanical-physical"],
    auditAliases: [],
    publicationState: "approved",
    schemaVersion: 1,
  });

  add({
    id: "mechanical-physical-evidence-strength-assessment",
    kind: "assessment",
    title: "Evidence strength",
    methodId: "mechanical-physical",
    criterionId: "evidence-strength",
    status: "scored",
    score: 2,
    label: "Limited",
    basis: "inference",
    rationale: "rationale",
    rubricVersion: "1.0.0",
    reviewDate: "2026-11-16",
    reviewer: "reviewer",
    supportingClaimIds: [],
    conflictingClaimIds: [],
    publicationState: "approved",
    schemaVersion: 1,
  });

  add({
    id: "source-one",
    kind: "source",
    title: "A source",
    citation: "citation",
    sourceType: "web-page",
    originalUrl: "https://example.org/",
    versionOrDate: "2026",
    accessDate: "2026-11-16",
    publisherOrIssuer: "publisher",
    rights: "link-only",
    claimIds: ["mechanical-physical-claim-one"],
    methodIds: ["mechanical-physical"],
    derivatives: [],
    auditAliases: [],
    publicationState: "approved",
    schemaVersion: 1,
  });

  add({
    id: "nicotine",
    kind: "term",
    title: "Nicotine",
    preferredLabel: "Nicotine",
    aliases: [],
    tooltip: "tooltip",
    explanation: "explanation",
    claimIds: [],
    methodIds: ["mechanical-physical"],
    sourceIds: [],
    auditAliases: [],
    publicationState: "approved",
    schemaVersion: 1,
  });

  add({
    id: "batch-02-invention-sketch",
    kind: "hypothesis",
    title: "An invention",
    visibleLabel: "label",
    mechanism: "mechanism",
    priorContext: "prior",
    assumptions: [],
    failureModes: [],
    falsifiers: [],
    unresolvedDependencies: [],
    validationQuestionIds: [],
    sourceInputIds: ["mechanical-physical-claim-one"],
    auditAliases: [],
    auditReferences: [],
    evidenceState: "derived-from-sourced-premises",
    validationState: "new-unvalidated-hypothesis",
    contentKind: "hypothesis",
    reviewer: "reviewer",
    recordVersion: "1",
    publicationState: "approved",
    schemaVersion: 1,
  });

  add({
    id: "cigarette-butt",
    kind: "material",
    title: "Cigarette butt",
    description: "description",
    compositionSummary: "composition",
    contaminants: ["nicotine"],
    jurisdictions: [],
    tags: [],
    termIds: ["nicotine"],
    methodFamilyIds: ["mechanical-physical"],
    auditAliases: [],
    publicationState: "approved",
    schemaVersion: 1,
  });

  const relationships = [
    { field: "claimIds", fromId: "mechanical-physical", targetKind: "claim", toId: "mechanical-physical-claim-one" },
    { field: "gapIds", fromId: "mechanical-physical", targetKind: "gap", toId: "mechanical-physical-gap-one" },
    { field: "sourceIds", fromId: "mechanical-physical", targetKind: "source", toId: "source-one" },
    { field: "termIds", fromId: "mechanical-physical", targetKind: "term", toId: "nicotine" },
    { field: "methodIds", fromId: "source-one", targetKind: "method-family", toId: "mechanical-physical" },
    { field: "claimIds", fromId: "source-one", targetKind: "claim", toId: "mechanical-physical-claim-one" },
    { field: "sourceInputIds", fromId: "batch-02-invention-sketch", targetKind: "claim", toId: "mechanical-physical-claim-one" },
    { field: "methodFamilyIds", fromId: "cigarette-butt", targetKind: "method-family", toId: "mechanical-physical" },
    { field: "methodId", fromId: "mechanical-physical-evidence-strength-assessment", targetKind: "method-family", toId: "mechanical-physical" },
  ];

  const backlinks = relationships.map((relationship) => ({
    field: relationship.field,
    sourceId: relationship.fromId,
    targetId: relationship.toId,
  }));

  return {
    records,
    byKind: {
      "method-family": ["mechanical-physical"],
      claim: ["mechanical-physical-claim-one"],
      gap: ["mechanical-physical-gap-one"],
      assessment: ["mechanical-physical-evidence-strength-assessment"],
      source: ["source-one"],
      term: ["nicotine"],
      hypothesis: ["batch-02-invention-sketch"],
      material: ["cigarette-butt"],
    },
    pages: new Map(),
    glossary: { nicotine: "tooltip\n\nexplanation" },
    relationships,
    backlinks,
    manifest: { schemaVersion: 1, publicationVersion: "test", outputFiles: [] },
  };
}

describe("outgoing", () => {
  it("lists the records a record points at", () => {
    const ids = outgoing(makeBundle(), "mechanical-physical").map((item) => item.id);
    assert.deepEqual(ids.sort(), [
      "mechanical-physical-claim-one",
      "mechanical-physical-gap-one",
      "nicotine",
      "source-one",
    ]);
  });

  it("never lists a target that is not in the bundle", () => {
    const bundle = makeBundle();
    bundle.relationships.push({
      field: "sourceIds",
      fromId: "mechanical-physical",
      targetKind: "source",
      toId: "not-in-the-bundle",
    });
    const ids = outgoing(bundle, "mechanical-physical").map((item) => item.id);
    assert.equal(ids.includes("not-in-the-bundle"), false);
  });
});

describe("backlinks", () => {
  it("lists the records that point at a record", () => {
    const ids = backlinks(makeBundle(), "mechanical-physical").map((item) => item.id);
    assert.deepEqual(ids.sort(), [
      "cigarette-butt",
      "mechanical-physical-evidence-strength-assessment",
      "source-one",
    ]);
  });

  it("finds the invention that used a claim as its input", () => {
    const ids = backlinks(makeBundle(), "mechanical-physical-claim-one").map((item) => item.id);
    assert.deepEqual(ids.sort(), ["batch-02-invention-sketch", "mechanical-physical", "source-one"]);
  });
});

describe("hrefFor", () => {
  it("gives each record kind its own page", () => {
    const bundle = makeBundle();
    assert.equal(hrefFor(bundle, "mechanical-physical"), "/methods/mechanical-physical/");
    assert.equal(hrefFor(bundle, "source-one"), "/sources/source-one/");
    assert.equal(hrefFor(bundle, "nicotine"), "/glossary/#nicotine");
    assert.equal(hrefFor(bundle, "batch-02-invention-sketch"), "/invention/#batch-02-invention-sketch");
    assert.equal(hrefFor(bundle, "cigarette-butt"), "/start/#what-a-cigarette-butt-actually-is");
  });

  it("points a claim or a gap at the family that owns it", () => {
    const bundle = makeBundle();
    assert.equal(hrefFor(bundle, "mechanical-physical-claim-one"), "/methods/mechanical-physical/");
    assert.equal(hrefFor(bundle, "mechanical-physical-gap-one"), "/methods/mechanical-physical/");
  });

  it("returns no link for an id that is not in the bundle", () => {
    assert.equal(hrefFor(makeBundle(), "not-in-the-bundle"), null);
  });
});

describe("ownedBy", () => {
  it("names the method family that owns a claim, a gap or an assessment", () => {
    const bundle = makeBundle();
    assert.deepEqual(ownedBy(bundle, "mechanical-physical-claim-one"), ["mechanical-physical"]);
    assert.deepEqual(ownedBy(bundle, "mechanical-physical-gap-one"), ["mechanical-physical"]);
    assert.deepEqual(
      ownedBy(bundle, "mechanical-physical-evidence-strength-assessment"),
      ["mechanical-physical"],
    );
  });

  it("returns nothing for a record with no family owner", () => {
    assert.deepEqual(ownedBy(makeBundle(), "source-one"), []);
  });
});
