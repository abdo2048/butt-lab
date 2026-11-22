# sources/

Every source document the project has collected, one folder per document.

```
sources/
  README.md            this file
  INDEX.md             the list: one row per document
  <id>/
    document.pdf       the original. this is what a human reads.
    text.md            machine extraction of the same document. this is what an AI reads.
    figures/           images pulled out of the PDF. only used by text.md.
```

## The rule

`document.pdf` and `text.md` are the same document in two forms, for two readers.

- **Humans read `document.pdf`.** It is the original: pagination, layout, tables, what the authors actually published.
- **AI readers use `text.md`.** It exists because a PDF is hard to read and expensive for a language model, while Markdown is easy. It is a derived convenience, not a better copy.

Never treat `text.md` as the document. If they disagree, the PDF wins. Figures are omitted from `text.md`; the `figures/` folder holds the extracted images.

## Which text came from where

- 12 documents carry a `text.md` produced earlier by the project's own converter (the `*_text.md` files that used to sit beside the PDFs in `materials/gap-closing/library/`).
- 37 documents carry a `text.md` produced by the operator with external conversion tools (GLM / PaddleOCR-VL), supplied in November 2026.
- 1 document has no `text.md` on purpose: `inpi-bopi-2018-46` is a 283-page French patent gazette with 40 blank pages. It is kept as a PDF for completeness and is not worth converting.

So: 50 documents, 49 with text, 1 PDF-only.

## What this folder is not

- **Not a licence statement.** The documents were collected for one research team's internal use. Being in this folder does not make a document redistributable. The site serves this folder to that team on the operator's instruction; whether a document may later be published more widely is a separate question that has not been decided here.
- **Not authoritative over the original.** Extraction drops tables, equations, footnotes and layout. Anything load-bearing must be checked against the PDF.
- **Not a place to add new research notes.** Interpretation belongs in `publication/`, `reports/` or `state/`.

## How the site uses this folder

The reader site scans this folder at build time and publishes every `document.pdf` at `/documents/<id>.pdf`. The page `/documents/` lists all 50 with their sizes and download links, so a reader can reach the whole corpus, not just the documents cited in the write-up.

The source records in `publication/` use bibliographic ids (`marinello-2020-review`), which do not always match the shelf id (`marinello-2019-review`). `links.json` is the hand-checked table that pairs them. A record with an entry there gets View PDF / Download PDF buttons on its page. Nothing is inferred from similarity; only listed pairs are linked.

## Adding a document

1. Pick a short lowercase id: `author-year-topic` (e.g. `shah-2023-review`).
2. `sources/<id>/document.pdf`
3. `sources/<id>/text.md` if you have a conversion; point any image links at `figures/`.
4. Add the row to `INDEX.md`.

## History

Before November 2026 these files were scattered across `materials/gap-closing/library/`, `round-1/sources/.../literature|patents|reports/` and `round-2/`. Five byte-identical duplicates were removed when the folders were consolidated. `materials/` now holds only the process records of how the documents were found and audited.
