import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  basisChip,
  basisLabel,
  criterionLabel,
  evidenceStateLabel,
  rightsLabel,
  scoreSummary,
  statusChip,
  statusLabel,
} from "../src/lib/format.ts";

describe("criterionLabel", () => {
  it("turns a criterion id into a readable label", () => {
    assert.equal(criterionLabel("evidence-strength"), "Evidence strength");
    assert.equal(criterionLabel("contaminant-fate-coverage"), "Contaminant fate coverage");
    assert.equal(criterionLabel("sink-completeness"), "Sink completeness");
  });

  it("keeps an unrecognised id readable instead of inventing one", () => {
    assert.equal(criterionLabel("not-a-criterion"), "Not a criterion");
  });
});

describe("statusLabel", () => {
  it("names each assessment status", () => {
    assert.equal(statusLabel("scored"), "Scored");
    assert.equal(statusLabel("unknown"), "Unknown");
    assert.equal(statusLabel("not-applicable"), "Not applicable");
  });
});

describe("statusChip", () => {
  it("gives every status a text and a tone, so colour is never the only signal", () => {
    assert.deepEqual(statusChip("scored"), { text: "SCORED", tone: "scored" });
    assert.deepEqual(statusChip("unknown"), { text: "UNKNOWN", tone: "unknown" });
    assert.deepEqual(statusChip("not-applicable"), { text: "NOT APPLICABLE", tone: "not-applicable" });
  });
});

describe("basisLabel", () => {
  it("names each evidence basis", () => {
    assert.equal(basisLabel("source-supported"), "Source-supported");
    assert.equal(basisLabel("inference"), "Inference");
    assert.equal(basisLabel("ai-assessed-human-reviewed"), "AI-assessed, human reviewed");
  });

  it("returns no label when there is no basis at all", () => {
    assert.equal(basisLabel(undefined), "No basis");
  });
});

describe("basisChip", () => {
  it("labels each known basis", () => {
    assert.deepEqual(basisChip("source-supported"), { text: "SOURCE", tone: "source" });
    assert.deepEqual(basisChip("inference"), { text: "INFERENCE", tone: "inference" });
    assert.deepEqual(basisChip("ai-assessed-human-reviewed"), { text: "AI REVIEWED", tone: "ai" });
  });

  it("shows that a basis-less assessment carries no basis", () => {
    assert.deepEqual(basisChip(undefined), { text: "NO BASIS", tone: "none" });
  });

  it("never rewrites an unrecognised basis into a known one", () => {
    const chip = basisChip("some-future-basis");
    assert.equal(chip.text, "SOME-FUTURE-BASIS");
    assert.notEqual(chip.tone, "source");
    assert.notEqual(chip.tone, "inference");
    assert.notEqual(chip.tone, "ai");
  });
});

describe("evidenceStateLabel", () => {
  it("names the evidence states the bundle uses", () => {
    assert.equal(evidenceStateLabel("source-supported"), "Source-supported");
    assert.equal(evidenceStateLabel("source-not-located"), "Source not located");
    assert.equal(evidenceStateLabel("derived-from-sourced-premises"), "Derived from sourced premises");
  });

  it("keeps an unrecognised state readable rather than relabelling it", () => {
    assert.equal(evidenceStateLabel("source-conflicted"), "Source conflicted");
  });
});

describe("scoreSummary", () => {
  it("shows the score and its band for a scored assessment", () => {
    assert.equal(scoreSummary({ status: "scored", score: 2, label: "Limited" }), "2 (Limited)");
  });

  it("shows unknown as unknown, with no score", () => {
    assert.equal(scoreSummary({ status: "unknown" }), "Unknown");
  });

  it("shows a not-applicable assessment as not applicable, with no score", () => {
    assert.equal(scoreSummary({ status: "not-applicable" }), "Not applicable");
  });
});

describe("rightsLabel", () => {
  it("names each publication right", () => {
    assert.equal(rightsLabel("link-only"), "Link only");
    assert.equal(rightsLabel("public-local-copy"), "Public local copy");
    assert.equal(rightsLabel("rights-unresolved"), "Rights unresolved");
  });
});
