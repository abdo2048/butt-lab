# Stage 3 launch sheet — batch-01, round 01, packet v1.1

Status: **awaiting_manual**. AUTO does not launch the panel, does not impersonate workers, and does not judge.

Supersedes: packet v1.0 (commit `0c0b6f2ff900a1866a0ed456c87e78661fa2f4ea`). **Do not launch v1.0.** v1.0 was withdrawn after external review for a provenance error and several framing overclaims; see `reports/stage2/errata-packet-v1.0.md`.

Content commit: recorded in `packets/batch-01/stage-3/COMMIT.txt` and in the manifest's `content_commit`. Use **that** commit to retrieve the packet — not the manifest's `repo_baseline_commit`.

---

## 1. What every worker must receive

All workers receive the **same complete bundle**. The four files in this folder are control files only; they do not contain the evidence.

### Control files (4)
1. `packets/batch-01/stage-3/question.md`
2. `packets/batch-01/stage-3/evidence-index.md`
3. `packets/batch-01/stage-3/output-schema.md`
4. `packets/batch-01/stage-3/manifest.yaml`

### Evidence files (18)
5. `reports/stage1/company-source-map.md`
6. `reports/stage1/coverage-ledger.md`
7. `reports/stage1/batch-selection.md`
8. `reports/stage2/reconstruction-index.md`
9. `reports/stage2/assumption-and-gap-ledger.md`
10. `reports/stage2/errata-packet-v1.0.md`
11. `reports/gap-check-01.md`
12. `specs/de-fenzo-2020-source-reconstruction.md`
13. `specs/mego-fr3066128a1-source-reconstruction.md`
14. `specs/company-workflow-dossiers-batch01.md`
15. `specs/keenat-fr3110470a1-source-reconstruction.md`
16. `specs/cn106928486-source-reconstruction.md`
17. `specs/pressurized-fluid-reference.md`
18. `specs/unb-pi0305004-source-reconstruction.md`
19. `dossier/cautionary/ineris-waste-classification.md`
20. `dossier/cautionary/keenat-lca-retreat.md`
21. `dossier/cautionary/korean-paving-stones.md`

Optional but recommended for the operator: `START_HERE.md`, `AGENTS.md`, `charter.md`, `WORKFLOW.md`, `FUSION_PROTOCOL.md`, `state/workflow.yaml` (protocol context for a worker that reads the repository).

### Attachment rules

- Attach as files or a single archive with **paths preserved**. The evidence index refers to paths; a chat that cannot see the repository cannot resolve a filename mentioned only in an index.
- Confirm the attachment was not truncated (file count and, where the interface shows it, size). A silently truncated patent or spec turns a cited parameter into a missing one.
- Do not include peer reports, the judge report, or Stage-4 material in any worker's bundle.
- If a worker can access the repository, give the content commit and read-only access instead of attachments — but still confirm the commit resolves.

---

## 2. Commands

Run each worker in a **separate session**, with the full bundle and no peer outputs:

- Slot A: `Read START_HERE.md. PANEL stage=3 slot=A batch=batch-01 round=01.`
- Slot B: `Read START_HERE.md. PANEL stage=3 slot=B batch=batch-01 round=01.`
- Slot C: `Read START_HERE.md. PANEL stage=3 slot=C batch=batch-01 round=01.`

After all three raw reports exist and match `packet_version: v1.1`, give a fresh session the bundle plus the three reports:

- Judge: `Read START_HERE.md. JUDGE stage=3 batch=batch-01 round=01.`

Then import and record acceptance:

- Clerk: `Read START_HERE.md. IMPORT panel results for stage=3 batch=batch-01 round=01; operator acceptance not yet granted.`

Save raw outputs unchanged to:

```
panels/batch-01/stage-3/round-01/worker-a.md
panels/batch-01/stage-3/round-01/worker-b.md
panels/batch-01/stage-3/round-01/worker-c.md
panels/batch-01/stage-3/round-01/judge.md
```

Do not rewrite worker text during import. Preserve dissent.

---

## 3. Slot emphasis (each worker still answers the whole question)

| Slot | Emphasis |
|---|---|
| A | Chemistry and material interpretation: polymer speciation, solvents/antisolvents, thermal limits, quality retention, what FTIR/TGA can and cannot prove |
| B | Contaminants, exposure, assays and waste: nicotine, TSNA, PAH, metals, leachate, effluent, off-gas, sludge, hazard classification |
| C | Integration, balances, energy, cost and scaling: mass/energy balance, closed-loop boundaries, composite dilution, permits, LCA-style accounting |

---

## 4. Operator acceptance checklist

Do **not** mark Stage 3 accepted unless all of the following are true and recorded in `state/workflow.yaml`:

1. All three worker reports are present, raw, and each states `packet_version: v1.1` and its own slot.
2. The judge report is present and was produced after all three reports.
3. The judge states model/service identity or `unknown`, and discloses any model-family reuse.
4. You have read the disagreements and evidence, not only the judge's summary.
5. You make an explicit decision: **accept**, **request a bounded revision** (specific units; maximum two rounds), or **reject**.
6. Your statement is recorded verbatim; file persistence alone is not acceptance.

Acceptance of Stage 3 is a scientific-panel decision, not a safety certification and not approval of any process. No laboratory validation exists.

---

## 5. Known limits to state in the launch message (optional but honest)

- The batch is six purpose-selected families, not a worldwide landscape.
- No independent contaminant assay, leachate test, emission measurement or LCA report was located.
- Three companies have no located patent; that is search-scoped.
- Two key patents were read only partly (Keenat FR3110470A1; Cerdia WO2026074041A2 abstract only).
- The reused specs and `gap-check-01.md` are same-author prior readings.
- v1.1 is a correction pass, not a new harvest.
