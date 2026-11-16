# Butt-Lab Product And Workflow Design

## Goal

Understand the current cigarette-butt research system, explain it in plain language, and collaboratively design a public research website and reusable workflow that can later support other recyclable materials.

## Current Phase

Phase 15 is complete as a desk-only evidence-gap continuation explicitly requested by the operator. It produced the M01 Gate-A feasibility sub-study specification at `reports/batch-02/evidence-gaps/M01-gate-a-feasibility-sub-study-specification.md` — the first step of the sample-size gate the Phase-14 M01 plan depends on. It fixes the six planning quantities the gate consumes (between-butt SD, within-butt preparation and analytical SD, between-block component, closure and separation recovery, censoring frequency, moisture and storage spread), the design able to estimate them (the butt as experimental unit, feed lot as block, day/analyst/instrument crossed with butt, storage interval deliberately varied, analysis scale fixed per analyte in advance), six probes with their quality controls and uncertainty treatment, seven pre-stated decision rules and eight falsifiers, and the seven items only a qualified laboratory can supply. Phase 14 produced the M01 plan itself at `reports/batch-02/evidence-gaps/M01-feed-partition-measurement-plan.md`. The series is indexed in `reports/batch-02/evidence-gaps/README.md` and recorded in `state/workflow.yaml` under `evidence_gap_continuation:` (status `proposal_recorded_awaiting_operator_direction`) and in `state/session-log.md`. **M01 remains open: two files are not a measurement, and no sample count exists.** Batch-02 remains `complete_pending_operator_decision`; this continuation does not accept its deliverables on the operator's behalf. Phase 13 (batch-02 handoff package) is complete in `reports/batch-02/HANDOFF-BRIEF.md`. Phase 10 remains complete in the isolated `C:\w\bpc` worktree at local commit `784bb14`. No scientific content has been approved and no publication has occurred.

## Phases

- [x] Phase 1: Read the current project overview, active workflow/state, research outputs, terminology, and website artifacts.
- [x] Phase 2: Clarify the first product boundary and success criteria with the user.
- [x] Phase 3: Compare redesign approaches and recommend one.
- [x] Phase 4: Present the proposed information architecture, research workflow, AI roles, provenance model, and website design for approval.
- [x] Phase 5: Write and self-review the approved design specification.
- [x] Phase 6: Create and self-review the Phase-1 content-contract implementation plan.
- [x] Phase 7: Execute and independently review all ten Phase-1 implementation tasks.
- [x] Phase 8: Run the whole-implementation acceptance review and present integration options without committing, merging, or publishing automatically.
- [x] Phase 9: Review the complete uncommitted working tree against repository standards and the approved Phase-1 specification, then list prioritized next actions.
- [x] Phase 10: Remediate the four release blockers test-first, restore the worktree's documentation/checkpoint integrity, and rerun the full acceptance gate.
- [x] Phase 11: Run the batch-02 desk cycle — six method-family explanations, a separate unvalidated invention sketch, and the Egypt annex — with inline gap-closing notes and no experiment.
- [x] Phase 12: Record the batch-02 checkpoint in `state/workflow.yaml`, `state/session-log.md`, and the root planning files, then hand the accept/reject desk-record decision to the operator.
- [x] Phase 13: Record the batch-02 findings durably and write `reports/batch-02/HANDOFF-BRIEF.md` so the current state is an uploadable package for another AI to continue the evidence-gap work.
- [x] Phase 14: Continue the evidence-gap work with a desk-only M01 measurement-plan proposal; record the proposal and checkpoint without running or authorizing an experiment.
- [x] Phase 15: Write the M01 Gate-A feasibility sub-study specification (the first step of the M01 plan's sample-size gate) in `reports/batch-02/evidence-gaps/`, keeping the same desk-only, no-experiment, no-unsupported-numbers boundary, and record it in the current-state files.
- [ ] Phase 16: On the operator's direction, write the next gap proposal in `reports/batch-02/evidence-gaps/` — the next numbered gap (M02 onward) — keeping the same desk-only, no-experiment, no-unsupported-numbers boundary, then record it in the current-state files.

## Constraints

- The approved design and plan may now be implemented only in the isolated `feat/publication-content-contract` worktree.
- Preserve scientific provenance, uncertainty, dissent, source links, and the distinction between source claims, AI gap-closing hypotheses, and new inventions.
- Make internal identifiers understandable to non-specialists; do not erase traceability.
- Do not authorize experiments or present hypotheses as validated methods.
- Prefer a reusable material-independent model rather than hard-coding cigarette-butt terminology into the future system.

## Known Context

- The repository has advanced beyond batch 01: recent commits show batch-01 closure, batch-02 planning, OCR/text additions, and a new `PROJECT-OVERVIEW.md`.
- No codebase-memory project is indexed, so Markdown/YAML discovery will use direct filesystem reads.
- Root planning files were absent at the start of this design session.

## Next Step

Wait for the operator's direction on the next gap proposal. Phases 14 and 15 are recorded: `reports/batch-02/evidence-gaps/M01-feed-partition-measurement-plan.md` (unvalidated M01 measurement-plan proposal), `reports/batch-02/evidence-gaps/M01-gate-a-feasibility-sub-study-specification.md` (unvalidated Gate-A feasibility specification), and `reports/batch-02/evidence-gaps/README.md` (series index), with the checkpoint in `state/workflow.yaml` (`evidence_gap_continuation:`) and `state/session-log.md`. Five decisions stand open and this project cannot make any of them: the minimum important difference, the precision target, the pre-specified fraction definitions and fines aperture, the laboratory's analytical target profile, and whether to authorize, resource and receive any laboratory work at all. Do not fill any of them in with unsupported numbers. Do not accept Batch-02 on the operator's behalf, do not commit in the main checkout, and do not start an experiment, pilot, reader application, publication, merge, deployment, or push — each remains separately unauthorized.

## Errors Encountered

| Error | Resolution |
|---|---|
| Initial case-insensitive overview glob did not match the hyphenated filename. | Use the exact filename shown by Git history: `PROJECT-OVERVIEW.md`. |
| GitHub's unauthenticated recursive-tree API returned HTTP 403 while inspecting Chisle. | Used the repository's README plus the `github-file` recipe for `INSTALL.md`, `docs/usage.md`, and `package.json`. |
| Fresh-reader spec review found ambiguous scoring, rights, allowlist, deployment-gate, and evidence-state contracts. | Tightened the spec with exact enums, score record states, eight rubrics, derivative rights, explicit manifest closure, separate manual deployment, and phased implementation plans; a second review found no blocking issues. |
| The shell did not expose `rg` during plan verification. | Replaced planned `rg` commands with PowerShell-native scans and used a read-only Node validator for structural counts. |
| The first structural validator found all task headings at heading level 2 instead of the required level 3. | Normalized all ten headings to `### Task N:` and reran the validator successfully. |
| The first linked-worktree checkout failed on archived research paths that exceeded Git's Windows path handling. | Confirmed Windows long paths are enabled, enabled repository-local `core.longpaths`, and recreated the worktree at the short path `C:\w\bpc`. |
| A chained PowerShell recovery command rejected `if` after `&&`. | Split directory creation and `git worktree add` into separate commands; no worktree files had been created by the rejected command. |
| `unittest` discovered zero tests and `pytest` is not installed. | Inspected the repository test file and used its intended direct runner: `python tests/test_validate_registry.py`, which completed all 23 tests. |
| Task 1 initially named the coverage script `coverage` instead of the planned `test:coverage`. | The Task-1 implementer made the one-key correction; the code-quality reviewer approved the result and fresh verification passed. |
| Task 2 initially generated a public JSON Schema that omitted URI-format semantics and allowed several non-normalized manifest paths. | Added representable URL/path constraints, input-mode schema generation, parity tests, and deterministic CLI generation coverage; both independent reviewers approved the corrected contract. |
| The first Task-3 specification review used field names and catalog metadata from a superseded reviewer prompt rather than the approved plan. | Rechecked the exact plan contract (`methodId`, `conflictingClaimIds`, scored `label`, no catalog date field); the reviewer withdrew those findings and approved the implementation. |
| Task 4's first quality review found YAML collection-key overwrite, Markdown unsafe-link obfuscation, noncanonical JSON edge cases, and URL-policy mismatches. | Hardened parsing and policy test-first, including scalar-string-only YAML mapping keys and CommonMark backslash-escape normalization; re-review and fresh verification passed. |
| Task 5's repeated Markdown-regex fixes alternated between missed valid CommonMark structures and false positives in literal/code contexts. | Stopped patching after the architecture proved brittle. Request approval to add a package-local Markdown parser and validate parsed tokens instead of approximating CommonMark with regexes. |
| The user declined the additional `marked@18.2.0` dependency and selected “Stop Task 5.” | Preserved the worktree and documented the blocker. No later task, install, commit, merge, deployment, or publication will proceed without new direction. |
