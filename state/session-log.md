# Session/handoff log

Append dated task IDs, actual outputs, provenance, access limits and next eligible work. Completion is not experimental validation.

## 2026-11-02: bounded research batch
Base: 86241b82785486a28c4148474eaf2d2d82e6e653. Actor: Perplexity assistant, same author as earlier drafts; underlying model not specified. No independent sign-off.
R001-R004 outputs prepared: gap check, partial pressurized reference, three-route comparison, three untested hypotheses. Chinese B claims and paper publisher/PMC checked. FR French/alternate/WO English and known A PDF fetches failed; no B PDF or graph digitization obtained. No author contacted.
Next: R005, candidate review. Registries/backup, old notes/specs/reviews, code/tests and historical tracker unchanged. Separate approved persistence is required; this log alone is not proof of a commit or experiment.

## 2026-11-03: AUTO Stage 1 completion + Stage 2 scoped reconstruction + Stage-3 packet freeze
Base: fda66af351a37d38287792ed3b578a258eedf7fc. Actor: Arena Agent Mode session (single logical Harvester then Deep-dive). Displayed model: not recorded by the session; underlying model not verified. Retrieval calls: 20 of a 24 ceiling (web search + page/PDF fetch; no patent-office register).

Outputs:
- Stage 1: reports/stage1/company-source-map.md (10 operator entities incl. Code Effort, TerraCycle, BuffIndia, TchaoMegot, Keenat, MeGO!, Re-Cig, Poiato/UnB, CNR, Cerdia; collector/processor split; inconsistencies logged), coverage-ledger.md (queries, backends, languages, failures, patent-status and duplicate ledgers, deferred list), batch-selection.md (6 units, criteria, exclusions).
- Stage 2: reconstruction-index.md, assumption-and-gap-ledger.md (A-01..A-07, K-01..K-06, C-01..C-08, G-01..G-20, registry proposals not applied), new specs mego-fr3066128a1, keenat-fr3110470a1, unb-pi0305004 and company-workflow-dossiers-batch01.md. Existing three specs re-read and reused without edits.
- Packet: packets/batch-01/stage-3/{question.md, evidence-index.md, output-schema.md, manifest.yaml} v1.0, SHA-256 hashes verified against file bytes.

Findings of note (all source-scoped, none experimentally validated):
- UnB patent number located: PI 0305004-1, filed 2003-10-06, granted 2014-11-11; term-expiry 2023-10-06 is arithmetic, not a legal opinion.
- Keenat patent discloses 80-100 C dry/depollution plus extruder compounding at 10-30% filter loading; this conflicts with the inherited "~200 C" description. Both retained.
- Re-Cig discloses an external wastewater purification partner (not a closed loop) and a ~39% polymer yield on collected mass (company figures).
- TchaoMegot's press-quoted 50/60 bar lies below CO2 critical pressure; the patent's preferred 280-320 bar is retained as disclosure, not verified operation.
- Code Effort, TerraCycle and BuffIndia have no located patent; chemistry remains undisclosed or single-interview sourced.
- No independent contaminant assay, leachate test, emission measurement or LCA report was located for any operator.

State: Stage 1 complete_scoped; Stage 2 complete_scoped; Stage 3 awaiting_manual; Stage 4-5 pending. No registry, backup, prior scientific file, code or test was modified. No company contact, purchase or experiment. No panel or judge was run and no model diversity is claimed.

Next eligible work: operator attaches the frozen packet to three separate sessions, runs PANEL stage=3 slots A/B/C, then JUDGE, then IMPORT, then records actual acceptance or a bounded revision (max two rounds). Registry version proposals await separate host approval and a validator run.

Persistence: packet v1.0 frozen in commit 0c0b6f2ff900a1866a0ed456c87e78661fa2f4ea on branch arena/68dd04e3-butt-lab. This records a repository commit; it is not scientific acceptance and not experimental validation.

## 2026-11-04: bounded packet-QC pass — v1.0 withdrawn, v1.1 frozen, Stage 3 still awaiting_manual
Branch: arena/c998d19c-butt-lab (from main 5f71baab). Actor: same AUTO worker as v1.0; this is self-correction after external review (review supplied 2026-11-04), not independent re-verification. Retrieval calls this pass: 0 (no new harvesting).

Basis: external readiness review of snapshot 5f71baab / head dd4bc6c / frozen v1.0 content 0c0b6f2, plus reviewer reply. Review's own limits recorded: 3 of 18 content hashes recomputed; Keenat patent not independently fetched.

Corrections (full table in reports/stage2/errata-packet-v1.0.md, E-01..E-18):
- E-01/E-02 provenance: reconstruction-index no longer credits the reused CN106928486 spec with the granted B-claim 75-95 C / 2-4 h distinction; that distinction lives in reports/gap-check-01.md, which is now in the packet. Re-reading is explicitly not re-verification.
- E-03..E-10 framing: UnB described as deacetylation (chain depolymerisation not established); "most concentrated effluent" superlative withdrawn; Keenat's boiling-point argument replaced with residence-time/atmosphere reasoning and element-specific volatility; 80-100 C confined to step b; TerraCycle "no cleaning disclosed" not "no cleaning occurs"; CNR "cleanest" and Re-Cig "most honest" rankings withdrawn; SC-CO2 no longer called "non-thermal".
- E-11/E-16 metadata: manifest now separates repo_baseline_commit, v1_0_content_commit and content_commit; ellipsized URLs expanded; Matteri deferral rests on thin disclosure, not withdrawn status; inherited family groupings and secondary cautionary notes labelled as such.
- E-12..E-15 counting: 20-row invocation log (chunk fetches and failed fetch counted); five calculations K-01..K-05 with K-06 marked withdrawn; 7 evidence files + 4 control files; peer-reviewed/patent/offering source types separated.

Packet v1.1: packets/batch-01/stage-3/{question.md, evidence-index.md, output-schema.md, manifest.yaml, LAUNCH.md}. 20 files listed and hashed (SHA-256 verified 20/20 at freeze). v1.0 preserved at 0c0b6f2 and explicitly excluded from launch. LAUNCH.md states the full bundle (control files alone are insufficient) and the fixed PANEL/JUDGE/IMPORT commands.

State: Stage 1 complete_scoped; Stage 2 complete_scoped; Stage 3 awaiting_manual, packet v1.1, A/B/C pending, judge waiting, operator acceptance false, revision rounds 0 (this was pre-launch QC, not a panel revision). No registry, backup, prior scientific file, code or test was modified. No panel, judge or acceptance was run. Nothing here is experimental validation or a safety/legal opinion.

## 2026-11-04: v1.1 release repair — YAML parse blocker, bundle counts, payload/metadata retrieval
Branch: arena/59a1ec66-butt-lab (from main b81223b, PR #2 merged). Actor: same AUTO worker. No retrieval calls; no research redone; no hashed payload file changed.

External review finding: state/workflow.yaml did not parse. Three lines added after stages.2.outputs_required were indented as a sequence under the mapping rather than as entries of that list. Reproduced locally at line 89 (the same line PyYAML reported). Repaired. The earlier "YAML structure checked" statement was too weak: it checked indentation parity, not nesting. This entry supersedes that claim.

Verification method this pass: a local indentation/nesting parser (no YAML library available in the sandbox) exercised against known-good files (state/work-queue.yaml, registry/methods.yaml, registry/methods-old.yaml, the v1.1 manifest) and against the failing workflow. It accepts all known-good files, rejects the pre-fix workflow at line 89, and accepts the repaired workflow; state and manifest parsed separately. The external reviewer confirmed the same defect with PyYAML.

Release corrections (metadata only):
- Bundle accounting reconciled: manifest.files = 20 hashed payload entries (3 control + 17 evidence). LAUNCH.md's old "18 evidence / 21 entries" and the state's "4 control + 16 evidence" were wrong. Release bundle = 20 payload + 3 release-metadata files (manifest.yaml, LAUNCH.md, COMMIT.txt) = 23 files; 5 protocol files optional.
- Payload/metadata retrieval separated: payload commit 5f484b5 contains the 20 hashed files; COMMIT.txt was added later (33c6c37, merged in b81223b), so metadata must come from the release snapshot, not the payload commit alone. Worker header records packet_commit 5f484b5.
- LAUNCH.md adds a self-contained panel instruction for chats without repository access; the repository-style commands remain.
- Residual stronger prose (Korean comparator, Keenat "direct precedent", CO2 "no solvent wash") documented in manifest reading_limits for the panel; not silently rewritten, because that would change hashed payload and require a new version.
- In-file unit headers that still say v1.0 are documented as stale labels; the v1.1 label refers to corrected content hashes, and the errata is authoritative.

State: Stage 1/2 complete_scoped; Stage 3 awaiting_manual; packet v1.1 payload unchanged; A/B/C pending; judge waiting; acceptance false; revision rounds 0. No registry, backup, prior scientific file, code or test modified. No panel, judge or acceptance run.

## 2026-11-06: Stage-3 panel import (operator acceptance recorded, not yet accepted)
Actor: IMPORT clerk. No retrieval calls; no research redone; no hashed payload file changed; no commit, stage or push.

Operator instruction: import stage=3 batch=batch-01 round=01; operator acceptance not yet granted.

Verification performed before writing:
- All five panel files exist, are readable, and are byte-identical to `panels/batch-01/stage-3/round-01/operator-only/report-receipt.json`: worker-a.md (ca1e05eb…, 13,398 B), worker-b_Z-GLM5.3.md (08315239…, 40,449 B), worker-b_Tencent-Hy4.md (4bd572b1…, 56,788 B), worker-c.md (0a5dc920…, 32,962 B), judge.md (462eacfd…).
- All five cite packet v1.1 / payload commit 5f484b585ca16dbd2ce93b56c61c962f5f14c774, consistent with state and manifest. `git cat-file -t` confirms the commit exists.
- `git status --porcelain` showed only `?? panels/` and two temporary verification scripts; no tracked file was modified before this entry.
- Tencent report tail (lines 169-194) read in full: its own [1]-[27] reference definitions are self-contained, confirming the missing hy4-citation-map.md is non-blocking.
- operator-only/README.md, JUDGE-PROMPT.md and report-receipt.json reviewed; they frame the two B reports as two independent contributions to one Slot B, not two roles or votes.

Changes applied to state/workflow.yaml (Stage 3 block only):
- slots.A / slots.C: pending -> complete.
- slots.B: pending -> complete, with `output` set to the GLM report and a new `contributions` list holding both B reports (operator-required correction replacing the single "and"-valued string).
- judge: waiting_for_workers -> complete, with `recommendation: REVISE` recorded.
- operator_acceptance: `accepted: false` retained; `packet_version: v1.1`; `statement` set to the operator decision text verbatim (1,322 chars). accepted was NOT set true; the operator has not yet approved the final import.
- revision_rounds_used 0, revision_round_limit 2, blocking_decisions [] unchanged.

Stage 4 left untouched: status pending, slots A/B/C pending, judge waiting_for_workers, operator_acceptance accepted false. Stage 4 was not advanced and is not authorized to start.

Cleanup: temporary scripts butt-lab/__verify.py and butt-lab/__verify2.py deleted.

State after this entry: Stage 1/2 complete_scoped; Stage 3 awaiting_manual with panel/judge complete and operator acceptance RECORDED but accepted=false; Stage 4 pending; Stage 5 pending. No registry, backup, prior scientific file, code or test modified. No experiment authorized; this is archival import, not experimental validation or a safety/legal opinion.

## 2026-11-06: Stage-3 operator acceptance granted (handoff to Stage 4)
Actor: operator (human). No retrieval calls; no research redone; no hashed payload
file changed; no commit, stage or push. Operator decision statement recorded verbatim
in state/workflow.yaml stages.3.operator_acceptance.statement (1,322 chars).

Applied local edits only:
- state/workflow.yaml: stages.3.status awaiting_manual -> complete_accepted;
  stages.3.operator_acceptance.accepted false -> true; top-level status and
  next_action/pending_manual_action/remaining/last_actor/last_run updated to reflect
  completed Stage-3 acceptance and the pending Stage-4 handoff; current_stage left at 3.
- state/session-log.md: this entry appended.

State after this entry: Stage 1/2 complete_scoped; Stage 3 complete_accepted with
operator acceptance granted; Stage 4 pending (not started); Stage 5 pending. No
experiment authorized; this is state/provenance recording, not experimental
validation or a safety/legal opinion.
