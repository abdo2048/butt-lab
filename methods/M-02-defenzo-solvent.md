# M-02 — De Fenzo polarity-graded wash + acetone film casting (Materials 2020) — Action plan

```
id: M-02
name: "De Fenzo polarity-graded water/ethanol CA purification + acetone film casting"
family: solvent
priority: true
status: draft
version: v0.1
sources: [defenzo-2020-materials]
```
(Keep the block above as the file's metadata; the site builder reads it.)

## 0. Summary card
A peer-reviewed, experimentally characterised route from the University of Napoli Federico II and CNR Portici (with eyewear maker Essequadro supplying feedstock): collected butts are paper-stripped, then washed through a polarity gradient — hot water (50 degC, 60 min), three cold-water rinses, two ethanol 99% washes — dried at 60 degC, and the recovered cellulose acetate is shown by FTIR and TGA/DSC to match unused CA chemically and thermally (Tg 192 vs 193 degC; same main degradation at 367 degC). A transparent (but brittle) 2 mm film is cast from a 5% w/w acetone solution, targeting fashion/eyewear products. Priority because it is the only route in the registry with full experimental characterisation of product quality, it needs only benign reagents (water, ethanol, acetone), and no blocking patent is known. The paper's own protocol is lab-scale; every scale, ratio and removal-efficiency number is a gap to fill below.

## 1. What the sources disclose — step by step
All items from [S1] (full methods text fetched from PMC on 2026-11-24; quotes preserved in `sources/defenzo-2020-materials/SOURCE.md`).

1. **Collection** — used filters collected from ashtrays of a bar/restaurant area in Avellino, Italy, provided by Essequadro S.r.l., shipped to CNR laboratories in Portici. [S1 sec. 2]
2. **Sterilisation / treatment** — butts are described as "sterilized and treated"; **no parameters given**. `parameter_not_located: sterilisation method, temperature, duration`
3. **External paper removal** — performed before extraction; **method not detailed**. `parameter_not_located: manual vs mechanical, equipment`
4. **Hot-water wash** — **50 degC for 60 minutes**. [S1 sec. 2]
5. **Cold-water rinses** — **three times**. [S1 sec. 2] `parameter_not_located: water volume, rinse duration each`
6. **Ethanol washes** — **ethanol 99% w/w, twice**. [S1 sec. 2] `parameter_not_located: temperature, volume, duration each`
7. **Drying** — **oven, 60 degC for 60 minutes**. [S1 sec. 2]
8. **Characterisation of recovered CA vs unused CA** — FTIR bands: OH 3400 cm-1; CH 2920/2850 cm-1; CH2 1432 cm-1; carbonyl C=O 1739 cm-1; CH 1371 cm-1; C-O 1214 cm-1; C-O-C 1100 cm-1; C-O 1030 cm-1. TGA/DSC: melting near **225 degC**; Tg **193 degC unused / 192 degC recovered**; maximum degradation rate **367 degC**; mass loss in degradative step **~85%**; final residue **~10%**; burning time unused CA **1.83 min**; Ea deacetylation inert **67 kJ/mol unused / 61 kJ/mol recovered**; under air **40 kJ/mol both**; charring **75 kJ/mol both**; inert 20-80% conversion **200 kJ/mol**; air 15-65% **150 kJ/mol**. [S1 sec. 3]
9. **Film casting** — recovered CA dissolved in **acetone at 5% w/w**, cast in a petri dish to a **2 mm** film: **transparent but brittle**; the authors state a plasticizer should be added to improve mechanical/thermal properties without losing transparency. [S1 sec. 3] `parameter_not_located: plasticizer identity and dose, casting-atmosphere, drying time of film`

Rationale stated by the authors: CA is soluble in acetone or ethyl acetate; contaminants (aromatic and heterocyclic amines, carbonylated compounds, phenols, PAHs, NOx/NH3 derivatives) differ in polarity, hence the polarity-graded extraction. No yield percentage, no contaminant-removal efficiency, no solvent-to-solid ratios appear in the paper.

## 2. Equipment
- Hot-water wash vessel with temperature control at 50 degC (stirred tank or water bath), lab scale [S1]
- Rinse vessels (x3) and ethanol wash vessels (x2)
- Ventilated oven at 60 degC [S1]
- Fume hood for ethanol and acetone handling (this plan's addition — flammability)
- Optional QC: FTIR + TGA/DSC access (confirms product equivalence; any materials-lab has it)
- Film casting: petri dishes, doctor blade optional; acetone-rated hood [S1]

Scale note: the paper works at grams of butts. Nothing in it blocks kg-scale batches, but every liquor ratio in section 3 is a proposal to be validated at 50 g first.

## 3. Gap-fill table — labeled expert estimates

| # | Gap | Estimate (labeled) | Reasoning | Falsifier — how the team tests it |
| --- | --- | --- | --- | --- |
| 1 | Solid-to-liquid ratio, each stage | `ai_proposal`: hot-water stage 1:20 w/v (e.g. 50 g butts : 1 L); cold rinses and ethanol stages 1:10 w/v | Ratios are absent from the paper. 1:20 keeps the tow freely suspended and holds the leaching gradient across 60 min; 1:10 suffices for short rinse stages. | Nicotine assay of each spent liquor across 3 ratio variants (1:10 / 1:20 / 1:40). Acceptance: liquor concentration plateaus — higher ratio adds nothing. |
| 2 | Agitation | `ai_proposal`: orbital shaker 150 rpm (or manual swirl every 5 min at bench scale) | Not described in the paper; diffusion-limited leaching from dense tow needs convection. | Parallel static vs 150 rpm runs; nicotine in spent liquor. Acceptance: agitated >=2x the static removal per unit time. |
| 3 | Ethanol-stage temperature | `ai_proposal`: ambient 20-25 degC | The paper names no temperature for the ethanol stages; phenol/PAH removal is solubility-limited, not rate-limited, at bench timescales. Avoids heating a flammable solvent. | PAH screen on product: ambient vs 40 degC ethanol stage. Acceptance: no significant gain at 40 degC -> keep ambient. |
| 4 | CA yield per mass of butts | `ai_inference`: 45-60% of input butt mass as dried purified CA (same derivation as M-01 row 4) | No yield in the paper. Filter tow dominates butt mass; paper and organic material are removed upstream; TGA residue ~10% bounds inorganic content. | Weigh dried CA from a 50 g run x3. Acceptance band 40-70%. |
| 5 | Insoluble-fines removal before casting | `parameter_not_located` (not described); `ai_proposal`: filter the 5% acetone solution through ~100 um mesh (or settle 10 min and decant) before casting | A 2 mm transparent film from unwashed-but purified tow will show specks if ash/paper fines ride along; the paper does not say how the solution was clarified. | Cast paired films with/without filtration. Acceptance: visible-defect count per 10 cm2 drops to <=1 with filtration; else fines are not the defect source. |
| 6 | Plasticizer identity and dose | `ai_proposal`: triacetin at 20 wt% of CA mass (e.g. 1 g per 5 g CA in 100 g of 5% solution — computed) | The paper says plasticizer is needed but not which. Triacetin is the plasticiser already industrially used in CA filter tow, so it is feedstock-compatible and food-contact-listed. Arithmetic: 100 g of 5% w/w solution holds 5.0 g CA; 20 wt% of CA = 1.0 g triacetin. | Cast films at 0 / 10 / 20 / 30 wt% triacetin; 180 deg bend test + thickness. Acceptance: 180 deg bend without cracking at 20 wt%. |
| 7 | Sterilisation parameters | `ai_proposal`: dry-heat 105 degC for 30 min applied to the dried CA (extends the disclosed 60 degC dry) or a doubled ethanol stage as sanitiser | "Sterilized" is mentioned without parameters [S1 sec. 2]. 105 degC dry heat sits far below CA's Tg (192 degC [S1]) and is a standard dry-heat sanitisation band. | Total viable count before/after; acceptance: no growth on plate count. If fails, escalate to the qualified-facility step, not to improvisation. |
| 8 | Contaminant removal efficiency (nicotine, PAHs) | `parameter_not_located`; working estimate `ai_proposal`: the full sequence removes >=90% of extractable nicotine and >=50% of 16-EPA-PAH content | The paper proves property preservation, not detoxification; polarity logic predicts the water stages take nicotine and the ethanol stages take semi-polars. | Nicotine (HPLC) per stage liquor + PAH screen (16 EPA) on feed and product. Decision rule: nicotine <90% -> extend hot-water stage to 90 min before changing chemistry. |
| 9 | Metals in product (Cd, Pb, As, Hg) | `parameter_not_located` — the paper reports no metals data; **stop-condition: route on hold for product-facing work until feedstock metals are characterised** | Water/ethanol washing does not chelate bound metals; residual ash (~10% TGA residue) is the suspect fraction. | ICP-MS on dried CA + all spent liquors. Gate for any product use. |
| 10 | Scale-up path | `parameter_not_located` — paper is lab-scale only; `ai_inference`: kg-scale needs M-01-style tanks and a solvent-recovery still for the ethanol/acetone loops | Batch solvent handling (2 ethanol washes + acetone for film) is the cost driver at scale, not the washing chemistry. | 1 kg pilot in M-01 tanks; log solvent consumption per kg; acceptance: ethanol+acetone losses <=0.5 L/kg before any economic claim. |

## 4. Safety notes
- **Ethanol 99% and acetone:** both highly flammable (acetone flash point ~-20 degC; ethanol ~13 degC — class data, not from [S1]); fume hood, no ignition sources, grounded glassware/metal, small quantities per session.
- **Nicotine exposure:** wet butts and spent liquors carry free nicotine; nitrile gloves, no skin contact, wash hands; nicotine is acutely toxic dermally.
- **Spent wash liquors:** hazardous wastewater (nicotine, phenols, PAHs per [S1] rationale; metals per [S2]); collect all fractions, licensed disposal.
- **Oven (60 degC):** ventilated; no solvent residues inside the oven cavity.
- **TGA/FTIR work:** standard instrument-lab rules; TGA of CA releases acetic acid/vapours — use the instrument's venting.
- **Material stop-condition:** Cd/Pb/As/Hg uncharacterised -> route on hold for product-facing work (row 9).
- The paper's language ("green", "safe and conservative") is author characterization, not our claim; this plan never claims clean/safe/validated — the team's lab decides.
- Desk research authorises no physical trial: qualified facility, risk assessment, lawful waste handling, named human actor.

## 5. What the team must verify in lab
Ordered by information value:
1. **Reproduce the wash sequence at 50 g scale** (steps 4-7 with gap rows 1-3 proposals): nicotine per stage liquor, PAH screen on product. Confirms/kills rows 1, 2, 3, 8.
2. **Product equivalence QC:** FTIR (carbonyl 1739 cm-1 band present, no new contaminant bands) + TGA (Tg/Tm within +-3 degC of the paper's 192/225 degC; degradation onset near 367 degC). Confirms the paper's central claim replicates on the team's feedstock; kills the route's quality premise if it fails.
3. **Film casting trial** with/without filtration, 0/10/20/30 wt% triacetin, bend test. Confirms/kills rows 5, 6.
4. **Metals gate:** ICP-MS on product + liquors (row 9) before any product-facing claim.
5. Only after 1-4: **1 kg solvent-accounted pilot** (row 10).

## 6. Sources
- [S1] De Fenzo A., Giordano M., Sansone L. (2020). "A Clean Process for Obtaining High-Quality Cellulose Acetate from Cigarette Butts." Materials 13(21):4710. doi:10.3390/ma13214710; PMID 33105718; PMC7659942. Full text: https://pmc.ncbi.nlm.nih.gov/articles/PMC7659942/ (open access); PDF: https://pmc.ncbi.nlm.nih.gov/articles/PMC7659942/pdf/materials-13-04710.pdf. Shelf record: `sources/defenzo-2020-materials/SOURCE.md` (protocol numbers captured 2026-11-24; document.pdf and text.md not yet shelved — operator conversion welcome). Funding/acknowledgement: Essequadro S.r.l. supplied butts and test support (declared in the paper).
- [S2] Moroz et al., toxicity review of cigarette-butt contaminants — shelf: `sources/moroz-toxicity-review/`. Used only for contaminant classes.
- Registry cross-reference: registry entry `academic-green-ethanol-wash` cites the same primary source (PMC7659942); treat it as a duplicate reference to this plan, not an independent method.
