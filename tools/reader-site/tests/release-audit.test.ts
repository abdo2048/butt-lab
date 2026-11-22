// Tests for the release audit (Phase D).
//
// The audit is the repeatable form of the Phase D release-preparation checks:
// exposure (repository paths, session logs, credentials), rights, scientific
// discipline (evidence states, rationales, dissent, AI labels), forbidden
// declarations, and accessibility of the built site.
//
// These tests describe behaviour of `scripts/release-audit.ts`. The audit script
// does not exist yet — this file is the RED.
import { gzipSync } from "node:zlib";
import cbor from "cbor";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import {
  auditAccessibility,
  auditDeclarations,
  auditRights,
  auditPublicPdfs,
  auditScientific,
  runReleaseAudit,
  scanBuiltOutput,
  type BundleRecordLike,
  type Finding,
} from "../scripts/release-audit.ts";

const here = path.dirname(fileURLToPath(import.meta.url));
const siteRoot = path.resolve(here, "..");
const dist = path.join(siteRoot, "dist");
const bundleDir = path.join(siteRoot, "src", "content", "bundle");
const tokensCss = path.join(siteRoot, "src", "styles", "tokens.css");
const baseCss = path.join(siteRoot, "src", "styles", "base.css");

function tempDir(t: { after: (fn: () => void) => void }): string {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "butt-lab-release-audit-"));
  t.after(() => fs.rmSync(dir, { recursive: true, force: true }));
  return dir;
}

function write(dir: string, relative: string, contents: string | Buffer): string {
  const file = path.join(dir, relative);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, contents);
  return file;
}

function bundleRecords(): BundleRecordLike[] {
  const pairs = JSON.parse(fs.readFileSync(path.join(bundleDir, "records.json"), "utf8")) as [
    string,
    BundleRecordLike,
  ][];
  return pairs.map(([, record]) => record);
}

function codes(findings: Finding[]): string[] {
  return findings.map((finding) => finding.code);
}

function source(overrides: Partial<BundleRecordLike> = {}): BundleRecordLike {
  return {
    id: "source-test",
    kind: "source",
    rights: "link-only",
    derivatives: [],
    publicationState: "approved",
    ...overrides,
  } as BundleRecordLike;
}

// --- exposure ---------------------------------------------------------------

test("scanBuiltOutput reports a repository-local path", (t) => {
  const dir = tempDir(t);
  write(dir, "index.html", "<p>See tools/reader-site/src/content/bundle/records.json</p>");
  const findings = scanBuiltOutput(dir);
  assert.ok(codes(findings).includes("REPOSITORY_PATH_LEAK"), codes(findings).join(","));
});

test("scanBuiltOutput reports an absolute local path", (t) => {
  const dir = tempDir(t);
  write(dir, "index.html", "<p>built at C:\\Users\\someone\\butt-lab</p>");
  const findings = scanBuiltOutput(dir);
  assert.ok(codes(findings).includes("REPOSITORY_PATH_LEAK"), codes(findings).join(","));
});

test("scanBuiltOutput reports a session-log reference", (t) => {
  const dir = tempDir(t);
  write(dir, "index.html", "<p>see state/session-log.md</p>");
  const findings = scanBuiltOutput(dir);
  assert.ok(codes(findings).includes("SESSION_LOG_REFERENCE"), codes(findings).join(","));
});

test("scanBuiltOutput reports a credential-shaped string", (t) => {
  const dir = tempDir(t);
  write(dir, "index.html", "<p>AKIAIOSFODNN7EXAMPLE</p>");
  const findings = scanBuiltOutput(dir);
  assert.ok(codes(findings).includes("CREDENTIAL_PATTERN"), codes(findings).join(","));
});

test("scanBuiltOutput ignores binary files", (t) => {
  const dir = tempDir(t);
  write(dir, "font.woff2", Buffer.from([0x00, 0x01, 0x02, 0x41, 0x4b, 0x49, 0x00, 0xff]));
  const findings = scanBuiltOutput(dir);
  assert.deepEqual(findings, []);
});

test("scanBuiltOutput passes clean reader-facing output", (t) => {
  const dir = tempDir(t);
  write(dir, "index.html", "<main><h1>Butt Lab</h1><p>Read the evidence.</p></main>");
  const findings = scanBuiltOutput(dir);
  assert.deepEqual(findings, []);
});

test("scanBuiltOutput inspects decoded Pagefind fragment text for real leaks", (t) => {
  const dir = tempDir(t);
  write(dir, "pagefind/fragment/en_sample.pf_fragment", gzipSync("pagefind_dcd" + JSON.stringify({
    content: "built at C:\\Users\\someone\\butt-lab; see state/session-log.md",
  })));
  assert.deepEqual(codes(scanBuiltOutput(dir)).sort(), ["REPOSITORY_PATH_LEAK", "REPOSITORY_PATH_LEAK", "SESSION_LOG_REFERENCE"]);
});

test("scanBuiltOutput scans Pagefind index strings but not arbitrary bytes", (t) => {
  const dir = tempDir(t);
  const index = "pagefind/index/en_sample.pf_index";
  const header = Buffer.from("pagefind_dcd");
  write(dir, index, gzipSync(Buffer.concat([header, cbor.encode([["reader", [21, 18, 1], Buffer.from(" J:/Y")]])])));
  assert.deepEqual(scanBuiltOutput(dir), []);
  write(dir, index, gzipSync(Buffer.concat([header, cbor.encode([["/home/user/local", [1]]])])));
  assert.deepEqual(codes(scanBuiltOutput(dir)), ["REPOSITORY_PATH_LEAK"]);
});

test("scanBuiltOutput blocks an unreadable Pagefind file", (t) => {
  const dir = tempDir(t);
  write(dir, "pagefind/fragment/en_bad.pf_fragment", "not a search fragment");
  assert.deepEqual(codes(scanBuiltOutput(dir)), ["UNREADABLE_BUILT_OUTPUT"]);
});

// --- rights -----------------------------------------------------------------

test("auditRights blocks a link-only source that carries a local derivative", (t) => {
  const findings = auditRights([
    source({ derivatives: [{ id: "d1", title: "copy", kind: "pdf", qualityNote: "" }] }),
  ]);
  assert.ok(codes(findings).includes("RIGHTS_DERIVATIVE_CONFLICT"), codes(findings).join(","));
  assert.equal(findings[0]?.severity, "blocking");
});

test("auditRights blocks a source whose rights are unresolved", (t) => {
  const findings = auditRights([source({ rights: "rights-unresolved" })]);
  assert.ok(codes(findings).includes("RIGHTS_UNRESOLVED"), codes(findings).join(","));
});

test("auditRights passes the published bundle", (t) => {
  const findings = auditRights(bundleRecords());
  assert.deepEqual(findings, []);
});

// --- scientific discipline --------------------------------------------------

test("auditScientific blocks a scored assessment with no rationale", (t) => {
  const findings = auditScientific([
    {
      id: "assessment-x",
      kind: "assessment",
      status: "scored",
      score: 3,
      label: "Moderate",
      basis: "inference",
      rubricVersion: "v1",
      reviewDate: "2026-01-01",
      reviewer: "test",
      supportingClaimIds: [],
      conflictingClaimIds: [],
      publicationState: "approved",
    } as unknown as BundleRecordLike,
  ]);
  assert.ok(codes(findings).includes("ASSESSMENT_RATIONALE_MISSING"), codes(findings).join(","));
});

test("auditScientific blocks an unknown assessment with no stated reason", (t) => {
  const findings = auditScientific([
    {
      id: "assessment-y",
      kind: "assessment",
      status: "unknown",
      rubricVersion: "v1",
      reviewDate: "2026-01-01",
      reviewer: "test",
      supportingClaimIds: [],
      conflictingClaimIds: [],
      publicationState: "approved",
    } as unknown as BundleRecordLike,
  ]);
  assert.ok(codes(findings).includes("ASSESSMENT_UNKNOWN_REASON_MISSING"), codes(findings).join(","));
});

test("auditScientific blocks a hypothesis that claims validation it does not have", (t) => {
  const findings = auditScientific([
    {
      id: "hypothesis-x",
      kind: "hypothesis",
      evidenceState: "derived-from-sourced-premises",
      validationState: "validated",
      contentKind: "hypothesis",
      assumptions: ["a"],
      failureModes: ["f"],
      falsifiers: ["x"],
      unresolvedDependencies: ["d"],
      sourceInputIds: [],
      publicationState: "approved",
    } as unknown as BundleRecordLike,
  ]);
  assert.ok(codes(findings).includes("HYPOTHESIS_VALIDATION_STATE"), codes(findings).join(","));
});

test("auditScientific blocks a hypothesis with no falsifiers", (t) => {
  const findings = auditScientific([
    {
      id: "hypothesis-y",
      kind: "hypothesis",
      evidenceState: "derived-from-sourced-premises",
      validationState: "new-unvalidated-hypothesis",
      contentKind: "hypothesis",
      assumptions: ["a"],
      failureModes: ["f"],
      falsifiers: [],
      unresolvedDependencies: ["d"],
      sourceInputIds: [],
      publicationState: "approved",
    } as unknown as BundleRecordLike,
  ]);
  assert.ok(codes(findings).includes("HYPOTHESIS_SECTION_MISSING"), codes(findings).join(","));
});

test("auditScientific blocks a dangling cross-reference", (t) => {
  const findings = auditScientific([
    {
      id: "assessment-z",
      kind: "assessment",
      status: "scored",
      score: 2,
      label: "Limited",
      basis: "inference",
      rationale: "Because of the cited claim.",
      rubricVersion: "v1",
      reviewDate: "2026-01-01",
      reviewer: "test",
      supportingClaimIds: ["claim-that-does-not-exist"],
      conflictingClaimIds: [],
      publicationState: "approved",
    } as unknown as BundleRecordLike,
  ]);
  assert.ok(codes(findings).includes("DANGLING_REFERENCE"), codes(findings).join(","));
});

test("auditScientific passes the published bundle", (t) => {
  const findings = auditScientific(bundleRecords());
  assert.deepEqual(findings, [], findings.map((finding) => finding.message).join(" | "));
});

// --- forbidden declarations -------------------------------------------------

test("auditDeclarations flags a positive safety declaration", (t) => {
  const findings = auditDeclarations([
    {
      id: "claim-x",
      kind: "claim",
      proposition: "This recycling route is safe for routine household use.",
      publicationState: "approved",
    } as unknown as BundleRecordLike,
  ]);
  assert.ok(codes(findings).includes("FORBIDDEN_DECLARATION"), codes(findings).join(","));
  assert.equal(findings[0]?.severity, "review");
});

test("auditDeclarations does not flag a negated statement", (t) => {
  const findings = auditDeclarations([
    {
      id: "claim-y",
      kind: "claim",
      proposition: "This recycling route is not safe for routine household use.",
      publicationState: "approved",
    } as unknown as BundleRecordLike,
  ]);
  assert.deepEqual(findings, []);
});

test("auditDeclarations finds nothing in the published bundle", (t) => {
  const findings = auditDeclarations(bundleRecords());
  assert.deepEqual(findings, [], findings.map((finding) => finding.message).join(" | "));
});

// --- accessibility ----------------------------------------------------------

test("the build produced a dist directory", (t) => {
  assert.ok(fs.existsSync(dist), "dist/ is missing — run npm run build before the release audit");
});

test("auditAccessibility finds no page missing its language, title, skip link or landmarks", (t) => {
  const findings = auditAccessibility({ distRoot: dist, cssSources: [tokensCss, baseCss] });
  const structural = findings.filter((finding) =>
    [
      "PAGE_LANG_MISSING",
      "PAGE_TITLE_MISSING",
      "PAGE_SKIP_LINK_MISSING",
      "PAGE_MAIN_LANDMARK_MISSING",
      "PAGE_NAV_LANDMARK_MISSING",
      "STATUS_NOT_CONVEYRED_IN_TEXT",
    ].includes(finding.code),
  );
  assert.deepEqual(structural, [], structural.map((finding) => finding.message).join(" | "));
});

test("auditAccessibility requires focus-visible styling and a reduced-motion block", (t) => {
  const dir = tempDir(t);
  write(dir, "page.html", "<html lang=\"en\"><title>t</title></html>");
  const css = write(dir, "style.css", "body { color: var(--ink); }");
  const findings = auditAccessibility({ distRoot: dir, cssSources: [tokensCss, css] });
  const codesFound = codes(findings);
  assert.ok(codesFound.includes("FOCUS_VISIBLE_MISSING"), codesFound.join(","));
  assert.ok(codesFound.includes("REDUCED_MOTION_MISSING"), codesFound.join(","));
});

test("auditAccessibility flags text below the AA contrast threshold", (t) => {
  const dir = tempDir(t);
  write(dir, "page.html", "<html lang=\"en\"><title>t</title></html>");
  const css = write(
    dir,
    "style.css",
    ":root { --faint: #7b8490; --paper: #f3efe7; }\n.small { color: var(--faint); background: var(--paper); font-size: 0.72rem; }\n",
  );
  const findings = auditAccessibility({ distRoot: dir, cssSources: [css] });
  assert.ok(codes(findings).includes("CONTRAST_BELOW_AA"), codes(findings).join(","));
});

// --- aggregate --------------------------------------------------------------

test("runReleaseAudit fails when a blocking finding is present", (t) => {
  const dir = tempDir(t);
  write(dir, "index.html", "<p>state/session-log.md</p>");
  const report = runReleaseAudit({
    distRoot: dir,
    records: bundleRecords(),
    cssSources: [tokensCss, baseCss],
  });
  assert.equal(report.passed, false);
  assert.ok(report.counts.blocking > 0);
  assert.ok(report.findings.some((finding) => finding.code === "SESSION_LOG_REFERENCE"));
});

test("runReleaseAudit counts what it inspected", (t) => {
  const report = runReleaseAudit({
    distRoot: dist,
    records: bundleRecords(),
    cssSources: [tokensCss, baseCss],
  });
  assert.equal(report.counts.records, bundleRecords().length);
  assert.equal(report.counts.blocking + report.counts.review, report.findings.length);
  assert.equal(report.passed, report.counts.blocking === 0);
});


test("the release audit rejects unlisted, malformed or missing shelf PDFs", (t) => {
  const dir = tempDir(t);
  const payload = "%PDF-1.5\nexample test payload";
  assert.deepEqual(codes(auditPublicPdfs(dir, ["example-paper"])), ["PUBLIC_PDF_INVALID"], "missing PDF");
  write(dir, "documents/example-paper.pdf", payload);
  assert.deepEqual(auditPublicPdfs(dir, ["example-paper"]), []);
  write(dir, "documents/example-paper.pdf", "not a PDF");
  assert.equal(auditPublicPdfs(dir, ["example-paper"]).length, 1);
  write(dir, "documents/example-paper.pdf", payload);
  write(dir, "unlisted.pdf", payload);
  assert.equal(auditPublicPdfs(dir, ["example-paper"]).length, 1);
});
