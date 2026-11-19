"""Build a private reviewer inventory, stage a cleared subset, or upload it explicitly."""
from __future__ import annotations

import argparse
import json
from pathlib import Path
import re
import subprocess
from tempfile import TemporaryDirectory

from scripts.reviewer_library import ROOT, collect_pdfs

REPO = ROOT.parents[1]
PRIVATE = REPO / ".research-local" / "reviewer-release"
INVENTORY = PRIVATE / "rights-inventory.json"
CATALOGUE = PRIVATE / "catalogue.json"
WRANGLER = REPO / "tools" / "reader-site" / "node_modules" / ".bin" / "wrangler"


def draft_inventory(root: Path) -> dict:
    documents = collect_pdfs(root)
    return {"version": 1, "documents": [
        {"sha256": doc.digest, "filename": doc.path.name, "size": doc.path.stat().st_size,
         "originalPaths": doc.aliases, "clearance": "pending", "clearanceNote": ""}
        for doc in sorted(documents.values(), key=lambda doc: doc.path.name.casefold())
    ]}


def cleared_files(inventory: dict, root: Path) -> tuple[dict, list[tuple[str, Path]]]:
    if not isinstance(inventory, dict) or inventory.get("version") != 1 or not isinstance(inventory.get("documents"), list):
        raise ValueError("Invalid reviewer inventory")
    originals = collect_pdfs(root)
    rows = []
    files = []
    seen = set()
    for row in inventory["documents"]:
        if not isinstance(row, dict) or row.get("clearance") not in {"pending", "excluded", "cleared"}:
            raise ValueError("Every document must have a valid clearance state")
        digest = row.get("sha256")
        if not isinstance(digest, str) or digest in seen:
            raise ValueError("Invalid or repeated document hash")
        seen.add(digest)
        if row["clearance"] != "cleared":
            continue
        note = row.get("clearanceNote")
        if not isinstance(note, str) or not note.strip():
            raise ValueError(f"No clearance evidence recorded for {digest}")
        doc = originals.get(digest)
        if doc is None or doc.path.name != row.get("filename") or doc.path.stat().st_size != row.get("size"):
            raise ValueError(f"The original PDF is missing or changed: {digest}")
        with doc.path.open("rb") as stream:
            if stream.read(5) != b"%PDF-":
                raise ValueError(f"Invalid PDF header: {digest}")
        if len(doc.path.name.encode("utf-16-le")) > 510 or re.search(r"[\x00-\x1f\x7f/\\]", doc.path.name):
            raise ValueError(f"Unsafe PDF filename: {digest}")
        rows.append({"sha256": digest, "filename": doc.path.name, "size": row["size"]})
        files.append((f"pdfs/{digest}.pdf", doc.path))
    if not rows:
        raise ValueError("No PDFs are cleared for hosted reviewer access. Review the local inventory first.")
    return {"version": 1, "documents": rows}, files


def upload(bucket: str, entries: list[tuple[str, Path]], wrangler: Path, catalogue: Path) -> None:
    # A file is unreachable through the gateway until its hash is in this catalogue.
    for key, source in [*entries, ("catalogue.json", catalogue)]:
        subprocess.run([
            str(wrangler), "r2", "object", "put", f"{bucket}/{key}", "--remote", "--file", str(source),
            "--content-type", "application/pdf" if key.endswith(".pdf") else "application/json",
            "--cache-control", "private, no-store",
        ], check=True)


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("action", choices=["inventory", "stage", "upload"])
    parser.add_argument("--private-bucket", help="Explicitly name an existing bucket with public access disabled (upload only)")
    parser.add_argument("--confirm-upload", action="store_true", help="Confirm rights and verify bucket settings before using this flag")
    parser.add_argument("--wrangler", type=Path, default=WRANGLER)
    args = parser.parse_args()
    if args.action == "upload" and (
        not args.confirm_upload or not args.private_bucket or not re.fullmatch(r"[a-z0-9][a-z0-9-]{1,61}[a-z0-9]", args.private_bucket)
    ):
        parser.error("Upload requires --private-bucket and --confirm-upload")
    try:
        PRIVATE.mkdir(mode=0o700, parents=True, exist_ok=True)
        if args.action == "inventory":
            content = draft_inventory(ROOT)
            if INVENTORY.exists():
                print(f"Inventory already exists (not overwritten): {INVENTORY.relative_to(REPO)}")
            else:
                with INVENTORY.open("x", encoding="utf-8") as stream:
                    json.dump(content, stream, ensure_ascii=False, indent=2)
                    stream.write("\n")
            docs = content["documents"]
            print(f"{len(docs)} unique PDFs across {sum(len(row['originalPaths']) for row in docs)} paths; nothing uploaded.")
            return
        inventory = json.loads(INVENTORY.read_text(encoding="utf-8"))
        catalogue, entries = cleared_files(inventory, ROOT)
        content = json.dumps(catalogue, ensure_ascii=False, indent=2) + "\n"
        if args.action == "upload":
            with TemporaryDirectory(dir=PRIVATE) as temporary:
                upload_catalogue = Path(temporary) / "catalogue.json"
                upload_catalogue.write_text(content, encoding="utf-8")
                upload(args.private_bucket, entries, args.wrangler, upload_catalogue)
            print(f"Uploaded {len(entries)} PDF objects and their private catalogue.")
        else:
            CATALOGUE.write_text(content, encoding="utf-8")
            print(f"{len(entries)} cleared PDFs staged by reference; nothing uploaded.")
    except (ValueError, OSError, subprocess.CalledProcessError) as error:
        parser.exit(1, f"Reviewer release not completed: {error}\n")


if __name__ == "__main__":
    main()
