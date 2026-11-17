import { createHash } from "node:crypto";
import { createReadStream } from "node:fs";
import { readFile } from "node:fs/promises";

import { isScalar, parseDocument, visit } from "yaml";

import { ContractError, error } from "./diagnostics.ts";

export async function loadYaml(path: string): Promise<unknown> {
  const contents = await readFile(path, "utf8");
  return loadYamlText(contents, path);
}

export function loadYamlText(contents: string, path?: string): unknown {
  const document = parseDocument(contents, { uniqueKeys: true });

  if (document.errors.length > 0) {
    throw new ContractError(
      document.errors.map((parserError) =>
        error(
          /duplicate|unique/i.test(parserError.message)
            ? "YAML_DUPLICATE_KEY"
            : "YAML_PARSE_ERROR",
          parserError.message,
          path,
        )
      ),
    );
  }

  visit(document, {
    Pair(_key, pair) {
      if (!isScalar(pair.key) || typeof pair.key.value !== "string") {
        throw new ContractError([
          error(
            "YAML_NON_STRING_KEY",
            "YAML mapping keys must be scalar strings.",
            path,
          ),
        ]);
      }
    },
  });

  try {
    return document.toJS({ maxAliasCount: 0 }) as unknown;
  } catch (conversionError) {
    const message = conversionError instanceof Error
      ? conversionError.message
      : String(conversionError);
    throw new ContractError([error("YAML_PARSE_ERROR", message, path)]);
  }
}

export async function loadMarkdown(path: string): Promise<string> {
  return readFile(path, "utf8");
}

export async function sha256File(path: string): Promise<string> {
  const hash = createHash("sha256");

  for await (const chunk of createReadStream(path)) {
    hash.update(chunk);
  }

  return hash.digest("hex");
}

export function sha256Bytes(bytes: Uint8Array): string {
  return createHash("sha256").update(bytes).digest("hex");
}

function invalidCanonicalJson(message: string): never {
  throw new ContractError([
    error("CANONICAL_JSON_INVALID_VALUE", message),
  ]);
}

function serializeJson(
  value: unknown,
  depth: number,
  ancestors: Set<object>,
): string {
  if (value === null) {
    return "null";
  }

  if (typeof value === "string" || typeof value === "boolean") {
    return JSON.stringify(value);
  }

  if (typeof value === "number") {
    if (!Number.isFinite(value)) {
      invalidCanonicalJson("Canonical JSON numbers must be finite.");
    }
    return JSON.stringify(value);
  }

  if (typeof value !== "object") {
    invalidCanonicalJson(`Canonical JSON does not support ${typeof value} values.`);
  }

  if (ancestors.has(value)) {
    invalidCanonicalJson("Canonical JSON does not support cyclic values.");
  }

  ancestors.add(value);
  try {
    const currentIndent = "  ".repeat(depth);
    const childIndent = "  ".repeat(depth + 1);

    if (Array.isArray(value)) {
      const allowedKeys = new Set<string>(["length"]);
      const items: string[] = [];
      for (let index = 0; index < value.length; index += 1) {
        if (!Object.hasOwn(value, index)) {
          invalidCanonicalJson("Canonical JSON arrays may not be sparse.");
        }
        allowedKeys.add(String(index));
        items.push(serializeJson(value[index], depth + 1, ancestors));
      }

      if (
        Reflect.ownKeys(value).some((key) =>
          typeof key !== "string" || !allowedKeys.has(key)
        )
      ) {
        invalidCanonicalJson("Canonical JSON arrays may not have extra properties.");
      }

      if (items.length === 0) {
        return "[]";
      }
      return `[\n${items.map((item) => `${childIndent}${item}`).join(",\n")}\n${currentIndent}]`;
    }

    const prototype = Object.getPrototypeOf(value) as object | null;
    if (prototype !== Object.prototype && prototype !== null) {
      invalidCanonicalJson("Canonical JSON objects must be plain objects.");
    }

    const keys: string[] = [];
    for (const key of Reflect.ownKeys(value)) {
      if (typeof key !== "string") {
        invalidCanonicalJson("Canonical JSON objects may use only string keys.");
      }
      const descriptor = Object.getOwnPropertyDescriptor(value, key);
      if (
        descriptor === undefined ||
        !descriptor.enumerable ||
        !("value" in descriptor)
      ) {
        invalidCanonicalJson("Canonical JSON object properties must be enumerable data properties.");
      }
      keys.push(key);
    }
    keys.sort();

    if (keys.length === 0) {
      return "{}";
    }

    const entries = keys.map((key) =>
      `${childIndent}${JSON.stringify(key)}: ${serializeJson(
        (value as Record<string, unknown>)[key],
        depth + 1,
        ancestors,
      )}`
    );
    return `{\n${entries.join(",\n")}\n${currentIndent}}`;
  } finally {
    ancestors.delete(value);
  }
}

export function canonicalJson(value: unknown): string {
  return `${serializeJson(value, 0, new Set<object>())}\n`;
}
