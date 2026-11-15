import { z } from "zod";

export const CONTENT_KINDS = [
  "claim",
  "inference",
  "ai-gap-closing-note",
  "hypothesis",
  "unresolved-question",
] as const;

export const EVIDENCE_STATES = [
  "source-supported",
  "source-conflicted",
  "source-not-located",
  "derived-from-sourced-premises",
  "not-applicable",
] as const;

export const PUBLICATION_STATES = ["draft", "approved", "excluded"] as const;

export const VALIDATION_STATES = [
  "desk-research-only",
  "requires-human-validation",
  "new-unvalidated-hypothesis",
  "not-applicable",
] as const;

export const METHOD_FAMILY_IDS = [
  "mechanical-physical",
  "thermal",
  "chemical",
  "biological",
  "material-incorporation",
  "product-routes",
] as const;

export const SOURCE_RIGHTS = [
  "public-local-copy",
  "link-only",
  "rights-unresolved",
] as const;

export const DERIVATIVE_RIGHTS = [
  "publish-full-text",
  "publish-excerpts",
  "metadata-only",
  "unresolved",
] as const;

export const HUMAN_WORK_CATEGORIES = [
  "source-retrieval",
  "analytical-method-work",
  "controlled-laboratory-evidence",
  "pilot-evidence",
  "independent-product-or-intended-use-testing",
  "treatment-acceptance",
  "regulatory-review",
] as const;

export const ContentKindSchema = z.enum(CONTENT_KINDS);
export const EvidenceStateSchema = z.enum(EVIDENCE_STATES);
export const PublicationStateSchema = z.enum(PUBLICATION_STATES);
export const ValidationStateSchema = z.enum(VALIDATION_STATES);
export const MethodFamilyIdSchema = z.enum(METHOD_FAMILY_IDS);
export const SourceRightSchema = z.enum(SOURCE_RIGHTS);
export const DerivativeRightSchema = z.enum(DERIVATIVE_RIGHTS);
export const HumanWorkCategorySchema = z.enum(HUMAN_WORK_CATEGORIES);
