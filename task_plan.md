# Butt-Lab Product And Workflow Design

## Goal

Understand the current cigarette-butt research system, explain it in plain language, and collaboratively design a public research website and reusable workflow that can later support other recyclable materials.

## Current Phase

Phase 13 (batch-02 handoff package) is complete: `reports/batch-02/HANDOFF-BRIEF.md` records the recurring cross-family evidence gaps and the numbered M/R/S gap agenda in cold-readable form so the work can be uploaded to another AI to continue on the evidence gaps. Phase 12 (batch-02 checkpoint recording) is complete: `state/workflow.yaml` carries a `batch_02:` block with status `complete_pending_operator_decision` and lists the handoff brief as a deliverable, `state/session-log.md` carries the 2026-11-16 entries, and the root planning files (`task_plan.md`, `progress.md`, `findings.md`) carry the batch-02 record. Phase 11 deliverables (the nine `reports/batch-02/` files) are complete. Phase 10 finished in the isolated `C:\w\bpc` worktree and was committed locally as `784bb14 feat: add publication content contract` under the operator's option choice (b) for a wider file set. Batch-02 was separately authorized by the operator's direct "start batch-02" instruction; it covers desk research only and does not authorize an experiment, reader application, publication, pilot, merge, deployment, or push. No scientific content has been approved and no publication has occurred.

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

Wait for the operator: the batch-02 record, the nine `reports/batch-02/` deliverables, and the handoff brief `reports/batch-02/HANDOFF-BRIEF.md` are complete. The next action is the operator's own accept/reject desk-record decision on those deliverables. Do not accept or reject on the operator's behalf. Do not commit in the main checkout. Do not start the reader application, publication, experiment, pilot, merge, deployment, or push — each is separately unauthorized.

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
