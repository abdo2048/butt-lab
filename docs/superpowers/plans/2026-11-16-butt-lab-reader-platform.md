# Reader platform implementation plan — phases 2, 3 and 4

Status: active. Created 2026-11-16.
Authority: `docs/superpowers/specs/2026-11-13-butt-lab-reader-platform-design.md` (approved design, 2026-11-13) and `charter.md` (scope and safety).
Branch: `feat/reader-platform` in worktree `C:\w\rp`, based on `main` @ `3d76367` + content contract `4ed09b0` (cherry-picked from `feat/publication-content-contract` @ `784bb14`).

## 0. Why this plan exists

The content contract (design Phase 1) is implemented and green: `tools/publication-contract` — 186 tests, 185 pass, 1 skipped (Windows cannot create symlinks), 0 fail; `tsc --noEmit` clean; deterministic schemas; deterministic export; no network.

The research is closed by operator instruction. Batch-02 (six method-family narratives, the separate invention sketch, the Egypt annex) is the accepted landscape. The remaining path to a published reader website is design Phase 2 (pilot content), Phase 3 (reader app) and Phase 4 (public release).

## 1. Authorization basis and boundary

The operator instructed: the research, the method explanations and the invention are done; after the website is published, external readers will critique it; an AI second-layer review may be run before or during reading, but is not mandatory; proceed with "full force auto".

What that authorizes: building the approved knowledge layer, the reader app, the CI build, and the release-preparation suite, on a branch, with everything recorded.

What it does **not** authorize: merging to `main`, pushing, deploying to GitHub Pages, publishing any content online, running any experiment, or accepting the batch-02 deliverables on the operator's behalf. Those remain the operator's explicit acts, each separately gated.

**No scientific content was approved by this plan and no publication occurred.**

## 2. Rulings

- **R1 — The research stops here.** No further M-series evidence-gap proposals (M02–M08) are written. The M01 plan and M01 Gate-A feasibility specification (Phases 14–15) stand as the record of what M01 would require. Remaining work is the reader platform.
- **R2 — The review model is the operator's, and it differs from the design's default.** Design §12.5 and §14.5 expect a human scientific review before release. The operator has decided that external readers (and optionally an AI second layer) will perform that critique after publication. This plan accepts the operator's decision and mitigates it in the artifact rather than relitigating it: every claim, inference, AI note and hypothesis carries its own evidence state and validation state; dissent is preserved and reachable; unknowns are displayed as unknowns; the audit drawer keeps internal IDs and versions. The release gate (§12.7, deployment only after explicit operator approval for that version) is retained, because deployment is an action, not a review.
- **R3 — Isolation.** All work happens in `C:\w\rp` on `feat/reader-platform`. `main`, `origin/main`, and the earlier worktree `C:\w\bpc` are not modified by this plan's tasks.
- **R4 — Stable IDs.** The publication layer uses the design's six family stable IDs (`mechanical-physical`, `thermal`, `chemical`, `biological`, `material-incorporation`, `product-routes`), not the batch-02 filenames `f0`–`f6`. The mapping is recorded explicitly in `publication/materials/cigarette-butt.yaml` and in the `internalAliases` of each method record.
- **R5 — `unknown` is a result.** Where the evidence is not located, the assessment is `unknown` with an `unknown_reason`. No score is invented to avoid a column of unknowns, and no criterion is averaged. A criterion that reads `unknown` is information, not a gap in the work.
- **R6 — Rights honesty.** A local PDF is published only with an explicit `public-local-copy` right. Everything else is `link-only` or `rights-unresolved`, and the site shows the citation plus the original link, never the local artifact.

## 3. Global constraints

- Guardrails from `charter.md`: exact URLs and sections, units and mass basis, limitations; source statements, measurements, estimates and observations kept separate; no invented experiments or numerical results; preserve dissent; consensus is not safety certification; no DIY pressure-vessel directions; desk work authorizes no physical trial.
- Guardrails from the design: no safety, regulatory, economic, environmental-superiority, novelty or patentability verdicts; desk-research completion is not experimental validation; the site never emits repository-local paths; unknown is never zero; no default aggregate "best method" score.
- Exporter is network-free and deterministic. External-link availability is a separate advisory job.
- Missing evidence is `parameter-not-located` (project vocabulary) or `source-not-located` / `unknown` (publication vocabulary). Both mean the same thing: not established, not absent.

## 4. File map

New or changed under `publication/`:

```
publication/manifest.yaml                       # the explicit public allowlist (records, pages, assets)
publication/materials/cigarette-butt.yaml       # the material record + family-to-batch-02 mapping
publication/methods/<family-slug>/overview.md   # plain-language narrative (approved reader text)
publication/methods/<family-slug>/record.yaml   # identity, mechanism, streams, contaminants, relations
publication/methods/<family-slug>/claims.yaml   # claims with evidence state and source locators
publication/methods/<family-slug>/gaps.yaml     # gap records with human-work categories and falsifiers
publication/methods/<family-slug>/assessments.yaml  # 8 criteria x scored|unknown|not-applicable
publication/hypotheses/batch-02-invention/{overview.md,record.yaml}
publication/sources/<source-id>.yaml            # rights state, locator map, derivative rights
publication/terms/<term-id>.yaml                # glossary
publication/pages/{start-here.md,egypt-annex.md,how-the-research-works.md}
publication/contract/v1/…                       # unchanged (schemas + rubrics)
```

New under `tools/reader-site/`:

```
tools/reader-site/package.json  astro.config.mjs  tsconfig.json
tools/reader-site/src/pages/**  src/layouts/**  src/components/**
tools/reader-site/src/styles/tokens.css
tools/reader-site/src/content/  (generated bundle, git-ignored)
tools/reader-site/scripts/build-content.mjs
tools/reader-site/tests/**       (unit + rendering + a11y assertions)
```

New under `.github/workflows/`: `build.yml` (validate + build, never deploys), `deploy.yml` (manual, gated).

## 5. Tasks

Each task ends with a commit on `feat/reader-platform` and a named test where code is involved. Code is written test-first: the failing test is watched failing before the implementation exists.

### Task 1 — Reconcile the content contract with the reader design

Goal: prove the existing contract can express everything the design requires, and extend it where it cannot.

Steps
1. Audit, in writing, each of: the eight record kinds (`material`, `method-family`, `source`, `claim`, `gap`, `hypothesis`, `term`, `assessment`); the four enums (content kind, evidence state, publication state, validation state); the three source-rights states; the derivative publication rights; the eight MVP criteria and their five-band rubrics; the manifest contract (explicit list, no transitivity, hash-verified assets); the relationship model with `targetKind`.
2. For each gap found, write the failing contract test first, then the smallest schema change, then the fixture.
3. Regenerate schemas and confirm byte-identical output across two runs.

Expected: audit recorded in `docs/publication-content-contract.md`; any extension covered by a named failing-then-passing test; `npm run typecheck` clean; `npm test` green; schemas deterministic.

### Task 2 — The cigarette-butt material and the six method families

Goal: the approved knowledge layer for the six families, derived from the accepted batch-02 narratives. This is normalization and translation of accepted content, not new research.

Steps
1. `publication/materials/cigarette-butt.yaml`: composition summary in plain language, relevant contaminants and terms, jurisdictions, related family IDs, and the explicit batch-02 filename ↔ stable-ID mapping.
2. For each of the six families, write `overview.md` (reader narrative — plain first, no repository paths, no operating instructions, labelled AI gap-closing notes retained), `record.yaml` (identity, mechanism, feedstock, ordered process steps at a safe level of detail, streams/products/sinks/emissions boundaries, named contaminants with fate state, relations, internal aliases), `claims.yaml` (each factual proposition with content kind, evidence state, source id + locator, denominator/units/mass basis where quantitative, conflicting-claim references, reviewer + review date), `gaps.yaml` (plain-language question, gap type, why it matters, affected method/stream/contaminant, human-work category, falsifier/decision condition), `assessments.yaml` (eight criteria per family; `scored` with rubric version, rationale, basis, supporting and conflicting claim ids, reviewer and date; `unknown` with a reason; `not-applicable` with a reason).
3. Every claim that names a measurement must carry its mass basis. Where a family document states "no dry-mass basis", that becomes a claim with evidence state `source-not-located`, not a gap note buried in prose.
4. Dissent is preserved: the F3 minority position and the metals stop-condition appear where they bear on the criterion being scored.

Expected: `node src/cli.ts validate --root ../../publication` exits 0 with the expected counts; every record id unique; every source-supported claim has a locator; every relationship target resolves.

### Task 3 — Sources, terms, pages, the invention, and the manifest

Goal: the rest of the public layer and the explicit allowlist.

Steps
1. `publication/sources/*.yaml` — one record per source actually cited by a claim, with citation, type, issuer, version/date, original URL, access date, rights state, derivative records with extraction method and page mapping and quality warnings, and the rights state of each local artifact. `rights-unresolved` and `link-only` local artifacts are never exported.
2. `publication/terms/*.yaml` — glossary terms with tooltip definitions, full explanations, and related methods/claims.
3. `publication/pages/start-here.md` (what a cigarette butt contains; the six families; how the evidence labels work; why material fate and product quality are separate questions; how to compare; where the invention lives), `egypt-annex.md` (from the accepted annex, unvalidated observations only), `how-the-research-works.md` (the honest method: harvest, deep-dive, red-team, invention, synthesis; no panel impersonation; no experiments).
4. `publication/hypotheses/batch-02-invention/` — the invention as a separate page that must remain `new-unvalidated-hypothesis`, with its falsifiers, assumptions and unresolved dependencies carried over from `reports/batch-02/invention.md`.
5. `publication/manifest.yaml` — every public record id, page id, and asset path with its SHA-256. Nothing enters the bundle implicitly.
6. `publication/limitations.md`-equivalent content inside `pages/` (the design requires a `/limitations/` route).

Expected: validation green; the exported bundle contains only allowlisted content; no local artifact with a non-`public-local-copy` right appears in the output; export is deterministic across two runs.

### Task 4 — The reader app

Goal: the Astro + Pagefind static site.

Steps
1. `tools/reader-site/` package: Astro with TypeScript content schemas; Pagefind for static full-text search over rendered approved pages only.
2. Design tokens in `src/styles/tokens.css` (CSS custom properties only): warm paper surfaces, high-contrast charcoal text, muted blue/teal navigation and relationship cues, amber for AI notes and assumptions, explicit warning styling for unresolved states. No stock Quartz theme, no Quartz dependency.
3. Layout shell: primary nav Start here / Methods / Compare evidence / Sources / Glossary; secondary nav New invention / Egypt annex / How the research was produced / Audit links and limitations. Page shell, skip link, landmarks, visible focus, reduced-motion support, mobile-first layout with no horizontal page scrolling.
4. Routes: `/`, `/start/`, `/methods/`, `/methods/<slug>/`, `/compare/`, `/sources/`, `/sources/<id>/`, `/glossary/`, `/invention/`, `/egypt/`, `/research-method/`, `/limitations/`.
5. Method page renders the eleven sections in the design's order, including the criterion scorecard with its evidence basis, the visible AI gap-closing notes, the source cards, and the audit drawer (internal ids, versions, public-safe audit links, dissent).
6. Comparison page: table plus card view, one-criterion sorting, unknown-last by default and a "Find evidence gaps" mode that puts unknown first, evidence-basis filters, side-by-side selection, no aggregate ranking, and a readable unsorted table when client JavaScript fails.
7. Tooltips on hover **and** keyboard focus, each linking to a full glossary entry; no information available only to pointer users.
8. Client JavaScript is limited to comparison sorting and filtering. Nothing at runtime can change a claim, score, evidence state or approval.
9. Backlinks are generated from the structured relationships; no hand-maintained backlink lists.
10. Tests: rendering tests per route; sorting tests covering scores, unknowns and not-applicable; evidence-basis filter tests that assert no relabeling; tooltip keyboard tests; JavaScript-failure readability test; no-repository-path test over the built output; mobile/keyboard assertions.

Expected: `npm run build` produces the site and the Pagefind index; the built output contains no repository-local path and no session-log reference; all reader tests pass.

### Task 5 — CI: build without deploying, and a gated deploy

Goal: the design's §12.7 split between build and deployment.

Steps
1. `.github/workflows/build.yml` — on pull request and push: install, validate the publication layer, run the contract tests, export the bundle, build the site, upload a content-addressed artifact. It **cannot** deploy.
2. `.github/workflows/deploy.yml` — `workflow_dispatch` only, requiring the approved commit SHA, the publication version, the build-run id and the artifact SHA-256; it verifies those against the operator-approval record in `state/workflow.yaml` and against the publication manifest, and only then deploys that exact artifact to GitHub Pages, accounting for the repository subpath.
3. A negative test asserts the build workflow contains no deploy step and the deploy workflow refuses a mismatched approval record.

Expected: both workflow files lint; the approval-verification logic is covered by a named test.

### Task 6 — Release preparation and the acceptance gate

Goal: everything a public release needs, short of the operator's approval and the deploy itself.

Steps
1. Full validation suite: contract tests, reader tests, schema determinism, export determinism and idempotence.
2. Rights and exposure audit: no repository-local path, no session log, no credential, no unresolved-rights or `link-only` local artifact in the built output; every published record traceable to the manifest.
3. Scientific review rehearsal: a written pass over every claim's evidence state, every score's rationale, every dissent and every AI label, with findings recorded. This is a rehearsal of the design's §14.5 human review, not a substitute for it — the operator's decision (R2) is that external readers and, optionally, an AI second layer perform the critique.
4. Accessibility and responsive checks: automated checks on representative routes, a keyboard-only walkthrough, contrast and non-color status review, reduced-motion behaviour, and an RTL smoke fixture before any Arabic content exists.
5. Local preview of the built site.
6. Record the checkpoint in `state/workflow.yaml` and `state/session-log.md`, plus the root planning files.

Expected: every check green or explicitly recorded as a finding with an owner; the operator receives one decision: approve this exact commit for merge, push and deployment, or not.

## 6. Acceptance criteria for this plan

1. The six method families are readable by a non-specialist in plain language, with every factual claim reaching a locator or being explicitly `source-not-located` / `source-conflicted` / an unresolved question.
2. Source content, inference, AI gap-closing notes and the invention cannot be confused visually or structurally.
3. Methods sort by separate rubric-backed criteria; unknown and not-applicable are displayed correctly and never averaged.
4. Every method states its missing evidence and the categories of human validation still required.
5. The public bundle contains only allowlisted content and redistribution-cleared local assets.
6. Audit ids, public-safe audit links, dissent and versions remain reachable without dominating reader navigation.
7. The core content is readable on mobile, by keyboard, and when client JavaScript fails.
8. No repository-local path, session log, credential or unresolved-rights asset appears in the built output.
9. The publication record proves the six-family landscape was completed before the invention was generated, and that the reader app was not populated from an invention-first review.
10. The site never asserts safety, regulatory, economic, environmental-superiority, novelty or patentability conclusions.

## 7. Deferred (design §18)

Arabic content and full RTL localisation; individual accounts or a private deployment mode; authenticated moderation; provider-neutral automated research runs; a separate AI reviewer that reads the frozen package and proposes structured corrections; a global relationship graph; user-adjustable composite scoring; a database or CMS; broader material ontologies.

The operator may authorise the AI second-layer reviewer separately. When they do, it reads the frozen package and proposes structured corrections; it never approves and never publishes.

## 8. Related records

`docs/superpowers/specs/2026-11-13-butt-lab-reader-platform-design.md`; `docs/publication-content-contract.md`; `docs/superpowers/plans/2026-11-14-publication-content-contract.md`; `reports/batch-02/HANDOFF-BRIEF.md`; `reports/batch-02/methods/`; `reports/batch-02/invention.md`; `reports/batch-02/egypt-annex.md`; `reports/batch-02/evidence-gaps/`; `reports/final/batch-01-synthesis.md`; `reports/final/validation-and-open-questions.md`; `registry/methods.yaml`; `charter.md`; `state/workflow.yaml`; `state/session-log.md`.
