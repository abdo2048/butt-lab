# Stage-4 inventor report — Slot C (integration, balances, energy, cost, scaling)

```yaml
batch: batch-01
stage: 4
round: "01"
slot: C
packet_version: "v1.0"
packet_commit: "671de7c045385dade4b8f26c7b1680a2cc3a809c"
date: "2026-11-07"
service: "API chat"
displayed_model: "unknown"
sources_supplied: true
sources_fetched_by_worker: []
identity_limits: "Slot C only. No Stage-4 peer or judge report was read. No external source was fetched for this report; all claims resolve through the supplied packet files at the stated paths. Hash equality was not recomputed; I relied on the commit-pinned GitHub blob views."
```

## 0. Access receipt

Read from `github.com/abdo2048/butt-lab` at `main` (blob views, commit-pinned by the packet):

- `packets/batch-01/stage-4/question.md` — in full (120 lines).
- `packets/batch-01/stage-4/output-schema.md` — in full.
- `packets/batch-01/stage-4/evidence-index.md` — in full.
- `packets/batch-01/stage-4/manifest.yaml` — failed to open in the browser tool (`Error fetching URL`); the schema and evidence-index supplied the commit and file list, so the packet remained usable.
- Stage-3 panel outputs: `worker-a.md` (partially read; the tool truncated after the access statement and part of the revised report), `worker-b_Z-GLM5.3.md` (read the claim-table, family and Q sections in full), `worker-b_Tencent-Hy4.md` (read access, claim-table and family sections in part), `worker-c.md` (read the claim table, family synthesis and Q1–Q5 in part), `judge.md` (read the executive summary, provenance audit, per-family synthesis and Q5 in full).
- Stage-3 frozen evidence: `de-fenzo-2020-source-reconstruction.md`, `mego-fr3066128a1-source-reconstruction.md`, `keenat-fr3110470a1-source-reconstruction.md`, `cn106928486-source-reconstruction.md`, `pressurized-fluid-reference.md`, `unb-pi0305004-source-reconstruction.md`, `company-workflow-dossiers-batch01.md`, `assumption-and-gap-ledger.md`, `gap-check-01.md`, `ineris-waste-classification.md` — each read at least at the sections cited below. The remaining evidence files were not needed for the Slot C integration argument, and the packet’s own evidence-index records their scope.

No Stage-4 peer or judge report exists in the repository at the time of reading, and none was read. Hashes were not recomputed. The `manifest.yaml` failure is recorded as a partial-access limitation, not as a missing payload.

## 2.1 Proposal — F1‑P: mechanical separation plus aqueous washing with a mandated purge, external wastewater boundary, and a use-specific product gate

**Status label:** new combination / modification of F1. This is a hypothesis, not a validated process. It is not claimed novel, safe, deployable, or commercially successful.

### Mechanism

1. Grind and sieve collected butts to separate a fibre-rich filter fraction from paper/tobacco/ash (F1 disclosed sequence: `mego-fr3066128a1-source-reconstruction.md` §2–§3).
2. Wash the fibre fraction in water in a two-stage or counter-current configuration. The disclosed F1 sources name water washing but do not give water:feed ratio, temperature, contact time, or agitation (`mego…md` §3, step 4–5; `de-fenzo…md` §2).
3. **The change:** mandate a continuous or batch **purge** from the wash-water loop, sized to prevent accumulation of dissolved and suspended contaminants, and route that purge to a permitted external industrial wastewater treatment plant (the Re‑Cig boundary is the source-supported precedent: process water is entrusted to a certified purification partner, `company-workflow-dossiers-batch01.md` §5).
4. Separate the washed fibre from the wash liquor, dry it, and mill it to a fibrous product.
5. **The product gate:** before any sale or use, the dried fibre must pass a use-specific leachate and analyte panel for the intended non-food, non-child-contact application (for example, a filler in a thermoplastic composite or a non-structural board). The product is not declared safe; it is declared *tested against a stated use criterion*.

### Source basis versus assumptions

| Element | Label | Basis / reason |
|---|---|---|
| Grinding, sieving, water washing, drying, milling are disclosed F1 steps | **source-supported** | `mego-fr3066128a1-source-reconstruction.md` §2–§3; `de-fenzo…md` §2 for a related wash sequence |
| Water loop can be recycled | **source-supported (company claim, not verified)** | `mego…md` §3, step 6; `mego…md` §9 claim ledger |
| A purge is necessary if the loop is closed | **inference** | A closed loop with no purge is a concentration loop; contaminants must leave in product, sludge, or purge (`mego…md` §6, §10; `worker-c.md` C‑04) |
| Re‑Cig sends process water to an external purification partner | **source-supported (company statement)** | `company-workflow-dossiers-batch01.md` §5, §1 table |
| External wastewater treatment can accept and treat this purge | **new-assumption** | No permit, influent specification, or outlet data are in the packet. This is the central engineering assumption of F1‑P and is explicitly falsifiable. |
| The 8 % “sludge” stream can be separated from the product and routed to hazardous waste | **new-assumption** | MéGo company text describes sludge; whether it is inside the sold product is unresolved (`mego…md` §6; `assumption-and-gap-ledger.md` C‑08/G‑08). F1‑P requires it to be a separate reject. |
| A use-specific leachate gate is required before sale | **inference** | Product identity, purity and detoxification are separate gates (`question.md` §Context; `judge.md` executive summary). No family has established a product gate. |
| The washed fibre can meet a non-food composite specification | **new-assumption** | Mechanical performance (brittleness, fibre length) is not established; De Fenzo reports a brittle film that needs plasticizer (`de-fenzo…md` §3.4). F1‑P does not assume the fibre is a drop-in replacement. |

### Change proposed, and the Stage-3 blocker it addresses

**Change:** add a **mandatory, measured purge** to the F1 water loop and a **use-specific product gate** before sale; separate the sludge/reject from the product rather than melting it into the product.

**Blockers addressed:**
- “Closed-loop boundaries with purge” and “dilution accounting” (`question.md` Slot C emphasis): the purge converts a concentration loop into a managed discharge.
- “No family has analyte-resolved closure” (`question.md` accepted findings): the purge and reject streams become measured streams in the fate balance.
- “Named streams are presented as final sinks without outlet-performance evidence” (`question.md`): the external wastewater boundary is named as a *treatment* boundary, not a sink, and the product gate is the outlet performance test.

The 8 % sludge-to-product pathway in the MéGo company layer is the specific failure mode this change removes: if sludge is melted into the sheet, the product contains a concentrated contaminant stream unless that stream is separately treated (`mego…md` §6, §10). F1‑P treats the sludge as hazardous waste, not as product.

### Failure modes with severity

| Failure mode | Severity | Why |
|---|---|---|
| The external wastewater plant cannot accept the purge (permit, salinity, COD, nicotine load, metals) | **fatal** for the route as described | Without a lawful discharge route, the purge is a stored liability, and the loop returns to a concentration loop. |
| The purge flow is too small; contaminants accumulate in the loop and re-deposit on the fibre | **fatal** if the product gate fails as a result; **fixable** by increasing purge, at higher treatment cost | This is the classic closed-loop failure; the packet explicitly warns that recycle without purge is a concentration loop (`mego…md` §6). |
| Sludge/reject is not separated and enters the product | **fatal** for the product gate; **fixable** by process design | The company layer is ambiguous on whether the 8 % sludge is inside the sheet (`mego…md` §6; `assumption-and-gap-ledger.md` G‑08). |
| Metals (Cd/Pb/As/Hg) remain in the fibre because washing does not dissolve them | **fixable only by product-gate rejection or by routing the fibre to a non-sensitive use**; not fixable by water washing alone | Metals are not destroyed by washing; they partition to solids. The product gate is the control. |
| Nicotine and volatile TSNAs leave in the dryer vent rather than in the wash water | **fixable** by vent capture and condensate treatment; **unknown** without measurement | `de-fenzo…md` §What was actually evaluated notes no multi-contaminant clearance; `keenat…md` §4 shows the off-gas logic for a thermal step. F1 drying is at 60 °C, but nicotine volatility at that temperature is not zero. |
| Fibre product is too brittle or short for the intended composite | **fixable** by formulation or by using the fibre as a low-loading filler; **unknown** for mechanical performance | De Fenzo’s film is brittle and needs plasticizer (`de-fenzo…md` §3.4). F1‑P does not assume a high-value product. |
| Energy and reagent cost of washing plus wastewater treatment exceeds product value | **fatal** for deployment, **unknown** at desk stage | No energy or cost data are in the packet; this is a Slot C calculation that cannot be completed without metered data (`worker-c.md` C‑10). |

### Falsifiers

- **Purge accumulation falsifier:** measure nicotine, TSNA, PAH and metal concentrations in the loop water over successive cycles. If concentrations rise monotonically without a defined purge, the loop is not a sink, and the route fails the closed-loop boundary test.
- **Product-gate falsifier:** leachate from the dried fibre, tested under the intended use condition, exceeds the use-specific criterion for any target analyte. The criterion must come from the actual use regulation or customer specification, not from a universal threshold invented here.
- **Sludge-route falsifier:** the sludge/reject dry mass and analyte load are measured, and the fraction that would have entered the product is shown to be non-zero under the as-operated design. If the process cannot separate it, the product gate is the only barrier.
- **Mass-closure falsifier:** the dry-mass and analyte balance fails to close within the uncertainty derived from certified reference materials and detection limits. Unexplained loss above that uncertainty means the route is not characterised.
- **Wastewater falsifier:** the external treatment plant’s influent specification or permit is obtained and the purge exceeds it. The route then requires on-site pretreatment, which changes the cost and equipment basis.

### Needed calculations/measurements

The full measurement plan is in §2.4. In summary: a dry-mass-normalised, analyte-resolved fate balance over a defined feed batch, with product, wash water, purge, sludge/reject and dryer condensate measured; a use-specific leachate and performance gate; and a purge-sizing calculation based on measured contaminant loading and the permitted discharge concentration.

### Equipment/waste implications

**Equipment classes:** size reduction (mill), sieve/screen, agitated wash vessels, solid–liquid separation (dewatering press or centrifuge), dryer, second mill, wastewater holding/purge tank, and a connection to an external treatment plant. If the external plant is not available, on-site pretreatment (equalisation, filtration, possibly biological treatment) would be required; that is a larger permitting and cost boundary and is **not** assumed in F1‑P.

**Permitting reality:** raw cigarette butts are classified by French authorities as dangerous waste (HP6 acutely toxic, HP14 ecotoxic) (`ineris-waste-classification.md` lines 7–10). The process therefore needs traceability, approved transport and disposal for rejects, and a discharge permit or trade-effluent agreement for the purge. The dryer vent may need an air permit depending on jurisdiction.

**Four-field sink accounting** is given in §2.5.

## 2.2 — (reserved; the seven required fields are consolidated in §2.1 to avoid duplication)

## 2.3 Answers to Q1–Q5

### Q1 — Starting point

**F1 is the best starting point for Slot C integration, with F3 as the chemical comparator.** On evidence-structure grounds:

- F1 has the most disclosed step sequence (grind → sieve → wash → recycle → dry → mill) and two named industrial actors (MéGo! and Re‑Cig) with company-level operating claims (`mego…md` §2–§3; `company-workflow-dossiers…md` §5). It is the closest to an existing deployment boundary.
- F1’s weakness is not the separation logic but the absence of a purge and the ambiguity of the sludge destination. Both are addressable by process design and measurement, not by replacing the chemistry.
- F3 has the clearest polymer-separation logic (`question.md` accepted findings; `cn106928486…md`), but its solvent recovery, residual solvent and hazardous-waste boundaries are larger energy and permitting questions, and the recovery denominator is unresolved (`gap-check-01.md`; `cn106928486…md` §Gaps). F3 is a comparator, not the first integration platform for a Slot C balance.

**Why not F5:** F5 converts the polymer to cellulose and creates a dark liquor whose treatability is contested in the packet (`unb-pi0305004…md` §5; `assumption-and-gap-ledger.md` C‑07). The waste train would dominate the balance, and the primary full text was not obtained (`question.md` accepted findings). **Why not F2:** F2 is a composite/encapsulation route, and its own operator’s LCA reportedly found plastic-object recycling not environmentally beneficial and pivoted to solid recovered fuel (`keenat…md` §6–§7; `assumption-and-gap-ledger.md` A‑07). That is a negative deployment signal, not a proof of physical failure, but it is a reason not to make F2 the first integration platform.

### Q2 — Sink design (four-field accounting in §2.5)

- **Nicotine:** predominantly water-soluble and volatile. In F1‑P it partitions into the wash water and, to a lesser extent, the dryer vent. The **wash-water purge** is the designed sink; the dryer condensate is a secondary capture point.
- **TSNAs:** tobacco-specific nitrosamines are organic and can partition to water and solids. The **purge** and the **sludge/reject** are the relevant streams; they are not destroyed by washing.
- **PAHs:** hydrophobic; they are more likely to remain on the fibre or report to the sludge than to dissolve in water. The **sludge/reject to hazardous waste** is the designed sink; the product gate is the barrier against PAH retention in the fibre.
- **Metals (Cd/Pb/As/Hg):** not volatile at wash temperatures and not destroyed. They report to the **sludge/reject** and to the fibre. The **sludge to hazardous-waste incineration** is the designed sink; the product gate is the barrier for the fibre.

**Hardest analyte class to move:** metals. Water washing does not remove them from the solid phase unless they are soluble at the wash pH. F1‑P does not claim to remove metals from the fibre; it claims to **manage them by sludge purge and product rejection**. If the product gate cannot be met for metals, the fibre must be routed to a use where the leaching pathway is controlled (e.g., encapsulated in a composite with a leachate barrier) or to hazardous waste. That is a use-specific decision, not a universal claim.

### Q3 — Measurement plan (denominator-explicit fate balance)

**Feed basis:** one defined batch of collected butts, weighed **wet** at receipt and **dry** after equilibration or freeze-drying. Report both wet and dry masses. State whether the batch is whole-butts or filter-only. Do not mix whole-butt and filter-only denominators.

**Aliquot design:** homogenise the dried feed; take at least three aliquots for analyte analysis and three for dry-matter determination. Record the mass of each aliquot and the dry-matter fraction. The same aliquot design applies to product, sludge/reject, purge water (filtered and unfiltered), and dryer condensate.

**Analyte panel:** nicotine, TSNAs (at least NNN and NNK), representative PAHs (the 16 EPA PAHs or a stated subset), and Cd/Pb/As/Hg. Report each analyte in mg/kg dry solids for solids and µg/L for liquids, with the detection limit and recovery for the method. Do not convert an instrument detection limit into a universal product limit.

**Streams measured:**
1. Feed (dry mass, analyte concentrations).
2. Washed fibre product (dry mass, analyte concentrations, leachate test).
3. Wash water inventory (volume, analyte concentrations) at the start and end of the batch; if the loop is recycled, measure at successive cycles.
4. Purge (volume, analyte concentrations, suspended solids).
5. Sludge/reject (dry mass, analyte concentrations, leachate test if disposed).
6. Dryer vent condensate (volume, analyte concentrations) and, if an air emission measurement is available, the vent gas.
7. Unexplained loss: the difference between feed analyte mass and the sum of measured stream masses, reported with its uncertainty.

**Closure criterion:** do not invent a universal pass/fail threshold. The closure criterion must be derived from the method’s certified reference material recovery and the detection limits. For example, if the method recovery is 90–110 % and the detection limit is 0.01 mg/kg, the closure uncertainty is at least the combined recovery and sampling uncertainty. Report the balance as “closed within the stated uncertainty” or “not closed,” and state the numerical uncertainty. A closure that is 80 % of feed with no explanation is a red flag; a closure of 100 % ± 20 % may be acceptable if the uncertainty is justified by the method.

**Use-specific product gate:** before the fibre is sold or used, test it for the intended application. For a non-food, non-child-contact composite filler, the gate should include:
- leachate test under the intended use condition (e.g., a batch leaching test or a column test, depending on the use scenario), with the analytes above;
- mechanical performance appropriate to the use (e.g., tensile or impact strength if structural; not required if used as a non-structural filler);
- a declaration of the use scenario and the criterion applied, with the source of the criterion. If no criterion exists for that use, the product is **not gated** and cannot be sold as a characterised product.

### Q4 — Adversarial self-screening

**Strongest objection — the version of F1‑P that fails:**

F1‑P fails if the external wastewater plant cannot accept the purge, or if the purge is not actually installed and operated. In that version, the water loop is closed without a bleed, contaminants accumulate, and the fibre is repeatedly contacted with a progressively more concentrated liquor. The product gate may still pass on a single batch because the fibre was washed in relatively clean water, but the loop is not a sink: it is a delayed transfer to the product, the sludge, or an uncontrolled discharge. The company-layer evidence supports this objection: MéGo describes a recycled water loop with no disclosed purge (`mego…md` §6), and the packet’s own Stage-3 finding is that a loop with no purge is a concentration loop (`mego…md` §10; `worker-c.md` C‑04). The second version of the failure is that the 8 % sludge is melted into the product, so the concentrated contaminant stream is sold rather than disposed (`mego…md` §6, §10). In that version, the product gate would have to reject the product, and the route would have no lawful sink for the sludge unless a hazardous-waste route is added.

**What would address it:**
- A **measured purge** with a flow rate justified by a contaminant mass balance and the external plant’s influent specification.
- A **separate sludge/reject stream** that is not incorporated into the product, with a hazardous-waste disposal route and a measured analyte load.
- A **product gate** that is applied to every production batch, not to a single laboratory sample.
- A **permit or trade-effluent agreement** from the external treatment plant, obtained before the route is described as having a sink. Without that document, the sink is a hypothesis, not a named lawful sink.

### Q5 — Next desk step

**Single retrievable document:** the granted patent **FR3066128B1** (MéGo!) full text, specifically the examples and any disclosed wash conditions, recycle ratio, purge or sludge handling. The packet read only the abstract-level disclosure (`mego…md` §1); the granted text is the most likely desk-accessible source of numeric conditions that would allow a purge-sizing calculation and a dry-mass balance. If the granted text does not disclose those parameters, the next document is the **MéGo! LCA** that the company states was launched (`mego…md` §11), because an LCA would at least define a functional unit and a system boundary, even if its inventory is company-derived.

**Single calculation:** a **purge-sizing sensitivity calculation** using the measured or assumed contaminant loading of the feed and the external plant’s permitted concentration. Because the loading is not in the packet, this calculation cannot be completed with packet data alone; it becomes possible only after the fate-balance measurements or the granted-text examples are obtained. That is why the document retrieval is the higher-value next step.

## 2.4 Needed calculations/measurements (fate balance and product gate — consolidated)

The Q3 plan is the operative measurement plan. The specific calculation that would most reduce uncertainty is the **dry-mass-normalised analyte-resolved fate balance**, reported as:

\[
\text{Fraction of feed analyte } i \text{ in stream } j = \frac{\text{analyte } i \text{ mass in stream } j}{\text{analyte } i \text{ mass in dry feed}}
\]

for \(j\) = product, wash water inventory, purge, sludge/reject, dryer condensate, and unexplained loss. Each fraction must carry its denominator (wet/dry, whole-butt/filter, input/output) and its uncertainty. The sum of fractions should close within the stated uncertainty; if it does not, the unexplained loss is the first term to investigate.

The **use-specific product gate** is not a single number. It is a protocol:
1. State the intended use and the exposure scenario.
2. Select the leachate test and the analyte panel appropriate to that scenario.
3. State the criterion and its source (regulation, customer specification, or a justified derived limit).
4. Report pass/fail per analyte, with the detection limit and recovery.
5. If the product fails, route it to a lower-exposure use or to hazardous waste; do not average failures across analytes.

No numerical pass/fail threshold is proposed here because the packet does not supply a use-specific criterion for any of the candidate products.

## 2.5 Equipment/waste implications and four-field sink accounting

### Equipment and permitting summary

| Item | F1‑P implication |
|---|---|
| Size reduction and sieving | Dust and fibre release; combustible dust and bioaerosol controls required. |
| Wash vessels | Materials compatible with water and residual organics; temperature and agitation not specified in the packet (parameter-not-located). |
| Solid–liquid separation | Dewatering press or centrifuge; performance affects purge load and sludge dry mass. |
| Dryer | Vent capture for nicotine and volatile organics; condensate to treatment. Energy demand is a major unknown. |
| Wastewater purge | Holding tank, flow measurement, sampling point; connection to an external permitted plant. If no external plant, on-site pretreatment is a different project. |
| Sludge/reject | Dewatering, hazardous-waste classification, approved transport and incineration. |
| Permitting | Raw butts are HP6/HP14 dangerous waste (`ineris-waste-classification.md`); the facility needs waste permits, traceability, and a discharge agreement. |

### Four-field sink accounting

| Stream | (a) Stream named | (b) Collection boundary | (c) Final treatment / disposal | (d) Analytical performance demonstrated? |
|---|---|---|---|---|
| **Product fibre** | Washed, dried cellulose-acetate fibre | Process product | Use in a non-food composite or board, under a use-specific gate | **No** — requires leachate and performance testing; not established by any packet source. |
| **Wash-water purge** | Aqueous purge from the wash loop | Process effluent | External industrial wastewater treatment plant under a permit or trade-effluent agreement | **No** — influent/effluent analyte data not in the packet; the Re‑Cig partner is named but its permit and performance are not supplied (`company-workflow-dossiers…md` §5). |
| **Sludge / reject** | Wash sludge and separated paper/tobacco/ash | Process solid reject | Hazardous-waste incineration or other permitted destruction, depending on classification | **No** — composition and leachate not measured in the packet; the 8 % sludge figure is a company split, not an assay (`mego…md` §4; `assumption-and-gap-ledger.md` K‑02). |
| **Dryer vent / condensate** | Water vapour and volatile organics from drying | Air/condensate boundary | Activated carbon or condensate to wastewater treatment; vent to atmosphere only if permitted and characterised | **No** — no vent measurement or condensate assay in the packet. |

No stream is declared a final sink on the basis of a name alone. The product is not declared safe; the purge is not declared treated; the sludge is not declared hazardous or non-hazardous without measurement.

## 2.6 Uncertainty statement and limits

- The largest uncertainty is the **absence of a measured contaminant loading** for any feed stream in the packet. Without it, the purge cannot be sized and the fate balance cannot be predicted; it can only be measured.
- The **external wastewater boundary** is the central new-assumption. If the external plant does not exist, does not accept the purge, or cannot meet its permit, F1‑P fails as described and requires on-site pretreatment, which changes the equipment, energy and cost basis.
- The **sludge destination** is unresolved in the supplied sources. F1‑P treats it as a reject, but the packet does not prove that the MéGo process currently separates it from the product.
- The **product performance** of washed fibre is not established. The De Fenzo film is brittle and needs plasticizer; F1‑P does not assume a high-value product and does not claim mechanical adequacy.
- **Energy and cost** are not calculated here. The packet contains no metered energy, no equipment prices, and no product prices. A cost ranking across families is therefore blocked, consistent with the Stage-3 finding (`question.md` accepted findings). The only defensible Slot C statement is that the wastewater treatment and sludge incineration are likely to be material cost drivers and must be metered before any per-tonne claim.
- **No claim** is made that F1‑P is novel, patentable, freedom-to-operate, safe, clean, deployable, or environmentally beneficial. It is a hypothesis with falsifiers.

*End of Slot C report.*