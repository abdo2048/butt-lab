# M-05 — TchaoMegot supercritical CO2 fiber cleaning (FR3102180A1 family) — Action plan

```
id: M-05
name: "TchaoMegot supercritical CO2 fiber cleaning (FR3102180A1 family)"
family: supercritical-fluid
priority: true
status: draft
version: v0.1
sources: [fr3102180a1, tchaomegot-fr3102075b1, tchaomegot-fr3102076b3, tchaomegot-fr3125946b1]
```
(Keep the block above as the file's metadata; the site builder reads it.)

## 0. Summary card
TchaoMegot (Julien Paque, France) cleans cellulose acetate fibers recovered from butts with supercritical CO2 in a closed loop: CO2 is pressurized and heated past its critical point (>=73.85 bar, >=31 degC), contacted with the fibers for 1 min-8 h (jets, soaking, drums, optional ultrasound), then depressurized — the CO2 re-liquefies and recirculates while extracted contaminants collect as a small concentrate. Optional water/alcohol co-solvents widen polarity coverage; optional calixarene extractants target inorganic species. Outputs are clean fibers for thermal/acoustic insulation boards (with ~15% Trevira bicomponent binder) and filter/plastic applications. Priority because it is the only contaminant-removal route in the registry that leaves the polymer intact and uses no liquid waste stream, and the family is GRANTED in part (FR3102075B1 use patent granted 14.11.2025; FR3102076B3 utility certificate granted 22.10.2021). It is also the only route where the primary documents contain ZERO quantitative performance data — every removal number is a gap. The "99.7%/0.3%" split and "50/60 bar" press quotes in circulation are NOT in the patents. [S1][S2][S3]

## 1. What the sources disclose — step by step
[S1] = FR3102180A1 (filed 28.01.2020, priority 22.10.2019 FR1911822; applicant/inventor PAQUE Julien; A1 published 23.04.2021; search report X-cites EP0595184A1 against claims 1,2,4-7,23). [S2] = FR3102075B1, granted divisional (14.11.2025), holder TCHAOMEGOT COLLECTE SAS — USE claims (insulation/filters/biodegradable plastics). [S3] = FR3102076B3, the priority filing granted as Certificat d'Utilite (22.10.2021) — widest windows + only in-family residue estimate. [S4] = FR3125946B1 (2026) — connected urban ashtray: supply-chain logistics, no process numbers.

1. **Pre-processing** — triage, grinding, sieving (repeatable), optional friction/sieving/cycloning; only acetate fiber proceeds; other waste (leaves, tobacco, ashes) "recycled as compost". `parameter_not_located: mesh sizes, grinding parameters` [S1 [0072], [0146]-[0147]]
2. **Loading** — fibers into a closed chamber/autoclave; capacity **0.2 L to 1500 L** ("not limited"). [S1 [0079]; note: the circulating "5L->500L" figure is NOT in the patents]
3. **Pressurization** — **0-2000 bar, preferred 50-350 bar, most preferred 280-320 bar** (claim 5); for CO2 specifically **>=73.85 bar** (critical pressure; [0040]). [S1]
4. **Heating** — **0-400 degC, preferred 15-80 degC** (claim 5); for CO2 **>=31 degC** (critical temperature). [S1; S3 widens ceiling to 500 degC and rounds critical point to 74 bar]
5. **Optional humidification** — water as co-solvent "solubilizes nicotine more easily"; no moisture % given. [S1 [0173]]
6. **Contact (S2_4)** — high-pressure spray, soaking, jet nozzles; jet speed **1-500 m/s**, flow **1-4000 L/h**; duration **1 min - 8 h**; optional agitation aids (rotary drum, vibration/ultrasound, compression, mixer, centrifuge) — no frequencies/powers/durations given. [S1 [0176]-[0181], [0158]; claims 13-16]
7. **Optional co-solvent (S2_5)** — menu: water, ethanol, methanol, butanol, terpenes, benzene, cyclohexanes, ketones, hydrofluoroethers; added between pressurization and heating; "increases polarity and selectivity ... sugars, ions"; no doses. High-pressure development ">350 bars" (S3: ">400 bars") allows extraction of more polar molecules WITHOUT co-solvents. [S1 [0048], [0187]-[0189]]
8. **Optional extractant (S2_6)** — "calixarenes" or complexing/chelating agents for inorganic species; no identity detail, no doses. [S1 [0190]-[0193]; claim 11]
9. **Depressurization and recovery** — pressure let-down -> separator releases gaseous CO2 -> condenser re-liquefies -> reservoir; continuous loop; optional activated-carbon filter for odors/VOCs; extracted contaminants valorized elsewhere. [S1 [0194]-[0205]]
10. **Outputs** — cleaned fiber; insulation boards via bicomponent binder "Trevira 255 2.2 dtex/6 mm (PES co-polyethylene)", **15% binder / 85% acetate fiber**; plastics processing "80-300 degC"; no drying step (fiber exits dry). [S1 [0216]-[0222]; S2 claims 3-5]
11. **S3-only numbers** — board curing **170 degC / 15 min** (binder shell melts at 127 degC); toxic-substance concentrate "estimated at **a few grams per 10 kg treated**" (approx. 0.03-0.1 wt% — the nearest in-family basis for the circulated "0.3%"); one coat's insulation ~4,000 recycled butts; biodegradability criterion: 90% dry mass in <6 months. [S3 [0068], [0108], [0111], [0113]]
12. **Contaminant target list** — nicotine, heavy metals, organic acids, nitrosamines, fungicides (flumetraline, pendimethalin, trifluraline), phenols, PAHs, formaldehyde/acetaldehyde, dioxins/furans, anions; waste class HP14 ecotoxic + HP6 acute toxicity. **No quantitative removal data in ANY of the four documents** — all performance statements are qualitative ("a very large majority, even the totality"). [S1 [0118]-[0119], [0020]]

## 2. Equipment
- SC-CO2 extraction plant: pressurizable chamber 0.2-1500 L, CO2 pump, heater, jet/spray manifold, optional drum/ultrasound agitation, let-down valve, separator, condenser, CO2 reservoir, activated-carbon guard filter [S1]
- Pre-processing: grinder, sieve, cyclone [S1]
- Board line: fiber blending with Trevira 255 bicomponent fiber, oven cure 170 degC / 15 min [S1; S3]
- Scale note: even a 5-20 L lab SC-CO2 extractor is specialized equipment with certified pressure vessels — student-lab access is unlikely; partner-facility work is the realistic path. The charter's no-DIY-pressure-vessel rule binds absolutely here.

## 3. Gap-fill table — labeled expert estimates

| # | Gap | Estimate (labeled) | Reasoning | Falsifier — how the team tests it |
| --- | --- | --- | --- | --- |
| 1 | Operating point inside 280-320 bar / 15-80 degC | `ai_proposal`: **300 bar / 45 degC**, 30-60 min contact, 2-3 cycles per batch | Mid-range of the preferred window maximizes margin on both axes; CO2 density ~0.8-0.9 g/cm3 there — good solvation; nicotine is moderately polar, needs the high-pressure band or cosolvent. | Partner-facility run: residual nicotine (HPLC) in fiber vs time/cycles; plateau = sufficient. |
| 2 | Co-solvent choice and dose | `ai_proposal`: ethanol **5 vol%** of CO2 | Patent lists ethanol without dose; 1-10 vol% is the conventional SC-CO2 modifier band; ethanol is the least hazardous menu item that raises polarity for nicotine/phenols. | Compare plain CO2 vs +5% ethanol on nicotine + phenol removal; if no gain at 5%, test 10% or drop cosolvent. |
| 3 | Chelating extractant (calixarenes) | `ai_proposal`: **skip in first trials** — run plain CO2 and measure metals first | Calixarenes are expensive specialty molecules; SC-CO2 alone does not remove ionic/metals species without modifiers — the patent itself admits inorganic extraction needs extractants. | ICP-MS of fiber before/after plain-CO2 run. Expect little change -> metals handled by the feedstock-cleaning upstream step, not SCCO2. |
| 4 | Humidification level | `ai_proposal`: pre-condition fibers to **10-15% moisture** | Water is named as nicotine co-solvent without a dose; 10-15% is a typical fiber conditioning level that aids polar extraction without free water pooling. | Pair runs dry vs conditioned; nicotine removal delta. |
| 5 | Residue concentrate quantity | Conflict kept: S3 "a few grams per 10 kg" (**~0.03-0.1 wt%**) vs circulated press figure **0.3%** — neither is a measurement; `parameter_not_located` pending team-scale weigh | The B3 figure is an in-document estimate; the press figure is not in any patent. | Weigh separator residue per batch at partner facility; assay it (nicotine, PAHs, metals) — this defines the hazardous-waste stream. |
| 6 | Metals in cleaned fiber | `parameter_not_located`; **stop-condition binds** — Cd/Pb/As/Hg uncharacterised in product | Nothing in the family measures metals; row-3 reasoning says plain SCCO2 will not touch ionic metals. | ICP-MS on cleaned fiber (gate for insulation boards — building products are contact products). |
| 7 | 50/60 bar press quotes vs patent 280-320 bar | `ai_inference`: the press figure likely describes a pilot running in the dense-liquid/near-critical region (<73.85 bar), which claim 1's "dense fluid" language tolerates but the "supercritical" framing contradicts; keep both | The 50/60 bar number appears in NO patent document; the nested preference chain ends at 280-320 bar. | Ask the company (or run) both points; nicotine removal at 60 bar vs 300 bar decides whether the press point is a real process variant or a simplification. |
| 8 | Contact time within 1 min-8 h | `ai_proposal`: 30-60 min (see row 1); ultrasound assist **33 kHz, 5-10 min** if available | The range spans 3 orders of magnitude; lab SC-CO2 extraction of plant alkaloids typically runs 30-120 min; ultrasound parameters are entirely unspecified in the patent. | Time-series residual nicotine; ultrasound on/off comparison. |
| 9 | Board performance | `parameter_not_located`: no thermal conductivity or fire class data in the family; S3 gives cure (170 degC/15 min) and binder ratio (15/85) only | The end-use claims are the family's granted core (S2) — but no performance numbers back them. | Partner-facility board trial: lambda measurement + reaction-to-fire screening (E-class expectation for untested organic boards). |
| 10 | Economics / cycle time | `parameter_not_located` in family; company communicates via press (self-report) | No throughput, energy, or cost data in any of the four documents. | Only partner-facility trial data can fill this; treat as unknown, not zero. |

## 4. Safety notes
- **High-pressure equipment only**: certified autoclave, pressure relief devices, trained operators, never improvised — the charter's no-DIY-pressure-vessel rule is absolute for this route. 300 bar stored energy is lethal-class hazard. [S1]
- **CO2 asphyxiation**: let-down and venting in ventilated area; O2 monitors for enclosed spaces.
- **Ethanol co-solvent under pressure**: flammable; grounded equipment, explosion-rated electricals where required.
- **Concentrate handling**: the extracted paste concentrates nicotine, PAHs, pesticides (HP6/HP14 per [S1 [0119]]) — small mass, high hazard; sealed containers, licensed disposal.
- **Feedstock upstream**: fiber cleaning assumes prior removal of tobacco/ash — that stream is itself HP-classified and needs lawful handling. [S1 [0072]]
- **Stop-condition**: metals uncharacterised in cleaned fiber (row 6).
- Desk research authorizes no physical trial; qualified facility, risk assessment, lawful waste handling, named human actor.

## 5. What the team must verify in lab
Realistically via a partner facility with a certified SC-CO2 extractor (5-20 L):
1. **Decontamination truth test** (rows 1, 2, 4, 8): 3-point matrix — plain CO2 300 bar/45 degC/30 min vs +5% ethanol vs humidified; residual nicotine + phenols + PAHs in fiber; weigh + assay the separator concentrate (row 5). THE experiment: fills the family's total quantitative void.
2. **Metals gate** (rows 3, 6): ICP-MS on cleaned fiber; decides whether chelation is ever needed.
3. **Board trial** (row 9): 15% Trevira blend, 170 degC/15 min cure; thermal conductivity + fire screening.
4. Desktop: register status of FR3102180A1 (pending->grant?) and US12065781B2 annuities (row in registry); press-quote reconciliation (row 7).

## 6. Sources
- [S1] FR3102180A1 — "Nettoyage des fibres issues des megots de cigarette par mise en contact avec un fluide supercritique et recyclage des fibres depolluees", PAQUE Julien, filed 28.01.2020, priority 22.10.2019 FR1911822, published 23.04.2021 (Bulletin 21/16). Shelf: `sources/fr3102180a1/`. Family: WO2021079050A1, US12065781B2 (registry), EP counterpart not on shelf.
- [S2] FR3102075B1 — granted divisional (14.11.2025, Bulletin 25/46), TCHAOMEGOT COLLECTE SAS; use claims for insulation/filters/biodegradable plastics. Shelf: `sources/tchaomegot-fr3102075b1/`.
- [S3] FR3102076B3 — priority filing granted as Certificat d'Utilite 22.10.2021; widest parameter windows; the only in-family residue estimate (few g / 10 kg). Shelf: `sources/tchaomegot-fr3102076b3/`.
- [S4] FR3125946B1 (2026) — connected urban ashtray; collection logistics; confirms family link to WO2021/079050A1. Shelf: `sources/tchaomegot-fr3125946b1/`.
- Registry: entry `tchaomegot-sc-co2` — this plan corrects: vessel range 0.2-1500 L (not 5-500 L), residue basis ~0.03-0.1% (B3 estimate, not 0.3% measurement), zero quantitative performance data in family.
