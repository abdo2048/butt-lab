# Research charter — cigarette-butts (v2, 2026-11-24; supersedes the 2026-11-04 and 2026-11-17 versions)

Goal: a knowledge base of cigarette-butt recycling routes — company methods, patents, academic routes — written as action plans that the team (medicine students) can verify and test in qualified laboratories. The AI builds the knowledge base; humans and AI reviewers judge it after the build (Phase 7 review rounds).

## The gap-filling flip (the core change in v2)

Where sources are silent, the AI fills the gap with a concrete, labeled estimate — numbers, temperatures, ratios, times — with reasoning and a falsifier. Vagueness is a defect, not safety. Safety comes from: (a) mandatory labels, (b) explicit safety notes per step, (c) the rule that desk research authorizes no physical trial. Judgment on every estimate is deferred to review rounds after the project ends.

## Labels (mandatory)

- `source_supported` — stated by a cited primary source (URL/section, units, mass basis)
- `ai_inference` — reasoned from sources; show the chain
- `ai_proposal` — invented or estimated by the AI; testable assumption; needs reasoning + falsifier
- `parameter_not_located` — no number exists at the required basis; say what to measure

Secondhand claims count as `ai_inference` until checked against the primary source. Full-text checking precedes nondisclosure claims.

## Scope

Not patents-only: companies without public patents, papers, theses, reports, product documentation, and documented failures. Separate collectors from processors. "Patent not located in this search" neither proves absence nor a trade secret. Marketing claims stay attributed as company self-report.

## Evidence rules

Exact URLs and sections; units and mass basis; limitations stated. No invented measurements. Arithmetic is computed, not estimated. Unknown is not zero. Conflicting values are both kept, never silently averaged. Yield, purity, detoxification and product quality are different things and are not conflated. No claim of clean/safe/validated/novel/patentable/deployable/costed.

## Safety (unchanged from v1; binds all work)

Desk research authorizes no physical trial. No AI handles material, operates equipment, or enters a laboratory. Contaminated waste, chemicals, pressure, and emissions require qualified facilities, risk assessment, lawful disposal, and a named human actor. No DIY pressure vessels. No clearance based on odor, appearance, or FTIR alone. Metals stop-condition: Cd/Pb/As/Hg uncharacterised means the route is on hold.

## Legal

Cost, solvent use, DIY-ability and legal status do not filter discovery. Publication, legal and commercial decisions come later; one patent's status is not freedom to operate.
