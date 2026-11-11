# Extraction Problems Report

Generated from audit of 34 PDFs in butt-materials repository.

## Blank Pages (Pure White Render - OCR Impossible)

The following pages rendered as pure white (mean=255.0, dark_frac=0.0) at 300 DPI via pdftoppm. Tesseract 5 produced zero characters for all PSM modes (1,3,4,6,11,12) at 1x and 2x scaling. pdfimages -list confirms no embedded images on these pages. These are genuinely blank pages in the source PDFs.

### INERIS-DRC-17-162405-01313C-2017
- Page 2: mean=255.0, dark_frac=0.0, size=2481×3509
- Page 48: mean=255.0, dark_frac=0.0, size=2481×3509
- Page 92: mean=255.0, dark_frac=0.0, size=2481×3509

### INERIS-DRC-18-177385-09634B-2019
- Page 2: mean=255.0, dark_frac=0.0, size=2481×3509
- Page 82: mean=255.0, dark_frac=0.0, size=2481×3509
- Page 83: mean=255.0, dark_frac=0.0, size=2481×3509

### INPI-France-2018-11-16-BOPI-18-46-patents
- Page 11: mean=255.0, dark_frac=0.0, size=2480×3509
- Page 13: mean=255.0, dark_frac=0.0, size=2480×3509
- Page 15: mean=255.0, dark_frac=0.0, size=2480×3509
- Page 161: mean=255.0, dark_frac=0.0, size=2480×3509
- Page 163: mean=255.0, dark_frac=0.0, size=2480×3509
- Page 179: mean=255.0, dark_frac=0.0, size=2480×3509
- Page 201: mean=255.0, dark_frac=0.0, size=2480×3509
- Page 283: mean=255.0, dark_frac=0.0, size=2480×3509

### WO2026074041A2__original
- Page 29: mean=252.5, dark_frac=0.0105, size=2480×3509

## OCR Attempted - No Text Recovered

### INPI-France-2018-11-16-BOPI-18-46-patents.pdf
- OCR pages: [11, 13, 15, 161, 163, 179, 201, 203, 205, 207, 215, 217, 223, 225, 229, 231, 233, 235, 237, 239, 241, 243, 245, 247, 249, 251, 253, 255, 257, 259, 261, 263, 265, 269, 273, 275, 277, 279, 281, 283]
- Tool: pdftoppm 0.68.0 + Tesseract 5
- Languages: fra
- DPI: 300
- Result: All pages yielded 0 characters
- Limitations: 300 DPI raster OCR of flagged pages only; remaining pages came from pypdf/pdftotext, language pack: fra; no dictionary post-correction applied, source pages use embedded Type1 fonts with custom WinAnsi encodings (fontTools not installed), which is why pypdf/pdftotext returned nothing for them, derivative only; original PDF retained untouched

## Partial Extraction (Some Pages Empty/Low Text)

### batch-01-gap-closing-2026-11-08/sources/followup/batch-01/2026-11-08/patents/FR3066128B1.pdf
- Total pages: 17
- Empty/low-text pages (pypdf): [15]
- Extraction tool: pypdf
- pdftotext used: True
- OCR integrated for pages: [15]

### batch-01-gap-closing-2026-11-08/sources/followup/batch-01/2026-11-08/patents/FR3102180A1.pdf
- Total pages: 29
- Empty/low-text pages (pypdf): [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29]
- Extraction tool: pypdf
- pdftotext used: True
- OCR integrated for pages: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29]

### batch-01-gap-closing-2026-11-08/sources/followup/batch-01/2026-11-08/patents/FR3110470A1.pdf
- Total pages: 14
- Empty/low-text pages (pypdf): [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
- Extraction tool: pypdf
- pdftotext used: True
- OCR integrated for pages: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]

### batch-01-gap-closing-2026-11-08/sources/followup/batch-01/2026-11-08/reports/INERIS-DRC-17-162405-01313C-2017.pdf
- Total pages: 92
- Empty/low-text pages (pypdf): [2, 48, 81, 82, 83, 89, 90, 91, 92]
- Extraction tool: pypdf
- pdftotext used: True
- OCR integrated for pages: [2, 48, 81, 82, 83, 89, 90, 91, 92]

### batch-01-gap-closing-2026-11-08/sources/followup/batch-01/2026-11-08/reports/INERIS-DRC-18-177385-09634B-2019.pdf
- Total pages: 84
- Empty/low-text pages (pypdf): [2, 82, 83, 84]
- Extraction tool: pypdf
- pdftotext used: True
- OCR integrated for pages: [2, 82, 83, 84]

### BR_0305004_B1.pdf
- Total pages: 9
- Empty/low-text pages (pypdf): [1, 2, 3, 4, 5, 6, 7, 8, 9]
- Extraction tool: pypdf
- pdftotext used: True
- OCR integrated for pages: [1, 2, 3, 4, 5, 6, 7, 8, 9]

### FR3066128B1.pdf
- Total pages: 17
- Empty/low-text pages (pypdf): [15]
- Extraction tool: pypdf
- pdftotext used: True
- OCR integrated for pages: [15]

### INERIS-DRC-17-162405-01313C-Rapport-etude-megots_vf.pdf
- Total pages: 92
- Empty/low-text pages (pypdf): [2, 48, 81, 82, 83, 89, 90, 91, 92]
- Extraction tool: pypdf
- pdftotext used: True
- OCR integrated for pages: [2, 48, 81, 82, 83, 89, 90, 91, 92]

### INPI-France-2018-11-16-BOPI-18-46-patents.pdf
- Total pages: 283
- Empty/low-text pages (pypdf): [11, 13, 15, 161, 163, 179, 201, 203, 205, 207, 215, 217, 223, 225, 229, 231, 233, 235, 237, 239, 241, 243, 245, 247, 249, 251, 253, 255, 257, 259, 261, 263, 265, 269, 273, 275, 277, 279, 281, 283]
- Extraction tool: pypdf
- pdftotext used: True
- OCR integrated for pages: [11, 13, 15, 161, 163, 179, 201, 203, 205, 207, 215, 217, 223, 225, 229, 231, 233, 235, 237, 239, 241, 243, 245, 247, 249, 251, 253, 255, 257, 259, 261, 263, 265, 269, 273, 275, 277, 279, 281, 283]

### WO2026074041A2__original.pdf
- Total pages: 29
- Empty/low-text pages (pypdf): [29]
- Extraction tool: pypdf
- pdftotext used: True
- OCR integrated for pages: [29]

## Special Case: INPI BOPI Gazette

**INPI-France-2018-11-16-BOPI-18-46-patents.pdf** (283 pages):
- 40 pages flagged as blank (pure white render)
- All 40 OCR derivative files are 0 bytes
- Pages: 11, 13, 15, 161, 163, 179, 201, 283 + 32 others
- Root cause: Gazette pages are intentionally blank (separator pages in patent bulletin)
- No text recovery possible; original PDF retained untouched

## Exact Duplicates (SHA-256)

- **1f44dfd3c927b1e6...**:
  - 2016_MariaBetâniaD’HeniTeixeira.pdf
  - batch-01-gap-closing-2026-11-08/sources/followup/batch-01/2026-11-08/literature/Teixeira-2016-UnB-thesis.pdf

- **c34f56fff539a577...**:
  - batch-01-gap-closing-2026-11-08/sources/followup/batch-01/2026-11-08/patents/FR3066128B1.pdf
  - FR3066128B1.pdf

- **3fed337796bb8b38...**:
  - batch-01-gap-closing-2026-11-08/sources/followup/batch-01/2026-11-08/reports/INERIS-DRC-17-162405-01313C-2017.pdf
  - INERIS-DRC-17-162405-01313C-Rapport-etude-megots_vf.pdf

- **009447be170a4619...**:
  - Guide-pratique-Labels-et-Certifications-RSE-par-ecomegot-2025.pdf
  - Guide-pratique-Labels-et-Certifications-RSE-par-Keenat-2025.pdf

## Tool Limitations

- **pypdf 6.21.0**: Primary extractor; fails on embedded Type1 fonts with custom WinAnsi encodings (FR patents)
- **pdftotext (poppler 0.68.0)**: Cross-check; -layout mode used; same font encoding issue
- **pdftoppm + Tesseract 5**: OCR at 300 DPI; language packs fra/deu/eng/por/zh; no dictionary post-correction
- **fontTools not installed**: Cannot decode custom font encodings for FR patents
- **No qpdf/ocrmypdf/gs/mutool**: Cannot pre-process or repair PDFs
- **Python console encoding**: cp1256 stdout; scripts write UTF-8 files directly
