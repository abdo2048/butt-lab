# M01 Gate-A feasibility sub-study — specification (proposal)

**Date:** 2026-11-16
**Prepared by:** operator-directed OpenCode session (displayed model MiMo-V2.6-Flash Free; underlying model not verified)
**Status:** **desk research only — an unvalidated proposal. No experiment is authorized, run, or performed by this document.**
**Parent:** `reports/batch-02/evidence-gaps/M01-feed-partition-measurement-plan.md` ("the M01 plan")
**Gap:** M01 (measurement) of `state/workflow.yaml` → `gap_closing.remaining_open_gaps`

---

## 0. What this document is, and what it is not

### What it is

M01's sample-size gate (M01 plan §9) fixes a **procedure** for choosing a sample count, because the
quantities that procedure consumes do not exist yet. This document specifies the first of that
procedure's steps — **Gate A, the feasibility sub-study** — as a written design that a qualified
laboratory could be asked to execute, and that an operator could be asked to authorize.

Its output is a set of **uncertain planning parameters with intervals**. That is all.

### What it is not

- It is **not an authorization**. No physical work is proposed to happen under this document. Any
  laboratory work requires a separate, explicit operator authorization that does not exist, plus the
  facility, waste-stream handling, risk assessment and legal arrangements the operator — not this
  project — must arrange.
- It is **not a protocol to execute**. It is a specification of *what would be measured, on what
  unit, under what controls, and what decision each result would feed*. It contains no operating
  instructions, no sample-preparation recipe, no reagent or instrument settings, and no
  hazardous-processing directions.
- It is **not an answer to M01.** It does not name the controlling fraction for any analyte, does not
  close any sink field, and does not discharge the metals stop-condition.
- It is **not a result.** It contains no measured value, no expected value, and no placeholder that
  could later be mistaken for one.

### The one thing to understand before reading further

A feasibility study characterizes **the measurement system and the material**, not the world. The
danger specific to this study is that the feed itself is the object of interest — so a
"the filter fraction looks dominant" impression can arise from a *method* artefact (fines loss,
carryover, matrix suppression) rather than from a property of cigarette-butt feed. Every probe below
is therefore paired with the control that would expose that artefact, and §10 lists the results that
would falsify the study rather than answer M01.

---

## 1. Why Gate A comes first

M01 asks, for each analyte, which stream carries the burden. M01 plan §2 fixes the estimand:

\[
f_{i,s} \;=\; \frac{m_{i,s}}{m_{i,\mathrm{feed}}}
\]

where \(i\) is an analyte, \(s\) a fraction, \(m_{i,s}\) the analyte mass in fraction \(s\) of one
butt, and \(m_{i,\mathrm{feed}}\) the analyte mass in the same butt's whole-feed reference. The
ranking that decides M01 is by **total analyte mass per feed-analyte mass**, not by concentration —
because the control question is which stream carries the burden, and a concentrated but tiny stream
can carry less mass than a dilute but large one.

To rank \(f_{i,s}\) with a *declared* confidence, three things must exist:

1. a measurement model with a **common denominator** (M01 plan §3: dry-matter basis, independent
   whole-butt reference, explicit residual \(u_i\));
2. an estimate of **how much of the observed variation is between butts** (the signal) versus **how
   much is measurement noise** (the noise) — because the second determines how many butts are needed
   to separate two fractions;
3. knowledge of **how often the analyte falls below the quantitation limit** in each matrix, because
   a censored fraction produces a value that is neither zero nor an estimate.

None of the three exists in the accepted record. M01 plan §9 therefore refuses to state a sample
count, and Gate A exists to produce them.

### What Gate A is allowed to conclude

Gate A may conclude: *"for analyte \(i\) in matrix \(m\), the between-butt SD of \(f_{i,s}\) is
estimated at \( \hat{s}_1 \) with a 95 % interval of \([s_l, s_u]\), estimated from \(k\) butts in
\(m\) lots."* Everything it produces carries that shape — an estimate and an interval, attached to
a design and a method.

### What Gate A may not conclude

Gate A may not conclude which fraction controls any analyte, may not report a partition ranking,
may not report a mass balance as a property of the feed rather than of the method, and may not be
quoted as evidence that any family is safer, cleaner or more viable.

---

## 2. Outputs of Gate A

Exactly six families of planning quantity, each required per analyte (and per matrix where the
matrix matters), each reported as an estimate with an interval:

| # | Planning quantity | Symbol | Feeds |
|---|---|---|---|
| A1 | Between-butt SD of the partition fraction, on the analysis scale | \(s_{\text{butt}}\) | M01 §9 Gate D |
| A2 | Within-butt preparation SD and analytical SD | \(s_{\text{prep}}, s_{\text{anal}}\) | M01 §9 Gate D; M01 §6.1 method fitness |
| A3 | Between-block variance component | \(\sigma^2_{\text{block}}\) | M01 §9 Gate D (design effect / mixed model) |
| A4 | Dry-matter closure and separation recovery, with uncertainties | \(R_{\text{sep}}\), closure residual | M01 §3 measurement model; M01 §6.4 |
| A5 | Frequency of results below the quantitation limit, per matrix and per fraction | \(p_{<\mathrm{QL}}\) | M01 §7 censoring; M01 §6.3 |
| A6 | Observed spread of moisture and of storage interval | spread of \(x_s\), spread of storage interval | M01 §5 nuisance structure |

A1–A3 are variance components and depend on the *analysis scale*. M01 plan §6.2 requires the scale
to be fixed in advance (a log or arcsine scale for a bounded fraction, a raw mass scale for an
unbounded one), because a variance component is meaningless without it. **The choice of scale per
analyte is a decision Gate A must record before data exist** (§5.6).

### The output that is deliberately absent

Gate A does **not** output a sample count for M01. It outputs the inputs to a computation that the
operator and the study team run afterwards (M01 plan §9 Gates B–D). The separation is deliberate:
the person who runs Gate A must not also be the person who picks \(n\), because the feasibility
data would then be invisible to the choice that consumes it.

---

## 3. What Gate A does not close

Gate A does not close, and must not be described as closing:

- **M01 itself.** The ranking of controlling fractions is a Gate-D output.
- **M02–M08.** Stream inventories for washed fractions, composite and off-gas, precipitates and
  mother liquors, pulp and dark liquor, and final articles all remain open.
- **Sink fields 3 and 4** (treatment route with documented acceptance and measured inlet-to-outlet
  performance; a use-specific product gate). M01 addresses the feed side only.
- **R01–R05 and S01–S06.** Jurisdiction, product criteria, standards extrapolation, equipment and
  IP review; energy, water, throughput, treatment cost, product function and system inventory.
- **The metals stop-condition.** Gate A can locate metals; it cannot judge acceptability. A stream
  with uncharacterized heavy-metal content remains a stop condition wherever it occurs.
- **The batch-01 hash-normalization provenance follow-up**, which is an operator-owned records
  matter, not a measurement.

---

## 4. Relationship to the M01 plan

Gate A inherits, without restating, the following from the M01 plan and changes only its endpoint:

| Inherited | Where |
|---|---|
| Measurement model, symbols, units, denominator | M01 §3 |
| Experimental unit = the butt; nesting ladder; pseudoreplication guard | M01 §4 |
| Fraction set (filter, tobacco, paper, ash, fines) | M01 §5 |
| Nuisance factors and their control | M01 §5 |
| Analyte panel and class-specific analytical requirements | M01 §6.1 |
| Variance-components model and nesting | M01 §6.2 |
| Controlling-fraction decision rule, including the two honest negatives | M01 §6.3 |
| Closure checks | M01 §6.4 |
| GUM uncertainty budget discipline | M01 §6.5 |
| Censoring rule (`<QL` is never zero, never LOD/2) | M01 §7 |
| Pre-stated criteria; no post-hoc selection | M01 §9 Gate F |

**What changes:** M01's endpoint is an answer about the feed; Gate A's endpoint is a set of
intervals about the measurement system and the material. M01's analytic target is the controlling
fraction; Gate A's analytic target is the *precision of the estimators*. Every "result" in Gate A
is a planning parameter with an interval and a stated design.

---

## 5. Design

### 5.1 Experimental unit and the levels of replication

**The experimental unit is the butt.** Everything below it is a nested level, not a replicate.

| Level | What it is | What it estimates | Independent? |
|---|---|---|---|
| L0 | Lot (a traceable batch of collected butts) | between-block variance \(\sigma^2_{\text{block}}\) | yes, across lots |
| L1 | **Butt** (within lot) | between-butt SD \(s_{\text{butt}}\) | yes, across butts |
| L2 | Independent preparation of the same butt or fraction | preparation SD \(s_{\text{prep}}\) | yes, if genuinely independent |
| L3 | Injection / read of a prepared extract | analytical SD \(s_{\text{anal}}\) | no — replicate reads |
| L4 | Day / analyst / instrument (crossed) | between-day component of precision | yes, across days |

**Pseudoreplication guard.** A butt measured on three days is **one butt** for the purposes of
between-butt variance. Three injections of one extract are **one preparation** for the purposes of
preparation variance. Treating either as independent replicates inflates the effective sample size
and shrinks the apparent uncertainty — this is the single most common way a study of this shape
manufactures false precision. The analysis model in §7 respects the nesting; the number of tests
performed does not become the sample size.

### 5.2 Blocks and randomization

- **Blocking factor:** feed lot. Butts from one lot share collection site, collection window,
  storage and handling, and are therefore the main nuisance cluster. This is the M01 plan §5
  block structure and it is unchanged.
- **Randomization:** butts are drawn from their lot by a **seeded** random permutation; the seed,
  the software and package versions, and the allocation schedule are recorded before any butt is
  processed (M01 plan §9 Gate F). Order of preparation and order of analysis are separately
  randomized within their permitted structure, so that drift in analyst, instrument or reagent age
  cannot align with lot or with fraction.
- **Crossing:** day, analyst and instrument are **crossed** with butt, not nested in it, because
  the quantity needed is a *between-day precision* figure that must be free of any confounding with
  feed composition. M01 plan §6.1 requires between-day precision to be part of the reported
  precision; a nested design cannot produce it.
- **What is not randomized:** the fraction assigned to a butt is not randomized — it is produced by
  the separation. That is why the separation itself needs its own recovery and artefact controls
  (§6.1, §6.2), rather than relying on randomization to average the problem away.

### 5.3 Minimum structure required for identifiability

These are **structural minimums**, not sample-size recommendations. Each is a requirement for a
variance component to have any degrees of freedom at all; a component estimated from a single
level has no variance estimate.

| Requirement | Why it is structural, not arbitrary |
|---|---|
| ≥ 2 lots | the between-block variance component needs ≥ 1 degree of freedom |
| ≥ 2 days | the between-day precision component needs ≥ 1 degree of freedom |
| ≥ 2 independent preparations per butt (or per butt-fraction) | preparation SD is otherwise indistinguishable from analytical SD |
| ≥ 2 injections per prepared extract | analytical SD is otherwise not separable from preparation SD |
| ≥ 2 butts per lot per analysis day | otherwise day and lot are confounded |

**How many beyond these minimums is Gate D's question, not Gate A's.** Gate A is explicitly
described as *small*: its purpose is to estimate a variance component well enough that Gate D can
compute a defensible \(n\), and the estimate's own uncertainty must then be carried into Gate E as
a range rather than a point. **No count of butts, lots, days, preparations or injections is stated
in this document.** All are `parameter-not-located` pending Gate D.

> **[GAP-CLOSING NOTE — AI, scientist-inventor role]** The number of butts and lots that Gate A
> needs in order to estimate \(s_{\text{butt}}\) and \(\sigma^2_{\text{block}}\) precisely enough
> for the Gate-E sensitivity range to be narrow is `parameter-not-located`. It depends on the
> between-butt variability of feed composition, which only the study itself can produce, and on the
> precision target, which is a Gate B/C decision that must be made by the investigators before the
> feasibility data are examined. A qualified laboratory and the investigators, not this desk plan,
> must set it.

### 5.4 Nuisance factors and their control

The M01 plan §5 nuisance-factor list applies unchanged. Gate A adds the feasibility-specific
controls in the last two rows.

| Nuisance factor | Why it corrupts the estimate | Control in Gate A |
|---|---|---|
| Feed lot | composition, moisture and storage differ systematically | block factor; ≥ 2 lots; lot recorded |
| Collection site and window | geographic and temporal exposure differences | recorded as a lot attribute; not randomized |
| Storage interval before processing | moisture drift, chemical change | **deliberately varied** (see §5.5) so the spread is estimated rather than assumed |
| Moisture content of the butt | drives wet-to-dry conversion and separation behaviour | measured per butt with its own uncertainty; enters the budget |
| Day | reagent age, instrument drift, analyst effect | randomized run order; crossed with butt; recorded |
| Analyst | technique differences in separation and extraction | crossed with butt; recorded |
| Instrument | calibration state, detection performance | crossed with butt; calibration recorded |
| Run order within a day | drift correlates with time | randomized within the day's permitted structure |
| Separation efficiency | fraction masses may not sum to the butt | recovery measured per butt (§6.1) |
| Fines loss | the smallest fraction is also the easiest to lose | fines captured and weighed; aperture pre-specified (§5.5) |
| Carryover between samples | previous sample inflates the next | blanks between samples; carryover probe (§6.6) |
| Matrix interference | tobacco suppresses or enhances a signal relative to cellulose acetate | spike recovery per matrix (§6.3) |
| **Fines aperture** | aperture choice changes what "fines" means | pre-specified, with a pre-specified sensitivity aperture (§5.5) |
| **Analytical availability in each matrix** | a matrix may be unusable for an analyte entirely | recovery and QL determined per matrix, and reported as a matrix-level finding (§6.3, §6.4) |

### 5.5 Pre-specified fraction definitions and the fines aperture

The fraction set is fixed: **filter, tobacco, paper, ash, fines**. Two decisions must be frozen
before any butt is processed, because they change what the numbers mean:

1. **The separation procedure's definition** of each fraction — what "paper" excludes, whether the
   filter is separated from the paper/tab, whether ash includes unburned tobacco particulate, and so
   on. These are definitions, not parameters, and they are written down in advance.
2. **The fines aperture** — the mesh or equivalent cut that defines the fines fraction.

**Sensitivity aperture.** Because an aperture is a choice, a **second, pre-specified aperture** is
also run, and the difference between the two is reported as a **sensitivity analysis**, not as an
error. The two apertures together answer a question Gate A must answer for the main study: *is the
partition stable with respect to how finely we cut, or does the answer depend on the cut?* A
partition that moves when the aperture moves is not yet a partition.

**Storage interval is deliberately varied.** Rather than holding storage constant and hoping the
variation is small, Gate A spans a pre-specified range of storage intervals so that the spread of
moisture and of any storage-related change is **estimated** (A6) rather than assumed. The range is
a laboratory decision and is `parameter-not-located` here.

### 5.6 Analysis scale, fixed in advance

A variance component is meaningless without its scale. The scale is fixed **before** data exist, per
analyte, and recorded:

- for a **bounded** partition fraction, a scale on which the variance is stable (a log or arcsine
  scale) — because a fraction near 0 and the same fraction near 1 have different absolute
  variability, and an untransformed SD would be dominated by whichever fraction sits near 0;
- for an **unbounded** quantity (a mass, a concentration), the raw scale, or the log scale where
  the quantity is a positive ratio across a wide range.

The scale is chosen per analyte because the analytes differ in range by orders of magnitude (nicotine
against Cd). Gate A reports the SD on the chosen scale **and** the back-transformation uncertainty,
because the back-transformation is not symmetric.

---

## 6. The six probes

Each probe states its purpose, what is measured, the class of method required, its quality
controls, the uncertainty treatment, and the Gate-A output it feeds. **No method is specified at
the level of a procedure**: naming a validated method class and stating the performance evidence
the laboratory must supply is the correct desk-level contribution, and anything finer would be
invented content the laboratory must own.

### 6.1 Separation recovery and mass closure

**Purpose.** A1, A2 (via the fraction masses), A4.
**What is measured.** For each butt: the mass of the whole-butt reference, the dry matter of each
recovered fraction, the mass of the recovered fractions, the mass of the fines captured, and the
residual \(u_i\) of the closure (M01 plan §3), each with its uncertainty.

**Why it is here.** If the recovered fractions do not account for the reference butt, then every
\(f_{i,s}\) is computed against a denominator that does not match the numerator's universe, and the
"controlling fraction" is an artefact of what was lost. Recovery is a **measurement of the
separation method**, not of the feed.

**Quality controls.** A whole-butt reference processed alongside the fractions for every butt (the
independent reference of M01 plan §3). Fines capture weighed and recorded, with any fines loss
carried as an explicit residual rather than silently omitted. Process blanks carried through the
separation to test carryover.

**Uncertainty.** The dry-matter determination, the balance readings, the recovery ratio, and the
closure residual each enter the GUM budget with an estimate, a standard uncertainty, a distribution
and degrees of freedom (M01 plan §6.5). Recovery is reported **as a ratio with an interval**, and
the correction applied to a partition fraction carries the recovery's uncertainty with it — an
uncorrected recovery silently biases the fraction, and a corrected one without its uncertainty
understates the error.

**Output.** A4: recovery ratio and closure residual per butt, with intervals; and the quantified
contribution of separation loss to the uncertainty of \(f_{i,s}\).

### 6.2 Dry-matter determination

**Purpose.** A6, and the denominator of every mass in the study.
**What is measured.** The dry-matter fraction \(x_s\) of each fraction, per butt, with the
repeatability and the between-day component of the moisture determination.

**Why it is here.** The entire denominator of M01 rests on wet-to-dry conversion. A moisture method
whose between-day variation is not characterized makes every downstream mass uncertain in a way
that is invisible in the final numbers.

**Quality controls.** Duplicate determinations on a subset spanning the observed moisture range;
drying-agent or oven conditions controlled and recorded; samples weighed, dried and re-weighed
under a documented, stable endpoint condition. A sample set with a known reference material where
one exists.

**Uncertainty.** Repeatability within day, between day, and the endpoint-condition contribution,
estimated separately. The endpoint condition is a *choice* and its contribution is a Type B
component with a stated distribution.

**Output.** A6: the spread of \(x_s\) across butts and fractions, and the moisture-determination
precision, with intervals.

### 6.3 Matrix spike recovery (matrix appropriateness)

**Purpose.** A2, A5, and the matrix-level feasibility finding.
**What is measured.** For each analyte class and each matrix (tobacco, cellulose acetate, paper,
ash, fines), the recovery of a spiked known amount through the full preparation, with its
repeatability and between-day component.

**Why it is here.** M01 plan §6.1 requires matrix-appropriate methods and forbids using one
substrate's calibration for another's measurements. Recovery per matrix is how that requirement
becomes checkable rather than aspirational. A matrix that suppresses or enhances the analyte
systematically will otherwise be read as a difference in the feed.

**Quality controls.** Spikes at more than one level; unspiked matrix replicates alongside each
spiked set to expose native content; a consistent, documented spiking procedure; at least one
spike level carried across days so the between-day component is estimable.

**Uncertainty.** Recovery reported as a percentage with an interval, per matrix and per analyte
class. The **acceptance range is the laboratory's**, taken from its analytical specification; it is
`parameter-not-located` here and this document deliberately does not invent one.

**Output.** A recovery interval per (analyte class, matrix). A matrix whose recovery interval lies
outside the laboratory's own acceptance range is reported as **a matrix in which that analyte is not
quantifiable by this method** — a feasibility finding about the method, not about the feed.

### 6.4 Detection and quantitation limits, per matrix

**Purpose.** A5, and the censoring structure.
**What is measured.** For each analyte and matrix, the detection limit (DL) and quantitation limit
(QL), determined by a **named approach**, plus confirmation of the QL with samples at or near it.

**Why it is here.** The censoring frequency A5 is meaningless without a per-matrix QL, and a QL
without a named approach and a confirmation is not a limit but a number.

**Requirements carried from M01 plan §6.1 and the analytical-method-validation discipline:**

- the approach is **named** (residual SD over slope; SD of blanks; or signal-to-noise on the
  instrument's own noise metric) — a single DL/QL number with no named approach is not accepted;
- the QL is **confirmed** with samples prepared at or near the limit;
- the QL is **at or below the level at which the analyte would matter** — i.e. at or below the mass
  that a difference of the Gate-C SESOI would produce. Since Gate C comes later, this is a Gate-B/D
  cross-check and is recorded as an open dependency, not silently assumed;
- DL and QL are reported **per matrix**, because the same analyte in ash and in cellulose acetate
  does not have the same limits.

**Output.** A5 inputs: DL and QL per (analyte, matrix), each with the named approach and the
confirmation result.

### 6.5 Between-day precision (intermediate precision)

**Purpose.** A2, A3, and the credibility of every recovery figure.
**What is measured.** For each analyte and matrix, the total precision of the full procedure
(preparation plus read) across days, with the within-day component reported **separately** from the
between-day component.

**Why it is here.** Reporting only the within-day figure understates routine performance, sometimes
by an order of magnitude, because the variability lives between days. M01 plan §6.1 requires the
between-day component; §6.5's budget needs it; and a feasibility estimate built on a within-day
figure will produce a Gate-D sample count that is too small.

**Quality controls.** At least two days; the same reference solutions and the same matrix controls
carried across days; the analyst or instrument varied and recorded where the design crosses them.

**Uncertainty.** A variance-components model separating within-day and between-day components,
with the denominator of freedom method stated (a containment or Satterthwaite-type method, named in
advance). The two components are reported separately and never pooled into a single "precision"
number.

**Output.** A2 and A3: repeatability, between-day component, and their intervals.

### 6.6 Carryover, blanks and the order-of-processing probe

**Purpose.** A2, and the control on a failure mode that biases *the smallest* fraction upward.
**What is measured.** Blank responses when a high-concentration sample precedes a low-concentration
or blank sample, and the background level in the process blanks carried through separation and
extraction.

**Why it is here.** Carryover inflates the measured content of whatever follows a concentrated
sample. If the run order is not randomized, carryover attaches systematically to one fraction or
one lot. With a randomized order the effect is unbiased but still inflates the variance component;
the probe makes its size visible instead of hiding it in the residual.

**Quality controls.** Blanks interspersed on a pre-specified frequency within each day's run;
carryover checks at the transitions most likely to carry (a high-content sample followed by a
low-content one); run order randomized so that any residual carryover is not aligned with fraction
or lot.

**Uncertainty.** The carryover magnitude is reported as an upper bound with an interval, and is
carried into the Gate-A variance components as a floor on the achievable analytical precision.

**Output.** A2 floor, and a feasibility finding if the carryover bound is large relative to the
mass levels the study needs to resolve.

---

## 7. Analysis

### 7.1 Pre-specified, in advance

Before any butt is processed, the following are written down and frozen (M01 plan §9 Gate F): the
analysis scale per analyte (§5.6); the variance-components model and its fixed structure; the
denominator-of-freedom method; the censoring rule; the recovery-correction rule; the reference
material and spike scheme; the seed and the allocation schedule; the software and package versions;
and the decision rules of §9.

### 7.2 Model

A nested variance-components model, with the levels of §5.1, is fitted to the partition fractions
and to the recovery and precision data:

- fixed: analyte, matrix (or fraction), storage interval where varied;
- random: lot (block), butt within lot, preparation within butt, day, analyst, instrument — with
  day, analyst and instrument **crossed** with butt, and lot as the block;
- the between-block component \(\sigma^2_{\text{block}}\) is estimated, not assumed absent.

Estimation is by restricted maximum likelihood, with the denominator of freedom method stated in
advance. Where a component is not identifiable from the realized design, it is reported as **not
estimable** rather than as zero.

### 7.3 Simultaneity, not per-test p-values

The planning quantities are estimates, not hypothesis tests, and no significance testing is used to
decide which fraction "wins". Where intervals are constructed for planning purposes, they are
**simultaneous** across the analyte–matrix combinations actually needed, using the multiplicity
procedure fixed in advance (M01 plan §6.2). A per-fraction 95 % interval is not used: with several
analytes and several fractions, unadjusted intervals will overstate separation.

### 7.4 Censoring

Results below the quantitation limit are **censored, not zero and not LOD/2** (M01 plan §7). They
are carried through the analysis by a censored-data method whose form is fixed in advance, and the
censoring frequency per matrix and fraction (A5) is reported alongside every affected estimate so
that a reader can see when an estimate is driven by censoring rather than by measurement.

### 7.5 No post-hoc selection

No variance component, scale, transform, outlier rule, model structure or exclusion decision is
chosen after the data are seen. Any deviation is recorded and labelled as post hoc, with its
consequence for the affected estimate stated.

---

## 8. Uncertainty budget at feasibility scale

The Gate-A budget is a **planning budget**: it exists so that Gate D can be computed with real
inputs, not so that a Gate-A number can be quoted as a result.

Per M01 plan §6.5, every input carries an estimate, a standard uncertainty, the distribution the
uncertainty came from, and its degrees of freedom:

| Input | Type | Source of the uncertainty |
|---|---|---|
| butt reference mass | A | balance repeatability; Type B for the balance specification |
| dry-matter fraction \(x_s\) | A + B | repeatability, between-day component, endpoint-condition contribution |
| fraction mass | A | balance repeatability; recovery loss carried separately |
| separation recovery \(R_{\text{sep}}\) | A | estimated per study; correlated with the fraction masses it corrects |
| analyte concentration \(c\) | A | calibration model uncertainty, recovery correction |
| calibration curve parameters | A or B | curve fit covariance, with the fit's own uncertainty |
| analyte mass \(m_{i,s}\) | derived | propagation through the model above |

**Correlations are carried, not assumed away.** Two are unavoidable: the calibration is shared
across samples analysed in the same curve, and the dry-matter fraction of a butt is shared across
that butt's fractions. Treating either as independent biases the budget.

**Ordering.** Uncertainty is rounded first, then the value, to the same decimal place. The
**magnitude sanity check** applies: every mass produced must be dimensionally consistent with the
feed mass that produced it, and a fraction mass exceeding its parent by more than its uncertainty
is a signal, not a result.

**Output.** A budget whose dominant contributors are identified — because the dominant contributor
tells the laboratory where to spend effort, and tells Gate D which SD actually matters.

---

## 9. Pre-stated decision rules

A feasibility study has no "pass". It has **pre-stated rules** that say what the result means. They
are fixed now, before any data exist.

| # | Rule | Consequence if the condition fails |
|---|---|---|
| R1 | Every analyte in the panel has a **named** DL/QL approach and a **confirmed** QL in each matrix where it is expected to be present | That matrix is **not usable** for that analyte in M01, and M01's scope for that analyte shrinks accordingly. This is reported as a finding, not as a failure of the study. |
| R2 | The separation closure residual is consistent with the declared uncertainty contributions | The separation method is **not fit** for this measurement; the method, not the feed, must be reworked before M01 proceeds |
| R3 | Carryover is bounded below the mass level the study needs to resolve | The run structure or the cleaning procedure must change before M01 proceeds |
| R4 | Each matrix has a recovery interval, and any matrix outside the laboratory's own acceptance range is identified | That matrix is excluded for that analyte, and the exclusion is reported with its reason |
| R5 | The between-day component of precision is **estimable** and reported separately from within-day | If it is not estimable, the precision figure used in Gate D would understate routine performance and Gate D must not proceed |
| R6 | The fines partition is stable with respect to the pre-specified sensitivity aperture | If it is not, the fraction definition is aperture-dependent and must be re-specified before M01 proceeds |
| R7 | The censoring frequency per matrix and fraction is low enough that the estimate is not driven by censoring | If it is not, the analyte–matrix combination is reported as **not quantifiable at the required boundary** — the second honest negative from M01 plan §6.3 — and M01's scope shrinks |

### The honest outcome this study is allowed to produce

**"The measurement system cannot support M01 as currently framed."** That is a legitimate, useful,
and publishable-as-a-finding result of a feasibility study. It is emphatically *not* a failure of the
study, and it is not grounds for quietly lowering the precision target until the numbers fit. If
Gate A returns that answer, the correct next step is to change M01 (the measurement, the matrix, the
panel, the fraction definition) — not the target.

### A rule that is deliberately not in this table

There is **no rule that compares Gate A's intervals against the M01 question.** Whether M01 can
resolve a difference of the Gate-C SESOI is a Gate-D computation, made after Gate B and Gate C are
decided by the investigators. Keeping that out of Gate A prevents the feasibility data from
influencing the target, which is the failure mode that makes a sample size post hoc.

---

## 10. Falsifiers — results that would invalidate this study

Pre-specified. Each of these would mean the Gate-A output cannot be used for its stated purpose.

| # | If this is observed | Then |
|---|---|---|
| F1 | The closure residual exceeds the combined uncertainty of its declared contributions, systematically | The separation method does not account for the feed; **every** \(f_{i,s}\) is suspect, not merely uncertain |
| F2 | The partition changes materially between the two pre-specified apertures | The "fractions" are not stable units of comparison; the definition must be re-specified |
| F3 | A high-to-low transition in the run order shows carryover above the resolution floor | Run order alone is not protecting the estimate; the cleaning procedure and the run structure need redesign |
| F4 | A matrix's recovery interval lies outside the laboratory's acceptance range while the same analyte recovers acceptably in another matrix | Any cross-matrix comparison for that analyte is invalid; single-matrix results for it are not generalisable |
| F5 | Between-day variance dominates between-butt variance for an analyte | The analyte's variation is dominated by the measurement day; the between-butt SD that Gate D would use is mostly noise, and the analyte's rank cannot be resolved at any feasible \(n\) |
| F6 | Censoring exceeds the mass level that a Gate-C difference would produce, for a matrix–analyte pair | That pair is not quantifiable at the required boundary and must be reported as such |
| F7 | The variance components change materially when the analysis scale changes | The scale was not fixed correctly; the results are scale-dependent and must be re-expressed before use |
| F8 | The same butt's replicate preparations disagree by more than the between-butt spread | The measurement noise exceeds the signal; M01 for that analyte is not answerable with this method, at any sample size |

---

## 11. What the laboratory must supply

This desk plan cannot provide these, and their absence is why Gate A is a **proposal** and not a
protocol.

| Item | Why it is the laboratory's |
|---|---|
| An analytical target profile (specification) per analyte and matrix | It supplies the acceptance ranges that R1 and R4 test against. Without it, this plan has no criteria to apply. |
| Validated or verification-characterised methods per analyte class and matrix | Including the between-day precision evidence M01 plan §6.1 requires |
| The separation procedure as a written, documented method | Including the fraction definitions and the aperture |
| The facility, the safety and risk assessment, and the waste-stream arrangements | Contaminated cigarette-butt feed is a regulated waste stream; its handling is a qualified-laboratory matter and an operator decision, not an output of this project |
| The analysts, the instrumentation and the calibration records | And the record of which analyst and which instrument handled which sample |
| The feed lots, traceable to a bounded collection batch | M01 plan §5 requires a traceable lot; the traceable lots do not exist yet |
| The decision on the storage-interval range and the moisture endpoint condition | Both are laboratory decisions and are `parameter-not-located` here |
| The session-level resource and cost estimate | Cannot be produced here: no prices, no throughput, no costed route. `parameter-not-located`. |

---

## 12. Guardrails and boundary

- **Desk research only.** This document authorizes nothing. No experiment has been run, and none is
  proposed to run under this document.
- **No operating instructions.** No sample-preparation recipe, no reagent or instrument settings, no
  separation protocol, no solvent-recovery, distillation, caustic-pulping or pressure-vessel
  direction, no hazardous-waste-processing guidance, no DIY substitution, and no clearance based on
  odour, appearance or FTIR alone.
- **Contaminated waste.** Any physical work with cigarette-butt feed requires qualified facilities,
  risk assessment, appropriate measurements and lawful disposal, and remains subject to a separate
  operator authorization that does not exist.
- **No claims.** Nothing here supports a statement that any family, route or proposal is clean,
  detoxified, safe, commercially validated, environmentally beneficial, novel, patentable,
  deployable or costed.
- **The metals stop-condition remains in force.** Gate A can locate metals; it cannot judge
  acceptability.
- **Prior-art awareness only.** No novelty or patentability search was performed and none is
  claimed. This is a specification for characterizing feed composition and a measurement system, not
  an inventive contribution.
- **Dissent preserved.** The F3 minority position (polymer quality as the controlling objective)
  stands. Gate A measures feed partitioning; it does not adjudicate which family's objective should
  control the programme.
- **No inherited numbers.** No sample count, recovery figure, method-performance value, acceptance
  limit, LOQ, or threshold is carried over from the batch-01 worker reports; the accepted record
  forbids it, and this document states none.
- **Publication boundary.** Any Gate-A output that later becomes public would have to enter the
  publication manifest with an explicit `publication state: approved`, and would carry a validation
  state of `requires-human-validation` until a human accepts it. Desk-research completion is not
  experimental validation, and this document creates no pathway that treats it as such.

---

## 13. Limitations of this document

1. **Single-AI execution, no independent review.** This specification was written by one AI
   agent without a three-model panel and without a judge packet. The batch-01 stages had
   independent review and preserved dissent; this does not. An independent reviewer should
   specifically check that **R1–R7 and F1–F8 can actually fire** — that the honest-negative paths
   are reachable and are not vacuously satisfied by a well-behaved dataset.
2. **No retrieval was performed for this document.** The content is derived from the accepted
   batch-01 record, the gap-closing evidence, the Batch-02 deliverables, and the M01 plan. No new
   primary source was read. Nothing here should be represented as newly sourced.
3. **The measurement system is the object of study, and it is also the source of the answer.** This
   is the deepest risk in the design: the same procedure that produces the planning quantities also
   produces the future M01 result. §6 and §10 exist to keep that loop visible rather than to
   eliminate it.
4. **The feasibility estimates inherit the feasibility study's own imprecision.** A variance
   component estimated from the minimum structural design has a wide interval. Gate E exists
   precisely so that this imprecision becomes a **range of required \(n\)** rather than a hidden
   optimism in a single number.
5. **M01 remains open.** A specification for a study that has not been authorized, funded, or run
   is not progress on the measurement gap itself. It is preparation.

---

## 14. Method provenance

The design discipline used here, and where each rule comes from:

| Rule applied | Source |
|---|---|
| Blocking on feed lot; randomizing order; crossing day/analyst/instrument with the experimental unit; seeded schedules | Standard experimental-design practice (Fisher; Montgomery; Lazic for laboratory biology) |
| The experimental unit is the butt; nested levels are not replicates; pseudoreplication is the fatal error | Hurlbert 1984; standard mixed-model practice |
| Pre-stating acceptance criteria; reporting the between-day component; DL/QL with a named approach and confirmation; not using \(r^2\) as evidence of linearity | ICH Q2(R2) structure and ICH Q14 for the analytical target profile |
| Every uncertainty input carries an estimate, standard uncertainty, distribution and degrees of freedom; correlations carried; uncertainty rounded before the value; magnitude sanity check | JCGM 100:2008 (GUM) and JCGM 101:2008 (Monte Carlo supplement) |
| No invented effect size; a SESOI or a sensitivity range rather than a single \(n\); multiplicity handled explicitly | Standard sample-size justification practice (Lakens 2022; Arnold et al. 2011 for simulation-based approaches) |

These are methodological sources, not evidence about cigarette-butt recycling. The reader should
consult the authoritative copies. Nothing in this section supplies a number for this study.

**Skills used and the reference they require.** This specification was prepared with the
`experimental-design`, `statistical-power`, `analytical-method-validation` and
`uncertainty-and-units` skills. As those skills require, the reference is given here and repeated
to the operator:

> Kassis, T., Agarwal, V., He, Y., Patel, D., & Brueckner, A. M. (2026). Scientific Agent Skills:
> A Library of Procedural Knowledge for Research Agents. arXiv:2609.00065.
> https://doi.org/10.48550/arXiv.2609.00065

---

## 15. Related records

- `reports/batch-02/evidence-gaps/M01-feed-partition-measurement-plan.md` — the parent plan; §9 is
  the gate this document specifies.
- `reports/batch-02/evidence-gaps/README.md` — the series index and the may-do / may-not-do
  boundary.
- `reports/batch-02/HANDOFF-BRIEF.md` — the cold-readable handoff; §4 (central finding), §6 (gap
  agenda), §8 (evidence discipline), §10 (may-do / may-not-do).
- `reports/final/validation-and-open-questions.md` — the accepted evidence envelope, the M01 row,
  the partition-ranking measurement, and the prohibition on carrying over worker sampling counts and
  illustrative method-performance values.
- `reports/batch-02/invention.md` — the four-field sink requirement and the metals stop-condition.
- `state/workflow.yaml` — `gap_closing.remaining_open_gaps` (the M/R/S agenda) and
  `evidence_gap_continuation` (this continuation's record).
- `docs/superpowers/specs/2026-11-13-butt-lab-reader-platform-design.md` — the approved reader
  platform design. It is a **presentation layer** over approved records: it does not run the
  research workflow, does not execute experiments, and does not become a second scientific source
  of truth. It also defines the vocabulary this continuation inherits — publication state
  (`draft` / `approved` / `excluded`), validation state (`desk-research-only` /
  `requires-human-validation` / `new-unvalidated-hypothesis` / `not-applicable`), and the rule that
  missing or unmeasured evidence is `unknown` and never a zero. This document and the M01 plan are
  `desk-research-only`. A measured M01 result would be `requires-human-validation` until a human
  accepts it, and could reach the reader only through an explicitly approved publication
  manifest entry — a separate decision, separately gated.

> **[GAP-CLOSING NOTE — AI, scientist-inventor role]** The analytical target profile, the
> matrix-specific recovery and detection-limit evidence, the separation-recovery data and the
> between-day precision figures that Gate A is designed to produce are all `parameter-not-located`
> in the accepted record. They are the product of a qualified laboratory working to a specification
> that does not yet exist in any authorized form. Until a laboratory specification is written, a
> facility is qualified, waste-stream handling is lawful, and an operator authorizes the work, the
> M01 sample-size gate stays open and no defensible number of butts, lots or analyses can be
> stated for it.

---

## 16. Summary

Gate A is specified as follows: the **butt** is the experimental unit; **feed lot** is the block;
**day, analyst and instrument are crossed** with butt so that between-day precision is estimable
and unconfounded; the **fractions** are pre-specified with a pre-specified sensitivity aperture;
the **storage interval is deliberately varied** so that moisture and storage spread are estimated
rather than assumed; the **analysis scale** is fixed per analyte before data exist; and six probes —
separation recovery and closure, dry-matter determination, matrix spike recovery, per-matrix
detection and quantitation limits, between-day precision, and carryover — produce six families of
planning quantity, each as an estimate with an interval.

**No sample count, recovery figure, acceptance limit, detection limit, threshold or expected value
is stated in this document.** All are `parameter-not-located`, and the six-gate procedure in M01
plan §9 will produce the count once Gate A's outputs and the investigators' Gate B/C decisions
exist.

**Nothing here has been measured.** This is a specification for a study that would need separate
authorization. The M01 gap remains open, and the honest statement of where it stands is: *the
question is now precisely specified; the answer does not exist.*
