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

## 2026-11-18 — Phase C finish: the hosting configuration and the manual guide

**Operator decisions, taken 2026-11-18.** The Worker is named `butt-lab`. The operator
runs the deployment by hand from the guide; the agent prepares and dry-runs but never
publishes. `wrangler` may be pinned as an exact devDependency.

**Done.** `tools/reader-site/wrangler.jsonc` configures an assets-only Worker named
`butt-lab` serving `./dist` on `workers.dev`. `docs/DEPLOY.md` gives the operator
eleven numbered steps — install, login, build, package the artifact, write the
approval, write the request, verify the gate, stage the approved bytes, deploy, read
the URL, redeploy, rollback — plus a troubleshooting table and the GitHub-Actions
alternative, all written from the real `wrangler --help` output of the pinned 4.164.0.
`operator/deployment-approval.template.json` holds placeholders only. `deploy.yml` now
stages `artifact/site` into `dist` before the deploy command and never rebuilds, so
the published bytes are exactly the bytes that were approved.

**One real error caught by the tool, not by reading.** The first config declared an
asset binding; `wrangler deploy --dry-run` refused it with "Cannot use assets with a
binding in an assets-only Worker." The binding was removed and the test that encoded
it was corrected to assert its absence. The dry run then exited 0: "Read 121 files
from the assets directory", "--dry-run: exiting now" — nothing was uploaded.

**Proved.** The new `tests/deploy-config.test.ts` was written first and watched fail
(6 of 7 failing) before any config existed; it now passes 7/7. Full reader suite
**120 tests / 120 pass / 0 fail**; `npx tsc --noEmit` clean. `npm audit` still reports
the same 10 high findings, all the one picomatch advisory — no new advisory from
wrangler.

**Deferred finding.** The Astro build produces no `404.html`, so unmatched paths get
Cloudflare's default 404 response. A branded 404 page is new scope and is carried to
the release checklist as the operator's decision, not slipped in.

**Next action.** Phase D: the release-preparation checklist — the full validation
suite, the rights and exposure audit, the scientific review rehearsal, the
accessibility and responsive checks, the local preview — then the operator's single
approve-this-commit-or-not decision, then Phase E (hosting, by hand).

---

## 2026-11-17 — Checkpoint

**State.** The knowledge base is complete (30 registry methods, 134 approved published
records, 10 pages, 3 invention hypotheses). The reader website is built and verified.
The release gate refuses every deployment until the operator approves one exact
artifact.

**Next action.** Phase C finish (wrangler config + manual deploy guide), then Phase D
(release preparation and the acceptance gate), then Phase E (hosting, on the operator's
explicit go-ahead). Nothing is deployed, published, or experimentally validated.

---

## 2026-11-18 — Phase D: release preparation and the acceptance gate

**Done.** The release preparation is complete and recorded in `docs/RELEASE-CHECKLIST.md`.

The checks are repository code, not a manual scan: `tools/reader-site/scripts/release-audit.ts`
(with `tests/release-audit.test.ts`, 24 tests) audits exposure, rights, scientific
discipline, declarations and accessibility over the real build, and CI runs it
(`npm run audit:release`).

**Two real defects were found and fixed, both test-first.**

1. **Contrast.** The first real audit run failed with 9 blocking `CONTRAST_BELOW_AA`
   findings, all at 3.30:1 — `--ink-faint` was used for small text in nine rules. Fixed
   in `src/styles/tokens.css`: `--ink-faint` → `#5b6470`, `--ink-muted` → `#4f5a66`,
   keeping the type hierarchy and clearing AA on every paper surface.
2. **Search.** Driving the live preview showed the search form reporting that search
   was unavailable. The cause was measured: Pagefind returns `results` as a plain array
   of items each with its own `data()` promise, so the old `results.slice(...).data()`
   threw and the catch branch swallowed it. Fixed by moving the logic into
   `src/lib/search.ts` and `src/scripts/search.ts` (8 new tests, RED first) and
   replacing the inline script in `BaseLayout.astro` with a bundled one that keeps the
   Pagefind module lazily imported. Proven in the browser: "aluminium" → 28 page(s)
   match with 12 links and 12 excerpts; "zzzqqq" → No page matches, 0 links.

**Browser evidence.** No console errors. Keyboard-only traversal reached the skip link,
the brand, the search field and button and the six primary navigation links, each with a
visible focus outline; the skip link moved focus into the main region. Right-to-left and
360-pixel layouts produced no horizontal overflow. Lighthouse on `/methods/`: accessibility
1.0, best practices 1.0, SEO 1.0, zero failures. The preview server was stopped and the
temporary harness file removed.

**The scientific review rehearsal** is recorded over all 134 published records: 12
sources (all `link-only`, none carrying derivatives), 10 terms, 3 hypotheses (all
`new-unvalidated-hypothesis`), 6 method families, 48 assessments (41 scored with a
rationale, 7 unknown with a reason, all basis `inference`), 37 claims, 17 gaps (all
`requires-human-validation`) and 1 material. Structured dissent is empty — 0
`conflictingClaimIds` and 0 `counterevidenceClaimIds` — while dissent lives in prose
(failure modes, falsifiers, unknown reasons, unresolved questions); that is recorded as a
gap in representation, not filled in by the agent. All 88 reviewer strings say "no human
sign-off recorded".

**Proved.** Reader suite **152 tests / 152 pass / 0 fail / 0 skipped**; `npx tsc
--noEmit` clean; `npm run build` exit 0 with 28 pages and 2056 indexed words;
`npm run audit:release` → `AUDIT records=134 findings=0 blocking=0 review=0 passed=true`.
Publication contract **207 tests / 206 pass / 1 skipped / 0 fail**;
`VALID records=134 pages=10 assets=0`; typecheck clean. Hosting dry run exit 0, reads 121
files, uploads nothing.

**Next action.** The operator's single decision: approve this exact commit for merge,
push and deployment, or not. Then Phase E — the operator runs `docs/DEPLOY.md` by hand.
The agent does not create `operator/deployment-approval.json`; the gate refuses every
deployment until the operator does. Nothing is deployed, published, or experimentally
validated.

**Release candidate.** The commit to approve is **`65d429f`** on `origin/feat/reader-platform`
— the Phase D commit. The commit that follows it only records this hash in the two state
files and changes no site byte, so the built site and the artifact hash are identical from
either commit. When packaging the artifact, set `SOURCE_COMMIT=65d429f` so that the
artifact manifest, the operator's approval record and `docs/RELEASE-CHECKLIST.md` all name
the same commit.

---

## 2026-11-18 — Phase D, the final whole-branch review and its fix pass

**What was reviewed.** A fresh-context reviewer read the whole branch
(`9f3ffff..1af6e38`) against `docs/BUILD-PLAN.md`, the reader-platform design
spec and `charter.md`. It had no graph access — the worktree is not indexed by
the knowledge graph (the only indexed project is an unrelated one) — so it read
and grepped the source directly. It changed no file.

**What it found: NOT READY — 1 Critical, 4 Important, 2 Minor.**

- **Critical.** The deploy workflow interpolated untrusted `workflow_dispatch`
  inputs into a shell heredoc. An input containing a newline and `EOF` could
  terminate the heredoc and run commands *before* the approval check, so the
  gate could be bypassed.
- **Important.** (1) The verifier never compared the artifact manifest's own
  `sourceCommit`/`publicationVersion` with the approval. (2) The exposure audit
  could report green while missing a path inside markup, an unquoted credential
  assignment, a `github_pat_` token, and any text file containing a NUL byte.
  (3) The shipped pages overstated the labelling guarantee while 77 of the 134
  records carry no evidence state. (4) The deploy workflow could not download
  its own cross-run artifact (`actions: read` missing).
- **Minor.** Markdown emphasis rendered literally in list items (105 built
  lines); 24 pages repeated the site suffix in their `<title>`.

**What was fixed, test-first.** `tools/reader-site/tests/release-review.test.ts`
(20 tests) was written first and watched fail with `ERR_MODULE_NOT_FOUND`. The
heredoc is gone: the inputs reach a new `scripts/deployment-request.ts` only
through `env:`, it validates them against strict patterns and writes the
request with `JSON.stringify`. The verifier now refuses an artifact whose
manifest names another commit or publication version. The audit's patterns were
widened and the NUL-byte skip removed; the one false positive (a coincidental
`a:/` inside a compressed Pagefind fragment) was fixed by requiring a real path
character after the drive separator, not by suppressing the file. The page
text, the site footer and the README now state exactly what carries an
evidence state and what carries a role instead. `actions: read` was granted.
The two minors were fixed rather than deferred, because both were visible to
every reader.

**A wrong assumption, corrected.** The publication-layer generator is
`tools/publication-contract/scripts/build-publication-layer.mjs`; my first
attempt used a non-existent root-level path and failed with `MODULE_NOT_FOUND`.
The layer was then regenerated from `layer-data/`, exported, and the site
rebuilt from the exported bundle.

**Proved on the fixed tree.** Reader site: **172 tests / 172 pass / 0 fail /
0 skipped**; `npx tsc --noEmit` clean; `npm run build` exit 0 with 28 pages and
2058 indexed words; `npm run audit:release` → `AUDIT records=134 findings=0
blocking=0 review=0 passed=true`. Publication contract: **207 tests / 206 pass
/ 1 skipped (Windows symlink) / 0 fail**; `npm run validate` →
`VALID records=134 pages=10 assets=0`.

**Next action.** Commit and push the fix pass, record that commit as the new
release candidate, and put one decision to the operator: approve that exact
commit, or not. The agent does not create `operator/deployment-approval.json`.
Nothing is deployed, published, or experimentally validated.

## 2026-11-18 — Phase E preparation

**What the operator decided.** In session on 2026-11-18 the operator approved the
release candidate and authorised the merge ("if you see its good to do the merge then
do it"), with one condition: "you write all stuff and all whats left to me is just run
wrangler steps myself". The approval record in `operator/deployment-approval.json`
transcribes that approval; the approver line can be re-signed by hand.

**Done.** `feat/reader-platform` was fast-forward merged into `main` (9f3ffff →
b3b53bd, identical tree). In the main checkout: `npm ci`, `npm run export`
(`EXPORTED version=batch-02-pilot records=134 pages=10 assets=0 files=14`),
`npm run build` (28 pages, Pagefind 28 pages / 2058 words). The artifact was packaged
as `ARTIFACT version=batch-02-pilot commit=1c0c402 files=90
sha256=deb8dde6824422cb11f5f25976a140082eddedd957d317c358198a2c6937a3f4`. The release
gate printed `APPROVED: commit=1c0c40254715de64177ff6e885f27cb12b619cfd
version=batch-02-pilot run=local artifact=deb8dde6…`. The approved bytes were staged
into `dist/` (89 files) and `npx wrangler deploy --dry-run` exited 0 — "Read 121 files",
"Total Upload: 0.31 KiB", "--dry-run: exiting now." Nothing was uploaded.

**One more real defect, found by running the command rather than reading it.** The
artifact builder was invoked with a source path pointing at the parent directory, which
holds no built site, so the CI artifact step and the manual step 4 were both broken.
Fixed test-first (`tools/reader-site/tests/artifact-packaging.test.ts`, 4 tests, the
first run failing on the missing `defaultSourceDir` export): the script resolves its own
source directory, finds the staged bundle manifest under `src/content/bundle/`, and
refuses a source with no built site or no bundle manifest. The reader suite is now 176
tests / 176 pass / 0 fail with a clean typecheck.

**What remains.** Two commands, run by the operator in `tools/reader-site`:
`npx wrangler login`, then `npx wrangler deploy`. The URL will be
`https://butt-lab.<your-workers-subdomain>.workers.dev`. Nothing is online until then.
Nothing is published or experimentally validated; the knowledge base is unchanged in
substance, and the reader site's disclosures now match what the corpus carries.
