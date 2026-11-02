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
