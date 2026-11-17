# Reviewed publication layer

This directory is the reviewed publication layer, not raw research storage.

The manifest is the complete publication allowlist. An empty manifest publishes nothing. Inclusion is explicit and non-transitive: unlisted files and records referenced by listed records do not enter the publication closure. Only approved records may be listed.

Rights to a source and rights to publish a derivative are separate decisions and must be reviewed separately.

Assets are passive files only. The allowed extensions are `.pdf`, `.png`, `.jpg`, `.jpeg`, `.gif`, `.webp`, `.avif`, `.bmp`, `.tif`, `.tiff`, `.txt`, `.csv`, `.tsv`, and `.json`. Active web formats and every unlisted extension are rejected.

Validation and export never deploy or otherwise publish content. Every future publication version requires explicit human operator approval before publication.

## Directory structure

```
publication/
  manifest.yaml                 # Complete allowlist with SHA-256 hashes
  contract/v1/rubrics.yaml      # Canonical assessment rubric catalog
  contract/v1/schema/           # Deterministic JSON schemas (generated)
  records/                      # Typed content records by kind
    materials/
    methods/
    sources/
    claims/
    gaps/
    hypotheses/
    terms/
    assessments/
  pages/                        # Markdown pages (one per record/topic)
  assets/                       # Reviewed public assets
```

## Quick commands (from repository root)

```powershell
# Generate schemas
npm --prefix "tools/publication-contract" run schemas

# Validate live manifest
npm --prefix "tools/publication-contract" run validate

# Export to .publication-build/
npm --prefix "tools/publication-contract" run export

# Type check and test
npm --prefix "tools/publication-contract" run typecheck
npm --prefix "tools/publication-contract" test
```

Full documentation: `docs/publication-content-contract.md`