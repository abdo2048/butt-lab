import { z } from "zod";

import {
  IsoDateSchema,
  StableIdSchema,
} from "./common.ts";
import {
  PublicationStateSchema,
} from "./states.ts";

const NonemptyStringSchema = z.string().min(1);
const SemanticVersionSchema = z.string().regex(/^\d+\.\d+\.\d+$/);

export const CRITERION_IDS = [
  "evidence-strength",
  "process-ease",
  "resource-burden",
  "contaminant-fate-coverage",
  "sink-completeness",
  "product-readiness",
  "regulatory-clarity",
  "validation-maturity",
] as const;

export const CriterionIdSchema = z.enum(CRITERION_IDS);

export const RubricBandSchema = z.strictObject({
  score: z.number().int().min(1).max(5),
  label: NonemptyStringSchema,
  definition: NonemptyStringSchema,
});

export const RubricCriterionSchema = z.strictObject({
  id: CriterionIdSchema,
  title: NonemptyStringSchema,
  description: NonemptyStringSchema,
  higherIsMoreFavorable: z.literal(true),
  unknownRule: NonemptyStringSchema,
  bands: z.array(RubricBandSchema).length(5),
});

export const RubricCatalogSchema = z
  .strictObject({
    schemaVersion: z.literal(1),
    rubricVersion: SemanticVersionSchema,
    criteria: z.array(RubricCriterionSchema).length(8),
  })
  .superRefine((catalog, context) => {
    for (const criterionId of CRITERION_IDS) {
      const count = catalog.criteria.filter(
        (criterion) => criterion.id === criterionId,
      ).length;
      if (count !== 1) {
        context.addIssue({
          code: "custom",
          message: `Criterion ${criterionId} must appear exactly once`,
          path: ["criteria"],
        });
      }
    }

    for (const [criterionIndex, criterion] of catalog.criteria.entries()) {
      const scores = criterion.bands.map((band) => band.score);
      if (!scores.every((score, index) => score === index + 1)) {
        context.addIssue({
          code: "custom",
          message: "Rubric band scores must be ordered 1,2,3,4,5",
          path: ["criteria", criterionIndex, "bands"],
        });
      }
    }
  });

export const AssessmentBaseSchema = z.strictObject({
  schemaVersion: z.literal(1),
  kind: z.literal("assessment"),
  id: StableIdSchema,
  title: NonemptyStringSchema,
  publicationState: PublicationStateSchema,
  methodId: StableIdSchema,
  criterionId: CriterionIdSchema,
  rubricVersion: SemanticVersionSchema,
  supportingClaimIds: z.array(StableIdSchema),
  conflictingClaimIds: z.array(StableIdSchema),
  reviewer: NonemptyStringSchema,
  reviewDate: IsoDateSchema,
});

export const ScoredAssessmentRecordSchema = AssessmentBaseSchema.extend({
  status: z.literal("scored"),
  score: z.number().int().min(1).max(5),
  label: NonemptyStringSchema,
  rationale: NonemptyStringSchema,
  basis: z.enum([
    "source-supported",
    "inference",
    "ai-assessed-human-reviewed",
  ]),
});

export const UnknownAssessmentRecordSchema = AssessmentBaseSchema.extend({
  status: z.literal("unknown"),
  unknownReason: NonemptyStringSchema,
});

export const NotApplicableAssessmentRecordSchema = AssessmentBaseSchema.extend({
  status: z.literal("not-applicable"),
  notApplicableReason: NonemptyStringSchema,
});

export const AssessmentRecordSchema = z.discriminatedUnion("status", [
  ScoredAssessmentRecordSchema,
  UnknownAssessmentRecordSchema,
  NotApplicableAssessmentRecordSchema,
]);

export type CriterionId = z.infer<typeof CriterionIdSchema>;
export type RubricBand = z.infer<typeof RubricBandSchema>;
export type RubricCriterion = z.infer<typeof RubricCriterionSchema>;
export type RubricCatalog = z.infer<typeof RubricCatalogSchema>;
export type AssessmentBase = z.infer<typeof AssessmentBaseSchema>;
export type ScoredAssessmentRecord = z.infer<
  typeof ScoredAssessmentRecordSchema
>;
export type UnknownAssessmentRecord = z.infer<
  typeof UnknownAssessmentRecordSchema
>;
export type NotApplicableAssessmentRecord = z.infer<
  typeof NotApplicableAssessmentRecordSchema
>;
export type AssessmentRecord = z.infer<typeof AssessmentRecordSchema>;
