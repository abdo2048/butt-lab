# M-04 — Keenat dry thermal decontamination + extrusion compound (FR3110470A1) — Action plan

```
id: M-04
name: "Keenat dry thermal decontamination + extrusion compound (FR3110470A1)"
family: thermal
priority: true
status: draft
version: v0.1
sources: [fr3110470a1, keenat-2026-guide, keenat-2025-cdp-notice]
```
(Keep the block above as the file's metadata; the site builder reads it.)

## 0. Summary card
Keenat SAS (France, inventor Teddy Fournier) patented a water-free, solvent-free route: mechanical sorting and tobacco extraction, then a long first heating (80-100 degC per claim; 80-160 degC preferred 90 degC per description) in a steeping vat to dry and decontaminate the filter fraction, optional vacuum oven for PAH evaporation, grinding to 3-5 mm fragments, and a second decontamination inside a polymer extruder at >=170 degC (preferred 170-240 degC, 1-5 min) producing pellets with 10-30% filter content in polyamide or polyester matrices for injection-moulded street furniture and panels. Priority on the registry because it is the only dry route with a filed French family (composting-free, no wastewater) and it names real commercial equipment. Critical context found in the company's own 2026 white paper: Keenat states it ran the process for years at industrial scale, then **ceased material recycling entirely** (its own LCA: "prohibitive operating costs", "persistent uncertainty on long-term management of extracted pollutants") and pivoted to solid-recovered-fuel co-processing in cement kilns — the route is patent-documented but operator-abandoned. [S1][S2]

## 1. What the sources disclose — step by step
[S1] = FR3110470A1 (A1 application; filed 19.05.2020, FR 2005076; applicant/holder Keenat SAS; inventor Fournier Teddy; INPI preliminary search report completed 11.01.2021 — two X citations against the composite claims 15-17: US5482216A, US2014/287144A1). [S2] = Keenat 2026 white paper (company self-report). [S3] = keenat-2025-cdp-notice folder — **shelf mismatch: it contains a DIY pocket-ashtray craft sheet, no process data.**

1. **Sorting** — vibrating sieve / rotary trommel; named example: horticultural rotary sieve "Menart TH0924"; butts only. [S1 [0027]-[0028]]
2. **Tobacco extraction** — single-screw or twin-screw metering feeder or knife grinder that compresses the butts to eject tobacco WITHOUT grinding the filters. [S1 [0025]-[0026], [0031]]
3. **Separation F1/F2** — sieve grid **3-6 mm**; the separation step is **repeated 3-5 times** on fraction F1 (filters); F2 (tobacco+paper) becomes solid recovered fuel (CSS). [S1 [0034]-[0036]]
4. **First decontamination heating (step b)** — CLAIM 1: "secher et depolluer par chauffage ... a une temperature comprise en 80 et 100 degC"; DESCRIPTION [0037]: "80 et 160 degC, preferentiellement ... 90 degC" — **internal contradiction, both kept (gap row 1)**. Duration: **3-12 h** [0039]. Equipment: "cuve a etuver" (steeping vat), no model/power given. [S1 claims 1, 10, 11]
5. **Optional vacuum-oven step(s)** — vacuum oven "eliminates substances such as Fluoranthene, Benzo(a)pyrene or Benzo(b)fluoranthene"; "low oxygen rate ... favors evaporation of organic pollutants". `parameter_not_located: vacuum level, temperature, dwell` [S1 [0038], [0041], claim 8 truncated by OCR]
6. **Grinding (step c)** — low-speed knife grinder / garden shredder (named: ELIET MAJOR 4S, Viking GE 250.1); optional 8 mm trommel; duration **20-40 min, preferred 30 min**; fragments **3-5 mm diameter**. [S1 [0043]-[0046]]
7. **Second decontamination + compounding (step d)** — mix fragments with thermoplastic in an extruder at **>=170 degC, preferred 170-240 degC**, duration **<=5 min, preferred 1-2 min**; "low pressures and/or low oxygen rate favor evaporation of toxic compounds"; PAHs named as evaporated (Fluoranthene, Benzo(b)fluorene, Benzo(a)pyrene) — **qualitative only, no measured efficiencies anywhere**; strands cooled and pelletized. [S1 [0049]-[0053], claims 5-6, 12]
8. **Formulation** — **10-30% recycled filter fragments + 70-90% thermoplastic** (PA6, PA66, PA11, PA12, PBS, PBSA); optional odor stabilizer; end uses: furniture, pipes, feet, ashtrays, panels; recyclable by re-grinding. [S1 [0054], [0057]-[0058], [0064], [0067], claim 13]
9. **Examples (mechanical only)** — PA11 + 10%: Young's modulus 1580 MPa, max stress 45 MPa, elongation 17%, notched Charpy 3 kJ/m2, density 1.05 g/cm3, 72 Shore D, ash 2%. PA11 + 30%: 2040 MPa; 48 MPa; 6%; 2.9 kJ/m2; 1.13 g/cm3; 75 Shore D; ash 5.7%. PBS + 30%: 1590 MPa; 33 MPa; 4%; 1.8 kJ/m2; 1.36 g/cm3; 71 Shore D; ash 8.5%. PBSA + 30%: 780 MPa; 16.5 MPa; 18%; 3.8 kJ/m2; 1.31 g/cm3; 59 Shore D; ash 7.0%. All per ISO 527/179/1183/868/3451. [S1 examples 1-4]
10. **Company status (self-report)** — "for several years we ran this process at industrial scale ... tonnes of butts" (no tonnage number); patents claimed: FR3110470, EP3912739; then the pivot: own LCA found "prohibitive operating costs" and "persistent uncertainty on the long-term management of extracted pollutants"; **material recycling ceased**, focus moved to CSS co-processing in cement kilns (>1450 degC claimed, ~1 t CO2 avoided per t CSS — sector figures, self-report). [S2]

`parameter_not_located` across [S1]: pollutant destruction/removal efficiencies (the words nicotine/phenol/pesticide never appear in the patent — grep-verified); off-gas capture; vacuum values; extruder screw/pressure specifics; throughput; mass yields F1/F2; grant status.

## 2. Equipment
- Vibrating sieve / rotary trommel (Menart TH0924 named); screw metering feeder or knife grinder for tobacco ejection; 3-6 mm sieve, 3-5 passes [S1]
- Steeping vat ("cuve a etuver") 80-100/160 degC, 3-12 h; optional vacuum oven [S1]
- Low-speed knife grinder (ELIET MAJOR 4S / Viking GE 250.1), 20-40 min to 3-5 mm [S1]
- Extruder (type/config not specified) with low-pressure/low-O2 operation, >=170-240 degC, 1-5 min residence; pelletizer [S1]
- Scale note: all steps are industrial-line items; a lab replication needs a bench oven for stage b, a shredder, and a lab twin-screw extruder with vacuum venting.

## 3. Gap-fill table — labeled expert estimates

| # | Gap | Estimate (labeled) | Reasoning | Falsifier — how the team tests it |
| --- | --- | --- | --- | --- |
| 1 | Stage-b temperature (conflict) | Keep both: claim **80-100 degC**, description **80-160 pref 90 degC**; `ai_inference`: 90 degC is the overlap point and the description's stated preference | The claim range is narrower than the description range — classic drafting drift; 90 degC works under both. | Cook filter fractions at 90, 110, 160 degC for 6 h; analyze off-gas + fiber (nicotine, PAHs). If 160 degC removes far more than 90 degC, the claim range understates the process. |
| 2 | Pollutant destruction claim (~200 degC "destroys nicotine, phenol, pesticides") | **Not supported by the patent** (`parameter_not_located`): no nicotine/phenol/pesticide data anywhere in [S1]; working hypothesis `ai_inference`: heating at 90-160 degC + extrusion at 170-240 degC PARTIALLY volatilizes semi-volatiles (PAHs named) but nicotine (bp ~247 degC) is NOT destroyed at these temperatures | The registry's "~200 degC destruction" claim traced back to secondary summaries, not to the primary text — corrected here. | Nicotine assay (HPLC) of fiber before stage b, after stage b, and after extrusion. Expect significant retention; if destruction is claimed, it needs a source. |
| 3 | Vacuum-oven parameters | `ai_proposal`: 60-80 degC at 50-100 mbar, 2-4 h | Patent names the step without numbers; this is the conventional band for VOC/PAH evaporation from polymer fluff without CA degradation. | PAH screen (16 EPA) before/after; acceptance: >=50% reduction, no fiber discoloration. |
| 4 | Stage-b duration inside 3-12 h | `ai_proposal`: team tests 3 / 6 / 12 h at 90 degC | Range disclosed, optimum not; mid-point first is standard practice. | Off-gas nicotine concentration vs time; plateau = sufficient dwell. |
| 5 | Extruder specifics | `ai_proposal`: twin-screw, 190 degC, 2 min residence, vacuum venting 20-50 mbar | Patent gives temperature band and time band only; twin-screw with vacuum venting is the standard compounding configuration; PBS/PBSA process at 170-190 degC, PA11 at ~200-220 degC. | Extrude PA11 + 20% at 190 degC with/without venting; PAH + odor analysis of pellets. |
| 6 | Off-gas capture (both heated steps) | `parameter_not_located` in [S1]; `ai_proposal`: condenser (>=90 degC dew point) + activated carbon bed sized for the batch | Heating toxic waste drives volatiles OUT — the patent evaporation logic requires capture to not simply relocate the pollution. | Weigh + assay (nicotine, PAHs) the condensate and carbon after one full cycle; capture mass balance >=80%. |
| 7 | Throughput / mass yields F1/F2 | `parameter_not_located`; company "tonnes" without number (self-report, [S2]) | No basis to estimate a number; the 2026 guide's abandonment makes the economics the open question. | If replicating: log kg/h per step; else treat as unknown, not zero. |
| 8 | Legal status | `ai_inference`: FR3110470A1 shows no grant event in the A1 file; EP3912739A1 status unverified; X citations target claims 15-17 (composite) — those are the most at-risk | Search report exists (11.01.2021); grant/refusal events absent from the shelf document. | Check INPI register + EPO register for FR3110470 / EP3912739 legal events before any freedom-to-operate statement. |
| 9 | Process viability | Company's own verdict (self-report [S2]): material recycling **ceased** — costs prohibitive, extracted-pollutant management uncertain | The operator's abandonment after years at scale is the single strongest economic datapoint for this route. | Treat as a red flag in ranking (factor: cost & equipment). No falsifier — it is a business fact, not a technical one. |
| 10 | Product safety of pellets | `parameter_not_located`: no leaching or tox tests on the composites in [S1]; **stop-condition binds** — Cd/Pb/As/Hg uncharacterised in the fiber feed and pellets | Mechanical properties are characterized; chemical safety of the composite is not. | ICP-MS + leach test on pellets before any use claim; until then, non-food, non-contact applications only. |

## 4. Safety notes
- **Both heated steps off-gas toxics**: stage b (3-12 h) evaporates organics from waste tobacco fiber; extrusion evaporates PAHs by design. Vent to capture (row 6), never to room air; condensate and carbon are hazardous waste. [S1 [0038], [0051]]
- **Steeping vat at 90-160 degC**: hot-surface and fire risk with fibrous organic load; thermostated electric oven preferred over gas.
- **Extrusion**: 170-240 degC melt; PA11/PBS processing hazards are standard polymer practice; vacuum venting emits — capture before pump.
- **No solvent/water** is the route's selling point [S1 claim 2], but dry handling of nicotine-bearing dust (grinding step) needs LEV extraction + FFP3; the dust is toxic.
- **F2 stream to CSS fuel**: combustion of tobacco-bearing fuel produces flue gas with nicotine/PAHs — only qualified facilities (cement kilns with continuous emission monitoring) may take it. [S1 [0036]; S2]
- **Stop-condition**: metals uncharacterised in pellets (row 10).
- Desk research authorizes no physical trial; qualified facility, risk assessment, lawful waste handling, named human actor.

## 5. What the team must verify in lab
Ordered by information value:
1. **Stage-b decontamination truth test** (rows 1, 2, 4): cook 200 g filter fraction at 90 degC, 6 h, with off-gas capture; nicotine + PAH assays of feed, fiber, condensate. This is THE experiment: it confirms or kills the route's central decontamination premise.
2. **Vacuum-oven increment** (row 3): PAH before/after.
3. **Bench compounding** (row 5): PA11 + 20% fragments, 190 degC, vented; tensile + Charpy vs patent example band (PA11 10-30%: 45-48 MPa max stress).
4. **Legal check** (row 8): INPI/EPO register status of FR3110470 and EP3912739 — desktop, no lab needed.
5. **Metals gate** (row 10) before any product-facing claim.

## 6. Sources
- [S1] FR3110470A1 — "Procede de recyclage des megots de cigarette", Keenat SAS (inventor Teddy Fournier), filed 19.05.2020 (FR 2005076), A1; INPI search report 11.01.2021 (X: US5482216A, US2014/287144A1). Shelf: `sources/fr3110470a1/`. EP family member EP3912739A1 claimed by [S2] but not on the shelf — fetch pending.
- [S2] Keenat, "Guide expert — Pollution des megots" (2026, signed Sandrine Poilpre) — COMPANY SELF-REPORT; shelf: `sources/keenat-2026-guide/`. Contains the strategic pivot away from material recycling. Sector figures therein (4,500 G butts/yr; 500 L water per butt) are third-party citations, used only as context.
- [S3] `sources/keenat-2025-cdp-notice/` — shelf mismatch: DIY pocket-ashtray craft sheet, no process content; kept as a record, not evidence.
- Registry: entry `keenat-dry-thermal` — this plan corrects its disclosed field (the "~200 degC destroys nicotine/phenol/pesticides" claim is not in the primary text).
