# Scientist-Inventor Synthesis: M02–M08, R01–R05, S01–S06 (2026-11-17)

**Status:** `ai_proposal` / `ai_inference` — unvalidated desk hypotheses awaiting future qualified-facility measurement.  
**Role:** AI Scientist-Inventor (operator-authorized 2026-11-17 per `charter.md` and `state/workflow.yaml`).  
**Constraints:** Metals stop-condition (Cd, Pb, As, Hg) in force. No physical execution authorized.

---

## 1. Cross-Family System Inventory & LCA Gate (100 kg Dry Whole Butts, `ai_inference`)

Assuming upstream **M01-Gate** (70.0 kg dry CA tow + 30.0 kg diverted tobacco/paper/ash metals sink):

| Variant | Output (kg) | Water (L) | Chem/Solvent (kg) | Energy (kWh) | Cradle-to-Gate CO₂e (kg) | Baseline Net CO₂e (kg) | Sensitivity Range (kg) |
|---|---|---|---|---|---|---|---|
| **`J-H-01-M` (F1)** | 70.0 (CA fiber) | 270.0 | 0.0 | 45.0 | 23.3 | **-177.7** (PASS) | -101.7 to -253.7 |
| **`F0-E` (F0)** | 70.0 (CA fiber) | 150.0 | 9.3 (EtOH) | 105.0 | 71.6 | **-129.4** (PASS) | -53.4 to -205.4 |
| **`F2-VSC` (F2)** | 350.0 (CA/PP) | 0.0 | 0.0 | 95.0 | 47.5 | **-243.5** (PASS) | -137.5 to -349.5 |
| **`F3-SC-LEL` (F3)** | 64.4 (CA) | 50.0 | 9.1 (Acetone) | 275.0 | 205.8 | **+21.6** (FAIL) | +92.0 to -48.8 |
| **`F5-ED-CIP` (F5)** | 42.8 (Pulp) | 120.0 | 4.0 (NaOH) | 215.8 | 116.3 | **+61.1** (FAIL) | +88.5 to +33.7 |

---

## 2. Additional Inventions & Falsification Tests (`ai_proposal`)

- **`F0-E` (F0):** M01-Gate + 3-stage water wash + 70% EtOH wash (95% distillation recovery). Falsified if EtOH swells CA to trap >100 mg/kg nicotine or >20% Cd/Pb/As/Hg enters EtOH bottoms without permitted disposal.
- **`F3-SC-LEL` (F3):** N₂-inerted (<8% O₂) microfiltration + condenser-first (-20 °C) vapor capture + subcritical CO₂ (50 bar). Falsified if O₂ >8%, condenser recovery <95%, or subcritical CO₂ fails M08 Tier-2 gate.
- **`F4-Hybrid` (F4):** scCO₂ pre-extraction (74 bar/40 °C) on CA tow + immobilized dead fungal mycelium biosorption on diverted metals liquor. Falsified if residual nicotine >100 mg/kg, biosorbent captures <80% Cd/Pb in 24 h, or TCLP/EN 12457-2 leaches >5%.
- **`F5-ED-CIP` (F5):** Pre-oxidation (10–50 mg/L H₂O₂/O₃) + alkaline/enzymatic CIP every 10 cycles on BMED stack. Falsified if Cycle-10 efficiency <85%, post-CIP <90%, or halogenated DBPs exceed discharge limits.
- **`R02-R03-Gate`:** Tier-1 (EN 12457-2 + UV) and Tier-2 (EN 71-3 / ISO 105-E04 + headspace GC-MS) product gates paired with a named, permitted recipient matrix for every waste/purge stream.

---

## 3. S04 Disposal Cost Sensitivity (`ai_inference`)

- **M01-Gate dry metals sink (30 kg @ $800/t hazardous):** $24.00 per 100 kg dry butts ($240/t).
- **Unseparated wet-wash liquid purge (270 L @ $45/m³):** $12.15 per 100 kg dry butts ($121.50/t).
