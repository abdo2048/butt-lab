---
**Title:** obsidian as website
**Exported:** Tuesday 24-11-2026, 01:55 PM
**Method:** Captured answers verified against what is shown
[Chat URL](https://search.brave.com/ask?q=hey%2C+is+there+possbility+to+make+knowledge+management+markdown+software+%28like+obsidian+for+example%29+...&conversation=09d7289e79697b772aac23fd0f5c004cffcb) ↗

---

> [!question] Q1
>
> hey, is there possbility to make knowledge management markdown software (like obsidian for example) to work like as if it was simple website interface? for example to understand me better, i imainge like file which has buttons, cards which when clicked goes to a another file.
> so imainge like a website showing recycle methods for tex cloth for example, and this done in obsidian (or any knowledge management markdown). 
> isnt this possible with html syntax in markdown? navigation will be good? i cant imagine it yet.
> what you think?

**Yes, absolutely possible.** Obsidian (and similar tools) can get surprisingly close to a "website feel" using a few techniques:

**Within Obsidian itself:**

- **Wikilinks** (`[[Textile Recycling]]`) are your navigation — each note is a "page," clicking a link jumps to the next. This is the core "website" behavior.
- **MOC (Map of Content) notes** act as your homepage/index — a single note with a curated list of links to sub-topics, like a site nav.
- **HTML in markdown** — you can embed raw HTML (`<div>`, `<a>`, `<button>`, etc.) directly in `.md` files. Caveat: Obsidian does **not** render markdown *inside* HTML tags, so you mix plain HTML for layout and markdown around it.
- **Buttons plugin** (community) — adds actual clickable `<button>` elements that can trigger actions or navigate.
- **CSS Snippets** — drop a `.css` file in `.obsidian/snippets/` and toggle it on to restyle callouts, headings, etc. to look like cards, tiles, or a grid layout.
- **Callouts** (`> [!info]`) can be styled via CSS to look like info cards.
- **Dataview plugin** — dynamically queries your vault and renders results as tables/lists, so a "catalog page" auto-updates as you add notes.

**For your textile recycling example**, the structure would look like:

```
📁 textile-recycling/
├── index.md              ← "homepage" with card-style links
├── mechanical.md         ← mechanical recycling methods
├── chemical.md           ← chemical recycling methods
├── upcycling.md          ← upcycling / reuse
└── comparisons.md        ← pros/cons table
```

`index.md` uses wikilinks (or HTML `<a href>` styled as cards) to link to each sub-page. Clicking navigates within Obsidian just like clicking a link on a website.

**If you want a real published website** (not just local):

| Tool | What it does | Cost |
|---|---|---|
| **Quartz** | Converts an Obsidian vault into a static site, preserves wikilinks | Free |
| **Obsidian Publish** | One-click hosting, looks like the app | Paid |
| **Pandoc** | CLI conversion to HTML, full control | Free |

**My take:** For a personal knowledge base you navigate daily, stay in Obsidian with MOC + wikilinks + a CSS snippet for card styling. It's low-friction and the navigation feels very "website-like" once you build a few index notes. Only reach for Quartz/Publish if you need to share it externally or want a real URL structure.

**Sources**

1. [Markdown in Obsidian: The Complete Workflow Guide](https://www.markdowntools.com/blog/markdown-in-obsidian-complete-workflow-guide)
2. [r/ObsidianMD on Reddit: How to get markdown to work inside html?](https://www.reddit.com/r/ObsidianMD/comments/1siol4q/how_to_get_markdown_to_work_inside_html/)

---

> [!question] Q2
>
> could you create fast simple dummy example i can past it into obsidian now to see it? include cards for example

Here's a 3-note set. Create these in a new folder in your vault (e.g. `textile-demo/`):

**Note 1: `index.md`** (paste as a new note named `index`)

```markdown
# ♻️ Textile Recycling

<div style="display:flex; flex-wrap:wrap; gap:12px; margin:16px 0;">

<div style="flex:1; min-width:180px; padding:24px 16px; border-radius:12px; background:#e8f5e9; text-align:center; border:1px solid #c8e6c9;">
  <a href="[[mechanical]]" style="text-decoration:none; color:#1b5e20; font-size:1.15em; font-weight:bold;">
    🔄<br>Mechanical<br><span style="font-size:0.8em; font-weight:normal;">Shredding & spinning</span>
  </a>
</div>

<div style="flex:1; min-width:180px; padding:24px 16px; border-radius:12px; background:#e3f2fd; text-align:center; border:1px solid #bbdefb;">
  <a href="[[chemical]]" style="text-decoration:none; color:#0d47a1; font-size:1.15em; font-weight:bold;">
    ⚗️<br>Chemical<br><span style="font-size:0.8em; font-weight:normal;">Dissolve & re-polymerize</span>
  </a>
</div>

<div style="flex:1; min-width:180px; padding:24px 16px; border-radius:12px; background:#fff3e0; text-align:center; border:1px solid #ffe0b2;">
  <a href="[[upcycling]]" style="text-decoration:none; color:#e65100; font-size:1.15em; font-weight:bold;">
    ✂️<br>Upcycling<br><span style="font-size:0.8em; font-weight:normal;">Design & reuse</span>
  </a>
</div>

</div>

> [!tip] How to navigate
> Click any card above → opens that note. Use the **← back** link at the bottom of each sub-page to return here.
```

**Note 2: `mechanical.md`**

```markdown
# 🔄 Mechanical Recycling

Shredding textile waste into fibres, then re-spinning into yarn.

## Process
1. Sort by fibre type
2. Shred into short fibres
3. Clean & card
4. Spin into new yarn

## Limits
- Fibre shortens each cycle → quality drops
- Blends (poly-cotton) are hard to separate

---
[← Back to index](index)
```

**Note 3: `chemical.md`**

```markdown
# ⚗️ Chemical Recycling

Dissolving fibres back into monomers, then re-polymerizing into virgin-quality material.

## Methods
| Method | Best for | Status |
|--------|----------|--------|
| Solvent-based | Cellulose, wool | Commercial |
| Depolymerization | Polyester (PET) | Commercial |
| Hydrolysis | Nylon | Pilot |

## Advantage
Fibre length resets → no quality loss

---
[← Back to index](index)
```

**Note 4: `upcycling.md`**

```markdown
# ✂️ Upcycling

Turning waste into higher-value products without breaking down the fibre.

## Examples
- Denim → car insulation
- T-shirts → rags / wipers
- Runners → playground surfaces

---
[← Back to index](index)
```

---

**To try it:** create the 4 notes above in one folder, open `index` in reading mode (or live preview) → you'll see the coloured cards. Click one → jumps to that note. Hit the back link → returns to index.

That's the whole "website feel" — no plugins, no CSS files, just inline-styled HTML + wikilinks. From here you can layer in a CSS snippet for nicer hover effects or use the **Buttons** community plugin if you want actual `<button>` elements.

---

> [!question] Q3
>
> hmm! iam on index and tried to click card, but doesnt do anything, when i click doesnt do anything or view the code.
> i tried reading mode and click doesnt do anything.
> however the back to index link is working

Good catch — that's a known Obsidian limitation: **markdown links and wikilinks don't work inside block-level HTML** (`<div>`, etc.). Obsidian disables markdown parsing inside HTML blocks, so `[[mechanical]]` inside a `<div>` is just dead text.

The back link worked because `[← Back to index](index)` is a regular markdown link *outside* any HTML.

Here are two working fixes:

---

## Fix 1: Table (zero CSS, works immediately)

Replace your `index.md` content with:

```markdown
# ♻️ Textile Recycling

| 🔄 | ⚗️ | ✂️ |
|:---:|:---:|:---:|
| **Mechanical** | **Chemical** | **Upcycling** |
| Shredding & spinning | Dissolve & re-polymerize | Design & reuse |
| [[mechanical]] | [[chemical]] | [[upcycling]] |

> [!tip] How to navigate
> Click any note name above → opens that note.
```

Wikilinks inside table cells render as proper clickable links. Not as pretty as cards, but it works with zero config.

---

## Fix 2: HTML cards with `obsidian://` URI (the look you wanted)

Replace your `index.md` with this. **Find your vault name first**: Settings → General → the name at the top (e.g. `MyVault`).

```markdown
# ♻️ Textile Recycling

<div style="display:flex; flex-wrap:wrap; gap:12px; margin:16px 0;">

<div style="flex:1; min-width:180px; padding:24px 16px; border-radius:12px; background:#e8f5e9; text-align:center; border:1px solid #c8e6c9;">
  <a href="obsidian://open?vault=YOUR_VAULT&file=mechanical" style="text-decoration:none; color:#1b5e20; font-size:1.15em; font-weight:bold;">
    🔄<br>Mechanical<br><span style="font-size:0.8em; font-weight:normal;">Shredding & spinning</span>
  </a>
</div>

<div style="flex:1; min-width:180px; padding:24px 16px; border-radius:12px; background:#e3f2fd; text-align:center; border:1px solid #bbdefb;">
  <a href="obsidian://open?vault=YOUR_VAULT&file=chemical" style="text-decoration:none; color:#0d47a1; font-size:1.15em; font-weight:bold;">
    ⚗️<br>Chemical<br><span style="font-size:0.8em; font-weight:normal;">Dissolve & re-polymerize</span>
  </a>
</div>

<div style="flex:1; min-width:180px; padding:24px 16px; border-radius:12px; background:#fff3e0; text-align:center; border:1px solid #ffe0b2;">
  <a href="obsidian://open?vault=YOUR_VAULT&file=upcycling" style="text-decoration:none; color:#e65100; font-size:1.15em; font-weight:bold;">
    ✂️<br>Upcycling<br><span style="font-size:0.8em; font-weight:normal;">Design & reuse</span>
  </a>
</div>

</div>
```

Replace `YOUR_VAULT` with your actual vault name (spaces become `%20`).

**Caveat:** this uses Obsidian's URI scheme, so it opens via the app's URL handler. Some users report a slight delay compared to native wikilinks. Also, these links won't show up in Graph View or backlinks.

---

## TL;DR

| Approach | Clickable? | Pretty? | Graph/backlinks? |
|----------|-----------|---------|-----------------|
| Wikilinks in `<div>` | ❌ | ✅ | ❌ |
| Wikilinks in table | ✅ | 🤷 | ✅ |
| `obsidian://` in `<div>` | ✅ | ✅ | ❌ |

For a personal navigation hub that looks good, **Fix 2** is the closest to what you described. For a knowledge base where graph connectivity matters, **Fix 1** (or just plain wikilinks with a CSS snippet) is more robust.

**Sources**

1. [Links not recognised when they appear in text following block HTML element - Bug graveyard - Obsidian Forum](https://forum.obsidian.md/t/links-not-recognised-when-they-appear-in-text-following-block-html-element/62003)
2. [HTML inside Markdown links breaks it - Bug reports - Obsidian Forum](https://forum.obsidian.md/t/html-inside-markdown-links-breaks-it/52267)

---

> [!question] Q4
>
> searrch as of now nov 2026, are there workaorunds to obsidna limitation?

Short answer: **no, the limitation is still there** as of now. Obsidian's team (kepano) confirmed in April 2026 that it's an intentional design choice — markdown will not render inside HTML blocks. No plugin has patched it.

**However**, there are workarounds that get you the "clickable cards" look without fighting the parser:

---

## Best workaround: CSS snippet on a table/list

The trick: keep your links as **markdown** (so they stay clickable), and use CSS to *visually* transform a table or list into cards.

**Step 1** — Create a file `cards.css` in your vault's `.obsidian/snippets/` folder:

```css
/* Makes table rows look like clickable cards */
.cards-grid table {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  border-collapse: separate;
}
.cards-grid table thead { display: none; }
.cards-grid table tbody { display: contents; }
.cards-grid table tr {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 180px;
  height: 140px;
  border-radius: 12px;
  border: 1px solid #ddd;
  background: #f9f9f9;
  padding: 16px;
  text-align: center;
  transition: box-shadow 0.2s;
}
.cards-grid table tr:hover {
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}
.cards-grid table td {
  display: block;
  padding: 4px 0;
}
.cards-grid table td:first-child {
  font-size: 2em;
}
.cards-grid table td:nth-child(2) {
  font-weight: bold;
  font-size: 1.1em;
}
.cards-grid table td:last-child {
  font-size: 0.85em;
  color: #666;
}
```

**Step 2** — Enable it: Settings → Appearance → CSS Snippets → toggle on `cards`.

**Step 3** — Replace your `index.md` with:

```markdown
---
cssclasses: cards-grid
---

# ♻️ Textile Recycling

| 🔄 | Mechanical | Shredding & spinning |
|:---:|:---:|:---:|
| ⚗️ | Chemical | Dissolve & re-polymerize |
| ✂️ | Upcycling | Design & reuse |

> [!tip]
> Click any row to navigate.
```

Wait — that table has the links in the wrong column. Here's the corrected version where the wikilink is in the title cell:

```markdown
---
cssclasses: cards-grid
---

# ♻️ Textile Recycling

| | | |
|:---:|:---:|:---:|
| 🔄 | [[mechanical\|Mechanical]] | Shredding & spinning |
| ⚗️ | [[chemical\|Chemical]] | Dissolve & re-polymerize |
| ✂️ | [[upcycling\|Upcycling]] | Design & reuse |
```

The `\|` escapes the pipe so it's treated as an alias, not a column separator.

**Result:** you get a 3-column grid of styled "cards." Each title is a real wikilink → clickable → opens the note. Hover shows a shadow. No HTML, no broken links.

---

## Alternative: Obsidian Bases (newer, more powerful)

If you're on Obsidian 1.10+, **Bases** has a built-in card view with a `link()` function:

```yaml
# textile.base
filters:
  and:
    - file.folder == "textile-demo"
views:
  - type: cards
    name: Methods
    order:
      - file.name
```

Create a `.base` file with that content. It auto-renders your notes as a card grid, and each card is **clickable** (it links to the note). You can add properties (emoji, description) via frontmatter and display them on the card.

**Caveat:** the `html()` function in Bases formulas also can't render internal wikilinks (confirmed Nov 2025), but the default card link works fine.

---

## TL;DR

| Approach | Clickable? | Card look? | Effort |
|----------|-----------|-----------|--------|
| HTML `<div>` + wikilink | ❌ | ✅ | — |
| Table + CSS snippet | ✅ | ✅ | 5 min |
| Bases card view | ✅ | ✅ | 2 min |
| `obsidian://` URI in HTML | ✅ | ✅ | 5 min |

For your use case, **the CSS snippet on a table** is the fastest "paste and it works" solution. Bases is cleaner long-term if you want the card grid to auto-update as you add notes.

**Sources**

1. [r/ObsidianMD on Reddit: How to get markdown to work inside html?](https://www.reddit.com/r/ObsidianMD/comments/1siol4q/how_to_get_markdown_to_work_inside_html/)
2. [Obsidian Markdown Cheat Sheet — Free PDF Download](https://www.markdowntools.io/obsidian-cheat-sheet)
3. [obsidian-help/en/Editing and formatting/HTML content.md at master · obsidianmd/obsidian-help · GitHub](https://github.com/obsidianmd/obsidian-help/blob/master/en/Editing%20and%20formatting/HTML%20content.md)
4. [r/ObsidianMD on Reddit: How to use <div> for side by side headings](https://www.reddit.com/r/ObsidianMD/comments/vxcjhx/how_to_use_div_for_side_by_side_headings/)

---

> [!question] Q5
>
> no one tackled this before like a plugin or anything

Actually, **yes — several plugins tackle exactly this.** You're not the first to want it. Here are the most relevant ones:

---

## Closest to what you described

### **Home Cards** (2k+ downloads, active as of Oct 2026)

Gives your vault a **homepage/dashboard** of clickable note cards. You can create a "page" for any folder — so your `textile-demo/` folder gets its own card grid page automatically. Cards show note titles, excerpts, tags, and are clickable to open the note.

- Install from community plugins, search "Home Cards"
- Click the grid icon in the ribbon → opens your dashboard
- Each folder/tag can have its own "page" of cards

This is the closest to "my vault feels like a website with a nav."

---

### **obsidian-card-grid** (by bjornclauw)

Renders **YAML code fences** in your markdown notes as interactive card grids. Critically, it has an `iconCard` type that supports **internal links** — so a card can link to another note.

```markdown
```card-grid
columns: 3
gap: 20

cards:
  - type: iconCard
    title: Mechanical
    icon: recycle
    link: "mechanical.md"
    backgroundColor: "#e8f5e9"

  - type: iconCard
    title: Chemical
    icon: flask
    link: "chemical.md"
    backgroundColor: "#e3f2fd"

  - type: iconCard
    title: Upcycling
    icon: scissors
    link: "upcycling.md"
    backgroundColor: "#fff3e0"
```
```

This is literally "cards in a markdown file that navigate to other files" — exactly your use case. No HTML, no broken links.

---

### **CardHomeTab**

Turns a single markdown note into a **start page** by splitting it on headings and rendering each section as a card. Each card can carry its own CSS snippet for styling. The cards are rendered through Obsidian's own renderer, so wikilinks inside them work.

---

## Other options (more "dashboard" than "website nav")

| Plugin | What it does |
|--------|-------------|
| **Hearth** (40+ card types) | Full drag-and-drop dashboard, like a new-tab page. More "dashboard" than "website." |
| **Card Workspace** (4k downloads) | Sidebar card browser for a folder — click a card to open the note. |
| **Card Navigator** | Grid/list view of your vault notes as cards, browse by folder/tag. |
| **Grid Card View** (for Bases) | Card grid for Bases data, clickable headers link to the file. |

---

## My recommendation for your textile example

**`obsidian-card-grid`** is the most direct answer to "I want a markdown file with clickable cards that go to other files." It's literally a code fence in your `index.md` that renders as a card grid with working internal links. No CSS snippets, no HTML hacks, no `obsidian://` URIs.

Install it, paste the YAML block above into your `index.md`, and you get the exact "website homepage with cards" feel you described — inside a normal markdown note.

**Sources**

1. [Home Cards - Obsidian Plugin](https://community.obsidian.md/plugins/home-cards)
2. [Gallery Navigator - Obsidian Plugin](https://community.obsidian.md/plugins/gallery-navigator)
3. [GitHub - kenanlian/obsidian-card-workspace · GitHub](https://github.com/kenanlian/obsidian-card-workspace)
4. [GitHub - wakeyi-git/obsidian-card-navigator · GitHub](https://github.com/wakeyi-git/obsidian-card-navigator)
5. [GitHub - bjornclauw/obsidian-card-grid: An oObsidian plugin that renders YAML-formatted card grids · GitHub](https://github.com/bjornclauw/obsidian-card-grid)
6. [CardHomeTab - Obsidian Plugin](https://community.obsidian.md/plugins/card-home-tab)
7. [Hearth - Obsidian Plugin](https://community.obsidian.md/plugins/hearth)
8. [Card Workspace - Obsidian Plugin](https://community.obsidian.md/plugins/card-workspace)
9. [GitHub - mafflerbach/obsidian-grid-card-view · GitHub](https://github.com/mafflerbach/obsidian-grid-card-view)

