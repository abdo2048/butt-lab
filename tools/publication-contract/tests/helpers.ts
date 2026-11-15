import { mkdir, mkdtemp, writeFile, readFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { stringify, parse } from "yaml";

import { sha256File } from "../src/load.ts";

export async function makeTempDirectory(): Promise<string> {
  return mkdtemp(join(tmpdir(), "publication-contract-"));
}

export async function writeFixture(
  root: string,
  relativePath: string,
  contents: string,
): Promise<string> {
  const path = join(root, relativePath);
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, contents, "utf8");
  return path;
}

/**
 * The canonical cross-record fixture used by the semantic contract tests.
 *
 * It exists to exercise the structure of the publication contract only. It is
 * not Batch-02 evidence, it is never added to the live manifest, and none of
 * its statements are scientific claims about the real world.
 */
export const VALID_FIXTURE_RECORDS = [
  {
    schemaVersion: 1,
    kind: "material",
    id: "cigarette-butts",
    title: "Cigarette butts",
    publicationState: "approved",
    auditAliases: [],
    description: "Fixture material for contract testing only.",
    compositionSummary: "Fixture composition for contract testing only.",
    contaminants: ["fixture-analyte"],
    termIds: ["cellulose-acetate"],
    jurisdictions: ["fixture-jurisdiction"],
    tags: ["fixture"],
    methodFamilyIds: ["mechanical-physical"],
  },
  {
    schemaVersion: 1,
    kind: "method-family",
    id: "mechanical-physical",
    title: "Mechanical and physical fixture method",
    publicationState: "approved",
    auditAliases: ["fixture-method"],
    family: "mechanical-physical",
    summary: "Fixture summary for contract testing only.",
    mechanism: "Fixture mechanism for contract testing only.",
    feedstock: "Fixture feedstock.",
    preparation: "Fixture preparation description; not operating instructions.",
    steps: [{ id: "fixture-step", label: "Fixture step", description: "Structural test step." }],
    inputs: [{ id: "fixture-feed", label: "Fixture feed", description: "Inline input, not a record relationship." }],
    streams: [{
      id: "fixture-product-stream",
      label: "Fixture product stream",
      type: "product",
      contaminants: ["fixture-analyte"],
      fateState: "unresolved",
    }],
    products: [{
      id: "fixture-product",
      label: "Fixture product",
      description: "Inline product, not a record relationship.",
      intendedUse: "Fixture intended use.",
    }],
    sinks: [{
      id: "fixture-sink",
      material: "Fixture material",
      intendedUse: "Fixture intended use",
      acceptanceBasis: "Fixture basis, not a real acceptance.",
      issuer: "Fixture issuer",
      finalRoute: "Fixture final route",
    }],
    claimIds: ["example-mechanism-claim", "example-partition-inference"],
    gapIds: ["example-fate-gap"],
    termIds: ["cellulose-acetate"],
    sourceIds: ["example-patent"],
    hypothesisIds: ["example-measured-purge-hypothesis"],
    assessmentIds: ["mechanical-resource-burden-v1"],
    organizations: [{ name: "Fixture organization", role: "Fixture source context" }],
    auditReferences: [{
      label: "Public fixture audit reference",
      url: "https://example.invalid/audit/fixture-method",
      version: "fixture-v1",
      internalId: "fixture-method",
    }],
  },
  {
    schemaVersion: 1,
    kind: "source",
    id: "example-patent",
    title: "Example fixture patent",
    publicationState: "approved",
    auditAliases: [],
    citation: "Example fixture citation; not scientific evidence.",
    sourceType: "patent",
    publisherOrIssuer: "Fixture issuer",
    versionOrDate: "fixture-v1",
    originalUrl: "https://example.invalid/patent",
    accessDate: "2026-11-14",
    rights: "link-only",
    derivatives: [],
    claimIds: ["example-mechanism-claim"],
    methodIds: ["mechanical-physical"],
  },
  {
    schemaVersion: 1,
    kind: "claim",
    id: "example-mechanism-claim",
    title: "Fixture mechanism claim",
    publicationState: "approved",
    auditAliases: [],
    contentKind: "claim",
    proposition: "Fixture proposition for contract testing only.",
    evidenceState: "source-supported",
    methodIds: ["mechanical-physical"],
    hypothesisIds: [],
    sourceId: "example-patent",
    locator: "Fixture page 1",
    counterevidenceClaimIds: [],
    reviewer: "fixture-reviewer",
    reviewDate: "2026-11-14",
  },
  {
    schemaVersion: 1,
    kind: "claim",
    id: "example-partition-inference",
    title: "Fixture partition inference",
    publicationState: "approved",
    auditAliases: [],
    contentKind: "inference",
    proposition: "Fixture inference for contract testing only.",
    evidenceState: "derived-from-sourced-premises",
    methodIds: ["mechanical-physical"],
    hypothesisIds: ["example-measured-purge-hypothesis"],
    counterevidenceClaimIds: [],
    premiseClaimIds: ["example-mechanism-claim"],
    reasoning: "The fixture inference is explicitly derived from the fixture premise.",
    reviewer: "fixture-reviewer",
    reviewDate: "2026-11-14",
  },
  {
    schemaVersion: 1,
    kind: "gap",
    id: "example-fate-gap",
    title: "Fixture fate gap",
    publicationState: "approved",
    auditAliases: [],
    question: "Where does the fixture analyte go?",
    gapType: "material-fate",
    whyItMatters: "Fixture gap used to exercise the validation contract.",
    affectedRecordIds: ["mechanical-physical"],
    contentKind: "unresolved-question",
    evidenceState: "source-not-located",
    validationState: "requires-human-validation",
    nextHumanWork: "analytical-method-work",
    falsifierOrDecisionCondition: "A reviewed fixture record closes the declared stream inventory.",
  },
  {
    schemaVersion: 1,
    kind: "hypothesis",
    id: "example-measured-purge-hypothesis",
    title: "Fixture measured-purge hypothesis",
    publicationState: "approved",
    auditAliases: ["fixture-hypothesis"],
    contentKind: "hypothesis",
    visibleLabel: "Fixture measured-purge hypothesis",
    sourceInputIds: ["example-mechanism-claim", "example-partition-inference"],
    priorContext: "Fixture context only.",
    mechanism: "Fixture mechanism only.",
    assumptions: ["Fixture assumption."],
    unresolvedDependencies: ["Fixture dependency."],
    failureModes: ["Fixture failure mode."],
    falsifiers: ["Fixture falsifier."],
    validationQuestionIds: ["example-fate-gap"],
    evidenceState: "derived-from-sourced-premises",
    validationState: "new-unvalidated-hypothesis",
    reviewer: "fixture-reviewer",
    recordVersion: "fixture-v1",
    auditReferences: [{
      label: "Public fixture hypothesis audit",
      url: "https://example.invalid/audit/fixture-hypothesis",
      version: "fixture-v1",
    }],
  },
  {
    schemaVersion: 1,
    kind: "term",
    id: "cellulose-acetate",
    title: "Cellulose acetate",
    publicationState: "approved",
    auditAliases: [],
    preferredLabel: "Cellulose acetate",
    acronym: "CA",
    aliases: [],
    tooltip: "Fixture tooltip.",
    explanation: "Fixture explanation for contract testing only.",
    methodIds: ["mechanical-physical"],
    claimIds: ["example-mechanism-claim"],
    sourceIds: ["example-patent"],
  },
  {
    schemaVersion: 1,
    kind: "assessment",
    id: "mechanical-resource-burden-v1",
    title: "Fixture resource burden",
    publicationState: "approved",
    methodId: "mechanical-physical",
    criterionId: "resource-burden",
    status: "unknown",
    rubricVersion: "1.0.0",
    unknownReason: "Comparable functional-unit evidence is not part of this fixture.",
    supportingClaimIds: [],
    conflictingClaimIds: [],
    reviewer: "fixture-reviewer",
    reviewDate: "2026-11-14",
  },
] as const;

export type FixtureRecord = Record<string, unknown>;

export type FixtureManifestEntry = {
  id: string;
  path: string;
  sha256: string;
};

export type FixtureManifest = {
  schemaVersion: 1;
  publicationVersion: string;
  records: FixtureManifestEntry[];
  pages: FixtureManifestEntry[];
  assets: FixtureManifestEntry[];
};

export const FIXTURE_RECORD_DIRECTORIES: Readonly<Record<string, string>> = {
  material: "records/materials",
  "method-family": "records/methods",
  source: "records/sources",
  claim: "records/claims",
  gap: "records/gaps",
  hypothesis: "records/hypotheses",
  term: "records/terms",
  assessment: "records/assessments",
};

export const FIXTURE_PAGE_ID = "start-here";
export const FIXTURE_PAGE_PATH = "pages/start-here.md";
export const FIXTURE_PAGE_CONTENTS = "# Fixture start page\n\nContract fixture only.\n";
export const FIXTURE_PUBLICATION_VERSION = "phase-1-contract";

export function cloneFixtureRecords(): FixtureRecord[] {
  return VALID_FIXTURE_RECORDS.map((record) =>
    structuredClone(record) as unknown as FixtureRecord
  );
}

export function findFixtureRecord(
  records: readonly FixtureRecord[],
  id: string,
): FixtureRecord {
  const found = records.find((record) => record["id"] === id);
  if (found === undefined) {
    throw new Error(`Fixture record ${id} was not found.`);
  }
  return found;
}

export async function writeFixtureRecords(
  root: string,
  records: readonly FixtureRecord[],
): Promise<FixtureManifest> {
  const recordEntries: FixtureManifestEntry[] = [];

  for (const record of records) {
    const id = record["id"];
    const kind = record["kind"];
    if (typeof id !== "string" || typeof kind !== "string") {
      throw new Error("Fixture records require string id and kind fields.");
    }
    const directory = FIXTURE_RECORD_DIRECTORIES[kind];
    if (directory === undefined) {
      throw new Error(`Unknown fixture record kind ${kind}.`);
    }
    const relativePath = `${directory}/${id}.yaml`;
    const filePath = await writeFixture(root, relativePath, stringify(record));
    recordEntries.push({
      id,
      path: relativePath,
      sha256: await sha256File(filePath),
    });
  }

  const pagePath = await writeFixture(
    root,
    FIXTURE_PAGE_PATH,
    FIXTURE_PAGE_CONTENTS,
  );
  const manifest: FixtureManifest = {
    schemaVersion: 1,
    publicationVersion: FIXTURE_PUBLICATION_VERSION,
    records: recordEntries,
    pages: [
      {
        id: FIXTURE_PAGE_ID,
        path: FIXTURE_PAGE_PATH,
        sha256: await sha256File(pagePath),
      },
    ],
    assets: [],
  };
  await writeFixture(root, "manifest.yaml", stringify(manifest));

  return manifest;
}

// Path to the actual rubrics.yaml in the publication directory
export const RUBRICS_SOURCE_PATH = fileURLToPath(
  new URL("../../../publication/contract/v1/rubrics.yaml", import.meta.url),
);

export async function copyRubricsToFixture(root: string): Promise<void> {
  const rubricsYaml = await readFile(RUBRICS_SOURCE_PATH, "utf8");
  await mkdir(join(root, "contract", "v1"), { recursive: true });
  await writeFile(join(root, "contract", "v1", "rubrics.yaml"), rubricsYaml, "utf8");
}

export async function createValidFixture(
  root: string,
): Promise<{ root: string; manifest: FixtureManifest }> {
  const manifest = await writeFixtureRecords(root, cloneFixtureRecords());
  await copyRubricsToFixture(root);
  return { root, manifest };
}
/**
 * Adds a listed asset to a fixture and returns the relative path and exact
 * SHA-256, so a test can assert the exported copy is byte-identical.
 */
export async function addListedAsset(
  root: string,
  assetId: string,
  extension: string,
  contents: Uint8Array,
): Promise<{ path: string; sha256: string }> {
  const relativePath = "assets/" + assetId + extension;
  const filePath = join(root, relativePath);
  await mkdir(dirname(filePath), { recursive: true });
  await writeFile(filePath, contents);
  const sha256 = await sha256File(filePath);
  const manifestPath = join(root, "manifest.yaml");
  const manifestContent = await readFile(manifestPath, "utf8");
  const manifest = parse(manifestContent);
  manifest.assets = [
    ...(Array.isArray(manifest.assets) ? manifest.assets : []),
    { id: assetId, path: relativePath, sha256 },
  ];
  await writeFile(manifestPath, stringify(manifest), "utf8");
  return { path: relativePath, sha256 };
}
