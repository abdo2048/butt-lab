# Maintenance Batch 01 — Registry Bookkeeping Corrections

Date: 2026-11-02
Scope: bounded repository-maintenance batch. No new harvest, no scientific
research, no process invention, no research-phase advancement.
Preceded by: `reports/audits/recovery-reconciliation.md` (audit of snapshot
54ab400).

## 1. What was done

This batch corrected specific bookkeeping errors flagged by the audit and added
basic registry-preservation checks. Every change was a small, targeted edit; no
file was deleted, renamed, or truncated.

### 1.1 Registry corrections (`registry/methods.yaml`)

| Record | Error | Fix |
|---|---|---|
| `huang-us10980272` | `status` field absent; `legal_status` held the value `primary-source-read` (a reading state stored in a legal field) | Restored `status: primary-source-read`; corrected `legal_status` to `Active, expires 2039-06-04 (Google Patents assumption; verify USPTO)`; added `citations: https://patents.google.com/patent/US10980272B2/en` |
| `cn106928486` | Had `status: primary-source-read` but no `citations` field | Added `citations: https://patents.google.com/patent/CN106928486A/en` |

The audit had also flagged `mego-fr3066128a1`, `de-fenzo-2020-materials`, and
`matteri-ep2520184a1` for review. These were inspected and found complete and
consistent with their evidence notes; no changes were needed.

### 1.2 Tracker correction (`state/progress.md`)

- Corrected the confusion between **file lines** (288) and **method records**
  (27 in the backup, 30 in the current registry).
- Corrected the claim that all registry entries "now have specs + unknowns
  lists": zero completed specs exist under `specs/` (only `TEMPLATE.md`).
  The UNCOVER exit criteria are therefore not met.
- Added a dated CORRECTION section (per charter rule: append, never rewrite
  history) recording both corrections.

### 1.3 Agent config alignment (`agents/harvester.md`)

- Exit criteria said "from your region AND globe"; changed to "globally" to
  match `charter.md` § Phases ("ALL sources gathered worldwide").

### 1.4 Preservation checks (new)

- `scripts/validate_registry.py` — validates `registry/methods.yaml` against
  schema and completeness rules: required fields, valid `status` values, valid
  `source_type` values, citations required for verified statuses, duplicate IDs,
  duplicate YAML mapping keys, and evidence-note path existence.
- `tests/test_validate_registry.py` — 15 test cases covering every rule above,
  including negative cases (missing required field, invalid status, invalid
  source type, verified status without citations, empty citations list,
  duplicate IDs, missing evidence note, invalid citations formats).

## 2. Verification results

```
$ python3 scripts/validate_registry.py
Validating registry\methods.yaml...
Found 30 entries

VALIDATION PASSED: All entries valid

$ python3 tests/test_validate_registry.py
[OK] test_load_registry_valid passed
[OK] test_load_registry_missing_entries passed
[OK] test_load_registry_invalid_yaml passed
[OK] test_validate_entry_minimal passed
[OK] test_validate_entry_missing_required passed
[OK] test_validate_entry_invalid_status passed
[OK] test_validate_entry_invalid_source_type passed
[OK] test_validate_entry_verified_needs_citations passed
[OK] test_validate_entry_verified_with_citations passed
[OK] test_validate_entry_empty_citations_list passed
[OK] test_check_duplicate_ids passed
[OK] test_check_duplicate_ids_none passed
[OK] test_validate_entry_patents_list passed
[OK] test_validate_entry_gaps_list passed
[OK] test_validate_entry_citations_formats passed
[OK] test_validate_entry_evidence_notes passed

[OK] All tests passed!
```

## 3. Preservation guarantees

- All 30 registry record IDs preserved; no record removed, renamed, or truncated.
- `registry/methods-old.yaml` (backup) **not modified**.
- No file deleted. `reports/harvest-batch-01.md` preserved with a dated
  reconciliation note appended rather than rewritten.
- `git status` shows only the intended modifications:
  `agents/harvester.md`, `registry/methods.yaml`, `state/progress.md`, plus the
  new `scripts/` and `tests/` directories.

## 4. Out of scope (explicitly not done)

- No new harvest, discovery query, or source retrieval.
- No scientific validation, patent-status opinion, or freedom-to-operate
  determination.
- No phase advancement. Phase 1 exit criteria (>=25 sourced entries, or 3
  consecutive passes with zero new findings) remain unverified; the registry
  count alone is not a source-quality gate.
- No registry rewrite. All changes were targeted field-level edits.

## 5. Next bounded batch (not executed here)

Per audit recommendation §9: repair remaining field-level normalization,
complete source extraction for `cn106928486` and the De Fenzo paper, identify
the CNR offering's patent, and extend the validator with backup-ID preservation
and unexpectedly-removed-field checks before any proposed central-registry
update is accepted.

## 6. Correction (added 2026-11-02, after the audit was re-run)

This section records the second half of the maintenance batch, executed after
the audit's §9 recommendations. No new harvest, discovery query, source
retrieval, scientific validation, patent-status opinion, or phase advancement
occurred. Every change was a small, targeted edit; no file was deleted, renamed,
or truncated, and `registry/methods-old.yaml` was not modified.

### 6.1 Validator hardening (`scripts/validate_registry.py`)

| Check added | What it catches |
|---|---|
| Duplicate YAML mapping keys | `PyYAML safe_load` silently keeps the last duplicate key; a custom `LoaderWithDupCheck` + `no_duplicates_constructor` now raises `DupKeyError`, caught by `load_registry_strict()`, which exits 1 with a clear message. |
| Backup-record preservation | `check_backup_preservation()` loads `registry/methods-old.yaml` and errors if any of its 27 record IDs is absent from the current registry, or if the current registry is empty while the backup is not. |
| Evidence-note path validation | `validate_evidence_note_path()` requires the path to exist, be a regular file (not a directory), and resolve under `dossier/evidence/` within the repo root. |
| Malformed (non-dict) registry entries | `validate_entry()` and the `main()` entry loop now guard against non-mapping records with a clear error instead of crashing. |
| Non-mapping root / missing `entries` key | `load_registry_strict()` rejects both before any entry processing. |

`main()` still hardcodes `registry/methods.yaml` and ignores `sys.argv` —
deliberately unchanged and documented.

### 6.2 Reproduction harness (`_synth_test/reproduce_failures.py`)

A scratch reproduction script (untracked) that writes five synthetic YAML
fixtures and confirms each failure mode is now correctly **rejected**:

1. duplicate mapping keys — `load_registry_strict()` exits 1
2. empty current registry with a non-empty backup — `check_backup_preservation()` errors
3. missing backup ID — `check_backup_preservation()` errors
4. malformed (non-dict) entry — `validate_entry()` errors
5. evidence note that is a directory — `validate_entry()` errors

Result: all five failure modes are now correctly rejected.

### 6.3 Test suite (`tests/test_validate_registry.py`)

Nine new tests added (24 total), all passing:

- `test_load_registry_strict_rejects_duplicate_keys`
- `test_check_backup_preservation_empty_current`
- `test_check_backup_preservation_missing_backup_id`
- `test_check_backup_preservation_all_present`
- `test_validate_entry_malformed_entry`
- `test_validate_entry_evidence_note_directory`
- `test_validate_entry_evidence_note_outside_root`

### 6.4 Verification results (re-run)

```
$ python3 scripts/validate_registry.py
Validating registry\methods.yaml...
Found 30 entries

VALIDATION PASSED: All entries valid

$ python3 tests/test_validate_registry.py
[OK] test_load_registry_valid passed
[OK] test_load_registry_missing_entries passed
[OK] test_load_registry_invalid_yaml passed
[OK] test_validate_entry_minimal passed
[OK] test_validate_entry_missing_required passed
[OK] test_validate_entry_invalid_status passed
[OK] test_validate_entry_invalid_source_type passed
[OK] test_validate_entry_verified_needs_citations passed
[OK] test_validate_entry_verified_with_citations passed
[OK] test_validate_entry_empty_citations_list passed
[OK] test_check_duplicate_ids passed
[OK] test_check_duplicate_ids_none passed
[OK] test_validate_entry_patents_list passed
[OK] test_validate_entry_gaps_list passed
[OK] test_validate_entry_citations_formats passed
[OK] test_validate_entry_evidence_notes passed
[OK] test_load_registry_strict_rejects_duplicate_keys passed
[OK] test_check_backup_preservation_empty_current passed
[OK] test_check_backup_preservation_missing_backup_id passed
[OK] test_check_backup_preservation_all_present passed
[OK] test_validate_entry_malformed_entry passed
[OK] test_validate_entry_evidence_note_directory passed
[OK] test_validate_entry_evidence_note_outside_root passed

[OK] All tests passed!
```

### 6.5 Remaining limitations (not fixed, documented)

- The validator checks schema and preservation invariants; it does **not**
  verify scientific validity, patent identity/family, or legal status.
- `validate_evidence_note_path()` resolves the evidence root against
  `Path.cwd()`, so it must be run from the repository root.
- The reproduction harness in `_synth_test/` is untracked scratch; its
  evidence is recorded here rather than deleted.
- Backup-preservation compares record IDs only; it does not detect silently
  removed *fields* from a shared record (audit §9 item 4, partially addressed
  by the duplicate-key and required-field checks).
- The `>=25 sourced entries` Phase 1 exit box remains unresolvable by counting
  rows: evidence depth is incomplete for 24 of 30 records.

### 6.6 Housekeeping (added 2026-11-02)

- `scripts/__pycache__/validate_registry.cpython-311.pyc` — a tracked Python
  bytecode cache committed in `d08900d` — was untracked with `git rm --cached`.
  Cache artifacts should not live under version control; the file remains on
  disk for running scripts but is no longer tracked.
- `.gitignore` created with `__pycache__/`, `*.pyc`, and `_synth_test/`.
- `_synth_test/` is retained as untracked scratch (its reproduction evidence is
  recorded in §6.2 and §6.3, not deleted).