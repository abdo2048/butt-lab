export type AssessmentStatus = "scored" | "unknown" | "not-applicable";

export type EvidenceBasis = "source-supported" | "inference" | "ai-assessed-human-reviewed";

export type SortMode = "default" | "evidence-gaps";

export interface AssessmentView {
  id: string;
  methodId: string;
  criterionId: string;
  status: AssessmentStatus;
  score?: number;
  label?: string;
  basis?: EvidenceBasis;
  rationale?: string;
  unknownReason?: string;
  notApplicableReason?: string;
}

export interface ComparisonRow {
  methodId: string;
  title: string;
  assessments: Record<string, AssessmentView>;
}

/**
 * The order the three assessment states take inside each sort mode.
 *
 * `not-applicable` always sits between the mode's focus group and the remaining
 * group: it is neither a ranking nor an open question, it is a closed one.
 *
 * `default` ranks the scored rows and pushes `unknown` to the end.
 * `evidence-gaps` puts `unknown` first so the missing measurements surface.
 */
const GROUP_ORDER: Record<SortMode, Record<AssessmentStatus, number>> = {
  default: { scored: 0, "not-applicable": 1, unknown: 2 },
  "evidence-gaps": { unknown: 0, "not-applicable": 1, scored: 2 },
};

const MISSING_ASSESSMENT_REASON =
  "No assessment record for this criterion exists in the published bundle.";

export function assessmentFor(row: ComparisonRow, criterionId: string): AssessmentView {
  const found = row.assessments[criterionId];
  if (found !== undefined) {
    return found;
  }
  return {
    id: `${row.methodId}-${criterionId}-assessment`,
    methodId: row.methodId,
    criterionId,
    status: "unknown",
    unknownReason: MISSING_ASSESSMENT_REASON,
  };
}

/**
 * Sort by one criterion at a time. Scores are never averaged and no aggregate is
 * produced. Rows that tie keep their input order.
 */
export function sortByCriterion(
  rows: readonly ComparisonRow[],
  criterionId: string,
  mode: SortMode = "default",
): ComparisonRow[] {
  const groups = GROUP_ORDER[mode];
  return rows
    .map((row, index) => ({ row, index, assessment: assessmentFor(row, criterionId) }))
    .sort((left, right) => {
      const byGroup = groups[left.assessment.status] - groups[right.assessment.status];
      if (byGroup !== 0) {
        return byGroup;
      }
      if (left.assessment.status === "scored" && right.assessment.status === "scored") {
        const byScore = (right.assessment.score ?? 0) - (left.assessment.score ?? 0);
        if (byScore !== 0) {
          return byScore;
        }
      }
      return left.index - right.index;
    })
    .map((entry) => entry.row);
}

/**
 * Keep the rows whose assessment for this criterion carries the requested basis.
 * The assessments that survive are returned untouched: filtering never relabels.
 */
export function filterByBasis(
  rows: readonly ComparisonRow[],
  criterionId: string,
  basis: EvidenceBasis,
): ComparisonRow[] {
  return rows.filter((row) => assessmentFor(row, criterionId).basis === basis);
}

/** Keep the rows whose assessment for this criterion carries the requested status. */
export function filterByStatus(
  rows: readonly ComparisonRow[],
  criterionId: string,
  status: AssessmentStatus,
): ComparisonRow[] {
  return rows.filter((row) => assessmentFor(row, criterionId).status === status);
}
