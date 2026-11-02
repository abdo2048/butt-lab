#!/usr/bin/env python3
"""
Registry Validator for butt-lab method registry.

Validates registry/methods.yaml against schema and completeness rules.
Exits with code 0 on success, non-zero on validation failures.
"""

import sys
import yaml
from pathlib import Path
from typing import Any, Dict, List, Optional, Tuple


REQUIRED_FIELDS = [
    "id",
    "name",
    "source_type",
    "status",
]

OPTIONAL_FIELDS = [
    "assignee",
    "patents",
    "mechanism_class",
    "disclosed",
    "gaps",
    "legal_status",
    "citations",
    "evidence_notes",
    "outputs",
    "equipment",
]

VALID_STATUSES = [
    "pending_deep_dive",
    "primary-source-read",
    "experimentally-supported-in-source",
]

VALID_SOURCE_TYPES = [
    "patent",
    "peer-reviewed",
    "patent + company",
    "patent_offering",
    "peer-reviewed research",
    "trade-secret",
    "patent + peer-reviewed + company",
    "patent (abandoned)",
    "patent (expired)",
    "patent (PCT)",
    "company disclosure",
    "peer-reviewed (2025)",
    "company disclosure + research",
]


def load_registry(path: Path) -> Dict[str, Any]:
    """Load and parse the registry YAML file."""
    try:
        with open(path, "r", encoding="utf-8") as f:
            data = yaml.safe_load(f)
    except yaml.YAMLError as e:
        print(f"ERROR: Failed to parse YAML: {e}")
        sys.exit(1)
    except FileNotFoundError:
        print(f"ERROR: Registry file not found: {path}")
        sys.exit(1)

    if not isinstance(data, dict):
        print("ERROR: Registry root must be a mapping")
        sys.exit(1)

    if "entries" not in data:
        print("ERROR: Registry missing 'entries' key")
        sys.exit(1)

    if not isinstance(data["entries"], list):
        print("ERROR: 'entries' must be a list")
        sys.exit(1)

    return data


def validate_entry(entry: Dict[str, Any], idx: int) -> List[str]:
    """Validate a single registry entry. Returns list of error messages."""
    errors = []

    # Check required fields
    for field in REQUIRED_FIELDS:
        if field not in entry:
            errors.append(f"Entry {idx} ({entry.get('id', 'NO-ID')}): missing required field '{field}'")

    # Validate id format
    if "id" in entry:
        if not isinstance(entry["id"], str) or not entry["id"].strip():
            errors.append(f"Entry {idx}: 'id' must be a non-empty string")

    # Validate name
    if "name" in entry:
        if not isinstance(entry["name"], str) or not entry["name"].strip():
            errors.append(f"Entry {idx} ({entry['id']}): 'name' must be a non-empty string")

    # Validate source_type
    if "source_type" in entry:
        if entry["source_type"] not in VALID_SOURCE_TYPES:
            errors.append(
                f"Entry {idx} ({entry.get('id', '?')}): invalid source_type '{entry['source_type']}'. "
                f"Valid: {', '.join(VALID_SOURCE_TYPES)}"
            )

    # Validate status
    if "status" in entry:
        if entry["status"] not in VALID_STATUSES:
            errors.append(
                f"Entry {idx} ({entry.get('id', '?')}): invalid status '{entry['status']}'. "
                f"Valid: {', '.join(VALID_STATUSES)}"
            )

    # Check citations requirement for verified statuses
    verified_statuses = {"primary-source-read", "experimentally-supported-in-source"}
    if entry.get("status") in verified_statuses:
        citations = entry.get("citations")
        if not citations:
            errors.append(
                f"Entry {idx} ({entry.get('id', '?')}): status '{entry['status']}' "
                f"requires 'citations' field (URL or list of URLs)"
            )
        elif isinstance(citations, list) and len(citations) == 0:
            errors.append(
                f"Entry {idx} ({entry.get('id', '?')}): 'citations' list cannot be empty for verified status"
            )

    # Validate patents field
    if "patents" in entry:
        if not isinstance(entry["patents"], list):
            errors.append(f"Entry {idx} ({entry.get('id', '?')}): 'patents' must be a list")
        else:
            for p in entry["patents"]:
                if not isinstance(p, str):
                    errors.append(f"Entry {idx} ({entry.get('id', '?')}): patent entry must be string")

    # Validate gaps field
    if "gaps" in entry:
        if not isinstance(entry["gaps"], list):
            errors.append(f"Entry {idx} ({entry.get('id', '?')}): 'gaps' must be a list")

    # Validate evidence_notes paths
    if "evidence_notes" in entry:
        if not isinstance(entry["evidence_notes"], list):
            errors.append(f"Entry {idx} ({entry.get('id', '?')}): 'evidence_notes' must be a list")
        else:
            for note_path in entry["evidence_notes"]:
                if not isinstance(note_path, str):
                    errors.append(f"Entry {idx} ({entry.get('id', '?')}): evidence note path must be string")
                else:
                    full_path = Path("dossier/evidence") / note_path if not note_path.startswith("dossier/") else Path(note_path)
                    if not full_path.exists():
                        errors.append(f"Entry {idx} ({entry.get('id', '?')}): evidence note not found: {full_path}")

    # Validate citations format
    if "citations" in entry:
        cit = entry["citations"]
        if isinstance(cit, str):
            if not cit.strip():
                errors.append(f"Entry {idx} ({entry.get('id', '?')}): 'citations' string cannot be empty")
        elif isinstance(cit, list):
            if len(cit) == 0:
                errors.append(f"Entry {idx} ({entry.get('id', '?')}): 'citations' list cannot be empty")
            for c in cit:
                if not isinstance(c, str) or not c.strip():
                    errors.append(f"Entry {idx} ({entry.get('id', '?')}): citation must be non-empty string")
        else:
            errors.append(f"Entry {idx} ({entry.get('id', '?')}): 'citations' must be string or list")

    return errors


def check_duplicate_ids(entries: List[Dict[str, Any]]) -> List[str]:
    """Check for duplicate entry IDs."""
    seen = {}
    errors = []
    for idx, entry in enumerate(entries):
        eid = entry.get("id")
        if eid in seen:
            errors.append(f"Duplicate ID '{eid}' at entries {seen[eid]+1} and {idx+1}")
        else:
            seen[eid] = idx
    return errors


def main() -> int:
    registry_path = Path("registry/methods.yaml")

    print(f"Validating {registry_path}...")
    data = load_registry(registry_path)
    entries = data["entries"]

    print(f"Found {len(entries)} entries")

    all_errors = []

    # Check duplicates
    all_errors.extend(check_duplicate_ids(entries))

    # Validate each entry
    for idx, entry in enumerate(entries):
        all_errors.extend(validate_entry(entry, idx + 1))

    # Summary
    if all_errors:
        print(f"\nVALIDATION FAILED: {len(all_errors)} error(s)")
        for err in all_errors:
            print(f"  - {err}")
        return 1
    else:
        print("\nVALIDATION PASSED: All entries valid")
        return 0


if __name__ == "__main__":
    sys.exit(main())