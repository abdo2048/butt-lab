# M01 — Same-feed analyte-mass partitioning: measurement-plan proposal (unvalidated)

**Date:** 2026-11-16
**Prepared by:** operator-directed OpenCode session (displayed model MiniMax M3.1 Flash Free; underlying model not verified)
**Status:** **Desk proposal only. No experiment is authorized, run, or performed.** No sample was collected, no material was handled, no measurement was made, no number in this document is a result. This document specifies what a qualified laboratory would have to do, what it would have to demonstrate, and what must be decided *before* any of it could begin.
**Gap addressed:** **M01** of the accepted batch-01 measurement agenda.
**Authority:** `state/workflow.yaml` (`batch_02:` block, `gap_closing.remaining_open_gaps`, `permissions`) → `reports/batch-02/HANDOFF-BRIEF.md` → `reports/final/validation-and-open-questions.md`.
**Companion record:** `reports/batch-02/evidence-gaps/README.md` (index of the gap-continuation series).

---

## 0. What this document is, and what it is not

**It is** a written specification of a measurement, written *before* any data exist, so that the
measurement would be interpretable if it were ever run. It defines the question, the measurement
model, the experimental unit, the blocking and randomization, the analyte panel, the analytical
quality controls, the uncertainty treatment, the decision rule for the "controlling fraction", the
sample-size decision gate, and the falsifiers.

**It is not** a protocol to execute, and it is not a claim that M01 is nearly closed. Specifically:

- **No experiment is authorized.** `permissions.experiments: not authorized`;
  `batch_02.no_experiment_authorized: true`. Running this requires a *separate* operator
  authorization that does not exist, plus a qualified laboratory, plus a risk assessment and lawful
  disposal route for contaminated waste.
- **No operating instructions.** Consistent with the accepted evidence envelope, this plan gives no
  pressure-vessel, solvent-recovery/distillation, caustic-pulping or hazardous-waste-processing
  instructions, no sample-preparation recipe, no temperature, time, aperture or reagent quantity
  beyond what the accepted record already fixes, and no DIY directions of any kind.
- **No acceptance criteria are selected and no sample count is fixed.** Every such number is
  `parameter-not-located` pending a qualified-lab feasibility study and a defensible
  power/precision justification. Section 9 specifies the *procedure* that produces those numbers;
  it does not produce them.
- **No results, no rankings, no winners.** The "controlling fraction" is unknown for every analyte
  and may remain unknown after the measurement. Section 6.3 makes that an explicit, legitimate
  outcome rather than a failure.
- **No claim that any family is clean, safe, validated, commercially proven, novel, patentable,
  deployable or costed.** Nothing here bears on those questions.

> **[GAP-CLOSING NOTE — AI, scientist-inventor role]** No prior measurement of same-feed
> analyte-mass partitioning across whole butts and separated filter/tobacco/paper/ash/fines was
> located in the accepted batch-01 record, the gap-closing evidence, the registry, or the Stage-2
> source reconstructions. The M01 row is therefore still open at the required basis and boundary.
> A qualified laboratory holding cigarette-butt feed and the appropriate analytical capability is
> the party that could close it; this project can only specify what it would have to show.

---

## 1. Why M01 is first, and what it unblocks

M01 is the first row of the accepted measurement-gap table:

> | Boundary | Missing analyte–stream information |
> |---|---|
> | Whole feed versus separated filter/tobacco/paper/ash/fines | Nicotine, each TSNA/PAH and each metal mass by fraction on the same dry-feed basis; the controlling fraction remains unknown |

*(verbatim, `reports/final/validation-and-open-questions.md`, "Measurement gaps: analyte–stream
pairs")*

Three things depend on it.

1. **Every downstream family comparison has an unknown denominator.** F0 wash fractions, F1
   mechanical separation, F3 dissolution, F5 pulping and the product routes all need analyte mass
   on a common dry-feed basis. Until the whole-feed reference and the fraction split are measured
   on that basis, no family comparison is interpretable — not because the families disagree, but
   because they are not yet expressed in comparable units.
2. **It is the precondition for the J-H-01 decisive measurement.** The accepted record makes the
   single most decisive measurement for the primary revision target the *same-feed analyte-mass
   partition ranking* across tobacco/ash/reject, candidate initial wash, later wash/purge and
   CA-rich product, ranking **total analyte mass per feed-analyte mass, not concentration alone**.
   M01 supplies the feed-side half of that ranking: where the burden sits in the *unprocessed* butt.
   Without it, J-H-01's reject/purge boundary cannot be chosen on evidence.
3. **It is where the metals stop-condition is first located.** The stop-condition is in force: a
   stream with uncharacterized heavy-metal content cannot be routed to a product or to unclassified
   waste. M01 does not decide acceptability; it decides *which stream* would have to be characterized
   and routed, and therefore where the stop-condition bites.

M01 also carries a decision consequence already accepted in the record: if the burden-bearing
fraction turns out to be tobacco/ash rather than the cellulose-acetate filter, that **redirects**
which family architecture deserves attention — it does not refute any family, and it is not a
negative result for the project as a whole.

---

## 2. Question, estimand, and the decision it feeds

**Question.** For a defined, bounded butt feed, how is the total mass of each analyte in the
accepted panel distributed between the whole butt and its separated fractions, expressed on one
common dry-feed basis?

**Estimand.** For analyte *i* and fraction *s*, the fraction of feed analyte mass residing in
fraction *s*:

\[
f_{i,s} = \frac{m_{i,s}}{m_{i,\mathrm{feed}}}
\]

where \(m_{i,s}\) is the total analyte mass in fraction *s* (mg) and \(m_{i,\mathrm{feed}}\) is the
total analyte mass in the whole-butt reference (mg). This is the accepted synthesis accounting
convention from `reports/final/validation-and-open-questions.md`, used here unchanged.

**Primary response.** The **ranking** of fractions by \(f_{i,s}\), per analyte, with the uncertainty
attached (Section 6.3). Concentration alone is *not* the response: a fraction can hold the highest
concentration of an analyte while holding a negligible share of its total mass, and reporting
concentration would invert the engineering conclusion.

**Decision it feeds.** Which stream is named the *burden-bearing* (controlling) fraction for each
analyte, and therefore:

- where a reject, purge or upgrade boundary would have to be placed for a separation process;
- which fraction must be analysed to characterise a product stream;
- where the metals stop-condition applies; and
- what the feed-side input to a dry-mass balance (sink field 1) and an analyte-resolved fate
  balance (sink field 2) is.

**Secondary response.** The dry-matter and analyte closure across the fraction set, which is a
quality-control outcome of the measurement itself (Section 6.4), not a scientific finding.

---

## 3. Measurement model

Written explicitly before any computation, per the GUM working method. Every quantity below is
defined with its unit and its basis; no quantity is interchangeable with a same-named quantity on a
different basis.

### 3.1 Quantities and units

| Symbol | Quantity | Unit | Note |
|---|---|---|---|
| \(M_s^{\mathrm{wet}}\) | received wet mass of fraction *s* | kg | as weighed at receipt, before any drying |
| \(x_s\) | dry-matter fraction of *s* | – (dimensionless) | measured on a representative subsample |
| \(M_s^{\mathrm{dry}}\) | dry mass of fraction *s* | kg | \(= M_s^{\mathrm{wet}} \cdot x_s\) |
| \(c_{i,s}\) | concentration of analyte *i* in the dry matrix of *s* | mg/kg dry | matrix-matched |
| \(m_{i,s}\) | analyte *i* mass in fraction *s* | mg | \(= c_{i,s} \cdot M_s^{\mathrm{dry}}\) |
| \(m_{i,\mathrm{feed}}\) | analyte *i* mass in the whole-butt reference | mg | \(= c_{i,\mathrm{feed}} \cdot M_{\mathrm{feed}}^{\mathrm{dry}}\) |
| \(u_i\) | unresolved residual for analyte *i* | mg | \(= m_{i,\mathrm{feed}} - \sum_s m_{i,s}\) |
| \(R_s\) | separation recovery of fraction *s* | – | dry mass recovered / dry mass presented |

All masses are reported on a **dry** basis for any comparison that involves a fraction, and the
**received wet** basis is reported alongside it and never substituted for it. Whole-butt and
filter-only bases are reported as two distinct quantities and never silently interchanged.

### 3.2 Why the feed is measured independently

The whole-butt reference is **not** defined as the sum of the fractions. It is determined from a
separate, independently sampled whole-butt portion, so that

\[
u_i = m_{i,\mathrm{feed}} - \sum_s m_{i,s}
\]

is a genuine closure check rather than an identity. A closure that is satisfied by construction
proves nothing. If the fraction set is incomplete, or if separation loses material, or if the
analytical recovery differs between matrices, \(u_i\) becomes non-zero and stays visible.

### 3.3 What the residual means and does not mean

Following the accepted record: **if a parent analyte disappears, unexplained disappearance is not
automatically detoxification or destruction.** M01 performs no chemical transformation, so the
expected causes of \(u_i\) are physical (separation and sampling loss), analytical (recovery bias,
censoring) and moisture-basis error — not destruction. Any residual is attributed to a *named*
candidate cause, with the residual itself reported regardless.

### 3.4 Units discipline

Units are attached at every input and stripped only at the point of presentation. Dry-matter
fraction \(x_s\) is a ratio of two masses measured on the same basis and carries no unit. All
concentrations are mg/kg dry. Any report that mixes received-wet and dry bases without labelling
which is which is a reporting defect, not a rounding issue.

---

## 4. Experimental unit and replication structure

**The experimental unit is the butt.** Not the fraction, not the aliquot, not the analytical
injection.

| Level | What it is | What replication at this level buys |
|---|---|---|
| **Butt** (experimental unit) | one whole cigarette butt from a defined lot | between-butt variability in feed composition; this is the unit of replication |
| Fraction (within butt) | filter, tobacco, paper, ash, fines | sub-sampling; **not** replication |
| Preparation (within fraction) | independent extraction from the fraction's homogenate | within-butt preparation repeatability; **not** replication |
| Injection / determination (within preparation) | one analytical run | analytical repeatability; **not** replication |

Treating fractions, preparations or injections as replicates of the feed is the classic
pseudoreplication error: it multiplies an apparent sample size without adding a single independent
observation of the quantity that varies (between-butt composition). The analysis model must respect
the nesting — see Section 6.2.

**Pseudoreplication guard, stated for the record.** The effective number of independent
observations of feed composition is the number of butts, reduced by the block structure (Section
5). Reporting an *n* that counts fractions or injections is a standing audit finding and must be
caught before the analysis plan is written.

---

## 5. Design: blocks, nuisance factors, randomization

### 5.1 Structure

A **randomized complete block design**, blocked on the feed lot, with butts randomly drawn within
each block and each butt measured on the full panel across all resolved fractions.

- **Block = a bounded, traceable feed lot** from one collection site and collection period. The
  accepted envelope already requires a bounded, traceable feed lot; the block *is* that lot, and
  lot identity is the primary blocking factor.
- **Within each block**, butts are drawn at random (seeded, Section 5.4).
- **Fractions are not assigned to butts.** Every butt contributes all resolved fractions. There is
  no treatment comparison in this design; it is an estimation design, and the analysis is
  accordingly a variance-components estimation with simultaneous intervals rather than a
  hypothesis test per analyte.

### 5.2 Nuisance factors and how each is handled

| Nuisance factor | Handling | Why it matters here |
|---|---|---|
| Feed lot (brand, packaging, geography, period) | **Blocked.** Lot is the block; the between-lot variance component is estimated, not ignored. | Cigarette design and collection practice vary by lot; an unbalanced lot effect would masquerade as between-butt variability. |
| Collection site / geography | **Blocked**, nested within lot where a lot spans one site. | Local litter differs in ash and moisture content. |
| Storage interval between collection and processing | **Recorded as a covariate**; blocks stratified by storage-duration band where the spread is wide enough to warrant it. | Moisture loss and oxidation change both dry-matter and analyte content; it is confounded with collection period if unrecorded. |
| Moisture (wet vs dry basis) | **Measured per butt**, not assumed. Dry-matter determination on every fraction and on every whole-butt reference. | This is the single largest source of basis error and the most common silent denominator switch. |
| Analytical day, analyst, instrument, batch | **Crossed with butt**, not nested. Each butt's fraction set is split across at least two analytical days; each analytical batch contains butts from multiple blocks. | Prevents "batch effects mistaken for biology". A design in which every butt of block A is analysed on Monday and every butt of block B on Tuesday confounds lot with day. |
| Within-batch drift (reagent ageing, instrument response) | **Randomized run order** within batch, plus continuing calibration verification and a fixed-position QC scheme. | Aligned ordering lets drift masquerade as composition. |
| Fraction separation efficiency (transfer loss) | **Measured**, per fraction, as recovery \(R_s\) against pre-separation weighed material; reported as a result, not assumed. | Loss in the filter fraction biases the ranking toward whichever fraction is handled worst. |
| Fines loss (particles escaping the separation) | **Measured** as part of \(R_s\) and as dry-matter closure; the aperture boundary is pre-specified with a sensitivity variant. | Fines are a plausible burden-bearing fraction. If fines are simply lost, the ranking silently changes. |
| Cross-contamination / carryover between fractions | **Procedural blanks** within every batch; randomized processing order; carryover check via a designated blank placement after the highest expected load. | Carryover moves analyte mass from a heavy fraction into a light one, which directly corrupts the ranking. |
| Matrix interference from the tobacco/plant matrix | **Matrix-matched calibration**; specificity demonstrated per matrix type; recovery characterised per matrix. | The panel is applied to tobacco, cellulose acetate, paper, ash and fines matrices that differ greatly. |
| "Fines" particle-size definition | **Pre-specified aperture** as a stated parameter, plus a **sensitivity aperture** analysed as a pre-planned variant. | The particle-size boundary is a definitional choice that can move mass between "ash" and "fines". Choosing it after seeing the data would be an outcome-dependent choice. |

### 5.3 Fraction set and pre-specification

The fraction set is pre-specified as: **whole-butt reference, filter (cellulose acetate),
tobacco, paper, ash, fines.** Each member of the set must have a written, pre-stated definition
(material boundary, aperture, handling) recorded before data exist. If the laboratory's procedure
produces an additional fraction (e.g. a coarse particulate distinct from fines), it is recorded and
reported as a named additional fraction rather than being folded into a neighbour — folding it in
after seeing results would be an outcome-dependent choice of the same kind.

### 5.4 Randomization and reproducibility

- Random draws of butts within block and the random run order within analytical batch are
  generated with a **recorded seed**, using a named software version. The seed, the software, and
  the version are recorded in the study record; a seed alone does not promise identical output
  across package or script upgrades.
- The allocation schedule is generated in advance, and the analysis plan is fixed **before** the
  first sample is processed (Section 9, Gate E).
- Access to the seed and to the not-yet-processed sample list is restricted to the analyst running
  the work for the duration of the run.

---

## 6. Estimation, uncertainty and the decision rule

### 6.1 Analytical method requirements (per analyte class)

The project does not validate any method; the qualified laboratory does. What the project must be
able to *examine* before accepting method performance as evidence is stated here, because the
accepted record requires matrix-appropriate methods with justified sampling, blanks, recovery,
uncertainty and detection/quantitation reporting.

The governing framework for the quantitative organic determinations is a validation framework of
the type **ICH Q2(R2)** as implemented in the laboratory's accreditation system, with the
laboratory's own specification supplying the acceptance criteria. This matters in one specific way:
**ICH Q2(R2) deliberately supplies almost no numeric acceptance criteria.** They must come from
the specification or the analytical target profile. In the absence of a written specification for
these analytes in these matrices, every acceptance limit is `parameter-not-located` and is a
decision the laboratory must make and document **before** data are seen — not a number this
project may choose after seeing data.

| Analyte class | Typical method family (lab's choice) | Principal matrix risk | Characteristics the project must see evidenced |
|---|---|---|---|
| Nicotine, TSNAs (incl. NNN/NNK where appropriate) | GC-MS/MS or LC-MS/MS | plant matrix; isobaric interference | specificity, response with lack-of-fit assessment, range, accuracy (spike recovery per matrix), repeatability, intermediate precision incl. between-day, DL/QL with named approach and confirmation, robustness |
| Representative PAHs | GC-MS or LC-MS | soot/ash particulate matrix | as above, plus matrix-matched calibration in particulate matrices |
| Cd, Pb, As, Hg (each separately) | ICP-MS after digestion | particulate and polymer matrices; digestion completeness | as above, plus digestion recovery and blank control at trace level |
| Dry matter / moisture | lab-specified moisture determination | basis definition | repeatability and bias, and the temperature/time basis stated in the SOP (not restated here) |

Two reporting rules are non-negotiable because they are the failure modes that corrupt a
partition ranking rather than merely weaken it:

- **Below the quantitation limit is reported as `<QL` with the limit attached. It is never
  reported as zero, and it is never silently replaced by LOD/2 or by a substituted value.** Where
  censoring occurs, the analysis plan must name the censoring-aware estimator it will use, and
  that choice is fixed before data are seen.
- **The detection/quantitation limit must be reported with the approach used to obtain it**, and an
  estimated limit must be confirmed with samples at or near it. A single DL/QL number with no named
  approach is a standing finding.

### 6.2 Analysis model

A variance-components model with **butt nested within block**, analyte-specific, with the
between-block variance component estimated and carried. The model must be stated before data are
seen, and the degrees-of-freedom method for the between-block term must be named in advance (the
choice between available small-sample corrections changes the reported interval width and is
therefore not a post-hoc decision).

Repeated determinations on the same fraction enter the model as nested observations, never as
replicates of the feed.

For the multi-fraction comparison within an analyte, the family of comparisons is pre-specified
(§5.3) and small. The plan uses **estimation with simultaneous confidence intervals** as the
primary presentation rather than a sequence of per-fraction null-hypothesis tests, and states the
multiplicity procedure used to obtain the simultaneous intervals. This avoids the specific error
of reading a set of per-fraction p-values as a ranking.

### 6.3 The "controlling fraction" decision rule, including honest negatives

For each analyte *i*, the candidate controlling fraction is the one with the largest \(f_{i,s}\).

**Pre-stated rule.** A fraction is reported as the *resolved* controlling fraction for analyte *i*
only if its simultaneous interval for \(f_{i,s}\) lies strictly above the simultaneous intervals of
all other fractions for that analyte. Otherwise the outcome is reported as:

> **Controlling fraction for analyte *i*: not located.** The candidate and the runner-up are not
> separated at the stated confidence level.

This is a legitimate and expected result, and it is recorded as a result. It is **not** permission
to name the larger point estimate as the winner. The accepted record already requires that
uncertain numerical criteria stay `parameter-not-located`; a ranking that the data cannot separate
is exactly that case.

A second honest-negative rule: if the analyte's quantitation limit in the candidate controlling
fraction exceeds the analyte's mass in that fraction, the analyte's partition is reported as **not
quantifiable at the required boundary**, and the analyte is excluded from the ranking for that
matrix rather than being assigned a substituted value.

### 6.4 Closure checks (quality control, not findings)

| Check | Report |
|---|---|
| Dry-matter closure | \(\sum_s M_s^{\mathrm{dry}}\) vs \(M_{\mathrm{feed}}^{\mathrm{dry}}\), as a fraction with uncertainty |
| Analyte closure | \(u_i\) per analyte, with the residual left visible |
| Separation recovery | \(R_s\) per fraction, with uncertainty |
| Fines sensitivity | the ranking re-derived at the sensitivity aperture and reported alongside the primary |
| Whole-butt vs sum-of-fractions | reported as a closure quantity, never reconciled by adjusting a value |

A closure check that fails invalidates the ranking for that analyte; it does not get repaired by
reweighting.

### 6.5 Uncertainty budget

The budget is built per the GUM working method, per analyte per fraction.

**Model.** \(m_{i,s} = c_{i,s} \cdot M_s^{\mathrm{dry}}\), with \(M_s^{\mathrm{dry}} = M_s^{\mathrm{wet}} \cdot x_s\).
Sensitivity coefficients: \(\partial m/\partial c = M_s^{\mathrm{dry}}\); \(\partial m/\partial M_s^{\mathrm{dry}} = c_{i,s}\).

**Every input carries four things** — an estimate, a standard uncertainty, the distribution the
uncertainty came from, and degrees of freedom:

| Input | Estimate from | Standard uncertainty from | Distribution | DoF |
|---|---|---|---|---|
| \(c_{i,s}\) | calibration model + sample result | calibration-curve covariance, repeatability, intermediate precision, recovery bias | per the lab's model | per the lab's design |
| \(M_s^{\mathrm{wet}}\) | balance reading | balance resolution and repeatability | rectangular/normal per instrument | per instrument |
| \(x_s\) (dry-matter fraction) | moisture determination | repeatability + bias of the method + basis-definition uncertainty | per method | per design |
| \(M_s^{\mathrm{dry}}\) | product of the two above | propagated, with covariance from shared subsample | — | propagated |
| Homogeneity of the fraction's subsample | replicate subsample analyses | observed between-subsample SD | normal | observed |
| Extraction recovery of analyte *i* from matrix *s* | matrix spikes | observed SD and bias | normal | observed |
| Fraction separation completeness \(R_s\) | weighed before/after transfer | observed SD | normal | observed |

**Correlations are identified, not assumed away.** In particular, if the dry-matter fraction is
determined on the same subsample that is subsequently extracted, \(x_s\) and the concentration
measurement are not independent; the covariance is carried rather than treating all inputs as
independent. A shared calibration across fractions is a further correlation that must be
propagated.

**Reporting.** Each reported \(m_{i,s}\), \(f_{i,s}\) and closure quantity is reported as value ±
expanded uncertainty, stating the coverage factor \(k\), the coverage probability, and the method
(GUM linear propagation, or Monte Carlo where a non-linearity or a dominant non-normal component
makes the linear model inadequate — with the Monte Carlo distribution and any clause-8 endpoint
check reported). **Uncertainty is rounded first and the value is then rounded to the same decimal
place.** A dimensionless partition fraction is reported with its interval, not as a bare number.

**A magnitude sanity check precedes publication of any value.** A partition fraction outside [0, 1],
an \(f_{i,s}\) that exceeds 1, or a reported mass that exceeds the feed mass, is a dimensional or
bookkeeping error and is caught before it reaches a report.

---

## 7. Falsifiers — what would make this measurement fail, or the plan wrong

Each of these is stated in advance so that the outcome cannot be reinterpreted afterwards.

1. **Whole-butt reference and sum-of-fractions disagree beyond their combined uncertainty.** Then
   the fraction set is incomplete, the separation is lossy, or the analytical recovery differs
   between matrices. M01 is not measured at the required boundary in that case, and no partition
   ranking may be reported.
2. **Dry-matter closure is materially below unity and the loss is not located.** Loss that cannot
   be attributed to a named mechanism (fines loss, transfer loss, moisture basis error) biases the
   ranking in an unknown direction.
3. **Intermediate precision (including the between-day component) exceeds the between-butt
   variability.** Then the measurement cannot resolve the ranking, no controlling fraction may be
   reported, and the design must be revisited. Reporting the within-day figure as the procedure's
   precision would understate routine performance and is prohibited.
4. **The controlling fraction is not separated from the runner-up.** Then the controlling fraction
   for that analyte is **not located**. This is a result, not a failure, and it is reported as
   such.
5. **The quantitation limit in the candidate controlling fraction exceeds the analyte mass in that
   fraction.** Then the analyte's partition is **not quantifiable at the required boundary** for
   that matrix.
6. **The ranking changes materially between the primary and the sensitivity fines aperture.** Then
   the controlling fraction is aperture-dependent and cannot be named without the aperture stated
   alongside it.
7. **An analyte is absent from the whole-butt reference but present in a fraction.** Then either the
   reference sampling was not representative or contamination occurred; both invalidate the
   ranking for that analyte.

---

## 8. What M01 does not close

Stated explicitly so the proposal cannot be read as broader progress.

- **M02–M08** (F0 wash liquids and recovered CA; F1/J-H-01 initial wash, later wash, recycle,
  purge, sludge and CA; F2 fibre, composite and off-gas/condensate; F3 precipitate, mother liquor,
  wash, insolubles and recovered solvent; F4 fibre, concentrate, recycle and sorbents/filters;
  F5 pulp, dark liquor, purge, precipitate and wash water; compost/lumber/final articles and
  end-of-life release). M01 is the feed-side precondition for the first six of these. It closes
  none of them.
- **R01–R05** (jurisdiction and material status; actual final recipient; intended-use criteria;
  standards and hazard-property extrapolation; equipment, exposure and IP review). Untouched.
- **S01–S06** (energy, water/reagent/solvent makeup, throughput, treatment cost, product revenue
  and displacement, complete system inventory and comparator). Untouchted. M01 supplies a feed
  dry-mass basis that S01 and S02 would need; it is not an energy, cost or LCA input.
- **Sink field 3** (treatment route and acceptance) and **sink field 4** (use-specific product
  gate). M01 bears on fields 1 and 2 only, and only at the feed boundary.
- **The metals stop-condition** is not discharged. M01 locates *where* the metals are; it says
  nothing about whether any stream is acceptable, and uncharacterized metals remain a stop
  condition wherever they occur.
- **No product, process, family or proposal is validated.** No reader-facing claim follows from
  this document.

---

## 9. Sample-size decision gate

**No sample count is selected here.** The number of butts and lots is a function of quantities that
do not yet exist. This section fixes the *procedure* that produces the number and the *inputs* it
depends on, so that the number cannot be chosen after the data are seen.

### Gate A — Feasibility (pre-specified, small, first)

A feasibility sub-study, specified before it runs, whose only purpose is to estimate the planning
quantities that Section 6 needs:

1. between-butt SD of the partition fraction, on the analysis scale, per analyte;
2. within-butt preparation and analytical SD, per analyte and matrix;
3. between-block variance component, at whatever precision the feasibility supports;
4. dry-matter closure and separation recovery, with their uncertainties;
5. the frequency at which analytes fall below the quantitation limit per matrix and fraction;
6. the observed spread of moisture and storage interval.

Its output is a set of **uncertain** planning parameters with intervals. It is not a result about
the world and must not be reported as one.

### Gate B — Target quantity (defined before, computed after A)

The target is a **precision** target, not a significance target: the width of the simultaneous
interval on the quantity that decides the question. Two candidates, and the plan must name which
is primary:

- the simultaneous interval width on \(f_{i,s}\) for each analyte's candidate controlling
  fraction; and
- the simultaneous interval on the **difference** \(f_{i,s_1} - f_{i,s_2}\) between the two leading
  fractions, because a difference that cannot be separated is what fails to resolve the ranking.

### Gate C — Minimum important difference (SESOI), defined procedurally

The SESOI is the smallest partition-fraction difference that would change the engineering
decision. It is defined **procedurally**, not numerically, in this document:

> The SESOI for a given analyte is the smallest difference in \(f_{i,s}\) that (a) exceeds the
> measurement's own contribution to the uncertainty of that difference, and (b) would move the
> burden-bearing fraction to a different stream for that analyte — i.e. the smallest gap that would
> change which stream is named as carrying the burden.

Condition (a) is a floor imposed by the method. Condition (b) is a scientific judgement about
decision relevance, made by the investigators before the feasibility data are examined, and
recorded with its reasoning. **The numeric value is `parameter-not-located` and is not chosen
here.** It is the single most important decision in this plan, and choosing it after seeing
feasibility data would be an outcome-dependent choice.

### Gate D — Computation, with the block structure respected

With butts nested in blocks, the variance of a between-fraction difference is not just the
within-block term. The planning calculation must use the variance decomposition implied by
Section 6.2, including the between-block component, so that the total number of butts is not
mistaken for the effective sample size. A design-effect approximation (of the form
\(\mathrm{DEFF} = 1 + (m-1)\mathrm{ICC}\)) may be used only with its stated limits, and the mixed
model must still be the analysis.

Inputs to the computation, all from Gate A: the within-block SD, the between-block variance
component, the SESOI from Gate C, the confidence level, and the multiplicity procedure from
Section 6.2.

### Gate E — Sensitivity, not a single number

Across a plausible range of the SESOI (conditioned on the scientific judgement in Gate C) and
across the confidence interval of the feasibility SDs, **report the required sample size as a
range**, and record the chosen value with its justification. A single n hides the largest source
of uncertainty in the whole plan.

### Gate F — Pre-registration

Before any sample is processed: the SESOI and its reasoning, the confidence level, the
multiplicity procedure, the censoring rule, the analysis model and its degrees-of-freedom method,
the fraction definitions, the apertures, the panel, the method performance criteria, the seed, and
the resulting sample count — all written down and frozen. Post hoc changes are labelled as such.

### What this gate does not do

It does not compute a number now, because the inputs do not exist. It also does not inherit any
sample count, method-performance value or acceptance limit from the batch-01 worker reports: the
accepted record explicitly forbids carrying over worker sampling counts and illustrative
method-performance values.

> **[GAP-CLOSING NOTE — AI, scientist-inventor role]** The between-butt and between-block
> variability of cigarette-butt feed composition, and the analytical precision available for the
> panel in tobacco, cellulose-acetate, paper, ash and fines matrices, are `parameter-not-located`
> in the accepted record. They are the quantities a qualified-laboratory feasibility sub-study
> would produce. Until they exist, no defensible sample count for M01 can be stated, and the
> gate above stays open.

---

## 10. Guardrails and boundary

- **Desk research only.** No experiment is authorized, run or performed by this project.
- **No operating instructions.** No pressure-vessel, solvent-recovery/distillation,
  caustic-pulping or hazardous-waste-processing directions; no sample-preparation recipe; no DIY
  substitution; no clearance based on odour, appearance or FTIR alone.
- **Contaminated waste handling.** Any physical work with cigarette-butt feed requires qualified
  facilities, risk assessment, appropriate measurements and lawful disposal, and remains subject to
  a separate operator authorization that does not exist.
- **No claims.** Nothing here supports a statement that any family or proposal is clean,
  detoxified, safe, commercially validated, environmentally beneficial, novel, patentable,
  deployable or costed.
- **Prior-art awareness only.** No novelty or patentability search was performed for this plan and
  none is claimed. The measurement described here is a measurement of feed composition, not a
  process step; it is not presented as an inventive contribution.
- **Dissent preserved.** The F3 minority position (polymer quality as the controlling objective),
  the wrong-stream/dilute-purge objection, the unsolved-metals objection and the F2
  dilution/off-gas warning all survive this proposal unchanged. If M01 locates the burden in
  tobacco/ash rather than the filter, that **redirects** which family architecture deserves
  attention; it refutes nothing.
- **Evidence discipline.** Every statement in this document is either (a) a definition, (b) a
  procedure, or (c) an explicit `parameter-not-located`. No claim of a measured value is made.
- **File completion is not experimental validation.** This document is a proposal. M01 is open.

---

## 11. Method provenance

The structure of this plan — the separation of question/unit/response, the block-and-randomize
design, the nesting that protects against pseudoreplication, the pre-stated acceptance criteria,
the requirement to report the between-day precision component, the named-approach requirement for
detection and quantitation limits, the explicit measurement model with per-input uncertainty
metadata, and the pre-registered sample-size decision gate — follows established practice in
experimental design, statistical power, analytical method validation, and uncertainty propagation.

- Fisher, R. A. (1935). *The Design of Experiments*. Oliver & Boyd.
- Montgomery, D. C. (2019). *Design and Analysis of Experiments* (10th ed.). Wiley.
- Hurlbert, S. H. (1984). Pseudoreplication and the design of ecological field experiments.
  *Ecological Monographs*, 54(2), 187–211.
- Lazic, S. E. (2016). *Experimental Design for Laboratory Biologists*. Cambridge University Press.
- Cohen, J. (1988). *Statistical Power Analysis for the Behavioral Sciences* (2nd ed.). Academic Press.
- Lakens, D. (2022). Sample size justification. *Collabra: Psychology*, 8(1).
  https://doi.org/10.1525/collabra.33267
- Arnold, B. F., et al. (2011). Simulation methods to estimate design power. *BMC Medical Research
  Methodology*, 11:94.
- ICH Q2(R2) *Validation of Analytical Procedures* (replacing Q2(R1), November 2023) and ICH Q14
  *Analytical Procedure Development*; JCGM 100:2008 *Evaluation of measurement data* and JCGM
  101:2008 (Monte Carlo supplement); NIST Technical Note 1297.

**Design and analysis tooling provenance.** This plan was prepared with the Scientific Agent
Skills library, whose procedures for experimental design, statistical power, analytical method
validation and uncertainty-and-units were applied directly:

> Kassis, T., Agarwal, V., He, Y., Patel, D., & Brueckner, A. M. (2026). Scientific Agent Skills:
> A Library of Procedural Knowledge for Research Agents. arXiv:2609.00065.
> https://doi.org/10.48550/arXiv.2609.00065

---

## 12. Related records

| Record | Role |
|---|---|
| `reports/final/validation-and-open-questions.md` | The accepted agenda; M01 row, the shared evidence envelope, the accounting convention, the J-H-01 decisive measurement |
| `reports/batch-02/HANDOFF-BRIEF.md` | The handoff package; the central finding, the four-field sink, the may-do / may-not-do boundary |
| `reports/batch-02/invention.md` | The invention sketch; four-field sink failure map and the metals stop-condition |
| `reports/batch-02/methods/f1-mechanical-physical.md` | F1 family context for the separation boundary this plan would characterise |
| `state/workflow.yaml` | Authoritative state; `batch_02:`, `gap_closing.remaining_open_gaps`, `permissions` |
| `reports/batch-02/evidence-gaps/README.md` | Index of the gap-continuation series |

> **[GAP-CLOSING NOTE — AI, scientist-inventor role]** M01 remains open. This document does not
> close it. It specifies what closing it would require, and names the decisions that must be made
> by a qualified laboratory and by the operator — separately — before any measurement begins. No
> scientific content has been approved and no publication has occurred.
