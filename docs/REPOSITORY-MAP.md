# Butt Lab: repository map and next decisions

## Current state (2026-11-24) — read this first

**Where things stand.** The live site at `https://butt-lab.am6.workers.dev/` serves
commit `c57b249` (Cloudflare version `88ba22a0`), deployed 2026-11-24. Local `main`
and the live site are the same artifact. The approval for these exact bytes is in
`operator/deployment-approval.json`; the deploy sequence is in `docs/DEPLOY.md`.

**What the last four passes did** (full detail in `state/session-log.md`, entries
E11–E14, and the ledger in `docs/BUILD-PLAN.md`):

| Pass | What changed |
| --- | --- |
| E11 | One front door: retired root docs + batch-01 scaffolding moved to `archive/` (see below). Removed the reader build's per-file bundle SHA-256 check by operator decision; the **deployment artifact gate is unchanged**. |
| E12 | Inverted the site: the comparison table is the spine, a tech-docs **sidebar** guides the journey, family pages are reference detail behind each row, and a new **`/test-first/`** page gives a qualified team an actionable reading order. |
| E13 | **`/companies/` now explains each company's method** step by step (what it makes, where the waste goes, figures it publishes, what is unknown) — not just "discloses / does not disclose". |
| E14 | Handoff pass: state files and the README updated so any AI can catch up with E11–E13 without reading git history. |

**What is left, in priority order:**
1. **Promote the four omission findings** into new claims or route updates: Shah 2023 (15-strategy review), Teixeira 2017 (measured dark-liquor COD/nicotine + effluent reuse), Hudina 2026 (solvent cleaning, no heavy metals), RE-CIG permit (product criteria lack Cd/Pb/As/Hg). See `docs/review/claim-ledger.md`.
2. **Close gaps per company method** (with sources or labelled AI proposals), one company at a time — the operator's original vision.
3. Optionally fix the **pre-existing cbor test** (`release-audit.test.ts:126`) so the suite is fully green. Tests are currently 200/201; that one failure predates recent work.

**Guardrails that still bind:** metals stop-condition (an uncharacterised Cd/Pb/As/Hg
stream stays on hold); four-field sink accounting; never claim
clean/safe/validated/novel/patentable/deployable/costed; unknown ≠ zero; no invented
numbers; company self-report is not measurement; AI gap content stays labelled. The
repo is **public for now** (operator will make it private later). Machine-readable
state and fuller handoff notes: `state/workflow.yaml` (`handoff_notes`).

## Branches are not worktrees

A branch is a Git history pointer. A worktree is a folder with files checked out at one revision. `git worktree list` sees worktrees of **this clone**, not folders on the operator's machine. This Arena clone has one worktree on `arena/2dc0ddeb-butt-lab`. Use `git worktree list` in your own clone to see the folders you created there.

| Ref | What to use it for |
| --- | --- |
| `origin/main` | Shared baseline for the reader and research history. `main` is not proof of what's deployed; the Worker serves the last uploaded artifact. |
| `feat/reader-platform` (`b3b53bd`) | Already an ancestor of `main`; no merge needed. It has the same 36 library PDFs and 12 existing text extracts as the shared baseline. |
| `feat/publication-content-contract` (`19d1716`) | Historical contract fork and 59 additional extracted PNGs. Its last common ancestor with the reader baseline is `d30adba`. Do not merge the branch: it has an older implementation of the contract. Its 59 figure crops were copied into `main` on 2026-11-20 at their original paths (see below); the branch itself remains unmerged and can be deleted. |
| Current Arena branch | Proposed reader/library changes. Review the branch and its preview before making a release decision. Keep this branch as the only writable checkout for this session. |

To inspect a branch without switching, use `git ls-remote --heads origin`, `git fetch origin <branch>`, `git log -1 FETCH_HEAD`, or `git diff HEAD FETCH_HEAD -- materials/gap-closing/library`. See [the earlier review](READER-REFRESH.md) for CI history.

## The main logic: research and publication are separate

| Layer | Where | Rule |
| --- | --- | --- |
| Original evidence | `sources/` — one folder per document (`document.pdf` + `text.md`) — plus the retrieval receipts in `materials/gap-closing/` | Preserve the source bytes and citations; keep the OCR audit and round receipts as provenance. Start at `sources/README.md` and `sources/INDEX.md`. |
| Local reading copies | `.research-local/library/` | Generated Markdown, per-page figure images and a searchable inventory. Read a page here, but verify claims against the PDF. This is **not** an Astro input. |
| Internal workflow and notes | `.research-local/RESEARCH-PLAYBOOK.md` and a private copy you control | These are for you, not the public reader. `.research-local/` is Git-ignored, not a backup or a permission system. Do not store private notes in a public commit. |
| Research record | `registry/`, `reports/`, `inventions/` | Keep raw findings, uncertainty, and proposed changes distinguishable. Do not use publication counts as a measure of review depth. |
| Curated, public content | `tools/publication-contract/layer-data/` → `publication/manifest.yaml` and generated records/pages | Use stable IDs, source locators, review state and explicit rights. Regenerate and validate after edits. Only the allowlist goes into the export. |
| Website and release | Astro/Pagefind in `tools/reader-site/` → `dist/` → exact artifact → Cloudflare | Do not import the reading cache into the reader. Test the built preview before releasing the exact artifact with [the deploy guide](DEPLOY.md). |

The public **About the evidence** page explains what a reader can and cannot conclude and how to submit a correction. It does not expose the operator's workflow. The playbook is no longer a public route, bundle page, or search document. Git is historical: material from earlier commits can still exist in clones and patches. Keep a private copy of the local playbook if you need to retain it across worktrees or after the sandbox ends.

## Archive (2026-11-23): one front door

The repository now has one clear entry path: `README.md` → `GLOSSARY.md` →
`charter.md` (plus `AGENTS.md` for AI instructions). The obsolete root orientation
documents and the batch-01 scaffolding were moved with `git mv` into `archive/`:
`START_HERE`, `WORKFLOW`, `TASK`, `OPERATOR_GUIDE`, `PROJECT-OVERVIEW`,
`FUSION_PROTOCOL`, `PACKET_ACCESS`, `CHECKPOINT-MASTER`, `CHECKPOINT-WEB-AI`, and the
`panels/`, `packets/`, `dossier/`, `specs/`, `agents/`, `experiments/`,
`post-project/`, `reviews/` directories, plus `reports/stage1` and `reports/stage2`
(as `archive/reports-stage1`, `archive/reports-stage2`). See `archive/README.md`.

This implements the structure proposed in plan-agent message
`msg_1f7eb91f70013w7hBBdmLPWllU` ("one shelf, one glossary, one door, everything else
archived"). Nothing in `archive/` is read by the reader build. Active references were
updated: `charter.md` points to `archive/WORKFLOW.md`; the registry evidence notes and
`scripts/validate_registry.py` point to `archive/dossier/evidence/`;
`inventions/TEMPLATE.md` points to `archive/specs/TEMPLATE.md`. The publication
validator and the release audit still reject references and path leaks into
`archive/`. Historical receipts in `materials/gap-closing/` and the frozen
`docs/history/` keep their original paths as provenance. `docs/history/` was not moved.

## Reading copies: two generations, one of them tracked

There are two kinds of local reading copy, and they must not be confused:

| Generation | Where | Status |
| --- | --- | --- |
| Earlier run (legacy) | `sources/<id>/text.md` plus `sources/<id>/figures/` (moved here from `materials/gap-closing/library/` on 2026-11-22) | Git-tracked, 12 of the 49 text files. Image links were rewritten from `*_text/` to `figures/`; 798 references checked, none broken |
| Current generator | `.research-local/library/` (`reading.md`, `images/`, `reading.json`, `inventory.json`, `INDEX.md`) | Git-ignored, regenerated on demand by `scripts/prepare_library.py` |

`scripts/prepare_library.py` prints a refusal if `--output` points inside `materials/`, `publication/` or `tools/`, so a rerun cannot re-pollute the tracked tree. Read a legacy `*_text.md` when it already answers a question, but treat the PDF as the document: the Markdown is a derivative with its own extraction status.

`sources/README.md` states the one rule that matters there: the PDF is for people, the Markdown is for AI readers, and the PDF wins where they disagree. `materials/gap-closing/README.md` records what the receipts folder still holds, what the OCR audit did and did not do, and why the original filenames inside its CSVs are historical rather than current paths.

## Download layer: `sources/` is served directly

The reader site publishes the whole shelf. `src/lib/documents.ts` scans `sources/` at build time, `src/pages/documents/[id].pdf.ts` emits one static file per document at `/documents/<id>.pdf`, and `/documents/` lists all 50 with sizes. There is no curated `publication/assets/` folder any more; it was removed on 2026-11-22, and the two PDFs it held (Novotny 2009, Rahman 2020) are ordinary shelf documents.

Two id universes meet in `sources/links.json`: bibliographic record ids from `publication/records/sources/` and shelf ids derived from filenames. Only the hand-checked pairs are listed; a record with no entry gets no download button rather than a guessed one.

The shelf is 184.7 MB across 50 files. `pan-nanofiber-2024` is 25.7 MB, above Cloudflare's 25 MiB per-asset limit, so it is **not** staged into the build: `REMOTE_DOCUMENTS` in `src/lib/documents.ts` links it at an external (Dropbox) copy, the shelf row says so, and `auditPublicPdfs` blocks if it is ever staged. The other 49 PDFs are served from `/documents/<id>.pdf`. This is already handled and deployed.

## Reader-site source files (there is no `global.css`)

`tools/reader-site/src/styles/` contains exactly three stylesheets. A search for `global.css`, `main.css` or `reset.css` will find nothing, and that is not a defect:

| File | Contains |
| --- | --- |
| `tokens.css` | Custom properties only — every colour, spacing and radius lives here, including the print tokens |
| `fonts.css` | `@font-face` blocks for the self-hosted `.woff2` files |
| `base.css` | Every rule in the site: base elements, layout shell, components, print block |

`base.css` **is** the global stylesheet. Edit colour values in `tokens.css`, not inline in `base.css`; the release audit computes WCAG contrast from the token values. Component classes are BEM-ish and live in the same file, so a large `base.css` is expected. `docs/DESIGN-REVIEW.md` records the last CSS-only review pass.

## Is Butt Lab done?

No. The reader and local library tooling are usable; the evidence synthesis is a work
in progress. The immediate next steps are in **"Current state"** at the top of this
file (redeploy, promote the four omissions, close gaps per company method). The
enduring research principles still apply:

1. **Review one route end to end.** Start with pulping or washing. Read the PDFs against their page images; match papers to theses and patent families, and extract an input/output/contaminant table with source locators. Separate supporting literature from actual trials. Finish this for one route before claiming comparable coverage across all routes.
2. **Audit the public result, not the file count.** Check document identity, numeric units and the denominator, rights, drift between family summaries and individual findings, and deduplicate variants. Use a source citation when an evidence gap closes. Keep hypotheses labelled when the gap is still open. Leave original PDFs untouched; clean derived text only when it improves a decision or corrects a verified error.
3. **Review the reader on real devices.** Check slow/mobile reading, long technical tables, terminology with non-experts, and enough context for technical reviewers. The sidebar appears at >=64rem; below that the top nav carries the same destinations. Then decide what to release; the preview does not change production.
4. **Keep validation distinct.** Independent lab and waste-handling decisions remain outside the desk record. No claim about performance, safety, or product use can be upgraded by converting more PDFs or polishing the site.

## Status after the navigation and reviewer-library pass

The inventory and branch decisions are complete for this Arena checkout: one worktree, on `arena/2dc0ddeb-butt-lab`. `feat/reader-platform` is already in `origin/main`; `feat/publication-content-contract` still diverges at `d30adba` and does not need merging for the images. No branch or worktree was deleted, merged, renamed, or pushed in this pass. Worktrees in your own clone were not inspected or changed.

**The operator confirmed that public access is temporary** for tool access and plans to restore private visibility. GitHub reports the repository is public for now, and the `origin/main` tree already includes 51 PDF paths under the evidence folder. Website authentication cannot make those Git copies private. If the intention is a public reader with private evidence, the recommended end state is one public reader repository containing code, citations and approved public files, with originals and internal notes in storage restricted to authorised reviewers. Use [the local reviewer library](REVIEWER-LIBRARY.md) now. Before any push, migration or history cleanup, decide the visibility and retention policy for the existing repository and review what historical commits, branches, forks or clones already exposed. The current worktree organisation does not require additional branches.

The separate password-protected reviewer Worker and 51-document inventory are prepared, but no hosted review files, secret, route or bucket have been set up. The private setup runbook is [Reviewer PDF access](REVIEWER-LIBRARY.md). No remote branch or worktree changes are needed to use it.
