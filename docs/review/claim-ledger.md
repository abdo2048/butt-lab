# Claim ledger

Every claim the reader site publishes, with the evidence label it carries and the one source it rests on. The verdict column is empty on purpose: it is filled by a reviewer who has read the source, not by the export.

Generated from `src/content/bundle/records.json` (publication version in `bundle-manifest.json`). Claims: **47**.

## Labels as published

| Label | Claims |
| --- | --- |
| `derived-from-sourced-premises` | 7 |
| `source-not-located` | 21 |
| `source-supported` | 19 |

## Claims per route

| Route | Claims |
| --- | --- |
| `biological` | 6 |
| `chemical` | 7 |
| `material-incorporation` | 8 |
| `mechanical-physical` | 8 |
| `product-routes` | 9 |
| `thermal` | 9 |

## The ledger

| # | Claim id | Route | Proposition | Label | Source | Locator | Text | Shelf | Verdict |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `biological-degradation-fate-unknown` | `biological` | No located source reports whether nicotine, tar components or heavy metals are degraded, transformed or simply concentrated by a biological treatment of cigarette butts. | `source-not-located` | `—` | — | no source | — |  |
| 2 | `biological-inference-earliest-stage-family` | `biological` | Because the located evidence for this family is a single granted patent for a treatment device together with general literature on polymer biodegradation that was not written about cigarette butts, this family has a weaker basis for any claim than the families with a peer-reviewed study behind them. | `derived-from-sourced-premises` | `—` | — | no source | — |  |
| 3 | `biological-metals-not-destroyed` | `biological` | No located source describes a biological step that removes heavy metals from cigarette butt material, and the fate of those metals between the treated material and the spent medium has not been reported. | `source-not-located` | `—` | — | no source | — |  |
| 4 | `biological-patent-device-exists` | `biological` | A patent granted in South Korea describes a device for treating cigarette butts with microorganisms. | `source-supported` | `kr-microbial-composting` | Patent title and trade-press reference | no text.md | link only |  |
| 5 | `biological-polymer-degradation-unquantified` | `biological` | No located source quantifies how far cellulose acetate from cigarette butts can be deacetylated or degraded, and no located source demonstrates complete mineralisation. | `source-not-located` | `—` | — | no source | — |  |
| 6 | `biological-regulatory-status-not-located` | `biological` | No located source names a jurisdiction, a material status, an acceptance pathway or an authority for this family, so the regulatory position of the recovered material remains unlocated. | `source-not-located` | `—` | — | no source | — |  |
| 7 | `chemical-analyte-partitioning-not-located` | `chemical` | No located source reports what share of nicotine, tar components, polycyclic aromatic hydrocarbons or heavy metals ends up in the recovered polymer rather than in the filtration residue or the spent solvent. | `source-not-located` | `—` | — | no source | — |  |
| 8 | `chemical-inference-purity-is-not-performance` | `chemical` | Because the located sources show that the polymer can be recovered and characterised but report neither contaminant partitioning nor any performance measurement, recovering the polymer says nothing about whether the recovered material could be used in any application. | `derived-from-sourced-premises` | `—` | — | no source | — |  |
| 9 | `chemical-mechanism-extraction-characterisation` | `chemical` | De Fenzo and colleagues report water and ethanol washing, followed by infrared and thermogravimetric characterisation of the recovered cellulose acetate. They used acetone in a later film-forming step, not as the initial wash. | `source-supported` | `defenzo-2020-materials` | Abstract; §2.2 and §3.4 | no text.md | link only |  |
| 10 | `chemical-mechanism-solvent-dissolution-precipitation` | `chemical` | A patent offering describes extracting cellulose acetate and nicotine from cigarette butts and filters with acetone, filtering the solution, precipitating the polymer by adding water, and recovering the acetone by boiling. | `source-supported` | `cnr-knowledge-share-ca-recovery` | Patent offering description | no text.md | link only |  |
| 11 | `chemical-metals-removal-unknown` | `chemical` | No located source reports whether heavy metals follow the dissolved cellulose acetate into the recovered polymer or stay in the insoluble residue, and no located source describes a step that would remove them. | `source-not-located` | `—` | — | no source | — |  |
| 12 | `chemical-regulatory-status-not-located` | `chemical` | No located source names a jurisdiction, a material status, an acceptance pathway or an authority for this family, so the regulatory position of the recovered material remains unlocated. | `source-not-located` | `—` | — | no source | — |  |
| 13 | `teixeira-2017-pulp-finding` | `chemical` | The researchers produced cellulose pulp by alkaline treatment. Their dark process liquor contained metals and organic compounds. The treatment sequence did not reduce chemical oxygen demand to an acceptable level in their tests; the paper also reports reuse of clarified liquor over several cooking cycles. | `source-supported` | `teixeira-2017-pulp` | Abstract; §4; Table 11 | no text.md | link only |  |
| 14 | `jin-2019-asphalt-finding` | `material-incorporation` | The study describes incorporating cigarette butts into an asphalt mixture and comparing Marshall and rutting test results with an ordinary mixture. | `source-supported` | `jin-2019-asphalt` | Abstract; road performance tests | no text.md | link only |  |
| 15 | `material-incorporation-inference-energy-claim-not-comparable` | `material-incorporation` | Because the located study reports an energy comparison without stating the functional unit, the boundary and the butt inclusion rate on a common basis, its energy saving cannot be compared with any other product in this family. | `derived-from-sourced-premises` | `—` | — | no source | — |  |
| 16 | `material-incorporation-leaching-unmeasured` | `material-incorporation` | No located source reports whether contaminants leach from a finished product that contains butt material under weathering, rain or contact with water and soil, and no located source reports the emissions from firing butt material. | `source-not-located` | `—` | — | no source | — |  |
| 17 | `material-incorporation-metals-retained` | `material-incorporation` | No located source describes a step in this family that would remove heavy metals, and no located source reports the heavy-metal content of a finished product or its leaching potential. | `source-not-located` | `—` | — | no source | — |  |
| 18 | `material-incorporation-no-commercial-demonstration` | `material-incorporation` | No located source demonstrates commercial-scale viability for a product containing cigarette butt material; the located studies are small in scale, and no independent verification of performance, safety or environmental benefit has been located. | `source-not-located` | `—` | — | no source | — |  |
| 19 | `material-incorporation-regulatory-status-not-located` | `material-incorporation` | No located source names a jurisdiction, a material status, an acceptance pathway or an authority for this family, so the regulatory position of the recovered material remains unlocated. | `source-not-located` | `—` | — | no source | — |  |
| 20 | `material-incorporation-small-scale-brick-study` | `material-incorporation` | A university study reported making bricks that contain cigarette butt material at a low inclusion rate, and reported a claimed reduction in the energy needed to make them compared with conventional bricks. | `source-supported` | `rmit-brick-making` | Trade-press summary of the university study | no text.md | link only |  |
| 21 | `rahman-2020-bitumen-finding` | `material-incorporation` | The paper describes adding cigarette butt fibre to several bitumen binders and comparing them with controls. The authors report improved binder drain-off behaviour under their test conditions; the penetration response varied by binder. | `source-supported` | `rahman-2020-bitumen` | §2.2; §4 | 54 KB | pdf |  |
| 22 | `belzagui-2021-microfibres-finding` | `mechanical-physical` | The authors reported detachment of fibres from smoked filters in water; the fibre-release work was on smoked filters under study conditions, not on a recycling plant wash stream. | `source-supported` | `belzagui-2021-microfibres` | §4, Conclusions | no text.md | link only |  |
| 23 | `mechanical-physical-analyte-removal-not-located` | `mechanical-physical` | No located source reports how much of each named contaminant leaves the filter material in each wash stage, or what remains in the washed fibre, for this family. | `source-not-located` | `—` | — | no source | — |  |
| 24 | `mechanical-physical-inference-description-without-removal-data` | `mechanical-physical` | Because the located description of this family sets out the separation and washing steps but reports no contaminant removal figures for them, the family cannot be compared with any other family on contaminant fate. | `derived-from-sourced-premises` | `—` | — | no source | — |  |
| 25 | `mechanical-physical-mechanism-grind-sieve-wash` | `mechanical-physical` | A granted patent describes a route in which cigarette butts are ground, sieved so that the filter fraction is separated, washed with water, dried and milled again, with the wash water recovered through a closed loop. | `source-supported` | `mego-fr3066128a1` | Patent abstract | no text.md | link only |  |
| 26 | `mechanical-physical-mechanism-staged-wash` | `mechanical-physical` | A published study describes extracting spent cigarette filters in hot water, rinsing them with cold water and then washing them with ethanol, and reports recovering cellulose acetate from that sequence. | `source-supported` | `defenzo-2020-materials` | Materials and methods, extraction procedure | no text.md | link only |  |
| 27 | `mechanical-physical-metals-fate-not-located` | `mechanical-physical` | No located source states the fate of heavy metals in this family, and no located source demonstrates a metals-removal outcome or a lawful route for metal-bearing residue. | `source-not-located` | `—` | — | no source | — |  |
| 28 | `mechanical-physical-regulatory-status-not-located` | `mechanical-physical` | No located source names a jurisdiction, a material status, an acceptance pathway or an authority for this family, so the regulatory position of the recovered material remains unlocated. | `source-not-located` | `—` | — | no source | — |  |
| 29 | `mechanical-physical-split-basis-not-stated` | `mechanical-physical` | Figures published for this family give a material split into filter material, wash residues and rejected solids, and a figure for butt mass per kilogram, but none of them states whether the mass was measured wet or dry, and two published figures for butt mass per kilogram disagree with each other. | `source-not-located` | `—` | — | no source | — |  |
| 30 | `air-filtration-2026-finding` | `product-routes` | The authors used recovered cellulose acetate from cigarette butts with polyacrylonitrile to make prototype nanofibre membranes and measured particle filtration and pressure drop. | `source-supported` | `air-filtration-2026` | Abstract; §3, Results and discussion | no text.md | link only |  |
| 31 | `code-effort-coverage-finding` | `product-routes` | The article describes fibre for stuffing, a paper-derived product, and composting of separated tobacco. It describes chemical treatment broadly; this is not an independent verification of product quality or contaminant fate. | `source-supported` | `code-effort-coverage` | Code Effort section | no text.md | link only |  |
| 32 | `dye-photocatalyst-2024-finding` | `product-routes` | The researchers incorporated recovered cigarette butt cellulose fibres into a photocatalyst composite and evaluated it against model dye solutions. | `source-supported` | `dye-photocatalyst-2024` | Abstract; §4, Conclusions | no text.md | link only |  |
| 33 | `product-routes-asphalt-route-reported` | `product-routes` | A technical article describes mixing cigarette butt material into asphalt to make a road material. | `source-supported` | `cigarette-butt-asphalt` | Article summary | no text.md | link only |  |
| 34 | `product-routes-filament-route-reported` | `product-routes` | A news report describes a business producing three-dimensional printing filament from cigarette butt material, alongside research publications on the same route. | `source-supported` | `3d-printing-filament` | News report summary | no text.md | link only |  |
| 35 | `product-routes-inference-routes-inherit-contamination` | `product-routes` | Because every route in this family takes material from another family without a step of its own, each route inherits the contaminant content of that intermediate, and only a route paired with a washing or dissolution family removes anything at all. | `derived-from-sourced-premises` | `—` | — | no source | — |  |
| 36 | `product-routes-metals-measurement-required` | `product-routes` | No located source reports the heavy-metal content of any candidate product from this family or its leaching potential, and no route can be considered until that measurement exists. | `source-not-located` | `—` | — | no source | — |  |
| 37 | `product-routes-no-independent-evidence` | `product-routes` | No candidate route located for this family has independent evidence of safety, performance or environmental benefit, and all of them remain unvalidated hypotheses. | `source-not-located` | `—` | — | no source | — |  |
| 38 | `product-routes-regulatory-status-not-located` | `product-routes` | No located source names a jurisdiction, a material status, an acceptance pathway or an authority for this family, so the regulatory position of the recovered material remains unlocated. | `source-not-located` | `—` | — | no source | — |  |
| 39 | `recig-trento-permit-finding` | `thermal` | The authorisation describes a site-specific route that includes sorting, washing and drying, followed by thermal mixing and granulation. The annex sets conformity requirements for the recovered material; the listed material criteria in Table 2 do not include the four metals tracked by Butt Lab. | `source-supported` | `recig-trento-permit` | Annex 1; Sub-annex 1.1, Table 2 | no text.md | link only |  |
| 40 | `tchaomegot-fr3102076b3-finding` | `thermal` | A French patent document describes using a supercritical fluid to extract residues from cigarette filters for a proposed insulation application. This is a disclosed route rather than operating evidence. | `source-supported` | `tchaomegot-fr3102076b3` | Abstract; claim 1 | 36 KB | pdf |  |
| 41 | `terracycle-process-finding` | `thermal` | TerraCycle says it sends separated paper and tobacco to composting, cleans and pelletises the filters by extrusion, and blends the plastic with other polymers for products. | `source-supported` | `terracycle-process` | How are cigarette butts recycled? | no text.md | link only |  |
| 42 | `thermal-contaminants-not-removed` | `thermal` | Because this family uses no washing or dissolution stage, the contaminants in the butt material remain inside the composite, and what can leave the product later is a question of leaching and weathering rather than of removal. | `derived-from-sourced-premises` | `—` | — | no source | — |  |
| 43 | `thermal-inference-no-contaminant-fate-comparison` | `thermal` | Because this family contains the contaminants rather than treating them, comparing it with a washing or dissolution family on contaminant fate would compare a containment step with a treatment step, and no located source supports such a comparison. | `derived-from-sourced-premises` | `—` | — | no source | — |  |
| 44 | `thermal-leaching-unmeasured` | `thermal` | No located source reports whether contaminants leach from the composite under weathering, rain or temperature cycling, and no located source reports the emissions from processing butt material in this way. | `source-not-located` | `—` | — | no source | — |  |
| 45 | `thermal-mechanism-dry-extrusion` | `thermal` | Company materials describe a process in which cigarette butts are dried and size-reduced, blended with a thermoplastic binder and extruded into composite profiles, with no washing stage. | `source-supported` | `keenat-dry-thermal` | Company process description | no text.md | link only |  |
| 46 | `thermal-metals-not-removed` | `thermal` | No located source reports the heavy-metal content of this composite or its leaching potential, and no located source describes a step in this family that would remove heavy metals. | `source-not-located` | `—` | — | no source | — |  |
| 47 | `thermal-regulatory-status-not-located` | `thermal` | No located source names a jurisdiction, a material status, an acceptance pathway or an authority for this family, so the regulatory position of the recovered material remains unlocated. | `source-not-located` | `—` | — | no source | — |  |

## How to fill a verdict

- `supported` — the source states the proposition, and the locator points at where.
- `partly supported` — the source states part of it, or states it more narrowly; write what it actually says.
- `unsupported` — the source is readable and does not support the proposition.
- `not located in text` — the extraction does not contain it. This is not `unsupported`: the PDF may still carry it, so the row stays open until someone reads the page.

A verdict is a reading of one source against one sentence. It is not a judgement that the route works, that a material is clean, or that a company's claim is true.

## Documents no claim cites

The shelf holds 50 documents. 9 of them are cited by one of the 47 claims, and 9 appear in the published bundle at all — the rest are permits, certificates, press items and papers collected while reading that never carried a claim.

That is the completeness check, and it is the one thing a claim ledger cannot do. A ledger tests sentences the site already prints; it cannot see a finding the site leaves out. These are the documents a reviewer sweeps for what should be there and is not. An entry carrying no claim is not evidence of a gap — most of them were never meant to carry one.

- `adsorptive-membranes-2024`
- `belzagui-2020-microfiber`
- `br0305004b1`
- `cn106928486b`
- `cu2o-ag2moo4-2024-photocatalyst`
- `ecomegot-2025-labels-guide`
- `evaplus-2024-report`
- `fr3066128a1-granted`
- `fr3066128a1-pre-grant`
- `fr3102180a1`
- `fr3110470a1`
- `generations-sans-tabac-2025`
- `george-2022-iop`
- `hudina-wo2026074041a2` — Method for recovering cellulose acetate from post-consumer items
- `ineris-2017-megots`
- `ineris-2018-megots`
- `inpi-bopi-2018-46`
- `inpi-fr3066128-b1-record`
- `jin-2019-iop`
- `keenat-2025-cdp-notice`
- `keenat-2026-guide`
- `kurmus-2020-toxicity-valorisation`
- `kurmus-thesis-fired-clay-bricks`
- `lamanna-2024-oleogel`
- `marinello-2019-review`
- `microplastic-fibers-leachates-2026`
- `montalbo-lca-disposal-routes`
- `moroz-toxicity-review`
- `nongdren-2024-littering`
- `nongdren-2026-cradle-to-grave`
- `novotny-2009-policy` — Cigarettes butts and the case for an environmental policy on hazardous cigarette waste
- `pan-nanofiber-2024`
- `penestin-2025-third-party`
- `recig-albo-nazionale`
- `recig-autorizzazione-impianto`
- `recig-bilancio-2024`
- `recig-civezzano-press`
- `recig-iso-14001`
- `recig-iso-45001`
- `shah-2023-review` — A comprehensive review on triple R eco-management strategies to reduce, reuse and recycle of hazardous cigarette butts
- `tchaomegot-fr3102075b1` — Use of cigarette butt fibres in thermal or acoustic insulation
- `tchaomegot-fr3125946b1`
- `teixeira-2016-thesis` — Characterisation and treatment of effluent from cigarette butt pulping
- `teixeira-cellulose-pulp`
- `torkashvand-2019-review` — A systematic review on cigarette butt management as a hazardous waste and prevalent litter
- `toxicants-released-tobacco-waste`
- `us-costs-simulation-2020`
- `zheng-2025-healthcare-microplastics`

Of those, 41 are not cited anywhere in the published bundle:

- `adsorptive-membranes-2024`
- `br0305004b1`
- `cn106928486b`
- `ecomegot-2025-labels-guide`
- `evaplus-2024-report`
- `fr3066128a1-pre-grant`
- `fr3102180a1`
- `fr3110470a1`
- `generations-sans-tabac-2025`
- `george-2022-iop`
- `hudina-wo2026074041a2`
- `ineris-2017-megots`
- `ineris-2018-megots`
- `inpi-bopi-2018-46`
- `inpi-fr3066128-b1-record`
- `keenat-2025-cdp-notice`
- `keenat-2026-guide`
- `kurmus-2020-toxicity-valorisation`
- `kurmus-thesis-fired-clay-bricks`
- `lamanna-2024-oleogel`
- `marinello-2019-review`
- `microplastic-fibers-leachates-2026`
- `montalbo-lca-disposal-routes`
- `moroz-toxicity-review`
- `nongdren-2024-littering`
- `nongdren-2026-cradle-to-grave`
- `novotny-2009-policy`
- `penestin-2025-third-party`
- `recig-albo-nazionale`
- `recig-bilancio-2024`
- `recig-civezzano-press`
- `recig-iso-14001`
- `recig-iso-45001`
- `shah-2023-review`
- `tchaomegot-fr3102075b1`
- `tchaomegot-fr3125946b1`
- `teixeira-2016-thesis`
- `torkashvand-2019-review`
- `toxicants-released-tobacco-waste`
- `us-costs-simulation-2020`
- `zheng-2025-healthcare-microplastics`

