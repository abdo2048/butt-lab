#!/usr/bin/env python3
"""Build a local, page-indexed Markdown reading copy of each unique PDF."""

import argparse
import hashlib
import json
import os
import re
import tempfile
import unicodedata
from collections import defaultdict
from pathlib import Path
from urllib.parse import quote

import pymupdf

REPO = Path(__file__).resolve().parents[1]
FORMAT_VERSION = 1


def checksum(path):
    with path.open("rb") as file:
        return hashlib.file_digest(file, "sha256").hexdigest()


def folder_name(path, digest):
    title = unicodedata.normalize("NFKD", path.stem).encode("ascii", "ignore").decode()
    slug = re.sub(r"[^a-z0-9]+", "-", title.lower()).strip("-")[:68].rstrip("-")
    return f"{slug or 'document'}--{digest[:12]}"


def relative_link(path, base):
    return quote(Path(os.path.relpath(path, base)).as_posix(), safe="/")


def inline(value):
    return re.sub(r"([\\`*_{\[\]<>&|])", r"\\\1", str(value).replace("\n", " "))


def text_block(text):
    # PDF text is untrusted. Render it literally, not as injected Markdown/HTML.
    fence = "`" * max(3, 1 + max((len(x) for x in re.findall(r"`+", text)), default=0))
    return f"{fence}text\n{text.rstrip()}\n{fence}"


def add_page_locators(entries, markdown):
    marks = []
    fence = None
    lines = markdown.split("\n")
    for line_number, line in enumerate(lines, 1):
        if fence is not None:
            if line == fence:
                fence = None
        elif match := re.fullmatch(r"(`{3,})text", line):
            fence = match[1]
        elif match := re.fullmatch(r"## PDF page (\d+)", line):
            marks.append((int(match[1]), line_number))
    if [number for number, _ in marks] != [entry["page"] for entry in entries]:
        raise ValueError("Markdown page headings do not match the PDF inventory")
    for index, entry in enumerate(entries):
        entry["firstLine"] = marks[index][1]
        entry["lastLine"] = marks[index + 1][1] - 1 if index + 1 < len(marks) else len(lines)


def sufficiently_readable(text):
    alphanumeric = sum(char.isalnum() for char in text)
    return alphanumeric >= 50 and text.count("\ufffd") < alphanumeric / 5


def save_image(page, file, clip=None):
    rect = page.rect if clip is None else clip
    zoom = min(2, 1500 / max(rect.width, rect.height))
    pix = page.get_pixmap(matrix=pymupdf.Matrix(zoom, zoom), clip=clip, alpha=False)
    if pix.width < 1 or pix.height < 1:
        return False
    pix.save(file, jpg_quality=78)
    return True


def read_document(pdf, target, ocr, all_pages):
    images = target / "images"
    images.mkdir()
    entries = []
    content = []
    with pymupdf.open(pdf) as document:
        for number, page in enumerate(document, 1):
            text = page.get_text(sort=True).strip()
            mode = "embedded"
            if not sufficiently_readable(text):
                if ocr:
                    recognised = ocr(page).strip()
                    if len(recognised) > len(text):
                        text, mode = recognised, "ocr"
                    elif not text:
                        mode = "no-text"
                    else:
                        mode = "short-text"
                else:
                    mode = "short-text" if text else "no-text"

            content.extend([f"## PDF page {number}", "", f"Text: **{mode}**", ""])
            content.extend([text_block(text) if text else "_No text extracted; inspect the page image._", ""])
            raster = []
            page_area = page.rect.get_area()
            # Keep substantial raster regions, including inline images, instead of tiny logos.
            if page.rotation == 0:
                for box in page.get_image_info():
                    rect = pymupdf.Rect(box["bbox"]) & page.rect
                    if rect.get_area() >= 0.025 * page_area and rect.get_area() < 0.80 * page_area:
                        raster.append(rect)
            # A page rendering preserves the arrangement of drawings, labels and tables.
            drawings = page.get_drawings()
            has_vectors = len(drawings) >= 6 or any(
                drawing["rect"].get_area() >= 0.025 * page_area for drawing in drawings
            )
            files = []
            if (all_pages or mode != "embedded" or has_vectors or raster or page.get_image_info()):
                name = f"page-{number:04d}.jpg"
                if save_image(page, images / name):
                    files.append(name)
            # On scanned pages the full-page image is more useful than duplicate crops.
            if mode == "embedded":
                for idx, rect in enumerate(raster, 1):
                    name = f"page-{number:04d}-figure-{idx:02d}.jpg"
                    if save_image(page, images / name, clip=rect):
                        files.append(name)
            for name in files:
                content.extend([f"![PDF page {number} — {name}](images/{name})", ""])
            entries.append({"page": number, "text": mode, "images": files})
    return entries, content


def extract(paths, output, ocr=None, ocr_profile=None, all_pages=False):
    output.mkdir(parents=True, exist_ok=True)
    groups = defaultdict(list)
    for pdf in paths:
        groups[checksum(pdf)].append(pdf)

    results = []
    errors = []
    for digest, aliases in groups.items():
        pdf = aliases[0]
        folder = folder_name(pdf, digest)
        target = output / folder
        originals = [relative_link(path, target) for path in aliases]
        profile = {
            "format": FORMAT_VERSION,
            "ocr": ocr_profile,
            "allPages": all_pages,
            "sha256": digest,
            "originals": originals,
        }
        try:
            saved = target / "reading.json"
            try:
                existing = json.loads(saved.read_text(encoding="utf-8")) if saved.is_file() else None
            except json.JSONDecodeError:
                existing = None
            if (existing and existing.get("profile") == profile and (target / "reading.md").is_file()
                    and all((target / "images" / image).is_file()
                            for page in existing["pages"] for image in page["images"])):
                metadata = existing
                if not all("firstLine" in page for page in metadata["pages"]):
                    add_page_locators(metadata["pages"], (target / "reading.md").read_text(encoding="utf-8"))
                    saved.write_text(json.dumps(metadata, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
                print(f"cached {pdf.name}", flush=True)
            else:
                print(f"extracting {pdf.name}", flush=True)
                with tempfile.TemporaryDirectory(dir=output, prefix=".extract-") as directory:
                    stage = Path(directory)
                    entries, content = read_document(pdf, stage, ocr, all_pages)
                    metadata = {"profile": profile, "title": pdf.stem, "pages": entries}
                    header = [f"# {inline(pdf.stem)}", "", "Local derivative · Verify claims and values against the PDF.", "",
                              f"SHA-256: `{digest}`", "", "Original copies:"]
                    header += [f"- [{inline(path.name)}]({link})" for path, link in zip(aliases, originals)]
                    markdown = "\n".join(header + [""] + content)
                    add_page_locators(entries, markdown)
                    (stage / "reading.md").write_text(markdown, encoding="utf-8")
                    (stage / "reading.json").write_text(json.dumps(metadata, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
                    # Update only this tool's named outputs, not unrelated workspace files.
                    target.mkdir(exist_ok=True)
                    dest_images = target / "images"
                    dest_images.mkdir(exist_ok=True)
                    for image in (stage / "images").iterdir():
                        image.replace(dest_images / image.name)
                    for filename in ("reading.md", "reading.json"):
                        (stage / filename).replace(target / filename)
            results.append({"folder": folder, **metadata})
        except (RuntimeError, OSError, ValueError) as error:
            errors.append({"source": str(pdf), "error": str(error)})
            print(f"ERROR {pdf.name}: {error}", flush=True)

    index = ["# Local PDF reading library", "", f"{len(paths)} PDF paths; {len(results)} unique reading copies; {len(errors)} failed.",
             "", "Not for publication. Embedded text and OCR are aids, not verified transcriptions. "
             "Page numbers are PDF positions, not necessarily printed page numbers.", "",
             "| Reading copy | PDF pages | OCR pages | Pages with no extracted text | Images | PDF copies |",
             "| --- | ---: | ---: | ---: | ---: | ---: |"]
    for result in results:
        pages = result["pages"]
        index.append(f'| [{inline(result["title"])}]({result["folder"]}/reading.md) | {len(pages)} | '
                     f'{sum(p["text"] == "ocr" for p in pages)} | {sum(p["text"] == "no-text" for p in pages)} | '
                     f'{sum(len(p["images"]) for p in pages)} | {len(result["profile"]["originals"])} |')
    if errors:
        index.extend(["", "## Failures", ""])
        index.extend(f'- {inline(Path(error["source"]).name)}: {inline(error["error"])}' for error in errors)
    (output / "INDEX.md").write_text("\n".join(index) + "\n", encoding="utf-8")
    (output / "inventory.json").write_text(json.dumps({"documents": results, "errors": errors}, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(index[2], flush=True)
    return errors


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--source", type=Path, default=REPO / "materials/gap-closing")
    parser.add_argument("--output", type=Path, default=REPO / ".research-local/library")
    parser.add_argument("--tessdata", type=Path, help="Directory containing offline Tesseract language models")
    parser.add_argument("--languages", default="eng+fra+por")
    parser.add_argument("--all-page-images", action="store_true", help="Render every page rather than only selected pages")
    args = parser.parse_args()
    output = args.output.resolve()
    # Prevent a custom output directory from feeding the checked-in publication or site.
    if any(output.is_relative_to(REPO / tree) for tree in ("publication", "tools", "materials")):
        parser.error("Use a separate output directory (default: .research-local/library).")
    paths = sorted(path.resolve() for path in args.source.rglob("*") if path.is_file() and path.suffix.lower() == ".pdf")
    if not paths:
        parser.error("No PDFs found under the source directory.")
    if args.tessdata is None:
        return bool(extract(paths, output, all_pages=args.all_page_images))
    from PIL import Image
    from tesserocr import PyTessBaseAPI
    model_root = args.tessdata.resolve()
    profile = {language: checksum(model_root / f"{language}.traineddata") for language in args.languages.split("+")}
    with PyTessBaseAPI(path=str(model_root), lang=args.languages) as engine:
        def ocr(page):
            pix = page.get_pixmap(dpi=170, colorspace=pymupdf.csGRAY, alpha=False)
            engine.SetImage(Image.frombytes("L", (pix.width, pix.height), pix.samples))
            return engine.GetUTF8Text()
        return bool(extract(paths, output, ocr, profile, args.all_page_images))


if __name__ == "__main__":
    raise SystemExit(main())
