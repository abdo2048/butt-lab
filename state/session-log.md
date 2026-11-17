# Session log — active

This is the **active** session log for the current phase of the project. It is appended
to as work proceeds, and it is the place a fresh session looks for "what just happened,
what is proved, and what is next".

The earlier, longer session log (2026-11-12 → 2026-11-17, before the surgical edits)
is frozen history at `docs/history/session-log.md`. It is never edited and never
extended; it stays readable as provenance.

Format: one dated heading per working session, newest at the bottom. Every entry
records what was done, what was proved, what remains, and the next action.

---

## 2026-11-17 — Phase A: the three operator-approved surgical edits

**Done.** The history files were frozen under `docs/history/` with `git mv` (the
session log, `findings.md`, `progress.md`, `task_plan.md`, the superpowers plan and
spec directories, and the SDD ledger), and the pre-slim `state/workflow.yaml` was
archived as `docs/history/workflow-state-2026-11-17.yaml`. `state/workflow.yaml` was
rewritten as current state only: 16 top-level keys, no `checkpoint:`, no `legacy:`,
no `stages:`. The root `README.md` was rewritten for a reader and the root `AGENTS.md`
refined for an AI, both pointing at `charter.md`, `state/workflow.yaml` and
`PROJECT-OVERVIEW.md`. Every live cross-reference to a moved path was updated in the
same commit.

**Proved.** The operator's authority facts survive verbatim: `permissions.experiments.status`
is `ai_designed_only`, `ai_may` has 4 entries, `ai_must_not` has 2, `physical_execution.status`
is `not arranged`, and `permissions.ai_role` is `scientist-inventor` with 5 labels. The
publication contract suite is unchanged at 206 tests / 205 pass / 1 skipped / 0 fail,
and `npm run validate` still reports `VALID records=134 pages=10 assets=0`.

**Commit.** `8aedc35`, pushed to `origin/feat/reader-platform`.

---

## 2026-11-17 — Phase B: Task 4, the reader application

**Done.** `tools/reader-site/` was built: Astro 7 + Pagefind, 12 designed routes
rendering as 28 static pages, a self-hosted type stack, a design-token stylesheet, and
a client script limited to comparison sorting and filtering. `scripts/build-content.ts`
verifies every hash in the bundle manifest before staging and writes nothing when
verification fails, so the site can only ever render what passed publication
validation. The exported bundle is the site's only input; the source YAML is never
read.

**Two defects the tests found and fixed.**

1. The comparison sorting was silently dead in the built site: `<script is:inline>`
   emitted the expression `{JSON.stringify(orders)}` verbatim instead of the JSON, so
   the client parser threw and the page never sorted. Fixed with `set:html`.
2. The print block carried raw colour literals (`#000`, `#fff`, and `transparent`,
   which the minifier rewrites to `#0000`), breaking the rule that every colour is a
   custom property. Fixed by adding `--print-ink`, `--print-paper` and `--transparent`
   to the token file.

**Two test assertions were refined, with the reasons recorded in `docs/BUILD-PLAN.md`:**
the repository-path scan matched the tail of ordinary `https://` URLs, and the
colour-literal scan matched Pagefind's own vendored stylesheet, which this site does
not author or link.

**Proved.** Reader suite: 113 tests, 113 pass, 0 fail. `tsc --noEmit` clean. The built
output contains no repository-local path, no session-log reference and no credential.
Pagefind indexed 28 pages / 2056 words. The comparison page is complete and sortable
without any client JavaScript.

**Dependency advisory, disclosed.** Every `npm audit` finding chains to one upstream
advisory: picomatch ReDoS, `GHSA-fc5q-39xc-vjpf`, affecting every published version up
to and including 4.0.7, so no fixed release exists. It is a build-time dependency and
is not shipped in the static artifact. An npm override was tried and removed because
it bought no security.

**Commit.** `e9885b5`, pushed to `origin/feat/reader-platform`.

---

## 2026-11-17 — Phase C: the release gate

**Done.** `scripts/build-artifact.ts` assembles a content-addressed artifact: the
built site plus the bundle manifest plus an `artifact-manifest.json` listing every
file with its hash. The artifact's identity is the sha256 of that manifest, so any
changed, added or removed byte changes the artifact hash. `scripts/verify-approval.ts`
compares the operator's approval record, the deployment request, the artifact
manifest and the artifact's actual bytes, and refuses on any mismatch — a missing
approval, a different commit, a different publication version, a different build run,
a different artifact hash, a changed file, or a smuggled-in extra file.

`.github/workflows/build.yml` builds and validates and uploads an artifact. It
contains no deploy step, no Cloudflare reference and no secret. It cannot deploy.

`.github/workflows/deploy.yml` runs only on `workflow_dispatch`, downloads exactly the
approved artifact, verifies it against the approval record, and only then runs
`npx wrangler deploy`. The operator approval file `operator/deployment-approval.json`
does not exist, so the gate refuses every deployment until the operator creates it.

**Proved.** 14 release tests and the full 113-test reader suite pass; typecheck clean.
The publication contract also grew a test for the hole the new workflows opened (a
derivative path or a publication input could have pointed into `.github/`), and now
reads 207 tests / 206 pass / 1 skipped / 0 fail with
`VALID records=134 pages=10 assets=0`.

**Commit.** `f8608af`, pushed to `origin/feat/reader-platform`.

**Remaining.** `wrangler.jsonc` and `docs/DEPLOY.md` with the manual Cloudflare Workers
steps; the release-preparation checklist; the final verification run; then the
operator's release decision. Deployment remains unauthorized.

**Next action.** Write `wrangler.jsonc` and the manual deployment guide, write the
release-prep checklist, update `docs/BUILD-PLAN.md` and `state/workflow.yaml`, then
commit and push.

---

## 2026-11-17 — Checkpoint

**State.** The knowledge base is complete (30 registry methods, 134 approved published
records, 10 pages, 3 invention hypotheses). The reader website is built and verified.
The release gate refuses every deployment until the operator approves one exact
artifact.

**Next action.** Phase C finish (wrangler config + manual deploy guide), then Phase D
(release preparation and the acceptance gate), then Phase E (hosting, on the operator's
explicit go-ahead). Nothing is deployed, published, or experimentally validated.
