# STATE — cigarette-butts (case 1; lives in butt-lab until migration to recycling-empire)
Updated: 2026-11-25 (session 4) | Phase: 3 | Version: v0.5-pre-migration

## In flight right now
Nothing mid-flight. Phase 3 complete: all 8 priority action plans (M-01 … M-08) are written. Next session starts Phase 3b: 19 summary cards -> methods/_cards.md.

## Done
- Phase 1 (2026-11-22): 50 sources shelved; Phase 2 (2026-11-23): registry 27 methods
- 2026-11-24: operator decisions locked; recycling-empire deployed (17 files); old reader live
- 2026-11-24 (session 2): M-01 + M-02 done (commit 198402f2); sources/defenzo-2020-materials/SOURCE.md added
- 2026-11-24 (session 3): M-03 done (commit c640ac19); M-04 + M-05 written
- 2026-11-25 (session 4): **M-04 + M-05 verified complete** (were marked "writing" — confirmed full files on disk; STATE was stale)
- 2026-11-25 (session 4): **M-06 terracycle done** — web research (sub-agent, partially degraded search/wayback): route = 2012 launch, Santa Fe sponsor, CA -> pellets -> pallets/benches/ashtrays, tobacco+paper composted, industrial-only end use (operator's own nicotine acknowledgment), third-party processors; ALL process numbers parameter_not_located; sanitize step trade-secret; UV claim DOWNGRADED to unverified; brand names stubblebri/Rigago/Simply Drop unconfirmed-suspect; 2021 labeling settlement + Bloomberg 2022 as credibility context; retrieval leads logged (paywalled Bloomberg/PharmJ, Wayback brigade FAQ)
- 2026-11-25 (session 4): **M-07 pyrolysis done** — Yousef 2023 JAAP abstract successfully read from ScienceDirect (registry's abstract-only flag resolved): 650/700/750 degC, 200 g reactor, oil 38-39.5 / char 25.7-27.7 / gas 33-36.4 wt%, triacetin 43% @750, gas CO2 11.6%/CO 8%/H2 4.6%/CH4 2%, char Ca up to 32 wt%; found mass-balance inconsistency (ranges sum 96.7-103.6) kept as gap row; companion carbon line from shelf reviews (900 degC/597 m2/g; KOH 2726 m2/g; H2 9.4 wt%); full paper still closed access
- 2026-11-25 (session 4): **M-08 rmit-brick done** — Kurmus thesis read from shelf: Gen-1 (2.5-10%, 25.65->3 MPa, 30.8/58.4% calculated savings) vs Gen-2 (0.5-2%: 1% optimum, 48.6->30.8 MPa, conductivity 0.463->0.393 W/mK = 15.1%, measured furnace savings 8.0/13.3% python3-verified, calculated 10.2/14.71% both kept, AUD 661.96 M/yr costing reproduced); leaching + PAH gates PASSED (only route with published gates); micro-bio Ch.7 + UVC odor Ch.8 logged; shelf mismatch kurmus-2020-toxicity-valorisation = Shah 2023 re-confirmed
- All four files pushed in one commit this session

## Next up (in order)
1. Phase 3b — 19 summary cards to methods/_cards.md
2. Phase 4 — invention -> inventions/
3. Phase 5 — ranking.md (six factors) + test-first list
4. Phase 6 — migration to recycling-empire/materials/cigarette-butts/ + unified site + operator deploy
5. Open retrieval leads (any session): Bloomberg 2022 + PharmJ 2021 full texts; Wayback TerraCycle brigade FAQ; full JAAP 106167; Chemosphere 2026 review PMID 42901015 cross-check

## Key session-3 findings (do not lose)
- Shelf mismatch: `sources/kurmus-2020-toxicity-valorisation/` actually contains Shah et al. 2023 Heliyon review; the real Kurmus 2020 WM paper text lives inside `kurmus-thesis-fired-clay-bricks` (Ch.2) — CONFIRMED session 4, reflected in M-08
- Shelf mismatch: `sources/keenat-2025-cdp-notice/` is a DIY pocket-ashtray craft sheet, NOT a process notice
- Keenat company pivot (keenat-2026-guide, self-report): material recycling CEASED, pivoted to CSS/cement-kiln co-processing; patent numbers claimed FR3110470 + EP3912739
- M-06 caution: UV disinfection claim and stubblebri/Rigago/Simply Drop names are UNVERIFIED — do not propagate
- M-07 caution: JAAP abstract yield ranges do not jointly close (96.7-103.6 wt%) — treat per-temperature triplets as not recoverable without full text

## Rules I must obey (durable)
- Labels on every non-trivial statement: source_supported | ai_inference | ai_proposal | parameter_not_located
- Every gap-fill = labeled estimate + concrete numbers + reasoning + falsifier; vagueness is a defect
- No invented measurements; compute arithmetic with python3; unknown is not zero; conflicting values both kept
- Company self-report is not measurement; never claim clean/safe/validated
- Metals stop-condition: Cd/Pb/As/Hg uncharacterised in the product -> route on hold for product-facing work (M-08 fired bricks is the only route with published metals data)
- Desk research authorizes no physical trial; no DIY pressure vessels
- Update STATE.md before stopping or before any long step; the 2-minute resume test must pass

## Where things live (this repo, transitional)
sources/ | registry/methods.yaml | reports/final/ | inventions/ | methods/ (M-01..M-08 all present) | GLOSSARY.md | charter.md
System + template: https://github.com/abdo2048/recycling-empire (PLAYBOOK.md)
Historical provenance — do NOT read to resume: archive/, docs/, state/, tools/, mcp/, .superpowers/, operator/, reports/ (except final/), .github/workflows
