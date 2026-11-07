```yaml
batch: batch-01
stage: 4
round: "01"
slot: JUDGE
packet_version: "v1.0"
packet_commit: "671de7c045385dade4b8f26c7b1680a2cc3a809c"
date: "2026-11-07"
service: "OpenCode"
displayed_model: "gpt-5.6-sol"
exact_model_id: "agentrouter/gpt-5.6-sol"
sources_supplied: true
sources_fetched_by_judge: []
reports_read:
  - "panels/batch-01/stage-4/round-01/worker-a.md"
  - "panels/batch-01/stage-4/round-01/worker-b.md"
  - "panels/batch-01/stage-4/round-01/worker-c.md"
identity_limits: >-
  Worker identities and displayed models are self-reported. Model-family reuse among
  the judge, workers, and packet author is unknown, so this panel does not establish
  model diversity. No Stage-4 report other than worker A, worker B, and worker C was read.
```

# Stage-4 judge report

### 0. Access receipt

Read in full:

- `packets/batch-01/stage-4/question.md`
- `packets/batch-01/stage-4/output-schema.md`
- `packets/batch-01/stage-4/evidence-index.md`
- `packets/batch-01/stage-4/manifest.yaml`
- `packets/batch-01/stage-4/COMMIT.txt`
- `panels/batch-01/stage-4/round-01/worker-a.md`
- `panels/batch-01/stage-4/round-01/worker-b.md`
- `panels/batch-01/stage-4/round-01/worker-c.md`

No `worker-b_<Service>.md` file was present. Packet-local `LAUNCH.md`, the operator
directory, and any other Stage-4 peer or judge output were not read. The judge made no
external fetches.

The packet commit exists in Git. Current `question.md`, `output-schema.md`, and
`evidence-index.md` match the stated payload commit. Current `manifest.yaml` and
`COMMIT.txt` contain a later release-metadata correction that records the payload commit
and corrects a Stage-3 judge hash without changing the hashed payload files. All worker
headers match batch, stage, round, packet version, and packet commit.

Worker B reports a separate line-ending/BOM hash-normalization discrepancy while also
reporting unchanged payload bytes. The judge did not independently reproduce that
normalization test. It remains an unresolved release-metadata issue, not evidence for or
against any chemistry proposal.

### 1. Judge synthesis and recommendation

**Recommendation: REVISE.**

**Strongest individual proposal:** Worker B's B-P-01, the modified F1/F0 route that
first measures whether a segregated initial wash fraction captures a material share of
each analyte, then recycles later washes only with a measured purge. It is strongest not
because F1 is proven clean, cheap, or deployable, but because its central assumption can
be falsified by a stream-by-stream partition ranking before a more complex sink design is
accepted.

**Strongest objection:** B-P-01 may convert the feed problem into a large, dilute,
unroutable liquid while targeting the wrong stream. The dominant analyte burden may remain
in separated tobacco/ash or in the product, and the aqueous route has no demonstrated
mechanism for removing metals from cellulose acetate. Without documented acceptance by a
specific treatment boundary, measured outlet performance, a final lawful route, and a
passed use-specific product gate, it demonstrates neither a complete toxic-fraction sink
nor a usable output.

Workers B and C converge on a measured-purge F1 architecture, but agreement is not
validation. Combining B-P-01's partition-ranking gate with C-P-01's explicit treatment
acceptance and separate sludge/reject boundary creates **J-H-01, a judge-created new
hypothesis**. J-H-01 is the preferred revision target, not an accepted process.

Worker A's F3 route is the strongest minority alternative. F3 has the clearest
polymer-separation logic in the supplied evidence, so it may be the better starting point
if recoverable cellulose-acetate quality controls the decision. It is not selected as
written because contaminant co-precipitation, metals partition, solvent-loop closure,
liquid/residue routing, and product leaching remain unresolved, while Worker A adds
unsupported operating conditions and decision thresholds.

`ACCEPT` is not supported because no proposal completes the four sink fields with
demonstrated analytical performance. `REJECT` is premature because partition ranking can
decisively falsify, simplify, or redirect the F1 hypothesis. `REVISE` preserves that test
while preventing a named stream or external boundary from being misreported as a sink.

Required revisions are:

- Call the initial wash fraction a candidate stream, not a concentrate, until its total
  analyte mass and total liquid burden are measured.
- Perform one common dry-feed-basis, analyte-resolved balance over every product, liquid,
  reject, sludge, captured emission/condensate, purge, treatment outlet, and unexplained
  loss category.
- Define the final treatment/disposal route and its jurisdiction-specific acceptance
  basis; `external treatment` alone is not a final sink.
- Demonstrate inlet-to-outlet analytical performance for the treatment boundary rather
  than inferring it from collection, transfer, a certificate, or a permit name.
- Set a use-specific product gate independently of mass-balance closure. Polymer identity
  or appearance cannot substitute for contaminant, leaching, emission, and performance
  evidence relevant to the intended use.
- Treat metals as an explicit stop condition. If the product fails its defined use gate
  and no measured separation route exists, the proposed product disposition fails.
- Remove unsupported numerical thresholds, fixed sampling counts, method-performance
  values, and hazardous-process operating detail from the proposal.

### 2.1 Proposal table

| ID | Route (family/combination) | Mechanism (one line) | Source basis vs assumptions | Change proposed | Failure modes (severity) | Falsifier | Needed calc/measurement | Equipment/waste implication |
|---|---|---|---|---|---|---|---|---|
| A-P-01 | Modified F3 | Dissolve and re-precipitate cellulose acetate, then add a second separation/wash boundary | F3 dissolution/precipitation is source-supported at family level; contaminant partition, second-stage performance, and lawful routing are assumptions | Adds a second precipitation/wash stage | Co-precipitation or unroutable liquid/residue (`fatal`); polymer-quality loss (`unknown`) | Analyte and polymer balance across feed, precipitate, residues, liquids, captured emissions, and product | Dry-feed-basis analyte fate, solvent balance, molecular-weight/identity checks, use-specific leaching/emission gate | Requires solvent-handling/recovery and regulated residual-stream boundaries; final routes are not demonstrated |
| B-P-01 | Modified F1/F0 | Separate a candidate initial wash fraction, recycle later washes with a measured purge, and rank analyte partition before fixing the sink | F1/F0 separation and washing are source-supported; initial-fraction enrichment, purge sizing, and routing are new assumptions | Adds segregation, purge, and a decision gate | Large dilute effluent or wrong target stream (`fatal`); cellulose-acetate fines loss (`fixable`); metals retained in product (`fatal` for a failed use gate) | Partition ranking across reject, initial wash, later wash, purge, product, and captured losses | Complete analyte fate balance, liquid burden, treatment acceptance/outlet evidence, product gate | Uses aqueous/mechanical equipment classes; creates liquid, reject, possible sludge, and drying-emission obligations |
| B-P-02 | Modified F3 metal-first hypothesis | Test whether a pre-product liquid phase can remove metals before polymer recovery | F3 is source-supported at family level; metal transfer and phase selectivity are unmeasured assumptions | Makes metals partition a design function | Metals remain in product/residue (`fatal`); organics repartition (`unknown`); recovery loop does not close (`fatal`) | Metals and organics balance across all phases and residues | Validated multi-analyte balance, polymer quality, liquid/reagent closure, product gate | Adds corrosive/solvent service and regulated liquids/solids; no final route demonstrated |
| B-P-03 | Modified F5 | Convert the polymer while sizing a measured liquor purge and separately assaying precipitated solids | F5 conversion is supplied at family level; primary full text and treatment performance remain unresolved; purge and precipitate routing are new assumptions | Adds explicit liquor and solids boundaries | Toxicants remain in pulp (`fatal`); liquor or precipitate is unroutable (`fatal`); product quality (`unknown`) | Analyte balance across pulp, liquor, purge, precipitate, outlet, and losses | Primary-source verification, dry-feed mass balance, analyte fate, cellulose/use gate | Requires chemical-service equipment and wastewater/solids handling; final lawful routes are not located |
| C-P-01 | Modified F1 | Mechanical separation and aqueous washing with measured purge, separate sludge/reject, external-treatment acceptance, and a separate product gate | F1 sequence and an external-partner statement are source-supported; purge sufficiency, sludge separation, acceptance, and usability are assumptions | Adds explicit purge, sludge, treatment, and product boundaries | No accepted treatment route, missing purge, or sludge returned to product (`fatal`); metals retained (`fatal` for a failed use gate) | Same-batch fate balance plus documented acceptance and treatment outlet assays | Dry-feed analyte closure, treatment performance, product leaching/emission and material-performance gate | External treatment remains only a boundary until final treatment, disposal, and performance are documented |
| J-H-01 | Judge-created F1 synthesis - **new hypothesis** | First rank analyte partition, then choose the minimum reject/purge boundary, conditionally separate treatment solids, and independently gate product use | Draws on B-P-01 and C-P-01; their combination and every performance claim remain new assumptions | Makes route selection conditional on measured fate rather than assuming a wash sink | Wrong stream selected, dilute unroutable effluent, metals in product, no accepted treatment, or missing emissions (`fatal`); recoverable fines loss (`fixable`) | Predeclared fate balance and documented sink/product gates; failure redirects or rejects the route | Same-batch stream totals, validated assays, uncertainty/LOQ/recovery, treatment inlet/outlet, use-specific product evidence | Keeps initial equipment questions comparatively simple but leaves liquid, solids, emissions, and end-use obligations unresolved |

### 2.2 Per-proposal deep dive

#### A-P-01 - Modified F3

- **Mechanism:** Recover cellulose acetate through dissolution/precipitation and add a
  second separation/wash boundary intended to reduce retained contaminants.
- **Source basis versus assumptions:** `source-supported` only at the F3 family level.
  `Inference`: a separate phase could carry contaminants. `New-assumption`: the added
  stage yields useful selectivity and routable residual streams.
- **Change and blocker addressed:** Adds an explicit post-recovery contaminant-separation
  attempt to Stage 3's otherwise incomplete F3 sink account.
- **Failure modes:** Organic co-precipitation, metals retained in product/residue, or an
  unclosed solvent/liquid/residue system are `fatal`. Polymer degradation or fines loss is
  `unknown` until characterized.
- **Falsifiers:** Measured analyte recovery by stream, product leaching/emission results for
  the intended use, polymer molecular-weight/identity results, and total process-material
  closure. Conductivity, appearance, or polymer identity alone cannot decide removal.
- **Needed calculations/measurements:** The common dry-feed analyte fate balance, complete
  liquid/reagent accounting, product-quality characterization, and an independent use gate.
- **Equipment/waste:** Solvent-compatible separation and recovery equipment classes create
  material permitting and residual-stream obligations. Final treatment and demonstrated
  outlet performance are `parameter-not-located`.

#### B-P-01 - Modified F1/F0

- **Mechanism:** Physically separate obvious rejects, collect a candidate initial wash
  fraction separately, recycle later wash inventory only with a measured purge, and choose
  the sink architecture after analyte partition is known.
- **Source basis versus assumptions:** `Source-supported`: F1/F0 mechanical separation and
  washing. `Inference`: staged collection may distinguish higher- from lower-burden liquid.
  `New-assumption`: the candidate initial fraction is sufficiently enriched and acceptable
  to a final route.
- **Change and blocker addressed:** Adds the purge, stream definition, and measurement gate
  missing from a nominally closed water loop.
- **Failure modes:** A large dilute unroutable liquid, dominant burden in tobacco/ash rather
  than wash, or metals remaining in product are `fatal` for the stated architecture or use.
  Recoverable product loss is potentially `fixable`.
- **Falsifiers:** Same-batch partition ranking and full fate accounting. If reject carries
  the burden, simplify around reject handling. If product carries unacceptable burden or
  treatment rejects the liquid, the route fails unless a different measured separation is
  proposed.
- **Needed calculations/measurements:** Total stream inventories, analyte masses and
  fractions on the common feed basis, uncertainty/LOQ/recovery, treatment acceptance and
  inlet/outlet results, plus the intended-use product gate.
- **Equipment/waste:** Mechanical and aqueous equipment classes avoid assuming the more
  complex chemistry of F3/F5, but this is not a cost result. Liquid, reject, sludge,
  captured drying emissions, and final disposition still require complete accounting.

#### B-P-02 - Modified F3 metal-first hypothesis

- **Mechanism:** Test a separate pre-product phase as a possible metals-removal boundary
  before cellulose-acetate recovery.
- **Source basis versus assumptions:** `Source-supported`: only the F3 recovery family.
  `Inference`: a phase separation may be measurable. `New-assumption`: metals move out of
  product with sufficient selectivity while organics and polymer quality remain manageable.
- **Change and blocker addressed:** Directly addresses the cross-worker finding that metals
  are not solved by a water-wash claim.
- **Failure modes:** Metals retained in product or residue and an unclosed recovery loop are
  `fatal`; organic repartition and polymer-quality change are `unknown`.
- **Falsifiers:** Per-phase metals and organics balance, product gate, polymer quality, and
  complete residual-stream routing.
- **Needed calculations/measurements:** Validated multi-matrix assays, common-basis closure,
  and full material/liquid accounting without an invented selectivity threshold.
- **Equipment/waste:** Adds corrosive/solvent-service and residual-treatment questions.
  No lawful final sink or analytical treatment performance is demonstrated.

#### B-P-03 - Modified F5 liquor-loop hypothesis

- **Mechanism:** Treat converted-cellulose product, process liquor, purge, and precipitated
  solids as separate measured streams rather than treating conversion as detoxification.
- **Source basis versus assumptions:** `Source-supported`: F5 conversion only at the supplied
  family-summary level. `New-assumption`: a purge and separately routed precipitate produce
  a manageable sink. Primary full text remains unresolved.
- **Change and blocker addressed:** Adds explicit liquid and solids boundaries to a route
  that changes polymer identity.
- **Failure modes:** Product retains toxicants, liquor is not treatable, or precipitate has
  no final route (`fatal`); converted-product quality is `unknown`.
- **Falsifiers:** Full fate balance, treatment inlet/outlet performance, and use-specific
  cellulose-product evidence.
- **Needed calculations/measurements:** Primary-source reconstruction, dry-feed mass and
  analyte closure, and separate product and sink gates.
- **Equipment/waste:** Chemical-service and wastewater/solids equipment classes are
  material. Treatment values cited only as retrieval leads cannot become design constants.

#### C-P-01 - Modified F1

- **Mechanism:** Add a measured purge to F1 washing, keep sludge/reject outside product, and
  require documented external-treatment acceptance and a separate product gate.
- **Source basis versus assumptions:** `Source-supported`: F1 sequence and the statement that
  process water goes to an external partner. `Inference`: a purge prevents indefinite
  accumulation. `New-assumption`: the partner accepts the actual stream, separates a
  measurable sludge, and meets applicable outlet requirements.
- **Change and blocker addressed:** Converts an unnamed recycle loop into explicit candidate
  collection and treatment boundaries.
- **Failure modes:** No accepted treatment route, no effective purge, sludge returned to
  product, or failed product criterion is `fatal`.
- **Falsifiers:** Documented acceptance for the characterized stream, inlet/outlet assays,
  sludge and product assays, and complete fate closure.
- **Needed calculations/measurements:** The common fate balance. Sampling replication and
  method-performance requirements must come from method validation and uncertainty needs,
  not Worker C's unsupported fixed examples.
- **Equipment/waste:** External treatment is a boundary, not a demonstrated sink. Sludge,
  outlet, reject, emissions, and final product disposition remain unresolved.

#### J-H-01 - Judge-created F1 synthesis, new hypothesis

- **Mechanism:** Measure where each analyte is before deciding whether the controlling sink
  is separated reject, candidate initial wash, later purge, conditional treatment solids,
  or route rejection. Gate product use independently.
- **Source basis versus assumptions:** It inherits the source-supported F1 mechanical/wash
  sequence. Partition selectivity, purge adequacy, sludge generation, treatment acceptance,
  treatment performance, and product usability are all `new-assumption` or unmeasured.
- **Change and blocker addressed:** Makes sink selection conditional on the accepted Stage-3
  discriminator and prevents a recycle loop from concealing accumulation.
- **Failure modes:** Wrong stream, excessive liquid burden, no accepted final route,
  treatment failure, metals retained in product, or unmeasured emissions are `fatal`.
  Product fines loss may be `fixable` only if recovery does not reintroduce contaminants.
- **Falsifiers:** The measurement and document gates in Sections 2.3 and 2.4. A failed gate
  rejects or redirects the route; it is not averaged away by other evidence.
- **Needed calculations/measurements:** Same-batch dry-feed mass and analyte closure,
  uncertainty and method recovery, treatment inlet/outlet performance, and intended-use
  product criteria.
- **Equipment/waste:** The hypothesis identifies equipment classes and boundaries only. It
  supplies no operating instructions and does not establish permitting, lawfulness, or
  treatment availability.

### 2.3 Answers to Q1-Q5

#### Q1 Starting point

Use F1 as the starting point for **sink-architecture testing**, with B-P-01 as the
strongest individual proposal. Its disclosed mechanical/wash sequence exposes separable
streams without first assuming unresolved polymer-changing chemistry. This is an
evidence-structure choice, not proof of lower cost, lower energy, safety, or deployment
readiness. Keep F3 as the required polymer-recovery comparator because its separation logic
is stronger if product quality is the controlling objective.

#### Q2 Sink design

J-H-01 does not yet possess a demonstrated sink. It names candidate streams and the
evidence required to promote one into a complete sink account. Nicotine, TSNAs, PAHs, and
metals are each `parameter-not-located` by stream. The design must not assume that these
classes share a phase.

Metals are the hardest class on current mechanism evidence. The aqueous F1 proposal has no
demonstrated metals-removal mechanism. Metals must therefore be measured in reject,
liquids, sludge, product, treatment outlet, and unexplained loss. If the product fails its
use-specific criterion, product use is rejected unless a different measured separation
route is proposed and tested.

#### Q3 Measurement plan

- **Feed basis:** Define one bounded feed lot on dry mass. Report wet/dry conversion and
  whole-butt versus filter basis separately. Record separated tobacco/ash and filter masses
  rather than silently changing denominators.
- **Aliquot design:** Use representative, traceable aliquots from the same bounded batch and
  map every analytical result back to the total mass or volume of its parent stream.
  Sampling count must follow method validation, heterogeneity, and uncertainty needs;
  `parameter-not-located` until that design is justified.
- **Panel:** Nicotine, identified TSNAs, representative PAHs, Cd, Pb, As, and Hg, using
  matrix-appropriate validated methods.
- **Streams:** Feed, separated tobacco/ash and other rejects, candidate initial wash, every
  later wash inventory, recycle and purge, product, recovered fines, treatment inlet,
  treatment solids/sludge, treatment outlet, captured off-gas/condensate or other air-control
  stream, and unexplained loss.
- **Calculation:** For each analyte, convert concentration to total analyte mass in each
  complete stream, divide each stream mass by analyte mass in the defined dry-feed lot, and
  report the sum with propagated uncertainty, matrix recovery, blanks, and LOQ treatment.
  Values below quantitation must not be converted to zero without a stated censored-data
  rule.
- **Closure criterion:** No universal numerical threshold is supplied. Interpretability
  depends on uncertainty, recovery, matrix effects, and LOQ. The route cannot pass merely
  because a total is close to nominal closure; the selected sink also needs complete
  four-field accounting, and the product must independently pass its intended-use criteria.
- **Product gate:** Define intended use and relevant material performance, contaminant,
  leaching, and emission endpoints before judging the product. FTIR identity, appearance,
  odour, or a company accounting percentage is not a detoxification or use result.

#### Q4 Adversarial self-screening

The failure version of J-H-01 produces a large liquid stream with little analyte enrichment,
while tobacco/ash or the product retains the dominant burden and metals remain in product.
The external facility either will not accept the characterized stream or has no demonstrated
outlet performance for it. In that case, the proposed wash-and-purge sink fails.

The first response is not to intensify washing. Partition ranking should redirect the sink
to the measured controlling reject, select F3 as a comparator, or reject the proposed
product/route. Any added separation is another new hypothesis with its own full balance and
sink account.

#### Q5 Next desk step

Retrieve and full-text verify the granted `FR3066128B1` document against the Stage-3 F1
reconstruction, focusing on whether it actually discloses segregated wash fractions,
recycle purge, rejects, sludge, external treatment, or a final waste route. This single
primary-source check can distinguish disclosure from panel inference. It cannot establish
analytical performance, lawfulness in a selected jurisdiction, or product usability.

### 2.4 Sink/fate table

Primary revision target: J-H-01, a judge-created new hypothesis.

| Stream | Stream named? | Collection boundary named? | Final treatment/disposal named? | Analytical performance demonstrated? |
|---|---|---|---|---|
| Separated tobacco/ash and other reject | Yes | Physical-separation reject boundary | `parameter-not-located` | No |
| Candidate initial wash fraction | Yes | Segregated collection boundary | `parameter-not-located`; external treatment is not a final route | No |
| Later wash inventory and recycle purge | Yes | Recycle inventory and purge boundary | `parameter-not-located` | No |
| Treatment solids/sludge, if generated | Conditional name | Treatment solids collection boundary | `parameter-not-located` | No |
| Treatment outlet | Yes | Treatment-facility outlet sampling boundary | Lawful discharge/disposal basis `parameter-not-located` | No |
| Captured drying/off-gas condensate or air-control residue, if generated | Conditional name | Capture boundary `parameter-not-located` | `parameter-not-located` | No |
| Cellulose-acetate-rich product | Yes | Defined product-lot boundary | Intended use only after a passed use gate; reject route otherwise `parameter-not-located` | No |
| Unexplained loss | Balance category | Reconciliation boundary | Not a sink; must be investigated | No |

Per-analyte-class fate:

- **Nicotine:** `parameter-not-located` for every stream. Aqueous transfer is a hypothesis,
  not a result.
- **TSNAs + PAHs:** `parameter-not-located` for every stream. Shared fate must not be
  assumed across analytes or matrices.
- **Metals:** `parameter-not-located` for every stream. This is the hardest class for the
  F1 mechanism and an explicit product-gate stop condition.

### 2.5 What the packet gets wrong or overstates

No accepted Stage-3 core finding is rejected. The following residual framing requires
continued restraint:

- A named external treatment partner or collection stream is only a boundary. It is not a
  complete sink without a final route and demonstrated analytical performance
  (`question.md`, accepted findings and sink-accounting rule; `worker-c.md`, C-P-01).
- F3's clearer polymer-separation logic does not establish contaminant removal, product
  purity, detoxification, or usability (`question.md`, accepted findings; `worker-a.md`,
  A-P-01).
- F1 cannot be called cheapest from the packet. Comparable cost, energy, throughput, and
  scale denominators are absent (`question.md`, accepted scale objection; `worker-b.md`,
  Q1 discussion).
- Feed hazardous-waste characterization does not automatically classify every product,
  while a product chemistry panel alone may not answer use-specific ecotoxicity or exposure
  questions. Both sides trigger measurement rather than a verdict (`worker-b.md`, packet
  overstatement discussion).
- Worker A's numerical thresholds and process conditions, and Worker C's fixed sampling and
  illustrative method-performance numbers, are not packet-supported acceptance criteria
  and are not adopted here (`worker-a.md`; `worker-c.md`).
- The manifest/COMMIT normalized-hash wording has an unresolved reproducibility concern
  raised by Worker B. The judge verified Git identity and the documented metadata-only
  follow-up, but not Worker B's line-ending experiment. This concern does not imply payload
  drift and should be resolved separately (`manifest.yaml`; `COMMIT.txt`; `worker-b.md`,
  access receipt).

### 2.6 Confidence and independence statement

High confidence: packet identity, local file access, worker metadata matching, the absence
of an optional service-specific Worker B file, and the fact that no proposal demonstrates
all four sink fields.

Moderate confidence: B-P-01 is the strongest revision target on evidence-structure grounds.
That ranking depends on falsifiability and explicit boundaries, not demonstrated treatment
or product performance.

Low confidence: actual analyte partition, treatment acceptance/performance, product
leaching/emissions, comparative cost/energy, and final route lawfulness. These are
`parameter-not-located` or unmeasured.

The judge independently read the authorized local files and made no external fetches.
Worker source claims were assessed as supplied evidence; failed full-text retrievals,
search excerpts, company statements, and secondary comparisons were not promoted to
verified design constants. No Stage-4 peer or judge report beyond worker A, worker B, and
worker C was read.

This report is hypothesis generation and evidence triage. It is not experimental
validation, novelty or patentability analysis, freedom-to-operate analysis, a safety
finding, a legal waste-classification decision, a permit determination, or proof of a
successful or deployable invention. No experiment is authorized by this report.

### 3. Per-slot assessment

| Slot | Strong contribution | Material concern | Judge disposition |
|---|---|---|---|
| A | Preserves F3 as the strongest polymer-recovery comparator; separates polymer quality from contaminant fate; identifies co-precipitation and recovery-loop closure | Adds unsupported operating details, thresholds, partition predictions, and treatment assumptions; sink table does not cleanly separate collection from final treatment | Preserve as minority alternative; revise before reuse |
| B | Best adversarial sink framing; B-P-01 has the clearest falsifier; explicitly separates source support, inference, and new assumptions; retains product and treatment gates | Candidate concentrate, purge, treatment route, and metals outcome are unproven; some external material remains search-excerpt or secondary; qualitative cost ranking is unsupported | Strongest individual proposal; revise, do not accept |
| C | Makes external-treatment acceptance and sludge/reject separation explicit; keeps product use separate; marks analytical performance as undemonstrated | Manifest/evidence access was incomplete; purge acceptance and sludge separation are assumptions; fixed sampling and analytical examples are unsupported | Incorporate its boundary requirements only as part of new hypothesis J-H-01 |

### 4. Dissent preservation

- Preserve Worker A's minority position that F3 may be superior when recoverable
  cellulose-acetate quality is the controlling objective. The B/C preference for F1 does
  not decide chemistry by vote.
- Preserve the objection that a wash purge may merely move contaminants into a larger,
  dilute liquid and may miss the tobacco/ash reject or product as the controlling burden.
- Preserve the metals objection. None of the proposed routes demonstrates metals removal,
  a metals-compliant product for a specified use, or a complete lawful metals sink.
- Preserve Stage 3's F2 warning: dilution in a composite can lower concentration while
  retaining less-volatile contaminants and transferring volatile material to an unmeasured
  air stream. J-H-01 does not rehabilitate F2.
- Preserve the scale objection. No proposal has compatible energy, reagent, cost, or
  throughput evidence, so this report does not rank deployment readiness.
- Preserve Worker B's distinction between feed classification and product evidence, and
  between chemical fate closure and any additional use-specific ecotoxicity or exposure
  evidence.
- Preserve the hash-normalization concern as a provenance issue requiring a separate local
  reproducibility check. Do not turn it into a chemistry vote or a claim of payload drift.
- Preserve the possibility that every current proposal fails. Stage 4 has no required
  successful-invention count, and operator acceptance remains a separate manual gate.
