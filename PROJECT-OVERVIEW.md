# Project Overview — butt-lab (read this first)

**Last updated:** 2026-11-17 · **Maintainer:** operator (human) + coordinating assistant

## What this project is

butt-lab is a structured, multi-stage evidence-review project investigating **cigarette-butt recycling**: what recycling methods exist, what evidence actually supports them, where the gaps are, and what a new, better-grounded proposal could look like. It is a **desk investigation only** — no experiment has ever been authorized or run.

## The two repositories

- **butt-lab** (this repo): the working project — workflow state, specs, packets, panel outputs, reports, and consolidated evidence (materials/).
- **butt-materials** (private): the raw evidence library used during retrieval (PDFs, OCR derivatives, extraction catalogue). A consolidated copy of the gap-closing evidence lives in butt-lab at `materials/gap-closing/`. The two repos may drift; butt-lab is authoritative for project state.

## History — batch-01 (closed 2026-11-12)

Five stages, all completed and operator-accepted (see `state/workflow.yaml`):

1. **Harvester** — mapped 10 operator companies (Keenat, MéGo!, Re-Cig, Tchaomegot, TerraCycle, Code Effort, BuffIndia, Poiato/UnB, CNR, Cerdia)
2. **Deep-dive** — reconstructed source documents for the main process routes (patents, papers, dossiers)
3. **Red-team panel** — three AI workers + judge adversarially reviewed the evidence
4. **Inventor panel** — three AI workers + judge generated new hypotheses
5. **Synthesis** — final desk synthesis + validation/open-questions report

Plus a post-Stage-5 **gap-closing retrieval unit** (2026-11-08 to 2026-11-11) that closed the document gaps: patents (BR0305004B1, Tchaomegot FR3102076B3/FR3102075B1/FR3125946B1), the Re-Cig End-of-Waste authorization (APPA Trento AUT), the EKB literature set, and confirmed that **no independent public full LCA of a commercial butt-recycling process exists**.

## Key concepts and terms

- **J-H-01** — batch-01's judge hypothesis (combining B-P-01's decision gate with C-P-01's treatment-acceptance boundaries). Unvalidated; the preferred revision target. Not an accepted process.
- **F3** — minority-dissent recycling family (Worker A's position): may be the better starting point when recoverable polymer quality is the controlling objective.
- **Metals stop-condition** — heavy metals must be treated as an explicit stop condition for any route; note the Italian EoW gate (UNI 10667) tests no heavy metals.
- **Four-field sink** — every proposal must state: material produced, intended use, acceptance basis (standard/permit), and issuer (who accepts it).
- **Gap-closing note** — in batch-02, an AI-written explanation inserted inline where a source document lacks information, always marked `[GAP-CLOSING NOTE — AI, scientist-inventor role]`.

## Key outputs to read

- `reports/final/batch-01-synthesis.md` — the batch-01 desk synthesis
- `reports/final/validation-and-open-questions.md` — validation requirements and open questions (M01-M08, R01-R05, S01-S06)
- `materials/gap-closing/gap-closing-round2/review-re-cig-AUT-end-of-waste.md` — review of the only public EoW authorization for butt recycling
- `specs/batch-02-launch-plan.md` — the current (batch-02) plan, v1.0

## Current status — batch-02 accepted; reader platform in build

Batch-02 ran 2026-11-16 and its desk-record deliverables were **accepted by the operator on 2026-11-17** as the content basis for the reader site. See `state/workflow.yaml` (`batch_02.operator_acceptance`) and `operator/batch-02-acceptance-2026-11-17.md`.

Batch-02 was defined in `specs/batch-02-launch-plan.md` (v1.0, operator decisions recorded 2026-11-13):

- **Phase 1:** six readable method explanations (mechanical, thermal, chemical, biological, material incorporation, product routes) for medicine-faculty students and general readers, with inline gap-closing notes at the exact locations where sources are missing information
- **Phase 2:** the AI's own invention after seeing all methods, informed by prior art (batch-01 outputs read as awareness, not reference; weaknesses of previous methods must be recorded explicitly)
- **Egypt annex:** separate file for Egypt-specific considerations; main content worldwide
- **Product focus:** deliberately open until after Phase 2
- **Review:** any future AI review is outside the workflow

**Reader platform (in build, not deployed).** The publication content contract and the reader-application work were merged into this branch on 2026-11-17. The published layer currently holds **134 approved records and 10 reader pages** (six method-family pages plus `start-here`, `egypt-annex`, `how-the-research-works` and `limitations`), validates clean, and exports a byte-identical bundle. The next build unit is the Astro + Pagefind reader application, which consumes the exported bundle only — never the source YAML. Nothing is deployed or published.

## How to work in this repo

1. Read `START_HERE.md`, `WORKFLOW.md`, and `OPERATOR_GUIDE.md` for the operating system.
2. Read `state/workflow.yaml` (current machine state) and `state/session-log.md` (dated history) before doing anything.
3. The operator (human) is the only authority for acceptances, launches, and state changes. AIs propose; the operator decides.

## Publication layer

The publication content contract (Phase 1) provides schemas, a validator, and an exporter for a reviewed publication layer. It is **derived** from the repository's research and workflow outputs — the repository remains authoritative.

Key references:
- Publication content contract: implementation plan and design record `docs/superpowers/plans/2026-11-14-publication-content-contract.md`
- Reader-platform design: `docs/superpowers/specs/2026-11-13-butt-lab-reader-platform-design.md`; implementation plan `docs/superpowers/plans/2026-11-16-butt-lab-reader-platform.md`
- Publication directory overview: `publication/README.md`
- Full usage and operator workflows: `docs/publication-content-contract.md`

**`state/workflow.yaml` remains authoritative for operator acceptance.** The Phase-1 exporter produces a local build directory only; it cannot publish, deploy, or approve scientific content. Every future publication version requires explicit human operator approval recorded in `state/workflow.yaml` and `state/session-log.md`.

## Guardrails (non-negotiable)

- **No physical experiment is authorized.** The AI may design, specify and simulate experiments; it must never handle material, collect samples, operate equipment or perform a physical measurement. See `state/workflow.yaml` (`permissions.experiments`).
- No claim that any method or proposal is clean, safe, validated, costed, patentable, or environmentally superior without measurement.
- J-H-01 and every batch-01/batch-02 invention remain unvalidated hypotheses awaiting the measurement that could kill them.
- Metals are an explicit stop condition.
- Source-derived content and AI gap-closing content must always be distinguishable.
- Every acceptance, launch, and state change is recorded in `state/workflow.yaml` and `state/session-log.md`.
