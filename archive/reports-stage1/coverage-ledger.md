# Stage 1 / H02 — Actual coverage ledger (batch-01)

Date: 2026-11-03. Actor: single AUTO Harvester. Baseline commit: `fda66af351a37d38287792ed3b578a258eedf7fc`. Purpose: state what was actually searched, read and failed — not what a landscape "should" contain. Completion here is scoped, not worldwide exhaustion.

Evidence-depth terminology used (inherited from the 2026-11-02 audit; do not collapse these):
1. `source-not-retrieved` — no source content obtained.
2. `source-partially-read` — only specified sections obtained/read.
3. `parameter-not-yet-located` — not found in the material examined; absence from the full source is not established.
4. `not-disclosed-in-source` — used only after the relevant full document was checked; states which sections were examined.

---

## 1. Retrieval budget actually used

| Item | Value |
|---|---|
| Session ceiling (AGENTS.md default) | 24 retrieval/search calls |
| Calls used | 20 |
| Remaining | 4 (reserved; not spent to avoid low-value searches) |
| Search backend | Arena `web_search` tool (aggregated web index; underlying engine not disclosed) |
| Page backend | Arena `fetch_page` (HTML → markdown; PDF text extraction) |
| Patent backend | Google Patents HTML pages (abstract/description/claims where rendered); **no** patent-office API or register |
| Prior-session backends reused | CRAWL4AI MCP queries recorded in `reports/harvest-log.md` (historical; not re-run) |
| Languages queried this session | English (primary), French, Portuguese |
| Languages inherited from prior sessions | Chinese, Spanish, Korean (per `reports/harvest-log.md`) |
| Languages **not** queried this session | Chinese, Korean, Japanese, Spanish, German, Portuguese patent registers |
| Company contacts made | 0 |
| Credentials/gated content accessed | 0 |

A retrieval call is counted once per `web_search` or `fetch_page` **invocation**, including a failed fetch and a subsequent chunk fetch of the same page. The 20-row table in §2 is the invocation log. Provenance limit: the raw tool-call log was not exported to the repository or supplied to the external reviewer, so this count is the worker's own record, corroborated by the table but not independently certified (v1.0's table merged two Code Effort chunk fetches and carried a placeholder row; corrected here, errata E-12).

---

## 2. Queries and fetches executed this session (invocation log)

| # | Type | Target | Result |
|---:|---|---|---|
| 1 | fetch | `https://codeefforts.com/` (chunk 0 of 2) | Homepage: product catalogue, scale claims, partner logos; no process page |
| 2 | fetch | `https://www.terracycle.com/en-CA/brigades/cigarette-waste-en-ca` (chunk 0 of 3) | Programme page: accepted waste, drop-off model, official PDF links |
| 3 | fetch | `https://codeefforts.com/` (chunk 1 of 2) | Remaining homepage content: partner logos, footer, product list; no process detail |
| 4 | fetch | TerraCycle PDF `How-cigarette-butts-recycled_v3-ca.pdf` | Full 3-step process read (collection → compost + powder → plastic lumber) |
| 5 | search | "Code Effort cigarette butt recycling process Naman Gupta how it works paper pulp" | 5 results; process details from The Better India, TOI, The Weekend Leader, Unstop |
| 6 | fetch | `https://tchaomegot.com/depollution/` (chunk 0 of 2) | Company claims: SC-CO2, 99.7/0.3, closed loop, 6 patents, INERIS |
| 7 | fetch | `https://keenat.com/recyclage-valorisation-megots/` (chunk 0 of 5) | Company process: dry depollution, thermo-compression, CSS pivot |
| 8 | fetch | `https://poiatoirecicla.com.br/` | **FAILED** (page fetch error) |
| 9 | search | "Poiato Recicla cigarette butt recycling process cellulose pulp Brazil Universidade de Brasilia" | 5 results: Atlas of Science author summary, Waste Management DOI, case study, review excerpts |
| 10 | search | "RE-CIG Italy cigarette butt recycling patent University of Trento plastic granules plant" | 5 results incl. re-cig.it technology and university mass-balance pages |
| 11 | search | "Mego! France startup mégots cellulose acétate procédé FR3066128 collecte" | 5 results: Capbiotek/Ouest-France mass split, capacity and site history |
| 12 | fetch | `https://patents.google.com/patent/WO2026074041A2/en` (chunk 0 of 13) | Abstract + classifications only; description/claims **not read** |
| 13 | search | "cigarette butt recycling review 2025 technologies companies cellulose acetate circular economy" | 5 results: 2025 biorefinery review, yarn review, microplastics review, carbon-materials review |
| 14 | search | "BuffIndia cigarette butt recycling India process; cigarette butt recycling startup Europe 2025 collection" | 5 results: YourStory, Climate Action Live (process + scale), MANAMO/Re-Cig |
| 15 | fetch | `https://patents.google.com/patent/FR3110470A1/en` (chunk 0 of 8) | Bibliographic + French abstract + classifications |
| 16 | search | "Universidade de Brasilia cigarette butts patent INPI 2003 number PI030 process cellulose pulp Teixeira" | 5 results incl. **UnB CDT page with PI 0305004-1, filing 2003-10-06, grant 2014-11-11**; Teixeira DOI; review text |
| 17 | fetch | `https://patents.google.com/patent/FR3110470A1/en` (chunk 2 of 8) | **Keenat claimed process read**: separate → dry/depollute 80–100 °C → grind → extruder compound 10–30 % filters |
| 18 | fetch | `https://www.re-cig.it/en/tecnologia/` | Full 4-step company process read incl. external wastewater purification |
| 19 | search | "Code Effort patent cigarette butt recycling patent filed India Naman Gupta intellectual property" | 3 results, **no patent located**; company certification claim |
| 20 | search | "Fimognari Bonetti Re-Cig patent WO2019 cigarette butt thermoplastic University Trento patent number" | 3 results, **no Re-Cig patent number located**; surfaced unrelated BE1027956B1 |

No query was repeated merely to inflate effort. Two planned searches were combined into #14 in the planning note; the invocation log above counts what was actually executed (20).

---

## 3. Source-depth ledger by entity

| Entity | Location/identity | Process description | Parameters | Wastewater/emissions | Assays/tests | Depth class |
|---|---|---|---|---|---|---|
| Code Effort | Read | Read (news-reported, 3 independent outlets) | Partial (times, batch size, no chemistry) | Company statement only | Company certificate claim only | `source-partially-read` |
| TerraCycle | Read | Read (official PDF) | None | None | None | `source-partially-read` |
| BuffIndia | Read | One interview, one paragraph | None | None | "medical-grade testing" claim | `source-partially-read` |
| TchaoMegot | Read | Read (company) + prior partial patent | Company claim + prior patent envelope | Concentrate disposal stated, no route details | INERIS referenced, report not obtained | `source-partially-read` |
| Keenat | Read | Read (patent chunk 2 + company page) | 80–100 °C, 10–30 % composite | No liquid; off-gas not described | None | `source-partially-read` |
| MéGo! | Read | Read (patent abstract + company) | Company mass split; no wash T/t | Closed-loop claim; sludge disposal unspecified | None | `source-partially-read` |
| Re-Cig | Read | Read (company 4 steps) | None | External certified purification partner | End-of-Waste declaration claimed | `source-partially-read` |
| UnB/Poiato | Read | Read (author summary + secondary) | Partial (NaOH, HCl; no values) | Dark liquor composition reported; treatment failure (secondary) | Paper DOI located, full text not read | `source-partially-read` |
| CNR/AzzeroCO2 | Read | Read (offering page) | None | Pollutant water to treatment | TRL 5 self-assessment | `source-partially-read` |
| Cerdia | Read | Abstract only | None | Cleaning-agent recovery by distillation (optional) | None | `source-not-retrieved` (description) |
| Miniwiz | Read (prior session) | Read (claims) | None | None | None | `source-partially-read` |
| Matteri | Read (prior session) | Read (claims) | 5 % NaOCl claim | Nicotine wash liquid reuse claim | None | `source-partially-read` |

---

## 4. Registry coverage snapshot (read-only; no registry edits)

`registry/methods.yaml` holds **30 records**. Distribution by recorded status (as of baseline, unchanged by this pass):

| Status | Count | IDs |
|---|---:|---|
| `pending_deep_dive` | 24 | tchaomegot-sc-co2, keenat-dry-thermal, unb-alkaline-pulping, cnr-mask-filters, cerdia-ca-recovery, burich-us7560059, us20140287144-abandoned, us5504119-expired, cn111822484, cn111118670-carbon-fiber, cn107946082-graphene, cn108807014-supercapacitor, kr20160005298, kalabak-ethanol-fuel, terracycle-trade-secret, academic-green-ethanol-wash, academic-acetic-acid-route, academic-ca-membranes, kr-microbial-composting, rmit-brick-making, cigarette-butt-asphalt, 3d-printing-filament, pyrolysis-energy-recovery, concrete-additive |
| `primary-source-read` | 4 | huang-us10980272, cn106928486, matteri-ep2520184a1, mego-fr3066128a1 |
| `experimentally-supported-in-source` | 2 | de-fenzo-2020-materials, cnr-knowledge-share-ca-recovery |

Reading-depth note: `experimentally-supported-in-source` means the **source** reports experiments; it is not independent replication. The CNR offering is a technology-offering page, not a peer-reviewed experiment.

New information created this session that the registry does **not** yet reflect (registry is read-only under current permissions; proposals only):
- Keenat disclosed process conditions (80–100 °C; 10–30 % composite) — refines `keenat-dry-thermal`, whose recorded gaps say "stage count, dwell times, off-gas handling, energy use".
- UnB patent number **PI 0305004-1** and filing/grant dates — replaces "number TBD" in `unb-alkaline-pulping`.
- Re-Cig is **absent** from the registry entirely (new operator, no patent number located).
- BuffIndia is **absent** from the registry entirely (new operator, no patent located).
- Code Effort is **absent** from the registry entirely (charter lead; no patent located).
- MéGo! mass split and capacity figures — refines `mego-fr3066128a1`.
- Cerdia abstract-level process — refines `cerdia-ca-recovery`.

Proposed (not applied) registry additions/versions are listed in `reports/stage2/assumption-and-gap-ledger.md` §7. Under AGENTS.md, registries are read-only; this pass adds proposal text only.

---

## 5. Patent status ledger (all statuses retained; no exclusions applied)

| Patent / family | Recorded status | Basis | Verification depth |
|---|---|---|---|
| FR3102180A1, WO2021079050A1, US12065781B2, US20260115774A1 | Active family, ~2039–2040 expiry | Prior session Google Patents | Database assumption; register not queried |
| FR3110470A1 / EP21174612.8 / ES21174612T | Active (Google) | This session, page 0 | Database assumption |
| FR3066128A1 / B1 | Granted 2019-07-19, active | Prior session | Database assumption |
| PI 0305004-1 (BR) | Granted 2014-11-11; likely expired 2023-10-06 by term | UnB page (dates) + arithmetic | Dates verified at source; expiry is `[CALCULATION]`, not a legal opinion |
| EP2520184A1 | Application deemed withdrawn 2013-05-08 | Prior session Google legal events | Database assumption |
| CN106928486A / B | Granted 2020-08-21 (per Google) | Prior session | Database assumption |
| US10980272B2 | Active, expiry 2039-06-04 | Prior session | Database assumption |
| US20140287144A1 | Abandoned | Prior audit note | Not re-verified |
| US5504119A | Expired (1994 filing) | Prior audit note | Not re-verified |
| US7560059B2 | Granted 2009 | Prior note | Text not read |
| WO2020231362A1 | EP pending | Prior note | Not re-verified |
| WO2026074041A2 | Pending application (priority 2024-10, published 2026-04) | Prior note | Abstract only |
| Re-Cig EP patent | Filed 2019-02, extended Europe | Company statement | Number not located |
| CNR offering | TRL 5 self-assessed | Platform page | No patent number on page |

No patent was excluded because of its status. Abandoned/expired documents are retained as public-domain design leads.

---

## 6. Duplicates and identity questions

| Items | Relationship | Decision |
|---|---|---|
| `de-fenzo-2020-materials` ↔ `academic-green-ethanol-wash` | Same publication (Materials 13:4710; PMC7659942) | Retained as separate IDs per prior audit; one spec (`specs/de-fenzo-2020-source-reconstruction.md`) serves both. Not independent replication. |
| `cnr-knowledge-share-ca-recovery` ↔ `cnr-mask-filters` | Both CNR-linked; acetone CA recovery vs mask-filter patent family; **identity unproven** | Kept separate; no merge. Flagged for a future identity check. |
| Re-Cig ↔ "Re-CA" | Company and its product trade name | Same entity; one dossier record |
| Code Effort ↔ "CODE" / "BUTTR" | Company, earlier name, product brand | Same entity |
| TerraCycle smoking-material recycling page (US) vs UNSMOKE (CA) | Regional programmes, similar outline | Treated as one company workflow; not assumed identical processing |
| `tchaomegot-sc-co2` patents | FR3102180A1 / WO2021079050A1 / US12065781B2 / US20260115774A1 described as a family | Prior sessions; family relationship not independently charted |
| `rmit-brick-making` ↔ `cigarette-butt-asphalt` ↔ `concrete-additive` | Distinct construction-material studies, possibly overlapping authors | Kept separate; all deferred |

---

## 7. Access failures and unresolved retrieval

| Target | Failure | Consequence |
|---|---|---|
| `poiatoirecicla.com.br` | Fetch error | Poiato workflow reconstructed from UnB author summary, news and secondary reviews only |
| WO2026074041A2 full text | Only chunk 0 of 13 read (abstract + CPCs) | Cerdia treated as abstract-level; no claim chart |
| WO2021079050A1 / FR3102180A1 full text | Not re-fetched this session; prior partial read only | TchaoMegot pressure/temperature conflict unresolved |
| Keenat FR3110470A1 | Chunks 0 and 2 of 8 read | Examples/figures not examined; 80–100 °C is the read claim text, not the whole specification |
| Re-Cig patent number | Not located via company/university/news queries | Cannot compare claims; company process only |
| Code Effort patent / application | Not located | Treated as "no patent located in this search" |
| TerraCycle sanitisation chemistry | Not in official PDF | Earlier "shred + sanitize trade secret" claim retained as unresolved |
| CNR patent PDF | Behind registration | Offering page only |
| UnB patent full text (INPI) | Not retrieved | Dates and title from UnB technology page; claims not read |
| De Fenzo supplementary/method numerics | Prior sessions could not locate | Wash volumes, contact times, yields remain gaps |
| CN106928486B official PDF | Fetch failed in prior session | Claim text read via Google Patents HTML only |

---

## 8. Deferred work (explicitly not done; not a claim of worldwide exhaustion)

1. Patent-office registers: INPI (FR), EPO/Espacenet, USPTO Patent Center, INPI-BR, CNIPA, KIPO.
2. Non-English searches this session: Chinese, Korean, Japanese, Spanish, German, Portuguese (beyond one query).
3. Full-text reads: WO2026074041A2, WO2021079050A1, WO2020231362A1, CN111822484A, CN111118670A, CN107946082A, CN108807014, KR20160005298A, KR10-1782684, US7560059B2, US5504119A.
4. Process families not reconstructed: pyrolysis/energy recovery, carbon fibre, supercapacitor/graphene, construction materials (bricks, asphalt, concrete), 3D-printing filament (Filaret), microbial composting, CA membranes.
5. Independent LCA / techno-economic literature for any operator.
6. Third-party contaminant assays, leachate tests, emission measurements, End-of-Waste dossiers.
7. Standards/regulation: EU single-use plastics directive, EPR schemes, INERIS/HP classification documents, transport/disposal rules by jurisdiction.
8. Company contact, site visits, gated documents, paid databases.
9. Arabic/Turkish/Italian-language local coverage for operators in those markets.

---

## 9. H02 checkpoint

- Output: this file.
- Completed: actual calls/queries logged; source-depth and patent-status ledgers; duplicates; failures; deferred list; registry-refresh proposals identified.
- Remaining: the deferred list above; register checks before any legal-status statement.
- Next action: H03 batch selection using this ledger.
- Provenance: Arena Agent Mode, 2026-11-03, baseline `fda66af`; 20 retrieval calls; no registry or evidence-note edits.
