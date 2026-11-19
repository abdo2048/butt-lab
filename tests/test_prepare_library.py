import json
import shutil
import tempfile
import unittest
from pathlib import Path

import pymupdf

from scripts.prepare_library import add_page_locators, extract, text_block


class LibraryTests(unittest.TestCase):
    def test_deduplicates_and_keeps_original_page_references_and_images(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            original = root / "Exposição & reciclagem.pdf"
            with pymupdf.open() as pdf:
                page = pdf.new_page()
                page.insert_text((60, 60), "Page one contains enough text to be preserved and checked against this PDF.")
                page.insert_image(pymupdf.Rect(40, 90, 280, 350), pixmap=page.get_pixmap())
                pdf.new_page()
                pdf.save(original)
            duplicate = root / "copy.pdf"
            shutil.copyfile(original, duplicate)
            output = root / "out"
            called = []

            def ocr(page):
                called.append(page.number)
                return "An offline OCR transcript for the source's second page."

            self.assertEqual(extract([original, duplicate], output, ocr, {"test": "fake"}), [])
            data = json.loads((output / "inventory.json").read_text())
            self.assertEqual(len(data["documents"]), 1)
            doc = data["documents"][0]
            self.assertEqual(len(doc["profile"]["originals"]), 2)
            self.assertIn("%20%26%20", doc["profile"]["originals"][0])
            self.assertEqual([page["text"] for page in doc["pages"]], ["embedded", "ocr"])
            self.assertEqual(called, [1])
            folder = output / doc["folder"]
            for page in doc["pages"]:
                self.assertGreater(len(page["images"]), 0)
                for image in page["images"]:
                    self.assertTrue((folder / "images" / image).is_file())
            lines = (folder / "reading.md").read_text().split("\n")
            second = doc["pages"][1]
            self.assertEqual(lines[second["firstLine"] - 1], "## PDF page 2")
            self.assertIn("offline OCR transcript", "\n".join(lines[second["firstLine"] - 1:second["lastLine"]]))
            self.assertEqual(extract([original, duplicate], output, ocr, {"test": "fake"}), [])
            self.assertEqual(called, [1], "unchanged content and OCR profile should reuse the reading copy")

    def test_unreadable_pdf_is_reported_in_the_inventory(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            pdf = root / "broken.pdf"
            pdf.write_text("not a PDF")
            errors = extract([pdf], root / "out")
            self.assertEqual(len(errors), 1)
            self.assertEqual(json.loads((root / "out" / "inventory.json").read_text())["errors"], errors)

    def test_locators_ignore_headings_inside_literal_pdf_text(self):
        entries = [{"page": 1}, {"page": 2}]
        add_page_locators(entries, "## PDF page 1\n```text\n## PDF page 7\n```\n## PDF page 2\n")
        self.assertEqual(entries, [{"page": 1, "firstLine": 1, "lastLine": 4}, {"page": 2, "firstLine": 5, "lastLine": 6}])

    def test_extracted_fences_cannot_end_the_literal_text_block(self):
        self.assertTrue(text_block("```\n<img>").startswith("````text\n"))


if __name__ == "__main__":
    unittest.main()
