# Archive

Historical scaffolding from the original five-stage desk cycle (batch-01) and the
early reader build. Kept for provenance, not as a working workflow. Nothing here is
read by the reader build or the publication contract; the active record lives in
`sources/`, `registry/`, `reports/batch-02/`, `reports/final/`, `inventions/`,
`materials/`, `publication/` and `tools/`.

Moved here on 2026-11-23 to give the repository one clear front door
(`README.md` → `GLOSSARY.md` → `charter.md`), implementing the structure proposed in
the plan-agent message `msg_1f7eb91f70013w7hBBdmLPWllU` ("one shelf, one glossary,
one door, everything else archived"). Files were moved with `git mv`, so history
follows them.

| Item | What it was |
| --- | --- |
| `START_HERE.md`, `WORKFLOW.md`, `TASK.md`, `OPERATOR_GUIDE.md`, `PROJECT-OVERVIEW.md` | Old entry-point / orientation documents, superseded by `README.md` and `state/workflow.yaml`. |
| `FUSION_PROTOCOL.md`, `PACKET_ACCESS.md`, `CHECKPOINT-MASTER.md`, `CHECKPOINT-WEB-AI.md` | Batch-01 red-team / packet / checkpoint scaffolding. |
| `panels/`, `packets/`, `dossier/` | Batch-01 worker briefs, panel outputs and consolidated company files. |
| `specs/` | Source reconstructions and the batch-02 launch plan (batch-02 is accepted; these are its provenance). |
| `agents/` | The five role prompts (Harvester, Deep-dive, Red-team, Inventor, Synthesizer). |
| `experiments/`, `post-project/`, `reviews/` | Early planning and review scaffolding. |
| `reports-stage1/`, `reports-stage2/` | Batch-01 stage 1–2 reports (moved from `reports/stage1`, `reports/stage2`). |

`docs/history/` stays where it is: it is the frozen historical record and is
referenced by `charter.md`, `AGENTS.md` and `state/workflow.yaml`.

Internal cross-references between archived files are historical and were not
rewritten. References from active files were updated to the new `archive/` paths.
The publication validator and the release audit still reject audit references and
path leaks into `archive/`, exactly as they did for the original directories.
