# Start or resume

Permanent message:
> Read START_HERE.md and resume the workflow in AUTO mode.

Read AGENTS.md, charter.md, WORKFLOW.md and state/workflow.yaml. OPERATOR_GUIDE.md is the human walkthrough. Files direct an AI session; they do not launch models, schedule background work, supply credits or bypass approvals.

AUTO: continue unfinished Stage 1 units into Stage 2 until its manual gate or a real resource limit. At Stage 3, prepare/check the packet and stop for human-launched A/B/C and judge. After accepted Stage 3, prepare Stage-4 packet and stop again. After accepted Stage 4 without a blocking decision, continue Stage 5 to desk synthesis. Never impersonate a three-model panel or restart Harvest after finishing.

Checkpoint/read back after every unit and before interruption. On resume compare state to actual outputs; continue partial work, do not redo it because the model changed. Save via an approved patch/commit or return a handoff bundle; unsaved chat narration is not persisted state.

Explicit panel commands: PANEL stage=3 slot=A (B/C), JUDGE stage=3, IMPORT stage=3; likewise stage=4. These execute only the assigned contribution, not AUTO. Fixed full commands and acceptance rules are in FUSION_PROTOCOL.md. One AUTO writer at a time.

## After the research project
When Stage 5 is desk_complete, surface the deferred presentation task in post-project/tasks.yaml and read post-project/dashboard-spec.md. It is not a sixth research gate and must never delay or restart Stages 1-5. Record that a reader/dashboard remains planned, not built. Implementation needs a separately authorized post-project session; public deployment additionally requires an explicit content/privacy and hosting approval. On later resume use that saved brief rather than asking the operator to invent another prompt.

## Continuity and source access
AUTO/IMPORT coordinators first read operator/PROJECT_CONTEXT.md, then reconcile actual state. PANEL workers must NOT read operator/ or peer outputs; they use only the frozen packet. JUDGE uses only explicitly approved judge inputs. PACKET_ACCESS.md gives exact paths and safer transport choices without adding scientific evidence. Model/output commits never replace the frozen input commit.
