# Findings: Butt-Lab Product And Workflow Design

## 2026-11-15 Whole-Implementation Review

- Review baseline: current `HEAD` (`d30adba`) plus the complete uncommitted/untracked working tree in `C:\w\bpc`.
- The feature worktree contains one tracked edit (`.gitignore`) and untracked `publication/` and `tools/publication-contract/` trees. It also contains generated `tools/publication-contract/export-output/` files and `TASK_8_TODO.md`, which require disposition before integration.
- Task-9 documentation is split across checkouts: `publication/README.md` is in `C:\w\bpc`, but `docs/publication-content-contract.md` and the `PROJECT-OVERVIEW.md` publication-layer edit exist only in the main checkout. The main checkout also has extensive unrelated user modifications, so no automatic move, cleanup, or overwrite is safe.
- `docs/agents/issue-tracker.md` is absent. The review will use the approved design and Phase-1 implementation plan as the specification sources.
- Codebase Memory project `bpc` is ready at `d30adba`, but `tools/` is excluded by design from indexing. Scoped architecture, hotspot, and impact queries therefore return no implementation symbols. Direct source/test review is required for `tools/publication-contract/`; this limitation prevents graph-backed completeness claims.
- The approved design makes the post-contract sequence mandatory: first complete and review all six method-family units; only then generate and critique the separate invention; Phase 3 reader-app work cannot begin until the operator approves both (`reader-platform-design.md:661-676`).
- The active repository state still says Batch 02 is only separately plannable and is not authorized by the Batch-01 acceptance (`state/workflow.yaml:8-24`). Completing the Phase-1 contract does not itself authorize Batch-02 content work, experiments, deployment, or publication.
- Therefore immediate next work is review/integration hygiene and an explicit operator decision. Phase-2 scientific content work is a later, separately authorized step, not an automatic continuation.
- Standards-axis review found a hard checkpointing gap (`state/workflow.yaml` plus session log were not updated), a broken documentation link caused by checkout-split Task-9 files, redundant generated `export-output/`, obsolete `TASK_8_TODO.md`, and three non-blocking design smells (duplicated sorting, oversized semantic validator, unused `assetHashes`).
- Specification-axis review found four release blockers verified against the source: `export.ts` imports but never calls `validatePublicationSemantics`; replacement deletes current output and moves files one-by-one without backup/restore; `validate` silently skips semantics when rubrics are missing or invalid; and the exporter omits image extensions that manifest validation explicitly permits.
- Additional specification findings: several expected export-policy failures throw plain `Error` and bypass structured diagnostics; Task-9 documentation is absent from the feature worktree; and generated/scratch artifacts are outside the requested file set.
- Passing tests do not clear these findings because the failed-export test induces failure before replacement, no test injects a mid-replacement failure, export tests use semantically valid fixtures, and no export test covers an allowed image asset.
- Phase 1 is not integration-ready. Recommended order is: fix the four release blockers test-first; normalize expected diagnostics; restore Task-9 docs to `C:\w\bpc`; clean/ignore scratch outputs; checkpoint workflow/session provenance; rerun all package, determinism, boundary, and legacy-registry checks; then request explicit integration approval.
- Phase-10 root-cause confirmation: `loadAndValidateManifest()` performs manifest/schema/path/content checks but not cross-record semantic validation. `export.ts` contained comments claiming otherwise. A focused regression proved semantically invalid content was exported; the minimal pre-stage semantic gate now passes that regression and the existing exporter suite.


## User Vision

- An internal website that explains recycling methods in readable language, organized by categories and tags.
- Each method should expose its original source PDF and clearly show where AI filled an omitted or unclear gap.
- Terms and acronyms should have inline tooltips and a fuller glossary page.
- AI-generated gap closures and new inventions should be visible but distinguished from sourced methods.
- Quartz colors and article graph linking are attractive, but the product likely needs more structure and interaction than a plain Quartz knowledge garden.
- The cigarette-butt workflow should become a reusable automated or semi-automated system for other recyclable materials.
- Current internal names such as `J-H-01` and the workflow structure are difficult for a non-specialist to follow.

## Initial Repository Observations

- Latest visible commit is `d30adba` (`add text files version`).
- Commit `3493450` added `PROJECT-OVERVIEW.md` as an orientation document.
- Later history indicates batch 01 was accepted/closed and batch 02 was planned with all six method families, readable method explanations, inline gap-closing, prior-art-aware invention, global scope plus an Egypt annex, and product form left open.
- Recent commits added OCR/text versions of source documents.
- No codebase-memory project is indexed; this task currently concerns Markdown, YAML, and content architecture rather than structural code tracing.

## Interpretation To Test

The likely redesign is not just a website. It is a three-layer system:

1. A provenance-preserving research pipeline.
2. A normalized knowledge model for methods, evidence, gaps, hypotheses, inventions, terms, and material streams.
3. A reader-facing public static application that renders the knowledge model in plain language while retaining drill-down access to evidence and technical detail.

This interpretation remains provisional until the current overview and state are read.

## Current System: First-Pass Map

- `PROJECT-OVERVIEW.md` confirms butt-lab is a desk-only evidence review of cigarette-butt recycling, not an experimental program or deployed application.
- Batch 01 is complete and operator-accepted as a desk investigation. Its five stages were: source harvesting, source reconstruction, adversarial review, hypothesis generation, and synthesis.
- Stage/slot identifiers such as `F3`, `B-P-01`, and `J-H-01` are internal traceability IDs. They are useful for audit trails but unsuitable as the main reader-facing names.
- `J-H-01` is an unvalidated judge-created hybrid hypothesis, not a process that the project proved or adopted.
- The project already enforces a crucial content distinction: source-derived material and AI gap-closing material must remain visibly different.
- The four-field sink rule asks every proposed output or waste stream to name the material, intended use, acceptance basis, and accepting issuer.
- Heavy metals remain an explicit stop condition because an existing Italian End-of-Waste gate does not test them.
- Batch 02 is planned but not launched. It is intended to produce six readable method-family explanations, inline labelled AI gap-closing notes, then a separate AI invention informed by prior art.
- The repository contains no apparent Quartz or website implementation directory. The existing post-project artifact is `post-project/dashboard-spec.md`, which still needs review.
- `state/workflow.yaml` remains a detailed machine/audit record for batch 01. It is not a suitable content database or human navigation layer for the future website.

## Emerging Product Problem

The current repository combines several audiences in one file tree:

1. AI/operator workflow control.
2. Scientific evidence and source reconstructions.
3. Panel deliberation and internal audit trails.
4. Final conclusions and hypotheses.

The future product should not expose that internal hierarchy directly. It should translate it into reader concepts while retaining links back to the exact evidence and audit records.

## Detailed System Assessment

- `specs/batch-02-launch-plan.md` already defines the best near-term content pilot: six method-family explanations, visibly labelled AI gap-closing notes, a separate unvalidated invention, and an Egypt annex.
- `post-project/dashboard-spec.md` correctly treats canonical Markdown/YAML as the source of truth and the website as an allowlisted generated presentation layer. It also warns that stock Quartz may not support the needed filters, evidence badges, source views, and structured metadata without substantial customization.
- `reports/final/batch-01-synthesis.md` and `reports/final/validation-and-open-questions.md` contain the scientific semantics the future product must preserve: evidence status, unresolved parameters, dissent, falsifiers, material/analyte fate, intended-use gates, and the difference between process identity, product quality, and contaminant removal.
- `OPERATOR_GUIDE.md` confirms the present system was designed for resumable AI research and human gates, not for ordinary readers or autonomous execution.
- The current workflow is scientifically cautious and auditable, but its repository hierarchy and identifiers are implementation details rather than a usable information architecture.

## Provisional Three-Layer Design

1. **Research pipeline:** discover sources, ingest/OCR, extract claims, reconstruct methods, identify gaps, add labelled AI analysis, critique, generate inventions, and require human approval.
2. **Normalized knowledge model:** materials, method families and variants, organizations, sources and derivatives, process steps, streams, contaminants, products, claims, gaps, AI notes, hypotheses, glossary terms, jurisdictions, validation questions, and provenance.
3. **Reader application/export:** plain-language pages, evidence badges, inline glossary help, tags and filters, comparisons, source/PDF access, optional relationship graph, audit drill-down, unresolved questions, and visually separate invention pages.

Reader-facing names should lead; provenance IDs should remain available as secondary audit metadata. For example, show “Measured-purge washing hypothesis” as the title and `J-H-01` as an audit identifier.

## Source Document Strategy

- Keep each original PDF as the canonical source artifact.
- Treat OCR or PDF-to-Markdown as a derived AI/search representation, never a replacement for the PDF.
- Preserve page or section anchors, conversion method, file hash/version, OCR quality, and known table/figure/layout limitations.
- Link reader claims to the original source location whenever possible, while letting the AI use the text derivative for retrieval and analysis.

## Selected Architecture Approach

The user selected the progressive structured hybrid:

- Human-readable approved narratives remain Markdown.
- Important entities and relationships use a small normalized structured model.
- An explicit allowlist/exporter validates and generates the public static reader app.
- Quartz is a visual and interaction reference, not the canonical data model or mandatory site engine.
- A full database-backed moderation and live-AI platform is deferred until the batch-02 pilot validates the model.

## Visual Companion

The user accepted the optional browser-based visual companion. Use it selectively for architecture diagrams, information-architecture maps, and layout comparisons; keep scope and technical decisions in the text conversation.

The user approved the proposed three-part system boundary: private research workspace, human-approved knowledge layer, and generated public reader site with a correction loop back through review.

## Confirmed Product Direction

- The first design will cover a reusable, material-independent foundation and use batch 02 as the first concrete cigarette-butt reader-site pilot.
- The plan should therefore avoid both extremes: it should not hard-code a one-off butt-recycling website, and it should not attempt to implement the entire future automated platform before validating the content and reader model.
- AI research, source-gap analysis, and invention generation will run in a reviewed repository pipeline. The first website is a read-only publication surface and displays only human-approved outputs.
- An authenticated web moderation queue and live reader-triggered AI are deferred. The content model should leave room for them, but the MVP must not depend on them.
- The primary pilot reader is a curious non-specialist. Pages should use progressive disclosure: readable explanations and familiar names first, then optional technical evidence, unresolved gaps, source locators, and audit identifiers.
- The user later replaced the initial friends-only/shared-password boundary with public deployment and no authentication. Every exported file and permitted PDF must therefore be safe for public access.
- The pilot will be English-first, using the existing research corpus. The knowledge model and interface boundaries should support later localization, including Arabic and right-to-left layout, without requiring bilingual publication in the MVP.
- Source views should provide both the original external URL/citation and an approved local PDF copy when rights and publication review permit it.
- The export must fail closed for local PDFs whose redistribution status is unresolved. A text/OCR derivative may support internal AI retrieval but does not establish permission to publish the PDF.
- The primary reader outcome is understanding the recycling-method landscape and its evidence: what the approaches are, how they work, what supports them, and what remains unknown.
- The site uses separate criterion ratings with visible rubrics and evidence basis, but no default aggregate “best method” ranking. The new invention is important but secondary to landscape comprehension and must remain visibly separated as an unvalidated hypothesis.
- The first reader-facing content scope is batch 02: six method families, glossary, source library, Egypt annex, and a separate invention. Batch-01 company dossiers, panel reports, and stage records remain linked audit evidence rather than equal top-level sections.

## Chisle Constraint

- The user asked that work use `JayPokale/Chisle`.
- Chisle v3.12 is an AI-agent efficiency layer, not a website framework. For OpenCode v2 it can install a global ruleset, skills, and a tool-output compression plugin.
- Chisle is not installed in the current OpenCode config. This repository prohibits unapproved installs, so the design session will apply its principles without changing the global environment: terse output, YAGNI-first scope, reuse before addition, and minimal code that preserves security, accessibility, correctness, and evidence safeguards.
- A global Chisle installation is a separate environment change, not part of this product architecture.

## Approved Content Model

- The user approved the minimum reusable model rather than expanding into a graph database or CMS.
- Approved Markdown provides the reader narrative. Small linked records represent methods, sources and claims, material fate, gaps, AI notes, hypotheses, falsifiers, and validation questions.
- Reader-facing titles lead; internal IDs remain in a secondary audit view.
- Generated comparison, source, glossary, open-question, and relationship views reuse those records rather than duplicating facts.
- The model uses separate content-kind, evidence-state, publication-state, and validation-state enums. These are not collapsed into one score.

## Approved Reader Experience

- Primary navigation is `Start here`, `Methods`, `Compare evidence`, `Sources`, and `Glossary`.
- The separate invention, Egypt annex, and research-method/audit explanation are secondary destinations rather than competing with the six method families.
- A method page uses progressive disclosure: one-minute explanation, mechanism, material streams, failure points, evidence profile, visible AI gap-closing notes, sources, then a technical audit drawer.
- Evidence is compared by type and unresolved gap, never reduced to a fake total score or simplistic winner ranking.
- Acronyms and technical terms use keyboard-accessible tooltips linked to full glossary entries. Color is never the only status cue, and the layout must remain mobile-readable and later RTL-safe.

## Approved Publishing Pipeline

- Each source is registered with its original URL, citation/version, file hash when held locally, access date, and rights state.
- OCR/Markdown is a searchable derivative with page anchors, extraction method, and quality warnings. It never replaces the source document as canonical evidence.
- Claims require exact source locators or an explicit unresolved state. Source conflicts and nondisclosure remain visible rather than being averaged away.
- AI gap-closing notes and hypotheses retain their own labels, assumptions, source inputs, and falsifiers. They cannot render as source-supported content.
- Publication requires evidence, scientific, AI-boundary, rights, reader-quality, and explicit human-operator gates.
- The export fails closed for unauthorized local PDFs, missing required locators, forbidden raw-repository paths, or mixed evidence labels. Automation can report issues but cannot grant scientific or publication approval.

## Technical Architecture Revision

- The user approved the technical architecture except for the shared-password requirement and asked to remove the password for now.
- This changes the earlier access decision. A deployed static site without an authentication layer is publicly reachable, including every asset placed in its build bundle, even if the URL is distributed only to friends.
- The user selected public deployment. GitHub Pages is viable again because there is no authentication requirement.
- The access adapter is removed. The pilot has three modules: approved content, validator/exporter, and static reader app.
- Every generated page, index, relationship file, and locally hosted PDF is public. The explicit export allowlist and rights checks are therefore release-blocking controls, not optional hygiene.
- Historical research/workflow files remain outside the site bundle unless individually approved and linked as audit evidence.

## Comparison And Scoring Revision

- The user wants methods sortable by multiple practical criteria, including a score, ease, missing evidence, and the human experiments or validation still required.
- The prior non-goal was too broad. The correct guardrail is: no opaque universal “best method” verdict.
- A sound comparison must keep measured performance, evidence completeness, inferred ease/complexity, unresolved gaps, and required human validation as separate dimensions.
- Unknown or unmeasured must remain `unknown`, not be converted to zero or silently penalized as poor performance.
- Every rating must expose its rubric, evidence basis, assessor/provenance, and last-reviewed version. Any composite score must reveal its weighting and purpose.
- The user selected separate criterion scores as the leading model. The MVP will not compute a default aggregate.
- A criterion rating is nullable and ordinal. `Unknown` is a first-class state and sorts last by default; it is not zero.
- A method's apparent promise and the strength of evidence supporting that assessment are displayed separately.

## Written Design Specification

- The complete approved design is written at `docs/superpowers/specs/2026-11-13-butt-lab-reader-platform-design.md`.
- A fresh-reader review identified and resolved ambiguous family/variant granularity, nullable-score semantics, all eight criterion rubrics, derivative-publication rights, canonical ownership, allowlist closure, public-safe audit references, and manual deployment approval.
- The implementation is split into separately gated plans. The next plan covers only Phase 1: schemas, publication manifest, validator/exporter, rights handling, score rubrics, and representative fixtures.
- The user confirmed that the invention must precede reader-app work. The approved mandatory sequence is content contract -> six method-family reviews -> separate invention and critique -> operator approval -> reader app. The invention must be informed by the completed method landscape rather than generated first.

## Future Research Automation

- The user wants a later provider-neutral automated workflow that can accept a recyclable-material brief and carry research through source gathering, claims, method synthesis, gap analysis, invention drafting, and an independent AI proposal/review stage.
- Arena.ai may be one execution adapter, but the workflow contracts must not depend on one provider.
- Full automation may produce a complete review-ready draft package, but automatic publication is prohibited in every case.
- A human operator must explicitly approve every publication version. Agents may propose structured corrections and enhancements but cannot overwrite canonical evidence, erase dissent, or grant scientific/publication approval.

## Phase-1 Planning Baseline

- The user approved the written design and its later sequencing and no-auto-publication amendments.
- Phase 1 is limited to the content contract, schemas, rights and assessment rules, publication manifest, deterministic validator/exporter, fixtures, and tests.
- The repository has no existing Node package, TypeScript configuration, or JavaScript test runner. Node `v24.11.1` and npm `11.14.1` are available locally.
- Existing Python registry validation is a separate legacy responsibility and remains unchanged. The new publication contract should live in a small isolated TypeScript module.
- Later method content, invention generation, Astro/Pagefind UI, GitHub Actions, and deployment are explicitly outside this implementation plan.

## Phase-1 Implementation Plan

- The completed plan is `docs/superpowers/plans/2026-11-14-publication-content-contract.md`.
- It contains ten test-first tasks and 69 tracked steps covering the isolated TypeScript package, schemas, all eight rubrics, rights and path policy, explicit manifest closure, semantic validation, deterministic staged export, CLI diagnostics, documentation, and the acceptance gate.
- The live publication manifest remains empty and default-deny at Phase-1 completion. Fixtures are generated only in temporary test directories and cannot become pilot content accidentally.
- The plan resolves nested Zod-union composition, requires provenance for AI gap-closing notes, uses inline process entities where no standalone record type exists, and excludes `bundle-manifest.json` from its own hash set.
- Verification passed for task structure, code-fence balance, placeholder/prohibited-text scan, trailing whitespace, required design-contract coverage, and Git whitespace checks.
- Plan SHA-256: `50de9fd5a3e9e5116b7b9bc4f9d13f4afa034338a0a0d4f94a7d0c7fb8e41669`.
- No implementation, dependency installation, scientific-content approval, publication, or commit occurred during planning.

## Phase-1 Execution Baseline

- Execution mode is Subagent-Driven Development: one fresh implementer per task, followed by specification-compliance review and code-quality review before advancing.
- The isolated worktree is `C:\w\bpc` on `feat/publication-content-contract`; the design, plan, and planning records remain untracked in the main checkout and are not silently committed.
- Repository-local `core.longpaths=true` is required because the historical evidence library contains filenames that fail checkout under a longer Windows worktree path.
- The legacy validation baseline is the file's direct runner, `python tests/test_validate_registry.py`: 23 tests completed successfully. `unittest` discovery is not representative and `pytest` is not installed.
- The user approved the exact package-local Task-1 dependencies (`zod@4`, `yaml@2`, `typescript@5`, and `@types/node@24`). This does not authorize commits, merges, deployment, publication, or any experiment.

## Task 1 Implementation Checkpoint

- The isolated package now exists only in `C:\w\bpc\tools\publication-contract`; no root Node package was introduced.
- Exact resolved versions are `zod 4.6.7`, `yaml 2.9.1`, `typescript 5.9.3`, and `@types/node 24.19.2`; npm reported zero vulnerabilities at installation time.
- The CLI currently exposes stable help and unknown-command behavior. Later command bodies remain deliberately unimplemented until their planned tasks.
- The required script key is `test:coverage`, not `coverage`; this was corrected during the independent code-quality review loop.
- Fresh verification passed: CLI 2/2, TypeScript typecheck, legacy Python 23/23, and Git whitespace check. Task 1 is complete without any commit or publication.

## Task 2 Implementation Checkpoint

- The contract now exports exact, closed vocabularies for content, evidence, publication, validation, method families, source rights, derivative rights, and required human-work categories.
- Version-1 strict schemas cover the approved material, method-family, source, claim/inference, gap/AI-note, hypothesis, term, and publication-manifest shapes. The outer record contract remains a plain Zod union so Task 3 can append assessment branches without a nested discriminator conflict.
- Manifest paths reject absolute, drive-prefixed, backslash, dot/dotdot, doubled-separator, and trailing-separator forms. HTTP fields retain both URI validity and HTTP/HTTPS protocol constraints in runtime and generated schemas.
- JSON Schema generation uses input semantics, so runtime defaults such as `auditAliases: []` remain optional to authors. Automated CLI tests verify exact files, bytes, final newlines, overwrite behavior, and deterministic regeneration.
- Fresh verification passed: contract 8/8, CLI 3/3, typecheck, unchanged repeated schema hashes, legacy Python 23/23, and Git whitespace check. Both specification and code-quality reviewers approved Task 2.

## Task 3 Implementation Checkpoint

- The versioned rubric catalog contains exactly the eight approved criteria, with five ordered bands and criterion-specific unknown rules.
- Assessment records are a strict status-discriminated union: scored assessments carry a 1-5 score, label, rationale, and basis; unknown and not-applicable assessments carry reasons but no numeric score or basis.
- `ContentRecordSchema` remains a plain outer Zod union and now includes assessment as its final member, avoiding a nested-discriminator composition error.
- Schema generation now emits exactly three deterministic artifacts: content record, publication manifest, and rubric catalog. The prior schemas remain covered by regression tests.
- Fresh verification passed: 18/18 package tests, typecheck, legacy Python 23/23, exact three-schema closure, and Git whitespace check. Specification and code-quality reviewers approved Task 3.
- No scientific method was scored and no Batch-02 content, comparison UI, aggregate score, winner selection, commit, or publication was introduced.

## Task 4 Implementation Checkpoint

- Publication loading now emits stable structured diagnostics for YAML parser/conversion failures and rejects duplicate, alias-derived, collection-valued, and other non-string mapping keys before conversion.
- Markdown policy rejects raw HTML and unsafe URL schemes even when hidden with HTML character references or CommonMark backslash escapes, while ordinary comparisons and HTTP(S) autolinks remain allowed.
- Canonical JSON directly serializes lexicographically ordered object keys, preserves array order, ends with one newline, and rejects undefined, non-finite, unsupported, cyclic, or non-plain values.
- Path policy rejects non-normalized/traversing paths, enforces realpath containment and exact record namespaces, and requires explicit HTTP(S) authority.
- Fresh verification passed: policy 29/29 with one permitted Windows symlink skip, full package 47/47 with the same skip, typecheck, legacy Python 23/23, and Git whitespace checks. Specification and code-quality reviewers approved Task 4.
- No manifest closure, semantic validation, export, commit, merge, deployment, publication, or experiment was introduced.

## Task 5 Active Blocker

- Manifest closure itself is implemented as an explicit non-transitive allowlist: each listed file is captured once, hashed and parsed from the same bytes, and asset results are immutable snapshots rather than reopenable paths.
- Canonical duplicate/case aliases and active web asset types are rejected; the live manifest remains empty and validates as `VALID records=0 pages=0 assets=0`.
- The Task-5 specification review is approved, but final code-quality review remains open.
- Repeated regex-based Markdown fixes revealed an architectural defect: CommonMark block containers, multiline references, fence validity, and literal/code contexts cannot be represented reliably by the current scanner without alternating bypasses and false positives.
- The smallest durable correction is a package-local Markdown parser used only to inspect parsed links and raw-HTML tokens. This requires explicit dependency-install approval before work can continue.
- The user declined that dependency and selected “Stop Task 5.” The implementation therefore remains intentionally incomplete at the final Task-5 quality gate.
- The user subsequently directed that Task 5 be left as-is and work continue from Task 6. The Task-5 Markdown gap is a known, accepted residual risk carried into later tasks, not a silently repaired defect.
- No Task-6 scientific semantics, Task-7 export, commit, merge, deployment, publication, or experiment has occurred.

## Task 6 Implementation Checkpoint

- Relationship extraction uses an explicit per-kind field map, so inline identifiers such as method inputs, streams, products, sinks, steps, organizations, contaminant labels, tags, source derivatives, and audit references never become graph edges. Relationships sort by fromId, field, toId; backlinks sort by targetId, sourceId, field.
- Semantic validation is a pure function over the loaded publication and the active rubric catalog: no filesystem access, no throwing, no mutation of records. Errors and warnings share one diagnostics list and never change record state.
- The deterministic fixture in `tests/helpers.ts` carries nine structure-only records and one page. It exercises the contract, not the science, and is never added to the live manifest, which stays empty and default-deny.
- Controller verification passed: focused semantic 35/35, full package 108 passed with the one pre-existing Windows symlink skip, typecheck clean, legacy Python 23/23, diff check exit 0, live validate exactly `VALID records=0 pages=0 assets=0`.
- The specification review found one blocking defect: the quantitative-basis rule exempted any number with six or more digits, so large magnitudes escaped the rule while the plan exempts only source identifiers and years. It also over-flagged labelled references such as "Figure 2" and "Section 3". Both are being corrected test-first.
- No Task-7 export, Task-8 CLI work, commit, merge, deployment, publication, or experiment has occurred.

## Task 6 Review Gate Status

- The specification-compliance review is APPROVED. The code-quality review is CHANGES_REQUIRED with six Important findings, all fail-open.
- Three of the six share one root cause: identifier, year, and reference-label exemptions were applied to token shapes without ever asking whether the number was a quantity. The chosen correction is architectural rather than per-shape: detect a unit-bearing quantity first, treat it as a magnitude unconditionally, and let exemptions apply only to numbers with no unit following them.
- The remaining findings are a relationship-kind gap (targets were checked for existence but not kind), a coverage gap (twelve fail-closed branches could be deleted with no test changing), a contract gap ("never throws" was not upheld for schema-invalid input), and a stale allowlist (the repository-local path list did not match the repository's real top-level directories).
- Session context was compressed against the retrieval ceiling; the root planning files remain the durable checkpoint.

## Batch-02 desk cycle findings (2026-11-16)

### Method-family evidence shape (from the accepted batch-01 record, re-used not re-derived)
- Seven families were explained: staged washing (batch-01 F0), mechanical/physical (MéGo! FR3066128A1 / Re-Cig), thermal (Keenat dry treatment and extrusion composite), chemical (CN / CNR / Cerdia solvent dissolution), biological, material incorporation, and product routes.
- Across every family the same evidence gaps recur: no dry-mass basis, no analyte-resolved contaminant fate, no leaching data, and no use-specific performance evidence. This is the reason the batch-01 operator acceptance refused any clean, detoxified, safe, commercially validated, or environmentally superior claim.
- Cost and energy signals are company-reported or absent; no independent life-cycle assessment of a commercial butt-recycling process exists in the public record.

### Sink accounting
- All families fail at least one of the four required sink fields (inlet mass closure, analyte-resolved fate, product quality demonstration, and a defined final treatment route with an acceptance basis). The invention sketch therefore starts from a measurement plan, not a process claim.
- The metals stop-condition remains in force: a stream with uncharacterized heavy-metal content cannot be routed to a product or to unclassified waste.

### Process notes worth keeping
- Batch-02 used a single-AI execution model (no panel, no judge packet) as the operator's launch plan specified. That removes the independent-review and dissent machinery the batch-01 panels provided, so the guardrails in the documents carry the entire epistemic load. Any later reuse should record this asymmetry explicitly.
- The gap-closing note convention proved workable: each note names the missing evidence and its owner, which keeps an explanation honest without stopping the reader flow.
- Egypt material is described observationally only; no recommendation was drawn from it because none of the underlying method evidence reaches the required standard.

### Scope boundary (unchanged)
- Desk research only. No experiment, pilot, reader application, publication, merge, deployment, or push is authorized by this cycle. The nine `reports/batch-02/` deliverables await the operator's accept/reject desk-record decision.

## 2026-11-16 — Batch-02 findings recorded durably; handoff brief for the evidence-gap work

- The operator asked that the batch-02 findings be recorded and the current-state files updated, because the files will be uploaded to another AI to start work on the evidence gaps.
- The finding recorded: across all seven method families the same evidence gaps recur — no dry-mass basis, no analyte-resolved contaminant fate, no leaching data, and no use-specific performance evidence. Every family fails at least one of the four required sink fields, so the invention sketch starts from a measurement plan rather than a process claim. The metals stop-condition remains in force.
- Deliverable added: `reports/batch-02/HANDOFF-BRIEF.md` (a cold-readable brief carrying the authority chain, the accepted batch-01 evidence base, the nine batch-02 deliverables, the central finding, the four-field sink requirement, the numbered M/R/S gap agenda, the evidence vocabulary and gap-closing-note convention, the single-AI-execution limitation, and an explicit may-do / may-not-do boundary).
- The brief's boundary is deliberate: the receiving AI may retrieve evidence, extend gap-closing work, and draft measurement and pilot plans as proposals. Closing a measurement gap requires an authorized experiment that does not exist, so the correct output per gap is a proposed measurement with its decisive test named.
- `state/workflow.yaml` `batch_02:` block now lists the handoff brief as a deliverable, records `handoff_brief: reports/batch-02/HANDOFF-BRIEF.md`, and restates the central finding in `outcome`. The file re-parses as valid YAML and every deliverable path still resolves.
- `state/session-log.md` gained a 2026-11-16 addendum entry naming the handoff brief.
- A second honesty point carried into the record: batch-02 ran as single-AI execution with no three-model panel and no judge packet, so the independent-review and dissent machinery batch-01 had is absent and the in-document guardrails carry the entire epistemic load. Any receiving agent should treat these as desk conclusions from one model, not as panel-validated findings.
- No commit, merge, deployment, publication, or experiment occurred. No scientific content was approved. The operator's accept/reject desk-record decision on the batch-02 deliverables is still theirs.
