from __future__ import annotations

import base64
import http.client
from http.server import ThreadingHTTPServer
from pathlib import Path
import tempfile
from threading import Thread
import unittest

from scripts.reviewer_library import build_handler, collect_pdfs


class ReviewerLibraryTest(unittest.TestCase):
    def setUp(self):
        temp = tempfile.TemporaryDirectory()
        self.addCleanup(temp.cleanup)
        self.root = Path(temp.name)
        self.payload = b"%PDF-1.4\ntest document bytes"
        (self.root / "01-review & record – é.pdf").write_bytes(self.payload)
        (self.root / "duplicate.PDF").write_bytes(self.payload)
        (self.root / "not-a-pdf.txt").write_text("This must not be served.")
        self.documents = collect_pdfs(self.root)
        self.digest = next(iter(self.documents))
        self.auth = {"Authorization": "Basic " + base64.b64encode(b"reviewer:test-only-local-password").decode()}
        handler = build_handler(self.root, self.documents, "test-only-local-password")
        self.server = ThreadingHTTPServer(("127.0.0.1", 0), handler)
        self.thread = Thread(target=self.server.serve_forever, daemon=True)
        self.thread.start()
        self.addCleanup(self.server.server_close)
        self.addCleanup(self.thread.join, 3)
        self.addCleanup(self.server.shutdown)

    def request(self, path, headers=None, method="GET"):
        conn = http.client.HTTPConnection(*self.server.server_address, timeout=3)
        try:
            conn.request(method, path, headers=headers or {})
            res = conn.getresponse()
            return res.status, dict(res.getheaders()), res.read()
        finally:
            conn.close()

    def test_every_route_requires_authentication(self):
        for path in ["/", f"/view/{self.digest}", f"/download/{self.digest}"]:
            for method in ["GET", "HEAD"]:
                status, headers, _ = self.request(path, method=method)
                self.assertEqual(status, 401)
                self.assertIn("Basic", headers["WWW-Authenticate"])
                self.assertEqual(headers["Cache-Control"], "no-store")
            status, _, _ = self.request(path, {"Authorization": "Basic wrong"})
            self.assertEqual(status, 401)

    def test_index_deduplicates_and_escapes_file_names(self):
        self.assertEqual(len(self.documents), 1)
        status, _, index = self.request("/", self.auth)
        self.assertEqual(status, 200)
        self.assertIn(b"1 original PDFs from 2 paths", index)
        self.assertIn(b"01-review &amp; record", index)
        self.assertNotIn(b"not-a-pdf.txt", index)
        self.assertEqual(index.count(b"View PDF"), 1)

    def test_view_and_download_serve_original_bytes(self):
        for route, disposition in [("view", "inline"), ("download", "attachment")]:
            status, headers, document = self.request(f"/{route}/{self.digest}", self.auth)
            self.assertEqual(status, 200)
            self.assertEqual(headers["Content-Type"], "application/pdf")
            self.assertTrue(headers["Content-Disposition"].startswith(disposition))
            self.assertIn("%C3%A9.pdf", headers["Content-Disposition"])
            self.assertEqual(document, self.payload)

    def test_non_catalogue_paths_and_other_hosts_are_rejected(self):
        for path in ["/not-a-pdf.txt", "/download/../../not-a-pdf.txt", "/view/" + "0" * 64]:
            self.assertEqual(self.request(path, self.auth)[0], 404)
        self.assertEqual(self.request("/", {**self.auth, "Host": "another.example"})[0], 400)


if __name__ == "__main__":
    unittest.main()
