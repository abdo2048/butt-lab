"""Serve original research PDFs to a password-protected browser on this machine only."""
from __future__ import annotations

import argparse
import base64
from dataclasses import dataclass
from getpass import getpass
import hashlib
import hmac
from html import escape
from http import HTTPStatus
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import re
import secrets
import shutil
import sys
from urllib.parse import quote, urlsplit

ROOT = Path(__file__).resolve().parents[1] / "materials" / "gap-closing"
USER = "reviewer"
ROUTE = re.compile(r"/(view|download)/([a-f0-9]{64})")


@dataclass
class Document:
    digest: str
    path: Path
    aliases: list[str]


def collect_pdfs(root: Path) -> dict[str, Document]:
    """Index every original, displaying one copy per SHA-256 without duplicating files."""
    root = root.resolve(strict=True)
    documents: dict[str, Document] = {}
    for path in sorted(root.rglob("*")):
        if path.suffix.lower() != ".pdf" or not path.is_file() or path.is_symlink():
            continue
        if not path.resolve().is_relative_to(root):
            continue
        with path.open("rb") as stream:
            digest = hashlib.file_digest(stream, "sha256").hexdigest()
        if digest not in documents:
            documents[digest] = Document(digest, path, [])
        documents[digest].aliases.append(path.relative_to(root).as_posix())
    return documents


def catalogue(documents: dict[str, Document]) -> bytes:
    items = []
    for doc in sorted(documents.values(), key=lambda entry: entry.path.name.casefold()):
        copies = f' <small>({len(doc.aliases)} copies)</small>' if len(doc.aliases) > 1 else ""
        items.append(
            f'<li><strong>{escape(doc.path.name)}</strong>{copies}'
            f'<p><a href="/view/{doc.digest}">View PDF</a> · '
            f'<a href="/download/{doc.digest}">Download PDF</a></p></li>'
        )
    count = sum(len(document.aliases) for document in documents.values())
    return f'''<!doctype html>
<html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width">
<meta name="robots" content="noindex, nofollow">
<title>Butt Lab · Local reviewer library</title>
<style>
body{{font:1rem/1.5 system-ui,sans-serif;max-width:48rem;margin:2rem auto;padding:0 1rem}}
li{{padding:.6rem 0;border-bottom:1px solid #ccc;overflow-wrap:anywhere}}li p{{margin:.3rem 0}}
</style>
<main><h1>Local reviewer library</h1>
<p>{len(documents)} original PDFs from {count} paths. This library is local to this computer.</p>
<p>Access does not imply permission to redistribute a document.</p><ul>{''.join(items)}</ul></main>
</html>'''.encode("utf-8")


def build_handler(root: Path, documents: dict[str, Document], password: str) -> type[BaseHTTPRequestHandler]:
    token = base64.b64encode(f"{USER}:{password}".encode())
    root = root.resolve(strict=True)
    index = catalogue(documents)

    class ReviewerHandler(BaseHTTPRequestHandler):
        def log_message(self, format, *args):  # No browsing details in the terminal log.
            pass

        def headers_for(self, status, content_type, size, **headers):
            self.send_response(status)
            self.send_header("Content-Type", content_type)
            self.send_header("Content-Length", str(size))
            self.send_header("Cache-Control", "no-store")
            self.send_header("Referrer-Policy", "no-referrer")
            self.send_header("X-Content-Type-Options", "nosniff")
            self.send_header("Cross-Origin-Resource-Policy", "same-origin")
            if content_type.startswith("text/html"):
                self.send_header("Content-Security-Policy", "default-src 'none'; style-src 'unsafe-inline'; frame-ancestors 'none'")
            for name, value in headers.items():
                self.send_header(name.replace("_", "-"), value)
            self.end_headers()

        def message(self, status, body, head_only, **headers):
            self.headers_for(status, "text/plain; charset=utf-8", len(body), **headers)
            if not head_only:
                self.wfile.write(body)

        def serve(self, head_only=False):
            # Reject requests addressed to another host, even if DNS resolves to loopback.
            port = self.server.server_address[1]
            if self.headers.get("Host") not in {f"127.0.0.1:{port}", f"localhost:{port}"}:
                self.message(HTTPStatus.BAD_REQUEST, b"Invalid host", head_only)
                return
            scheme, _, supplied = self.headers.get("Authorization", "").partition(" ")
            if scheme.lower() != "basic" or not hmac.compare_digest(supplied.encode(), token):
                self.message(HTTPStatus.UNAUTHORIZED, b"Authentication required", head_only,
                             WWW_Authenticate='Basic realm="Butt Lab local review", charset="UTF-8"')
                return
            pathname = urlsplit(self.path).path
            if pathname == "/":
                self.headers_for(HTTPStatus.OK, "text/html; charset=utf-8", len(index))
                if not head_only:
                    self.wfile.write(index)
                return
            match = ROUTE.fullmatch(pathname)
            doc = documents.get(match[2]) if match else None
            if doc is None or not doc.path.resolve().is_relative_to(root):
                self.message(HTTPStatus.NOT_FOUND, b"No document at this address", head_only)
                return
            try:
                stream = doc.path.open("rb")
            except OSError:
                self.message(HTTPStatus.NOT_FOUND, b"Original PDF not found locally", head_only)
                return
            with stream:
                disposition = "attachment" if match[1] == "download" else "inline"
                filename = quote(doc.path.name, safe="")
                size = stream.seek(0, 2)
                stream.seek(0)
                self.headers_for(HTTPStatus.OK, "application/pdf", size,
                                 Content_Disposition=f"{disposition}; filename=\"document.pdf\"; filename*=UTF-8''{filename}")
                if not head_only:
                    try:
                        shutil.copyfileobj(stream, self.wfile)
                    except (BrokenPipeError, ConnectionResetError):
                        pass

        def do_GET(self):
            self.serve()

        def do_HEAD(self):
            self.serve(head_only=True)

    return ReviewerHandler


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--port", type=int, default=8765)
    parser.add_argument("--prompt-password", action="store_true", help="Use your own password from a hidden prompt")
    args = parser.parse_args()
    if not 1024 <= args.port <= 65535:
        parser.error("port must be between 1024 and 65535")
    if not sys.stderr.isatty():
        parser.error("run this in a local interactive terminal; not as a preview or server deployment")
    password = getpass("Reviewer password: ") if args.prompt_password else secrets.token_urlsafe(24)
    if len(password) < 12:
        parser.error("use at least 12 characters")
    documents = collect_pdfs(ROOT)
    with ThreadingHTTPServer(("127.0.0.1", args.port), build_handler(ROOT, documents, password)) as server:
        print(f"Open http://127.0.0.1:{args.port}/ on this computer. Username: {USER}", file=sys.stderr)
        if not args.prompt_password:
            print(f"Temporary password: {password}", file=sys.stderr)
        print("Stop with Ctrl+C. Do not port-forward or expose this local server.", file=sys.stderr)
        try:
            server.serve_forever()
        except KeyboardInterrupt:
            pass


if __name__ == "__main__":
    main()
