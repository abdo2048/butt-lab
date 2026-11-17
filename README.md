# Butt Lab

A knowledge base of cigarette-butt recycling methods: what each one does, what the
evidence actually says about it, what is still unknown, and what the AI has proposed on
top. It is written for scientists and engineers who can judge it.

## What is in here

- **Methods** — seven method families and thirty registry entries, each explained on its
  own, with its own mechanism, products, failure modes and open questions.
- **Evidence** — every statement carries its basis: sourced, AI-derived, or a stated gap.
  A number that could not be located is left as `parameter-not-located`, never estimated.
- **New invention** — proposals from the AI acting as scientist-inventor, all of them
  marked as unvalidated hypotheses with their falsifiers attached.
- **Gaps** — the M/R/S agenda of what still has to be measured, and by whom.

**This is not a validated treatment process.** Nothing here has been experimentally
verified, safety-approved, costed, or shown to be novel. The review comes after
publication, from trained human and AI readers.

## Where to start

1. [`PROJECT-OVERVIEW.md`](PROJECT-OVERVIEW.md) — what the project is and where it stands.
2. [`state/workflow.yaml`](state/workflow.yaml) — the authoritative current state.
3. [`charter.md`](charter.md) — the scope and safety rules.

## Layout

| Path | What it is |
|---|---|
| [`charter.md`](charter.md) | Scope, safety, and the AI's role. |
| [`PROJECT-OVERVIEW.md`](PROJECT-OVERVIEW.md) | Human-readable project status. |
| [`state/workflow.yaml`](state/workflow.yaml) | Authoritative current state. |
| [`docs/BUILD-PLAN.md`](docs/BUILD-PLAN.md) | The active build plan and ledger. |
| [`publication/`](publication/) | The approved, validated content layer — 134 records and 10 pages. |
| [`tools/publication-contract/`](tools/publication-contract/) | Schemas, validator and deterministic exporter. |
| [`tools/reader-site/`](tools/reader-site/) | The reader website (Astro + Pagefind) — being built. |
| [`reports/`](reports/) | The batch-01 and batch-02 research records. |
| [`registry/methods.yaml`](registry/methods.yaml) | The method registry (read-only). |
| [`docs/history/`](docs/history/) | Frozen history. Read for provenance; never edited. |
