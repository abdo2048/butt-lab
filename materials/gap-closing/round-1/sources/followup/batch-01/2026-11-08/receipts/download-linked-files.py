"""Download already-discovered public document URLs, not a discovery crawler.

Keeps HTTP receipts, validates PDF signatures, and extracts separate text.
No login, paywall circumvention, contact, purchasing, or operating procedure.
"""
import concurrent.futures
import hashlib
import json
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
JOBS = [
    ("D01", "patents/FR3066128B1.pdf",
     "https://patentimages.storage.googleapis.com/9f/56/9b/08c269c1f6f82c/FR3066128B1.pdf"),
    ("D01", "patents/FR3066128A1.pdf",
     "https://patentimages.storage.googleapis.com/7f/62/bd/199786b023309f/FR3066128A1.pdf"),
    ("D02", "reports/INERIS-DRC-17-162405-01313C-2017.pdf",
     "https://www.ineris.fr/sites/default/files/contribution/Documents/INERIS-DRC-17-162405-01313C%20Rapport%20%C3%A9tude%20m%C3%A9gots_vf.pdf"),
    ("D02", "reports/INERIS-DRC-18-177385-09634B-2019.pdf",
     "https://www.ineris.fr/sites/ineris.fr/files/contribution/Documents/INERIS-DRC-18-177385-09634B.pdf"),
    ("D03", "literature/Teixeira-2016-UnB-thesis.pdf",
     "https://repositorio.unb.br/bitstream/10482/22749/1/2016_MariaBet%c3%a2niaD%e2%80%99HeniTeixeira.pdf"),
    ("D04", "patents/CN106928486B.pdf",
     "https://patentimages.storage.googleapis.com/b1/85/71/2006ea00c0b287/CN106928486B.pdf"),
    ("D05", "patents/FR3110470A1.pdf",
     "https://patentimages.storage.googleapis.com/ca/95/90/d29e5f54a1957d/FR3110470A1.pdf"),
    ("D05", "patents/FR3102180A1.pdf",
     "https://patentimages.storage.googleapis.com/6f/5f/a5/c0b8b8e7e470c1/FR3102180A1.pdf"),
]


def get(job):
    group, relpath, url = job
    path = ROOT / relpath
    path.parent.mkdir(parents=True, exist_ok=True)
    row = {"group": group, "path": relpath, "source_url": url,
           "retrieved": "2026-11-08", "transport": "curl linked-document transfer"}
    if not path.exists():
        headers = ROOT / "receipts" / (path.stem + ".headers.txt")
        result = subprocess.run(
            ["curl", "-L", "--fail", "--max-time", "90", "--retry", "0",
             "-sS", "-D", str(headers), "-o", str(path),
             "-w", "%{http_code}\t%{url_effective}", url],
            capture_output=True, text=True)
        row.update(curl_exit=result.returncode, http_receipt=result.stdout,
                   error=result.stderr)
    else:
        row["transport_note"] = "Already transferred in this session; not fetched twice."
    if path.exists():
        data = path.read_bytes()
        row.update(bytes=len(data), sha256=hashlib.sha256(data).hexdigest(),
                   pdf_signature=data.startswith(b"%PDF-"))
        if row["pdf_signature"]:
            result = subprocess.run(
                ["pdftotext", "-layout", str(path), str(path.with_suffix(".txt"))],
                capture_output=True, text=True)
            row.update(text_extraction_exit=result.returncode,
                       text_extraction_warning=result.stderr)
            info = subprocess.run(["pdfinfo", str(path)], capture_output=True, text=True)
            for line in info.stdout.splitlines():
                if line.startswith("Pages:"):
                    row["pages"] = int(line.split(":", 1)[1])
            row["status"] = "downloaded_pdf"
        else:
            row["status"] = "not_a_pdf"
    else:
        row["status"] = "download_failed"
    return row


if __name__ == "__main__":
    with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
        rows = list(pool.map(get, JOBS))
    target = ROOT / "receipts" / "downloads.json"
    target.write_text(json.dumps(rows, ensure_ascii=False, indent=2) + "\n")
    print(json.dumps(rows, ensure_ascii=False, indent=2))
