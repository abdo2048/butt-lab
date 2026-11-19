# Butt Lab: repository map and next decisions

## Branches are not worktrees

A branch is a Git history pointer. A worktree is a folder with files checked out at one revision. `git worktree list` sees worktrees of **this clone**, not folders on the operator's machine. This Arena clone has one worktree on `arena/2dc0ddeb-butt-lab`. Use `git worktree list` in your own clone to see the folders you created there.

| Ref | What to use it for |
| --- | --- |
| `origin/main` | Shared baseline for the reader and research history. `main` is not proof of what's deployed; the Worker serves the last uploaded artifact. |
| `feat/reader-platform` (`b3b53bd`) | Already an ancestor of `main`; no merge needed. It has the same 36 library PDFs and 12 existing text extracts as the shared baseline. |
| `feat/publication-content-contract` (`19d1716`) | Historical contract fork and 59 additional extracted PNGs. Its last common ancestor with the reader baseline is `d30adba`. Do not merge it just to get the pictures: it has an older implementation and the PNGs can be regenerated from the source PDFs. |
| Current Arena branch | Proposed reader/library changes. Review the branch and its preview before making a release decision. Keep this branch as the only writable checkout for this session. |

To inspect a branch without switching, use `git ls-remote --heads origin`, `git fetch origin <branch>`, `git log -1 FETCH_HEAD`, or `git diff HEAD FETCH_HEAD -- materials/gap-closing/library`. See [the earlier review](READER-REFRESH.md) for CI history.

## The main logic: research and publication are separate

| Layer | Where | Rule |
| --- | --- | --- |
| Original evidence | `materials/gap-closing/` and retrieval receipts | Preserve the source bytes, licences and citations; keep the existing OCR exports as provenance. |
| Local reading copies | `.research-local/library/` | Generated Markdown, per-page figure images and a searchable inventory. Read a page here, but verify claims against the PDF. This is **not** an Astro input. |
| Internal workflow and notes | `.research-local/RESEARCH-PLAYBOOK.md` and a private copy you control | These are for you, not the public reader. `.research-local/` is Git-ignored, not a backup or a permission system. Do not store private notes in a public commit. |
| Research record | `registry/`, `reports/`, `inventions/` | Keep raw findings, uncertainty, and proposed changes distinguishable. Do not use publication counts as a measure of review depth. |
| Curated, public content | `tools/publication-contract/layer-data/` → `publication/manifest.yaml` and generated records/pages | Use stable IDs, source locators, review state and explicit rights. Regenerate and validate after edits. Only the allowlist goes into the export. |
| Website and release | Astro/Pagefind in `tools/reader-site/` → `dist/` → exact artifact → Cloudflare | Do not import the reading cache into the reader. Test the built preview before releasing the exact artifact with [the deploy guide](DEPLOY.md). |

The public **About the evidence** page explains what a reader can and cannot conclude and how to submit a correction. It does not expose the operator's workflow. The playbook is no longer a public route, bundle page, or search document. Git is historical: material from earlier commits can still exist in clones and patches. Keep a private copy of the local playbook if you need to retain it across worktrees or after the sandbox ends.

## Is Butt Lab done?

No. The reader and local library tooling are usable; the evidence synthesis is a work in progress. The next useful work is:

1. **Review one route end to end.** Start with pulping or washing. Read the PDFs against their page images; match papers to theses and patent families, and extract an input/output/contaminant table with source locators. Separate supporting literature from actual trials. Finish this for one route before claiming comparable coverage across all routes.
2. **Audit the public result, not the file count.** Check document identity, numeric units and the denominator, rights, drift between family summaries and individual findings, and deduplicate variants. Use a source citation when an evidence gap closes. Keep hypotheses labelled when the gap is still open. Leave original PDFs untouched; clean derived text only when it improves a decision or corrects a verified error.
3. **Review the reader on real devices.** The preview now has catalogue filtering and section jump links. Still check slow/mobile reading, long technical tables, terminology with non-experts, and enough context for technical reviewers. Then decide what to release; the preview does not change production.
4. **Keep validation distinct.** Independent lab and waste-handling decisions remain outside the desk record. No claim about performance, safety, or product use can be upgraded by converting more PDFs or polishing the site.

## Status after the navigation and reviewer-library pass

The inventory and branch decisions are complete for this Arena checkout: one worktree, on `arena/2dc0ddeb-butt-lab`. `feat/reader-platform` is already in `origin/main`; `feat/publication-content-contract` still diverges at `d30adba` and does not need merging for the images. No branch or worktree was deleted, merged, renamed, or pushed in this pass. Worktrees in your own clone were not inspected or changed.

**The operator confirmed that public access is temporary** for tool access and plans to restore private visibility. GitHub reports the repository is public for now, and the `origin/main` tree already includes 51 PDF paths under the evidence folder. Website authentication cannot make those Git copies private. If the intention is a public reader with private evidence, the recommended end state is one public reader repository containing code, citations and approved public files, with originals and internal notes in storage restricted to authorised reviewers. Use [the local reviewer library](REVIEWER-LIBRARY.md) now. Before any push, migration or history cleanup, decide the visibility and retention policy for the existing repository and review what historical commits, branches, forks or clones already exposed. The current worktree organisation does not require additional branches.

The separate password-protected reviewer Worker and 51-document inventory are prepared, but no hosted review files, secret, route or bucket have been set up. The private setup runbook is [Reviewer PDF access](REVIEWER-LIBRARY.md). No remote branch or worktree changes are needed to use it.
