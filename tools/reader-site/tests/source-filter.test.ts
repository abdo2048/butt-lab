import assert from "node:assert/strict";
import test from "node:test";
import { JSDOM } from "jsdom";
import { initSourceFilter } from "../src/lib/source-filter.ts";

test("the source filter matches words regardless of case or accents and restores the catalogue", () => {
  const dom = new JSDOM(`
    <div id="source-filter-controls" hidden><input id="source-filter"><button id="source-filter-reset">Clear</button><p id="source-filter-status"></p></div>
    <a id="jump-studies" href="#studies">Studies</a><a id="jump-companies" href="#companies">Companies</a>
    <section id="studies" data-source-group="studies"><article class="source-card" id="a">Teixeira pulp process</article><article class="source-card" id="b">Microfibres</article></section>
    <section id="companies" data-source-group="companies"><article class="source-card" id="c">MéGo! process</article></section>`);
  const document = dom.window.document;
  const byId = <T extends HTMLElement>(id: string) => document.getElementById(id) as T;
  initSourceFilter(document);
  assert.equal(byId("source-filter-controls").hidden, false);
  const input = byId<HTMLInputElement>("source-filter");
  const filter = (value: string) => {
    input.value = value;
    input.dispatchEvent(new dom.window.Event("input"));
  };
  filter("PROCESS  mego");
  assert.equal(byId("a").hidden, true);
  assert.equal(byId("studies").hidden, true);
  assert.equal(byId("jump-studies").hidden, true);
  assert.equal(byId("c").hidden, false);
  assert.equal(byId("source-filter-status").textContent, "Showing 1 of 3 references.");
  filter("abc123");
  assert.match(byId("source-filter-status").textContent ?? "", /No sources match/);
  byId("source-filter-reset").click();
  assert.equal(byId("studies").hidden, false);
  assert.equal(byId("jump-studies").hidden, false);
  assert.equal(document.activeElement, input);
  assert.equal(byId("source-filter-status").textContent, "Showing 3 of 3 references.");
  dom.window.close();
});
