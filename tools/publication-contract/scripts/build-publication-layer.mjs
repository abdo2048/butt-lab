// Builds the reader-platform publication layer from the authored layer data.
//
// The data files under layer-data/ are the single source of truth for the
// cigarette-butt pilot content. This script turns them into the record files,
// the reader narrative pages and the publication manifest that the content
// contract validates. It is deterministic: running it twice produces the same
// bytes.
//
//   node scripts/build-publication-layer.mjs
//
// It writes only inside ../../publication/.

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { stringify } from "yaml";

const here = dirname(fileURLToPath(import.meta.url));
const packageRoot = join(here, "..");
const publicationRoot = join(packageRoot, "..", "..", "publication");
const dataRoot = join(packageRoot, "layer-data");

const RUBRIC_VERSION = "1.0.0";
const PUBLICATION_VERSION = "reader-evidence-2026-11";

const HUMAN_WORK_LABELS = {
  "source-retrieval": "Finding and reading the missing source",
  "analytical-method-work": "Developing or checking the analytical method",
  "controlled-laboratory-evidence": "Controlled laboratory measurement",
  "pilot-evidence": "Pilot-scale evidence",
  "independent-product-or-intended-use-testing":
    "Independent product or intended-use testing",
  "treatment-acceptance": "Acceptance by the receiving facility or authority",
  "regulatory-review": "Regulatory review",
};

const EVIDENCE_LABELS = {
  "source-supported": "Supported by a located source",
  "source-conflicted": "Sources disagree",
  "source-not-located": "No located source",
  "derived-from-sourced-premises": "Reasoned from located sources",
  "not-applicable": "Not applicable",
};

const VALIDATION_LABELS = {
  "desk-research-only": "Desk research only",
  "requires-human-validation": "Needs human validation",
  "new-unvalidated-hypothesis": "New, unvalidated hypothesis",
  "not-applicable": "Not applicable",
};

const STREAM_TYPE_LABELS = {
  input: "Input",
  product: "Product or intermediate",
  liquid: "Liquid stream",
  reject: "Rejected solid",
  emission: "Emission",
  "treatment-outlet": "Treatment outlet",
  "unexplained-loss": "Unexplained loss",
};

const FATE_LABELS = {
  measured: "Measured",
  inferred: "Described but not measured",
  unresolved: "Unresolved",
  "not-applicable": "Not applicable",
};

async function readJson(name) {
  return JSON.parse(await readFile(join(dataRoot, name), "utf8"));
}

async function readPageSource(fileName) {
  return readFile(join(dataRoot, "pages", fileName), "utf8");
}

async function writeYaml(relativePath, value) {
  const absolute = join(publicationRoot, relativePath);
  await mkdir(dirname(absolute), { recursive: true });
  const text = stringify(value, { lineWidth: 0 });
  await writeFile(absolute, text, "utf8");
  return sha256Of(text);
}

async function writePage(relativePath, text) {
  const absolute = join(publicationRoot, relativePath);
  await mkdir(dirname(absolute), { recursive: true });
  await writeFile(absolute, text, "utf8");
  return sha256Of(text);
}

function sha256Of(text) {
  return createHash("sha256").update(text, "utf8").digest("hex");
}

function base(id, title, auditAliases) {
  return {
    schemaVersion: 1,
    id,
    title,
    publicationState: "approved",
    auditAliases: auditAliases ?? [],
  };
}

const records = [];

function addRecord(kind, relativePath, value) {
  records.push({ id: value.id, kind, path: relativePath, sha256: null });
  return value;
}

async function main() {
  const recordsData = await readJson("records.json");
  const families = [
    ...(await readJson("families-a.json")),
    ...(await readJson("families-b.json")),
  ];

  const expansion = await readJson("evidence-expansion.json");
  const sources = [...recordsData.sources, ...expansion.sources];
  for (const family of families) {
    family.sourceIds.push(...expansion.sources
      .filter((source) => source.methodIds.includes(family.family)).map((source) => source.id));
    family.claims.push(...expansion.claims.filter((claim) => claim.methodIds.includes(family.family)));
  }

  const reviewer = recordsData.reviewer;
  const reviewDate = recordsData.reviewDate;
  const accessDate = recordsData.accessDate;

  const manifestRecords = [];
  const manifestPages = [];
  const hypothesisIds = [];

  // ---- material -------------------------------------------------------
  const material = recordsData.material;
  const materialValue = {
    ...base(material.id, material.title, material.auditAliases),
    kind: "material",
    description: material.description,
    compositionSummary: material.compositionSummary,
    contaminants: material.contaminants,
    termIds: material.termIds,
    jurisdictions: material.jurisdictions,
    tags: material.tags,
    methodFamilyIds: material.methodFamilyIds,
  };
  manifestRecords.push({
    id: materialValue.id,
    path: `records/materials/${materialValue.id}.yaml`,
    sha256: await writeYaml(
      `records/materials/${materialValue.id}.yaml`,
      materialValue,
    ),
  });

  // ---- sources --------------------------------------------------------
  for (const source of sources) {
    const value = {
      ...base(source.id, source.title, source.auditAliases),
      kind: "source",
      citation: source.citation,
      sourceType: source.sourceType,
      publisherOrIssuer: source.publisherOrIssuer,
      versionOrDate: source.versionOrDate,
      originalUrl: source.originalUrl,
      accessDate: source.accessDate ?? accessDate,
      rights: source.rights,
      derivatives: [],
      claimIds: source.claimIds,
      methodIds: source.methodIds,
    };
    manifestRecords.push({
      id: value.id,
      path: `records/sources/${value.id}.yaml`,
      sha256: await writeYaml(`records/sources/${value.id}.yaml`, value),
    });
  }

  // ---- terms ----------------------------------------------------------
  for (const term of recordsData.terms) {
    const value = {
      ...base(term.id, term.title, undefined),
      kind: "term",
      preferredLabel: term.preferredLabel,
      ...(term.acronym ? { acronym: term.acronym } : {}),
      aliases: term.aliases,
      tooltip: term.tooltip,
      explanation: term.explanation,
      methodIds: term.methodIds,
      claimIds: term.claimIds,
      sourceIds: term.sourceIds,
    };
    manifestRecords.push({
      id: value.id,
      path: `records/terms/${value.id}.yaml`,
      sha256: await writeYaml(`records/terms/${value.id}.yaml`, value),
    });
  }

  // ---- hypotheses -----------------------------------------------------
  for (const hypothesis of recordsData.hypotheses ?? []) {
    const value = {
      ...base(hypothesis.id, hypothesis.title, hypothesis.auditAliases ?? []),
      kind: "hypothesis",
      contentKind: "hypothesis",
      visibleLabel: hypothesis.visibleLabel,
      sourceInputIds: hypothesis.sourceInputIds,
      priorContext: hypothesis.priorContext,
      mechanism: hypothesis.mechanism,
      assumptions: hypothesis.assumptions,
      unresolvedDependencies: hypothesis.unresolvedDependencies,
      failureModes: hypothesis.failureModes,
      falsifiers: hypothesis.falsifiers,
      validationQuestionIds: hypothesis.validationQuestionIds,
      evidenceState: hypothesis.evidenceState,
      validationState: hypothesis.validationState,
      reviewer: hypothesis.reviewer,
      recordVersion: hypothesis.recordVersion,
      auditReferences: hypothesis.auditReferences,
    };
    hypothesisIds.push(hypothesis.id);
    manifestRecords.push({
      id: value.id,
      path: `records/hypotheses/${value.id}.yaml`,
      sha256: await writeYaml(`records/hypotheses/${value.id}.yaml`, value),
    });
  }

  // ---- method families, their claims, gaps and assessments -------------
  const sourcesById = new Map(sources.map((source) => [source.id, source]));
  for (const family of families) {
    const claimIds = [];
    const gapIds = [];
    const assessmentIds = [];

    for (const claim of family.claims) {
      const value = {
        ...base(claim.id, claim.title, undefined),
        kind: "claim",
        contentKind: claim.contentKind,
        proposition: claim.proposition,
        evidenceState: claim.evidenceState,
        methodIds: claim.methodIds,
        hypothesisIds: claim.hypothesisIds ?? [],
        ...(claim.sourceId ? { sourceId: claim.sourceId } : {}),
        ...(claim.locator ? { locator: claim.locator } : {}),
        ...(claim.quantitativeBasis
          ? { quantitativeBasis: claim.quantitativeBasis }
          : {}),
        counterevidenceClaimIds: claim.counterevidenceClaimIds ?? [],
        ...(claim.premiseClaimIds
          ? { premiseClaimIds: claim.premiseClaimIds }
          : {}),
        ...(claim.reasoning ? { reasoning: claim.reasoning } : {}),
        reviewer: expansion.claims.includes(claim) ? "AI source comparison; no independent review" : reviewer,
        reviewDate: expansion.claims.includes(claim) ? "2026-11-19" : reviewDate,
      };
      claimIds.push(claim.id);
      manifestRecords.push({
        id: value.id,
        path: `records/claims/${value.id}.yaml`,
        sha256: await writeYaml(`records/claims/${value.id}.yaml`, value),
      });
    }

    for (const gap of family.gaps) {
      // Gap records carry no reviewer or review date: the schema for a gap
      // question does not include them.
      const value = {
        ...base(gap.id, gap.title, undefined),
        kind: "gap",
        contentKind: gap.contentKind,
        question: gap.question,
        gapType: gap.gapType,
        whyItMatters: gap.whyItMatters,
        affectedRecordIds: gap.affectedRecordIds,
        evidenceState:
          gap.contentKind === "ai-gap-closing-note"
            ? // The contract requires an AI gap-closing note to carry the
              // derived-from-sourced-premises state: the note reasons from
              // the located sources named in sourceInputIds.
              "derived-from-sourced-premises"
            : gap.evidenceState,
        validationState: gap.validationState,
        nextHumanWork: gap.nextHumanWork,
        ...(gap.sourceInputIds ? { sourceInputIds: gap.sourceInputIds } : {}),
        ...(gap.assumptions ? { assumptions: gap.assumptions } : {}),
        ...(gap.falsifierOrDecisionCondition
          ? { falsifierOrDecisionCondition: gap.falsifierOrDecisionCondition }
          : {}),
      };
      gapIds.push(gap.id);
      manifestRecords.push({
        id: value.id,
        path: `records/gaps/${value.id}.yaml`,
        sha256: await writeYaml(`records/gaps/${value.id}.yaml`, value),
      });
    }

    for (const assessment of family.assessments) {
      // Assessment records use their own schema, which has no auditAliases
      // field; the alias pointer lives on the method record instead.
      const value = {
        schemaVersion: 1,
        id: assessment.id,
        title: assessment.title,
        publicationState: "approved",
        kind: "assessment",
        methodId: family.family,
        criterionId: assessment.criterionId,
        status: assessment.status,
        rubricVersion: RUBRIC_VERSION,
        supportingClaimIds: assessment.supportingClaimIds ?? [],
        conflictingClaimIds: assessment.conflictingClaimIds ?? [],
        reviewer,
        reviewDate,
        ...(assessment.status === "scored"
          ? {
              score: assessment.score,
              label: assessment.label,
              rationale: assessment.rationale,
              basis: assessment.basis,
            }
          : {}),
        ...(assessment.status === "unknown"
          ? { unknownReason: assessment.unknownReason }
          : {}),
        ...(assessment.status === "not-applicable"
          ? { notApplicableReason: assessment.notApplicableReason }
          : {}),
      };
      assessmentIds.push(assessment.id);
      manifestRecords.push({
        id: value.id,
        path: `records/assessments/${value.id}.yaml`,
        sha256: await writeYaml(`records/assessments/${value.id}.yaml`, value),
      });
    }

    const methodValue = {
      ...base(family.family, family.title, family.auditAliases),
      kind: "method-family",
      family: family.family,
      summary: family.summary,
      mechanism: family.mechanism,
      feedstock: family.feedstock,
      preparation: family.preparation,
      steps: family.steps,
      inputs: family.inputs,
      streams: family.streams,
      products: family.products,
      sinks: family.sinks,
      claimIds,
      gapIds,
      termIds: family.termIds,
      sourceIds: family.sourceIds,
      hypothesisIds,
      assessmentIds,
      organizations: family.organizations,
      auditReferences: family.auditReferences,
    };
    manifestRecords.push({
      id: methodValue.id,
      path: `records/methods/${methodValue.id}.yaml`,
      sha256: await writeYaml(`records/methods/${methodValue.id}.yaml`, methodValue),
    });

    // ---- reader narrative page ---------------------------------------
    const pageId = `method-${family.family}`;
    const pagePath = `pages/${pageId}.md`;
    const sha = await writePage(pagePath, renderFamilyPage(family, sourcesById, expansion.claims));
    manifestPages.push({ id: pageId, path: pagePath, sha256: sha });
  }

  // ---- authored narrative pages -------------------------------------
  // These sit beside the generated family pages. Their markdown lives in
  // layer-data/pages/ and pages.json declares the id, file and reader route
  // for each one, so the manifest stays reproducible from the generator
  // rather than hand-edited.
  const pageIndex = await readJson("pages.json");
  for (const page of pageIndex.pages ?? []) {
    if (page.file !== `${page.id}.md`) {
      throw new Error(
        `NARRATIVE_PAGE_FILE_MISMATCH: page ${page.id} declares file ${page.file}`,
      );
    }
    const pagePath = `pages/${page.id}.md`;
    const text = await readPageSource(page.file);
    const sha = await writePage(pagePath, text);
    manifestPages.push({ id: page.id, path: pagePath, sha256: sha });
  }

  const manifest = {
    schemaVersion: 1,
    publicationVersion: PUBLICATION_VERSION,
    records: manifestRecords.sort((a, b) => a.id.localeCompare(b.id)),
    pages: manifestPages.sort((a, b) => a.id.localeCompare(b.id)),
    assets: [],
  };
  await writeYaml("manifest.yaml", manifest);

  console.log(
    `records=${manifestRecords.length} pages=${manifestPages.length} ` +
      `reviewer=${reviewer}`,
  );
}

function renderFamilyPage(family, sourcesById, newFindings) {
  const lines = [];
  lines.push(`# ${family.title}`);
  lines.push("");
  lines.push(
    "This page describes one recycling method family for cigarette butts. It is " +
      "desk research: the evidence was read from published sources and company " +
      "material, and no measurement was made for this project. Where evidence " +
      "is missing, that is stated rather than estimated.",
  );
  lines.push("");
  lines.push("## In one minute");
  lines.push("");
  lines.push(family.summary);
  lines.push("");
  lines.push("## How it works, and what it starts from");
  lines.push("");
  lines.push(family.mechanism);
  lines.push("");
  lines.push(`**Starting material.** ${family.feedstock}`);
  lines.push("");
  lines.push(`**Preparation.** ${family.preparation}`);
  lines.push("");
  if (family.variants.length > 1) {
    lines.push("**Variants in this family.**");
    lines.push("");
    for (const variant of family.variants) {
      lines.push(`- ${variant}`);
    }
    lines.push("");
  }
  lines.push("## The steps");
  lines.push("");
  family.steps.forEach((step, index) => {
    lines.push(`${index + 1}. **${step.label}.** ${step.description}`);
  });
  lines.push("");
  const scoped = newFindings.filter((finding) => finding.methodIds.includes(family.family));
  if (scoped.length > 0) {
    lines.push("## Findings from individual routes", "");
    lines.push("These results describe the specific routes or samples reported. They do not change the scope of the family scorecard. See the [worked examples](/methods/examples/) for comparisons and AI hypotheses.", "");
    for (const finding of scoped) {
      const source = sourcesById.get(finding.sourceId);
      lines.push(`- **${finding.title}.** ${finding.proposition} [${source.title}](/sources/${source.id}/) (${finding.locator}).`);
    }
    lines.push("");
  }
  lines.push("## Where the material and the contamination go");
  lines.push("");
  lines.push("| Stream | Kind | What it carries | What is known about it |");
  lines.push("| --- | --- | --- | --- |");
  for (const stream of family.streams) {
    lines.push(
      `| ${stream.label} | ${STREAM_TYPE_LABELS[stream.type]} | ` +
        `${stream.contaminants.join(", ")} | ${FATE_LABELS[stream.fateState]} |`,
    );
  }
  lines.push("");
  lines.push("## The product, and where it is supposed to end up");
  lines.push("");
  for (const product of family.products) {
    lines.push(
      `**${product.label}.** ${product.description} *Intended use:* ${product.intendedUse}`,
    );
  }
  lines.push("");
  for (const sink of family.sinks) {
    lines.push(
      `**Material.** ${sink.material} **Intended use.** ${sink.intendedUse} ` +
        `**Acceptance basis.** ${sink.acceptanceBasis} **Issuer.** ${sink.issuer} ` +
        `**Final route.** ${sink.finalRoute}`,
    );
  }
  lines.push("");
  lines.push("## How the evidence compares");
  lines.push("");
  lines.push(
    "Each criterion is scored separately against its own rubric. A score of 1 " +
      "means a completed assessment placed this family in the lowest band; it " +
      "does not mean the question was left unanswered. Unknown means the " +
      "evidence needed to answer the criterion was not found. The criteria are " +
      "not averaged and no overall ranking is given.",
  );
  lines.push("");
  lines.push("| Criterion | Result | Basis | Why |");
  lines.push("| --- | --- | --- | --- |");
  for (const assessment of family.assessments) {
    const result =
      assessment.status === "scored"
        ? `${assessment.score} (${assessment.label})`
        : assessment.status === "unknown"
          ? "Unknown"
          : "Not applicable";
    const basis =
      assessment.status === "scored"
        ? EVIDENCE_LABELS[assessment.basis] ?? assessment.basis
        : "Not enough evidence";
    const why =
      assessment.status === "scored"
        ? assessment.rationale
        : assessment.unknownReason ?? assessment.notApplicableReason ?? "";
    lines.push(
      `| ${assessment.criterionId} | ${result} | ${basis} | ${why} |`,
    );
  }
  lines.push("");
  lines.push("## What is missing, and what is still unknown");
  lines.push("");
  for (const gap of family.gaps) {
    lines.push(`- **${gap.question}** ${gap.whyItMatters}`);
  }
  lines.push("");
  lines.push("## The human work that would close these gaps");
  lines.push("");
  lines.push("| Question | Kind of work needed | Validation state |");
  lines.push("| --- | --- | --- |");
  for (const gap of family.gaps) {
    lines.push(
      `| ${gap.question} | ${HUMAN_WORK_LABELS[gap.nextHumanWork] ?? gap.nextHumanWork} | ` +
        `${VALIDATION_LABELS[gap.validationState] ?? gap.validationState} |`,
    );
  }
  lines.push("");
  lines.push("## Notes written by the research assistant");
  lines.push("");
  lines.push(
    "These notes are additions from the research assistant, not source " +
      "material. Each one states what is missing and what would settle it.",
  );
  lines.push("");
  for (const note of family.gapNotes) {
    lines.push(
      `> **[GAP-CLOSING NOTE — AI, scientist-inventor role]** ${note}`,
    );
    lines.push("");
  }
  lines.push("## Sources");
  lines.push("");
  for (const sourceId of family.sourceIds ?? []) {
    const source = sourcesById.get(sourceId);
    if (source === undefined) {
      continue;
    }
    lines.push(
      `- **${source.title}** — ${source.citation} ` +
        `(${source.publisherOrIssuer}, ${source.versionOrDate}). ` +
        `[Open the source](${source.originalUrl})`,
    );
  }
  lines.push("");
  lines.push("## The four fields a sink needs");
  lines.push("");
  lines.push(
    "A recovered material is only a product when four things are located: a " +
      "dry-mass balance, an analyte-resolved fate for the contaminants, a " +
      "named final route with an acceptance basis, and a product gate that " +
      "does not depend on the balance closing.",
  );
  lines.push("");
  lines.push(`- **Dry-mass balance.** ${family.fourField.dryMassBalance}`);
  lines.push(`- **Contaminant fate.** ${family.fourField.analyteFate}`);
  lines.push(`- **Treatment route.** ${family.fourField.treatmentRoute}`);
  lines.push(`- **Product gate.** ${family.fourField.productGate}`);
  lines.push("");
  lines.push("## Audit trail");
  lines.push("");
  lines.push(
    "Internal record names and versions, for anyone checking this page against " +
      "the project's own records.",
  );
  lines.push("");
  lines.push(`- Record id: \`${family.family}\``);
  lines.push(
    `- Internal names: ${family.auditAliases.map((alias) => `\`${alias}\``).join(", ")}`,
  );
  for (const reference of family.auditReferences) {
    lines.push(
      `- ${reference.label} — version ${reference.version} — [public record](${reference.url})`,
    );
  }
  lines.push("");
  lines.push(
    "This page was produced by desk research. It does not " +
      "assert that the method is safe, clean, commercial, novel or approved, " +
      "and it does not authorise any experiment.",
  );
  lines.push("");
  return lines.join("\n");
}

await main();
