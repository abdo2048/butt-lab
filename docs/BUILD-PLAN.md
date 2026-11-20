# Build plan — reader platform, final phase

Status: **active**. Created 2026-11-17. This file is the working plan and the ledger for the
last phase of the project. It replaces the old root planning files (`findings.md`,
`progress.md`, `task_plan.md`) and the superpowers plan/spec directories, which are frozen
history (see `docs/history/`).

Authority (in order): `charter.md` (scope + safety) → `state/workflow.yaml` (the
authoritative machine-readable state) → `docs/history/superpowers/specs/2026-11-13-butt-lab-reader-platform-design.md`
(the approved design) → `docs/history/superpowers/plans/2026-11-16-butt-lab-reader-platform.md`
(the implementation plan this file distils).

Work happens in worktree `C:\w\rp` on branch `feat/reader-platform`. `main` and
`origin/main` are not modified by this plan's tasks.

---

## 0. Where the project stands

| Area | State |
|---|---|
| Method registry | 30 entries, `registry/methods.yaml` (read-only) |
| Method families explained | 7 batch-02 narratives + 6 published family pages |
| Publication layer | 134 approved records, 10 pages, `VALID records=134 pages=10 assets=0` |
| Invention | 3 hypothesis records, all `new-unvalidated-hypothesis` |
| Evidence-gap agenda | M01–M08, R01–R05, S01–S06, published in `limitations` page |
| Batch-02 | accepted by the operator 2026-11-17 (`operator/batch-02-acceptance-2026-11-17.md`) |
| **Reader website** | **BUILT** — `tools/reader-site/`, 28 static pages, Pagefind index, 113 reader tests green |
| Branch topology | repaired; `main` and `feat/reader-platform` both at `9f3ffff` |

## 1. Rulings

- **R1 — The research stops here.** No further M-series evidence-gap proposals. The M01
  measurement plan and M01 Gate-A feasibility specification are the record of what M01
  would require. Remaining work is the reader platform.
- **R2 — The review model is the operator's.** External trained readers (and optionally an
  AI second layer) perform the critique **after publication**. Every claim, inference, AI
  note and hypothesis carries its own evidence state and validation state; dissent is
  preserved and reachable; unknowns display as unknowns; the audit drawer keeps internal
  IDs and versions. The deployment gate is **retained** — deployment is an action, not a
  review.
- **R3 — Isolation.** All work in `C:\w\rp` on `feat/reader-platform`.
- **R4 — Stable IDs.** The six family IDs are `mechanical-physical`, `thermal`, `chemical`,
  `biological`, `material-incorporation`, `product-routes` — not the batch-02 `f0`–`f6`
  filenames.
- **R5 — `unknown` is a result.** No invented score to fill a column. No criterion is
  averaged. No default aggregate "best method" ranking.
- **R6 — Rights honesty.** A local artifact is published only with `public-local-copy`.
  Everything else is `link-only` or `rights-unresolved`: citation + original link only.
- **R7 — Hosting is Cloudflare Workers on the free plan, deployed with `wrangler`.** The
  operator will do the first deployment manually so they can redeploy without an AI; the
  exact steps are written down in `docs/DEPLOY.md`.
- **R8 — The reader app consumes the EXPORTED BUNDLE ONLY.** Never the source YAML. The
  bundle is the allowlist; the site renders exactly what passed validation.

---

## 2. Phase A — the three surgical edits (operator-approved 2026-11-17)

Goal: make the repo readable by a fresh AI with no chat history, and stop the process
machinery from producing merge conflicts.

### A1 — Freeze the history files

Move (with `git mv`, history preserved) — every moved path stays under `docs/`, because a
new top-level directory would break the contract test that asserts every git-tracked
top-level directory is on the validator's deny-list:

| From | To |
|---|---|
| `state/session-log.md` | `docs/history/session-log.md` |
| `findings.md` | `docs/history/findings.md` |
| `progress.md` | `docs/history/progress.md` |
| `task_plan.md` | `docs/history/task_plan.md` |
| `docs/superpowers/plans/*` | `docs/history/superpowers/plans/*` |
| `docs/superpowers/specs/*` | `docs/history/superpowers/specs/*` |
| `.superpowers/sdd/*` | `docs/history/superpowers-sdd/*` |

Also write the pre-slim `state/workflow.yaml` to `docs/history/workflow-state-2026-11-17.yaml`.

Nothing else is moved. Nothing is deleted. The history stays readable; it simply stops
being maintained.

### A2 — Make `state/workflow.yaml` the current state only

The slim file carries: version, updated, status, `next_action`, `pending_manual_action`,
the operator acceptances (with dates + pointers to their evidence), `permissions`
(experiments + the scientist-inventor role), the open decisions, the labels, the current
unit, and a pointer to the archived full history. It does **not** carry `checkpoint:`,
`legacy:`, `stages:`, `gap_closing:` or the per-task `task_N:` archaeology.

The operator's authority facts must survive verbatim: `permissions.experiments.status:
ai_designed_only`, `ai_may` (4), `ai_must_not` (2), `physical_execution.status: not
arranged`, `permissions.ai_role` (title `scientist-inventor`, granted 2026-11-17, 5
labels).

**YAML rule:** never leave a plain scalar containing `: ` (colon-space) unquoted; use a
folded block scalar `>-`. This defect was introduced twice before. Re-parse after every
edit.

### A3 — One reader-facing `README.md`, one AI-facing `AGENTS.md`

`README.md` already exists — rewrite it, do not create a second one. `AGENTS.md` already
exists with 13 good lines — refine it and keep its evidence-discipline content.

Both point at the same three anchors: `charter.md` (the rules), `state/workflow.yaml`
(the state), `PROJECT-OVERVIEW.md` (the human view).

All cross-references to the moved paths are updated in the same commit.

---

## 3. Phase B — Task 4: the reader app (Astro + Pagefind)

Location: `tools/reader-site/`. It consumes the exported bundle only.

### Routes
`/` · `/start/` · `/methods/` · `/methods/<slug>/` · `/compare/` · `/sources/` ·
`/sources/<id>/` · `/glossary/` · `/invention/` · `/egypt/` · `/research-method/` ·
`/limitations/`

### Navigation
Primary: Start here · Methods · Compare evidence · Sources · Glossary.
Secondary: New invention · Egypt annex · How the research was produced · Audit links and
limitations.

### Method page — eleven sections, in the design's order
1. one-minute plain-language explanation
2. mechanism and feedstock
3. process steps
4. material-stream and contaminant-fate view
5. products, sinks, and unresolved loss
6. criterion scorecard with evidence basis
7. known failure modes and missing evidence
8. human validation still required
9. visibly distinct AI gap-closing notes
10. source cards and original links
11. technical audit drawer (internal ids, versions, public-safe audit links, dissent)

### Comparison page
Table plus card view. One-criterion sorting. **Unknown-last by default** and a "Find
evidence gaps" mode that puts unknown first. Evidence-basis filters. Side-by-side
selection. **No aggregate ranking.** A readable unsorted table when client JavaScript
fails.

### Tooltips
On hover **and** keyboard focus, each linking to a full glossary entry. No information
available only to pointer users.

### Client JavaScript
Limited to comparison sorting and filtering. Nothing at runtime can change a claim, score,
evidence state or approval.

### Backlinks
Generated from the structured relationships. No hand-maintained backlink lists.

### Visual direction
Restrained, Quartz-inspired but **not** a stock Quartz theme and no Quartz dependency.
All colours as CSS custom properties in `src/styles/tokens.css`:
warm paper surfaces · high-contrast charcoal text · muted blue/teal navigation and
relationship cues · amber for AI notes and assumptions · explicit warning styling for
unresolved states · dense technical information only behind progressive disclosure ·
minimal rounded-card repetition · no decorative graph clutter.
**Status always includes text or iconography in addition to colour.**

### Accessibility
Semantic headings and landmarks · keyboard-complete navigation, tooltips, drawers,
filters, comparison controls · visible focus · sufficient contrast · reduced-motion
support · mobile layout with no horizontal page scrolling · table alternatives or
responsive cards on narrow screens · localization-safe spacing and logical CSS
properties for later RTL.

### Tests (all test-first: watch it fail, then implement)
Rendering tests per route · sorting tests covering scored / unknown / not-applicable ·
evidence-basis filter tests that assert **no relabeling** · tooltip keyboard tests ·
JavaScript-failure readability test · **no-repository-path test over the built output** ·
no-session-log-reference test over the built output · mobile/keyboard assertions.

### Expected
`npm run build` produces the site and the Pagefind index. The built output contains no
repository-local path and no session-log reference. All reader tests pass.

---

## 4. Phase C — Task 5: CI and the gated deploy

- `.github/workflows/build.yml` — on pull request and push: install, validate the
  publication layer, run the contract tests, export the bundle, build the site, upload a
  content-addressed artifact. It **cannot** deploy.
- `.github/workflows/deploy.yml` — `workflow_dispatch` only, requiring the approved commit
  SHA, publication version, build-run id and artifact SHA-256; it verifies those against
  the operator-approval record and the publication manifest before deploying that exact
  artifact.
- A negative test asserts the build workflow contains no deploy step and the deploy
  workflow refuses a mismatched approval record.

## 5. Phase D — Task 6: release preparation and the acceptance gate

Full validation suite · rights and exposure audit (no repository path, no session log, no
credential, no unresolved-rights or `link-only` local artifact in the built output) ·
scientific review rehearsal over every evidence state, rationale, dissent and AI label ·
accessibility and responsive checks (automated + keyboard-only walkthrough + contrast and
non-colour status review + reduced-motion + RTL smoke fixture) · local preview · record
the checkpoint.

The operator receives one decision: approve this exact commit for merge, push and
deployment, or not.

## 6. Phase E — Hosting on Cloudflare Workers (free plan)

- Astro builds a static site; Wrangler deploys it as a Worker with a static-assets
  binding (`wrangler.jsonc` → `assets.directory`).
- `docs/DEPLOY.md` gives the operator the manual steps: install, login, build, deploy,
  redeploy, rollback, and how to read the deployed URL — written so it works with no AI
  present.
- Deployment is NOT performed by the agent without the operator's explicit go-ahead.
  `wrangler login` is interactive and requires the operator's browser.

## 7. Standing constraints (unchanged)

Metals stop-condition (Cd, Pb, As, Hg) in force · four-field sink requirement · never
declare any family or proposal clean, detoxified, safe, commercially validated,
environmentally beneficial, novel, patentable, deployable, or costed · no
freedom-to-operate, legal or deployment determinations · AI scientist-inventor role
granted 2026-11-17 (`ai_designed_only` — design and simulate only, never handle material
or perform a physical measurement) · no new numbers, every quantitative gap stays
`parameter-not-located` · do not deploy or publish without the operator's explicit
approval · do not accept Batch-02 on the operator's behalf · no whole-registry rewrite ·
registries stay read-only.

---

## 8. Ledger

| Date | Item | Result |
|---|---|---|
| 2026-11-17 | Phase A started (three surgical edits) | — |
| 2026-11-17 | A1 — history frozen under `docs/history/` | 7 `git mv` renames (session log, findings, progress, task plan, 2 superpowers plans, 1 spec, 1 SDD ledger) + the pre-slim `state/workflow.yaml` archived as `docs/history/workflow-state-2026-11-17.yaml`. Nothing deleted; every moved path stays under `docs/`, so the contract test's git-tracked top-level directory check still passes. `.superpowers/brainstorm/**` left in place (not on the approved list; `.superpowers` is already on the deny-list). |
| 2026-11-17 | A2 — `state/workflow.yaml` slimmed to current state only | 18 top-level keys → 16 current-state keys. Removed `checkpoint:`, `legacy:`, `stages:`, `gap_closing:`, `batch_02:`, `evidence_gap_continuation:` and the `reader_platform:` task archaeology. Preserved verbatim: `permissions.experiments` (`ai_designed_only`, 4 `ai_may`, 2 `ai_must_not`, `physical_execution.status: not arranged`) and `permissions.ai_role` (`scientist-inventor`, granted 2026-11-17, 5 labels). Added `acceptances:` (batch-01, batch-02, reader-platform), `content_state:`, `current_unit:`, `open_decisions:`, `standing_constraints:`, `hosting:`, `archive:`. YAML re-parsed successfully. |
| 2026-11-17 | A3 — reader-facing `README.md` + AI-facing `AGENTS.md` | Root `README.md` rewritten (not duplicated) with the three anchors and a layout table. Root `AGENTS.md` refined — all 13 original rules preserved, with the new read order and the explicit `docs/history/` = frozen-provenance boundary. |
| 2026-11-17 | A3 — cross-references to moved paths updated | 17 replacements across 8 live files, plus targeted edits to `PROJECT-OVERVIEW.md`, `WORKFLOW.md` (supersession banner), `reports/batch-02/HANDOFF-BRIEF.md` (batch-02 accepted, not pending), `CHECKPOINT-WEB-AI.md` and `CHECKPOINT-MASTER.md`. Validator deny-lists in `tools/publication-contract/**` deliberately NOT changed — they are guard strings, not references. |
| 2026-11-17 | Phase A complete — commit `8aedc35`, pushed to `origin/feat/reader-platform` | Verification on the committed tree: `npm test` → 206 tests / 205 pass / 1 skipped (Windows symlink) / 0 fail; `npx tsc --noEmit` → clean; `npm run validate` → `VALID records=134 pages=10 assets=0` + 7 deliberate `ASSESSMENT_UNKNOWN` warnings, no errors; repo-wide YAML/JSON audit 226 checked / 0 invalid; archived pre-slim state parses with its full 18 keys, slim state parses with 16 and has no `checkpoint`/`stages`/`legacy`. Phase B (Task 4) begins next. |
| 2026-11-17 | B0 — reader-site scaffold | `tools/reader-site/` created with `package.json`, `tsconfig.json` (repo convention: `node --test tests/*.test.ts`, native TS type-stripping, `exactOptionalPropertyTypes`), `astro.config.mjs` (`output: static`, `trailingSlash: always`, `build.format: directory` — yields exactly the 12 design routes), `.gitignore` (`node_modules/`, `dist/`, `.astro/`, `src/content/bundle/`). Dependencies: astro 7.4.12, pagefind 1.6.0, marked 16.4.2, typescript 5.9.3, jsdom 29.1.1, @types/node, @types/jsdom. An astro 5 pin was rejected: `npm audit` reported 5 vulnerabilities (1 critical) in astro's tree; astro 7 reports none from astro, marked, pagefind or jsdom. |
| 2026-11-17 | B1 — bundle verification and staging | `scripts/build-content.ts` (NOT `.mjs` — deviation from the frozen plan's file map, recorded here and in `state/workflow.yaml`): verifies every `bundle-manifest.json` `outputFiles[].sha256` against the actual bytes, rejects tampered/missing/orphan files with `BUNDLE_HASH_MISMATCH`, `BUNDLE_FILE_MISSING`, `BUNDLE_FILE_NOT_IN_MANIFEST`, `BUNDLE_MANIFEST_MISSING`, `BUNDLE_PATH_ESCAPE`, then stages the verified bundle into `src/content/bundle/` through a temp dir + swap so a failed verification writes nothing. 7 tests, written first, watched fail with `ERR_MODULE_NOT_FOUND`. |
| 2026-11-17 | B2 — comparison semantics | `src/lib/compare.ts`: one-criterion sorting (scored descending; **unknown LAST** by default; `evidence-gaps` mode puts unknown FIRST; `not-applicable` always sits between the focus group and the rest), `filterByBasis` (never relabels; basis-less rows excluded), `filterByStatus`. Never averages, never emits an aggregate, never mutates its input. 20 tests, written first, watched fail. |
| 2026-11-17 | B3 — markdown, bundle loader, labels, relationships | `src/lib/markdown.ts` (marked + GFM, raw HTML impossible, glossary terms wrapped as `<a class="term" href="/glossary/#id" data-tip="…">`, AI blockquotes tagged `class="ai-note"`, `splitPage` / `splitSectionBody` / `splitDisclaimer`; 19 tests), `src/lib/bundle.ts` (typed loader over the staged bundle only), `src/lib/types.ts` (the reading contract), `src/lib/format.ts` (criterion/status/basis/evidence/rights labels; 18 tests), `src/lib/relationships.ts` (outgoing + backlinks generated from the structured relationship files; 7 tests). All written test-first. |
| 2026-11-17 | B4 — design system and layout shell | `src/styles/tokens.css` (every colour a custom property: warm paper #f3efe7, charcoal #1f2328, teal #1f5f6b, blue #2c4a6e, amber #94570f, warn #8a2e1e), `src/styles/base.css` (mobile-first, no colour literals outside the tokens, `:focus-visible`, `prefers-reduced-motion`, `[hidden]` forced, responsive table/card switch), self-hosted fonts (16 woff2, 781 KB — Archivo, Source Serif 4, IBM Plex Mono; no third-party runtime request), `src/layouts/BaseLayout.astro` (skip link, `<main>`, two labelled navs, `aria-current`, lazy Pagefind search that only loads on submit, `<noscript>` pointer to the plain indexes, `data-pagefind-body` on `<main>`). |
| 2026-11-17 | B5 — components and the 12 routes | Components: `EvidenceChip`, `ScoreTicks` (five ticks, `aria-hidden`, the text carries the value), `MethodScorecard` (criterion / result / basis / why from the assessment records, supporting claims and dissent in drawers), `SourceCards`, `AuditDrawer`, `RelatedPanel`, `PageSection`, `NarrativePage`. Routes: `/`, `/start/`, `/methods/`, `/methods/<slug>/`, `/compare/`, `/sources/`, `/sources/<id>/`, `/glossary/`, `/invention/`, `/egypt/`, `/research-method/`, `/limitations/`. The method page keeps the published narrative markdown and replaces only three sections with the structured versions (scorecard, source cards, audit trail); the standing disclaimer paragraph is split out and rendered once. |
| 2026-11-17 | B6 — built-output integration suite | `tests/site.test.ts` (18 tests over `dist/`) asserts: every route renders; 6 method pages and 12 source pages exist; skip link, landmarks and `aria-current`; all nine navigation destinations; **no repository-local path in the built output**; **no session-log reference**; keyboard-reachable glossary links whose anchors exist; every colour outside the token block is a custom property; narrow-screen rules; the comparison table is complete without JavaScript; sorting and the evidence-gap mode exist and no ranking language appears; source content, inference and AI notes are visually separated; every hypothesis is labelled unvalidated; search is a retrieval aid with a `<noscript>` alternative; every page states what the site does not claim. `tests/compare-client.test.ts` (6 jsdom tests) drives the one piece of client JavaScript. |
| 2026-11-17 | B7 — two defects found by the tests and fixed | (1) **The comparison sorting was dead in the built site**: `is:inline` on the JSON script emitted the literal text `{JSON.stringify(orders)}`, so the client's `JSON.parse` threw and the script returned early. Fixed with `set:html={JSON.stringify(orders)}`; the jsdom test now pins the reorder against the server-computed order. (2) The built stylesheet carried raw `#000`/`#fff`/`transparent` literals (the print block and the minifier's `transparent` → `#0000`); moved into tokens (`--print-ink`, `--print-paper`, `--transparent`). Two test refinements were also made and are recorded as refinements, not site weakenings: the colour scan now strips `:root` blocks first and scans only the stylesheets the built HTML links, and the drive-letter path patterns require a non-alphanumeric boundary so `https://` cannot match. |
| 2026-11-17 | Phase B complete — Task 4 built and verified | `npm run build` → 28 pages, Pagefind 28 pages / 2056 words, no warnings. `node --test tests/*.test.ts` → **99 tests / 99 pass / 0 fail / 0 skipped**. `npx tsc --noEmit` → clean. The publication contract is untouched and still green: `npm test` → 206 tests / 205 pass / 1 skipped (Windows symlink) / 0 fail; `npm run validate` → `VALID records=134 pages=10 assets=0` + 7 deliberate `ASSESSMENT_UNKNOWN` warnings. `npm audit` → 10 high findings, all from ONE upstream advisory (picomatch ReDoS, GHSA-fc5q-39xc-vjpf, range ≤4.0.7, newest published version) reached through astro's build tree; **no fixed release exists**, nothing is shipped in the static artifact, and an npm override was tried and removed because it bought no security. Disclosed rather than hidden. |
| 2026-11-17 | C0 — the release test, written first | `tools/reader-site/tests/release.test.ts` (14 tests) written BEFORE any implementation and watched fail with `ERR_MODULE_NOT_FOUND`. It pins the artifact contract (every file listed with its hash, sorted by path; the artifact hash is stable for the same content and changes when a file changes), the approval gate (a matching approval is accepted; a missing record, a different commit, version, build run or artifact hash, an approval with nobody behind it, a file changed inside the artifact and an extra file smuggled into the artifact are all refused), and the CI boundary (the build workflow cannot deploy; the deploy workflow is manual only and verifies the approval before deploying). |
| 2026-11-17 | C1 — `scripts/build-artifact.ts` | Assembles the content-addressed artifact: the built site, the bundle manifest, and `artifact-manifest.json` listing every file with its own sha256, sorted by path. **The artifact's identity IS the sha256 of that manifest**, so any changed, added or removed byte changes the artifact hash. The CLI prints `ARTIFACT version=… commit=… files=… sha256=…`. |
| 2026-11-17 | C2 — `scripts/verify-approval.ts` | Compares the operator's approval record, the deployment request, the artifact manifest and the artifact's actual bytes, and refuses on any mismatch: `APPROVAL_RECORD_MISSING`, `APPROVAL_RECORD_INCOMPLETE`, `APPROVAL_COMMIT_MISMATCH`, `APPROVAL_VERSION_MISMATCH`, `APPROVAL_BUILD_RUN_MISMATCH`, `APPROVAL_ARTIFACT_MISMATCH`, `APPROVAL_ARTIFACT_MANIFEST_MISSING`, `APPROVAL_ARTIFACT_MANIFEST_UNREADABLE`, `APPROVAL_ARTIFACT_FILE_MISMATCH`, `APPROVAL_ARTIFACT_EXTRA_FILE`, `APPROVAL_ARTIFACT_FILE_MISSING`, `APPROVAL_ARTIFACT_NOT_THE_APPROVED_ONE`. Exit 1 with `REFUSED: …` on problems, exit 0 with `APPROVED: …` otherwise. It refuses; it never approves. |
| 2026-11-17 | C3 — the two CI workflows | `.github/workflows/build.yml` builds, validates and uploads an artifact. It contains no deploy step, no Cloudflare reference and no secret: it **cannot** deploy. `.github/workflows/deploy.yml` runs on `workflow_dispatch` only, downloads exactly the approved artifact by run id, verifies it against `operator/deployment-approval.json`, and only then runs `npx wrangler deploy`. The approval file does not exist, so the gate refuses every deployment until the operator creates it. |
| 2026-11-17 | Phase C half done — checkpoint | Reader suite **113 tests / 113 pass / 0 fail**; `npx tsc --noEmit` clean. The checkpoint is recorded in `state/workflow.yaml` (`status: reader_platform_release_gate_in_progress`, `current_unit: reader_platform_release_gate`, new `release_gate:` block) and in the new ACTIVE `state/session-log.md` (the pre-2026-11-17 log stays frozen at `docs/history/session-log.md`). Remaining: `wrangler.jsonc` + `docs/DEPLOY.md` written from the real `wrangler --help` output, the Phase D release-prep checklist, the final verification, then the operator's release decision and Phase E hosting. Nothing is deployed or published. |
| 2026-11-17 | C4 — the CI directory closed as a publication-input hole | Adding `.github/workflows/` created a new git-tracked top-level directory, and the contract's repository-local root deny-list did not contain `.github`: a derivative path or a publication input could have pointed into the CI configuration without being rejected. Closed test-first — RED first (the derivative test failed, and the manifest case failed with `ASSET_UNSAFE_TYPE` because a `.yml` extension is not a known asset type, so the case was corrected to a `.md` path to test the path rule rather than the extension rule), then `.github` was added to `REPOSITORY_LOCAL_ROOT_SEGMENTS` (`src/semantic-validation.ts`) and to `assertAllowedListedPath` (`src/manifest-validation.ts`), whose message now reads "Internal planning, CI configuration and session-log paths may not be publication inputs." The two affected contract test files: 94 tests, 94 pass, 0 fail. |
| 2026-11-18 | C5 — the hosting configuration and the manual deployment guide | RED first: `tools/reader-site/tests/deploy-config.test.ts` (7 tests) written before any config existed and watched fail (6 of 7 failing; `ENOENT` on `wrangler.jsonc` and `docs/DEPLOY.md`). Then `tools/reader-site/wrangler.jsonc` (worker `butt-lab`, `workers_dev: true`, `assets.directory: "./dist"`, `compatibility_date: 2026-11-18`, no `main` — an assets-only Worker), `docs/DEPLOY.md` (11 numbered steps written from the REAL `wrangler --help` / `deploy --help` / `login --help` / `rollback --help` / `versions --help` output of the pinned wrangler 4.164.0: install → login → build → package the artifact → write the approval → write the request → verify the gate → stage the approved bytes → deploy → read the URL → redeploy → rollback, plus troubleshooting and the GitHub-Actions alternative), `operator/deployment-approval.template.json` (placeholders only; the test proves the gate refuses it), and a new staging step in `deploy.yml` (`rm -rf dist && cp -r artifact/site dist`) placed before the deploy command. GREEN: 7/7. Full reader suite **120 tests / 120 pass / 0 fail**; `npx tsc --noEmit` clean. `npx wrangler deploy --dry-run` → **exit 0**, "Read 121 files from the assets directory", "--dry-run: exiting now" — nothing uploaded. `npm ci` installs the pinned `wrangler` 4.164.0; `npm audit` still reports the same 10 high findings, all the one picomatch advisory — no new advisory. |
| 2026-11-18 | C5 rulings | **Ruling C5-1: the assets-only Worker declares no asset binding.** `wrangler deploy --dry-run` refused the first config with `X [ERROR] Cannot use assets with a binding in an assets-only Worker. Please remove the asset binding from your configuration file, or provide a Worker script in your configuration file (main).` The earlier plan note (`assets.binding` → `ASSETS`) was wrong for a script-less static Worker, so the binding was removed and the test that encoded it was corrected to assert its absence. Cost if wrong: none — the site is static and nothing reads the assets from a script. **Ruling C5-2: the deploy workflow stages the artifact and never rebuilds.** `deploy.yml` now copies `artifact/site` into `dist` before `npx wrangler deploy`, so the deployed bytes are exactly the bytes in the approved artifact; a rebuild inside the deploy workflow would produce different bytes than the one that was approved, so the test pins the absence of `npm run build`, `astro build`, `build:content` and `npm run export` in that file. Cost if wrong: the deploy job would fail loudly rather than publish the wrong bytes. **Ruling C5-3: no custom 404 page in this release.** The Astro build produces no `404.html`, so `not_found_handling` is left unset and unmatched paths get Cloudflare's default 404 response. Adding an Astro 404 route is new scope and is deferred to the operator as a release-checklist finding, not slipped in. Cost if wrong: a mistyped URL shows a platform page instead of a branded one. **Ruling C5-4: the operator runs the deployment.** Per the operator's decision, the agent prepares and dry-runs but never publishes; `wrangler login` needs the operator's browser and the approval record must carry a human name. |
| 2026-11-18 | D1 — the automated release audit | RED first: `tools/reader-site/tests/release-audit.test.ts` (24 tests) written before `scripts/release-audit.ts` existed and watched fail with `ERR_MODULE_NOT_FOUND`. The audit is code in the repository, not a one-off manual scan, and CI now runs it (`npm run audit:release` in `.github/workflows/build.yml`). It checks five families: **exposure** (repository-local path leaks, session-log references, credential-shaped strings, binary files skipped), **rights** (an unresolved-rights source, or a `link-only` source carrying derivatives, is blocking), **scientific discipline** (a scored assessment without a rationale, an unknown assessment without an unknown reason, a hypothesis that is not `new-unvalidated-hypothesis`, an incomplete hypothesis or gap, a dangling `*Ids` cross-reference), **declarations** (positive "safe / clean / detoxified / commercially validated / patentable / ready to deploy / costed / novel" claims, with negation suppression so "is not safe" does not fire; severity `review`, not blocking) and **accessibility** (page language, title, skip link, main and navigation landmarks, `:focus-visible`, `prefers-reduced-motion`, status conveyed in text as well as colour, and WCAG AA contrast computed per CSS rule from the token colours). Result on the real build: `AUDIT records=134 findings=0 blocking=0 review=0 passed=true`. |
| 2026-11-18 | D2 — a real contrast defect, found by the audit and fixed | The first real audit run failed with **9 blocking `CONTRAST_BELOW_AA` findings, all at 3.30:1**: `--ink-faint` (`#7b8490`) was used for small text (0.64–0.72rem) in `.record-id`, `.chip--not-applicable`, `.chip--none`, `.drawer__body dt`, `.record-list__meta`, `.specimen dt`, `.control__label`, `.compare-card dt` and `.source-card__meta`. Every use was read by hand and confirmed to sit on a light surface. Fixed in `src/styles/tokens.css`: `--ink-faint` → **`#5b6470`** (5.23 / 5.66 / 4.69 on paper / paper-raised / paper-sunken) and `--ink-muted` `#56616d` → **`#4f5a66`**, which keeps the three-step hierarchy (ink 13.78 > muted ≈6.6 > faint 5.23) and clears AA everywhere. |
| 2026-11-18 | D3 — a real search defect, found in the browser and fixed | Driving the live preview showed the search form reporting "Search is not available in this build…". The cause was measured, not guessed: Pagefind returns `results` as a **plain array** of items each with its own `data()` promise, so the old `found.results.slice(0,12).data()` threw a `TypeError` that the catch branch swallowed, and `found.results.count()` does not exist either. Fixed test-first: `tests/search.test.ts` (8 tests) watched fail with `ERR_MODULE_NOT_FOUND` for `src/lib/search.ts`, then `src/lib/search.ts` (DOM-free helpers: `isMatch`, `countMatches`, `collectSearchHits`, `searchStatusText`) and `src/scripts/search.ts` (the client wiring, importing the Pagefind module through a variable specifier so it stays lazy) were written, and the inline `<script is:inline>` in `BaseLayout.astro` was replaced by `<script>import "../scripts/search";</script>`. Proven in the real browser afterwards: "aluminium" → **28 page(s) match**, 12 result links and 12 excerpts rendered, no console errors; "zzzqqq" → **No page matches**, 0 links. |
| 2026-11-18 | D4 — the accessibility, responsive and preview checks | Automated: the release audit's accessibility family over all 28 built pages (language, title, skip link, landmarks, focus-visible, reduced motion, text-carried status, AA contrast). Real browser against the local preview on `http://localhost:4321`: no console errors; a keyboard-only traversal reached the skip link, the brand, the search field and button and the six primary navigation links, each with a visible focus outline (`solid 2px rgb(44, 74, 110)`); activating the skip link moved the hash to `#main` and the next Tab landed inside the main region; right-to-left layout produced no horizontal overflow (985 ≤ 1000) and the same held inside a 360px frame (345 ≤ 360); the 360px layout rendered the nav block, the main landmark and 21 list items with no horizontal overflow; **Lighthouse on `/methods/`: accessibility 1.0, best practices 1.0, SEO 1.0, zero failures**. Not verified: raw search keystrokes (the harness could not deliver key presses to an unfocused window, so the form was filled and submitted through its own submit path), other browsers, and Lighthouse on the other 27 pages. The preview server was stopped and the temporary 360px harness file was removed. |
| 2026-11-18 | D5 — the release checklist | `docs/RELEASE-CHECKLIST.md` written: what the release is, how to confirm the candidate commit, the eight automated checks with their commands and results, the rights and exposure audit, the scientific review rehearsal over all 134 records (a census by kind, evidence state, assessment status and basis, gap and hypothesis validation states, the reviewer strings — all 88 of which say "no human sign-off recorded"), the accessibility evidence, the two defects found and fixed, eight stated limitations, and the operator's single decision with both branches explained. |
| 2026-11-18 | D6 — final verification | Reader site: **152 tests / 152 pass / 0 fail / 0 skipped**; `npx tsc --noEmit` clean; `npm run build` exit 0 with 28 pages and 2056 indexed words; `npm run audit:release` → 0 findings. Publication contract: **207 tests / 206 pass / 1 skipped (Windows symlink) / 0 fail**; `npm run validate` → `VALID records=134 pages=10 assets=0`; `npx tsc --noEmit` clean. Hosting: `npx wrangler deploy --dry-run` exit 0, reads 121 files, uploads nothing. |
| 2026-11-18 | D7 — the release candidate recorded | The commit to approve is **`65d429f`** on `origin/feat/reader-platform` (the Phase D commit). The commit that follows it only records this hash in `state/workflow.yaml` and `state/session-log.md`, so the built site bytes and the artifact hash are identical from either commit. When packaging the artifact the operator sets `SOURCE_COMMIT=65d429f`, so the artifact manifest, the operator's approval record and `docs/RELEASE-CHECKLIST.md` all name the same commit. The operator's approval record is not written by the agent. |
| 2026-11-18 | D rulings | **Ruling D-1: the release audit is repository code, not a manual scan.** A checklist whose checks are only ever run by hand cannot be re-run by the operator or by CI after any later change, so the checks became `scripts/release-audit.ts` with a test file, and `build.yml` runs it on every build. Cost if wrong: the repository carries a script the maintainer must keep in step with the site. **Ruling D-2: two audit fixtures were corrected rather than the audit weakened.** Six tests failed with `ReferenceError: t is not defined` because the callbacks had no test-context parameter, and the contrast fixture used ink on paper (13.78:1) — a pair that could never fail. The fixture now uses the real failing pair (`#7b8490` on `#f3efe7`). Cost if wrong: none; the audit's rules were not relaxed. **Ruling D-3: the search logic lives in modules, and the Pagefind bundle stays lazy.** Moving the logic out of the inline script made it unit-testable without a DOM and let the lazy import survive the move; Astro inlines the small module script into each page, so the built HTML still contains no eager pagefind script tag, which `tests/site.test.ts` now asserts in both directions. Cost if wrong: none; the pagefind module is still fetched only when a search runs. **Ruling D-4: `--ink-muted` was darkened with `--ink-faint`.** Fixing only the faint tone would have left muted and faint at nearly the same contrast, collapsing the type hierarchy; darkening both keeps ink > muted > faint and clears AA on every paper surface. Cost if wrong: a slightly heavier secondary text. **Ruling D-5: the empty structured dissent channels are recorded, not filled.** The census shows 0 assessments with `conflictingClaimIds` and 0 claims with `counterevidenceClaimIds`, while dissent is carried in prose (failure modes, falsifiers, unknown reasons, unresolved questions). The charter requires preserving dissent, not manufacturing it, and no source-located counterevidence was found, so the gap is documented as a gap in representation rather than populated by the agent. Cost if wrong: a reader may read the absence of structured disagreement as absence of disagreement; the checklist says so in §5.4. **Ruling D-6: the agent does not create the operator's approval record.** `operator/deployment-approval.json` must carry a human name and a human decision; the agent writing it would forge operator approval. The gate therefore refuses every deployment until the operator creates it. |

| 2026-11-18 | D8 — the final whole-branch review and its fix pass | A fresh-context reviewer read the whole branch (`9f3ffff..1af6e38`) against the plan, the spec and the charter and returned **NOT READY: 1 Critical, 4 Important, 2 Minor**. All seven findings were fixed test-first — `tools/reader-site/tests/release-review.test.ts` (20 tests) was written first and watched fail with `ERR_MODULE_NOT_FOUND`. **Critical — the deploy workflow interpolated untrusted `workflow_dispatch` inputs into a shell heredoc**, so an input containing a newline and `EOF` could run commands before the approval check; the heredoc is gone, the inputs now reach the writer only through `env:`, and a new `scripts/deployment-request.ts` validates them (commit `^[0-9a-f]{7,40}$`, version `^[a-z0-9][a-z0-9.-]*$`, build run `^[0-9]+$`, sha256 `^[0-9a-f]{64}$`) and writes the request with `JSON.stringify`. **Important 1 — the verifier never compared the artifact manifest's own `sourceCommit`/`publicationVersion` with the approval**; it now does (`APPROVAL_ARTIFACT_COMMIT_MISMATCH`, `APPROVAL_ARTIFACT_VERSION_MISMATCH`). **Important 2 — the exposure audit could report green while missing leaks** (a repository path inside markup, an unquoted credential assignment, a `github_pat_` token, and any text file containing a NUL byte); the patterns were widened and the NUL-byte skip removed. **Important 3 — the shipped pages overstated the labelling guarantee** ("every published record carries two labels", "every statement carries its evidence state", "every claim carries its status") while 77 of the 134 records carry no evidence state; the page text, the site footer and the README now say exactly what carries a status and what carries its role instead. **Important 4 — the deploy workflow could not download its own cross-run artifact** (`actions: read` was missing, and an explicit `permissions` block defaults every other scope to none); it is now granted. **Minor 1 — Markdown emphasis rendered literally in list items** (105 built lines), because the custom `text` renderer dropped the token's inline tokens; it now mirrors marked's default and a list item renders `<strong>`. **Minor 2 — 24 pages repeated the site suffix in their title** ("— Butt Lab — Butt Lab"); the suffix is now added only when the title does not already end with it. |
| 2026-11-18 | D8 rulings | **Ruling D8-1: a deployment request is written by a program, never by shell interpolation.** The workflow inputs are untrusted text; the fix moves them behind `env:` and a validating writer that refuses anything outside a strict pattern. Cost if wrong: the workflow refuses a malformed input instead of executing it, which is the intended behaviour. **Ruling D8-2: the approval binds the artifact's declared commit and publication version, not only the request.** An artifact whose own manifest names a different commit is refused even when the request and the approval agree, because the manifest is what the bytes were built from. Cost if wrong: an artifact built with a shorthand commit prefix may be refused; `commitsMatch` accepts a hex prefix of at least 7 characters. **Ruling D8-3: the audit's patterns are widened, and the one false positive is fixed by precision rather than by suppression.** The widened drive-path rule matched a coincidental `a:/` inside a compressed Pagefind fragment; the rule now requires a real path character after the separator (a genuine leak always has one), and the fragment is no longer skipped wholesale. Cost if wrong: a path ending immediately after the separator would be missed. **Ruling D8-4: the disclosure is corrected to what the corpus actually carries.** No label was invented to make the old sentence true; the pages now name the record types that carry an evidence state and the ones that carry a role instead. Cost if wrong: the site says less than before, but what it says is true. **Ruling D8-5: both minors were fixed, not deferred.** Literal `**` on 105 built lines and a doubled title suffix on 24 pages were visible to every reader, so they entered the fix pass rather than the deferred list. Cost if wrong: two small changes to the renderer and the layout. **Ruling D8-6: the publication-layer generator is `tools/publication-contract/scripts/build-publication-layer.mjs`.** My first assumption — a root-level `scripts/build-publication-layer.mjs` — was wrong and failed with `MODULE_NOT_FOUND`; the layer was then regenerated from `layer-data/`, exported to `.publication-build/`, and the site rebuilt from the exported bundle. Cost if wrong: none; the contract package owns the generator. |

| 2026-11-18 | D9 — the release candidate after the review fix pass | The commit to approve is **`1c0c402`** on `origin/feat/reader-platform` (the Phase D commit including the final whole-branch review fix pass). The commit that follows it records only this hash, so the built site bytes and the artifact hash are identical from either commit; `SOURCE_COMMIT=1c0c402` must be used when packaging the artifact so that the artifact manifest, the operator's approval record and `docs/RELEASE-CHECKLIST.md` name the same commit. The operator's approval record is not written by the agent, so the gate refuses every deployment until the operator creates it. |
| 2026-11-18 | D10 — Phase E preparation | The operator approved the release candidate in session ("approve yeah, but you write all stuff and all whats left to me is just run wrangler steps myself") and authorised the merge ("if you see its good to do the merge then do it"). `feat/reader-platform` was fast-forward merged into `main` (9f3ffff → b3b53bd, identical tree). In the main checkout: `npm ci`, `npm run export`, `npm run build` (28 pages, 2058 indexed words) — then packaging FAILED, exposing a real defect from Phase C: `build-artifact.ts ../.. artifact` pointed at the repo root, which has no `dist/`, so the CI artifact step and the manual step 4 were both broken. Fixed test-first (new `tests/artifact-packaging.test.ts`, 4 tests, first run failed on the missing `defaultSourceDir` export): the script now resolves its own source directory, finds the staged bundle manifest at `src/content/bundle/bundle-manifest.json`, and refuses a source with no built site or no bundle manifest. The artifact was then packaged for real: `ARTIFACT version=batch-02-pilot commit=1c0c402 files=90 sha256=deb8dde6824422cb11f5f25976a140082eddedd957d317c358198a2c6937a3f4`. The operator's approval was transcribed into `operator/deployment-approval.json`, the gate printed `APPROVED: commit=1c0c40254715de64177ff6e885f27cb12b619cfd version=batch-02-pilot run=local artifact=deb8dde6…`, the approved bytes were staged into `dist/` (89 files), and `npx wrangler deploy --dry-run` exited 0, reading 121 files and uploading nothing. **Nothing is online.** |
| 2026-11-18 | D10 rulings | D10-1 — The operator's in-session approval is transcribed, not forged: `operator/deployment-approval.json` records what the operator actually said, names them as the approver with the date, and may be re-signed by hand. Cost if wrong: the provenance line reads differently than the operator would have written it; the commit and artifact hashes are unaffected. D10-2 — The artifact's source directory is resolved by the script from its own location, never by a relative parent path typed into a command, because a command that reaches upward breaks when the working directory moves. Cost if wrong: one extra exported helper. D10-3 — The approval record is committed as provenance (the deploy workflow reads it from the checked-out ref) while the packaged `artifact/` directory and the deployment request stay untracked, because they are build outputs of one machine. Cost if wrong: the request is regenerated on demand. D10-4 — Deployment stays with the operator: the agent prepared, verified and dry-ran, and stopped before the upload. Cost if wrong: one command the operator runs themselves. |

| 2026-11-20 | E1 - orphaned reading-copy images restored, folder explained | The 59 PNG figure crops that existed only on `feat/publication-content-contract` were copied into `main` at their original `materials/gap-closing/library/*_text/` paths; the branch was **not** merged. They are crops of embedded page images written by the reading-copy generator, not OCR text. Before the copy, 71 of 146 image references in the 12 tracked `*_text.md` files were broken; after it, 12 remained, all from one folder name that had drifted from the links, which was renamed to match. Result: **146/146 resolve**. No PDF bytes, extracted text, record or citation changed, so no publication input or reader page moved. Added `materials/gap-closing/README.md` and two sections in `docs/REPOSITORY-MAP.md`. No test suite was re-run because no build input changed. |
