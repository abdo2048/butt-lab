# STATE — cigarette-butts (case 1; lives in butt-lab until migration to recycling-empire)
Updated: 2026-11-24 (session 3) | Phase: 3 | Version: v0.5-pre-migration

## In flight right now
Phase 3 batch: M-04 + M-05 action plans being written from sub-agent extractions of the shelf patents (fr3110470a1 + keenat guide; fr3102180a1 + 3 related TchaoMegot patents). M-06 terracycle research agent timed out once — relaunch pending. M-07/M-08 extractions done, files next.

## Done
- Phase 1 (2026-11-22): 50 sources shelved; Phase 2 (2026-11-23): registry 27 methods
- 2026-11-24: operator decisions locked; recycling-empire deployed (17 files); old reader live
- 2026-11-24 (session 2): M-01 + M-02 action plans done (commit 198402f2); sources/defenzo-2020-materials/SOURCE.md added
- 2026-11-24 (session 3): **M-03 unb-alkaline-pulping done** — methods/M-03-unb-alkaline-pulping.md from BR0305004B1 full text + Teixeira 2017 Waste Management full text (NaOH 1%, 3 h boil, 50 L pilot, dark liquor COD 29,986 mg/L, nicotine 35.4 g/L, 7-cycle reuse, patent expired under both Art.40 interpretations — computed); 10-row labeled gap-fill; commit c640ac19
- 2026-11-24 (session 3): shelf re-reads: Mego FR3066128B1 full spec (all missing numbers found — throughput, tank times, recycler, press); De Fenzo protocol captured from PMC

## Next up (in order)
1. Phase 3 — remaining action plans: M-04 keenat (writing) | M-05 tchaomegot (writing) | M-06 terracycle (research) | M-07 pyrolysis (extracted, file next) | M-08 rmit-brick (extracted, file next)
2. Phase 3b — 19 summary cards to methods/_cards.md
3. Phase 4 — invention; 4. Phase 5 — ranking + test-first; 5. Phase 6 — migration to recycling-empire + unified site

## Key session-3 findings (do not lose)
- Shelf mismatch: `sources/kurmus-2020-toxicity-valorisation/` actually contains Shah et al. 2023 Heliyon review; the real Kurmus 2020 WM paper text lives inside `kurmus-thesis-fired-clay-bricks` (Ch.2) — flagged for M-08 and registry correction
- Shelf mismatch: `sources/keenat-2025-cdp-notice/` is a DIY pocket-ashtray craft sheet, NOT a process notice
- Keenat company pivot (keenat-2026-guide, self-report): material recycling CEASED, pivoted to CSS/cement-kiln co-processing; patent numbers claimed FR3110470 + EP3912739
- JAAP 106167 (Yousef 2023, pyrolysis triacetin) is closed-access: registry's 650-750 degC claim is abstract-only/unverified — flagged in M-07

## Rules I must obey (durable)
- Labels on every non-trivial statement: source_supported | ai_inference | ai_proposal | parameter_not_located
- Every gap-fill = labeled estimate + concrete numbers + reasoning + falsifier; vagueness is a defect
- No invented measurements; compute arithmetic; unknown is not zero; conflicting values both kept
- Company self-report is not measurement; never claim clean/safe/validated
- Metals stop-condition: Cd/Pb/As/Hg uncharacterised in the product -> route on hold for product-facing work
- Desk research authorizes no physical trial; no DIY pressure vessels
- Update STATE.md before stopping or before any long step; the 2-minute resume test must pass

## Where things live (this repo, transitional)
sources/ | registry/methods.yaml | reports/final/ | inventions/ | methods/ (Phase 3+) | GLOSSARY.md | charter.md
System + template: https://github.com/abdo2048/recycling-empire (PLAYBOOK.md)
Historical provenance — do NOT read to resume: archive/, docs/, state/, tools/, mcp/, .superpowers/, operator/, reports/ (except final/), .github/workflows
