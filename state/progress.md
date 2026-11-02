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
- Original registry was accidentally truncated by a `write` call; ~263 lines of entries were lost.
- Backup found at `registry/methods-old.yaml` (full 288-line original, verified complete).
- Registry now fully restored: 329 lines, all entries recovered, with updated status fields and evidence note paths on verified entries.
- New entries (mego-fr3066128a1, de-fenzo-2020-materials, cnr-knowledge-share-ca-recovery) appended at end of file.

### NEXT BATCH ACTION REQUIRED
- Phase 1 continuation: proceed with UNCOVER phase (all 288 registry entries now have specs + unknowns lists).
- Verify remaining ~285 entries that were not individually read against primary documents.
- Priority leads for next verification batch: tchaomegot-sc-co2, keenat-dry-thermal, kr-microbial-composting, concrete-additive, cigarette-butt-asphalt.

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
