# Reader layout review

Review of the current preview after the footer, search and comparison interaction fixes. This is a repository note, not part of the public reader or the research record.

## Findings and changes

| Area | Finding | Change |
| --- | --- | --- |
| Start here | At a 1440 px viewport, the article used 595 px of a 1280 px shell, leaving 685 px blank on the right **inside** the shell. Full-width dividers made the offset more obvious. | Use a centered reading column for the whole article, including headings and dividers. The prose stays 595 px at that width; the column now starts near x=422 px instead of x=80 px. At 390 px it still uses the full 358 px available inside the gutters. |
| Other long-form pages | Worked examples, Egypt, limitations and the research explanation used the same left-heavy template. The glossary had the same visual imbalance. | Use the reading layout on these pages too. The homepage, catalogue, comparison and method detail pages keep the space they need for grids, tables or the method sidebar. |
| Reader path | “Start here” buried its onward links in the article. | Add visible links to the Methods index and worked examples immediately after the introduction. Keep the original section anchors and deeper links. |
| Methods index | Six long rows were hard to scan, and score counts could be mistaken for a measure of maturity. | Use two columns from 768 px and one below. Each card says what the route does, names an output from its published record and foregrounds an unresolved question from that family. The end-use survey is explicitly not another treatment process. No underlying evidence, ratings or source entries changed. |

## Prioritized follow-up from the first pass

1. **Mobile navigation (addressed below).** At 390 px the shared header took 216 px before the main content begins. Test a compact search affordance and a “More” disclosure for secondary destinations. Compare heading visibility at 320/390 px and make sure keyboard users can still reach every link without a focus trap. Avoid hiding the primary paths.
2. **Source detail hierarchy (addressed below).** The Teixeira pulp-paper page puts citation metadata and related methods before “What the source reports.” Keep the citation and a visible **Open original** link near the top, bring findings forward when present, and move lower-value audit fields into a disclosure. Do not imply findings exist on supporting references that have none.
3. **Comparison language and clues (scroll hint addressed below).** At 1440 px the entire matrix fits, but the sideways-scroll hint still appears; at 1024 px it really is scrollable. Show the hint only when useful. Make choosing one question more obvious on mobile and explain criteria like “sink completeness” in reader language without changing the rubric or scores.
4. **Mixed pages.** The AI proposals page has a left-heavy introduction and a legitimately wide scenario table further down. Treat prose and wide evidence blocks separately, rather than forcing the entire page into either a narrow article or a wide grid. Use a jump list only if the sections justify it; no filler sidebar.

## Verification checklist

- Check equal article gutters and divider width on desktop, full use of the mobile viewport, and that the wide comparison and catalogue stay wide.
- Confirm the two “Start here” paths and all six method-card links work without JavaScript. Check the original deep link to “What a cigarette butt actually is.”
- Run the reader build, type check, tests, release audit and browser regressions. Do not deploy from this review.

**Results:** Chromium verified centered columns and aligned dividers at 320, 390, 768, 1024, 1440 and 1920 px, including the one-to-two-column transition and preserved wide views. The deep link and reader navigation worked with scripts disabled. A separate pass across all 61 built routes at five widths found no page-level horizontal overflow; axe reported no violations on 13 sampled routes. The reader build, type check and 194 tests passed, and the release audit reported zero findings. Preview only; no production deployment.


## Follow-up: mobile header and source details

- **Mobile navigation:** At 390 px the closed header is now **87 px**, down from **216 px**. The four primary links stay visible. Search opens and focuses one shared field; Escape closes it, clears any results, and returns focus to Search. Secondary links use the native **More** disclosure, which works without JavaScript. The expanded desktop header is unchanged. At widths just below 720 px, the compact header also avoids squeezing the tagline and search onto multiple lines.
- **Source detail pages:** The citation and **Open original** link are followed by the linked findings, when present. On the Teixeira paper page the findings heading moved from about y=880 px to y=498 px on the 1440 px viewport. Citation details and audit fields remain available in native disclosures, and supporting references without linked claims say so rather than showing an empty findings section. These pages use the centered reading layout; the catalogue stays wide. Links reuse the recorded URL; this pass did not test publisher availability.
- **Comparison:** The scroll hint follows actual table overflow. It appears for the full matrix at 1024 px, not at 1440 px or when the chosen criterion fits.

**Still worth doing:** Explain the comparison criteria in plain language and make the one-question view more prominent on phones. Check long source titles on small screens; keep the full citation rather than truncating it or trying to strip the duplicated title out of unstructured citations. Use a separate wide block for the AI proposal scenario table while keeping the surrounding prose centered.

**Follow-up verification:** Keyboard open, focus, Escape and result clearing passed for compact search. The More disclosure opened by keyboard, exposed all five links, and worked without scripts. The source metadata disclosure and the responsive comparison hint passed in Chromium. Rechecked all 61 built routes at five widths, found no horizontal page overflow, and saw no axe violations on 13 sampled routes plus the expanded mobile More menu. All 197 reader tests passed; the release audit reported zero findings. No deployment.

## Follow-up: proposals, comparison questions, and original PDFs

- **AI proposals:** Centered the introduction, featured hypothesis, conclusion and earlier-notes disclosure at the same reading width as “Start here.” Kept the hypothetical scenario table in a separate, centered block up to 64 rem wide. It scrolls by keyboard on narrow screens. Added jumps to the featured proposal and calculation and kept the unvalidated label and model values unchanged.
- **Compare:** Highlighted the one-question selector and show the extra sort/filter controls only when a question is selected. Added plain-language labels and explanations, with the original rubric names in a disclosure. “What accepts the outputs” explains what was meant by “sink completeness”; underlying criteria and results did not change.
- **Sources:** The catalogue flags “PDF available.” Source pages offer View PDF, Download PDF and Publisher page for two verified originals. Other sources keep their external link. See [Public source PDFs](PUBLIC-SOURCE-PDFS.md) for permissions, file hashes, the Cloudflare fit, and the private-library distinction. Next: review further documents one at a time; do not infer publication rights from the presence of a PDF in the library. Long citations can repeat the title on small screens, but the full citation should stay intact until it has reliably structured metadata.

**Verification:** At six widths from 320 to 1920 px, proposal prose stayed centered and the scenario table used extra space where available. Keyboard scrolling, page jumps, and comparison filter reveal/reset passed. Both PDF URLs served `application/pdf`; downloaded files matched the original SHA-256 hashes on desktop and mobile-width Chromium. The link-only Teixeira PDF was not in the build and returned 404 at the document route. The 61-route overflow sweep and 13-page axe sample passed. Tests: 201 reader and 207 publication-contract. The release audit reported no findings; Wrangler dry run read 223 static files and did not upload them.

## Follow-up: a single reader path

The two header link rows were based on an internal distinction between primary and secondary pages. That put **Compare evidence** in a different row from **Methods**, even though they belong to the same reading task. The page path is now **Start here → Methods → Compare → Sources** on both desktop and mobile. **More** holds AI proposals, Glossary, Egypt, About the evidence, and Limitations. AI proposals is also still featured on the homepage. The brand links home; the footer keeps direct links to all destinations. More remains a native disclosure so these paths do not depend on JavaScript.

**Next usability review:** Ask a new reader to find one documented method, explain what is still unknown, and open the original source. Ask a technical reviewer to do the same on a real phone. Check whether the links between a method, its worked examples and its evidence are sufficient for those tasks before adding more navigation. Hosted reviewer access is a separate storage and permission decision, not another public navigation section; see [Reviewer PDF access](REVIEWER-LIBRARY.md).

**Verification:** The four main links stayed on one row from 320 through 1440 px, including the compact-to-desktop transition. Desktop header height at 1440 px fell from 152 to 103 px; at 390 px it remained 87 px. Keyboard More and no-JavaScript navigation passed. All 61 routes passed the five-width overflow check; automated accessibility checks found no issues on 13 sample pages or the open More menu at 390 and 1440 px. All 201 reader tests and the release audit passed. The reviewer tool separately passed four authentication/download tests; it is not in the public preview.

## Follow-up: the dead right margin, and the sidebar that was never in the source

Two complaints came from the operator after reading the hosted site: the sticky margin column (`.sheet__margin`) "shows in a strange way without its background" when scrolling, and every page left "so much gap on the right — was it meant to be a sidebar?"

**The first complaint was about the deployed build, not the source.** `.sheet__margin` does not exist anywhere in `tools/reader-site/src`. It exists only in the committed artifact at `tools/reader-site/artifact/site/`, an older design whose `.sheet` grid was `13rem minmax(0,1fr)` with a sticky, border-only margin column that had no background. `https://butt-lab.am6.workers.dev/` still serves that artifact, so the operator was reviewing a build roughly a hundred commits behind `main`. The source has no `.sheet` class at all. Redeploying the current artifact removes the artefact; no CSS fix was needed for it.

**The second complaint was real in the source.** Measured at a 1280 px viewport: the shell was 1233 px wide while `.prose` stayed 595 px at x=16, so 622 px of every page was empty on the right. On method pages the content column began at x=246 and still ended at 841, leaving a third of the screen blank. A second, subtler bug sat underneath: `--measure: 68ch` resolves against each element's own font size, so 68ch was 595 px on 17 px body text but 1329 px on the 34 px `h1` — headings constrained by the same token ran full width while their body text sat in a narrow column.

| Area | Change |
| --- | --- |
| `tokens.css` | `--measure` is now `37rem` and `--measure-wide` `46rem`, with a comment recording that `ch` resolves per element and 37rem ≈ 68 characters at the body size. |
| Reading column (`base.css`) | Text blocks on every page — `h1`, lede, prose, page actions, disclaimers, section headings and the source intro, filter and jump row — take `max-inline-size: var(--measure)` and centre with `margin-inline: auto`. Structural blocks (hero, card grids, tables) keep the full shell, so wide evidence stays wide and prose stays readable. |
| Method pages | The ≥62rem two-column layout with a 12rem sticky rail is gone; the page is one centred column, the aside sits above the content with a rule above and below, and the on-this-page list becomes a wrapping row of chips. |
| Glossary | `.page--reading` had a max width but no centring; it now centres. |
| Tables | Any table inside `.table-scroll` gets the data-table treatment even without the `.table` class — `/documents/` had no class and was rendering browser-default centred headers over left-aligned cells. |
| Links | Underline offset raised from 0.16em to 0.22em, and the dotted glossary term underline to 0.32em at 1 px, because at 0.2em it sat on the descenders and read as a strike-through on the serif face. |

**Verified in Chromium at 1280 px:** home, start, methods index, method detail, compare, sources, documents and glossary all show a single centred reading column with no dead right margin; the method page measures 592 px at x=337 for heading, aside, prose and tables alike. At 390 px the method page has a document width of 375 px inside a 390 px window (no horizontal overflow) and the jump chips wrap. Build 65 pages / 2525 words; `npm test` 201/201.

**Still open:** the hosted site must be rebuilt from the current artifact before any of this is visible to a reader.

## Follow-up: catalogue pages get their own alignment

Two cosmetic items from the pass above were fixed on the operator's instruction.

| Item | Change |
| --- | --- |
| Card grids sat under a centred masthead | A page whose body is a card grid or a wide table is now marked `layout="catalogue"` in `BaseLayout` (home, `/methods/`, `/sources/`, `/documents/`, `/compare/`). Those pages keep the shell's left edge for the masthead and section headings, so the eyebrow, h1, lede, buttons and the first card or table all start at the same x. Article pages keep the centred column. The measure cap still applies on catalogue pages, so a closing note under a wide table wraps at 592px instead of running 1200px across the screen. |
| `11.7 MB` wrapped onto two lines in the document shelf | The shelf table gains `class="table table--files"`; `.table--files td:nth-child(3)` and `td:nth-child(4)` are `white-space: nowrap`, so the size and download columns keep one value per line. |

**Verified:** home, `/methods/`, `/sources/`, `/documents/` and `/compare/` each show one left edge at 1280 px; the document shelf no longer wraps `11.7 MB` or `11.4 MB`; article pages (`/start/`, method detail, `/results/`) keep the centred column. Build 65 pages / 2525 words; `npm test` 201/201.

**Note on the build:** a PDF reader holding `dist/documents/fr3102180a1.pdf` made `astro build` fail with `EPERM` when it tried to empty `dist/`. Closing the reader fixed it; no source change was involved.
