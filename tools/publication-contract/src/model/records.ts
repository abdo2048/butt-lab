import { z } from "zod";

import {
  AuditReferenceSchema,
  HttpUrlSchema,
  IsoDateSchema,
  Sha256Schema,
  StableIdSchema,
} from "./common.ts";
import {
  DerivativeRightSchema,
  EvidenceStateSchema,
  HumanWorkCategorySchema,
  MethodFamilyIdSchema,
  PublicationStateSchema,
  SourceRightSchema,
  ValidationStateSchema,
} from "./states.ts";
import {
  AssessmentRecordSchema,
} from "./rubrics.ts";

const NonemptyStringSchema = z.string().min(1);

export const BaseRecordSchema = z.strictObject({
  schemaVersion: z.literal(1),
  id: StableIdSchema,
  title: NonemptyStringSchema,
  publicationState: PublicationStateSchema,
  auditAliases: z.array(z.string()).default([]),
});

export const MaterialRecordSchema = BaseRecordSchema.extend({
  kind: z.literal("material"),
  description: NonemptyStringSchema,
  compositionSummary: NonemptyStringSchema,
  contaminants: z.array(z.string()),
  termIds: z.array(StableIdSchema),
  jurisdictions: z.array(z.string()),
  tags: z.array(z.string()),
  methodFamilyIds: z.array(MethodFamilyIdSchema),
});

export const ProcessStepSchema = z.strictObject({
  id: StableIdSchema,
  label: NonemptyStringSchema,
  description: NonemptyStringSchema,
});

export const NamedProcessItemSchema = z.strictObject({
  id: StableIdSchema,
  label: NonemptyStringSchema,
  description: NonemptyStringSchema,
});

export const ProductSchema = NamedProcessItemSchema.extend({
  intendedUse: NonemptyStringSchema,
});

export const SinkSchema = z.strictObject({
  id: StableIdSchema,
  material: NonemptyStringSchema,
  intendedUse: NonemptyStringSchema,
  acceptanceBasis: NonemptyStringSchema,
  issuer: NonemptyStringSchema,
  finalRoute: NonemptyStringSchema,
});

export const OrganizationMentionSchema = z.strictObject({
  name: NonemptyStringSchema,
  role: NonemptyStringSchema,
});

export const StreamSchema = z.strictObject({
  id: StableIdSchema,
  label: NonemptyStringSchema,
  type: z.enum([
    "input",
    "product",
    "liquid",
    "reject",
    "emission",
    "treatment-outlet",
    "unexplained-loss",
  ]),
  contaminants: z.array(z.string()),
  fateState: z.enum(["measured", "inferred", "unresolved", "not-applicable"]),
});

export const MethodRecordSchema = BaseRecordSchema.extend({
  kind: z.literal("method-family"),
  family: MethodFamilyIdSchema,
  summary: NonemptyStringSchema,
  mechanism: NonemptyStringSchema,
  feedstock: NonemptyStringSchema,
  preparation: NonemptyStringSchema,
  steps: z.array(ProcessStepSchema).min(1),
  inputs: z.array(NamedProcessItemSchema),
  streams: z.array(StreamSchema),
  products: z.array(ProductSchema),
  sinks: z.array(SinkSchema),
  claimIds: z.array(StableIdSchema),
  gapIds: z.array(StableIdSchema),
  termIds: z.array(StableIdSchema),
  sourceIds: z.array(StableIdSchema),
  hypothesisIds: z.array(StableIdSchema),
  assessmentIds: z.array(StableIdSchema),
  organizations: z.array(OrganizationMentionSchema),
  auditReferences: z.array(AuditReferenceSchema),
});

export const DerivativeSchema = z.strictObject({
  id: StableIdSchema,
  path: NonemptyStringSchema,
  sha256: Sha256Schema,
  extractionMethod: NonemptyStringSchema,
  pageMapping: NonemptyStringSchema,
  qualityWarnings: z.array(z.string()),
  publicationRight: DerivativeRightSchema,
});

export const SourceRecordSchema = BaseRecordSchema.extend({
  kind: z.literal("source"),
  citation: NonemptyStringSchema,
  sourceType: z.enum([
    "paper",
    "patent",
    "company",
    "regulatory",
    "thesis",
    "report",
    "web-page",
    "other",
  ]),
  publisherOrIssuer: NonemptyStringSchema,
  versionOrDate: NonemptyStringSchema,
  originalUrl: HttpUrlSchema,
  accessDate: IsoDateSchema,
  localArtifact: z
    .strictObject({
      path: NonemptyStringSchema,
      sha256: Sha256Schema,
    })
    .optional(),
  redistributionLicense: z
    .strictObject({ name: NonemptyStringSchema, url: HttpUrlSchema })
    .optional(),
  rights: SourceRightSchema,
  derivatives: z.array(DerivativeSchema),
  claimIds: z.array(StableIdSchema),
  methodIds: z.array(StableIdSchema),
});

export const QuantitativeBasisSchema = z.strictObject({
  valueText: NonemptyStringSchema,
  units: NonemptyStringSchema,
  denominator: NonemptyStringSchema,
  massBasis: NonemptyStringSchema,
});

export const ClaimRecordSchema = BaseRecordSchema.extend({
  kind: z.literal("claim"),
  contentKind: z.enum(["claim", "inference"]),
  proposition: NonemptyStringSchema,
  evidenceState: EvidenceStateSchema,
  methodIds: z.array(StableIdSchema),
  hypothesisIds: z.array(StableIdSchema),
  sourceId: StableIdSchema.optional(),
  locator: NonemptyStringSchema.optional(),
  quantitativeBasis: QuantitativeBasisSchema.optional(),
  counterevidenceClaimIds: z.array(StableIdSchema),
  premiseClaimIds: z.array(StableIdSchema).optional(),
  reasoning: NonemptyStringSchema.optional(),
  reviewer: NonemptyStringSchema,
  reviewDate: IsoDateSchema,
});

export const GapBaseSchema = BaseRecordSchema.extend({
  kind: z.literal("gap"),
  question: NonemptyStringSchema,
  gapType: StableIdSchema,
  whyItMatters: NonemptyStringSchema,
  affectedRecordIds: z.array(StableIdSchema).min(1),
  evidenceState: EvidenceStateSchema,
  validationState: ValidationStateSchema,
  nextHumanWork: HumanWorkCategorySchema,
});

export const UnresolvedQuestionGapSchema = GapBaseSchema.extend({
  contentKind: z.literal("unresolved-question"),
  falsifierOrDecisionCondition: NonemptyStringSchema.optional(),
});

export const AiGapClosingNoteSchema = GapBaseSchema.extend({
  contentKind: z.literal("ai-gap-closing-note"),
  sourceInputIds: z.array(StableIdSchema).min(1),
  assumptions: z.array(NonemptyStringSchema).min(1),
  falsifierOrDecisionCondition: NonemptyStringSchema,
});

export const GapRecordSchema = z.discriminatedUnion("contentKind", [
  UnresolvedQuestionGapSchema,
  AiGapClosingNoteSchema,
]);

export const HypothesisRecordSchema = BaseRecordSchema.extend({
  kind: z.literal("hypothesis"),
  contentKind: z.literal("hypothesis"),
  visibleLabel: NonemptyStringSchema,
  sourceInputIds: z.array(StableIdSchema),
  priorContext: NonemptyStringSchema,
  mechanism: NonemptyStringSchema,
  assumptions: z.array(NonemptyStringSchema).min(1),
  unresolvedDependencies: z.array(NonemptyStringSchema),
  failureModes: z.array(NonemptyStringSchema).min(1),
  falsifiers: z.array(NonemptyStringSchema).min(1),
  validationQuestionIds: z.array(StableIdSchema).min(1),
  evidenceState: EvidenceStateSchema,
  validationState: ValidationStateSchema,
  reviewer: NonemptyStringSchema,
  recordVersion: NonemptyStringSchema,
  auditReferences: z.array(AuditReferenceSchema),
});

export const TermRecordSchema = BaseRecordSchema.extend({
  kind: z.literal("term"),
  preferredLabel: NonemptyStringSchema,
  acronym: NonemptyStringSchema.optional(),
  aliases: z.array(z.string()),
  tooltip: NonemptyStringSchema,
  explanation: NonemptyStringSchema,
  methodIds: z.array(StableIdSchema),
  claimIds: z.array(StableIdSchema),
  sourceIds: z.array(StableIdSchema),
});

export const ContentRecordSchema = z.union([
  MaterialRecordSchema,
  MethodRecordSchema,
  SourceRecordSchema,
  ClaimRecordSchema,
  GapRecordSchema,
  HypothesisRecordSchema,
  TermRecordSchema,
  AssessmentRecordSchema,
]);

export type ContentRecord = z.infer<typeof ContentRecordSchema>;
