# Source reconstruction: UnB PI 0305004-1 / Poiato Recicla — pulping to cellulose

Date: 2026-11-03. Stage 2 / unit S2-05 (spec v1.0). Desk reconstruction of public disclosure only. **Not an operating procedure, plant design, safety approval or legal opinion.** No experiment was performed. Caustic pulping and acid precipitation are hazardous operations requiring qualified facilities, risk assessment and lawful effluent disposal.

## 1. Source identity and reading coverage

- Registry ID: `unb-alkaline-pulping`.
- Brazilian patent: **PI 0305004-1**, "Reaproveitamento de fibras de acetato de celulose e filtros de cigarro para obtenção de celulose e papel" (reuse of cellulose-acetate fibres and cigarette filters to obtain cellulose and paper).
- Holder: Universidade de Brasília (UnB). Filing date 2003-10-06; grant date 2014-11-11. `[VERIFIED-SOURCE: https://cdt.unb.br/en/tecnologias-protegidas/materiais/335-vitrine-tencologica/vitrine-materiais/vitrine-papel-e-celulose/553-filtro-de-cigarro-pi0305004-1]`
- `[CALCULATION]` A 20-year term from 2003-10-06 ends 2023-10-06. Brazilian term rules, annuities, extensions and any adjustment were **not** checked at INPI; this is arithmetic, not a legal status.
- Peer-reviewed: Teixeira MBdH, Duarte MAB, Garcez LR, Rubim JC, Gatti TH, Suarez PAZ, "Process development for cigarette butts recycling into cellulose pulp", *Waste Management* 60 (2017) 140–150, DOI 10.1016/j.wasman.2016.10.013. **Full text not read**; the following are from the authors' plain-language summary (Atlas of Science) and from secondary descriptions.
- Author summary: https://atlasofscience.org/cigarette-butts-processing-into-cellulose-pulp/
- Company layer: Poiato Recicla (Votorantim, SP), exclusive licensee. `[VERIFIED-SOURCE: atlasofscience.org; jornaldebrasilia.com.br 2022]`
- Reading class: `source-partially-read` (bibliographic + author summary + secondary descriptions); patent full text and paper full text `source-not-retrieved`.

## 2. Plain-language mechanism

The filter is not kept as a polymer. Under hot alkaline (or acid) conditions the acetate groups are hydrolysed off, converting cellulose acetate into cellulose; lignin and other tobacco residues are dissolved or separated; the remaining paper is disaggregated. The result is a cellulose pulp plus a dark liquor carrying lignin, metals, nicotine and nitrosamines. The pulp is washed and used for paper. The dark liquor can be acidified (HCl) to precipitate part of the load and the liquid returned to pulping.

This is a **deacetylation** route: acetate groups are hydrolysed and the product is cellulose pulp, not recovered cellulose acetate. The sources read describe acetate-group hydrolysis; they do **not** establish polymer-chain depolymerisation, so this reconstruction does not claim it. Its economics and material value are therefore different from S2-01/S2-03.

## 3. Disclosed steps (source-reported; not instructions)

| # | Operation | Disclosure | Source | Missing |
|---|---|---|---|---|
| 1 | Collect / sort | Butts collected separately; stored in 5 L containers in the lab study | Teixeira 2017 (secondary description) | Industrial sorting criteria |
| 2 | Remove trapped chemicals/tar | Reported as a step separating trapped chemicals and tar from the filter | Secondary review description of the four-step process | Method, solvent, completeness |
| 3 | Pulping / deacetylation | Alkaline pulping with **NaOH**; CA hydrolysed to cellulose. Author summary also mentions acid or alkaline pulping | Atlas of Science; review | NaOH concentration, temperature, pressure, time, liquor:solid ratio, vessel type |
| 4 | Lignin removal | Lignin from tobacco removed, liberating cellulose; ash and chemicals dissolved | Atlas of Science | Extent of delignification; residual lignin |
| 5 | Paper disaggregation | Remnant paper disaggregated into the pulp | Secondary review | Mechanical vs chemical |
| 6 | Pulp washing | Pulp washed before use | Atlas of Science | Wash volumes, endpoint |
| 7 | Dark-liquor acidification | Acid precipitation with HCl; liquor can return to pulping | Atlas of Science | pH, dose, precipitate composition and disposal |
| 8 | Further purification | Acidification, coagulation and ozonation reported (secondary) | Review excerpt | Sequence, doses, performance |
| 9 | Product | Cellulose pulp for paper/cardboard; artisanal paper | Company/news; seed facts (inherited) | Pulp yield, strength, brightness, contaminant content |

Company layer adds no numeric process conditions.

## 4. Inputs, outputs and mass basis

No defensible per-tonne yield can be derived from the sources read.

- Teixeira et al. are reported elsewhere as claiming "100 % utilisation" of the residue. `[VERIFIED-SOURCE: secondary Portuguese text]` This is a **material-utilisation claim**, not a mass yield and not a purity/toxicity result. Do not convert it into a pulp yield.
- Cellulose-acetate content figures in circulation differ by basis: ~36 % of a ~1 g smoked butt (whole-butt basis, `dossier/seed-facts.md`) vs "95 % of the filter mass" (review statement). These are different denominators; neither is a product yield.
- The pulp is cellulose, so its mass is lower than the acetate input on a stoichiometric basis (loss of acetyl groups), but the actual yield depends on losses, residual paper and delignification — all unquantified here.

`[CALCULATION]` is therefore deliberately **not** provided for yield. A per-tonne table would require at least: dry feed mass, acetate fraction, NaOH dose, pulp dry mass, liquor volume, precipitate mass. Only the first two exist as rough literature fractions, and neither is measured for this process.

## 5. Waste streams and disposal questions

| Stream | Character | Disclosed | Open question |
|---|---|---|---|
| Dark pulping liquor | Lignin, carbonyls, metals, nicotine, tobacco-specific nitrosamines | Composition reported; HCl precipitation and recycle reported | COD/phenolic load, colour, salt load, treatability |
| Acid precipitate | Metals/organics removed by pH shift | Not characterised | Hazardous-waste classification and disposal |
| Wash water | Residual alkali, organics | Not described | Neutralisation, discharge route |
| Residual solids (paper/ash) | Inorganic ash, paper fines | Not described | Separation and disposal |
| Pulp product | Cellulose with possible residual contaminants | Not assayed in sources read | Nicotine/TSNA/metal content of finished paper |
| Air emissions | Alkali mists, odour | Not described | Scrubbing |

The central unresolved issue is the effluent. A secondary review states that the alkaline route produces "a dark, toxic effluent that could not be successfully treated with standard methods", with purification by acidification, coagulation and ozonation. `[VERIFIED-SOURCE: secondary review excerpt; primary paper not read]` If that statement survives a primary-source check, the process's environmental case depends entirely on a wastewater train that the public disclosure does not quantify.

## 6. Safety questions (not instructions)

- Hot NaOH handling: caustic burns, especially to eyes; PPE and eyewash required.
- Acidification with HCl: exothermic, corrosive, potential H2S or other gas release from sulfide-containing liquor — must be assessed, not assumed.
- Nicotine and TSNA in liquor: dermal absorption and inhalation risk.
- Boiling/cooking vessels under pressure if used: pressure-vessel regulation applies; no build guidance is given here.
- Effluent permits and hazardous-waste transport for precipitate.
- Product safety for paper that may contact skin/food: not established.

## 7. Numbers explicitly unknown

1. NaOH (or acid) concentration, temperature, pressure, time, liquor:solid ratio.
2. Pulp yield, kappa number/degree of delignification, fibre length, strength.
3. Wash volumes and endpoint.
4. Dark-liquor COD, BOD, colour, metals, nicotine, TSNA.
5. Acid dose, precipitate mass/composition, disposal route.
6. Ozonation dose and performance.
7. Residual contaminants in the paper product.
8. Energy and chemical cost per tonne.
9. Legal status at INPI (expiry by term is arithmetic only).

## 8. Claim ledger

| Claim | Label | Source |
|---|---|---|
| Patent PI 0305004-1; UnB; filed 2003-10-06; granted 2014-11-11 | `[VERIFIED-SOURCE]` | UnB CDT technology page |
| Alkaline pulping with NaOH hydrolyses CA to cellulose; lignin removed; dark liquor; HCl precipitation; liquor recycled | `[VERIFIED-SOURCE]` (author summary) | Atlas of Science |
| Dark liquor contains lignin, carbonyls, metals, nicotine, TSNA | `[VERIFIED-SOURCE]` (secondary description of Teixeira) | De Fenzo 2020, citing Teixeira |
| Alkaline effluent not treatable by standard methods; purification by acidification/coagulation/ozonation | `[VERIFIED-SOURCE]` (secondary review; primary unread) | review excerpt |
| "100 % utilisation" | `[VERIFIED-SOURCE]` (secondary claim) — not a mass yield | Portuguese review text |
| 20-year term ends 2023-10-06 | `[CALCULATION]` | arithmetic from filing date |
| Poiato processes ~600,000 butts/month; ISO 14001 | `[VERIFIED-SOURCE]` (company/case-study self-report) | ResearchGate case study; Jornal de Brasília |
| The process is environmentally beneficial | `UNRESOLVED` — depends on effluent train not quantified publicly | — |

## 9. Engineering interpretation (hypothesis)

This route answers the "what do you do with the plastic" question by converting the acetate to cellulose. Advantages: no organic solvent, potentially lower chemical cost, product fits an existing pulp/paper market, and the patent is likely expired by term. Disadvantages: it converts the higher-value acetate; it consumes caustic and acid; and it produces a dark, contaminant-bearing liquor. The relative concentration/load of that liquor compared with other routes in this batch is **not measured here**; v1.0's "most concentrated" wording was withdrawn (errata E-04).

The decisive question is not pulp yield but **effluent and product cleanliness**: can the dark liquor be treated to a lawful discharge standard at a cost below the pulp value, and is the paper free of nicotine/TSNA/metals at the intended exposure?

Falsifier: measured effluent treated to permit limits with a full mass balance, plus product assays meeting a justified criterion. Failure mode: contaminants are shifted from fibre to liquor and precipitate, with no lawful, affordable sink.

## 10. Next discriminating work (not performed)

- Obtain the full Teixeira et al. paper and the INPI patent text for conditions and yields.
- Check INPI for the annuity/expiry status rather than relying on term arithmetic.
- Locate Poiato's environmental licence and effluent monitoring data (public agency filings if available).
- Compare with S2-03 (dissolution keeps the acetate) on product value, chemical demand and effluent load.
