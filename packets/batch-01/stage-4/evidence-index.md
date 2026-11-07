# Stage-4 evidence index — batch-01, round 01, packet v1.0

## 1. What is supplied

### Control (3, hashed in this packet)

1. `packets/batch-01/stage-4/question.md` — this round's common question, role emphasis, hard rules.
2. `packets/batch-01/stage-4/evidence-index.md` — this file.
3. `packets/batch-01/stage-4/output-schema.md` — required report structure.

### Stage-3 panel outputs (5, hashed in this packet)

4. `panels/batch-01/stage-3/round-01/worker-a.md` — slot A (chemistry/material interpretation).
5. `panels/batch-01/stage-3/round-01/worker-b_Z-GLM5.3.md` — primary slot-B contribution (contaminants, exposure, assays, waste).
6. `panels/batch-01/stage-3/round-01/worker-b_Tencent-Hy4.md` — supplemental slot-B contribution; its `[1]–[27]` reference definitions are self-contained at the report tail. Both B files are **one slot, not two votes**.
7. `panels/batch-01/stage-3/round-01/worker-c.md` — slot C (integration, balances, energy, cost, scaling).
8. `panels/batch-01/stage-3/round-01/judge.md` — judge synthesis; recommendation REVISE; operator acceptance recorded 2026-11-06 with the REVISE recommendation and bounded revisions carried forward.

### Stage-3 frozen evidence payload (20 files, referenced by commit, not re-hashed)

The 20 payload files of Stage-3 packet v1.1 at commit `5f484b585ca16dbd2ce93b56c61c962f5f14c774` (hashes recorded in `packets/batch-01/stage-3/manifest.yaml` at that commit):

9. `packets/batch-01/stage-3/question.md`
10. `packets/batch-01/stage-3/evidence-index.md`
11. `packets/batch-01/stage-3/output-schema.md`
12. `reports/stage1/company-source-map.md`
13. `reports/stage1/coverage-ledger.md`
14. `reports/stage1/batch-selection.md`
15. `reports/stage2/reconstruction-index.md`
16. `reports/stage2/assumption-and-gap-ledger.md`
17. `reports/stage2/errata-packet-v1.0.md`
18. `reports/gap-check-01.md`
19. `specs/de-fenzo-2020-source-reconstruction.md`
20. `specs/mego-fr3066128a1-source-reconstruction.md`
21. `specs/company-workflow-dossiers-batch01.md`
22. `specs/keenat-fr3110470a1-source-reconstruction.md`
23. `specs/cn106928486-source-reconstruction.md`
24. `specs/pressurized-fluid-reference.md`
25. `specs/unb-pi0305004-source-reconstruction.md`
26. `dossier/cautionary/ineris-waste-classification.md`
27. `dossier/cautionary/keenat-lca-retreat.md`
28. `dossier/cautionary/korean-paving-stones.md`

## 2. How the evidence fits together

- The five panel outputs (items 4–8) are the **primary** input: Stage 4 invents from the red-team findings. Read the judge synthesis first, then the worker reports for detail and dissent.
- The 20 frozen files (items 9–28) are the **underlying evidence**: read the specific spec or ledger a panel report cites before relying on a number.
- Stage-3 slot-B external fetches (Keenat extrusion step, TchaoMegot extraction train, UnB thesis COD figures) are recorded in the worker reports as **attributed retrieval leads**, not frozen-packet facts. The judge requires official full texts/translations before they are imported as packet evidence. You may cite them as leads with that caveat.

## 3. What is not supplied

- No independent contaminant assay, leachate test, emission measurement, complete dry-basis balance or audit-ready LCA exists for any operator (Stage-3 confirmed finding).
- Full patent texts for FR3110470A1, FR3102180A1, CN106928486B official publication, Cerdia WO2026074041A2 description, and the Teixeira thesis/paper full text — retrieval leads only.
- No regulatory texts, company internal data, End-of-Waste dossiers, or Stage-5 synthesis.
- No `hy4-citation-map.md` sidecar exists; it is non-blocking (the Tencent report is self-contained).

## 4. Reading limits

- Company statements are self-report. Patent envelopes are disclosure ranges, not operating setpoints. Machine-translated patent renders need official-text confirmation.
- The Stage-3 reports' model/service identities are self-reported; the panel does not establish verified model diversity.
- Working-tree files may use CRLF on Windows checkouts; manifest hashes are LF-normalized (a Stage-3 judge finding, carried as release-metadata guidance).
