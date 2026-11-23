# Stage 2 — Reconstruction index (batch-01)

Date: 2026-11-03; corrected in the v1.1 packet-QC pass (same day, branch `arena/c998d19c-butt-lab`). Actor: single AUTO Deep-dive. Baseline: `fda66af351a37d38287792ed3b578a258eedf7fc`. Status: `complete_scoped` for the six selected units. This index is the map of what has been reconstructed, to what depth, and with which limits. It is not a claim that the processes work.

Correction note: v1.0 of this index overstated what the reused Chinese spec establishes and miscounted files (see `reports/stage2/errata-packet-v1.0.md`, E-01 and E-14). Those statements are corrected below. Re-reading a prior note is **not** independent source re-verification.

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
- **S2-02** is the dry-heat + composite family, with a documented commercial retreat and a secondary failure comparator (Korean paving stones). The comparator is evidence to weigh, not a verdict on the family.
- **S2-03** is the polymer-recovery family, where dissolution/precipitation should reject insoluble matter but can co-precipitate contaminants.
- **S2-04** is the only non-aqueous dense-fluid route. It is not "non-thermal": CO2 conditioning and extraction temperature still matter; what is absent is a water/solvent wash.
- **S2-05** converts acetate to cellulose through deacetylation and produces a dark, contaminant-bearing liquor. Its relative effluent load is not measured in this batch; v1.0's "most concentrated" wording is withdrawn (E-04).

## 3. Re-verification notes on reused specs (no edits made)

Per the charter's read-only rule for prior scientific outputs, the three existing specs were **re-read but not modified**. This is a consistency check against the evidence notes and the cited sections, **not** an independent re-verification of the sources (no register, PDF or third-party check was performed in this pass).

- `specs/de-fenzo-2020-source-reconstruction.md`: consistent with `dossier/evidence/defenzo-2020-materials.md` and the paper sections cited; correctly separates the washing sequence from the acetone film-casting step; correctly refuses to convert the atomic-absorption detection limit into a product limit. No correction required for this stage.
- `specs/cn106928486-source-reconstruction.md`: records the description range (room temperature to 95 °C; 0.25–4 h) and claim 1's 2–4 h wording, keeps the five embodiments separate, flags the 92 % recovery denominator, and **states in its own §1 that the granted B version's claims and legal scope were not reviewed**. The separate 75–95 °C / 2–4 h granted-claim distinction is documented in `reports/gap-check-01.md` (added to the v1.1 packet), not in this spec. v1.0 wrongly credited the spec with that correction (E-01); no source re-verification was performed here.
- `specs/pressurized-fluid-reference.md`: correctly refuses to treat the generic pressure envelope as a validated optimum and keeps the press-quote contradiction open. No correction required.

Residual issue carried forward: all three are same-author drafts without independent technical review; no model/chemist sign-off exists. Stage 3 is the first independent panel.

## 4. Coverage vs the Stage-2 gate (WORKFLOW.md)

| Gate requirement | Status | Evidence |
|---|---|---|
| Selected batch addressed | Yes — 6 units, 7 evidence files (3 reused specs + 3 new specs + 1 company dossier), plus 4 packet-control files | §1 |
| Inherited conflicts/unknowns carried explicitly | Yes | `reports/stage2/assumption-and-gap-ledger.md` §3–§4 |
| Waste/safety questions retained | Yes | Each spec §6–§7; dossier §8.2 |
| Common panel question/schema | Yes | `packets/batch-01/stage-3/question.md`, `output-schema.md` |
| Packet ready and frozen | Yes — v1.1 supersedes v1.0; hashes recomputed; content commit recorded after freeze | `packets/batch-01/stage-3/manifest.yaml`, `COMMIT.txt` |

## 5. Explicit non-claims

- No unit is shown to detoxify butts to any stated level.
- No unit has a complete mass balance on a dry basis.
- No unit has an independent third-party assay located.
- No cost, LCA or energy comparison is asserted; the only LCA datum is Keenat's own retreat, which is company-reported.
- No legal status is asserted beyond quoted database assumptions and one term calculation.

## 6. Units deliberately not reconstructed

Matteri (withdrawn; cited via dossier), Miniwiz (separation front-end only), Kalabak fuel additive, CN construction/carbon/energy patents, KR composting/extraction, RMIT construction materials, Filaret filament, pyrolysis. Reasons in `reports/stage1/batch-selection.md` §4; they remain in the registry and are available to Stage 4 as seeds.
