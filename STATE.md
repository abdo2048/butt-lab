# STATE — cigarette-butts (case 1; lives in butt-lab until migration to recycling-empire)
Updated: 2026-11-24 | Phase: 3 | Version: v0.5-pre-migration

## In flight right now
none — Day 1 setup complete. Next session starts Phase 3 with M-01.

## Done
- Phase 1 (2026-11-22): 50 sources shelved in sources/ (document.pdf + text.md each)
- Phase 2 (2026-11-23): registry/methods.yaml — 27 methods
- Reader site live (old workflow): https://butt-lab.am6.workers.dev/
- 2026-11-24: decisions locked with operator — hybrid scope (8 full action plans + 19 summary cards); charter v2 gap-filling flip (every gap gets a labeled estimate); site will be rebuilt simple; project migrates to github.com/abdo2048/recycling-empire at Phase 6; attic/pre-cleanup-2026-11-24 branch preserves all retired scaffolding; the reusable system now lives in recycling-empire/PLAYBOOK.md

## Next up (in order)
1. Phase 3 — full action plans (methods/M-XX-*.md) for the 8 priority methods:
   M-01 mego-wash (FR3066128A1) | M-02 defenzo-solvent (Materials 2020, doi 10.3390/ma13214710) | M-03 unb-alkaline-pulping (Poiato) | M-04 keenat-dry-thermal (FR3110470A1) | M-05 tchaomegot-sc-co2 (FR3102180A1) | M-06 terracycle-compost | M-07 pyrolysis-650-750 | M-08 rmit-brick
2. Phase 3b — 19 summary cards to methods/_cards.md
3. Phase 4 — one invented method to inventions/
4. Phase 5 — ranking.md (six standard factors) + test-first list
5. Phase 6 — migrate finished material to recycling-empire/materials/cigarette-butts/; build unified site; retire this repo's old reader

## Rules I must obey (durable)
- Labels on every non-trivial statement: source_supported | ai_inference | ai_proposal | parameter_not_located
- Every gap-fill = labeled estimate with concrete numbers + reasoning + falsifier. Vagueness is a defect.
- No invented measurements; compute arithmetic; unknown is not zero; conflicting values both kept
- Company self-report is not measurement; never claim clean/safe/validated
- Metals stop-condition: Cd/Pb/As/Hg uncharacterised -> route on hold
- Desk research authorizes no physical trial; no DIY pressure vessels
- Update STATE.md before stopping or before any long step; the 2-minute resume test must pass

## Where things live (this repo, transitional)
sources/ | registry/methods.yaml | reports/final/ | inventions/ | methods/ (Phase 3+) | GLOSSARY.md | charter.md
System + template: https://github.com/abdo2048/recycling-empire (PLAYBOOK.md)
Historical provenance — do NOT read to resume: archive/, docs/, state/, tools/, mcp/, .superpowers/, operator/, reports/ (except final/), .github/workflows
