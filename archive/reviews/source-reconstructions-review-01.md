# Source reconstructions review 01

Date: 2026-11-02
Repository reviewed: abdo2048/butt-lab
Snapshot: e029639d4a6544ce08fd149eef91306c8a386bb3 (main at review start)
Assignment: TASK.md; one source-review deliverable, no registry or draft edits.

## 1. Reviewer independence and limits

This is a fresh primary-source audit by the same assistant that wrote the two drafts. It is NOT an independent second-model review, blind external review, or qualified chemist sign-off. Independent technical review remains pending. Source matches below mean that the document says something, not that the document's process is reproducible, safe, economical, or independently validated.

Reviewed drafts:
- specs/de-fenzo-2020-source-reconstruction.md, blob 8686d98ac664f90df1e0426964ee9bd87bd96b94.
- specs/cn106928486-source-reconstruction.md, blob eb267aac94f880c9687937f90e364feab03c6448.

The fetched text was read for relevant methods, results, claims, and examples. Raster figure values were not independently digitized. Instrument raw data, patent-office originals, laboratory notebooks, supplementary assay records, and the Chinese granted B-version were not examined. No physical experiment or numerical process simulation was performed. The only proposed repository output is this file; both registries, drafts, prior notes, code, TASK.md, and phase tracker remain unchanged.

## 2. Sources actually opened

| Key | Source | Sections checked / access limit |
|---|---|---|
| P | https://pmc.ncbi.nlm.nih.gov/articles/PMC7659942/ | Bibliographic header; Section 2 Experimental; Sections 3.1-3.4; Table 1; Conclusions; Funding/Acknowledgments. Methods/results text available; plotted datasets not digitized. |
| C-ZH | https://patents.google.com/patent/CN106928486A/zh | Original-language description, pretreatment/recovery, five embodiments, claims 1-4, family and cited-by listings. HTML transcription, not an independent check against the patent-office PDF. |
| C-EN | https://patents.google.com/patent/CN106928486A/en | Machine translation of the same publication; compared with Chinese for temperature and separation sequence. This is not another independent experiment. |
| E | https://patents.google.com/patent/EP3892393A1/en | Targeted identity check for the attribution warning already present in the draft: inventor/assignee metadata, description 0001 and process outline. Not a new process reconstruction or legal opinion. |
| W | https://patents.google.com/patent/WO2021170381A1/en | Fetch failed. Its body/identity was not independently checked in this task. No content is inferred from this failure. |

Verdicts used: supported-by-source; contradicted-by-source; unresolved; hypothesis. Rows explicitly marked stronger extrapolations test tempting conclusions that the drafts generally warn against; they are NOT errors attributed to those drafts. A supported patent assertion remains a patent assertion. No claim below is marked supported merely because an earlier AI draft made it.

## 3. De Fenzo paper: claim-level review

| ID | Checked assertion | Verdict | Evidence and interpretation |
|---|---|---|---|
| P01 | DOI 10.3390/ma13214710 and PMCID PMC7659942 describe the same paper by De Fenzo, Giordano, and Sansone | supported-by-source | P bibliographic header gives both identifiers and these authors. Two registry IDs citing it are not independent replication. |
| P02 | Feedstock was collected through Essequadro from local bar/restaurant ashtrays; unused Rizla filters were the comparator | supported-by-source | P Section 2 identifies those origins. It does not demonstrate representativeness of worldwide litter. |
| P03 | Sterilization occurred, but its method is unspecified | supported-by-source | Section 2 says filters were sent to CNR, where they were 'sterilized and treated'. A sterilization agent, validated conditions, or endpoint is not given in that methods passage. |
| P04 | The washing route includes 50 C water for 60 minutes, three cold-water washes, and two ethanol washes at 99% w/w | supported-by-source | Section 2: 'hot water (50 C) for 60 min'; 'cold water three times'; 'ethanol 99% w/w twice'. Temperatures are transcribed here in plain ASCII; the source uses degree symbols. |
| P05 | A completely specified wrapper-removal order can be derived | unresolved | Section 2's sentence combines hot washing and 'after external paper removal' ambiguously. The draft correctly warns against inventing a detailed SOP. Preserve the original sentence for clarification rather than silently choosing a sequence. |
| P06 | Drying is reported at 60 C for 60 minutes | supported-by-source | Section 2 states this explicitly. It is a report of the authors' work, not permission to heat solvent-bearing waste in unspecified equipment. |
| P07 | Washing volumes, cold-water/ethanol contact durations, recovery yield and complete waste/solvent accounting are available in the cited methods | unresolved | These quantities are not located in the checked methods/results passages. Do not substitute the approximately 10 mg TGA sample mass for extraction-batch mass. Absence of raw/supplementary information was not independently established. |
| P08 | Five untreated and five recovered samples were analyzed | supported-by-source | Section 2 states the counts. It does not identify five independent plant runs or fully establish the sampling hierarchy. |
| P09 | Acetone at the film-making stage is separate from the primary water/ethanol washing sequence | supported-by-source | Section 3.4 says recovered CA was 'dissolved in acetone (5% w/w)' and cast in a Petri dish. Do not misread this as acetone being only 5% of the washing medium. Clarify the formulation's concentration basis before replication. |
| P10 | Transparent cast film and brittle white 2 mm extruded film are reported | supported-by-source | Section 3.4 reports both; 'the film is brittle so a plasticizer needs to be added'. Transparent appearance and intended eyewear use are not evidence of satisfactory end-product mechanical or safety performance. |
| P11 | Stronger extrapolation, NOT asserted by the draft: morphology and material behavior are unchanged in every respect | contradicted-by-source | This would overstate the paper: Section 3.1 reports reduced fiber volume and irregular surfaces; Section 3.2 reports loss of the early plasticizer-associated thermal step. The draft itself notes these changes, so do not convert its narrower polymer-identity conclusion into this stronger claim. |
| P12 | FTIR/DSC/TGA support similarity of selected recovered/unused polymer characteristics | supported-by-source | Sections 3.2-3.3 report comparative spectra/thermal behavior; second-scan glass transitions are 193 C unused and 192 C recovered. This does not establish retained molecular weight, original tow strength, or full contaminant clearance. |
| P13 | The source reports an instrument detection limit below 0.01 mg/L and 0.04 ppm titanium | supported-by-source | Section 3.1 contains those statements. The analyte-specific calibration, digestion/extraction basis, recovery controls, and solid-mass normalization are not established in the checked text. The draft is right not to translate that instrument limit directly into a universal product concentration limit. |
| P14 | Table 1 EDX values and the atomic-absorption result are directly comparable on a demonstrated common basis | unresolved | Table 1 lists Ti at 0.2% w/w for both samples, while Section 3.1 reports 0.04 ppm titanium by another method. The paper does not reconcile these bases in the checked text. Record the inconsistency/question rather than averaging the values or deriving a removal percentage. |
| P15 | The paper proves universal detoxification, consumer-use clearance, or closed-loop industrial economics | unresolved | No such proof follows from the reported measurements. Section 3.4 asserts reduced toxicity and possible usable products, but the source does not report a comprehensive specified contaminant panel or product-specific exposure assessment in the examined work. This is lack of demonstrated support, not proof the method cannot work. |
| P16 | Funding reporting has a tension | supported-by-source | Funding says 'No Funding'; Acknowledgments thank Essequadro for 'funding for the ... extraction study'. Preserve the two statements without resolving intent or research integrity by speculation. |
| P17 | Fiber-preserving washing is a promising engineering baseline | hypothesis | Consistent with the reported extraction/morphology, but not proof that original tow integrity or a useful product specification is retained. Requires appropriate material-quality and contamination measurements. |

### De Fenzo disposition

The draft accurately recovers the core washing/film distinction and most quoted source values. Retain it as a source-based baseline with qualifications. Do not call it a complete reproducible cleaning plant, an independently validated detoxification route, or finished eyewear feedstock. Prioritize formulation/mass basis, analytical scope, and product performance, not another abstract search.

## 4. CN106928486A: claim-level review

| ID | Checked assertion | Verdict | Evidence and interpretation |
|---|---|---|---|
| C01 | The Chinese title identifies acetate-fiber recovery from cigarette filter ends | supported-by-source | C-ZH title and abstract match the draft. 'Acetic acid fiber' in English is machine-translated terminology, not proof the product is ordinary regenerated cellulose. |
| C02 | The complete workflow uses ethanol and water despite the abstract's 'only acetic acid' solvent wording | supported-by-source | Description pretreatment says ethanol removes impurities such as solanesol, and deionized water removes impurities such as nicotine. These are proposed functions, not measured clearance percentages. |
| C03 | Preparation includes tobacco/paper removal and fiber segments shorter than 1 cm | supported-by-source | C-ZH pretreatment: '小于1cm'. |
| C04 | Pretreatment uses approximately 18 hours ethanol, three water washes, 9 hours water immersion, and 24 hours drying at 70 C | supported-by-source | Description and claim 2 state those values. '约18h' is approximately 18 h; do not manufacture precision or ignore these stages when comparing total time. |
| C05 | Room temperature to 95 C is intended, not minus 95 C | supported-by-source | Technical-background sentence explicitly says '室温至95℃范围内'. This resolves the misleading '-95' English rendering in favor of a temperature interval. An official PDF check would still strengthen transcription provenance. |
| C06 | 8-18 mol/L is disclosed; description allows 0.25-4 h while claim 1 preferred language uses 2-4 h | supported-by-source | Description recovery-stage paragraph and claim 1 differ exactly as flagged. Preserve both; an embodiment need not be read as the selected claim range. |
| C07 | Claim 1 states an acid loading of 1-6 L per kg cigarette ends | supported-by-source | Wording includes '1L-6L醋酸/1kg烟头'. The wet/dry or pretreated-mass normalization is not resolved by that phrase. |
| C08 | Hot solid/liquid separation, room-temperature aging, and subsequent solid recovery are described | supported-by-source | Claim 1: '趁热固液分离 ... 滤液在室温下陈化 ... 洗涤析出的固体'. It distinguishes an initial solid from later precipitated solid, but does not give a sufficiently explicit stream/mass diagram for engineering reconstruction. |
| C09 | A completely specified antisolvent precipitation procedure can be reconstructed | unresolved | Water washing and aging/precipitation are explicit; which washes/filtrates are combined and their quantitative composition are not sufficiently defined. Do not invent an antisolvent ratio or assume only the initial residue is the recovered product. |
| C10 | Aging for 2 h, washing to 2 microS/cm, and drying for 3 h at 80 C are disclosed | supported-by-source | Claim 1 gives these values. The Chinese writes '2μs/cm'; microS/cm is the conductivity interpretation. Do not add a '<=' endpoint, measurement temperature, or instrument tolerance that the source does not specify. |
| C11 | Stronger extrapolation, NOT asserted by the draft: conductivity establishes complete removal of neutral organics or toxicants | unresolved | No validated relationship between that endpoint and multi-contaminant clearance is established. The draft correctly distinguishes this from a detoxification assay. |
| C12 | Claims 3-4 report recovery of 58-92%, with 92% at 2 h, 12 mol/L, 50 mL, 75 C | supported-by-source | Claim 3 says '回收率为58-92%'; claim 4 gives the preferred point. These are source assertions. An explicit equation/denominator and corresponding sample mass are not located in the checked text. |
| C13 | 92% means purity, contaminant removal, or a repeatable independently verified yield | unresolved | Not established by the source assertions or this review. Keep recovery, purity, and detoxification separate. No uncertainty, replicate-yield dataset, or comprehensive contamination balance was recovered. |
| C14 | The five embodiments are separate examples with the reported time/volume/concentration changes | supported-by-source | Examples 1-5 correspond to 50 mL/95 C/4 h; 50 mL/95 C/0.25 h; 30 mL/95 C/4 h; 30 mL/8 mol/L/95 C/4 h; and 50 mL/room temperature/4 h. They are not five serial processing baths. |
| C15 | Stronger extrapolation, NOT asserted by the draft: glacial acid examples can be replaced by the preferred 12 mol/L condition without changing their identity | contradicted-by-source | The source distinguishes glacial acid in examples from the separate concentration/optimization statements. This is a prohibited extrapolation already warned against by the draft, not a correction to its numeric transcription. |
| C16 | XRD/IR/thermal comparisons support polymer characterization, not full contaminant clearance | supported-by-source | Description of Figures 1-6 analyzes structure/thermal behavior. It says Example 5 resembles the crystalline/amorphous standard more closely, while Examples 1-4 differ. Do not infer that all products have identical morphology or processing performance. |
| C17 | Stronger extrapolation, NOT asserted by the draft: a two-hour dissolution makes the complete route two hours | contradicted-by-source | Claim 2 alone specifies much longer pretreatment/drying. The draft correctly rejects this shortcut. |
| C18 | Later B publication exists, but its granted claims were reviewed in the draft | unresolved | The publication listing identifies CN106928486B. Neither this audit nor the draft examined its body/claim changes. Legal status and scope are not resolved here. |
| C19 | The CNR/EP mask-filter identity warning deserves checking | supported-by-source | Targeted E metadata lists inventors Luca Crivellin and Roberta Brancaccio, assignee Individual; description 0001 mentions respiratory masks. This contradicts treating that document as proven CNR-owned on the inherited attribution alone. W fetch failed, so a full CNR family reconciliation remains open. |
| C20 | Acetic-acid recovery will outperform fiber washing | hypothesis | It is a candidate to compare, not an outcome demonstrated by the patent or this audit. Solvent recycle, waste, yield basis, contamination, product performance, and process time remain unresolved. |

### Chinese patent disposition

No clear numerical transcription error was found in the checked draft's principal process values. Retain it as a qualified source reconstruction. The critical engineering gap is a reproducible stream/mass basis and contaminant accounting, not absence of published temperatures or times. Patent assertions should remain attributed and the translated process sequence should be diagrammed only with explicit unresolved branches.

## 5. Bounded calculations and missing evidence

These are arithmetic consistency checks on reported values, not simulations, experimental results, plant throughput predictions, or cost estimates.

1. Chinese disclosed preferred sequence: approximately 18 h ethanol + 9 h water immersion + 24 h intermediate drying + 2 h dissolution + 2 h aging + 3 h final drying = approximately 58 h of named serial stages. Washing, transfers, heating/cooling, and unspecified steps add unquantified time. Parallel plant operation or a revised process could change throughput, so this is not a universal minimum cycle time.
2. If claim 1's acid-loading basis also applies to a 50 mL example, 0.050 L divided by 1-6 L/kg implies 0.00833-0.050 kg (about 8.3-50 g) of input on that SAME unspecified mass basis. This is a conditional consistency interval, NOT the patent's disclosed sample mass. Do not select a mass from this interval and label it reported.
3. De Fenzo gives 60 minutes hot-water washing plus 60 minutes drying: 120 minutes of these two specified stages. Cold/ethanol washing times and other operations are not established. It is not an established two-hour end-to-end process or a valid demonstrated speed comparison to the patent.

Without input/output dry masses, solvent/water quantities, the actual recovery equation, and contaminant partitioning, neither route supports a defensible per-tonne material balance or economic ranking. Model-produced missing inputs must be labeled hypotheses and tested for sensitivity, not passed off as literature data.

## 6. What could falsify or weaken the interpretations

- Paper route/film separation: a full protocol or correction showing acetone was part of the primary washing sequence would require revising P09. The currently read Section 2 and Section 3.4 support the separation.
- Fiber preservation: evidence of unacceptable molecular-weight, mechanical, or morphological change would weaken that engineering hypothesis even if CA remains detectable by FTIR.
- Claimed detoxification: quantified residuals or relevant leachate/emission effects above a justified end-use criterion would falsify that specific safety claim. An unspecified detection limit or disappearance of odor cannot substitute for predefined analytes, matrix validation, blanks, controls, and limits.
- Patent recovery: controlled dry-mass accounting on an explicitly defined denominator, with solvent/inorganic carryover excluded, could support or refute a selected recovery assertion. No such new measurements were made here.
- Stream interpretation: the official Chinese specification, underlying experimental records, or an author/inventor clarification specifying wash/filtrate combination could resolve C08-C09 differently. Do not hard-code an ambiguous separation into an equipment design.

These are review criteria for future qualified work, not a home-experiment protocol. Neither draft is authorized for consumer-product release or hazardous processing by this review.

## 7. Next specific work, not executed here

Priority 1: read CN106928486B, the associated official PDF, and Figures 7-10/captions for any explicit input mass, recovery equation, or stream clarification. Record whether the answer is actually present; if not, seek a specific inventor/source clarification rather than inventing a denominator.

Priority 2: request or locate De Fenzo's extraction-batch quantities and the atomic-absorption sample-preparation/analyte report. Clarify the concentration basis of the film formulation. If unavailable, retain those gaps and define a conservative assumption ledger rather than blocking the entire project.

After those bounded checks, compare the two mechanisms with a third source-reconstructed reference process. Broad worldwide harvesting and infrastructure redesign are not prerequisites for that comparison. No overall winner is selected from these sources alone.

## 8. Disposition

Source-audit deliverable: complete as a same-assistant review with explicit limitations. Independent second-model/chemist review: still pending. The drafts are useful evidence-qualified baselines; they are not complete plant specifications, independently reproduced experiments, legal clearances, or certified clean end products. No registry, draft, code, historical evidence, schedule, or phase state was changed by this task. Saving and reading back this one report is the only proposed external action.
