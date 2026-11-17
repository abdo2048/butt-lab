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
| **Reader website** | **BUILT** — `tools/reader-site/`, 28 static pages, Pagefind index, 99 reader tests green |
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
