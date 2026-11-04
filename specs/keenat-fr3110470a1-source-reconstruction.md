# Source reconstruction: Keenat FR3110470A1 — dry thermal treatment + extrusion composite

Date: 2026-11-03. Stage 2 / unit S2-02 (spec v1.0). Desk reconstruction of public disclosure only. **Not an operating procedure, plant design, safety approval or legal opinion.** No experiment was performed. See `dossier/cautionary/ineris-waste-classification.md`, `dossier/cautionary/keenat-lca-retreat.md`, `dossier/cautionary/korean-paving-stones.md`.

## 1. Source identity and reading coverage

- Registry ID: `keenat-dry-thermal`.
- Patent: FR3110470A1, "Cigarette butts recycling process" / "Procédé de recyclage des mégots de cigarette"; application FR2005076; filed 2020-05-19; inventor Teddy Fournier; assignee Keenat.
- Family indicated on the page: EP application EP21174612.8 (filed 2021-05-19), ES21174612T.
- Read: Google Patents chunk 0 (bibliographic, French abstract, CPC classes) and chunk 2 (description: claimed steps a–d, composite ratios, use list). Chunks 1 and 3–7 (examples, figures, claims as granted) **not read**.
- Company layer: `keenat.com/recyclage-valorisation-megots/` (published 2024-05-23) read in chunk 0 of 5; FAQ/later sections not read.
- Inherited project text: seed facts and `dossier/cautionary/keenat-lca-retreat.md`, which state "successive heatings near 200 °C" and cite Le Parisien 2026-10-15 and Sud Ouest 2026-09-03 (not re-fetched).
- Reading class: `source-partially-read`.

## 2. Plain-language mechanism (patent text)

Butts are separated into a filter fraction and a tobacco/paper fraction. The filter fraction is dried and heated at 80–100 °C ("drying and depolluting"). It is then ground and compounded in an extruder together with a thermoplastic polymer. The output is a composite granulate containing 10–30 % recycled cigarette filters and 70–90 % thermoplastic, intended for non-food articles such as furniture, pipes, legs, ashtrays, communication supports and panels.

This is **not** a polymer-purification process. The acetate is not dissolved, precipitated or washed in the read disclosure; it becomes a filler/blend component inside a thermoplastic matrix. The 80–100 °C figure applies to step b (drying/depollution) only; the extruder temperature profile is not disclosed in the read text and must not be inferred from it.

## 3. Disclosed steps (source-reported; not instructions)

| # | Operation | Disclosure (translated summary) | Seen in | Missing |
|---|---|---|---|---|
| a | Separate | Separate filters into fraction F1 and tobacco/paper into fraction F2 from a mixture of butts | Description | Separation method (sieve, air, manual), moisture, efficiency |
| b | Dry + "depollute" | Heat F1 at **80–100 °C** (step b only; not the extrusion profile) | Description | Residence time, atmosphere, airflow, pressure, what is removed |
| c | Grind | Grind dried, "depolluted" F1 | Description | Particle size, mill energy |
| d | Compound | Mix and simultaneously "depollute" in an extruder with ≥1 thermoplastic → composite | Description | Extruder profile, screw speed, feed ratio control, venting, fume capture |
| e | Pelletise | Composite preferably in granulate form | Description | Pellet size, cooling |
| f | Use | Non-food articles: furniture, pipes, legs, ashtrays, communication supports, panels | Description | Product testing, leachate, mechanical data |

Company layer adds: mechanical separation; "dry" depollution with no liquid discharge; fibre "hygienised"; thermo-compression into plastic plates for furniture/information boards; process also applied to PPE (masks, gloves, gowns); company now prioritises solid recovered fuel (CSS) for cement kilns.

## 4. The key unresolved conflict: 80–100 °C vs "~200 °C"

| Source | Temperature statement | Context |
|---|---|---|
| FR3110470A1 (read text) | 80–100 °C | Step b, "séchage et dépollution par chauffage" |
| Inherited project notes / press | "successive heatings ~200 °C destroying nicotine, phenol, pesticides" | Company/press description, not the patent passage read here |

`DISPUTED / UNRESOLVED`. Possible explanations, all unverified: (i) the press figure describes the extruder or a later embodiment not in the read passages; (ii) the patent's 80–100 °C is a drying step and the "depollution" claim is broader than the temperature example; (iii) the company process changed after filing. **Do not merge the two numbers into a range of 80–200 °C, and do not attribute 200 °C to the patent.**

### Physicochemical plausibility (hypothesis, not a source claim)

`[HYPOTHESIS]` At 80–100 °C and atmospheric pressure, the plausible effect of step b is **drying and partial volatilisation**, not thermal destruction. Boiling point is not a decomposition-kinetics argument: whether nicotine, PAHs or other organics are destroyed depends on temperature, residence time, oxygen and catalysis, which the read text does not specify. Metal behaviour also varies by element and species (mercury and some arsenic species can volatilise; Cd/Pb are far less volatile), so "metals are non-volatile" is too broad. The testable statement is therefore:
- "Depollution at 80–100 °C" is more consistent with **drying plus partial volatilisation** than with destruction of the toxic load.
- If the step is genuine detoxification, the removed substances must leave in an air stream — which creates an off-gas treatment requirement that the read text does not describe.
- The Korean paving-stone case is the direct precedent: heat treatment plus encapsulation did not prevent carcinogens being found in the finished product.

This reasoning is a falsifiable hypothesis: measure nicotine/TSNA/PAH/metal content in feed, treated fibre, off-gas condensate and final composite. If the treated fibre retains the load, the "depollution" claim fails at that temperature.

## 5. Inputs, outputs and mass basis

| Stream | Disclosure | Note |
|---|---|---|
| Filter fraction F1 | Not quantified | Depends on separation efficiency; company mass split not published |
| Tobacco/paper F2 | Sent to a separate route (not specified in read text) | Disposal/compost question |
| Thermoplastic | 70–90 % of composite | Virgin polymer dominates product mass |
| Recycled filters | 10–30 % of composite | `[CALCULATION]` per tonne of composite: 100–300 kg filter fraction and 700–900 kg thermoplastic |
| Off-gas/volatiles | Not described | Critical missing stream if heating removes anything |
| Rejects | Not described | — |

`[CALCULATION]` The composite ratio means the process is primarily a **thermoplastic compounding** operation with butts as a minority filler. At 10–30 % loading, one tonne of composite consumes 0.1–0.3 t of filter fraction; the remaining 0.7–0.9 t is virgin or recycled thermoplastic. Any claim that this "recycles cigarette butts" must be read against that dilution.

No CA yield, purity, or fibre-retention claim is possible from the read text: the acetate is not separated as a product.

## 6. Waste streams and disposal questions

| Stream | Expected character | Disclosed | Open question |
|---|---|---|---|
| F2 (tobacco/paper/ash) | Toxic organic + metal load | "Separated" | Compost/fuel/hazardous waste? No route stated |
| Heating off-gas | Water vapour, nicotine and volatile organics if evaporated | Not described | Capture, condensation, carbon adsorption, stack emission limits |
| Extruder vent gas | Polymer and additive volatiles, possible nicotine | Not described | Same |
| PPE feed (company) | Masks/gloves/gowns (PP, PE) | Company says same technology | Mixed-plastic compatibility, additives, disinfection |
| Product at end of life | Thermoplastic composite with acetate filler | Not described | Recyclability, leaching, microplastic release |
| CSS route (company) | Solid recovered fuel to cement kilns | Company | Combustion emissions, chlorine/alkali load, permitting |

The company's own LCA concluded that making plastic objects from butts was **not** environmentally beneficial, and the dedicated site closed; the firm pivoted to CSS. This is the most important non-technical datum in the file: the operator's own assessment undercut the material-recycling product.

## 7. Safety questions (not instructions)

- Hot-surface and extruder hazards; polymer fume inhalation; combustible dust from grinding.
- If heating volatilises nicotine, the off-gas is a nicotine-bearing stream requiring capture; condensate is hazardous.
- Composite product containing a toxic-waste-derived filler: leachate and consumer exposure are unassessed in the read text.
- PPE feedstock introduces biological load and mixed-polymer variability.
- No liquid discharge is claimed, but "no liquid" is not "no emission".

## 8. Numbers explicitly unknown

1. Residence time and atmosphere at 80–100 °C.
2. Mass loss during drying/degassing.
3. Analyte concentrations before/after step b and in off-gas.
4. Separation efficiency and F1 composition.
5. Extruder temperature profile, screw configuration, venting.
6. Composite mechanical properties and leachate.
7. Thermoplastic identity and any compatibiliser/additive.
8. Product End-of-Waste criteria and test laboratory.
9. Energy, throughput and cost.
10. CSS specification and combustion emissions.

## 9. Claim ledger

| Claim | Label | Source |
|---|---|---|
| Steps a–d; 80–100 °C; 10–30 % filters, 70–90 % thermoplastic; granulate; non-food uses | `[VERIFIED-SOURCE]` | FR3110470A1 description (read chunks 0, 2) |
| Dry process, no water/solvent, no liquid discharge; hygienised fibre; thermo-compressed plates | `[VERIFIED-SOURCE]` (company self-report) | keenat.com 2024-05-23 |
| ~200 °C successive heatings destroy nicotine/phenol/pesticides | `[VERIFIED-SOURCE]` (company/press, inherited) but **unverified against the patent text read** | seed facts; Le Parisien via dossier |
| LCA found plastic-object recycling not environmentally beneficial; pivot to CSS | `[VERIFIED-SOURCE]` (company/press, inherited) | dossier/cautionary/keenat-lca-retreat.md |
| Heating at 80–100 °C destroys the toxic load | `[HYPOTHESIS]` — contradicted by volatility of metals and by the Korean paving case; requires measurement | — |
| Composite is a thermoplastic product with butts as minority filler | `[CALCULATION]` from stated ratios | FR3110470A1 |

## 10. Engineering interpretation (hypothesis)

Keenat is the best-documented example of the "heat and encapsulate" family, and the most instructive failure. Its patent discloses a plausible drying/compounding operation, not a demonstrated detoxification. Its own LCA then found the material product not beneficial. Together with the Korean paving-stone result, this family should be treated as **unproven for detoxification and questionable on life-cycle grounds**, not as a safe default.

Falsifier: a mass/analyte balance showing that the toxic fraction leaves in a controlled off-gas or reject stream and that the composite meets a justified leachate criterion — or, conversely, showing retention in the product. A second falsifier is an LCA showing net burden above the displaced thermoplastic.

## 11. Next discriminating work (not performed)

- Read FR3110470A1 examples and granted claims (chunks 1, 3–7) for times, atmospheres and any assay data.
- Locate Keenat's LCA report and the CSS specification/permits.
- Obtain the Korean paving-stone study (tc-2026-060135) and compare its assay panel with any Keenat product data.
- Define the product/exposure criterion before any comparison with S2-01/S2-03.
