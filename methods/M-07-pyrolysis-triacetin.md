# M-07 — Pyrolysis of cigarette butts: triacetin recovery + Ca-rich char (Yousef 2023, JAAP) — Action plan

```
id: M-07
name: "Pyrolysis energy/product recovery from cigarette butts (Yousef 2023 JAAP + carbon-material literature)"
family: thermal
priority: true
status: draft
version: v0.1
sources: [yousef-2023-jaap-abstract, torkashvand-2019-review, shah-2023-review, registry/pyrolysis-energy-recovery]
```
(Keep the block above as the file's metadata; the site builder reads it.)

## 0. Summary card
Slow pyrolysis of whole cigarette butts in a 200 g reactor at 650/700/750 degC splits the butt into three products: pyrolysis oil (38-39.5 wt%) carrying the plasticizer triacetin (max 43% of oil at 750 degC — usable as an oxygenated biodiesel additive), a calcium-rich porous char (25.7-27.7 wt%, up to 32 wt% Ca, pores < 1 um), and gas (33-36.4 wt%, mainly CO2 11.6%, CO 8%, H2 4.6%, CH4 2%). Priority because it is the only route that needs NO decontamination chemistry — everything is converted; the toxic load is destroyed or concentrated into the char/oil streams, which are themselves the products or process fuel. Update from this session: the registry's "650-750 degC" claim is now abstract-verified from ScienceDirect (was flagged abstract-only/unverified) — yields, gas composition and char composition are in the abstract itself; the FULL paper remains closed-access, so kinetics, heating rate, purge gas and economics are still `parameter_not_located`. A companion line of literature carbonizes butts into porous carbons (230-900 degC variants; KOH-activated carbon reaching 2726 m2/g surface area). [S1][S2]

## 1. What the sources disclose — step by step
[S1] = Yousef, Eimontas, Zakarauskas, Striugas, "Pyrolysis of cigarette butts as a sustainable strategy to recover triacetin for low-cost and efficient biodiesel production", J. Anal. Appl. Pyrolysis 175 (2023) 106167, DOI 10.1016/j.jaap.2023.106167 — ABSTRACT ONLY (full text closed access; Crossref carries no abstract; highlights+abstract read from ScienceDirect 2026-11-25). [S2] = shelf reviews: `torkashvand-2019-review` and `shah-2023-review` (carbon-material lines). [S3] = registry entry `pyrolysis-energy-recovery`.

1. **Feedstock** — whole cigarette butts, no decontamination preprocessing disclosed in the abstract; 200 g batch reactor. [S1 abstract]
2. **Temperature set** — 650, 700, 750 degC tested. `parameter_not_located`: heating rate, purge gas, residence time, reactor type details. [S1 highlights]
3. **Product yields** — temperature had "no significant impact" on yields: oil 38-39.5 wt%, char 25.7-27.7 wt%, gas 33-36.4 wt%. Arithmetic check (python3): low-sum 38+25.7+33 = 96.7 wt%, high-sum 39.5+27.7+36.4 = 103.6 wt% — the published ranges are mutually INCOMPATIBLE as one mass balance (a balance must sum to 100 +/- measurement error); the ranges are per-temperature values whose pairing is not recoverable from the abstract. Gap row 1. [S1 abstract]
4. **Oil composition** — triacetin max 43% of pyrolysis oil at 750 degC; proposed use: oxygenated biodiesel additive. `parameter_not_located`: rest of oil composition beyond triacetin (nicotine/PAH fate in the oil is NOT stated in the abstract — critical unknown). [S1 highlights/abstract]
5. **Gas composition** — main: CO2 11.6%, CO 8%, H2 4.6%, CH4 2% (i.e., ~74% of the gas is un-named in the abstract — likely N2/steam/volatiles, unstated). [S1 abstract]
6. **Char** — porous, calcium-rich (up to 32 wt% Ca); morphology: debris at 650 degC, flakes at 750 degC; pores < 1 um. Proposed value: composite/materials applications. `parameter_not_located`: metals (Cd/Pb/As/Hg) content of the char. [S1 abstract]
7. **Carbon-material companion line** [S2]: charred carbon via 900 degC/3 h pyrolysis, N2 100 cm3/min, 5 degC/min heating rate — surface area 597 m2/g (micro 453 / meso 144 m2/g, pore ~3.32 nm, HNO3-modified for Pb adsorption: 74.5 mg/g with KOH vs 66 mg/g without; methylene blue 88.77 mg/g); single-stage 900 degC/1 h — 637 m2/g; vacuum 230 degC/3 h then KOH — 117.2 m2/g; KOH activation at 900 degC — 2726 m2/g BET, mesopores 2.48-2.65 nm; N-doped supercapacitor carbon 330.1 F/g at 0.5 A/g, 93.48% retention after 10,000 cycles; hydrogen-storage carbon up to 9.4 wt% H2 (best-in-class claim, Blankenship & Mokaya 2017). 16% of cigarette mass lost during activated-carbon production (Yang 2017).
8. **Emissions context** [S2, Torkashvand citing Mohajerani 2016]: heating CB-bearing material increases CO, CO2, HCN emissions vs no-CB material — relevant to any thermal route's flue-gas treatment.

`parameter_not_located` across [S1]: kinetics/activation energy (the group's other papers report Kissinger/Ozawa but not in this abstract); heating rate/purge; oil composition beyond triacetin; gas balance closure; char metals; reactor economics; energy self-sufficiency; scalability.

## 2. Equipment
- 200 g batch pyrolysis reactor with condensers, gas analyser (instantaneous), GC/MS, SEM-EDX, FTIR for characterization [S1 abstract]
- Companion line: tubular furnace (N2 purge, flow-controlled), KOH activation setup, BET surface-area apparatus [S2]
- Scale note: 750 degC processing of toxic waste is furnace-lab territory — qualified facility only; flue gas contains CO/HCN-class species and needs treatment. Desk research authorizes no physical trial.

## 3. Gap-fill table — labeled expert estimates

| # | Gap | Estimate (labeled) | Reasoning | Falsifier — how the team tests it |
| --- | --- | --- | --- | --- |
| 1 | Yield-range pairing (mass balance) | `parameter_not_located` — abstract ranges do not jointly close (96.7-103.6 wt%); `ai_inference`: each temperature's actual triplet sums to ~100, with the oil yield slightly decreasing and gas increasing at higher T (typical pyrolysis behavior) | The abstract gives ranges across temperatures without per-temperature triplets; the direction of shift (oil -> gas with T) is standard slow-pyrolysis physics. | Read the full paper (closed access) or rerun 200 g batches at 650/700/750 with full mass closure. |
| 2 | Nicotine / PAH fate in the oil | `ai_inference`: pyrolysis oil contains nicotine-derived N-heterocycles and PAHs — triacetin at 43% means the other ~57% is NOT characterized in the abstract; the biodiesel-additive framing ignores this | Triacetin is ~3-10% of a filter's mass; pyrolysis oil from tobacco-bearing waste normally carries nicotine/phenol/PAH fractions; a fuel-additive claim without a fuel-spec analysis is a gap. | GC/MS of the oil beyond triacetin + fuel-spec assays (sulfur, N, metals). If oil is clean enough for blending, the additive claim stands. |
| 3 | Why char is Ca-rich | `parameter_not_located` in abstract; `ai_inference`: Ca comes from cigarette paper fillers and tobacco ash (Ca carbonate filler in paper) concentrating ~4-8x into the char fraction | Butt ash is known Ca/K-rich; 25-28 wt% char yield from a feed carrying paper/ash concentrates the inorganic fraction. | SEM-EDX of char + ICP-MS: confirm Ca source and quantify Cd/Pb present alongside it. |
| 4 | Metals in char | `parameter_not_located`; **stop-condition binds** — Cd/Pb/As/Hg uncharacterised in the char product | Char from smoked-butts ash inherently carries tobacco combustion residues; the abstract names only Ca. | ICP-MS of char at all three temperatures. If metals exceed use thresholds, char routes shift to hazardous-stabilization, not materials. |
| 5 | Optimal temperature for the TEAM's purpose | `ai_proposal`: 650 degC for materials/char-maximizing runs; 750 degC ONLY if triacetin-rich oil is the objective (43% vs lower at 650) | Abstract: triacetin peaks at 750; char morphology "flakes" at 750; lower T usually favors char/less gas. Choose by target product. | Run both T on same batch; compare triacetin% and char BET. |
| 6 | Heating rate / residence | `ai_proposal`: slow pyrolysis 5-10 degC/min, 30-60 min hold — matches the companion literature (5 degC/min used at 900 degC in [S2]) | The companion carbonization line uses 5 degC/min consistently; Yousef's exact parameters are paywalled. | TGA + bench reactor yield comparison vs published triplets (row 1 falsifier doubles as this). |
| 7 | Energy balance | `parameter_not_located`; `ai_inference`: process is unlikely energy-self-sufficient — gas at only ~34 wt% with CO 8% + CH4 2% of a low-calorific mix cannot fire a 750 degC furnace alone | Butt pyrolysis gas is CO2-dominated; typical self-sustaining pyrolysis needs >40-50% gas of usable CV. | Measure gas CV; run furnace energy logging (method proven in M-08's Ch.4 approach). |
| 8 | Triacetin market claim | `ai_inference`: "low-cost biodiesel additive" framing is unproven — 43% triacetin oil still requires purification before fuel blending, costed nowhere in the abstract | Abstract gives no purification or cost data. | Costed purification trial or techno-economic paper; else treat as lab-curiosity value. |
| 9 | Scalability | `parameter_not_located`: 200 g batches only; no continuous-run data in abstract; review [S2] confirms all CB thermal work is lab-pilot scale | Desk literature states the field-wide scale gap. | Any continuous >10 kg/h pilot data would falsify "lab-only". |
| 10 | Emissions treatment | `ai_proposal`: flue-gas line with afterburn/scrub — heating CB-material elevates CO/CO2/HCN vs no-CB feed [S2]; HCN risk from tobacco nitrogen at 650-750 degC | Tobacco nitrogen species release HCN in this temperature window per the brick-emissions literature. | Gas analyser of furnace exhaust during team-scale run; HCN specifically. |

## 4. Safety notes
- **750 degC furnace + toxic feed**: off-gas contains CO (measured 8% of product gas), potential HCN (tobacco nitrogen), PAH-laden tars in the condenser line; flue treatment and CO/HCN monitoring mandatory. [S1][S2]
- **Pyrolysis oil is a hazardous chemical product**: carries nicotine-class N-compounds and PAHs (row 2) — flammable, toxic, handle under fume extraction; NOT a fuel additive until assayed.
- **Char dust**: Ca-rich but metal-bearing; respirable dust controls; characterize before any use claim (row 4, stop-condition).
- **KOH activation line** (companion [S2]): molten/alkaline KOH at 900 degC is severely corrosive — qualified lab only.
- **No DIY pressure/thermal equipment**; the 200 g reactor is a lab furnace construct, not replicable outside a qualified facility.
- Desk research authorizes no physical trial; qualified facility, risk assessment, lawful waste handling, named human actor.

## 5. What the team must verify in lab (partner facility)
1. **Oil truth test** (rows 1, 2, 5, 8): 200 g batch at 650 and 750 degC with full mass closure; GC/MS full oil composition (triacetin, nicotine, PAHs) + fuel-spec panel. THE experiment: decides whether the triacetin claim survives its uncharacterized 57%.
2. **Char gate** (rows 3, 4): ICP-MS metals + BET; decides materials vs hazardous-stabilization routing.
3. **Energy check** (row 7): gas CV + furnace kWh logging.
4. Desktop: retrieve full JAAP paper (closed access — interlibrary/author request); cross-check against Chemosphere 2026 critical review (PMID 42901015) which post-dates it.

## 6. Sources
- [S1] Yousef S., Eimontas J., Zakarauskas K., Striugas N., JAAP 175 (2023) 106167, DOI 10.1016/j.jaap.2023.106167 — abstract + highlights read from ScienceDirect 2026-11-25 (session's first successful primary read; previously flagged registry-wide as abstract-only). Full text closed access. Shelf: no dedicated source folder yet — create `sources/yousef-2023-jaap/` with SOURCE.md noting abstract-only status.
- [S2] Shelf: `sources/torkashvand-2019-review/text.md` (carbonization table: Soltani 2015 900 degC/597 m2/g; Yazdi 2012 900 degC/637 m2/g; Yang 2017 230 degC vacuum + KOH/117.2 m2/g; brick emissions CO/CO2/HCN; UnB paper specs cross-ref M-03) and `sources/shah-2023-review/text.md` (KOH 900 degC 2726 m2/g; N-doped supercapacitor 330.1 F/g; H2 storage 9.4 wt%; oil-spill fibers 98-99% separation).
- [S3] Registry entry `pyrolysis-energy-recovery` — corrected by this plan: 650/700/750 degC and yields now abstract-verified; "recover triacetin, char, and biofuels" is supported but the oil's non-triacetin 57% is uncharacterized.
