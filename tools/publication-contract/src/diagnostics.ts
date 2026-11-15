export type Severity = "error" | "warning";

export type Diagnostic = Readonly<{
  code: string;
  severity: Severity;
  message: string;
  path?: string;
  recordId?: string;
}>;

export class ContractError extends Error {
  readonly diagnostics: readonly Diagnostic[];

  constructor(diagnostics: readonly Diagnostic[]) {
    super(diagnostics.map((item) => `${item.code}: ${item.message}`).join("\n"));
    this.name = "ContractError";
    this.diagnostics = diagnostics;
  }
}

export const error = (
  code: string,
  message: string,
  path?: string,
): Diagnostic => ({
  code,
  severity: "error",
  message,
  ...(path === undefined ? {} : { path }),
});

export const warning = (
  code: string,
  message: string,
  path?: string,
): Diagnostic => ({
  code,
  severity: "warning",
  message,
  ...(path === undefined ? {} : { path }),
});

/**
 * Sorts diagnostics deterministically by path, then recordId, then code.
 */
export function sortDiagnostics(
  diagnostics: readonly Diagnostic[],
): readonly Diagnostic[] {
  return [...diagnostics].sort((a, b) => {
    const pathA = a.path ?? "";
    const pathB = b.path ?? "";
    if (pathA !== pathB) return pathA < pathB ? -1 : 1;

    const idA = a.recordId ?? "";
    const idB = b.recordId ?? "";
    if (idA !== idB) return idA < idB ? -1 : 1;

    return a.code < b.code ? -1 : a.code > b.code ? 1 : 0;
  });
}

/**
 * Renders diagnostics as text, one per line.
 * Format: SEVERITY CODE path recordId message
 */
export function renderTextDiagnostics(
  diagnostics: readonly Diagnostic[],
): string {
  const sorted = sortDiagnostics(diagnostics);
  if (sorted.length === 0) return "";

  return (
    sorted
      .map(
        (d) =>
          `${d.severity.toUpperCase()} ${d.code} ${d.path ?? ""} ${d.recordId ?? ""} ${d.message}`,
      )
      .join("\n") + "\n"
  );
}

/**
 * Canonical sorted-key JSON serialization for diagnostics output.
 */
function canonicalJson(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(canonicalJson);
  }

  if (value !== null && typeof value === "object") {
    return Object.fromEntries(
      Object.keys(value as Record<string, unknown>)
        .sort()
        .map((key) => [key, canonicalJson((value as Record<string, unknown>)[key])]),
    );
  }

  return value;
}

/**
 * Renders diagnostics as a JSON object with canonical sorted keys.
 * Format: { ok, errors, warnings, summary }
 */
export function renderJsonDiagnostics(
  diagnostics: readonly Diagnostic[],
  summary?: Record<string, unknown>,
): string {
  const sorted = sortDiagnostics(diagnostics);
  const errors = sorted
    .filter((d) => d.severity === "error")
    .map((d) => ({
      code: d.code,
      message: d.message,
      ...(d.path !== undefined ? { path: d.path } : {}),
      ...(d.recordId !== undefined ? { recordId: d.recordId } : {}),
    }));
  const warnings = sorted
    .filter((d) => d.severity === "warning")
    .map((d) => ({
      code: d.code,
      message: d.message,
      ...(d.path !== undefined ? { path: d.path } : {}),
      ...(d.recordId !== undefined ? { recordId: d.recordId } : {}),
    }));

  const output: Record<string, unknown> = {
    ok: errors.length === 0,
    errors,
    warnings,
    summary: summary ?? { records: 0, pages: 0, assets: 0 },
  };

  return JSON.stringify(canonicalJson(output), null, 2) + "\n";
}
