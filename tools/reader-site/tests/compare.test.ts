import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  assessmentFor,
  filterByBasis,
  filterByStatus,
  sortByCriterion,
  type AssessmentStatus,
  type ComparisonRow,
  type EvidenceBasis,
} from "../src/lib/compare.ts";

const CRITERION = "evidence-strength";

function scored(
  methodId: string,
  score: number,
  basis: EvidenceBasis = "source-supported",
  label = "Band",
): ComparisonRow {
  return {
    methodId,
    title: methodId,
    assessments: {
      [CRITERION]: {
        id: `${methodId}-${CRITERION}-assessment`,
        methodId,
        criterionId: CRITERION,
        status: "scored",
        score,
        label,
        basis,
        rationale: `${methodId} rationale`,
      },
    },
  };
}

function unknown(methodId: string, reason = "not measured"): ComparisonRow {
  return {
    methodId,
    title: methodId,
    assessments: {
      [CRITERION]: {
        id: `${methodId}-${CRITERION}-assessment`,
        methodId,
        criterionId: CRITERION,
        status: "unknown",
        unknownReason: reason,
      },
    },
  };
}

function notApplicable(methodId: string, reason = "does not apply"): ComparisonRow {
  return {
    methodId,
    title: methodId,
    assessments: {
      [CRITERION]: {
        id: `${methodId}-${CRITERION}-assessment`,
        methodId,
        criterionId: CRITERION,
        status: "not-applicable",
        notApplicableReason: reason,
      },
    },
  };
}

function order(rows: readonly ComparisonRow[]): string[] {
  return rows.map((row) => row.methodId);
}

describe("sortByCriterion", () => {
  it("orders scored rows by descending score", () => {
    const rows = [scored("low", 2), scored("high", 5), scored("mid", 3)];

    const sorted = sortByCriterion(rows, CRITERION);

    assert.deepEqual(order(sorted), ["high", "mid", "low"]);
  });

  it("puts unknown last by default", () => {
    const rows = [unknown("gap"), scored("known", 1), notApplicable("na")];

    const sorted = sortByCriterion(rows, CRITERION);

    assert.equal(sorted.at(-1)?.methodId, "gap");
    assert.equal(sorted.at(-2)?.methodId, "na");
  });

  it("keeps not-applicable between the scored rows and the unknown row in the default order", () => {
    const rows = [unknown("gap"), notApplicable("na"), scored("known", 1)];

    const sorted = sortByCriterion(rows, CRITERION);

    assert.deepEqual(order(sorted), ["known", "na", "gap"]);
  });

  it("puts unknown first in the evidence-gaps mode", () => {
    const rows = [scored("known", 5), unknown("gap"), notApplicable("na")];

    const sorted = sortByCriterion(rows, CRITERION, "evidence-gaps");

    assert.equal(sorted.at(0)?.methodId, "gap");
  });

  it("keeps not-applicable between the unknown and the scored rows in the evidence-gaps order", () => {
    const rows = [scored("known", 5), notApplicable("na"), unknown("gap")];

    const sorted = sortByCriterion(rows, CRITERION, "evidence-gaps");

    assert.deepEqual(order(sorted), ["gap", "na", "known"]);
  });

  it("keeps the input order for rows that tie on score", () => {
    const rows = [scored("first", 3), scored("second", 3), scored("third", 3)];

    const sorted = sortByCriterion(rows, CRITERION);

    assert.deepEqual(order(sorted), ["first", "second", "third"]);
  });

  it("treats a row with no assessment for the criterion as unknown and sorts it last by default", () => {
    const rows: ComparisonRow[] = [
      { methodId: "missing", title: "missing", assessments: {} },
      scored("known", 1),
    ];

    const sorted = sortByCriterion(rows, CRITERION);

    assert.deepEqual(order(sorted), ["known", "missing"]);
    assert.equal(assessmentFor(rows[0]!, CRITERION).status, "unknown");
  });

  it("never gives a not-applicable assessment a score", () => {
    const rows = [notApplicable("na")];

    const sorted = sortByCriterion(rows, CRITERION);

    const assessment = assessmentFor(sorted[0]!, CRITERION);
    assert.equal(assessment.status, "not-applicable");
    assert.equal(assessment.score, undefined);
  });

  it("does not mutate the rows it is given", () => {
    const rows = [unknown("gap"), scored("known", 4)];
    const before = structuredClone(rows);

    sortByCriterion(rows, CRITERION);

    assert.deepEqual(rows, before);
  });

  it("does not compute an aggregate across criteria", () => {
    const rows: ComparisonRow[] = [
      {
        methodId: "one",
        title: "one",
        assessments: {
          [CRITERION]: {
            id: "a",
            methodId: "one",
            criterionId: CRITERION,
            status: "scored",
            score: 4,
            label: "Strong",
            basis: "source-supported",
          },
          "process-ease": {
            id: "b",
            methodId: "one",
            criterionId: "process-ease",
            status: "scored",
            score: 2,
            label: "Minimal",
            basis: "inference",
          },
        },
      },
    ];

    const sorted = sortByCriterion(rows, CRITERION);

    const row = sorted[0]! as unknown as Record<string, unknown>;
    assert.equal(row["aggregate"], undefined);
    assert.equal(row["total"], undefined);
    assert.equal(row["average"], undefined);
  });
});

describe("filterByBasis", () => {
  it("keeps only the rows whose assessment carries the requested basis", () => {
    const rows = [
      scored("supported", 4, "source-supported"),
      scored("inferred", 3, "inference"),
      scored("reviewed", 2, "ai-assessed-human-reviewed"),
    ];

    const filtered = filterByBasis(rows, CRITERION, "source-supported");

    assert.deepEqual(order(filtered), ["supported"]);
  });

  it("does not relabel the assessments it keeps", () => {
    const rows = [scored("supported", 4, "source-supported"), scored("inferred", 3, "inference")];

    const filtered = filterByBasis(rows, CRITERION, "source-supported");

    assert.deepEqual(filtered[0]?.assessments[CRITERION], rows[0]?.assessments[CRITERION]);
    assert.equal(filtered[0]?.assessments[CRITERION]?.basis, "source-supported");
    assert.equal(filtered[0]?.assessments[CRITERION]?.label, "Band");
  });

  it("leaves out rows whose assessment has no basis", () => {
    const rows = [unknown("gap"), notApplicable("na"), scored("supported", 4, "source-supported")];

    const filtered = filterByBasis(rows, CRITERION, "source-supported");

    assert.deepEqual(order(filtered), ["supported"]);
  });

  it("does not mutate the rows it is given", () => {
    const rows = [scored("supported", 4, "source-supported"), scored("inferred", 3, "inference")];
    const before = structuredClone(rows);

    filterByBasis(rows, CRITERION, "source-supported");

    assert.deepEqual(rows, before);
  });
});

describe("filterByStatus", () => {
  it("keeps only the rows whose assessment carries the requested status", () => {
    const rows: ComparisonRow[] = [unknown("gap"), notApplicable("na"), scored("known", 4)];

    const filtered = filterByStatus(rows, CRITERION, "unknown");

    assert.deepEqual(order(filtered), ["gap"]);
  });

  it("treats a missing assessment as unknown", () => {
    const rows: ComparisonRow[] = [{ methodId: "missing", title: "missing", assessments: {} }];

    const filtered = filterByStatus(rows, CRITERION, "unknown");

    assert.deepEqual(order(filtered), ["missing"]);
  });
});

describe("assessmentFor", () => {
  it("returns the assessment stored for the criterion", () => {
    const rows = [scored("known", 4)];

    assert.equal(assessmentFor(rows[0]!, CRITERION).status, "scored");
  });

  it("reports an unknown assessment for a criterion the method does not carry", () => {
    const rows: ComparisonRow[] = [{ methodId: "missing", title: "missing", assessments: {} }];

    const assessment = assessmentFor(rows[0]!, CRITERION);

    assert.equal(assessment.status, "unknown");
    assert.equal(assessment.unknownReason !== undefined, true);
  });

  it("never returns a score for an unknown or not-applicable assessment", () => {
    const rows: ComparisonRow[] = [unknown("gap"), notApplicable("na")];

    for (const row of rows) {
      const assessment = assessmentFor(row, CRITERION);
      assert.equal(assessment.score, undefined);
      assert.equal(assessment.basis, undefined);
    }
  });
});

describe("status vocabulary", () => {
  it("recognises exactly the three assessment states", () => {
    const states: AssessmentStatus[] = ["scored", "unknown", "not-applicable"];

    for (const state of states) {
      assert.ok(["scored", "unknown", "not-applicable"].includes(state));
    }
  });
});
