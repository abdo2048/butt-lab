import assert from "node:assert/strict";
import { test } from "node:test";
import { JSDOM } from "jsdom";
import { bindSiteSearch, renderExcerpt } from "../src/lib/search-ui.ts";
import type { SearchPageData, SearchResultItem } from "../src/lib/search.ts";

const tick = () => new Promise<void>((resolve) => setImmediate(resolve));

function setup(search: (query: string) => Promise<readonly SearchResultItem[]>) {
  const { window } = new JSDOM(`
    <form id="search-form" hidden><input id="search-input"></form>
    <p id="search-status"></p>
    <div id="search-results" hidden><ol id="search-hits"></ol><button id="search-clear">Clear</button></div>
  `);
  const doc = window.document;
  bindSiteSearch(doc, search);
  const input = doc.querySelector<HTMLInputElement>("#search-input")!;
  const form = doc.querySelector<HTMLFormElement>("#search-form")!;
  const results = doc.getElementById("search-results")!;
  const hits = doc.getElementById("search-hits")!;
  const status = doc.getElementById("search-status")!;
  function submit(query: string) {
    input.value = query;
    form.dispatchEvent(new window.Event("submit", { cancelable: true }));
  }
  return { doc, input, form, results, hits, status, submit, close: () => window.close() };
}

const item = (title: string): SearchResultItem => ({
  data: async () => ({ url: "/methods/", meta: { title }, excerpt: `<mark>${title}</mark>` }),
});

test("search renders highlights without interpreting other markup", () => {
  const { window } = new JSDOM();
  const target = window.document.createElement("div");
  target.append(renderExcerpt(window.document, '<img src=x><mark>Teixeira</mark><mark title="x">literal</mark>'));
  assert.deepEqual([...target.children].map((node) => node.outerHTML), ["<mark>Teixeira</mark>"]);
  assert.equal(target.textContent, '<img src=x>Teixeira<mark title="x">literal</mark>');
  window.close();
});

test("search ignores late results even when a superseded request was loading page data", async () => {
  const old = Promise.withResolvers<SearchPageData>();
  const app = setup(async (query) => query === "old" ? [{ data: () => old.promise }] : [item(query)]);
  app.submit("old");
  await tick();
  app.submit("new");
  await tick();
  old.resolve({ url: "/", meta: { title: "Old page" } });
  await tick();
  assert.equal(app.hits.querySelector("a")?.textContent, "new");
  assert.match(app.status.textContent ?? "", /1 page matches “new”/);
  app.close();
});

test("clearing search restores focus and invalidates pending requests and errors", async () => {
  const pending = Promise.withResolvers<readonly SearchResultItem[]>();
  const app = setup(async (query) => query === "pending" ? pending.promise : [item(query)]);
  assert.equal(app.form.hidden, false);
  app.submit("current");
  await tick();
  assert.equal(app.results.hidden, false);
  app.doc.getElementById("search-clear")!.click();
  assert.equal(app.doc.activeElement, app.input);
  assert.equal(app.input.value, "");
  app.submit("pending");
  app.submit(" ");
  pending.reject(new Error("late failure"));
  await tick();
  assert.equal(app.hits.children.length, 0);
  assert.equal(app.results.hidden, true);
  assert.match(app.status.textContent ?? "", /Type a word/);
  app.close();
});
