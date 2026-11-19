import assert from "node:assert/strict";
import { test } from "node:test";

import {
  renderMarkdown,
  splitDisclaimer,
  splitPage,
  splitSectionBody,
} from "../src/lib/markdown.ts";

const TERMS = [
  {
    id: "heavy-metals",
    preferredLabel: "Heavy metals",
    aliases: ["metals"],
    tooltip: "Cadmium, lead, arsenic and mercury, treated as a stop condition.",
  },
  {
    id: "nicotine",
    preferredLabel: "Nicotine",
    aliases: [],
    tooltip: "The main soluble residue carried by the tobacco and the filter.",
  },
];

test("splitPage separates the title, the preamble and the sections", () => {
  const page = splitPage("# The title\n\nA lead paragraph.\n\n## First section\n\nBody one.\n\n## Second section\n\nBody two.\n");
  assert.equal(page.title, "The title");
  assert.equal(page.preamble.trim(), "A lead paragraph.");
  assert.equal(page.sections.length, 2);
  assert.equal(page.sections[0]?.heading, "First section");
  assert.equal(page.sections[0]?.slug, "first-section");
  assert.equal(page.sections[1]?.body.trim(), "Body two.");
});

test("splitPage keeps a section that has no body", () => {
  const page = splitPage("# T\n\n## Empty section\n\n## Next\n\nText.\n");
  assert.equal(page.sections.length, 2);
  assert.equal(page.sections[0]?.body.trim(), "");
});

test("renderMarkdown renders headings, paragraphs, lists and tables", () => {
  const html = renderMarkdown("## Heading\n\nA paragraph.\n\n- one\n- two\n", { terms: [] });
  assert.match(html, /<h2[^>]*>Heading<\/h2>/);
  assert.match(html, /<p>A paragraph\.<\/p>/);
  assert.match(html, /<li>one<\/li>/);
});

test("renderMarkdown escapes raw HTML in the source", () => {
  const html = renderMarkdown("Before <script>alert(1)</script> after.\n", { terms: [] });
  const amp = String.fromCharCode(38);
  assert.doesNotMatch(html, /<script>/);
  assert.match(html, new RegExp(`${amp}lt;script${amp}gt;`));
});

test("renderMarkdown wraps a glossary term in a tooltip link to the glossary", () => {
  const html = renderMarkdown("The heavy metals are a stop condition.\n", { terms: TERMS });
  assert.match(
    html,
    /<a class="term" href="\/glossary\/#heavy-metals" data-tip="Cadmium, lead, arsenic and mercury, treated as a stop condition\.">heavy metals<\/a>/,
  );
});

test("renderMarkdown wraps an alias and matches case-insensitively", () => {
  const html = renderMarkdown("The Metals matter.\n", { terms: TERMS });
  assert.match(html, />Metals<\/a>/);
});

test("renderMarkdown does not wrap a term that is only part of a longer word", () => {
  const html = renderMarkdown("This is metallurgy, not a metal.\n", { terms: TERMS });
  assert.doesNotMatch(html, /class="term"/);
});

test("renderMarkdown does not wrap terms inside a heading", () => {
  const html = renderMarkdown("## Nicotine in the wash water\n", { terms: TERMS });
  assert.doesNotMatch(html, /class="term"/);
});

test("renderMarkdown adds no tooltips when the term list is empty", () => {
  const html = renderMarkdown("Nicotine and heavy metals.\n", { terms: [] });
  assert.doesNotMatch(html, /class="term"/);
});

test("renderMarkdown marks blockquotes as AI notes", () => {
  const html = renderMarkdown("> **[GAP-CLOSING NOTE - AI]** A note.\n", { terms: [] });
  assert.match(html, /<blockquote class="ai-note">/);
});

test("splitSectionBody extracts the criterion scorecard table and leaves the prose", () => {
  const prose = "Each criterion is scored separately against its own rubric.";
  const table = "| Criterion | Result | Basis | Why |\n| --- | --- | --- | --- |\n| evidence-strength | 2 (Limited) | inference | Because. |\n";
  const parts = splitSectionBody(`${prose}\n\n${table}`);
  assert.equal(parts.prose, prose);
  assert.ok(parts.scorecard?.includes("evidence-strength"));
});

test("splitSectionBody leaves a body without a scorecard untouched", () => {
  const parts = splitSectionBody("Just prose.\n\n- one\n- two\n");
  assert.equal(parts.prose, "Just prose.\n\n- one\n- two");
  assert.equal(parts.scorecard, undefined);
});

test("renderMarkdown renders an unrelated table as a table", () => {
  const table = "| Stream | Kind |\n| --- | --- |\n| fibre | product |\n";
  const html = renderMarkdown(table, { terms: [] });
  assert.match(html, /<div class="table-scroll" tabindex="0"[^>]*><table class="table">/);
  assert.match(html, /<th>Stream<\/th>/);
});

test("renderMarkdown renders a list as a list", () => {
  const html = renderMarkdown("- one\n- two\n", { terms: [] });
  assert.match(html, /<li>one<\/li>/);
  assert.match(html, /<li>two<\/li>/);
});

const DISCLAIMER =
  "This page was produced by desk research on 2026-11-16. It does not assert that the method is safe, clean, commercial, novel or approved, and it does not authorise any experiment.";

test("splitDisclaimer lifts the standing disclaimer out of the prose", () => {
  const parts = splitDisclaimer(`Audit notes.\n\n${DISCLAIMER}`);
  assert.equal(parts.prose, "Audit notes.");
  assert.equal(parts.disclaimer, DISCLAIMER);
});

test("splitDisclaimer returns a body without a standing disclaimer untouched", () => {
  const parts = splitDisclaimer("Just audit notes.\n");
  assert.equal(parts.prose, "Just audit notes.\n");
  assert.equal(parts.disclaimer, undefined);
});

test("splitDisclaimer takes only the last paragraph and leaves an earlier one in the prose", () => {
  const parts = splitDisclaimer(`${DISCLAIMER}\n\nMore notes.\n\n${DISCLAIMER}`);
  assert.ok(parts.prose?.includes(DISCLAIMER), "the earlier disclaimer should stay in the prose");
  assert.equal(parts.disclaimer, DISCLAIMER);
});

test("splitDisclaimer leaves an empty prose when the body is only the disclaimer", () => {
  const parts = splitDisclaimer(DISCLAIMER);
  assert.equal(parts.prose, "");
  assert.equal(parts.disclaimer, DISCLAIMER);
});

test("splitDisclaimer does not mistake an ordinary sentence for the disclaimer", () => {
  const parts = splitDisclaimer("This page was produced by desk research in an earlier draft.");
  assert.equal(parts.disclaimer, undefined);
});


test("renderMarkdown leaves linked glossary terms inside their original link", () => {
  const html = renderMarkdown("[Heavy metals](/sources/) and heavy metals.", { terms: TERMS });
  assert.match(html, /<a href="\/sources\/">Heavy metals<\/a>/);
  assert.equal(html.match(/class="term"/g)?.length, 1);
});
