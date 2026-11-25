# M-06 — TerraCycle cigarette waste route (trade-secret process; company disclosure + third-party press) — Action plan

```
id: M-06
name: "TerraCycle cigarette waste route (trade-secret process)"
family: mechanical-compounding
priority: true
status: draft
version: v0.1
sources: [registry/terracycle-trade-secret, m06-web-research-2026-11-25]
```
(Keep the block above as the file's metadata; the site builder reads it.)

## 0. Summary card
TerraCycle (Trenton, NJ, founded by Tom Szaky) ran the first worldwide cigarette-butt collection and recycling program from 2012, first sponsored by Santa Fe Natural Tobacco, later rolled out to Australia (2014), Canada and France (Zero Waste Boxes). The disclosed outline: collected butts are shredded; tobacco and paper are composted; the cellulose-acetate filters are dried, powdered/refined into pellets, and compounded by contracted third-party processors into industrial plastics — shipping pallets, plastic lumber, benches, ashtrays. The company explicitly restricted outputs to industrial products, not household plastics, because of nicotine exposure. Priority on the registry because it is the only route documented at city/multi-country logistics scale. But: the actual sanitize/decontamination chemistry is trade-secret and mineable from no patent; every process number (temperatures, tonnages, % recycled content) is `parameter_not_located` in the public record; and the operator's credibility is dented by a 2021 labeling settlement and a 2022 Bloomberg investigation into its contracted-processor model. [S1][S2]

## 1. What the sources disclose — step by step
[S1] = registry entry `terracycle-trade-secret` (company disclosure: shred + sanitize; tobacco/paper → compost; filters → dried, powdered into plastic products). [S2] = web research 2026-11-25 (Wikipedia citing Plastics News 2012, Times of Trenton 2012, Brisbane Times 2014, Bloomberg 2022; Google News RSS headlines; Europe PMC/Crossref literature sweep). Search-engine and archive access was partially degraded in the session — flagged per row.

1. **Collection** — volunteer/company/municipal brigades since 2012; later paid Zero Waste Boxes (launched 2014, explicitly include cigarette butts) sold to businesses/municipalities. Country rollouts: US (2012, Santa Fe Natural Tobacco first sponsor, CSP Daily News 15.11.2012), Australia (Brisbane Times, 03.2014), Canada (Progressive Waste Solutions took 19.99% stake in TerraCycle Canada, 01.2014), France (2015+). `parameter_not_located`: number of collection points, tonnage per year. [S2]
2. **Shredding** — disclosed as "shred" (registry [S1]); Wikipedia: filters "refined into pellets". No equipment, mesh, or throughput numbers anywhere. [S1][S2]
3. **Sanitization/decontamination** — the registry's key gap: sanitize step is trade-secret, not mineable via patents. `parameter_not_located`: chemistry, temperature, dwell, whether UV disinfection is used (UV was searched; NOT FOUND in any accessible source — the claim circulating in earlier notes is unverified). [S1][S2]
4. **Stream split** — tobacco + paper → compost (Wikipedia, sourced to Plastics News 2012 and Brisbane Times 2014); filter fraction → plastic route. No split percentages located. [S2]
5. **Compounding** — contracted third parties (Wikipedia citing Bloomberg 2022 investigation — text paywalled, content unverified beyond paraphrase); pellets into pallets, benches, ashtrays, plastic lumber. `parameter_not_located`: extrusion/injection temperatures, recycled-content %, product specs. [S2]
6. **End-use restriction** — "recycled plastic from cigarette filters will only be used in industrial products and not in household plastics, due to exposure to nicotine" (Times of Trenton 2012 via Wikipedia). This is the operator's own acknowledgment that the output retains nicotine hazard. [S2]
7. **Program status** — no source located stating the cigarette brigade ended; cigarette-package recycling launched 2023 and vape recycling 2024 (headlines only). A 2021 Pharmaceutical Journal piece ("TerraCycle should be supported and its recycling scheme reinstated", DOI 10.1211/pj.2021.1.99493) suggests some scheme was discontinued by 2021 — which one, and why, unverified (article 403-blocked). [S2]
8. **Brand names "stubblebri", "Rigago", "Simply Drop"** — searched, zero corroborating results found; treat as unconfirmed/suspect; do not use in any ranking claim. [S2]

`parameter_not_located` across all sources: sanitization chemistry; all temperatures; tonnage; batch sizes; % recycled content; product mechanical specs; economics; processor identities; program end date/cause.

## 2. Equipment
- Collection: public ashtrays, brigade boxes, paid Zero Waste Boxes; logistics via postal/courier shipment to TerraCycle facilities [S2]
- Processing (functional, per disclosure only): shredder; sanitize step (UNKNOWN — trade secret); dryer; powder/pelletizing step; contracted third-party compounders for pallets/lumber/ashtrays [S1][S2]
- Scale note: the only route in the registry with national logistics scale — but the process core is a black box; replication is impossible from public data. Desk research authorizes no physical trial.

## 3. Gap-fill table — labeled expert estimates

| # | Gap | Estimate (labeled) | Reasoning | Falsifier — how the team tests it |
| --- | --- | --- | --- | --- |
| 1 | Sanitization chemistry | `parameter_not_located` (trade secret); `ai_inference` on what it must at minimum achieve: reduce pathogen load and odor of stored used butts before compounding | No patent, no disclosure; but the route's output carries nicotine (operator's own end-use restriction), so sanitization cannot have been a detoxification — it plausibly targets hygiene/odor only. | FOI/press inquiry to TerraCycle; or independent assay of any product made under the program (nicotine, PAHs, metals) — the product itself would reveal what the sanitize step did NOT remove. |
| 2 | Nicotine fate in pellets | `ai_inference`: nicotine substantially retained (operator restricted outputs to industrial uses "due to exposure to nicotine") | If the process removed nicotine, the restriction would be unnecessary; the restriction is the operator's own negative datapoint. | HPLC nicotine assay of a pellet/lumber sample from program output. |
| 3 | Compounding temperature | `parameter_not_located`; `ai_proposal` for any team replication: PA carrier extrusion 170-220 degC | No numbers exist; if the carrier was PP/PE lumber stock, conventional compounding bands apply; CA softens ~180-230 degC. | Bench extrusion trial with cleaned filter powder in PP; measure odor/off-gas. |
| 4 | Stream split (compost vs filters) | `parameter_not_located`; whole-butt composition `ai_inference` ~55-65 wt% filter + paper, ~30-40% tobacco+ash region — but no TerraCycle-specific number exists | Registry has no split; company composition claims elsewhere in the registry (different operators) vary widely — importing them here would violate the no-cross-contamination rule, so this stays an open row. | Weigh-stream audit at any collection node: filter vs tobacco/paper mass. |
| 5 | Tonnage / throughput | `parameter_not_located`; company said "tonnes of butts" class statements without numbers (pattern matches Keenat's self-report style — flagged) | No accessible source gives a number; Wayback of the Cigarette Waste Brigade FAQ page is the best retrieval lead (was unreachable this session). | Wayback retrieval of terracycle.com brigade pages; press archive access. |
| 6 | UV disinfection claim | `parameter_not_located` — searched and NOT FOUND; earlier internal notes mentioning UV are downgraded to unverified | Nothing in the public record mentions UV for this program. | Any primary TerraCycle process document; treat UV mentions as unsourced until then. |
| 7 | Environmental claim | `ai_inference`: unproven and actively contested context — 2021 labeling settlement (misleading recycling claims, Fast Company via Wikipedia) + Bloomberg 2022 outsourcing investigation (unverified content, paywalled); no peer-reviewed LCA of this route located (Europe PMC sweep, incl. Ambio 2016 DOI 10.1007/s13280-016-0851-0 which mentions TerraCycle) | Third-party scrutiny exists specifically on TerraCycle's recycling claims; none of it validates the cigarette route. | Read Bloomberg 2022 + Pharmaceutical Journal 2021 in full (paywall retrieval task); commission/search LCA. |
| 8 | Current status | `parameter_not_located`: no located source states the butt brigade ended or continues in 2026; 2023-2024 package/vape programs are separate offerings | Continuity signals are indirect. | Contact operator; check current Zero Waste Box catalog for mégot boxes per country. |
| 9 | Replicability for the team | `ai_proposal`: treat M-06 as a LOGISTICS case study, not a process spec — the only replicable elements are collection economics and the compost-vs-polymer stream split; the decontamination core must come from M-01/M-02/M-03-style open chemistry | Trade secret + no numbers = zero process content; spending lab effort replicating it is impossible by design. | None needed — this row is a routing decision, testable only by whether any process document ever surfaces. |
| 10 | Product safety | `parameter_not_located`: no leaching/tox tests located on any TerraCycle cigarette-derived product; **stop-condition binds** — Cd/Pb/As/Hg uncharacterised | Operator restricted to industrial uses; no public analytical data on outputs. | ICP-MS + leach test on any program product; until then, non-contact industrial uses only. |

## 4. Safety notes
- **The route's own output is nicotine-bearing**: the operator restricted end uses because of nicotine exposure — treat all pellets/lumber from this route as chemically contaminated, not clean. [S2]
- **Compost stream is hazardous**: tobacco/paper compost carries nicotine, TSNAs, metals — this is not clean garden compost; lawful disposal/treatment boundary required (registry F1 sink rule applies). [S1][S2]
- **Stored used butts** are a pathogen/odor burden; any handling needs hygiene controls; the sanitize step being unknown means no assumed safety. [S1]
- **No DIY replication**: nothing here is a recipe; the only safe team activity is logistics study and product assay of existing outputs.
- **Stop-condition**: metals uncharacterised (row 10).
- Desk research authorizes no physical trial; qualified facility, risk assessment, lawful waste handling, named human actor.

## 5. What the team must verify (desk-first; lab only via product assay)
1. **Retrieval task**: Bloomberg 2022 investigation and Pharmaceutical Journal 2021 full texts (paywalled this session); Wayback of TerraCycle Cigarette Waste Brigade FAQ — the single highest-value target for the sanitize step (rows 1, 6, 8).
2. **Product assay** (rows 2, 10): obtain any pallet/bench/lumber output; HPLC nicotine + ICP-MS metals + leach test. This is THE experiment — it measures what the trade-secret step failed to remove.
3. **Legal/credibility check** (row 7): details of the 2021 labeling settlement; whether any regulator action concerned cigarette outputs.
4. **Status check** (row 8): does a butt Zero Waste Box still exist for sale in 2026?

## 6. Sources
- [S1] Registry entry `terracycle-trade-secret` (company disclosure; terracycle.com) — shelf has no dedicated source folder yet.
- [S2] Web research 2026-11-25 (session-degraded: search engines partially unreachable, Wayback timeouts): Wikipedia TerraCycle article citing Plastics News (16.11.2012), Times of Trenton (13.12.2012), Brisbane Times (04.03.2014), Bloomberg "The Warehouses of Plastic Behind TerraCycle's Recycling Dream" (Kaufman, 31.10.2022, paywalled-unverified); CSP Daily News (15.11.2012) headline; Waste Dive 2014/2015 headlines; Fast Company (16.11.2021) via Wikipedia; Pharmaceutical Journal 2021 DOI 10.1211/pj.2021.1.99493 (403-blocked); Europe PMC sweep — no peer-reviewed LCA of this route located; Chemosphere 2026 review of CB thermal conversion, PMID 42901015 (cross-check target for M-07).
- Registry: entry `terracycle-trade-secret` — this plan adds the operator's own end-use restriction (nicotine), the credibility context, and downgrades the UV claim to unverified.
