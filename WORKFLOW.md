# Five-stage controller and resume protocol

This is file-directed AI work, not a deployed scheduler or multi-model API integration. Operator triggers a working session once; AUTO chooses subsequent units until a gate/limit. Host approvals still govern external writes.

## State and checkpoints
state/workflow.yaml is authoritative. Old state/work-queue.yaml/progress.md remain historical. Imported specs, source audit, comparison and H1-H3 are drafts, not accepted panels. Initial stage: 1 scope extension; Stage 2 partial; Stages 3-5 pending.

Unit statuses: pending/in_progress/complete_bounded/blocked. Stage statuses: in_progress/partial/complete_scoped/awaiting_manual/accepted/desk_complete. Checkpoint actual outputs/source attempts, remaining questions, next action, actor and run. Reconcile files on resume; a dangling in_progress unit resumes, missing promised outputs are a discrepancy, and uncommitted local changes are not assumed visible elsewhere. Never overwrite partial human work. Preserve unknowns rather than fabricate closure.

## Stage 1: Harvester, AUTO
Reuse existing landscape. Complete H01 company-source map, H02 actual coverage ledger, H03 selected batch/lead index. Include Code Effort, TerraCycle and other charter leads even without patents; follow credible new operators. Log real languages/backends/queries, public process/test details, access failures, duplicates and deferred work. Do not repeat already completed searches merely to inflate effort.
Outputs: reports/stage1/company-source-map.md; reports/stage1/coverage-ledger.md; reports/stage1/batch-selection.md. Selected leads must be traceable or explicitly inaccessible; scope/coverage limits and collector/processor distinctions must be clear. No record quota or worldwide-exhaustion claim. Once outputs pass these checks mark complete_scoped and continue directly to Stage 2 if capacity remains.

## Stage 2: Deep-dive, AUTO
Reconstruct selected source families AND company workflows to their public-evidence limits. Reuse/version existing specs. Separate disclosed steps/conditions, equipment functions, inputs/products/waste, measurements/limits, unknowns and reasoned hypothetical gap filling. A source-limited company dossier is acceptable, not a complete process claim.
Outputs: reports/stage2/reconstruction-index.md; reports/stage2/assumption-and-gap-ledger.md; new/versioned specs linked by index; packets/batch-01/stage-3/manifest.yaml. Gate: selected batch addressed, inherited conflicts/unknowns carried explicitly, waste/safety questions retained, common panel question/schema and packet ready.
Freeze manifest paths/content hashes and source URLs/extracts. Until approved persistence, label it draft with file hashes/proposed patch, not an invented commit. Launch waits for a saved operator-approved snapshot. Mark Stage 2 complete_scoped, Stage 3 awaiting_manual; STOP_AUTO and present the fixed panel instructions.

## Stage 3: Red-team, manual launch
Follow FUSION_PROTOCOL.md. Frozen packet -> separate A/B/C reports -> judge. Worker A chemistry/material interpretation; B contaminants/exposure/assays/waste; C integration/balances/energy/cost/scaling; each still reviews the whole question. One report closes only one slot.
IMPORT checks supplied file paths, packet versions and provenance. All three raw reports plus judge and actual operator acceptance are required. The worker/judge cannot invent that acceptance; approving file persistence alone is not scientific gate acceptance. Reduced-panel/diversity/version exceptions need explicit operator decisions and limitations.
If revisions are required, create a targeted unit/new round, not a full restart. Default maximum two revision rounds before another operator decision. After Stage 3 accepted, AUTO prepares packets/batch-01/stage-4/manifest.yaml from evidence plus fused critique/rejection reasons, marks Stage 4 awaiting_manual and STOP_AUTO. Never run inventors inside AUTO.

## Stage 4: Inventor, manual launch
Three separate proposal sets plus judge, same frozen evidence/critique/gaps; H1-H3 are seeds, not winners. Preserve original ideas; judge-created hybrids remain hypotheses. Judge portfolio must retain evidence/assumptions, failure modes, falsifiers, measurements and an adversarial screen. Material unresolved chemistry/safety decisions may require targeted re-review, not silent clearance.
Gate: A/B/C, judge, matching packet and explicit operator acceptance, with no blocking decision. Then AUTO may run Stage 5 without a new task-specific prompt.

## Stage 5: Synthesizer, AUTO
One worker produces reports/final/batch-01-synthesis.md and reports/final/validation-and-open-questions.md. Include candidates/alternatives, sourced versus hypothetical claims, streams/diagrams, real symbolic/executed calculations and limits, equipment/equal-performance DIY options, residues/emissions, intended-product criteria and legal/open-source/qualified-lab questions. Preserve dissent and unknowns. Do bounded calculations only with explicit assumptions/tests, never invented numbers. Final gate: files/traceability/limits, not a fake perfect method. Mark desk_complete and STOP_COMPLETE; physical validation remains separate.

## Budget and interruption
Checkpoint every unit and before context/quota/tool limits; normally AUTO continues across Stage 1/2/5 units. Default session ceiling: 24 retrieval/search calls. On limit save paused_resource or a precise blocker and next action. Another provider resumes the same role. If writing is unavailable return CHECKPOINT.md/output patch for transfer; only saved/imported work counts next time. Nothing guarantees a hosted session survives closing or runs unattended indefinitely.
