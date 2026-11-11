# Batch-01 gap-closing tracker

Started: 2026-11-08. Follow-up to the completed Stage-5 desk synthesis, commissioned by the operator in this session. This is not a sixth research stage, acceptance of the final reports, or authorization for experiments, contacts, purchases, public publication or process operation.

## Status rules

Use separate retrieval, review and gap-closure states. A downloaded patent discloses an idea, not demonstrated performance; an article's measured results apply only within its documented boundary. Preserve the accepted reports and frozen inputs.

- [x] Reconcile remote main and preserve uploaded final reports.
- [x] Create an isolated follow-up worktree based on remote commit `98131dc`.
- [x] Establish source folder and auditable tracker.
- [x] Complete the bounded first public discovery/content pass: 24 saved call receipts, followed by transfers of already-linked PDFs.
- [x] Review FR3066128B1 against J-H-01's disclosure/assumption questions.
- [x] Record failed and partial accesses and precise next steps.
- [x] Validate PDF signatures/hashes, extracted-text availability, inventory and checkpoint.

## Priority 1: primary-document retrieval

Each row is a task group, not a single file. Checkboxes indicate the stated deliverable, never safety or validation.

- [x] **D01 retrieval:** Granted B1 and related A1 facsimile PDFs downloaded from the patent mirror; B1 text and figures reviewed ([B1 record](https://patents.google.com/patent/FR3066128B1/fr); [A1 record](https://patents.google.com/patent/FR3066128A1/fr)).
  - [x] Focused disclosure/assumption review saved in `reports/followup/batch-01/FR3066128B1-disclosure-review.md`.
  - [ ] Direct INPI-host/register cross-check and scientific performance closure; these are not implied by retrieval.
- [x] **D02 retrieval:** Official-hosted INERIS 2017 and 2019 PDFs, including annexes, downloaded with searchable text ([2017 PDF](https://www.ineris.fr/sites/default/files/contribution/Documents/INERIS-DRC-17-162405-01313C%20Rapport%20%C3%A9tude%20m%C3%A9gots_vf.pdf); [2019 PDF](https://www.ineris.fr/sites/ineris.fr/files/contribution/Documents/INERIS-DRC-18-177385-09634B.pdf)).
  - [ ] Full methods/results review; summaries and the 2017 HP14 discussion were inspected, not all annex tables audited.
- [ ] **D03 package: partial.** Full thesis downloaded, but the requested 2017 article and PI 0305004-1 full publication remain unobtained ([thesis repository](https://repositorio.unb.br/handle/10482/22749?mode=full)).
  - [x] Thesis PDF/text acquired; abstract, contents and selected reuse/conclusion passages inspected.
  - [ ] Full thesis extraction of measured analyte/treatment/reuse results, with denominators and reporting limits.
  - [ ] Article: DOI fetch failed; handoff by exact DOI/title. Patent: index returned no hits and broad web search was unproductive; no nonexistence conclusion.
- [x] **D04 primary retrieval:** Chinese CN106928486B facsimile PDF, mirror HTML and text downloaded ([B record](https://patents.google.com/patent/CN106928486B/zh)).
  - [ ] Related A comparator, office-host cross-check, technical translation and denominator/phase review.
- [x] **D05 retrieval:** FR3110470A1 and FR3102180A1 PDFs plus mirror description/claim text saved; both PDFs are image-only under native text extraction, and their covers were visually checked ([F2 record](https://patents.google.com/patent/FR3110470A1/fr); [F4 record](https://patents.google.com/patent/FR3102180A1/fr)).
  - [ ] Detailed thermal/capture review, original-page text verification/OCR where needed, and actual-operation evidence.
- [ ] **D06 original-publication retrieval: partial.** Cerdia mirror HTML contains description and claims, including German/or machine-translated content; original WIPO PDF/drawings and authoritative-language verification remain pending ([WO record](https://patents.google.com/patent/WO2026074041A2/en)).
  - [x] Save raw HTML and separate searchable description/claim extraction.
  - [ ] Obtain original WIPO publication; assess the heated-tobacco versus smoked-filter feed boundary before transfer of evidence.
- [ ] **D07 package: open.** The attempted Korean article address failed robots-policy access; Keenat's download hub and MéGo!'s company page were saved, not full primary LCAs ([attempted Korean publisher address](https://tobaccocontrol.bmj.com/content/early/2026/07/08/tc-2026-060135); [Keenat hub](https://keenat.com/contenus-telechargeables/); [MéGo! page](https://www.me-go.fr/a-propos/)).
  - [ ] Korean article, supplements and underlying original product-assay report.
  - [ ] Keenat comparative guide/LCA and MéGo! full comparative ACV/critical review; no environmental conclusion adopted from marketing.
- [ ] **D08 acceptance evidence: open.** Re-Cig's public process/End-of-Waste statements were retrieved; the underlying acceptance/assay/permit dossier was not obtained ([company process page](https://www.re-cig.it/en/tecnologia/)).
  - [ ] Actual recipient/material/use-specific documents and authoritative standards, after jurisdiction/product selection.

## Priority 2: measurements, not authorized

Existing literature may narrow these gaps but cannot automatically validate the project's proposed architecture.

- [ ] **M01:** Same-dry-feed analyte mass by whole-feed/filter/tobacco/paper/ash/fines fraction.
- [ ] **M02:** F0 wash fractions, CA and final residual-treatment fate.
- [ ] **M03:** F1/J-H-01 initial/later wash, recycle inventory, purge, sludge, product, treatment outlet and emissions.
- [ ] **M04:** F2 composite retention, dilution, off-gas/condensate, metal fate and leaching.
- [ ] **M05:** F3 phases, co-precipitation, metals, solvents/acid, recovery and final outlets.
- [ ] **M06:** F4 phase/recipe-linked extraction, concentrate composition, metals, purge and losses.
- [ ] **M07:** F5 pulp/liquor/precipitate analytes, accumulation, purge and outlet load.
- [ ] **M08:** Intended-use and end-of-life leaching/emissions/ecotoxicity/function evidence.

## Priority 3: jurisdiction and regulatory evidence, scope pending

- [ ] **R01:** Select jurisdiction and feed/output status; identify authoritative classification, transport, storage, treatment and End-of-Waste bases.
- [ ] **R02:** Identify actual final recipient and its stream-specific acceptance/permit/discharge evidence.
- [ ] **R03:** Select intended use and applicable contact/leaching/emissions/ecotoxicity/performance criteria.
- [ ] **R04:** Verify HP6/HP14 and any cited compost/product standard from authoritative full texts.
- [ ] **R05:** Qualified equipment, occupational exposure and IP review; no legal clearance inferred from retrieval.

## Priority 4: scale, cost and energy evidence

- [ ] **S01:** Energy on explicit wet-input, dry-input and conforming-output bases.
- [ ] **S02:** Water/reagent/solvent makeup, recovery, purge and disposal inventories.
- [ ] **S03:** Full-cycle throughput/utilization, not isolated step time.
- [ ] **S04:** Residual-treatment cost by volume, dry mass and analyte load; no quote request or purchase authorized.
- [ ] **S05:** Product function/value and justified displacement comparator.
- [ ] **S06:** Full system inventory, LCA functional unit, comparator and uncertainty; no environmental ranking before evidence.

## Storage and continuation

Source files and machine-readable access receipts belong in `sources/followup/batch-01/2026-11-08/`. Focused notes and manual/EKB requests belong beside this tracker or under `reports/followup/batch-01/`.

Eight PDF files are saved, alongside raw HTML, derived search text, 24 numbered discovery/content receipts and per-file download metadata; PDF-file counts are not closed-gap counts. See `inventory.csv` and `receipts/downloads.json` in the source folder for byte lengths, hashes, transport and text-extraction caveats.

The first pass reached the repository's default 24 search/content-call checkpoint; eight separately logged transfers saved already-discovered binary URLs rather than continuing discovery. Failed or partial calls are preserved, including duplicate-link-resolution fetches, so progress is not inflated by counting each receipt as a document.

No Priority-2 measurement is marked complete. Next recommended unit: read the downloaded INERIS reports and thesis deeply, then resume targeted missing-document retrieval from `reports/followup/batch-01/manual-and-ekb-retrieval-queue.md`.

## What the first pass changes

The full granted F1 text explicitly describes clariflocculation and water recycle, so “no treatment mechanism disclosed” would now be too broad; measured purge, analyte-resolved treatment outlets and final residual acceptance are still unresolved ([FR3066128B1](https://patents.google.com/patent/FR3066128B1/fr)). The 2017 INERIS report distinguishes nicotine-based HP6 from bioassay-supported HP14, while the 2019 report describes limitations in available process-performance evidence in its historical setting ([2017 report](https://www.ineris.fr/sites/default/files/contribution/Documents/INERIS-DRC-17-162405-01313C%20Rapport%20%C3%A9tude%20m%C3%A9gots_vf.pdf); [2019 report](https://www.ineris.fr/sites/ineris.fr/files/contribution/Documents/INERIS-DRC-18-177385-09634B.pdf)).

These are new source-reading updates, not a reopened acceptance gate or proof of detoxification. J-H-01 remains unvalidated, F3 minority dissent remains preserved, and no thresholds, efficiencies, prices, test results or operational recipes are invented.
