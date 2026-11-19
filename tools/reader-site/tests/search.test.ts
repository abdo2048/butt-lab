import assert from "node:assert/strict";
import test from "node:test";

import {
  collectSearchHits,
  countMatches,
  searchStatusText,
  type SearchResultItem,
} from "../src/lib/search.ts";

/**
 * A Pagefind-shaped result: every result carries a `data()` promise that
 * resolves to the page's metadata. The array itself has no `.data()` and no
 * `.count()` — that mismatch is what broke the search in the built site.
 */
function result(
  url: string,
  title?: string,
  excerpt = "excerpt text",
  score?: number,
): SearchResultItem {
  return {
    data: async () => ({
      url,
      excerpt,
      meta: title === undefined ? {} : { title },
    }),
    ...(score === undefined ? {} : { score }),
  };
}

test("collectSearchHits reads the page data from every result", async () => {
  const hits = await collectSearchHits([result("/a/", "Alpha"), result("/b/", "Beta")]);

  assert.deepEqual(hits, [
    { url: "/a/", title: "Alpha", excerpt: "excerpt text" },
    { url: "/b/", title: "Beta", excerpt: "excerpt text" },
  ]);
});

test("collectSearchHits caps the number of hits at the limit", async () => {
  const many = Array.from({ length: 20 }, (_unused, index) =>
    result(`/page-${index}/`, `Page ${index}`),
  );

  const hits = await collectSearchHits(many, 5);

  assert.equal(hits.length, 5);
  assert.equal(hits[0]?.url, "/page-0/");
});

test("collectSearchHits falls back to the url when a page has no title", async () => {
  const hits = await collectSearchHits([result("/no-title/")]);

  assert.equal(hits[0]?.title, "/no-title/");
});

test("collectSearchHits returns no hits for an empty result list", async () => {
  assert.deepEqual(await collectSearchHits([]), []);
});

test("collectSearchHits skips a result whose score is zero", async () => {
  const hits = await collectSearchHits([
    result("/no-match/", "No match", "text", 0),
    result("/match/", "Match", "text", 4),
  ]);

  assert.equal(hits.length, 1);
  assert.equal(hits[0]?.url, "/match/");
});

test("countMatches counts every result except those with a zero score", () => {
  assert.equal(
    countMatches([result("/a/", "A", "text", 0), result("/b/", "B", "text", 2), result("/c/")]),
    2,
  );
});

test("searchStatusText reports that nothing matched", () => {
  assert.equal(searchStatusText("aluminium", 0), "No page matches “aluminium”.");
});

test("searchStatusText reports the number of matching pages", () => {
  assert.equal(searchStatusText("aluminium", 3), "3 pages match “aluminium”.");
});
