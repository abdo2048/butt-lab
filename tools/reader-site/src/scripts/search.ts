import type { SearchResultItem } from "../lib/search.ts";
import { bindSiteSearch } from "../lib/search-ui.ts";

const PAGEFIND_MODULE_URL = "/pagefind/pagefind.js";

interface PagefindModule {
  search: (query: string) => Promise<{ results: SearchResultItem[] }>;
}

let pagefind: Promise<PagefindModule> | undefined;
bindSiteSearch(document, async (query) => {
  // Pagefind is generated after Astro builds; load it only when a reader searches.
  pagefind ??= import(/* @vite-ignore */ PAGEFIND_MODULE_URL) as Promise<PagefindModule>;
  const module = await pagefind.catch((error) => {
    pagefind = undefined;
    throw error;
  });
  return (await module.search(query)).results;
});
