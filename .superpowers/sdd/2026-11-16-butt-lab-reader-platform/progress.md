# SDD ledger — plan: docs/superpowers/plans/2026-11-16-butt-lab-reader-platform.md

Branch: `feat/reader-platform` in worktree `C:\w\rp`. Base: `main` @ `3d76367` + content contract `4ed09b0`.
Authorization: operator "full force auto" — build the layer/app/CI/release-prep on a branch. NOT authorized: merge, push, deploy, publish, experiment, or accepting batch-02 on the operator's behalf.

Pre-flight: shared interfaces —
- T1 (contract schemas) → T2/T3 (publication records). T1 must fix every schema gap before T2/T3 records exist, or T2/T3 records will be authored against a moving target. Ruling: T1 completes and commits before T2 starts.
- T2 (method records) → T3 (sources/terms/pages/manifest). T2 claims reference source IDs that T3 creates. Ruling: T3's source IDs are reserved in T2 by name; the manifest is written only in T3.
- T3 (manifest + export) → T4 (reader app). The app renders the exported bundle, not the source YAML. Ruling: T4 consumes the exported bundle only.
- T5 (CI) → T4 (build output) and T6 (approval record). Ruling: T5 reads the same export/build commands as T4.
- No conflicts between T1, T2 and T6 beyond the above.

## Tasks

### Task 1: Reconcile the contract with the design — complete

Audit recorded in `docs/publication-content-contract.md` §11. Four design rules confirmed already enforced (approved-only manifest listing; non-transitive inclusion; manifest-derived output closure; the local-artifact rights rule). Two fixed test-first: `ASSESSMENT_DUPLICATE_CRITERION` / `ASSESSMENT_CRITERION_MISSING` added across the loaded record set, and two named export tests that now prove the local-artifact rights rule with a correct asset hash. One minor deferred and recorded. Committed `a7319df`.

Task 1: Ruling: the local-artifact rights rule was already enforced — the defect was test quality, because a placeholder asset hash made the export fail on the hash before the rights branch could fire, so no production code changed — cost if wrong: one extra test-only change.
Task 1: Ruling: the content-kind drift guard and deriving the claim enum from `CONTENT_KINDS` were deferred as a characterization test of existing behaviour plus a behaviour-preserving refactor, because the generated schema already contains exactly the five canonical kinds — cost if wrong: a content kind added to the canonical constant later could fail to reach the generated schema.
Task 1: Ruling: the operator's "full force auto" instruction authorizes building the layer, the application, the CI build and the release preparation on a branch with everything recorded; it does not authorize merge, push, deployment, publication, an experiment, or accepting batch-02 on the operator's behalf — cost if wrong: work completed ahead of a gate the operator wanted to hold.
Task 1: Ruling: the operator's review model (external readers and an optional AI second layer critique after publication) differs from design sections 12.5 and 14.5; accepted and mitigated inside the artifact by making evidence states, dissent, unknowns and the audit drawer reader-visible, while retaining the section 12.7 deployment gate because deployment is an action and not a review — cost if wrong: the site reaches the public before a human has read the science, which is the operator's stated intent but leaves the risk with them.
Final: minor (deferred): derive the claim content-kind enum from `CONTENT_KINDS` in `src/model/records.ts` and add a generated-schema union drift guard.

Task 1: complete (commits 4ed09b0..a7319df, tests: npm test → 189 tests, 188 pass, 1 skipped, 0 fail)

