# Ranking — cigarette butts

```
file: ranking.md
version: v0.1
date: 2026-11-26 (session 10, Phase 5)
status: draft — Phase 5 output; Phase 7 review rounds may revise
basis: shelf state after session 9 (M-01..M-08 full plans, INV-01 v0.1, batch-02 proposals, 22 registry cards)
scoring: 1-5 per factor, 5 = favorable; every score carries a one-line justification; total 6-30
```

**What was scored (36 items).** Table A: the nine route-level candidates — the eight full action plans (M-01..M-08) plus the Phase 4 invention INV-01. Table B: the five scientist-inventor batch-02 proposals (scored for comparison only — they are enablement components, not complete routes). Table C: all 22 registry summary cards. H1/H2/H3 of `inventions/candidate-hypotheses-01.md` are NOT scored separately: INV-01 explicitly inherited them (`prior_project_hypotheses_inherited` in its metadata), and scoring them twice would double-count.

**Two gates bind every product-facing score before any factor is read:**

1. **Metals stop-condition (charter):** Cd/Pb/As/Hg uncharacterised in a route's PRODUCT means that route is on hold for product-facing work. On this shelf, product metals have never been measured for M-01/M-02/M-03/M-04/M-05/INV-01, and TerraCycle's own 2013 deck lists the metals with no concentrations — so every Product-usefulness score below 4 carries this gate. The ONE published exception is M-08: fired bricks passed the leaching gate with ICP-MS across pH 2.5-9.2 (Kurmus Ch.5) and the PAH gate (Ch.6) — the only route with metals-gate DATA, which is why it ranks first.
2. **No clean/safe/validated claims (charter):** a high evidence score means the SOURCES measured things, never that a product is safe. The team's lab decides.

Material-specific factors: the ranking template allows extra columns from material.yaml — butt-lab has no material.yaml yet, so the six standard factors are used as-is. If a material.yaml appears before migration, append its factors with their own rubrics and re-total.

## Table A — route-level ranking (9 items)

| Rank | Method | Cost & equipment | Small-scale feasibility | Safety | Evidence strength | Product usefulness | Legal status | Total | Note |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | M-08 RMIT fired-clay bricks | 4 | 5 | 4 | 5 | 4 | 5 | 27 | Only route with published metals-gate data (fired bricks pass leaching + PAH gates); most accessible lab program |
| 2 | M-03 UnB alkaline pulping | 5 | 5 | 3 | 5 | 3 | 5 | 26 | Strongest experimental base (peer-reviewed 35-cook characterization) + expired patent; pulp metals never measured |
| 3 | M-02 De Fenzo wash + film | 5 | 5 | 3 | 4 | 3 | 5 | 25 | Cheapest chemistry, peer-reviewed product characterization, no blocking patent; no removal-efficiency numbers; gate binds |
| 4 | M-01 Mego water wash | 4 | 4 | 3 | 2 | 4 | 2 | 19 | Most complete patent protocol, zero quantitative performance data; active FR patent to 2037 |
| 5 | M-07 whole-butt pyrolysis | 2 | 3 | 2 | 4 | 2 | 5 | 18 | Numbers confirmed by two sources; 200 g ceiling; products are assay streams, not products; furnace-lab hazard class |
| 6 | INV-01 split-loop refinery | 3 | 4 | 2 | 2 | 3 | 3 | 17 | Components proven, integration untested — ranked mid exactly as its falsifier ledger predicts |
| 7 | M-04 Keenat dry thermal | 3 | 3 | 2 | 2 | 2 | 3 | 15 | Decontamination premise unmeasured; operator abandoned the route on its own LCA |
| 8 | M-06 TerraCycle route | 1 | 1 | 2 | 3 | 2 | 5 | 14 | Trade secret by design — nothing to replicate; best logistics record on the registry |
| 9 | M-05 TchaoMegot SC-CO2 | 1 | 2 | 2 | 2 | 3 | 1 | 11 | Certified pressure plant + zero performance data in the whole family + broadest active blocking family |

### Score justifications — Table A

Each bullet is the one-line justification for that factor's score.

**M-08 RMIT fired-clay bricks — 27**
- Cost & equipment 4: brick-lab equipment is ordinary (Hobart mixer, 105 degC oven, 1050 degC chamber furnace — Kurmus Ch.4); no solvents, no pressure; ICP-MS/GC-MS via partner lab.
- Small-scale feasibility 5: the entire published program is lab bricks at kg-batch scale (Ch.3-4); no continuous line involved.
- Safety 4: clay work is benign, but firing elevates CO/CO2/HCN vs plain bricks (5% CBs: CO 5.8x, Mohajerani 2016 via Torkashvand) — exhaust extraction; unfired/shredded CB material leaches metals (Ch.5) — fired-only rule.
- Evidence strength 5: the registry's only standards-based multi-gate program — strength/density/conductivity (Ch.3-4), furnace-logged energy (Ch.4), ABLP/TCLP ICP-MS leaching pH 2.5-9.2 (Ch.5), 16-EPA-PAH screen below hazard thresholds (Ch.6), bacteriology + UVC odor (Ch.7-8).
- Product usefulness 4: fired 1% bricks hold 30.8 MPa (load-bearing band 5-10 MPa) with published leach compliance — the ONLY product on the registry that has passed a metals gate; capped because 1% loading makes butts an additive, not a recycling answer, and durability is untested.
- Legal status 5: research publication; no known patent blocking (registry).

**M-03 UnB alkaline pulping — 26**
- Cost & equipment 5: NaOH 1% + HCl + pot/hotplate + blender + hand sheet mold — commodity chemicals only.
- Small-scale feasibility 5: demonstrated from 233 g analysis cooks to a 50 L pilot; the plan's 10 L/kg basis is bench-ready.
- Safety 3: atmospheric throughout (no pressure), but dark liquor is the hazard center — nicotine 35.4 g/L measured (dermally toxic), NNK 3,057 ng/mL, COD ~30 g/L; caustic cook + HCl acidification; never to drain.
- Evidence strength 5: peer-reviewed full protocol (Teixeira 2017, Waste Management) with 35-cook liquor characterization, FT-IR deacetylation kinetics, 7-cycle reuse loop; expired patent + operating pilot.
- Product usefulness 3: pulp sold to a cardboard factory (company self-report); whiteness 54.16% keeps it in brown/grey grades; PULP metals never measured (row 8) — gate binds.
- Legal status 5: BR0305004B1 expired under both term interpretations (computed 2023-10-06 filing term / 2024-11-11 grant term); free to use.

**M-02 De Fenzo wash + film — 25**
- Cost & equipment 5: water/ethanol/acetone + beakers + oven — the cheapest chemistry on the registry.
- Small-scale feasibility 5: designed at grams; kg batches are repetitions of the same bench sequence; solvent cost is the scale driver (row 10), not feasibility.
- Safety 3: acetone flash ~-20 degC, ethanol ~13 degC — fume hood; spent liquors carry nicotine/PAHs = hazardous wastewater; no severe acute hazard beyond flammability + nicotine.
- Evidence strength 4: peer-reviewed with full product characterization (FTIR bands; Tg 192 vs 193 degC; 367 degC degradation peak; TGA residue ~10%) and a replicable published recipe; no removal-efficiency numbers (row 8) keep it below 5.
- Product usefulness 3: recovered CA proven chemically equivalent to virgin CA; film demonstrated but brittle (plasticizer proposal: triacetin 20 wt%, row 6); product value conditional on the metals gate (row 9: never measured).
- Legal status 5: no known blocking patent (registry).

**M-01 Mego water wash — 19**
- Cost & equipment 4: bench equivalents are cheap (20-50 L tanks, pump, sieve shaker, oven, bench mill); the 314 t press variant is optional, not required.
- Small-scale feasibility 4: batch tanks at kg scale work; the patent's continuous 1 kg/min line miniaturizes naturally.
- Safety 3: water-based core, but spent washes are nicotine-bearing hazardous wastewater, dry-milling dust is explosible and toxic, ethanol polish is flammable.
- Evidence strength 2: the granted B1 is the most complete numeric protocol among patents yet discloses NO yield/purity/removal numbers ("decrease drastically" only); mechanism corroborated externally (De Fenzo 50 degC stage; C-16 recipe) but the process itself has zero quantitative support.
- Product usefulness 4: a named product spec exists (<1500 um CA fine particles; optional 350 degC plates) matching demonstrated CA-recovery products; row 11 gate binds (metals never measured).
- Legal status 2: active granted FR patent, expiry 2037-05-15 (annuities paid through 2026-04-16); blocks commercial use in France; lab verification only as French law allows.

**M-07 whole-butt pyrolysis — 18**
- Cost & equipment 2: fixed-bed furnace + GC-TCD/GC-MS + gas analyser + scrubber train = instrument lab; a partner facility is the realistic path.
- Small-scale feasibility 3: the 200 g fixed bed is the largest whole-butt reactor in the field (Chemosphere 2026); batchable but instrumentation-heavy; no continuous-run data.
- Safety 2: 650-750 degC on toxic waste; CO measured at 8% of product gas, HCN class unmeasured; PAH-laden condenser tars; oil carries nicotine-derived alkaloids 7.95-11.17% area.
- Evidence strength 4: peer-reviewed full text (JAAP 2023) with exact yield triplets each summing ~100 wt%, independently confirmed post-dating by Chemosphere 2026; single group, no independent replication, no pilot — not 5.
- Product usefulness 2: oil is NOT blend-ready (alkaloids + phenols; purification uncosted); char adsorbent candidacy gated by uncharacterized trace metals (row 4); gas CV never measured — today the route yields assay streams, not products.
- Legal status 5: research publications; no known patent blocking.

**INV-01 split-loop refinery — 17**
- Cost & equipment 3: integrates M-01 tanks + M-02 ethanol polish + M-03 cook + chitosan jar tests + a partner furnace and partner assays — more unit operations than any single route, all bench-class except S5/assays.
- Small-scale feasibility 4: explicitly pilot-shaped (10 kg batch cycle, five weighed streams); its core deliverable — the weighed toxicant mass balance — works best small.
- Safety 2: inherits every component hazard (nicotine liquors to 35.4 g/L, caustic cook, flammable ethanol, explosible fines, 650 degC destructor) and adds integration complexity; no pressure anywhere and each unit op bounded — still the widest hazard surface of the wet routes.
- Evidence strength 2: an invented composite — every component source-backed, but the integration claims (sink-stream cook, unified liquor train, two-stage condensate) are untested, exactly as its 6-row falsifier ledger states.
- Product usefulness 3: up to three product streams (S1 CA, S2 pulp, S5 condensate), ALL conditional on the ICP-MS gate and falsifiers 1/2/5; the route's guaranteed output is the mass-balance dataset itself.
- Legal status 3: built from expired (UnB) and patent-free components, but Stage B/C replicate the ACTIVE Mego disclosure — commercial use needs an FTO check; research use plausible.

**M-04 Keenat dry thermal — 15**
- Cost & equipment 3: oven + grinder are cheap; extruder compounding plus DESIGNED off-gas capture are polymer-lab items.
- Small-scale feasibility 3: batchable (3-12 h oven dwell is slow); extrusion bench-scale fine.
- Safety 2: the route evaporates toxics BY DESIGN (PAHs named; nicotine bp ~247 degC is not destroyed at 80-240 degC) with no capture spec in the patent; dry nicotine-bearing dust; condensate/carbon = hazardous waste.
- Evidence strength 2: mechanical properties ISO-measured in the patent examples (PA11+30%: 48 MPa max stress), but the decontamination premise has zero measured support — the "~200 degC destroys nicotine/phenol/pesticides" claim is NOT in the primary text (Phase 5 registry correction); the operator abandoned the route on its own LCA.
- Product usefulness 2: pellets for street furniture are real (mechanical data published) but the operator ceased material recycling (cost + pollutant-fate, self-report) and the metals gate binds (row 10).
- Legal status 3: FR3110470A1 shows no grant event in the A1 file; EP3912739 unverified; X citations against composite claims 15-17 — uncertainty, not freedom.

**M-06 TerraCycle route — 14**
- Cost & equipment 1: nothing to buy or build — the process core is a trade secret (zero patents, zero filing mentions; withheld by design), all reprocessing contracted out; replication is impossible from public data.
- Small-scale feasibility 1: no process numbers exist at any scale; the only documented scale is the operator's own logistics.
- Safety 2: outputs are nicotine-bearing by the operator's own end-use restriction; compost stream hazardous; gamma parameters withheld — no assumed safety.
- Evidence strength 3: the registry's best-documented LOGISTICS record (press corpus, Bloomberg 2022 read in full, the 2013 PE INTERNATIONAL toxicity deck, a 14-point growth curve, computed ~0.016% capture rate) wrapped around a black-box process — scored for process replicability, hence mid.
- Product usefulness 2: industrial plastic products are real but downcycled (playground/outdoor furniture per Szaky), nicotine-bearing, no public specs; its own LCA names transport + packaging the dominant burden — the route's lesson is that collection binds.
- Legal status 5: zero patents (USPTO assignee search, v0.4-verified); trade secret; no blocking claims.

**M-05 TchaoMegot SC-CO2 — 11**
- Cost & equipment 1: a certified SC-CO2 plant (0.2-1500 L chambers, 280-320 bar class) is partner-facility-only; the charter's no-DIY-pressure rule is absolute here.
- Small-scale feasibility 2: 5-20 L lab extractors exist at partner facilities; batch contact 1 min-8 h; never student-lab equipment.
- Safety 2: 300 bar stored energy is lethal-class; CO2 asphyxiation; flammable co-solvent under pressure; HP6/HP14 concentrate stream.
- Evidence strength 2: granted family (FR3102075B1, FR3102076B3, US12065781B2) with ZERO quantitative performance data in any of the four primary documents (M-05's verdict); the circulating 99.7%/0.3% figures are not in the patents (Phase 5 correction).
- Product usefulness 3: insulation boards (15% Trevira binder, 170 degC/15 min cure) carry granted use claims and a real product shape; no thermal/fire numbers anywhere; metals gate binds.
- Legal status 1: active multi-jurisdiction granted family, ~2039-2040 expiry — the broadest active blocking family on the registry.

## Table B — batch-02 invention proposals (scored for comparison; components, not routes)

Basis: `inventions/scientist-inventor-batch-02-proposals.md` (2026-11-17; `ai_proposal`/`ai_inference`; simulations computed, nothing measured). P-numbers follow the file's order; rows are ordered by total. Their value is measured by what they de-risk in the ranked routes, not by their own outputs.

| Proposal | Cost & equipment | Small-scale feasibility | Safety | Evidence strength | Product usefulness | Legal status | Total | One-line verdict |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| P1 M01-Gate — dry pneumatic + triboelectric pre-fractionation | 4 | 4 | 4 | 1 | 2 | 5 | 20 | Highest-leverage add-on to ANY wet route — diverts metals-rich ash/tobacco before wetting; pure proposal, no product of its own |
| P2 J-H-01-M — counter-current wash + GAC/IDA polish | 4 | 4 | 3 | 2 | 2 | 5 | 20 | Converts dissolved toxins into weighable spent media; computed simulation only (cycle-20 nicotine 517.6 mg/L at 15% purge) |
| P5 F5-ED — alkaline deacetylation + BMED NaOAc split | 2 | 3 | 3 | 2 | 3 | 5 | 18 | Directly answers M-03's sodium-accumulation falsifier (row 7) — recovers NaOH + acetic acid; BMED is specialty equipment |
| P3 F3-SC — microfiltration + staged EtOH/CO2 antisolvent | 2 | 3 | 2 | 2 | 3 | 4 | 16 | Highest-purity CA target; scCO2/pervaporation = partner equipment; FTO of the F3 base unverified |
| P4 F2-VSC — vacuum-vented extrusion + acid/S-GAC capture | 3 | 3 | 2 | 2 | 2 | 4 | 16 | The simulation itself shows 98-99% of Cd/Pb mass RETAINED in the composite — the metals gate binds hardest here |

Score justifications (compressed per row):
- P1: Cost 4 — air classifier + triboelectric belt are bench/industrial-lite items; Safety 4 — dry, chemical-free, dust controls only; Evidence 1 — gap-closing note + falsification test only, nothing measured; Product 2 — enablement component; Legal 5 — no claims identified.
- P2: Cost 4 — tanks + GAC/IDA columns are standard water-treatment kit; Evidence 2 — computed simulation, no measurement; Safety 3 — nicotine liquors plus a NEW weighable hazardous solid (spent media); Product 2 / Legal 5 — enablement, no blocking claims.
- P5 F5-ED: Cost 2 — BMED electrodialysis is specialty lab equipment; Evidence 2 — M-03 base demonstrated (61.2 kg pulp / 75.8 kg NaOAc computed) + BMED is a standard salt-splitting unit op, but the combination is simulated only; Product 3 — pulp + recovered NaOH + acetic acid; Legal 5 — UnB base expired.
- P3 F3-SC: Cost 2 — scCO2 + pervaporation = partner equipment; Evidence 2 — simulated (9.8 mg/kg nicotine with staged EtOH/CO2 vs 78.3 mg/kg with plain water antisolvent — `ai_proposal` numbers); Safety 2 — pressure + flammables; Product 3 — highest-purity CA target; Legal 4 — F3 base status unverified, CN106928486 adjacency is CN-only.
- P4 F2-VSC: Cost 3 — twin-screw + capture train = polymer lab; Evidence 2 — dilution arithmetic, not measurement; Product 2 — the simulation RETAINS 98-99% of Cd/Pb in the product, so the gate binds hardest; Safety 2 — by-design off-gassing of nicotine/Hg needs the acid condenser + S-GAC bed to actually work; Legal 4 — unverified.

## Table C — registry summary cards (22 items)

Compact form: scores in the table; the Note column carries the justifications compressed (extreme scores justified first). Full per-card context lives in `methods/_cards.md`.

| Card | Cost & equipment | Small-scale feasibility | Safety | Evidence strength | Product usefulness | Legal status | Total | Note (justifications) |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| C-16 academic-green-ethanol-wash | 5 | 5 | 3 | 4 | 3 | 5 | 25 | Cost/Scale 5 beaker chemistry; Evidence 4 peer-reviewed recipe (50 degC/60 min -> 3 rinses -> 2x ethanol 99%); Legal 5 no block. DUPLICATE of M-02's source — already folded into M-01 row 6 / INV-01 Stage C; never run as a separate route |
| C-05 us20140287144-abandoned | 4 | 4 | 3 | 2 | 2 | 5 | 20 | Legal 5 ABANDONED — free to use; Evidence 2 short abandoned filing; Product 2 covers FACTORY acetate waste, not post-consumer butts |
| C-06 us5504119-expired | 4 | 4 | 3 | 2 | 2 | 5 | 20 | Legal 5 EXPIRED (1994) — the free-to-use prior-art backbone for any team solvent route; Evidence 2 unextracted but only needed as prior art |
| C-17 academic-acetic-acid-route | 4 | 3 | 3 | 2 | 3 | 5 | 20 | Cost 4 green commodity solvent; Evidence 2 abstract-level (2025); overlaps C-07 chemistry with academic rigor; Legal 5 |
| C-18 academic-ca-membranes | 3 | 3 | 3 | 2 | 3 | 5 | 19 | Product 3 high-value end-use but performance vs virgin CA `parameter_not_located`; Evidence 2 two peer-reviewed papers, specs unextracted; Legal 5 |
| C-13 kalabak-ethanol-fuel | 4 | 4 | 3 | 2 | 2 | 3 | 18 | Cost 4 recipe fully published (5-320 g/L, 5-60 min); Evidence 2 quantities disclosed, endpoint unvalidated; Product 2 uncharacterized extract is not a fuel product (M-07 row 2 concern class); Legal 3 EP pending |
| C-19 cigarette-butt-asphalt | 3 | 2 | 3 | 2 | 3 | 5 | 18 | Scale 2 road-scale; Evidence 2 registry-level, Marshall stability unverified; Product 3 encapsulation (105 degC/24 h) mandatory because CBs are toxic — shares M-08's encapsulation logic; Legal 5 |
| C-20 concrete-additive | 4 | 3 | 3 | 1 | 2 | 5 | 18 | Evidence 1 no specific study read — weakest construction card; Product 2 water-absorption/degradation risk (`ai_inference`); Cost 4; Legal 5 |
| C-22 cnr-knowledge-share-ca-recovery | 3 | 3 | 3 | 2 | 3 | 4 | 18 | Evidence 2 evidence file exists but offering-stage TRL unverified; Product 3 claimed uses match the CNR ecosystem (M-02/C-01 adjacency); Legal 4 licensing route, status unclear on page |
| C-14 matteri-ep2520184a1 | 3 | 3 | 3 | 1 | 2 | 5 | 17 | Legal 5 deemed withdrawn 2013 — free to use; Evidence 1 washing parameters never extracted; Product 2 |
| C-21 3d-printing-filament | 3 | 3 | 3 | 1 | 3 | 4 | 17 | Evidence 1 startup coverage only, specs/printing parameters unlocated; Product 3 FDM filament plausible with plasticizer/drying control (`ai_inference`); Legal 4 no patent located, method unknown |
| C-07 cn106928486 | 3 | 3 | 3 | 2 | 3 | 2 | 16 | Evidence 2 primary-source-read; 58-92% recovery is a patent assertion with unresolved denominator; Product 3 CA recovery; Legal 2 CN-only grant |
| C-04 burich-us7560059 | 3 | 3 | 3 | 1 | 2 | 3 | 15 | Evidence 1 unextracted; Legal 3 granted 2009 — expiry check owed; Safety 3 acetone wetting |
| C-12 kr20160005298 | 3 | 3 | 3 | 1 | 2 | 3 | 15 | Evidence 1 unextracted; Legal 3 KR-only; Product 2 |
| C-15 kr-microbial-composting | 4 | 3 | 3 | 1 | 2 | 2 | 15 | Cost 4 low-tech composting; Evidence 1 strains/time/temperature absent — CA biodegradation slow/unproven (`ai_inference`); Legal 2 KR granted 2018 |
| C-02 cerdia-ca-recovery | 3 | 2 | 3 | 2 | 3 | 1 | 14 | Evidence 2 filing unextracted but the applicant operates acetate tow plants (most credible CA-recovery claimant); Legal 1 newest active filing = highest FTO risk on the shelf; single highest-value unextracted item |
| C-03 huang-us10980272 | 3 | 3 | 3 | 2 | 2 | 1 | 14 | Evidence 2 apparatus patent read, chemistry/performance absent; Legal 1 active to ~2039-06-04; Product 2 apparatus only |
| C-08 cn111822484 | 3 | 3 | 3 | 1 | 2 | 2 | 14 | Evidence 1 unextracted Chinese filing; Product 2 filter-rod regeneration serves the tobacco loop, not waste; Legal 2 status unknown |
| C-01 cnr-mask-filters | 3 | 3 | 2 | 1 | 2 | 2 | 13 | Safety 2 contact product with disinfection chemistry `parameter_not_located`; Evidence 1 abstract-level; Product 2 never passed a filtration standard on record; Legal 2 active pandemic-era family |
| C-11 cn108807014-supercapacitor | 2 | 2 | 3 | 2 | 2 | 2 | 13 | Evidence 2 mirrors the peer-reviewed 330.1 F/g result verified in M-07's companion line; Cost/Scale 2 activation line; Legal 2 |
| C-09 cn111118670-carbon-fiber | 2 | 2 | 3 | 1 | 2 | 2 | 12 | Evidence 1 unextracted; industrial applicability doubtful given feed heterogeneity (`ai_inference`); Cost/Scale 2 carbonization line |
| C-10 cn107946082-graphene | 2 | 2 | 3 | 1 | 2 | 2 | 12 | Evidence 1 unextracted; materials-family adjacency (M-07 companion line); Legal 2 |

## Factor rubrics (template, verbatim)

- Cost & equipment access: 5 = available to a student lab; 1 = industrial-only
- Small-scale feasibility: 5 = works at kg-per-batch scale with simple setup; 1 = needs a continuous industrial line
- Safety: 5 = benign chemicals and conditions; 1 = severe acute hazards
- Evidence strength: 5 = peer-reviewed experimental support; 1 = marketing claims only
- Product usefulness: 5 = product the team can use or sell; 1 = no usable output
- Legal status: 5 = expired, abandoned, or no blocking claims; 1 = active broad patent family

Material-specific factors (if any) are listed in material.yaml and appended as extra columns with their own rubrics. butt-lab has no material.yaml — none appended.

## How to read this ranking

1. **The top three win for the same reason — and are blocked at the same place.** M-08, M-03 and M-02 hold the three strongest experimental bases and the three most accessible equipment profiles. All three hit the SAME wall: product metals never measured (M-08 is the exception — its FIRED product passed). The metals gate is therefore not one constraint among many; it is THE shared gate, and the test-first list opens with it.
2. **M-01 outranks its evidence score because its product spec is concrete.** The patent discloses no numbers (Evidence 2) but names a product, a process chain and QC criteria a bench can replicate; the price is the active FR patent (Legal 2). Treat it as the process donor it already is inside INV-01.
3. **INV-01 ranks mid on purpose.** An untested integration of proven components should not outscore its own components until its falsifiers are decided. Its two kill tests (sink-pulp, unified loop) are on the test-first list, and its guaranteed output — the weighed toxicant mass balance — is the field's missing artifact (Chemosphere 2026; INERIS 2018).
4. **The bottom two fail for opposite reasons.** M-05 is blocked by equipment (certified pressure plant), a void of performance data and the broadest active patent family; M-06 is blocked by design (trade secret). Neither carries new process information for the team; M-06's transferable content is logistics reality — collection binds (~0.016% capture; transport + packaging dominate its own LCA).
5. **What would change the ranking.** (a) Metals-gate results: an ICP-MS pass on product streams unfreezes the Product rows of M-01/M-02/M-03/INV-01 and re-totals the top of the table. (b) The C-02 Cerdia spec extraction (highest-value unextracted item) could redraw the FTO column. (c) INV-01 falsifier outcomes move it above or below M-01. (d) If the full PE INTERNATIONAL inventory report behind the 2013 deck ever surfaces, M-06's evidence row upgrades.

## Test first (for the team)

Ordered by information value; each tied to the gap-fill rows it confirms or kills, with the expected measurement and the decision rule. Desk research authorizes no physical trial — every item needs a qualified facility, a risk assessment, lawful waste handling and a named human actor before it runs.

1. **Metals characterization gate — ICP-MS (Cd, Pb, As, Hg + Cr, Ni, Se) on the feed, then on first-run product streams.**
   - Ties: charter stop-condition; M-01 row 11, M-02 row 9, M-03 row 8, M-04 row 10, M-05 row 6, M-06 row 10, M-07 row 4; INV-01 falsifier 4.
   - Expected measurement: mg/kg dry basis per metal in (a) raw local feedstock, (b) whichever product stream runs first (S1 CA / washed pulp / cleaned fiber / pellets), (c) the concentrate streams (S4 sludges, pyrolysis char, recycler sludge), (d) M-08 fired vs unfired bricks if the matrix runs.
   - Decision rule: any gate metal above the team's use-gate in a PRODUCT stream keeps the stop-condition on for that route (the route then produces characterization data, not products); concentration into S4/char confirms INV-01's routing prediction; fired-brick leach results re-verify the only published metals pass on local feedstock. Cheapest first step: characterize the raw feed — it needs no processing line.
2. **Sink-pulp sheet trial — INV-01's top falsifier, starting with a 100 g float/sink run that doubles as the split-purity test.**
   - Ties: INV-01 falsifiers 1 and 3 (the float/sink pre-step is M-01 row 3's criterion); M-03 rows 2, 4, 10 re-based to the sink stream.
   - Expected measurement: sunken-paper removal (<10% residual paper in the floated CA after pass 1) and hand-sheet traction index vs the Teixeira Table-4 band (5-12 kNm/kg, partner-lab tensile).
   - Decision rule: sheet collapses after ratio adjustment (10 -> 32 L/kg) → drop Stage D; the route falls back to M-01+M-02 with a destructor tail (fallback documented in INV-01 9.1); sheet holds → the unified-loop drift test becomes the next kill shot.
3. **M-08 replication matrix on LOCAL clay + local butts (0.5 / 1 / 1.5 / 2 wt%, 1050 degC / 3 h) with the leaching gate.**
   - Ties: M-08 rows 1, 4, 5, 9, 10; the ranking's top route.
   - Expected measurement: compressive strength vs the 30.8 MPa (1 wt%) band; thermal conductivity vs the -15.1% drop; furnace kWh vs the measured -8.0%; ABLP/ICP-MS leachate with per-metal margin-to-limit computed at each pH 2.5-9.2 (row 5).
   - Decision rule: local feedstock reproduces the sweet spot AND fired bricks leach below limits with quantified margins → M-08 stays the only route through the metals gate; margins tighter than the thesis figures → the bitumen/paraffin encapsulation pre-tests (Kurmus Ch.5) enter the queue before any use claim.

**Next queue (after the top three):** (4) unified-loop 5-cycle drift test (INV-01 falsifier 2; M-01 row 7; M-03 row 7 — plateau below the 50 mg/L nicotine cap at 20% bleed, else split trains); (5) M-02 50 g wash replication + product-equivalence QC (M-02 verify items 1-2), then film/triacetin trials (rows 5-6); (6) Stage-F condensate calibrated GC-MS — is triacetin actually in the 150-200 degC fraction? (INV-01 falsifier 5); (7) S4 mass-band weigh vs the 3-7 wt% proposal (INV-01 falsifier 6); (8) M-07 oil truth test — calibrated GC-MS + fuel-spec panel at 650 vs 750 degC (M-07 rows 2, 5, 8); (9) M-04 stage-b truth test (M-04 rows 1, 2, 4) only if the team ever takes a dry-thermal route; (10) M-05 partner-facility decontamination matrix (M-05 rows 1, 2, 4, 5) only with a certified extractor partner.
