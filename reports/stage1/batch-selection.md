# Stage 1 / H03 — Batch-01 selection and lead index

Date: 2026-11-03. Actor: single AUTO Harvester. Baseline: `fda66af351a37d38287792ed3b578a258eedf7fc`. Inputs: `reports/stage1/company-source-map.md`, `reports/stage1/coverage-ledger.md`, `registry/methods.yaml`, existing drafts in `specs/`, `reports/`, `inventions/`.

Purpose: choose a **bounded** set of process families that Stage 2 will reconstruct to their public-evidence limits and freeze into the Stage-3 packet. Selection is not a ranking of environmental or commercial merit, and it is not a worldwide "best method" claim.

---

## 1. Selection criteria (stated before selection)

A unit was selected if it scored acceptably on all five:

| Criterion | Meaning | Why it matters |
|---|---|---|
| C1 Traceable evidence | At least one primary patent/paper plus, where relevant, a company workflow, with a recordable URL and reading limit | Prevents reconstruction from marketing only |
| C2 Mechanism diversity | Different physical/chemical route from already-selected units | Enables real comparison rather than variants of one wash |
| C3 Hazard/waste relevance | The route produces a distinct waste stream or detoxification question | The core problem is toxin fate, not mass recovery |
| C4 Company linkage | A real operator uses or used the route, or a licensor/incumbent exists | Keeps the work grounded in deployed practice |
| C5 Falsifiability | There is a measurable endpoint or calculation that could prove the route inadequate | Avoids unfalsifiable "green" claims |

Units failing C1 were deferred, not silently dropped. No quota was applied; the batch is 6 units because six families passed, not because six were required.

---

## 2. Selected batch (S2-00 … S2-05)

| Unit | Family | Lead sources | Stage-2 output | Why selected |
|---|---|---|---|---|
| **S2-00** | F0 Staged water/ethanol wash baseline | De Fenzo et al. 2020 (Materials 13:4710; PMC7659942); registry `de-fenzo-2020-materials`, `academic-green-ethanol-wash` | Existing `specs/de-fenzo-2020-source-reconstruction.md` (v1, re-verified) | Only peer-reviewed route read in full; provides material-characterisation baseline (FTIR/TGA, film) and a clear warning that transparency ≠ detoxification |
| **S2-01** | F1 Mechanical + aqueous washing (water loop) | MéGo! FR3066128A1/B1; Re-Cig company 4-step; Code Effort news-reported; TerraCycle official PDF | New `specs/mego-fr3066128a1-source-reconstruction.md` + company-workflow dossier | Most widely deployed family; four independent operators allow cross-checking of disclosed steps; closed-loop claims are testable |
| **S2-02** | F2 Dry thermal + extrusion composite | Keenat FR3110470A1; company page; LCA retreat | New `specs/keenat-fr3110470a1-source-reconstruction.md` | Only family with a published patent temperature and a documented commercial retreat; directly tests the Korean paving-stone failure mode |
| **S2-03** | F3 Solvent dissolution/precipitation | CN106928486A/B (existing spec); CNR acetone offering; Cerdia WO2026074041A2 (abstract level) | Existing `specs/cn106928486-source-reconstruction.md` (v1, re-verified) + dossier entry | Two industrial actors (CNR/AzzeroCO2, Cerdia) and a granted Chinese patent; polymer recovery vs contaminant rejection is the sharpest mass-balance question |
| **S2-04** | F4 Pressurized / supercritical fluid | TchaoMegot FR3102180A1 family; company claims | Existing `specs/pressurized-fluid-reference.md` (v1, re-verified) | Unique mechanism; unresolved pressure conflict makes a good falsification target; no water/effluent claim is testable |
| **S2-05** | F5 Alkaline/acid pulping to cellulose | UnB PI 0305004-1; Teixeira et al. 2017; Poiato Recicla | New `specs/unb-pi0305004-source-reconstruction.md` | Converts the polymer rather than recovering it; dark-liquor waste is the hardest effluent problem in the set; patent term likely expired (public-domain relevance) |

Batch size: 6 units (3 existing specs re-verified + 3 new specs + 1 company dossier). One company-workflow dossier covers the non-patent or partially patented operators (Code Effort, TerraCycle, BuffIndia, Re-Cig, CNR/AzzeroCO2, Cerdia).

---

## 3. Lead index (traceability)

Each lead is either traceable to a recorded URL/section or explicitly marked inaccessible.

| Lead | Type | Traceable? | Where | Stage-2 treatment |
|---|---|---|---|---|
| TchaoMegot (FR) | Company + patents | Yes, partial | `tchaomegot.com/depollution/`; Google Patents FR3102180A1 (prior partial read) | S2-04; pressure conflict carried |
| Keenat (FR) | Company + patents | Yes, partial | `keenat.com/recyclage-valorisation-megots/`; FR3110470A1 chunks 0,2 | S2-02; temperature conflict carried |
| MéGo! (FR) | Company + patent | Yes, partial | `capbiotek.fr` case text; Ouest-France; FR3066128A1 abstract | S2-01 |
| Re-Cig (IT) | Company, patent number **not located** | Company yes; patent no | `re-cig.it/en/tecnologia/`, `/portfolio/re-cig-universita/` | S2-01 dossier; patent marked inaccessible |
| Code Effort (IN) | Company, **no patent located** | Yes, news-reported | `codeefforts.com`; The Better India 2025-02-08; TOI 2022-11-13; weekendleader 2021 | S2-01 dossier; chemistry marked not disclosed |
| TerraCycle (US/CA) | Company, **no patent located** | Yes, official PDF | TerraCycle process PDF (3 steps) | S2-01 dossier |
| BuffIndia (IN) | Company, **no patent located** | Yes, one interview | Climate Action Live 2026-06-11; YourStory 2025-05-09 | S2-01 dossier; acidic hydrolysis as reported |
| Poiato Recicla / UnB (BR) | Company + patent PI 0305004-1 | Yes | UnB CDT page; Atlas of Science; Teixeira 2017 DOI | S2-05 |
| CNR / AzzeroCO2 (IT) | Patent offering, number not on page | Yes, partial | knowledge-share.eu page | S2-03 dossier |
| Cerdia (DE) | Patent applicant | Abstract only | WO2026074041A2 chunk 0 | S2-03 dossier; description inaccessible this pass |
| Miniwiz (TW) | Patent | Yes, claims read | US10980272B2 | Deferred: mechanical separation only, no cleaning step (see §4) |
| Matteri (IT) | Patent, withdrawn | Yes, claims read | EP2520184A1 | Deferred support: 5 % NaOCl claim cited as a chemical-wash data point, not reconstructed |
| Kalabak (TR) | Patent | Not read this pass | WO2020231362A1 | Deferred: fuel-additive route, different product class |
| Zhejiang Univ. (CN) | Patent | Yes, spec exists | CN106928486A/B | S2-03 |
| Yunnan Changyi (CN) | Patent | Not read | CN111822484A | Deferred: industrial scrap filter rods, not post-consumer litter |
| Carbon / supercapacitor / graphene (CN) | Patents | Not read | CN111118670A, CN108807014, CN107946082A | Deferred: energy-material family, outside batch scope |
| KR microbial composting | Patent | Not read | KR10-1782684-1 | Deferred: biological route, public evidence thin |
| KR extraction | Patent | Not read | KR20160005298A | Deferred: language/access |
| RMIT bricks / asphalt / concrete | Papers/press | Not read | registry citations | Deferred: construction family; Korean paving failure is the cautionary anchor |
| Filaret (EE) | Company lead | No primary source read | 3D-printing press item | Deferred: source-not-retrieved |
| Pyrolysis 650–750 °C | Paper | Not read | registry citation | Deferred: energy route, product class differs |
| CA membranes / acetic acid 2025 | Papers | Not read | registry citations | Deferred: material-science family |

"Inaccessible" means not obtained within this session's budget/backends; it does not assert the document is unavailable to a human or a paid service.

---

## 4. Deliberate exclusions and their reasons

Patent status is metadata in this selection: active, expired, abandoned and withdrawn documents were all eligible. No route was excluded because of its legal status (errata E-17).

| Excluded from batch-01 | Reason | Residual value |
|---|---|---|
| Miniwiz apparatus (US10980272B2) | No chemical cleaning/detoxification disclosed; it is a separation front-end, not a cleaning process | Cited in S2-01 as a possible pre-treatment option |
| Matteri EP2520184A1 | Thin disclosure (two steps; 5 % NaOCl claim; no numeric conditions). Deferral is on evidence thinness, **not** on the withdrawn status, which is metadata only | Cited as a chemical-wash data point; status is recorded, never used as a selection filter |
| Construction-material routes (bricks, asphalt, concrete) | Product class is construction; detoxification is by encapsulation, which the Korean paving-stone failure directly undermines; no full-text read this pass | Retained as failure/benchmark evidence for Stage 3, not as a reconstruction unit |
| Pyrolysis/carbonisation/supercapacitors | Product class is energy/carbon materials; different exposure pathway and assay set | Deferred family; flagged in H02 |
| Microbial composting (KR) | Only patent abstract/news; no quantitative public process | Deferred; would need a non-English register search |
| Kalabak fuel additive (TR) | Product is a fuel blend; combustion emissions are the dominant question and no emission data located | Deferred |
| Filaret 3D filament (EE) | No primary source obtained | Deferred as `source-not-retrieved` |

Exclusion is about batch scope, not about importance; several excluded leads may matter more for a construction/energy product definition.

---

## 5. Collector vs processor separation (required by charter)

| Entity | Collects/sorts? | Processes/cleans? | Sells product? | Notes |
|---|---|---|---|---|
| Code Effort | Yes (V bins, 2,000+ pickers) | Yes (in-house Noida facility) | Yes (paper, toys, compost) | Vertically integrated; chemistry proprietary |
| TerraCycle | Yes (programme/drop-off network) | Not demonstrated; uses processing partners | Yes (via brand partners/lumber) | "How recycled" PDF does not name the processor |
| BuffIndia | Yes (kiosks, door-to-door) | Yes (Ahmedabad facility) | Yes (décor/gifting) | Acidic hydrolysis reported |
| TchaoMegot | Yes (secure collection) | Yes (SC-CO2 site) | Yes (fibre for insulation/textile padding) | Claims prefectoral authorisation |
| Keenat | Yes | Yes (dry thermal; now CSS) | Yes (plates, furniture) | Pivoted to fuel; material route not abandoned historically |
| MéGo! | Yes (via Eco action plus) | Yes (Bourg-Blanc unit) | Yes (urban furniture) | Closed water loop claimed |
| Re-Cig | Yes (Smoker Points) | Yes (Civezzano plant) | Yes (Re-CA granules) | Wastewater to external partner |
| Poiato Recicla | Yes | Yes (Votorantim plant) | Yes (cellulose pulp, paper) | UnB licensee; ISO 14001 claimed |
| CNR/AzzeroCO2 | No (offering) | Laboratory/TRL 5 | Licensing | Not an operating collector |
| Cerdia | No | Patent-stage recovery | CA producer (incumbent) | Potential offtake for recovered CA |

Stage 2 must not describe CNR or Cerdia as operating collectors, and must not describe TerraCycle as a demonstrated cleaner.

---

## 6. Scope and coverage limits carried into Stage 2/3

- **Not worldwide.** Selection reflects English/French/Portuguese web and patent-page access plus inherited Chinese/Korean/Spanish leads. No register search was performed.
- **Not a quality ranking.** Six families were chosen for mechanism diversity and falsifiability, not because they are the six best.
- **Public-evidence limit.** Every unit will be reconstructed only to what is publicly readable; missing values stay missing and are labelled.
- **No experiments.** No physical trial, purchase, sample request or company contact is authorized or performed.
- **Company self-reports.** All throughput, yield and "clean" claims remain attributed company claims until a third-party assay is located.
- **Legal status is not freedom to operate.** One patent's expiry (e.g. PI 0305004-1 by term arithmetic) does not clear other patents, trademarks, waste-transport law or product-safety law.

---

## 7. H03 checkpoint and Stage-1 gate

- Outputs complete: `company-source-map.md`, `coverage-ledger.md`, `batch-selection.md`.
- Gate check (WORKFLOW.md Stage 1): (i) selected leads traceable or explicitly inaccessible — yes (§3); (ii) scope/coverage limits clear — yes (§6, H02 §8); (iii) collector/processor distinctions clear — yes (§5); (iv) no record quota or worldwide-exhaustion claim — yes.
- Verdict: **Stage 1 `complete_scoped`**. Stage 2 may proceed under AUTO with remaining capacity.
- Next action: Stage 2 reconstruction index, assumption/gap ledger, versioned specs, frozen Stage-3 packet.
- Provenance: Arena Agent Mode, 2026-11-03, baseline `fda66af`; no registry, backup or prior scientific file modified.
