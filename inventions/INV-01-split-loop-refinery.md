# INV-01 — Split-loop butt refinery (mass-balance-first pilot route)

```
id: INV-01
name: "Split-loop butt refinery"
family: hybrid (wet-mechanical split + solvent polish + alkaline cook + unified liquor loop + pyrolytic end-of-life)
status: proposed
version: v0.1
builds_on: [M-01-mego-wash, M-02-defenzo-solvent, M-03-unb-alkaline-pulping, M-07-pyrolysis-triacetin,
  M-08-rmit-brick (fired-immobilization precedent, Ch.5), M-06-terracycle-trade-secret (sanitize-step record),
  sources/chemosphere-2026-145131, sources/ineris-2018-megots, sources/teixeira-2016-thesis]
prior_project_hypotheses_inherited: [inventions/candidate-hypotheses-01.md H1/H2, retired-workflow GAC/IDA polish idea]
```
(Keep the block above as the file's metadata; the site builder reads it.)

## 0. Summary card
One invented pilot route built entirely from verified components already on the shelf: the M-01 float/sink water split and three-tank wash, the M-02 polarity-graded polish, the M-03 alkaline cook with its demonstrated closed dark-liquor loop, and the M-07 pyrolysis destructor with the Chemosphere 2026 two-stage frame. The design principle is the field's biggest documented failure turned into the method's core deliverable: Chemosphere 2026 found NO complete toxicant mass balance in 37 screened studies, and INERIS (2018) faulted even the best-in-class route (UnB) for exactly that — "ne réalise pas de bilan de masse des polluants et ne présente aucun résultat d'analyse chimique portant sur le flux de pâte cellulosique". INV-01 therefore directs every input kilogram into five weighed, assayable streams (S1 CA product, S2 pulp, S3 liquor loop, S4 toxin concentrate, S5 pyrolysis outputs), with the metals question routed — not hidden: the wet stages do not remove bound metals, so the concentrate and char streams are where metals are PREDICTED to accumulate, and the ICP-MS gate decides before anything leaves the lab. An invention is not a claim of novelty, patentability, safety or deployability; every assumption below is `ai_proposal`/`ai_inference` with a falsifier, and desk research authorizes no physical trial.

## 1. Mechanism and why it is different from existing registry entries

Mechanism, per toxin class (`ai_inference` from shelf sources; show-your-chain):
- **Nicotine and water-soluble alkaloids** — removed by DISSOLUTION, not destruction: nicotine is freely water-soluble, so the 40-50 degC first wash (M-01 row 1) and the NaOH cook liquor (M-03: 35.4 g/L measured in dark liquor) carry it into S3; the chitosan coagulation step then removes it to ND (Teixeira 2017, coagulation table) and the bleed keeps the loop gradient alive (M-01 row 7 proposal).
- **Tar/PAH/semi-polars** — polarity-graded extraction: water stages miss them (M-01 admits "another type of solvent"), ethanol 99% stages take them (M-02 wash sequence); whatever survives goes to S4 and is THERMALLY DESTROYED in S5 (nicotine decomposes from 247 degC per INERIS 2018; afterburn envelope 850 degC / 2 s adopted from the same source).
- **Metals (Cd/Pb/As/Hg)** — NOT REMOVED by any wet stage (no chelation in the base design). They are ROUTED: the design predicts they concentrate in S4 (clarifloculation + lignin + chitosan sludges) and then in S5 char. This prediction is the route's metals falsifier, and the charter stop-condition still binds all product-facing work until ICP-MS passes.
- **Cellulose acetate** — preserved as polymer in S1 (float; water is a non-solvent for CA), intentionally converted to cellulose pulp ONLY where the sink stream enters the cook (M-03 deacetylation: acetate IR bands gone in 10 min at 80 degC / 1% NaOH).

Why it is different from every registry entry: M-01 has no answer for tar (its own admission), for its recycler sludge, or for metals; M-03 cooks the WHOLE butt and thereby destroys the CA polymer (60.1% mass kept as cellulose — computed) to make low-grade pulp while running the strongest liquor loop; M-02 proves product quality but is grams-scale with batch solvents and no waste story; M-07 converts everything thermally with no mass balance of toxins and a 200 g ceiling; TerraCycle-style routes keep the decontamination step a trade secret and Bloomberg 2022 documents the storage/disposal problem that a closed loop avoids. No existing entry splits the feed BEFORE cooking, reuses one liquor train across BOTH the wash and the cook, or gives the concentrated hazardous tail a designed destructor stage. The prior project hypotheses (candidate-hypotheses-01 H1/H2) proposed staged washing and contaminant-rejecting recovery symbolically; INV-01 is the concrete instantiation with numbers and a falsifier ledger.

## 2. Full process spec (10 kg dried whole-butt pilot cycle; every number labeled)

**Feed basis.** Composition 62/20/18 wt% filter/paper/tobacco is `source_supported` for Keenat-style feed (M-07 measured) and MUST be re-measured on the team's local feed before any yield band is trusted (`ai_inference`: feedstock heterogeneity shifts decomposition windows ~40-50 degC and leachate COD up to 314% per Chemosphere 2026 — publish the feed boundary with every run).

- **Stage A — dry prep** (M-01 steps 3-4): manual triage, mill ~1 kg/min-class (bench equivalent fine at 10 kg/day), three-level sieve. `ai_proposal`: collect the fines (<500 um) sub-stream separately — ash-heavy, predicted metals-rich, direct to S4. Optional variant (prior project proposal, inherited): dry air-classification of fines before wetting, falsified if >25% of any metal stays on the CA tow (ICP-MS).
- **Stage B — float/sink split** (M-01 step 5): water, density separation, >=20-30 min, first tank at 40-50 degC (`ai_proposal`, M-01 row 1), paper sinks, CA floats. Water 8.3 L/kg first pass = 83 L for 10 kg (`ai_inference`, computed from M-01's disclosed 1000 L / 120 kg cycle). Paper-wet sink drained (not dried) straight into Stage D.
- **Stage C — CA polish** (M-01 step 6 + M-02 stages 4-7): two more wash tanks 30 min ambient, then ethanol 99% x2 ambient (`ai_proposal`: M-02 ratio 1:10 w/v), dry 60 degC to <=5% moisture (`ai_proposal`, M-01 row 8). Product S1: CA fine particles (<1500 um target, M-01 step 9). Optional acetone film/plate trial only after the metals gate (M-02 casting, 20 wt% triacetin plasticizer proposal).
- **Stage D — alkaline cook of the SINK** (M-03 rows 1-3): the drained sink (paper + tobacco + CA fines + ash) cooked in NaOH 1% w/v, 10 L/kg, 80 degC, 3 h, electric heating, atmospheric (never the patent's 100-atm envelope). Output: washed pulp (S2, vacuum-filter + 3x10 L/kg water rinses to pH<9, M-03 row 5 proposal) + dark liquor into Stage E. THE UNTESTED VARIANT: Teixeira cooked whole butts, where CA dominated the pulp; the sink stream is paper/tobacco-dominated, so pulp yield/quality is the route's top falsifier (see 9.3).
- **Stage E — unified liquor loop (S3)**: ONE train for wash water AND dark liquor, the invention's central integration. Sequence per cycle: (1) acidify pH 3 with HCl — lignin precipitation, 20.1% COD removal (`source_supported`, Teixeira); (2) chitosan 0.80 g/L at pH 9, jar-test regime — 66.6% COD removal, nicotine ND (`source_supported`, Teixeira); (3) neutralize pH 7 and reuse as cook liquor + first-stage wash water — 7 reuse cycles demonstrated for the cook-liquor role (`source_supported`, Teixeira Table 11), the wash role is new (`ai_proposal`); (4) bleed 20%/cycle at the 50 mg/L recycled-nicotine cap (M-01 row 7 proposal), make-up ~17 L/cycle (computed). Sodium acetate accumulates: 0.47-0.94 kg NaOAc per 10-kg cycle depending on CA-in-sink share, consuming 0.23-0.46 kg NaOH stoichiometrically (computed from M-03 row 7 factors) — tracked, not assumed away (M-03 row 7 falsifier).
- **Stage F — pyrolytic end-of-life (S5)**: S4 = ALL concentrated hazardous solids — clarifloculation sludge (M-01 step 7), lignin precipitate + chitosan sludge (Stage E), Stage A fines, spent ethanol/extract residues, dewatered. `ai_proposal` 3-7 wt% of feed = 0.3-0.7 kg dry per cycle. Processed in a QUALIFIED furnace (no DIY thermal equipment), two stages per the Chemosphere 2026 frame and M-07 numbers: (1) desorption ramp 150-200 degC, N2, ~30 min hold — condensate captured BEFORE nicotine decomposition (247 degC, INERIS) — predicted to carry most recoverable triacetin (desorption band 100-300 degC, `source_supported` Chemosphere; capture-yield UNTESTED — falsifier 9.5); (2) conversion at 650 degC (char-maximizing choice, M-07 row 5; 25 degC/min-class ramp, N2, 5-10 min hold) producing Ca-rich char; off-gas afterburned 850 degC / 2 s (INERIS incineration envelope). Char and condensate are assay streams, not products: char faces the ICP-MS gate before any adsorbent or additive claim; condensate goes to calibrated GC-MS assay then licensed disposal unless the team's lab proves otherwise.

## 3. Expected five-stream mass balance (computed; script `scripts/inv01_massbalance.py`)

| Stream | Expected per 10 kg feed | Label | Anchored to |
| --- | --- | --- | --- |
| S1 CA product (dried) | 4.5-6.0 kg (45-60 wt%) | `ai_inference` (M-01 row 4 band) | M-01 row 4 + De Fenzo TGA residue ~10% |
| S2 pulp (washed dry) | 1.4-3.0 kg (35-55% of the 4.0-5.5 kg sink) | `ai_proposal` (sink variant untested) | M-03 row 4 derivation, re-based |
| S3 liquor loop | 83 L first-cycle water; ~17 L/cycle make-up at 20% bleed; NaOAc 0.47-0.94 kg/cycle; NaOH 0.23-0.46 kg/cycle | `ai_inference`/computed | M-01 rows 2,7; M-03 row 7 |
| S4 toxin concentrate (dry) | 0.3-0.7 kg (3-7 wt%) | `ai_proposal` | size of sludge streams |
| S5 char / condensate / gas (from mid 0.5 kg S4) | 0.10-0.20 / 0.03-0.07 / 0.23-0.38 kg | `ai_proposal` (anchored to M-07 whole-butt yields; sludge split differs) | M-07 Table 1 |
Midpoint closure: 5.25 (S1) + 1.2 (S2) + 0.5 (S5 total) = 6.95 kg of the 10 kg feed; the 3.05 kg remainder is evaporated water + liquor-loop working inventory — a balance statement, not a mass deficit. The deliverable this table exists for: EVERY stream gets weighed every run and assayed (nicotine HPLC, 16-EPA PAH screen, ICP-MS metals, COD) — the complete toxicant balance no route in the field publishes.

## 4. What existing methods fail at, and how this addresses it

- **M-01 alone**: no tar answer (its own text), closed-loop drift unmanaged, recycler sludge undefined, metals untouched. INV-01 adds the ethanol polish, the bleed-with-cap rule, and makes the sludge a NAMED stream (S4).
- **M-03 alone**: cooks the CA polymer into low-grade pulp (60.1% mass retention, computed) and its saturated-liquor disposal is `parameter_not_located` in the sources. INV-01 keeps CA polymer intact by splitting first, and routes the liquor's own concentrates to a destructor instead of an undefined disposal.
- **M-02 alone**: grams-scale, batch solvents, no waste accounting. INV-01 keeps its polish as a stage, not a route, and pays the solvent cost only on the S1 stream.
- **M-07 alone**: whole-butt pyrolysis has no toxicant mass balance, 200 g ceiling, oil not blend-ready. INV-01 uses pyrolysis only where it is strong — destroying a small, concentrated, pre-characterized tail — and imports the two-stage frame so triacetin recovery is attempted BEFORE destruction.
- **Field-level** (Chemosphere 2026 verdicts): no complete toxicant balance anywhere, no pilot, no leaching tests, no butts-only LCA. INV-01 is pilot-shaped (10 kg), mass-balance-first, and generates the exact assay dataset a future LCA would need. It does not claim to BE an LCA, a TEA, or a validated process — it produces the inputs they require.
- **Keenat's operational death** (see benchmark 2) is answered structurally: the two failure causes Keenat named each get a designed response, not an assurance.

## 5. Mandatory benchmark answers

- **Korean paving-stone test (toxin removal mechanism):** answered by the per-class mechanism table in section 1 — dissolution+coagulation for nicotine/alkaloids, polarity-graded solvation for tar/PAHs, thermal destruction for the surviving tail, ROUTING (not removal) for metals. Provenance honesty: the benchmark's name is inherited from `inventions/TEMPLATE.md`; the live registry's Korean entries are C-12 (KR20160005298A, extraction of useful compounds) and C-15 (KR microbial composting) — no Korean paving-stone card exists in the current tree, so the name is treated as retired-workflow legacy and answered by its stated function (name the removal mechanism).
- **Keenat LCA benchmark (energy/inputs/waste accounting):** Keenat's own LCA killed their route on "prohibitive operating costs" and "persistent uncertainty on long-term management of extracted pollutants" (M-04, company self-report). INV-01's answers, labeled as proposals not claims: (a) accounting — the route's dominant inputs are water (83 L first cycle, ~17 L/cycle steady), NaOH 1% cook, ethanol polish on S1 only, and the S5 furnace; the highest-cost unknown is the S5 destructor, which is sized to the SMALL concentrate (0.3-0.7 kg per 10 kg feed, 3-7 wt%) rather than the whole stream — the structural cost answer Keenat never had; (b) long-term fate — every extracted pollutant has a named destination (S4 -> S5 -> char-for-assay or licensed disposal; condensate -> assay -> licensed disposal), replacing "persistent uncertainty" with assayable streams. Energy per kg is `parameter_not_located` until the team logs kWh (M-07 row 7 falsifier method); no cost or cleanliness claim is made.
- **INERIS waste-handling benchmark:** INERIS 2018's critique of the field's best route is the invention's founding document — no pollutant mass balance, no chemical analysis of the pulp. INV-01's core deliverable IS that balance (section 3) plus per-stream assays, with the pulp explicitly in the assay list. INERIS's own envelope for thermal disposal (850 degC / 2 s; nicotine decomposes from 247 degC) is adopted verbatim for S5's off-gas; all liquors stay in the loop or go to licensed disposal, never to drain (INERIS hazardous-waste framing; charter safety rule).

## 6. Component-level DIY substitution map

| Component | Source spec | DIY/bench substitution | Boundary |
| --- | --- | --- | --- |
| Mill + sieve | M-01 1 kg/min line | bench knife mill + lab sieve shaker | enclosed, LEV, FFP3 (dust) |
| Wash/decontamination tanks x3 | M-01 3 tanks in series | 20-50 L HDPE tanks + aquarium-transfer pump | nicotine gloves; no drain |
| Clarifloculation | M-01 recycler <=1000 L/2 h/1 kW | jar-test rig + settling barrel (batch) | sludge = S4, hazardous |
| Ethanol polish | M-02 2x ethanol 99% | bench vessels, fume hood | flammable, no ignition |
| Cook reactor | M-03 50 L LPG-heated | 2-5 L stainless pot + electric hotplate + reflux | NEVER pressure; headspace >=50% |
| Sheet QC | M-03 Jokro + TAPPI | blender 2 min + hand sheet mold | partner lab for tensile |
| Drying oven | M-01 100-120 degC pre-cook | forced-air oven 60 degC (M-02's number) | ventilated |
| Press | M-01 314 t / 350 degC | 10-30 t lab hot press ONLY if S1 passes gates | two-person rule |
| Pyrolysis S5 | M-07 200 g fixed bed | NO DIY equivalent — partner furnace only | qualified facility, CO/HCN monitoring |
| Assays | all methods | partner lab (HPLC, GC-MS, ICP-MS, COD) | not substitutable, not optional |

## 7. Home-validation experiments (what the human can test, pass/fail criteria)

1. **Float/sink efficiency** (100 g batch): weigh sunken paper, count paper residual in floated CA at 30x. PASS: <10% residual paper after pass 1 (M-01 row 3 criterion). Kills Stage B sizing if failed.
2. **Mass-balance diary**: every stream weighed every run, S3 inventory logged. PASS: closure statement reconciles within weighing error. This is the invention's habit-forming core.
3. **Sink-pulp sheet trial** (Stage D on 200 g sink): blender-refine, hand mold. PASS: sheet holds together, tensile same order as Teixeira Table 4 band (traction index 5-12 kNm/kg at partner lab). FALSIFIES 9.3 if it collapses.
4. **Moisture** gravimetric (105 degC to constant mass). PASS: <=5%.
5. **Loop drift, bench version**: 5 reuse cycles of the wash liquor with COD strips + nicotine assays at a partner lab. PASS: plateau below the 50 mg/L cap (M-01 row 7 rule).
NOT home-testable by design: any toxin clearance (no odor/appearance judgment — charter rule), pyrolysis, metals — all partner-lab with named human actor.

## 8. Safety notes

- Dark liquor / spent washes carry nicotine up to 35.4 g/L measured (M-03) — dermally acutely toxic; closed transfer, nitrile gloves, eye protection; NEVER to drain; all to S3 loop or licensed disposal.
- NaOH 1% cook + pH-11 wash chemistry corrosive; HCl 6 N acidification fumes/exotherm — add acid slowly, ventilated.
- Ethanol 99% (flash ~13 degC) and acetone (flash ~-20 degC, film variant): fume hood, grounded, no ignition sources.
- Dry organic dust (<1500 um CA particles, Stage A fines) is an explosible dust class: enclosed mill, LEV, no fines accumulation.
- Stage F runs at 650 degC on toxic waste: CO measured at 8% of product gas in M-07, HCN class unmeasured; qualified facility, afterburn 850/2s, CO + HCN monitoring mandatory; condenser tars are S4.
- No pressure vessels anywhere (the 100-atm claim envelope is NOT replicated); no DIY thermal equipment.
- Hazardous waste streams, all named: S4 solids, S5 char (pre-gate), S5 condensate, lignin/chitosan/clarifloculation sludges, spent ethanol extracts. Characterize before disposal route selection.
- **Metals stop-condition binds the whole route**: Cd/Pb/As/Hg uncharacterised in S1/S2 products = on hold for product-facing work, regardless of wash/polish results (ICP-MS gate, M-01 row 11 / M-02 row 9 / M-03 row 8 precedent).
- Desk research authorizes no physical trial: qualified facility, risk assessment, lawful waste handling, named human actor before any step runs.

## 9. Falsifier ledger (load-bearing claims, ranked)

1. **Sink-pulp quality** — Teixeira's pulp was CA-derived; the sink stream is paper/tobacco-dominated. FALSIFIED if Stage D pulp fails the Table-4-band sheet test after ratio adjustment (10 -> 32 L/kg). Fallback: drop Stage D, route sink to S4/S5 — the route survives as M-01+M-02 with a destructor tail.
2. **Unified-loop compatibility** — cook liquor and wash water have different COD/nicotine loads; sharing one train is new. FALSIFIED if the 5-cycle drift test shows monotonic rise past the 50 mg/L cap at 20% bleed, or sodium/conductivity runaway (M-03 row 7) — then split trains or raise the bleed.
3. **Split purity** — FALSIFIED if float CA carries >10% paper after one pass or visible fines after two (M-01 row 3 test).
4. **Metals partition prediction** — the design CLAIMS metals concentrate in S4/S5. FALSIFIED if ICP-MS shows metals above gate in S1 or S2 — which also trips the charter stop-condition; the route then produces characterization data, not products.
5. **Two-stage condensate value** — FALSIFIED if calibrated GC-MS finds triacetin mostly NOT in the 150-200 degC condensate; recovery is then abandoned and Stage F remains destruction-only (the route does not depend on the recovery).
6. **S4 mass band** — FALSIFIED if concentrates exceed 10 wt% of feed (3-7% proposed): the destructor sizing and the whole cost argument weaken; re-size before any scale claim.

## 10. Red-team verdicts (appended by red-team agents — inventors do not fill this)

- Feasibility: —/10 | Safety: —/10 | Cleanliness: —/10 | Honesty: —/10
- Claim-by-claim verdicts: (pending — Phase 7 review rounds)

## Status: proposed
