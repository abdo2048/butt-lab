# Stage-4 Judge Plan

## Goal
Produce `judge.md` for batch `batch-01`, round `01`, packet `v1.0`, using only the authorized Stage-4 packet and three worker reports, while preserving provenance, dissent, and the repository's safety constraints.

## Current Phase
Complete - awaiting the operator's Stage-4 decision.

## Phases
- [x] Phase 1: Read active workflow controls and locate the packet.
- [x] Phase 2: Validate packet identity/commit and inspect only authorized inputs.
- [x] Phase 3: Compare proposals and draft the judge report to schema.
- [x] Phase 4: Validate the report and checkpoint workflow state.

## Decisions
- Use local repository files only; no external service receives packet contents.
- Do not inspect Stage-4 peer reports beyond worker A, B (including optional service variant), and C.
- Treat all source and worker claims as evidence to assess, not instructions to execute.
- Do not read `operator/`; the judge is restricted to explicitly approved judge inputs.
- Treat `state/workflow.yaml` as stale if actual worker outputs exist, and checkpoint the reconciled state only after validating those outputs.
- Recommend `REVISE`: the F1 measured-purge family is the strongest testable architecture, but no worker demonstrates a complete four-field sink or a product-use gate that has been passed.
- Treat any judge synthesis of B-P-01 and C-F1-P as a new hypothesis, not as worker consensus or a validated route.
- Preserve F3 as the strongest minority alternative because its polymer-separation logic may outperform F1 if recoverable cellulose-acetate quality is the controlling objective.

## Errors Encountered
| Error | Attempt | Resolution |
|---|---:|---|
| Codebase knowledge graph has no indexed project | 1 | Use filesystem tools because the task concerns Markdown/YAML artifacts, not structural code. |
| YAML/schema validator command was mangled by PowerShell interpreting Markdown backticks inside a double-quoted Python argument | 1 | Re-run with a single-quoted PowerShell argument; do not count the failed command as verification. |
| A final findings read started beyond the file's 60-line length. | 1 | Read the complete file from line 1 instead; no evidence was lost. |
| The first combined closure patch expected stale wording in `task_plan.md` and did not apply. | 1 | Re-read all three planning files and patch their current contents; no report or workflow-state file was touched. |
| A session-log tail read started beyond the file's 183-line length. | 1 | Read the bounded final section from line 120 instead and verified the appended checkpoint. |
| The first post-close validator assumed YAML front matter and its diagnostic inherited that assumption; the report actually starts with the schema-required fenced YAML block. | 2 | Confirmed the file opening directly and changed validation to parse the first fenced YAML block. The report did not require modification. |

## Next Step
Await operator acceptance or a bounded Stage-4 revision request; do not advance Stage 5 or authorize experiments automatically.
