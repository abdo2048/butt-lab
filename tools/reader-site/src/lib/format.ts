import type { AssessmentRecord, AssessmentStatus } from "./types.ts";

/**
 * Display vocabulary for the reader site.
 *
 * Every function here is presentation only. None of them changes a value, a score,
 * an evidence state or an approval - they only name what the bundle already says.
 */

export type ChipTone =
  | "scored"
  | "unknown"
  | "not-applicable"
  | "source"
  | "inference"
  | "ai"
  | "none"
  | "other";

export interface Chip {
  text: string;
  tone: ChipTone;
}

const STATUS_LABELS: Record<AssessmentStatus, string> = {
  scored: "Scored",
  unknown: "Unknown",
  "not-applicable": "Not applicable",
};

const STATUS_CHIPS: Record<AssessmentStatus, Chip> = {
  scored: { text: "SCORED", tone: "scored" },
  unknown: { text: "UNKNOWN", tone: "unknown" },
  "not-applicable": { text: "NOT APPLICABLE", tone: "not-applicable" },
};

const BASIS_LABELS: Record<string, string> = {
  "source-supported": "Source-supported",
  inference: "Inference",
  "ai-assessed-human-reviewed": "AI-assessed, human reviewed",
};

const BASIS_CHIPS: Record<string, Chip> = {
  "source-supported": { text: "SOURCE", tone: "source" },
  inference: { text: "INFERENCE", tone: "inference" },
  "ai-assessed-human-reviewed": { text: "AI REVIEWED", tone: "ai" },
};

const EVIDENCE_STATE_LABELS: Record<string, string> = {
  "source-supported": "Source-supported",
  "source-not-located": "Source not located",
  "source-conflicted": "Source conflicted",
  "derived-from-sourced-premises": "Derived from sourced premises",
  "ai-proposal": "AI proposal",
  "ai-gap-closing-note": "AI gap-closing note",
  unverified: "Unverified",
};

const RIGHTS_LABELS: Record<string, string> = {
  "link-only": "Link only",
  "public-local-copy": "Public local copy",
  "rights-unresolved": "Rights unresolved",
};

function humanize(value: string): string {
  const words = value.split("-").filter(Boolean);
  const sentence = words.join(" ");
  if (sentence.length === 0) return value;
  return sentence.charAt(0).toUpperCase() + sentence.slice(1);
}

/** "evidence-strength" becomes "Evidence strength". No criterion is renamed by hand. */
export function criterionLabel(criterionId: string): string {
  return humanize(criterionId);
}

export function statusLabel(status: AssessmentStatus): string {
  return STATUS_LABELS[status];
}

export function statusChip(status: AssessmentStatus): Chip {
  return STATUS_CHIPS[status];
}

export function basisLabel(basis: string | undefined): string {
  if (basis === undefined) return "No basis";
  return BASIS_LABELS[basis] ?? humanize(basis);
}

export function basisChip(basis: string | undefined): Chip {
  if (basis === undefined) return { text: "NO BASIS", tone: "none" };
  const known = BASIS_CHIPS[basis];
  if (known) return known;
  return { text: basis.toUpperCase(), tone: "other" };
}

export function evidenceStateLabel(state: string): string {
  return EVIDENCE_STATE_LABELS[state] ?? humanize(state);
}

export function rightsLabel(rights: string): string {
  return RIGHTS_LABELS[rights] ?? humanize(rights);
}

/**
 * The short result shown next to a criterion.
 * A score of 1 is a completed low assessment; "Unknown" is an unanswered criterion.
 */
export function scoreSummary(
  assessment: Pick<AssessmentRecord, "status" | "score" | "label">,
): string {
  if (assessment.status === "scored") {
    const score = assessment.score;
    const label = assessment.label;
    if (typeof score === "number" && typeof label === "string") return `${score} (${label})`;
    if (typeof score === "number") return String(score);
  }
  return statusLabel(assessment.status);
}
