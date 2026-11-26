# Second pass — unprompted findings, 2026-11-25

Things the brief didn't ask for that change how the stream should be modelled. Three items here
**correct or overturn** conclusions in the first-pass report; those are marked ⚠️ **CORRECTION** at the
top so they don't get read as new-and-additive.

Captures added to `new-25-11-2026/` (3 more HTML files + 1 CSV). Bundle now 13 HTML/PDF + 3 CSV.

---

## ⚠️ CORRECTION 1 — the sterilization step comes FIRST after all. My first-pass inference was wrong.

In the first pass I inferred from Albe Zakes' 2013 quote that the order was shred → compost →
irradiate the residual butts, and flagged that as a meaningful change to M-06 row 1. **That was
wrong, and I should have caught it — the Times of Trenton source in your own brief names a better
witness than a press quote.**

TerraCycle's **Global VP of Research & Development** — Ernie Simpson, the same person your brief
already lists as the process developer — states the order unambiguously:

> **FACT** | "Once collected, the cigarette butts go through a multi-step process developed by the
> company to separate the plastic in the butts from the toxins… **'We first sterilize the material
> with gamma, or irradiation sterilization, and then we separate the tobacco and paper from the
> filaments,'** he says. 'Basically, we're looking for the cellulose acetate.'"
> — Ernie Simpson, Global VP R&D, TerraCycle, in CityLab, 2016-03-23
> https://www.citylab.com/life/2016/03/can-turning-cigarette-butts-into-plastic-solve-the-litter-problem-terracycle/475044/
> (live URL now redirects to a Bloomberg paywall/robot wall — captured via Wayback 2020-01-05,
> `CityLab_2016-03-23_Simpson_sterilize-first_1000butts_100g_plastic.html`) | **confidence: high**

**So the tally is now 2 sources for sterilize-first vs 1 against:**
- Surfrider SF FAQ, 2017 — "**first** sterilized using Gamma radiation … then shredded" ✓ first
- Simpson, TerraCycle R&D VP, 2016 — "we **first** sterilize … **and then** we separate" ✓ first
- Zakes, TerraCycle Global VP, 2013 — gamma described after composting ✗

**What this changes for M-06 row 1:** the irradiation load is the **whole intake** — tobacco, ash,
paper, wrapper and filter together, as received — not just the recovered filter fraction. That is a
materially larger and more expensive step than my first-pass note implied, and it moves the
utility/cost model back toward the "sterilize the bulk stream" assumption. The R&D VP outranks the
comms VP; treat 2013 as the loose paraphrase. **M-06 row 1 should read: whole-stream gamma
sterilization upstream of mechanical separation.**

Also from the same source — the reassuring part for modelling: the step is described as existing to
"separate the plastic … from the toxins," i.e. a **regulatory/hygiene** requirement, not a materials
one.

---

## ⚠️ CORRECTION 2 — the mass divisor is settled, and three independent routes agree to the gram

First pass I flagged "1 lb ≈ 2,268 butts, official figure says 1,000" and left it as an open tension.
It is no longer open. Three unrelated routes converge on **0.20 g per smoked butt**:

| Route | Evidence | Implied |
|---|---|---|
| **Composition** (peer-reviewed) | filter ≈ 0.20 g, 97% cellulose acetate → 0.194 g CA/butt | 2,268 butts/lb |
| **Weighed** (field) | "6.43 pounds … 14,583 cigarette butts" — Marquette, 2022 | 2,268 butts/lb |
| **Plastic yield** (TerraCycle's own) | "about a thousand cigarette butts to produce 100 grams of plastic" | 2,268 butts/lb |

The third one is the elegant one: 1,000 butts × 0.194 g CA = 194 g of acetate in; 100 g of pellet
out = **~52% mass yield**, which is exactly what a mechanical recovery with losses should give. The
number only coheres if a butt weighs 0.20 g.

> **FACT** | "It takes about a thousand cigarette butts to produce 100 grams of plastic, which means
> it's not particularly profitable." — CityLab, 2016-03-23 (same article) | **high**

**The official "1 lb = 1,000 butts" divisor implies 0.454 g/butt — over twice the true mass.** It is
an accounting convention, not a measurement, and it is self-consistent within TerraCycle's books
(Carnival: 42.5M butts ÷ $42,500 = exactly 1,000/lb). So the reports are not lying about the
donation — they are converting butts to pounds with a 2.3× inflator.

**Consequences to carry into M-06 row 5:**

| Quantity | As published | Corrected (0.20 g/butt) |
|---|---|---|
| 261,000 lb (KAB 2024) | 118.4 t | **~52 t** |
| 100M pieces (Dec 2018) | 45.4 t | **20.0 t** |
| 45,089,591 units (Dec 2015) | 20.5 t | **9.0 t** |
| 150,000 butts/pallet | 150 lb of butts | **66 lb of butts** |
| Plastic yield | — | **~0.1 kg CA per 1,000 butts; ~50% mass yield to pellet** |

**Recommendation now firmer than in pass 1: quote ~52 t as the real mass and ~118 t as the published
figure, and state the divisor discrepancy explicitly.** Reporting 118 t without this caveat would
overstate the material by 2.3×.

This also **kills the 5,000-butts-per-pallet figure** from pass 1 more decisively: 5,000 butts ≈ 1 kg
of filter, which cannot be a pallet. 150,000 butts ≈ 30 kg of filter into a pallet is right.

---

## ⚠️ CORRECTION 3 — your brief has the lawsuit wrong, and it matters

The brief says "Jan Dell false-advertising suit (settled 2021) … complaints/answers sometimes
describe the process chain including sterilization," and names it as a place to hunt for gamma detail.

The case is **Last Beach Cleanup v. TerraCycle, Inc.**, N.D. Cal. **4:21-cv-06086**, filed
2021-03-04, removed 2021-08-06, **settled 2021-11-05**, dismissal with prejudice 2021-11-10.
https://climatecasechart.com/case/last-beach-cleanup-v-terracycle-inc/ | **confidence: high**

**It is not a cigarette case.** The eight co-defendants are Coca-Cola, P&G, Late July Snacks, Gerber,
L'Oréal, Tom's of Maine, Clorox and Materne — and the challenged claims are about *packaging*
recyclability (condiment packets, pouches, cups). **Cigarettes are not in the complaint**, so it will
never yield a cigarette-process description. **Cross that item off the Wish 2 list.**

What it *does* yield is a governance fact worth having: TerraCycle agreed to **maintain records
substantiating its recycling representations**, develop policies to **track materials for recycling**,
and implement a **supply-chain third-party certification program**, plus reimburse LBC's legal fees.
If TerraCycle ever has to produce a per-stream mass ledger — for its own certification programme —
that is the document to subpoena/request. It is the most plausible route to a *weighed* tonnage
figure. **That is a stronger lead than anything left in the Wish 1 list.**

(The **Bloomington, Illinois** suit vs Bell International/Akshar is a separate, unrelated nuisance case
about a warehouse; it will not describe sterilization either.)

---

## Bonus 1 — market size and capture rate: the most useful number in this whole exercise

For the invention phase the relevant question isn't how much TerraCycle moved, it's what share of the
problem that is. Nobody in the corpus states it, so here it is:

- **US butt waste: ~135 million lb/yr** (≈ 61,000 t/yr), the figure TerraCycle and AP releases cite
  (see `social.terracycle.com` "Reynolds subsidiary funding cigarette recycling").
  Sanity check: ~200 bn cigarettes/yr × 0.20 g ≈ 40,000 t = 88 M lb. Same order; 135 M lb is
  defensible with a smoking-rate-heavy vintage. **Treat as order-of-magnitude, not precise.**
- **TerraCycle: 261,000 lb cumulative over ~12 yr ≈ 21,750 lb/yr.**

> **≈ 0.016% of US annual butt mass — about 1 pound in 6,200.**

Even allowing a 2.3× divisor error in TerraCycle's favour or against it, this stays a
**hundredth-of-a-percent** solution. Global: cigarette-butt litter is put at **1.69 billion lb/yr**.

**Why this is the useful number:** it reframes M-06. The mail-back model is not a recycling pathway
that happens to be small; it is a **demonstration/PR instrument** whose tonnage is rounding error
against the stream. Any invention-phase design that inherits the collection assumption inherits that
0.016%. The binding constraint is **collection and logistics, not the gamma step, not the
pelletizing chemistry** — those are solved and known. Budget and modelling effort should sit on
collection density and consolidation, where the 2.3× divisor never mattered.

Corollary for the economics: at a $1/lb donation, the *entire* 12-year programme generated
**~$261,000 total** for Keep America Beautiful, against **$12.5 million** Reynolds says it has spent
since 2009 on litter education, prevention, cleanup and recycling through KAB+TerraCycle. The
recycling tail is ~2% of the spend; the programme is overwhelmingly a litter-prevention and
marketing vehicle. **Do not model it as a materials business.**

## Bonus 2 — current status, November 2026 (the archive has nothing after 2016)

Both programmes are **live right now**, and both are worth capturing because they have been renamed
and re-funded:

| | US | Canada |
|---|---|---|
| URL | `terracycle.com/en-US/brigades/cigarette-waste-recycling` (200) | `terracycle.com/en-CA/brigades/cigarette-waste-en-ca` (200) |
| Brand | Cigarette Waste Free Recycling Program | **UNSMOKE** Cigarette Free Recycling Program |
| Sponsor | **Santa Fe Natural Tobacco Company** ("has sponsored this free recycling program") | **UNSMOKE** |
| Reward | 100 points/lb, $0.01/point → $1/lb | 100 points/lb, $0.01/point |
| Age gate | — | 19+ |

- The old `/brigades/cigarette-waste-brigade` URLs are **404**; the programme survived the site
  migration under a new path. Worth redirecting any dead links in the project's notes.
- **Canada is now UNSMOKE-branded, not SFNTC-branded** — a sponsor change the corpus doesn't record.
- **TerraCycle's own current process copy still says only**: *"Once collected, the cigarette waste is
  cleaned and separated by material type… The ash and tobacco are separated out and composted in a
  specialized process."* **No mention of gamma, in 2026, on the live page.** So the sterilization
  disclosure exists **only** in third-party sources (Surfrider 2017 formal; CityLab 2016 and Global
  News 2013 via staff). TerraCycle has consistently declined to put it in its own published process
  description. **That is now a documented pattern, not a gap** — and it is the reason no dose figure
  exists. Record it as: *disclosed verbally to press, never in company copy or filings.*
- **Enrollment limits are still real:** "Enrollment limits may apply. If the program is full, you will
  be added to a waitlist." This is precisely the practice the 2021 suit attacked, still in place.
- TerraCycle launched a **national US vape-device recycling service 2026-07-29** (paid, not
  brand-funded) — the tobacco-adjacent line is expanding, not contracting.

## Bonus 3 — patents: TerraCycle has none, which is itself the finding

Google Patents assignee search for **TerraCycle: 0 results.** TerraCycle has **not patented** the
cigarette process — it is a trade secret. That explains, at a stroke, why the offering circular, the
1-K filings and the website all describe the process in one vague sentence and no parameters: there is
no patent disclosure to mine, and the company has no incentive to publish.

The freedom-to-operate landscape around it, if the invention phase needs it:

- **US 7,560,059 B2** — "Process and method for recycling cigarette butts", Blake Burich, 2009. The
  core prior art; acetone-wetting of cellulose acetate.
- **US 2014/0287144 A1** — Burich & Putnam, CA manufacturing-waste recycling, 2014 (abandoned).
  Discloses the useful mechanical recipe: grind to ~½ inch, wet with acetone to a paste, add
  plasticizer/colorant/UV stabiliser, **pelletize for injection or extrusion**.
- **US 10,980,272 B2** — **MINIWIZ Co., Ltd.**, granted 2021-04-20, "Method and apparatus for
  recycling cigarette waste." The most relevant live patent: a machine that aligns each butt,
  **cuts out the non-filter part**, then mechanically pushes the CA plug out of the paper. Explicitly
  discards non-CA filter blocks (activated carbon, PP, PLA). Also sets a **1.5 cm minimum butt length**
  below which a butt is rejected as not worth recycling — a directly useful design parameter.
  https://patents.justia.com/patent/10980272
- Nothing patents **gamma irradiation of cigarette waste**. Searches for cigarette + gamma/sterilization
  return only unrelated medical-device art. **So the irradiation step is unclaimed and unparameterised
  in the patent literature** — consistent with it being a contracted service under ISO 11137, not IP.

## Bonus 4 — other parameters worth having

- **Filter composition, for mass balance:** ~95–97% cellulose acetate of filter mass; **12,000 fibres**
  per filter; plasticiser is **triacetin (glycerol triacetate)** at **6–10% mass fraction**; ~6–8%
  water; **0.2% TiO₂** delustrant (this is why the fibres are white); ~1% oil agent; inner plug-wrap
  paper + **polyvinyl acetate** adhesive; outer tipping paper. Degree of acetate substitution ~2.45.
  **Triacetin and the PVAc glue are the bits that will bite a re-melt/compounding route** (plasticiser
  loss and a second, incompatible polymer) — the literature's preferred recovery is therefore
  **solvent (acetone/ethyl acetate) dissolution–precipitation**, not melt compounding.
- **Realistic recovery yield:** a 2025 study recovered **93.9%** CA from 3,000 butts (425 g → 399 g) via
  a chemical route — i.e. the chemistry is not the bottleneck. TerraCycle's mechanical route gets ~50%.
- **Minimum viable batch:** TerraCycle told Libération (2018) it was *stockpiling* French and European
  butts because large-scale recycling needs runs of "**several tens of tonnes**". A real constraint for
  any process design.
- **Other programmes' economics for comparison:** Vancouver paid **$5/lb** to United We Can (vs $1/lb
  US); Caesars Windsor generated **$3,500** on 5.9 M butts (≈ $0.59/lb — inconsistent with a flat
  $1/lb, so Canadian rates differ or the counts are loose).
- **Named partners with volumes** (TerraCycle case-study deck, c.2023): Carnival 42.5 M butts / 23
  vessels / 3,500+ shipments; Chumash Casino ~29 M since 2013; Caesars Windsor 5.9 M; Disney Fantasy
  740 k on one vessel; Amazon 2 M since Earth Day 2021 across a *sample* of 278 FCs; Keep New Hanover
  ~1.8 M. Largest single channel by far is **cruise ships** — worth knowing if the project wants a
  concentrated feedstock.
- **Sponsor investment:** Reynolds says **> $12.5 M since 2009** (reynoldsamerican.com, live 2026);
  a 2026 third-party piece says **> $15 M** and that **SFNTC funded 447 receptacles in 2023 alone**.
  Believe the company's own site; treat $15 M as the loose one.

---

## Net effect on the project

1. **M-06 row 1** — order is now settled (whole-stream gamma *first*); dose/dwell still absent by
   design, and now demonstrably *withheld* rather than merely unfound. Patents confirm nothing to mine.
2. **M-06 row 5** — real mass is **~52 t**, not 118 t; divisor error of 2.3× is now proven three ways.
3. **New row worth adding** — **capture rate ≈ 0.016%**. This is the number that should drive
   invention-phase priorities, and it says the hard problem is collection, not processing.
4. **Two dead leads closed** — the Jan Dell suit (wrong stream entirely) and the Reg A+ circular
   (no parameters). Both were top-ranked in the original brief; neither needs another attempt.
