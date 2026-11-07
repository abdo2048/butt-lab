# Stage-4 Judge Findings

## Provenance
- Requested batch: `batch-01`
- Requested round: `01`
- Requested packet: `v1.0`
- Requested payload commit: `671de7c045385dade4b8f26c7b1680a2cc3a809c`
- Required output: `judge.md`

## Initial Constraints
- Authorized Stage-4 inputs are `question.md`, `output-schema.md`, `evidence-index.md`, `manifest.yaml`, `COMMIT.txt`, worker A, worker B (plus optional service-specific worker B report), and worker C.
- No other Stage-4 peer report may be read.
- Recommendation must be `ACCEPT`, `REVISE`, or `REJECT`.
- No novelty, patentability, or safety claims; no invented numbers; no hazardous operating instructions.
- Preserve denominator discipline and four-field sink accounting.
- State model/service identity and disclose model-family reuse.

## Discoveries
- No codebase-memory project is currently indexed; this document task does not require indexing.
- `START_HERE.md`, `WORKFLOW.md`, `state/workflow.yaml`, `charter.md`, and `FUSION_PROTOCOL.md` confirm that Stage 4 is a manual three-worker-plus-judge gate.
- The authoritative packet path is `packets/batch-01/stage-4/manifest.yaml`, version `v1.0`, payload commit `671de7c045385dade4b8f26c7b1680a2cc3a809c`.
- The saved workflow state still marks Stage-4 worker A/B/C as pending and the judge as waiting, so actual output files must be reconciled before judging.
- Judge scope: wait for all three matching reports, check consequential conflicts against evidence, consolidate duplicates, preserve minority concerns, and label any judge-created hybrid as a new hypothesis.
- Stage-4 gate requires explicit operator acceptance after the judge; creating `judge.md` alone cannot advance Stage 5.
- No experiment is authorized; desk work cannot claim safety, cleanliness, deployability, environmental superiority, or experimental validation.
- `PACKET_ACCESS.md` is Stage-3-specific transport guidance; for this local Stage-4 judge task the controlling exact path comes from `state/workflow.yaml` and the Stage-4 manifest.
- The exact packet directory contains the five requested inputs plus `LAUNCH.md`; `LAUNCH.md` is not an authorized judge input and will not be opened.
- The exact round directory contains `worker-a.md`, `worker-b.md`, and `worker-c.md`; no `worker-b_<Service>.md` variant is present.
- Git object `671de7c045385dade4b8f26c7b1680a2cc3a809c` exists and is the commit titled `Stage 4 packet v1.0: question, evidence index, output schema, manifest, launch sheet, commit record`.
- Relative to that payload commit, current `question.md`, `output-schema.md`, and `evidence-index.md` are unchanged; current committed `manifest.yaml` and `COMMIT.txt` differ and require authorized inspection to confirm the documented follow-up correction.
- All three worker reports are untracked local files with no Git history; their embedded batch/round/packet/commit metadata must therefore be validated from the reports themselves.
- The current authorized release metadata is internally explicit: `COMMIT.txt` records payload commit `671de7c...`, and Git commit `6206d42...` only filled that field and corrected the Stage-3 `judge.md` SHA-256 in unhashed release metadata. The underlying eight hashed payload files were not changed by that follow-up.
- The current manifest identifies eight hashed payload files: three Stage-4 control documents and five preserved Stage-3 panel outputs. For this judge task, content access remains limited to the user's explicit five packet documents and three Stage-4 worker reports; other payload files may be hash-checked without opening their content.

## Judge Criteria From Packet
- The common question asks which modified family or new combination most plausibly yields a recyclable/usable output plus a named, lawful, characterizable toxic-fraction sink, and what would falsify it.
- Comparison fields are mechanism; source support versus inference/new assumptions; change from existing families; severity-labelled failure modes; falsifiers; measurements/calculations; and equipment/waste implications.
- Primary route assessment must answer Q1–Q5 and include four-field sink accounting plus per-analyte fate for nicotine, TSNAs/PAHs, and metals.
- The accepted batch-wide discriminator is a dry-mass-normalized, analyte-resolved fate balance across product, all liquid phases, sludge/rejects, captured off-gas/condensate, recycle purge, treatment outlet, and unexplained loss, with basis, uncertainty, recovery, and detection limits.
- The judge adaptation must retain the schema's YAML-first provenance, access receipt, proposal comparison/deep dive, Q1–Q5 logic, sink/fate table, packet-overstatement check, and confidence/independence statement while adding synthesis, recommendation, per-slot assessment, and preserved dissent.
- Packet evidence limits: no independent contaminant assay, leachate/emission measurement, complete dry-basis balance, comparable scale economics, or audit-ready LCA; official full texts/translations remain retrieval leads where stated.

## Worker Comparison
- All three reports match batch `batch-01`, Stage 4, round `01`, packet `v1.0`, and payload commit `671de7c045385dade4b8f26c7b1680a2cc3a809c`; each states that it did not read a Stage-4 peer or judge report.
- Worker A (`Qwen3.8`, inferred DeepSeek harness) proposes modified F3 solvent dissolution/precipitation with a second precipitation/wash stage. Its useful contribution is the clearest polymer-quality comparator and explicit co-precipitation/solvent-closure concern. It is not selectable as written because it adds unsupported operating conditions, universal-looking thresholds, analyte-partition predictions, and lawful-treatment assumptions that the packet does not support.
- Worker B (`MiniMax-M3`, MCode session) proposes three explicit new hypotheses. Its primary B-P-01 segregates the first wash displacement, recycles later washes with a measured purge, and makes partition ranking the decision gate. This is the strongest adversarial proposal because it exposes the possibility that the proposed concentrate is actually a large dilute unroutable stream or targets the wrong fraction. Its lawful final treatment and metals outcome remain unresolved.
- Worker C (`unknown`, API chat) proposes an overlapping F1 measured-purge architecture with external-treatment acceptance, separate sludge/reject handling, and an independent product-use gate. Its strongest contribution is treating external treatment as a boundary rather than proof of a sink. Its fixed replicate count and illustrative analytical numbers are unsupported and must not be carried forward.
- B-P-01 and C-F1-P substantially overlap but are not identical. A judge synthesis using B's partition-ranking gate plus C's treatment-acceptance and sludge boundary is a new hypothesis and must be labelled accordingly.
- Strongest proposal family: modified F1 with analyte-resolved partition ranking before purge design, explicit reject/sludge boundaries, documented treatment acceptance and outlet performance, and a separate product-use gate. This is a testable architecture, not evidence that F1 works.
- Strongest objection: the route may convert the feed problem into a large dilute effluent, may target wash liquor when the major burden is in tobacco/ash, and may leave metals in product. Without accepted routing, outlet assays, and passed use criteria, neither a sink nor a usable output is demonstrated.
- Strongest minority alternative: F3 remains the clearest route for polymer recovery, but co-precipitation, metals partition, solvent recovery, liquid/residue treatment, and product leaching remain unresolved. Worker A's numerical thresholds and operating details cannot be adopted.
- Metals are the cross-proposal hard case. No slot demonstrates a metals-compliant product or complete lawful metals sink. Organic repartition/co-precipitation, captured volatile fractions, and unexplained loss also remain material.
- None of the three supplies a complete four-field sink with demonstrated analytical performance and a located lawful final route. `ACCEPT` is therefore unsupported; `REVISE` is proportionate because the partition-ranking discriminator can falsify or redirect the proposed architecture.

## Report-Specific Provenance Issues
- Worker A's YAML is not first and is not fenced as the schema requests; its claim of no invented values conflicts with unsupported thresholds in the report.
- Worker B used external searches. Failed official-PDF retrievals and search excerpts remain leads, not packet facts or design constants. Its qualitative claim that F1 is cheapest is an engineering-sequencing hypothesis because comparable costs are absent.
- Worker B reports that manifest hashes reproduce under CRLF but not uniformly under LF normalization, with two BOM-bearing files. Payload-byte identity is not challenged, but this release-metadata/hash-convention discrepancy should be preserved for a separate local reproducibility check rather than resolved by majority vote.
- Worker C could not access the manifest and only partially accessed some prior evidence, so its provenance is thinner than B's. Its unsupported replicate and method-performance figures must be removed.
- Judge identity for the report: service `OpenCode`; displayed model `gpt-5.6-sol`; exact model ID `agentrouter/gpt-5.6-sol`. Worker and packet-author model-family reuse is unknown, so model diversity cannot be claimed.

## Final Result
- `panels/batch-01/stage-4/round-01/judge.md` records `REVISE`, identifies B-P-01 as the strongest individual proposal, states its strongest objection, and labels the B/C synthesis `J-H-01` as a new unvalidated hypothesis.
- The report preserves F3 as the strongest minority alternative and retains the wrong-stream/dilution, metals, treatment-boundary, use-gate, ecotoxicity, scale, and hash-convention concerns.
- The report SHA-256 is `a065ceba0aa842f3164de9f500f955bd4e90f20cf715c4c54f761a1b9071d229`.
- Workflow state records all three workers and the judge as complete, while operator acceptance remains false, Stage 4 remains `awaiting_manual`, Stage 5 remains pending, and no experiment is authorized.
