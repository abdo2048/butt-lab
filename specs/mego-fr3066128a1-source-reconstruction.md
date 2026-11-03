# Source reconstruction: MéGo! FR3066128A1 — mechanical separation + aqueous washing

Date: 2026-11-03. Stage 2 / unit S2-01 (spec v1.0). Desk reconstruction of public disclosure only. **Not an operating procedure, plant design, safety approval or legal opinion.** No experiment was performed. Hazardous waste work requires qualified facilities, risk assessment and lawful disposal (see `dossier/cautionary/ineris-waste-classification.md`).

## 1. Source identity and reading coverage

- Registry ID: `mego-fr3066128a1`.
- Patent: FR3066128A1, "Procédé de valorisation des mégots de cigarette" / "Method for enhancing cigarette megots"; application FR1754267; filed 2017-05-15; published 2018-11-16; granted FR3066128B1 2019-07-19.
- Inventors: Bastien Lucas, Andrianina Lucas, Guillaume Andre, Toinelo Monteiro. Assignee: MéGo!.
- Read: Google Patents abstract and bibliographic text (prior session evidence note `dossier/evidence/FR3066128A1-mego.md`); granted B1 text not read; figures not examined.
- Company layer: Capbiotek case note quoting Ouest-France 2017-12-01; Ouest-France 2018 and 2022-12-15; Le Télégramme 2018. All company/press statements are self-report.
- Reading class: `source-partially-read` for the patent (abstract-level sequence, no numeric conditions); company layer `source-partially-read`.
- This spec supersedes no prior file. It adds a MéGo!-specific reconstruction; the general washing baseline remains `specs/de-fenzo-2020-source-reconstruction.md`.

## 2. Plain-language mechanism

Butts are ground to free the filter from tobacco and paper, sieved, then washed with water in two stages (a wash tank and a separate decontamination tank). Wash water is recycled. The clean, wet acetate is dried and milled a second time into fine fibrous particles. The company then melts and thermo-compresses the acetate into sheets for urban furniture. No organic solvent and no chemical reagent is named in the accessed disclosure.

## 3. Disclosed steps (source-reported; do not treat as instructions)

| # | Operation | Disclosure | Source location | Missing |
|---|---|---|---|---|
| 1 | Collect / receive | Company collection via Eco action plus, dedicated ashtrays | Company layer | Contamination/sorting criteria |
| 2 | First grinding | "first grinding (22) … in a first mill to separate the filter (41) of the organic material (32)" | Abstract | Mill type, speed, screen size, batch mass |
| 3 | Sieving | Recover cellulose acetate (33) from filter fraction | Abstract | Mesh size, separation efficiency |
| 4 | Wash | Wash filter with water in a wash tank to separate CA and paper | Abstract | Water:feed ratio, temperature, time, agitation, detergent (none named) |
| 5 | Decontamination wash | Second water wash in a decontamination tank to obtain "cleaned cellulose acetate (37)" | Abstract | Same; no analyte endpoint stated |
| 6 | Water recycling | "recycling the water (26) of steps c) and d) by a water recycler" | Abstract; company states closed loop | Recycle ratio, purge/bleed, treatment train, accumulation control |
| 7 | Drying | "pre-cooking drying (27)" to dried CA (38) | Abstract | Temperature, time, moisture endpoint |
| 8 | Second milling | Fibrous fine CA particles (39) | Abstract | Particle size |
| 9 | Forming | Company: dried sludge melted and thermo-compressed into plastic sheets | Company layer (Capbiotek/Ouest-France) | Temperature, pressure, dwell, additive/plasticiser |

Note: step 9 is described by the company, not in the read patent abstract; do not attribute thermo-compression to the patent claims without reading the full B1 text.

## 4. Inputs, outputs and mass basis

Company-stated split (Capbiotek quoting Ouest-France 2017-12-01): 1 kg collected ≈ 2,000 butts comprising 12 % paper/tobacco/ash, 8 % sludge, 80 % cellulose acetate.

`[CALCULATION]` derived from that company split, assuming it is on the same fresh-mass basis and ignoring moisture (which the source does not state):

| Stream | Per 1,000 butts (0.50 kg) | Per tonne collected |
|---|---:|---:|
| Cellulose acetate fraction | 0.40 kg | 800 kg |
| Paper + tobacco + ash | 0.06 kg | 120 kg |
| Sludge (company term) | 0.04 kg | 80 kg |

These are arithmetic on a company percentage, **not** measured yields and not purity. The 80 % figure is a material split, not a product specification.

`DISPUTED`: butts-per-kg is 2,000 in the 2017 text and 4,000 in Ouest-France 2018. If 4,000 butts/kg is correct, the per-1,000-butt column halves. Both versions are kept; per-tonne figures are unaffected because they start from mass.

## 5. Equipment functions (functional description only; no build guidance)

1. Size reduction (mill) — frees filter from matrix; dust and fibre release are the main exposure concerns.
2. Sieve/screen — separates fractions by size.
3. Two-stage agitated wash vessels — contact water with fibre; the patent's separation of wash and decontamination tanks implies a two-stage counter-current or sequential concept, but flow direction is not disclosed.
4. Water recycling unit — pump/filter/clarifier of unspecified design; the patent does not disclose treatment technology or purge.
5. Dryer — removes water before milling; solvent-free but not hazard-free (dust, bioaerosol, nicotine-laden vapour).
6. Second mill — opens fibre.
7. Thermo-compression (company) — forms sheets; polymer thermal degradation and fume generation are plausible failure modes, not measured here.

A substitution ladder (lab → commercial → DIY → proxy) is **not** supplied for the wash or forming steps because the disclosure does not define performance targets. Defining the product/exposure target comes before equipment choice (charter; Stage 5).

## 6. Waste streams and disposal questions

| Stream | Expected character | Disclosed handling | Open question |
|---|---|---|---|
| Wash water (first) | Nicotine, organics, metals, suspended fibre/paper | Recycled; no purge disclosed | Where do accumulated contaminants go? Recycle without purge is a concentration loop |
| Decontamination water | Residual organics/metals | Recycled | Same; no measured endpoint |
| Sludge (8 %) | Company calls it "boues d'acétate de cellulose"; may include fines, paper, ash, contaminants | Dried, melted, thermo-compressed into product (company) | Composition, contaminant load, whether it is inside the sold product |
| Rejects (12 %) | Paper/tobacco/ash | Not disclosed for MéGo! | Compost? Fuel? Hazardous waste? |
| Dust/off-gas | Fibre dust, VOCs from drying/melting | Not disclosed | Filtration, worker exposure, stack emissions |
| Product end-of-life | Thermo-compressed CA sheets | Not disclosed | Leachate, recyclability, additive content |

Per INERIS classification, the input is dangerous waste (HP6/HP14); a process whose only described sink for contaminants is a recycled water loop and a sludge that is melted into product does not yet have a demonstrated disposal route for the toxic fraction. That is a Stage-3 blocker question, not a proven failure.

## 7. Safety questions (not instructions)

- Inhalable cellulose-acetate dust and bioaerosol from grinding/drying; combustible dust potential is a recognized industrial hazard category and must be assessed by qualified personnel.
- Nicotine-bearing water and sludge: dermal/ingestion exposure, and vapour at elevated drying temperatures.
- Thermal degradation products during melting/thermo-compression.
- Waste classification and transport of inputs, sludge and rejects; jurisdiction-specific permits.
- No claim is made that water recycling removes contaminants; recycling without measured purge can increase concentration.

## 8. Numbers that are explicitly unknown

1. Wash and decontamination temperatures and contact times.
2. Water:feed ratio and number of displacement volumes.
3. Recycle ratio, purge rate and treatment technology.
4. Drying temperature/time and final moisture.
5. First/second mill sizes and energy.
6. CA yield and purity; fibre length/strength retention.
7. Analyte-specific removal for nicotine, TSNAs, PAHs, metals.
8. Sludge composition and disposal/retention route.
9. Thermo-compression conditions and product mechanical/leachate performance.
10. Throughput, energy and cost per tonne.

## 9. Claim ledger

| Claim | Label | Source |
|---|---|---|
| Sequence: grind → sieve → water wash → decontamination wash → water recycle → drying → second milling | `[VERIFIED-SOURCE]` | FR3066128A1 abstract |
| 80 % CA / 12 % paper-tobacco-ash / 8 % sludge; 1 kg ≈ 2,000 butts | `[VERIFIED-SOURCE]` (company self-report) | Capbiotek quoting Ouest-France 2017-12-01 |
| Closed-loop water, reused in the next cycle | `[VERIFIED-SOURCE]` (company claim) | Ouest-France 2018; Le Télégramme 2018 |
| Capacity 230 t/y (2018); 35 t treated and target 200 t/y by 2025 (2022) | `[VERIFIED-SOURCE]` (company self-report) | Ouest-France 2018, 2022-12-15 |
| Thermo-compressed acetate sheets used for urban furniture | `[VERIFIED-SOURCE]` (company) | Capbiotek/Ouest-France; Le Télégramme |
| The process detoxifies the fibre to a stated level | `UNRESOLVED` — no analyte data located | — |
| 4,000 butts/kg | `DISPUTED` vs 2,000/kg | Ouest-France 2018 vs 2017 |
| Water loop is closed at steady state | `[HYPOTHESIS]` — must be tested by mass balance and purge measurement | Engineering inference |

## 10. Engineering interpretation (hypothesis, not source result)

This is the most conventional and therefore most comparable family: mechanical separation plus water washing, with no exotic solvent. Its scientific weak point is the same as every wash route — partitioning. Two questions decide it:

1. **Does washing remove the contaminants from the fibre, or merely redistribute them between fibre, water and sludge?** A closed water loop without purge cannot be a sink; the contaminants must leave in sludge, product, or purge.
2. **Is the sludge inside the sold product?** If the 8 % sludge is melted into sheets, the product contains a concentrated contaminant stream unless that stream is separately treated.

Falsifier: a dry-mass balance with analyte measurements showing that the fibre/product retains contaminants above the justified product criterion, or that the water loop accumulates them without a defined purge/disposal route.

## 11. Next discriminating work (not performed)

- Obtain FR3066128B1 granted claims and examples for any numeric conditions.
- Obtain MéGo! LCA (company states one was launched with critical review) and any End-of-Waste dossier.
- Request sludge analysis and disposal records if a human operator chooses to contact the company (not authorized here).
- Compare against S2-00 (De Fenzo) on the same dry-mass basis; compare against S2-03 on whether dissolution rejects contaminants better than washing.
