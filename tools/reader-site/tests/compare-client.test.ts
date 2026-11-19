// Tests for the comparison page's
// inline script. The script may only reorder and hide DOM nodes that the server
// already rendered. It must never change a score, a basis, an evidence state or
// an approval, and the page must stay complete when the script never runs.
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { test } from "node:test";
import { JSDOM, VirtualConsole } from "jsdom";

const here = path.dirname(fileURLToPath(import.meta.url));
const compareHtmlPath = path.join(here, "..", "dist", "compare", "index.html");

function readCompareHtml(): string {
  return fs.readFileSync(compareHtmlPath, "utf8");
}

function loadCompare(runScripts: "dangerously" | "outside-only"): {
  dom: JSDOM;
  document: Document;
  errors: string[];
} {
  const errors: string[] = [];
  const virtualConsole = new VirtualConsole();
  virtualConsole.on("jsdomError", (error: Error) => {
    errors.push(error.message);
  });
  virtualConsole.on("error", (message: unknown) => {
    errors.push(String(message));
  });
  const dom = new JSDOM(readCompareHtml(), {
    runScripts,
    pretendToBeVisual: true,
    url: "https://reader.invalid/compare/",
    virtualConsole,
  });
  return { dom, document: dom.window.document as unknown as Document, errors };
}

function serverOrders(document: Document): Record<string, { default: string[]; "evidence-gaps": string[] }> {
  const node = document.getElementById("compare-order");
  assert.ok(node, "the comparison page must publish the server-computed row order");
  return JSON.parse(node.textContent ?? "{}") as Record<
    string,
    { default: string[]; "evidence-gaps": string[] }
  >;
}

function rowOrder(document: Document): string[] {
  const body = document.getElementById("compare-rows");
  assert.ok(body, "the comparison table must have a tbody");
  return [...body.querySelectorAll("tr[data-method-id]")].map((row) =>
    row.getAttribute("data-method-id") ?? "",
  );
}

function cellTextByMethod(document: Document): Record<string, string> {
  const body = document.getElementById("compare-rows");
  assert.ok(body, "the comparison table must have a tbody");
  const result: Record<string, string> = {};
  for (const row of body.querySelectorAll("tr[data-method-id]")) {
    const id = row.getAttribute("data-method-id") ?? "";
    result[id] = [...row.querySelectorAll("td")].map((cell) => cell.textContent?.trim() ?? "").join("|");
  }
  return result;
}

function select(document: Document, id: string, value: string): void {
  const control = document.getElementById(id) as HTMLSelectElement | null;
  assert.ok(control, `the comparison page must expose #${id}`);
  control.value = value;
  control.dispatchEvent(new (document.defaultView as unknown as { Event: typeof Event }).Event("change"));
}

test("the comparison script runs without raising a script error", () => {
  const { dom, errors } = loadCompare("dangerously");
  assert.deepEqual(errors, []);
  dom.window.close();
});

test("the page marks itself as scripted so the controls can require JavaScript", () => {
  const { dom, document } = loadCompare("dangerously");
  const root = document.documentElement;
  assert.ok(
    root.classList.contains("has-js"),
    "the compare page must add the has-js class so the sorting controls only appear when the script runs",
  );
  dom.window.close();
});

test("choosing a criterion reorders the rows exactly as the server computed", () => {
  const { dom, document } = loadCompare("dangerously");
  const orders = serverOrders(document);
  const criterion = "evidence-strength";
  const before = rowOrder(document);
  select(document, "compare-criterion", criterion);
  const after = rowOrder(document);
  assert.deepEqual(after, orders[criterion]!.default);
  assert.notDeepEqual(before, after, "the neutral server order must differ from the sorted order for this criterion");
  dom.window.close();
});

test("the evidence-gap mode puts the unknown assessment first", () => {
  const { dom, document } = loadCompare("dangerously");
  const orders = serverOrders(document);
  const criterion = "resource-burden";
  select(document, "compare-criterion", criterion);
  select(document, "compare-mode", "evidence-gaps");
  const after = rowOrder(document);
  assert.deepEqual(after, orders[criterion]!["evidence-gaps"]);
  const first = after[0];
  assert.ok(first, "the sorted table must still have a first row");
  const cell = document.querySelector(
    `tr[data-method-id="${first}"] td[data-criterion="${criterion}"]`,
  );
  assert.equal(cell?.getAttribute("data-status"), "unknown");
  dom.window.close();
});

test("sorting never changes the text of a cell", () => {
  const { dom, document } = loadCompare("dangerously");
  const before = cellTextByMethod(document);
  select(document, "compare-criterion", "evidence-strength");
  select(document, "compare-mode", "evidence-gaps");
  const after = cellTextByMethod(document);
  assert.deepEqual(after, before);
  dom.window.close();
});

test("the comparison page is complete when the script never runs", () => {
  const { dom, document, errors } = loadCompare("outside-only");
  assert.deepEqual(errors, []);
  const body = document.getElementById("compare-rows");
  assert.ok(body, "the comparison table must have a tbody");
  assert.equal(body.querySelectorAll("tr[data-method-id]").length, 6);
  const links = [...document.querySelectorAll('a[href^="/methods/"]')].map(
    (link) => link.getAttribute("href"),
  );
  for (const family of [
    "biological",
    "chemical",
    "material-incorporation",
    "mechanical-physical",
    "product-routes",
    "thermal",
  ]) {
    assert.ok(
      links.includes(`/methods/${family}/`),
      `the server-rendered comparison must link to ${family} without JavaScript`,
    );
  }
  dom.window.close();
});

test("criterion selection focuses both views and clearing restores the complete comparison", () => {
  const { dom, document } = loadCompare("dangerously");
  const initial = rowOrder(document);
  const mode = document.querySelector<HTMLSelectElement>("#compare-mode")!;
  const basis = document.querySelector<HTMLSelectElement>("#compare-basis")!;
  const empty = document.getElementById("compare-empty")!;
  const message = document.getElementById("compare-status-message")!;
  assert.ok(document.querySelector("main h1"));
  assert.ok(mode.disabled && basis.disabled);
  assert.equal(document.querySelectorAll("#compare-table thead [hidden]").length, 0);
  select(document, "compare-criterion", "resource-burden");
  assert.ok(!mode.disabled && !basis.disabled);
  assert.equal(document.querySelectorAll("#compare-table thead [data-criterion]:not([hidden])").length, 1);
  assert.equal(document.querySelectorAll(".compare-card:first-child dt:not([hidden])").length, 1);
  select(document, "compare-status", "unknown");
  select(document, "compare-basis", "source-supported");
  assert.equal(document.querySelectorAll("#compare-rows tr:not([hidden])").length, 0);
  assert.equal(document.querySelectorAll("#compare-cards li:not([hidden])").length, 0);
  assert.ok(!empty.hidden);
  assert.match(message.textContent ?? "", /Showing 0 of 6/);
  select(document, "compare-criterion", "");
  assert.ok(mode.disabled && basis.disabled && empty.hidden);
  assert.equal(basis.value, "");
  assert.deepEqual(rowOrder(document), initial);
  assert.equal(document.querySelectorAll("#compare-rows tr:not([hidden])").length, 6);
  assert.equal(document.querySelectorAll("#compare-table thead [hidden]").length, 0);
  dom.window.close();
});


test("the comparison reveals supplementary controls only after choosing a question", () => {
  const { dom, document } = loadCompare("dangerously");
  const filters = document.getElementById("compare-options")!;
  const help = document.getElementById("compare-criterion-help")!;
  assert.equal(filters.hidden, true);
  assert.match(help.textContent ?? "", /Pick a question/);
  select(document, "compare-criterion", "sink-completeness");
  assert.equal(filters.hidden, false);
  assert.match(help.textContent ?? "", /who accepts it under what requirements/);
  assert.match(document.querySelector('th[data-criterion="sink-completeness"]')?.textContent ?? "", /What accepts the outputs/);
  select(document, "compare-criterion", "");
  assert.equal(filters.hidden, true);
  assert.match(help.textContent ?? "", /Pick a question/);
  dom.window.close();
});
