# Stage 4 launch sheet — batch-01, round 01, packet v1.0

Status: **awaiting operator launch**. AUTO does not launch the panel, does not impersonate workers, and does not judge.

Stage 4 is the **inventor** stage: bounded invention/hypothesis work built on the accepted Stage-3 red-team panel (operator acceptance recorded 2026-11-06, REVISE recommendation and bounded revisions carried forward). Stage 4 must not treat any family as proven safe, clean, deployable, or environmentally beneficial. No experiment, purchase, company contact or site visit is authorized. Proposals are hypotheses with falsifiers, not validated inventions; no novelty, patentability or safety claims.

---

## 1. Commits

| Thing | What it is | Where to get it |
|---|---|---|
| **Hashed payload (8 files)** | 3 Stage-4 control files + 5 Stage-3 panel outputs, each with SHA-256 in `manifest.yaml` | The commit containing this packet (recorded in `COMMIT.txt` after commit) |
| **Stage-3 frozen evidence (20 files)** | Underlying evidence from Stage-3 packet v1.1 | Commit `5f484b585ca16dbd2ce93b56c61c962f5f14c774` |
| **Release metadata** | `manifest.yaml`, `LAUNCH.md`, `COMMIT.txt` (not hashed) | Latest commit on `main` |

---

## 2. What to send

### 2a. Hashed payload — 8 files

1. `packets/batch-01/stage-4/question.md`
2. `packets/batch-01/stage-4/evidence-index.md`
3. `packets/batch-01/stage-4/output-schema.md`
4. `panels/batch-01/stage-3/round-01/worker-a.md`
5. `panels/batch-01/stage-3/round-01/worker-b_Z-GLM5.3.md`
6. `panels/batch-01/stage-3/round-01/worker-b_Tencent-Hy4.md`
7. `panels/batch-01/stage-3/round-01/worker-c.md`
8. `panels/batch-01/stage-3/round-01/judge.md`

### 2b. Stage-3 frozen evidence — 20 files

The 20 manifest-listed paths at commit `5f484b5` (same list as the Stage-3 launch sheet).

### 2c. Release metadata — 3 files

`packets/batch-01/stage-4/manifest.yaml`, `LAUNCH.md` (this file), `COMMIT.txt`.

### 2d. Optional protocol context — 5 files

`START_HERE.md`, `AGENTS.md`, `charter.md`, `WORKFLOW.md`, `FUSION_PROTOCOL.md`.

---

## 3. Attachment rules

- Send the payload with paths preserved; confirm no truncation.
- Unlike Stage 3, Stage-4 workers **do** receive the Stage-3 panel outputs — they are this packet's primary evidence. They must **not** receive Stage-4 peer output or the Stage-4 judge report.
- If the session has repository access, give it this packet's commit (from `COMMIT.txt`) plus the Stage-3 payload commit `5f484b5`.

---

## 4. Commands

### 4a. Repository-style

- Slot A: `Read START_HERE.md. PANEL stage=4 slot=A batch=batch-01 round=01.`
- Slot B: `Read START_HERE.md. PANEL stage=4 slot=B batch=batch-01 round=01.`
- Slot C: `Read START_HERE.md. PANEL stage=4 slot=C batch=batch-01 round=01.`
- Judge (after all three): `Read START_HERE.md. JUDGE stage=4 batch=batch-01 round=01.`
- Clerk: `Read START_HERE.md. IMPORT panel results for stage=4 batch=batch-01 round=01; operator acceptance not yet granted.`

Use separate sessions per slot. Stage 4 includes adversarial screening; a judge-created hybrid is a new hypothesis.

### 4b. Self-contained fallback (no repository access)

> You are the Stage-4 inventor worker for **slot A** (or B/C), batch `batch-01`, round `01`, packet `v1.0`. Read the attached Stage-4 `question.md`, `output-schema.md`, `evidence-index.md`, the five Stage-3 panel outputs, and the 20 Stage-3 evidence files. Answer the whole common question with the emphasis assigned to your slot. Do not read Stage-4 peer or judge reports. Follow the hard rules in `question.md`; propose hypotheses with falsifiers; do not invent numbers or provide hazardous operating instructions; no novelty, patentability or safety claims. Return only your own slot's report in the required schema.

### 4c. Outputs

Save raw reports unchanged to:

```
panels/batch-01/stage-4/round-01/worker-a.md
panels/batch-01/stage-4/round-01/worker-b.md
panels/batch-01/stage-4/round-01/worker-c.md
panels/batch-01/stage-4/round-01/judge.md
```

If more than one service is used for slot B, name the files `worker-b_<Service>.md`; both are Slot B contributions, not two votes. Do not rewrite worker text during import. Preserve dissent.

---

## 5. Slot emphasis

| Slot | Emphasis |
|---|---|
| A | Chemistry and material design: polymer speciation/quality, solvent/antisolvent selection, thermal limits, MW/DoS effects, characterization limits |
| B | Contaminant control and sink design: nicotine/TSNA/PAH/metal partitioning, assay endpoints, waste classification/routing, product-contact exposure |
| C | Integration, balances, energy, cost and scaling: explicit-basis mass/energy balances, equipment/permitting reality, closed-loop boundaries with purge, dilution accounting |

---

## 6. Operator acceptance checklist

Do **not** mark Stage 4 accepted unless all of the following are true and recorded in `state/workflow.yaml`:

1. All three worker reports are present, raw, and each states `packet_version: v1.0`, the packet commit from `COMMIT.txt`, and its own slot.
2. The judge report is present and was produced after all three reports.
3. The judge states model/service identity or `unknown`, and discloses any model-family reuse.
4. You have read the proposals, failure modes and falsifiers yourself, not only the judge's summary.
5. You make an explicit decision: **accept**, **request a bounded revision** (max two rounds), or **reject**.
6. Your statement is recorded verbatim.

Acceptance of Stage 4 is a scientific-panel decision, not a safety certification, not approval of any process, and not a novelty/patentability opinion. No laboratory validation exists. No experiment is authorized.

---

## 7. Known limits to state in the launch message

- The batch is six purpose-selected families, not a worldwide landscape.
- No independent contaminant assay, leachate test, emission measurement or LCA report was located for any operator (Stage-3 confirmed).
- Stage-3 slot-B external fetches are retrieval leads pending official texts.
- The Stage-3 reports' model identities are self-reported.
- Stage-4 output is hypothesis generation with falsifiers, not validation.
