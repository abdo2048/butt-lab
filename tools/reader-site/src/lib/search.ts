/**
 * Pure helpers for the reader site's search.
 *
 * Pagefind returns a plain array of results. Each result carries a `data()`
 * promise that resolves to that page's metadata. The array itself has no
 * `.data()` and no `.count()`: calling either on it throws, which is why the
 * search failed silently in the first build of the site.
 *
 * These helpers are DOM-free so they can be tested directly.
 */

export interface SearchPageData {
  url: string;
  excerpt?: string;
  meta?: { title?: string };
}

export interface SearchResultItem {
  data: () => Promise<SearchPageData>;
  /** Pagefind's relevance score. A result with a score of 0 is not a match. */
  score?: number;
}

export interface SearchHit {
  url: string;
  title: string;
  excerpt: string;
}

/**
 * True when a result is an actual match. Pagefind may return pages it
 * considered but did not match; those carry a score of zero.
 */
export function isMatch(result: SearchResultItem): boolean {
  return result.score === undefined || result.score > 0;
}

/**
 * The number of matching pages. The result array has no `count()` method.
 */
export function countMatches(results: readonly SearchResultItem[]): number {
  return results.filter((result) => isMatch(result)).length;
}

/**
 * Read the page data of the first `limit` matching results.
 */
export async function collectSearchHits(
  results: readonly SearchResultItem[],
  limit = 12,
): Promise<SearchHit[]> {
  const matching = results.filter((result) => isMatch(result)).slice(0, limit);
  const pages = await Promise.all(matching.map((result) => result.data()));
  return pages.map((page) => {
    const title = page.meta?.title;
    return {
      url: page.url,
      title: title === undefined || title.trim() === "" ? page.url : title,
      excerpt: page.excerpt ?? "",
    };
  });
}

/**
 * The message shown under the search field.
 */
export function searchStatusText(query: string, total: number): string {
  if (total === 0) {
    return `No page matches “${query}”.`;
  }
  return `${total} page(s) match “${query}”.`;
}
