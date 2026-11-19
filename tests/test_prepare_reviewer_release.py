from pathlib import Path
import tempfile
import unittest
from unittest.mock import patch

from scripts.prepare_reviewer_release import cleared_files, draft_inventory, upload


class PrepareReviewerReleaseTests(unittest.TestCase):
    def setUp(self):
        temp = tempfile.TemporaryDirectory()
        self.addCleanup(temp.cleanup)
        self.root = Path(temp.name)
        self.first = self.root / "1.pdf"
        self.first.write_bytes(b"%PDF-1.5\nfirst")
        (self.root / "2.pdf").write_bytes(b"%PDF-1.5\nsecond")
        (self.root / "copy.pdf").write_bytes(self.first.read_bytes())
        self.inventory = draft_inventory(self.root)

    def clear(self):
        record = self.inventory["documents"][0]
        record.update(clearance="cleared", clearanceNote="fixture approval")
        return record

    def test_draft_keeps_distinct_documents_pending(self):
        docs = self.inventory["documents"]
        self.assertEqual(len(docs), 2)
        self.assertEqual(sum(len(doc["originalPaths"]) for doc in docs), 3)
        with self.assertRaisesRegex(ValueError, "No PDFs are cleared"):
            cleared_files(self.inventory, self.root)

    def test_staging_rechecks_original_bytes_and_excludes_private_metadata(self):
        record = self.clear()
        staged, files = cleared_files(self.inventory, self.root)
        self.assertEqual(staged["documents"], [{key: record[key] for key in ("sha256", "size", "filename")}])
        self.assertEqual(files, [(f"pdfs/{record['sha256']}.pdf", self.first)])
        self.first.write_bytes(b"%PDF-1.5\nchanged")
        with self.assertRaisesRegex(ValueError, "original PDF is missing or changed"):
            cleared_files(self.inventory, self.root)

    def test_cleared_requires_an_evidence_note(self):
        self.clear()["clearanceNote"] = ""
        with self.assertRaisesRegex(ValueError, "No clearance evidence"):
            cleared_files(self.inventory, self.root)

    def test_upload_promotes_catalogue_after_pdfs(self):
        record = self.clear()
        _, files = cleared_files(self.inventory, self.root)
        with patch("scripts.prepare_reviewer_release.subprocess.run") as run:
            upload("private-bucket", files, Path("wrangler"), Path("catalogue.json"))
        self.assertEqual(run.call_count, 2)
        self.assertIn(f"private-bucket/pdfs/{record['sha256']}.pdf", run.call_args_list[0].args[0])
        self.assertIn("private-bucket/catalogue.json", run.call_args_list[1].args[0])
        self.assertTrue(run.call_args_list[1].kwargs["check"])
