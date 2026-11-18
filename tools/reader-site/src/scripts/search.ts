import {
  collectSearchHits,
  countMatches,
  searchStatusText,
  type SearchHit,
  type SearchResultItem,
} from "../lib/search.ts";

const PAGEFIND_MODULE_URL = "/pagefind/pagefind.js";
const HIT_LIMIT = 12;

interface PagefindSearchResult {
  results: SearchResultItem[];
}

interface PagefindModule {
  search: (query: string) => Promise<PagefindSearchResult>;
}

let pagefindModule: PagefindModule | null = null;

/**
 * Load Pagefind on demand. The module lives outside the site's bundle, so
 * the specifier is held in a variable and marked `@vite-ignore`: the bundler
 * must not try to resolve it at build time, and the browser must fetch it
 * only when the reader actually searches.
 */
async function loadPagefind(): Promise<PagefindModule> {
  if (pagefindModule !== null) {
    return pagefindModule;
  }
  const moduleUrl = PAGEFIND_MODULE_URL;
  const loaded = (await import(/* @vite-ignore */ moduleUrl)) as PagefindModule;
  pagefindModule = loaded;
  return loaded;
}

function renderHits(container: HTMLElement, hits: SearchHit[]): void {
  const list = document.createElement("ol");
  for (const hit of hits) {
    const item = document.createElement("li");
    const link = document.createElement("a");
    link.href = hit.url;
    link.textContent = hit.title;
    const snippet = document.createElement("p");
    snippet.className = "small muted";
    snippet.textContent = hit.excerpt;
    item.append(link, snippet);
    list.append(item);
  }
  container.replaceChildren(list);
}

function resultsContainer(form: HTMLElement): HTMLElement {
  const existing = document.getElementById("search-results");
  if (existing !== null) {
    return existing;
  }
  const created = document.createElement("div");
  created.className = "search__results";
  created.id = "search-results";
  form.after(created);
  return created;
}

function start(): void {
  const form = document.getElementById("search-form");
  const input = document.getElementById("search-input");
  const status = document.getElementById("search-status");
  if (
    !(form instanceof HTMLElement) ||
    !(input instanceof HTMLInputElement) ||
    !(status instanceof HTMLElement)
  ) {
    return;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const query = input.value.trim();
    if (query === "") {
      status.textContent = "Type a word or two to search.";
      return;
    }
    status.textContent = "Searching…";
    void (async () => {
      try {
        const { search } = await loadPagefind();
        const found = await search(query);
        const total = countMatches(found.results);
        const hits = await collectSearchHits(found.results, HIT_LIMIT);
        const container = resultsContainer(form);
        container.replaceChildren();
        if (hits.length > 0) {
          renderHits(container, hits);
        }
        status.textContent = searchStatusText(query, total);
      } catch {
        status.textContent =
          "Search is not available in this build. Browse the methods, sources and glossary instead.";
      }
    })();
  });
}

start();
