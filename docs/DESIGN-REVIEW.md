# Reader-site design review — 2026-11-19

**Scope:** CSS-only polish and layout review of `tools/reader-site/`. No HTML/JS changes, no content changes, no repo-local paths.

**What was found**

- Shell too narrow: `.shell` was `min(100% - 2rem, 74rem)`. On a 1366px laptop this leaves ~180px of dead right-hand space. The page felt “floaty” and the hero specimen box sat too far right.
- Margin column visual: `.sheet__margin` is sticky on wide screens but has no background. The eyebrow/record-id sits on the body background and reads as a floating strip when the page has only one label. On narrow screens the margin block has no vertical breathing room and the rule line sits flush under the heading.
- Hero CTAs are plain text links. Without pill styling the three hero actions compete with a 44px H1; hierarchy inverts.
- `.section__note` inherits body type. It wraps under the heading on mobile and looks like the start of body copy.
- `.chip--unknown` has `background: transparent`, so on a raised panel the dashed chip disappears against the panel surface.

**Fixes applied (commit 3369164)**

- `.shell` → `min(100% - 2rem, 80rem)`. Right gap closes without crowding the 68ch measure.
- `.sheet` now a raised panel: `background: var(--paper-raised); border: 1px solid var(--rule); border-radius: var(--radius);`. The sticky margin column now has a surface to sit on.
- `.sheet__margin` aligned to top (`align-self: start`) and padded `0.5rem 1.25rem 0.5rem 0` on ≥60rem; mobile gap/padding tightened for balanced rhythm.
- `.hero` grid on ≥54rem now has explicit `gap: 2.5rem 3rem; align-items: start` so the specimen block aligns with the headline.
- `.hero__actions` with `.action` / `.action--quiet` are styled pills: inline-flex, background `var(--paper-raised)`, border `var(--rule-strong)`, focus/hover darken to `var(--paper-sunken)`. Quiet variant is transparent with rule border.
- `.section__note` → `margin:0; font-family:var(--font-mono); font-size:0.75rem; letter-spacing:0.06em; color:var(--ink-faint);`. Reads as a caption, not body copy.
- `.chip--unknown` background changed from `transparent` to `var(--paper-sunken)` for visibility.

**Build verification**

- `npm run build` → 28 pages, Pagefind 28 pages / 2058 words, zero warnings.
- `node --test tests/*.test.ts` passes (reader-site suite).
- Screenshots captured for home, method page and sources page.

**Remaining notes / suggestions**

- The family grid uses 1px rules on a paper-raised background. Consider adding a subtle inner shadow on the grid items for depth if the operator wants more separation. CSS-only.
- The specimen box on the home hero is still a plain outline. A `box-shadow` or a left accent rule would raise it visually; kept minimal per operator preference.
- No global stylesheet exists. The three style files are `tokens.css`, `fonts.css`, `base.css`. This note is now recorded in `docs/BUILD-PLAN.md` §8 to prevent future AI searches for `global.css`.

**Constraint compliance**

- No invented claims, no safety/commercial/novelty declarations. No changes to content, evidence states or assessment data. CSS-only, no HTML/JS meta changes.
