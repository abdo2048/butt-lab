// Integration tests over the BUILT site (dist/).
// Run `npm run build` before `node --test tests/site.test.ts`.
// These assert the reader-facing guarantees the design requires:
// every route renders, the published content is reachable, nothing internal leaks,
// the page is usable by keyboard and without client JavaScript.
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { JSDOM } from "jsdom";

const here = path.dirname(fileURLToPath(import.meta.url));
const siteRoot = path.resolve(here, "..");
const dist = path.join(siteRoot, "dist");
const sourcesDir = path.resolve(siteRoot, "..", "..", "sources");
const bundleDir = path.join(siteRoot, "src", "content", "bundle");

function distPath(...segments: string[]): string {
  return path.join(dist, ...segments);
}

function readDist(...segments: string[]): string {
  return fs.readFileSync(distPath(...segments), "utf8");
}

function walk(dir: string): string[] {
  const out: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else out.push(full);
  }
  return out;
}

function bundleRecords(): { id: string; kind: string }[] {
  const pairs = JSON.parse(fs.readFileSync(path.join(bundleDir, "records.json"), "utf8")) as [
    string,
    { id: string; kind: string },
  ][];
  return pairs.map(([id, record]) => ({ id, kind: record.kind }));
}

const families = bundleRecords()
  .filter((record) => record.kind === "method-family")
  .map((record) => record.id)
  .sort();

const sources = bundleRecords()
  .filter((record) => record.kind === "source")
  .map((record) => record.id)
  .sort();

const staticRoutes = [
  { route: "/", file: ["index.html"], contains: "Butt Lab" },
  { route: "/start/", file: ["start", "index.html"], contains: "What a cigarette butt actually is" },
  { route: "/methods/", file: ["methods", "index.html"], contains: "Methods" },
  { route: "/compare/", file: ["compare", "index.html"], contains: "Compare evidence" },
  { route: "/sources/", file: ["sources", "index.html"], contains: "Sources" },
  { route: "/glossary/", file: ["glossary", "index.html"], contains: "Glossary" },
  { route: "/invention/", file: ["invention", "index.html"], contains: "AI proposals" },
  { route: "/egypt/", file: ["egypt", "index.html"], contains: "Egypt" },
  { route: "/research-method/", file: ["research-method", "index.html"], contains: "research" },
  { route: "/methods/examples/", file: ["methods", "examples", "index.html"], contains: "From sources to recycling methods" },
  { route: "/limitations/", file: ["limitations", "index.html"], contains: "limitations" },
];

test("the build produced a dist directory", () => {
  assert.ok(fs.existsSync(dist), "dist/ is missing — run npm run build before the site tests");
  assert.ok(fs.statSync(dist).isDirectory());
});

test("every designed route renders a page", () => {
  for (const entry of staticRoutes) {
    const file = distPath(...entry.file);
    assert.ok(fs.existsSync(file), `${entry.route} did not render (${file} missing)`);
    const html = fs.readFileSync(file, "utf8");
    assert.ok(html.includes("<!DOCTYPE html>"), `${entry.route} is not a document`);
    assert.ok(html.includes("</html>"), `${entry.route} is truncated`);
  }
});

test("every method family has a page", () => {
  assert.equal(families.length, 6);
  for (const family of families) {
    const file = distPath("methods", family, "index.html");
    assert.ok(fs.existsSync(file), `method page for ${family} is missing`);
    const html = fs.readFileSync(file, "utf8");
    assert.ok(html.includes("In one minute"), `${family} is missing its plain-language opening`);
    assert.ok(html.includes("The steps"), `${family} is missing its process steps`);
    assert.ok(html.includes("Audit trail"), `${family} is missing its audit trail`);
  }
});

test("every source has a page", () => {
  assert.ok(sources.length > 12, "the original bibliography was not expanded");
  for (const source of sources) {
    const file = distPath("sources", source, "index.html");
    assert.ok(fs.existsSync(file), `source page for ${source} is missing`);
    const html = fs.readFileSync(file, "utf8");
    assert.ok(html.includes("http"), `${source} page shows no original link`);
  }
});

test("the page shell gives every page a skip link, landmarks and a current-route marker", () => {
  for (const entry of staticRoutes) {
    const html = readDist(...entry.file);
    assert.match(html, /class="skip-link"[^>]*href="#main"/, `${entry.route} has no skip link`);
    assert.match(html, /<main[^>]*id="main"/, `${entry.route} has no main landmark`);
    assert.match(html, /<header[^>]*class="site-header"/, `${entry.route} has no header landmark`);
    assert.match(html, /<footer[^>]*class="site-footer"/, `${entry.route} has no footer landmark`);
    assert.match(html, /<nav[^>]*aria-label="Primary"/, `${entry.route} has no primary navigation`);
    assert.doesNotMatch(html, /nav-secondary/, `${entry.route} still has a second link bar`);
    assert.match(html, /aria-current="(?:page|location)"/, `${entry.route} marks no current route`);
  }
});

test("the navigation lists every designed destination", () => {
  const html = readDist("index.html");
  for (const href of [
    "/start/",
    "/methods/",
    "/compare/",
    "/sources/",
    "/glossary/",
    "/invention/",
    "/egypt/",
    "/research-method/",
    "/limitations/",
  ]) {
    assert.ok(html.includes(`href="${href}"`), `navigation is missing ${href}`);
  }
});

test("no repository-local path reaches the built site", () => {
  // A drive-letter path has to start the match or follow a non-alphanumeric
  // character. Without that boundary the pattern also matches the tail of every
  // ordinary URL, because "https://" ends in "s://".
  const forbidden = [
    /(?:^|[^A-Za-z0-9])[A-Za-z]:\\\\/,
    /(?:^|[^A-Za-z0-9])[A-Za-z]:\/\//,
    /\/Users\//,
    /\/home\//,
    /tools\/publication-contract/,
    /publication-contract/,
    /\.publication-build/,
    /registry\/methods\.yaml/,
    /state\/workflow\.yaml/,
    /state\/session-log/,
    /docs\/history/,
    /layer-data/,
    /src\/content\/bundle/,
    /scripts\/build-content/,
  ];
  // A PDF is compressed binary: a byte sequence that looks like "H:\\" turns
  // up by chance roughly once per half megabyte. Scanning PDFs with the loose
  // text patterns below reports those as leaks. What actually matters is
  // whether the repository root itself was baked into the file, so binary
  // documents are checked for that literal and the text patterns are kept for
  // the pages.
  const repoRoot = path.resolve(siteRoot, "..", "..");
  const rootLiterals = [repoRoot, repoRoot.replace(/\\/g, "/")];
  for (const file of walk(dist)) {
    if (file.toLowerCase().endsWith(".pdf")) {
      const bytes = fs.readFileSync(file);
      for (const literal of rootLiterals) {
        assert.ok(
          !bytes.includes(Buffer.from(literal)),
          `${path.relative(dist, file)} embeds the repository path`,
        );
      }
      continue;
    }
    const content = fs.readFileSync(file, "utf8");
    for (const pattern of forbidden) {
      assert.ok(
        !pattern.test(content),
        `${path.relative(dist, file)} leaks a repository-local path (${pattern})`,
      );
    }
  }
});

test("no session-log reference reaches the built site", () => {
  for (const file of walk(dist)) {
    const content = fs.readFileSync(file, "utf8");
    assert.ok(!/session[-_ ]?log/i.test(content), `${path.relative(dist, file)} references a session log`);
  }
});

test("the reader can reach the glossary term entries by keyboard-focusable links", () => {
  const html = readDist("methods", "mechanical-physical", "index.html");
  const terms = [...html.matchAll(/<a class="term" href="\/glossary\/#([^"]+)"[^>]*data-tip="[^"]+"/g)];
  assert.ok(terms.length > 0, "no glossary tooltips are rendered on a method page");
  for (const match of terms) {
    assert.ok(match[1] && match[1].length > 0, "a glossary tooltip has no target entry");
  }
  const glossary = readDist("glossary", "index.html");
  for (const match of terms) {
    assert.ok(
      glossary.includes(`id="${match[1]}"`),
      `the glossary has no entry for ${match[1]}, so the tooltip link goes nowhere`,
    );
  }
});

test("the stylesheet defines every colour as a custom property and respects the reader's motion and focus settings", () => {
  // Scan the stylesheets the reader actually loads. The pagefind binary writes its own
  // vendored stylesheets into the build, and those are third-party files that this
  // site neither authors nor links.
  const linked = new Set<string>();
  for (const file of walk(dist).filter((entry) => entry.endsWith(".html"))) {
    const html = fs.readFileSync(file, "utf8");
    for (const match of html.matchAll(/<link[^>]+rel="stylesheet"[^>]+href="([^"]+\.css)"/g)) {
      if (match[1]) linked.add(path.join(dist, match[1].replace(/^\//, "")));
    }
  }
  assert.ok(linked.size > 0, "the build produced no stylesheet");
  const css = [...linked].map((file) => fs.readFileSync(file, "utf8")).join("\n");
  assert.match(css, /:focus-visible/, "there is no visible keyboard focus style");
  assert.match(css, /prefers-reduced-motion/, "reduced motion is not respected");
  // The token file is the one place a colour literal may appear. It reaches the
  // built stylesheet inside a :root block, so those blocks are removed before
  // the rest of the stylesheet is scanned. Every other rule must use var().
  const outsideTokens = css.replace(/:root\s*\{[^}]*\}/g, "");
  const literals = [...outsideTokens.matchAll(/#[0-9a-fA-F]{3,8}\b/g)].filter(
    (match) => match[0].length === 4 || match[0].length === 7,
  );
  for (const literal of literals) {
    assert.ok(
      false,
      `a raw colour literal ${literal[0]} appears in the built stylesheet outside the token declarations`,
    );
  }
});

test("the site is usable on a narrow screen without horizontal page scrolling", () => {
  const html = readDist("compare", "index.html");
  assert.match(html, /name="viewport"/, "there is no viewport declaration");
  assert.match(html, /class="table-scroll"/, "the comparison table has no narrow-screen container");
  const css = walk(dist)
    .filter((file) => file.endsWith(".css"))
    .map((file) => fs.readFileSync(file, "utf8"))
    .join("\n");
  assert.ok(!/min-width:\s*\d{4,}px/.test(css), "a fixed minimum width forces horizontal scrolling");
});

test("the comparison page is readable and complete without client JavaScript", () => {
  const html = readDist("compare", "index.html");
  assert.match(html, /<table/, "the comparison page has no server-rendered table");
  for (const family of families) {
    assert.ok(html.includes(`/methods/${family}/`), `${family} is missing from the comparison table`);
  }
  assert.match(html, /data-status="/, "comparison rows carry no status attribute");
  assert.match(html, /data-basis="/, "comparison rows carry no basis attribute");
  assert.ok(!/<noscript>[\s\S]*comparison table is unavailable/i.test(html), "the table is replaced by a noscript warning");
});

test("the comparison page offers one-criterion sorting and an evidence-gap mode without offering a ranking", () => {
  const html = readDist("compare", "index.html");
  assert.match(html, /id="compare-criterion"/, "there is no criterion control");
  assert.match(html, /id="compare-mode"/, "there is no sort-mode control");
  assert.match(html, /evidence-gaps/, "there is no evidence-gap sort mode");
  assert.ok(!/best method|overall score|aggregate score|top-ranked/i.test(html), "the comparison page offers an aggregate ranking");
});

test("the method page separates source content, inference and AI notes", () => {
  const html = readDist("methods", "mechanical-physical", "index.html");
  assert.match(html, /class="ai-note"/, "AI gap-closing notes are not visually distinct");
  assert.match(html, /class="chip chip--source"|class="chip chip--inference"/, "evidence basis is not chipped");
  assert.match(html, /Needs human validation|requires-human-validation|not applicable|Unknown/i, "no assessment state is shown");
});

test("the invention page labels every hypothesis as unvalidated", () => {
  const html = readDist("invention", "index.html");
  assert.match(html, /new-unvalidated-hypothesis|Unvalidated hypothesis|unvalidated/i, "the hypothesis state is not visible");
  assert.ok(!/patentable|commercial|proven safe|ready to deploy/i.test(html), "the invention page makes a forbidden claim");
});

test("the page search is a retrieval aid, not a content mutation", () => {
  const html = readDist("index.html");
  // The search bundle is reached through a dynamic import inside the site's own
  // bundled module script, so the path is present in the document while no
  // pagefind script is loaded eagerly. Assert both halves: an eager script tag
  // would defeat the lazy load, and a missing path would mean the search can
  // never run.
  assert.match(html, /pagefind\/pagefind\.js/, "the search bundle path is not referenced");
  assert.doesNotMatch(
    html,
    /<script[^>]+src=["'][^"']*pagefind/,
    "the search bundle is loaded eagerly",
  );
  assert.match(html, /<noscript>[\s\S]*\/methods\//, "there is no no-JavaScript route to the content");
});

test("the search index covers the rendered content and not the navigation", () => {
  const files = walk(dist).filter((file) => file.endsWith(".html"));
  assert.ok(files.length > 0, "the build produced no HTML files to check");
  for (const file of files) {
    const html = fs.readFileSync(file, "utf8");
    assert.match(
      html,
      /<main[^>]*data-pagefind-body/,
      `${path.relative(dist, file)} does not mark its main content as the search body`,
    );
  }
});

test("every page states what the site does not claim", () => {
  for (const entry of staticRoutes) {
    const html = readDist(...entry.file);
    assert.match(
      html,
      /does not assert|not a validated|no measurement|no experiment|desk research/i,
      `${entry.route} carries no evidence-boundary statement`,
    );
  }
});


test("published pages link to existing internal routes and anchors", () => {
  const origin = "https://butt-lab.test";
  const pdfPaths = new Set(walk(dist).filter((file) => file.endsWith(".pdf")).map((file) => "/" + path.relative(dist, file).split(path.sep).join("/")));
  const pages = new Map<string, { ids: Set<string>; hrefs: string[] }>();
  for (const file of walk(dist).filter((entry) => path.basename(entry) === "index.html")) {
    const route = "/" + path.relative(dist, file).split(path.sep).join("/").replace(/index\.html$/, "");
    const dom = new JSDOM(fs.readFileSync(file, "utf8"));
    pages.set(route, {
      ids: new Set(Array.from(dom.window.document.querySelectorAll("[id]"), (el) => el.id)),
      hrefs: Array.from(dom.window.document.querySelectorAll("a[href]"), (el) => el.getAttribute("href")!),
    });
    dom.window.close();
  }
  for (const [route, page] of pages) {
    for (const href of page.hrefs) {
      const url = new URL(href, origin + route);
      if (url.origin !== origin) continue;
      if (pdfPaths.has(url.pathname)) continue;
      const target = pages.get(url.pathname);
      assert.ok(target, `${route} links to missing page ${href}`);
      if (url.hash) assert.ok(target.ids.has(decodeURIComponent(url.hash.slice(1))), `${route} links to missing anchor ${href}`);
    }
  }
});


test("the private workflow is absent from the staged bundle and built reader", () => {
  assert.ok(!fs.existsSync(path.join(dist, "research-playbook")));
  assert.ok(!fs.existsSync(path.join(dist, "reviewer-library")));
  assert.ok(!fs.existsSync(path.join(bundleDir, "pages", "research-playbook.md")));
  for (const file of walk(dist).filter((entry) => entry.endsWith(".html"))) {
    assert.doesNotMatch(fs.readFileSync(file, "utf8"), /research-playbook|\.research-local|A repeatable guide for researching any waste material/i);
  }
});

test("reading pages use the article layout without constraining the catalogue or comparison", () => {
  for (const route of ["start", "methods/examples", "glossary", "egypt", "limitations", "research-method"]) {
    const dom = new JSDOM(readDist(route, "index.html"));
    assert.ok(dom.window.document.querySelector("main.page--reading"), route);
    dom.window.close();
  }
  for (const route of ["methods", "sources", "compare"]) {
    const dom = new JSDOM(readDist(route, "index.html"));
    assert.equal(dom.window.document.querySelector("main.page--reading"), null, route);
    dom.window.close();
  }
});

test("Start here offers two direct reading paths before the article sections without JavaScript", () => {
  const { window } = new JSDOM(readDist("start", "index.html"));
  const main = window.document.querySelector("main")!;
  const paths = main.querySelector('nav[aria-label="Start exploring"]')!;
  const firstSection = main.querySelector("section")!;
  assert.deepEqual([...paths.querySelectorAll("a")].map((a) => a.getAttribute("href")), ["/methods/", "/methods/examples/"]);
  assert.ok(paths.compareDocumentPosition(firstSection) & window.Node.DOCUMENT_POSITION_FOLLOWING);
  assert.ok(main.querySelector("#what-a-cigarette-butt-actually-is"), "preserve the existing deep link");
  window.close();
});

test("the methods index links every family and shows its output and an open question", () => {
  const { window } = new JSDOM(readDist("methods", "index.html"));
  const cards = [...window.document.querySelectorAll(".family-grid > li")];
  assert.deepEqual(cards.map((card) => card.querySelector("h2 a")?.getAttribute("href")).sort(), families.map((id) => `/methods/${id}/`));
  for (const card of cards) {
    assert.ok(card.querySelector("p")?.textContent?.trim(), "each card explains the approach");
    assert.match(card.querySelector("dl")?.textContent ?? "", /(?:Target output|Possible outputs)/);
    assert.match(card.querySelector("dl")?.textContent ?? "", /Open question.*\?/s);
    assert.doesNotMatch(card.textContent ?? "", /criteria scored/);
  }
  assert.match(cards.find((card) => card.querySelector('a[href="/methods/product-routes/"]'))?.textContent ?? "", /not a treatment process/);
  window.close();
});

test("one main route sequence and a native More disclosure work without JavaScript", () => {
  const { window } = new JSDOM(readDist("start", "index.html"));
  const doc = window.document;
  const more = doc.querySelector<HTMLDetailsElement>("details.nav-more")!;
  assert.equal(more.open, false);
  assert.equal(more.querySelector("summary")?.textContent, "More");
  const hrefs = (nav: string) => [...doc.querySelectorAll(`${nav} a`)].map((a) => a.getAttribute("href"));
  assert.deepEqual(hrefs(".nav-primary"), ["/start/", "/methods/", "/compare/", "/sources/"]);
  assert.deepEqual(hrefs(".nav-more"), ["/invention/", "/documents/", "/companies/", "/glossary/", "/egypt/", "/research-method/", "/limitations/"]);
  assert.ok(doc.querySelector<HTMLButtonElement>("#search-toggle")?.hidden, "no inert search button without JavaScript");
  window.close();
});

test("source details show the original and the findings before record metadata", () => {
  const { window } = new JSDOM(readDist("sources", "teixeira-2017-pulp", "index.html"));
  const doc = window.document;
  const actions = [...doc.querySelectorAll<HTMLAnchorElement>("main .page-actions a")];
  const original = actions.find((a) => a.href === "https://doi.org/10.1016/j.wasman.2016.10.013");
  const claims = doc.getElementById("source-claims")!;
  const facts = doc.querySelector<HTMLDetailsElement>("details#source-facts")!;
  const audit = doc.querySelector<HTMLDetailsElement>("details#source-audit")!;
  assert.ok(original, "the publisher link is offered as the version of record");
  assert.ok(
    actions.some((a) => a.getAttribute("href") === "/documents/teixeira-cellulose-pulp.pdf"),
    "the shelf copy is offered beside it",
  );
  assert.ok(original.compareDocumentPosition(claims) & window.Node.DOCUMENT_POSITION_FOLLOWING);
  assert.ok(claims.compareDocumentPosition(facts) & window.Node.DOCUMENT_POSITION_FOLLOWING);
  assert.equal(facts.open, false);
  assert.equal(audit.open, false);
  assert.match(audit.textContent ?? "", /teixeira-2017-pulp/);
  window.close();
});

test("supporting references with no linked findings are not shown as finding pages", () => {
  const { window } = new JSDOM(readDist("sources", "marinello-2020-review", "index.html"));
  const doc = window.document;
  assert.equal(doc.getElementById("source-claims"), null);
  assert.match(doc.querySelector(".source-reference-note")?.textContent ?? "", /hasn’t linked individual findings/);
  assert.ok(doc.querySelector("main .page-actions a[href]"));
  window.close();
});


test("the site serves every document on the shelf and links the matching source pages", () => {
  const shelf = fs
    .readdirSync(sourcesDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && fs.existsSync(path.join(sourcesDir, entry.name, "document.pdf")))
    .map((entry) => entry.name)
    .sort();
  assert.ok(shelf.length >= 50, `expected the full shelf, found ${shelf.length}`);

  const served = fs
    .readdirSync(distPath("documents"))
    .filter((name) => name.endsWith(".pdf"))
    .sort();
  assert.deepEqual(served, shelf.map((id) => `${id}.pdf`));

  for (const id of shelf) {
    assert.equal(fs.readFileSync(distPath("documents", `${id}.pdf`)).toString("ascii", 0, 5), "%PDF-", id);
  }

  for (const [record, document] of [
    ["novotny-2009-policy", "novotny-2009-policy"],
    ["rahman-2020-bitumen", "rahman-2020-bitumen"],
    ["teixeira-2017-pulp", "teixeira-cellulose-pulp"],
    ["marinello-2020-review", "marinello-2019-review"],
  ] as const) {
    const { window } = new JSDOM(readDist("sources", record, "index.html"));
    const actions = window.document.querySelector(".source-documents")!;
    assert.equal(
      actions.querySelector('a:not([download])[href^="/documents/"]')?.textContent,
      "View PDF",
      record,
    );
    assert.equal(
      actions.querySelector(`a[download="${document}.pdf"]`)?.getAttribute("href"),
      `/documents/${document}.pdf`,
      record,
    );
    assert.ok(actions.querySelector('a[href^="https://doi.org/"]'), record);
    window.close();
  }
});

test("the invention page keeps working jumps and gives the scenario table its own wider block", () => {
  const { window } = new JSDOM(readDist("invention", "index.html"));
  const doc = window.document;
  assert.ok(doc.querySelector(".proposal-reading h1"));
  assert.ok(doc.querySelector(".proposal-reading #split-before-washing"));
  const table = doc.querySelector(".proposal-table")!;
  assert.equal(table.getAttribute("tabindex"), "0");
  assert.equal(table.closest(".proposal-reading"), null);
  assert.ok(doc.querySelector('a[href="#scenario"]'));
  assert.ok(doc.querySelector(".proposal-reading #scenario"));
  window.close();
});
