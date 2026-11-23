# Stage 3 launch sheet — batch-01, round 01, packet v1.1 (release-repaired)

Status: **awaiting_manual**. AUTO does not launch the panel, does not impersonate workers, and does not judge.

This is a **release-metadata repair** of v1.1: the workflow YAML indentation is fixed, the bundle counts are reconciled, and payload/metadata retrieval is separated. **The 20 hashed payload files are unchanged** and still match their SHA-256 values. No research was redone.

Supersedes: packet v1.0 (payload commit `0c0b6f2ff900a1866a0ed456c87e78661fa2f4ea`), withdrawn after review. Do not launch v1.0.

---

## 1. Two things with two different commits

| Thing | What it is | Where to get it |
|---|---|---|
| **Hashed payload** | 20 files listed in `manifest.yaml`, each with a SHA-256 | Commit **`5f484b585ca16dbd2ce93b56c61c962f5f14c774`** |
| **Release metadata** | `manifest.yaml`, `LAUNCH.md`, `COMMIT.txt` (deliberately not hashed) | The **latest commit on `main`**, or the commit containing this file |

Why this matters: `COMMIT.txt` was added *after* the payload commit (in the PR #2 state record), so downloading only at `5f484b5` will not supply `COMMIT.txt`. The payload is identified by `5f484b5`; the release metadata is whatever current snapshot you launch from. Workers should record `5f484b5` as `packet_commit` in their report header.

---

## 2. What to send: 23 release files

### 2a. Hashed payload — 20 files (3 hashed control + 17 evidence)

Control (3), hashed:

1. `packets/batch-01/stage-3/question.md`
2. `packets/batch-01/stage-3/evidence-index.md`
3. `packets/batch-01/stage-3/output-schema.md`

Evidence (17), hashed:

4. `reports/stage1/company-source-map.md`
5. `reports/stage1/coverage-ledger.md`
6. `reports/stage1/batch-selection.md`
7. `reports/stage2/reconstruction-index.md`
8. `reports/stage2/assumption-and-gap-ledger.md`
9. `reports/stage2/errata-packet-v1.0.md`
10. `reports/gap-check-01.md`
11. `specs/de-fenzo-2020-source-reconstruction.md`
12. `specs/mego-fr3066128a1-source-reconstruction.md`
13. `specs/company-workflow-dossiers-batch01.md`
14. `specs/keenat-fr3110470a1-source-reconstruction.md`
15. `specs/cn106928486-source-reconstruction.md`
16. `specs/pressurized-fluid-reference.md`
17. `specs/unb-pi0305004-source-reconstruction.md`
18. `dossier/cautionary/ineris-waste-classification.md`
19. `dossier/cautionary/keenat-lca-retreat.md`
20. `dossier/cautionary/korean-paving-stones.md`

### 2b. Release metadata — 3 files (not hashed)

21. `packets/batch-01/stage-3/manifest.yaml`
22. `packets/batch-01/stage-3/LAUNCH.md` (this file)
23. `packets/batch-01/stage-3/COMMIT.txt`

### 2c. Optional protocol context — 5 files

`START_HERE.md`, `AGENTS.md`, `charter.md`, `WORKFLOW.md`, `FUSION_PROTOCOL.md`.

These are **optional** and only needed if the session is expected to run the fixed `PANEL`/`JUDGE` commands that say "Read START_HERE.md". If the chat cannot access the repository, either attach them or use the self-contained command in §4b. Do not tell a session to read a file it was not given.

---

## 3. Attachment rules

- Send **all 23 release files**, with paths preserved. The three control files alone are indexes; they do not contain the evidence.
- Optional: the 5 protocol files if using the repository-style commands.
- Confirm the attachment was not truncated (file count, and size where the interface shows it). A silently truncated patent turns a cited parameter into a missing one.
- Do **not** include peer reports, the judge report, or Stage-4 material in any worker's bundle.
- If the worker has repository access instead, give it the payload commit `5f484b5` plus the release snapshot, and confirm the commit resolves.

---

## 4. Commands

### 4a. Repository-style (requires `START_HERE.md` and the protocol files)

- Slot A: `Read START_HERE.md. PANEL stage=3 slot=A batch=batch-01 round=01.`
- Slot B: `Read START_HERE.md. PANEL stage=3 slot=B batch=batch-01 round=01.`
- Slot C: `Read START_HERE.md. PANEL stage=3 slot=C batch=batch-01 round=01.`
- Judge (after all three): `Read START_HERE.md. JUDGE stage=3 batch=batch-01 round=01.`
- Clerk: `Read START_HERE.md. IMPORT panel results for stage=3 batch=batch-01 round=01; operator acceptance not yet granted.`

### 4b. Self-contained fallback (no repository access)

> You are the Stage-3 red-team worker for **slot A** (or B/C), batch `batch-01`, round `01`, packet `v1.1`, payload commit `5f484b5`. Read the attached `question.md`, `output-schema.md`, `evidence-index.md` and all 17 evidence files. Answer the whole common question with the emphasis assigned to your slot. Do not read peer or judge reports. Follow the hard rules in `question.md`; do not invent numbers or provide hazardous operating instructions. Return only your own slot's report in the required schema.

Use the same bundle for all three slots, one session each.

### 4c. Outputs

Save raw reports unchanged to:

```
panels/batch-01/stage-3/round-01/worker-a.md
panels/batch-01/stage-3/round-01/worker-b.md
panels/batch-01/stage-3/round-01/worker-c.md
panels/batch-01/stage-3/round-01/judge.md
```

Do not rewrite worker text during import. Preserve dissent.

---

## 5. Slot emphasis (each worker still answers the whole question)

| Slot | Emphasis |
|---|---|
| A | Chemistry and material interpretation: polymer speciation, solvents/antisolvents, thermal limits, quality retention, what FTIR/TGA can and cannot prove |
| B | Contaminants, exposure, assays and waste: nicotine, TSNA, PAH, metals, leachate, effluent, off-gas, sludge, hazard classification |
| C | Integration, balances, energy, cost and scaling: mass/energy balance, closed-loop boundaries, composite dilution, permits, LCA-style accounting |

---

## 6. Operator acceptance checklist

Do **not** mark Stage 3 accepted unless all of the following are true and recorded in `state/workflow.yaml`:

1. All three worker reports are present, raw, and each states `packet_version: v1.1`, `packet_commit: 5f484b5…`, and its own slot.
2. The judge report is present and was produced after all three reports.
3. The judge states model/service identity or `unknown`, and discloses any model-family reuse.
4. You have read the disagreements and evidence, not only the judge's summary.
5. You make an explicit decision: **accept**, **request a bounded revision** (specific units; maximum two rounds), or **reject**.
6. Your statement is recorded verbatim; file persistence alone is not acceptance.

Acceptance of Stage 3 is a scientific-panel decision, not a safety certification and not approval of any process. No laboratory validation exists.

---

## 7. Known limits to state in the launch message

- The batch is six purpose-selected families, not a worldwide landscape.
- No independent contaminant assay, leachate test, emission measurement or LCA report was located.
- Three companies have no located patent; that is search-scoped.
- Two key patents were read only partly (Keenat FR3110470A1; Cerdia WO2026074041A2 abstract only).
- The reused specs and `gap-check-01.md` are same-author prior readings.
- The Korean paving-stone and Keenat-LCA notes are secondary comparators, not verdicts on a whole family. The Keenat spec's "direct precedent" phrasing and batch-selection's "directly undermines" wording are residual overstatements flagged for the panel; they do not change the evidence.
- The 20 payload hashes were verified against `manifest.yaml` at the payload commit; this launch sheet does not add a new scientific claim.
