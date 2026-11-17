# Batch-02 handoff brief — cigarette-butt recycling evidence gaps

**Date:** 2026-11-16
**Prepared by:** operator-directed OpenCode session (displayed model MiMo-V2.6-Flash Free; underlying model not verified)
**Status:** desk research only. **No experiment has been authorized, run, or performed.**
**Purpose of this file:** a cold-readable brief for another AI that will start working on the
remaining evidence gaps. Read this file first; it names everything else you need.

---

## 1. What this project is

This repository is a desk investigation into **cigarette-butt recycling**: what recycling methods
exist, what evidence actually supports them, where the gaps are, and what a better-grounded
proposal could look like. It is not an experimental programme. No laboratory measurement, pilot,
or field trial has ever been authorized.

The investigation is organised in batches. **Batch-01 is closed and accepted** as a desk
investigation. **Batch-02** (the work this brief hands over) produced a method-by-method
explanation set, a gap-closing note convention, and an invention sketch. Batch-02 is complete
and awaiting the operator's accept/reject desk-record decision.

### Authority chain (read in this order)

| File | Why it matters |
|---|---|
| `START_HERE.md` | Entry point and the permanent resume instruction |
| `WORKFLOW.md` | The staged process definition (Stages 1–5) |
| `charter.md` | Governs scope and safety |
| `state/workflow.yaml` | **The authoritative machine-readable state.** Operator acceptances, stages, permissions, and the `batch_02:` record all live here. |
| `state/session-log.md` | The append-only human-readable session history |

`state/workflow.yaml` is authoritative for operator acceptance. Nothing in a report file
overrides it.

## 2. Evidence base already accepted (batch-01)

These conclusions were **accepted by the human operator** and are the starting point. Do not
re-litigate them; build on them.

- **Registry of methods:** `registry/methods.yaml` — 30 method entries. (`registry/methods-old.yaml`
  is preserved history and read-only.)
- **Accepted final synthesis:** `reports/final/batch-01-synthesis.md`
- **Accepted validation agenda:** `reports/final/validation-and-open-questions.md`
- **Accepted Stage-2 source reconstructions:** `specs/` — among them
  `defenzo-2020-source-reconstruction.md`, `cn106928486-source-reconstruction.md`,
  `pressurized-fluid-reference.md`, `unb-pi0305004-source-reconstruction.md`
- **Accepted panel and judge reports:** `panels/batch-01/stage-3/round-01/` and
  `panels/batch-01/stage-4/round-01/`
- **Gap-closing evidence:** `materials/gap-closing/` (rounds 1 and 2, OCR audit, library)
- **Document gaps already closed:** D03, D07 (Keenat, MéGo!, Korean), D08 (Re-Cig)
- **Cross-cutting finding:** **no independent, public, full life-cycle assessment of a commercial
  butt-recycling process exists.** The Keenat 2026 "ACV" is a gated, self-published document;
  the MéGo! claim is not published; Re-Cig has certifications but no per-lot testing or process
  LCA in the public record.

## 3. The Batch-02 deliverables you are being handed

All in `reports/batch-02/`. Each method document covers: overview, mechanism, feedstock
requirements, contaminant fate, energy and water use, product quality, regulatory status, cost
signals, evidence quality, **four-field sink accounting**, and a bottom line — each with 6–8
inline gap-closing notes marking exactly where source evidence runs out.

| File | Subject |
|---|---|
| `methods/f0-staged-washing.md` | Staged water/ethanol washing (batch-01 family F0; De Fenzo 2020) |
| `methods/f1-mechanical-physical.md` | Mechanical separation + aqueous washing (MéGo! FR3066128A1 / Re-Cig) |
| `methods/f2-thermal.md` | Dry treatment / extrusion composite (Keenat) |
| `methods/f3-chemical.md` | Solvent dissolution and recovery (CN106928486 / CNR / Cerdia) |
| `methods/f4-biological.md` | Biological treatment routes |
| `methods/f5-material-incorporation.md` | Incorporation into matrices (asphalt, composites) |
| `methods/f6-product-routes.md` | Product-route survey across all families |
| `invention.md` | The invention sketch: four-field sink failure map + metals stop-condition |
| `egypt-annex.md` | Egypt-specific observations, no recommendations |

**Numbering warning:** batch-01 families (F0–F5) and Batch-02 filenames (f0–f6) do not share a
1:1 mapping. The Batch-02 filenames follow the launch-plan items 1–6. Read the family column
above before assuming a correspondence.

## 4. THE CENTRAL FINDING — recurring evidence gaps across all seven families

This is the finding the operator asked to be recorded durably. It is the reason the batch-01
operator acceptance refuses every "clean / safe / validated / benign" claim, and it is the agenda
for the work you are being handed.

**Across every family, the same four classes of evidence are missing:**

1. **No dry-mass basis.** No family reports feed and output on a traceable, common dry-feed
   basis (received wet mass, moisture, whole-butt vs. filter-only) without silently switching
   denominators.
2. **No analyte-resolved contaminant fate.** No family reports, per analyte and per stream, on
   the same basis — nicotine, each TSNA (including NNN/NNK where relevant), representative PAHs,
   and each of Cd, Pb, As, Hg **separately**. Partial polymer characterization, a single metal
   observation, or an abstract-level bulk-liquor result does not close these pairs.
3. **No leaching data.** No family has exposure-relevant leaching/migration or emissions data for
   a declared product and jurisdiction. A closed mass balance can describe complete retention in
   product; that is not a product safety result.
4. **No use-specific performance evidence.** Mechanical/functional evidence for a declared
   intended use is absent throughout. No safety inference may be drawn from matrix type or a
   certificate (ISO 14001/45001 are management-system certifications, not product performance).

Additional recurring absences: no complete liquid inventory with a named final treatment route;
no inlet-to-outlet analytical performance for any treatment boundary; no concentration on
energy, water, reagent, or solvent makeup; and no accepted price or affordable treatment route
for dilute liquids or metals-bearing residues.

**"Missing" here means `parameter-not-located` at the required basis and boundary** — not proven
absence of all measurements everywhere. The distinction matters: it licenses retrieval work
without licensing a claim that nothing exists.

## 5. The four-field sink requirement

The batch-01 Stage-4 operator acceptance imposes a **four-field sink**. A proposal must close all
four; closing three is a failure, and a favourable result in one field never substitutes for
another. **Every family currently fails at least one field**, which is why the invention sketch
starts from a measurement plan rather than a process claim.

| # | Field | What it requires |
|---|---|---|
| 1 | **Dry-mass balance** | One common dry-feed-basis mass balance across *every* stream, with unexplained loss kept explicit |
| 2 | **Analyte-resolved fate** | Per-analyte mass in product, every liquid and solid residual, captured emissions/condensate, purge, treatment inlet and final outlet, plus beginning/end recycle inventory |
| 3 | **Treatment route + acceptance** | A named actual final route, documented acceptance of the characterized stream, and measured inlet-to-outlet analytical performance including generated solids and air emissions |
| 4 | **Use-specific product gate** | Declared intended use and jurisdiction *before* judging contaminant content, leaching/migration, emissions and material performance — a gate independent of mass-balance closure, and no gate has yet been passed |

## 6. The gap agenda, numbered and actionable

Grouped as recorded in `state/workflow.yaml` → `gap_closing.remaining_open_gaps`. These are
**future pilot/decision work, not retrieval work** — retrieval cannot close them, only
authorized measurement can.

### M — Measurement gaps: analyte × stream pairs (M01–M08)

The complete comparable target-panel dataset does not exist for any route. The pairs to close:

| Boundary | Missing analyte–stream information |
|---|---|
| Whole feed vs. separated filter / tobacco / paper / ash / fines | Nicotine, each TSNA/PAH and each metal mass by fraction on the same dry-feed basis; the **controlling fraction remains unknown** (partition ranking required) |
| F0 wash liquids and recovered CA | Target organics/metals in each water/ethanol fraction and in product, plus complete liquid inventory and final treatment fate |
| F1 / J-H-01 initial wash, later wash, recycle, purge, sludge, CA | Per-analyte mass, cycle inventory trend, residual product content, possible sludge-to-product contribution, treatment inlet/outlet, air-control fate |
| F2 fibre, composite, off-gas / condensate | Per-analyte retention vs. transfer, metal/species fate, captured emissions, product leaching — **formulation dilution cannot supply removal data** |
| F3 precipitate, mother liquor, wash, insolubles, recovered solvent | Organics co-precipitation, Cd/Pb/As/Hg phase transfer, solvent/acid residuals and recovery, capture residues, final outlet performance |
| F4 fibre, concentrate, recycle, sorbents/filters if used | Actual phase/recipe-linked extraction per analyte, metal fate, concentrate composition, purge/loss, final treatment fate |
| F5 pulp, dark liquor, purge, precipitate, wash water | Individual toxicant masses **rather than COD alone**, inventory growth, outlet load, precipitate composition, pulp contact/leachate evidence |
| Compost, lumber, other final articles, end-of-life release | Product-specific analyte content, exposure-relevant leaching/emissions, ecotoxicity where required, mechanical/function evidence |

### R — Jurisdiction and regulatory acceptance gaps (R01–R05)

| # | Gap |
|---|---|
| R01 | **Selected jurisdiction and material status** — governing feed/output waste classification, transport, storage, treatment permissions, End-of-Waste basis for a selected plant and product; French feed-classification leads cannot simply be exported to every country or output |
| R02 | **Actual final recipient** — for each liquid, solid and capture residual: permitted recipient, actual acceptance specification, treatment residuals, discharge basis, demonstrated analytical outlet. "External purification" alone answers none of these. |
| R03 | **Intended-use criteria** — exact contact, leaching/migration, emissions, ecotoxicity and performance acceptance bases for the proposed CA/cellulose articles, compost and composites; no universal product limit and no automatic downgrade-to-restricted-use rule is adopted |
| R04 | **Standards and hazard-property extrapolation** — HP6/HP14 and compost-standard discussion includes search-excerpt and secondary material; neither numerical standard limits nor the assertion that nicotine removal alone clears a legal hazard property is accepted without authoritative, material-specific verification |
| R05 | **Equipment, exposure and intellectual-property review** — solvent, chemical, pressure, air-emission and occupational obligations remain qualified-engineering/legal questions; patent-status shorthand and term arithmetic are **not** novelty, patentability, or freedom-to-operate determinations |

### S — Scale, cost and energy gaps (S01–S06)

| # | Missing denominator or inventory | Why the comparison stays open |
|---|---|---|
| S01 | Energy per mass of received wet butts, dry whole butts, dry filter feed, conforming output | Moisture removal, compression, solvent recovery, treatment and rejected product must be included on explicit, non-interchangeable bases |
| S02 | Water, reagent, solvent makeup and purge per dry feed and conforming output | "Recycling" labels do not define net consumption, inventory growth or final waste load |
| S03 | Full-cycle throughput and utilization | Dissolution duration is not whole-process residence time; collection counts and nominal capacity do not define moisture-adjusted accepted feed or conforming throughput |
| S04 | Treatment cost per stream volume, dry residual mass, analyte load | Dilute liquid, metals-bearing residues, captured emissions and product rejects may control disposition; no accepted price or affordable route |
| S05 | Product revenue/function and displacement | Recovered CA, cellulose pulp and composite filler are **different products**; a functional unit and conforming output are needed before cost or environmental comparison |
| S06 | Complete system inventory and comparator | Collection, transport, energy source, additives, treatment, emissions, residual disposal, end-of-life, displaced function — the Keenat retreat is **not** an audit-ready cross-family LCA |

### Also open, recorded separately

- **Priority hypotheses:** J-H-01 is the primary revision target and **remains an explicitly
  unvalidated judge hypothesis**, not an accepted process. A-P-01/F3 is preserved as the
  strongest **minority** comparator when polymer quality controls the objective. B-P-02 and
  B-P-03 are secondary. B-P-01 and C-P-01/F1P keep their provenance but are represented through
  J-H-01's new combination.
- **Preserved dissent:** the wrong-stream/dilute-purge objection, unsolved metals, the F2
  dilution/off-gas warning, and the absence of comparable scale evidence all survive.
- **Metadata concern, not silently closed:** hash-normalization reconciliation between the
  packet manifest and raw committed bytes is an operator-owned provenance follow-up. It is not
  permission to reopen scientific inputs or alter a chemistry verdict.

## 7. The metals stop-condition

**In force.** A stream with uncharacterized heavy-metal content cannot be routed to a product or
to unclassified waste. Metals (Cd, Pb, As, Hg) are an explicit stop condition, not a parameter to
be averaged away: a favourable result elsewhere does not offset uncharacterized metals. The
Re-Cig End-of-Waste gate was checked for this and **contains no heavy-metal parameters**, which
reinforces rather than relaxes the stop-condition.

## 8. Evidence discipline — the vocabulary to use

The AI writes for **already-trained domain experts** who can judge what is weak, what is strong,
and what to enhance or replace. Judgement on any gap-fill or invention is deferred to after the
project ends and is made by human reviewers and AI reviewers, each supplying their own new
suggestions. Nothing in this record is a pre-accepted verdict.

Every statement must carry one of these labels:

- **source_supported** — stated by a retrieved primary source (patent, paper, standard, regulatory
  doc, company filing). Quote the exact section and give the URL or citation.
- **ai_inference** — reasoned by the AI from available knowledge, not in any source. Write the
  reasoning explicitly.
- **ai_proposal** — invented by the AI as a testable hypothesis, design, or improvement variant.
  State what would falsify it.
- **parameter_not_located** — no number exists at the required basis and boundary. This is not
  "zero" and not "unknown everywhere" — it is a precise gap label.
- **unverified** — retrieved from a source but not independently confirmed.

Rules for the work:

1. **Fill gaps from your own knowledge, and label it `ai_inference` or `ai_proposal`.** Do not
   leave `parameter_not_located` where you can reason to a plausible value — write the value, show
   the reasoning, and label it. The label is the honesty; the reasoning is the value.
2. **Never let one field substitute for another.** A closed mass balance is not a safety result; a
   permit or partner name is not treatment performance; a certificate is not product performance.
3. **Never declare a family clean, detoxified, safe, commercially validated or environmentally
   superior.** No family has the evidence for any of these.
4. **Label every claim.** Every paragraph, table cell, and numerical entry must carry its label.
5. **Gap-closing convention:** use `> **[GAP-CLOSING NOTE — AI, scientist-inventor role]** ...`
   to mark where you filled a gap from your own knowledge, naming what is missing and why your
   fill is reasonable.
6. **Invention convention:** for new methods or variants, use `> **[INVENTION — AI, scientist-inventor role]** ...`
   to present the proposal with its falsification test.

## 9. Known limitations of this handoff — read before trusting it

Two honest limitations you should factor into your own work:

1. **Batch-02 ran as a single-AI execution with no three-model panel and no judge packet.** The
   batch-01 stages benefited from independent review and preserved dissent; Batch-02 did not.
   The in-document guardrails therefore carry the entire epistemic load. Treat Batch-02 documents
   as a well-disciplined single-perspective synthesis, not as an independently reviewed one.
2. **Retrieval was not re-performed during the Batch-02 desk cycle.** The evidence basis is the
   accepted batch-01 record, the gap-closing evidence, the registry, and the Stage-2 source
   reconstructions. New primary sources you turn up are an improvement, and should be recorded as
   such rather than folded in silently.

## 10. What you may and may not do

**Acceptable continuation work (AI as scientist-inventor):**

- Retrieve and read primary sources — patents, journal articles, standards, regulatory documents,
  company filings.
- Explain every known method separately, in its own right, with full mechanistic detail.
- Fill gaps from your own knowledge, labeled as `ai_inference` or `ai_proposal`.
- Invent new methods, improvement variants, and hybrid process designs.
- Mark every statement with its status label (source_supported, ai_inference, ai_proposal,
  parameter_not_located, unverified).
- Design, specify, and plan experiments and pilots as **testable proposals**, clearly labeled as
  `ai_proposal` with their falsification test named.
- Run executable simulations with explicit code, inputs, units, and results.
- Build a complete knowledge base of the cigarette-butt recycling industry.

**Physical execution boundary (AI does not cross this):**

- The AI does not handle material, collect samples, operate equipment, or enter a laboratory.
- The AI does not perform any physical measurement, trial, or pilot.
- Physical execution requires a qualified facility, a risk assessment, lawful contaminated-waste
  handling, and a named human actor. None of these exist yet.

**Judgement is deferred:**

- No family or proposal is declared clean, detoxified, safe, commercially validated,
  environmentally beneficial, novel, patentable, deployable, or costed.
- No freedom-to-operate, legal, regulatory-acceptance, or deployment determination is made.
- Publication, deployment, merge, or reader-application start requires separate operator
  authorization.
- **Judgement on any gap-fill or invention happens after the project ends**, by human reviewers
  and AI reviewers, each supplying their own new suggestions. The AI's output is the knowledge
  base and the invention log — the verdict comes later.

## 11. Operator authorization recorded 2026-11-17 (this session)

**AI Role: Scientist-Inventor** — granted by operator instruction, recorded in
`state/workflow.yaml` → `permissions.ai_role` and `state/session-log.md`.

- The AI acts as a scientist-inventor with full knowledge of the accepted record, permitted to
  retrieve further knowledge from the internet and to invent new methods.
- Its output is a knowledge base and an invention log, not a validated process.
- Readers are already-trained domain experts who can judge what is weak, what is strong, and what
  to enhance or replace.
- Judgement on any gap-fill or invention is deferred to after the project ends and is made by
  human reviewers and AI reviewers, each supplying their own new suggestions.

**Experiments: AI-Designed Only** — recorded in `state/workflow.yaml` → `permissions.experiments`.

- The AI **may** design, specify, and plan experiments and pilots; propose methods, processes,
  formulations, and protocols; retrieve and read primary sources; run executable simulations with
  explicit code, inputs, units, and results.
- The AI **must not** handle material, collect samples, operate equipment, or enter a laboratory;
  perform any physical measurement, trial, or pilot.
- Physical execution requires a qualified facility, a risk assessment, lawful contaminated-waste
  handling, and a named human actor. Status: not arranged; no laboratory, no facility, and no
  sample exist.

## 12. Where the current state is recorded

- `state/workflow.yaml` → `batch_02:` block (status `complete_pending_operator_decision`),  
  `gap_closing.remaining_open_gaps`, `permissions.ai_role`, `permissions.experiments`
- `state/session-log.md` → `## 2026-11-17: Operator authorization for AI scientist-inventor role and AI-designed experiments ...`
- `task_plan.md`, `progress.md`, `findings.md` at the repository root → Phase 11/12 entries

The nine Batch-02 deliverables in `reports/batch-02/` are complete and awaiting the **operator's
own accept/reject desk-record decision**. That decision has not been made. Nothing in this brief
substitutes for it.