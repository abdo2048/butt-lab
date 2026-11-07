---
batch: batch-01
stage: 3
round: "01"
slot: C
packet_version: "v1.1"
packet_commit: "5f484b585ca16dbd2ce93b56c61c962f5f14c774"
date: "2026-11-06"
service: "Freebuff (Buffy coding agent), local repository checkout"
displayed_model: "DeepSeek V4.1 Flash (as displayed by the host); actual model weights unverified"
sources_supplied: true
sources_fetched_by_worker: []
identity_limits: >-
  All evidence is second-hand (packet-level): I fetched no URL. Packet author is a
  single same-author AUTO pass (plus a same-author errata pass); I cannot verify
  whether my model family overlaps the packet author's. No peer or judge report read.
---

# Stage 3, batch-01, round 01 — slot C

### 0. Access receipt (outside the schema body)

Read in this session, all present, all readable, no omissions: `question.md`, `evidence-index.md`, `output-schema.md`, `manifest.yaml`, `LAUNCH.md`, `COMMIT.txt`; `reports/stage1/` (3 files), `reports/stage2/` (3 files), `reports/gap-check-01.md`; `specs/` (7 files); `dossier/cautionary/` (3 files). Nothing missing, so no stop condition was triggered.

Integrity: payload blob hashes at `5f484b5` reproduce the manifest's SHA-256 for **20/20** files (e.g. `question.md` = `4f9721bf…`, `output-schema.md` = `3f781243…`, `keenat…md` = `fada4af4…`). Raw working-tree hashes differ for 17 files solely by CRLF insertion from `.gitattributes` (`* text=auto`) on this Windows checkout; `git status --porcelain` is empty. I therefore treat the payload as byte-identical in content and proceed. No packet file was edited.

**Source key (family → supplied file → identifier as transcribed there).** Reading extent for each file is stated in `evidence-index.md`; nothing below was re-fetched by me.

| Family | Supplied file(s) cited in this report | Identifier / document as recorded in the packet |
|---|---|---|
| F0 | `specs/de-fenzo-2020-source-reconstruction.md` | De Fenzo et al., *Materials* 13:4710 (PMC7659942) |
| F1 | `specs/mego-fr3066128a1-source-reconstruction.md`; `specs/company-workflow-dossiers-batch01.md` §1–§5 | FR3066128A1; Re-Cig, Code Effort, TerraCycle (official 3-step PDF), BuffIndia |
| F2 | `specs/keenat-fr3110470a1-source-reconstruction.md`; `dossier/cautionary/keenat-lca-retreat.md` | FR3110470A1 (chunks read: see spec §5); 2022 LCA retreat, secondary press |
| F3 | `specs/cn106928486-source-reconstruction.md`; `specs/company-workflow-dossiers-batch01.md` §6–§7; `reports/gap-check-01.md` | CN106928486A/B (A publication vs B granted claims distinguished); CNR/AzzeroCO2; Cerdia WO2026074041A2 (abstract only) |
| F4 | `specs/pressurized-fluid-reference.md` | FR3102180A1 family; CO₂ critical constants quoted from the patent passage |
| F5 | `specs/unb-pi0305004-source-reconstruction.md`; `dossier/cautionary/korean-paving-stones.md` | PI 0305004-1 (INPI record); Teixeira et al. 2017 via author summary; Poiato Recicla; Korean paving-stone comparator (secondary) |
| Cross-cutting | `reports/stage1/*`, `reports/stage2/assumption-and-gap-ledger.md`, `dossier/cautionary/ineris-waste-classification.md` | A-01…A-07, K-01…K-05, C-01…C-08, G-01…G-20; INERIS HP6/HP14 note |

### 2.1 Claim table (the core)

**Verdict semantics — attestation level.** `source-supported` means: the *cited supplied file* states the claim, in the section named. It does not mean I opened the primary document; I opened none in this session (§2.6). Every `source-supported` entry below is therefore a **transcription-level** attestation — "the packet says the source says" — one level weaker than a checked quotation, and the per-row tag is omitted only because it would apply to every row. A verdict of `source-supported` on a figure such as C-06, C-13 or C-20 attests the numbers *as transcribed*, not the patent page they came from. Citations resolve through `packets/batch-01/stage-3/evidence-index.md`, which maps each spec to its repository path and reading extent.

| ID | Claim (as stated, by whom) | Verdict | Source / section | Failure mode if wrong | Severity | Falsifier / next measurement |
|---|---|---|---|---|---|---|
| C-01 | A "clean process" yielding "high-quality" cellulose acetate (De Fenzo et al. 2020, title) implies the recovered polymer is contaminant-clear | `unresolved` | Title/abstract vs methods yielding only FTIR/DSC/TGA/SEM and one flame-AA result (0.04 ppm Ti, IDL <0.01 mg/L) — `specs/de-fenzo-2020…md` "What was actually evaluated" | "Clean" is read as detoxified and the material is sold or specified as such | fatal | Analyte panel on recovered CA (nicotine, NNN/NNK, 16 EPA PAHs, Cd/Pb/As/Hg) with mass closure against feed |
| C-02 | The recovered polymer is chemically the same material (identity, thermal behaviour) | `source-supported` | Same spec, §"What was actually evaluated"; 5 treated + 5 recovered samples | Identity is mistaken for purity | fixable | GPC molecular weight + residual analyte vs virgin tow |
| C-03 | The film is brittle and needs a plasticizer (§3.4 quotation) | `source-supported` | `specs/de-fenzo-2020…md`, §3.4 quote | Product performance and an extra additive stream are under-costed | fixable | Tensile/impact test with and without plasticizer; plasticizer leachate |
| C-04 | MéGo! operates a closed water loop, reused next cycle (company) | `unresolved` | `specs/mego…md` §6, §9 (Ouest-France 2018; Le Télégramme 2018); dossier §8.3 | A loop with no purge is a concentration loop, not a sink: contaminants accumulate until they leave in product or sludge | fatal | Water balance + purge flow + analyte concentration in loop water over N cycles |
| C-05 | 1 kg ≈ 2,000 butts = 80 % CA / 12 % paper-tobacco-ash / 8 % sludge, usable as a per-tonne material balance (company, via Capbiotek/Ouest-France) | `contradicted-by-source` (as a whole-butt basis) | `specs/mego…md` §4 (K-01/K-02) vs `specs/unb…md` §4 (~36 % acetate of a whole smoked butt) and Re-Cig 38.7 %/39.1 % | Recoverable acetate overstated ~2.2×; every per-tonne product and revenue figure built on it is wrong | fixable | Dry-mass sieve/floatation analysis of one defined butt batch; state the denominator |
| C-06 | ~39 % polymer yield on collected butt mass (Re-Cig) | `source-supported` (company accounting) | `specs/company-workflow-dossiers…md` §5 (15.50→6.00 kg; 6.12→2.39 kg) | If the denominator is wet mass, dry yield is overstated; no reject/moisture term | fixable | Moisture + dry-mass basis and reject masses for the same two lots |
| C-07 | Process water is sent to a certified external purification partner (Re-Cig) | `source-supported` (company) | dossier §5, §1 table | None if true; it establishes that an aqueous route generates a regulated effluent stream | unknown | Partner's permit and effluent data |
| C-08 | Process is "completely carbon neutral" (Code Effort) | `unresolved` | `reports/stage1/company-source-map.md` §4.1 (The Weekend Leader) | Environmental claim with no accounting; fails the Keenat-LCA benchmark by construction | fatal | Metered kWh/t, transport, chemical inputs vs displaced product |
| C-09 | 1,000 kg/day of butts in, "up to 3 t/day of fibre" out (Code Effort) | `contradicted-by-source` (internally) | company-source-map §4.1; dossier §2 | Mass out cannot be 3× mass in for a separation process; no per-tonne extrapolation is safe | fixable | Weighbridge/tally records; define period and product |
| C-10 | INR 200–400/kg paid for collected butts (one source 500–800) | `source-supported` (company) | company-source-map §4.1 | Feedstock alone is INR 200,000–400,000 per tonne before processing; no product price per tonne located, so margin arithmetic is impossible | unknown | Price per tonne of recovered fibre/paper + full cost stack |
| C-11 | CA powder is used in recycled plastic lumber — i.e. the product is "recycled" and implicitly cleaned (TerraCycle) | `unresolved` | dossier §3 (official 3-step PDF) | Encapsulation is read as detoxification; cleaning is not disclosed and not disproven | unknown | Lumber leachate + compost analyte panel; processing-partner identity |
| C-12 | Tobacco and paper are composted (TerraCycle) | `source-supported` (official PDF) | dossier §3 | A nicotine/TSNA-bearing fraction routed to compost may fail compost quality rules | fixable | Compost analyte panel against the applicable compost standard |
| C-13 | Composite is 10–30 % recycled filters, 70–90 % thermoplastic (Keenat patent) | `source-supported` | `specs/keenat…md` §3, §5 (FR3110470A1 description, chunk 2) | Not a defect but a scale constraint: 1 t of composite consumes 0.1–0.3 t filter; consuming 1 t of filters requires 3.3–10 t composite and 2.3–9 t thermoplastic | fixable | Declared thermoplastic source/supply and actual composite sales volume |
| C-14 | Step b "drying and depolluting" at 80–100 °C removes the toxic load | `unresolved` | `specs/keenat…md` §4 | At that temperature the plausible effect is drying plus partial volatilisation; anything removed leaves in air, and no off-gas treatment is described | fatal | Feed / treated fibre / off-gas condensate analyte balance |
| C-15 | "Dry" process, no liquid discharge (Keenat) | `source-supported` (company) | `specs/keenat…md` §3 company layer | "No liquid" is not "no emission": feed moisture is still evaporated and the extruder vents | fixable | Vent/stack measurement; water mass in feed |
| C-16 | The operator's own 2022 LCA found plastic-object recycling not environmentally beneficial; site closed; pivot to CSS | `source-supported` (company/press, secondary) | `dossier/cautionary/keenat-lca-retreat.md` | The material route's environmental claim fails on its own operator's accounting | fatal | The LCA report itself: functional unit, energy, transport, displaced material |
| C-17 | The same technology handles masks/gloves/gowns (Keenat) | `unresolved` | `specs/keenat…md` §3 company layer | Mixed polymers and biological load change both the composite and the emission profile | unknown | Feedstock specification and composite properties |
| C-18 | 58–92 % recovery, 92 % preferred (CN106928486) | `unresolved` | `specs/cn106928486…md` "Source-reported parameters"; `reports/gap-check-01.md` | No denominator: not a yield, and certainly not a detoxification figure | fatal | Example feed mass + recovery equation from the granted text |
| C-19 | Dissolution takes 2–4 h (claim 1) / 2 h preferred | `unresolved` as a cycle-time claim | `specs/cn106928486…md` table vs disclosed sequence | `[CALCULATION]` disclosed sequential holding: 18 h ethanol + 9 h water + 24 h dry (70 °C) + 2 h aging + 0.25–4 h acid + 3 h dry (80 °C) ≈ **56–60 h**; the headline 2 h is ≤4 % of the cycle, so vessel count and capital, not kinetics, set throughput | fixable | Per-vessel batch time and working volume |
| C-20 | 1–6 L acetic acid per kg of cigarette ends (claim 1) | `source-supported` | same spec, parameter table | 1–6 t of 8–18 mol/L acid solution per tonne of feed; no solvent recovery is disclosed, so the reagent inventory and corrosion duty are unquantified | fixable | Acid recovery %, makeup per tonne, materials specification |
| C-21 | Acetone soak → water antisolvent → acetone recovered by boiling; "low environmental impact" (CNR/AzzeroCO2) | `unresolved` | dossier §6 | The antisolvent step creates a large dilute acetone–water stream; its separation energy and flammability control (ATEX) dominate capital and operating cost | fixable | L/kg acetone and water, energy per kg acetone recovered, residual acetone in product |
| C-22 | Cleaning agent optionally recovered by distillation (Cerdia) | `unresolved` | dossier §7 (abstract only) | Patent signal only; no basis for any process or cost statement | unknown | Full description; recovered CA quality vs virgin tow |
| C-23 | 99.7 % "clean" fibre / 0.3 % total toxics concentrate (TchaoMegot) | `unresolved` | `specs/pressurized-fluid-reference.md` "Company statement, separately attributed" | `[CALCULATION]` if 0.3 % is mass, 1 t feed yields ~3 kg concentrate carrying essentially the whole toxin load; a 3 kg/t hazardous residue has no disclosed route. The separate "30 L fibre → 100 mL effluent" datum is 0.33 % v/v and **cannot** corroborate a mass ratio (loose-fibre bulk density is unstated) | fatal | Concentrate mass + per-analyte closure across fibre, concentrate, CO2 makeup, spent sorbent |
| C-24 | Process uses supercritical CO2; patent envelope 280–320 bar / 15–80 °C preferred vs press quote ~50/60 bar at ~30 °C | `unresolved` | `specs/pressurized-fluid-reference.md`; ledger C-02 | 50/60 bar and ~30 °C sit below CO2's 73.85 bar / 31 °C critical point, so the quote describes dense/subcritical CO2; the "supercritical" label and the quote cannot both be right, and a 60 bar and a 300 bar vessel are different cost classes | fixable | Nameplate rating, operating log, or the prefectural permit file |
| C-25 | "Low energy" (TchaoMegot) | `unresolved` | same spec, company statement | Compression to 300 bar plus depressurisation and CO2 makeup is an energy term nobody in the batch has metered | unknown | Metered kWh/t including compression, CO2 makeup, fibre conditioning |
| C-26 | "100 % utilisation" of the residue (UnB/Teixeira, secondary) | `source-supported` as a utilisation claim, **not** a mass yield | `specs/unb…md` §4 | `[CALCULATION]` deacetylation is stoichiometrically lossy: cellulose ceiling ≈ 56–66 % of acetate mass (DS 2.0–3.0; ≈61 % at DS 2.45; DS is **not** in the packet — assumption flagged), before paper/ash and process losses. Read as a yield, it overstates pulp mass by ~1.5–1.8× | fixable | Pulp dry mass per tonne dry feed |
| C-27 | The dark liquor is acid-precipitated and returned to pulping; a secondary review says it "could not be successfully treated with standard methods" | `contradicted-by-source` (one direction only) | `specs/unb…md` §5; ledger C-07 keeps both | If the review is right, F5's environmental case rests entirely on an unquantified wastewater train | fatal | COD/phenolic/metals/colour before and after the disclosed train, against a permit limit |
| C-28 | Poiato Recicla processes ~600,000 butts/month | `unresolved` (as a capacity datum) | `specs/unb…md` §8 company layer | `[CALCULATION]` at 0.286–0.5 g/butt that is 0.17–0.30 t/month ≈ **2.1–3.6 t/y** — ~6–10 % of MéGo!'s 35 t (2022) and ~0.6–1 % of Code Effort's claimed 1 t/day. The licensed industrial example of F5 is a pilot-scale operation | unknown | Weighbridge data; licence throughput limit |

### 2.2 Per-family verdict (F0…F5)

```
F0 — Sequence and material characterisation are real; "clean" is an inference the paper does not test.
Strongest evidence: specs/de-fenzo-2020…md, methods + §3.4 quotations (Materials 13:4710, PMC7659942)
Weakest link: G-01/G-02 — no batch mass balance, no multi-analyte panel; wash and ethanol loadings parameter-not-located
Severity: fixable (the claim is unsupported, not disproven; only a demonstrated metal/nicotine retention would be fatal)
Falsifier: analyte mass closure on recovered CA vs feed, with GPC molecular weight against virgin tow
Dissent/uncertainty: I cannot exclude that the authors' supplementary material contains the missing loadings; the packet says it was not located, not that it does not exist.
```

```
F1 — Most deployed and most comparable family; its evidence gap is the effluent/loop boundary, not the mechanism.
Strongest evidence: MéGo! FR3066128A1 abstract sequence (spec §3); Re-Cig 4-step company process with external wastewater (dossier §5)
Weakest link: G-01/G-08/G-03 — no purge, no water:feed ratio, no sludge analysis; and the 8 % sludge may be melted into the sold product
Severity: fixable in principle; fatal if the sludge stream is inside the product without a contaminant assay
Falsifier: loop water and sludge analyte concentrations over successive cycles, plus water balance with a measured purge
Dissent/uncertainty: the 80/12/8 split may legitimately be on a filter-fraction basis — the company never states the denominator, so my C-05 contradiction is conditional.
```

```
F2 — A thermoplastic compounding business with butts as minority filler; detoxification unproven and life-cycle benefit denied by its own operator.
Strongest evidence: FR3110470A1 description (10–30 % loading; 80–100 °C step b) — specs/keenat…md §3, §5
Weakest link: G-04 — no off-gas stream, no dwell time, no analyte data; plus dossier/cautionary/keenat-lca-retreat.md
Severity: fatal (for the environmental and detoxification claims as operated; not a proof of physical impossibility)
Falsifier: feed/treated/condensate analyte balance, composite leachate against a justified criterion, and the LCA report
Dissent/uncertainty: the ~200 °C press figure may describe an extruder stage the read chunks omit; if so, volatilisation-and-capture becomes plausible and my severity would drop.
```

```
F3 — Chemically the most coherent separation concept, and the least engineered in public.
Strongest evidence: CN106928486 claims 1–2 (75–95 °C / 2–4 h; 58–92 %) per gap-check-01.md; CNR offering; Cerdia as incumbent signal
Weakest link: G-06 — recovery denominator absent; plus no solvent-recovery or residual-solvent data anywhere
Severity: fixable (all failures are disclosure and engineering, not thermodynamics)
Falsifier: example feed mass + recovery equation + measured solvent recovery + polymer analyte panel
Dissent/uncertainty: dissolution can also co-precipitate dissolved contaminants with the polymer, so a "rejection" story is a hypothesis until partitioned.
```

```
F4 — Distinctive mechanism, internally inconsistent disclosure, and the largest unquantified cost item (pressure class).
Strongest evidence: FR3102180A1 description as transcribed in specs/pressurized-fluid-reference.md (envelopes, 0–2000 / 50–350 / 280–320 bar)
Weakest link: G-05 — 50/60 bar vs 280–320 bar unresolved; concentrate route undisclosed
Severity: unknown
Falsifier: nameplate pressure from permit or equipment record, plus concentrate mass and analyte closure
Dissent/uncertainty: a subcritical dense-CO2 process is not automatically worse at extracting non-polar organics; I am not claiming the 50/60 bar quote proves the mechanism fails.
```

```
F5 — Converts the polymer rather than recovering it; the waste train decides the whole case.
Strongest evidence: atlasofscience author summary of Teixeira et al. 2017; PI 0305004-1 dates from the UnB CDT page
Weakest link: G-07 — dark-liquor treatability contested; no pulp yield, no product assay
Severity: fixable, contingent — fatal if the effluent cannot meet a permit at below pulp value
Falsifier: measured effluent against permit limits plus pulp analyte panel, with a full dry-mass balance
Dissent/uncertainty: I could not read the primary paper, so my "100 % utilisation is not a yield" reading is arithmetic on stoichiometry, not a source quotation.
```

### 2.3 Answers to Q1–Q5

**Q1 — Product class.** Three product logics, not one, and only two of them can coherently claim "cleaning". (i) *Recovered acetate* (F0, F1, F3, F4): the claim is coherent because a carrier stream exists for contaminants to leave in — water, solvent, or dense fluid — and the polymer is physically separated from the tobacco/paper matrix. Coherence is not support: F1's carrier is a loop with no disclosed purge (C-04), F4's carrier yields an undisclosed 3 kg/t concentrate (C-23), and F0 has no mass balance at all. F3 has the strongest *structural* claim because a filtered solution plus antisolvent precipitation rejects insoluble matter by construction — but contaminant rejection is `unresolved`, not `source-supported`. (ii) *Composite/encapsulation* (F2; TerraCycle's lumber, C-11): the product intentionally retains the fibre, so "cleaning" is not the mechanism; the claim becomes "containment", which the Korean paving-stone comparator constrains but does not refute (secondary reporting; study not obtained) and which Keenat's own LCA then undercut (C-16). (iii) *Cellulose/paper* (F5): coherent only if the pulp is washed and the dark liquor treated; the paper is a high-surface-area, possibly skin-contact product, so retention matters most here. Critically, "not disclosed" applies to TerraCycle's cleaning step and to every operator's assay; "shown to fail" applies to nothing in this batch. No family has an independent assay.

**Q2 — Toxic fraction.** Every family has a *named* concentrate and none has a *characterised* or *routed* one: F0 wash water plus ethanol; F1 recycled wash water, 8 % sludge possibly melted into product, Re-Cig's external effluent; F2 heating off-gas and extruder vent (undisclosed); F3 acid/ethanol/water washes and CNR's "concentrated pollutant water"; F4 the 0.3 % concentrate; F5 dark liquor and HCl precipitate. Families with no disclosed sink at all: **F2** (no off-gas stream is even described) and **F1-as-MéGo!** (a loop with no purge and sludge inside the product). See §2.4.

**Q3 — Temperature/pressure plausibility.** Step boundaries matter more than the numbers. For F2, 80–100 °C is step b only: at atmospheric pressure that is a drying temperature, and my reading is drying plus partial volatilisation, not destruction — destruction needs time, oxygen and catalysis that the read text does not give. The ~200 °C figure is a company/press statement about "successive heatings" and must not be merged with the patent figure nor attributed to the extruder, whose profile is unread (C-01 in the ledger). If destruction is claimed at either temperature, the removed mass must exit in air — which creates the off-gas requirement the disclosure lacks. For F4, the two pressures are not a range but two different states: 280–320 bar / 15–80 °C is supercritical; ~50/60 bar at ~30 °C is below 73.85 bar and 31 °C, i.e. dense/subcritical. The patent's own CO₂ passage states those critical constants, so the quote and the "supercritical" label are mutually exclusive — a disclosure conflict, not an impossibility. For F0, 50 °C/60 min hot water is entirely plausible for nicotine removal and implausible as a metals-removal step; for F3, 75–95 °C acetic acid is plausible for dissolution and says nothing about contaminant partition; F5's conditions are simply not disclosed. Incomplete disclosure is not physical impossibility, and I do not treat it as such.

**Q4 — The one discriminating measurement.** A **dry-mass and analyte mass closure across all four exit streams, on one common feedstock**, reported as the *product-retained fraction per analyte class*. Design: one homogenised, moisture-measured lot of post-consumer butts, dried and milled, split into equal aliquots; panel = nicotine, NNN+NNK, 16 EPA PAHs, Cd/Pb/As/Hg, plus COD/TOC for aqueous streams; each family run at its own disclosed conditions (where undisclosed, its operator's published description replicated at lab scale — which requires a licensed facility and is not authorized here); every output weighed wet and dry, and each analyte summed as fraction-of-input across product, aqueous effluent, off-gas trap/condensate and solid reject, with spike-recovery blanks. Decision rule: ≥80 % of an analyte class retained in product means the family is a containment route, not a cleaning route; ≥80 % in an aqueous/solvent stream with <10 % in product means genuine separation, and the question shifts to the sink; closure below ~70 % means an unaccounted emission, which disqualifies the claim outright. This discriminates *between* families because the partition pattern is mechanism-specific — washing moves nicotine to water but leaves metals in fibre; dissolution moves both; thermal treatment moves volatiles to air and leaves metals; pulping moves everything to liquor; encapsulation leaves the load in the product. A single-family test would only validate that family.

**Q5 — What would change my mind.** Strongest: **F3**, on mechanism plus two industrial actors plus an incumbent filer. It would move from "chemically coherent, engineering unproven" to supported on (a) one example's feed mass and the recovery equation, (b) measured acid/acetone recovery and makeup per tonne, (c) a partitioned contaminant panel showing the polymer meets a stated purity criterion while the solvent and aqueous streams carry the load. Residual solvent in product would push it back down. Weakest: **F2**, because its detoxification is unproven at the disclosed temperature, it dilutes butts to a 10–30 % filler, and its own operator's LCA rejected the product. It would move if an off-gas stream were disclosed and measured, the composite passed a justified leachate criterion, and an LCA showed net benefit against displaced thermoplastic. Note my ranking is about the strength of the *cleaning claim*, not deployability: F1 is more deployable than F3 today, and I would not average the two questions into one verdict.

### 2.4 Stream/fate table

| Family | Product stream | Concentrate / waste stream(s) | Disclosed sink? | Lawful-disposal question |
|---|---|---|---|---|
| F0 | Recovered CA; research film | Hot (50 °C) and cold wash water; two ethanol 99 % washes; 60 °C drying vapour | No — no volumes, no treatment, no disposal route stated | Is nicotine/metal-bearing wash water trade effluent or hazardous waste? Where does solvent-wet ethanol waste go? |
| F1 | CA fibre, thermo-compressed sheets, paper | MéGo!: recycled wash + decontamination water (no purge), 8 % sludge melted into product, 12 % paper/tobacco/ash; Re-Cig: external effluent to partner; Code Effort: "reused" wastewater + 30-day compost; TerraCycle: compost + lumber | Partially — Re-Cig is the only operator naming an external treatment boundary; no characterisation anywhere | Sludge inside a sold product: is it still waste, and has End-of-Waste been granted? Compost: does it meet compost contaminant limits? Effluent: permit holder identity |
| F2 | Thermoplastic composite granulate/plates | F2 tobacco/paper fraction; heating off-gas; extruder vent gas; grinding dust; rejects; (company) CSS to cement kilns | No — the off-gas stream is not described at all | Air permit for nicotine/PAH-bearing vent gas; hazardous-waste status of a composite made from HP6/HP14 input; CSS combustion emission limits |
| F3 | Recovered CA (CN, CNR, Cerdia) | 8–18 mol/L acetic acid; ethanol pretreatment; aqueous washes to 2 µS/cm; filtrate; CNR concentrated pollutant water; Cerdia distillation residue | Named stream, no characterisation, no route; solvent recovery not disclosed | Distillation residue and acetone-water stream: hazardous waste? ATEX/flammability permitting; residual acid effluent neutralisation |
| F4 | "Cleaned" fibre for padding/insulation/textiles | 0.3 % concentrate; CO2 makeup; spent sorbent/filters; condensate | Concentrate cited, route undisclosed | 3 kg/t concentrate (if mass basis) as hazardous waste; pressure-vessel inspection regime; CO2 supply chain |
| F5 | Cellulose pulp, paper, card | Dark liquor (lignin, carbonyls, metals, nicotine, TSNA); HCl precipitate; alkaline wash water; alkali mist | Liquor recycled to pulping and acid-precipitated; discharge route undisclosed; treatability contested | Effluent permit for a high-COD, coloured, phenolic liquor; precipitate classification and transport; caustic handling |

Across the batch: **zero** families disclose a complete chain from input to a lawful sink for the toxic fraction. The Keenat precedent is the only case where the operator's own accounting closed that question — and it closed it negatively.

### 2.5 What the packet gets wrong or overstates

1. **MéGo!'s 80 % acetate split is used as a balance, not tested as a basis.** K-01/K-02 compute per-tonne tables from it, and A-01 flags only moisture. The figure conflicts with the ~36 % whole-butt acetate fraction the packet itself cites (`specs/unb…md` §4) and with Re-Cig's 38.7 %/39.1 %. Either the split is on a filter-fraction basis (then it must not sum with 12 % + 8 %), or it is wrong. The packet should present it as a material split of unknown denominator.
2. **The Keenat claim ledger's label conflicts with its own text.** `specs/keenat…md` §9 marks "~200 °C destroys nicotine/phenol/pesticides" as `[VERIFIED-SOURCE]` while §4 says it is unverified against the patent. It should be a company claim, `unresolved`.
3. **The two TchaoMegot ratios are presented as if mutually reinforcing.** 0.3 % is a mass split; "30 L fibre → 100 mL effluent" is 0.33 % v/v. Their numerical closeness is a coincidence of denominator, not corroboration.
4. **The Korean paving-stone and Keenat-LCA notes still carry more authority than their provenance allows**, notwithstanding the errata. "Direct precedent" and "directly undermines" should read: a secondary comparator that constrains the prior for encapsulation families; it shows no listed family failing.
5. **The INERIS HP6/HP14 premise is a cautionary note, not the source document**, yet it is labelled a "mandatory safety benchmark". Because it governs transport, storage and permitted sites, it is a first-order *cost* driver, not only a safety one; it should be marked as an unverified premise to be checked against the actual classification entry.
6. **The batch contains no cost, energy or LCA data for any family (G-16), yet several phrasings read as merit rankings** ("deployed mainstream", "chemically coherent", "best-documented failure"). They are mechanism descriptions. My Q4 answer is therefore deliberately a mass/analyte measurement rather than an LCA comparison: an LCA cannot discriminate here, because the denominators (dry mass, functional unit, displaced material) do not yet exist for any route.

### 2.6 Confidence and independence statement

**Verified myself.** All 23 release files present and readable; the 20 payload blob hashes at `5f484b5` reproduce the manifest exactly, with the CRLF-only working-tree difference explained and `git status` clean. All arithmetic in §2.1 (C-05, C-09, C-13, C-19, C-20, C-23, C-26, C-28) was recomputed here from packet-stated inputs; physical constants used are the CO₂ critical point (73.85 bar / 31.0 °C, quoted from the patent passage as transcribed) and the cellulose/acetyl repeat-unit masses (162.14 / 42.04 g·mol⁻¹, standard values). No efficiency, price, temperature or detection limit was invented; where a value is absent I wrote `parameter-not-located`.

**Accepted without independent check.** Everything about the sources themselves: I fetched **no URL** in this session. Every patent passage, company statement and paper section is second-hand through the packet's transcriptions, which are themselves a single same-author pass plus a same-author errata pass. The three specs I leaned on most (Keenat, CN106928486, UnB) are all `source-partially-read`; Keenat is chunks 0 and 2 of 8, Cerdia is abstract-only, and the UnB paper was never read in full. My conclusions are therefore about the *internal consistency and completeness of the public record*, not about what the processes do.

**Independence (checkable, not just asserted).** This report was written without reading any peer slot or judge output, without editing the registry, shared workflow state or any packet file, and without running the judge or advancing the stage. I read no `operator/` material. Beyond that self-account, one fact is auditable from the repository: no peer or judge file existed on disk during this session — `panels/batch-01/stage-3/round-01/` was created empty by me and no `worker-a`/`worker-b`/`judge` file exists anywhere in the tree — so exposure by path was not merely avoided but impossible, and my report was the only file in that directory when written. The session transcript is the remaining audit trail. My conclusions are my own and may contradict slots A and B; where I am uncertain I have said so rather than smoothing it.

**Citation convention.** This schema requires "the source and section/paragraph" per claim; it defines no reference-token syntax, and I introduced none. Each row names a repository path plus the section heading or parameter table it draws on. No URL is listed because no URL was opened: `sources_fetched_by_worker` is empty, and every URL or document identifier in this report (FR3066128A1, FR3110470A1, FR3102180A1, CN106928486B, PI 0305004-1, Materials 13:4710/PMC7659942, WO2026074041A2) is quoted from a supplied file, not resolved by me.

**Conflict of interest / prior exposure.** None declared; no prior session on this project. Identity limit: the host displays "DeepSeek V4.1 Flash". The packet records its author only as a single "Arena Agent Mode" session, so I cannot determine whether my model family overlaps the author's — a reader should not treat this as verified model diversity.
