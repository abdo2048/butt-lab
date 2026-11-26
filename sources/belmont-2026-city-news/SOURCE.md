# belmont-2026-city-news — City of Belmont, CA "City News" index (negative-result capture)

## Identity
- What: the operator's saved full-page capture of the belmont.gov City News index ("City News _ City of Belmont.html", 2.3 MB), supplied 2026-11-26.
- Target it relates to: the 2021-02-19 City Manager's Weekly Update at `https://www.belmont.gov/Home/Components/News/News/3618`, quoted verbatim from the page's indexed text by the arena agent on 2026-11-25 (`methods/research/2026-11-25-arena/`, FINDINGS.md, medium confidence):
  > "The filters will be sterilized using gamma radiation and tested for bioburden. Filters are then shredded and blended with other recycled materials and pelletized to be used for injection molding or extrusion."
  The same update reportedly placed TerraCycle's in-house site at Hamilton, NJ (2021).
- Why on the shelf: documents the closure of M-06 v0.4's "browser re-verify + save of the Belmont CA 2021 page" retrieval task as UNVERIFIABLE. This folder is the negative-result record, not a content source.

## Verification trail (2026-11-26)
1. Live article URL check (assistant session 8): `https://www.belmont.gov/Home/Components/News/News/3618` no longer serves the article — the path renders the City News index instead (article removed from the CMS; verified by direct fetch).
2. Bot wall persists: automated clients receive HTTP 403 from belmont.gov (consistent with the arena agent's 2026-11-25 report).
3. Operator-saved City News index page: full-text scan = ZERO occurrences of cigarette / butt / gamma / bioburden / TerraCycle; content is navigation chrome + news listings (newest visible item 2026-06-05). The "Archived Press Releases" section offers pre-2014 year-PDFs (2001-2013) only — it cannot contain the 2021 update.
4. Operator's archive sweep (2026-11-26, multiple archive services): no saved old version of the 2021 article exists anywhere tried.

## Consequence for M-06 (row 1 / bioburden invariant)
- The Belmont 2021 quote remains SINGLE-SOURCE indexed text: medium confidence, now formally unverifiable. It can no longer be counted as independent corroboration of bioburden testing.
- The "gamma somewhere in the chain + bioburden/bacteria testing" invariant therefore rests on TerraCycle's own fact sheet (`terracycle-cigwaste-factsheet`, [S21]) plus the five documented gamma-order variants — mechanism unchanged, "dose/dwell withheld by design" verdict unchanged.
- Belmont's "Hamilton, NJ in-house processing site (2021)" detail inherits the same unverifiable status.
- DO NOT re-attempt: CMS removal + 403 bot wall + empty archive sweep = triple-verified dead end. Only settlement-grade records (Last Beach Cleanup tracking obligations) remain as a possible future upgrade path.

## Provenance
- Capture: operator, supplied via chat 2026-11-26; shelved by assistant session 8.
- text.md: plain-text extraction of the saved HTML with a provenance header (navigation chrome dominates; no program content exists to extract).
