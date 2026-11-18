// Writes the deployment request as JSON.
//
// The workflow inputs are untrusted strings. They are validated here against
// strict identifier patterns and written with JSON.stringify, so no input can
// ever become shell source. The workflow passes them through environment
// variables and runs this file; it never interpolates them into a script.
import fs from "node:fs";

export interface DeployInputs {
  approvedCommit: string;
  publicationVersion: string;
  buildRunId: string;
  artifactSha256: string;
}

export interface DeploymentRequest {
  approvedCommit: string;
  publicationVersion: string;
  buildRunId: string;
  artifactSha256: string;
}

export interface DeploymentRequestResult {
  request: DeploymentRequest | undefined;
  problems: string[];
}

/** A commit is a lower-case hexadecimal object name, short or full. */
const COMMIT_PATTERN = /^[0-9a-f]{7,40}$/;
/** A publication version is a lower-case dotted identifier. */
const VERSION_PATTERN = /^[a-z0-9][a-z0-9.-]*$/;
/** A build run is a GitHub Actions run id: digits only. */
const BUILD_RUN_PATTERN = /^[0-9]+$/;
/** An artifact hash is a SHA-256 digest. */
const SHA256_PATTERN = /^[0-9a-f]{64}$/;

/**
 * Check every input against its pattern. An empty list means the inputs are
 * safe to write; a non-empty list names every problem that must be fixed.
 */
export function validateDeployInputs(values: Partial<DeployInputs>): string[] {
  const problems: string[] = [];

  const commit = values.approvedCommit;
  if (typeof commit !== "string" || !COMMIT_PATTERN.test(commit)) {
    problems.push(
      "approvedCommit must be 7 to 40 lower-case hexadecimal characters, the commit the operator approved.",
    );
  }

  const version = values.publicationVersion;
  if (typeof version !== "string" || !VERSION_PATTERN.test(version)) {
    problems.push(
      "publicationVersion must be a lower-case identifier such as batch-02-pilot.",
    );
  }

  const buildRunId = values.buildRunId;
  if (typeof buildRunId !== "string" || !BUILD_RUN_PATTERN.test(buildRunId)) {
    problems.push("buildRunId must be the digits of the build run id.");
  }

  const artifactSha256 = values.artifactSha256;
  if (typeof artifactSha256 !== "string" || !SHA256_PATTERN.test(artifactSha256)) {
    problems.push("artifactSha256 must be the 64 lower-case hexadecimal characters of the artifact hash.");
  }

  return problems;
}

/**
 * Build the deployment request. The request exists only when every input is
 * valid; otherwise nothing is written and the problems are returned.
 */
export function buildDeploymentRequest(
  values: Partial<DeployInputs>,
): DeploymentRequestResult {
  const problems = validateDeployInputs(values);
  if (problems.length > 0) {
    return { request: undefined, problems };
  }
  return {
    request: {
      approvedCommit: values.approvedCommit as string,
      publicationVersion: values.publicationVersion as string,
      buildRunId: values.buildRunId as string,
      artifactSha256: values.artifactSha256 as string,
    },
    problems: [],
  };
}

if (import.meta.filename === process.argv[1]) {
  const target = process.argv[2] ?? "deployment-request.json";
  const built = buildDeploymentRequest({
    approvedCommit: process.env.APPROVED_COMMIT ?? "",
    publicationVersion: process.env.PUBLICATION_VERSION ?? "",
    buildRunId: process.env.BUILD_RUN_ID ?? "",
    artifactSha256: process.env.ARTIFACT_SHA256 ?? "",
  });

  if (built.request === undefined) {
    for (const problem of built.problems) {
      console.error(`REQUEST_REFUSED: ${problem}`);
    }
    console.error("REQUEST_REFUSED: nothing was written.");
    process.exit(1);
  }

  fs.writeFileSync(target, `${JSON.stringify(built.request, null, 2)}\n`, "utf8");
  console.log(
    `REQUEST written=${target} commit=${built.request.approvedCommit} version=${built.request.publicationVersion} run=${built.request.buildRunId} artifact=${built.request.artifactSha256}`,
  );
}
