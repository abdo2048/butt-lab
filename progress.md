# Progress: Butt-Lab Product And Workflow Design

## 2026-11-15

- The operator said `continue`, authorizing the recommended test-first Phase-10 remediation in `C:\w\bpc` while preserving every no-commit/no-publish/no-Batch-02 constraint.
- Verified `C:\w\bpc` is an existing linked worktree on `feat/publication-content-contract`; no new worktree or dependency installation is needed.
- Semantic-export gate RED→GREEN: the new test first failed because export resolved successfully, then passed after `exportPublication` began rejecting semantic errors before stage creation. All 11 exporter tests and typecheck pass.
- Next: reproduce rollback failure during output replacement, then implement backup/rename/restore semantics without changing other policy behavior.
- All ten Phase-1 implementation tasks and the acceptance gate are complete in the isolated `C:\w\bpc` worktree; no commit, merge, deployment, or publication occurred.
- The user requested a review and a list of next actions, choosing `HEAD + working tree` as the baseline so untracked Phase-1 files are included.
- Started a two-axis review: repository Standards and approved Phase-1 Specification will be evaluated separately before prioritizing follow-up work.
- Captured the worktree inventory and found Task-9 documentation split between the isolated worktree and the heavily modified main checkout.
- Confirmed Codebase Memory excludes `tools/` by design, so the implementation review must use direct source and test evidence rather than graph structure.
- Established the review packet and dispatched independent read-only Standards and Specification reviews.
- Mapped the approved post-Phase-1 sequence: integration decision first; separately authorize Batch 02; review all six method families before invention; require operator approval before Phase 3 reader-app work.
- Next: receive and validate both review reports, run fresh verification, aggregate findings without merging the two axes, and present a prioritized next-action list.
- Completed both review axes and verified the material findings directly against source and plan requirements.
- Standards reported 7 findings: one hard checkpointing breach, three integration-hygiene issues, and three low-priority judgment-call smells.
- Specification reported 7 findings. Four are release-blocking: export omits semantic validation, output replacement lacks backup/restore, validation treats missing or invalid rubrics as optional, and allowed image assets are silently omitted. Expected export-policy errors can also escape structured diagnostics.
- Confirmed Task-9 documentation is split across checkouts and the isolated feature worktree is not self-contained.
- No product fix, commit, merge, deployment, publication, experiment, or Batch-02 authorization occurred during review.
- Next: await operator approval for a test-first remediation phase, followed by a fresh full acceptance gate and integration decision.

## 2026-11-13

- Loaded the brainstorming, planning-with-files, and codebase-memory workflows.
- Confirmed no knowledge-graph index exists for this repository.
- Confirmed root planning files were absent and created a new design-session plan.
- Inspected recent Git history and found the repository has advanced beyond the prior Stage-4 task.
- Next: read the current project overview and active control/state files, then map the smallest relevant set of research and website artifacts.
- Read `PROJECT-OVERVIEW.md`, `START_HERE.md`, `WORKFLOW.md`, and `state/workflow.yaml`.
- Confirmed batch 01 is closed as desk research and batch 02 is planned but not launched.
- Confirmed internal identifiers are provenance/workflow handles rather than reader-facing terminology.
- Confirmed no website/Quartz implementation directory was found by the initial targeted search.
- Next: read the batch-02 plan, post-project dashboard brief, final synthesis, validation/open-questions report, and operator guide.
- Read `specs/batch-02-launch-plan.md`, `post-project/dashboard-spec.md`, `reports/final/batch-01-synthesis.md`, `reports/final/validation-and-open-questions.md`, and `OPERATOR_GUIDE.md`.
- Completed the current-system map: the repository is an auditable research workflow, not yet a normalized knowledge base or reader application.
- Identified a three-layer target: research pipeline, normalized knowledge model, and generated reader application.
- Recorded that source PDFs remain canonical while OCR/Markdown files are provenance-bearing derivatives for AI/search use.
- User accepted the optional visual companion for later diagrams and mockups.
- Next: clarify the first product boundary one question at a time.
- User selected “Foundation + pilot”: design the reusable model and pipeline now, with batch 02 as the first implementation target.
- User selected a reviewed publishing pipeline: AI remains outside the first website, and a human approves content before publication.
- User selected curious non-specialists as the primary reader, with technical and provenance detail available through drill-down.
- User clarified that the site is for a small group of friends and is not currently intended for public worldwide access.
- User selected a shared password for pilot access.
- User selected English-first content with future localization support.
- User selected approved local PDF copies plus original source links, subject to rights review.
- User selected method-landscape and evidence understanding as the primary ten-minute reader outcome.
- User selected batch 02 as the pilot content, with contextual links into batch-01 audit evidence.
- Clarification phase complete; moving to architecture approach comparison.
- Compared Quartz-first, a full custom platform, and a progressive structured hybrid.
- User selected the progressive structured hybrid.
- Moving to section-by-section design review, beginning with system boundaries and data flow.
- User approved the system boundary in the visual companion.
- Inspected `JayPokale/Chisle` README, OpenCode installation guidance, usage/config documentation, and package metadata.
- Recorded Chisle as a lean-design constraint rather than a site dependency; no global installation was performed.
- Next: present the minimum normalized content model and validate it with the user.
- User approved the minimum normalized content model (option A).
- Next: present the reader navigation and method-page experience.
- User approved the reader navigation and method-page experience (option A).
- Next: present source ingestion, OCR/Markdown derivation, review gates, and fail-closed publication.
- User approved the source-ingestion and publication-gate design (option A).
- Next: present technical modules, authenticated static delivery, build/export behavior, and verification.
- User approved the technical architecture with one revision: remove the password for now.
- Paused to clarify whether the resulting pilot should be publicly deployed or kept local-only, because that changes the exposure boundary.
- User chose public deployment. The technical architecture is revised to remove authentication and permit a GitHub Pages-style static deployment.
- Next: present final delivery scope, migration path, success criteria, and non-goals.
- User approved the overall scope but requested a comparison/scoring revision: methods must be sortable by practical criteria, missing evidence, and required human experimentation.
- Paused to choose between separate criterion scores and a fixed overall score before revising the design.
- User selected separate criterion scores (option A), with no default aggregate winner score.
- User approved the exact comparison model, including nullable criterion ratings, visible evidence basis, unknown-not-zero behavior, and no aggregate.
- Completed and wrote the approved design to `docs/superpowers/specs/2026-11-13-butt-lab-reader-platform-design.md`.
- Ran a fresh-reader self-review. Tightened family/variant scope, record enums, all scoring rubrics, derivative rights, allowlist closure, audit links, deterministic export, security checks, and manual deployment gating.
- A second fresh-reader review found no remaining blocking issue. The specification now defines four separately gated implementation phases; the next plan is Phase 1 only.
- Final structural verification passed: all six method-family IDs, eight criterion rubrics, public boundary, rights states, hypothesis state, manual deployment gate, and Phase-1 scope are present. Placeholder and trailing-whitespace scans are clean after normalizing the metadata block.
- User approved an explicit invention-before-platform sequencing gate. Updated the design so Phase 2 completes all six method-family reviews before generating and approving the separate invention; Phase 3 reader-app work cannot begin until both are operator-approved.
- User prohibited automatic publication in all future automation. Added a provider-neutral research-automation seam that may generate a complete draft and independent AI review proposal but must always stop for explicit human approval before publication.
- User approved the written specification and both later amendments.
- Started the Phase-1-only implementation plan using the writing-plans workflow.
- Confirmed the repository has no current Node/TypeScript project; Node and npm are locally available. Existing Python registry tooling will remain separate.
- Wrote and self-reviewed `docs/superpowers/plans/2026-11-14-publication-content-contract.md`.
- Fixed incomplete rubric instructions, schema dependency cycles, unresolved relationship targets, fixture ambiguity, AI-note provenance, bundle self-hashing, stale fixture paths, task heading levels, and unavailable-shell-command assumptions.
- Final verification passed: `PLAN_VALIDATION_OK` (2,157 lines, 10 tasks, 69 steps, 136 balanced fences, no trailing whitespace), `TASK_STRUCTURE_OK`, `SPEC_COVERAGE_OK` for 24 shared requirements, and `git diff --check` with no errors.
- Recorded plan SHA-256 `50de9fd5a3e9e5116b7b9bc4f9d13f4afa034338a0a0d4f94a7d0c7fb8e41669`.
- Planning is complete. No implementation, dependency installation, commit, or publication occurred.
- Next: user chooses subagent-driven or inline execution; dependency installation still requires explicit approval during Task 1.

## 2026-11-14

- User selected Subagent-Driven execution and approved creating an isolated worktree plus the plan's package-local npm dependencies.
- The first long worktree path exposed Git's Windows path-length limit on archived research filenames. Enabled repository-local `core.longpaths` and created the isolated worktree at `C:\w\bpc` on branch `feat/publication-content-contract`.
- Verified the main checkout remains separate and the worktree starts at commit `d30adbaa32d66f6416c12988e6e66d6486e79876`.
- Baseline verification: `unittest` discovered no tests and `pytest` is unavailable; the repository's intended direct runner `python tests/test_validate_registry.py` completed all 23 tests successfully.
- No implementation file, dependency, commit, deployment, or publication has been created yet.
- Next: execute Task 1 test-first, install only the approved pinned dependencies under `tools/publication-contract`, and apply independent specification and code-quality reviews.
- Task 1 completed test-first in `C:\w\bpc`: created the isolated package, pinned `zod 4.6.7`, `yaml 2.9.1`, `typescript 5.9.3`, and `@types/node 24.19.2`, and added the CLI smoke-test shell.
- Task 1 specification review approved the exact package scripts and scope. Code-quality review identified and then verified the correction from `coverage` to `test:coverage`.
- Fresh controller verification passed: CLI smoke tests 2/2, TypeScript typecheck, all 23 legacy registry tests, and `git diff --check` (with only the normal Windows line-ending warning).
- No commit, merge, deployment, publication, or experiment was authorized or performed.
- Next: Task 2 defines the closed vocabularies, record and manifest schemas, and deterministic JSON Schema generation.
- Task 2 completed test-first with closed state vocabularies, strict record/manifest schemas, and deterministic draft-2020-12 JSON Schema generation.
- Specification review found and resolved non-normalized manifest paths, generated-schema constraint loss, and incomplete exact-enum tests. Code-quality review then found and resolved runtime/generated URL parity plus missing automated CLI generation coverage.
- Fresh controller verification passed: contract tests 8/8, CLI tests 3/3, typecheck, deterministic repeated schema hashes, all 23 legacy registry tests, and `git diff --check`.
- Task 2 is complete with no commit, merge, deployment, publication, or experiment.
- Next: Task 3 adds the eight approved rubric definitions and assessment-record states.
- Task 3 completed test-first with the complete eight-criterion rubric catalog, strict scored/unknown/not-applicable assessment records, and a third deterministic JSON Schema.
- A first spec-review prompt accidentally described different assessment fields and extra catalog metadata; re-review against the exact approved plan returned APPROVED. Independent code-quality review also returned APPROVED.
- Fresh controller verification passed: 18/18 package tests, TypeScript typecheck, exactly three generated schemas, all 23 legacy registry tests, and `git diff --check` with only the normal Windows line-ending warning.
- Task 3 is complete with no real method scoring, commit, merge, deployment, publication, or experiment.
- Next: Task 4 adds strict YAML/Markdown loading, canonical JSON and hashing, and fail-closed public-path/content policy.
- Task 4 completed test-first with stable diagnostics, strict YAML and Markdown loading, deterministic canonical JSON/SHA-256 helpers, path containment, namespace enforcement, and fail-closed URL/content policy.
- Quality review found and resolved alias and collection-key YAML collisions, structured conversion failures, entity- and backslash-obfuscated JavaScript links, raw HTML bypasses, integer-key JSON ordering, invalid JSON values, and non-authority HTTP(S) forms.
- Fresh controller verification passed: policy 29/29 with one permitted Windows symlink skip, full package 47/47 with the same skip, TypeScript typecheck, all 23 legacy registry tests, and `git diff --check` with only the normal Windows line-ending warning.
- Task 4 is complete with no Task-5 behavior, new dependency, commit, merge, deployment, publication, or experiment.
- Next: Task 5 enforces explicit manifest hashes and non-transitive allowlist closure while keeping the live manifest empty and default-deny.
- Task 5 implemented explicit, non-transitive, hash-verified closure using one captured byte snapshot per listed file, immutable asset snapshots, canonical duplicate detection, passive asset types, and an empty default-deny live manifest.
- Specification review approved the Task-5 behavior after reference-definition coverage was tightened. Quality review then exposed a broader architectural limit: each regex fix for CommonMark created another missed valid construct or false positive in literal/code contexts.
- Per the debugging guardrail, stopped after repeated parser-boundary failures rather than adding another regex patch. Task 5 remains incomplete pending explicit approval for one package-local Markdown parser dependency and a token-based validator replacement.
- No commit, merge, deployment, publication, or experiment occurred.
- The user declined the proposed package-local `marked@18.2.0` dependency and chose to stop Task 5.
- The user then directed: leave Task 5 as-is and continue from Task 6. Task 5 therefore remains intentionally incomplete at its final quality gate, with the Markdown-parser blocker unresolved and recorded.
- Baseline re-verified before Task 6: full package suite 73 passed, 1 skipped, 0 failed.
- Task 6 dispatched to a fresh implementer in `C:\w\bpc` for cross-record scientific and rights invariants (relationship extraction, backlinks, semantic validation, deterministic fixture).
- No commit, merge, deployment, publication, or experiment occurred.
- The first Task-6 implementer hung: about 62 minutes elapsed with zero files written and no CPU movement, confirmed by disk listing and two process samples. It was instructed to stop and abandon the task, and a fresh implementer was dispatched with the full contract plus a collision pre-flight guard.
- Task 6 created `src/relationships.ts`, `src/semantic-validation.ts`, `tests/semantic.test.ts`, and extended `tests/helpers.ts`. No dependency installed, no commit, merge, deployment, publication, or Task 7/8 scope.
- Controller verification passed: focused semantic 35/35, full package 108 passed with the one pre-existing Windows symlink skip, typecheck clean, legacy Python 23/23, `git diff --check` exit 0, and live validate printing exactly `VALID records=0 pages=0 assets=0`.
- The specification-compliance review returned CHANGES_REQUIRED with one blocking finding: the quantitative-basis rule skipped any number with six or more digits, so large magnitudes were never flagged, while labelled references such as "Figure 2" and "Section 3" were over-flagged despite the plan exempting source identifiers. Two advisories were also raised: the numeric helper was exported beyond the stated public API, and the labelled-reference over-enforcement.
- The blocking finding and both advisories were returned to the same implementer for a test-first fix, with the specification review to be re-run afterwards.
- Round-one fix replaced the digit-count exemption with shape-based identifier recognition (identifier token, prefixed document number, reference label, bare year, calendar date) and made the numeric helper module-private so the semantic module exports exactly its two documented symbols.
- The specification re-review returned APPROVED after independently re-testing the flagged and exempt numeric cases against the real code. Controller verification passed again: focused semantic 42/42, full package 115 passed with the one pre-existing Windows symlink skip, typecheck clean, legacy Python 23/23, and live validate exactly `VALID records=0 pages=0 assets=0`.
- The code-quality review then returned CHANGES_REQUIRED with six Important fail-open findings: a bare-year exemption that swallowed a real quantity, an unanchored identifier exemption, a reference-label exemption that ignored a following unit, relationship targets accepted with the wrong kind, twelve fail-closed branches with no test, and a "never throws" contract that was not upheld plus a repository-local path list that was out of sync with the real repository directories.
- All six were returned to the same implementer with a single structural fix: a unit-bearing-quantity detector that runs before every exemption, so a number followed by a unit is always a magnitude. The finding set also adds a new stable code for listed-but-wrong-kind targets, reuses the existing schema code for shape problems, completes the repository-local path list from the real tree, and adds the twelve missing fail-closed tests.
- The hardening round landed test-first: RED showed 67 tests with 15 failing on the new cases; GREEN is 68 focused semantic tests, 0 failures.
- Controller verification re-run from `C:\w\bpc`: focused semantic 68 tests / 68 pass / 0 fail; full package 142 tests / 141 pass / 0 fail / 1 skipped (pre-existing Windows symlink skip); typecheck exit 0; legacy Python exit 0 with 23 tests passing; live validate exactly `VALID records=0 pages=0 assets=0` exit 0; `git diff --check` exit 0; working tree shows only the pre-existing `.gitignore` modification plus untracked `publication/` and `tools/`.
- One new diagnostic code, `RELATIONSHIP_TARGET_KIND_MISMATCH`, was introduced for listed-but-wrong-kind targets and is pending specification sign-off. The sixteen mandatory codes are unchanged.
- Specification re-review and code-quality re-review were dispatched concurrently and are in flight.
- No commit, merge, deployment, publication, or experiment occurred.

## 2026-11-16 — Batch-02 desk cycle: nine deliverables written; checkpoint recorded

- Phase 11 (batch-02 desk cycle) is complete. Nine deliverables were written in the main checkout under `reports/batch-02/`: seven method-family explanations (`methods/f0-staged-washing.md`, `f1-mechanical-physical.md`, `f2-thermal.md`, `f3-chemical.md`, `f4-biological.md`, `f5-material-incorporation.md`, `f6-product-routes.md`), the invention sketch (`invention.md`), and the Egypt annex (`egypt-annex.md`).
- Each method-family document covers overview, mechanism, feedstock requirements, contaminant fate, energy and water use, product quality, regulatory status, cost signals, evidence quality, four-field sink accounting, and a bottom line, with 6-8 inline gap-closing notes marking where source evidence is missing rather than filled by invention.
- The invention sketch concludes that every family fails at least one of the four sink fields, keeps the metals stop-condition in force, performed no novelty or patentability search, and is proposed rather than accepted. The Egypt annex records unvalidated observations only and makes no recommendations.
- Execution was a single AI pass with no three-model panel and no judge packet, following `specs/batch-02-launch-plan.md` (v1.0). No new retrieval was performed; the evidence basis was the accepted batch-01 Stage-5 synthesis, the gap-closing evidence, `registry/methods.yaml`, and the Stage-2 source reconstructions.
- Guardrails held throughout: no experiment run or authorized, no clean / detoxified / safe / commercially validated / environmentally superior claim, no novelty or patentability claim, and no operator acceptance given on the operator's behalf.
- Checkpoint records updated: `state/workflow.yaml` gained a `batch_02:` block (status `complete_pending_operator_decision`) ahead of the final `permissions:` block, with batch-01 history left untouched; `state/session-log.md` gained a 2026-11-16 entry; `task_plan.md` gained Phase 11 (complete) and Phase 12 (checkpoint recording).
- Verification: `state/workflow.yaml` parses as valid YAML; all nine deliverable paths and the launch-plan path exist on disk; batch-01 stages 1-5 and the `gap_closing` section remain intact.
- Phase 10 is finished in the isolated worktree `C:\w\bpc` and was committed locally as `784bb14 feat: add publication content contract` (local only, no push).
- No commit, merge, deployment, publication, or experiment occurred. The accept/reject desk-record decision on the nine deliverables belongs to the operator.

## 2026-11-16 — Batch-02 findings recorded durably; handoff brief for the evidence-gap work

- The operator asked that the batch-02 findings be recorded and the current-state files updated, because the files will be uploaded to another AI to start work on the evidence gaps.
- The finding recorded: across all seven method families the same evidence gaps recur — no dry-mass basis, no analyte-resolved contaminant fate, no leaching data, and no use-specific performance evidence. Every family fails at least one of the four required sink fields, so the invention sketch starts from a measurement plan rather than a process claim. The metals stop-condition remains in force.
- Deliverable added: `reports/batch-02/HANDOFF-BRIEF.md` (a cold-readable brief carrying the authority chain, the accepted batch-01 evidence base, the nine batch-02 deliverables, the central finding, the four-field sink requirement, the numbered M/R/S gap agenda, the evidence vocabulary and gap-closing-note convention, the single-AI-execution limitation, and an explicit may-do / may-not-do boundary).
- The brief's boundary is deliberate: the receiving AI may retrieve evidence, extend gap-closing work, and draft measurement and pilot plans as proposals. Closing a measurement gap requires an authorized experiment that does not exist, so the correct output per gap is a proposed measurement with its decisive test named.
- `state/workflow.yaml` `batch_02:` block now lists the handoff brief as a deliverable, records `handoff_brief: reports/batch-02/HANDOFF-BRIEF.md`, and restates the central finding in `outcome`. The file re-parses as valid YAML and every deliverable path still resolves.
- `state/session-log.md` gained a 2026-11-16 addendum entry naming the handoff brief.
- A second honesty point carried into the record: batch-02 ran as single-AI execution with no three-model panel and no judge packet, so the independent-review and dissent machinery batch-01 had is absent and the in-document guardrails carry the entire epistemic load. Any receiving agent should treat these as desk conclusions from one model, not as panel-validated findings.
- No commit, merge, deployment, publication, or experiment occurred. No scientific content was approved. The operator's accept/reject desk-record decision on the batch-02 deliverables is still theirs.

## 2026-11-16 — Phase-14 evidence-gap continuation: M01 measurement-plan proposal recorded (desk-only)

**What was done.** Read `reports/batch-02/HANDOFF-BRIEF.md` and `state/workflow.yaml`, then continued the evidence-gap work as the operator directed — desk only. The first unit is an unvalidated M01 measurement-plan proposal.

**Outputs.**
- `reports/batch-02/evidence-gaps/M01-feed-partition-measurement-plan.md` (39 224 B) — the M01 proposal: question and estimand; an explicit measurement model with units and the independent whole-butt reference that makes the unresolved residual a genuine closure check; the experimental unit (the butt) with fraction/preparation/determination nested inside it and the pseudoreplication guard stated; a randomized complete block design blocked on the feed lot with a full nuisance-factor table; the accepted analyte panel; the analytical quality-control requirements; a GUM uncertainty budget with per-input distribution and degrees of freedom; the controlling-fraction decision rule with two honest-negative cases; seven falsifiers; and a six-gate sample-size decision procedure.
- `reports/batch-02/evidence-gaps/README.md` (4 258 B) — the series index, with the may-do / may-not-do boundary restated.

**What the proposal deliberately does not do.** It selects no sample count, no acceptance criterion, no detection or quantitation limit, no recovery figure and no method-performance value; each stays `parameter-not-located` pending a qualified-lab feasibility study and a defensible power/precision justification. The minimum important difference in partition fraction is defined procedurally and left to the investigators before feasibility data are examined. It gives no operating instructions, runs no experiment, collects no sample, handles no material, measures nothing, and reports no result.

**Guardrails held.** Metals stop-condition in force. Four-field sink unchanged — M01 bears on fields 1 and 2 only, at the feed boundary. M02–M08, R01–R05, S01–S06 untouched. Dissent preserved: a redirect of the burden-bearing fraction would redirect which family deserves attention, not refute any family. Prior-art awareness only; no novelty claim. `batch_02.status` unchanged at `complete_pending_operator_decision` — this continuation does not accept the batch-02 deliverables on the operator's behalf.

**Verification.** `state/workflow.yaml` parses as valid YAML (`YAML_OK`); top-level keys now include `evidence_gap_continuation` between `batch_02` and `permissions`. `batch_02.status: complete_pending_operator_decision`, `batch_02.deliverables_count: 10`, all ten batch-02 paths resolve. The new block records 8 guardrails and 4 open decisions, and both new deliverable paths exist on disk. Batch-01 history intact: `stages` keys 1–5, `gap_closing.status: complete_scoped`, `legacy.preserved_queue: state/work-queue.yaml`, the batch-01 `checkpoint:` block untouched (`last_run: '2026-11-12'`). `permissions.experiments: not authorized`. `state/session-log.md` appended with CRLF preserved (CR=482, LF=482, LONE_LF=0).

**Retrieval.** One call in this unit: the arXiv metadata lookup required by the citation rule of the design, power, analytical-validation and uncertainty skills. It returned no evidence about cigarette-butt recycling and closed no gap. `retrieval_calls_used: 1` of 24.

**Remaining.** M01 is open — a file is not a measurement. The proposal names the decisions it cannot make: the minimum important difference; the feasibility sub-study that produces the between-butt and between-block variability and the matrix-specific analytical precision; the pre-specified fraction definitions and fines aperture; and the laboratory's analytical target profile. The batch-01 hash-normalization provenance follow-up stays open. The batch-02 accept/reject desk-record decision remains the operator's alone.

**Next step.** Wait for the operator's direction on the next gap proposal (the M01 feasibility sub-study specification, or M02 onward). No commit in the main checkout. No experiment, pilot, reader application, publication, merge, deployment or push — each separately unauthorized. No scientific content approved and no publication occurred.

## 2026-11-16 — Phase-15 evidence-gap continuation: M01 Gate-A feasibility sub-study specification recorded (desk-only)

**Unit:** Phase 15 of the desk-only evidence-gap continuation. **No experiment was run or authorized, no sample was collected, no material was handled and no measurement was made.**

### Output

`reports/batch-02/evidence-gaps/M01-gate-a-feasibility-sub-study-specification.md` — the specification for the first step of the M01 plan's sample-size gate (Gate A), plus an updated index row and a record table in `reports/batch-02/evidence-gaps/README.md`.

### What it contains

- **Six planning quantities** Gate A must produce, each as an estimate with an interval: between-butt SD of the partition fraction; within-butt preparation and analytical SD; the between-block variance component; dry-matter closure and separation recovery with uncertainties; censoring frequency per matrix and fraction; the observed spread of moisture and storage interval.
- **A design able to estimate them:** the **butt** as experimental unit; **feed lot** as block; **day, analyst and instrument crossed** with butt so between-day precision is estimable and unconfounded; storage interval deliberately varied so moisture and storage spread are estimated rather than assumed; the **analysis scale** fixed per analyte before data exist; the fraction set pre-specified with a pre-specified **sensitivity aperture**.
- **Six probes** with quality controls and uncertainty treatment: separation recovery and mass closure; dry-matter determination; matrix spike recovery; per-matrix detection and quantitation limits with a named approach and a confirmation; between-day precision reported separately from within-day; carryover, blanks and run-order.
- **Seven pre-stated decision rules (R1–R7) and eight falsifiers (F1–F8)**, fixed before any data could exist.
- **The honest outcome the study is allowed to produce:** *"the measurement system cannot support M01 as currently framed."* No rule compares the feasibility intervals against the M01 question, because the precision target and the minimum important difference are decided afterwards — that separation is deliberate, and it keeps the sample size from being chosen after the data are seen.
- **The seven items only a qualified laboratory can supply**, including the analytical target profile that supplies the acceptance ranges the decision rules test against, and the facility, risk assessment and lawful contaminated-waste handling.

### The idea worth carrying forward

The feed is both the object of interest and the source of the answer. That makes a "the filter fraction dominates" impression potentially a **method artefact** — fines loss, carryover, matrix suppression — rather than a property of cigarette-butt feed. Every probe is therefore paired with the control that would expose the artefact, and the falsifier list is written in terms of results that would invalidate the study rather than results that would answer M01. This is a structural hazard for the whole feed-partitioning question, not just for Gate A.

### Guardrails held

No sample count, recovery figure, acceptance limit, detection or quantitation limit, threshold or expected value was selected — all remain `parameter-not-located`. The structural minimums recorded (at least two lots, two days, two independent preparations, two injections, two butts per lot per analysis day) are **identifiability requirements**, not sample-size recommendations. No operating instructions, no sample-preparation recipe, no separation protocol, no hazardous-processing guidance. The metals stop-condition remains in force; the four-field sink requirement is unchanged; dissent preserved; prior-art awareness only. No number was inherited from the batch-01 worker reports.

### Verification

`state/workflow.yaml` parses as valid YAML. `evidence_gap_continuation.phase: 15`; deliverables now three paths; guardrails extended with three Phase-15 gates; outcome rewritten for two proposals; open decisions rewritten to five. `batch_02.status` unchanged at `complete_pending_operator_decision`; all ten batch-02 deliverables still resolve; batch-01 `checkpoint:` and `stages:` 1–5 unchanged; `permissions.experiments: not authorized` unchanged. `state/session-log.md` appended in CRLF (CR=544, LF=544, no lone LF). `git status --short` shows only the expected modified state and planning files plus the untracked evidence-gaps folder. **No commit, no staging, no merge, no push.**

### Remaining work / next action

M01 remains open — two files are not a measurement, and no sample count exists. Five decisions stand open and none of them is this project's to make: the minimum important difference, the precision target, the fraction definitions and fines aperture, the analytical target profile, and whether to authorize any laboratory work at all. M02–M08, R01–R05 and S01–S06 are untouched. The operator's accept/reject desk-record decision on the batch-02 deliverables remains outstanding and is not made here; committing this continuation in the main checkout is a separate operator decision. Next: await the operator's direction on the next gap proposal (M02 onward) or on the decisions above.
