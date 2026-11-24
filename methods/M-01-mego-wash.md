# M-01 — Mego! water-wash cellulose acetate recovery (FR3066128B1) — Action plan

```
id: M-01
name: "Mego! water-wash cellulose acetate recovery (FR3066128B1)"
family: wet-chemical
priority: true
status: draft
version: v0.1
sources: [fr3066128a1-granted]
```
(Keep the block above as the file's metadata; the site builder reads it.)

## 0. Summary card
Mego! (FR company) converts collected cigarette butts into clean fibrous cellulose acetate (CA) fine particles, and optionally thermo-compresses them into CA plates for handling pallets and urban furniture. Mechanism: continuous grinding and multi-level sieving separate the filter from organic material; density separation in a water wash tank floats CA off from paper; three decontamination tanks in series wash out water-soluble toxins; a clarifloculation recycler treats up to 1000 L of wash water per 2-hour cycle; drying at 100-120 degC; second milling to <1500 um particles. Priority because it is the only butt-recycling patent on our registry whose granted specification discloses a near-complete numeric protocol, because it uses water (cheap, low-hazard) rather than solvents, and because its plate-making variant gives a product the team could plausibly form at pilot scale. Legal: granted FR patent, active, expires 2037-05-15 — commercial operation in France is blocked until expiry; lab verification and non-commercial research are outside the patent's prohibition scope only to the extent French law allows; verify before any use. [S1]

## 1. What the sources disclose — step by step
All page references are to the granted B1 specification text on the shelf (sources/fr3066128a1-granted/text.md). Steps 20 and 21 appear in the figure-2 embodiment.

1. **Collection & storage (20)** — butts are collected selectively, in containers that receive only butts, then shipped to the valorisation site for storage. [S1 p.9]
2. **Manual triage (21)** — manual removal of foreign objects: chewing gum, matches, aluminium foil from packets, anything that is not a butt. [S1 p.9]
3. **First grinding (22)** — butts pass in continuous flow through a first mill that dices them at **1 kg of butts per minute**; the filter is separated from the organic material (ash, paper leaves, tobacco). [S1 p.6]
4. **Sieving (23)** — the ground stream goes to a vibrating sieve (motor-driven), separating material over a **three-level gradient**, at **1 kg/min**; the filter fraction is recovered; the organic material is stored and later partially depolluted in a water bath (not further specified). [S1 p.6] `parameter_not_located: sieve mesh sizes / aperture of the three levels`
5. **Filter wash (24)** — wash tank with **water** as solvent (acetone named as an alternative in one embodiment); separation is by **density**: paper (higher density) sinks to the tank floor, CA floats at the surface; duration **at least 20 minutes, preferably 30 minutes**; sunken paper is removed and sent to paper recycling. [S1 p.6-7] Note an erratum in the spec: one sentence labels paper as (41), the filter's numeral — the intended numeral is (34). [S1 p.7] `parameter_not_located: water volume per batch, water temperature, agitation`
6. **Decontamination wash (25)** — decontamination tank with **water**; closed-flow technique; nicotine is stated to dissolve in water; CA stays **at least 20 minutes, preferably 30 minutes**. The operation is **repeated three times**, in **three decontamination tanks in series** with pump transfer between tanks (fig. 3 embodiment). The spec explicitly admits some residues **such as tar need another type of solvent** that water does not provide. [S1 p.7-8, p.10] `parameter_not_located: water volume per tank, temperature, replacement rate of water`
7. **Water recycling (26)** — a recycler applies clarifloculation: coagulation (destabilisation of colloids) then flocculation (micro-floc growth to settleable flocs) then settling; treats **up to 1000 litres per cycle**, each cycle **about 2 hours**, energy **1 kW** so about **2 kWh per cycle**; recycled water is stored in tank (36) and returned to the wash and decontamination tanks. [S1 p.7]
8. **Drying by pre-cooking (27)** — pre-cooking oven, **at least 100 degC, preferably 120 degC**; the step ends when no more water vapour appears at the air exhaust. [S1 p.7-8] `parameter_not_located: residual moisture target, batch depth/tray loading`
9. **Second milling (28)** — dried CA milled to fibrous fine particles of **diameter below 1500 um, preferably close to 1000 um**; step ends when the CA is shredded to fine particles. [S1 p.8] `parameter_not_located: particle size distribution width, fines fraction`
10. **Thermo-compression (29, optional step h)** — the particles are melted in a hydraulic thermo-compression press into CA plates of chosen thickness: **314 tonnes press force, 80 x 60 cm working surface, heating at 350 degC**; combined heating and cooling stations; automatic programmable cycle; mechanical stops on the two rams give precise thickness. Plates enable pallets, urban furniture, under-glass, flooring, advertising supports, outdoor ashtrays, flower pots. [S1 p.8-9] `parameter_not_located: dwell time, cooling time, pressure per unit area`

No yield, purity percentage, or contaminant-removal efficiency is disclosed anywhere in the specification — only qualitative statements ("quantities of harmful polluting substances decrease drastically"). [S1 p.3, p.7]

## 2. Equipment
- First mill, continuous feed, ~1 kg/min throughput at pilot scale [S1 p.6]
- Vibrating sieve with motor, three-level gradient [S1 p.6]
- Wash tank (water), with paper-removal means at the bottom [S1 p.6]
- Three decontamination tanks in series + transfer pump [S1 p.10]
- Clarifloculation water recycler, <=1000 L/cycle, ~2 h/cycle, ~1 kW; recycled-water storage tank [S1 p.7]
- Pre-cooking oven >=100-120 degC with air exhaust [S1 p.7-8]
- Second mill to <1500 um [S1 p.8]
- Optional: hydraulic thermo-compression press, 314 t, 80 x 60 cm platens, 350 degC heating station + cooling station [S1 p.8-9]

Scale note: the spec describes an industrial pilot line (kg/min). A student-lab replication needs miniaturised equivalents (bench grinder or knife mill, laboratory sieve shaker, 20-50 L tanks, small clarifloculation unit or batch water replacement, forced-air oven, bench mill). The 314 t press is not a student-lab item; a 10-30 t lab press at 350 degC is the closest faithful analogue.

## 3. Gap-fill table — labeled expert estimates

| # | Gap | Estimate (labeled) | Reasoning | Falsifier — how the team tests it |
| --- | --- | --- | --- | --- |
| 1 | Wash / decontamination water temperature | `ai_proposal`: wash tank 40-50 degC; decontamination tanks ambient 20-25 degC | Wash temperature is nowhere disclosed. De Fenzo's experimentally supported hot-water stage is 50 degC for 60 min [S3], so 40-50 degC is a validated leaching temperature for water-soluble toxins; ambient decontamination tanks save energy and the 3x repetition compensates. | Run 1 kg test batches: 20 min ambient vs 40 degC vs 50 degC wash; measure nicotine in spent wash water (HPLC). If ambient removes as much as 50 degC, drop the heating cost. |
| 2 | Water volume per kg of butts | `ai_inference`: ~8.3 L per kg of butts processed (computed) | Computed from disclosed numbers: recycler treats 1000 L per ~2 h cycle [S1 p.7]; line feeds 1 kg/min [S1 p.6] = 60 kg/h, so 120 kg per cycle; 1000/120 = 8.33 L/kg. A 10 kg lab batch needs ~83 L total wash water. | Mass-flow the pilot: log make-up water per kg processed. If the recycler cannot keep up at 1 kg/min, the patent's own throughput is inconsistent — kill this estimate and downrate the patent's feasibility. |
| 3 | Paper-to-CA separation efficiency (single 30-min wash) | `ai_proposal`: >=90% of paper mass sinks and is removed in one pass; >=98% after a second pass | Physics: water-soaked paper (bulk density ~1.2 g/cm3 wet) sinks; CA tow traps air and floats. No efficiency is disclosed [S1]. | Weigh the sunken paper fraction vs residual paper visible in the floated CA (30x magnification image analysis) on a 1 kg batch; acceptance: <10% residual paper mass fraction in floated CA after pass 1. |
| 4 | CA yield (dried fine particles per kg of butts) | `ai_inference`: 45-60% of input butt mass ends as dried CA particles | Reasoning chain: the product is the filter's CA only [S1 p.2-3]; organic material is removed upstream (step 3-4); paper is removed by sinking (step 5); filter tow dominates butt mass and CA dominates the tow. Cross-check: De Fenzo's recovered CA shows ~10% residue at TGA end [S3], consistent with mostly-polymer product. | Weigh dried product from a 1 kg pilot run. Acceptance band 40-70%; outside the band, re-derive from the measured filter/organic split at step 4 instead of this estimate. |
| 5 | Nicotine removal across 3 tanks | `parameter_not_located` in [S1] (only "decrease drastically"); working estimate `ai_proposal`: 3 tanks x 30 min remove >=90% of extractable nicotine | Nicotine is highly water-soluble; successive tanks keep a concentration gradient if tank water is partially refreshed. | Nicotine assay (GC-FID or HPLC) of spent liquor from tank 1, 2, 3 and of a methanol extract of the final CA. Decision rule: <90% removal -> add a 4th tank or a fresh-water final rinse. |
| 6 | Tar / PAH removal | [S1] admits water does not remove tar ("another type of solvent" needed) [S1 p.8]; `ai_proposal`: insert a final ethanol 99% w/w stage, 30 min, ambient, after tank 3 | Transplanted from [S3], where ethanol stages are part of an experimentally validated wash sequence on the same feedstock. | PAH screen (16 US-EPA PAHs) on product before and after the ethanol stage. Acceptance: >=50% reduction; else the ethanol stage is not earning its solvent cost. |
| 7 | Recycled-water quality drift | `ai_proposal`: cap nicotine in the recycled-water tank at 50 mg/L; above it, bleed 20% to waste and add fresh make-up | Closed loop [S1 p.7] concentrates dissolved toxins over cycles, which weakens the leaching gradient the process relies on. The patent does not discuss this. | Measure COD + nicotine in tank (36) every cycle for 5 cycles. Acceptance: values plateau; monotonic rise past the cap proves the closed loop degrades wash performance. |
| 8 | Drying endpoint (residual moisture) | `ai_proposal`: <=5% w/w residual moisture | Disclosed endpoint is qualitative (no more steam at exhaust) [S1 p.8]; 5% is a conventional storage-safe moisture for polymer fluff. | Gravimetric moisture test (105 degC to constant mass) per batch; acceptance <=5%, else extend drying. |
| 9 | Particle size distribution after second milling | `ai_proposal`: D90 <=1000 um with <10% mass below 100 um (fines) | Spec targets <1500 um, pref. ~1000 um [S1 p.8]; the fines bound is added for dust-explosion and handling safety, not from the source. | Sieve analysis (or laser diffraction) per batch; acceptance as stated; excess fines -> adjust mill screen. |
| 10 | Thermo-compression dwell | `ai_proposal`: 5-10 min at 350 degC for 3-5 mm plates | Press force, platen size and heating temperature are disclosed [S1 p.9]; dwell is not. Range from ordinary hydraulic hot-pressing practice for acetate/polymer fluff. | Press plates at 3, 7, 10 min; inspect cross-sections for voids/ unmelted particles; acceptance: void-free at the shortest dwell. |
| 11 | Metals in product (Cd, Pb, As, Hg) | `parameter_not_located` — the patent never measures metals; **stop-condition: route on hold for product-facing work until the team characterises feedstock metals** | Metals class is documented in butts [S2]; a water wash does not remove bound metals. | ICP-MS on dried product + spent washes + recycler sludge. Until passed, no food-contact, no construction-material claims, no product distribution. |

## 4. Safety notes
- **Grinding / sieving (steps 3-4):** dust carries nicotine and combustion residues; enclose the mill, local exhaust, nitrile gloves + FFP3 mask. [S1 steps; toxin classes S2]
- **Wash and decontamination tanks (steps 5-6):** spent water is hazardous wastewater (nicotine, phenols, PAHs, carbonyls per [S3]; metals class per [S2]). Never to drain; licensed disposal or the clarifloculation step; sludge from the recycler concentrates the toxins — hazardous waste stream of its own.
- **Ethanol / acetone variants (gap rows 6, and [S1] acetone embodiments):** both solvents are highly flammable; fume hood, no ignition sources, grounded equipment.
- **Drying oven (step 8):** 120 degC with residual organics; ventilated oven, do not exceed the disclosed range without a fire assessment.
- **Second milling (step 9):** dry organic dust <1500 um is an explosible dust class; grounded mill, no ignition sources, avoid fines accumulation (row 9 bound exists for this reason).
- **Thermo-compression (step 10):** 350 degC platens and a 314 t press are industrial hazards; qualified operators only, guarding, two-person rule. Not a student-lab step without a lab-grade press and risk assessment.
- **Material stop-condition:** Cd/Pb/As/Hg uncharacterised in the feedstock means the route is on hold (row 11) — binds all downstream product work.
- Desk research authorises no physical trial: every step above needs a qualified facility, a risk assessment, lawful waste handling, and a named human actor before it runs.

## 5. What the team must verify in lab
Ordered by information value:
1. **1 kg mass-balance pilot** (steps 3-9 miniaturised): throughput per step, dried-product mass. Acceptance: yield lands in the 40-70% band. Confirms/kills row 4; feeds row 2 with real water use.
2. **Nicotine removal assay** across the three tanks (spent liquors + final CA extract). Acceptance: >=90% removal. Confirms/kills row 5; if it fails, the patent's core decontamination claim is materially weaker than stated.
3. **Water-recycle drift test** (5 recycler cycles, COD + nicotine in tank 36). Acceptance: plateau below the 50 mg/L cap. Confirms/kills row 7 — and with it the patent's closed-loop economy.
4. **Paper-separation efficiency** (1 kg batch, weigh sunken fraction, image-analysis of floated CA). Acceptance: <10% residual paper after one pass. Confirms/kills row 3.
5. **PAH screen** before/after the proposed ethanol stage. Acceptance: >=50% reduction. Confirms/kills row 6.
6. **Product QC:** moisture (row 8) + particle size distribution (row 9) + ICP-MS metals (row 11, gate).
7. Only after 1-6: **lab-press plates** at 350 degC, 3/7/10 min dwell (row 10).

## 6. Sources
- [S1] FR3066128B1 — "Procede de valorisation des megots de cigarette", Mego! SARL; inventors Lucas B., Lucas A., Andre G., Monteiro T.; filed 2017-05-15 (FR1754267), granted 2019-07-19, Bulletin 19/29. Full French spec on shelf: `sources/fr3066128a1-granted/` (text.md + document.pdf); also https://patents.google.com/patent/FR3066128B1/en and https://patents.google.com/patent/FR3066128A1/en. Page refs above follow the B1 text.md pagination. Legal status: active per Google Patents legal events (annuities paid through 2026-04-16), expected expiry 2037-05-15 — verify on INPI before commercial decisions. Prior art cited in the search report: US5504119A, EP2520184A1.
- [S2] Moroz et al., toxicity review of cigarette-butt contaminants (metals and organic classes) — shelf: `sources/moroz-toxicity-review/`. Used only for contaminant classes, not for numbers.
- [S3] De Fenzo, Giordano, Sansone (2020), Materials 13(21):4710, doi 10.3390/ma13214710, PMC7659942 — used for the 50 degC hot-water wash and ethanol stages (row 1, row 6 reasoning) and the CA-residue TGA figure (row 4). Full plan: methods/M-02-defenzo-solvent.md.
