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
I can’t execute the retrieval portion of this brief in the current session: I have no web/Wayback CDX access and no ability to upload files to GitHub.

**Status**
- New verified findings: **none**
- Sources searched: **none** — this is *not* a negative search result
- Captures uploaded to `butt-materials/new-25-11-2026/`: **none**

I won’t infer tonnage from unit counts or present the ~25 kGy ISO 11137 figure as a TerraCycle-specific parameter.

If you provide the CDX responses, archived HTML, PDFs, or court filings here, I can analyze them and return:

`FACT | exact quote | URL/Wayback URL | capture date | confidence`

along with the requested “what this changes” notes and a precise failed-source log. Alternatively, the brief’s copy-paste prompt should be run in an agent environment with browsing and Wayback access.

---
== Me ==
okay, you could do one more deep research pass and try to get links/data/sources that benefit could us, either it was requested or not requested in previous prompt but will help us.

== ai response ==
Understood—links and leads only. **I could not open or verify these in this session**, so the search links below are retrieval aids, not confirmed findings or citations.

## Highest-value archive/API requests

- [TerraCycle cigarette URLs — CDX, successful captures, deduplicated by URL](https://web.archive.org/cdx/search/cdx?url=terracycle.com/*/cigarette*&output=text&fl=timestamp,original,statuscode,mimetype&filter=statuscode:200&collapse=urlkey)
- [Original Cigarette Waste Brigade page — all successful captures](https://web.archive.org/cdx/search/cdx?url=terracycle.com/en-US/brigades/cigarette-waste-brigade.html&output=text&fl=timestamp,original,statuscode,mimetype&filter=statuscode:200&collapse=digest)
- [TerraCycle domain URLs containing “FAQ”, 2012–2020](https://web.archive.org/cdx/search/cdx?url=terracycle.com&matchType=domain&output=text&fl=timestamp,original,statuscode,mimetype&filter=statuscode:200&filter=original:.*%5BFf%5D%5BAa%5D%5BQq%5D.*&from=2012&to=2020&collapse=urlkey)
- [Surfrider SF “Hold On To Your Butt” captures](https://web.archive.org/cdx/search/cdx?url=sf.surfrider.org/hold-onto-your-butt*&output=text&fl=timestamp,original,statuscode,mimetype&filter=statuscode:200&collapse=urlkey)
- [Surfrider domain URLs mentioning cigarette/butt campaigns, 2012–2021](https://web.archive.org/cdx/search/cdx?url=surfrider.org&matchType=domain&output=text&fl=timestamp,original,statuscode&filter=statuscode:200&filter=original:.*%28%5BCc%5Digarette%7C%5BHh%5Dold.*%5BBb%5Dutt%29.*&from=2012&to=2021&collapse=urlkey)
- [TerraCycle help-center cigarette/FAQ captures](https://web.archive.org/cdx/search/cdx?url=help.terracycle.com&matchType=domain&output=text&fl=timestamp,original,statuscode,mimetype&filter=statuscode:200&filter=original:.*%28%5BCc%5Digarette%7C%5BFf%5D%5BAa%5D%5BQq%5D%29.*&from=2012&to=2020&collapse=urlkey)
- [Zero Waste Box cigarette/FAQ captures](https://web.archive.org/cdx/search/cdx?url=zerowastebox.terracycle.com&matchType=domain&output=text&fl=timestamp,original,statuscode,mimetype&filter=statuscode:200&filter=original:.*%28%5BCc%5Digarette%7C%5BFf%5D%5BAa%5D%5BQq%5D%29.*&from=2012&to=2020&collapse=urlkey)

## Wish 1 — mass, tonnage, or collection-rate figures

### KAB, tobacco companies, and SEC

- [KAB domain: TerraCycle](https://www.google.com/search?q=site%3Akab.org+%22TerraCycle%22)
- [KAB/CLPP: TerraCycle and pounds](https://www.google.com/search?q=%22Cigarette+Litter+Prevention+Program%22+TerraCycle+pounds)
- [KAB reports mentioning cigarette/TerraCycle, PDFs](https://www.google.com/search?q=site%3Akab.org+filetype%3Apdf+%28TerraCycle+OR+%22Cigarette+Litter+Prevention%22%29)
- [Reynolds American PDFs mentioning TerraCycle](https://www.google.com/search?q=site%3Areynoldsamerican.com+filetype%3Apdf+TerraCycle)
- [BAT PDFs mentioning TerraCycle and cigarette waste](https://www.google.com/search?q=site%3Abat.com+filetype%3Apdf+TerraCycle+%22cigarette+waste%22)
- [Santa Fe Natural Tobacco: TerraCycle and cigarette waste](https://www.google.com/search?q=%22Santa+Fe+Natural+Tobacco%22+TerraCycle+%22cigarette+waste%22)
- [SEC EDGAR full-text search: TerraCycle](https://www.sec.gov/edgar/search/#/q=TerraCycle)
- [SEC archive documents containing “TerraCycle” and “cigarette”](https://www.google.com/search?q=site%3Asec.gov%2FArchives%2Fedgar%2Fdata+%22TerraCycle%22+%22cigarette%22)
- [SEC archive documents containing “TerraCycle US”](https://www.google.com/search?q=site%3Asec.gov%2FArchives%2Fedgar%2Fdata+%22TerraCycle+US%22)

### Broad numeric-phrase searches

- [“Cigarette Waste Brigade” + pounds/lbs/tons/tonnes](https://www.google.com/search?q=%22Cigarette+Waste+Brigade%22+%28pounds+OR+lbs+OR+tons+OR+tonnes%29)
- [TerraCycle cigarette waste + kg/kilograms/tonnes](https://www.google.com/search?q=TerraCycle+%22cigarette+waste%22+%28kg+OR+kilograms+OR+tonnes%29)
- [TerraCycle cigarette butts + “per year”](https://www.google.com/search?q=TerraCycle+%22cigarette+butts%22+%22per+year%22)
- [TerraCycle + “million cigarette butts”](https://www.google.com/search?q=TerraCycle+%22million+cigarette+butts%22)
- [TerraCycle + “billion cigarette butts”](https://www.google.com/search?q=TerraCycle+%22billion+cigarette+butts%22)
- [“Cigarette Waste Brigade” PDFs](https://www.google.com/search?q=%22Cigarette+Waste+Brigade%22+filetype%3Apdf)
- [“Cigarette Waste Brigade FAQ”](https://www.google.com/search?q=%22Cigarette+Waste+Brigade+FAQ%22)

### Trade press and municipal programs

- [Plastics News: TerraCycle cigarette](https://www.google.com/search?q=site%3Aplasticsnews.com+TerraCycle+cigarette)
- [Resource Recycling: TerraCycle cigarette](https://www.google.com/search?q=site%3Aresource-recycling.com+TerraCycle+cigarette)
- [Waste360: TerraCycle cigarette](https://www.google.com/search?q=site%3Awaste360.com+TerraCycle+cigarette)
- [Waste Dive: TerraCycle cigarette](https://www.google.com/search?q=site%3Awastedive.com+TerraCycle+cigarette)
- [Recycling Today: TerraCycle cigarette](https://www.google.com/search?q=site%3Arecyclingtoday.com+TerraCycle+cigarette)
- [TerraCycle mégots + tonnes/kg/kilos](https://www.google.com/search?q=TerraCycle+m%C3%A9gots+%28tonnes+OR+kg+OR+kilos%29)
- [Vancouver cigarette recycling + TerraCycle](https://www.google.com/search?q=Vancouver+cigarette+recycling+TerraCycle+tonnes)
- [Toronto cigarette recycling + TerraCycle](https://www.google.com/search?q=Toronto+cigarette+recycling+TerraCycle+kilograms)
- [CBC: TerraCycle cigarette recycling](https://www.google.com/search?q=site%3Acbc.ca+TerraCycle+cigarette+recycling)
- [Google Scholar: TerraCycle cigarette tonnes/per year](https://scholar.google.com/scholar?q=%22TerraCycle%22+cigarette+%28tonnes+OR+tons+OR+%22per+year%22%29)

## Wish 2 — gamma sterilization and original process text

### Exact phrases and variants

- [“sterilized using Gamma radiation” + TerraCycle](https://www.google.com/search?q=%22sterilized+using+Gamma+radiation%22+TerraCycle)
- [“150,000 cigarette butts”](https://www.google.com/search?q=%22150%2C000+cigarette+butts%22)
- [“150,000” + cigarette butts + pallet](https://www.google.com/search?q=%22150%2C000%22+%22cigarette+butts%22+pallet)
- [TerraCycle + cigarette + “gamma radiation”](https://www.google.com/search?q=TerraCycle+cigarette+%22gamma+radiation%22)
- [TerraCycle + cigarette + “gamma irradiation”](https://www.google.com/search?q=TerraCycle+cigarette+%22gamma+irradiation%22)
- [TerraCycle + cigarette waste + sterilized/sterilised/irradiated](https://www.google.com/search?q=TerraCycle+%22cigarette+waste%22+%28sterilized+OR+sterilised+OR+irradiated%29)
- [“gamma” + “Cigarette Waste Brigade”](https://www.google.com/search?q=%22gamma%22+%22Cigarette+Waste+Brigade%22)

### Surfrider and LCA contractors

- [Surfrider: gamma + cigarette](https://www.google.com/search?q=site%3Asurfrider.org+gamma+cigarette)
- [Surfrider: “Hold On To Your Butt” + TerraCycle + FAQ](https://www.google.com/search?q=site%3Asurfrider.org+%22Hold+On+To+Your+Butt%22+TerraCycle+FAQ)
- [PE International + TerraCycle](https://www.google.com/search?q=%22PE+International%22+TerraCycle)
- [Five Winds + TerraCycle](https://www.google.com/search?q=%22Five+Winds%22+TerraCycle)
- [PE International + Five Winds + cigarette/TerraCycle](https://www.google.com/search?q=%22PE+International%22+%22Five+Winds%22+%28cigarette+OR+TerraCycle%29)
- [PE International archive URLs mentioning TerraCycle/cigarette](https://web.archive.org/cdx/search/cdx?url=pe-international.com&matchType=domain&output=text&fl=timestamp,original,statuscode&filter=statuscode:200&filter=original:.*%28%5BTt%5Derra%5BCc%5Dycle%7C%5BCc%5Digarette%29.*&collapse=urlkey)
- [Five Winds archive URLs mentioning TerraCycle/cigarette](https://web.archive.org/cdx/search/cdx?url=fivewinds.com&matchType=domain&output=text&fl=timestamp,original,statuscode&filter=statuscode:200&filter=original:.*%28%5BTt%5Derra%5BCc%5Dycle%7C%5BCc%5Digarette%29.*&collapse=urlkey)

### Litigation and irradiation contractors

- [CourtListener docket search: TerraCycle](https://www.courtlistener.com/?q=TerraCycle&type=r)
- [Dell/TerraCycle complaint PDFs](https://www.google.com/search?q=Dell+TerraCycle+complaint+filetype%3Apdf)
- [“Last Beach Cleanup” + TerraCycle complaint](https://www.google.com/search?q=%22Last+Beach+Cleanup%22+TerraCycle+complaint)
- [TerraCycle + Bell International + Akshar](https://www.google.com/search?q=TerraCycle+%22Bell+International%22+Akshar)
- [TerraCycle + gamma + complaint/lawsuit](https://www.google.com/search?q=TerraCycle+gamma+%28complaint+OR+lawsuit%29)
- [TerraCycle + Sterigenics/Nordion/Steri-Tek/IBA](https://www.google.com/search?q=TerraCycle+%28Sterigenics+OR+Nordion+OR+%22Steri-Tek%22+OR+IBA%29)

**No new mass figure, dose, dwell time, or validation parameter was retrieved or verified here.** Any resulting number should be treated as evidence only after obtaining its exact sentence, source URL, and capture/publication date.