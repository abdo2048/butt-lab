# STATE — cigarette-butts (case 1; lives in butt-lab until migration to recycling-empire)
Updated: 2026-11-24 (session 3) | Phase: 3 | Version: v0.5-pre-migration

## In flight right now
Phase 3, second batch: writing full action plan for M-03 unb-alkaline-pulping.
- Sources already read this session: BR0305004B1 patent full text (granted 2014-11-11; examples with numbers) + Teixeira et al. 2017 Waste Management 60:140-150 full text (NaOH 1%, 3 h boil, 50 L pilot, dark liquor COD 29,986 mg/L, 7-cycle effluent reuse). Yield check from thesis in flight.

## Done
- Phase 1 (2026-11-22): 50 sources shelved in sources/ (document.pdf + text.md each)
- Phase 2 (2026-11-23): registry/methods.yaml — 27 methods
- Reader site live (old workflow): https://butt-lab.am6.workers.dev/
- 2026-11-24: decisions locked with operator — hybrid scope (8 full action plans + 19 summary cards); charter v2 gap-filling flip (every gap gets a labeled estimate); site will be rebuilt simple; project migrates to github.com/abdo2048/recycling-empire at Phase 6; attic/pre-cleanup-2026-11-24 branch preserves all retired scaffolding; the reusable system now lives in recycling-empire/PLAYBOOK.md
- 2026-11-24: recycling-empire framework deployed (17 files: PLAYBOOK, START-A-NEW-MATERIAL, MATERIALS, template/ complete) — commits e0aa955e, d9407f36
- 2026-11-24 (session 2): **M-01 mego-wash action plan done** — methods/M-01-mego-wash.md, all disclosed numbers extracted from granted FR3066128B1 full spec (1 kg/min, 20-30 min tanks x3, 1000 L/2 h/1 kW recycler, 100-120 degC dry, <1500 um, 314 t / 350 degC press); 11-row labeled gap-fill; commit 198402f2
- 2026-11-24 (session 2): **M-02 defenzo-solvent action plan done** — methods/M-02-defenzo-solvent.md from PMC7659942 full text (50 degC 60 min water, 3x cold, 2x ethanol 99%, 60 degC dry, 5% w/w acetone film, Tg 192 degC etc.); 10-row labeled gap-fill; new shelf record sources/defenzo-2020-materials/SOURCE.md (document.pdf + text.md still pending operator conversion); same commit

## Next up (in order)
1. Phase 3 — remaining full action plans (methods/M-XX-*.md):
   M-03 unb-alkaline-pulping (IN FLIGHT) | M-04 keenat-dry-thermal (FR3110470A1) | M-05 tchaomegot-sc-co2 (FR3102180A1) | M-06 terracycle-compost | M-07 pyrolysis-650-750 | M-08 rmit-brick
2. Phase 3b — 19 summary cards to methods/_cards.md
3. Phase 4 — one invented method to inventions/
4. Phase 5 — ranking.md (six standard factors) + test-first list
5. Phase 6 — migrate finished material to recycling-empire/materials/cigarette-butts/; build unified site; retire this repo's old reader

## Rules I must obey (durable)
- Labels on every non-trivial statement: source_supported | ai_inference | ai_proposal | parameter_not_located
- Every gap-fill = labeled estimate with concrete numbers + reasoning + falsifier. Vagueness is a defect.
- No invented measurements; compute arithmetic; unknown is not zero; conflicting values both kept
- Company self-report is not measurement; never claim clean/safe/validated
- Metals stop-condition: Cd/Pb/As/Hg uncharacterised in the product -> route on hold for product-facing work
- Desk research authorizes no physical trial; no DIY pressure vessels
- Update STATE.md before stopping or before any long step; the 2-minute resume test must pass

## Where things live (this repo, transitional)
sources/ | registry/methods.yaml | reports/final/ | inventions/ | methods/ (Phase 3+) | GLOSSARY.md | charter.md
System + template: https://github.com/abdo2048/recycling-empire (PLAYBOOK.md)
Historical provenance — do NOT read to resume: archive/, docs/, state/, tools/, mcp/, .superpowers/, operator/, reports/ (except final/), .github/workflows
