# Stage 2 — Assumption and gap ledger (batch-01)

Date: 2026-11-03. Actor: single AUTO Deep-dive. Baseline: `fda66af351a37d38287792ed3b578a258eedf7fc`. Purpose: make every assumption, unresolved conflict and missing parameter explicit before the Stage-3 panel, so that workers cannot inherit silent precision. Nothing here is an experimental result.

Label discipline: `parameter-not-yet-located` (not found in material examined; absence from full source not established), `not-disclosed-in-source` (only after the relevant sections were checked; sections named), `failed-access` (document could not be obtained), `conflict` (two sources disagree; both kept).

---

## 1. Assumptions used in this batch (all labelled)

| ID | Assumption | Where used | Basis | Sensitivity / what would break it |
|---|---|---|---|---|
| A-01 | Company mass splits are on a single fresh-mass basis with no separate moisture term | MéGo! 80/12/8 split; per-1,000-butt and per-tonne table | Company text sums to 100 % and gives no moisture | If moisture is inside the 80 %, dry CA mass is lower; if the split is dry, collected mass is higher. Per-tonne table changes by the moisture fraction |
| A-02 | A 20-year patent term from filing applies to PI 0305004-1 | Expiry calculation 2023-10-06 | Brazilian general term; no adjustment checked | Annuity lapse, extension, pipeline/transition rules or a different term would change the date. **Not a legal opinion** |
| A-03 | Re-Cig "kg polymer / kg butts collected" is the yield denominator | ~39 % polymer yield | Company case figures; no moisture/reject term | A dry-mass or filter-only denominator would raise the yield materially |
| A-04 | The TchaoMegot patent pressure/temperature envelope is a disclosure envelope, not an operating condition | S2-04 comparison | Patent wording "0–2000 bar, preferably 50–350, more preferably 280–320" | The press-quote 50/60 bar could be the real operating point; both retained |
| A-05 | Keenat "10–30 % filters / 70–90 % thermoplastic" are mass fractions of the composite | Per-tonne dilution calculation | Standard composite convention; text does not say vol/vol | If volumetric, mass split differs by density; the qualitative "minority filler" conclusion is robust |
| A-06 | "Biodegradable chemicals" (Code Effort) means an aqueous chemical treatment of unknown class | Dossier qualification | Company wording only | Could be surfactant, alkali, oxidant or enzyme; each has different hazard and effluent implications. **No inference made** |
| A-07 | Company environmental claims (carbon neutral, closed loop, REACh/INERIS) are claims, not verified results | All units | No third-party report located | A certificate/report would upgrade a claim to evidence |

---

## 2. Calculation register (reproducible arithmetic)

Five calculations are used in this batch: K-01…K-05. K-06 is retained as a withdrawn row to record that no Code Effort split was calculated; it is **not** counted as a calculation (v1.0 described six; see errata E-13).

| ID | Calculation | Inputs | Result | Unit |
|---|---|---|---|---|
| K-01 | MéGo! per-1,000-butt split | 1 kg ≈ 2,000 butts; 80/12/8 % | 0.40 kg CA / 0.06 kg other / 0.04 kg sludge per 1,000 butts | mass |
| K-02 | MéGo! per-tonne split | same | 800 / 120 / 80 kg per tonne | mass |
| K-03 | Re-Cig polymer yield | 6.00/15.50 and 2.39/6.12 | 38.7 % and 39.1 % | % of collected mass |
| K-04 | Keenat composite dilution | 10–30 % filter in composite | 100–300 kg filter per tonne composite; 700–900 kg thermoplastic | mass |
| K-05 | UnB patent term end | filing 2003-10-06 + 20 y | 2023-10-06 | date |
| K-06 | Code Effort fibre/paper/tobacco mass split | — | **withdrawn — not a calculation** (no defensible split in the sources) | — |

All calculations are arithmetic on stated inputs. None is a measurement, and none should be cited as a process yield except K-03, which is explicitly the company's own accounting.

---

## 3. Unresolved conflicts (carried to Stage 3, do not average)

| ID | Conflict | Position 1 | Position 2 | Handling rule |
|---|---|---|---|---|
| C-01 | Keenat treatment temperature | Patent: dry/depollute at 80–100 °C **for step b only**, then extruder compounding (profile not disclosed) | Company/press: "successive heatings ~200 °C destroying nicotine, phenol, pesticides" | Keep both; do not apply the drying temperature to the extrusion stage; test what each step can physically do; never state "80–200 °C" |
| C-02 | TchaoMegot pressure | Patent preferred 280–320 bar (range 50–350; generic 0–2000) | Press quote ~50/60 bar at ~30 °C | Keep both. Note that 50–60 bar is below the CO2 critical pressure (73.85 bar) and ~30 °C is below the critical temperature (31 °C), so that quote describes subcritical/dense CO2, not supercritical CO2 — unless the quote is erroneous or refers to another stream |
| C-03 | TerraCycle sanitisation | Earlier project draft: "shred + sanitize; sanitisation chemistry trade secret" | Official 3-step PDF: collection → compost + powder → lumber; no sanitisation step | Do not assert sanitisation; treat earlier text as unresolved legacy |
| C-04 | MéGo! butts per kg | 2,000/kg (2017) | 4,000/kg (2018) | Per-tonne figures unaffected; per-1,000-butt figures carry a factor-2 range |
| C-05 | Code Effort cumulative count | 300 M (2022 site) | 1.2 B (2022 TOI) / 12 B (2026 site) | Treat counts as unverified company metrics; use only for scale order |
| C-06 | CNR family identity | Acetone CA-recovery offering | CNR mask-filter patent family IT202000003745A1 / WO2021170381A1 / EP3892393A1 | Do not merge; identity unproven |
| C-07 | UnB effluent treatability | Author summary: dark liquor acid-precipitated and returned to pulping (implying recycle) | Secondary review: "could not be successfully treated with standard methods" | Do not resolve without primary paper; both quoted with provenance |
| C-08 | De Fenzo funding | "No Funding" statement | Acknowledgments thank Essequadro for funding the extraction study | Preserve both; do not infer misconduct |

---

## 4. Gap register (prioritised by impact on the panel)

### Tier 1 — gaps that could change a conclusion

| ID | Gap | Unit | Class | Why it matters | Resolution path |
|---|---|---|---|---|---|
| G-01 | No dry-mass balance for any process | All | `not-disclosed-in-source` (sections checked per spec) | Without it, "yield", "99.7 % clean" and "39 % polymer" are not comparable | Define dry feed, water, product, reject, concentrate; measure |
| G-02 | No analyte-specific detoxification data for any operator | All | `failed-access` / `not-disclosed` | The entire "clean" claim rests on it | Third-party panel: nicotine, TSNA, PAHs, Cd/Pb/As/Hg, plus product leachate |
| G-03 | Fate of the concentrate/sludge/effluent | All | `not-disclosed-in-source` | A process without a lawful sink is incomplete | Mass balance + disposal manifests/permits |
| G-04 | Keenat off-gas and time at temperature | S2-02 | `not-disclosed` (chunks 0,2 of 8 read) | Determines whether heating removes anything or just dries | Read examples/claims; request permit data |
| G-05 | TchaoMegot operating pressure and co-solvent | S2-04 | `conflict` + `failed-access` | Decides whether the process is supercritical at all | Read WO2021079050A1/FR3102180A1 full text; register check |
| G-06 | CN106928486 recovery denominator | S2-03 | `not-disclosed-in-source` | 92 % recovery is meaningless without it | Read granted B text/PDF; examples input mass |
| G-07 | UnB effluent treatment and product assays | S2-05 | `failed-access` | Decides whether pulping is viable | Full paper; Poiato licence/monitoring data |

### Tier 2 — important but bounded

| ID | Gap | Unit | Class | Impact | Resolution |
|---|---|---|---|---|---|
| G-08 | MéGo! wash T/t/ratio, recycle purge | S2-01 | `not-disclosed` | Closed-loop claim untestable | B1 text; LCA/End-of-Waste dossier |
| G-09 | Code Effort chemical identity and wastewater | S2-01 | `not-disclosed` (company) | Hazard and effluent unknown | MSDS/certificates or company disclosure |
| G-10 | Re-Cig patent number/text | S2-01 | `failed-access` | Claims cannot be compared | Register/EP search |
| G-11 | BuffIndia "acidic hydrolysis" conditions | S2-01 | `not-disclosed` | Cannot classify route | Company disclosure; no patent located |
| G-12 | Cerdia cleaning agent and claims | S2-03 | `failed-access` (abstract only) | Industrial CA-recovery relevance unclear | Read WO2026074041A2 description |
| G-13 | CNR patent number and TRL evidence | S2-03 | `failed-access` | Offering claim unverifiable | Register/CNR tech-transfer |
| G-14 | TerraCycle processing partner and compost/lumber assays | S2-01 | `not-disclosed` | Encapsulation risk unknown | Company disclosure; permits |
| G-15 | Legal status of PI 0305004-1 | S2-05 | `conflict` (arithmetic vs register) | Public-domain assumption drives reuse | INPI register check |
| G-16 | Energy/cost/LCA for all routes | All | `not-located` | No environmental ranking possible | LCA/TEA literature; only Keenat's own retreat located |

### Tier 3 — scope gaps (declared, not blocking)

| ID | Gap | Class | Note |
|---|---|---|---|
| G-17 | Non-English registers and patents (CN, KR, JP, BR) | `failed-access` | Outside this session's backend/language budget |
| G-18 | Construction/energy product families | `not-located` | Deferred by H03; relevant to a different product definition |
| G-19 | Regulatory limits by jurisdiction (waste, emissions, product contact) | `not-located` | Needed before any product claim; not a research blocker |
| G-20 | Independent replication of any source | `failed-access` | No lab work authorized; Stage 3 is a desk critique, not replication |

---

## 5. Claim-status summary by process family

| Family | Strongest source-supported claim | Weakest link | Status |
|---|---|---|---|
| F0 water/ethanol wash | Sequence and material characterisation reported in peer-reviewed paper | No batch mass balance; film brittle; no contaminant panel | Source-supported as *material* study, not detoxification |
| F1 mechanical + aqueous wash | Sequence disclosed; two operators publish scale/mass data | Chemistry and effluent largely undisclosed; closed-loop claims untested | Deployed, poorly evidenced |
| F2 dry thermal + composite | Patent conditions disclosed; commercial LCA retreat documented | Temperature cannot destroy metals; off-gas undescribed | Plausible drying/compounding, unproven detoxification |
| F3 solvent dissolution | Dissolution/precipitation chemistry disclosed; two industrial actors | Solvent recovery, wastewater, residual solvent, co-precipitation | Chemically coherent, engineering unproven |
| F4 pressurized fluid | Patent mechanism and company concentrate claim | Operating pressure conflict; no assay; hardware burden | Distinctive, unverified |
| F5 pulping to cellulose | Patent + peer-reviewed route; composition of dark liquor reported | Effluent treatability; product contamination; yield | Chemically coherent, waste-limited |

---

## 6. Safety and ethics constraints carried into Stage 3

- Raw butts are dangerous waste under the cited INERIS classification; no worker instruction is to be derived from these files.
- No DIY pressure-vessel, solvent-distillation or caustic-pulping instructions may be produced. Worker C should treat equipment scale-up as a permitting/engineering question, not a shopping list.
- No odour/appearance/FTIR-only clearance. No "food-safe", "non-toxic" or "REACh-compliant" conclusion without an assay and a defined exposure.
- Dissent must be preserved: a worker who concludes a family is not viable must be reported as such, not averaged away.
- No company contact, purchase or experiment is authorized by this ledger.

---

## 7. Proposed registry changes (NOT applied — registry is read-only)

For a human-approved maintenance batch, the following versions/additions are proposed. No YAML was edited in this pass.

1. **`unb-alkaline-pulping`** — replace "BR INPI filing 2003, granted 2014, number TBD" with `PI 0305004-1`, filed 2003-10-06, granted 2014-11-11; add term-expiry note as a calculation, not a legal status; add Teixeira DOI.
2. **`keenat-dry-thermal`** — add disclosed patent conditions (80–100 °C; 10–30 % composite / 70–90 % thermoplastic; extruder compounding); add the C-01 temperature conflict note; keep gaps for off-gas and dwell time.
3. **`mego-fr3066128a1`** — add company mass split (80/12/8), capacity figures, and the C-04 butts/kg conflict.
4. **`cerdia-ca-recovery`** — add abstract-level disclosure (mechanical pretreatment; cleaning agent; optional distillation recovery; HT products); keep description unread.
5. **New `code-effort-in`** — company record, India, no patent located; aqueous chemical wash; products; scale claims; missing wastewater/assay data.
6. **New `terracycle-dossier`** — company record distinct from the existing `terracycle-trade-secret` narrative; official 3-step process; no patent located; sanitisation unresolved. (Decide whether to merge with the existing ID; not done here.)
7. **New `buffindia-in`** — company record, India, no patent located; acidic hydrolysis claim; clay composite; scale.
8. **New `re-cig-it`** — company record, Italy; sieve/wash/dry/hot-mix/granulate; external wastewater; ~39 % polymer yield; patent number not located.
9. **New `unb-teixeira-2017`** — peer-reviewed source record linked to `unb-alkaline-pulping` (separate source vs method identity, per the prior audit's De Fenzo precedent).

These proposals are traceable to `reports/stage1/company-source-map.md` and the specs in this batch. They should not be applied without the host's approval and a validator run.

---

## 8. Checkpoint

- Outputs: this ledger; `reconstruction-index.md`; 3 new specs; 1 dossier; Stage-3 packet (question, evidence index, schema, manifest).
- Remaining: Stage 3 manual panel; all Tier-1/2 gaps; registry proposals pending approval.
- Next action: freeze packet, set state to Stage 3 `awaiting_manual`, **STOP_AUTO**, present fixed panel commands.
- Provenance: Arena Agent Mode, 2026-11-03, baseline `fda66af`; 20 retrieval calls; no registry, backup or prior scientific file modified.
