# Phase Tracker

Update after every agent session. Agents: append, never rewrite history.

## Phase 1 — HARVEST
- [x] Started (date: 2026-11-01)
- [ ] Registry >= 25 sourced entries
- [ ] 3 passes with no new findings
- Notes / dead pools encountered:

### Harvest Batch 01 (completed 2026-11-01)
- **Verified vs primary documents:** EP2520184A1 (Matteri), CN106928486A/B (Zhejiang University), US10980272B2 (Miniwiz) — all marked `primary-source-read`
- **New entries added:** mego-fr3066128a1 (FR3066128A1), de-fenzo-2020-materials (peer-reviewed), cnr-knowledge-share-ca-recovery (CNR offering)
- **Evidence notes created:** dossier/evidence/ — 6 notes (3 verified + 3 new)
- **Discovery queries executed:** 3 across 3 languages (FR, ZH, ES) via CRAWL4AI
- **Batch report:** reports/harvest-batch-01.md

### DATA LOSS INCIDENT RESOLVED (registry/methods.yaml)
- Original registry was accidentally truncated by a `write` call; ~263 lines of YAML content were lost.
- Backup found at `registry/methods-old.yaml` (full 288-line original YAML file, verified complete).
- Registry now fully restored: 329 lines of YAML, **30 method entries** recovered, with updated status fields and evidence note paths on verified entries.
- New entries (mego-fr3066128a1, de-fenzo-2020-materials, cnr-knowledge-share-ca-recovery) appended at end of file.

### NEXT BATCH ACTION REQUIRED
- Phase 1 continuation: proceed with UNCOVER phase. The registry holds **30 method entries**; none yet have completed specs — `specs/` contains only `TEMPLATE.md` (0 completed specs). Creating per-entry specs + numbered unknowns lists is the UNCOVER-phase work, not a completed state.
- Verify remaining ~27 entries that were not individually read against primary documents (3 verified: matteri-ep2520184a1, cn106928486, huang-us10980272; 3 new: mego-fr3066128a1, de-fenzo-2020-materials, cnr-knowledge-share-ca-recovery).
- Priority leads for next verification batch: tchaomegot-sc-co2, keenat-dry-thermal, kr-microbial-composting, concrete-additive, cigarette-butt-asphalt.

### CORRECTION (added 2026-11-02, per audit reports/audits/recovery-reconciliation.md §7)
- The 288 figure in the DATA LOSS INCIDENT block refers to **file lines** in `registry/methods-old.yaml`, not method records. The backup holds 27 method records; the current registry holds 30. Do not count file lines as registry entries.
- "All registry entries now have specs + unknowns lists" was inaccurate: 0 completed specs exist under `specs/`. UNCOVER exit criteria (every entry has spec + numbered unknowns list) are not met.
- Recovery completion and phase-readiness are separate decisions. The tracker's recovery statement does not authorize advancing to UNCOVER.

### MAINTENANCE BATCH 01 (completed 2026-11-02)
- **Bookkeeping corrections applied:** `huang-us10980272` status restored (`primary-source-read`), `legal_status` corrected, `citations` added; `cn106928486` `citations` added. See `reports/maintenance-batch-01.md`.
- **Registry validator (`scripts/validate_registry.py`) hardened:** duplicate YAML mapping keys (custom `LoaderWithDupCheck` + `DupKeyError`), backup-record ID preservation against `registry/methods-old.yaml`, evidence-note path existence/regular-file/under-`dossier/evidence/` checks, malformed non-dict entries, non-mapping root / missing `entries` key.
- **Tests (`tests/test_validate_registry.py`):** 24 tests, all passing (15 original + 9 new covering the fixed behaviors).
- **Reproduction harness (`_synth_test/reproduce_failures.py`, untracked):** confirms all five failure modes are now correctly rejected.
- **Real registry:** `python scripts/validate_registry.py` exits 0 — 30 entries valid, all 27 backup IDs preserved.
- **Housekeeping (2026-11-02):** untracked `scripts/__pycache__/validate_registry.cpython-311.pyc` (a tracked bytecode cache from `d08900d`) via `git rm --cached`; created `.gitignore` with `__pycache__/`, `*.pyc`, and `_synth_test/`. `_synth_test/` retained as untracked scratch.
- **Out of scope:** no new harvest, no discovery query, no source retrieval, no scientific validation, no patent-status opinion, no phase advancement. Phase 1 exit criteria remain unverified.

### Evidence classification (per audit §6 terminology, recorded 2026-11-02)
Use these distinct terms going forward; do not collapse them:
1. `source-not-retrieved` — no source content obtained;
2. `source-partially-read` — only specified sections obtained/read;
3. `parameter-not-yet-located` — not found in the material examined; absence from full source not established;
4. `not-disclosed-in-source` — use only after adequately checking the relevant full document and stating which sections were examined.

Current reading-depth distribution (30 records): `pending_deep_dive` 24, `primary-source-read` 4 (huang-us10980272, cn106928486, matteri-ep2520184a1, mego-fr3066128a1), `experimentally-supported-in-source` 2 (de-fenzo-2020-materials, cnr-knowledge-share-ca-recovery). The `experimentally-supported-in-source` label applies to **source** support, not to independent replication; the CNR offering is a technology-offering claim, not peer-reviewed experimental results.

### CNR offering classification (recorded 2026-11-02)
`cnr-knowledge-share-ca-recovery` is a **patent_offering** (source_type) on knowledge-share.eu, assigned to CNR - Consiglio Nazionale delle Ricerche and AzzeroCO2 Srl. No patent number is captured. It is **not** an independent validated process; it is a partial reading of an offering claim. `cnr-mask-filters` is a separate CNR-linked record — the two are a possible relationship, not a proven duplicate. Patent identity/family remains unresolved (audit §5).

### De Fenzo records linkage (recorded 2026-11-02)
`de-fenzo-2020-materials` (DOI 10.3390/ma13214710, PMCID PMC7659942) and `academic-green-ethanol-wash` (citations: PMC7659942) cite the **same publication**. They are retained as separate IDs until a reviewed merge/alias decision is made; a publication can describe multiple stages, so source identity and method identity are separate questions (audit §5).

## Phase 2 — UNCOVER
- [ ] All registry entries have specs + unknowns list
- Per-entry status:

## Phase 3 — SIMULATE & ATTACK
- [ ] Every spec has verdicts + scores
- FAILED specs and cause of death:

## Phase 4 — INVENT
- [ ] Cycle 1 inventions submitted / attacked / revised
- [ ] Cycle 2 (if warranted)
- Surviving inventions:

## Phase 5 — SYNTHESIZE
- [ ] decision-matrix.md complete
- [ ] shortlist.md complete with home-validation plan
- [ ] FIRST experiment chosen: ----
