# Stage 1 / H01 — Company and non-patent source map (batch-01)

Date: 2026-11-03. Actor: single AUTO Harvester (Arena Agent Mode session). Baseline commit: `fda66af351a37d38287792ed3b578a258eedf7fc`. Status: `complete_bounded`, not a worldwide inventory.

Scope: companies and operators that collect, sort, clean, recover or convert post-consumer cigarette butts, including companies with **no located patent**. Evidence is separated into source statements (patent/company/paper), independent measurements (rare here), calculations (marked) and hypotheses. Retrieval budget for this session: 20 of 24 planned retrieval calls; details in `reports/stage1/coverage-ledger.md`.

Label key: `[VERIFIED-SOURCE: URL]` = the cited source directly states it (company pages are self-report, not independent measurement); `[CALCULATION]` = arithmetic performed here from stated inputs; `[HYPOTHESIS]` = reasoning, not a source claim; `UNRESOLVED` / `DISPUTED` = sources conflict and both versions are kept.

---

## 1. Coverage summary

| Category | Count | Notes |
|---|---:|---|
| Company/operator entities mapped | 10 | Code Effort, TerraCycle, BuffIndia, TchaoMegot, Keenat, MéGo!, Re-Cig, Poiato Recicla (+ UnB licensor), CNR/AzzeroCO2, Cerdia |
| Companies with a located patent family | 6 | TchaoMegot, Keenat, MéGo!, Re-Cig (family stated, number not located), CNR (offering, number not on page), Cerdia; plus patent-only actors below |
| Companies with **no** patent located in this search | 3 | Code Effort, TerraCycle, BuffIndia (absence is search-scoped, not proof none exists) |
| Patent-only / non-operating sources mapped | 10 | Miniwiz US10980272B2, Matteri EP2520184A1, Burich US7560059B2, US20140287144A1, US5504119A, CN106928486A/B, CN111822484A, CN111118670A, KR20160005298A, Kalabak WO2020231362A1 |
| Peer-reviewed / academic source families mapped | 7 | De Fenzo 2020 (water/ethanol), Teixeira 2017 (alkaline pulping), CN106928486 (acid dissolution), CNR acetone route, acetic-acid 2025 route, CA membranes, RMIT construction materials |
| Operators with explicit disclosed mass split or yield | 3 | MéGo! (company split), Re-Cig (kg in → kg polymer), TchaoMegot (99.7/0.3 company claim) |
| Operators with independent third-party contaminant assay located | 0 | Not located for any operator in this pass |

Collector/processor separation is stated per entity in §4; several firms are both.

---

## 2. What this map does **not** establish

- No company was contacted. No plant was visited. No confidential or gated document was accessed.
- A company page describing "depollution" is a marketing/technical claim, not an assay. No removal percentage in this file is independently verified.
- "No patent located" for Code Effort, TerraCycle or BuffIndia means exactly that: not found in the sources and search paths recorded in H02. It does not prove no patent, no application, or a trade secret.
- Patent legal status quoted from Google Patents is a database assumption; no register (INPI, EPO, USPTO, INPI-BR) was queried in this pass.
- Company throughput figures are self-reported and mutually inconsistent in several cases (§5). They are recorded, not reconciled.

---

## 3. Process-family map

| Family | Mechanism as disclosed | Principal sources | Batch-01 unit |
|---|---|---|---|
| F1 Mechanical + aqueous washing | Separate filter/paper/tobacco, wash in water (sometimes with additives), dry, mill or thermo-compress | MéGo! FR3066128A1; Re-Cig company steps; Code Effort news reports; TerraCycle official PDF | S2-01 |
| F2 Dry thermal + extrusion composite | Separate, heat-treat filters dry, grind, compound with thermoplastic | Keenat FR3110470A1; Keenat company page | S2-02 |
| F3 Solvent dissolution / precipitation | Dissolve CA (acetic acid, acetone), filter solids, precipitate, recover solvent | CN106928486A/B; CNR offering; Cerdia WO2026074041A2 | S2-03 |
| F4 Pressurized / supercritical fluid | Dense CO2 (+ optional co-solvents) contacts prepared fibre; extract separated; fluid recycled | TchaoMegot FR3102180A1 family | S2-04 |
| F5 Alkaline (or acid) pulping / hydrolysis | Hydrolyse acetate to cellulose, remove lignin, wash to pulp; acid-precipitate the dark liquor | UnB PI 0305004-1; Teixeira et al. 2017 | S2-05 |
| F0 Baseline: staged water/ethanol wash | Hot water + cold rinses + ethanol washes, dry; acetone only for film casting | De Fenzo et al. 2020 (existing spec) | S2-00 (existing) |

Construction/energy uses (bricks, asphalt, concrete, carbonisation, pyrolysis, supercapacitors) are mapped in H02/H03 as deferred families, not reconstructed in this batch.

---

## 4. Entity records

### 4.1 Code Effort Pvt Ltd (India) — collector + processor, **no patent located**

- Identity/location: Noida (Sector 134 / Nagli village), Uttar Pradesh; founded 2018 by Naman and Vipul Gupta. `[VERIFIED-SOURCE: https://codeefforts.com/; https://thebetterindia.com/404094/...]`
- Collection: own "V bins" at cigarette shops, offices, smoking areas; network of ragpickers and contractors; company claims 200–300 collection centres, 2,000+ ragpickers across 130–250 districts, 300,000+ bins, and payment of INR 200–400/kg (one source: INR 500–800/kg). `[VERIFIED-SOURCE: TOI 2022-11-13; The Better India 2025-02-08; unstop.com 2022-06-22]`
- Disclosed process (news-reported, company description):
  1. Stubs cut/shredded into small pieces — "less than 30 seconds for each batch". `[VERIFIED-SOURCE: The Better India 2025-02-08]`
  2. Fibre, paper and tobacco/ash separated.
  3. Fibre soaked in water, ground, then treated with "biodegradable chemicals" in solution for 24–36 h; dried about 1 h; softened/opened ("cotton-like"). `[VERIFIED-SOURCE: TOI 2022-11-13; The Better India 2025-02-08]`
  4. Paper → pulp → sheets / mosquito-repellent mats with essential oils and organic binder. `[VERIFIED-SOURCE: theweekendleader.com 2021-11-13]`
  5. Tobacco/ash → aerobic decay about 30 days (bacteria/fungus sourced from fertiliser companies) → compost powder sold to nurseries. `[VERIFIED-SOURCE: TOI 2022-11-13; The Better India 2025-02-08]`
- Products: A4 paper (₹449), kraft/fridge-magnet kits (₹499), soft-toy stuffing, cushions, keychains, diaries, mosquito mats ("Nmosq"), compost. `[VERIFIED-SOURCE: codeefforts.com; news sources]`
- Water/emissions/residues: company states process wastewater is reused and the process is "completely carbon neutral"; no flow, volume, treatment train or effluent analysis disclosed. `[VERIFIED-SOURCE: theweekendleader.com — company claim]`
- Tests/certification: company claims ISO 9001:2015 / 14001:2015 / 45001:2018 and in-house lab QC of stuffing before sale; no certificate number, laboratory name, analyte list or detection limit located. `[VERIFIED-SOURCE: interestingengineering.com 2022-10-20 — company claim]`
- Scale claims: 1,000 kg/day ≈ 3.5 million butts/day (2022); up to 3 t/day of fibre (2025); 5 kg fibre per cycle; plan to grow 30 → 300 t/month by 2025. `[VERIFIED-SOURCE: TOI 2022-11-13; The Better India 2025-02-08]`
- Cumulative-count inconsistency: 300 million (2022 company website), 1.2 billion (2022 TOI), 12 billion (homepage 2026). `UNRESOLVED` — counts may mix butts, filters, or include collection partners; no definition given.
- Process chemistry: **not disclosed** (called proprietary). No patent or application located in this search (English/company-news queries only).
- Missing disclosures: chemical identity and dose, bath temperature, water volume per kg, wastewater treatment and discharge route, dust/odour control, solvent-free claim vs "chemicals" wording, toxin assays on finished fibre, product leachate/emission data.

### 4.2 TerraCycle (US/CA) — collector/organiser; processing partners, **no patent located**

- Programme: "UNSMOKE Cigarette Free Recycling Program" (Canada), all brands, 19+ enrolment, public drop-off points, prepaid shipping to TerraCycle. Accepted waste includes extinguished cigarettes, filters, loose tobacco pouches, outer plastic and inner foil packaging, rolling paper. `[VERIFIED-SOURCE: https://www.terracycle.com/en-CA/brigades/cigarette-waste-en-ca]`
- Official process description (company PDF, 3 steps): collection and warehouse aggregation → tobacco and paper dried and mixed with other organic material to make compost; filters (cellulose acetate) dried and turned into powder → powder used in recycled plastic lumber (benches, picnic tables, fencing, decks, playground equipment). `[VERIFIED-SOURCE: https://dva1blx501zrw.cloudfront.net/download_resources/ca/downloads/17131/How-cigarette-butts-recycled_v3-ca.pdf]`
- Sanitisation: **not disclosed in this PDF**. An earlier project draft described "shred + sanitize" as a trade secret; that description is not confirmed by the official PDF read here. Do not treat "sanitize" as a disclosed unit operation. `[UNRESOLVED: earlier draft vs current official PDF]`
- Water/emissions/residues: not disclosed. Where composting and powdering occur, and who operates those steps, is not disclosed.
- Tests: none located.
- Missing disclosures: sanitisation chemistry, contaminant data for compost and lumber, mass balance, processing locations, worker exposure controls.

### 4.3 BuffIndia (India) — collector + processor, **no patent located**

- Identity: Ahmedabad; founded October 2018 by Ketan Prajapati and Nikhil Mangani; ~100 staff; 22–26 states/85 cities; 1,350 premises; fire-proof collection kiosks on annual rental plus door-to-door collection. `[VERIFIED-SOURCE: yourstory.com 2025-05-09; Climate Action Live 2026-06-11]`
- Disclosed process (single company interview): "ISO-compliant process involving acidic hydrolysis, high-temperature treatment, and medical-grade testing"; recycled material "often combined with clay" into decorative products. `[VERIFIED-SOURCE: https://www.climateaction.live/a-circular-economy-for-cigarette-butts/ — company claim]`
- Scale: 1.8–2.5 t/month; ~3.2 million butts in March 2025; 960 kg "microplastic" upcycled to date. `[VERIFIED-SOURCE: same; yourstory]`
- Missing disclosures: acid identity/concentration, temperature/time, clay ratio, what "medical-grade testing" measured and by whom, effluent and off-gas handling, product leachate data.
- The phrase "acidic hydrolysis" is significant because it chemically converts cellulose acetate toward cellulose; it is **not** a wash-and-dry process. No patent or paper located in this search.

### 4.4 TchaoMegot (France) — collector + processor, patented

- Patents (registry/inherited): FR3102180A1 (priority 2019-10-22), WO2021079050A1, US12065781B2, US20260115774A1. `[VERIFIED-SOURCE: patents.google.com/patent/FR3102180A1/en — partial read in prior session; not re-fetched here]`
- Company process page: supercritical CO2 as "natural cleaner"; toxic substances extracted into concentrate; 99.7 % clean material / 0.3 % total toxics concentrate; no water, no toxic solvent; closed circuit with no release to nature; CO2 recovered from industry and reused; low energy claim; "6 world patents"; INERIS HP6/HP14 classification cited; prefectoral authorisation cited. `[VERIFIED-SOURCE: https://tchaomegot.com/depollution/ — company claims]`
- Note on wording: "sans eau" (no water) is not "dry". Dense/supercritical CO2 is a fluid; the company's own page describes extraction, not a dry thermal step.
- `UNRESOLVED`: a press quote reported ~50/60 bar and ~30 °C, while the patent's preferred envelope is 280–320 bar / 15–80 °C. Both retained (see assumption ledger A-04).
- Missing disclosures: current commercial pressure/temperature, co-solvent identity/dose, cycle time, throughput, energy per tonne, concentrate disposal route, analyte-specific removal data and third-party assay reports.

### 4.5 Keenat (ex-écomégot, France) — collector + processor, patented

- Patents: FR3110470A1 (filed 2020-05-19, FR2005076), EP21174612.8, ES21174612T, inventor Teddy Fournier, assignee Keenat. `[VERIFIED-SOURCE: https://patents.google.com/patent/FR3110470A1/en — abstract/description partially read]`
- **Patent-disclosed process** (claim-style summary): (a) separate filters into fraction F1 and tobacco/paper into F2; (b) dry and depollute F1 by heating at **80–100 °C**; (c) grind F1; (d) mix and simultaneously depollute in an extruder with at least one thermoplastic polymer; composite of **10–30 % recycled filters and 70–90 % thermoplastic**, preferably granulate; uses: furniture, pipes, legs, ashtrays, panels. `[VERIFIED-SOURCE: FR3110470A1 description]`
- Company page: mechanical separation; dry depollution with no liquid discharge; fibre "hygienised"; thermo-compression into plastic plates for furniture/information boards; process also applied to PPE (masks, gloves, gowns); company now prioritises solid recovered fuel (CSS) after LCA, stating it has the better overall environmental balance. `[VERIFIED-SOURCE: https://keenat.com/recyclage-valorisation-megots/]`
- `DISPUTED / UNRESOLVED`: inherited dossier states "successive heatings ~200 °C destroying nicotine, phenol, pesticides" (from Le Parisien / keenat.com 2026). The patent text read here states drying/depollution at 80–100 °C, then extruder compounding. Both are recorded; the 200 °C figure may describe extruder or later process conditions not visible in the read passages, or a different embodiment. Do not merge the two into one temperature.
- LCA retreat: 2022 LCA concluded plastic-object recycling was not environmentally beneficial; dedicated site closed; pivot to CSS for cement kilns. `[VERIFIED-SOURCE: dossier/cautionary/keenat-lca-retreat.md; Le Parisien 2026-10-15]`
- Missing disclosures: residence time at 80–100 °C, air/off-gas treatment, what "depollute" removes (no analyte data), composite mechanical/leachate tests, CSS emission data.

### 4.6 MéGo! (France) — collector + processor, patented

- Patent: FR3066128A1 (filed 2017-05-15, FR1754267), granted FR3066128B1 (2019-07-19); inventors Bastien Lucas, Andrianina Lucas, Guillaume Andre, Toinelo Monteiro; assignee MéGo!. `[VERIFIED-SOURCE: dossier/evidence/FR3066128A1-mego.md; Google Patents]`
- Patent-disclosed sequence: (a) first grinding to separate filter from organic material; (b) sieving to recover cellulose acetate; (c) washing the filter with water in a wash tank to separate CA and paper; (d) decontamination washing with water in a decontamination tank; (e) recycling wash water; (f) pre-cooking drying; (g) second milling to fibrous fine CA particles. `[VERIFIED-SOURCE: FR3066128A1 abstract]`
- Company-disclosed mass split: 1 kg ≈ 2,000 butts, comprising 12 % paper/tobacco/ash, 8 % sludge, 80 % cellulose acetate. `[VERIFIED-SOURCE: capbiotek.fr citing Ouest-France 2017-12-01]` `[CALCULATION: shares sum to 100 % as stated; no moisture term is given, so the "80 % CA" is on the stated fresh-mass basis, which is ambiguous]`
- Company process: closed-loop depollution; depolluted water reused in next cycle; acetate sludge dried, melted, thermo-compressed into plastic sheets → street bins, furniture, ashtrays. `[VERIFIED-SOURCE: Ouest-France 2018; Le Télégramme 2018]`
- Capacity: 230 t/y capability (2018); 35 t treated, target 200 t/y by 2025 (2022); move to Saint-Divy, unit remains Bourg-Blanc. `[VERIFIED-SOURCE: Ouest-France 2018 and 2022-12-15]`
- `DISPUTED`: butts-per-kg is given as 2,000 (Capbiotek/Ouest-France 2017) and 4,000 (Ouest-France 2018). This may reflect butt vs filter mass or wet vs dry; unresolved. Any per-tonne extrapolation must carry both.
- Missing disclosures: wash temperature/time, detergent or additive (if any), water recycle ratio and purge, sludge contaminant content and disposal route, drying temperature, CA purity/yield, toxin assays.

### 4.7 Re-Cig (Italy) — collector + processor, patented (number not located)

- Identity: Rovereto/Civezzano (Trento), founded by Marco Fimognari and Nicola Bonetti; incubated at Progetto Manifattura; University of Trento collaboration. `[VERIFIED-SOURCE: re-cig.it; renewablematter.eu 2023]`
- Patent: "patent filed in February 2019, extended throughout Europe"; **number not located in this search**. `[VERIFIED-SOURCE: re-cig.it/en/tecnologia/ — company statement]`
- Disclosed process: (1) sieving to remove ash, tobacco residue and debris; (2) double wash cycle at variable temperatures to separate paper from filter material and eliminate harmful substances — **process water is sent to a certified partner for purification**, not internally closed-loop; (3) drying and hot mixing ("thermoplastification") at controlled temperature → granulation; (4) End-of-Waste declaration and conformity. `[VERIFIED-SOURCE: https://www.re-cig.it/en/tecnologia/]`
- Mass balance (company, per university case): 15.50 kg butts → 6.00 kg polymer; 6.12 kg → 2.39 kg. `[VERIFIED-SOURCE: https://www.re-cig.it/en/portfolio/re-cig-universita/]` `[CALCULATION: 6.00/15.50 = 38.7 %; 2.39/6.12 = 39.1 % — a consistent ~39 % polymer yield on collected-butt mass, on the company's own accounting, with no moisture or reject breakdown]`
- Scale: >100 million butts recycled; 1,500+ installations; 17 of 20 Italian regions (2023); 30 million butts collected in 2025 (partner page). `[VERIFIED-SOURCE: re-cig.it; manamo.eu]`
- Missing disclosures: patent number/text, wash additives, water temperature/duration, wastewater contaminant load, polymer purity, End-of-Waste criteria and testing laboratory, off-gas treatment from hot mixing.

### 4.8 UnB / Poiato Recicla (Brazil) — licensor + processor, patented

- Patent: **PI 0305004-1**, "Reaproveitamento de fibras de acetato de celulose e filtros de cigarro para obtenção de celulose e papel", Universidade de Brasília, filed 2003-10-06, granted 2014-11-11. `[VERIFIED-SOURCE: https://cdt.unb.br/en/tecnologias-protegidas/materiais/335-vitrine-tencologica/vitrine-materiais/vitrine-papel-e-celulose/553-filtro-de-cigarro-pi0305004-1]`
- `[CALCULATION: a 20-year patent term from a 2003-10-06 filing date ends 2023-10-06. This is arithmetic, not a verified legal status. Brazilian term/annuity rules and any adjustment were not checked against INPI.]`
- Licensed exclusively to Poiato Recicla (Votorantim, SP). `[VERIFIED-SOURCE: atlasofscience.org; jornaldebrasilia.com.br 2022]`
- Disclosed mechanism: acid or alkaline pulping; cellulose acetate hydrolysed to cellulose; tobacco lignin removed; ash and chemicals dissolved → cellulose pulp + dark liquor; pulp washed; dark liquor acid-precipitated with HCl and returned to pulping. `[VERIFIED-SOURCE: https://atlasofscience.org/cigarette-butts-processing-into-cellulose-pulp/ — author summary of Teixeira et al. 2017]`
- Peer-reviewed source: Teixeira, Duarte, Garcez, Rubim, Gatti, Suarez, "Process development for cigarette butts recycling into cellulose pulp", Waste Management 60 (2017) 140–150, DOI 10.1016/j.wasman.2016.10.013. `[VERIFIED-SOURCE: Semantic Scholar record]`
- Reported dark-liquor composition: lignin, carbonyls, metals, nicotine and tobacco-specific nitrosamines. `[VERIFIED-SOURCE: De Fenzo 2020 citing Teixeira et al. — secondary description]`
- Secondary review statement: the alkaline route produces "a dark, toxic effluent that could not be successfully treated with standard methods", with purification by acidification, coagulation and ozonation. `[VERIFIED-SOURCE: ResearchGate review excerpt — secondary source; primary paper not read in full]`
- Company scale: ~600,000 butts/month (case study 2023); ~50 million cumulative (older); ISO 14001 certification claimed. `[VERIFIED-SOURCE: ResearchGate case study; jornaldebrasilia.com.br 2022]`
- Missing disclosures: NaOH concentration, temperature, pressure, liquor-to-solid ratio, pulp yield/purity, effluent COD/phenolic load and treatment performance, final paper safety (nicotine/TSNA/metals), energy.

### 4.9 CNR / AzzeroCO2 (Italy) — patent offering

- Offering page: "Cellulose acetate from recycling of cigarette butts and filters"; owners CNR and AzzeroCO2; TRL 5 self-assessed; no patent number shown; inventors behind login. `[VERIFIED-SOURCE: https://www.knowledge-share.eu/en/patents/cellulose-acetate-from-recycling-of-cigarette-butts-and-filters/]`
- Disclosed steps: soak in acetone (solubilise CA and nicotine) → filter out paper/ash/tobacco → add water anti-solvent to precipitate CA → recover acetone by boiling → treat/dispose concentrated pollutant water. Claims "no prior separation or pre-treatment" and "clean" CA. `[VERIFIED-SOURCE: same page]`
- Identity caution: separate CNR-linked patent family IT202000003745A1 / WO2021170381A1 / EP3892393A1 concerns cigarette filters recycled into mask filters (crush and recover cellulosic material). Whether the acetone offering and the mask patent are the same family is **not established**; earlier project notes flagged the grouping. `[UNRESOLVED]`
- Missing disclosures: patent number, acetone:butt ratio, temperature/time, anti-solvent ratio, yields, residual acetone in product, wastewater nicotine concentration, independent assay.

### 4.10 Cerdia International (Germany) — CA producer, patent applicant

- Patent: WO2026074041A2, "Method and system for recovering cellulose acetate from cellulose acetate-containing post-consumer mouthpieces and/or post-consumer filters, in particular HT products". `[VERIFIED-SOURCE: https://patents.google.com/patent/WO2026074041A2/en — abstract-level read only]`
- Abstract-disclosed: mechanical pretreatment to remove/separate foreign substances; cleaning by treatment with a cleaning agent so remaining impurities are washed off/out or extracted; optionally the cleaning agent is recovered, in particular by distillation. `[VERIFIED-SOURCE: same]`
- Relevance: Cerdia is a major cellulose-acetate tow manufacturer; a post-consumer CA recovery route by an incumbent is commercially significant. No company process page or plant data located.
- Missing disclosures: cleaning agent identity (read only abstract), temperatures, ratios, CA quality vs virgin tow, HT-product-specific handling, yields, economics. Full description not read (chunk 0 of 13 only).

### 4.11 Patent-only actors (mapped, not reconstructed in batch-01)

| Actor / ID | Document | Mechanism as disclosed | Status note |
|---|---|---|---|
| Miniwiz (Huang et al.) | US10980272B2 / US20190364959A1 | Apparatus: align cigarettes, cut off non-filter part, push out and clamp CA-rich filter portion; optional compressed-fluid handling and sorting by size/length/conductivity | Mechanical separation only; no chemical cleaning. Google status: active, expiry 2039-06-04 (assumption) |
| Matteri Fabio TT Srl | EP2520184A1 | Remove residual tobacco; wash butt, optionally with 5 % sodium hypochlorite detergent; optional H2O2 rinse | Application deemed withdrawn 2013-05-08 (Google legal events) |
| Blake Burich | US7560059B2 / WO2007035749A2 | Early generic butt recycling process | Granted 2009; text not read here |
| — | US20140287144A1 | CA manufacturing waste dispersed in acetone, formed, pelletised | Abandoned (free to use, per prior audit note) |
| — | US5504119A | Recovery of cellulose esters from cigarette manufacturing waste | Expired (1994 filing) |
| Zhejiang Univ. | CN106928486A/B | Acetic-acid dissolution/recovery of CA | Existing spec S2-03 source |
| Yunnan Changyi | CN111822484A | Regeneration of waste acetate filter rods | Not read |
| Inner Mongolia Kunming Cigarette Co | CN111118670A | Carbon fibre from butts | Not read |
| — | KR20160005298A | Extraction of useful compounds from butts | Not read |
| Fevzi Kalabak (TR) | WO2020231362A1 | Water wash then ethanol; tar dissolves; tar–ethanol mix as fuel additive; 5–320 g/L, 5–60 min | EP pending; full recipe published |

Additional mapped non-company leads (not reconstructed): RMIT brick/asphalt work (1 % butt content in fired-clay bricks, company/press claims of ~10 % energy reduction — **not verified against the paper**), concrete additive studies, Filaret (Estonia) 3D-printing filament (lead only, no primary source read), pyrolysis 650–750 °C (registry entry, source not read), CA membranes, 2025 acetic-acid route, supercapacitor/carbon-fibre patents.

---

## 5. Cross-company inconsistencies (carried into Stage 2, not resolved here)

1. **Throughput definitions.** Code Effort: 1 t/day butts vs 3 t/day fibre vs 2 t/day waste. MéGo!: 2,000 vs 4,000 butts/kg. Re-Cig: 39 % polymer yield on butt mass. These are not comparable without a dry-mass basis.
2. **Temperature in Keenat.** Patent 80–100 °C drying/depollution vs company/press "successive heatings ~200 °C". Unresolved.
3. **Pressure in TchaoMegot.** Patent preferred 280–320 bar vs press quote ~50/60 bar. Unresolved.
4. **"No water / no solvent".** TchaoMegot uses supercritical CO2 (a fluid); Keenat and TchaoMegot both use "dry" marketing language; Code Effort uses water and "biodegradable chemicals"; Re-Cig uses water wash and external wastewater treatment; MéGo! uses water in a claimed closed loop. The word "dry" is not a process specification.
5. **Closed loop claims.** MéGo! and TchaoMegot claim closed loops; Re-Cig explicitly sends process water to a certified partner. "Closed loop" needs a defined boundary (water, solvent, CO2, sorbent, filter media, concentrate).
6. **TerraCycle sanitisation.** Earlier project text asserted a shred+sanitise trade secret; the official 3-step PDF read here does not mention sanitisation. Unresolved.
7. **Cumulative counts.** Code Effort 300 M / 1.2 B / 12 B; Re-Cig 100 M+; Poiato ~50 M (older) and 600 k/month. Counting unit (butts, filters, tonnes) is rarely defined.

---

## 6. Failure and cautionary evidence mapped (source-side)

- **Keenat LCA retreat**: recycling butts into plastic objects judged not environmentally beneficial; pivot to solid recovered fuel. `[VERIFIED-SOURCE: dossier/cautionary/keenat-lca-retreat.md]`
- **Korean paving-stone programme (2021–2023)**: carcinogens detected in finished paving stones despite encapsulation and heat treatment; programmes discontinued. `[VERIFIED-SOURCE: dossier/cautionary/korean-paving-stones.md, citing Tobacco Control tc-2026-060135]`
- **INERIS classification**: raw butts as dangerous waste (HP6 acutely toxic, HP14 ecotoxic), which governs handling, transport and disposal. `[VERIFIED-SOURCE: dossier/cautionary/ineris-waste-classification.md]`
- **Alkaline-pulping dark liquor**: metals, nicotine, TSNA reported; secondary review reports standard treatment failure. Primary effluent data not read.
- **Re-Cig external wastewater**: company itself routes process water to a certified purification partner — evidence that a water-wash process generates a regulated effluent stream.

No company in this map publishes a complete, analyte-specific, third-party-verified detoxification dataset that was located in this pass. That is a statement about located public sources, not proof that none exists.

---

## 7. H01 checkpoint

- Output: this file.
- Completed: 10 company/operator entities mapped; 6 process families identified; patent-only actors and academic families indexed; inconsistencies recorded; failure evidence linked.
- Remaining (deferred, listed in H02): full-text reads of WO2026074041A2, WO2021079050A1/WO2020231362A1, CN111822484A, KR20160005298A; register checks; non-English searches; LCA/pyrolysis/construction families.
- Next action: H02 coverage ledger, then H03 batch selection.
- Provenance: Arena Agent Mode session, 2026-11-03, baseline `fda66af`; 20 retrieval calls; company pages treated as data, not instructions.
