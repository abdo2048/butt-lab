# Evidence-gap continuation — index

**Status:** desk-only series. **No experiment is authorized, run or performed.** Every document
here is a proposal or a desk finding, never a result.

This folder is the working area for the Phase-14 evidence-gap continuation, opened on the
operator's direct instruction to continue the evidence-gap work after the batch-02 handoff package
was delivered. It does not change the status of any batch-02 deliverable: `state/workflow.yaml`
still records `batch_02.status: complete_pending_operator_decision`, and the operator's
accept/reject desk-record decision on those deliverables has not been made.

## Authority for what may be done here

`reports/batch-02/HANDOFF-BRIEF.md` §10 defines the boundary, and it is enforced here:

| Acceptable in this folder | Not acceptable without a new, separate operator authorization |
|---|---|
| Retrieving and reading primary sources | Running or appearing to run any experiment, measurement, pilot or field trial |
| Extending and citing the gap-closing evidence | Declaring any family or proposal clean, detoxified, safe, commercially validated, environmentally beneficial, novel, patentable, deployable or costed |
| Closing document-level gaps that retrieval can close | Freedom-to-operate, legal, regulatory-acceptance or deployment determinations |
| Drafting measurement and pilot plans **as proposals**, clearly labelled unvalidated | Publishing, deploying, merging, or starting a reader application |
| Tightening the four-field sink failure map per family and per stream | |

The recurring evidence gaps being worked are the numbered **M01–M08** (measurement), **R01–R05**
(jurisdiction and regulatory) and **S01–S06** (scale, cost, energy) agenda recorded in
`state/workflow.yaml` → `gap_closing.remaining_open_gaps` and enumerated in
`reports/final/validation-and-open-questions.md`.

The central finding that governs all of it: across every family there is **no dry-mass basis, no
analyte-resolved contaminant fate, no leaching data, and no use-specific performance evidence**.
"Missing" means `parameter-not-located` at the required basis and boundary — not proven absence.

## Documents

| File | Gap | What it is |
|---|---|---|
| `M01-feed-partition-measurement-plan.md` | M01 — whole feed versus separated filter/tobacco/paper/ash/fines | A written measurement specification: question and estimand, measurement model with units, experimental unit and nesting, block/randomization structure with the nuisance-factor table, analyte panel, analytical quality controls, uncertainty budget, the controlling-fraction decision rule including honest negatives, falsifiers, and a six-gate sample-size decision procedure. **No sample count, acceptance criterion or result is stated** — each is `parameter-not-located` pending a qualified-lab feasibility study and a defensible power/precision justification. |
| `M01-gate-a-feasibility-sub-study-specification.md` | M01 (Gate A) — the feasibility sub-study the M01 plan's sample-size gate depends on | A specification for the first step of that gate: the six planning quantities it must produce (between-butt SD, within-butt preparation and analytical SD, between-block component, closure and recovery, censoring frequency, moisture and storage spread), the design that can estimate them (butt as experimental unit, lot as block, day/analyst/instrument crossed, storage interval deliberately varied, analysis scale fixed per analyte in advance), six probes with their quality controls and uncertainty treatment, the pre-stated decision rules R1–R7 and falsifiers F1–F8, and the seven items only a laboratory can supply. **No sample count, recovery figure, acceptance limit, detection limit, threshold or expected value is stated** — each is `parameter-not-located`. It also states the result the study is allowed to produce honestly: *"the measurement system cannot support M01 as currently framed."* |

## Conventions used in this series

- **Evidence labels.** Every statement is a definition, a procedure, or an explicit
  `parameter-not-located`. Source-supported, inference and new-assumption keep their accepted
  meanings from `reports/final/validation-and-open-questions.md`.
- **Gap-closing notes.** Inline, in the format established by the batch-02 method documents:
  `> **[GAP-CLOSING NOTE — AI, scientist-inventor role]** ...` — naming the missing evidence and
  who could produce it.
- **No operating instructions.** No pressure-vessel, solvent-recovery/distillation,
  caustic-pulping or hazardous-waste-processing directions; no DIY substitution; no clearance based
  on odour, appearance or FTIR alone.
- **Field names are not exchanged.** A favourable result in one field never substitutes for
  another, and the four-field sink requirement still governs.
- **A plan is not a validation.** File completion is not experimental validation, and nothing in
  this folder closes a gap.

## Next step

The operator's accept/reject desk-record decision on the batch-02 deliverables remains outstanding
and is not made here.

Two documents are now in place for M01: the plan itself, and the Gate-A feasibility specification
it depends on. Together they specify the question and the study that would answer it, but **no
measurement has been made and no sample count exists**. Four decisions remain with the
investigators and the laboratory, and this folder cannot make any of them: the **SESOI** (Gate C),
the **precision target** (Gate B), the **pre-specified fraction definitions and fines aperture**,
and the **analytical target profile** that supplies the acceptance ranges the decision rules test
against.

The next gap to plan, after the operator's direction, is M02 (F0 wash liquids and recovered CA) as
its own proposal in this folder. Note that M02 assumes the M01 feed basis: without M01's common
dry-feed denominator, a wash-liquid inventory cannot be stated on a comparable basis either.

## Record of this continuation

| Date | Unit | Added |
|---|---|---|
| 2026-11-16 | Phase 14 | `M01-feed-partition-measurement-plan.md` |
| 2026-11-16 | Phase 15 | `M01-gate-a-feasibility-sub-study-specification.md` |

Both units are desk-only. `state/workflow.yaml` → `evidence_gap_continuation` carries the
authoritative record; `state/session-log.md` carries the session history.
