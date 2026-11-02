# Butt Lab — Virtual Research Lab for Cigarette Butt Recycling

An autonomous, multi-agent, file-based research lab. Agents gather, verify,
simulate, and invent recycling methods; you supervise via git diffs.

## Architecture
- Harness: DeepSeek Harness (dsh), connected to OmniRoute (localhost:20128/v1)
- Models: OmniRoute combos — anonymous free pools for harvesting, account
  pools (Cloudflare Workers AI, etc.) for heavy reasoning
- Lab: this git repo. Files are the deliverables. Chat is not.

## Quickstart
1. Start OmniRoute, confirm: curl http://localhost:20128/v1/models
2. In dsh, add Custom Model Provider: id=omniroute,
   baseURL=http://localhost:20128/v1, protocol=openai-completions
3. Copy your two prior AI answers into dossier/prior-hypotheses/
   (leos-answer.md, brave-answer.md) — they are labeled UNVERIFIED
4. Open dsh in this folder. Point each agent (agents/*.md) at its combo.
5. Run phases in order (see state/progress.md). Review git diffs between phases.

## Rules of the lab (read charter.md first)
- Evidence and conclusions are separated. Dossier = facts only.
- No filtering sources by patent expiry or legal status. Record status as data.
- Never delete other agents' work. Append, correct with citations, or mark disputed.
- Every quantitative claim gets a label: [VERIFIED-SOURCE] / [PLAUSIBLE-UNTESTED] /
  [MY-ESTIMATE] / [UNSAFE].

## Folder map
- charter.md — constitution: scope, rules, safety, phases, exit criteria
- dossier/ — verified facts, cautionary evidence, prior hypotheses (unverified)
- registry/methods.yaml — the central artifact: one entry per known method
- specs/ — full process reconstructions per method
- inventions/ — new/hybrid method proposals + red-team verdicts
- reports/ — synthesis, decision matrix, final shortlist
- agents/ — the five agent role prompts
- skills/ — reusable skills: patent mining, multilingual search, simulation,
  claim labeling, home validation
- mcp/setup.md — recommended MCP servers and config
- experiments/ — protocols you run in the real world to validate outputs
- state/progress.md — phase tracker; update after every session
