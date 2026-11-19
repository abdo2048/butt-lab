# Local PDF reading library

`materials/gap-closing/library/` is the main shelf. The round-1 and round-2 folders also contain reports, patents and permits. The extractor walks all of `materials/gap-closing/` by default, groups byte-for-byte duplicate PDFs by SHA-256, and writes one folder per unique file. It records every original path without moving the originals. A different edition with different bytes may still need manual deduplication.

## Generate reading copies

Use Python 3.11 or newer. From the repository root:

```sh
python -m venv .research-local/venv
. .research-local/venv/bin/activate  # PowerShell: .research-local\venv\Scripts\Activate.ps1
python -m pip install -r scripts/requirements-library.txt
python scripts/prepare_library.py
```

Use `--source materials/gap-closing/library` for just the main shelf, preferably with a separate `--output` directory if you want to keep both indexes. Without language data, low-text pages will still have a page image and an explicit text status, but they will not be OCRed.

**For scans:** Point `--tessdata` at local Tesseract `.traineddata` models. By default the script uses `eng+fra+por`; add appropriate local model files and use `--languages` for other scans. If your machine does not have the data, this Bash example downloads the three fixed model packages once from npm, then OCR runs locally with no online document uploads:

```sh
npm install --prefix .research-local/ocr-models @tesseract.js-data/eng@1.0.0 @tesseract.js-data/fra@1.0.0 @tesseract.js-data/por@1.0.0
mkdir -p .research-local/tessdata
for lang in eng fra por; do
  gzip -dc ".research-local/ocr-models/node_modules/@tesseract.js-data/$lang/4.0.0_best_int/$lang.traineddata.gz" > ".research-local/tessdata/$lang.traineddata"
done
OMP_THREAD_LIMIT=1 python scripts/prepare_library.py --tessdata .research-local/tessdata
```

Open `.research-local/library/INDEX.md`. Each document folder contains `reading.md`, `images/`, and `reading.json`. The headings use **PDF page positions**, which may differ from printed page numbers. The original PDF link and hash stay with each copy. `inventory.json` is useful for scripts; each page records `embedded`, `ocr`, `short-text`, or `no-text` plus its associated images and the line range in `reading.md` (useful for reading one page instead of a whole thesis). Unchanged inputs and extraction options reuse existing outputs. A rerun with a selected source shelf rewrites the index to that scope, but does not remove old reading folders; use different output folders for independent indexes.

The `images/` folder holds rendered page views where there are figures, tables, scans or low-text pages, plus crops for significant raster images. It is not a promise to detect and crop every figure. To preserve a page view for every page, use `--all-page-images` in a separate output folder. Always use the original PDF for fine print, multi-column reading order, exact values and vector details. An empty text layer or blank OCR result is recorded, not replaced with guessed text. Old hand-converted Markdown remains untouched.

**Later cleanup:** Record the PDF page and a short correction in the research record rather than editing a generated transcript. Check text and image alignment before citing a table. Preserve the source version and avoid publishing full-text derivatives or extracted images without separate rights review. The generated directory and personal playbook are intentionally ignored and not included in builds or new commits; keep anything you need between machines in private storage or regenerate it from the originals.

To test the extractor: `python -m unittest discover -s tests -p test_prepare_library.py`.

## This pass

The full corpus run found 55 PDF paths and produced 51 unique reading copies with no failed files. Across 1,773 pages, 1,564 retained embedded text, 138 used offline OCR, 26 had short text, and 45 yielded no text. The no-text pages have images for inspection; they should not be assumed blank. The run wrote 2,122 page views and crops. Original PDFs and earlier conversions were not modified.
