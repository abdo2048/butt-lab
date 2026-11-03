# Stage 3 output schema (packet v1.0)

Every worker report must begin with the header below and then follow the body structure. Plain Markdown. No rewriting of the packet; no edits to shared state; no judge content.

## 1. Required header

```yaml
batch: batch-01
stage: 3
round: "01"
slot: A            # your assigned slot only
packet_version: "v1.0"
packet_commit: "<commit recorded in manifest.yaml>"
date: "<YYYY-MM-DD>"
service: "<service/interface used>"
displayed_model: "<model shown, or unknown>"
sources_supplied: true
sources_fetched_by_worker: ["<URLs, or none>"]
identity_limits: "<same-author, hidden-model, fallback, or other limitation you know of>"
```

## 2. Body sections

### 2.1 Claim table (the core)

| ID | Claim (as stated, by whom) | Verdict | Source/section | Failure mode if wrong | Severity | Falsifier / next measurement |
|---|---|---|---|---|---|---|

- IDs: `A-01…` for slot A, `B-01…` for slot B, `C-01…` for slot C.
- Verdict must be one of: `source-supported`, `contradicted-by-source`, `unresolved`, `hypothesis`.
- `source-supported` means the source says it — not that it is true or reproduced.
- Severity must be one of: `fatal`, `fixable`, `unknown`. Explain `fatal` in one sentence.

### 2.2 Per-family verdict (F0…F5)

For each of the six families, at most 6 lines:

```
F<n> — <one-line verdict>
Strongest evidence: <source/section>
Weakest link: <gap ID from the ledger or your own>
Severity: fatal | fixable | unknown
Falsifier: <specific calculation/measurement>
Dissent/uncertainty: <what you are least sure about>
```

### 2.3 Answers to Q1–Q5

Numbered answers, each ≤ 250 words. Q4 must name **one** discriminating measurement for the whole batch, with the calculation or assay design sketched (inputs, comparators, what result would separate families).

### 2.4 Stream/fate table

| Family | Product stream | Concentrate/waste stream(s) | Disclosed sink? | Lawful-disposal question |
|---|---|---|---|---|

### 2.5 What the packet gets wrong or overstates

List any framing you believe is unsupported, with the correction. If none, say none.

### 2.6 Confidence and independence statement

- What you could verify yourself vs what you accepted from the packet.
- Whether your report is independent of the other slots (it must be).
- Any conflict of interest or prior exposure to this project.

## 3. Prohibited content

- Invented numbers, prices, efficiencies, temperatures, detection limits or citations.
- Operating instructions for pressure vessels, distillation, caustic pulping, or hazardous-waste handling.
- Safety certification of any material or product.
- Claims of novelty, freedom to operate, or commercial viability.
- References to peer or judge reports (you did not receive them).

## 4. Length guidance

Aim for 1,200–2,500 words of substance. Tables may exceed that. A rigorous short report beats a padded long one. Preserve dissent explicitly rather than smoothing it into consensus.
