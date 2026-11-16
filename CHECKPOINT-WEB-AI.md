# BUTT-LAB READER PLATFORM — COMPLETE CHECKPOINT FOR WEB CHAT AI

**Date:** Mon Nov 16 2026  
**Worktree:** `C:\w\rp` (isolated, separate from main checkout)  
**Branch:** `feat/reader-platform`  
**Current HEAD:** `885596b feat: publish the cigarette-butt material and six method families`  
**Main checkout HEAD (untouched):** `3d76367 adding plan`  
**Origin remote:** `https://github.com/abdo2048/butt-lab.git` (untouched)  

---

## 🎯 PROJECT OVERVIEW

**Butt-Lab** is a research platform investigating whether cigarette butt recycling is scientifically viable. The project has completed two desk-research batches:

- **Batch-01**: Multi-stage panel process (Harvester → Deep-dive → Red-team → Inventor → Synthesizer), closed as a desk investigation on 2026-11-12. Key finding: **no recycling family is proven clean, detoxified, safe, commercially validated, or environmentally superior**. Heavy metals remain a stop condition. J-H-01 (judge hypothesis) is the preferred revision target.
- **Batch-02**: Single-AI desk cycle (method explanations, invention sketch, Egypt annex), completed 2026-11-16. Nine deliverables written with inline gap-closing notes. **Operator's accept/reject decision is still pending and NOT made by this continuation.**

**Reader Platform** is the public website that will present the scientific evidence. Authorized by operator's "full force auto" instruction **only for building on a branch** — NOT for merge, push, deploy, publish, experiment, or accepting batch-02.

---

## ✅ TASK STATUS (Reader Platform Plan: 6 tasks)

| Task | Description | Status | Commit |
|------|-------------|--------|--------|
| **Task 1** | Reconcile content contract with reader-platform design | ✅ **COMPLETE** | `a7319df` |
| **Task 2** | Author batch-02 pilot publication layer (material + 6 families) | ✅ **COMPLETE** | `885596b` |
| Task 3 | Complete sources, add invention record, extend manifest | ⏳ **NEXT** | — |
| Task 4 | Build reader application (web UI) | ⏳ | — |
| Task 5 | CI build and release preparation | ⏳ | — |
| Task 6 | External reader critique & optional AI second layer | ⏳ | — |

---

## 📋 TASK 2 — WHAT WAS BUILT (VERIFIED)

### Publication Layer Structure
```
publication/
├── manifest.yaml                          # 131 approved records + 6 pages
├── records/
│   ├── materials/
│   │   └── cigarette-butt.yaml
│   ├── methods/
│   │   ├── mechanical-physical.yaml
│   │   ├── thermal.yaml
│   │   ├── chemical.yaml
│   │   ├── biological.yaml
│   │   ├── material-incorporation.yaml
│   │   └── product-routes.yaml
│   ├── claims/       (42 records)
│   ├── gaps/         (14 records)
│   ├── assessments/  (42 records)
│   ├── sources/      (12 records)
│   └── terms/        (10 records)
└── pages/            (6 reader-facing method pages)
    ├── method-biological.md
    ├── method-chemical.md
    ├── method-material-incorporation.md
    ├── method-mechanical-physical.md
    ├── method-product-routes.md
    └── method-thermal.md
```

### Key Design Decisions (Rulings)
1. **Record namespace rule** (`publication/records/<kind>/<id>.yaml`) overrides design §7.1's proposed layout — enforced by `assertRecordNamespace`
2. **Sources must exist** in manifest during T2 because source-supported claims require `sourceId`
3. **Hypothesis test removed** from `publication-layer.test.ts` (belongs to T3 after invention acceptance)
4. **Resource burden = unknown** for all six families (rubric's `unknownRule`)
5. **Metals stop-condition**: handled as "no located source describes a step that would remove heavy metals"
6. **No invented numbers** — every claim either cites a located source with locator or is `source-not-located`

### Families Published
| Family | Key Points |
|--------|------------|
| mechanical-physical | Two variants: staged water/ethanol wash; grinding + sieving + aqueous wash |
| thermal | Dry size reduction + extrusion into thermoplastic composite |
| chemical | Solvent dissolution, filtration, precipitation, recovery |
| biological | Enzymatic, microbial, composting-device routes |
| material-incorporation | Bricks, asphalt, composites, panels |
| product-routes | Survey of candidate end products, NOT a process |

---

## 🔬 VERIFICATION RESULTS (All Passed)

Run these commands in `C:\w\rp\tools\publication-contract`:

```bash
# 1. Test suite
npm test
# → 201 tests, 200 pass, 1 skipped, 0 fail

# 2. TypeScript check
npx tsc --noEmit
# → clean (no output)

# 3. Validation
npm run validate
# → VALID records=131 pages=6 assets=0
#    (7 ASSESSMENT_UNKNOWN warnings are deliberate)

# 4. Export determinism (run twice, compare)
npm run export
# → EXPORTED version=batch-02-pilot records=131 pages=6 assets=0 files=11
# Run again to .publication-build-b, compare SHA-256 hashes → byte-identical

# 5. Public boundary scan
# Check .publication-build-a for any C:\w\rp, /home, /Users, /tmp paths → NONE FOUND
```

---

## 📁 KEY FILE LOCATIONS

### Data Layer (Source of Truth for Publication Generator)
| File | Purpose |
|------|---------|
| `tools/publication-contract/layer-data/records.json` | 12 sources, 10 terms, 1 material |
| `tools/publication-contract/layer-data/families-a.json` | mechanical-physical, thermal, chemical |
| `tools/publication-contract/layer-data/families-b.json` | biological, material-incorporation, product-routes |
| `tools/publication-contract/scripts/build-publication-layer.mjs` | Deterministic generator |
| `tools/publication-contract/tests/publication-layer.test.ts` | 12 named tests |

### Source Documents (READ-ONLY — Batch-02 Accepted Deliverables)
```
reports/batch-02/
├── methods/
│   ├── f0-staged-washing.md
│   ├── f1-mechanical-physical.md
│   ├── f2-thermal.md
│   ├── f3-chemical.md
│   ├── f4-biological.md
│   ├── f5-material-incorporation.md
│   └── f6-product-routes.md
├── invention.md
├── egypt-annex.md
└── HANDOFF-BRIEF.md
```

### State & Progress Tracking
| File | Purpose |
|------|---------|
| `state/workflow.yaml` | Authoritative workflow state (includes `reader_platform:` block) |
| `state/session-log.md` | Append-only log with dated entries (CRLF) |
| `task_plan.md` | Phase 17 outline |
| `progress.md` | Task progress tracking |
| `findings.md` | Key findings log |

### Contract Tooling
| Path | Purpose |
|------|---------|
| `tools/publication-contract/src/` | Contract validation, export, CLI |
| `tools/publication-contract/tests/` | 201 tests total |
| `tools/publication-contract/package.json` | Scripts: test, typecheck, validate, export |

---

## 🚀 TASK 3 — NEXT WORK (What Web Chat AI Should Do)

### Scope
1. **Complete the sources library** — any remaining sources not yet in `records.json`
2. **Add remaining reader pages** — ensure all 6 method narratives are complete
3. **Author the invention record** — from `reports/batch-02/invention.md`
   - Add hypothesis gate test to `tests/publication-layer.test.ts`
   - **Critical:** The invention is still awaiting operator's accept/reject decision. Publishing it before that decision would publish an unaccepted proposal. The hypothesis gate test belongs with Task 3 but the invention record itself should only be published IF operator accepts.
4. **Extend `publication/manifest.yaml`** with all newly approved records
5. **Re-run full validation** (test, typecheck, validate, export determinism, boundary scan)
6. **Commit** on `feat/reader-platform`

### Guardrails (MUST HOLD)
- ✅ No experiment, pilot, measurement, sample collection
- ✅ No merge to main, no push to origin, no deployment, no publication
- ✅ No acceptance of batch-02 deliverables on operator's behalf
- ✅ Missing evidence stays missing: `parameter-not-located`, `source-not-located`, `unknown` — never zero
- ✅ No invented numbers, prices, efficiencies, test results
- ✅ Heavy metals stop-condition remains in force
- ✅ All work in `C:\w\rp` on `feat/reader-platform` only

### Source Material for Task 3
- **Invention:** `reports/batch-02/invention.md` — concludes every family fails at least one of four required sink fields
- **Egypt annex:** `reports/batch-02/egypt-annex.md` — unvalidated observations only
- **Handoff brief:** `reports/batch-02/HANDOFF-BRIEF.md` — Section 10 defines may-do/may-not-do boundary
- **Method documents:** `reports/batch-02/methods/f0-f6.md` — already normalized, READ-ONLY

---

## 🔧 HOW TO CONTINUE (Step-by-Step for Web Chat AI)

### 1. Verify Current State
```bash
cd C:\w\rp
git status --short
git log --oneline -3
# Should show: 885596b (HEAD), a7319df, 4ed09b0
git branch --show-current
# Should show: feat/reader-platform
```

### 2. Run Verification Suite
```bash
cd C:\w\rp\tools\publication-contract
npm test                    # 201/200/1/0
npx tsc --noEmit           # clean
npm run validate           # VALID records=131 pages=6
npm run export             # to .publication-build-a
npm run export             # to .publication-build-b (different out dir)
# Compare hashes → byte-identical
```

### 3. Examine Key Files
- Read `CHECKPOINT-MASTER.md` (this worktree) for detailed summary
- Read `state/workflow.yaml` → `reader_platform:` block
- Read `state/session-log.md` → last two entries (Task 1, Task 2)
- Read `tools/publication-contract/layer-data/*.json` — understand data structure
- Read `tools/publication-contract/scripts/build-publication-layer.mjs` — understand generator
- Read `reports/batch-02/invention.md` — understand what invention record needs

### 4. Start Task 3
- Check `tools/publication-contract/layer-data/records.json` for any missing sources
- Add invention record to layer-data (new file or extend existing)
- Add hypothesis gate test to `tests/publication-layer.test.ts`
- Run `node scripts/build-publication-layer.mjs` to regenerate
- Re-run full verification suite
- Commit with message: `feat: complete sources, add invention record, extend manifest`

---

## 📌 CRITICAL BOUNDARIES (DO NOT CROSS)

| Action | Authorized? | Notes |
|--------|-------------|-------|
| Edit files in `C:\w\rp` | ✅ | Only on `feat/reader-platform` |
| Commit to `feat/reader-platform` | ✅ | After verification |
| Merge to `main` | ❌ | Separate operator decision |
| Push to `origin` | ❌ | Separate operator decision |
| Deploy to GitHub Pages | ❌ | Separate operator decision |
| Publish (make public) | ❌ | Separate operator decision |
| Run experiment/pilot | ❌ | Never authorized |
| Accept batch-02 deliverables | ❌ | Operator's decision only |
| Modify `reports/batch-02/*.md` | ❌ | READ-ONLY source documents |
| Modify `C:\w\bpc` worktree | ❌ | Untouched |
| Modify main checkout | ❌ | Untouched |

---

## 🧭 PROJECT CONTEXT FOR AI

### What This Project Is
A **scientific evidence platform** for cigarette butt recycling. It does NOT claim any recycling method works. It presents:
- What was measured (with sources)
- What was NOT measured (gaps, `source-not-located`, `parameter-not-located`)
- How each method scores on 8 criteria (all in lowest bands)
- The metals stop-condition that invalidates pathways
- The invention hypothesis (J-H-01) awaiting measurement

### Vocabulary (from Design Spec)
| Term | Meaning |
|------|---------|
| `approved` | Record listed in manifest, passes all validation |
| `source-not-located` | Claim names a measurement but no public source with locator found |
| `parameter-not-located` | A number (limit, count, threshold) was not found in any source |
| `unknown` | Assessment criterion completed but evidence insufficient for any band |
| `requires-human-validation` | Validation state for records that need human sign-off before publication |
| Four-field sink | Mass balance + contaminant fate + leaching + use-specific performance — NO family closes all four |

### Key Principles
1. **Evidence discipline** — Every claim tied to source + locator OR explicitly `source-not-located`
2. **No invented numbers** — Missing ≠ zero; missing = `unknown` / `not-located`
3. **Dissent preserved** — F3 minority, wrong-stream objection, unsolved-metals, F2 dilution warning all survive
4. **Metals stop-condition** — Never traded off; if metals not removed, pathway fails
5. **Publication ≠ validation** — Approved record = passed contract checks, NOT experimentally validated

---

## 📞 IF STUCK

1. **Re-read this checkpoint** — it has all verification commands
2. **Check `state/workflow.yaml`** — authoritative state machine
3. **Check `state/session-log.md`** — full provenance chain
4. **Run verification suite** — confirms you're at the right starting point
5. **Read the source documents** in `reports/batch-02/` — they are the evidence base

---

## 🏷️ MODEL / SESSION INFO

- **Current session model:** MiniMax M3.1 Flash Free (displayed; underlying not verified)
- **Worktree created:** 2026-11-16
- **Branch base:** `main` at `3d76367` + content contract `4ed09b0`
- **No model diversity established** — single AI execution throughout

---

**This checkpoint contains everything needed to continue Task 3 without any prior context. The web chat AI should verify the state using the commands above, then proceed with Task 3.**