# Butt Lab reader and research review · 2026-11-19

## How it fits together now

The project is a public research notebook: gather reported recycling approaches and the supporting science, show where each explanation is incomplete, and propose **testable alternatives**, not reconstructed secret recipes. A source says what was claimed or measured. An AI hypothesis explains what could be true and how to check it. A third party's result does not become a Butt Lab experiment.

The reader now leads with the question, gives direct paths to the methods, sources and AI proposals, and shows the evidence in worked examples. The grouped bibliography differentiates references attached to claims from background. Keep the detailed records and archive, but do not require readers to learn the old project stages, IDs or review panels first. The reusable playbook is in the reader, not in the build controller.

## Branches and historical CI

The checkout contains one Arena worktree. The two feature-branch tips were fetched and inspected from Git objects without switching branches. There is no access to uncommitted files on another machine.

| Branch or build | Finding |
| --- | --- |
| `feat/reader-platform` (`b3b53bd`) | The tip is already an ancestor of `main`; do not merge it again. Branch runs [44303247035](https://github.com/abdo2048/butt-lab/actions/runs/44303247035) and [44238438151](https://github.com/abdo2048/butt-lab/actions/runs/44238438151) fail in artifact assembly. At the branch tip, the command points two directories above the reader even though the site's `dist/` is under the reader. `5ab9445` corrects that packaging path on `main`. |
| `feat/publication-content-contract` (`19d1716`) | Last common ancestor with the checkout is `d30adba`. `main` has an evolved contract and the same working-library PDFs and Markdown extractions. The only library difference is 59 more extracted PNGs on the old branch, not 59 new publications. Leave them on that branch; rights clearance is separate from text retrieval. |
| Main runs [44403412317](https://github.com/abdo2048/butt-lab/actions/runs/44403412317) and [44406620006](https://github.com/abdo2048/butt-lab/actions/runs/44406620006) | The build and reader tests passed; the release audit failed before artifact generation. The historical runner logs were not retrievable here, and builds from archives of `afaa2f1` and `ef8a251` did not reproduce the failures locally. The next main run [44408817036](https://github.com/abdo2048/butt-lab/actions/runs/44408817036) and the baseline run [44457660259](https://github.com/abdo2048/butt-lab/actions/runs/44457660259) were green. No specific CSS root cause is claimed. Future CI writes findings to the step summary without ignoring audit failures. |

## Evidence corrections and limits

- PMC7659942 and DOI `10.3390/ma13214710` are the same De Fenzo article. It describes washing with water and ethanol; acetone belongs to its later film preparation. The old source URL points readers to the consolidated record.
- Teixeira's pulping paper reports recoverable pulp **and** a troublesome dark liquor. Reuse in reported trials does not by itself establish long-term closure. Binder studies and prototype filter tests establish their tested endpoints, not a safe product.
- The company-hosted Trento permit describes one Re-Cig site and product route. Its lot criteria are not a contaminant-removal dataset or transferable regulatory clearance. The family scorecards describe the scoped family routes (for instance, dry treatment is not the same as the Re-Cig wet-plus-thermal route).
- The featured AI candidate is a comparative design, not a novelty assertion. Its small executable sensitivity model demonstrates why a drop in contaminant load in the wash is insufficient without checking the recovered material and the rejected streams. It is dimensionless and not fit to experimental data.
- The public bibliography is selective. See [library coverage](LIBRARY-REVIEW.md); route scores still need direct process-level evidence and should not be upgraded just because the bibliography got larger.

## Small next steps

1. Review and deploy the exact new artifact with the [release guide](DEPLOY.md). The existing production URL still serves the earlier version.
2. Choose one next decision, e.g. whether to prioritise a pulp or fibre intermediate. Compare source sections on the same feed/outlet basis; check the thesis, primary patents, leachate and waste-treatment records before revising the route card.
3. Record a correction or qualified validation result against the individual statement it changes. It does not need a new multi-agent panel or a full site rebuild plan.
