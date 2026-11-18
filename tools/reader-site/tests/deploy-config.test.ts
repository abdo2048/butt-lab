// Hosting-contract tests. These pin what the operator will actually run, so that the
// deployment configuration cannot drift away from the guide that tells them how to use
// it. They read the committed files; they never contact Cloudflare.
import assert from "node:assert/strict";
import { test } from "node:test";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { verifyApproval } from "../scripts/verify-approval.ts";

const here = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(here, "../../..");
const readerSiteRoot = path.join(repoRoot, "tools/reader-site");

function readRepoFile(relativePath: string): string {
  return fs.readFileSync(path.join(repoRoot, relativePath), "utf8");
}

/**
 * A JSONC file is JSON plus comments. The committed config uses whole-line comments
 * only, so removing those lines is enough to parse it.
 */
function parseJsonc(source: string): Record<string, unknown> {
  const withoutComments = source
    .split(/\r?\n/)
    .filter((line) => !/^\s*\/\//.test(line))
    .join("\n");
  return JSON.parse(withoutComments) as Record<string, unknown>;
}

test("the wrangler config names the worker and binds the built site as its assets", () => {
  const source = readRepoFile("tools/reader-site/wrangler.jsonc");
  const config = parseJsonc(source);

  assert.equal(config["name"], "butt-lab");
  assert.equal(config["workers_dev"], true);

  const assets = config["assets"] as Record<string, unknown>;
  assert.ok(assets, "the config must declare an assets binding");
  assert.equal(assets["directory"], "./dist");
  // An assets-only Worker must not declare an asset binding: wrangler rejects it
  // with "Cannot use assets with a binding in an assets-only Worker." The site is
  // static, so nothing needs to read the assets from a script.
  assert.equal(assets["binding"], undefined);
  assert.equal(config["main"], undefined, "the site is static: there is no Worker script");

  const compatibilityDate = config["compatibility_date"];
  assert.equal(typeof compatibilityDate, "string");
  assert.match(String(compatibilityDate), /^\d{4}-\d{2}-\d{2}$/);
  assert.equal(new Date(`${compatibilityDate}T00:00:00Z`).toISOString().slice(0, 10), compatibilityDate);
});

test("the wrangler config carries no credential", () => {
  const source = readRepoFile("tools/reader-site/wrangler.jsonc");
  assert.equal(/api[_-]?token/i.test(source), false);
  assert.equal(/CLOUDFLARE_ACCOUNT_ID\s*[:=]/.test(source), false);
  assert.equal(/secret/i.test(source), false);
});

test("the deploy workflow stages the approved artifact bytes and never rebuilds them", () => {
  const workflow = readRepoFile(".github/workflows/deploy.yml");

  const stageAt = workflow.search(/artifact\/site/);
  const deployAt = workflow.search(/wrangler\s+deploy/i);
  assert.ok(stageAt > -1, "the deploy workflow must stage the approved site from the artifact");
  assert.ok(deployAt > -1, "the deploy workflow must contain the deploy command");
  assert.ok(stageAt < deployAt, "the approved bytes must be staged before the deploy command");

  // The deployed bytes must be exactly the bytes the operator approved. A rebuild in
  // the deploy workflow would produce different bytes than the approved artifact.
  assert.equal(/npm run build/.test(workflow), false);
  assert.equal(/astro build/.test(workflow), false);
  assert.equal(/build:content/.test(workflow), false);
  assert.equal(/npm run export/.test(workflow), false);
});

test("the deploy workflow runs wrangler from the reader site directory", () => {
  const workflow = readRepoFile(".github/workflows/deploy.yml");
  const deployStep = workflow.slice(workflow.search(/wrangler\s+deploy/i) - 600);
  assert.match(deployStep, /working-directory:\s*tools\/reader-site/);
});

test("the manual deployment guide gives the operator every step they need", () => {
  const guide = readRepoFile("docs/DEPLOY.md");

  // Install, login, build, deploy, redeploy, rollback, and how to read the URL.
  assert.match(guide, /npm ci/, "the guide must say how to install the pinned dependencies");
  assert.match(guide, /wrangler login/, "the guide must say how to authenticate");
  assert.match(guide, /npm run build/, "the guide must say how to build the site");
  assert.match(guide, /wrangler deploy/, "the guide must say how to deploy");
  assert.match(guide, /redeploy/i, "the guide must say how to deploy a later change");
  assert.match(guide, /rollback/i, "the guide must say how to go back to the previous version");
  assert.match(guide, /workers\.dev/, "the guide must say where the deployed site lives");

  // The same gate the CI path uses, so the manual path is not a way around it.
  assert.match(guide, /operator\/deployment-approval\.json/);
  assert.match(guide, /verify-approval/);
});

test("the manual deployment guide carries no credential and claims no deployment", () => {
  const guide = readRepoFile("docs/DEPLOY.md");
  assert.equal(/CLOUDFLARE_API_TOKEN\s*[:=]\s*["']?[A-Za-z0-9_-]{20,}/.test(guide), false);
  assert.equal(/CLOUDFLARE_ACCOUNT_ID\s*[:=]\s*["']?[A-Za-z0-9_-]{20,}/.test(guide), false);
  assert.equal(/is (now )?deployed/i.test(guide), false);
  assert.equal(/has been deployed/i.test(guide), false);
});

test("the approval template exists and cannot be mistaken for an approval", () => {
  const template = JSON.parse(
    readRepoFile("operator/deployment-approval.template.json"),
  ) as Record<string, unknown>;

  for (const field of [
    "approvedCommit",
    "publicationVersion",
    "buildRunId",
    "artifactSha256",
    "approvedBy",
    "approvedOn",
  ]) {
    assert.ok(field in template, `the template must carry the ${field} field`);
  }

  // The placeholders must not verify: the gate has to refuse the template as-is.
  const result = verifyApproval({
    approval: template as never,
    request: {
      approvedCommit: "abc123",
      publicationVersion: "batch-02-pilot",
      buildRunId: "42",
      artifactSha256: "0".repeat(64),
    },
    artifactRoot: path.join(readerSiteRoot, "does-not-exist"),
    manifest: { publicationVersion: "batch-02-pilot" },
  });
  assert.equal(result.ok, false);
});
