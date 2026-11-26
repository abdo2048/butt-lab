# sources/

Every source document the project has collected, one folder per document.

```
sources/
  README.md            this file
  INDEX.md             the list: one row per document
  <id>/
    document.pdf       the original (document.html for web saves). this is what a human reads.
    text.md            machine extraction of the same document. this is what an AI reads.
    figures/           images pulled out of the document. only used by text.md.
```

## The rule

The original document (`document.pdf`, or `document.html` for web saves) and `text.md` are the same document in two forms, for two readers.

- **Humans read the original.** It is the original: pagination, layout, tables, what the authors actually published.
- **AI readers use `text.md`.** It exists because a PDF is hard to read and expensive for a language model, while Markdown is easy. It is a derived convenience, not a better copy.

Never treat `text.md` as the document. If they disagree, the original wins. Figures are omitted from `text.md`; the `figures/` folder holds the extracted images.

## Which text came from where

- 12 documents carry a `text.md` produced earlier by the project's own converter (the `*_text.md` files that used to sit beside the PDFs in `materials/gap-closing/library/`), plus 1 earlier project-era document with its own carried-over text.
- 51 documents carry originals supplied by the operator, of which 50 have a `text.md`: 37 by the operator with external conversion tools (GLM / PaddleOCR-VL), 10 AI-extracted from operator-saved HTML pages (Bloomberg 2017/2022; CSP Daily News 2012; nj.com 2012; Plastics News 2012 via its Wayback capture; Surfrider FAQ 2017; the TerraCycle brigade capture 2015 and the three current TerraCycle pages), 1 pdftotext from the operator's PDF (PharmJ letter), 2 operator GLM conversions (Yousef 2023 JAAP; Zhang 2026 Chemosphere review). Operator-supplied conversions are preferred when available.
- 16 documents were added 2026-11-26 (session 7): 12 from the four-agent arena research return and live fetches (8 agent-captured HTML incl. the brigade FAQ series; the ANJR case-studies deck; the TerraCycle fact sheet; Trentonian 2012; Royal Purple 2016; DYNA-MIG 2017), 4 supplied by the operator (ESPR 2021 review, KAB 2026 National Litter Study, SOU campus report, KAB recyclable-items guide). All 16 carry AI-extracted `text.md` (pdftotext for PDFs — not yet GLM-converted) and PyMuPDF figure pulls where the PDF yields images.
- 1 document has no `text.md` on purpose: `inpi-bopi-2018-46` is a 283-page French patent gazette with 40 blank pages. It is kept as a PDF for completeness and is not worth converting.

So: 80 documents, 79 with text, 1 PDF-only (session 7: +16 documents, all with raw AI-extracted text).

## What this folder is not

- **Not a licence statement.** The documents were collected for one research team's internal use. Being in this folder does not make a document redistributable. The site serves this folder to that team on the operator's instruction; whether a document may later be published more widely is a separate question that has not been decided here.
- **Not authoritative over the original.** Extraction drops tables, equations, footnotes and layout. Anything load-bearing must be checked against the original.
- **Not a place to add new research notes.** Interpretation belongs in `methods/`, `reports/` or the material's own folders.

## How the site uses this folder

The reader site scans this folder at build time and publishes every `document.pdf` at `/documents/<id>.pdf`. The page `/documents/` lists the corpus with sizes and download links. Web-save rows (`document.html`) are listed in INDEX.md and served from the repository directly.

The source records in `publication/` use bibliographic ids (`marinello-2020-review`), which do not always match the shelf id (`marinello-2019-review`). `links.json` is the hand-checked table that pairs them. A record with an entry there gets View PDF / Download PDF buttons on its page. Nothing is inferred from similarity; only listed pairs are linked.

## Adding a document

1. Pick a short lowercase id: `author-year-topic` (e.g. `shah-2023-review`).
2. `sources/<id>/document.pdf` (or `document.html` for a web save).
3. `sources/<id>/text.md` if you have a conversion; point any image links at `figures/`. Operator-supplied conversions are preferred.
4. Add the row to `INDEX.md`.
