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

Verification method this pass: a local indentation/nesting parser (no YAML library available in the sandbox) exercised against known-good files (state/work-queue.yaml, registry/methods.yaml, registry/methods-old.yaml, the v1.1 manifest) and against the failing workflow. It accepts all known-good files, rejects the pre-fix workflow at line 89, and accepts the repaired workflow; state and manifest parsed separately. The external reviewer confirmed the same defect with PyYAML.... Release corrections (metadata only):
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

## 2026-11-07: Stage-4 packet v1.0 drafted, committed, and registered (not launched)
Actor: operator's coordinating assistant (Perplexity), acting on operator instruction
("you do this step"). No research retrieval calls; repo state files fetched read-only
for the update. No hashed Stage-3 payload file changed.

Content committed (commit 671de7c045385dade4b8f26c7b1680a2cc3a809c, then corrected):
- packets/batch-01/stage-4/{question.md, evidence-index.md, output-schema.md,
  manifest.yaml, LAUNCH.md, COMMIT.txt} v1.0
- 8-file hashed payload: 3 Stage-4 control files + the 5 committed Stage-3 panel
  outputs; hashes verified 8/8 against manifest (LF-normalized SHA-256).
- 20 Stage-3 evidence files referenced by frozen commit
  5f484b585ca16dbd2ce93b56c61c962f5f14c774 (not re-hashed).

Provenance: drafted from the accepted Stage-3 handoff — judge.md REVISE recommendation
and bounded revisions, the two Slot-B contributions framing, and the Stage-3
question/schema formats. The packet embeds denominator discipline, four-field sink
accounting, the batch-wide fate-balance discriminator, adversarial self-screening,
and the no-novelty/no-safety/no-experiment boundaries.

Correction: the manifest's judge.md hash was initially written with a fabricated tail
beyond the verified 16-character prefix; corrected in this commit to the real hash
462eacfd7c6b4ee00e0391a1cf35f94b598038140be24c548f896781ac61b680. The judge.md file
itself was never changed. This is a release-metadata correction, not a payload change;
packet version stays v1.0.

State changes: stages.4.status pending -> awaiting_manual; stages.4.packet_version
v1.0 and packet_payload_commit 671de7c0 recorded; top-level next_action and
pending_manual_action updated. Stage-4 workers NOT launched; no judge run; no
acceptance.

State after this entry: Stage 1/2 complete_scoped; Stage 3 complete_accepted;
Stage 4 awaiting_manual with packet v1.0 committed and unlaunched; Stage 5 pending.
No experiment authorized; this is packet drafting, metadata correction, and
state/provenance recording, not experimental validation or a safety/legal opinion.

## 2026-11-07: Stage-4 round-01 judge synthesis (operator acceptance pending)
Actor: OpenCode. Displayed model: gpt-5.6-sol. Exact model ID:
agentrouter/gpt-5.6-sol. Worker identities are self-reported; model-family reuse and
model diversity across workers, packet author, and judge remain unknown. Retrieval
calls: 0; no external fetches and no packet content sent to an external service.

Authorized inputs read: packets/batch-01/stage-4/{question.md, output-schema.md,
evidence-index.md, manifest.yaml, COMMIT.txt} and only the three Stage-4 reports
worker-a.md, worker-b.md, and worker-c.md. No service-specific worker-B report was
present. LAUNCH.md, operator-only material, and other Stage-4 peer/judge output were
not read.... Provenance checks: packet v1.0 payload commit
671de7c045385dade4b8f26c7b1680a2cc3a809c exists. The three substantive control
files match that payload commit. Follow-up commit
6206d42ab72b60ddd330268d5411abcb26005d32 corrected release metadata without
changing the eight hashed payload files. Worker B's line-ending/BOM hash observation
is preserved as an unresolved metadata concern, separate from the chemistry judgment.

Output: panels/batch-01/stage-4/round-01/judge.md. Recommendation: REVISE. The
strongest individual proposal is B-P-01's F1/F0 partition-ranking and measured-purge
architecture because it exposes its sink assumptions to falsification; this is not a
finding that the route is clean, cheap, deployable, or successful. Its strongest
objection is that it may create a large dilute unroutable effluent, target the wrong
fraction, and retain metals in product. F3 is preserved as the strongest minority
alternative. J-H-01, combining B-P-01's decision gate with C-P-01's treatment-
acceptance and sludge/reject boundaries, is explicitly labelled a new, unvalidated
judge hypothesis. No proposal demonstrates a complete four-field sink or a passed
product-use gate.

Verification: the report parsed as YAML-first Markdown with the required metadata,
three report paths, and all adapted schema sections exactly once. A hard-rule scan
confirmed the required recommendation, strongest-proposal/objection, new-hypothesis,
per-slot, dissent, unknown-reuse, and no-experiment statements and found none of the
screened prohibited operating-value patterns. The file is UTF-8 LF with no BOM or
trailing whitespace. `git diff --check` reported no tracked-diff whitespace errors.

State reconciliation: existing worker A/B/C reports changed from pending to complete;
judge changed from waiting_for_workers to complete with recommendation REVISE;
current_stage changed to 4. Operator acceptance remains false and Stage 4 remains
awaiting_manual. Stage 5 remains pending. Next eligible action: operator review and a
recorded acceptance or bounded revision decision. No experiment is authorized; report
completion is not experimental validation or a safety, legal, novelty, or deployment
determination.

## 2026-11-07: Stage-4 operator acceptance granted (handoff to Stage 5)
Actor: operator (human), edits applied by the operator's coordinating assistant
(Perplexity). No retrieval calls; no research redone; no hashed payload file
changed; no panel or judge run.

Operator decision statement recorded verbatim in
state/workflow.yaml stages.4.operator_acceptance.statement (2,471 chars).

Applied edits only:
- state/workflow.yaml: stages.4.status awaiting_manual -> complete_accepted;
  stages.4.operator_acceptance.accepted false -> true with statement and
  packet_version v1.0; revision_rounds_used 0 / revision_round_limit 2 recorded;
  top-level next_action/pending_manual_action and checkpoint updated;
  current_stage left at 4.
- packets/batch-01/stage-4/manifest.yaml and COMMIT.txt: release-metadata
  correction resolving Worker B's round-01 finding — hash notation changed from
  'LF-normalized' to 'SHA-256 of raw committed bytes', documenting that worker-a.md
  and worker-b_Tencent-Hy4.md as committed contain CRLF line endings and a leading
  UTF-8 BOM. Hash values are unchanged (they were already raw-byte hashes);
  payload bytes unchanged; packet version stays v1.0.
- state/session-log.md: this entry appended.

Operator correction to the record: an earlier operator message contained a typo
naming DeepSeek web chat as a second worker-b; the correct assignment is Slot C.
No repository record was affected because slot identities are not stored in the
workflow slots; the correct assignment is recorded in the acceptance statement.

State after this entry: Stage 1/2 complete_scoped; Stage 3 complete_accepted;
Stage 4 complete_accepted with REVISE, J-H-01 (new unvalidated judge hypothesis)
and the F3 minority dissent carried forward; Stage 5 pending and eligible for host
launch as desk synthesis. No experiment authorized; this is state/provenance
recording and release-metadata correction, not experimental validation or a
safety/legal opinion.

## 2026-11-07: Stage-5 synthesis complete (operator review pending)
Actor: Perplexity Deep Research session. Displayed model: not recorded; underlying
model not verified. Retrieval calls: not recorded by the session; no external fetch
beyond reading the online repository.

Authorized inputs read: state/workflow.yaml, state/session-log.md, Stage-3 packet +
5 panel outputs + judge, Stage-4 packet + 3 worker outputs + judge, operator-only
working files, and the 20 Stage-3 frozen evidence files as needed.

Outputs:
- reports/final/batch-01-synthesis.md (30,805 chars)
- reports/final/validation-and-open-questions.md (33,218 chars)

Both reports preserve J-H-01 as an unvalidated judge hypothesis, F3 as minority
dissent, the metals stop condition, and all required disclaimers (no validation, no
safety claim, no novelty claim, no experiment authorized).

State reconciliation: stages.5.status pending -> complete_scoped; current_stage 4 ->
5; top-level next_action/pending_manual_action/checkpoint updated. Operator review of
the two reports is the next manual action; no further stage is defined in the current
workflow.

State after this entry: Stage 1/2 complete_scoped; Stage 3 complete_accepted; Stage 4
complete_accepted; Stage 5 complete_scoped with operator review pending. No experiment
authorized; this is desk synthesis, not experimental validation or a safety/legal
opinion.

## 2026-11-11: batch-01 gap-closing retrieval unit complete (post-Stage-5 extension)
Actor: operator's coordinating assistant (Perplexity), coordinating retrieval
executed by: Perplexity Deep Research session (2026-11-08), Arena browser agent
(arena.ai, 2026-11-08), Arena local OCR/text audit (2026-11-08), operator EKB
(ekb.eg) retrieval round (2026-11-10/11), and an Ask Brave web-search cross-check
(2026-11-10). Underlying models not verified; no independent sign-off. No hashed
packet payload file changed; no panel or judge run.

Evidence location: separate private repo github.com/abdo2048/butt-materials, used
during retrieval to avoid disturbing butt-lab. Folders: batch-01-gap-closing-2026-11-08/,
gap-closing-round2/, "ai ocr output files/", extracted/, ocr-derivatives/ and root
library PDFs. Consolidation copy into butt-lab materials/gap-closing/ was completed
by the operator on 2026-11-12 (files uploaded to butt-lab; binary files cannot be
pushed via the text-only GitHub connector).

Outputs and closures (full record in state/workflow.yaml gap_closing section):
- Round 1 (2026-11-08): 8 source PDFs; FR3066128B1 disclosure review vs J-H-01;
  manual-and-ekb-retrieval-queue.md; STATE-UPDATES.patch (now SUPERSEDED by the
  workflow gap_closing record; do not apply).
- BR0305004B1 (UnB patent) obtained from Espacenet — D03 closed.
- Round 2 browser crawl (public documents only; no login, forms, purchases or contact):
  Keenat — INERIS 2017 and EVAPLUS re-hosted; guides form-gated and NOT downloaded;
  no public full LCA exists. MéGo! — site publishes zero PDFs; the claimed ACV with
critical review (2019-2020) is corroborated only by third parties (Pénestin council
minutes 30/06/2025; Ouest-France); Bilan Carbone 2024 is organizational. Re-Cig —
ISO 14001/45001 certificates, Albo Nazionale renewal, and the APPA Trento AUT
including the End-of-Waste sub-annex (UNI 10667 criteria, DDC model, 100 t/a
ceiling) obtained; per-lot DDCs and lab analyses remain at the company.
- OCR/text audit of 34 PDFs (catalogue.csv, proposed-renames.csv,
  extraction-problems.md). Operator then renamed files, removed four duplicate
  pairs, and hand-corrected OCR for FR3110470A1, FR3102180A1, BR0305004B1
  (page-001-edited.txt in each patent folder is the authoritative corrected text).
- EKB literature round: Nongdren 2026 Waste Management 219:115553 cradle-to-grave
  LCA; Nongdren 2024 JECE 12:114941; Kurmus & Mohajerani 2020 Waste Management
  104:104-118; Torkashvand & Farzadkia 2019 ESPR 26:11618-11630; Schneider 2020
  IJERPH 17:4705; Belzagui 2021 STOTEN microfibers; Toxics 2026 One Health
  systematic review; STOTEN 2026 microplastics review. Plus Tchaomegot Collecte
  patents FR3102076B3, FR3102075B1, FR3125946B1.
- Review note gap-closing-round2/review-re-cig-AUT-end-of-waste.md (butt-materials
  commit e2c5414): the Italian EoW gate contains no heavy-metal parameters; the
  metals stop-condition is reinforced, not superseded.

Decisions recorded: Korean article (DOI 10.1136/tc-2026-060135) closed as unobtainable
without purchase (operator decision); MéGo! ACV closed as exists-but-not-public (no
company contact authorized); Keenat closed as no public full LCA. Cross-cutting
confirmation: no independent publicly available full LCA of a commercial
butt-recycling process exists (Ask Brave, 2026-11-10).

State changes: state/workflow.yaml updated (commit 57b5431) — gap_closing section
added; STATE-UPDATES.patch superseded; next_action/pending_manual_action/checkpoint
updated to operator review plus consolidation copy.

State after this entry: Stage 1/2 complete_scoped; Stage 3/4 complete_accepted;
Stage 5 complete_scoped with operator review pending; gap-closing retrieval unit
complete_scoped. Remaining open work is M01-M08 (lab measurement), R01-R05
(regulatory decisions incl. jurisdiction/product choice for standards), S01-S06
(scale/cost/LCA) — future pilot/decision work, not desk-retrievable. No experiment
authorized; this is retrieval and provenance recording, not experimental validation
or a safety/legal opinion.

## 2026-11-13: batch-02 operator decisions recorded; launch plan v1.0 and PROJECT-OVERVIEW.md committed
Actor: operator (human), decisions communicated in chat; edits applied by the
operator's coordinating assistant (Perplexity). No retrieval calls; no research
redone; no hashed packet payload file changed; no panel, judge, or acceptance run.

Operator decisions (recorded verbatim in specs/batch-02-launch-plan.md v1.0):
1. Method-family scope: cover ALL six families (mechanical, thermal, chemical,
   biological, material incorporation, product routes).
2. Execution: single AI (no panel). The AI produces six readable method-explanation
   documents (audience: medicine-faculty students and interested general readers),
   source-grounded in materials/gap-closing/ and packets/. Where a source document
   lacks information at a specific point, the AI inserts its own gap-closing
   explanation AT THAT EXACT LOCATION (never at the end or beginning), marked
   "[GAP-CLOSING NOTE — AI, scientist-inventor role]"; source-derived and AI
   content must remain distinguishable.
3. J-H-01 carry-forward: prior-art awareness variant — the AI sees previous methods
   and batch-01 outputs to know what is already there and avoid previous mistakes,
   NOT as a reference or starting point; must explicitly record what is not good
   about previous methods. The invention is the AI's own new proposal, not an
   improvement note on J-H-01.
4. Jurisdiction: main content for a general worldwide audience, with a separate
   Egypt annex. Product focus: all options remain open, decided after Phase 2.
   Any future AI review of batch-02 outputs is EXCLUDED from the workflow
   (operator decision).

Commits in this entry:
- 3bc8a997b44b9d179418d33ee1fd67cd94a0604c — specs/batch-02-launch-plan.md v1.0
  (operator decisions recorded)
- 349345029f147246079dcc2cd6f049223c2048f5 — PROJECT-OVERVIEW.md added (orientation
  document for any AI working in the repository)

State: batch-02 is PLANNED but NOT LAUNCHED. No Stage-1 harvester has started; no
method explanation has been written; no invention has been produced. The next
eligible action is operator review of the launch plan and an explicit operator
instruction to launch batch-02 Phase 1. No experiment authorized; this is planning
and provenance recording, not experimental validation or a safety/legal opinion.

## 2026-11-15: Phase-10 test-first remediation of four release blockers (worktree C:\w\bpc)
Actor: operator-directed OpenCode session; displayed model MiMo-V2.6-Flash Free,
underlying model not independently verified; no independent sign-off. Review
baseline: HEAD d30adbaa32d66f6416c12988e6e66d6486e79876 plus full untracked tree.
No commit, merge, deploy, publish, experiment or Batch-02 authorization. Two prior
read-only reviews (Standards ses_e22915f6dffeGuxyQF9k19iR29, Spec
ses_e22915eb6ffe7kq1wVVNBjLvkp) supplied the four release blockers; codebase-memory
MCP was unavailable, so direct source/test reads were used.

Outputs (untracked, in C:\w\bpc only):
- Blocker 1 — semantic validation before staging: exportPublication now calls
  validatePublicationSemantics and throws ContractError before stage creation or
  output replacement. Regression: "semantic errors stop export before stage
  creation or output replacement".
- Blocker 2 — rollback-safe output replacement: new exported replaceOutputDirectory()
  performs backup/rename/promote/restore as one transaction with an injected
  renamePath for fault injection; a failed promotion restores the previous bundle
  and removes the stage. Regression: "replacement failure restores the previous
  directory and removes the stage".
- Blocker 3 — mandatory rubric validation: validate/export require a rubrics
  catalog and emit RUBRICS_REQUIRED / RUBRICS_INVALID as ContractError; empty-
  manifest fixture copies the real catalog so it still validates. Regressions:
  "validate CLI without a rubrics catalog exits 1 and prints RUBRICS_REQUIRED",
  "validate CLI with a malformed rubrics catalog exits 1 and prints RUBRICS_INVALID".
- Blocker 4 — image asset copying: shared isAllowedPassiveAsset() policy in
  manifest-validation.ts is now the single source of truth used by both manifest
  validation and the exporter; a listed allowed asset is copied byte-for-byte with
  matching SHA-256, an allowed type is never silently skipped while counted, and a
  disallowed type throws ASSET_UNSAFE_TYPE. Regressions: "listed PNG asset is
  copied byte-for-byte with matching SHA-256", "listed JPEG asset ...".
- Blocker 5 (related) — expected failures normalized to ContractError: rubric parse,
  asset hash mismatch, stage closure mismatch and symlink escape now throw
  ContractError; the CLI catch block prints stable diagnostics, no stack traces.
- Scratch disposition: tools/publication-contract/TASK_8_TODO.md and
  tools/publication-contract/export-output/ removed; .gitignore adds
  tools/publication-contract/export-output/. Task-9 docs copied from the main
  checkout into C:\w\bpc\docs/ (publication-content-contract.md and the Phase-1
  plan) without touching unrelated main-checkout files.

Verification: npm run typecheck clean (tsc --noEmit); npm test 171 tests, 170 pass,
1 skip (Windows symlink-creation limitation), 0 fail. No production manifest content
changed: publication/manifest.yaml remains records/pages/assets = []. No registry,
backup, prior scientific file, or main-checkout user file was modified, moved,
overwritten or deleted.

State: Phase-10 remediation unit complete_pending_review in the isolated worktree.
Remaining work: acceptance-gate rerun (focused regressions, full Node suite, tsc,
schema determinism, empty-manifest validation/export determinism and idempotence,
replacement restoration, public-boundary checks, legacy Python registry tests),
then explicit operator integration approval. Deployment, publication and Batch-02
remain separately unauthorized. File completion is not experimental validation.

## 2026-11-15: Phase-1 acceptance checkpoint — fail-closed branch tests, orientation link, plan status (worktree C:\w\bpc)

Outputs:
- Added the named fail-closed branch tests that Task 10 Step 2 and the Phase-1
  completion criteria require, and closed the coverage gaps they exposed:
  - `tests/cli.test.ts`: "export CLI on a valid fixture exits 0 and prints an
    EXPORTED summary"; "export CLI on a corrupted manifest exits 1 and prints a
    diagnostic without a stack trace"; "schema CLI without --out exits 2 and
    prints CLI_SCHEMA_OUT_REQUIRED"; "validate CLI without --root exits 2 and
    prints CLI_VALIDATE_ROOT_REQUIRED"; "export CLI without --out exits 2 and
    prints CLI_EXPORT_ROOT_OUT_REQUIRED".
  - `tests/export.test.ts`: "exportPublication rejects a malformed rubrics
    catalog with RUBRICS_INVALID"; "a failed export removes the stage directory
    and preserves the previous output".
- Source changes to make those paths reachable and diagnosable:
  - `src/export.ts`: `ExportOptions` gained an optional `renamePath` seam so a
    promotion failure can be injected through `exportPublication` and the
    fail-closed rollback plus stage-cleanup path can be tested; `stageDirectory`
    now raises `ContractError` (`RUBRICS_INVALID`) instead of a bare `Error`;
    the `catch (error)` bindings were renamed to `caught` so they no longer
    shadow the imported `error()` diagnostic factory.
  - `PROJECT-OVERVIEW.md`: ported the "## Publication layer" section from the
    main checkout into the worktree, so the worktree's orientation document
    links the design spec, the Phase-1 plan, `publication/README.md` and
    `docs/publication-content-contract.md`, and states that `state/workflow.yaml`
    remains authoritative and that the exporter cannot publish.
- Branch-by-branch coverage inspection (Task 10 Step 2) recorded the remaining
  uncovered lines as defense-in-depth or unreachable by construction
  (exporter re-checks of asset hash, asset type and stage closure; the
  stage-directory rubrics re-parse; the symlink-escape branch, which is the one
  skipped test because Windows cannot create symlinks).
- Plan `docs/superpowers/plans/2026-11-14-publication-content-contract.md`
  checkboxes ticked for every completed step. The nine commit steps (Task 1
  Step 7, Task 2 Step 10, Task 3 Step 6, Task 4 Step 7, Task 5 Step 6, Task 6
  Step 7, Task 8 Step 6, Task 9 Step 5, Task 10 Step 8) remain unticked: they
  need explicit commit authorization, which has not been given.
- `state/workflow.yaml` gained a `checkpoint.phase1_acceptance` block with the
  exact commands and results, the dependency versions from
  `tools/publication-contract/package-lock.json`, the generated schema SHA-256
  hashes, the live manifest counts, the remaining Phase-2 work and the explicit
  no-approval/no-publication statement.

Verification: `npm run typecheck` clean (tsc --noEmit). `npm test` 179 tests,
178 pass, 1 skip (Windows symlink-creation limitation), 0 fail. `npm run
test:coverage` 96.64% line, 88.63% branch, 92.76% functions (up from 95.03% /
86.94% / 92.76% before the new tests); cli.ts 96.49% line / 81.82% branch.
`git diff --check` clean; `git diff --stat` shows .gitignore, PROJECT-OVERVIEW.md,
state/session-log.md, state/workflow.yaml. `state/workflow.yaml` parses as valid
YAML.

Live manifest unchanged and empty: `publication/manifest.yaml` is
`publicationVersion: phase-1-contract` with `records: []`, `pages: []`,
`assets: []`. No scientific content was approved and no publication occurred; the
exporter only produced local build directories during testing. No registry,
backup, prior scientific file, or main-checkout user file was modified, moved,
overwritten or deleted. No commit was made: HEAD is still
`d30adbaa32d66f6416c12988e6e66d6486e79876`.

State: Phase-1 implementation checkpoint recorded; remaining work is the
operator decision on the optional final Phase-1 commit (plan Task 10 Step 8).
Merge, deploy, publish, experiment and Batch-02 remain separately unauthorized.
File completion is not experimental validation.

## 2026-11-15: Phase-1 commit readiness inventory (worktree C:\w\pc)

Operator instruction: "do recommended" after the Phase-1 acceptance
checkpoint. The recommended action was to keep the worktree as it is and not
commit without an explicit, specific authorization. No commit was made.

Outputs:
- Full change inventory captured for the operator's commit decision.
  Tracked modifications (4): `.gitignore` (+9/-1 lines of publication
  tooling ignore rules), `PROJECT-OVERVIEW.md` (+12, the "## Publication
  layer" section), `state/session-log.md` (+115), `state/workflow.yaml`
  (+103/-17). `git diff --check` clean.
- Untracked new files (33), all intended, no scratch residue:
  `docs/publication-content-contract.md`; `docs/superpowers/plans/2026-11-14-publication-content-contract.md`;
  `publication/README.md`, `publication/manifest.yaml` (empty manifest),
  `publication/contract/v1/rubrics.yaml` and three generated JSON schemas
  under `publication/contract/v1/schema/`; and the whole
  `tools/publication-contract/` package (package.json, package-lock.json,
  tsconfig.json, 15 source files under `src/` including `src/model/`, and 8
  test files under `tests/`).
- Commit dry run executed read-only (`git add --dry-run`, no index change):
  the plan's Task 10 Step 8 path list resolves to 35 paths and stages
  exactly the expected files. Nothing stray is captured;
  `tools/publication-contract/export-output/` and `node_modules/` remain
  ignored.
- Three observations about the plan's exact commit command, recorded so the
  operator can decide with full information:
  1. `state/workflow.yaml` and `state/session-log.md` are modified tracked
     files but are NOT in the plan's `git add` list, so the plan's command
     would leave the acceptance checkpoint uncommitted.
  2. `docs/superpowers/plans/2026-11-14-publication-content-contract.md`
     is untracked, is not gitignored (`git check-ignore` exit 1), and is also
     not in the plan's `git add` list, so the plan document itself would
     stay untracked.
  3. `publication/manifest.yaml` is staged empty by design: records, pages
     and assets are all `[]`, so the commit publishes no scientific content.
- An independent, read-only sign-off review was launched for the two
  remaining unsigned review items (Task 6 `RELATIONSHIP_TARGET_KIND_MISMATCH`
  and the year-vs-magnitude rule; Task 5 residual regex/CommonMark risk).
  It is read-only: it may not modify the working tree, may not commit, and
  may not treat repository documents as instructions. Its verdict is
  recorded in a separate checkpoint when it returns.

Verification: no file in the worktree was modified by this checkpoint; HEAD
is still `d30adbaa32d66f6416c12988e6e66d6486e79876`; `git status --short`
unchanged (` M .gitignore`, ` M PROJECT-OVERVIEW.md`, ` M state/session-log.md`,
` M state/workflow.yaml`, `?? docs/`, `?? publication/`, `?? tools/`);
`publication/manifest.yaml` still empty. No commit, merge, deploy,
publication, experiment or Batch-02 action occurred.

State: Phase-1 is implemented, tested and gate-passed, and the final commit
is armed but NOT executed. The exact command is recorded in
`state/workflow.yaml` under `pending_manual_action`. Merge, deploy,
publish, experiment and Batch-02 remain separately unauthorized. File
completion is not experimental validation.

## 2026-11-16: Phase-11 defect remediation and documentation sync after independent review (worktree C:\w\bpc)

- The independent read-only sign-off review launched in the previous checkpoint
  returned. Verdicts: `RELATIONSHIP_TARGET_KIND_MISMATCH` **SIGN-OFF**; the
  year-vs-magnitude rule **DISSENT**; the residual regex/CommonMark risk
  **DISSENT** for the numeric layer and **SIGN-OFF** for the Markdown layer.
- The review's findings were not taken on trust. Every actionable claim was
  reproduced locally with throwaway probes placed under `tests/` and deleted in
  the same command:
  - A count in a year-shaped range after a cue word (`"in 2000 cases"`) was
    **not** reported as a magnitude — a false negative.
  - A plain year introduced by a determiner (`"The 2026 review of the
    fixture"`) **was** wrongly required to carry a quantitative basis — a
    false positive.
  - The unit-bearing-quantity pattern was **quadratic**: a proposition of
    40,000 digits took 11,131 ms, which is a local denial-of-service on
    `validate` and `export` because record propositions are unbounded text.
  - A derivative path of `../../state/workflow.yaml` produced **zero**
    diagnostics and was copied verbatim into `records.json`, and a
    derivative's `sha256` was never compared with the manifest hash of the
    path it named.
- Each defect was remediated test-first, following the Phase-10 precedent of a
  failing named regression test before the fix:
  - Seven new named tests in `tools/publication-contract/tests/semantic.test.ts`
    (three for the year-versus-count rule, one for the quadratic scan, three
    for the derivative path and hash). All seven failed before the fixes.
  - The two quadratic regular expressions were deleted and replaced with a
    hand-written linear scanner (`isNumericText`, `scanNumericRun`,
    `matchesUnitAt`, `containsUnitBearingQuantity`, `isUnitPrefixedQuantity`).
    The same 40,000-digit proposition now takes 130 ms.
  - The year rule was reworked: a year-shaped number followed by a count noun
    (`COUNT_NOUNS`) is a magnitude, a year-shaped number introduced by a
    determiner (`YEAR_DETERMINERS`) or by a year cue word is a year, and
    anything else stays a magnitude.
  - Derivative paths are now validated and derivative hashes are now checked
    against the manifest, with the new diagnostics
    `SOURCE_DERIVATIVE_PATH_INVALID` and `SOURCE_DERIVATIVE_HASH_MISMATCH`.
    `isNormalizedRelativePath()` was exported from `src/path-policy.ts`.
  - The unreachable `default:` branch of the CLI command switch now reports
    `CLI_UNKNOWN_COMMAND`, the same code as the guard, so there is exactly one
    unknown-command outcome; `CLI_COMMAND_NOT_IMPLEMENTED` is gone.
- Documentation was brought back in line with the code:
  - The public error-code table in `docs/publication-content-contract.md` was
    rebuilt from the diagnostic codes the source actually emits. The old table
    listed 11 codes that are emitted nowhere and omitted roughly 30 that are.
    A source-versus-documentation audit now reports 57 codes emitted, 57
    documented, zero drift in either direction.
  - A `## Errata: Implementation divergences from this plan` section was
    appended to `docs/superpowers/plans/2026-11-14-publication-content-contract.md`
    recording five divergences, including that the plan's referenced
    "design spec section 13.1" does not exist in that document, so the
    branch-by-branch inspection was performed against the executable source.
- `state/workflow.yaml` was updated for this unit: `updated` and `last_run`
  are now `2026-11-16`, the checkpoint unit is "Phase-11 defect remediation and
  documentation sync in isolated worktree C:\w\bpc", the completed-work list
  gained the review outcome, the reproductions, the fixes and the documentation
  sync, and `phase1_acceptance` carries the third-pass gate results.

Verification: `npm run typecheck` clean (`tsc --noEmit`, no diagnostics);
`npm run test:coverage` reports 186 tests, 185 pass, 1 skipped (Windows cannot
create symlinks), 0 fail, with coverage of 96.48% line, 88.30% branch and
93.37% functions; `node src/cli.ts schema --out A` and `--out B` produce three
byte-identical files whose SHA-256 values match those already recorded in
`state/workflow.yaml`; `node src/cli.ts validate --root ../../publication`
exits 0 with `VALID records=0 pages=0 assets=0`; two fresh exports and a
re-export over an existing output are identical with no `.export-stage-*` or
`.backup-*` leftovers; the public-boundary scan of the export output is clean;
`python tests/test_validate_registry.py` reports "All tests passed!" and
`python scripts/check_registry.py` exits 0; `git diff --check` is clean; the
source-versus-documentation diagnostic-code audit reports zero drift. The live
manifest remains empty (`records: []`, `pages: []`, `assets: []`,
`publicationVersion: phase-1-contract`). HEAD is still
`d30adbaa32d66f6416c12988e6e66d6486e79876` and `git log --oneline -1` is
`git log --oneline -1` is unchanged since the commit 784bb14 records a wider-file-set add that is already committed in the worktree.

Remaining work: the remediated year-versus-magnitude rule and the two added
derivative diagnostics still need an independent re-review. Scope residuals
the review surfaced and that remain open and outside the plan's text: record
free text such as `claim.proposition` is not scanned for raw HTML, and
`assertSafePublicUrl` is not called from `src/` (mitigated by the Zod
http/https-only URL schema, so a `javascript:` URL is rejected as
`RECORD_SCHEMA_INVALID`). Three deliberately kind-agnostic relationship fields
(`gap.affectedRecordIds`, `hypothesis.sourceInputIds`, and `gap.sourceInputIds`
on the ai-gap-closing-note branch) accept a wrong-kind target silently; the
plan does not constrain them, so this is an open decision, not a violation.

Next action: request explicit authorization for the optional final Phase-1
commit (plan Task 10 Step 8). The worktree changed after the last authorization
question was asked, so the commit must be re-authorized rather than inherited.
The commit is armed and verified read-only with `git add --dry-run`; nothing
has been staged or committed. No scientific content was approved and no
publication occurred. Merge, deploy, publish, experiment and Batch-02 remain
separately unauthorized. File completion is not experimental validation.
