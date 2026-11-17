# Butt-Lab Reader Platform Design

- **Status:** Approved design, awaiting user review of this written specification
- **Date:** 2026-11-13
- **First content release:** Cigarette-butt batch 02
- **Deployment boundary:** Public static website
- **Research authority:** Existing repository workflow and approved scientific records

## 1. Purpose

Build a public, plain-language website that explains cigarette-butt recycling methods without losing the provenance, uncertainty, dissent, and source boundaries preserved by the existing research workflow.

The first release is a cigarette-butt pilot, but its content model and build path must be reusable for another recyclable material. The site is a reviewed presentation layer. It does not run the research workflow, execute experiments, or become a second scientific source of truth.

## 2. Product Goals

The pilot must let a curious non-specialist:

1. Understand the six main recycling-method families within ten minutes.
2. See how each method works, where material and contaminants may go, what evidence exists, and what remains unknown.
3. Sort methods by separate practical criteria such as evidence strength, process ease, resource burden, contaminant-fate coverage, product readiness, and remaining validation work.
4. Open source citations, exact locators, original URLs, and locally hosted PDFs when redistribution is allowed.
5. Recognize source-supported content, inference, AI gap-closing notes, unresolved questions, and new unvalidated hypotheses at a glance.
6. Read technical definitions through accessible tooltips and a full glossary.
7. Reach detailed audit records without being forced to understand internal labels such as `F3` or `J-H-01` first.

The six batch-02 families and stable IDs are fixed for the pilot:

- `mechanical-physical` — mechanical and physical separation or washing;
- `thermal` — heat-driven conversion or treatment;
- `chemical` — solvent, reactive, or chemical-separation routes;
- `biological` — microbial, enzymatic, or other biological routes;
- `material-incorporation` — incorporation into composites, construction materials, or other matrices;
- `product-routes` — recovery routes organized primarily around the resulting product.

A method variant may relate to more than one family, but it has one primary family for navigation. Cross-family relationships are explicit links, not duplicate records.

For the pilot, the six families are the six top-level method entries: each has one page, one comparison row, and one assessment set. Variants appear inside their family page and are not independently scored or routed. A family criterion is scored only when the rationale applies across the declared family scope; otherwise it is `unknown` and identifies the variant-level evidence needed. Independent variant pages and scores are deferred.

## 3. Non-Goals

The pilot will not:

- run live AI or let readers trigger research;
- publish autonomously;
- provide a CMS, application database, moderation queue, or user accounts;
- migrate or rename every historical research file;
- create a universal recycling ontology before a second material tests the model;
- calculate a default aggregate “best method” score;
- issue safety, regulatory, economic, environmental-superiority, novelty, patentability, or experimental-validation verdicts;
- treat desk-research completion as experimental validation;
- host a local PDF unless public redistribution is approved;
- use a relationship graph as the primary navigation;
- depend on stock Quartz as the content model or rendering engine;
- provide Arabic content in the MVP, although the layout and model must remain localization- and RTL-safe;
- authorize or provide operating instructions for experiments or hazardous equipment.

## 4. Audience And Publication Boundary

The primary reader is a curious non-specialist. The default experience uses progressive disclosure: plain explanation first, technical evidence and audit detail second.

The pilot is public. An unlisted URL is not considered private. Every generated page, data file, search index, relationship record, and local PDF in the build output must be safe and permitted for public access.

English is the MVP language. Stable content identifiers must not depend on English titles so later localization, including Arabic and RTL presentation, can be added without changing relationships.

## 5. Design Principles

### 5.1 Reader names lead

Pages and cards use descriptive titles such as “Measured-purge washing hypothesis.” Internal provenance IDs such as `J-H-01` remain visible in a secondary audit drawer and in source links.

### 5.2 Knowledge states stay distinct

The model uses separate enums rather than one overloaded confidence field:

- **Content kind:** `claim`, `inference`, `ai-gap-closing-note`, `hypothesis`, or `unresolved-question`.
- **Evidence state:** `source-supported`, `source-conflicted`, `source-not-located`, `derived-from-sourced-premises`, or `not-applicable`.
- **Publication state:** `draft`, `approved`, or `excluded`.
- **Validation state:** `desk-research-only`, `requires-human-validation`, `new-unvalidated-hypothesis`, or `not-applicable`.

Only records with publication state `approved` can enter the publication manifest. No state is silently promoted, averaged, or converted into another. UI labels translate these exact values into plain language without changing their meaning.

### 5.3 Unknown is not zero

Missing or unmeasured evidence is represented as `unknown`. It is not assigned a zero score and is not treated as evidence of poor performance.

### 5.4 Scores are decision aids, not facts

Each criterion score has its own rubric, rationale, evidence basis, reviewer, and review date. Method promise and evidence strength are displayed separately. The MVP has no default aggregate score.

### 5.5 Publication is allowlisted

The site is generated from an explicit publication manifest. It never mirrors the repository tree. Historical workflow files, session logs, private evidence, and unresolved-rights assets remain excluded unless individually approved.

### 5.6 Chisle is a working constraint, not a product dependency

The design follows Chisle-style YAGNI discipline: reuse before adding, small bounded modules, terse records, and deferred optional features. Chisle is not required at runtime, and no global Chisle installation is part of this design.

## 6. System Boundary

The system has three layers.

### 6.1 Research workspace

The existing repository remains authoritative for:

- source acquisition and raw evidence;
- OCR and text derivatives;
- claim extraction and gap analysis;
- panel reports, dissent, and stage history;
- AI gap-closing drafts and invention drafts;
- human acceptance and workflow state.

Nothing in this layer publishes automatically.

### 6.2 Approved knowledge layer

This new layer contains only approved reader narratives, linked records, and public assets. It translates the research into a stable material-independent model while preserving links back to the audit trail.

### 6.3 Reader site

The public static site renders the approved layer into plain-language pages, comparison views, source records, glossary tooltips, backlinks, and audit drawers. Corrections return to the research and approval workflow; the browser cannot alter scientific state.

## 7. Technical Architecture

The pilot has three modules.

### 7.1 Approved content module

Human-readable narratives remain Markdown. Small YAML records hold reusable structure and relationships. Approved assets are stored separately from raw evidence.

Proposed publication layout:

```text
publication/
  manifest.yaml
  materials/
    cigarette-butts.yaml
  methods/
    <method-slug>/
      overview.md
      record.yaml
      claims.yaml
      gaps.yaml
      assessments.yaml
  hypotheses/
    <hypothesis-slug>/
      overview.md
      record.yaml
  pages/
    start-here.md
    egypt-annex.md
    how-the-research-works.md
  sources/
    <source-id>.yaml
  terms/
    <term-id>.yaml
  assets/
    pdf/
```

Markdown is canonical for approved reader narrative. YAML is canonical for identity, factual propositions, evidence states, relationships, locators, rights, gaps, and assessments. Markdown references structured records by stable ID and must not redefine their structured values. Forward relationships in YAML are canonical; backlinks are generated and never hand-maintained.

The physical layout may be adjusted during implementation only if the same module boundaries and record contracts remain intact.

### 7.2 Validator and exporter module

A TypeScript command validates the publication manifest, records, relationships, rights states, and asset allowlist. It emits a deterministic, immutable reader bundle and generated indexes. It does not infer scientific approval.

The data flow is one-way:

```text
publication manifest
  -> schema and policy validation
  -> explicit public-record and asset closure
  -> generated immutable content bundle
  -> Astro pages and Pagefind index
  -> build artifact
```

The exporter is network-free. External-link availability is checked by a separate advisory review job so network changes cannot make an otherwise identical export nondeterministic.

### 7.3 Static reader module

The implementation target is an Astro static site with TypeScript content schemas. Pagefind provides static full-text search. Client-side JavaScript is limited to comparison sorting/filtering and other interactions that cannot be produced at build time.

Quartz is visual and interaction inspiration, not a dependency. The site uses its own design tokens, components, routes, and evidence semantics.

The generated site is deployed through GitHub Actions to GitHub Pages. The build must account for the repository subpath in internal links and assets.

## 8. Minimum Knowledge Model

The model is intentionally small. Stable IDs link records across files.

### 8.1 Material

Required fields:

- stable ID and reader title;
- description and composition summary;
- relevant contaminants and terms;
- jurisdictions and tags;
- related method-family IDs.

### 8.2 Method family and variant

Required fields:

- stable ID, reader title, internal audit aliases, and family;
- plain summary and mechanism;
- feedstock and preparation;
- ordered process steps without hazardous operating instructions;
- inputs, outputs, material streams, products, sinks, and emissions boundaries;
- named contaminants and fate state;
- related claims, gaps, terms, sources, organizations, and hypotheses;
- evidence-status summary;
- current assessment record.

### 8.3 Source

Required fields:

- stable source ID;
- citation, source type, publisher or issuer, and version/date;
- original URL and access date;
- local artifact hash when present;
- rights state: `public-local-copy`, `link-only`, or `rights-unresolved`;
- derivative records, extraction method, page mapping, quality warnings, and derivative-publication right;
- related claims and methods.

`rights-unresolved` and `link-only` block the local artifact from site export.

Each OCR or Markdown derivative has its own publication right: `publish-full-text`, `publish-excerpts`, `metadata-only`, or `unresolved`. The default is `unresolved`. Only approved reader narrative and derivatives explicitly marked `publish-full-text` or `publish-excerpts` may contribute text to the public site. Raw OCR is never indexed automatically. Pagefind indexes rendered, approved pages only.

### 8.4 Claim

Required fields:

- stable claim ID and proposition;
- content kind and evidence state;
- method or hypothesis relationship;
- source ID and exact page/section locator when source-supported;
- denominator, units, and mass basis when quantitative;
- counterevidence or conflicting-claim references;
- reviewer and review date.

An inference is not presented as a sourced fact. It additionally requires sourced-premise claim IDs, explicit reasoning, reviewer, and review date. If its premises cannot be located, its evidence state is `source-not-located` or `source-conflicted`, not `derived-from-sourced-premises`.

### 8.5 Gap and validation question

Required fields:

- stable ID and plain-language question;
- gap type and why it matters;
- affected method, stream, contaminant, product, or claim;
- content kind, evidence state, publication state, and validation state;
- next required human work category;
- falsifier or decision condition when applicable.

Human-work categories are:

- source retrieval;
- analytical-method work;
- controlled laboratory evidence;
- pilot evidence;
- independent product or intended-use testing;
- treatment acceptance;
- regulatory review.

These categories document evidence gaps. They do not authorize experiments or provide operating instructions.

### 8.6 AI note or hypothesis

Required fields:

- stable ID, reader title, and exact type;
- visible label;
- source inputs and prior context;
- mechanism or proposed interpretation;
- assumptions and unresolved dependencies;
- failure modes and falsifiers;
- required validation questions;
- evidence state, publication state, validation state, reviewer, and version.

Batch-02 inline additions retain the label `[GAP-CLOSING NOTE — AI, scientist-inventor role]`. A new invention is a separate page and must remain marked `new-unvalidated-hypothesis`.

### 8.7 Glossary term

Required fields:

- stable term ID, preferred label, acronym, and aliases;
- short tooltip definition;
- full glossary explanation;
- related methods and claims;
- source references when the definition is evidence-dependent.

## 9. Comparison And Scoring

### 9.1 Assessment record

Each method may have one assessment per criterion. Its `status` is exactly one of `scored`, `unknown`, or `not-applicable`.

For `scored`, the record requires:

- criterion ID;
- ordinal score from 1 to 5;
- plain-language label;
- criterion-specific rubric version;
- rationale;
- basis: `source-supported`, `inference`, or `ai-assessed-human-reviewed`;
- supporting and conflicting claim IDs;
- reviewer and review date.

For `unknown`, the score and basis are absent and `unknown_reason` is required. For `not-applicable`, the score and basis are absent and `not_applicable_reason` is required. Score 1 means a completed assessment placed the method in the lowest defined band; it does not mean unassessed or unknown.

### 9.2 MVP criteria

1. **Evidence strength:** relevance, independence, directness, and coverage of available support.
2. **Process ease:** number and complexity of steps, specialized equipment or controls, and external dependencies.
3. **Resource burden:** water, energy, reagents, and waste under an explicit functional unit. It remains unknown without comparable denominators.
4. **Contaminant-fate coverage:** completeness of named-analyte accounting across product, liquids, rejects, emissions, treatment outlet, and unexplained loss.
5. **Sink completeness:** whether material, intended use, acceptance basis, issuer, and final route are located and characterized.
6. **Product readiness:** product identity, quality, intended-use performance, leaching or exposure evidence, and product gate.
7. **Regulatory clarity:** located jurisdiction-specific status, acceptance pathway, and remaining regulatory questions.
8. **Validation maturity:** whether the next human work is foundational or a bounded test against predefined criteria.

Higher scores always mean more favorable status for the named criterion. Each criterion has a distinct five-band rubric. A rating cannot be copied from one criterion into another.

### 9.3 Evidence-strength rubric

- **1 — Minimal:** the completed review located no accessible direct support for the decision-relevant proposition, while recording its search boundary.
- **2 — Limited:** first-party, indirect, or narrowly scoped support with material gaps.
- **3 — Mixed:** directly relevant support exists, but independence, scale, or coverage is limited.
- **4 — Substantial:** multiple relevant sources include independent support and report key conditions and denominators.
- **5 — Strong:** convergent independent evidence covers use-relevant conditions and material counterevidence.

### 9.4 Remaining criterion rubrics

All rubrics are versioned content and visible from the comparison UI.

**Process ease**

- **1 — Very difficult:** many tightly coupled steps, specialized controls, or critical external dependencies are disclosed.
- **2 — Difficult:** several specialized steps or dependencies materially constrain operation.
- **3 — Moderate:** mixed standard and specialized steps with manageable but material dependencies.
- **4 — Relatively easy:** mostly standard steps with few specialized dependencies.
- **5 — Simple:** a short, clearly bounded sequence using broadly standard operations and minimal external dependencies.

**Resource burden**

- **1 — Very high:** comparable functional-unit evidence shows the highest material, water, energy, or waste burden in scope.
- **2 — High:** comparable evidence shows substantial burden across one or more material categories.
- **3 — Moderate or mixed:** comparable evidence shows neither consistently high nor consistently low burden.
- **4 — Low:** comparable evidence shows relatively low burden with material categories reported.
- **5 — Very low:** comparable evidence shows the lowest burden in scope with the major resource and waste categories closed.

Without comparable functional units and denominators, this criterion is `unknown`, not estimated from process appearance.

**Contaminant-fate coverage**

- **1 — Minimal:** decision-relevant analytes or major output streams are not measured.
- **2 — Partial:** some analytes or streams are measured, but major fate paths remain open.
- **3 — Mixed:** most major streams are represented, but analyte coverage, uncertainty, or unexplained loss is incomplete.
- **4 — Substantial:** named analytes are measured across the major product, liquid, reject, and emissions paths with uncertainty reported.
- **5 — Complete for stated scope:** the stated analyte panel closes across all declared streams, treatment outlet, and unexplained loss within a predefined uncertainty framework.

**Sink completeness**

- **1 — Undefined:** the produced material or final route is not named.
- **2 — Proposed:** material and intended route are named, but acceptance basis or issuer is absent.
- **3 — Partly specified:** most four-field elements are located, but acceptance or final routing remains conditional.
- **4 — Documented:** material, intended use, acceptance basis, issuer, and final route are documented, with one material performance gap remaining.
- **5 — Complete for stated scope:** all four fields and the final route are documented and linked to relevant analytical acceptance evidence.

**Product readiness**

- **1 — Undefined:** product identity or intended use is not adequately defined.
- **2 — Conceptual:** a product is named, but specifications or intended-use evidence are missing.
- **3 — Characterized:** identity and selected quality properties are reported, while intended-use, leaching, exposure, or independent performance evidence remains incomplete.
- **4 — Substantial:** defined specifications and intended-use evidence are present with limited remaining independent validation.
- **5 — Ready for stated evidence scope:** product specifications, independent intended-use performance, and relevant leaching or exposure gates are documented. This is not a universal safety or commercial-readiness claim.

**Regulatory clarity**

- **1 — Unlocated:** no current jurisdiction-specific pathway or decision is located.
- **2 — Preliminary:** potentially relevant instruments are identified, but applicability or acceptance is unresolved.
- **3 — Partial:** jurisdiction, authority, and likely pathway are located, with material interpretation or acceptance questions open.
- **4 — Documented:** current pathway and required decision points are documented from authoritative sources.
- **5 — Explicit for stated scope:** a current authority or authorized issuer has documented the applicable status or acceptance for the stated material, use, and jurisdiction. This is not a broader approval claim.

**Validation maturity**

- **1 — Foundational unknowns:** mechanism, partition, product, or sink assumptions require basic resolution.
- **2 — Broad validation needed:** the main concept is described, but several independent evidence classes remain missing.
- **3 — Bounded programme definable:** major questions are known and can be expressed as explicit tests and decision conditions.
- **4 — Narrow confirmation needed:** most decision-critical evidence is present, with a small set of predefined confirmation gaps.
- **5 — Maintenance for stated scope:** the stated evidence package is complete and remaining work is monitoring or repeat confirmation. This does not authorize deployment or imply safety.

### 9.5 Sorting behavior

- Readers sort one criterion at a time.
- Unknown values sort last by default.
- “Find evidence gaps” mode places unknown values first.
- Every displayed score includes its basis label.
- Readers may filter to source-supported assessments only.
- Detailed gaps, rationale, and dissent remain accessible from every score.
- The MVP does not average the scores or select a winner.

## 10. Reader Information Architecture

### 10.1 Primary navigation

- Start here
- Methods
- Compare evidence
- Sources
- Glossary

### 10.2 Secondary navigation

- New invention
- Egypt annex
- How the research was produced
- Audit links and limitations

### 10.3 Required routes

```text
/
/start/
/methods/
/methods/<method-slug>/
/compare/
/sources/
/sources/<source-id>/
/glossary/
/invention/
/egypt/
/research-method/
/limitations/
```

### 10.4 Start page

The start page explains:

1. what a cigarette butt contains;
2. the six method families;
3. how evidence labels work;
4. why material fate and product quality are separate questions;
5. how to compare methods;
6. where to find the new invention after understanding the landscape.

### 10.5 Method page

Each method page presents, in order:

1. one-minute plain-language explanation;
2. mechanism and feedstock;
3. illustrated process steps;
4. material-stream and contaminant-fate view;
5. products, sinks, and unresolved loss;
6. criterion scorecard with evidence basis;
7. known failure modes and missing evidence;
8. human validation still required;
9. visibly distinct AI gap-closing notes;
10. source cards and original links;
11. technical audit drawer with internal IDs, versions, public-safe audit links, and dissent.

The site never emits repository-local paths. Audit references use an approved record containing a reader label, public HTTPS URL, commit or version, and optional internal ID. If no public-safe audit target exists, only the approved alias and version are shown.

### 10.6 Comparison page

The comparison page provides a table and card view. It supports one-criterion sorting, status and evidence-basis filters, side-by-side method selection, and a gap-finding mode. It does not show a default aggregate ranking.

### 10.7 Sources and PDFs

Every source page shows citation, source type, version, access date, original URL, relevant locators, related claims, and derivative-quality warnings.

If redistribution is approved, the page also offers the local PDF. Otherwise it offers only the original link and citation. OCR or Markdown derivatives support private AI/research work. Public search includes only rights-approved text that has been rendered into an approved public page; derivatives are not presented as canonical sources or indexed directly.

### 10.8 Glossary and tooltips

Recognized terms and acronyms receive a short tooltip on hover and keyboard focus. Each tooltip links to a full glossary entry. Tooltips must not contain information unavailable to touch or keyboard users.

### 10.9 Relationships

Method, source, claim, term, gap, and hypothesis pages show related items and backlinks generated from structured relationships. A global graph visualization is deferred until core navigation and comparison are validated with readers.

## 11. Visual Direction And Accessibility

The visual direction is a restrained Quartz-inspired knowledge garden, not a stock Quartz theme:

- warm, paper-like surfaces;
- high-contrast charcoal text;
- muted blue or teal navigation and relationship cues;
- amber treatment for AI notes and assumptions;
- explicit warning styling for unresolved states;
- dense technical information only behind progressive disclosure;
- minimal rounded-card repetition and no decorative graph clutter.

All colors are implemented through CSS custom properties. Status always includes text or iconography in addition to color.

Accessibility requirements:

- semantic headings and landmarks;
- keyboard-complete navigation, tooltips, drawers, filters, and comparison controls;
- visible focus states;
- sufficient contrast;
- reduced-motion support;
- mobile layouts without horizontal page scrolling;
- table alternatives or responsive cards for narrow screens;
- localization-safe spacing and logical CSS properties for later RTL support.

## 12. Source And Publication Workflow

### 12.1 Register

Create a source record with citation, original URL, version, access date, rights state, and hash for any local artifact.

### 12.2 Derive

Create OCR or Markdown derivatives with extraction method, page anchors, quality metadata, and a link to the canonical source. Derivatives cannot independently verify quotations.

Derivative publication is default-deny and separate from source-file rights. Search indexes receive only approved rendered narrative, never the private derivative corpus.

### 12.3 Interpret

Bind claims to exact locators and evidence states. Preserve conflicts, nondisclosure, missing denominators, and failed retrievals.

### 12.4 Extend

Add AI gap-closing notes or hypotheses only with visible labels, source inputs, assumptions, failure modes, and falsifiers.

### 12.5 Approve

Human review covers scientific fidelity, AI boundaries, rights, plain language, accessibility, and inclusion in the publication manifest.

### 12.6 Build and preview

The validator produces the public bundle. A local preview receives scientific, rights, reader, responsive, and accessibility review.

### 12.7 Publish

Deployment occurs only after explicit operator approval for that version. Corrections create a new reviewed version through the same workflow.

Build and deployment are separate GitHub Actions workflows. Pushes and pull requests may run validation and produce a content-addressed artifact, but cannot deploy. Deployment uses a manual `workflow_dispatch` requiring the approved commit SHA, publication version, build-run ID, and artifact SHA-256. The workflow verifies those values against the operator-approval record in `state/workflow.yaml` and the publication manifest before deploying that exact artifact to GitHub Pages.

### 12.8 Publication manifest contract

The manifest explicitly lists every public record ID, page ID, and asset path plus hash. Inclusion is not transitive: relationships never pull an unlisted record or asset into the bundle. A published relationship to an unlisted record is a build error unless represented as a public-safe audit reference.

The exporter resolves the full output list from those entries, rejects orphaned public files, verifies asset paths and hashes remain under `publication/`, builds into a fresh temporary directory, and replaces the output only after success. Failed exports cannot leave stale files in a deployable directory.

## 13. Validation And Error Handling

### 13.1 Build-blocking errors

The exporter fails on:

- invalid or missing required fields;
- duplicate stable IDs;
- broken internal relationships;
- source-supported claims without locators;
- quantitative claims without required units or basis;
- mixed or invalid evidence states;
- local PDFs without `public-local-copy` rights;
- assets or pages absent from the publication allowlist;
- references to forbidden raw, private, operator, or session-log paths;
- hypotheses rendered without their unvalidated status;
- unsafe URL schemes, unsafe embedded HTML, path traversal, or IDs/slugs that escape their expected namespace;
- symlinked assets that resolve outside `publication/`;
- derivatives without an explicit public derivative right;
- an output file not accounted for by the manifest-derived closure.

### 13.2 Warnings requiring review

Warnings include:

- low-quality OCR;
- unreachable external links;
- unknown criterion ratings;
- unresolved source conflicts;
- missing optional relationships;
- stale source versions discovered during review.

External-link availability is advisory and runs outside the deterministic exporter.

Warnings never become automatic scientific decisions.

### 13.3 Runtime behavior

- Missing pages render a safe 404 with primary navigation.
- Unavailable source links preserve the citation and show link status without deleting the source record.
- Client-side sort/filter failures leave a readable unsorted comparison table.
- No runtime action can change claims, scores, evidence states, or approval.

## 14. Verification Strategy

### 14.1 Content and schema tests

- valid and invalid record fixtures;
- stable-ID uniqueness;
- relationship integrity;
- claim-locator requirements;
- quantitative denominator and unit checks;
- score range, nullable-unknown, rubric-version, and basis checks;
- AI-label and hypothesis-status invariants;
- rights and publication-allowlist enforcement.

### 14.2 Export tests

- deterministic output from the same approved inputs;
- no files outside the allowlist;
- no private paths, session logs, credentials, or unresolved-rights PDFs;
- generated backlinks, search records, and glossary mappings match source records;
- no derivative text outside its explicit publication right;
- output is produced from a clean temporary directory and failed builds leave no deployable stale output;
- unsafe HTML, URL schemes, paths, slugs, and symlink escapes are rejected;
- Pagefind contains approved rendered pages only;
- GitHub Pages repository-subpath links and assets resolve.

### 14.3 Reader tests

- required routes render;
- navigation and search reach the six methods;
- tooltips and glossary links work by keyboard and pointer;
- criterion sorting handles scores and unknowns correctly;
- evidence-basis filters do not relabel records;
- source links and permitted PDFs open;
- audit drawers preserve internal IDs and dissent;
- JavaScript failure leaves core content readable.

### 14.4 Accessibility and responsive tests

- automated accessibility checks on representative routes;
- keyboard-only walkthrough;
- focus-order and tooltip/drawer checks;
- mobile and desktop viewport checks;
- contrast and non-color status review;
- reduced-motion behavior;
- an RTL smoke fixture before Arabic content is added.

### 14.5 Scientific and publication review

Automated tests do not approve science. A human reviews claims, source locators, score rationales, uncertainty, dissent, AI boundaries, rights, and public exposure before release.

## 15. Migration Strategy

1. Do not move or rename existing workflow, panel, packet, report, or evidence files.
2. Add the publication layer beside the research system.
3. Normalize only the batch-02 cigarette-butt pilot first.
4. Give reader-facing titles to internal concepts while retaining exact audit aliases and links.
5. Use batch-01 reports only as linked audit evidence or source context where approved.
6. Test the model with one second recyclable material before expanding schemas or adding a universal ontology.

## 16. Delivery Phases

Each phase is a separate gated implementation plan and review cycle. The next implementation plan covers Phase 1 only. Later plans may rely on the accepted outputs of earlier phases but do not start automatically.

The scientific-content sequence is mandatory: define the content contract, complete and review all six method families, then generate and review the separate invention using those completed methods and the approved batch-01 record as context. Phase 3 cannot begin until the operator has approved both the six-family landscape and the invention for publication. The invention must not be generated first and then used to shape the method review.

### Phase 1: Content contract

Implement record schemas, evidence states, score rubrics, source-rights handling, publication manifest, validator, and representative fixtures.

### Phase 2: Batch-02 pilot content

Phase 2 has two ordered units:

1. Prepare and review the six method narratives and records, claims, gaps, assessments, source library, glossary, and Egypt annex.
2. After all six method units are complete, generate the separate invention, critique it against the completed landscape and batch-01 findings, preserve its falsifiers and dissent, and obtain explicit operator approval.

Phase 2 is incomplete if either unit is unfinished or unapproved.

### Phase 3: Reader app

Build the page shell, design tokens, navigation, method template, comparison, search, tooltips, source pages, backlinks, and audit drawers.

### Phase 4: Public release

Run the full validation suite, rights/exposure audit, scientific review, accessibility and responsive checks, local preview review, operator approval, and GitHub Pages deployment.

## 17. Acceptance Criteria

The pilot is acceptable when:

1. A non-specialist can identify and explain the six method families after a short guided read.
2. Every factual claim reaches a source locator or is explicitly represented as `source-not-located`, `source-conflicted`, or an `unresolved-question`.
3. Source content, inference, AI gap-closing, and invention content cannot be confused visually or structurally.
4. Methods can be sorted by separate rubric-backed criteria, with unknowns and evidence basis correctly displayed.
5. Every method states missing evidence and the categories of human validation still required.
6. The public bundle contains only allowlisted content and redistribution-cleared local assets.
7. Historical audit IDs, public-safe audit links or approved aliases, dissent, and versions remain reachable without dominating reader navigation.
8. Updating one approved record updates all generated views consistently.
9. Core content remains readable on mobile, by keyboard, and when client-side JavaScript fails.
10. The same foundation can represent a second material without replacing the architecture.
11. The publication record proves that all six method-family reviews were completed before the separate invention was generated and approved, and that the reader app was not populated from an invention-first review.

## 18. Deferred Work

After the pilot is validated with readers, separate design cycles may consider:

- Arabic content and full RTL localization;
- individual accounts or a private deployment mode;
- authenticated moderation and editorial workflows;
- provider-neutral automated research runs executed through systems such as Arena.ai;
- a separate AI reviewer that reads the frozen source, method, invention, gap, and claim package and proposes structured corrections or enhancements;
- a global relationship graph;
- user-adjustable composite scoring;
- a database or CMS if Git-based review becomes a demonstrated bottleneck;
- broader material ontologies and cross-material benchmarking.

Each deferred item requires its own approval and must preserve the evidence and publication boundaries in this design.

Automated research may progress from a material brief through source gathering, claim extraction, method synthesis, gap analysis, invention drafting, and independent AI review. It must always terminate in a review-ready draft package. No current or future agent, scheduler, or provider integration may approve or publish content automatically. Explicit human operator approval remains mandatory for every publication version.
