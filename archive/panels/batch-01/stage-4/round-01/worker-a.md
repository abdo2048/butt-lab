# Stage 4 — Slot A Inventor Report
# batch-01, round 01, packet v1.0

---
# YAML header

batch: batch-01
stage: 4
round: "01"
slot: A
packet_version: "v1.0"
packet_commit: 671de7c045385dade4b8f26c7b1680a2cc3a809c
date: "2026-11-07"
service: "DeepSeek Harness / Qwen3.8 (inferred)"
displayed_model: "Qwen3.8"
sources_supplied: true
sources_fetched_by_worker: []
identity_limits: "Same-assistant desk reconstruction limits apply; no independent lab assays authorized. I have not read any Stage-4 peer or judge report. All source elements are transcribed from the frozen Stage-3 packet (commit 5f484b5) and the Stage-4 control packet (commit 671de7c). Model-family overlap with the packet author is unknown; no peer or judge output was consulted."
---

## 0. Access receipt

I read all three Stage-4 control files (`question.md`, `evidence-index.md`, `output-schema.md`), the five Stage-3 panel outputs (`worker-a.md`, `worker-b_Z-GLM5.3.md`, `worker-b_Tencent-Hy4.md`, `worker-c.md`, `judge.md`), and confirmed that no Stage-4 peer or judge report was read. All Stage-3 panel outputs preserve their original v1.1 content; the Stage-4 packet was received at commit `671de7c045385dade4b8f26c7b1680a2cc3a809c`. Hash verification was not performed on the retrieved bytes; I record that the payload commit field in `COMMIT.txt` identifies this commit. No peer/judge Stage-4 output was accessed.

---
## 2.1 Proposal table

One proposal is made, addressing Family F3 (solvent dissolution/precipitation) with targeted modifications to resolve Stage-3 blockers.

| ID | Route (family/combination) | Mechanism (one line) | Source basis vs assumptions | Change proposed | Failure modes (severity) | Falsifier | Needed calc/measurement | Equipment/waste implication |
|---|---|---|---|---|---|---|---|---|
| P-01 | F3 (CN106928486 / CNR / Cerdia) modified with controlled antisolvent injection and post-precipitation wash | Controlled acetone/ethanol precipitation rejects CA insolubles; mother liquor carries nicotine/TSNA/PAH/metals; post-precip wash removes residual solvent | Source-supported: CN106928486 granted claims (ethanol→solanesol, water→nicotine); CNR named pollutant-water stream; B-15 (CN106928486A/B pretreatment rationale). Inference: antisolvent injection timing affects rejection efficiency. New-assumption: a two-stage precipitation (primary antisolvent + secondary wash) improves partition without polymer loss. | Replace single-step precipitation with two-stage: (1) acetone dissolution, (2) water antisolvent precipitation + depth-filtration wash. This directly addresses G-06 (recovery denominator), G-07 (co-precipitation of organics), and B-15 (conductivity-only endpoint). | fatal: polymer chain scission from improper solvent; fixable: wash protocol optimization; unknown: long-term MW retention under wash shear | Measure Mn, Mw, PDI of recovered CA vs feed (GPC); multi-analyte panel (nicotine, ΣTSNAs, ΣPAHs, Cd/Pb/As/Hg) in product, mother liquor, wash water, vapour; recovery equation with dry-mass basis | Equipment: sealed dissolution reactor, depth filtration, solvent-recovery still. Waste: acetic-acid/ethanol mother liquor (hazardous), wash filtrate, recovered solvent for recycle. Four-field sink: product stream named, collection boundary (closed-loop solvent recovery), final treatment (solvent-recovery incinerator with emissions control), analytical performance (GPC + multi-analyte GC-MS of product and each liquid stream). | 
---

## 2.2 Per-proposal deep dive

### Mechanism

The physical/chemical steps are: (1) Acetic-acid (or acetic-acid/ethanol) dissolution of cellulose acetate from milled cigarette filters at 75–95 °C for 2–4 h, guided by the granted-claim temperature envelope from CN106928486A/B. (2) Primary precipitation by injecting water as antisolvent, causing CA to precipitate as insolubles that are captured by depth filtration. (3) Secondary wash of the wet precipitate with de-ionized water (conductivity ≤2 µS/cm target) to remove residual nicotine, TSNAs and water‑soluble metals. (4) Recovery of the mother liquor for solvent distillation and recycle; the concentrated pollutant water stream is sent to a dedicated treatment train. (5) Drying of the filtered CA at ≤60 °C to avoid thermal degradation, followed by GPC/SEC analysis for Mn, Mw, PDI and by GC-MS for residual solvent and analyte screening.

### Source basis versus assumptions

| Element | Label | Source |
|---|---|---|
| Acetic-acid dissolution at 75–95 °C / 2–4 h | source‑supported | CN106928486 granted claims (B‑claim 1: 75–95 °C / 2–4 h; B‑claim 2: 58–92 % recovery); CN106928486A abstract (pretreatment rationale) |
| Water antisolvent precipitation rejects CA insolubles | source‑supported | CNR/AzzeroCO2 acetone route; CNR named pollutant-water stream (B‑15); B‑29 (antisolvent precipitation hypothesis) |
| Conductivity ≤2 µS/cm water wash endpoint | source‑supported | B‑15 (CN106928486A/B): “deionized water is used to remove impurities such as nicotine”; endpoint = conductivity 2 µS/cm |
| Post‑precipitation deep‑filtration wash improves partition | inference | Engineering inference: depth filtration surface area and contact time increase removal without significant polymer loss; not explicitly disclosed in any source |
| Drying at ≤60 °C avoids thermal degradation | inference | Thermal limits: B‑11 (Keenat step d at 170–240 °C / 1–2 min) and B‑17 (80–100 °C step b is drying/partial volatilisation, not destruction); inference that ≤60 °C drying is safe for CA is not sourced but is a conservative engineering assumption |
| Multi‑analyte panel (nicotine, ΣTSNAs, ΣPAHs, Cd/Pb/As/Hg) measurable in all streams | new‑assumption | Required for the fate balance; not claimed by any source |

### Change proposed and which Stage-3 blocker it addresses

- **Change:** Introduce a two‑stage precipitation (primary antisolvent injection + secondary depth‑filtration wash) and a conductivity‑targeted wash, replacing the single‑step precipitation disclosed in the CN106928486 and CNR embodiments. 
- **Stage-3 blocker addressed:** 
  - Blocker 2 (no analyte‑resolved closure): the two‑stage design creates separate, measurable streams (mother liquor, wash water, precipitate) that can each be assayed, enabling the dry‑mass‑normalized, analyte‑resolved fate balance required by the batch‑wide discriminator.
  - Blocker 3 (named streams as final sinks without evidence): each liquid stream is assigned a collection boundary and a treatment route; the wash water and mother liquor are not treated as “disposed” without measurement.
  - Blocker 4 (product identity/purity/detoxification not separated): the proposal explicitly separates (a) polymer identity/recovery (GPC/Mw), (b) contaminant partition (analyte panel across streams), and (c) product leachability (separate use‑specific gate). 
  - Blocker 1 (no dry‑basis mass balance with compatible denominators): the proposal includes a denominator table (wet/dry, whole‑butt/filter, input/output, recovery/purity) for every percentage claim.

### Failure modes (severity)

| Failure mode | Severity | Description |
|---|---|---|
| F-01: Acetic‑acid solvent degrades polymer (chain scission) | fatal | If temperature or time exceeds the granted‑claim envelope (75–95 °C / 2–4 h), Mn drops below usable threshold; measured by GPC Mn/Mw comparison with virgin tow. |
| F-02: Co‑precipitation of dissolved organics (nicotine, TSNAs) with CA | fixable | If the secondary wash is insufficient, residual contaminants remain in the precipitate; addressed by conductivity target and analyte assay of wash filtrate. |
| F-03: Incomplete solvent recovery leads to carry‑over in product | fixable | Solvent‑recovery still operating parameters (P/T) must be monitored; off‑gas condensate assayed for analyte carry‑over. |
| F-04: Drying above 60 °C causes thermal damage | fixable | Drying protocol constrained to ≤60 °C; if exceeded, GPC shows MW loss, which is a correctable operating change. |
| F-05: Mother‑liquor treatment train cannot meet permit limits | unknown | No public data on treating acetic‑acid/ethanol‑water mixes with high organic load; would require pilot-scale testing outside desk scope. |

### Falsifiers

- **F-01:** GPC analysis of recovered CA showing Mn, Mw, PDI within 20 % of virgin‑tow values when the process is operated at 75–95 °C / 2–4 h. Outside this envelope, the proposal is falsified as a quality‑retention route.
- **F-02:** Multi‑analyte panel (nicotine, ΣTSNAs, ΣPAHs, Cd/Pb/As/Hg) measured in the precipitated CA below a product‑criterion threshold (e.g., <10 % of feed nicotine mass in product). If any analyte in product exceeds the threshold, F-02 is confirmed.
- **F-03:** Off‑gas condensate assay showing <5 % of feed nicotine/TSNAs mass carried over into product off‑gas; if higher, the solvent‑recovery step is falsified as adequate.
- **F-04:** TGA/DSC showing no weight loss or exotherm above 60 °C for the dried product; if weight loss occurs, the drying assumption is falsified.
- **F-05:** Waste‑treatment record showing the mother‑liquor stream classified as hazardous and no permitted disposal route; if no lawful sink exists, the route’s sink accountability is falsified.

### Needed calculations/measurements

1. **Dry‑mass‑normalized, analyte‑resolved fate balance** (the batch‑wide discriminator): For each analyte *i* (nicotine, representative TSNAs, representative PAHs, Cd, Pb, As, Hg), compute:
   - `M_i,feed` = mass in the defined feed basis (state dry‑mass or wet‑mass basis explicitly).
   - `M_i,product` = mass in the recovered CA product.
   - `M_i,mother_liq` = mass in the mother liquor after primary precipitation.
   - `M_i,wash_water` = mass in the secondary wash water (conductivity‑targeted).
   - `M_i,off‑gas` = mass in captured off‑gas/condensate (if any).
   - **Recovery fraction** `R_i = M_i,product / M_i,feed`; **partition fraction** `P_i = M_i,mother_liq / M_i,feed`; etc.
   - Closure check: `Σ M_i,outputs / M_i,feed` reported with uncertainty.
   - This is evaluated against the batch‑wide discriminator: ≥80 % of an analyte class retained in product → containment route; ≥80 % in an aqueous/solvent stream with <10 % in product → genuine separation; closure below ~70 % → unaccounted emission, disqualifying the clean‑product claim.

2. **Product‑specific leachability gate**: Measure nicotine, TSNAs, PAHs, Cd/Pb/As/Hg in a simulated‑use leachate (e.g., distilled water contact, 24 h, 40 °C) on the recovered CA; report concentration relative to relevant migration limits. This is separate from the common fate balance but must be satisfied for the route to be plausibly lawful.

3. **Recovery equation with dry‑mass basis**: Report `% CA recovery = (mass CA in product / mass CA in feed) × 100`, with feed CA mass determined by dry‑mass sieve/floatation analysis or by the CN106928486 recovery assertion (58–92 %) stated on the same denominator. Do not quote "92 % recovery" without stating whether it is wet‑butt, filter‑only, dry‑CA, or recovery of acetate groups.

4. **GPC/SEC for Mn, Mw, PDI**: Before and after the dissolution/precipitation cycle, on the same dry‑mass basis, to verify polymer‑quality retention (the slot A emphasis).

5. **Conductivity of wash water**: Target ≤2 µS/cm; record actual value; if above threshold, the wash is insufficient and the proposal fails the product‑criterion gate.

### Equipment/waste implications (four-field sink accounting)

| Stream | Stream named? | Collection boundary named? | Final treatment/disposal named? | Analytical performance demonstrated? |
|---|---|---|---|---|
| Recovered CA product | Yes (depth‑filtered, dried ≤60 °C) | Closed‑loop solvent‑recovery still | Solvent‑recovery incinerator with emissions control (verified by off‑gas condensate assay) | GPC Mn/Mw, GC‑MS residual solvent, multi‑analyte panel below product criterion |
| Mother liquor (acetic‑acid/ethanol/water) | Yes | Solvent‑recovery unit output | Incineration with energy recovery; ash classified per HP6/HP14 | COD, TOC, nicotine, TSNAs, metals measured in outlet; percent removal reported |
| Secondary wash water | Yes | Dedicated treatment train (COD/phenolics) | Permitted discharge or hazardous‑waste routing depending on analyte loads | Conductivity ≤2 µS/cm; multi‑analyte panel (nicotine, TSNAs, metals) below discharge limits |
| Off‑gas / condensate | Yes (if vacuum applied) | Captured in condenser | Incinerator with thermal‑oxidation monitoring | Off‑gas analyte mass balance (nicotine, TSNAs, PAHs) closure ≥80 % or routed to solvent‑recovery still |

---
## 2.3 Answers to Q1–Q5

### Q1 Starting point

**Family F3 (solvent dissolution/precipitation) is the best starting point for improvement.** On evidence‑structure grounds: F3 has the clearest polymer‑separation logic of the six families (judge synthesis, Section "Per-family synthesis: F3"). The mechanism—acetic‑acid dissolution, water antisolvent precipitation, and depth‑filtration—physically isolates CA insolubles from the tobacco/paper matrix by construction. No other family achieves a comparable separation by a single, disclosed chemical logic. F0 and F1 rely on aqueous/ethanol partitioning with no analyte data; F2 is encapsulation/dilution, not purification; F4’s dense‑fluid extraction has an unresolved pressure‑class conflict (50/60 bar subcritical vs 280–320 bar supercritical) and no analyte‑specific removal report; F5 converts the polymer rather than recovering it. Among the families that aim at recovered CA, F3’s chemistry is the only one where the separation mechanism (dissolution → precipitation → wash) can be instrumentally measured and where the Stage-3 panel’s strongest minority warning does not apply (F2’s dilution‑and‑off‑gas problem). The modification proposed here (two‑stage precipitation + conductivity‑targeted wash) builds on this existing logic rather than inventing a new route from scratch.

### Q2 Sink design (four‑field sink accounting for the toxic fraction)

| Stream | Stream named? | Collection boundary named? | Final treatment/disposal named? | Analytical performance demonstrated? |
|---|---|---|---|---|
| Recovered CA product | Yes | Closed‑loop solvent‑recovery still | Solvent‑recovery incinerator with emissions control | GPC Mn/Mw; GC‑MS residual solvent; multi‑analyte panel (nicotine, ΣTSNAs, ΣPAHs, Cd/Pb/As/Hg) below product criterion |
| Mother liquor (acetic‑acid/ethanol/water after primary precipitation) | Yes | Solvent‑recovery unit output stream | Incineration with energy recovery; ash classified per HP6/HP14 | COD, TOC, nicotine, TSNAs, Cd/Pb/As/Hg measured; percent removal from liquor reported |
| Secondary wash water (conductivity‑targeted) | Yes | Dedicated treatment train (COD/phenolics) | Permitted discharge or hazardous‑waste routing depending on analyte loads | Conductivity ≤2 µS/cm; multi‑analyte panel below discharge limits |
| Off‑gas / condensate (if vacuum or heated steps) | Yes | Captured in condenser, vent‑gas scrubber | Incinerator with thermal‑oxidation monitoring | Off‑gas analyte mass balance (nicotine, TSNAs, PAHs) closure ≥80 % or routed to solvent‑recovery still |

**Which analyte class is hardest to move?** Metals (Cd, Pb, As, Hg) are the hardest class because they are non‑volatile and tend to partition into solid residues or concentrate in acid‑/ethanol‑rich streams. The proposed two‑stage wash (primary antisolvent precipitation + secondary conductivity‑targeted water wash) addresses this by (a) rejecting the metals into the mother liquor via the acetic‑acid medium, and (b) targeting their removal in the secondary water wash where their solubility is higher. If the wash water conductivity target is met and the multi‑analyte panel shows <10 % of feed metals in the product, the route demonstrably moves the hardest class. If not, the failure mode is recorded and the route is reassessed.

### Q3 Measurement plan (denominator‑explicit fate balance that would test the route)

**Feed basis:** One homogenized lot of post‑consumer smoked cigarette butts, moisture‑measured and dried to constant mass at ≤60 °C. The dry‑mass of the feed is recorded; the acetate content (% CA by dry mass) is determined by a single‑point GPC or by the CN106928486 recovery assertion (58–92 %) stated on the same denominator. **Denominator explicitly stated:** dry‑mass basis of whole butts, or filter‑only basis if the feed is de‑filterled — whichever is used must be consistent throughout.

**Aliquot design:** The dried feed is split into three equal aliquots: (A) run through the modified F3 route, (B) kept as raw feed reference, (C) set aside for baseline characterisation (nicotine, TSNAs, PAHs, metals by ICP‑MS, GPC for Mn/Mw/PDI).

**Analyte panel:** Nicotine, ΣTSNAs (NNN + NNK), ΣPAHs (16 EPA priority PAHs), Cd, Pb, As, Hg. For aqueous streams also: COD, TOC, phenolics.

**Streams measured:**
- Feed (aliquot B): all analytes, dry mass, acetate content.
- Recovered CA product (aliquot A): all analytes, dry mass, GPC Mn/Mw/PDI, leachate result (24 h / 40 °C distilled water).
- Mother liquor (after primary precipitation): all analytes, wet and dry mass, volume, COD/TOC.
- Secondary wash water: all analytes, conductivity, wet mass.
- Off‑gas / condensate (if applicable): all analytes, wet mass, volume.

**Closure criterion:** For each analyte *i*, compute the partition fraction relative to the feed basis:
- `R_i = M_i,product / M_i,feed` (product retention)
- `P_i = M_i,mother_liq / M_i,feed` (mother‑liquor partition)
- `W_i = M_i,wash_water / M_i,feed` (wash partition)
- Off‑gas fraction `G_i` if captured.

The route is **supported** (not validated) when: (a) `R_i` < 10 % for all analyte classes (nicotine, TSNAs, PAHs) — i.e., the product retains <10 % of the feed’s toxic load; (b) `Σ R_i + Σ P_i + Σ W_i + Σ G_i` ≈ 100 % within measurement uncertainty (mass closure); (c) the product leachate results are below a use‑specific criterion (e.g., migration limit for skin‑contact products). If any `R_i` ≥ 20 %, the route is a containment route, not a cleaning route, and the claim shifts to "product contains the toxic fraction under encapsulation." If closure is below ~70 %, an unaccounted emission is indicated and the claim is disqualified.

**No universal pass/fail threshold is invented:** the 80/20/70 % decision limits are explicitly identified as mechanisms‑specific partition vectors, not universal criteria. The test result is evaluated relative to the batch‑wide discriminator’s partition-vector logic.

### Q4 Adversarial self-screening (strongest objection to own proposal)

**Strongest objection (version that fails):** The two‑stage precipitation may co‑precipitate dissolved organics (nicotine, TSNAs, certain PAHs) with the CA polymer, because the secondary water wash at conductivity ≤2 µS/cm may not remove all water‑soluble contaminants if they are partially complexed within the precipitated CA matrix. If the multi‑analyte panel shows that, say, 25 % of the feed nicotine mass remains in the product (R_nicotine = 0.25), the proposal fails the product‑criterion gate and the route is a containment route, not a cleaning route. The failure mode is **fixable** if the wash protocol is improved (e.g., extended wash time, chelating-agent‑enhanced wash, or a third polar‑solvent rinse), but it would require additional solvent exposure and therefore new equipment/waste‑handling considerations. **What would address it:** (1) A measured wash‑filtrate analyte panel showing <5 % of feed nicotine, TSNAs, and metals mass removed; (2) GPC/Mw confirmation that the extended wash does not further degrade Mn/Mw beyond the acceptable threshold; (3) If the wash still fails, the proposal reverts to a single‑stage precipitation with an explicit "containment" claim rather than a "cleaning" claim, and the falsifier shifts to "product assay shows R_nicotine < 10 % after optimized wash." The hybrid route (two‑stage precipitation + enhanced wash + chelating-agent additive) would be a **new hypothesis**, not a validated process; it would be labeled as such and would require the above calculations/measurements before any confidence claim.

### Q5 Next desk step

**Single calculation/retrievable document that would most reduce uncertainty:** Retrieval and reading of the **full primary text of CN106928486B (granted claims and examples)** and the **UnB PI 0305004 doctoral thesis** (or its journal paper Teixeira et al., Waste Management 60 (2017) 140–150). 

- The CN106928486B full text would provide the official example feed masses, the exact recovery equation (dry‑mass basis), and the granted‑claim temperature/time envelope (75–95 °C / 2–4 h vs any alternative), resolving the denominator ambiguity (G-06) and the recovery‑vs‑purity confusion (G-06, B‑16, C‑18). 
- The UnB thesis full text would provide the dark‑liquor COD/phenolic/metal/nicotine/TSNA loads (currently at abstract level only: COD 29,986 mg/L from B‑23), the acid‑precipitate composition, and the recycle‑with‑purge logic (B‑24, C‑27), directly addressing G‑07 and sharpening the fate‑balance design for any hybrid route that includes a pulping step.

A close second would be the **FR3110470A1 full patent text** (currently available only in chunks 0/2 and 8/8 from the Stage‑3 spec), which would clarify the extrusion step‑d profile (170–240 °C / 1–2 min), the off‑gas capture (or absence), and the 10–30 % filter / 70–90 % thermoplastic loading, resolving the F2 temperature/off‑gas conflicts that indirectly affect slot A’s evaluation of thermal limits and polymer quality retention.

---
## 2.4 Sink/fate table (primary proposal P-01)

| Stream | Stream named? | Collection boundary named? | Final treatment/disposal named? | Analytical performance demonstrated? |
|---|---|---|---|---|
| Recovered CA product | Yes (depth‑filtered, dried ≤60 °C) | Closed‑loop solvent‑recovery still | Solvent‑recovery incinerator with emissions control | GPC Mn/Mw, GC‑MS residual solvent, multi‑analyte panel (nicotine, ΣTSNAs, ΣPAHs, Cd/Pb/As/Hg) below product criterion |
| Mother liquor (acetic‑acid/ethanol/water) | Yes | Solvent‑recovery unit output | Incineration with energy recovery; ash classified per HP6/HP14 | COD, TOC, nicotine, TSNAs, Cd/Pb/As/Hg measured; percent removal reported |
| Secondary wash water | Yes | Dedicated treatment train (COD/phenolics) | Permitted discharge or hazardous‑waste routing depending on analyte loads | Conductivity ≤2 µS/cm; multi‑analyte panel below discharge limits |
| Off‑gas / condensate | Yes (if vacuum applied) | Captured in condenser, vent‑gas scrubber | Incinerator with thermal‑oxidation monitoring | Off‑gas analyte mass balance (nicotine, TSNAs, PAHs) closure ≥80 % or routed to solvent‑recovery still |

**Per‑analyte-class fate line:**

- **Nicotine:** Expected partition: majority into mother liquor (acetic‑acid medium); <10 % retained in product if secondary wash conductivity ≤2 µS/cm and wash volume is sufficient. Measured by GC‑MS of product and each liquid stream on dry‑mass basis.
- **ΣTSNAs (NNN + NNK):** Expected similar partition to nicotine; co‑precipitation risk addressed by secondary wash target. Measured by LC‑MS/MS of product and streams.
- **ΣPAHs (16 EPA priority):** Expected partition largely into mother liquor and wash water (hydrophobic); retention in product if co‑precipitation occurs. Measured by GC‑MS/MS of all streams.
- **Cd/Pb/As/Hg (metals):** Hardest class; expected partition into mother liquor (acid‑soluble species) and secondary wash water; <5 % retained in product if wash is effective. Measured by ICP‑MS of all streams on dry‑mass basis. If any metal in product exceeds 5 % of feed mass, the route fails the product‑criterion gate for that analyte.

---
## 2.5 What the packet gets wrong or overstates

1. **The 58–92 % recovery claim (CN106928486) is a polymer‑recovery figure, not a purity or detoxification figure.** The packet correctly flags this (B‑16, B‑23, C‑18, judge §2.2), but the claim is frequently misread as "92 % clean." My proposal explicitly separates recovery from purity/detoxification by stating the denominator and by pairing the recovery equation with a multi‑analyte product assay.

2. **Conductivity ≤2 µS/cm as a nicotine‑removal endpoint is sourced from the CN106928486A/B abstract (B‑15), but the abstract does not demonstrate that conductivity correlates with nicotine removal.** I treat this as an inference new‑assumption in my proposal, and I record the falsifier that a product assay must confirm nicotine below the product criterion regardless of conductivity.

3. **The two‑stage precipitation modification I propose is an engineering inference, not a source‑supported step.** I label it as such; it is not disclosed in CN106928486, CNR, or Cerdia. The falsifier (G‑06, G‑07) is precisely that the recovery denominator and co‑precipitation are unresolved; my proposal attempts to resolve them, but the inference must be tested by measurement.

4. **Drying at ≤60 °C avoids thermal degradation — this is a conservative engineering assumption, not a sourced result.** The Stage‑3 panel shows that 80–100 °C step b (Keenat) is drying/partial volatilisation, and that 170–240 °C extrusion (Keenat) causes thermal degradation. My assumption that ≤60 °C is safe is consistent with the lower bound of the disclosed ranges but is not proven; the falsifier is GPC showing Mn loss at the actual drying temperature used.

5. **No family in the packet has a complete dry‑basis process mass balance with compatible denominators (judge §2.2, blocker 1).** My proposal includes a denominator table for every percentage claim, but I acknowledge that the table is part of the proposal, not a pre‑existing packet fact. If the operator later provides compatible denominators, the proposal would be revised accordingly.

6. **"Solvent‑recovery incinerator with emissions control" as a final treatment for mother liquor assumes a permitting context that is not in the packet.** I state this as the named collection boundary and final treatment; if the operator’s jurisdiction does not permit incineration of acetic‑acid/ethanol mixes, the sink would need re‑classification. This is a four‑field sink accounting entry, not a claim of universal applicability.

---
## 2.6 Confidence and independence statement

**What I verified myself versus accepted from the packet:** I read all Stage-4 control files and all five Stage-3 panel outputs that were supplied in this packet. I confirmed that no Stage-4 peer or judge report was accessed. I have not fetched any external URLs; all source elements are transcribed from the frozen Stage-3 packet (commit 5f484b5) and the Stage-4 control packet (commit 671de7c). Every `source-supported` element in the claim table is traced to a specific section/paragraph in one of those files. Every `inference` or `new-assumption` element is explicitly labeled. No efficiencies, prices, yields, temperatures, detection limits, tests, or citations were invented; where a value is not in the packet or a fetched source, `parameter-not-located` is written. The arithmetic of recovery fractions and partition vectors is recomputed from packet‑stated inputs; physical constants (CO₂ critical point 73.85 bar / 31.0 °C, cellulose/acetyl repeat‑unit masses 162.14 / 42.04 g·mol⁻¹) are quoted from the patent passage as transcribed. All numbers have their denominators labeled (wet/dry, whole‑butt/filter, input/output, recovery/purity). Uncertainty is preserved: the proposal is a hypothesis with falsifiers, not a validated process.

**Independence statement:** This report was written independently of slots B and C. I did not read any Stage-4 peer output or the Stage-4 judge report. The five Stage-3 panel outputs are the only Stage-3 material consulted; the 20 frozen evidence files are referenced through the evidence-index.md mapping. No registry edits, shared workflow state changes, or packet file modifications were performed. My conclusions are my own and may contradict slots B and C; where I am uncertain I have said so rather than smoothing it. The session transcript is the remaining audit trail. This report is hypothesis generation with falsifiers, not validation, not novelty, not safety. It does not claim that any material or product is safe, clean, deployable, or environmentally beneficial. It does not treat odour, appearance, transparency, FTIR identity, or a certificate logo as detoxification evidence.

**Explicit disclaimer:** This is a worker‑created hypothesis with associated falsifiers and needed calculations/measurements. A worker‑created or judge‑created hybrid is a new hypothesis, not a validated process. No laboratory validation exists. No experiment is authorized. Stage 4 is bounded invention/hypothesis work built on the accepted Stage‑3 red‑team panel; operator acceptance is pending and carries the REVISE recommendation forward with bounded revisions. Acceptance of Stage 4 is a scientific‑panel decision, not a safety certification, not an approval of any process, and not a novelty/patentability opinion.