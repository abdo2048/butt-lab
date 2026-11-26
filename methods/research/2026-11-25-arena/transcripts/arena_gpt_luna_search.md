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
**Upload status:** I can’t write to GitHub or save files from this interface, so I did **not** upload captures or modify `butt-materials`. Below are source-ready findings with URLs and exact excerpts. Research cutoff: **November 25, 2026**.

## WISH 1 — Mass

- **FACT | KAB–TerraCycle partnership:** KAB reported more than **261,000 lb** of cigarette butts recycled since 2014—about **118.4 metric tonnes**, converted from the reported pounds. Exact excerpt: “Since 2014, Keep America Beautiful has partnered with TerraCycle to facilitate the recycling of more than 261,000 pounds of cigarette butts …” **URL:** `https://kab.org/keep-america-beautiful-to-award-up-to-375k-in-grants-to-combat-cigarette-litter/` **Date:** KAB release, February 2, 2024; no Wayback capture saved. **Confidence:** High that KAB published this figure; the release does not specify a precise measurement cutoff or say it covers every TerraCycle cigarette program.   
  **What this changes:** Supplies a direct aggregate mass figure for M-06 row 5, with a KAB-partnership scope caveat. It is not a mass corresponding to the April 2015 unit count.

- **FACT | Individual participant example:** DYNA-MIG in Stratford reported sending “almost 600,000 cigarette butts – about 500 pounds of material” to TerraCycle since 2013. **URL:** `https://www.terracycle.com/fr-CA/about-terracycle/news/9723` **Date:** March 14, 2017, per the reprinted *Stratford Beacon Herald* article; no Wayback capture saved. **Confidence:** Medium-high for this participant-level report; it is not a program-wide total.   
  **What this changes:** Corroborates that real participant shipments were reported by weight, but does not expand the aggregate total.

- **COUNT ONLY | Not mass:** KAB’s 2023 wrap report says, “More than 500 million cigarette butts have been recycled to date!” **URL:** `https://kab.org/wp-content/uploads/2024/10/KAB_2023-America-Recycles-Wrap-Report_R5.pdf` **Date:** Report titled *America Recycles 2023*; no Wayback capture saved. **Confidence:** High for the reported count. **Do not convert this count into weight.** 

- **EXCLUDED LEAD | Unverified unit:** A 2017 WBCSD case study says TerraCycle diverted “over 75 million tons of cigarette waste from landfill,” but it cites a TerraCycle FAQ that I could not recover. I would **not** use “tons” as verified mass; the intended unit cannot be established from the retrieved source. **URL:** `https://docs.wbcsd.org/2017/07/8business_case_studies.pdf` **Date:** 2017 report; no Wayback capture saved. **Confidence:** High that the report printed this wording; low that “tons” is a reliable unit. 

## WISH 2 — Gamma process and parameters

- **FACT | TerraCycle company fact sheet:** It describes gamma treatment of the filters followed by bioburden testing: “Filters are sterilized by gamma radiation, which is followed by bioburden testing to ensure the waste is clean and safe.” **URL:** `https://s3.amazonaws.com/tc-global-prod/download_resources/us/downloads/3308/Cigarette_Welcome_Fact_Sheet.pdf` **Date:** Undated PDF; retrieved November 25, 2026; no Wayback capture saved. **Confidence:** High that this is TerraCycle’s public description; it is not a validation protocol or test report.   
  **What this changes:** Refines M-06 row 1 with a qualitative QA detail—bioburden testing—but supplies no dose, dwell time, test method, acceptance criterion, or result.

- **FACT | Earlier process description:** A November 19, 2012 TerraCycle-hosted *Trentonian* article says “the raw pellets are safe and toxin free by treating them to a round gamma radiation.” **URL:** `https://www.terracycle.com/en-US/about-terracycle/news/56369` **Date:** November 19, 2012; no Wayback capture saved. **Confidence:** Medium; this is a contemporary news account of TerraCycle’s description.   
  **What this changes:** It places gamma treatment at the **pellet** stage, unlike the later fact sheet’s filter-before-shredding sequence. The public process descriptions are inconsistent; the source does not give parameters.

- **FACT | Conditional treatment reported in 2016:** The TerraCycle-hosted *Royal Purple* article describes treatment for locations with a “high risk of contamination,” where the waste is “sterilized using gamma radiation and tested for bacteria in the waste.” **URL:** `https://www.terracycle.com/en-US/about-terracycle/news/58862` **Date:** December 7, 2016, shown as the original *Royal Purple* publication date; no Wayback capture saved. **Confidence:** Medium; this is a reprinted account, not a technical specification.   
  **What this changes:** Suggests gamma treatment may have been conditional rather than universal, which conflicts with the blanket wording in Surfrider SF’s March 15, 2017 FAQ. 

- **PROCESS CONFLICT | City report:** A June 25, 2014 Richmond staff report says TerraCycle told the city, “They gamma radiate the plastics to kill contaminants before being recycled.” The same report says the process had **not** been verified by city staff. **URL:** `https://citycouncil.richmond.ca/__shared/assets/CigaretteButt_CNCL_07281439276.pdf` **Date:** June 25, 2014. **Confidence:** High that the report records this claim; low as independent confirmation of the process.   
  **What this changes:** Adds another reported irradiation target—separated plastics—without resolving whether the actual step was on filters, plastics, pellets, or only selected incoming waste.

- **CURRENT COPY | No parameter disclosure:** TerraCycle’s current program page says, “Once collected, the cigarette waste is cleaned and separated by material type.” It gives no gamma dose or dwell time. **URL:** `https://www.terracycle.com/en-US/brigades/cigarette-waste-recycling?os=TMB` **Date:** Live page retrieved November 25, 2026; no Wayback capture saved. **Confidence:** High for what the current public copy says; omission is not proof that irradiation is not used. 

- **SOURCE TRAIL | Old FAQ identified, not recovered:** WBCSD’s 2017 bibliography cites TerraCycle’s “Cigarette Waste Recycling Program – FAQ,” dated January 6, 2017, at `https://www.terracycle.com/en-US/brigades/cigarette-waste-brigade/brigade_faqs`. I could not retrieve its contents or an archived capture through this interface. **Confidence:** High that the reference appears in WBCSD; the FAQ’s contents remain unverified. 

**Parameter result:** I found no TerraCycle-specific kGy dose, dwell/exposure time, SAL, validation standard, sampling plan, or numerical pass/fail criterion. The only validation detail found is qualitative bioburden/bacteria testing. I did not treat the 25 kGy industry assumption as a TerraCycle fact.

## Search log and next leads

- I checked the August 29, 2017 SEC Form 1-A offering circular’s Part II/III: searching that filing for **“gamma”** returned no match; cigarette butts appear only in general business descriptions. **URL:** `https://www.sec.gov/Archives/edgar/data/1714781/000114420417045693/v473424_partiiandiii.htm` 
- KAB’s 2026 grant guidelines require grantees to report the **weight** of cigarette butts collected and recycled. Final reports are due **December 15, 2026**, after this research cutoff, making those reports a plausible follow-up for an updated KAB total. **URL:** `https://kab.org/wp-content/uploads/2026/02/2026-CLPR_FINAL_Grant-Guidelines_1.2026.pdf` 
- Wayback CDX for the exact brigade-page URL returned a capture list including the known April 23, 2015 capture, but I did not retrieve its HTML. The broader wildcard and Surfrider CDX requests timed out; the FAQ-path request was inaccessible in this interface. Those failures do **not** establish that no other captures exist. 

---
== Me ==
okay, you could do one more deep research pass and try to get links/data/sources that benefit could us, either it was requested or not requested in previous prompt but will help us.

== ai response ==
Yes. This pass turned up **one important correction**: the previous answer was too categorical in saying no public TerraCycle annual-throughput estimate existed. A 2019 INERIS report records a TerraCycle-supplied estimate—but its tonnage is **a disputed conversion, not a verified weighed total**.

## Findings

### 1. Best new global throughput lead — not a reliable measured tonnage

**FACT** | INERIS’s table says **“300 millions (monde entier) / an, soit ~136 t²”** (“300 million worldwide per year, or about 136 tonnes”); its footnote says **“Ces chiffres ont été communiqués par TerraCycle”** (“These figures were communicated by TerraCycle”). |  | Report date: February 2019; live-checked November 25, 2026; no archive capture saved | **Medium** for the company-reported annual count; **low** for the tonnage. 

**What this changes:** The table says the reported amount includes **waste from cigarette production**, not just consumer-collected butts. INERIS says the tonnage corresponds to an average of 0.45 g per butt, which it considers unusually high; using its other 0.20 g assumption produces a different implied tonnage. The report does not show weigh tickets or a weighing method. Under your rule, I would record **300 million/year as a reported count**, and annotate the tonnage as a **contested conversion—not a measured mass**. Do not use either conversion as the project’s verified weight. 

### 2. A local shipment weight from 2015

**FACT** | Clean Virginia Waterways’ report states: **“In November 2015, an estimated 15,350 cigarette butts, weighing approximately 20 pounds, were shipped to Terracycle for recycling.”** |  | Shipment: November 2015; report: May 2017; no archive capture saved | **Medium** for the report’s approximate shipment weight; the report does not specify tare or wet/dry basis. 

**What this changes:** This is a separate, local shipment record—not the April 2015 brigade-page count. The same report says rainwater led to some collected butts being discarded, and that 2016 collections were mostly too wet to recycle. That’s a useful warning that **collected weight, shipped weight, and recycled output need not match**. 

### 3. Other local reports do publish weights

- **Virginia Beach, 2023:** Surfrider reported that the city collected **22 pounds** from installed canisters. The same report says its litter counts showed a 72% average reduction across more than 50 locations. |  | **Medium** for the reported local weight; the source gives no weighing protocol. 
- **Tennessee:** Keep Tennessee Beautiful reported “nearly 14 pounds of cigarette butts recycled in less than a year of operation.” |  | **Medium**; local program result, with no net-weight method stated. 
- **Coral Gables, Florida:** The city’s FY 2025–26 budget says nearly 11 pounds had been collected and recycled since the program began in November 2024. |  | **Medium**; local program result, not a national total. 

**What this changes:** There are more local mass records to harvest than the previous pass surfaced. They are useful as **site-level observations**, but shouldn’t be summed into a TerraCycle-wide total without checking dates, packaging tare, moisture, rejects, and whether the weight means received or actually processed.

### 4. A promising way to obtain actual mass data

**FACT** | TerraCycle says incoming shipments are scanned to record the **“date, weight, and material it contained.”** |  | Live-checked November 25, 2026; no archive capture saved | **High** for TerraCycle’s description of its intake records—not proof that the underlying records are public. 

KAB’s 2026 CLPR grant guidelines require grantees to report **“Weight of cigarette butts collected and recycled.”** Final reports are due **December 15, 2026**—20 days after this research pass. 

TerraCycle’s 2026 SEC filing says program waste is aggregated and stored until enough material accumulates for economical processing, and that contamination or material loss can affect recovery. Its cited sections don’t provide cigarette-stream-specific throughput. 

**What this changes:** The best next request is an **anonymized annual shipment-weight export from TerraCycle**, plus KAB’s grantee-reported weights after December 15. Ask for separate fields for U.S. consumer program vs. worldwide and post-industrial material; gross vs. net weight; bags/boxes; moisture; rejected material; and mass sent to composting, washing, and pellet or powder production.

### 5. INERIS records a different TerraCycle process description

INERIS’s February 2019 report says it obtained information **directly by email from TerraCycle**. That description has the tobacco and paper separated and composted; the remaining cellulose-acetate filter is washed for decontamination, made into a rigid plastic format, and reduced to powder. INERIS says the wash water was recirculated and the powder could make up 10–60% of a product’s mass, depending on the product. The report also says TerraCycle appeared to use subcontractors for some processing. 

The same report’s process table describes the Great Britain route as **water washing followed by extrusion**, says pollutant removal into the wash water was **presumed**, and lists no communicated treatment cost. INERIS says it could not obtain technical environmental-performance information from material-recovery pathways and called for pollutant-fate verification. 

**What this changes:** The user’s process sequence should not be treated as universal. At minimum, a 2018 TerraCycle account to INERIS describes a wash/decontamination route, powder output, and a wastewater pathway. It does not establish that this was—or is—the process used for every U.S. shipment. **Confidence: medium** for what TerraCycle told INERIS then; low for independent verification or current site-specific practice.

### 6. Gamma claims still conflict; no dose or dwell time found

**FACT** | TerraCycle’s undated fact sheet says: **“Filters are sterilized by gamma radiation, which is followed by bioburden testing.”** A TerraCycle-hosted 2016 article instead says gamma treatment is used **“in cases where cigarette waste is collected from a location with a high risk of contamination.”** Surfrider’s 2017 FAQ describes gamma as a first step for collected waste and claims it removes toxins as well as bio-contaminants. | ; ;  | Fact sheet undated; other dates: December 7, 2016 and March 15, 2017; no archive captures saved | **High** for the differing published wording; **low** for any single settled, current protocol. 

**What this changes:** The public descriptions range from **conditional irradiation** to **blanket treatment**, while INERIS’s later TerraCycle description emphasizes washing. I still found no TerraCycle-specific absorbed dose, exposure/dwell time, dosimetry, validation protocol, bioburden acceptance threshold, or batch results. Don’t treat **25 kGy** as a TerraCycle fact; it remains only a clearly labeled modeling assumption. Bioburden testing should also not be treated as evidence that chemical contaminants were removed.

### 7. I found the original LCA presentation, and its assumptions matter

**FACT** | The PE International/TerraCycle conference deck states: **“Functional unit: The treatment of 1 kg of post-consumer cigarette butts disposed in Canada.”** It models **“filter toxins trapped in recycled plastic.”** |  | Slide footer: September 5, 2013; ResearchGate metadata says September 2012; no capture saved | **High** for what the deck says; **low** as independent proof of final-product safety. 

The deck compares recycling, landfill, incineration, and litter; it also credits avoided production of recycled polypropylene and fertilizer and identifies transport/packaging as important burdens. But the toxin-retention statement is an **LCA inventory assumption**, not a reported lab test of pellet residues. The deck does not by itself verify Surfrider’s 20–80% savings claim or establish that it is the complete underlying LCA. 

### 8. Useful independent evidence on process water and chemical residues

A 2024 *Scientific Reports* study on recycling smoked and littered cigarette filters found recycling leachate COD ranging from **2,100 to 11,300 mg/L** and concluded that **“leachate treatment is necessary to reduce the environmental risk.”** This was not a TerraCycle process test, so it is a reason to request TerraCycle-specific data—not proof of TerraCycle effluent quality. 

INERIS’s earlier study tested samples from other French collectors and classified three samples as hazardous under the European HP14 ecotoxicity tests. That is **not** a finding about TerraCycle’s processed pellets and is not a U.S. legal classification. 

**What this changes:** For safety validation, request separate results for **wash water/effluent, treatment sludge, compost, and finished pellets**—including chemical residues—not just bioburden testing.

### 9. New national and local benchmarks—counts only

KAB’s 2026 National Litter Study estimates **more than 3.8 billion cigarette butts are present at any given time** across U.S. roadways, waterways, and coastal areas. Its fieldwork covered 700 randomly selected sites; it reports a 62% decline in butt litter along roadways and waterways from 2020 to 2025. This is an estimated **standing litter count**, not annual generation, TerraCycle throughput, or mass; the study does not attribute the decline to TerraCycle. Its acknowledgments include Altria, Reynolds, and Santa Fe Natural Tobacco Company as supporters. 

For partner leads, WHRO reported TerraCycle had taken in more than **4.3 million cigarette butts from Virginia**, including 664,000 from Hampton Roads, and Des Moines’ FY2025 annual report records **211,500 butts recycled**. These are counts, not weights, but the local organizations may have shipment records. 

## Best next questions to send

1. **Mass:** Please provide annual **net received weight** for the U.S. consumer cigarette program, separated from worldwide and post-industrial material. Include dates, tare/packaging, moisture, rejects, and the weight actually sent to each downstream processor.
2. **Material balance:** For the same period, what mass went to composting, washing, powder/pellet production, wastewater sludge, and processing loss? Which products used cigarette-derived material, and at what approximate share?
3. **Gamma:** Is irradiation used for the U.S. stream today, at which facility, on which material stage, and for every shipment or only specified contamination-risk cases? Please provide a non-confidential summary of dose range, dosimetry/validation, bioburden test criteria, and chemical-residue testing.
4. **KAB:** After the December 15, 2026 reporting deadline, can KAB provide an anonymized aggregate of its grantees’ reported cigarette-butt weights?

## Sources tried but not recovered

- The TerraCycle FAQ cited by WBCSD as **“Cigarette Waste Recycling Program - FAQ,” January 6, 2017**: . The cited live path, , and the alternate no-hyphen path  were inaccessible through this interface. 
- Wayback CDX and replay attempts for that FAQ were inaccessible through the tool. That is **not evidence that no archive capture exists**.
- The ResearchGate page for the 2013 LCA deck was readable, but its direct PDF download returned 404; the accessible page includes the deck’s extracted text. 
- No TerraCycle-specific numerical gamma dose, dwell time, or validation protocol was found.

**Nothing was uploaded to `github.com/abdo2048/butt-materials/new-25-11-2026/`, and no full-page HTML captures were saved.** I can’t write to GitHub or save files from this interface.