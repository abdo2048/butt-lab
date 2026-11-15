import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

import {
  ContractError,
  error,
  renderJsonDiagnostics,
  renderTextDiagnostics,
  sortDiagnostics,
} from "./diagnostics.ts";
import { loadAndValidateManifest } from "./manifest-validation.ts";
import { generatedSchemas } from "./model/index.ts";
import { exportPublication } from "./export.ts";
import { validatePublicationSemantics } from "./semantic-validation.ts";
import type { RubricCatalog } from "./model/index.ts";
import { RubricCatalogSchema } from "./model/index.ts";
import { parse } from "yaml";
import { readFile } from "node:fs/promises";

const HELP = `Usage: publication-contract <command> [options]

Commands:
  schema    Generate publication contract schemas
  validate  Validate publication content
  export    Export publication content
`;

export type Command = "schema" | "validate" | "export";

export interface CommandArgs {
  flags: Record<string, string>;
  positional: string[];
}

export interface Io {
  stdout: (data: string) => void;
  stderr: (data: string) => void;
}

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

async function writeSchemas(outputDirectory: string): Promise<void> {
  await mkdir(outputDirectory, { recursive: true });

  for (const [filename, schema] of Object.entries(generatedSchemas)) {
    const contents = `${JSON.stringify(sortJson(schema), null, 2)}\n`;
    await writeFile(join(outputDirectory, filename), contents, "utf8");
  }
}

/** Parses command-line arguments into structured CommandArgs. */
export function parseArgs(args: string[]): CommandArgs {
  const flags: Record<string, string> = {};
  const positional: string[] = [];
  let expectingValueFor: string | null = null;

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === undefined) {
      continue;
    }

    if (expectingValueFor !== null) {
      flags[expectingValueFor] = arg;
      expectingValueFor = null;
      continue;
    }

    if (arg.startsWith("--")) {
      const flagName = arg.slice(2);
      if (flagName in flags) {
        throw new Error(`CLI_INVALID_USAGE: duplicate flag --${flagName}`);
      }
      // Flags that take a value
      if (flagName === "out" || flagName === "root") {
        const nextArg = args[i + 1];
        if (i + 1 >= args.length || (nextArg !== undefined && nextArg.startsWith("--"))) {
          throw new Error(`CLI_INVALID_USAGE: missing value for --${flagName}`);
        }
        expectingValueFor = flagName;
      } else if (flagName === "json") {
        // Boolean flag - set to empty string to indicate presence
        flags[flagName] = "";
      } else {
        throw new Error(`CLI_INVALID_USAGE: unknown flag --${flagName}`);
      }
    } else {
      positional.push(arg);
    }
  }

  if (expectingValueFor !== null) {
    throw new Error(`CLI_INVALID_USAGE: missing value for --${expectingValueFor}`);
  }

  return { flags, positional };
}

/** Validates that no positional extras are present. */
export function validateNoPositional(positional: string[]): void {
  if (positional.length > 0) {
    throw new Error(`CLI_INVALID_USAGE: unexpected positional arguments: ${positional.join(" ")}`);
  }
}

export async function main(
  args: string[],
  io: Io,
): Promise<number> {
  const command = args[0];

  if (command === "--help" || command === "-h") {
    io.stdout(HELP);
    return 0;
  }

  if (command !== "schema" && command !== "validate" && command !== "export") {
    io.stderr(`CLI_UNKNOWN_COMMAND: ${command ?? ""}\n`);
    return 2;
  }

  const restArgs = args.slice(1);

  try {
    const { flags, positional } = parseArgs(restArgs);

    switch (command) {
      case "schema": {
        const out = flags.out;
        if (out === undefined) {
          io.stderr("CLI_SCHEMA_OUT_REQUIRED\n");
          return 2;
        }
        validateNoPositional(positional);
        await writeSchemas(out);
        return 0;
      }

      case "validate": {
        const root = flags.root;
        if (root === undefined) {
          io.stderr("CLI_VALIDATE_ROOT_REQUIRED\n");
          return 2;
        }
        validateNoPositional(positional);
        const jsonMode = flags.json !== undefined;

        try {
          const loaded = await loadAndValidateManifest(root);

          // Run semantic validation. The rubrics catalog is mandatory: without
          // it no semantic checks run and the result would be a false VALID.
          const rubricsPath = join(root, "contract", "v1", "rubrics.yaml");
          let rubricsYaml: string;
          try {
            rubricsYaml = await readFile(rubricsPath, "utf8");
          } catch (caught) {
            throw new ContractError([
              error(
                "RUBRICS_REQUIRED",
                "A rubrics catalog is required for semantic validation but was not found.",
                rubricsPath,
              ),
            ]);
          }
          const rubricsResult = RubricCatalogSchema.safeParse(parse(rubricsYaml));
          if (!rubricsResult.success) {
            throw new ContractError([
              error(
                "RUBRICS_INVALID",
                `The rubrics catalog does not match RubricCatalogSchema: ${rubricsResult.error.message}`,
                rubricsPath,
              ),
            ]);
          }
          const semanticResult = validatePublicationSemantics(loaded, rubricsResult.data);

          const hasErrors = semanticResult.diagnostics.some(d => d.severity === "error");
          const hasWarnings = semanticResult.diagnostics.some(d => d.severity === "warning");

          if (jsonMode) {
            io.stdout(
              renderJsonDiagnostics(semanticResult.diagnostics, {
                records: loaded.records.size,
                pages: loaded.pages.size,
                assets: loaded.assets.size,
              }),
            );
          } else {
            // Output errors to stderr if any
            if (hasErrors) {
              const errorDiagnostics = semanticResult.diagnostics.filter(d => d.severity === "error");
              io.stderr(renderTextDiagnostics(errorDiagnostics));
            }
            // Output warnings to stderr if any
            if (hasWarnings) {
              const warningDiagnostics = semanticResult.diagnostics.filter(d => d.severity === "warning");
              io.stderr(renderTextDiagnostics(warningDiagnostics));
            }
            // Output VALID message to stdout when no errors
            if (!hasErrors) {
              io.stdout(
                `VALID records=${loaded.records.size} pages=${loaded.pages.size} assets=${loaded.assets.size}\n`,
              );
            }
          }

          // Exit with error code if there are any error diagnostics
          return hasErrors ? 1 : 0;
        } catch (caught) {
          if (!(caught instanceof ContractError)) {
            throw caught;
          }
          const diagnostics = sortDiagnostics(caught.diagnostics);
          if (jsonMode) {
            io.stdout(renderJsonDiagnostics(diagnostics));
          } else {
            io.stderr(renderTextDiagnostics(diagnostics));
          }
          return 1;
        }
      }

      case "export": {
        const root = flags.root;
        const out = flags.out;
        if (root === undefined || out === undefined) {
          io.stderr("CLI_EXPORT_ROOT_OUT_REQUIRED\n");
          return 2;
        }
        validateNoPositional(positional);

        try {
          const rubricsPath = join(root, "contract", "v1", "rubrics.yaml");
          const summary = await exportPublication({ root, output: out, rubricsPath });
          io.stdout(
            `EXPORTED version=${summary.publicationVersion} records=${summary.recordCount} pages=${summary.pageCount} assets=${summary.assetCount} files=${summary.outputFiles.length}\n`,
          );
          return 0;
        } catch (caught) {
          if (!(caught instanceof ContractError)) {
            throw caught;
          }
          const diagnostics = sortDiagnostics(caught.diagnostics);
          io.stderr(renderTextDiagnostics(diagnostics));
          return 1;
        }
      }

      default:
        // Unreachable today: the command guard above admits only the three
        // commands handled here. Kept fail-closed and uses the same canonical
        // code as the guard so there is exactly one "unknown command" outcome.
        io.stderr(`CLI_UNKNOWN_COMMAND: ${command}\n`);
        return 2;
    }
  } catch (caught) {
    if (caught instanceof Error && caught.message.startsWith("CLI_INVALID_USAGE")) {
      io.stderr(`${caught.message}\n`);
      return 2;
    }
    throw caught;
  }
}

// Thin process entrypoint
const processExitCode = await main(process.argv.slice(2), {
  stdout: process.stdout.write.bind(process.stdout),
  stderr: process.stderr.write.bind(process.stderr),
});
process.exit(processExitCode);