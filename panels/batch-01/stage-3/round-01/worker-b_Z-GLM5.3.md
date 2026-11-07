# Stage-3 worker report — slot B (contaminants, exposure, assays and waste)

```yaml
batch: batch-01
stage: 3
round: "01"
slot: B
packet_version: "v1.1"
packet_commit: "5f484b585ca16dbd2ce93b56c61c962f5f14c774"
date: "2026-11-04"
service: "z.ai agent-mode chat session (sandboxed Linux workspace; Bash/Read/Write tools, web search and page fetch)"
displayed_model: "unknown (the interface does not display it; session configuration indicates the underlying model is zgo/glm-5.3)"
sources_supplied: true
sources_fetched_by_worker:
  - "https://pmc.ncbi.nlm.nih.gov/articles/PMC7659942/"
  - "https://www.generationsanstabac.org/en/actualites/coree-du-sud-le-recyclage-des-megots-de-cigarettes-mis-en-echec"
  - "https://repositorio.unb.br/handle/10482/22749?mode=full"
  - "https://patents.google.com/patent/FR3102180A1/en"
  - "https://patents.google.com/patent/FR3110470A1/en"
  - "https://patents.google.com/patent/CN106928486B/en"
  - "https://www.cy-clope.com/rapport-ineris-etude-des-filieres-de-recyclage-des-megots"
identity_limits: "packet specs/ledgers are prior same-author readings treated as data, not verdicts; my primary-source fetches are single-pass HTML/abstract-level reads (Google Patents renders, one machine-translated), so numeric details from them need official-text confirmation; no peer, judge or Stage-4 material was accessible or read"
```

## 0. Provenance and access confirmation

- **Payload (20 files).** Retrieved by `git show` from the payload commit `5f484b585ca16dbd2ce93b56c61c962f5f14c774` (cloned repository, detached checkout; **not** HEAD). All 20 SHA-256 hashes were recomputed and match `manifest.yaml` **20/20**[^1]. No file was truncated; each was read in full.
- **Release metadata (3 files).** `manifest.yaml`, `LAUNCH.md`, `COMMIT.txt` read from the release/protocol snapshot `a20ada4895448d4fda1421088233b72fae2afb56`[^5][^6], as required by the two-commit rule.
- **Optional protocol context (5 files).** `START_HERE.md`, `FUSION_PROTOCOL.md`, `AGENTS.md`, `WORKFLOW.md`, `charter.md` read in full from the release snapshot.
- **Blind first pass.** No `panels/` directory exists at either commit; I read no peer output, judge report, critique, receipt, conversion, PDF bundle or Stage-4 material. No accidental peer exposure occurred.
- **Fetches by me (marked below).** De Fenzo full text (PMC)[^8]; the Korean paving-stone case (GST article + Tobacco Control citation)[^14][^15]; the UnB doctoral-thesis record that characterises the F5 dark liquor[^21]; fuller Google-Patents renders of FR3110470A1[^12], FR3102180A1[^19] and CN106928486B[^17]; the INERIS 2017 report (PDF snippet only — the download itself failed)[^26].
- **Failed accesses.** `re-cig.it/en/tecnologia/` (connect timeout), `tchaomegot.com/depollution/` (HTTP 503), ScienceDirect Teixeira abstract (HTTP 403), `atlasofscience.org` (bot interstitial), INERIS PDF (TLS reset). Claims resting only on those pages are attributed to the packet, not to my own check.

---

## 2.1 Claim table (slot B)

Verdict key: `source-supported` = the source says it (not that it is true or reproduced).

| ID | Claim (as stated, by whom) | Verdict | Source/section | Failure mode if wrong | Severity | Falsifier / next measurement |
|---|---|---|---|---|---|---|
| B-01 | "We have been able to reduce the toxicity level of the used butts and remove the bad sniff" (De Fenzo et al. 2020, Conclusions) | unresolved — asserted in the source, but the paper contains **no** toxicity endpoint (my full-text check[^8]: no nicotine/TSNA/PAH assay, no leachate test, n=5) | [^7][^8] | A "clean-process" narrative propagates with zero toxicological basis | fixable | Multi-analyte panel (nicotine, ΣTSNAs, ΣPAHs, Cd/Pb/As/Hg) on recovered CA + all wash liquors |
| B-02 | Metals: "absence of high concentrations of heavy metals", only Ti reported (0.04 ppm; instrument LOD <0.01 mg/L) (De Fenzo 2020, §3.1) | source-supported as a Ti result; the generalization to Cd/Pb/As/Hg is unsupported — those analytes are only discussed via cited literature | [^8] | Ti-only scope read as multi-metal clearance | fixable | Extend the AAS/ICP panel to Cd, Pb, As, Hg on a stated mass basis (mg/kg product) |
| B-03 | Ethanol washes "to remove potential organic compounds"; hot-water/cold-water wash liquors (De Fenzo 2020, §2) | source-supported as stated purpose; removal unverified, and the fate/composition of the water and ethanol wash streams is described nowhere | [^7][^8] | Contaminated aqueous/ethanol waste with no characterized sink | fixable | Analyte measurement of each wash liquor + dry-mass balance (G-01/G-03) |
| B-04 | Two-stage water wash, wash water "recycled by a water recycler" (MéGo!, FR3066128A1 abstract) | source-supported | [^9] | Recycle without purge is a concentration loop, not a sink (hypothesis) | fixable | Water-loop mass balance: contaminant in/out per cycle, purge rate, accumulation trend |
| B-05 | 8 % "sludge" dried, melted and thermo-compressed into the sold sheets (MéGo! company layer) | source-supported (company self-report); the sludge is plausibly a contaminant concentrate (fines + sorbed organics/metals) — hypothesis | [^9][^23] | If the sludge carries the load, the **product is the toxic-fraction sink**; INERIS-classified input embedded in consumer-facing furniture | fatal (a process whose only named sink is the sold product cannot support a clean-product claim without assay) | Sludge assay (nicotine/TSNA/PAH/metals) + finished-sheet leachate test |
| B-06 | Double wash "eliminates harmful substances"; process water "entrusted to a certified partner for purification" (Re-Cig) | source-supported (company); as detox evidence unresolved — no analyte list, no partner data | [^10][^29] | "Eliminate" read as measured removal | fixable | Partner effluent data + polymer residual-analyte certificate |
| B-07 | Tobacco/ash fraction composted ~30 d and sold to nurseries; paper made into mosquito-repellent mats; wastewater "reused"; wash = "biodegradable chemicals" 24–36 h (Code Effort, news-reported) | source-supported (company claims); compost and product cleanliness unassessed anywhere located | [^10][^23] | Compost is a direct environmental-release pathway for the tobacco fraction; "biodegradable" ≠ non-hazardous (A-06) | unknown | Compost analyte panel (nicotine, TSNA, metals, PAH) + maturation metrics; MSDS for the wash chemical |
| B-08 | Tobacco+paper → compost; CA dried, powdered → filler in recycled plastic lumber; no sanitisation step in the official PDF (TerraCycle) | source-supported (as disclosure); detoxification unproven, not disproven (C-03) | [^10][^23] | Encapsulated-filler product and compost both unassayed; Korean paving case is the live comparator | unknown | Compost assay + lumber leachate test (the Korean case assayed the finished product[^14]) |
| B-09 | "Medical-grade testing" of products (BuffIndia, one interview) | source-supported as a claim; no certificate, laboratory, analyte list or detection limit located | [^10][^23] | Certification language read as assay (G-11) | unknown | The test reports themselves: analytes, limits, lab identity |
| B-10 | Step b: drying/"depollution" of the filter fraction at 80–100 °C for 3–12 h; description once states 80–160 °C (Keenat FR3110470A1) | source-supported (worker-fetched full text; packet had read only chunks 0/2 and lacked the duration) | [^11][^12] | Drying presented as detoxification | fixable | Feed vs treated-fibre analyte panel at the disclosed time/temperature |
| B-11 | "Depollution" mechanism = evaporation of Fluoranthene, Benzo(a)pyrene, Benzo(b)fluoranthene; extrusion step d at 170–240 °C for 1–2 min, favoured by low pressure/low O₂ (Keenat FR3110470A1) | source-supported (worker-fetched). This largely resolves conflict C-01: the press "~200 °C" matches the patent's own extrusion stage; the two temperatures are different steps of one patent | [^11][^12] | Press "destruction" wording (nicotine/phenol/pesticides "destroyed") conflates evaporation with destruction | fixable | Off-gas condensate assay during steps b and d; mass closure of the named PAHs |
| B-12 | No off-gas capture, condensation, scrubbing or gas-treatment step is described anywhere in the patent while pollutants are stated to evaporate (Keenat FR3110470A1) | source-supported (absence in the fetched full text) | [^12] | The disclosed mechanism routes the toxic fraction to workplace air/vent stack — uncontrolled emission, or, if evaporation is in fact poor, retention in the composite (Korean outcome) | fatal (a depollution claim whose only described sink is uncaptured vapour cannot support a clean-product or permit-ready claim) | Paired measurement: analytes in fibre before/after step b, in extruder vent gas condensate, and in final granulate |
| B-13 | Tobacco/paper fraction F2 and diffuse-waste byproducts become solid recovered fuel (CSS) for incineration/cement kilns; company pivoted to CSS after its LCA (Keenat) | source-supported (patent + company layer); CSS emission data not located | [^11][^12][^27] | Combustion of the toxic-bearing fraction becomes an air-emission question nobody has quantified here | unknown | CSS specification + kiln stack data for the butt-derived fraction |
| B-14 | Carcinogens (PAHs and TSNAs) were found in 2022 in South Korean paving stones made from butts **despite** encapsulation and high-temperature heat treatment; sales suspended; "no currently available recycling technology can guarantee the complete removal of toxic components from used filters" (Kim & Lee, Tobacco Control, doi:10.1136/tc-2026-060135) | source-supported (secondary reporting[^14]; the TC article itself was not obtained — citation verified via GST) | [^13][^14][^15] | Treating heat+encapsulation as a detoxification strategy | fixable (for any family: assay the finished product) | Finished-product assay of any butt-derived article before market release |
| B-15 | Pretreatment rationale: "ethanol is used to remove impurities such as solanesol, and then deionized water is used to remove impurities such as nicotine"; washing endpoint = conductivity 2 µS/cm (CN106928486A/B) | source-supported (worker-fetched machine translation of granted claims) | [^16][^17] | A conductivity endpoint is ionic; it says nothing about neutral organics (TSNAs, most PAHs) or metal speciation in the product | fixable | Residual nicotine/TSNA/PAH/metals in the recovered CA, and in the ethanol and water waste streams |
| B-16 | "Recovery rate of acetate fiber … 58–92 %" (CN106928486B claim 2/3) | source-supported; it is a **polymer**-recovery figure — no contaminant denominator, no purity claim | [^16][^17][^24] | 92 % recovery quoted as "92 % detoxified/pure" | fixable | Recovery equation + dry-mass basis (G-06), stated alongside an analyte panel |
| B-17 | "Clean" CA because pollutants remain in the acetone/water mixture; concentrated pollutant water is "treated/disposed" (CNR/AzzeroCO2 offering) | source-supported (offering-page claims); no assay, no route detail; co-precipitation/entrainment of solvent-borne organics onto the precipitating CA is a plausible failure (hypothesis) | [^10][^23] | Product carries nicotine/TSNA; residual acetone in product; aqueous nicotine/metals stream without a quantified route | fixable | Product residual-analyte + residual-acetone assay; characterization of the pollutant water (mg/L nicotine, metals) |
| B-18 | Mechanical pretreatment + cleaning agent; optional recovery of the agent by distillation (Cerdia WO2026074041A2) | source-supported (abstract only) | [^10][^23] | An incumbent tow maker's patent envelope read as a deployed cleaning process | unknown | Full description + claims; CA quality vs virgin tow (G-12) |
| B-19 | Target contaminants: nicotine, heavy metals, organic acids, nitrosamines, phenols, PAHs, aldehydes, dioxins/furans, pesticides (flumetralin, pendimethalin, trifluralin), anions; extract collected "in a separate and isolated container"; fluid polished through activated carbon; optional "recovery phase" for organic/inorganic substances (TchaoMegot FR3102180A1) | source-supported (worker-fetched patent text) — the **fullest named concentrate-sink chain in the batch**, but design-level text, not measurement | [^18][^19] | Claims-level sink read as demonstrated control | fixable | Third-party assay of fibre + characterize the container/carbon concentrate (analytes, mass, disposal) |
| B-20 | Optional humidification "acts as a cosolvent" aiding nicotine extraction; optional cosolvents (ethanol, methanol); extractants (calixarenes, chelating agents) for heavy metals (FR3102180A1) vs company "no water, no toxic solvent" | contradicted-by-source as an **absolute** claim: the patent's own design space includes water humidification, alcohol cosolvents and chelating agents | [^18][^19] | Marketing framing ("dry", "no solvent") misstates the design space; metals in particular are not expected to move with the neat fluid (the patent itself relies on extractants) | fixable (framing) | Disclosure of the actual operated recipe: fluid, cosolvent/extractant identity and dose, water content |
| B-21 | "99.7 % clean material / 0.3 % total toxics concentrate"; "30 L fibre → 100 mL effluent"; REACh-related validation claimed (TchaoMegot company page; my fetch failed — packet-attributed) | source-supported (company self-report); as cleanliness evidence unresolved — no common dry-mass basis, no analyte panel, no report located | [^18][^23] | A material split read as a purity/detoxification percentage | fixable | Basis statement + third-party fibre assay + concentrate mass/composition |
| B-22 | Operating pressure: press quote ~50/60 bar at ~30 °C vs patent preferred 280–320 bar (generic 0–2000) / 15–80 °C | unresolved (C-02 stands). Note: 50–60 bar at ~30 °C is below CO₂'s critical point (≥73.85 bar, ≥31 °C per the patent) and would be liquid/dense CO₂ with different solvent strength — the conflict is material, not cosmetic | [^18][^19][^22] | Assay scope designed for one operating point while the plant runs another | unknown | Plant operating record or instrumented trial: pressure, temperature, cosolvent — then fibre assay under those conditions (G-05) |
| B-23 | Dark pulping liquor contains COD/BOD/TOC, carbonyls, metals, nicotine and tobacco-specific nitrosamines; COD = 29,986 mg/L (Teixeira doctoral thesis, UnB repository record) | source-supported (worker-fetched thesis record; abstract level) | [^20][^21] | Under-estimating the effluent problem would sink the environmental case post hoc | fixable | Full thesis/paper: per-tonne liquor volume, analyte loads (G-07) |
| B-24 | Liquor treatments: acid precipitation ≈20 % COD removal, chitosan coagulation ≈66 %, ozonation ≈45.8 %; "as the remaining COD was still high, we proposed reusing the clarified effluent in alkaline pulping" (Teixeira thesis record) | source-supported — this **largely resolves conflict C-07**: the secondary review's "could not be successfully treated" and the author summary's "returned to pulping" are both partially right; the recycle is the *consequence* of incomplete treatment | [^20][^21] | The effluent "sink" is an internal recycle loop: contaminants accumulate unless a purge exists; the acid precipitate (the true concentrate) is uncharacterized | fixable | Closed-loop liquor mass balance with purge; precipitate composition + hazardous-waste classification; product assays |
| B-25 | "100 % utilisation" of the residue (Teixeira, secondary Portuguese text) | source-supported as a claim — a material-utilisation statement, not a mass yield, not a purity/toxicity result | [^20] | Utilisation rhetoric read as detoxification | fixable | Dry-mass yield table + product analyte panel |
| B-26 | The finished paper/pulp is free of nicotine/TSNA/metals at intended exposure (UnB/Poiato) | unresolved — no product assay located in any source read | [^20] | Contaminated paper reaching skin-contact uses | fixable | Pulp/paper assay: nicotine, TSNAs, Cd/Pb/As/Hg, plus extractables |
| B-27 | Raw butts are dangerous waste: HP6 (acute toxicity) per the INERIS 2017 report; HP14 (ecotoxic) per secondary sources; INERIS reportedly favoured energy recovery over material recovery for lack of performance data | source-supported with a verification limit: HP6 wording confirmed in the INERIS PDF's search snippet[^26]; the PDF itself would not download; the energy-recovery statement is from an energy-recovery operator's summary[^26] (conflict of interest noted); the packet's note[^25] is a project summary, not the INERIS document | [^25][^26] | Under-classification would misroute feed, sludge, compost and concentrate | unknown (jurisdiction-specific) | Read the INERIS report and the applicable waste-code decision for each output stream, per jurisdiction |
| B-28 | "The water loop is closed at steady state" — i.e., recycling removes contaminants and no purge is needed (engineering inference behind MéGo!'s closed-loop claim; packet labels it `[HYPOTHESIS]`) | hypothesis — recycling moves contaminants between fibre and water; without a purge or treatment train the loop can only redistribute and concentrate them | [^9][^22] | Steady-state accumulation in the wash water → rising product carry-over and an uncharacterized bleed | fixable | Water-loop mass balance with analyte in/out per cycle and a measured purge rate |
| B-29 | Antisolvent precipitation rejects the dissolved toxicants (nicotine is acetone-miscible; on water addition the organics stay in the mother liquor and the CA comes down clean) — implied by CNR's "clean CA" claim | hypothesis — co-precipitation/entrainment of solvent-borne organics on the precipitating polymer is chemically plausible and unmeasured | [^10] | Product carries nicotine/TSNA despite the "clean" claim | fixable | Product residual-analyte assay vs mother-liquor concentration across precipitation conditions |

---

## 2.2 Per-family verdicts

```
F0 — A real material-recovery baseline whose detoxification claim is asserted and never measured.
Strongest evidence: De Fenzo 2020 §2–3.4 (full text checked: n=5, Ti-only AAS, no organic/toxicity assay)[^8]
Weakest link: G-02 (no analyte data) — confirmed against the primary source
Severity: fixable
Falsifier: multi-analyte panel on recovered CA and on every wash liquor (water and ethanol)
Dissent/uncertainty: SEM/EDX surface observations are genuine observations of morphology; they are not chemistry of the toxic fraction, but I may under-weight what they rule out.
```

```
F1 — Deployed at scale, but every "clean" claim rests on unquantified water partitioning, and MéGo!'s named sink for the toxic fraction is the product itself.
Strongest evidence: FR3066128A1 abstract (two-stage wash + recycle)[^9]; Re-Cig's named external effluent boundary[^10]
Weakest link: G-02/G-08 + sludge-in-product (B-05)
Severity: fatal for the sludge-in-product logic as disclosed; fixable for the family (separate sludge route + assay)
Falsifier: sludge and finished-product assays; water-loop accumulation measurement over ≥1 cycle set
Dissent/uncertainty: absence of disclosure is not absence of treatment (packet rule); Re-Cig may hold data I could not fetch (site timed out).
```

```
F2 — Depollution-by-evaporation is now documented in the patent itself, but no off-gas sink is described, and the Korean comparator shows retention is the live risk.
Strongest evidence: FR3110470A1 full text (fetched): named PAHs, 3–12 h at 80–100 °C, extrusion 170–240 °C/1–2 min[^12]
Weakest link: B-12 (no vapor capture) — sharpens G-04
Severity: fatal to the clean-product claim as disclosed
Falsifier: analyte balance across feed / fibre after step b / extruder vent condensate / final composite, plus composite leachate
Dissent/uncertainty: my numbers come from a Google-Patents render of a French patent (machine translation); the 80–160 °C internal inconsistency needs the official text; "fatal" refers to the claim as disclosed, not to what added capture could fix.
```

```
F3 — The most chemically coherent contaminant-rejection logic in the batch, with an explicit impurity rationale — and zero product or effluent assays.
Strongest evidence: CN106928486B granted claims + rationale (ethanol→solanesol, water→nicotine)[^17]; CNR's named pollutant-water stream[^10]
Weakest link: G-06 + conductivity-only endpoint (B-15)
Severity: fixable
Falsifier: residual nicotine/TSNA/PAH/metals + residual solvent in the recovered CA; characterization of ethanol/water/acid waste streams
Dissent/uncertainty: co-precipitation of organics onto the product is my inference, not a measurement; Cerdia is abstract-only.
```

```
F4 — The best-named concentrate-sink chain and widest target-analyte list (patent design text), with the weakest verification and an unresolved operating-condition conflict.
Strongest evidence: FR3102180A1 (fetched): analyte list, separator containers, activated carbon, recovery phase[^19]
Weakest link: G-05 + the 99.7 % basis (B-21)
Severity: unknown
Falsifier: third-party fibre assay + concentrate characterization at the actually-operated pressure/temperature/cosolvent
Dissent/uncertainty: the company page (503) and the press quote could describe a different recipe than the patent embodiment; I could not check either.
```

```
F5 — The only family whose toxic-fraction stream is quantified in a locatable public record — and its disclosed sink is an internal recycle plus an uncharacterized precipitate.
Strongest evidence: Teixeira thesis record: COD 29,986 mg/L; 20/66/45.8 % COD removals; recycle proposed because residual stayed high[^21]
Weakest link: G-07, sharpened by B-24 (precipitate + product assays missing)
Severity: fixable
Falsifier: closed-loop liquor balance with purge; precipitate hazard classification; nicotine/TSNA/metal assay of the pulp and paper
Dissent/uncertainty: my numbers are abstract-level from the repository record; the full thesis/paper (403/redirect-blocked) may contain the missing loads; the patent text was never read.
```

---

## 2.3 Answers to Q1–Q5

**Q1 — Product class.** "Cleaning" requires a mechanism that moves contaminants out of the product stream into a characterized sink. On that test: F0 and F1 propose partitioning into water/ethanol — chemically coherent (nicotine is water-soluble; the CN patent uses exactly this logic), but no operator publishes an analyte panel, so their cleaning claims are **unresolved**, not shown to fail. F3 has the strongest disclosed chemistry: insolubles are rejected at filtration, solvent-borne organics stay in the mother liquor, and the granted claims name the impurities the pretreatment targets[^17] — still assay-free. F4 is coherent (extraction into a dense fluid, with a named concentrate chain[^19]) but operationally unresolved (B-22). F5 converts to a different polymer and puts the load into a liquor that is at least partially characterized[^21] — the best-evidenced waste stream, weakest product evidence. F2 is the outlier: its disclosed mechanism is evaporation plus **dilution** (10–30 % filler in 70–90 % thermoplastic[^12]); dilution is not removal. Two claims are contradicted at source level: De Fenzo's explicit "reduce the toxicity level" sentence (no endpoint exists in the paper[^8]), and any reading of FTIR/TGA/odour/transparency as clearance — identity and aesthetics are not toxicology. The Korean paving result[^14] is an empirical negative comparator for heat-plus-encapsulation product logic, secondary-reported and from a different matrix: a warning, not a verdict on F2.

**Q2 — Toxic fraction.** Per family: **F0** — hot/cold wash waters and two ethanol washes; no waste description at all in the paper[^8]. **F1 (MéGo!)** — recycled water loop + sludge melted into the product (the product is the sink) + 12 % paper/tobacco/ash rejects with no route[^9]. **F1 (Re-Cig)** — wash water to an external certified partner: the only *named* external boundary in the batch, no data[^10]. **F1 (Code Effort)** — reused wastewater plus compost sold to nurseries: environmental-release sinks, unassayed[^10]. **F1 (TerraCycle)** — compost (tobacco/paper) and plastic lumber (CA filler): product/environment sinks, unassayed[^10]. **F1 (BuffIndia)** — nothing disclosed. **F2 (Keenat)** — off-gas from steps b/d, uncaptured by the patent's own text[^12]; F2 fraction → CSS fuel. **F3 (CN)** — ethanol extract, wash waters to 2 µS/cm, spent acid liquor: streams named, destinations not routed[^17]. **F3 (CNR)** — acetone (recovered) + "concentrated pollutant water" treated/disposed by unnamed means[^10]. **F4 (TchaoMegot)** — extract in isolated containers, activated carbon, a "recovery phase" (patent design)[^19]; company cites a 0.3 % concentrate with no disposal route published[^18]. **F5 (UnB/Poiato)** — dark liquor internally recycled after partial treatment + acid precipitate[^21]. Families with **no disclosed sink at all**: F0, BuffIndia, Code Effort (final disposition), CN-patent streams, and Keenat's off-gas.

**Q3 — Temperature/pressure plausibility.** Assumptions stated: a drying step is bounded by its own claim text; a press quote is a company statement, not a setpoint; an envelope is not an optimum. Keenat step b (80–100 °C, 3–12 h)[^12]: at atmospheric pressure this supports drying and volatilization of the more volatile organics; high-boiling PAHs such as benzo(a)pyrene — which the patent itself names — have negligible volatility at 100 °C, and the patent's own vacuum-oven variant (low pressure "promotes the evaporation" of Fluoranthene/Benzo(a)pyrene/Benzo(b)fluoranthene[^12]) is an implicit admission of that difficulty. Step d (170–240 °C, 1–2 min) makes evaporation thermodynamically more plausible but mass transfer out of a viscous melt in 1–2 minutes is unquantified — and with no capture described, a successful evaporation is an uncontrolled emission while an unsuccessful one leaves the load in the composite (B-12). The press "destroying nicotine, phenol, pesticides" conflates evaporation with destruction; C-01 is now largely explained (two steps, one patent), and the packet's instruction not to merge the numbers into "80–200 °C" was right. TchaoMegot: 280–320 bar / 15–80 °C is a genuine supercritical-CO₂ envelope (the patent states ≥73.85 bar, ≥31 °C for CO₂[^19]); a 50/60 bar, ~30 °C quote describes subcritical liquid CO₂ with different solvent strength. Which one operates is unknown, and it matters analytically — the patent relies on humidification for nicotine and extractants for metals, so the operating point decides which analytes can move at all. Incomplete disclosure is not proof of impossibility in either case.

**Q4 — The one discriminating measurement.** A single **shared-feedstock, multi-stream contaminant mass balance**. Take one homogenized lot of smoked butts (feed assayed first), split it into aliquots, run each family's core separation step at its disclosed conditions, and measure the same analyte panel — nicotine, ΣTSNAs, ΣPAHs, Cd/Pb/As/Hg — in (i) the feed, (ii) the product, (iii) every liquid and solid waste stream (wash water, sludge, mother liquor, dark liquor, extract/concentrate), and (iv) off-gas condensate wherever heat is applied; then assay the finished article and its leachate. The discriminator is the **partition location of the toxic load**: washing predicts water/sludge; dissolution predicts solvent/water; dense-fluid extraction predicts the extract; heat predicts off-gas or product retention; pulping predicts liquor; encapsulation predicts product retention. One measurement set therefore tests every family's central claim simultaneously and exposes any family whose toxic fraction has no sink at all — which is precisely the property the Korean paving-stone outcome made decisive[^14]. It also calibrates the "clean" percentages (99.7 %, 92 %, 39 %) onto one common basis, which none of the operators does.

**Q5 — What would change my mind.** Strongest on contaminant-fate logic: **F3** (dissolution/recovery). I would downgrade it if a product assay showed residual nicotine/TSNA/metals above a justified product criterion after the disclosed pretreatment and precipitation — i.e., if co-precipitation dominates rejection — or if the solvent/waste streams proved untreatable at lawful cost. I would upgrade it (toward source-supported cleanliness) on a third-party multi-analyte certificate for the recovered CA plus a characterized effluent route, ideally replicated across two of the three independent actors. Weakest: **F2** (dry heat + extrusion composite). I would revise upward on a complete analyte balance showing the named PAHs (and nicotine) leaving in a **captured** off-gas with condensate assays, plus a composite leachate result meeting a justified criterion — replicated independently of the Korean outcome. I would revise further downward (to fatal for the family's product logic) if the composite itself retains the load, as the paving stones did, since dilution in 70–90 % virgin thermoplastic would then be cosmetic.

---

## 2.4 Stream/fate table

| Family | Product stream | Concentrate/waste stream(s) | Disclosed sink? | Lawful-disposal question |
|---|---|---|---|---|
| F0 De Fenzo | Recovered CA (film demo) | Hot/cold wash waters; 2× ethanol 99 %; extracts | **No** — paper describes no waste handling[^8] | Nicotine/organic-bearing aqueous + spent ethanol: hazardous-waste routing unaddressed |
| F1 MéGo! | CA sheets (80 % fraction; sludge thermo-compressed in) | Recycled wash water (no purge disclosed); 12 % paper/tobacco/ash rejects; dust/off-gas | Partly — water "recycled"; sludge into product; rejects not routed[^9] | Is the sludge-in-product the de-facto disposal? Rejects classification (HP6/HP14 input); drying/melting fumes |
| F1 Re-Cig | Re-CA granules (~39 % company basis) | Wash water → external certified partner; hot-mix off-gas | Partly — external boundary named, no data[^10] | Partner's effluent standards; residual contaminants in granules; End-of-Waste criteria |
| F1 Code Effort | Fibre stuffing; paper/mats; compost | "Reused" wastewater; tobacco/ash → compost | **No** — reuse claimed, no volumes/quality[^10] | Compost to nurseries = environmental release, unassayed; wash-chemical MSDS |
| F1 TerraCycle | Compost (tobacco/paper); CA powder in plastic lumber | None disclosed in official PDF | **No**[^10] | Compost quality; lumber leachate over service life |
| F2 Keenat | Composite granulate (10–30 % butt filler) | Off-gas/vapours from steps b and d; F2 fraction + diffuse waste → CSS fuel | **No** for off-gas (no capture step in patent[^12]); CSS named for F2 | Vapour capture, worker exposure, stack limits; CSS combustion emissions for the toxic-bearing fraction |
| F3 CN106928486 | Recovered CA (58–92 % polymer basis) | Ethanol extract (solanesol-type); DI-water washes (nicotine-type) to 2 µS/cm; spent acid liquor | **No** — streams named, destinations absent[^17] | Acid/organic-bearing effluent; ethanol recovery; residue classification |
| F3 CNR/AzzeroCO2 | Precipitated CA | Acetone (recovered by boiling); "concentrated pollutant water" | Partly — treatment/disposal asserted, route unnamed[^10] | Aqueous nicotine/metals load; residual acetone in product; energy of acetone recovery |
| F4 TchaoMegot | Insulation/textile fibre (99.7 % claim) | Extract/concentrate (0.3 % claim) in isolated containers; activated carbon; "recovery phase"; ~100 mL effluent per 30 L fibre (company) | **Yes at patent design level**[^19]; company route unpublished[^18] | Concentrate characterization and final disposal; carbon change-out; what the "recovery phase" actually does |
| F5 UnB/Poiato | Cellulose pulp/paper | Dark liquor (COD 29,986 mg/L; nicotine, TSNAs, metals, carbonyls) recycled after partial treatment; acid precipitate; wash waters | Partly — internal recycle + precipitate[^21] | Precipitate = hazardous waste?; purge/accumulation control; discharge permit for any bleed; product assays |

---

## 2.5 What the packet gets wrong or overstates

1. **Reading depth was presented as source secrecy for F2 and F4.** The packet states the Keenat extruder profile is "not disclosed in the read text" and the TchaoMegot "full WO/FR text was not obtained". Both are true of the packet's chunked reads, but the public pages disclose more than the packet carries: FR3110470A1 discloses 3–12 h at 80–100 °C, PAH evaporation by name, and 170–240 °C extrusion[^12]; FR3102180A1 discloses the analyte target list, the extract containers, activated-carbon polishing and a recovery phase[^19]. The correction: conflict C-01 is largely resolvable, and F4's sink is better documented than the packet suggests. Reading depth should be carried as a first-class limitation on every spec, not only where the packet happened to be truncated.
2. **The Korean paving-stone note is materially incomplete.** It does not name the analytes (PAHs and TSNAs), the 2022 testing date, the sales suspension, or the study citation (Kim & Lee, Tobacco Control, doi:10.1136/tc-2026-060135)[^14][^15]. For a slot-B panel these are the payload of that comparator. The packet's own flag on the Keenat spec's "direct precedent" phrasing is justified: the matrices differ (paving stone vs thermoplastic composite).
3. **Conflict C-07 was more resolvable than the packet states.** The first author's own doctoral thesis — public in the UnB repository — quantifies the liquor (COD 29,986 mg/L) and the treatment removals (20/66/45.8 %), and states the recycle was proposed *because* residual COD stayed high[^21]. "Failed access" to the journal paper did not exhaust the public record.
4. **De Fenzo's own detox overclaim is missing from the F0 spec.** The paper's Conclusions assert reduced toxicity and odour removal[^8]; the spec concludes correctly that no clearance claim follows, but does not carry the sharpest datum — the source's own unsupported sentence.
5. **"[VERIFIED-SOURCE]" as a label for company self-reports invites misreading**, even though the map defines it carefully[^23]. "Source-stated" would have been safer; the same risk now transfers to my `source-supported` verdicts, which per the schema mean only "the source says it".
6. **Confirmed, not criticised:** the packet's central claim — no independent contaminant assay, leachate test or emission measurement located for any operator — held up against every check I made, including five primary-source fetches.

---

## 2.6 Confidence and independence statement

- **Verified by me:** payload integrity (20/20 SHA-256 against the manifest at the payload commit[^1]); De Fenzo 2020 full text (analytical scope, Ti result, n=5, no toxicity endpoint, the detox sentence)[^8]; the Korean case's analytes, dates and TC citation[^14]; the UnB thesis record's COD and treatment figures[^21]; the FR3102180A1[^19] and FR3110470A1[^12] patent renders (single-pass Google-Patents HTML, machine-translated for CN106928486B[^17]); the INERIS 2017 report's existence and HP6 wording via its PDF snippet[^26].
- **Accepted from the packet without independent verification:** the company layers for Code Effort, TerraCycle, BuffIndia, Re-Cig and MéGo! (my fetches of re-cig.it and tchaomegot.com failed); the Keenat LCA retreat (press, not re-fetched); the Cerdia abstract; HP14 specifically (secondary sources only).
- **Independence:** this report was produced from the frozen packet plus my own identified fetches. No peer report, judge output, Stage-4 material, panel directory, receipt, conversion or critique was read — none was present at either commit, and I did not browse for any. My report is independent of slots A and C.
- **Conflicts/limits:** the packet's specs and ledgers are one prior author's readings; I treated them as data and re-derived the load-bearing items where I could. My patent numbers come from machine-translated commercial patent renders and should be confirmed against official publications before any operational or legal use. I claim no safety clearance, no freedom to operate, and no commercial judgment; nothing here certifies any material or product.

[^1]: `packets/batch-01/stage-3/manifest.yaml` (project file, release snapshot a20ada4); payload files extracted from commit `5f484b585ca16dbd2ce93b56c61c962f5f14c774`, hashes recomputed and matched 20/20. Repository: https://github.com/abdo2048/butt-lab/
[^2]: `packets/batch-01/stage-3/question.md` (project file, payload commit).
[^3]: `packets/batch-01/stage-3/output-schema.md` (project file, payload commit).
[^4]: `packets/batch-01/stage-3/evidence-index.md` (project file, payload commit).
[^5]: `packets/batch-01/stage-3/LAUNCH.md` (project file, release snapshot).
[^6]: `packets/batch-01/stage-3/COMMIT.txt` (project file, release snapshot).
[^7]: `specs/de-fenzo-2020-source-reconstruction.md` (project file, payload commit).
[^8]: De Fenzo A, Giordano M, Sansone L, *Materials* 13(21):4710 (2020), full text fetched by worker: https://pmc.ncbi.nlm.nih.gov/articles/PMC7659942/ ; DOI https://doi.org/10.3390/ma13214710
[^9]: `specs/mego-fr3066128a1-source-reconstruction.md` (project file, payload commit); patent: https://patents.google.com/patent/FR3066128A1/en
[^10]: `specs/company-workflow-dossiers-batch01.md` (project file, payload commit).
[^11]: `specs/keenat-fr3110470a1-source-reconstruction.md` (project file, payload commit).
[^12]: FR3110470A1 (Keenat), Google Patents page fetched by worker: https://patents.google.com/patent/FR3110470A1/en
[^13]: `dossier/cautionary/korean-paving-stones.md` (project file, payload commit).
[^14]: "South Korea: Cigarette butt recycling thwarted", Génération Sans Tabac (EN), 2026-07-14, fetched by worker: https://www.generationsanstabac.org/en/actualites/coree-du-sud-le-recyclage-des-megots-de-cigarettes-mis-en-echec
[^15]: Kim J, Lee S, "Cigarette butt recycling in South Korea: environmental policy failure and the limits of extended producer responsibility", *Tobacco Control*, published online 2026-07-08, doi:10.1136/tc-2026-060135 (citation as given by [^14]; the article itself was not obtained).
[^16]: `specs/cn106928486-source-reconstruction.md` (project file, payload commit).
[^17]: CN106928486B, Google Patents page (machine translation) fetched by worker: https://patents.google.com/patent/CN106928486B/en ; A-version: https://patents.google.com/patent/CN106928486A/zh
[^18]: `specs/pressurized-fluid-reference.md` (project file, payload commit); company page (fetch failed, packet-attributed): https://tchaomegot.com/depollution/
[^19]: FR3102180A1 (TchaoMegot), Google Patents page fetched by worker: https://patents.google.com/patent/FR3102180A1/en
[^20]: `specs/unb-pi0305004-source-reconstruction.md` (project file, payload commit).
[^21]: Teixeira MBdH, doctoral thesis, University of Brasília (2016), repository record fetched by worker: https://repositorio.unb.br/handle/10482/22749?mode=full ; journal paper (not obtained): Teixeira et al., *Waste Management* 60 (2017) 140–150, doi:10.1016/j.wasman.2016.10.013
[^22]: `reports/stage2/assumption-and-gap-ledger.md` (project file, payload commit) — assumptions A-01…A-07, calculations K-01…K-05, conflicts C-01…C-08, gaps G-01…G-20.
[^23]: `reports/stage1/company-source-map.md` (project file, payload commit).
[^24]: `reports/gap-check-01.md` (project file, payload commit).
[^25]: `dossier/cautionary/ineris-waste-classification.md` (project file, payload commit) — project note, not the INERIS document.
[^26]: INERIS, *Étude des filières de collecte et de traitement des mégots* (2017), PDF (download failed; HP6 wording confirmed in search snippet): https://www.ineris.fr/sites/default/files/contribution/Documents/INERIS-DRC-17-162405-01313C%20Rapport%20%C3%A9tude%20m%C3%A9gots_vf.pdf ; secondary summary (energy-recovery operator; conflict of interest): https://www.cy-clope.com/rapport-ineris-etude-des-filieres-de-recyclage-des-megots
[^27]: `dossier/cautionary/keenat-lca-retreat.md` (project file, payload commit).
[^28]: `reports/stage2/errata-packet-v1.0.md` (project file, payload commit).
[^29]: Re-Cig technology page (packet-cited; my fetch timed out): https://www.re-cig.it/en/tecnologia/
