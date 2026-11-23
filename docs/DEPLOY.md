# Publish Butt Lab to Cloudflare

This guide is for the **public reader only**. For private PDF review use the separate [reviewer library runbook](REVIEWER-LIBRARY.md); do not add its inventory, files or secrets to the public artifact.

Production is [butt-lab.am6.workers.dev](https://butt-lab.am6.workers.dev/), an assets-only Worker. Changes on a branch or in a preview do not update it. The release gate is for publishing exact bytes, not for approving any physical process. The prior approval in `operator/` applies only to its old artifact.

## Build and inspect

Use Node.js 24 and a clean checkout of the exact change to be published. Install pinned dependencies with `npm ci` in both tool directories, validate and export from the publication contract, then run `npm run build` in the reader. The [README](../README.md) gives the exact commands from the repository root. Inspect the preview on mobile and desktop: open a method and a source, search for `Teixeira`, and check the labels and scenario on `/invention/`.

From `tools/reader-site`, run `npm run audit:release`. Package the built site with its current commit (the script reads the publication version from the staged content):

```sh
SOURCE_COMMIT=$(git rev-parse HEAD) node scripts/build-artifact.ts
```

PowerShell: `$env:SOURCE_COMMIT = (git rev-parse HEAD); node scripts/build-artifact.ts`.

The output gives the commit, version and SHA-256 of `artifact/artifact-manifest.json`. Keep that artifact. Cloudflare's `npx wrangler deploy --dry-run` checks the hosting configuration without uploading, but does not check or record approval.

## Approve and publish the same bytes

1. The operator copies `operator/deployment-approval.template.json` to `operator/deployment-approval.json`, replacing the fields with the **actual** commit, publication version, artifact hash, build-run ID (`local` for the above), approver and date. Do not reuse an approval from another artifact.
2. In `tools/reader-site`, create `deployment-request.json` with the matching `approvedCommit`, `publicationVersion`, `buildRunId` and `artifactSha256` fields; omit `approvedBy` and `approvedOn`.
3. Run the check from `tools/reader-site`:

   ```sh
   node scripts/verify-approval.ts --approval ../../operator/deployment-approval.json --request deployment-request.json --artifact artifact
   ```

4. Only if it prints `APPROVED`, replace `dist` with `artifact/site` and publish using your Cloudflare session:

   ```sh
   rm -rf dist && cp -r artifact/site dist
   npx wrangler login
   npx wrangler deploy
   ```

   PowerShell for staging: `Remove-Item -Recurse -Force dist; Copy-Item -Recurse artifact/site dist`. Do not rebuild between verification and deploy. If logged in already, use `npx wrangler whoami` to confirm the correct account instead of logging in again.
5. Open the production URL, check `/sources/` and `/invention/`, then test one search. For a release with [public source PDFs](PUBLIC-SOURCE-PDFS.md), also open and download a listed PDF and verify the response is `application/pdf`. To undo a release, use `npx wrangler versions list` and `npx wrangler rollback <version-id>` from the site directory.

To redeploy a later change, repeat the build, inspection and approval for the new artifact.

## Copy-paste sequence

Every block below names the directory it runs in. Wrangler is only ever run from `tools/reader-site`.

**Step 0 — repository root.** Confirm you are publishing the commit you think you are.

```powershell
cd C:\Users\Ad2048\Downloads\butt-lab-starter-kit\butt-lab
git status --short          # must print nothing
git log --oneline -1        # note the sha; it goes into the approval
```

**Step 1 — `tools/reader-site`.** Build, test, audit. All three must pass before you package anything.

```powershell
cd tools\reader-site
npm ci
npm run build               # writes dist\
npm test                    # 201 tests expected
npm run audit:release       # must print passed=true
```

**Step 2 — `tools/reader-site`.** Package the artifact and read the hash it prints.

```powershell
$env:SOURCE_COMMIT = (git rev-parse HEAD)
node scripts/build-artifact.ts
# ARTIFACT version=... commit=... files=... sha256=...
```

**Step 3 — `tools/reader-site`.** Pre-flight the host limits. Cloudflare rejects the whole upload if any single file is over 25 MiB, and the error names only the first offender.

```powershell
Get-ChildItem -Recurse -File dist | Where-Object Length -gt 25MB |
  Select-Object Name, @{n='MiB';e={[math]::Round($_.Length/1MB,2)}}
```

Empty output means you can deploy. Anything listed has to be dealt with before step 6 — see *Troubleshooting* below.

**Step 4 — repository root.** Record the approval for these exact bytes: copy `operator/deployment-approval.template.json` to `operator/deployment-approval.json` and fill in the commit, the version, `buildRunId: "local"`, the `sha256` from step 2, your name and the date. Do not reuse an approval from an earlier artifact — the hash will not match and step 5 will refuse it.

**Step 5 — `tools/reader-site`.** Create `deployment-request.json` with the same four fields (commit, version, run id, hash) and **no** `approvedBy` or `approvedOn`, then verify.

```powershell
node scripts/verify-approval.ts --approval ../../operator/deployment-approval.json --request deployment-request.json --artifact artifact
# must print APPROVED
```

**Step 6 — `tools/reader-site`.** Stage exactly the approved bytes. Do not rebuild after this point.

```powershell
Remove-Item -Recurse -Force dist
Copy-Item -Recurse artifact\site dist
```

**Step 7 — `tools/reader-site`.** Deploy with wrangler.

```powershell
npx wrangler whoami         # confirm the account and that you are logged in
npx wrangler deploy         # prints the deployed URL
```

`npx wrangler login` is only needed if `whoami` says you are not logged in. The OAuth session is stored outside the repository; nothing here needs a credential in a file.

**Step 8 — verify the live site.** Open `https://butt-lab.am6.workers.dev/`, then `/documents/`, `/sources/` and `/invention/`, run one search, and download one PDF to confirm it arrives as `application/pdf`.

```powershell
# tools/reader-site, if a release has to be undone
npx wrangler versions list
npx wrangler rollback <version-id>
```

## Troubleshooting

**`Asset too large ... Cloudflare Workers supports assets with sizes of up to 25 MiB`.** One file in `dist/` is over the per-file limit, and the upload is refused as a whole — nothing is published. Run the step 3 check to find every offender, not just the one wrangler named. This is a host limit, not a build bug: `npx wrangler deploy --dry-run` fails the same way, and no setting raises it.

The supported fix is already in the code. `REMOTE_DOCUMENTS` in `src/lib/documents.ts` lists the shelf documents the Worker will not host, each with the URL of the copy held elsewhere. For a listed id the build skips `documents/<id>.pdf`, the shelf row links the external copy and states the size, the source page shows a single Download action, and `auditPublicPdfs` expects the file to be **absent** — staging it anyway is a blocking finding. To add one, put the id, the URL and the reason in that map; to shrink the shelf back to hosted-only, remove the entry once the file fits.

Do not silently swap the hosted file for a recompressed copy: a reader would download a different document from the one in `sources/`, and the site would no longer be describing its own archive.

**`EPERM, Permission denied` while emptying `dist`.** A program is holding a file open — a PDF reader with a shelf document open is the usual cause. Close it and rerun. `astro build` cannot replace `dist/` while a handle exists.

**`verify-approval.ts` refuses with a hash mismatch.** The artifact was rebuilt after the approval was written, or the approval was copied from an earlier release. Re-run step 2 and rewrite the approval with the new hash.


## GitHub Actions alternative

The [build workflow](../.github/workflows/build.yml) publishes a downloadable artifact. On a push build of the exact committed revision, use the SHA, version, run ID and artifact hash printed there for the approval record. The [deploy workflow](../.github/workflows/deploy.yml) is manual and checks that the downloaded artifact matches the approval. The operator configures `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` in GitHub Actions, and dispatches the workflow with those four artifact values. Never put credentials in Git or in a deployment request.
