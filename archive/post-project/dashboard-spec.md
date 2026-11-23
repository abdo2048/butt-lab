# Deferred final research dashboard / website

Task: P01. Added 2026-11-04 at the user's request. Status: planned, not implemented. Run only after Stage 5 desk_complete and operator authorization. No website, deployment workflow or publishing was created by this note.

## Goal
A simple, visually clear, mobile-friendly reading dashboard for final results AND the supporting project reports. Help a non-specialist understand what was found, compare methods, trace sources, distinguish hypotheses from measured evidence, and find unresolved questions. The scientific Markdown/YAML remains canonical; the site is a generated presentation, not a second editable truth.

## Preferred starting point: Quartz + GitHub Pages
Quartz is a reasonable default for linked Markdown reports: search, navigation/TOC, backlinks, citations, Mermaid, math and light/dark reading are documented. GitHub Pages deployment is documented. A polished dashboard landing page, evidence badges and comparison filters may require custom layout/components or build-time generated pages; do not assume stock Quartz automatically visualizes this repository's YAML.

At implementation re-check current docs, select/pin an appropriate Quartz release and dependency lockfiles, and verify runtime/plugin requirements instead of copying old-version tutorials. Current docs inspected describe Quartz 5. Prefer a small isolated site directory or separate publishing repo; decide placement then without replacing the research repo with a Quartz template.

## Minimum reader experience
- Overview: plain-language final takeaway, candidate cards, five-stage history, limitations and links to evidence.
- Methods and companies: readable dossiers, mechanism/source type, product/waste streams, diagrams and a comparison table. No unsupported scores or invented charts.
- Evidence trail: exact source links/sections, inherited versus corrected versions, reviewer disagreements, hypotheses, actual calculations and any real measurements clearly separated.
- Reports: search, clear navigation, per-page TOC, mobile typography, light/dark mode and useful tables. Graph view is optional, not the main navigation.
- Open questions and validation agenda: explain what is still unproven. A desk-complete stage badge must not imply a safe validated product.
- Preserve Arabic/mixed-language text if present; test direction/RTL, fonts, search and narrow-screen tables. Translation is optional, not automatic modification of technical findings.

## Export and publication safety
Build from an explicit approved path allowlist or publish flag, not a blanket mirror of the repository. Include approved final reports, useful specs/dossiers/reviews and source metadata. Exclude secrets, private correspondence, raw session logs, credentials, irrelevant debugging artifacts and content whose publication rights are unresolved. Keep archive versions distinguishable.

Normalize internal links/frontmatter in the export layer; retain original source paths, versions and commit provenance. Where private-repo source links would fail for readers, provide an approved public citation/summary rather than a broken link or access token. Convert any interface-specific citation tokens into genuine source links before publishing.

Verify repository visibility, GitHub plan/Pages eligibility and intended audience. Do not treat the source repo's privacy, Quartz page filters or a client-only password as authorization/access-control guarantees. GitHub Pages is static hosting; do not add client-exposed API keys or pretend it runs agents/server jobs. Public deployment needs an explicit operator decision; local/private preview is not permission to publish.

## Build and acceptance plan (later, not now)
1. Audit final artifacts and agree the publication allowlist/audience.
2. Produce a sitemap and one lightweight home/report-page preview.
3. Build a reproducible export, pinned Quartz site, generated navigation/comparison metadata and optional components.
4. Test build, source fidelity, links/search, missing assets, mobile/accessibility and any Arabic/RTL content. Test the repository-site base path for GitHub Pages.
5. Review scientific labels, privacy, source attribution and whether the site could be mistaken for a tested operating procedure.
6. Obtain approval, then configure/deploy via GitHub Actions/Pages and verify the actual URL. Document updates/rollback. No installation/deployment in the ongoing research stages.

Success: reports are easier to read, provenance/uncertainty remains visible, no confidential material leaks, no backend/paid AI is needed for reading, and rebuilding does not alter canonical evidence. If Quartz needs disproportionate customization, document a simpler static alternative for approval rather than forcing a framework.

## Sources inspected
- https://github.com/jackyzha0/quartz
- https://quartz.jzhao.xyz/
- https://quartz.jzhao.xyz/features/
- https://quartz.jzhao.xyz/hosting
- https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages
