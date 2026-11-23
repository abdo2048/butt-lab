# Judge synthesis: batch-01 / Stage 3 / round-01

```yaml
role: JUDGE
packet_version: v1.1
payload_commit: 5f484b585ca16dbd2ce93b56c61c962f5f14c774
reports_reviewed:
  - worker-a.md
  - worker-b_Z-GLM5.3.md
  - worker-b_Tencent-Hy4.md
  - worker-c.md
slot_count: 3
recommendation: REVISE
operator_acceptance: pending
```

## Executive summary

All four authorized reports are present and readable. The two B reports are independent contributions to one Slot B; they are not a fourth panel role and do not create an extra vote. All reports identify packet v1.1 and the exact frozen payload commit. Their model and service identities remain self-reported, so the panel does not establish verified model diversity.

The strongest common conclusion is narrower than a recycling or safety verdict: all six families contain a source-described separation, recovery, compounding, extraction, or conversion mechanism, but none has packet evidence that jointly closes dry mass, target-contaminant fate, product leaching, and use-specific performance. Material identity or recovery is not polymer purity; either is not detoxification; none alone establishes usability.

F3 has the clearest polymer-separation logic, while F2 is a composite/encapsulation route rather than purified cellulose-acetate recovery. Those are evidence-structure judgments, not findings of safety, commercial merit, or process success. The packet does not demonstrate that any family fails in operation, but it also does not support unqualified claims such as "clean," "detoxified," "safe," "medical grade," complete thermal destruction, LCA superiority, or a closed lawful toxic sink.

Recommendation: **REVISE**. The blockers are denominator ambiguity, absent analyte-resolved fate closure, incomplete sink verification, and missing product/leachate evidence. Final acceptance remains solely with the operator.

Evidence labels used below:

- **S**: a supplied source states the claim; this does not independently verify it.
- **M**: a measurement is reported in a supplied source; the judge did not reproduce it.
- **C**: calculation from stated inputs, with assumptions shown.
- **H**: engineering inference or hypothesis.
- **U**: unresolved because evidence, denominator, or source access is insufficient.

## Packet and provenance audit

### Packet integrity and scope

- The 20 payload paths listed in `packets/batch-01/stage-3/manifest.yaml` exist, are readable, occur at the frozen commit, and have no content difference from that commit. The three release metadata files are also readable. `packets/batch-01/stage-3/COMMIT.txt` identifies the same payload commit.
- Manifest hashes match after LF normalization. Seventeen working-tree files use CRLF, so their raw bytes do not match hashes described by `manifest.yaml` as hashes of "file bytes." This is a release-metadata portability defect, not scientific-payload drift. Slot C independently recorded the same line-ending distinction (`panels/batch-01/stage-3/round-01/worker-c.md`, "Packet-access receipt").
- Primary B and supplemental B used release snapshot `a20ada4895448d4fda1421088233b72fae2afb56`. Against current main, the manifest, launch file, commit file, and fusion protocol are unchanged; current main adds only the transport guide `PACKET_ACCESS.md`. Their scientific and judging instructions therefore match the current release basis.
- The packet itself states that no independent contaminant assay, leachate result, emissions measurement, complete dry-basis balance, or audit-ready LCA was located (`packets/batch-01/stage-3/evidence-index.md`, §3 "What is not supplied"; `reports/stage2/reconstruction-index.md`, §5 "Explicit non-claims"). Source absence is not evidence that a process step was not performed.
- No critical input is missing. No `hy4-citation-map.md` exists. Supplemental B's inline definitions [1]-[27] are present at the report ending and resolve its references; they are navigation aids, not evidence verification.
- The judge added no new external source. External details reported by primary B are retained below only as attributed worker leads, not promoted to frozen-packet facts.

### Report comparison

| Authorized contribution | Provenance and access | Required-content audit | Principal value | Material limitation |
|---|---|---|---|---|
| Slot A, `worker-a.md` | Correct v1.1/commit; service/model self-reported as Web Extractor/Qwen3.8. It reports incomplete access to `coverage-ledger.md` and the two secondary cautionary dossiers. Its counts of "5 control" and "15 of 17 evidence" are internally inconsistent with three named incomplete evidence files. | Revised response contains provenance, claim table, F0-F5, Q1-Q5, stream table, packet criticism, and confidence statement. The pre-v1.1 general-knowledge preamble carries no weight. | Clear identity-versus-detox distinction and a common mass-balance proposal. | Overstates F2 as contradicted by the Korean comparator, uses boiling point as a destruction test, and calls unresolved F5 effluent evidence a demonstrated fatal sink. |
| Primary Slot B, `worker-b_Z-GLM5.3.md` | Correct v1.1/commit; z.ai service, displayed model unknown with session configuration suggesting `zgo/glm-5.3`; self-reported 20/20 payload reads and hashes. External access successes and failures are disclosed. | Complete and most granular claim, family, Q1-Q5, stream, overstatement, and independence sections. | Best denominator audit; careful separation of product classes; useful primary-source retrieval leads for F2, F4, and F5. | Some leads rely on machine-rendered/translated patents or abstract-level records. Patent options do not prove the current commercial recipe, and a collection train is not a verified final sink. |
| Supplemental Slot B, `worker-b_Tencent-Hy4.md` | Correct v1.1/commit; service/model unknown; all 20 paths reportedly read at least partly, without checksum recomputation. Inline [1]-[27] definitions are complete; no separate map exists. | Complete claim, family, Q1-Q5, stream, criticism, access, and independence sections. | Strong treatment of non-disclosure, recycle/purge, phase conditions, and denominator ambiguity. | Frequently labels inference as source support, converts missing evidence into "fatal" process ratings, and invents unsupported 80/10/70 percent decision thresholds. Those thresholds are rejected. |
| Slot C, `worker-c.md` | Correct v1.1/commit; Freebuff local checkout and DeepSeek V4.1 Flash self-reported; 20/20 payload hashes checked; no external fetches. | Complete claim, family, Q1-Q5, stream, criticism, and independence sections. | Strong scaling, denominator, and deployment-boundary critique; independently identifies hash normalization issue. | Some calculations require unstated assumptions: 1-6 L/kg is 1-6 m3/t, not 1-6 t/t without density; deacetylation ceiling assumes a degree of substitution; its Q4 thresholds are unsupported and rejected. |

All four report bodies are structurally complete enough for synthesis. Completeness does not remove their access and inference limitations.

## Claim disagreements and resolutions

| Issue | Preserved contributions and dissent | Judge resolution |
|---|---|---|
| F2 temperature and off-gas | Packet-limited reports keep the patent's 80-100 C step separate from an unresolved company/press value near 200 C. Primary B reports an external patent read with 80-100 C for 3-12 h and a separate 170-240 C extrusion for 1-2 min, plus named evaporation but no located capture step (`panels/batch-01/stage-3/round-01/worker-b_Z-GLM5.3.md`, §2.1 B-12 and §2.2 F2). | Frozen-packet status remains **U**. The external reading is a useful lead that may resolve the temperatures as different stages, but it does not establish destruction, capture, or the operated recipe. Verify against official full text/translation before revising the packet. |
| F4 extraction train and solvent language | Primary B reports isolated containers, activated-carbon polishing, recovery, optional humidification/cosolvents, and metal extractants from an external patent read. Other reports know only the packet's dense-fluid description and company-named concentrate. | A patent design envelope is not proof of commercial implementation. Optional water/alcohol does not by itself contradict a currently operated "no water/no toxic solvent" recipe. Even a verified collection train would not establish concentrate composition, final treatment, or lawful disposal. |
| F5 liquor treatability | Primary B reports an external thesis record with high COD and partial treatment-removal figures. A treats the liquor as fatal; C treats the route as potentially fixable; the frozen packet records a source conflict because primary full text was unavailable. | Preserve the external numbers as a retrieval lead only. The packet supports a serious unresolved liquor/precipitate burden, not demonstrated process failure or successful treatment. Full primary methods, load basis, outlet data, and precipitate fate are needed. |
| F1 sludge destination | A and primary B read the reported 8 percent sludge as entering product; supplemental B and C emphasize denominator and destination ambiguity. | Record a **reported possible product sink**, not a verified one. Sludge composition, dry basis, fraction actually incorporated, and product leaching remain **U** (`specs/mego-fr3066128a1-source-reconstruction.md`, §6 "Waste-stream and toxic-fate map"; `reports/stage2/assumption-and-gap-ledger.md`, §4 G-08 to G-10). |
| Korean paving-stone and Keenat LCA notes | A uses the paving case as direct contradiction; primary B treats it as a warning; supplemental B and C vary in severity. Workers also differ on whether the Keenat LCA note closes F2 negatively. | Both are secondary cautionary evidence. The paving note is a matrix-specific hazard prompt, not an automatic verdict on F2, TerraCycle, or all composites. The LCA note supports only that a negative result and retreat were reported; without the report, functional unit, boundary, inventory, and results cannot be audited (`reports/stage2/errata-packet-v1.0.md`, §1 E-18 and §3; `dossier/cautionary/korean-paving-stones.md`, "Use in this lab"; `dossier/cautionary/keenat-lca-retreat.md`, "Use in this lab"). |
| MéGo 80 percent and cross-company percentages | Supplemental B and C call 80 percent contradicted by whole-butt estimates or Re-Cig's approximately 39 percent. Primary B stresses denominator mismatch. | **U**, not contradicted. Fresh whole-butt split, dry CA recovery, filter-only composition, and collected-mass product accounting are incompatible denominators (`reports/stage2/assumption-and-gap-ledger.md`, A-01, A-03, K-01 to K-03, C-04). |
| "Fatal" evidence gaps and sink language | A and supplemental B often use "fatal" for absent evidence. Primary B distinguishes a claim failure from a potentially fixable mechanism. C generally calls families fixable or unknown. | Missing evidence can be fatal to an unqualified clean/detox claim without proving the process itself fails. Separately record: stream named, collection boundary named, final treatment/disposal named, and analytical performance demonstrated. Re-Cig names an external boundary; F4 names a concentrate; F5 names liquor/precipitate/recycle. None has packet-level analytical fate closure. |

The strongest minority warning that survives is not "encapsulation always fails"; it is that F2 can lower product concentration by dilution while transferring volatile contaminants to an unmeasured off-gas and retaining less-volatile contaminants in the composite. The strongest scale objection is Slot C's point that no family has comparable energy, reagent, cost, or throughput evidence; this blocks cross-family deployment ranking but does not determine chemistry.

## Batch-level answers

### Q1: What product classes are actually being compared?

F0, parts of F1, F3, and F4 seek to retain or recover CA-containing material. F2 compounds a minority filter fraction into a thermoplastic composite. F5 deacetylates CA toward cellulose. F1 itself spans fibres, granules, composite filler, paper/compost routes, and reported sludge handling. These are not one interchangeable product class (`reports/stage2/reconstruction-index.md`, §2 "What each unit contributes to the panel"; `specs/company-workflow-dossiers-batch01.md`, §8 "Cross-entity observations for Stage 3").

No family is shown to fail as a process. Several broad claims fail for lack of evidence: purified/detoxified product, complete thermal destruction, and closed toxic fate are not established.

### Q2: Where can toxic fractions go?

- F0: water and ethanol extracts, retained CA, and any unmeasured loss. Destination of the cleaning liquids is undisclosed.
- F1: recycle water, purge if any, sludge/rejects, composted organics, product, and external wastewater treatment in the Re-Cig variant. Boundaries are partly named; performance and final sinks are not closed.
- F2: separated tobacco/paper, heating and extrusion off-gas/condensate, residual composite, and end-of-life release. Capture and analytical closure are absent.
- F3: insoluble solids, precipitated polymer, mother liquor/wash water, recovered solvent, and vapour losses. CNR names treatment for pollutant water; CN and Cerdia remain incomplete.
- F4: retained fibre, named concentrate, sorbents/filters if used, purge, and off-gas/loss. Final concentrate destination and metal fate are unresolved.
- F5: pulp, dark liquor, acid precipitate, recycle liquor, wash water, and treated discharge. Outlet performance and precipitate destination are unresolved.

This is a fate map, not evidence that the destinations are safe or legally adequate.

### Q3: Are the temperature and pressure claims plausible as stated?

- F2: the frozen patent read supports 80-100 C only for step b. It does not justify merging that range with the approximately 200 C company/press statement. Drying or partial volatilization is plausible; destruction is not established without residence time, atmosphere, kinetics, species-specific fate, and off-gas capture (`specs/keenat-fr3110470a1-source-reconstruction.md`, §4 "The key unresolved conflict"; `reports/stage2/errata-packet-v1.0.md`, §1 E-05/E-06).
- F4: 50-60 bar near 30 C is below the packet's CO2 critical point and is not supercritical CO2, although dense/subcritical extraction may remain possible. The patent's preferred 280-320 bar range is a disclosure range, not an operated setpoint (`specs/pressurized-fluid-reference.md`, "Disclosed in P's accessed description"; `reports/stage2/assumption-and-gap-ledger.md`, §3 C-02 and §4 G-05).
- F3: the application description's broader room-temperature-to-95 C and 0.25-4 h envelope must remain separate from the prior same-author reading of granted claims at 75-95 C and 2-4 h (`reports/gap-check-01.md`, "Chinese grant: important distinction"; `reports/stage2/errata-packet-v1.0.md`, §1 E-01).

### Q4: What single batch-wide discriminator is most useful?

An analyte-resolved, dry-mass-normalized fate balance is the most discriminating common measurement. It is specified below. The unsupported 80/10/70 percent thresholds introduced by supplemental B and C are not adopted.

### Q5: What evidence would change the judgment?

A denominator-explicit fate balance that closes target analytes across product and every residual stream, with uncertainty and detection-limit basis, would materially change confidence. A favorable fate balance would still need a separate, use-specific product gate for leaching, polymer or cellulose properties, and performance. An unfavorable balance showing transfer to product, uncontrolled off-gas, recycle accumulation, or unexplained loss would weigh against the corresponding clean/detox claim. Audit-ready LCA or cost comparisons become interpretable only after product function and system boundaries are made comparable.

## Per-family synthesis

### F0: staged water/ethanol washing

- **Strongest supported claim:** **S/M** Used filters were treated at 50 C in water, cold-water washed, ethanol washed, and dried; the recovered material received morphology, FTIR, DSC/TGA, and later film-forming characterization (`specs/de-fenzo-2020-source-reconstruction.md`, "Disclosed process, not recommended operating instructions" and "What was actually evaluated").
- **Principal gap/failure:** **U** No dry process yield, wash loading, analyte panel, contaminant-removal fraction, or liquid-waste sink is supplied. FTIR and thermal characterization do not measure nicotine, TSNAs, PAHs, or trace metals (`reports/stage2/assumption-and-gap-ledger.md`, §4 G-01 to G-03; `reports/gap-check-01.md`, "Paper cross-check").
- **Toxic-stream destination:** **H/U** Contaminants may partition into water and ethanol or remain in CA; neither partition nor final liquid destination is measured. Acetone belongs to the later film-casting demonstration, not the cleaning train.
- **Discriminating measurement:** Dry-feed-to-water/ethanol/recovered-CA analyte closure for the common target panel, with liquid volumes and dry masses recorded.
- **Required distinction:** Recovered material identity is supported; process recovery fraction and polymer purity are not. Detoxification is not established. The brittle cast film is a forming demonstration, not proof of a usable product.

### F1: mechanical separation plus aqueous washing

- **Strongest supported claim:** **S** MéGo's abstract describes grinding, sieving, water washing, recycle, drying, and milling. Re-Cig names double washing and an external wastewater purification boundary; other company variants name outputs such as compost, fibres, granules, or lumber filler (`specs/mego-fr3066128a1-source-reconstruction.md`, §§2-6 and §9; `specs/company-workflow-dossiers-batch01.md`, §§2-8).
- **Principal gap/failure:** **U** Wash conditions, recycle purge, analyte accumulation, dry CA recovery, sludge/reject composition, and product assays are absent or ambiguous (`reports/stage2/assumption-and-gap-ledger.md`, §4 G-08 to G-11 and G-14).
- **Toxic-stream destination:** Partly named but analytically open. MéGo reports recycle and a possible sludge-to-product route; Re-Cig names an external treatment boundary; Code Effort and TerraCycle report compost-related destinations. None supplies packet-level outlet or leachate results.
- **Discriminating measurement:** Analyte closure over repeated recycle cycles across feed, product, water inventory, purge, sludge/reject, and any composted fraction.
- **Required distinction:** Collected-mass product percentages are not dry CA recovery or purity. Washing is not detoxification. Commercial product descriptions do not establish use-specific safety or performance.

### F2: dry heat plus thermoplastic composite

- **Strongest supported claim:** **S/C** The partial patent read supports separation, an 80-100 C step-b treatment, grinding, and extrusion with 10-30 percent filter fraction plus 70-90 percent thermoplastic. The corresponding 100-300 kg and 700-900 kg per tonne values are formulation arithmetic, not recovery or detoxification (`specs/keenat-fr3110470a1-source-reconstruction.md`, §§2-5; `reports/stage2/assumption-and-gap-ledger.md`, §2 K-04).
- **Principal gap/failure:** **U** Residence time, atmosphere, mass loss, frozen-packet extrusion profile, off-gas capture, analyte fate, and composite leaching are absent (`reports/stage2/assumption-and-gap-ledger.md`, §4 G-04).
- **Toxic-stream destination:** **H/U** Material removed by heating must enter off-gas/condensate or another loss; less-volatile material may remain diluted or encapsulated in the composite. The separated tobacco/paper destination is also incomplete.
- **Discriminating measurement:** Target-analyte balance across feed, separated organics, treated filter, captured off-gas/condensate, and final composite.
- **Required distinction:** This route recovers no purified CA isolate; it incorporates a filter fraction into a composite. Composite loading is not polymer purity, detoxification, or contaminant destruction. Usability and leaching remain untested in the packet.

### F3: solvent dissolution and precipitation

- **Strongest supported claim:** **S** CN106928486 describes pretreatment, concentrated acetic-acid processing, washing/drying, and a 58-92 percent recovery assertion. CNR describes acetone dissolution, solid filtration, water antisolvent precipitation, solvent recovery, and pollutant-water treatment (`specs/cn106928486-source-reconstruction.md`, "Plain-language mechanism," "Source-reported parameters and distinctions," and "What the source supports and does not support"; `specs/company-workflow-dossiers-batch01.md`, §6 "CNR / AzzeroCO2").
- **Principal gap/failure:** **U** The 58-92 percent denominator and example feed mass are missing. Contaminant co-precipitation, residual solvent, solvent-loop loss, molecular-weight retention, and treatment performance are unmeasured (`reports/stage2/assumption-and-gap-ledger.md`, §4 G-06, G-12, and G-13).
- **Toxic-stream destination:** CNR names solids, solvent recovery, and pollutant water sent to treatment but gives no partition or outlet data. CN stream combination/disposal and Cerdia's sink remain unresolved.
- **Discriminating measurement:** A denominator-defined dry-CA recovery and target-analyte partition balance across precipitated CA, insoluble solids, mother liquor/washes, recovered solvent, and vapour loss.
- **Required distinction:** Dissolution/precipitation is coherent recovery logic; the stated percentage is not validated purity or detoxification. Residual solvent, polymer properties, and use performance remain separate usability gates.

### F4: dense/pressurized-fluid extraction

- **Strongest supported claim:** **S** The partial patent describes prepared fibres contacted with dense pressurized fluid, preferably CO2, to extract organics. The company separately states 99.7 percent fibre and 0.3 percent concentrate in a closed loop (`specs/pressurized-fluid-reference.md`, "Disclosed in P's accessed description" and "Company statement, separately attributed").
- **Principal gap/failure:** **U** Actual pressure, temperature, fluid composition, co-solvent, cycle conditions, analyte-specific extraction, metal fate, polymer effects, and a common dry-mass basis are absent (`reports/stage2/assumption-and-gap-ledger.md`, §4 G-05).
- **Toxic-stream destination:** A concentrate is named, but its composition and final destination are not. Sorbents, filters, recycle purge, makeup fluid, and emissions are not closed in the packet.
- **Discriminating measurement:** Logged P/T/fluid composition and phase state paired with target-analyte closure across feed, fibre, concentrate, purge/sorbents, and losses.
- **Required distinction:** Retaining fibre while extracting some organics is not verified polymer recovery, purity, or detoxification, particularly for metals. "No water/no toxic solvent" does not mean no extraction fluid. Usability remains unverified.

### F5: pulping/deacetylation to cellulose

- **Strongest supported claim:** **S** Author-summary and secondary material describe NaOH pulping/deacetylation toward cellulose, dark liquor, and acid precipitation/recycle. The primary patent and paper full text were not read for the frozen packet (`specs/unb-pi0305004-source-reconstruction.md`, §§1-5 and §8).
- **Principal gap/failure:** **U** Pulp yield, operating conditions, product assay, liquor-treatment performance, wash-water outlet, and precipitate disposal are missing (`reports/stage2/assumption-and-gap-ledger.md`, §3 C-07 and §4 G-07).
- **Toxic-stream destination:** Secondary descriptions place organics and contaminants in dark liquor; liquor recycle/treatment and acid precipitation are named, but treated-outlet performance and precipitate destination are unresolved.
- **Discriminating measurement:** Dry feed-to-pulp/liquor/precipitate/wash balance with target analytes and COD reported for each outlet.
- **Required distinction:** F5 converts CA toward cellulose; it is not CA recovery. "100 percent utilization" is not pulp yield, purity, detoxification, or usable-paper performance.

## One batch-wide next measurement

The single common discriminator is a **dry-mass-normalized, analyte-resolved fate balance** for nicotine, TSNAs, representative PAHs, and Cd/Pb/As/Hg. For each family it must report the fraction of each feed analyte found in saleable product, all liquid phases, sludge/rejects, captured off-gas/condensate, recycle purge, treatment outlet, and unexplained loss, with sample basis, uncertainty, recovery, and detection/quantitation limits.

This measurement distinguishes transfer to a controlled sink from dilution, encapsulation, recycle accumulation, and unclosed loss. No universal pass/fail percentage is justified by the packet. Polymer identity, molecular weight/degree of substitution, leaching under the intended use, and mechanical performance remain a separate usability gate. This is an evidence requirement, not authorization to conduct an experiment.

## Blockers and bounded revisions

### Acceptance blockers

1. No family has a complete dry-basis process mass balance with compatible denominators.
2. No family has analyte-resolved closure across product, residual liquids/solids, off-gas, purge, and unexplained loss.
3. Named streams or treatment boundaries are repeatedly presented as final sinks without outlet-performance evidence.
4. Product identity, purity, detoxification, leaching, and usability are not consistently separated.
5. Key operating conditions remain unresolved for F2, F3, and F4; F5 primary full text remains unavailable in the packet.
6. The Korean paving-stone and Keenat LCA notes are too indirect for automatic family verdicts.

### Bounded revisions

1. Add a denominator table for every percentage and mass claim: wet/dry, whole butt/filter, input/output, recovery/purity, and measurement versus company accounting.
2. Replace binary "sink/no sink" language with four fields: stream named, collection boundary named, final treatment/disposal named, analytical performance demonstrated.
3. Retrieve and version an official full text/translation for the F2 and F4 patent leads and the primary F5 thesis/paper before importing primary B's external details into the packet.
4. Correct F2 wording so the secondary paving comparator and unaudited LCA retreat trigger measurements rather than verdicts.
5. Remove the unsupported 80/10/70 percent thresholds and any implied same-feed six-arm trial from the supplemental B and C proposals. Keep only the measurement concept.
6. Revise manifest integrity wording to state LF-normalized hashing, or publish hashes of actual distributed bytes.
7. Keep use-specific product performance and leaching separate from the common contaminant-fate measurement.

These revisions do not require company contact, an experiment, Stage 4 work, or acceptance in this judging step.

## Recommendation

**REVISE.** Reject the present broad claims of demonstrated detoxification, safety, complete destruction, validated recovery/purity, closed toxic fate, or LCA superiority. Do not reject the six mechanism families merely because evidence is undisclosed. Preserve F3 as the strongest separation hypothesis, F2 as a composite rather than purified-polymer route, and the F2/F4/F5 external details as bounded verification leads.

This judge report records an evidence recommendation only. It does not claim independent laboratory validation, safety clearance, freedom to operate, commercial readiness, or experimental authorization. The operator alone may accept, reject, or request the bounded revisions.
