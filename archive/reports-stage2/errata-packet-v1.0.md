# Errata and correction record — packets v1.0 → v1.1 (batch-01, stage 3)

Date: 2026-11-04 (QC pass; branch `arena/c998d19c-butt-lab`). Author: the same AUTO worker that produced v1.0. This is a **self-correction after external review**, not an independent re-verification of the underlying sources.

Basis for this pass: `arena-stage12-readiness-review.md` and the reviewer reply supplied 2026-11-04 (review snapshot `5f71baab`, Arena head `dd4bc6c`, frozen v1.0 content commit `0c0b6f2`). The reviewer recomputed 3 of 18 content hashes and could not fetch the Keenat patent; its own limits are recorded here.

**Status of v1.0:** preserved in Git at `0c0b6f2ff900a1866a0ed456c87e78661fa2f4ea` and on `main` via PR #1. It is a historical snapshot and **must not be used as the Stage-3 launch baseline**. v1.1 supersedes it. Stage 3 remains `awaiting_manual`; no panel, judge or acceptance was run.

Severity key: `factual` (would mislead the panel), `framing` (biases interpretation), `metadata` (counting/linkage).

---

## 1. Corrections applied

| ID | Location | v1.0 statement (quoted) | Problem | v1.1 correction | Severity |
|---|---|---|---|---|---|
| E-01 | `reports/stage2/reconstruction-index.md` §3 | "correctly distinguishes description ranges from granted-claim wording (75–95 °C, 2–4 h) … No correction required." | The reused Chinese spec explicitly says the B version's "claims and legal scope were not reviewed here" (spec line 11) and records the A-application range. The 75–95 °C/2–4 h granted-claim distinction is in `reports/gap-check-01.md`, which was **not** in the packet. | Index now separates: what the spec records, what `gap-check-01.md` records, and states that re-reading a prior note is not source re-verification. `gap-check-01.md` added to the packet. | factual |
| E-02 | Packet file list | `gap-check-01.md` absent | The granted-claim correction was unavailable to workers. | Added to `evidence-index.md` and `manifest.yaml` with hash. | factual |
| E-03 | `specs/unb-pi0305004-source-reconstruction.md` §2 | "This is a **deacetylation/depolymerisation** route" | The sources describe hydrolysis of acetate groups to cellulose; polymer-chain depolymerisation is not established. | Now "deacetylation route"; explicit note that chain scission is not established by the read sources. | factual |
| E-04 | Index §2 and UnB spec §9 | "creates the most concentrated liquid effluent" | Comparative claim without measurements. | Removed the superlative; states the liquor is contaminant-bearing and that relative load across routes is unmeasured. | framing |
| E-05 | `specs/keenat-fr3110470a1-source-reconstruction.md` §4 | "thermal *destruction* of nicotine (boiling point ≈ 247 °C), PAHs or metals is not plausible … Metals are non-volatile" | Boiling point is not a decomposition-kinetics argument; Hg and As are partly volatile; the claim overreached. | Rewritten as: drying/volatilisation plausible at 80–100 °C; destruction not established; measure solids, condensate and off-gas; metal volatility varies by element/species. | framing |
| E-06 | Keenat spec §2–4 | 80–100 °C discussed without a clear boundary | Risk of reading the drying temperature as the whole thermal history, including extrusion. | Explicit: 80–100 °C applies to step b only; the extruder profile is not disclosed in the read text; press "~200 °C" remains an unresolved separate claim. | framing |
| E-07 | `specs/company-workflow-dossiers-batch01.md` §3 | TerraCycle "i.e. encapsulation, not detoxification … a weak detoxification claim" | Absence of a disclosed cleaning step is not proof that none occurs. | Now: disclosed product is a composite in which fibre is encapsulated; cleaning is not disclosed; detoxification is unproven, not disproven. | framing |
| E-08 | Dossier §6 | CNR "chemically this is the cleanest separation concept in the batch" | Ranking without evidence of contaminant rejection. | Now: "a testable separation hypothesis"; rejection and product purity not established here. | framing |
| E-09 | Dossier §5 | Re-Cig "the most transparent … the honest comparator" | Value judgement; external treatment does not establish loop status either way. | Now: the only operator here that explicitly discloses an external wastewater stream; whether treated water returns is unspecified; yield remains company accounting. | framing |
| E-10 | Index §2 | S2-04 "the only non-aqueous, non-thermal route" | SC-CO₂ work involves temperature conditioning; "non-thermal" is misleading. | Now: only non-aqueous dense-fluid route; temperature conditioning still applies; "non-thermal" removed. | framing |
| E-11 | `manifest.yaml` | `base_commit: fda66af…`; no packet/content commit field | Schema asks for a packet commit; the manifest pointed at a baseline where the packet did not exist. | v1.1 has `repo_baseline_commit`, `v1_0_content_commit`, `content_commit` (recorded in `COMMIT.txt` after freeze), and the schema asks for the content commit explicitly. | metadata |
| E-12 | `reports/stage1/coverage-ledger.md` §1–2 | 20 calls claimed; table numbers 1–19 plus a placeholder #20; row 1 merged two chunk fetches | Table was not an invocation log. | §2 rewritten as a 20-row invocation log (chunk fetches counted separately, failed fetch counted); provenance note says raw tool logs were not supplied to the reviewer. | metadata |
| E-13 | `reports/stage2/assumption-and-gap-ledger.md` §2 | "Calculation register" with K-01…K-06, where K-06 says "not calculated" | Six-row register described as six calculations. | K-06 marked "withdrawn — not a calculation"; the text now says **five** calculations (K-01…K-05). | metadata |
| E-14 | Index §4 gate table | "6 units, 4 files (3 reused + 3 new specs + 1 dossier)" | Arithmetic wrong (3+3+1=7) and undercounts packet-control files. | Now 7 evidence files + 4 control files, listed. | metadata |
| E-15 | `reports/stage1/company-source-map.md` §1 | "Peer-reviewed / academic source families mapped — 7" incl. CN106928486 and the CNR offering | A patent and a technology offering were counted as peer-reviewed. | Split into peer-reviewed (4), patent/offering (2, already counted as patent/company entities), construction-material leads (3, full text not read). | metadata |
| E-16 | Company map, batch-selection, evidence index | Several `…`/shorthand URLs and "capbiotek.fr citing Ouest-France" | Consequential claims need exact URLs/sections for separate reviewers. | Ellipsized URLs expanded; shorthand replaced with full URL plus outlet/date, or downgraded to "attributed lead". | metadata |
| E-17 | `reports/stage1/batch-selection.md` §4 | Matteri deferred: "Withdrawn application; thin disclosure" | Patent status appeared to drive a research-selection decision. | Now: deferred on thin disclosure (two steps; 5 % NaOCl claim); withdrawn status is metadata only; no status-based exclusion is applied anywhere. | metadata |
| E-18 | Multiple | TchaoMegot family, CNR/mask grouping, Korean paving, INERIS/LCA notes carried with implied authority | Inherited associations and secondary summaries can predetermine a reviewer's verdict. | Each is now labelled as an inherited/unverified association or secondary report, to be tested by the panel; cautionary cases are evidence to weigh, not verdicts on a family. | framing |

---

## 2. What was deliberately **not** changed

- **No new harvesting.** No new language, register or company source was added in this pass.
- **No registry edit.** The nine version/addition proposals in `assumption-and-gap-ledger.md` §7 remain proposals.
- **No conflict was resolved by fiat.** Keenat 80–100 °C vs press ~200 °C (C-01), TchaoMegot 50/60 bar vs 280–320 bar (C-02), TerraCycle sanitisation (C-03), MéGo! 2,000/4,000 butts per kg (C-04) all remain open.
- **No favourable finding was diluted into false balance.** Re-Cig's external wastewater disclosure and MéGo!'s company mass split stay in the record; they are simply described without praise or inferred intent.
- **No proof standard was lowered.** The absence of assays remains a gap, not a licence to assume safety.
- **Stage 3 not started.** A/B/C pending, judge waiting, acceptance false, revision rounds still 0 (this is pre-launch QC, not a panel revision).

## 3. Residual limits of this correction pass

1. The author is the same worker that wrote v1.0; this is self-correction, not independent review. The external reviewer's own read is the only second pass, and it did not recompute all hashes or fetch every patent.
2. `reports/gap-check-01.md` is itself a prior same-author note. Adding it to the packet makes its B-claim distinction visible; it does not make that distinction independently verified. A worker should treat it as a prior reading with its own limits (B PDF failed, figures not digitised).
3. The Keenat 80–100 °C transcription was read from the Google Patents page in the Arena session; the reviewer could not independently fetch it. It is retained as a transcribed disclosure, flagged for verification, not as a certified quotation.
4. The Korean paving-stone and Keenat LCA notes remain secondary summaries. They are retained because they are material evidence of failure/retreat, with provenance stated, not because they settle a family.
5. Counting corrections depend on the Arena session record, which was not supplied as a raw log. The 20-invocation figure is the worker's own record.

## 4. Pointers

- Launch sheet: `packets/batch-01/stage-3/LAUNCH.md`
- Frozen v1.1 manifest: `packets/batch-01/stage-3/manifest.yaml`
- Content commit record: `packets/batch-01/stage-3/COMMIT.txt` (written after the freeze commit)
- v1.0 snapshot: commit `0c0b6f2ff900a1866a0ed456c87e78661fa2f4ea`
