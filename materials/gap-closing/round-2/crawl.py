#!/usr/bin/env python3
"""Bounded public crawl: fetch sitemap URLs, extract PDF links and keyword hits."""
import re, sys, time, urllib.request, urllib.error, xml.etree.ElementTree as ET

UA = {"User-Agent": "Mozilla/5.0 (X11; Linux x86_64) public-doc-research"}
TIMEOUT = 25

def fetch(url):
    req = urllib.request.Request(url, headers=UA)
    with urllib.request.urlopen(req, timeout=TIMEOUT) as r:
        return r.read().decode("utf-8", errors="replace")

def sitemap_locs(url):
    try:
        xml = fetch(url)
    except Exception as e:
        print(f"[sitemap error] {url}: {e}")
        return []
    # try parse as XML; fallback to regex
    try:
        root = ET.fromstring(xml)
        ns = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}
        locs = [el.text for el in root.iter() if el.tag.endswith("loc") and el.text]
        return locs
    except Exception:
        return re.findall(r"<loc>([^<]+)</loc>", xml)

KEYWORDS = re.compile(r"(ACV|analyse de cycle de vie|life cycle|LCA|bilan environnemental|bilan carbone|carbone|cycle de vie|End of Waste|fine vita|certificat|attestation|autorizzazione|permesso|alocato|analisi di laboratorio|test report|rapporto di prova|critical review|revue critique|étude|studio)", re.I)

def crawl(sitemaps):
    pages = []
    for sm in sitemaps:
        locs = sitemap_locs(sm)
        # if it's a sitemap index, expand
        for loc in list(locs):
            if loc.endswith(".xml"):
                pages.extend(sitemap_locs(loc))
            else:
                pages.append(loc)
    seen, out = set(), []
    for p in pages:
        if p not in seen:
            seen.add(p); out.append(p)
    print(f"TOTAL PAGES: {len(out)}")
    pdf_links = set()
    kw_hits = []
    for i, p in enumerate(out):
        try:
            html = fetch(p)
        except Exception as e:
            print(f"[page error] {p}: {e}")
            continue
        for m in re.finditer(r'https?://[^"\'<>\s]+?\.pdf(?:\?[^"\'<>\s]*)?', html, re.I):
            pdf_links.add(m.group(0))
        # also relative pdf hrefs
        from urllib.parse import urljoin
        for m in re.finditer(r'href="([^"]+?\.pdf[^"]*)"', html, re.I):
            pdf_links.add(urljoin(p, m.group(1)))
        text = re.sub(r"<[^>]+>", " ", html)
        text = re.sub(r"\s+", " ", text)
        if KEYWORDS.search(text):
            kws = sorted(set(m.group(0).lower() for m in KEYWORDS.finditer(text)))
            kw_hits.append((p, kws))
        time.sleep(0.3)
    print("\n=== PDF LINKS FOUND ===")
    for l in sorted(pdf_links):
        print(l)
    print("\n=== KEYWORD HITS (page, keywords) ===")
    for p, kws in kw_hits:
        print(p, "->", ", ".join(kws))

if __name__ == "__main__":
    crawl(sys.argv[1:])
