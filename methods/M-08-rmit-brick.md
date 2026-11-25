# M-08 — RMIT fired-clay bricks incorporating cigarette butts (Kurmus/Mohajerani) — Action plan

```
id: M-08
name: "RMIT fired-clay bricks with cigarette butts (Kurmus thesis + Mohajerani/Kadir studies)"
family: thermal
priority: true
status: draft
version: v0.1
sources: [kurmus-thesis-fired-clay-bricks, torkashvand-2019-review, shah-2023-review, registry/rmit-brick-making]
```
(Keep the block above as the file's metadata; the site builder reads it.)

## 0. Summary card
RMIT University (Melbourne) is the only group that took a butt-recycling route through a FULL experimental program: two generations of fired-clay-brick studies. The earlier Kadir/Mohajerani work (2.5-10 wt% CBs, 1050 degC) showed energy savings up to 58.4% (calculated, 5% CBs) but strength collapse (25.65 -> 3 MPa) — too much butt burns out the brick. The main Kurmus study (0.5-2 wt% CBs) found the engineering sweet spot: at 1 wt% CBs, compressive strength stays at 30.8 MPa (well above the 5-10 MPa load-bearing minimum), density drops 2114 -> 1983 kg/m3, thermal conductivity drops 15.1% (0.463 -> 0.393 W/mK), measured firing energy drops 8.0%, and leaching + PAH assays all land below regulatory limits (non-hazardous classification claimed). Scale proposal: 1% CBs in 2.5% of world brick production would absorb essentially all CBs. Priority because it is the only route with published, standards-based, multi-gate evidence — including the leachate and PAH gates other routes skip. Shelf note: the REAL primary text is the Kurmus PhD thesis (Chapters 3-8); the folder `kurmus-2020-toxicity-valorisation` is actually the Shah 2023 review (shelf mismatch, corrected here). [S1][S2]

## 1. What the sources disclose — step by step
[S1] = Kurmus PhD thesis, `sources/kurmus-thesis-fired-clay-bricks/text.md` (read from shelf; ~11800 lines; Ch.2 literature review reproduces the earlier Mohajerani et al. study, Ch.3-8 are the Kurmus experimental program). [S2] = shelf reviews (torkashvand-2019, shah-2023) for cross-checks. [S3] = registry entry `rmit-brick-making`.

**Generation 1 — Kadir & Mohajerani (2.5-10 wt%, reproduced in [S1] Ch.2):**
1. CBs of varying sizes/brands (supplier Buttout Australia Pty Ltd) mixed into brick clay at 2.5/5/7.5/10 wt%, Hobart mechanical mixer 5/10/15 min; hand-compacted; dried 105 degC/24 h; fired 1050 degC. [S1 Ch.2]
2. Results: compressive strength 25.65 MPa (0%) -> 3 MPa (10%); dry density 2118 -> 1482 kg/m3; water absorption 5% (0%) -> 18% (7.5%); calculated firing energy saving 30.8% (2.5% CBs) and 58.4% (5% CBs, from CB calorific value); thermal conductivity significantly reduced. [S1 Ch.2; cross-check [S2] Torkashvand: 5-10% CBs cut thermal conductivity 51-58%; ideal condition 2.5% CB at 1 degC/min heating rate per Kadir 2014]
3. Leaching (Kadir & Mohajerani, ABLP/TCLP/SLT on As/Se/Hg/Cd/Cr/Pb-class metals): "heavy metal leachate values were insignificant and below the standard acceptable limits". [S1 Ch.2/Ch.5 context]

**Generation 2 — Kurmus main program (0.5/1/1.5/2 wt%):**
4. **Prep**: CBs oven-dried 105 degC/24 h, disinfected (source PHG Bricks, Victoria); mixed with brick soil 25 min in Hobart mixer at 15.5% moisture; pressed at 240 kPa; dried 105 degC/24 h; fired in electric chamber furnace (Thermoconcept KC 220/13) at 1050 degC held 3 h. [S1 Ch.4 methods]
5. **Mechanics**: compressive strength 48.6 MPa (0%) -> 30.8 MPa (1%) -> 27.2 MPa (2%); minimum standards 3-5 MPa (non-load) / 5-10 MPa (load-bearing) — all CB mixes above threshold. Dry density 2114 -> 1983 (1%) / 1969 (2%) kg/m3. Water absorption max 13.1% (2% CBs); shrinkage below the 8% standard maximum. Efflorescence tested across all mixes. [S1 Ch.3-4]
6. **Thermal**: thermal conductivity 0.463 -> 0.393 W/mK at 1% CBs = 15.1% drop (python3-verified); pore-forming creates micro (0.035 mm) and macro (1.365 mm) pores, homogeneously distributed (micro-CT). [S1 Ch.4; cross-check [S2] Shah 2023: same numbers, porosity 3.96% -> 20.57% at 2%]
7. **Energy**: furnace-logger measured consumption 6.85 kWh (0%) -> 6.30 kWh (1%) -> 5.94 kWh (2%) = 8.0% / 13.3% measured savings (python3-verified: 8.03 / 13.28); CALCULATED savings 10.20% (1%) / 14.71% (2%) — both kept, measured is authoritative. Wall-scale model: 16.7% energy saving through a 1%-CB wall vs 0% wall. Australia costing (thesis's own arithmetic, reproduced): 1.6 B bricks/yr x 3.2 kg x 2 MJ/kg = 2.844 GWh/yr x 23.272 c/kWh = AUD 661.96 M/yr firing cost; 8% saving = AUD ~53 M/yr (thesis says 53.15; python3 gives 52.96 — rounding, kept with note). [S1 Ch.3-4]
8. **Leaching gate**: ABLP on used/unused/shredded CBs + unfired/fired bricks (0.5-2%), ICP-MS; fired bricks leach far less than unfired (metal immobilization in firing); all samples below regulatory limits across pH values; shredded used CBs leach most (Cr, Cd, Zn, Mn, Al, Fe elevated; e.g. Al 6.982 mg/L at pH 5); encapsulation pre-tests: bitumen and paraffin-wax encapsulated CBs reduce leaching (tested as bricks' feed prep options). [S1 Ch.5]
9. **PAH gate**: Soxhlet extraction (DCM) + GC-MS of the 16 US-EPA PAHs in fired bricks: total PAH for all five mixes (0-2%) below EPA solid-waste hazard thresholds -> classified non-hazardous waste. [S1 Ch.6]
10. **Microbiology + odor**: two pilot bacteriological studies, 10 common bacteria screened, various sterilisation methods compared (whole vs pre-shredded CB addition); odor/VOC chapter: VOCs quantified with charcoal sorbent tubes during mixing/compaction/firing; UVC light confirmed to alter/reduce odor-generating pollutant gases. [S1 Ch.7-8]
11. **Scale claim** [S1, repeated across chapters]: incorporating 1% CBs into 2.5% of world brick production would eliminate the CB litter problem. `ai_inference`: this is an absorption-capacity claim, not an implementation plan — collection logistics (the M-06 lesson) is the unsolved half.

`parameter_not_located` across [S1]: industrial-scale trial (all work is lab-scale bricks); long-term durability/weathering of CB bricks; cost of the CB supply chain to the brickyard; disinfection method details in Ch.4 ("disinfected" without full protocol — Ch.7 sterilisation studies are the partial answer).

## 2. Equipment
- Hobart mechanical mixer; manual/press compaction (240 kPa); drying oven 105 degC; electric chamber furnace 1050 degC 3 h; TLS-100 thermal-conductivity probe; micro-CT; ICP-MS; GC-MS; furnace energy logger [S1]
- Scale note: brick-lab equipment is the most accessible of all eight priority routes (no pressure vessels, no solvents) — a civil-engineering materials lab can replicate the whole Ch.3-5 program.

## 3. Gap-fill table — labeled expert estimates

| # | Gap | Estimate (labeled) | Reasoning | Falsifier — how the team tests it |
| --- | --- | --- | --- | --- |
| 1 | Optimal CB loading | `source_supported`-adjacent `ai_inference`: **1 wt% is the engineering optimum** (30.8 MPa vs 5-10 MPa standard; 15.1% conductivity drop; 8% measured energy saving); 2% if insulation is the priority (27.2 MPa still above load-bearing minimum) | The two generations bracket the answer: <=2% keeps standards compliance; 1% balances strength/insulation/energy. | Replicate 0.5/1/1.5/2% matrix per [S1] Ch.3; verify strength + conductivity against the published bands. |
| 2 | Disinfection protocol before mixing | `ai_proposal`: oven-dry 105 degC/24 h (disclosed) + one of the Ch.7-validated sterilisation methods; `parameter_not_located` for the exact Ch.4 method | Ch.4 says "disinfected" without the full protocol; Ch.7 compares sterilisation methods for CBs — the team should read Ch.7's results tables and adopt the simplest effective one. | Read Ch.7 tables (shelf text, full read needed); bacteriological plate test after chosen protocol. |
| 3 | Odor management at industrial scale | `parameter_not_located` beyond lab evidence: UVC treatment confirmed to reduce odor/VOC gases at lab scale; industrial-line application unstudied | Ch.8 demonstrates the mechanism but not factory deployment. | Pilot-scale UVC test on a brick plant mixing line; VOC tubes per Ch.8 method. |
| 4 | Emissions at firing (plant scale) | `ai_inference`: CB fraction raises CO/CO2/HCN emissions vs normal bricks (5% CBs: CO 5.8x, CO2 2.76x, HCN 2.5x, NO 0.5x per Mohajerani 2016 via [S2]) — at 1-2% loadings the absolute increment is proportionally small but unmeasured | The 5.8x figures are at 5% loading (Gen-1); the Kurmus program measured energy but the shelf text does not show plant-stack data at 1-2%. | Furnace exhaust gas analysis at 1-2% loadings (same analyser setup as M-07 row 10). |
| 5 | Leaching margins | `source_supported` (Ch.5): all below regulatory limits; `ai_inference`: the margins for Cd/Hg appear small (figures near limits per the thesis figures) — margin quantification needs the full tables | Thesis states compliance but the shelf-extracted summary does not give per-metal margin ratios. | Extract Ch.5 Tables 5.1.3-5.1.4 numbers; compute margin-to-limit per metal per pH. |
| 6 | Long-term durability | `parameter_not_located`: no freeze-thaw, weathering, or multi-year exposure data in the program | Standards-based lab testing only; construction products need durability histories. | Outdoor exposure rack test (5-10 yr) or accelerated weathering; leaching re-test after weathering. |
| 7 | CB supply chain to brickyard | `parameter_not_located`; `ai_proposal`: butts must arrive DRY — pre-dried and disinfected at collection nodes (shredded CBs leach most, so whole-butts transport better per Ch.5) | Ch.5 shows shredding increases leaching — so on-site shredding at the brickyard, not upstream. | Pilot collection node cost trial; compare whole vs shredded transport + leach. |
| 8 | Scale-claim realism | `ai_inference`: 1% in 2.5% of world bricks absorbs the global butt stream arithmetically, but requires collection infrastructure rivaling M-06's failed logistics + brick-plant acceptance; the thesis itself notes industrial-scale recycling needs are unresolved | The claim is arithmetic absorption, not deployment. | Any industrial trial at a real brickyard (none exists in the literature). |
| 9 | Energy-saving metric choice | `ai_inference`: use MEASURED (8.0%/13.3%) not calculated (10.2%/14.71%) numbers in ranking; calculated depends on assumed specific firing energy (2 MJ/kg) and CB calorific value | Thesis itself shows the two methods diverge; ranking must not cherry-pick. | Rerun furnace logging with different clays/energy tariffs. |
| 10 | Metals gate | Ch.5 passes it for FIRED bricks (immobilization) — the stop-condition is conditionally satisfied for this route only: metals are characterized (ICP-MS across pH 2.5-9.2) and below limits; unfired and shredded forms FAIL the same gate | This is the only priority route where the metals gate has actual published data. | Re-verify with local clay + local CBs (metal content is feedstock-dependent); compute margins (row 5). |

## 4. Safety notes
- **Firing emissions**: CO/HCN elevation with CB content [S2]; laboratory furnace needs exhaust extraction; plant-scale needs stack treatment. [S1][S2]
- **Mixing/firing odor and VOCs**: charcoal-tube monitoring per Ch.8; UVC mitigation demonstrated at lab scale only. [S1 Ch.8]
- **Unfired CB bricks and shredded CBs leach heavy metals** — do not use unfired CB material anywhere; fired-only. [S1 Ch.5]
- **Encapsulation options** (bitumen/paraffin dipping) exist if leach margins tighten, but add cost and fire considerations. [S1 Ch.5]
- **1050 degC kiln work**: standard industrial hazard class — qualified facility, PPE, CO monitoring.
- Desk research authorizes no physical trial; qualified facility, risk assessment, lawful waste handling, named human actor.

## 5. What the team must verify in lab
Most accessible route — civil-engineering materials lab can run the full program:
1. **Replication matrix** (rows 1, 4, 9): 0-2% CB bricks at 1050 degC/3 h per [S1] Ch.3-4 methods; strength, density, conductivity, furnace kWh, exhaust gas. THE experiment: reproduces the sweet spot with local clay/CBs.
2. **Leaching gate** (rows 5, 10): ABLP + ICP-MS on fired and unfired specimens, pH 2.5-9.2; compute margins per metal.
3. **Sterilisation selection** (row 2): read Ch.7 fully; plate-test the chosen protocol on local CBs.
4. **PAH screen** (Ch.6 cross-check): GC-MS 16 PAHs on fired bricks.
5. Desktop: durability standards mapping (rows 6) and brickyard partner scouting (row 8).

## 6. Sources
- [S1] Kurmus PhD thesis — `sources/kurmus-thesis-fired-clay-bricks/` (text.md, 523 KB, read this session; Ch.2 = Gen-1 Mohajerani/Kadir results; Ch.3-4 mechanics/thermal/energy; Ch.5 leaching; Ch.6 PAHs; Ch.7 bacteriology; Ch.8 UVC odor). SHELF MISMATCH: `sources/kurmus-2020-toxicity-valorisation/` actually contains Shah et al. 2023 Heliyon review — the real Kurmus 2020 Waste Management paper text is inside the thesis (registry correction logged).
- [S2] `sources/torkashvand-2019-review/text.md` (brick emissions 5.8/2.76/2.5/0.5x at 5% CBs; thermal conductivity 51-58% cuts; 2.5% CB + 1 degC/min ideal; UnB paper specs) and `sources/shah-2023-review/text.md` (porosity 3.96 -> 20.57% at 2%; pores 0.035/1.365 mm; energy-savings table 30.8/58.4%).
- [S3] Registry entry `rmit-brick-making` — corrected by this plan: energy saving is 8% measured / 10.2% calculated at 1% (not a flat "10%"); the route has published leaching AND PAH gates; lab-scale only.
