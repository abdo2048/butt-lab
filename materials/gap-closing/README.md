# `materials/gap-closing/` — what this folder is and is not

This is **research process record**, not the document shelf. The documents themselves
now live in `sources/` at the repository root — one folder per document, holding
`document.pdf` (for people) and `text.md` (for AI readers). This folder keeps the
receipts of how they were found, audited and extracted.

On 2026-11-22 the `library/` shelf that used to sit here was consolidated into
`sources/`: 50 unique PDFs, the 37 new conversions, the 12 legacy reading copies and
their figure folders. Five byte-identical duplicates were removed. `ocr-audit/`,
`round-1/` and `round-2/` were left in place because they are the record of the work,
not the work itself.

The subfolders, and what each one still answers:

| Folder | Job | Holds |
| --- | --- | --- |
| `ocr-audit/` | Extraction-quality audit of 34 PDFs | `catalogue.csv` (SHA-256, pages, verified bibliographic metadata, document type, identification confidence, extraction status, proposed filename, duplicate_of), `proposed-renames.csv`, `extraction-problems.md`, `extracted/` full-text attempts, `ocr-derivatives/` per-document page OCR |
| `round-1/` | Batch-01 follow-up retrieval (started 2026-11-08) | Patent receipts for FR3066128B1/A1 and related facsimiles, a disclosure/assumption review against J-H-01, the gap-closing tracker, retrieval receipts, state |
| `round-2/` | Public-document pass for named companies (Keenat, MéGo!, Re-Cig, one Korean article) | Company and authority documents, evidence snapshots, crawl logs, and the round-2 report |

The `original_path` values inside `ocr-audit/catalogue.csv`, `proposed-renames.csv`
and the round-1/round-2 receipts still point at `materials/gap-closing/library/...`.
Those paths are **historical**: they record where a file was when it was audited, and
they are deliberately not rewritten. To find the same document today, search
`sources/INDEX.md` for its title or document number.

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
- **The proposed names were proposals.** No rename was ever applied by that pass. The
  clean `sources/` identifiers are a later, separate decision.

`extraction-problems.md` lists what could not be recovered and why: 40 intentionally
blank gazette pages, French patents with custom Type1/WinAnsi encodings that
`pypdf`/`pdftotext` cannot decode, and four exact duplicate groups. Blank or unreadable
pages are recorded, never filled with guessed text.

## Where the text came from

`sources/<id>/text.md` is a **derived convenience for machine reading**, not a
transcript and not a second document. Two generations exist side by side:

- 12 legacy reading copies produced by `scripts/prepare_library.py`, page-indexed, with
  inline figure crops. One folder whose name had drifted from its links was renamed on
  2026-11-20; 59 crops that existed only on `feat/publication-content-contract` were
  restored, so all 146 image references resolve.
- 37 conversions the operator ran externally, covering every source that had no legacy
  text. Their figure references were rewritten from `<name>_text/` to `figures/` during
  the move; 798 references were checked and none are broken.

`inpi-bopi-2018-46` is deliberately PDF-only: a 283-page French patent gazette with 40
blank pages, whose text would add noise rather than evidence.

## Rules that apply inside this folder

- Originals are read-only. Add a version or a correction record; do not rewrite a
  retrieved document.
- An embedded text layer, an OCR derivative and a page image are different evidence
  classes, and a derivative is never promoted to "the document". Where text and PDF
  disagree, the PDF wins.
- Treat these as the operator's research corpus: retrieved legally, kept for the
  research team, not for open publication. That is an access decision the operator
  recorded; it is not a rights determination, and it does not make the material
  publishable to anyone outside the team.
- Duplicates were removed on 2026-11-22 by exact byte match only. Near-duplicates
  (different scans of one paper) are a content decision, not a cleanup script's.
