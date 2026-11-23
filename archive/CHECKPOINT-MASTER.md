# Task 2 Checkpoint - Batch-02 Pilot Publication Layer

**Date**: Mon Nov 16 2026  
**Commit**: `885596b` - feat: publish the cigarette-butt material and six method families  
**Branch**: `feat/reader-platform`  
**Worktree**: `C:\w\rp`  
**Model**: MiniMax M3.1 Flash Free  

## Executive Summary

Task 2 is **COMPLETE**. The batch-02 pilot publication layer has been authored with:
- 1 cigarette butt material record
- 6 method family records (mechanical-physical, thermal, chemical, biological, material-incorporation, product-routes)
- 131 total approved records in the manifest
- 6 reader-facing method pages
- All tests passing (201 tests, 200 pass, 1 skip, 0 fail)

## Verification Results

✅ **Test Suite**: 201/200/1/0 (201 tests, 200 pass, 1 skipped, 0 fail)  
✅ **TypeScript**: `tsc --noEmit` clean  
✅ **Validation**: `VALID records=131 pages=6 assets=0`  
✅ **Export Determinism**: Byte-identical across two runs; 10 output files  
✅ **Public Boundary Scan**: Clean, no repository-local paths  

## What Was Built

### Publication Layer Structure

```
publication/
├── manifest.yaml                    # Lists all 131 approved records
├── records/
│   ├── materials/cigarette-butt.yaml
│   ├── methods/
│   │   ├── mechanical-physical.yaml
│   │   ├── thermal.yaml
│   │   ├── chemical.yaml
│   │   ├── biological.yaml
│   │   ├── material-incorporation.yaml
│   │   └── product-routes.yaml
│   ├── claims/                     # 42 claim records
│   ├── gaps/                       # 14 gap records
│   ├── assessments/                # 42 assessment records
│   ├── sources/                    # 12 source records
│   └── terms/                      # 10 glossary term records
└── pages/                          # 6 reader-facing method pages
    ├── method-biological.md
    ├── method-chemical.md
    ├── method-material-incorporation.md
    ├── method-mechanical-physical.md
    ├── method-product-routes.md
    └── method-thermal.md
```

### Key Design Decisions (Rulings)

1. **Record Namespace Rule**: `records/<kind>/<id>.yaml` is enforced by `assertRecordNamespace`
2. **Contract Override**: The contract's record namespace rule (`records/<kind>/<id>.yaml`) overrides design §7.1's proposed layout
3. **Sources Must Exist**: Source-supported claims require `sourceId`; loader only loads manifest-listed records
4. **Hypothesis Test Moved**: Removed from publication-layer.test.ts (belongs to T3 after invention acceptance)
5. **Resource Burden**: Unknown for all six families (rubric's `unknownRule`)
6. **Metals Stop-Condition**: Handled as "no located source describes a step that would remove heavy metals"

## Current State Files

- **Workflow**: `state/workflow.yaml` - authoritative; slimmed to current state on 2026-11-17
- **Session Log**: `docs/history/session-log.md` - CRLF format, contains T1 and T2 entries
- **Active Plan**: `docs/BUILD-PLAN.md` - Phases A–E (reader platform, CI, release, hosting)
- **Task Plan**: `docs/history/task_plan.md` - Phase 17 outline (frozen)
- **Progress**: `docs/history/progress.md` (frozen)

## What Still Needs to Be Done

### Task 3: Complete Sources Library and Extend Manifest

1. **Complete the sources library** (remaining sources if any)
2. **Add remaining pages** (method narratives for all 6 families)
3. **Author the invention record and its hypothesis gate test**
   - The invention is at `reports/batch-02/invention.md`
   - The hypothesis gate test belongs in `tests/publication-layer.test.ts`
4. **Extend `publication/manifest.yaml`** with all approved records
5. **Re-run full validation**
6. **Commit** on `feat/reader-platform`

### Outstanding Items

**DO NOT DO** (requires operator approval):
- Merge to main
- Push to GitHub
- Deploy
- Publish
- Run experiment or pilot
- Accept batch-02 deliverables (operator's decision pending)

## Key Files Reference

### Data Layer Files

- `tools/publication-contract/layer-data/records.json` - Source of truth for sources, terms, material
- `tools/publication-contract/layer-data/families-a.json` - Mechanical-physical, thermal, chemical
- `tools/publication-contract/layer-data/families-b.json` - Biological, material-incorporation, product-routes
- `tools/publication-contract/scripts/build-publication-layer.mjs` - Deterministic generator
- `tools/publication-contract/tests/publication-layer.test.ts` - 12 named tests

### Source Documents (READ-ONLY)

- `reports/batch-02/methods/f0-staged-washing.md`
- `reports/batch-02/methods/f1-mechanical-physical.md`
- `reports/batch-02/methods/f2-thermal.md`
- `reports/batch-02/methods/f3-chemical.md`
- `reports/batch-02/methods/f4-biological.md`
- `reports/batch-02/methods/f5-material-incorporation.md`
- `reports/batch-02/methods/f6-product-routes.md`
- `reports/batch-02/invention.md`
- `reports/batch-02/egypt-annex.md`
- `reports/batch-02/HANDOFF-BRIEF.md`

## Next Steps for Web Chat AI

1. **Verify the current state**: Run `npm test` to confirm 201/200/1/0
2. **Check TypeScript**: Run `npx tsc --noEmit` to confirm clean
3. **Validate**: Run `npm run validate` to confirm VALID records=131 pages=6
4. **Compare export**: Run export twice and compare outputs
5. **Scan public boundary**: Ensure no repository-local paths

## Important Boundaries

- All work happens ONLY in worktree `C:\w\rp` on branch `feat/reader-platform`
- Main branch at `3d76367` is untouched
- Origin remote is untouched
- Worktree `C:\w\bpc` is untouched
- All reports/batch-02 files are READ-ONLY source documents
- Task 3 will add to these existing sources, not modify them

## How to Continue

When the web chat AI receives this checkpoint, it should:

1. Read this checkpoint file first
2. Verify the worktree state with `git log --oneline -3`
3. Run the verification commands above
4. Examine the source documents in `reports/batch-02/`
5. Examine the existing publication layer in `publication/`
6. Examine the build script and tests in `tools/publication-contract/`
7. Start Task 3: complete sources, add invention, extend manifest

## Context for Web Chat AI

The butt-lab project is a research platform for cigarette butt recycling. The reader-platform is a public website that presents the scientific evidence about whether cigarette butt recycling is viable. The platform uses a publication contract model where:

- Records are YAML documents with specific schemas
- Records must have sources that are listed in the manifest
- Claims are source-backed or explicitly source-not-located
- The system distinguishes between facts, source claims, hypotheses, and inventions
- Heavy metals are treated as a stop condition that invalidates certain pathways

The operator has authorised "full force auto" for build tasks but not for merge, push, deployment, publication, or experiment.