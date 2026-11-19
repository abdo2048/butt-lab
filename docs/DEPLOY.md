# Publish Butt Lab to Cloudflare

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
5. Open the production URL, check `/sources/` and `/invention/`, then test one search. To undo a release, use `npx wrangler versions list` and `npx wrangler rollback <version-id>` from the site directory.

To redeploy a later change, repeat the build, inspection and approval for the new artifact.

## GitHub Actions alternative

The [build workflow](../.github/workflows/build.yml) publishes a downloadable artifact. On a push build of the exact committed revision, use the SHA, version, run ID and artifact hash printed there for the approval record. The [deploy workflow](../.github/workflows/deploy.yml) is manual and checks that the downloaded artifact matches the approval. The operator configures `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` in GitHub Actions, and dispatches the workflow with those four artifact values. Never put credentials in Git or in a deployment request.
