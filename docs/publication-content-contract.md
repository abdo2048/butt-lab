# Publication Content Contract — Usage and Operator Workflows

## 1. Purpose and authority

The publication layer is **derived** from the repository's research and workflow outputs. The repository's research (materials, packets, panel reports, state/workflow.yaml) remains the authoritative source. The publication contract exists only to enforce structural, rights, and provenance constraints on content that is explicitly approved for public release. Validation and export do not approve scientific claims, validate methods, or publish content — they only enforce the contract.

## 2. Phase-1 boundary

Phase 1 delivers **schemas, validator, and exporter only**. It does not include:

- Any Batch-02 scientific content (methods, claims, gap-closing notes, assessments)
- Any site, deployment, or publishing infrastructure
- Any automatic publication or continuous deployment

The live manifest at `publication/manifest.yaml` remains empty at the end of Phase 1. Fixtures in tests demonstrate behavior without publishing scientific content.

## 3. Directory contract

```
publication/
  manifest.yaml
  contract/v1/rubrics.yaml
  contract/v1/schema/*.schema.json
  records/materials/<id>.yaml
  records/methods/<id>.yaml
  records/sources/<id>.yaml
  records/claims/<id>.yaml
  records/gaps/<id>.yaml
  records/hypotheses/<id>.yaml
  records/terms/<id>.yaml
  records/assessments/<id>.yaml
  pages/<id>.md
  assets/<reviewed-public-asset>
```

### Namespace explanations

| Path | Purpose |
|------|---------|
| `manifest.yaml` | Complete allowlist: every record, page, and asset must be listed with its SHA-256. Inclusion is explicit and non-transitive. |
| `contract/v1/rubrics.yaml` | Canonical assessment rubric catalog (8 criteria, 5 bands each). Referenced by assessments. |
| `contract/v1/schema/*.schema.json` | Deterministic JSON Schema outputs for ContentRecord, PublicationManifest, RubricCatalog. |
| `records/materials/` | Material records — recycling outputs, intermediates, feedstocks. |
| `records/methods/` | Method-family records — process categories with explicit scope boundaries. |
| `records/sources/` | Source records — patents, papers, dossiers, authorizations with access dates and rights. |
| `records/claims/` | Claim records — propositions with evidence state, quantitative basis, and source locators. |
| `records/gaps/` | AI gap-closing notes — marked, sourced, assumed, falsifiable, human-validation required. |
| `records/hypotheses/` | Hypothesis records — inventor hypotheses with premises and open questions. |
| `records/terms/` | Term records — glossary entries with canonical definitions and synonyms. |
| `records/assessments/` | Assessment records — scored/unknown/not-applicable evaluations against rubric criteria. |
| `pages/` | Markdown pages for human-readable explanations (one page per record or topic). |
| `assets/` | Passive reviewed public assets (PDF, images, CSV, JSON, etc.). Active web formats rejected. |

## 4. State vocabularies

Four separate enums govern publication state; they cannot be collapsed because they model independent decisions:

| Enum | Values | Scope |
|------|--------|-------|
| `PublicationState` | `draft`, `approved`, `withdrawn` | Whether a record/page/asset may enter the publication closure. Only `approved` items may be listed in the manifest. |
| `EvidenceState` | `source-supported`, `source-conflicted`, `inference`, `gap-closing-note` | Epistemic status of a claim. Determines which fields are required. |
| `ValidationState` | `scored`, `unknown`, `not-applicable` | Assessment outcome per rubric criterion. No default; each criterion must be explicit. |
| `SourceRight` / `DerivativeRight` | `link-only`, `cc-by-4.0`, `cc-by-sa-4.0`, `cc0-1.0`, `public-domain`, `custom-license` | Rights to the source artifact (sourceRight) and rights to publish a derivative work (derivativeRight) are separate decisions with default deny. |

## 5. Source and derivative rights

**Source rights** (`sourceRight`) describe the license or permission governing the source artifact itself (patent, paper, dossier).

**Derivative rights** (`derivativeRight`) describe the license under which a *derivative* of that source may be published (e.g., an excerpt, translation, or figure redrawn from the source).

These are independent: a source may be `link-only` while a derivative is `cc-by-4.0`, or vice versa. The default for both is **deny** — neither is assumed. Every source and derivative rights decision must be explicit in the source record.

## 6. Assessment contract

Assessments use the **RubricCatalog** from `contract/v1/rubrics.yaml`:

- **8 criterion IDs** (fixed): `evidence-strength`, `process-ease`, `resource-burden`, `contaminant-fate-coverage`, `sink-completeness`, `product-readiness`, `regulatory-clarity`, `validation-maturity`.
- **5 bands per criterion** (scores 1–5) with labels and definitions.
- Each assessment record scores a target record against a subset of criteria.
- Per criterion, the value must be one of: `scored` (with a band score), `unknown`, or `not-applicable`. No implicit defaults.

## 7. Manifest workflow

The manifest is the **single source of truth** for what enters the publication closure.

### Hash calculation
Every listed entry requires a SHA-256 hash of the exact file bytes (UTF-8 for text). The CLI computes hashes during validation and export.

### Explicit listing
Every record, page, and asset must appear in `manifest.yaml`. There is no transitive inclusion — a relationship pointing to an unlisted target fails validation with `RELATIONSHIP_TARGET_UNLISTED`.

### Non-transitive relationships
Relationships (e.g., `claim` → `source`) are validated for manifest membership, but they do **not** pull unlisted records into the closure. The manifest is the gate.

### Public-safe audit references
Audit references in records must point to public artifacts (DOI, patent number, public URL). References into repository working directories (`state/`, `panels/`, `packets/`, `materials/gap-closing/`, `.superpowers/`, session logs) are rejected with `AUDIT_REFERENCE_UNSAFE`.

## 8. Commands

All commands run from the repository root. The publication contract tool is in `tools/publication-contract/`.

### Install (once)
```powershell
npm --prefix "tools/publication-contract" install
```

### Generate deterministic schemas
```powershell
npm --prefix "tools/publication-contract" run schemas
```
Outputs three files to `publication/contract/v1/schema/`:
- `content-record.schema.json`
- `publication-manifest.schema.json`
- `rubric-catalog.schema.json`

These are deterministic — running twice produces byte-identical output.

### Validate publication content
```powershell
npm --prefix "tools/publication-contract" run validate
```
Equivalent to:
```powershell
node tools/publication-contract/src/cli.ts validate --root publication
```
Validates the live manifest at `publication/manifest.yaml` and all listed files. Exits:
- `0` — valid (warnings allowed)
- `1` — contract, rights, manifest, semantic, or export-policy error
- `2` — invalid CLI usage

### Export publication bundle
```powershell
npm --prefix "tools/publication-contract" run export
```
Equivalent to:
```powershell
node tools/publication-contract/src/cli.ts export --root publication --out .publication-build
```
Performs validation, then writes an atomic export bundle to `.publication-build/` (beside the output, not inside). On success prints:
```
EXPORTED version=<version> records=<n> pages=<n> assets=<n> files=<n>
```

### Type check
```powershell
npm --prefix "tools/publication-contract" run typecheck
```
Runs `tsc --noEmit` on the contract tool source.

### Run tests
```powershell
npm --prefix "tools/publication-contract" test
```
Runs all contract, rubrics, policy, manifest, semantic, export, and CLI tests.

## 9. Diagnostics

All diagnostics have stable error codes. The text format is one line per diagnostic:

```
ERROR <CODE> <path> <record-id> <message>
WARNING <CODE> <path> <record-id> <message>
```

### Error codes and correction examples

This table lists every diagnostic code the tool can emit. Codes are stable identifiers;
the message text is not. A code that is absent from this table is not emitted by the
current implementation.

#### Loading and YAML

| Code | Meaning | Correction Example |
|------|---------|-------------------|
| `YAML_PARSE_ERROR` | YAML syntax error | Fix YAML syntax |
| `YAML_DUPLICATE_KEY` | Duplicate key in a YAML mapping | Remove the duplicate key |
| `YAML_NON_STRING_KEY` | YAML mapping key is not a string | Quote the key |
| `CANONICAL_JSON_INVALID_VALUE` | Internal invariant: a value cannot be canonicalised to JSON | Report as a tool defect; no user action |

#### Manifest

| Code | Meaning | Correction Example |
|------|---------|-------------------|
| `MANIFEST_SCHEMA_INVALID` | `manifest.yaml` does not match `PublicationManifestSchema` | Ensure `schemaVersion`, `publicationVersion`, `records`, `pages`, `assets` are present and correctly typed |
| `MANIFEST_DUPLICATE_ID` | Same ID appears more than once | Use unique IDs across records, pages, and assets |
| `MANIFEST_DUPLICATE_PATH` | Same path is listed more than once | List each file once |
| `MANIFEST_HASH_MISMATCH` | A listed file's SHA-256 does not match the manifest | Recompute the hash and update the manifest entry |
| `MANIFEST_FILE_MISSING` | A listed file does not exist | Add the file or remove the manifest entry |
| `MANIFEST_FILE_UNREADABLE` | A listed file exists but cannot be read | Fix file permissions or remove the entry |
| `MANIFEST_RECORD_ID_MISMATCH` | Manifest ID differs from the `id` inside the record | Make the manifest ID and the record ID identical |

#### Records

| Code | Meaning | Correction Example |
|------|---------|-------------------|
| `RECORD_SCHEMA_INVALID` | A listed record does not match `ContentRecordSchema` | Ensure every required field is present and correctly typed |
| `RECORD_NAMESPACE_MISMATCH` | A record's `kind` does not match its directory | Place the record under the matching `records/<kind>/` directory |
| `RECORD_NOT_APPROVED` | A manifest-listed record is not in the `approved` publication state | Remove the record from the manifest until it is approved |
| `SEMANTIC_DUPLICATE_RECORD_ID` | Two records share an ID | Give each record a unique ID |

#### Paths

| Code | Meaning | Correction Example |
|------|---------|-------------------|
| `PATH_INVALID` | Path is empty, contains a backslash, or has an empty or `.` segment | Use forward slashes and no empty or `.` path segments |
| `PATH_OUTSIDE_PUBLICATION_ROOT` | Path is absolute or contains a `..` segment | Use a relative path that stays inside the publication root |
| `PATH_FORBIDDEN` | Path enters a repository-local directory such as `state/`, `registry/`, or `session-log` | Use a public path, or point the reference at a public identifier |
| `PATH_SYMLINK_ESCAPE` | A listed path resolves outside the publication root | Remove the symlink or move the target inside the publication root |

#### Pages and assets

| Code | Meaning | Correction Example |
|------|---------|-------------------|
| `MARKDOWN_RAW_HTML` | A listed page contains raw HTML | Use Markdown only; no raw HTML, no inline scripts |
| `ASSET_UNSAFE_TYPE` | A listed asset's file type is not in the passive-asset allowlist | Use an allowed passive type (`.pdf`, `.png`, `.jpg`, `.jpeg`, `.gif`, `.webp`, `.avif`, `.bmp`, `.tif`, `.tiff`, `.txt`, `.csv`, `.tsv`, `.json`) |
| `ASSET_HASH_MISMATCH` | An asset's bytes changed between validation and export | Re-validate and re-export; do not hand-edit published bytes |

#### Claims

| Code | Meaning | Correction Example |
|------|---------|-------------------|
| `CLAIM_LOCATOR_REQUIRED` | A source-supported claim has no `locator` | Add the `locator` that identifies the supporting location in the source |
| `CLAIM_QUANTITATIVE_BASIS_REQUIRED` | A proposition states a quantity without an explicit `quantitativeBasis` | Add `quantitativeBasis`, or rewrite the proposition so the number is only a year or a source identifier |
| `CLAIM_SOURCE_REQUIRED` | A claim names a source that is not present, or a sourced claim has no source | Add the source record, or clear the source-backed flag |
| `SOURCE_EVIDENCE_CONFLICT` | A claim's evidence state conflicts with its source state | Align the evidence state with the source record |

#### Inferences, gaps, and hypotheses

| Code | Meaning | Correction Example |
|------|---------|-------------------|
| `INFERENCE_PREMISES_REQUIRED` | An inference has no premises | List the claims the inference rests on |
| `INFERENCE_REASONING_REQUIRED` | An inference has no reasoning | State how the premises yield the conclusion |
| `INFERENCE_EVIDENCE_STATE_INVALID` | An inference's evidence state is not allowed | Use an allowed evidence state |
| `GAP_CLOSING_NOTE_INVALID` | A gap-closing note is missing required fields | Provide source inputs, assumptions, falsifier, derived-from-sourced-premises, and requires-human-validation |
| `HYPOTHESIS_FALSIFIER_REQUIRED` | A hypothesis has no falsifier | State the observation that would disprove the hypothesis |
| `HYPOTHESIS_VALIDATION_STATE_INVALID` | A hypothesis's validation state is not allowed | Use an allowed validation state |
| `METHOD_FAMILY_ID_MISMATCH` | A record references a method family that does not exist | Add the method family or correct the reference |

#### Sources and derivatives

| Code | Meaning | Correction Example |
|------|---------|-------------------|
| `SOURCE_LOCAL_COPY_RIGHTS_INVALID` | A `public-local-copy` source has no manifest-listed local artifact, or its hash does not match the manifest | List the local artifact in the manifest with the matching hash |
| `SOURCE_DERIVATIVE_RIGHTS_UNRESOLVED` | A derivative is not cleared for publication | Resolve rights, or remove the derivative from the manifest |
| `SOURCE_DERIVATIVE_PATH_INVALID` | A derivative path is not a normalized relative path inside the publication root, or points into a repository-local directory | Use a forward-slash relative path that stays inside the publication root |
| `SOURCE_DERIVATIVE_HASH_MISMATCH` | A derivative's declared SHA-256 does not match the manifest-listed hash of the same path | Recompute the derivative hash and update the record |

#### Assessments

| Code | Meaning | Correction Example |
|------|---------|-------------------|
| `ASSESSMENT_RUBRIC_VERSION_MISMATCH` | An assessment targets a different rubric version than the catalog | Use the rubric version declared in `rubrics.yaml` |
| `ASSESSMENT_LABEL_MISMATCH` | An assessment's band label does not match the catalog band | Use the band label defined in `rubrics.yaml` |
| `ASSESSMENT_UNKNOWN` | An assessment references a criterion that is not in the catalog | Use only criterion IDs defined in `rubrics.yaml` |
| `ASSESSMENT_SUPPORTING_CLAIM_REQUIRED` | A scored assessment names no supporting claim | Name the claim that supports the score |
| `ASSESSMENT_SUPPORTING_CLAIM_UNLISTED` | An assessment names a supporting claim that is not in the manifest | Add the claim to the manifest or correct the reference |
| `ASSESSMENT_DUPLICATE_CRITERION` | Two assessments answer the same criterion for the same method | Keep exactly one assessment per method and criterion; merge or remove the other |
| `ASSESSMENT_CRITERION_MISSING` | A published method has no assessment for one of the catalog criteria | Add the missing assessment, using the `unknown` status with an `unknownReason` when no evidence exists |

#### Relationships

| Code | Meaning | Correction Example |
|------|---------|-------------------|
| `RELATIONSHIP_TARGET_UNLISTED` | A relationship targets a record that is not in the manifest | Add the target to the manifest or remove the relationship |
| `RELATIONSHIP_TARGET_KIND_MISMATCH` | A relationship targets a record of the wrong kind | Point the edge at a record of the declared `targetKind` |

#### Audit references and URLs

| Code | Meaning | Correction Example |
|------|---------|-------------------|
| `AUDIT_REFERENCE_UNSAFE` | An audit reference points at a repository-local path | Replace it with a public DOI, patent number, or public URL |
| `URL_INVALID` | A public URL is not an absolute, valid URL | Use an absolute `https`/`http` URL |
| `URL_UNSAFE_SCHEME` | A public URL uses a non-web scheme | Use `https` or `http` only |

> The effective URL rule in the loading path is the schema check: a `source.originalUrl`
> that is not an absolute `http`/`https` URL fails with `RECORD_SCHEMA_INVALID`.
> `URL_INVALID` and `URL_UNSAFE_SCHEME` come from the exported `assertSafePublicUrl`
> helper, which callers outside the loader may use directly.

#### Rubrics

| Code | Meaning | Correction Example |
|------|---------|-------------------|
| `RUBRICS_REQUIRED` | `contract/v1/rubrics.yaml` is missing | Restore the rubrics catalog; semantic validation cannot be skipped |
| `RUBRICS_INVALID` | The rubrics catalog does not match `RubricCatalogSchema` | Ensure 8 criteria with 5 bands each and the declared rubric version |

#### Export

| Code | Meaning | Correction Example |
|------|---------|-------------------|
| `STAGE_CLOSURE_MISMATCH` | The staged bundle does not contain exactly the expected files | Re-run the export; do not hand-edit the stage |
| `SYMLINK_ESCAPE` | A record path resolves outside the publication root at export time | Remove the symlink or move the target inside the publication root |

#### CLI

| Code | Meaning | Correction Example |
|------|---------|-------------------|
| `CLI_INVALID_USAGE` | Unknown flag, missing value, duplicate flag, or an unexpected positional argument | Check the syntax: `schema --out <dir>`, `validate --root <root>`, `export --root <root> --out <dir>` |
| `CLI_UNKNOWN_COMMAND` | The command is not one of `schema`, `validate`, `export` | Use one of the three commands |
| `CLI_SCHEMA_OUT_REQUIRED` | `schema` was called without `--out` | Pass the output directory |
| `CLI_VALIDATE_ROOT_REQUIRED` | `validate` was called without `--root` | Pass the publication root |
| `CLI_EXPORT_ROOT_OUT_REQUIRED` | `export` was called without `--root` or `--out` | Pass both the publication root and the output directory |

### Warnings

Warnings do not block an export and never change scientific or publication state.

| Code | Meaning |
|------|---------|
| `DERIVATIVE_QUALITY_WARNING` | A derivative declares a quality warning that an operator should read before publishing |

## 10. Human gates

**Validation and export do not:**

- Approve scientific claims or methods
- Validate that a recycling process is clean, safe, costed, or environmentally superior
- Publish or deploy content
- Authorize experiments

**Every publication version requires explicit human operator approval** before publication. The operator records the decision in `state/workflow.yaml` and `docs/history/session-log.md`. The exporter cannot publish — it only produces a local build directory (`.publication-build/` by default) that the operator may inspect and then manually promote.

## 11. Contract-to-design reconciliation audit (2026-11-16)

This section records a line-by-line audit of the contract against the reader-platform design specification (`docs/history/superpowers/specs/2026-11-13-butt-lab-reader-platform-design.md`). Each design rule was either confirmed as already enforced, fixed with a named failing-then-passing test, or recorded as a deliberate deferral.

### Rules confirmed as already enforced

| Design rule | Where it is enforced | Notes |
|-------------|----------------------|-------|
| §5.2 / §12.8 — only an `approved` record may enter the publication manifest | `src/manifest-validation.ts` fails with `RECORD_NOT_APPROVED` before the record is loaded | A `draft` or `excluded` record can never reach the bundle, because only manifest-listed records are loaded at all |
| §12.8 — inclusion is not transitive; a relationship to an unlisted record is a build error | `src/manifest-validation.ts` loads records only from manifest entries; `src/semantic-validation.ts` reports `RELATIONSHIP_TARGET_UNLISTED`, `CLAIM_SOURCE_REQUIRED`, `INFERENCE_PREMISES_REQUIRED` and `ASSESSMENT_SUPPORTING_CLAIM_UNLISTED` | Audit references are deliberately outside the relationship model, which is the design's public-safe escape hatch |
| §13.1 — every output file must be accounted for by manifest-derived closure | `src/export.ts` compares the stage directory against the expected closure and fails with `STAGE_CLOSURE_MISMATCH` | The exporter also replaces the output only after the stage closes successfully |
| §12.8 / §13.1 — a local artifact may not be published without `public-local-copy` rights | `src/semantic-validation.ts` reports `SOURCE_LOCAL_COPY_RIGHTS_INVALID` before staging | The exporter's own skip is redundant defence in depth |

### Rules fixed in this audit

| Design rule | What was wrong | Fix |
|-------------|-----------------|-----|
| §9.1 — one assessment per criterion per method | Nothing prevented two assessments answering the same criterion for the same method, and nothing required a published method to carry an answer for every catalog criterion. The comparison surface has exactly one cell per (method, criterion) pair, so a duplicate is a contradiction and a hole reads as silence | New diagnostics `ASSESSMENT_DUPLICATE_CRITERION` and `ASSESSMENT_CRITERION_MISSING`, checked across the loaded record set in `validatePublicationSemantics`. A missing answer is recorded explicitly with the `unknown` assessment status rather than omitted |
| §8.3 — a `link-only` or `rights-unresolved` source must not publish its local artifact | The rule was enforced but no test proved it. The existing fixture declared a placeholder asset hash, so the export failed on the hash before it could fail on the rights, and the test passed for the wrong reason | Two named tests now build a fixture whose asset hash is correct, so the rights rule is the only thing that can fail the export: one for `rights-unresolved`, one for `link-only` |

### Deliberate deferrals (documented, not coded)

- **Content-kind drift guard.** The generated schema already contains exactly the five canonical content kinds, so a guard test would only characterize existing behaviour. Deriving the claim kind from the canonical constant is behaviour-preserving and was judged not worth a schema change at this point; the constant remains the single source of truth in `src/model/states.ts`.
- **Automated scientific approval.** Design §14.5 requires a human to review claims, locators, score rationales, uncertainty, dissent, AI boundaries, rights and public exposure. No automated check in this contract can stand in for that review, and none is attempted here.