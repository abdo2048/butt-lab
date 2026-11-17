import assert from "node:assert/strict";
import { realpath, rm, symlink, writeFile } from "node:fs/promises";
import { join } from "node:path";
import test, { type TestContext } from "node:test";

import { ContractError, error } from "../src/diagnostics.ts";
import {
  canonicalJson,
  loadMarkdown,
  loadYaml,
  sha256File,
} from "../src/load.ts";
import {
  assertNoRawHtml,
  assertRecordNamespace,
  assertSafePublicUrl,
  resolvePublicPath,
  resolvePublicPathFromRealpath,
} from "../src/path-policy.ts";
import { makeTempDirectory, writeFixture } from "./helpers.ts";

async function temporaryRoot(t: TestContext): Promise<string> {
  const root = await makeTempDirectory();
  t.after(() => rm(root, { force: true, recursive: true }));
  return root;
}

test("ContractError exposes stable diagnostics", () => {
  const diagnostic = error("EXAMPLE_ERROR", "Example message", "record.yaml");
  const contractError = new ContractError([diagnostic]);

  assert.equal(contractError.name, "ContractError");
  assert.equal(contractError.message, "EXAMPLE_ERROR: Example message");
  assert.deepEqual(contractError.diagnostics, [
    {
      code: "EXAMPLE_ERROR",
      severity: "error",
      message: "Example message",
      path: "record.yaml",
    },
  ]);
});

test("resolves a normalized path inside the publication root", async (t) => {
  const root = await temporaryRoot(t);
  const file = await writeFixture(root, "assets/source.txt", "source\n");

  assert.equal(await resolvePublicPath(root, "assets/source.txt"), await realpath(file));
});

test("rejects path traversal", async (t) => {
  const root = await temporaryRoot(t);

  await assert.rejects(() => resolvePublicPath(root, "../state/workflow.yaml"), /PATH_OUTSIDE_PUBLICATION_ROOT/);
});

test("rejects non-normalized public paths", async (t) => {
  const root = await temporaryRoot(t);
  const invalidPaths = [
    "",
    "/absolute/path.yaml",
    "C:/windows/path.yaml",
    "records\\claim.yaml",
    "records//claim.yaml",
    "records/./claim.yaml",
    "records/../claim.yaml",
    "records/claims/",
  ];

  for (const path of invalidPaths) {
    await assert.rejects(
      () => resolvePublicPath(root, path),
      /PATH_(?:INVALID|OUTSIDE_PUBLICATION_ROOT)/,
      path,
    );
  }
});

test("realpath policy accepts descendants and rejects escapes", async (t) => {
  const root = await temporaryRoot(t);
  const rootRealpath = await realpath(root);
  const insideFile = await writeFixture(root, "assets/inside.txt", "inside\n");
  const outsideRoot = await temporaryRoot(t);
  const outsideFile = await writeFixture(outsideRoot, "outside.txt", "outside\n");
  const outsideFileRealpath = await realpath(outsideFile);

  assert.equal(
    resolvePublicPathFromRealpath(rootRealpath, await realpath(insideFile)),
    await realpath(insideFile),
  );
  assert.throws(
    () => resolvePublicPathFromRealpath(rootRealpath, outsideFileRealpath),
    /PATH_SYMLINK_ESCAPE/,
  );
});

test("rejects a symlink that escapes publication root", async (t) => {
  if (process.platform === "win32") {
    t.skip("Windows developer mode or elevation may be required for symlink creation");
    return;
  }
  const root = await temporaryRoot(t);
  const outsideRoot = await temporaryRoot(t);
  const outsideFile = await writeFixture(outsideRoot, "outside.txt", "outside\n");
  const linkedFile = join(root, "assets", "escaped.txt");
  await writeFixture(root, "assets/.keep", "");
  await symlink(outsideFile, linkedFile);

  await assert.rejects(() => resolvePublicPath(root, "assets/escaped.txt"), /PATH_SYMLINK_ESCAPE/);
});

test("accepts HTTP and HTTPS public URLs", () => {
  assert.doesNotThrow(() => assertSafePublicUrl("http://example.com/source"));
  assert.doesNotThrow(() => assertSafePublicUrl("https://example.com/source?q=1"));
});

test("rejects URLs without an explicit HTTP authority", () => {
  assert.throws(() => assertSafePublicUrl("https:example.com"), /URL_INVALID/);
});

test("rejects unsafe URL schemes", () => {
  assert.throws(() => assertSafePublicUrl("javascript:alert(1)"), /URL_UNSAFE_SCHEME/);
});

test("rejects every non-public URL scheme", () => {
  for (const value of [
    "data:text/plain,unsafe",
    "file:///private/source",
    "ftp://example.com/source",
  ]) {
    assert.throws(() => assertSafePublicUrl(value), /URL_UNSAFE_SCHEME/, value);
  }
  assert.throws(() => assertSafePublicUrl("not a URL"), /URL_INVALID/);
});

test("rejects raw HTML in approved Markdown", () => {
  assert.throws(() => assertNoRawHtml("# Safe\n<script>alert(1)</script>"), /MARKDOWN_RAW_HTML/);
});

test("rejects raw HTML when an attribute contains a less-than character", () => {
  assert.throws(() => assertNoRawHtml('<img alt="<">'), /MARKDOWN_RAW_HTML/);
});

test("rejects character-reference-obfuscated JavaScript links", () => {
  assert.throws(
    () => assertNoRawHtml("[x](java&#x73;cript:alert(1))"),
    /MARKDOWN_RAW_HTML/,
  );
});

test("rejects CommonMark-escaped JavaScript link destinations", () => {
  assert.throws(
    () => assertNoRawHtml("[x](javascript\\:alert(1))"),
    /MARKDOWN_RAW_HTML/,
  );
});

test("rejects every unsafe explicit Markdown link scheme", () => {
  for (const markdown of [
    "[data](data:text/plain,unsafe)",
    "![file](file:///private/image.png)",
    "[vbscript](vbscript:msgbox(1))",
    "[ftp](ftp://example.com/file)",
    "[mail](mailto:private@example.com)",
    "[escaped\\]](data:text/plain,unsafe)",
    "<data:text/plain,unsafe>",
    "[reference][unsafe]\n\n[unsafe]: file:///private/source",
  ]) {
    assert.throws(() => assertNoRawHtml(markdown), /MARKDOWN_RAW_HTML/, markdown);
  }
});

test("rejects an unsafe reference definition with an escaped closing bracket", () => {
  const markdown = "[foo\\]bar]: javascript:alert(1)";
  assert.throws(() => assertNoRawHtml(markdown), /MARKDOWN_RAW_HTML/, markdown);
});

test("rejects an unsafe reference definition with a next-line destination", () => {
  const markdown = "[foo]:\n  javascript:alert(1)";
  assert.throws(() => assertNoRawHtml(markdown), /MARKDOWN_RAW_HTML/, markdown);
});

test("rejects an unsafe reference definition with a multiline label", () => {
  const markdown = "[multiline\n label]: javascript:alert(1)";
  assert.throws(() => assertNoRawHtml(markdown), /MARKDOWN_RAW_HTML/, markdown);
});

test("rejects HTML blocks, event handlers, and javascript text", () => {
  for (const markdown of [
    "<!-- hidden -->",
    "<div>unsafe</div>",
    "<img src=\"safe.png\" onerror=\"alert(1)\">",
    "[unsafe](javascript:alert(1))",
  ]) {
    assert.throws(() => assertNoRawHtml(markdown), /MARKDOWN_RAW_HTML/, markdown);
  }
});

test("allows ordinary Markdown comparisons and URL autolinks", () => {
  assert.doesNotThrow(() =>
    assertNoRawHtml(
      "# Safe\n\n2 < 3 and 5 > 4.\n\n<https://example.com/source>\n\n[Source](https\\://example.com/source)",
    ),
  );
});

test("allows prose with scheme-like text and safe Markdown destinations", () => {
  assert.doesNotThrow(() =>
    assertNoRawHtml(
      "one = 1\n\nThe data: field is explanatory prose.\n\n" +
        "[Relative](../pages/next) [Anchor](#details) " +
        "[HTTP](http://example.com) [HTTPS](https://example.com) " +
        "<https://example.com/source>",
    ),
  );
});

test("allows unsafe-looking examples inside inline code", () => {
  assert.doesNotThrow(() =>
    assertNoRawHtml(
      "Examples: `<script>alert(1)</script>` and `[x](javascript:alert(1))`.",
    ),
  );
});

test("allows unsafe-looking examples inside fenced code blocks", () => {
  assert.doesNotThrow(() =>
    assertNoRawHtml(
      `Context ${"\u{1F4D6}".repeat(20)}\n` +
        "~~~markdown\n<script>alert(1)</script>\n[x](javascript:alert(1))\n~~~\n",
    ),
  );
});

test("allows escaped HTML as literal prose", () => {
  assert.doesNotThrow(() =>
    assertNoRawHtml("\\<script>literal\\</script>"),
  );
});

test("allows entity-encoded HTML as literal prose", () => {
  assert.doesNotThrow(() =>
    assertNoRawHtml(
      "&#x3C;script&#x3E;numeric&#x3C;/script&#x3E; and &lt;script&gt;named&lt;/script&gt;",
    ),
  );
});

test("allows safe reference-definition destinations", () => {
  assert.doesNotThrow(() =>
    assertNoRawHtml(
      "[relative]: ../pages/next\n" +
        "[anchor]: #details\n" +
        "[http]: http://example.com\n" +
        "[foo\\]bar]:\n  https://example.com/source\n" +
        "[multiline\n label]: ../pages/next",
    ),
  );
});

test("strict YAML rejects duplicate keys", async (t) => {
  const root = await temporaryRoot(t);
  const file = join(root, "duplicate.yaml");
  await writeFile(file, "id: first\nid: second\n", "utf8");

  await assert.rejects(() => loadYaml(file), /YAML_DUPLICATE_KEY/);
});

test("strict YAML rejects alias-based key collisions", async (t) => {
  const root = await temporaryRoot(t);
  const file = await writeFixture(
    root,
    "alias-key-collision.yaml",
    "anchor: &k id\n? *k\n: first\nid: second\n",
  );

  await assert.rejects(() => loadYaml(file), /YAML_NON_STRING_KEY/);
});

test("strict YAML rejects duplicate sequence-valued mapping keys", async (t) => {
  const root = await temporaryRoot(t);
  const file = await writeFixture(
    root,
    "sequence-keys.yaml",
    "? [a, b]\n: first\n? [a, b]\n: second\n",
  );

  await assert.rejects(
    () => loadYaml(file),
    (caught: unknown) => {
      assert.ok(caught instanceof ContractError);
      assert.equal(caught.diagnostics[0]?.code, "YAML_NON_STRING_KEY");
      return true;
    },
  );
});

test("strict YAML rejects non-string scalar mapping keys", async (t) => {
  const root = await temporaryRoot(t);

  for (const [filename, contents] of [
    ["numeric-key.yaml", "1: value\n"],
    ["boolean-key.yaml", "true: value\n"],
    ["null-key.yaml", "null: value\n"],
  ] as const) {
    const file = await writeFixture(root, filename, contents);
    await assert.rejects(() => loadYaml(file), /YAML_NON_STRING_KEY/, filename);
  }
});

test("YAML alias conversion failures use structured diagnostics", async (t) => {
  const root = await temporaryRoot(t);
  const aliases = Array.from({ length: 101 }, () => "*base").join(", ");
  const file = await writeFixture(
    root,
    "alias-expansion.yaml",
    `base: &base [value]\naliases: [${aliases}]\n`,
  );

  await assert.rejects(
    () => loadYaml(file),
    (caught: unknown) => {
      assert.ok(caught instanceof ContractError);
      assert.equal(caught.diagnostics[0]?.code, "YAML_PARSE_ERROR");
      return true;
    },
  );
});

test("strict YAML rejects other parser errors", async (t) => {
  const root = await temporaryRoot(t);
  const file = await writeFixture(root, "invalid.yaml", "items: [one, two\n");

  await assert.rejects(() => loadYaml(file), /YAML_PARSE_ERROR/);
});

test("loads YAML and Markdown without transforming content", async (t) => {
  const root = await temporaryRoot(t);
  const yamlFile = await writeFixture(root, "record.yaml", "id: example\nitems:\n  - one\n");
  const markdown = "# Heading\n\nApproved text.\n";
  const markdownFile = await writeFixture(root, "page.md", markdown);

  assert.deepEqual(await loadYaml(yamlFile), { id: "example", items: ["one"] });
  assert.equal(await loadMarkdown(markdownFile), markdown);
});

test("computes a lowercase SHA-256 file digest", async (t) => {
  const root = await temporaryRoot(t);
  const file = await writeFixture(root, "source.txt", "abc");

  assert.equal(
    await sha256File(file),
    "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad",
  );
});

test("canonical JSON sorts object keys recursively and retains array order", () => {
  assert.equal(
    canonicalJson({ z: 1, a: { d: 4, b: 2 }, list: [{ y: 2, x: 1 }, "last"] }),
    '{\n  "a": {\n    "b": 2,\n    "d": 4\n  },\n  "list": [\n    {\n      "x": 1,\n      "y": 2\n    },\n    "last"\n  ],\n  "z": 1\n}\n',
  );
});

test("canonical JSON sorts integer-like keys lexicographically", () => {
  assert.equal(
    canonicalJson({ "2": "two", "10": "ten" }),
    '{\n  "10": "ten",\n  "2": "two"\n}\n',
  );
});

test("canonical JSON rejects undefined and non-finite numbers", () => {
  for (const value of [undefined, Number.NaN, Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY]) {
    assert.throws(
      () => canonicalJson(value),
      /CANONICAL_JSON_INVALID_VALUE/,
    );
  }
});

test("canonical JSON rejects unsupported values, cycles, and non-plain objects", () => {
  const cycle: { self?: unknown } = {};
  cycle.self = cycle;

  for (const value of [1n, () => undefined, new Date(0), cycle]) {
    assert.throws(
      () => canonicalJson(value),
      /CANONICAL_JSON_INVALID_VALUE/,
    );
  }
});

test("record namespaces map each kind to its required directory", () => {
  const namespaces = {
    material: "materials",
    "method-family": "methods",
    source: "sources",
    claim: "claims",
    gap: "gaps",
    hypothesis: "hypotheses",
    term: "terms",
    assessment: "assessments",
  } as const;

  for (const [kind, directory] of Object.entries(namespaces)) {
    assert.doesNotThrow(() =>
      assertRecordNamespace(kind, "example-id", `records/${directory}/example-id.yaml`),
    );
  }
});

test("rejects records outside their exact kind and ID namespace", () => {
  for (const [kind, id, path] of [
    ["claim", "example", "records/sources/example.yaml"],
    ["claim", "example", "records/claims/other.yaml"],
    ["claim", "example", "records/claims/example.yml"],
    ["claim", "example", "records/claims/nested/example.yaml"],
    ["unknown", "example", "records/unknown/example.yaml"],
  ] as const) {
    assert.throws(
      () => assertRecordNamespace(kind, id, path),
      /RECORD_NAMESPACE_MISMATCH/,
      path,
    );
  }
});
