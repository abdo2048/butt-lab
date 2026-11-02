# Recovery reconciliation audit

Audit date: 2026-11-02
Repository: abdo2048/butt-lab
Branch: main
Audited snapshot: 54ab400d4185344d6e5539ecfc59bcaa07ea9a9f
Scope: repository reconciliation only; no new harvest, scientific validation, patent-status opinion, registry rewrite, deletion, or phase advancement.

## 1. Verdict

The current registry preserves all 27 record IDs from the available backup. It contains 30 records: 24 unchanged backup records, three modified backup records, and three added records. No duplicate IDs were found. Recovery is successful at record-ID level, but it is not a byte-identical restoration and does not establish scientific validity. One previously present field was removed from the Miniwiz record.

Overall harvesting is not complete. Six linked evidence notes exist; no completed process specifications exist under specs/, which contains only TEMPLATE.md. Do not interpret file lines, recovered records, evidence notes, or a completed batch as completed worldwide research.

## 2. Inputs and comparison method

Primary audit inputs at the snapshot above:
- [Current registry](../../registry/methods.yaml)
- [Backup registry](../../registry/methods-old.yaml)
- [Progress tracker](../../state/progress.md)
- [Batch report](../harvest-batch-01.md)
- [Earlier harvest log](../harvest-log.md)
- Six files in [dossier/evidence](../../dossier/evidence/)
- Directory listings for reports/, specs/, and inventions/.

Both registry texts were parsed with Python/PyYAML, including duplicate mapping-key checks. Record IDs, field values, field presence, and evidence-note references were compared. The UTF-8 text used for the comparison was verified against Git's blob hashing scheme, including exact byte length:

| Input | Bytes | Lines | Git blob SHA |
|---|---:|---:|---|
| registry/methods-old.yaml | 12228 | 288 | ca6f214772774b4aab26ba22bfbc77a76abb248f |
| registry/methods.yaml | 15585 | 329 | e2b8e91e072fa6567f2b258bee1aa4099ac26788 |

The audited branch commit is immutable; later repository changes may supersede this report. Links above are navigational repository links. For the exact audited versions, use the recorded snapshot commit.

Limits: the backup is the comparison baseline, not proof of everything present before the accident. The cause and timing of the accident are reported in the tracker; this audit does not independently reconstruct them from a full session/commit history. It does not reproduce experiments, verify every patent identity/family, or establish freedom to operate. A source-reading note is not an independent reproduction or a certified safety finding.

## 3. Inventory and preservation results

| Check | Result |
|---|---:|
| Backup records / unique IDs | 27 / 27 |
| Current records / unique IDs | 30 / 30 |
| Missing backup IDs in current registry | 0 |
| Added current IDs | 3 |
| Unchanged shared records, comparing all parsed fields | 24 |
| Changed shared records | 3 |
| Duplicate IDs, either registry | 0 |
| Duplicate YAML mapping keys, either registry | 0 |
| Existing evidence notes / linked evidence-note paths | 6 / 6 |
| Broken linked evidence-note paths | 0 |
| Current records with linked evidence notes | 6 |
| Current records without linked evidence notes | 24 |
| Completed specs under specs/, excluding TEMPLATE.md | 0 |
| Completed invention files under inventions/, excluding TEMPLATE.md | 0 |

These counts describe repository artifacts, not unique validated methods or experiments. Both YAML files are syntactically valid; semantic/schema problems remain.

Current status-field distribution:
- pending_deep_dive: 24
- primary-source-read: 3
- experimentally-supported-in-source: 2
- status field absent: 1 (huang-us10980272)

Missing IDs: none. No record was removed from either registry by this audit.

## 4. Changed and added records

### Changed shared record: huang-us10980272
- assignee changed from `Huang et al., US` to Miniwiz Co Ltd (Taiwan), with inventor names added.
- evidence_notes added: dossier/evidence/US10980272B2-miniwiz.md.
- legal_status added with value `primary-source-read`.
- status removed; its backup value was `pending_deep_dive`.
- All other parsed fields are unchanged.
- Finding: a source-reading state was put in a legal-status field. The evidence note describes mechanical separation, while mechanism_class remains TBD. Record retention succeeded, but field-level normalization remains necessary. Do not silently interpret this record as legally reviewed or chemically detoxified.

### Changed shared record: cn106928486
- assignee expanded from `Zhejiang University, CN` to the more specific institution/name-history wording in the current record.
- gaps gained `numeric parameters`.
- legal_status expanded from `CN only` to include a grant-date statement qualified as a Google status assumption.
- status changed from `pending_deep_dive` to `primary-source-read`.
- evidence_notes added: dossier/evidence/CN106928486A-zhejiang.md.
- All other parsed fields are unchanged.
- Finding: the note explicitly records partial abstract/mechanism retrieval. The status must not imply that the full description, examples, claims, or numeric parameters have been extracted. Institution-name translation remains a source-check item, not an audit endorsement.

### Changed shared record: matteri-ep2520184a1
- legal_status expanded to include an application-withdrawal statement attributed to Google Patents.
- status changed from `pending_deep_dive` to `primary-source-read`.
- evidence_notes added: dossier/evidence/EP2520184A1-matteri.md.
- All other parsed fields are unchanged.
- Finding: the note records specific detergent/rinse information, while registry gaps still include washing-solution composition. Reconcile the gap description with the captured claims. Patent statements are not experimentally demonstrated cleaning efficacy or a safe operating recipe.

### Added records
1. mego-fr3066128a1: linked to dossier/evidence/FR3066128A1-mego.md.
2. de-fenzo-2020-materials: linked to dossier/evidence/defenzo-2020-materials.md.
3. cnr-knowledge-share-ca-recovery: linked to dossier/evidence/cnr-knowledge-share-ca-recovery.md.

No other parsed shared records changed relative to the available backup. These additions must not be automatically counted as three independent validated processes.

## 5. Duplicate sources and identity questions

- Confirmed same-publication overlap: academic-green-ethanol-wash cites PMC7659942; de-fenzo-2020-materials cites DOI 10.3390/ma13214710. The [paper](https://pmc.ncbi.nlm.nih.gov/articles/PMC7659942/) identifies both identifiers. Link the records before counting distinct methods. Retain both IDs until a reviewed merge/alias decision is made; a publication can describe multiple stages, so source identity and method identity are separate questions.
- Possible relationship, not proven duplicate: cnr-mask-filters and cnr-knowledge-share-ca-recovery both involve CNR, but the offering note lacks a patent number. Resolve the actual patent identity and family before merging or treating them as independent inventions.
- academic-ca-membranes aggregates more than one publication; other records are broad output categories. The registry currently mixes sources, companies, unit operations, and process families. Do not infer a unique-process total from 30 records.
- No exact duplicate patent identifier was found across different current records. This does not rule out family overlap, mistyped identifiers, or multiple records describing one mechanism. Existing family associations remain unverified.

## 6. Evidence-note reconciliation

All six linked notes exist. Their existence is not evidence of complete retrieval, independent experimental validation, or recovery completeness.

| Registry ID | Note scope / conflict | Required follow-up |
|---|---|---|
| huang-us10980272 | Abstract/claims describe mechanical separation; no detoxification experiment captured. Status is misplaced in legal_status. | Separate process role, reading state, workflow state, and legal metadata. |
| cn106928486 | Note explicitly says the description/claims numerics were not captured, but also uses NOT disclosed language. | Retrieve full text/examples/claims; do not substitute estimates for unextracted source detail. |
| matteri-ep2520184a1 | Partial claims reading supplies some washing composition details; registry still lists composition as a gap. | Narrow the gap to genuinely unresolved parameters and retain source-section references. |
| mego-fr3066128a1 | Note is chiefly abstract/mechanism reading; full French specification is not read. | Mark partial retrieval and extract description/claims before declaring numeric details absent. |
| de-fenzo-2020-materials | Note admits full methods were not extracted; it emphasizes acetone/ethyl acetate, whereas the same paper's Experimental section separates water/ethanol washing from later film preparation. | Read the full methods, distinguish unit operations, reconcile the same-paper record, and avoid treating polymer characterization as universal detoxification proof. |
| cnr-knowledge-share-ca-recovery | Registry says experimentally-supported-in-source; note explicitly calls it a technology-offering claim, not peer-reviewed experimental results, with no patent number captured. | Record offering/claim status and partial reading until the patent or experimental evidence is actually retrieved. |

Terminology to use in subsequent work:
1. source-not-retrieved: no source content obtained;
2. source-partially-read: only specified sections obtained/read;
3. parameter-not-yet-located: not found in the material examined; absence from full source not established;
4. not-disclosed-in-source: use only after adequately checking the relevant full document and stating which sections were examined.

An inaccessible page, partial scrape, search snippet, and a genuinely absent parameter require different actions. Keep them distinct. Source statements about legal status, TRL, or performance remain attributed statements unless independently verified.

## 7. Contradictions in tracking and reports

1. state/progress.md treats 288 lines as 288 registry entries, says all have specs, and estimates 285 remaining verifications. Actual backup/current record counts are 27/30; specs/ contains only a template.
2. The tracker labels recovery complete while its next-action block advances to UNCOVER using the incorrect counts. Recovery and phase readiness are separate decisions.
3. reports/harvest-batch-01.md still says the original registry is lost and must be restored. That is historical text, not current state: the current registry contains all backup IDs. Preserve the report, and later add a dated reconciliation link instead of erasing the incident.
4. reports/harvest-log.md ends with four new entries and a six-entry quota remainder. It is an earlier partial log, not the authoritative current inventory.
5. The batch report describes all three checked leads as primary-source-read; the current Miniwiz record has no status field. Source-reading states also vary between hyphenated registry values and underscored note wording.
6. No complete worldwide search-coverage ledger or harvest sign-off is present in the inspected research artifacts. Three multilingual queries recorded in one batch do not demonstrate worldwide coverage or search saturation.
7. A registry size threshold is not a demonstrated source-quality gate. The unchecked '>=25 sourced entries' box cannot be resolved simply by counting 30 rows: evidence depth is incomplete.

## 8. Metadata and provenance gaps

Eleven current records lack a citations field: huang-us10980272; burich-us7560059; us20140287144-abandoned; us5504119-expired; cn106928486; cn111822484; cn111118670-carbon-fiber; cn107946082-graphene; cn108807014-supercapacitor; kr20160005298; kalabak-ethanol-fuel. Two of these have linked notes with URLs, so a missing inline field does not mean there is no source anywhere. Normalize links transparently.

Other citations are generic home/download pages or incomplete references, including the Korean news lead and concrete-additive. Some patents fields contain placeholders instead of publication identifiers. Qualify these as leads pending identity/source resolution. Do not remove them because of expiry, jurisdiction, access difficulty, lack of DIY equipment, or incomplete verification.

Inherited seed-facts and cautionary files are research leads requiring provenance checks; recovery alone must not promote their claims to verified facts. This audit makes no new legal, safety-certification, or commercial-readiness determination.

## 9. Recommended next bounded batch (not executed here)

1. Preserve methods-old.yaml unchanged. Link this audit from a later tracker correction.
2. In a separately reviewed change, repair Miniwiz status placement, normalize reading-depth fields, and flag the De Fenzo source overlap without deleting records.
3. Complete source extraction for CN106928486 and the De Fenzo paper; identify the CNR offering's patent. Save per-source notes with exact sections, URLs, quotations, retrieval limitations, and explicit unknowns.
4. Add deterministic checks for YAML syntax/duplicate keys, unique IDs, required fields, valid evidence paths, backup-ID preservation, and unexpectedly removed fields. Fail a proposed central-registry update if preservation checks fail until reviewed.
5. Have research agents propose individual changes rather than fully replacing the shared registry. Review and checkpoint small batches. Treat this as a proposed workflow, not an installed enforcement mechanism.
6. Create a coverage ledger for actual queries, languages, available search backends, blocked sources, and remaining leads. Do not require an arbitrary number of new methods.
7. Permit conceptual inventions later, but keep disclosed facts, estimates, executable simulations, and real experimental observations separate. No automatic phase advancement is authorized by this report.

## 10. Audit disposition

- Reconciliation analysis: complete for the snapshot stated above.
- Registry recovery: all backup IDs present; three records modified, including one removed status field.
- Scientific/source verification: partial, not complete.
- Worldwide harvest: ongoing; completion not demonstrated.
- Completed process specifications: zero.
- Registry, backup, evidence notes, prompts, historical logs, and tracker: not modified by this audit.
- This report is the only proposed repository write. Saving and reading it back completes this task; it does not authorize a cleanup, further research, or phase advancement.
