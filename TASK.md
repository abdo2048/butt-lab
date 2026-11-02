# Task entry point

Read START_HERE.md, AGENTS.md, charter.md, and state/work-queue.yaml.
Perform the first queued task whose dependencies are complete_bounded.
The queue replaces this file's previous fixed source-review assignment, which is already recorded in reviews/source-reconstructions-review-01.md.
One bounded task per session; save/read back its output, update queue and session log in the proposed patch, then stop. Keep the registries read-only. Do not ask for a new prompt when the queue contains an eligible assignment.
