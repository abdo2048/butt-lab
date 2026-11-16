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
Every record, page, and asset must appear in `manifest.yaml`. There is no transitive inclusion — a relationship pointing to an unlisted target fails validation with `MANIFEST_MISSING_TARGET`.

### Non-transitive relationships
Relationships (e.g., `claim` → `source`) are validated for manifest membership, but they do **not** pull unlisted records into the closure. The manifest is the gate.

### Public-safe audit references
Audit references in records must point to public artifacts (DOI, patent number, public URL). References into repository working directories (`state/`, `panels/`, `packets/`, `materials/gap-closing/`, `.superpowers/`, session logs) are rejected with `AUDIT_REFERENCE_EXPOSES_INTERNAL_PATH`.

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

| Code | Meaning | Correction Example |
|------|---------|-------------------|
| `YAML_PARSE_ERROR` | YAML syntax error or duplicate key | Fix YAML syntax; remove duplicate keys |
| `YAML_DUPLICATE_KEY` | Duplicate key in YAML mapping | Remove duplicate key |
| `SCHEMA_VALIDATION_ERROR` | Record does not match its Zod schema | Ensure all required fields present and types match |
| `MANIFEST_DUPLICATE_ID` | Same ID appears in multiple manifest sections | Use unique IDs across records, pages, assets |
| `MANIFEST_DUPLICATE_PATH` | Same path appears multiple times | Each file listed once |
| `MANIFEST_HASH_MISMATCH` | File SHA-256 does not match manifest | Recalculate hash: `sha256sum <file>` and update manifest |
| `MANIFEST_FILE_MISSING` | Listed file does not exist | Add file or remove from manifest |
| `MANIFEST_MISSING_TARGET` | Relationship target not in manifest | Add target to manifest or remove relationship |
| `PATH_OUTSIDE_PUBLICATION_ROOT` | Path escapes `publication/` directory | Use relative paths inside `publication/` only |
| `FORBIDDEN_PREFIX` | Path uses forbidden prefix (`../state/`, `../panels/`, etc.) | Move file inside `publication/` or use public reference |
| `AUDIT_REFERENCE_EXPOSES_INTERNAL_PATH` | Audit reference points to internal working directory | Replace with public DOI, patent number, or public URL |
| `RECORD_NAMESPACE_MISMATCH` | Record kind does not match its directory | Place record in correct subdirectory under `records/` |
| `MARKDOWN_RAW_HTML` | Page contains raw HTML tags | Use Markdown only; no raw HTML |
| `CLAIM_LOCATOR_REQUIRED` | Source-supported claim missing `locator` | Add `locator` field with source location |
| `CLAIM_QUANTITATIVE_BASIS_REQUIRED` | Proposition contains a number without `quantitativeBasis` | Add `quantitativeBasis` or remove number if it's a year/identifier |
| `INFERENCE_INVALID` | Inference missing premises, reasoning, or derived-from-sourced-premises | Provide all required fields; premises must be source-supported/conflicted claims |
| `GAP_CLOSING_INVALID` | Gap-closing note missing required fields | Provide sourceInputs, assumptions, falsifier, derived-from-sourced-premises, requires-human-validation |
| `ASSESSMENT_INVALID` | Assessment score not in catalog or invalid validationState | Use criterion IDs from rubrics.yaml; validationState must be scored/unknown/not-applicable |
| `RUBRICS_CATALOG_INVALID` | Rubrics file does not match schema | Ensure 8 criteria, 5 bands each, correct structure |
| `RUBRICS_REFERENCE_MISMATCH` | Assessment references unknown criterion or band | Use only criterion IDs and band scores defined in rubrics.yaml |
| `ASSET_EXTENSION_NOT_ALLOWED` | Asset file extension not in allowlist | Use only allowed extensions; no active web formats |
| `EXPORT_POLICY_VIOLATION` | Export would include internal path | Ensure all listed files pass path policy |
| `CLI_INVALID_USAGE` | Unknown flag, missing value, duplicate flag, or positional extra | Check command syntax: `schema --out <dir>`, `validate --root <root>`, `export --root <root> --out <dir>` |

## 10. Human gates

**Validation and export do not:**

- Approve scientific claims or methods
- Validate that a recycling process is clean, safe, costed, or environmentally superior
- Publish or deploy content
- Authorize experiments

**Every publication version requires explicit human operator approval** before publication. The operator records the decision in `state/workflow.yaml` and `state/session-log.md`. The exporter cannot publish — it only produces a local build directory (`.publication-build/` by default) that the operator may inspect and then manually promote.