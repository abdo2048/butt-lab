# Stage 3 packet — evidence index (packet v1.1)

Batch `batch-01`, stage 3, round `01`. Common to slots A, B and C. **v1.1 supersedes v1.0** (v1.0 is preserved at commit `0c0b6f2ff900a1866a0ed456c87e78661fa2f4ea` and must not be used for launch). Corrections are itemised in `reports/stage2/errata-packet-v1.0.md`.

Reading these files is not a substitute for checking the cited source; each file states its own reading limits. Company statements are self-report. The packet contains hypotheses and prior same-author readings, not verdicts — you may reject its framing.

## 1. Files supplied with this packet

| Path | What it contains | Reading limits you must respect |
|---|---|---|
| `reports/stage1/company-source-map.md` | 10 company/operator records; collection/processing claims; collector-vs-processor table; inconsistencies | Company pages are self-report; no independent assay; no patent located for Code Effort, TerraCycle, BuffIndia |
| `reports/stage1/coverage-ledger.md` | 20-invocation search/fetch log, backends, languages, access failures, patent-status ledger, duplicates, deferred work | Count is the worker's own record, not a raw tool log; no patent-office register was queried; not worldwide |
| `reports/stage1/batch-selection.md` | Why these six families; exclusions; traceability; scope limits | Selection is for mechanism diversity, not merit ranking; patent status was not a filter |
| `reports/stage2/reconstruction-index.md` | Map of the six units, versions, depths, gate status | Reused specs are same-author drafts; "re-read" is not independent re-verification |
| `reports/stage2/assumption-and-gap-ledger.md` | Assumptions A-01…A-07; five calculations K-01…K-05 (K-06 withdrawn); conflicts C-01…C-08; gaps G-01…G-20; registry proposals | Calculations are arithmetic on company/public inputs, not measurements |
| `reports/stage2/errata-packet-v1.0.md` | What was corrected between v1.0 and v1.1, and why | Self-correction by the same author, prompted by external review; not a second verification |
| `reports/gap-check-01.md` | Prior same-author check of CN106928486 A/B text, including the **75–95 °C / 2–4 h granted-claim** distinction and its limits | Prior reading only; the B-version PDF fetch failed and figures were not digitised. It is not independent verification |
| `specs/de-fenzo-2020-source-reconstruction.md` | F0: water/ethanol wash + film demonstration | Wash volumes/times/yields not in paper; FTIR/TGA ≠ detoxification |
| `specs/mego-fr3066128a1-source-reconstruction.md` | F1: MéGo! mechanical + aqueous wash | Patent abstract only; no temperatures; sludge route undisclosed |
| `specs/company-workflow-dossiers-batch01.md` | F1/F3 company workflows: Code Effort, TerraCycle, BuffIndia, Re-Cig, CNR/AzzeroCO2, Cerdia | Chemistry often undisclosed; one interview only for BuffIndia; Cerdia abstract only |
| `specs/keenat-fr3110470a1-source-reconstruction.md` | F2: dry heat + extrusion composite | Chunks 0 and 2 of 8; examples/claims unread; 80–100 °C is step b only; ~200 °C press claim unresolved |
| `specs/cn106928486-source-reconstruction.md` | F3: acetic-acid dissolution/recovery | Application text; B-version claims not reviewed there; recovery denominator unclear |
| `specs/pressurized-fluid-reference.md` | F4: dense/supercritical CO2 | Full WO/FR text not obtained; pressure conflict; temperature conditioning still applies |
| `specs/unb-pi0305004-source-reconstruction.md` | F5: alkaline pulping; deacetylation to cellulose | Patent/paper full texts unread; yield not derivable; effluent load unmeasured |
| `dossier/cautionary/ineris-waste-classification.md` | Raw butts as dangerous waste (HP6, HP14) | Project cautionary note quoting the classification, not the INERIS document itself |
| `dossier/cautionary/keenat-lca-retreat.md` | Company LCA retreat; pivot to CSS | Press/company reporting, not the LCA report |
| `dossier/cautionary/korean-paving-stones.md` | Carcinogens found in paving stones despite encapsulation/heat | Secondary reporting; the study was not obtained. A comparator, not a verdict on an entire family |

## 2. Primary sources cited inside those files (for your own checking)

- De Fenzo, Giordano, Sansone, *Materials* 13(21):4710 (2020), DOI 10.3390/ma13214710; PMC7659942.
- FR3066128A1/B1 (MéGo!), Google Patents.
- FR3110470A1 (Keenat), Google Patents.
- FR3102180A1, WO2021079050A1, US12065781B2 (TchaoMegot), Google Patents. **Family association is inherited and not independently charted.**
- CN106928486A/B (Zhejiang/Ningbo), Google Patents.
- WO2026074041A2 (Cerdia), Google Patents (abstract only).
- PI 0305004-1 (UnB), UnB CDT technology page; Teixeira et al., *Waste Management* 60 (2017) 140–150, DOI 10.1016/j.wasman.2016.10.013.
- CNR/AzzeroCO2 offering: knowledge-share.eu, page id 3992. **Whether this is the same family as the CNR mask-filter patents is unproven.**
- Company pages: codeefforts.com; terracycle.com/en-CA/brigades/cigarette-waste-en-ca and its official "How are cigarette butts recycled?" PDF; keenat.com; tchaomegot.com/depollution; re-cig.it/en/tecnologia; capbiotek.fr (MéGo! case); poiatoirecicla (fetch failed).
- News/interviews: The Better India 2025-02-08; Times of India 2022-11-13; The Weekend Leader 2021-11-13; YourStory 2025-05-09; Climate Action Live 2026-06-11; Ouest-France 2018/2022; Le Télégramme 2018; Le Parisien/Sud Ouest via cautionary note.

## 3. What is **not** supplied

- Full patent specifications (only the sections named in each spec were read).
- Any independent laboratory assay, leachate test, emission measurement, End-of-Waste dossier or LCA report.
- Company confidential chemistry (Code Effort, TerraCycle, BuffIndia), Re-Cig's patent, CNR's patent, Cerdia's full description.
- Regulatory texts (EU single-use plastics directive, national waste/emission/product rules).
- Any prior panel report, judge report, or Stage-4 material.

If you believe a missing item is decisive, say so and state exactly what it would resolve. Do not invent it.

## 4. Integrity and distribution

The packet is frozen at the content commit recorded in `COMMIT.txt` and `manifest.yaml`. Hashes of every listed file are in the manifest. If your copy differs, report the mismatch rather than proceeding.

The four files in `packets/batch-01/stage-3/` are **control files**; they do not contain the evidence. A chat without repository access must be given **all** files listed in §1, with preserved paths, not only the control files. `LAUNCH.md` lists the bundle and the exact commands.
