# Session-7 staging package (2026-11-26)

Unzip this archive OVER the local butt-lab repo (repo root, so `sources/`, `methods/`, `STATE.md`, `LOG.md` merge),
then run your existing `run_push.sh` (no-clone; add/commit/push).

Suggested commit message:
"session 7: four-agent arena research ingest - 16 sources + FAQ captures + research shelf; M-06 v0.4 (mass closed w/ divisor caveat; dose firm-negative); INDEX 64->80"

Contents:
- 16 new sources/<id>/ dirs (8 arena captures, 4 live fetches: TerraCycle fact sheet / Trentonian 2012 / Royal Purple 2016 / DYNA-MIG 2017, 4 operator Addtional: ESPR 2021 review, KAB 2026 National Litter Study, SOU campus report, KAB guide). Each: SOURCE.md + document.* + text.md (+ figures/ for PDFs).
- Companion captures/: terracycle-brigade-2015 (+2 wayback), terracycle-cigwaste-free-program (+live US), surfrider-2017-litter-faq (+wayback 2021 capture).
- methods/research/2026-11-25-arena/ (FINDINGS.md, FINDINGS-2.md, MANIFEST.md, csv/, cdx/, transcripts/ (4 agent conversations), attempts/).
- methods/M-06-terracycle-trade-secret.md -> v0.4 (section 1c; rows 1/5/8 updated; rows 11-12 added).
- sources/INDEX.md rebuilt (all rows recomputed from disk; count 64->80), sources/README.md provenance, STATE.md, LOG.md.

Known gaps (human-only tasks):
1. Belmont CA 2021 page (belmont.gov/Home/Components/News/News/3618) returns 403 to automated clients - save it in a real browser and drop it into sources/ later (quote needs re-verification anyway).
2. PE International/TerraCycle 2013 LCA deck on ResearchGate is login-walled - download manually if convenient.
3. New PDFs carry raw pdftotext text.md + PyMuPDF figures (not GLM-converted); originals win per README.
4. Addtional/George_2022_IOP pdf differs byte-wise from the shelf copy (george-2022-iop, kept as canonical).
