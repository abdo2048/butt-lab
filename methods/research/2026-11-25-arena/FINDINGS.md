# Remaining-wishes findings — butt-lab, return of 2026-11-25

**Both wishes are answered.** WISH 1 is closed with a primary-source tonnage figure. WISH 2 gains a
2013 TerraCycle-staff on-record quote plus one new validation detail, but **no dose or dwell figure
exists in public** — I now consider that a firm negative rather than an unfilled gap.

Capture bundle staged at `butt-research/new-25-11-2026/` (10 HTML/PDF captures, 2 CSVs, 3 CDX
listings). **I could not upload to `github.com/abdo2048/butt-materials`** — no GitHub connector is
active in this session and I have no write credentials. The folder is named and laid out to match
`new-25-11-2026/` so it can be pushed as-is. See "Handoff" at the bottom.

---

## WISH 1 — mass/tonnage: CLOSED

### The headline figure

> **FACT** | "Since 2014, Keep America Beautiful has partnered with TerraCycle® to facilitate the
> recycling of **more than 261,000 pounds** (the weight of an adult blue whale) of cigarette butts
> into sustainable products such as park benches and ashtrays."
> — https://kab.org/keep-america-beautiful-to-award-up-to-375k-in-grants-to-combat-cigarette-litter/
> | published 2024-02-28 | **confidence: high** (KAB's own site, live, full HTML captured)

**261,000 lb = 118.4 tonnes.** This closes M-06 row 5. It is the first *and* only direct mass figure
for the stream from a programme party.

Caveats to record with it:
- KAB dates the partnership "since 2014", while TerraCycle/SFNTC date the programme from **Fall
  2012**. So 261,000 lb is plausibly the *KAB-facilitated* subset, not the entire global stream.
  Treat as a **floor**, not a lifetime total.
- It is "more than" — a floor by construction.

### The conversion factor that makes every other number usable

> **FACT** | "Ball notes that the estimate of more than 100 million pieces of cigarette waste
> collected since the program began is based on **one pound of cigarette waste being equal to 1,000
> cigarette butts**." — Reynolds American / SFNTC, "Santa Fe Natural Tobacco Company Announces
> Major Recycling Milestone", https://www.reynoldsamerican.com/news/santa-fe-natural-tobacco-company-announces-major-recycling-milestone/
> | dateline 2018-12-14 | **confidence: high**

Same release: "**More than 100 million and counting**" pieces since Fall 2012.

**100,000,000 butts ÷ 1,000 = 100,000 lb = 45.4 tonnes by Dec 2018.**

This is the missing key: *every* "units collected" figure in the archive now converts to mass. It
also independently corroborates: **261,000 lb (2024) vs 100,000 lb (2018)** is a coherent, monotonic
growth curve.

I verified the factor a second, independent way. TerraCycle's own programme case-study deck says
Carnival Cruise Line recycled **42,500,000 butts** and generated "**over $42,500** in donations".
At the contractual $1-per-pound donation rate, $42,500 = 42,500 lb, and
**42,500,000 ÷ 42,500 = exactly 1,000.0 butts/lb**. TerraCycle's accounting *is* the 1,000/lb rule.
(Source: `TerraCycle_FreeCigaretteWasteRecyclingProgram_case_studies.pdf`,
https://cdn.ymaws.com/www.anjr.com/resource/collection/B947B2F9-1861-46FA-A71D-D07718BEC522/terracycle.pdf)

### ⚠ The 1,000 butts/lb figure is probably too generous by ~2×

Two independent field measurements say a pound holds roughly **2,000–2,300** butts:

| Source | Measurement | Butts/lb |
|---|---|---|
| Mining Journal (Marquette, MI), 2022-09 | "**6.43 pounds** … consisting of **14,583 cigarette butts**" | **2,268** |
| C-TRAN (Vancouver, WA) release | "1 to 2 pounds … roughly 2,000 to 4,000 individual butts" | **~2,000** |
| SFNTC / TerraCycle (official estimate) | stated divisor | 1,000 |

**What this changes:** if the 1,000/lb divisor is a round-number assumption rather than a weighed
average, then TerraCycle's *stated* tonnages overstate real mass by ~2×. Applying the measured
density instead: 100M butts → 44,092 lb = **20.0 tonnes**, and the 2015 brigade total → **9.0
tonnes**. KAB's 261,000 lb may equally be a 261M-butts ÷ 1,000 back-calculation rather than a
scale reading.

**Recommendation:** carry **118.4 t as the reported figure** (it is what the parties published) and
**~60 t as the probable true mass**, and flag the divisor as the single largest uncertainty in the
M-06 mass row. Do not silently pick one.

### A new, denser time series than the one in the brief

The brief's "known" 2015-04-23 figure (6,172 / 328 / 25,768,769) was one point on a curve. The
brigade FAQ page carried a live totals footer on **every** capture, so the archive holds **14
points, 2012-11 → 2016-01**. Full data in
`new-25-11-2026/csv/brigade_totals_growth_curve.csv`:

| Date | Locations | Units collected | ≈ tonnes @1,000/lb |
|---|---|---|---|
| 2012-11-13 | 251 | 0 | 0 |
| 2013-06-21 | 3,073 | 2,834,800 | 1.3 |
| 2014-09-27 | 5,383 | 15,974,559 | 7.2 |
| 2015-04-23 | 6,172 | 25,768,769 | 11.7 |
| 2015-12-20 | 7,470 | **45,089,591** | **20.5** |
| 2016-01-20 | 7,470 | 45,089,591 | 20.5 |

**New publication-worthy datapoint: 45,089,591 units by 2015-12-20** — 75% above the figure the
brief was working from. Note the plateau (identical totals on the last two captures: 2015-12-20 and
2016-01-20) — likely a cached footer, so don't over-read the flat tail.

### ⚠ "the FAQ page has never been found" — it has. I found it.

The brief listed this as the highest-value find and it was sitting in plain sight: the brigade page
links to `/en-US/brigades/cigarette-waste-brigade/brigade_faqs.html`, which has **14 captures,
2012-11-13 → 2016-01-20**, all 200s. All fetched; 4 saved.

**It contains no mass figure and no mention of gamma/sterilization.** Full text is a collection
logistics FAQ (what's accepted, how to bag it, shipping, account management, the $1/lb donation, the
accepted-waste poster). Worth having for completeness and for the totals series, but it is **not**
the process document the brief hoped for. Rule this source out.

---

## WISH 2 — gamma sterilization: partial; dose/dwell does not exist in public

### The origin of the "bio-contaminants" language — 2013, on the record, named source

The Surfrider SF FAQ (2017-03-15) reads like lifted TerraCycle copy. It is. The earlier instance is a
direct quote from TerraCycle's Global VP:

> **FACT** | "The left over butts are gamma radiated, which is the same process that is used on fish
> once it's pulled out of the sea, to kill any bio contaminants. Once they have been gamma radiated,
> they can be turned into plastic pellets, which we then partner with industrial manufacturers to
> make industrial-only products such as plastic lumber, shipping pallets, and other B2B applications
> – no consumer products will be made from the material."
> — **Albe Zakes, Global Vice-President, TerraCycle**, Global News (BC),
> https://globalnews.ca/news/961723/first-cigarette-butt-recycling-program-in-the-world-launches-today-in-vancouver/
> | 2013-11-12 | **confidence: high** (direct quotation, named attribution, page captured)

This is a **4-year-earlier primary disclosure than the one in the brief**, from the company itself
rather than a downstream chapter FAQ. It confirms the Surfrider text descends from TerraCycle
language and it supplies the rationale ("same process as fish") that the FAQ dropped.

**It also gives a materially different process order.** Per Zakes: shred → separate organics →
compost paper/ash/tobacco → *then* gamma-radiate the leftover butts → pelletize. Surfrider says
sterilization happens "first … then shredded". This matters for M-06 row 1: the irradiation step may
sit **after** shredding/organic separation, on the filter fraction only, not on the raw intake. That
is a much smaller and more plausible irradiation load, and it changes how you'd model the step.

### One genuinely new validation detail

> **FACT** | "The filters will be sterilized using gamma radiation **and tested for bioburden**.
> Filters are then shredded and blended with other recycled materials and pelletized to be used for
> **injection molding or extrusion**."
> — City of Belmont, CA, City Manager's Weekly Update, 2021-02-19,
> https://www.belmont.gov/Home/Components/News/News/3618 | **confidence: medium**

Confidence is medium, not high: belmont.gov returns 403 to non-browser clients and the page body
loads via a govdelivery widget, so I could not save the full HTML (Wayback has no capture; the
`r.jina.ai` proxy returned empty). **The quote above is verbatim from the page's own indexed text**,
retrieved twice consistently, and is quoted here exactly — but it should be re-verified in a real
browser before it goes in a row.

"Tested for bioburden" is the useful part: it implies a real microbiological measurement on the
feedstock, which is the input that underlies ISO 11137 dose-setting. It is the first evidence that
any validation discipline is applied, even though no number is disclosed. Belmont also places the
in-house TerraCycle site at **Hamilton, NJ** (not Trenton) as of 2021 — check whether the processing
line moved, because that affects which contract irradiator served it.

### What I could NOT find, and where I looked

**No dose (kGy), no dwell/residence time, no SAL, no irradiator contractor name appears anywhere in
public.** Treated as a firm negative — the following were checked and are documented so nobody
repeats them:

1. **SEC EDGAR full-text search, TerraCycle US Inc. (CIK 0001714781)** — the Reg A+ offering
   circular the brief hoped would name the contractor. Searched `"steriliz"`, `"gamma"`,
   `"tonnes"` scoped to the CIK: **0 hits each.** `"cigarette"`: 29 hits, all passing mentions.
   I pulled the full 2017-08-29 Form 1-A Part II/III (157k chars): cigarette appears only as a
   marketing example ("everything from cigarette butts to chip bags"). The one substantive line is
   process-adjacent and worth logging: *"Organic materials such as coffee grounds and cigarette ash
   are separated and sent to composting."* No mass metrics per stream, no sterilization detail.
   **The offering circular does not contain what the brief hoped.** Rule it out.
2. **SEC full-text for `"TerraCycle" cigarette`** — 91 filings, no new mass or gamma data.
3. **TerraCycle help-centre / Zero Waste Box FAQ** — no cigarette-process page survives; CDX for
   `terracycle.com/*cigarette*` and the `brigade_faqs` variants turned up only the FAQ + a 404.
4. **Other Surfrider chapters (San Diego, Long Beach, NJ, Hawaii domains)** — CDX domain sweeps
   returned no additional HOTYB FAQ pages carrying the gamma text. SF appears to be the only chapter
   that published it. Exact-phrase searches for `"sterilized using Gamma radiation"` and
   `"bio-contaminants" cigarette TerraCycle` return **only** the SF page (and its mirror at
   `/news/2017/03/14/cigarette-litter-faq`).
5. **`"150,000 cigarette butts"` sweep** — returns only the Surfrider page. It is not a TerraCycle
   fact sheet number that leaked; SF is the sole origin. Five Winds / PE International: no surviving
   case study naming the cigarette stream.

### New internal conflict to flag: butts-per-pallet

The brief carries "~150,000 butts per pallet" from Surfrider. A 2013 San Diego broadcast report says
otherwise:

> "Terracycle estimates it will take about **5,000 butts per pallet**" — FOX 5 San Diego,
> 2013-10-16, https://fox5sandiego.com/news/group-recycles-100k-cigarette-butts/

These are 30× apart. Sanity check: at 1,000 butts/lb, 150,000 butts = 150 lb of filter material going
into one pallet; at 2,268/lb it is 66 lb. A plastic shipping pallet weighs ~30–50 lb, so **the
150,000 figure is the physically coherent one** and 5,000 (≈2–5 lb) cannot be right. Most likely the
2013 report garbled a per-box or per-shipment number. **Recommendation: keep 150,000, but cite it as
Surfrider-only and add a footnote that a 2013 broadcast report contradicts it at 5,000.**

---

## Side findings worth shelving

- **Cumulative scale claims disagree wildly.** KAB: 261,000 lb ≈ **261M** butts (2024). TerraCycle
  case-study deck: "recycling a **quarter-BILLION** cigarette butts to date". NJBIZ 2024-04-26
  quotes Szaky: TerraCycle is "on track to recycle its **billionth** cigarette butt"
  (https://njbiz.com/terracycle-turns-a-profit-by-redefining-the-value-of-waste/). A billion vs a
  quarter-billion is a 4× spread — the billion almost certainly counts non-US/global streams or
  includes non-recycled collection. **Do not use "one billion" without a definition.**
- **Disney Cruise Line**: "a single vessel collected and recycled over **740,000** cigarette butts"
  (TerraCycle deck).
- **Amazon**: "recycled over **2,000,000** cigarette butts since Earth Day 2021 from just a small
  sample of sites … rolling out to all 278 locations" (same deck).
- **Caesars Windsor**: 5.9M butts → $3,500 to local charities — implies a **Canadian $1/lb** rate
  too (5.9M butts ≈ 5,900 lb, but $3,500 ≠ $5,900; the Canadian rate or the butts count is
  inconsistent — flag if the Canada economics matter).
- **Vancouver was the world's first city programme**, launched 2013-11-12 with 110 lamp-post
  receptacles, emptied by United We Can staff, **$5/lb** donated to United We Can, material shipped
  to TerraCycle Toronto — a different (higher) rate than the US $1/lb.
- **Minimum viable batch**: TerraCycle told Libération (2018-02-23) it was *stockpiling* French and
  European butts because large-scale recycling "requires volumes generally equivalent to **several
  tens of tonnes**" per run. Useful for the invention phase as a real-world scale constraint.
- **Programme target**: SEC Form 1-K (FY2019): the brand "announced a goal to collect and recycle
  **500 million cigarette butts** with TerraCycle by 2025."
- **Density data point for modelling**: Marquette's measured **6.43 lb / 14,583 butts** is the best
  empirical butts↔mass conversion in the corpus. Use it over the 1,000/lb rule for engineering.

---

## What this changes, by row

| M-06 row | Was | Now |
|---|---|---|
| row 1 (process / gamma) | "sterilized using Gamma radiation" per Surfrider 2017 | + 2013 TerraCycle VP on-record quote; + likely **order is shred → compost → irradiate filters** (not "first"); + **bioburden testing** implied (Belmont 2021); dose/dwell **confirmed non-public** |
| row 5 (mass) | no public tonnage | **261,000 lb / 118.4 t** (KAB 2024) as reported floor; **≈60 t** probable true; **1 lb = 1,000 butts** official divisor vs **2,268/lb** measured; 14-point growth curve 2012→2016 |

## Handoff

Staged and ready to push (`butt-research/new-25-11-2026/` — mirrors the ingest layout):

```
html/     10 full captures (KAB, Reynolds/SFNTC, Surfrider SF, Global News, SEC 1-A,
          4× Wayback brigade FAQ, Wayback brigade page)
csv/      brigade_totals_growth_curve.csv, mass_figures.csv
cdx/      cdx_faqs.txt, cdx_en_us_brigade.txt, cdx_faq_dir.txt
          TerraCycle_FreeCigaretteWasteRecyclingProgram_case_studies.pdf (+ extracted text)
```

Two things are still needed from a human:
1. **Push the folder to `abdo2048/butt-materials`** — I have no write access here.
2. **Re-verify the Belmont quote in a browser** (403 to automated clients); only that one finding
   rests on indexed text rather than a saved capture.
