"""Rebuild a file inventory from saved receipts; performs no network requests."""
import csv
import hashlib
import io
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
EXCLUDED = {"inventory.csv", "inventory.json", "checksums.sha256"}


def build():
    downloads = json.loads((ROOT / "receipts/downloads.json").read_text())
    urls = {}
    for row in downloads:
        urls[row["path"]] = row["source_url"]
        urls[str(Path(row["path"]).with_suffix(".txt"))] = row["source_url"]
    calls = []
    for path in sorted((ROOT / "receipts").glob("[0-9][0-9]-*.json")):
        record = json.loads(path.read_text())
        calls.append({
            "receipt": str(path.relative_to(ROOT)),
            "source_url": record.get("url", ""),
            "status": "error" if record.get("error") else
                      "search_results" if "hits" in record else
                      "saved_html" if record.get("raw_html") else
                      "saved_content" if record.get("content") else "empty",
            "error": record.get("error", ""),
            "truncated": record.get("truncated", False),
        })
        urls[str(path.relative_to(ROOT))] = record.get("url", "")
        for suffix in [".html", ".mirror.txt", ".fetched.txt"]:
            for folder in ["reports", "literature"]:
                urls[folder + "/" + path.stem + suffix] = record.get("url", "")
        url = record.get("url", "")
        if "/patent/" in url:
            publication = url.split("/patent/", 1)[1].split("/", 1)[0]
            for suffix in [".html", ".mirror.txt", ".description-claims.txt",
                           ".claims.mirror.txt"]:
                urls["patents/" + publication + suffix] = url

    rows = []
    for path in sorted(ROOT.rglob("*")):
        if not path.is_file() or path.name in EXCLUDED:
            continue
        data = path.read_bytes()
        relpath = str(path.relative_to(ROOT))
        nonspace = ""
        if path.suffix == ".txt":
            nonspace = "".join(path.read_text(errors="replace").split())
        status = "saved"
        if path.suffix == ".pdf":
            status = "pdf_signature_valid" if data.startswith(b"%PDF-") else "invalid_pdf"
        elif path.suffix == ".txt" and len(nonspace) < 100:
            status = "sparse_or_empty_text_not_searchable"
        rows.append({
            "path": relpath,
            "retrieval_date": "2026-11-08",
            "source_url": urls.get(relpath, ""),
            "bytes": len(data),
            "sha256": hashlib.sha256(data).hexdigest(),
            "status": status,
        })
    summary = {
        "date": "2026-11-08",
        "search_content_calls": len(calls),
        "linked_binary_transfers": len(downloads),
        "pdf_files": sum(r["path"].endswith(".pdf") for r in rows),
        "note": "File counts are not review-completion or closed-gap counts.",
        "calls": calls,
        "files": rows,
    }
    (ROOT / "inventory.json").write_text(
        json.dumps(summary, ensure_ascii=False, indent=2) + "\n")
    buf = io.StringIO()
    writer = csv.DictWriter(buf, fieldnames=list(rows[0]))
    writer.writeheader()
    writer.writerows(rows)
    (ROOT / "inventory.csv").write_text(buf.getvalue())
    (ROOT / "checksums.sha256").write_text(
        "".join(r["sha256"] + "  " + r["path"] + "\n" for r in rows))
    print(json.dumps({
        "files": len(rows), "pdf_files": summary["pdf_files"],
        "search_content_calls": len(calls),
        "errors": [r["receipt"] for r in calls if r["status"] == "error"],
        "sparse_text": [r["path"] for r in rows
                        if r["status"] == "sparse_or_empty_text_not_searchable"],
    }, indent=2))


if __name__ == "__main__":
    build()
