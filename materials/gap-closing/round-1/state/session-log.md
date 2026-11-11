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

## 2026-11-08: Operator-commissioned batch-01 gap retrieval, first checkpoint

The operator supplied another assistant's gap-closing plan and commissioned a
checkbox tracker, Priority-1 retrieval and a source folder with transparent
missing-file status. This is a follow-up, not acceptance of the final reports,
not a sixth research stage, and not experiment/contact/purchase authorization.

Remote main was fetched and reconciled at 98131dc. The two final reports match
the prior supplied report bytes; the operator's newer workflow/log were preserved.
A separate worktree/branch followup/batch-01-gap-retrieval-2026-11-08 is based on
that remote snapshot; no automatic merge, commit, push or remote write is made.

Outputs:
- reports/final/gap-closing-tracker.md: all four priority categories, separate
  retrieval/review/closure states and item-level checkboxes.
- reports/followup/batch-01/FR3066128B1-disclosure-review.md: focused primary-text
  disclosure versus J-H-01 assumptions, with page/claim/figure references.
- reports/followup/batch-01/manual-and-ekb-retrieval-queue.md: exact missing
  documents, failures, next access routes, and focused prompts.
- sources/followup/batch-01/2026-11-08/: eight PDF files, patent/company HTML,
  extracted search text, 24 numbered search/content receipts and binary-transfer
  receipts, reproducible transfer script, hashes and inventory.

Sources read: attachment's full gap plan; orientation, AGENTS, charter, workflow,
current state, operator coordinator note, final reports, relevant prior worker
references and cautionary notes. Full FR3066128B1 extracted description/claims
and search-report text were read and its drawings visually inspected. Other
documents are not claimed fully reviewed: INERIS summaries and the 2017 HP14
discussion, UnB metadata/abstract/selected reuse and conclusion passages, Chinese
grant cover/claim extraction, French scanned-patent covers, Cerdia description/
claim availability, and retrieved company pages were inspected to their stated
limits. No full laboratory-data audit or technical/legal translation is claimed.

New source boundary: the granted F1 text specifies coagulation/flocculation,
settling, recycled-water storage and separated organic/paper material handling.
It asserts depollution but provides no read analyte-resolved performance table,
measured purge rule or final characterized residual acceptance. Figure 3's
unlabeled recycler outlet is preserved rather than erased. J-H-01 remains an
unvalidated hypothesis; F3 minority dissent and metals objections remain.

Acquired PDFs: FR3066128B1 and A1; INERIS DRC-17-162405-01313C (2017) and
DRC-18-177385-09634B (2019), including annexes; full Teixeira UnB thesis;
CN106928486B; FR3110470A1; FR3102180A1. Patent facsimiles are mirror-hosted,
not separately verified live office-register downloads. Both latter French PDFs
are image-only under pdftotext; saved mirror description/claims remain searchable
but are not certified transcription. No OCR-language data were installed.

Missing/partial: DOI redirect fetch failed for the requested Teixeira paper;
Brazilian patent index returned no hits and a broad web query was unproductive;
BMJ Korean-article address hit the retrieval service's robots-policy failure.
Cerdia description/claims are saved as mirror HTML but original WIPO PDF remains
unobtained. Company pages/hub do not provide a retrieved full primary LCA or
actual recipient/product acceptance dossier. These are access/search outcomes,
not evidence the documents or measurements do not exist.

Checkpoint: 24 search/content calls saved, followed by eight direct transfers
of already-discovered binary document URLs (no further discovery). Eight PDFs
have valid signatures, parsable page counts, SHA-256 and separate derived text.
Only PDFs with substantive text are classified searchable. Failures and sparse
extractions are visible rather than miscounted as successful full-text reviews.

No experiment, purchase, contact, standards purchase, login credential collection,
safety/novelty/legal/deployment/environmental clearance, public publication or
remote repository push. Public source files are not automatically licensed for
redistribution; EKB entitlements are not assumed. Stage 1-5 dictionaries and
operator acceptance statements remain unchanged; a separate follow_ups
checkpoint records this work while final-report operator review remains pending.
