# Stage 2 — Reconstruction index (batch-01)

Date: 2026-11-03. Actor: single AUTO Deep-dive. Baseline: `fda66af351a37d38287792ed3b578a258eedf7fc`. Status: `complete_scoped` for the six selected units. This index is the map of what has been reconstructed, to what depth, and with which limits. It is not a claim that the processes work.

## 1. Units and files

| Unit | Family | Spec / dossier | Version | Registry IDs | Evidence depth | Key source limits |
|---|---|---|---|---|---|---|
| S2-00 | F0 Staged water/ethanol wash | `specs/de-fenzo-2020-source-reconstruction.md` | v1.0 reused (read 2026-11-02; re-verified 2026-11-03) | `de-fenzo-2020-materials`, `academic-green-ethanol-wash` | `source-partially-read` (methods/results sections) | Wash volumes, contact times, yields not in paper; sterilization method unspecified; FTIR/TGA ≠ detoxification |
| S2-01a | F1 Mechanical + aqueous wash (patent) | `specs/mego-fr3066128a1-source-reconstruction.md` | v1.0 new | `mego-fr3066128a1` | `source-partially-read` (abstract; B1 unread) | No T/t/ratio; sludge route undisclosed; 2,000 vs 4,000 butts/kg conflict |
| S2-01b | F1 Company workflows | `specs/company-workflow-dossiers-batch01.md` | v1.0 new | `mego-fr3066128a1`, `cnr-knowledge-share-ca-recovery`, `cerdia-ca-recovery`, plus **unregistered** Code Effort / TerraCycle / BuffIndia / Re-Cig | `source-partially-read` per entity | Chemistry not disclosed (Code Effort); sanitisation absent (TerraCycle); patent number missing (Re-Cig); single interview (BuffIndia) |
| S2-02 | F2 Dry thermal + extrusion composite | `specs/keenat-fr3110470a1-source-reconstruction.md` | v1.0 new | `keenat-dry-thermal` | `source-partially-read` (chunks 0, 2 of 8) | Examples/claims unread; 80–100 °C vs ~200 °C conflict; no assay data |
| S2-03a | F3 Solvent dissolution (CN) | `specs/cn106928486-source-reconstruction.md` | v1.0 reused (read 2026-11-02; re-verified 2026-11-03) | `cn106928486` | `source-partially-read` (Chinese description, 5 embodiments, claims 1–4; B PDF failed) | Recovery denominator unclear; stream combination ambiguous; no contaminant partitioning data |
| S2-03b | F3 Solvent dissolution (CNR, Cerdia) | Dossier §6–7 + `dossier/evidence/cnr-knowledge-share-ca-recovery.md` | v1.0 | `cnr-knowledge-share-ca-recovery`, `cerdia-ca-recovery` | `source-partially-read` (offering) / `source-not-retrieved` (Cerdia description) | No patent number (CNR); cleaning agent unnamed (Cerdia); no yields |
| S2-04 | F4 Pressurized / supercritical fluid | `specs/pressurized-fluid-reference.md` | v1.0 reused (read 2026-11-02; re-verified 2026-11-03) | `tchaomegot-sc-co2` | `source-partially-read` | WO/FR full text not obtained; 50/60 bar press quote vs 280–320 bar patent conflict |
| S2-05 | F5 Alkaline/acid pulping | `specs/unb-pi0305004-source-reconstruction.md` | v1.0 new | `unb-alkaline-pulping` | `source-partially-read` (author summary + secondary) | Patent and paper full texts unread; effluent data absent; yield not derivable |

## 2. What each unit contributes to the panel

- **S2-00** gives the only peer-reviewed material-characterisation baseline and the evidence that a transparent film is not proof of cleanliness.
- **S2-01** is the deployed mainstream: water washing + mechanical separation, with four operator variants and one published mass split (MéGo!) plus one published polymer yield (Re-Cig, ~39 %).
- **S2-02** is the "heat and encapsulate" family, with the strongest documented commercial retreat and a direct link to the Korean paving-stone failure.
- **S2-03** is the polymer-recovery family, where dissolution/precipitation should reject insoluble matter but can co-precipitate contaminants.
- **S2-04** is the only non-aqueous, non-thermal route, with a recycled dense fluid and a concentrate stream.
- **S2-05** destroys the acetate to cellulose and creates the most concentrated liquid effluent.

## 3. Re-verification notes on reused specs (no edits made)

Per the charter's read-only rule for prior scientific outputs, the three existing specs were **re-read but not modified**. Re-verification against the evidence notes and the current source pages found:

- `specs/de-fenzo-2020-source-reconstruction.md`: consistent with `dossier/evidence/defenzo-2020-materials.md` and the paper sections cited; correctly separates the washing sequence from the acetone film-casting step; correctly refuses to convert the atomic-absorption detection limit into a product limit. No correction required for this stage.
- `specs/cn106928486-source-reconstruction.md`: correctly distinguishes description ranges from granted-claim wording (75–95 °C, 2–4 h), keeps the five embodiments separate, and flags the 92 % recovery denominator as unresolved. No correction required.
- `specs/pressurized-fluid-reference.md`: correctly refuses to treat the generic pressure envelope as a validated optimum and keeps the press-quote contradiction open. No correction required.

Residual issue carried forward: all three are same-author drafts without independent technical review; no model/chemist sign-off exists. Stage 3 is the first independent panel.

## 4. Coverage vs the Stage-2 gate (WORKFLOW.md)

| Gate requirement | Status | Evidence |
|---|---|---|
| Selected batch addressed | Yes — 6 units, 4 files (3 reused + 3 new specs + 1 dossier) | §1 |
| Inherited conflicts/unknowns carried explicitly | Yes | `reports/stage2/assumption-and-gap-ledger.md` §3–§4 |
| Waste/safety questions retained | Yes | Each spec §6–§7; dossier §8.2 |
| Common panel question/schema | Yes | `packets/batch-01/stage-3/question.md`, `output-schema.md` |
| Packet ready and frozen | Yes (draft frozen at this commit; hashes in manifest) | `packets/batch-01/stage-3/manifest.yaml` |

## 5. Explicit non-claims

- No unit is shown to detoxify butts to any stated level.
- No unit has a complete mass balance on a dry basis.
- No unit has an independent third-party assay located.
- No cost, LCA or energy comparison is asserted; the only LCA datum is Keenat's own retreat, which is company-reported.
- No legal status is asserted beyond quoted database assumptions and one term calculation.

## 6. Units deliberately not reconstructed

Matteri (withdrawn; cited via dossier), Miniwiz (separation front-end only), Kalabak fuel additive, CN construction/carbon/energy patents, KR composting/extraction, RMIT construction materials, Filaret filament, pyrolysis. Reasons in `reports/stage1/batch-selection.md` §4; they remain in the registry and are available to Stage 4 as seeds.
