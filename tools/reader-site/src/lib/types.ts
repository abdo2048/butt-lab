/**
 * Record shapes of the exported publication bundle.
 *
 * The bundle is produced and validated by `tools/publication-contract`; the reader
 * app consumes it as it is. These interfaces describe the fields the site reads.
 * They are a reading contract, not a second schema: a field that is not listed
 * here is simply not shown.
 */

export interface AuditReference {
  internalId: string;
  label: string;
  url: string;
  version: string;
}

export interface Derivative {
  id: string;
  title: string;
  kind: string;
  qualityNote: string;
}

export interface SourceRecord {
  id: string;
  kind: "source";
  title: string;
  citation: string;
  sourceType: string;
  originalUrl: string;
  versionOrDate: string;
  accessDate: string;
  publisherOrIssuer: string;
  rights: string;
  claimIds: string[];
  methodIds: string[];
  derivatives: Derivative[];
  auditAliases: string[];
  publicationState: string;
  schemaVersion: number;
}

export interface TermRecord {
  id: string;
  kind: "term";
  title: string;
  preferredLabel: string;
  aliases: string[];
  tooltip: string;
  explanation: string;
  claimIds: string[];
  methodIds: string[];
  sourceIds: string[];
  auditAliases: string[];
  publicationState: string;
  schemaVersion: number;
}

export interface HypothesisRecord {
  id: string;
  kind: "hypothesis";
  title: string;
  visibleLabel: string;
  mechanism: string;
  priorContext: string;
  assumptions: string[];
  failureModes: string[];
  falsifiers: string[];
  unresolvedDependencies: string[];
  validationQuestionIds: string[];
  sourceInputIds: string[];
  auditAliases: string[];
  auditReferences: AuditReference[];
  evidenceState: string;
  validationState: string;
  contentKind: string;
  reviewer: string;
  recordVersion: string;
  publicationState: string;
  schemaVersion: number;
}

export interface FamilyInput {
  id: string;
  label: string;
  description: string;
}

export interface FamilyStep {
  id: string;
  label: string;
  description: string;
}

export interface FamilyStream {
  id: string;
  label: string;
  type: string;
  contaminants: string[];
  fateState: string;
}

export interface FamilyProduct {
  id: string;
  label: string;
  description: string;
  intendedUse: string;
}

export interface FamilySink {
  id: string;
  material: string;
  intendedUse: string;
  acceptanceBasis: string;
  issuer: string;
  finalRoute: string;
}

export interface FamilyOrganization {
  name: string;
  role: string;
}

export interface MethodFamilyRecord {
  id: string;
  kind: "method-family";
  title: string;
  summary: string;
  mechanism: string;
  preparation: string;
  feedstock: string;
  family: string;
  inputs: FamilyInput[];
  steps: FamilyStep[];
  streams: FamilyStream[];
  products: FamilyProduct[];
  sinks: FamilySink[];
  organizations: FamilyOrganization[];
  assessmentIds: string[];
  claimIds: string[];
  gapIds: string[];
  hypothesisIds: string[];
  sourceIds: string[];
  termIds: string[];
  auditAliases: string[];
  auditReferences: AuditReference[];
  publicationState: string;
  schemaVersion: number;
}

export type AssessmentStatus = "scored" | "unknown" | "not-applicable";
export type EvidenceBasis = "source-supported" | "inference" | "ai-assessed-human-reviewed";

export interface AssessmentRecord {
  id: string;
  kind: "assessment";
  title: string;
  methodId: string;
  criterionId: string;
  status: AssessmentStatus;
  score?: number;
  label?: string;
  basis?: EvidenceBasis;
  rationale?: string;
  unknownReason?: string;
  notApplicableReason?: string;
  rubricVersion: string;
  reviewDate: string;
  reviewer: string;
  supportingClaimIds: string[];
  conflictingClaimIds: string[];
  publicationState: string;
  schemaVersion: number;
}

export interface ClaimRecord {
  id: string;
  kind: "claim";
  title: string;
  proposition: string;
  evidenceState: string;
  contentKind: string;
  methodIds: string[];
  hypothesisIds: string[];
  counterevidenceClaimIds: string[];
  locator?: string;
  sourceId?: string;
  auditAliases: string[];
  reviewDate: string;
  reviewer: string;
  publicationState: string;
  schemaVersion: number;
}

export interface GapRecord {
  id: string;
  kind: "gap";
  title: string;
  question: string;
  whyItMatters: string;
  falsifierOrDecisionCondition: string;
  nextHumanWork: string;
  validationState: string;
  evidenceState: string;
  gapType: string;
  contentKind: string;
  affectedRecordIds: string[];
  sourceInputIds?: string[];
  assumptions?: string[];
  auditAliases: string[];
  publicationState: string;
  schemaVersion: number;
}

export interface MaterialRecord {
  id: string;
  kind: "material";
  title: string;
  description: string;
  compositionSummary: string;
  contaminants: string[];
  jurisdictions: string[];
  tags: string[];
  termIds: string[];
  methodFamilyIds: string[];
  auditAliases: string[];
  publicationState: string;
  schemaVersion: number;
}

export type BundleRecord =
  | SourceRecord
  | TermRecord
  | HypothesisRecord
  | MethodFamilyRecord
  | AssessmentRecord
  | ClaimRecord
  | GapRecord
  | MaterialRecord;

export interface Relationship {
  field: string;
  fromId: string;
  targetKind: string | null;
  toId: string;
}

export interface Backlink {
  field: string;
  sourceId: string;
  targetId: string;
}

export interface BundleManifest {
  schemaVersion: number;
  publicationVersion: string;
  outputFiles: Array<{ path: string; sha256: string }>;
}

export interface BundlePage {
  id: string;
  markdown: string;
}

export interface BundleData {
  records: Map<string, BundleRecord>;
  byKind: Record<string, string[]>;
  pages: Map<string, BundlePage>;
  glossary: Record<string, string>;
  relationships: Relationship[];
  backlinks: Backlink[];
  manifest: BundleManifest;
}
