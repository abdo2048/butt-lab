# Release checklist — Butt Lab reader site

**Prepared:** 2026-11-18 · **Branch:** `feat/reader-platform` · **Site:** `tools/reader-site/`
**Decision status:** awaiting the operator's decision. **Nothing is deployed, published, or
experimentally validated.**

This checklist records every release check that was run, the exact command, and the result.
It is a record of what was checked and what was found — not a certification, not a sign-off,
and not a claim that the content is correct. The content itself was produced by an AI
Scientist-Inventor desk review with **no human sign-off recorded**; the judgement about its
scientific quality belongs to the trained readers the project is written for.

---

## 1. What this release is

A static reader for the published cigarette-butt recycling knowledge base: 134 approved
published records, 10 narrative pages, and a Pagefind search index, rendered as 28 static
pages. The site consumes the **exported publication bundle only**; the source registries are
never read at build time and never reach the built output.

The three claims this project refuses to make — *clean*, *safe*, *validated* — are not made
anywhere in the site or in this checklist. The inventions on the site are labelled
`new-unvalidated-hypothesis`. Every quantitative gap stays `parameter-not-located`.

## 2. The release candidate

The candidate is commit **`65d429f`** on `origin/feat/reader-platform` — the Phase D
commit. The exact commit hash is recorded in `state/workflow.yaml` under
`release_gate.release_candidate` and repeated in `state/session-log.md`.

The commit that follows `65d429f` only writes that hash into the two state files.
It changes **no site byte**, so the built site and the artifact hash are identical
from either commit. When you package the artifact, set `SOURCE_COMMIT=65d429f` so
that the artifact manifest, your approval record and this checklist all name the
same commit.

To confirm what you are approving:

```powershell
git -C C:\w\rp fetch origin
git -C C:\w\rp log --oneline -3 origin/feat/reader-platform
git -C C:\w\rp show --stat 65d429f
git -C C:\w\rp status --short            # must print nothing
```

The approval record you write must name that commit **and** the sha256 of the artifact you
built from it. The gate refuses every deployment whose commit, publication version, build
run, artifact hash, or file bytes do not match.

## 3. Automated checks — all green

| # | Check | Command | Result |
|---|-------|---------|--------|
| 1 | Publication contract suite | `npm test` in `tools/publication-contract` | **207 tests, 206 pass, 1 skipped, 0 fail** (the skip is a Windows symlink case) |
| 2 | Publication validation | `npm run validate` in `tools/publication-contract` | `VALID records=134 pages=10 assets=0` |
| 3 | Contract typecheck | `npx tsc --noEmit` in `tools/publication-contract` | exit 0 |
| 4 | Reader site suite | `node --test tests/*.test.ts` in `tools/reader-site` | **152 tests, 152 pass, 0 fail, 0 skipped** |
| 5 | Reader site typecheck | `npx tsc --noEmit` in `tools/reader-site` | exit 0 |
| 6 | Static build | `npm run build` in `tools/reader-site` | exit 0 — `28 page(s) built`; Pagefind `Indexed 28 pages`, `Indexed 2056 words` |
| 7 | Release audit | `npm run audit:release` in `tools/reader-site` | exit 0 — `AUDIT records=134 findings=0 blocking=0 review=0 passed=true` |
| 8 | Hosting dry run | `npx wrangler deploy --dry-run` in `tools/reader-site` | exit 0 — `Read 121 files from the assets directory`, `Total Upload: 0.31 KiB`, `--dry-run: exiting now` (nothing uploaded) |

Checks 4–7 are wired into `.github/workflows/build.yml`, so the same gates run on every push
and pull request. The build workflow contains no deploy step and no secret.

## 4. Rights and exposure audit

`tools/reader-site/scripts/release-audit.ts` → `scanBuiltOutput()` walks every file in
`dist/` and reports:

| Check | Code | Result over the real build |
|-------|------|---------------------------|
| A repository-local path in the built output (`C:\…`, `/home/…`, `/Users/…`, or a repo-relative root such as `state/`, `docs/`, `tools/`, `publication/`, `registry/`, `operator/`, `reports/`) | `REPOSITORY_PATH_LEAK` | **none** |
| A session-log reference (`session log`, `session-log`, `session_log`) | `SESSION_LOG_REFERENCE` | **none** |
| A credential-shaped string (private-key header, `AKIA…`, `sk-…`, `gh?_…`, `Bearer …`, an `api_key`/`password` assignment) | `CREDENTIAL_PATTERN` | **none** |
| A source whose rights are unresolved | `RIGHTS_UNRESOLVED` | **none** |
| A `link-only` or `rights-unresolved` source that nevertheless carries a local derivative | `RIGHTS_DERIVATIVE_CONFLICT` | **none** |

Binary files (the self-hosted `.woff2` fonts) are skipped by extension and by a NUL-byte
check; text files are scanned in full. Repo-relative roots are only matched at a path
boundary, so an ordinary `https://…/docs/…` URL in the content is not a false positive.

**Rights position of the published corpus:** all 12 sources are `link-only` with **zero**
derivatives, so no publisher text, figure, or dataset is redistributed. Source types:
4 web pages, 4 patents, 3 papers, 1 company record. The site links out and does not copy.

## 5. Scientific review rehearsal

This rehearsal asks: *could a trained reviewer read every statement on the site and tell what
kind of statement it is?* The audit checks it mechanically over all 134 records.

### 5.1 Corpus census (measured from `src/content/bundle/records.json`)

| Kind | Count |
|------|-------|
| source | 12 |
| term | 10 |
| hypothesis | 3 |
| method-family | 6 |
| assessment | 48 |
| claim | 37 |
| gap | 17 |
| material | 1 |
| **total** | **134** |

Every record is `publicationState: approved` (134/134).

### 5.2 Evidence states (the five-label discipline, in the data)

| Evidence state | Records |
|----------------|---------|
| `source-supported` | 9 |
| `derived-from-sourced-premises` | 16 |
| `source-not-located` | 32 |
| `ai-proposal` (claim content kind) / `ai-gap-closing-note` (gap content kind) | see below |
| `unverified` | 0 records carry this state explicitly |

Where a record carries no evidence state (77 of 134 — sources, terms, method families,
materials), the state is carried by its role instead: a source is a citation, a method family
is a synthesis, and its assessments and claims carry the states.

### 5.3 What the audit enforces (all satisfied over the real corpus)

| Rule | Code | Corpus |
|------|------|--------|
| A `scored` assessment states its rationale | `ASSESSMENT_RATIONALE_MISSING` | 41/41 scored assessments carry a rationale |
| An `unknown` assessment states why it is unknown | `ASSESSMENT_UNKNOWN_REASON_MISSING` | 7/7 unknown assessments carry a reason |
| A hypothesis is not marked validated | `HYPOTHESIS_VALIDATION_STATE` | 3/3 are `new-unvalidated-hypothesis` |
| A hypothesis states assumptions, failure modes, falsifiers, unresolved dependencies | `HYPOTHESIS_SECTION_MISSING` | 3/3 carry all four |
| A gap states its falsifier/decision condition and its next human work | (gap completeness) | 17/17 carry both; all 17 are `requires-human-validation` |
| Every cross-reference points at a record that exists | `DANGLING_REFERENCE` | **none** |
| No positive declaration of *safe / clean / detoxified / non-toxic / commercially validated / fully validated / de-risked / patentable / ready to deploy / costed / novel* | `FORBIDDEN_DECLARATION` (severity: review) | **none** (negated forms such as "is not safe" are correctly ignored) |

### 5.4 Dissent and openness — what is actually in the corpus

This is the part a reviewer should look at closely, and it is stated here plainly rather than
glossed:

- **7 of 48 assessments are `unknown`** — each carries its own `unknownReason`. Unknown is
  reported as unknown; it is never scored as zero.
- **17 gaps** carry an explicit `falsifierOrDecisionCondition` and `nextHumanWork`. 11 are
  `unresolved-question` with `evidenceState: source-not-located`; 6 are `ai-gap-closing-note`
  with `evidenceState: derived-from-sourced-premises`, each naming the source inputs it was
  reasoned from, and each still `requires-human-validation`.
- **3 hypotheses** each carry assumptions, failure modes, falsifiers and unresolved
  dependencies, and each is `new-unvalidated-hypothesis`.
- **All 48 assessments have `basis: inference` where scored** — none claims a source-supported
  score. 41 assessments carry supporting claim ids.
- **Structured counterevidence is empty.** No assessment lists `conflictingClaimIds` and no
  claim lists `counterevidenceClaimIds` (0 and 0). Dissent in this corpus is carried in prose
  (failure modes, falsifiers, unknown reasons, unresolved questions), **not** in structured
  contradiction edges. A reviewer should not read the empty structured channel as "no
  dissent" — dissent exists as text, and the absence of structured edges is a gap in the
  representation, not a proof of agreement.
- **88 records carry a `reviewer` string, and every one of them says
  "(no human sign-off recorded)"** — two reviewer identities, both AI desk reviews
  (`butt-lab batch-02 AI desk review` and `butt-lab Scientist-Inventor AI desk review`).
  Nothing in this corpus has been signed off by a human reviewer.
- 9 records carry `auditReferences` (the audit trail to the originating work).

## 6. Accessibility and responsive checks

### 6.1 Automated, over every built page and the authored CSS

| Check | Code | Result |
|-------|------|--------|
| Every page declares a language | `PAGE_LANG_MISSING` | none |
| Every page has a `<title>` | `PAGE_TITLE_MISSING` | none |
| Every page has the skip link to `#main` | `PAGE_SKIP_LINK_MISSING` | none |
| Every page has the `<main id="main">` landmark | `PAGE_MAIN_LANDMARK_MISSING` | none |
| Every page has the labelled primary `<nav>` landmark | `PAGE_NAV_LANDMARK_MISSING` | none |
| Status is never conveyed by colour alone | `STATUS_NOT_CONVEYRED_IN_TEXT` | none — every five-tick score band is accompanied by a text score and a labelled chip |
| The CSS defines a visible focus style | `FOCUS_VISIBLE_MISSING` | none |
| The CSS honours `prefers-reduced-motion` | `REDUCED_MOTION_MISSING` | none |
| Text contrast meets WCAG AA (4.5:1 normal, 3:1 large) | `CONTRAST_BELOW_AA` | none after the fix in §7.1 |

### 6.2 Real browser checks (Chromium, live preview at `http://localhost:4321`)

| Check | Method | Result |
|-------|--------|--------|
| Console errors | `browser.console` on `/` and `/methods/` | **none** |
| Keyboard-only traversal | 10 × `Tab` on `/`, reading `document.activeElement` each time | order: skip link → brand → search input → search button → 6 primary-nav links; **every focused element showed `outline: solid 2px rgb(44, 74, 110)`** |
| Skip link | `Tab` to the skip link, `Enter` | `location.hash === "#main"`, page scrolled; the next `Tab` lands on a link **inside** `<main id="main">` |
| Right-to-left | `document.documentElement.dir = "rtl"` | body computes `direction: rtl`, **no horizontal overflow** (scrollWidth 985 ≤ viewport 1000) |
| Right-to-left at 360 px | the same page inside a 360 px iframe | `direction: rtl`, **no horizontal overflow** (scrollWidth 345 ≤ 360) |
| Narrow viewport | `/methods/` in a 360 px iframe | no horizontal overflow (345 ≤ 360); primary nav wraps below the header; 21 method entries rendered; document title present |
| Lighthouse | in-browser Lighthouse on `/methods/` | **accessibility 1.0, best-practices 1.0, SEO 1.0, zero failures** |
| Search works | `fill` the search box with `aluminium`, submit the form | status **`28 page(s) match “aluminium”.`**, 12 result links with 12 excerpts rendered, no console errors |
| Search is honest | same form, nonsense query `zzzqqq` | status **`No page matches “zzzqqq”.`** with 0 links — no invented matches |
| Search stays lazy | inspect the built HTML | the Pagefind path appears only inside a dynamic `import()`; there is **no eager** `<script src=…pagefind…>` tag; the `<noscript>` browse route remains |

**How the search was driven, honestly:** the browser harness could not deliver raw key presses
to the preview window (`document.hasFocus()` was false), so the value was set with the
harness's fill operation and the form was submitted through its own submit path
(`requestSubmit()`), which is the same path an `Enter` key press takes. Typing with a real
keyboard was therefore not exercised end-to-end; the operator should confirm it once in a
normal browser.

## 7. Defects found during release preparation

Two real defects were found by these checks. Both are fixed, and both fixes are covered by
tests that failed before the fix.

### 7.1 Contrast failure (found by the automated audit)

`--ink-faint` (`#7b8490`) was used for small text (0.64–0.72 rem) in nine places —
`.record-id`, `.chip--not-applicable`, `.chip--none`, `.drawer__body dt`,
`.record-list__meta`, `.specimen dt`, `.control__label`, `.compare-card dt`,
`.source-card__meta`. On the paper surfaces it gave **3.30:1** against the 4.5:1 AA
requirement for normal text. Nine blocking `CONTRAST_BELOW_AA` findings, all at the same
ratio.

Fixed in `src/styles/tokens.css`: `--ink-faint: #7b8490 → #5b6470` and
`--ink-muted: #56616d → #4f5a66`. The new faint ink measures 5.23:1 on paper, 5.66:1 on
raised paper and 4.69:1 on sunken paper — all above 4.5 — and the hierarchy is preserved
(ink 13.78 > muted ≈6.6 > faint 5.23).

### 7.2 The search was broken in the built site (found by driving it in a real browser)

The search form always reported *"Search is not available in this build."* The cause was
measurable, not visible in the source: Pagefind's `search()` returns `results` as a **plain
array** of `{id, score, words, data}` items, each with its own `data()` promise. The old code
called `found.results.slice(0, 12).data()` — calling `.data()` on the array — which threw a
`TypeError` that the catch branch swallowed, and it also called a non-existent
`found.results.count()`. The Pagefind module itself was loading correctly (200 on
`/pagefind/pagefind.js` and `/pagefind/pagefind-entry.json`); only the call shape was wrong.

Fixed by moving the logic into two testable pieces: `src/lib/search.ts` (DOM-free helpers:
`isMatch`, `countMatches`, `collectSearchHits`, `searchStatusText`) and
`src/scripts/search.ts` (the client wiring, with the Pagefind module loaded through a
variable specifier so it stays lazy). `BaseLayout.astro` now loads that script instead of
carrying an inline copy. The status text is now honest in both directions: a real query
reports the real count, a nonsense query reports *"No page matches …"* with no results.

## 8. Known limitations — what was **not** verified

Read this section as part of the release decision, not as an appendix.

1. **The contrast audit resolves backgrounds per CSS rule.** Where a colour is inherited from
   an ancestor rule rather than declared on the rule itself, the audit's background is an
   approximation. Every `--ink-faint` and `--ink-muted` use was therefore read by hand and
   confirmed to sit on a light surface. This is a limitation of the automation, not a
   clearance.
2. **Interactive search was not exercised with real key presses** in the automated harness
   (§6.2). The submit path is proven; the keystroke path is not.
3. **The automated browser checks were run on Chromium only.** No Firefox, Safari or
   mobile-browser pass was performed.
4. **Lighthouse was run on `/methods/`**, one representative page. The automated audit covers
   every page for landmarks, titles and language, but Lighthouse did not.
5. **A custom 404 page was deliberately not built.** Cloudflare's default 404 answers an
   unmatched path. If a designed 404 is wanted, that is a separate, later piece of work.
6. **One dependency advisory is outstanding:** `npm audit` reports 10 high findings, all
   chaining to a single upstream advisory — picomatch ReDoS, `GHSA-fc5q-39xc-vjpf`, affecting
   every published version up to and including 4.0.7, so **no fixed release exists**. It is a
   build-time dependency and is not shipped in the static artifact. An npm override was tried
   and removed because it bought no security. Disclosed rather than hidden.
7. **No content was scientifically signed off.** 88 of 134 records carry a reviewer string and
   every one of those strings says the review was an AI desk review with no human sign-off.
   The judgements the project exists for — what is good, bad, worth enhancing, replacing or
   editing — are still outstanding, by design.
8. **Nothing has been deployed.** The hosting configuration has passed a dry run only.

## 9. The one decision

> **Approve this exact commit for merge, push and deployment — or not.**

- **Approve** → follow `docs/DEPLOY.md` from step 1; it is written to be followed by hand,
  with no AI present. The gate still verifies the artifact against your approval record
  before anything is uploaded, and it refuses if anything differs.
- **Do not approve** → nothing is lost and nothing is exposed: the site is a local static
  build, the deploy workflow cannot run without your approval record, and the
  `operator/deployment-approval.json` file does not exist.

Either way, this checklist, the audit and the gate stay in the repository, and the review
can continue as long as it needs to.

## 10. Where everything lives

| What | Where |
|------|-------|
| This checklist | `docs/RELEASE-CHECKLIST.md` |
| The automated audit | `tools/reader-site/scripts/release-audit.ts` (`npm run audit:release`) |
| The audit's own tests | `tools/reader-site/tests/release-audit.test.ts`, `tools/reader-site/tests/search.test.ts` |
| The manual deployment guide | `docs/DEPLOY.md` |
| The hosting configuration | `tools/reader-site/wrangler.jsonc` |
| The approval template | `operator/deployment-approval.template.json` |
| The build gate | `.github/workflows/build.yml` (builds; cannot deploy) |
| The gated deploy path | `.github/workflows/deploy.yml` (`workflow_dispatch` only) |
| The durable plan and its ledger | `docs/BUILD-PLAN.md` |
| Current machine-readable state | `state/workflow.yaml` |
| The dated working log | `state/session-log.md` |
