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

## 2026-11-16: Batch-02 desk cycle complete — method explanations, invention sketch, Egypt annex (main checkout)

### Outputs

Nine deliverables written under `reports/batch-02/`, all following the launch plan in
`specs/batch-02-launch-plan.md` (v1.0, operator decisions recorded 2026-11-13):

| Path | Content |
| --- | --- |
| `reports/batch-02/methods/f0-staged-washing.md` | Staged water/ethanol washing (batch-01 family F0, De Fenzo 2020) |
| `reports/batch-02/methods/f1-mechanical-physical.md` | Mechanical/physical separation and aqueous washing (MéGo! FR3066128A1, Re-Cig) |
| `reports/batch-02/methods/f2-thermal.md` | Dry treatment and extrusion composite (Keenat) |
| `reports/batch-02/methods/f3-chemical.md` | Solvent dissolution and recovery (CN/CNR/Cerdia) |
| `reports/batch-02/methods/f4-biological.md` | Biological treatment |
| `reports/batch-02/methods/f5-material-incorporation.md` | Incorporation into material matrices |
| `reports/batch-02/methods/f6-product-routes.md` | Product-route survey across families |
| `reports/batch-02/invention.md` | Phase-2 invention sketch with four-field sink accounting |
| `reports/batch-02/egypt-annex.md` | Egypt annex, unvalidated observations only |

Each method-family document covers overview, mechanism, feedstock requirements, contaminant
fate, energy and water use, product quality, regulatory status, cost signals, evidence
quality, four-field sink accounting, and a bottom line. Each carries 6–8 inline
`> **[GAP-CLOSING NOTE — AI, scientist-inventor role]**` markers at the points where source
data is missing, so the reader can see exactly where evidence stops and reasoning begins.

### Guardrails held

- No experiment was run or authorized. Batch-02 is a desk cycle only.
- No claim that any family is clean, detoxified, safe, commercially validated, or
  environmentally superior — no family has dry-mass, analyte-resolved contaminant-fate,
  leaching, or use-specific performance evidence.
- The metals stop-condition remains in force.
- Four-field sink accounting is required and is reported per family; no family closes all
  four fields.
- Prior-art awareness only. No novelty or patentability search was performed and no such
  claim is made.
- The invention sketch is proposed, not accepted; it is a hypothesis awaiting the
  measurement that could kill it. No independent three-model panel and no judge packet were
  run (single-AI execution).
- The Egypt annex records unvalidated observations and makes no recommendations.

### Authorization basis

The operator directly instructed "start batch-02" after batch-01 had been closed as a desk
investigation. The batch-01 Stage-5 acceptance states "A new cycle (batch-02) may be planned
separately; it is not authorized by this acceptance", so this instruction is the separate
authorization. It covers desk research only. Reader application, publication, experiment,
pilot, and deployment are NOT covered and each remains separately unauthorized.

### Verification

- `state/workflow.yaml` parses as valid YAML; a new top-level `batch_02:` block records
  authorization, status (`complete_pending_operator_decision`), cycle, execution mode, plan
  reference, `ran: '2026-11-16'`, the nine deliverables, the guardrails held, outcome,
  `no_experiment_authorized: true`, provenance, and the evidence basis.
- All nine deliverable paths were confirmed to exist on disk; the launch plan path resolves.
- Batch-01 history is preserved unmodified: `stages` 1–5, `checkpoint`, `gap_closing`, and
  `legacy` are unchanged. `checkpoint.last_run` still reads `2026-11-12` because it is the
  batch-01 Stage-5 record; batch-02 provenance lives in `batch_02.last_run`.
- No new retrieval was performed for this desk cycle; the evidence basis is the accepted
  batch-01 synthesis, the gap-closing evidence, `registry/methods.yaml`, and the Stage-2
  source reconstructions.
- No commit was made in the main checkout. The batch-02 files are new untracked work and
  remain uncommitted pending explicit authorization.
- Worktree `C:\w\bpc` (commit `784bb14`) was not modified; it holds the separate Phase-1
  publication content contract work.

### Remaining work / next action

The operator's desk-record decision on the batch-02 outputs is the next action and belongs
to the operator alone — accept or reject. Accepting these documents is a desk-record
decision only, not experimental validation, safety approval, novelty determination, or
deployment authorization. The main-checkout planning files (`task_plan.md`, `progress.md`,
`findings.md`) still need to be updated to record this cycle. File completion is not
experimental validation.

## 2026-11-16: Batch-02 handoff brief added for an external AI to work the evidence gaps (main checkout)

- **New file:** `reports/batch-02/HANDOFF-BRIEF.md`. Written at the operator's request so the current state can be uploaded to another AI that will start working on the evidence gaps.
- The brief records the finding behind the request: across all seven method families the same evidence gaps recur — **no dry-mass basis, no analyte-resolved contaminant fate, no leaching data, and no use-specific performance evidence** — and no family closes all four required sink fields.
- It also carries the numbered gap agenda from the accepted batch-01 validation agenda: M01–M08 measurement (by stream and analyte), R01–R05 jurisdiction and regulatory, S01–S06 scale, cost and energy, each stated explicitly as future pilot/decision work and not as retrieval work.
- Contents: authority chain (`START_HERE.md` → `WORKFLOW.md` → `charter.md` → `state/workflow.yaml` → `state/session-log.md`); the accepted batch-01 evidence base; the nine batch-02 deliverables with one-line descriptions and a warning that batch-01 families F0–F5 do not map one-to-one to the batch-02 filenames f0–f6; the central finding; the four-field sink requirement; the M/R/S gap agenda; the metals stop-condition; the evidence vocabulary (source-supported / inference / new-assumption / `parameter-not-located`) and the gap-closing-note convention; the known limitation that batch-02 was single-AI execution with no panel and no judge packet; and an explicit may-do / may-not-do boundary.
- Boundary stated in the brief: the receiving AI may retrieve evidence, extend gap-closing work, and draft measurement and pilot plans **as proposals**. Closing a measurement gap requires an authorized experiment that does not exist, so the correct output for each gap is a proposed measurement with its decisive test named. The brief does not authorize any experiment, pilot, field trial, declaration that a family is clean/safe/validated/superior/patentable/costed, freedom-to-operate or regulatory determination, publication, deployment, merge, or reader application.
- `state/workflow.yaml` `batch_02:` block now lists the handoff brief as a deliverable, records `handoff_brief: reports/batch-02/HANDOFF-BRIEF.md`, and restates the central finding in `outcome`. The YAML re-parses cleanly and all deliverable paths still resolve.
- No scientific content was approved and no publication occurred. No commit, merge, deployment, or experiment happened. The operator's accept/reject desk-record decision on the batch-02 deliverables is still theirs to make.

## 2026-11-16 — Batch-02 handoff package verified complete for external upload (main checkout)

- Final verification of `state/workflow.yaml`: valid YAML; batch-01 stages 1-5 all intact and unmodified; `ALL_DELIVERABLES_EXIST` true for all ten `reports/batch-02/` paths (seven method-family explanations, the invention sketch, the Egypt annex, and the handoff brief); `PLAN_EXISTS` true for `specs/batch-02-launch-plan.md`; `gap_closing.status: complete_scoped`; `permissions.experiments: not authorized`; `checkpoint.last_run` still `2026-11-12` because the batch-01 checkpoint block is a historical record and was deliberately not rewritten.
- Final verification of `reports/batch-02/`: ten files confirmed on disk totalling 85.3 KB, of which `HANDOFF-BRIEF.md` is 18.1 KB and `methods/f1-mechanical-physical.md` is 10.6 KB.
- The handoff package is complete and discoverable: the authoritative state (`state/workflow.yaml` `batch_02:` block), the session log, and the root planning files (`task_plan.md`, `progress.md`, `findings.md`) all name `reports/batch-02/HANDOFF-BRIEF.md` and the recurring cross-family evidence gaps.
- The central finding is recorded in every location: no dry-mass basis, no analyte-resolved contaminant fate, no leaching data, and no use-specific performance evidence for any of the seven families; every family fails at least one of the four required sink fields; the metals stop-condition remains in force.
- The honest limitation is recorded everywhere the package is named: this cycle ran as a single AI execution with no three-model panel and no judge packet, so the in-document guardrails carry the entire epistemic load, and no retrieval was re-performed.
- No commit, merge, deployment, publication, or experiment occurred. The accept/reject desk-record decision on the batch-02 deliverables belongs to the operator and has not been made. Reader application, publication, experiment, pilot, merge, deployment and push each remain separately unauthorized.

## 2026-11-16: Phase-14 evidence-gap continuation — M01 measurement-plan proposal recorded (desk-only)

**Unit:** Phase 14, the desk-only evidence-gap continuation opened on the operator's direct instruction to read `reports/batch-02/HANDOFF-BRIEF.md` and `state/workflow.yaml` and continue the work. Desk research only. **No experiment was authorized, run or performed.**

### Outputs

| Path | Bytes | What it is |
|---|---|---|
| `reports/batch-02/evidence-gaps/M01-feed-partition-measurement-plan.md` | 39 224 | The M01 measurement-plan proposal. Unvalidated. |
| `reports/batch-02/evidence-gaps/README.md` | 4 258 | Index of the gap-continuation series, with the may-do / may-not-do boundary restated from §10 of the handoff brief. |

### What the M01 proposal contains

It is a written specification of a measurement written before any data exist, so that the measurement would be interpretable if it were ever run. It defines: the question, the estimand (the accepted partition-fraction convention \(f_{i,s}=m_{i,s}/m_{i,\mathrm{feed}}\), ranking total analyte mass per feed-analyte mass and not concentration alone); an explicit measurement model with units, including the independent whole-butt reference so that the unresolved residual \(u_i\) is a genuine closure check rather than an identity; the experimental unit (the butt) with the nesting of fraction, preparation and determination inside it, and the pseudoreplication guard stated for the record; a randomized complete block design blocked on the feed lot, with the full nuisance-factor table (lot, site, storage interval, moisture, analytical day/analyst/instrument crossed with butt rather than nested, run order, separation efficiency, fines loss, carryover, matrix interference, and the pre-specified fines particle-size boundary with a sensitivity aperture); the accepted analyte panel (nicotine, identified TSNAs including NNN/NNK where appropriate, representative PAHs, and each of Cd/Pb/As/Hg separately); the analytical quality-control requirements per analyte class, including that ICH Q2(R2) supplies almost no numeric acceptance criteria and that they must come from the laboratory's own specification before data are seen, the named-approach and confirmation rule for detection and quantitation limits, the rule that below-QL is reported as `<QL` and never as zero or a substituted value, and the mandatory between-day component of intermediate precision; a GUM uncertainty budget with an estimate, standard uncertainty, distribution and degrees of freedom for every input, the correlations to be carried rather than assumed away, uncertainty rounded before the value, and a magnitude sanity check; the controlling-fraction decision rule including the two honest negatives (a ranking that the data cannot separate is reported as **not located**, and an analyte whose quantitation limit exceeds its mass in the candidate fraction is reported as **not quantifiable at the required boundary**); seven falsifiers; and a six-gate sample-size decision procedure (feasibility, target quantity, minimum important difference, computation with the block structure respected, sensitivity range rather than a single n, and pre-registration).

### Guardrails held

- No experiment was authorized, run or performed. No sample collected, no material handled, no measurement made, no number in the document is a result.
- No sample count, acceptance criterion, detection or quantitation limit, recovery figure or method-performance value was selected. Each is `parameter-not-located` pending a qualified-lab feasibility study and a defensible power and precision justification. The minimum important difference is defined procedurally and left to the investigators before feasibility data are examined.
- No operating instructions: no pressure-vessel, solvent-recovery, distillation, caustic-pulping or hazardous-waste-processing directions; no sample-preparation recipe; no DIY substitution.
- No claim that any family or proposal is clean, detoxified, safe, commercially validated, environmentally beneficial, novel, patentable, deployable or costed.
- The metals stop-condition remains in force. M01 would locate where the metals are and would decide nothing about acceptability.
- The four-field sink requirement is unchanged. M01 bears on fields 1 and 2 only, and only at the feed boundary.
- M02–M08, R01–R05 and S01–S06 are untouched.
- Dissent preserved. The F3 minority position, the wrong-stream and dilute-purge objection, the unsolved-metals objection and the F2 dilution and off-gas warning all survive. If M01 located the burden in tobacco or ash rather than the cellulose-acetate filter, that would **redirect** which family architecture deserves attention; it would refute nothing.
- Prior-art awareness only. No novelty or patentability search was performed and none is claimed.
- `batch_02.status` remains `complete_pending_operator_decision`. This continuation does **not** accept the batch-02 deliverables on the operator's behalf.

### Verification

- `state/workflow.yaml` parses as valid YAML after the edit (`YAML_OK`). Top-level keys are `version, updated, base_commit, batch, current_stage, execution, status, next_action, pending_manual_action, checkpoint, legacy, stages, gap_closing, batch_02, evidence_gap_continuation, permissions`.
- `batch_02.status: complete_pending_operator_decision` unchanged; `batch_02.deliverables_count: 10`; all ten batch-02 deliverable paths still resolve.
- `evidence_gap_continuation` recorded with 8 guardrails and 4 open decisions; both new deliverable paths exist on disk (39 224 and 4 258 bytes).
- Batch-01 history preserved: `stages` keys `1,2,3,4,5` intact; `gap_closing.status: complete_scoped`; `legacy.preserved_queue: state/work-queue.yaml`; the batch-01 `checkpoint:` block untouched (`unit: Stage-5 batch-01 desk synthesis accepted; batch-01 closed`, `last_run: '2026-11-12'`).
- `permissions.experiments: not authorized`; `permissions.external_writes: host approval required`.
- One retrieval call was made in this unit: an arXiv metadata lookup required by the citation rule of the design, power, analytical-validation and uncertainty skills. It returned no evidence about cigarette-butt recycling and closed no gap. `retrieval_calls_used: 1` of a ceiling of 24.

### Remaining work

- **M01 is open.** A file is not a measurement. The proposal names four decisions that must be settled before any measurement could begin: the minimum important difference in partition fraction; the feasibility sub-study that produces the between-butt and between-block variability and the matrix-specific analytical precision the sample-size gate depends on; the fraction definitions and the fines particle-size boundary with its sensitivity aperture, fixed before data exist; and the analytical target profile with the per-method acceptance criteria, which the qualified laboratory must set from its own specification before data are seen.
- The remaining M02–M08, R01–R05 and S01–S06 gaps are untouched and are not closed by this proposal.
- The batch-01 metadata and hash-normalization provenance follow-up remains open and is not silently closed.
- The batch-02 accept/reject desk-record decision remains the operator's alone.

### Next action

Wait for the operator's direction on the next gap proposal, or on the M01 feasibility sub-study specification (Gate A). Do not accept the batch-02 deliverables on the operator's behalf. Do not commit in the main checkout. Do not start an experiment, pilot, reader application, publication, merge, deployment or push — each remains separately unauthorized. No scientific content has been approved and no publication has occurred. File completion is not experimental validation.

**Provenance:** evidence base is the accepted batch-01 record only — `reports/final/validation-and-open-questions.md`, `reports/batch-02/HANDOFF-BRIEF.md`, `reports/batch-02/invention.md`, `reports/batch-02/methods/f1-mechanical-physical.md`, `specs/batch-02-launch-plan.md`, `charter.md`, `WORKFLOW.md`, `START_HERE.md`. No new primary source was retrieved for this unit. Last actor: operator-directed OpenCode session (displayed model MiniMax M3.1 Flash Free; underlying model not verified).

### Repository state at the end of the Phase-14 unit

Main checkout HEAD is now `3d76367 adding plan`, an operator-authored commit of 2026-11-16 (author `an <abdoabushahba@gmail.com>`) that contains the ten batch-02 deliverables, `reports/batch-02/HANDOFF-BRIEF.md`, the publication-contract documents, `PROJECT-OVERVIEW.md`, the root planning files and the state files. It was made by the operator, not by this continuation.

The isolated worktree commit `784bb14 feat: add publication content contract` remains on the branch `feat/publication-content-contract` and is **not** an ancestor of main (`git merge-base --is-ancestor 784bb14 HEAD` exits 1). Its file contents reached main through the operator's own commit rather than through a merge of that branch. The worktree at `C:\w\bpc` is unchanged by this continuation and remains the authoritative location for the branch.

This continuation added no commit and staged nothing. Working tree at the end of the unit: ` M findings.md`, ` M progress.md`, ` M state/session-log.md`, ` M state/workflow.yaml`, ` M task_plan.md`, and untracked `reports/batch-02/evidence-gaps/`. Committing these is a separate operator decision.

## 2026-11-16: Phase-15 evidence-gap continuation — M01 Gate-A feasibility sub-study specification recorded (desk-only)

**Unit:** Phase 15 of the evidence-gap continuation. Desk research only. **No experiment was run or authorized, no sample was collected, no material was handled and no measurement was made.**

### Outputs

| File | What it is |
|---|---|
| `reports/batch-02/evidence-gaps/M01-gate-a-feasibility-sub-study-specification.md` | The Gate-A feasibility sub-study specification: the six planning quantities Gate A must produce, the design able to estimate them, six probes with quality controls and uncertainty treatment, seven pre-stated decision rules, eight falsifiers, and the seven items only a qualified laboratory can supply. |
| `reports/batch-02/evidence-gaps/README.md` | Updated: index row for the new document, an expanded next-step section, and a record table of this continuation. |

### Contents

- **What it is and is not.** A written specification a laboratory could be asked to execute and an operator could be asked to authorize; not an authorization, not a protocol to execute, not an answer to M01, not a result.
- **The failure mode it is built around.** The feed is the object of interest *and* the source of the answer, so a "the filter fraction dominates" impression can be a method artefact (fines loss, carryover, matrix suppression) rather than a property of feed. Every probe is paired with the control that would expose that artefact.
- **Six outputs, each an estimate with an interval:** between-butt SD of the partition fraction; within-butt preparation and analytical SD; the between-block variance component; dry-matter closure and separation recovery with uncertainties; censoring frequency per matrix and fraction; the observed spread of moisture and storage interval.
- **Design.** The **butt** is the experimental unit; **feed lot** is the block; **day, analyst and instrument are crossed** with butt so between-day precision is estimable and unconfounded; the storage interval is deliberately varied so moisture and storage spread are estimated rather than assumed; the **analysis scale** is fixed per analyte before data exist; the fraction set is pre-specified with a pre-specified **sensitivity aperture**, so a partition that moves when the cut moves is reported as aperture-dependent rather than as a result.
- **Six probes:** separation recovery and mass closure; dry-matter determination; matrix spike recovery (matrix appropriateness); per-matrix detection and quantitation limits with a named approach and a confirmation; between-day precision reported separately from within-day; carryover, blanks and run-order.
- **Pre-stated decision rules R1–R7** and **falsifiers F1–F8**, both written before any data could exist.
- **The honest outcome the study is allowed to produce:** *"the measurement system cannot support M01 as currently framed."* No rule compares the feasibility intervals against the M01 question, because the precision target and the minimum important difference are decided afterwards; that separation keeps the sample size from being chosen after the data are seen.
- **What only a laboratory can supply:** the analytical target profile that supplies the acceptance ranges the rules test against, the validated or verification-characterised methods, the written separation procedure, the facility and the lawful contaminated-waste handling, the analysts and instrument records, the traceable feed lots, the storage-interval range and moisture endpoint condition, and the cost and resource estimate.

### Guardrails held

- No sample count, recovery figure, acceptance limit, detection or quantitation limit, threshold or expected value was selected. The structural minimums recorded are **identifiability requirements** (at least two lots, two days, two independent preparations, two injections, two butts per lot per analysis day), not sample-size recommendations; every count remains `parameter-not-located`.
- No operating instructions: no sample-preparation recipe, no reagent or instrument settings, no separation protocol, no solvent-recovery, distillation, caustic-pulping or pressure-vessel direction, no hazardous-waste-processing guidance, no DIY substitution, no clearance by odour, appearance or FTIR alone.
- The metals stop-condition remains in force; Gate A can locate metals and cannot judge acceptability.
- The four-field sink requirement is unchanged; Gate A bears on sink fields 1 and 2 only, and only at the feed boundary.
- Dissent preserved: the F3 minority position, the wrong-stream and dilute-purge objection, the unsolved-metals objection and the F2 dilution and off-gas warning all survive.
- Prior-art awareness only; no novelty or patentability search was performed and none is claimed.
- Publication boundary: a Gate-A output could reach a reader only through an explicitly approved publication-manifest entry carrying a validation state of `requires-human-validation` until a human accepts it. Desk-research completion is not experimental validation.
- No number was inherited from the batch-01 worker reports; the accepted record forbids carrying over worker sampling counts and illustrative method-performance values.

### Verification

- `state/workflow.yaml` parses as valid YAML (`YAML_OK`).
- `state/workflow.yaml` → `evidence_gap_continuation`: `phase: 15`; `deliverables` now lists three paths; `guardrails_held` extended with three Phase-15 gates; `outcome` rewritten for two proposals; `open_decisions` rewritten to five; `evidence_basis` extended with the reader-platform design vocabulary.
- `batch_02.status` unchanged at `complete_pending_operator_decision`; all ten batch-02 deliverables still resolve; batch-01 `checkpoint:` and `stages:` 1–5 unchanged; `permissions.experiments: not authorized` unchanged; `permissions` still the final block.
- All three `reports/batch-02/evidence-gaps/` files present on disk.
- `git status --short` shows only the expected modified state and planning files plus the untracked evidence-gaps folder. **No commit, no staging, no merge, no push.**
- No new retrieval was performed for this unit; `retrieval_calls_used` remains 1 for the continuation (the arXiv metadata lookup that satisfied the skills' citation requirement, which returned no evidence about cigarette-butt recycling).

### Remaining work and next action

- M01 remains open. Two files are not a measurement, and no sample count exists.
- The four decisions this project cannot make stand: the minimum important difference, the precision target, the fraction definitions and fines aperture, and the analytical target profile. A fifth now joins them: whether to authorize, resource and receive any laboratory work at all.
- M02–M08, R01–R05 and S01–S06 are untouched. The batch-01 hash-normalization provenance follow-up remains an operator-owned records matter.
- The operator's accept/reject desk-record decision on the batch-02 deliverables is still outstanding and is not made here. Committing this continuation in the main checkout is a separate operator decision.
- Next: await the operator's direction on the next gap proposal (M02 onward), or on authorizing the decisions above.

### Provenance

Derived entirely from the accepted batch-01 record, the Batch-02 deliverables, the M01 plan, and the operator-approved reader-platform design. No new primary source was read. Methodological discipline (blocking and randomization; the experimental unit and the pseudoreplication guard; pre-stated criteria and between-day precision; named-approach detection and quantitation limits with confirmation; the GUM budget with per-input distribution and degrees of freedom; no invented effect size and a sensitivity range rather than a single n) follows the experimental-design, statistical-power, analytical-method-validation and uncertainty-and-units skills, whose required reference is recorded in the document and repeated to the operator.

## 2026-11-16: Reader platform opened — Task 1 reconciles the content contract with the reader-platform design (worktree C:\w\rp)

**Outputs.**

- `C:\w\rp` — a new isolated worktree on branch `feat/reader-platform`, based on `main` at `3d76367` with the content contract cherry-picked as `4ed09b0`.
- `docs/superpowers/plans/2026-11-16-butt-lab-reader-platform.md` — the six-task plan covering the reader-platform design's phases 2 to 4, with six recorded rulings.
- `docs/publication-content-contract.md` §11 — the contract-to-design reconciliation audit.
- `tools/publication-contract/src/semantic-validation.ts` — two new diagnostics.
- `tools/publication-contract/tests/semantic.test.ts`, `tests/export.test.ts`, `tests/helpers.ts`, `tests/cli.test.ts` — the named tests and the fixture change.
- `state/workflow.yaml` — a new top-level `reader_platform:` block.

**What was audited, and what changed.** The reader-platform design specification requires rules that the content contract has to enforce. The audit read the contract end to end and classified each rule:

- *Already enforced, no change needed.* Only an `approved` record may enter the publication manifest (`RECORD_NOT_APPROVED`, raised before the record is loaded, so a draft or excluded record can never reach the bundle). Inclusion is not transitive: records load only from manifest entries, so a relationship to an unlisted record fails with `RELATIONSHIP_TARGET_UNLISTED`, `CLAIM_SOURCE_REQUIRED`, `INFERENCE_PREMISES_REQUIRED` or `ASSESSMENT_SUPPORTING_CLAIM_UNLISTED`, while audit references stay outside the relationship model as the design's public-safe escape hatch. Every output file is accounted for by manifest-derived closure (`STAGE_CLOSURE_MISMATCH`). A local artifact is blocked without `public-local-copy` rights (`SOURCE_LOCAL_COPY_RIGHTS_INVALID`).
- *Fixed, one assessment per criterion per method.* Nothing prevented two assessments answering the same criterion for the same method, and nothing required a published method to carry an answer for every catalog criterion. The comparison surface has exactly one cell per (method, criterion) pair, so a duplicate is a contradiction and a hole reads as silence. Two diagnostics were added — `ASSESSMENT_DUPLICATE_CRITERION` and `ASSESSMENT_CRITERION_MISSING` — checked across the loaded record set, and the test fixture method now carries all eight criteria so that a missing answer is recorded explicitly with the `unknown` status rather than omitted.
- *Fixed, the local-artifact rights rule is now proved.* The rule was enforced but no test proved it: the fixture declared a placeholder asset hash, so the export failed on the hash before it could fail on the rights and the test passed for the wrong reason. Two named export tests now build a fixture whose asset hash is correct, so the rights branch is the only thing that can fail the export — one for `rights-unresolved`, one for `link-only`.
- *Deferred, recorded rather than coded.* A generated-schema drift guard for the content-kind enum, and deriving the claim content kind from the canonical `CONTENT_KINDS` constant. The schema already contains exactly the five canonical kinds, so this would only characterize existing behaviour.

**Verification.** `npm run typecheck` clean. `npm test` — 189 tests, 188 pass, 1 skipped (Windows cannot create symlinks), 0 fail. Schemas regenerated twice are byte-identical and their SHA-256 hashes are unchanged from the Phase-11 record. A source-versus-documentation diagnostic-code audit reports no code emitted by the source that the documentation omits; the four CLI codes the audit script could not match are confirmed by reading the source, because the codes sit inside template literals or quoted strings the script's pattern does not reach.

**Guardrails held.** No scientific content was approved and no publication occurred; the contract work decides no chemistry. The exporter stays network-free and deterministic. Missing evidence stays missing. No measurement, pilot, field trial or physical experiment was run or authorized. No novelty, patentability, freedom-to-operate, safety, regulatory or environmental-benefit claim was made. Batch-02 remains `complete_pending_operator_decision` and this continuation does not accept it. Merge to main, push, deployment, publication, experiment and pilot each remain separately unauthorized.

**Rulings.** The operator's review model differs from the design's sections 12.5 and 14.5: the critique is to come from external readers and an optional AI second layer after publication, not from the operator before it. That departure is accepted and mitigated inside the artifact — evidence states, dissent, unknowns and the audit drawer are all visible to readers — while the section 12.7 deployment gate is retained, because deployment is an action and not a review. The operator's "full force auto" instruction is read as authorization to build the layer, the application, the CI build and the release preparation on a branch with everything recorded; it is not read as authorization to merge, push, deploy, publish, experiment, or accept batch-02.

**Remaining work and next action.** Task 2 is next: the cigarette-butt material record and the six method-family records with their claims, gaps and assessments, built from the already accepted batch-02 content with no new research and no invented scores. The operator's accept/reject decision on the batch-02 deliverables, and the five decisions the M01 proposals name, remain the operator's own.

## 2026-11-17: Reader platform Task 3b — Scientist-Inventor hypothesis records published; corrupt state files repaired (worktree C:\w\rp)

**Outputs.**

- `tools/publication-contract/layer-data/records.json` — the two Scientist-Inventor hypotheses added to the generator's source of truth.
- `publication/records/hypotheses/batch-02-scientist-inventor-proposals.yaml` — regenerated by the deterministic generator.
- `publication/records/hypotheses/batch-02-evidence-gap-synthesis.yaml` — regenerated by the deterministic generator.
- `publication/manifest.yaml` — regenerated; 134 records, 6 pages.
- `publication/records/methods/*.yaml` — all six method families now carry the two new hypothesis ids in `hypothesisIds`.
- `state/workflow.yaml`, `state/session-log.md`, `task_plan.md` — restored from `9fdb58b` and updated with this unit's record.

**What was found.** A local verification run of this branch failed. `npm run validate` exited 1 with `MANIFEST_SCHEMA_INVALID`, and `npm test` failed every test that loads the manifest. The cause was not in the contract code: commit `e575390` ("feat(reader-platform): add batch-02-evidence-gap-synthesis hypothesis record and update manifest/workflow/session-log/task-plan") had overwritten four tracked files with one-line placeholders — `publication/manifest.yaml` became `PLACEHOLDER_MANIFEST_CONTENT`, `state/workflow.yaml` became `PLACEHOLDER_WORKFLOW_CONTENT`, `state/session-log.md` became `PLACEHOLDER_SESSION_LOG_CONTENT`, and `task_plan.md` became `PLACEHOLDER_TASK_PLAN_CONTENT`. The manifest therefore could not parse against `PublicationManifestSchema`. The same commit's intended updates to those three state files were lost with the content. The damage was already on `origin/feat/reader-platform` at `e575390`, so the repair is a new forward commit and no history was rewritten.

**How it was repaired.** The four files were restored from `9fdb58b`, the last commit before the damage. The two hypothesis records that the damaged commits had added to `publication/records/hypotheses/` had been written by hand and never added to `tools/publication-contract/layer-data/records.json`, so the generator never listed them and the manifest never counted them; that is why `9fdb58b` still showed 132 records. The established pattern from the Task-3 invention record (`a661e7f`) — add the hypothesis to layer-data, re-run the generator — was applied instead of editing the manifest by hand, so the record, its manifest entry and the method-family `hypothesisIds` links are now produced together and the manifest hashes are computed from the bytes actually written.

**One latent defect fixed on the way.** The committed `batch-02-evidence-gap-synthesis.yaml` contained an unquoted label scalar with a colon-space (`Scientist-Inventor Synthesis: M02-M08, R01-R05, S01-S06`), which the `yaml` parser rejects with `BLOCK_AS_IMPLICIT_KEY`. The generator quotes it correctly, so the regenerated file parses. The regenerated record was compared against the committed one field by field after repairing only that line in memory: all 22 top-level fields are equal. The remaining diff against the committed file is YAML quoting style only.

**A second defect found after the manifest parsed.** With the manifest repaired, semantic validation reported two `RELATIONSHIP_TARGET_UNLISTED` errors: both new hypotheses listed `unb-pi0305004` in `sourceInputIds`, but no such record was published in this layer. The id is real and was accepted at batch-01 stage 2 (`specs/unb-pi0305004-source-reconstruction.md`, unit S2-05 — Brazilian patent PI 0305004-1, Universidade de Brasília, filed 2003-10-06, granted 2014-11-11, reading class `source-partially-read`), but it was never published as a source record, and the alkaline pulping route deliberately stays outside the layer behind the still-open gap `chemical-gap-unreviewed-pulping-route`. Three repairs were weighed: publish an `unb-pi0305004` source record (which would make the manifest 135 records and contradict the plan's "one record per source actually cited by a claim"); drop the premise (which would silently discard a genuine premise); or represent it as a public-safe audit reference. The third was taken because it is the route the reader-platform design spec sanctions at §12.8: a published relationship to an unlisted record is a build error unless represented as a public-safe audit reference. The id was removed from both `sourceInputIds` lists, which now name the six published sources shared by the six method families, and each hypothesis gained an audit reference carrying the working public UnB patent-page URL, the version `batch-01 S2-05 v1.0`, and the `internalId` `unb-pi0305004`. The premise is preserved and followable by a reader instead of being silently dropped, and the manifest count stays at 134.

**Verification.** `npm install` — up to date, 6 packages audited, 0 vulnerabilities. `npm test` — 202 tests, 201 pass, 1 skipped (Windows cannot create symlinks), 0 fail. `npx tsc --noEmit` — clean, no output. `npm run validate` — `VALID records=134 pages=6 assets=0`, with seven deliberate `ASSESSMENT_UNKNOWN` warnings and no errors. `npm run export` — run twice into two separate output directories at the worktree root and compared file by file by SHA-256; identical (`files_a=11 files_b=11`, `file_list_identical=true`). Public-boundary scan of the exported bundle for repository-local absolute paths — none found.

**Guardrails held.** Nothing was measured; no sample was collected, no material was handled, and no physical experiment, pilot or field trial was run or authorized. No claim was made that any family or proposal is clean, detoxified, safe, commercially validated or environmentally superior; the metals stop-condition remains in force. Missing evidence stays missing. No novelty, patentability, freedom-to-operate, safety, regulatory or environmental-benefit claim was made. No merge to main and no production deployment. The repair did not rewrite history and did not touch the main checkout or the `C:\w\bpc` worktree.

**Remaining work and next action.** Task 4 is next: the Astro + Pagefind reader application, which consumes the exported bundle only. The operator's accept/reject decision on the batch-02 deliverables, and the five decisions the M01 proposals name, remain the operator's own.

## 2026-11-17: Repository hygiene — export scratch artifacts untracked; branch-topology review (worktree C:\w\rp)

**Outputs.**

- `.gitignore` — extended to cover the actual export-scratch directory names and the stray root lockfile.
- 66 tracked build-artifact files removed from git tracking (files left on disk, untracked): `.publication-build-a/`, `.publication-build-b/`, `publication/.export-stage-a/`, `publication/.export-stage-b/`, `publication/export-a/`, `publication/export-b/`.
- `package-lock.json` at the worktree root deleted from disk (it was untracked and had no value).
- Commit `2ae8c90` — 67 files changed, 63,409 lines removed from tracking. Pushed to `origin/feat/reader-platform`.

**What was found.** The operator asked why GitHub Desktop was showing a root `package-lock.json` and whether everything had been committed. Two distinct findings:

1. The root `package-lock.json` was **not tracked** (`git ls-files --error-unmatch` reported no match). Its content was `{"name":"rp","lockfileVersion":3,"requires":true,"packages":{}}`. There is no `package.json` at the repository root, so this file describes a package that does not exist; it is a leftover artifact of an `npm install` run in the empty root. The real lockfile is `tools/publication-contract/package-lock.json`, and it was already tracked. Committing the root file would have added a meaningless artifact, so it was deleted instead and `/package-lock.json` was added to `.gitignore`.
2. **66 build-artifact files were tracked** — four duplicate copies of the same export bundle under six different directory names. The `.gitignore` covered `.publication-build/` and `.publication-stage-*/` but not the actual names in use. The manifest does not reference any of them; they are scratch output reproducible from `npm run export`.

**How it was repaired.** `git rm -r --cached` on the six directories (contents preserved on disk), `.gitignore` extended with `.publication-build-*/`, `publication/.export-stage-*/`, `publication/export-*/` and `/package-lock.json`, and the stray root lockfile deleted from disk. The working tree is now completely clean; `git status --short` returns nothing.

**Verification.** `npm test` — 202 tests, 201 pass, 1 skipped (Windows cannot create symlinks), 0 fail. `npx tsc --noEmit` — clean, no output. `npm run validate` — `VALID records=134 pages=6 assets=0`, seven deliberate `ASSESSMENT_UNKNOWN` warnings, no errors. `npm run export` — run twice into two output directories at the worktree root and compared file by file by SHA-256; identical (`files_a=11 files_b=11`, `file_list_identical=true`, `mismatches=0`).

**Branch-topology review (read-only; no merge performed).** The operator asked whether the current worktree and branch structure makes sense. It does not, and the finding is recorded here because it constrains the next unit:

- The three branches have diverged. `main` (`50281ae`) has **no** `publication/` directory, no `tools/publication-contract/`, and no `docs/superpowers/`; `feat/reader-platform` (`2ae8c90`) has the entire publication layer but is missing `main`'s Batch-02 operator acceptance, the two Scientist-Inventor documents, and the `permissions.ai_role` block. `feat/publication-content-contract` (`19d1716`) is not an ancestor of either and holds 64 gap-closing OCR/PNG files that neither other branch has. `git diff --stat main..feat/reader-platform` — 260 files, 81,505 insertions.
- A probe merge of `feat/reader-platform` into `main` (performed in a throwaway detached worktree at `C:\Users\Ad2048\AppData\Local\Temp\opencode\merge-probe`, since aborted and removed; the repository was not altered) conflicts in five files: `findings.md`, `progress.md`, `state/session-log.md`, `state/workflow.yaml`, `task_plan.md`. All five are the state and planning files that both branches appended to independently.
- The two `state/workflow.yaml` copies now disagree semantically: `main` carries `permissions.experiments.status: ai_designed_only` and the `permissions.ai_role` block recording the operator's scientist-inventor grant of 2026-11-17, while `feat/reader-platform` carries `permissions.experiments: not authorized` and no `ai_role` block, because its state file was restored from `9fdb58b`, which predates that authorization. A hand-merge is therefore required; a blind merge would silently drop an operator authorization.
- The root planning files that conflict are largely superseded: `AGENTS.md` states that old work-queue and progress files are preserved history and not current dispatch.

**Guardrails held.** Nothing was measured; no sample was collected, no material was handled, and no physical experiment, pilot or field trial was run or authorized. No claim was made that any family or proposal is clean, detoxified, safe, commercially validated or environmentally superior; the metals stop-condition remains in force. No file was deleted from a registry, from backup, or from prior scientific outputs — only scratch build output was removed from git tracking, with its bytes preserved on disk. No merge to main, no branch deletion, no deployment and no publication. The merge probe was performed in a disposable worktree and removed; `git worktree list` is unchanged at three entries.

**Remaining work and next action.** The branch-topology repair — reconciling `main`, `feat/reader-platform` and `feat/publication-content-contract` into one coherent history, with the five conflicting state files hand-merged and the operator's `ai_role` authorization carried across — is a separate operator decision and was **not** performed here. Task 4 (the Astro + Pagefind reader application) remains the next unit of work on `feat/reader-platform` and may proceed independently of the topology decision, because it consumes the exported bundle only.

---

## 2026-11-17: Reader platform Task 3d — the four narrative pages published, closing the Task-3 page gap (worktree C:\w\rp)

**Operator direction.** Two decisions were taken by the operator this round. First, the branch topology is to be repaired by a deliberate hand-merge of `feat/reader-platform` into `main` rather than by leaving the branches separate or cherry-picking selected files. Second, the next unit of work is the four missing narrative pages rather than the reader application or the simplification of the repository rules. The operator approved the page design with "just build it", which ends the design gate; the pages are then written before the merge, so the merge carries the complete project over in one pass.

**What was found.** The publication layer published 134 records and 6 pages. The plan's file map and Task 3 steps 3 and 6 require four more pages — `start-here.md`, `egypt-annex.md`, `how-the-research-works.md` and the limitations content — because the reader routes `/start/`, `/egypt/`, `/research-method/` and `/limitations/` need something behind them. All four were absent, so Task 3 was not fully complete and Task 4 would have built routes with no content.

**How it was repaired.** The four pages were authored as markdown under the contract's own layer-data directory, with an index declaring each page's id, file name and reader route. The deterministic generator was extended to read that index, copy each page into the published tree and push a manifest entry carrying the sha256 computed from the bytes it actually wrote. A guard rejects an index entry whose file name disagrees with its id. No manifest entry was hand-edited, so the manifest stays reproducible from the generator by one command — the same discipline that repaired the earlier placeholder corruption and the unlisted-premise defect. The pages were written test-first: four tests were added and watched fail for the right reasons before any page or generator change was made.

**Content.** The four pages are curation of already-accepted material, not new research: the material record, the six family pages, the accepted Egypt annex, the handoff brief and the accepted gap agenda. The Egypt page carries observations and hypotheses only and makes no recommendation. The research-method page names who did the work and who did not, including that Batch-02 was a single-AI execution with no three-model panel and no judge packet, and that no model diversity is established. The limitations page lists the gap agenda as a list rather than a summary — eight measurement gaps, five jurisdiction and regulatory acceptance gaps, six scale, cost and energy gaps — and preserves the unresolved items and the dissent.

**Verification.** `npm test` → 206 tests, 205 pass, 1 skipped (Windows cannot create symlinks), 0 fail. `npx tsc --noEmit` → clean, no output. `npm run validate` → `VALID records=134 pages=10 assets=0`, the same seven deliberate `ASSESSMENT_UNKNOWN` warnings, no errors. `npm run export` → run twice into two output directories at the worktree root and compared file by file by SHA-256; identical (`files_a=15 files_b=15`, `file_list_identical=true`, `mismatches=0`). The exported records set is byte-identical to the previous run, so no published claim, gap, source, assessment, hypothesis or term changed; only the page set grew. A public-boundary scan of the exported bundle found no absolute local path, and a scan of the exported pages found no repository-local path. The state file was re-parsed after the edit to confirm it still loads, and the operator's `permissions.experiments` mapping and `permissions.ai_role` block were confirmed intact.

**Guardrails held.** Nothing was measured; no sample was collected, no material was handled, and no physical experiment, pilot or field trial was run or authorized. No claim was made that any family or proposal is clean, detoxified, safe, commercially validated, environmentally beneficial, novel, patentable, deployable or costed. Missing evidence stays missing; no new number was introduced anywhere. No prior scientific output was deleted or rewritten. No merge to main, no deployment and no publication — the merge is the next unit and is separately authorized.

**Remaining work and next action.** The next unit is the operator-authorized hand-merge of `feat/reader-platform` into `main`, resolving the five conflicting state and planning files by taking the union of both sides rather than by choosing one, so that this branch's `reader_platform` section and the operator's `ai_role` authorization both survive. After that, Task 4 — the Astro + Pagefind reader application — remains the next build unit on `feat/reader-platform`.
