# Stage-4 output schema — batch-01, round 01, packet v1.0

Save exactly one file: `worker-<slot>.md` (lowercase slot letter a/b/c). Markdown, UTF-8, LF or CRLF consistently.

## 1. Header (YAML fenced block, first thing in the file)

```yaml
batch: batch-01
stage: 4
round: "01"
slot: A            # or B or C
packet_version: "v1.0"
packet_commit: "<this packet's content commit, from COMMIT.txt; record 'pending' only if COMMIT.txt is absent>"
date: "YYYY-MM-DD"
service: "<service name or unknown>"
displayed_model: "<displayed model name or unknown>"
sources_supplied: true|false
sources_fetched_by_worker:
  - "<URL or repo path, or leave empty list>"
identity_limits: "<one paragraph: same-author limits, model-family overlap unknown, prior exposure, none read of Stage-4 peer/judge output>"
```

## 2. Body sections (use these exact headings)

### 0. Access receipt
Which supplied files were read, in full or in part; any failed access; whether hashes were checked (yes/no and result); confirm no peer/judge Stage-4 output was read.

### 2.1 Proposal table
One row per proposal (ID `P-01…`, `P-02…`):

| ID | Route (family/combination) | Mechanism (one line) | Source basis vs assumptions | Change proposed | Failure modes (severity) | Falsifier | Needed calc/measurement | Equipment/waste implication |

### 2.2 Per-proposal deep dive
For each proposal, the seven required fields in full: mechanism; source basis versus assumptions (label each element `source-supported`, `inference`, or `new-assumption`); change proposed and which Stage-3 blocker it addresses; failure modes with severity; falsifiers; needed calculations/measurements (including the fate-balance evaluation and product gate); equipment/waste implications with four-field sink accounting.

### 2.3 Answers to Q1–Q5
Answer each integration sub-question from `question.md` in order.

### 2.4 Sink/fate table
For your primary proposal:

| Stream | Stream named? | Collection boundary named? | Final treatment/disposal named? | Analytical performance demonstrated? |

Plus a per-analyte-class fate line (nicotine / TSNAs+PAHs / metals) with `parameter-not-located` where honest.

### 2.5 What the packet gets wrong or overstates
Any residual Stage-3 framing you could not accept, and why, with citations.

### 2.6 Confidence and independence statement
What you verified yourself versus accepted from the packet; independence statement; explicit disclaimer that this is hypothesis generation, not validation, not novelty, not safety.

## 3. Rules

- Label every number's denominator. Write `parameter-not-located` rather than inventing.
- Do not claim novelty, patentability, safety or successful invention.
- A hybrid you create is a new hypothesis; label it as such.
- Preserve dissent and minority concerns from Stage 3 where relevant.
