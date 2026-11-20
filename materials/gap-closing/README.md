# `materials/gap-closing/` — what this folder is and is not

This is **research input**, not publication input. Nothing here is exported to the
reader site, and nothing here is a claim. It holds the retrieved originals for the two
gap-closing retrieval passes, the text-extraction audit that was run over them, and the
curated working shelf. 224 MB on disk, of which about 207 MB is PDF.

Four subfolders, four different jobs:

| Folder | Job | Holds |
| --- | --- | --- |
| `library/` | Curated working shelf | 36 PDFs (papers, patents, agency reports, company guides), 12 page-indexed reading copies (`*_text.md`) and their `*_text/` figure crops (146 images) |
| `ocr-audit/` | Extraction-quality audit of 34 PDFs | `catalogue.csv` (SHA-256, pages, verified bibliographic metadata, document type, identification confidence, extraction status, proposed filename, duplicate_of), `proposed-renames.csv`, `extraction-problems.md`, `extracted/` full-text attempts, `ocr-derivatives/` per-document page OCR |
| `round-1/` | Batch-01 follow-up retrieval (started 2026-11-08) | Patents FR3066128B1/A1 and related facsimiles, a disclosure/assumption review against J-H-01, the gap-closing tracker, retrieval receipts, state |
| `round-2/` | Public-document pass for named companies (Keenat, MéGo!, Re-Cig, one Korean article) | Downloaded company and authority documents, evidence snapshots, crawl logs, and the round-2 report |

## The naming / OCR episode, recorded so it is not misread later

The audit pass was run because the shelf had accumulated PDFs under inconsistent names.
The tooling read the front matter and the extracted text, verified identity (title,
authors, year, DOI or document number), flagged exact duplicates by SHA-256, and wrote
proposed filenames to `proposed-renames.csv`.

Two limits of that pass are easy to overstate:

- **It is not a full-text OCR of every PDF.** Full text came from `pypdf` / `pdftotext`
  where the PDF had a text layer. OCR (Tesseract 5, 300 DPI) ran **only on the pages
  those tools returned empty** — 138 pages across the corpus. `ocr-derivatives/` is
  therefore page-level derivative output, not a transcript of each document.
- **The proposed names were proposals.** The original stems were kept because they
  encode bibliographic identity, and some of them still carry mojibake from earlier
  downloads. A filename here is a locator, not a citation.

`extraction-problems.md` lists what could not be recovered and why: 40 intentionally
blank gazette pages, French patents with custom Type1/WinAnsi encodings that
`pypdf`/`pdftotext` cannot decode, and four exact duplicate groups. Blank or
unreadable pages are recorded, never filled with guessed text.

## The reading copies are derivatives, and they are legacy

`library/*_text.md` and `library/*_text/` are the earlier generation of the local
reading library: page-indexed Markdown with inline figure crops. They are kept because
they are already tracked and cited in review notes.

The current generator, `scripts/prepare_library.py`, **refuses** to write into
`materials/`, `publication/` or `tools/` and defaults to the Git-ignored
`.research-local/library/`. So the tracked copies are a frozen earlier run, not
something the current tooling maintains. `docs/LOCAL-LIBRARY.md` describes the current
behaviour.

On 2026-11-20 the 59 PNG crops that existed only on
`feat/publication-content-contract` were copied in at their original paths, so that all
146 image references in the 12 reading copies resolve. One folder whose name had
drifted from the reading copy's links was renamed to match. No PDF bytes, no text and
no citation changed in that pass.

## Rules that apply inside this folder

- Originals are read-only. Add a version or a correction record; do not rewrite a
  retrieved document.
- An embedded text layer, an OCR derivative and a page image are different evidence
  classes, and a derivative is never promoted to "the document".
- Rights are per file and were not cleared by retrieval. Do not publish a PDF, a
  transcript or an extracted image from here without a separate rights review. Two
  consented public copies live in `publication/assets/` and are listed in the manifest;
  they are not a precedent for the rest.
- Duplicate PDFs still exist in more than one folder (about 15 MB). Deduplication is a
  content decision, not a cleanup script's.
