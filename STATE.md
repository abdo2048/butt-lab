# STATE — cigarette-butts (case 1; lives in butt-lab until migration to recycling-empire)
Updated: 2026-11-25 (session 5) | Phase: 4 | Version: v0.5-pre-migration

## In flight right now
Nothing mid-flight. Phase 3 + 3b complete; M-06/M-07 upgraded to v0.2 on new evidence. Next session starts Phase 4 — invention -> inventions/.

## Done
- Phase 1 (2026-11-22): 50 sources shelved; Phase 2 (2026-11-23): registry 27 methods
- 2026-11-24: operator decisions locked; recycling-empire deployed (17 files); old reader live
- 2026-11-24 (session 2): M-01 + M-02 done (commit 198402f2); sources/defenzo-2020-materials/SOURCE.md added
- 2026-11-24 (session 3): M-03 done (commit c640ac19); M-04 + M-05 written
- 2026-11-25 (session 4): M-04 + M-05 verified complete; **M-06 done** (sub-agent web research); **M-07 done** (JAAP abstract-verified); **M-08 done** (Kurmus thesis read); **Phase 3b done** — 22 cards to methods/_cards.md (commit 954e29f); STATE/LOG updated (commits 13654ff3, c8b254a3, 60962e69, a4d98a8)
- 2026-11-25 (session 5): **5 operator-supplied sources ingested** — via butt-materials repo (now public): Bloomberg 2017 profile, Bloomberg 2022 investigation, PharmJ 2021 blister-scheme news + Scott letter, Yousef 2023 JAAP FULL TEXT (PDF + GLM conversion + 10 figures). New shelf folders: `sources/terracycle-bloomberg-2017-profile/`, `sources/terracycle-bloomberg-2022-investigation/`, `sources/pharmj-2021-blister-scaled-back/`, `sources/pharmj-2021-scott-letter/`, `sources/yousef-2023-jaap/` — each with SOURCE.md + text.md, and the FULL original (document.pdf / document.html; JAAP also has figures/ with 10 images). INDEX 50→55 rows; sources/README provenance updated. Delivered as the butt-lab-staging package pushed by the operator's own machine (sandbox has no GitHub auth this session).
- 2026-11-25 (session 5): **M-06 → v0.2** — Bloomberg 2022 READ IN FULL; credibility rows verified (third-party-only reprocessing, no independent recycling audit until 2021, Bureau Veritas thereafter, Jan Dell suit settled with language changes, tracker evidence: Gerber/apricot trackers → Bloomington warehouses → transfer station/landfill Pontiac IL; 20+ bales misrouted Bulgaria; Bloomington suit vs Bell International/Akshar; $71M revenue 2021; ~20% collections in storage months-years; downcycling to playground/outdoor furniture — Szaky's own words). Bloomberg 2017 read (financial arc; subcontractor pellets→lumber). PharmJ pieces = UK BLISTER-PACK scheme (Sanofi→Superdrug, overload-rescope May 2021) — NOT the cigarette brigade; closes the "which scheme was discontinued" question. Retrieval lead CLOSED; Wayback FAQ remains the only open cigarette-process lead.
- 2026-11-25 (session 5): **M-07 → v0.2** — JAAP full text read: protocol RESOLVED (650/700/750 degC, 25 degC/min, N2 60 ml/min, 5-10 min hold, 3 repetitions; 200 g fixed bed; 4 scrubbers + isopropanol/salt-water traps); **mass-balance gap row WITHDRAWN** (Table 1 exact triplets sum ~100: 39.52/27.45/33.03, 38.33/26.61/35.05, 37.92/25.68/36.40); triacetin = GC-MS area % 31.23/33.26/42.99; oil contains nicotine-derived alkaloids 7.95-11.17% area + phenols → fuel-additive claim needs purification (row 2 partially resolved); char EDX full (Ca 2.15→31.85 wt%, K, Fe, S, Cl, Si, Mg, P) + CaCO3 by FTIR; **feedstock supplied by Keenat Company (paper ack + ref 64) — cross-link M-04/M-05**; gas CV + char trace metals + economics remain open (TEA "under research" by authors).

## Next up (in order)
1. **Phase 4 — invention** -> inventions/ (team's own method, built on strongest verified components: M-01 wash numbers, M-03 effluent loop, M-02 solvent line, M-07 char/oil co-products)
2. Phase 5 — ranking.md (six standard factors) + test-first list; registry/methods.yaml corrections pass (cards ledger queue)
3. Phase 6 — migrate finished material to recycling-empire/materials/cigarette-butts/; build unified site; retire old reader
4. ~~Binary upload backlog~~ RESOLVED — the staging package carries the originals + JAAP figures; they land with the operator's push (run_push.sh).

## Key session-5 findings (do not lose)
- JAAP feedstock = Keenat-supplied butts (62 wt% filter / 20 wt% paper / 18 wt% tobacco; tobacco N 2.6 wt%) — M-04 company pivoting away from material recycling WHILE supplying pyrolysis research: consistent with its SRF/cement-kiln pivot.
- TerraCycle: NOTHING cigarette-specific found in Bloomberg 2017/2022 — the "magic show" quote (paper→recycling, tobacco→compost, plastic→pellets/flakes) is the only process description; still zero temperatures/tonnages; sanitize step remains trade-secret.
- PharmJ 2021 pair = blister-pack program documentation (polymer-type separation → pellets; 197 Superdrug pharmacies; petition 21,837) — corroboration pattern, not cigarette evidence.
- Abstract-vs-full-text lesson recorded: v0.1 M-07 flagged a mass-balance "inconsistency" that the full paper's Table 1 dissolves — abstract-level numbers must always carry the caveat.

## Where things live (this repo, transitional)
sources/ | registry/methods.yaml | reports/final/ | inventions/ | methods/ (M-01..M-08 + _cards.md) | GLOSSARY.md | charter.md
System + template: https://github.com/abdo2048/recycling-empire (PLAYBOOK.md)
Historical provenance — do NOT read to resume: archive/, docs/, state/, tools/, mcp/, .superpowers/, operator/, reports/ (except final/), .github/workflows
