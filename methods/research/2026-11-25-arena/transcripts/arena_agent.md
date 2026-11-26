== Me ==
# Remaining-wishes research brief — butt-lab (2026-11-25)

Two open items, both optional. Everything below is written so another AI agent (or you) can
pick it up cold. Hand back findings by uploading captures to
`github.com/abdo2048/butt-materials` under `new-25-11-2026/` — they will be ingested and
shelved the same way as the previous 14.

---

## WISH 1 — A mass/tonnage figure for the Cigarette Waste Brigade

**Known (do not re-derive):** brigade page capture 2015-04-23 shows 6,172 collection
locations / 328 open slots / **25,768,769 units collected**; $1.00 per pound donated by
Santa Fe Natural Tobacco to Keep America Beautiful. Units ≠ mass; no public tonnage found
so far in Bloomberg 2017/2022, Plastics News 2012, Times of Trenton 2012, CSP 2012, or the
current TerraCycle pages.

**Where to search (in order of expected yield):**

1. **Keep America Beautiful — Cigarette Litter Prevention Program annual reports (2012–2018).**
   The $1/lb donation tie-in means KAB tracked pounds. Look for "TerraCycle" in their CLPP
   reports and annual reports (kab.org, Wayback copies of `kab.org/site/PageServer?pagename=...`).
2. **Santa Fe Natural Tobacco / Reynolds American sustainability & ESG reports (2012–2017),
   then British American Tobacco combined reports (2017+).** SFNTC was a Reynolds American
   subsidiary; ESG reports often quantify "waste diverted" / recycling partnerships.
   Search PDFs for "TerraCycle" and "cigarette waste" (many are on
   `bat.com`, `reynoldsamerican.com` (Wayback), and responsibility reports aggregators).
3. **TerraCycle's SEC Regulation A+ offering circular (Form C / offering memorandum, 2016–2017).
   SEC EDGAR full-text search: https://efts.sec.gov/LATEST/search-index?q=%22TerraCycle%22+cigarette
   (or https://www.sec.gov/cgi-bin/srqsb?text=... historic). Offering circulars state
   operational metrics — tonnages collected per stream — and would also confirm the
   cigarette stream's economics.
4. **Wayback CDX enumeration of all TerraCycle cigarette pages** — run these URLs (no login
   needed) to list every capture, then fetch ones we don't have:
   - `https://web.archive.org/cdx/search/cdx?url=terracycle.com/brigades/cigarette-waste-brigade*&output=text&fl=timestamp,original,statuscode&collapse=timestamp:6`
   - same with `url=terracycle.com/en-US/brigades/cigarette-waste-brigade.html`
   - same with `url=terracycle.com/*/cigarette*` (catches FAQs, posters, municipal pages)
   - `url=terracycle.ca/*cigarette*`, `url=terracycle.fr/*megot*`, `url=terracycle.co.uk/*cigarette*`
   The **FAQ page** (`Cigarette Waste Brigade FAQ`) is the single most likely place a mass
   figure or process detail lived.
5. **Trade press follow-ups 2013–2015:** Plastics News (search "TerraCycle cigarette",
   author Shawn Wright), Resource Recycling, Waste360, Waste Dive, Recycling Today,
   Plastics Technology. Early-year "one million butts" type milestone stories are common.
6. **French/Canadian municipal programs quantify tonnes:** search
   `"TerraCycle" mégots tonnes` (Le Havre, Lyon, Martigues pilots), and Canadian city pilots
   (Vancouver's cigarette recycling pilot ~2017, CBC coverage; Toronto). Municipal press
   releases love tonnes.
7. **Google Scholar citation sweep:** papers citing the program with numbers —
   `"cigarette butt" recycling TerraCycle tonnes OR "per year"`, and check
   Torkashvand 2019 / Shah 2023 citations of "TerraCycle" (they may cite a tonnage source
   we haven't seen).
8. **TerraCycle YouTube channel 2012–2014** (process videos; the nj.com piece references one)
   — videos sometimes state "X million butts" milestones; check video descriptions via Wayback
   if videos are gone.

## WISH 2 — Gamma sterilization parameters (dose, dwell, validation)

**Known:** the only public disclosure is Surfrider SF's 2017 FAQ: waste "is first sterilized
using Gamma radiation"; TerraCycle's own copy says only "cleaned and separated by material
type". No dose/dwell anywhere yet.

**Where to search:**

1. **Other Surfrider chapter FAQ pages** — "Hold On To Your Butt" exists in many chapters
   (San Diego, Long Beach, NJ, Hawaii, Australia). The SF text may be copied with MORE detail.
   Search: `site:surfrider.org "gamma" cigarette` and `"Hold On To Your Butt" "TerraCycle" FAQ`,
   plus Wayback of `sf.surfrider.org/hold-onto-your-butt/` subpages.
2. **The original source of the Surfrider text** — that FAQ block ("sterilized using Gamma
   radiation … roughly 150,000 cigarette butts go into the formulation of one pallet … LCAs by
   PE International and Five Winds") reads like it was LIFTED from a TerraCycle document.
   Search exact phrases in quotes on Google/Bing/DuckDuckGo:
   - `"sterilized using Gamma radiation" TerraCycle`
   - `"150,000 cigarette butts"` (any source — this number may appear in a TerraCycle fact sheet)
   - `"Five Winds" "PE International" cigarette TerraCycle` (the LCA contractors; their
     case-study pages 2012–2014 may survive on Wayback: `pe-international.com`, `five-winds.com`)
3. **TerraCycle help-center / Zero Waste Box FAQ pages (Wayback 2013–2020):**
   `help.terracycle.com`, `zerowastebox.terracycle.com` FAQ "how is cigarette waste processed".
4. **Court filings:** Jan Dell false-advertising suit (settled 2021) and the Bloomington
   (Ill.) suit vs Bell International/Akshar — complaints/answers sometimes describe the
   process chain including sterilization. CourtListener + PACER; Bloomberg 2022 names parties.
5. **The Reg A+ offering circular (same document as Wish 1 item 3)** — process descriptions
   for each stream, possibly including the irradiation step and its contractor.
6. **Irradiation providers doing contract waste sterilization near NJ/Trenton (2012–2016):**
   Nordion, Sterigenics, Steri-Tek, IBA, EBeam companies — their case studies/newsletters may
   name TerraCycle. Search `"gamma" "cigarette" irradiation recycling case study`.
7. **Parameter envelope (for context, NOT as a claim about TerraCycle):** standard medical-device
   gamma sterilization per ISO 11137 uses 25 kGy typical sterilization dose — if the team ever
   needs to model the step in the invention phase, that is the defensible default assumption,
   stated as assumption.

---

## COPY-PASTE PROMPT for another AI agent

Paste everything between the lines into an agent that has web access (and ideally Wayback/CDX
access). It is self-contained.

------------------------------------------------------------
You are doing targeted source retrieval for a research project on cigarette-butt recycling.
Report findings ONLY with URLs (and Wayback capture URLs where the live page is gone). Do not
invent numbers. If you cannot verify something, say so. Where a page exists, save its full
HTML and quote the exact sentence containing the number/fact.

CONTEXT (verified facts — build on these, don't re-derive):
- TerraCycle (Trenton, NJ) ran the Cigarette Waste Brigade from Nov 2012, exclusive sponsor
  Santa Fe Natural Tobacco Co. (Reynolds American subsidiary; Natural American Spirit).
- Process (public record): gamma-radiation sterilization first (disclosed by Surfrider SF
  chapter FAQ 2017-03-15), then shred; tobacco+paper composted under tobacco-composting laws;
  cellulose-acetate filters (~97% of filter) blended with other recyclables and pelletized by
  CONTRACTED third parties; pellets go to plastic lumber, shipping pallets (~150,000 butts per
  pallet), bins, ashtrays; TerraCycle restricts to industrial (not household) uses because of
  nicotine. Brigades: 6,172 collection locations and 25,768,769 units collected by 2015-04-23.
  Program continues today as "Cigarette Waste Free Recycling Program" (all brands, SFNTC-sponsored).
- 2012 press: Plastics News 2012-11-16 (Shawn Wright), CSP Daily News 2012-11-15, Times of
  Trenton 2012-12-13 (Emily Brill; Ernie Simpson = TerraCycle VP R&D, "about six months" to
  develop). Bloomberg profiles 2017-11-27 and 2022-10-27 (Leslie Kaufman).

OBJECTIVE 1 — find ANY mass/tonnage figure for the cigarette stream (pounds, kg, tonnes,
butts-per-year), 2012–present. Priority sources:
  a) Keep America Beautiful Cigarette Litter Prevention Program annual reports 2012–2018
     (the $1/lb donation implies tracked pounds); kab.org + Wayback.
  b) Santa Fe Natural Tobacco / Reynolds American / BAT sustainability-ESG reports 2012–2020
     (search inside PDFs for "TerraCycle", "cigarette waste").
  c) TerraCycle SEC Regulation A+ offering circular / Form C (2016-2017) — SEC EDGAR full-text
     search "TerraCycle"; operational metrics sections.
  d) Trade press 2013–2015: Plastics News, Resource Recycling, Waste360, Waste Dive,
     Recycling Today ("million butts" milestone stories).
  e) French/Canadian municipal pilots: "TerraCycle mégots tonnes", Vancouver/Toronto
     cigarette-recycling pilots, city press releases.
  f) Google Scholar citations of TerraCycle cigarette recycling that carry numbers.
  g) Wayback CDX enumeration (fetch and report what you find):
     https://web.archive.org/cdx/search/cdx?url=terracycle.com/*/cigarette*&output=text&fl=timestamp,original,statuscode&collapse=timestamp:6
     — especially any "Cigarette Waste Brigade FAQ" page captures (the FAQ page itself has
     never been found; a capture would be the highest-value find).

OBJECTIVE 2 — find the ORIGINAL source (or any further detail) of the gamma-sterilization
disclosure: exact phrases to search in quotes: "sterilized using Gamma radiation" TerraCycle;
"150,000 cigarette butts"; "Five Winds" "PE International" cigarette. Also: other Surfrider
"Hold On To Your Butt" chapter FAQs (San Diego, Long Beach, NJ, Hawaii) that may repeat the
process text with more detail; TerraCycle help-center/Zero Waste Box FAQ captures (Wayback
2013–2020); the Jan Dell v. TerraCycle complaint (settled 2021) via CourtListener; irradiation
contractors' case studies naming TerraCycle (Nordion, Sterigenics, Steri-Tek, IBA). If you find
only the parameter envelope, note that standard ISO 11137 gamma sterilization uses ~25 kGy —
clearly labeled as an industry default, not a TerraCycle fact.

OUTPUT FORMAT:
1. One line per finding: FACT | exact quote | URL (or Wayback URL) | capture date | confidence (high/medium/low).
2. A short "what this changes" note per finding (tonnage → closes M-06 row 5; gamma detail →
   refines M-06 row 1).
3. If nothing found for an objective, list exactly which sources you tried and failed
   (so the next attempt doesn't repeat them).
------------------------------------------------------------

## Quick triage for you (15 minutes, no AI needed)

Click these three Wayback CDX listings and look for anything we don't already have
(especially any `*faq*` or municipal capture):
1. https://web.archive.org/cdx/search/cdx?url=terracycle.com/en-US/brigades/cigarette-waste-brigade.html&output=text&fl=timestamp,statuscode
2. https://web.archive.org/cdx/search/cdx?url=terracycle.com/*/cigarette*&output=text&fl=timestamp,original,statuscode&collapse=timestamp:6
3. https://web.archive.org/cdx/search/cdx?url=sf.surfrider.org/hold-onto-your-butt*&output=text&fl=timestamp,original,statuscode&collapse=timestamp:6

If any interesting capture appears, save the full page (Wayback "Save Page Now" is fine) and
upload the HTML to `butt-materials/new-25-11-2026/`.


== ai response ==
I'll start the retrieval work now — Wayback CDX enumeration first, since that's the highest-value and most concrete.

Good — 59 captures enumerated for the brigade page. Now the wildcard sweep (running it in background since it's slow) plus targeted FAQ hunting.

Both pages link to a "Cigarette Waste Brigade FAQ" — that's the highest-value target. Let me extract its URL.

Found the FAQ URL. Querying its captures:

**The FAQ page exists in 14 captures (2012-11-13 → 2016-01-20)** — described in the brief as the highest-value possible find. Fetching all of them:

All 14 captures retrieved. Extracting text and searching for the money terms:

Key results already. Let me now (a) read the earliest FAQ in full, (b) mine every capture for brigade totals to build a growth curve, and (c) fire off the Surfrider + other-locale sweeps.

Found the exact Surfrider FAQ page. Fetching it, plus systematically extracting brigade totals from every capture:

Now the growth curve is a real dataset (15 points: 0 → 45.1M units). Next: SEC EDGAR full-text, KAB reports, and the exact-phrase sweeps.

SEC EDGAR has TerraCycle US Inc. (CIK 1714781) with Reg A+ filings. Pulling the full filing set:

The 1-A has no tonnage or sterilization detail. Let me grep it for mass units and run the exact-phrase sweeps in parallel:

Major yield. A TerraCycle program flyer appears to contain per-partner tonnage data (Carnival's donation total implies pounds). Fetching it and chasing the KAB angle:

WISH 1 just cracked open. Two authoritative sources — verifying and capturing both:

Both primary sources verified and saved. Now extracting that 38-page TerraCycle document and pushing on WISH 2:

WISH 2 just gained a new detail — "tested for bioburden." Verifying that and sweeping other chapter FAQs:

**WISH 2 break:** a 2013 TerraCycle VP quote using the exact "bio contaminants" phrasing — four years before the Surfrider FAQ. Capturing it:

Extremely productive. Let me nail down the Belmont capture and check the French/Canadian tonnage angle:

I have enough to close both wishes. Let me assemble the capture bundle and verify the numbers.

Now writing up the findings.

Both wishes are answered. Summary:

## WISH 1 — CLOSED

**261,000 lb = 118.4 tonnes** (Keep America Beautiful, 2024-02-28, live on kab.org): "Since 2014, Keep America Beautiful has partnered with TerraCycle® to facilitate the recycling of more than 261,000 pounds (the weight of an adult blue whale) of cigarette butts."

And the key that unlocks everything else — SFNTC/Reynolds (2018-12-14) states the divisor explicitly: **1 lb = 1,000 butts**, alongside "more than 100 million and counting" pieces (= 45.4 t). I verified that factor independently: TerraCycle's own case-study deck says Carnival recycled 42,500,000 butts for "over $42,500" in $1/lb donations — exactly 1,000.0 butts/lb.

⚠ **But the 1,000/lb figure is likely too generous by ~2×.** A Marquette, MI shipment measured 14,583 butts at 6.43 lb = **2,268 butts/lb**; C-TRAN says ~2,000. So reported tonnages may overstate true mass ~2×, and the true figure is nearer 60 t. I've carried both, labelled.

Also: **the FAQ page the brief called "never found" — I found it.** `brigade_faqs.html`, 14 captures 2012→2016, all 200s. It contains **no** mass figure and **no** gamma mention, so rule it out; but its live totals footer yielded a 14-point growth curve including a new datapoint: **45,089,591 units by 2015-12-20** (75% above your working figure).

## WISH 2 — partial, with a firm negative on dose

Found a **2013 primary quote from Albe Zakes, TerraCycle's Global VP** — four years before Surfrider, using the same "bio contaminants" wording, so Surfrider clearly descends from TerraCycle copy. Critically, it implies a **different process order**: shred → compost → *then* irradiate the leftover filters, not "first sterilized." That changes the irradiation load materially for M-06 row 1.

New detail: Belmont, CA (2021) says filters are "sterilized using gamma radiation **and tested for bioburden**."

**Dose/dwell does not exist in public.** I checked the Reg A+ offering circular on EDGAR (CIK 1714781) — `"steriliz"`, `"gamma"`, `"tonnes"` all return **0 hits**; that document does not contain what the brief hoped. Also cleared: help-centre/Zero Waste Box captures, other Surfrider chapters, and the exact-phrase sweeps.

Two caveats: the Belmont quote is medium-confidence (403 to automated clients — needs a browser re-check), and butts-per-pallet has a 30× internal conflict (150,000 vs FOX 5's 5,000; the 150,000 is the physically coherent one).

**One thing I couldn't do:** push to `github.com/abdo2048/butt-materials` — no GitHub connector or credentials this session. Everything is staged at `butt-research/new-25-11-2026/` in the ingest layout (10 captures, 2 CSVs, 3 CDX listings, manifest), ready to push as-is.

---
== Me ==
okay, you could do one more deep research pass and try to get links/data/sources that benefit could us, either it was requested or not requested in previous prompt but will help us.

== ai response ==
Good call — let me go after the things the brief didn't ask for but that an invention phase actually needs: mass balance, the underlying chemistry, patents (which disclose process detail that press releases never do), and current 2026 status.

Two big ones: TerraCycle's own R&D VP resolves the process-order question, and a plastic-yield figure independently confirms my density analysis. Let me capture it and go after patents.

Patents confirm a telling gap: **TerraCycle holds no patents** on the process (assignee search = 0 results). Let me check whether anyone patents the irradiation step, and nail current status.

Current program has been rebranded. Let me capture the live 2026 pages — this is the "what's true today" layer the archive lacks.

Three independent routes converge exactly on 0.20 g/butt. Writing up the second pass.

Second pass done. It ended up **correcting three things from my first report** — I've flagged those at the top of the new file so they don't get read as additive.

**Correction 1 — the process order.** I inferred shred-first from a 2013 quote by TerraCycle's comms VP. Wrong. **Ernie Simpson — the Global VP of R&D your own brief already names as the process developer** — says: *"We first sterilize the material with gamma, or irradiation sterilization, and then we separate the tobacco and paper from the filaments."* I should have weighted the R&D witness first. So irradiation hits the **whole intake** (tobacco, ash, paper, filter) upstream of separation — a materially bigger step than I told you, which moves the cost model back.

**Correction 2 — the mass divisor is settled, and you should not publish 118 t.** Three unrelated routes converge on **0.20 g per smoked butt = 2,268 butts/lb**: peer-reviewed composition, Marquette's weighed shipment, and TerraCycle's own *"about a thousand cigarette butts to produce 100 grams of plastic"* (~52% yield). The official "1 lb = 1,000 butts" implies 0.454 g/butt — **2.3× too heavy**. It's an accounting convention, self-consistent in their books but not a measurement. Real cumulative mass is **~52 t, not 118 t.**

**Correction 3 — two of your top leads are dead.** The Jan Dell suit is **Last Beach Cleanup v. TerraCycle, 4:21-cv-06086** — eight *packaging* defendants (Coca-Cola, P&G, Gerber…), **cigarettes are not in the complaint.** And the Reg A+ circular has zero gamma/tonnage content. Neither needs another attempt.

**The number I think matters most:** nobody in the corpus states the capture rate, so I computed it. US butt waste is ~135 M lb/yr; TerraCycle moved ~21,750 lb/yr → **≈0.016%, about 1 pound in 6,200.** The mail-back model is a demonstration instrument, not a materials pathway. The binding constraint for an invention phase is **collection and consolidation — not the gamma step, not the pelletizing chemistry**, both of which are solved and known. Related: the whole 12-year programme yielded ~$261,000 for KAB against $12.5 M Reynolds spent — the recycling tail is ~2% of the spend.

Also worth having: **TerraCycle holds no patents** (assignee search: 0) — the process is a trade secret, which explains why no parameter exists anywhere. That makes "withheld" a better characterisation than "unfound." And the programme is **live in Nov 2026** under new paths — SFNTC still sponsors the US one, but **Canada is now UNSMOKE-branded**, a sponsor change the archive doesn't record.

Bundle is now 13 captures + 3 CSVs at `butt-research/new-25-11-2026/`. Still needs your push to the repo — I have no write access.