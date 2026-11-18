// Verifies that the artifact about to be deployed is exactly the one the operator
// approved, and that the request matches the approval record.
//
// This is the release gate. It refuses; it never approves. Deployment happens only
// when this returns zero problems.
import fs from "node:fs";
import path from "node:path";
import {
  ARTIFACT_MANIFEST_NAME,
  artifactManifestHash,
  buildArtifactManifest,
  readArtifactManifest,
  type ArtifactManifest,
} from "./build-artifact.ts";

export interface DeploymentApproval {
  approvedCommit: string;
  publicationVersion: string;
  buildRunId: string;
  artifactSha256: string;
  approvedBy: string;
  approvedOn: string;
}

export interface ApprovalRequest {
  approvedCommit: string;
  publicationVersion: string;
  buildRunId: string;
  artifactSha256: string;
}

export interface PublicationManifestSummary {
  publicationVersion: string;
}

export interface ApprovalResult {
  ok: boolean;
  problems: string[];
}

export interface VerifyApprovalInput {
  approval: DeploymentApproval | undefined | null;
  request: ApprovalRequest;
  artifactRoot: string;
  manifest: PublicationManifestSummary;
}

function isBlank(value: string | undefined): boolean {
  return value === undefined || value.trim().length === 0;
}

/**
 * Two commit names match when one is a prefix of the other, because an
 * operator may approve the short name of the commit the artifact names in
 * full. Both names must be at least seven hexadecimal characters; anything
 * else has to be equal to be accepted.
 */
function commitsMatch(left: string, right: string): boolean {
  if (left === right) {
    return true;
  }
  const short = left.length <= right.length ? left : right;
  const long = left.length <= right.length ? right : left;
  if (!/^[0-9a-f]{7,40}$/.test(short) || !/^[0-9a-f]{7,40}$/.test(long)) {
    return false;
  }
  return long.startsWith(short);
}

export function verifyApproval(input: VerifyApprovalInput): ApprovalResult {
  const problems: string[] = [];
  const { approval, request, artifactRoot, manifest } = input;

  if (approval === undefined || approval === null) {
    problems.push(
      "APPROVAL_RECORD_MISSING: there is no operator approval record for this deployment. The gate refuses every deployment without one.",
    );
    return { ok: false, problems };
  }

  if (isBlank(approval.approvedBy) || isBlank(approval.approvedOn)) {
    problems.push(
      "APPROVAL_RECORD_INCOMPLETE: the approval record names no person and no date, so it is not a real approval.",
    );
  }
  if (request.approvedCommit !== approval.approvedCommit) {
    problems.push(
      `APPROVAL_COMMIT_MISMATCH: the request names commit ${request.approvedCommit} but the operator approved ${approval.approvedCommit}.`,
    );
  }
  if (request.publicationVersion !== approval.publicationVersion) {
    problems.push(
      `APPROVAL_VERSION_MISMATCH: the request names publication ${request.publicationVersion} but the operator approved ${approval.publicationVersion}.`,
    );
  }
  if (manifest.publicationVersion !== approval.publicationVersion) {
    problems.push(
      `APPROVAL_VERSION_MISMATCH: the artifact carries publication ${manifest.publicationVersion} but the operator approved ${approval.publicationVersion}.`,
    );
  }
  if (request.buildRunId !== approval.buildRunId) {
    problems.push(
      `APPROVAL_BUILD_RUN_MISMATCH: the request names build run ${request.buildRunId} but the operator approved ${approval.buildRunId}.`,
    );
  }
  if (request.artifactSha256 !== approval.artifactSha256) {
    problems.push(
      `APPROVAL_ARTIFACT_MISMATCH: the request names artifact ${request.artifactSha256} but the operator approved ${approval.artifactSha256}.`,
    );
  }

  const manifestPath = path.join(artifactRoot, ARTIFACT_MANIFEST_NAME);
  if (!fs.existsSync(manifestPath)) {
    problems.push(
      `APPROVAL_ARTIFACT_MANIFEST_MISSING: ${ARTIFACT_MANIFEST_NAME} is not in the artifact, so the artifact cannot be identified.`,
    );
    return { ok: false, problems };
  }

  let declared: ArtifactManifest;
  try {
    declared = readArtifactManifest(artifactRoot);
  } catch (error) {
    problems.push(
      `APPROVAL_ARTIFACT_MANIFEST_UNREADABLE: ${ARTIFACT_MANIFEST_NAME} could not be read (${
        error instanceof Error ? error.message : String(error)
      }).`,
    );
    return { ok: false, problems };
  }

  const actual = buildArtifactManifest(artifactRoot, {
    publicationVersion: declared.publicationVersion,
    sourceCommit: declared.sourceCommit,
  });

  // The manifest declares which commit and which publication version the
  // artifact was built from. That declaration is untrusted, so it must match
  // the operator's approval record: otherwise an artifact built from another
  // commit would pass every other check.
  if (!commitsMatch(declared.sourceCommit, approval.approvedCommit)) {
    problems.push(
      `APPROVAL_ARTIFACT_COMMIT_MISMATCH: the artifact was built from commit ${declared.sourceCommit} but the operator approved ${approval.approvedCommit}.`,
    );
  }
  if (declared.publicationVersion !== approval.publicationVersion) {
    problems.push(
      `APPROVAL_ARTIFACT_VERSION_MISMATCH: the artifact was built for publication ${declared.publicationVersion} but the operator approved ${approval.publicationVersion}.`,
    );
  }

  const declaredByPath = new Map(declared.files.map((file) => [file.path, file.sha256]));
  const actualByPath = new Map(actual.files.map((file) => [file.path, file.sha256]));
  for (const file of actual.files) {
    const expected = declaredByPath.get(file.path);
    if (expected === undefined) {
      problems.push(
        `APPROVAL_ARTIFACT_EXTRA_FILE: ${file.path} is in the artifact but not in the approved manifest.`,
      );
    } else if (expected !== file.sha256) {
      problems.push(
        `APPROVAL_ARTIFACT_FILE_MISMATCH: ${file.path} has hash ${file.sha256} but the approved manifest says ${expected}.`,
      );
    }
  }
  for (const file of declared.files) {
    if (!actualByPath.has(file.path)) {
      problems.push(
        `APPROVAL_ARTIFACT_FILE_MISSING: ${file.path} is in the approved manifest but not in the artifact.`,
      );
    }
  }

  const recomputedHash = artifactManifestHash(actual);
  if (recomputedHash !== approval.artifactSha256) {
    problems.push(
      `APPROVAL_ARTIFACT_NOT_THE_APPROVED_ONE: the artifact hashes to ${recomputedHash} but the operator approved ${approval.artifactSha256}.`,
    );
  }

  return { ok: problems.length === 0, problems };
}

function readJson(file: string): unknown {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

if (import.meta.filename === process.argv[1]) {
  const args = process.argv.slice(2);
  const read = (name: string): string | undefined => {
    const index = args.indexOf(`--${name}`);
    return index === -1 ? undefined : args[index + 1];
  };
  const approvalPath = read("approval");
  const requestPath = read("request");
  const artifactRoot = read("artifact") ?? "artifact";
  const manifestPath = read("manifest") ?? path.join(artifactRoot, "bundle-manifest.json");

  if (approvalPath === undefined || requestPath === undefined) {
    console.error("usage: verify-approval --approval <file> --request <file> --artifact <dir> [--manifest <file>]");
    process.exit(2);
  }

  const approvalFile = fs.existsSync(approvalPath)
    ? (readJson(approvalPath) as DeploymentApproval | null)
    : null;
  const request = readJson(requestPath) as ApprovalRequest;
  const bundleManifest = readJson(manifestPath) as PublicationManifestSummary;

  const result = verifyApproval({
    approval: approvalFile,
    request,
    artifactRoot,
    manifest: { publicationVersion: bundleManifest.publicationVersion },
  });

  if (!result.ok) {
    for (const problem of result.problems) {
      console.error(problem);
    }
    console.error(`REFUSED: ${result.problems.length} problem(s). Nothing was deployed.`);
    process.exit(1);
  }
  console.log(
    `APPROVED: commit=${request.approvedCommit} version=${request.publicationVersion} run=${request.buildRunId} artifact=${request.artifactSha256}`,
  );
}
