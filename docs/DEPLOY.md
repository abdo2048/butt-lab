# Deploying the reader site (Cloudflare Workers, free plan)

This is the operator's manual path to put the Butt Lab reader site online. It is written
to be followed one step at a time **with no AI present**. Every command below was checked
against the pinned `wrangler` version in `tools/reader-site/package.json`.

**Nothing is online yet.** The steps below are what has to happen before anything is
online, and each one is yours to run. The site you deploy contains the published
research records; putting it online publishes them to the world, so this is a deliberate
act, not a build side effect.

---

## What you are deploying

| | |
|---|---|
| Worker name | `butt-lab` |
| Hosting | Cloudflare Workers, free plan, `workers.dev` subdomain |
| Worker URL | `https://butt-lab.<your-workers-subdomain>.workers.dev` |
| What is served | The static Astro build in `tools/reader-site/dist` (28 pages + a Pagefind search index) |
| Configuration | `tools/reader-site/wrangler.jsonc` |
| Command | `npx wrangler deploy` |

The Worker has no script and no database. It serves the built files and nothing else.

## Before you start

- Node.js 24 (`node --version` should print `v24.x`).
- A Cloudflare account. The free plan is enough.
- A terminal with this repository checked out.
- About 10 minutes.

The commands below are shown in PowerShell (Windows). The bash equivalents are given
where the syntax differs.

---

## Step 1 — install the pinned dependencies

```powershell
cd tools/reader-site
npm ci
```

`npm ci` installs exactly the versions in `package-lock.json`, including the pinned
`wrangler` (4.164.0). It deletes `node_modules` first, so it always gives you the same
state. Expect a line like `added 28 packages`.

Bash: `cd tools/reader-site && npm ci`

## Step 2 — authenticate with Cloudflare

```powershell
npx wrangler login
```

This opens a browser window. Choose "Allow" for the Worker. The browser tab will say the
login succeeded; close it and come back to the terminal.

Check who you are:

```powershell
npx wrangler whoami
```

You should see your account and your email address. If it says you are not logged in,
run `npx wrangler login` again.

*Alternative (no browser):* set `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` in
your shell before running wrangler. Create the token in Cloudflare under
**My Profile → API Tokens → Create Token → Edit Cloudflare Workers**, and keep the value
in your password manager or shell profile, never in this repository.

## Step 3 — build the site

```powershell
npm run build
```

This does three things in order: it stages the publication bundle and verifies every
file against the bundle manifest, it builds the Astro site into `dist/`, and it builds
the Pagefind search index. If the bundle verification fails, the build stops and writes
nothing.

Expect `Indexed 28 pages` and `Indexed 2056 words` at the end.

## Step 4 — package the artifact you are going to approve

```powershell
$env:PUBLICATION_VERSION = "batch-02-pilot"
# Use the release candidate recorded in state/workflow.yaml, not HEAD: the
# approval record must name the same commit as the artifact.
$env:SOURCE_COMMIT = "65d429f"
node scripts/build-artifact.ts ../.. artifact
```

The last line prints something like:

```
ARTIFACT version=batch-02-pilot commit=<40-character sha> files=121 sha256=<64 hex characters>
```

**Write down the `sha256` value.** That single hash identifies exactly the bytes you
are about to approve. If any file changes, the hash changes.

Bash:

```bash
export PUBLICATION_VERSION=batch-02-pilot
export SOURCE_COMMIT=$(git rev-parse HEAD)
node scripts/build-artifact.ts ../.. artifact
```

## Step 5 — write your approval record

The deployment gate refuses everything until there is an approval record naming **you**,
**one exact commit**, **one exact artifact**. Copy the template and fill it in:

```powershell
Copy-Item ..\..\operator\deployment-approval.template.json ..\..\operator\deployment-approval.json
```

Then edit `operator/deployment-approval.json`:

```json
{
  "approvedCommit": "<the commit sha from Step 4>",
  "publicationVersion": "batch-02-pilot",
  "buildRunId": "local",
  "artifactSha256": "<the sha256 from Step 4>",
  "approvedBy": "<your name>",
  "approvedOn": "<YYYY-MM-DD>"
}
```

Use `"local"` as the build run id for a manual build. The file lives in `operator/`,
which is a private working directory; it is never published and never reaches the site.

## Step 6 — write the deployment request

```powershell
@"
{
  "approvedCommit": "$($env:SOURCE_COMMIT)",
  "publicationVersion": "batch-02-pilot",
  "buildRunId": "local",
  "artifactSha256": "<the sha256 from Step 4>"
}
"@ | Out-File -Encoding utf8 deployment-request.json
```

Replace `<the sha256 from Step 4>` with the hash. The request and the approval must
agree on all four values.

## Step 7 — verify the approval (the gate)

```powershell
node scripts/verify-approval.ts --approval ../../operator/deployment-approval.json --request deployment-request.json --artifact artifact
```

It prints exactly one of:

- `APPROVED: …` — the approval matches the artifact's actual bytes. Continue.
- `REFUSED: …` — **stop.** The message names the mismatch (`APPROVAL_COMMIT_MISMATCH`,
  `APPROVAL_ARTIFACT_MISMATCH`, `APPROVAL_ARTIFACT_FILE_MISMATCH`, and so on). Fix the
  cause and run the verification again. A refusal is never an error to work around: it
  means the bytes you would publish are not the bytes you approved.

## Step 8 — stage the approved bytes and deploy

```powershell
Remove-Item -Recurse -Force dist
Copy-Item -Recurse artifact/site dist
npx wrangler deploy
```

The two copy commands are deliberate: the Worker serves `dist/`, and copying the
artifact's site into `dist/` makes the served bytes **exactly** the bytes you approved.
`wrangler deploy` does not rebuild anything.

Bash:

```bash
rm -rf dist && cp -r artifact/site dist
npx wrangler deploy
```

Wrangler prints the URL it published to, of the form:

```
https://butt-lab.<your-workers-subdomain>.workers.dev
```

Nothing is uploaded until this command runs.

## Step 9 — read the deployed URL and check it

Open the printed URL in a browser. Check, in this order:

1. The home page loads and the navigation works.
2. `/methods/` lists the method families and a method page opens.
3. `/start/` explains how to read the site.
4. Search works (the Pagefind index). Type a word you expect, such as `cadmium`.
5. `/compare/` sorts and filters.
6. `/limitations/` lists the open evidence gaps.

If you want to check what is live from the terminal:

```powershell
npx wrangler deployments list
```

## Step 10 — deploy a later change (redeploy)

A redeploy is the same procedure with a new commit:

1. `git fetch` and `git checkout` the commit you want to publish.
2. `npm ci` (only if `package-lock.json` changed).
3. `npm run build`.
4. Step 4 again — the artifact hash will be different.
5. Step 5, 6, 7 again — a new approval record for the new hash.
6. Step 8 again.

The old approval record will not verify against the new artifact. That is the point: an
approval covers one exact set of bytes, never "the current state of the site".

## Step 11 — roll back to the previous version

```powershell
npx wrangler versions list
npx wrangler rollback <version-id>
```

`wrangler versions list` shows the recent versions with their IDs. `wrangler rollback`
points the live Worker at one of them. Check the result with:

```powershell
npx wrangler deployments list
```

Rolling back changes what is served. It does not change what the repository contains,
and it does not undo an approval record.

---

## Option B — let GitHub Actions do the deploy instead

The repository also contains a manual workflow, `.github/workflows/deploy.yml`. It runs
only when you start it by hand, it downloads the exact artifact from a build run, it
verifies it against `operator/deployment-approval.json`, and only then it deploys. The
build workflow (`.github/workflows/build.yml`) cannot deploy at all.

To use it:

1. In the repository settings, add the secrets `CLOUDFLARE_API_TOKEN` and
   `CLOUDFLARE_ACCOUNT_ID`.
2. Commit `operator/deployment-approval.json` (the approval record from Step 5, with the
   artifact hash from the build run).
3. Open the repository's **Actions** tab, pick the `deploy` workflow, and enter the
   approved commit, publication version, build run id and artifact SHA-256.

The workflow refuses to deploy if the approval does not match the downloaded artifact.

---

## Troubleshooting

| What you see | What it means | What to do |
|---|---|---|
| `REFUSED: APPROVAL_RECORD_MISSING` | No approval file | Do Step 5 |
| `REFUSED: APPROVAL_ARTIFACT_FILE_MISMATCH` | The artifact's bytes changed after the approval | Do Step 4 and Step 5 again for the new bytes |
| `REFUSED: APPROVAL_COMMIT_MISMATCH` | The approval names a different commit | Check `git rev-parse HEAD` against the file |
| `X [ERROR] Cannot use assets with a binding in an assets-only Worker` | A binding was added to `wrangler.jsonc` | Restore the committed config: `git checkout tools/reader-site/wrangler.jsonc` |
| `You are not authenticated` | The login expired or never happened | `npx wrangler login`, then `npx wrangler whoami` |
| A page 404s but the site works | The Astro build has no custom 404 page | Expected: unmatched paths get Cloudflare's default 404 response |
| `npm ci` fails with a lockfile error | `package.json` and `package-lock.json` disagree | `git status` in `tools/reader-site`; restore the committed lockfile before deploying |

## What this procedure deliberately does not do

- It does not rebuild the site at deploy time. The bytes deployed are the bytes you
  approved, or the deployment does not happen.
- It does not put a token, a key or an account id in the repository.
- It does not publish anything to the scientific record, the registry, or any external
  service other than your own Cloudflare account.
- It does not change the standing statement about the content: nothing in the site is
  experimentally validated, and the gaps stay gaps.
