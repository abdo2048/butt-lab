import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import {
  mkdtempSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";

import { parse, stringify } from "yaml";

import { generatedSchemas } from "../src/model/index.ts";
import { createValidFixture, copyRubricsToFixture, RUBRICS_SOURCE_PATH } from "./helpers.ts";

const EXPECTED_SCHEMA_FILES = [
  "content-record.schema.json",
  "publication-manifest.schema.json",
  "rubric-catalog.schema.json",
] as const;

function sortJson(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(sortJson);
  }

  if (value !== null && typeof value === "object") {
    return Object.fromEntries(
      Object.keys(value)
        .sort()
        .map((key) => [
          key,
          sortJson((value as Record<string, unknown>)[key]),
        ]),
    );
  }

  return value;
}

function runCli(...args: string[]) {
  return spawnSync(process.execPath, ["src/cli.ts", ...args], {
    cwd: new URL("..", import.meta.url),
    encoding: "utf8",
  });
}

test("--help lists the available commands", () => {
  const result = runCli("--help");

  assert.equal(result.status, 0);
  assert.match(result.stdout, /schema/);
  assert.match(result.stdout, /validate/);
  assert.match(result.stdout, /export/);
});

test("unknown command reports a stable error", () => {
  const result = runCli("unknown");

  assert.equal(result.status, 2);
  assert.match(result.stderr, /CLI_UNKNOWN_COMMAND/);
});

test("schema writes the complete deterministic generated contract", () => {
  const outputDirectory = mkdtempSync(join(tmpdir(), "publication-contract-"));

  try {
    const firstResult = runCli("schema", "--out", outputDirectory);
    assert.equal(firstResult.status, 0, firstResult.stderr);
    assert.deepEqual(readdirSync(outputDirectory).sort(), EXPECTED_SCHEMA_FILES);

    const firstOutputs = new Map<string, string>();
    for (const filename of EXPECTED_SCHEMA_FILES) {
      const expected = `${JSON.stringify(
        sortJson(generatedSchemas[filename]),
        null,
        2,
      )}\n`;
      const actual = readFileSync(join(outputDirectory, filename), "utf8");
      assert.equal(actual, expected);
      firstOutputs.set(filename, actual);
    }

    writeFileSync(
      join(outputDirectory, "content-record.schema.json"),
      "stale\n",
      "utf8",
    );

    const secondResult = runCli("schema", "--out", outputDirectory);
    assert.equal(secondResult.status, 0, secondResult.stderr);
    assert.deepEqual(readdirSync(outputDirectory).sort(), EXPECTED_SCHEMA_FILES);
    for (const filename of EXPECTED_SCHEMA_FILES) {
      const actual = readFileSync(join(outputDirectory, filename), "utf8");
      assert.equal(actual, firstOutputs.get(filename));
    }
  } finally {
    rmSync(outputDirectory, { force: true, recursive: true });
  }
});

test("validate CLI on valid fixture exits 0 and prints exact count summary", async () => {
  const tempDir = mkdtempSync(join(tmpdir(), "publication-contract-"));
  try {
    await createValidFixture(tempDir);
    const result = runCli("validate", "--root", tempDir);
    assert.equal(result.status, 0);
    // Valid fixture may have warnings from semantic validation but no errors
    assert.ok(!result.stderr.includes("ERROR"), "Should have no errors");
    // Should output VALID summary to stdout
    assert.match(result.stdout.trim(), /^VALID records=9 pages=1 assets=0$/);
  } finally {
    rmSync(tempDir, { force: true, recursive: true });
  }
});

test("validate CLI on malformed YAML exits 1 and prints YAML_PARSE_ERROR", async () => {
  const tempDir = mkdtempSync(join(tmpdir(), "publication-contract-"));
  try {
    // Create a valid fixture first
    await createValidFixture(tempDir);
    // Corrupt the manifest.yaml
    writeFileSync(join(tempDir, "manifest.yaml"), "invalid: yaml: :", "utf8");
    const result = runCli("validate", "--root", tempDir);
    assert.equal(result.status, 1);
    assert.match(result.stderr, /YAML_PARSE_ERROR/);
  } finally {
    rmSync(tempDir, { force: true, recursive: true });
  }
});

test("validate CLI on wrong manifest hash exits 1 and prints MANIFEST_HASH_MISMATCH", async () => {
  const tempDir = mkdtempSync(join(tmpdir(), "publication-contract-"));
  try {
    await createValidFixture(tempDir);
    // Modify a record file without updating manifest hash
    const recordPath = join(tempDir, "records", "materials", "cigarette-butts.yaml");
    const content = readFileSync(recordPath, "utf8");
    writeFileSync(recordPath, content + "\n# corrupted\n", "utf8");
    const result = runCli("validate", "--root", tempDir);
    assert.equal(result.status, 1);
    assert.match(result.stderr, /MANIFEST_HASH_MISMATCH/);
  } finally {
    rmSync(tempDir, { force: true, recursive: true });
  }
});

test("validate CLI on source-supported claim without locator exits 1 and prints CLAIM_LOCATOR_REQUIRED", async () => {
  const tempDir = mkdtempSync(join(tmpdir(), "publication-contract-"));
  try {
    await createValidFixture(tempDir);
    // Modify the claim to remove locator
    const claimPath = join(tempDir, "records", "claims", "example-mechanism-claim.yaml");
    const content = readFileSync(claimPath, "utf8");
    const modified = content.replace(/locator: .*/, "");
    writeFileSync(claimPath, modified, "utf8");
    // Update manifest hash for this file
    const { sha256File } = await import("../src/load.ts");
    const manifestPath = join(tempDir, "manifest.yaml");
    const manifestContent = readFileSync(manifestPath, "utf8");
    const manifest = parse(manifestContent);
    manifest.records.find((r: { id: string }) => r.id === "example-mechanism-claim").sha256 = await sha256File(claimPath);
    writeFileSync(manifestPath, stringify(manifest), "utf8");
    const result = runCli("validate", "--root", tempDir);
    assert.equal(result.status, 1);
    assert.match(result.stderr, /CLAIM_LOCATOR_REQUIRED/);
  } finally {
    rmSync(tempDir, { force: true, recursive: true });
  }
});

test("validate CLI without a rubrics catalog exits 1 and prints RUBRICS_REQUIRED", async () => {
  const tempDir = mkdtempSync(join(tmpdir(), "publication-contract-"));
  try {
    await createValidFixture(tempDir);
    // The valid fixture copies the rubrics catalog; remove it so validation
    // cannot silently skip semantic checks.
    rmSync(join(tempDir, "contract", "v1", "rubrics.yaml"), { force: true });
    const result = runCli("validate", "--root", tempDir);
    assert.equal(result.status, 1);
    assert.match(result.stderr, /RUBRICS_REQUIRED/);
    assert.ok(
      !result.stderr.includes("Error:") && !result.stderr.includes("at "),
      "must emit a stable diagnostic, not a stack trace",
    );
  } finally {
    rmSync(tempDir, { force: true, recursive: true });
  }
});

test("validate CLI with a malformed rubrics catalog exits 1 and prints RUBRICS_INVALID", async () => {
  const tempDir = mkdtempSync(join(tmpdir(), "publication-contract-"));
  try {
    await createValidFixture(tempDir);
    writeFileSync(join(tempDir, "contract", "v1", "rubrics.yaml"), "rubricVersion: 1\ncriteria: not-a-list\n", "utf8");
    const result = runCli("validate", "--root", tempDir);
    assert.equal(result.status, 1);
    assert.match(result.stderr, /RUBRICS_INVALID/);
  } finally {
    rmSync(tempDir, { force: true, recursive: true });
  }
});

test("export CLI on a valid fixture exits 0 and prints an EXPORTED summary", async () => {
  const tempDir = mkdtempSync(join(tmpdir(), "publication-contract-"));
  const outputDirectory = mkdtempSync(join(tmpdir(), "publication-export-"));
  try {
    await createValidFixture(tempDir);
    const result = runCli("export", "--root", tempDir, "--out", outputDirectory);
    assert.equal(result.status, 0, result.stderr);
    assert.match(
      result.stdout.trim(),
      /^EXPORTED version=\S+ records=\d+ pages=\d+ assets=\d+ files=\d+$/,
    );
    const exported = readdirSync(outputDirectory);
    assert.ok(exported.includes("records.json"), "records.json must be exported");
    assert.ok(exported.includes("bundle-manifest.json"), "bundle-manifest.json must be exported");
  } finally {
    rmSync(tempDir, { force: true, recursive: true });
    rmSync(outputDirectory, { force: true, recursive: true });
  }
});

test("export CLI on a corrupted manifest exits 1 and prints a diagnostic without a stack trace", async () => {
  const tempDir = mkdtempSync(join(tmpdir(), "publication-contract-"));
  const outputDirectory = mkdtempSync(join(tmpdir(), "publication-export-"));
  try {
    await createValidFixture(tempDir);
    // Modify a record file without updating the manifest hash.
    const recordPath = join(tempDir, "records", "materials", "cigarette-butts.yaml");
    const content = readFileSync(recordPath, "utf8");
    writeFileSync(recordPath, content + "\n# corrupted\n", "utf8");
    const result = runCli("export", "--root", tempDir, "--out", outputDirectory);
    assert.equal(result.status, 1);
    assert.match(result.stderr, /MANIFEST_HASH_MISMATCH/);
    assert.ok(
      !result.stderr.includes("    at "),
      "a contract failure must print a diagnostic, not a stack trace",
    );
    assert.deepEqual(
      readdirSync(outputDirectory),
      [],
      "a failed export must not write into the output directory",
    );
  } finally {
    rmSync(tempDir, { force: true, recursive: true });
    rmSync(outputDirectory, { force: true, recursive: true });
  }
});

test("schema CLI without --out exits 2 and prints CLI_SCHEMA_OUT_REQUIRED", () => {
  const result = runCli("schema");
  assert.equal(result.status, 2);
  assert.match(result.stderr, /CLI_SCHEMA_OUT_REQUIRED/);
});

test("validate CLI without --root exits 2 and prints CLI_VALIDATE_ROOT_REQUIRED", () => {
  const result = runCli("validate");
  assert.equal(result.status, 2);
  assert.match(result.stderr, /CLI_VALIDATE_ROOT_REQUIRED/);
});

test("export CLI without --out exits 2 and prints CLI_EXPORT_ROOT_OUT_REQUIRED", () => {
  const result = runCli("export", "--root", ".");
  assert.equal(result.status, 2);
  assert.match(result.stderr, /CLI_EXPORT_ROOT_OUT_REQUIRED/);
});

test("validate CLI on unsafe raw HTML exits 1 and prints MARKDOWN_RAW_HTML", async () => {
  const tempDir = mkdtempSync(join(tmpdir(), "publication-contract-"));
  try {
    await createValidFixture(tempDir);
    // Add raw HTML to the page
    const pagePath = join(tempDir, "pages", "start-here.md");
    writeFileSync(pagePath, "# Unsafe\n\n<script>alert('xss')</script>\n", "utf8");
    // Update manifest hash
    const { sha256File } = await import("../src/load.ts");
    const manifestPath = join(tempDir, "manifest.yaml");
    const manifestContent = readFileSync(manifestPath, "utf8");
    const manifest = parse(manifestContent);
    manifest.pages[0].sha256 = await sha256File(pagePath);
    writeFileSync(manifestPath, stringify(manifest), "utf8");
    const result = runCli("validate", "--root", tempDir);
    assert.equal(result.status, 1);
    assert.match(result.stderr, /MARKDOWN_RAW_HTML/);
  } finally {
    rmSync(tempDir, { force: true, recursive: true });
  }
});

test("unknown CLI flag exits 2 and prints CLI_INVALID_USAGE", () => {
  const result = runCli("validate", "--unknown-flag");
  assert.equal(result.status, 2);
  assert.match(result.stderr, /CLI_INVALID_USAGE/);
});

test("CLI duplicate flags exit 2 and print CLI_INVALID_USAGE", () => {
  const result = runCli("validate", "--root", "foo", "--root", "bar");
  assert.equal(result.status, 2);
  assert.match(result.stderr, /CLI_INVALID_USAGE/);
});

test("CLI missing flag value exits 2 and prints CLI_INVALID_USAGE", () => {
  const result = runCli("validate", "--root");
  assert.equal(result.status, 2);
  assert.match(result.stderr, /CLI_INVALID_USAGE/);
});

test("CLI positional extras exit 2 and print CLI_INVALID_USAGE", () => {
  const result = runCli("validate", "--root", "foo", "extra");
  assert.equal(result.status, 2);
  assert.match(result.stderr, /CLI_INVALID_USAGE/);
});

test("diagnostics are sorted by path, record ID, and code", async () => {
  const tempDir = mkdtempSync(join(tmpdir(), "publication-contract-"));
  try {
    await createValidFixture(tempDir);
    // Add multiple errors to the same record
    const claimPath = join(tempDir, "records", "claims", "example-mechanism-claim.yaml");
    let content = readFileSync(claimPath, "utf8");
    // Remove locator and add a numeric proposition without quantitative basis
    content = content.replace(/locator: .*/, "");
    content = content.replace(
      /proposition: .*/,
      "proposition: \"The fixture yields 42 g of residue per batch.\""
    );
    writeFileSync(claimPath, content, "utf8");
    // Update manifest hash
    const { sha256File } = await import("../src/load.ts");
    const manifestPath = join(tempDir, "manifest.yaml");
    const manifestContent = readFileSync(manifestPath, "utf8");
    const manifest = parse(manifestContent);
    manifest.records.find((r: { id: string }) => r.id === "example-mechanism-claim").sha256 = await sha256File(claimPath);
    writeFileSync(manifestPath, stringify(manifest), "utf8");
    const result = runCli("validate", "--root", tempDir);
    assert.equal(result.status, 1);
    // Check that ERROR diagnostics are sorted
    const lines = result.stderr.trim().split("\n").filter(line => line.startsWith("ERROR"));
    // They should be sorted by code (CLAIM_LOCATOR_REQUIRED comes before CLAIM_QUANTITATIVE_BASIS_REQUIRED)
    assert.ok(lines.length >= 2, "Should have at least 2 error diagnostics");
    const firstLine = lines[0] ?? "";
    const secondLine = lines[1] ?? "";
    const firstCode = firstLine.split(" ")[1] ?? "";
    const secondCode = secondLine.split(" ")[1] ?? "";
    assert.ok(firstCode <= secondCode, `Error diagnostics not sorted: ${firstCode} > ${secondCode}`);
  } finally {
    rmSync(tempDir, { force: true, recursive: true });
  }
});

test("no stack trace is printed for expected contract errors", async () => {
  const tempDir = mkdtempSync(join(tmpdir(), "publication-contract-"));
  try {
    await createValidFixture(tempDir);
    // Corrupt a record to trigger a contract error
    const recordPath = join(tempDir, "records", "materials", "cigarette-butts.yaml");
    const content = readFileSync(recordPath, "utf8");
    writeFileSync(recordPath, content + "\n# corrupted\n", "utf8");
    const result = runCli("validate", "--root", tempDir);
    assert.equal(result.status, 1);
    // Should not contain stack trace
    assert.ok(!result.stderr.includes("at "), "Stack trace should not be printed for ContractError");
    assert.ok(!result.stderr.includes("Error:"), "Error prefix should not appear");
  } finally {
    rmSync(tempDir, { force: true, recursive: true });
  }
});

test("--json emits JSON object with ok, errors, warnings, and summary", async () => {
  const tempDir = mkdtempSync(join(tmpdir(), "publication-contract-"));
  try {
    await createValidFixture(tempDir);
    const result = runCli("validate", "--root", tempDir, "--json");
    assert.equal(result.status, 0);
    const output = JSON.parse(result.stdout.trim());
    assert.ok(typeof output.ok === "boolean");
    assert.ok(Array.isArray(output.errors));
    assert.ok(Array.isArray(output.warnings));
    assert.ok(typeof output.summary === "object");
    assert.equal(output.ok, true);
  } finally {
    rmSync(tempDir, { force: true, recursive: true });
  }
});

test("--json on validation error includes errors in output", async () => {
  const tempDir = mkdtempSync(join(tmpdir(), "publication-contract-"));
  try {
    await createValidFixture(tempDir);
    // Corrupt a record
    const recordPath = join(tempDir, "records", "materials", "cigarette-butts.yaml");
    const content = readFileSync(recordPath, "utf8");
    writeFileSync(recordPath, content + "\n# corrupted\n", "utf8");
    const result = runCli("validate", "--root", tempDir, "--json");
    assert.equal(result.status, 1);
    const output = JSON.parse(result.stdout.trim());
    assert.ok(typeof output.ok === "boolean");
    assert.ok(Array.isArray(output.errors));
    assert.ok(output.errors.length > 0);
    assert.equal(output.ok, false);
  } finally {
    rmSync(tempDir, { force: true, recursive: true });
  }
});