import { collectSearchHits, countMatches, searchStatusText, type SearchResultItem } from "./search.ts";

/** Pagefind uses <mark> for matches. Build only that element; treat everything else as text. */
export function renderExcerpt(doc: Document, excerpt: string): DocumentFragment {
  const fragment = doc.createDocumentFragment();
  for (const part of excerpt.split(/(<mark>[^<>]*<\/mark>)/g)) {
    if (part.startsWith("<mark>") && part.endsWith("</mark>")) {
      const mark = doc.createElement("mark");
      mark.textContent = part.slice(6, -7);
      fragment.append(mark);
    } else {
      fragment.append(part);
    }
  }
  return fragment;
}

export function bindSiteSearch(
  doc: Document,
  search: (query: string) => Promise<readonly SearchResultItem[]>,
  hitLimit = 12,
): void {
  const form = doc.querySelector<HTMLFormElement>("#search-form");
  const input = doc.querySelector<HTMLInputElement>("#search-input");
  const status = doc.getElementById("search-status");
  const results = doc.getElementById("search-results");
  const hits = doc.getElementById("search-hits");
  const clear = doc.getElementById("search-clear");
  if (!form || !input || !status || !results || !hits || !clear) return;

  let newest = 0;
  const reset = () => {
    newest += 1;
    results.hidden = true;
    hits.replaceChildren();
    status.textContent = "";
  };
  const toggle = doc.querySelector<HTMLButtonElement>("#search-toggle");
  const more = doc.querySelector<HTMLDetailsElement>(".nav-more");
  const moreSummary = more?.querySelector("summary");
  const feedback = doc.getElementById("search-feedback");
  form.hidden = false;

  if (toggle) {
    const isOpen = () => toggle.getAttribute("aria-expanded") === "true";
    const closeSearch = () => {
      toggle.setAttribute("aria-expanded", "false");
      reset();
    };
    toggle.hidden = false;
    toggle.addEventListener("click", () => {
      if (isOpen()) {
        closeSearch();
      } else {
        if (more) more.open = false;
        toggle.setAttribute("aria-expanded", "true");
        input.focus();
      }
    });
    const escapeSearch = (event: KeyboardEvent) => {
      if (event.key !== "Escape" || !isOpen() || toggle.getClientRects().length === 0) return;
      event.preventDefault();
      closeSearch();
      toggle.focus();
    };
    form.addEventListener("keydown", escapeSearch);
    feedback?.addEventListener("keydown", escapeSearch);
    toggle.addEventListener("keydown", escapeSearch);
  }

  if (more && moreSummary) {
    more.addEventListener("keydown", (event) => {
      if (event.key !== "Escape" || !more.open) return;
      event.preventDefault();
      more.open = false;
      moreSummary.focus();
    });
    doc.addEventListener("focusin", (event) => {
      if (more.open && !more.contains(event.target as Node)) more.open = false;
    });
    doc.addEventListener("pointerdown", (event) => {
      if (more.open && !more.contains(event.target as Node)) more.open = false;
    });
  }

  input.addEventListener("input", reset);
  clear.addEventListener("click", () => {
    input.value = "";
    reset();
    input.focus();
  });
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    reset();
    const request = newest;
    const query = input.value.trim();
    if (!query) {
      status.textContent = "Type a word or two to search.";
      input.focus();
      return;
    }
    status.textContent = "Searching…";
    try {
      const items = await search(query);
      if (request !== newest) return;
      const pages = await collectSearchHits(items, hitLimit);
      if (request !== newest) return;
      for (const page of pages) {
        const item = doc.createElement("li");
        const link = doc.createElement("a");
        link.href = page.url;
        link.textContent = page.title;
        item.append(link);
        if (page.excerpt) {
          const snippet = doc.createElement("p");
          snippet.className = "small muted";
          snippet.append(renderExcerpt(doc, page.excerpt));
          item.append(snippet);
        }
        hits.append(item);
      }
      results.hidden = pages.length === 0;
      const total = countMatches(items);
      status.textContent = searchStatusText(query, total) + (total > hitLimit ? ` Showing the first ${hitLimit}.` : "");
    } catch {
      if (request === newest) status.textContent = "Search is unavailable. You can still browse the methods, sources and glossary.";
    }
  });
}
