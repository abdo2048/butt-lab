# Butt Lab

[Read the public notebook](https://butt-lab.am6.workers.dev/) for reported cigarette-butt recycling routes, the evidence behind them, and AI proposals a reviewer can challenge. The site is for curious readers as well as engineers, toxicologists, health researchers and waste specialists. Butt Lab has not carried out an experiment; a published proposal is not a working or approved process.

## Start here

- [Current status and next steps](state/workflow.yaml)
- [Repository map, branches and remaining work](docs/REPOSITORY-MAP.md)
- [Prepare the local PDF reading library](docs/LOCAL-LIBRARY.md)
- [Working-library coverage](docs/LIBRARY-REVIEW.md)
- [Deployment](docs/DEPLOY.md)

## Preview or verify an edit

Use Node.js 24. From the repository root:

```sh
npm ci --prefix tools/publication-contract
npm ci --prefix tools/reader-site
# Regenerate only after editing tools/publication-contract/layer-data/.
node tools/publication-contract/scripts/build-publication-layer.mjs
npm --prefix tools/publication-contract run validate
npm --prefix tools/publication-contract run export
npm --prefix tools/reader-site run build
npm --prefix tools/reader-site run preview -- --host 0.0.0.0
```

The preview includes the actual Pagefind index. To check a change before release, run `npm test` in both tool directories and `npm run audit:release` in `tools/reader-site`. The build workflow checks and packages; it does not publish.

## Where to make changes

| If you are changing… | Go here |
| --- | --- |
| Public source records, claims or narrative | [`tools/publication-contract/layer-data/`](tools/publication-contract/layer-data/), then regenerate [`publication/`](publication/) |
| Reader layout, navigation or search | [`tools/reader-site/`](tools/reader-site/) |
| Underlying documents and past research | [`materials/`](materials/), [`registry/`](registry/), [`reports/`](reports/) and [`inventions/`](inventions/) |
| Operator workflow and generated reading copies | `.research-local/` (local, Git-ignored; never part of the reader) |

Historical workflows, panel logs and plans are provenance, not prerequisites for a new desk-research pass. A useful pass needs a narrow question, traceable sources, clearly labelled assumptions, and a decision about what evidence to look for next.
