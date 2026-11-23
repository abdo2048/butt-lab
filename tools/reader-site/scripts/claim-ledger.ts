// Builds the claim ledger the reviewer pass works from.
//
// The site states 47 claims across six method families plus the product routes.
// Each one carries the evidence label it was published under and the single
// source it rests on, so the ledger is an export, not a judgement: it lists what
// has to be checked and leaves the verdict column empty. A verdict is written by
// the reviewer only after reading the source, and "not found in the text" is not
// the same as "absent from the paper" — the text is a machine extraction.
//
// Run from tools/reader-site: node scripts/claim-ledger.ts
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { documentIdForRecord } from "../src/lib/documents.ts";

const here = path.dirname(fileURLToPath(import.meta.url));
const siteRoot = path.resolve(here, "..");
const repoRoot = path.resolve(siteRoot, "..", "..");
const recordsPath = path.join(siteRoot, "src", "content", "bundle", "records.json");
const sourcesDir = path.join(repoRoot, "sources");
const outputPath = path.join(repoRoot, "docs", "review", "claim-ledger.md");

type Claim = {
  id: string;
  kind: string;
  proposition: string;
  evidenceState: string;
  sourceId?: string;
  locator?: string;
  methodIds?: string[];
  reviewer?: string;
};

type Source = {
  id: string;
  title?: string;
  publisherOrIssuer?: string;
};

const records: Array<[string, Claim & Source]> = JSON.parse(fs.readFileSync(recordsPath, "utf8"));
const claims = records
  .filter(([, record]) => record.kind === "claim")
  .map(([, record]) => record)
  .sort((a, b) => (a.methodIds?.[0] ?? "").localeCompare(b.methodIds?.[0] ?? "") || a.id.localeCompare(b.id));
const sources = new Map(records.filter(([, r]) => r.kind === "source").map(([, r]) => [r.id, r]));

function textState(sourceId: string | undefined): string {
  if (!sourceId) return "no source";
  const file = path.join(sourcesDir, sourceId, "text.md");
  if (!fs.existsSync(file)) return "no text.md";
  const kb = Math.round(fs.statSync(file).size / 1024);
  return `${kb} KB`;
}

function shelfState(sourceId: string | undefined): string {
  if (!sourceId) return "—";
  return fs.existsSync(path.join(sourcesDir, sourceId, "document.pdf")) ? "pdf" : "link only";
}

const byLabel = new Map<string, number>();
const byMethod = new Map<string, number>();
for (const claim of claims) {
  byLabel.set(claim.evidenceState, (byLabel.get(claim.evidenceState) ?? 0) + 1);
  const method = claim.methodIds?.[0] ?? "unassigned";
  byMethod.set(method, (byMethod.get(method) ?? 0) + 1);
}

const citedByClaim = new Set(claims.map((claim) => claim.sourceId).filter(Boolean) as string[]);
// Shelf ids are file identity; source ids are bibliographic. `links.json` maps
// one to the other, so "which document is cited" has to go through that map.
const documentFor = (sourceId: string): string | undefined => documentIdForRecord(sourceId);
const citedDocuments = new Set<string>();
for (const sourceId of citedByClaim) {
  const documentId = documentFor(sourceId);
  if (documentId) citedDocuments.add(documentId);
}
// A source can also be cited by a finding or a company record without carrying a
// claim of its own, so "carries no claim" and "not cited anywhere" are different
// questions and are reported separately.
const citedAnywhere = new Set(citedDocuments);
for (const [id, record] of records) {
  if (record.kind !== "source") continue;
  const claimIds = (record as unknown as { claimIds?: string[] }).claimIds;
  if (!claimIds?.length) continue;
  const documentId = documentFor(id);
  if (documentId) citedAnywhere.add(documentId);
}
const shelf = fs
  .readdirSync(sourcesDir, { withFileTypes: true })
  .filter((entry) => entry.isDirectory() && fs.existsSync(path.join(sourcesDir, entry.name, "document.pdf")))
  .map((entry) => entry.name)
  .sort();
const uncited = shelf.filter((id) => !citedAnywhere.has(id));
const noClaim = shelf.filter((id) => !citedByClaim.has(id));

const lines: string[] = [];
lines.push("# Claim ledger");
lines.push("");
lines.push("Every claim the reader site publishes, with the evidence label it carries and the one source it rests on. The verdict column is empty on purpose: it is filled by a reviewer who has read the source, not by the export.");
lines.push("");
lines.push(`Generated from \`src/content/bundle/records.json\` (publication version in \`bundle-manifest.json\`). Claims: **${claims.length}**.`);
lines.push("");
lines.push("## Labels as published");
lines.push("");
lines.push("| Label | Claims |");
lines.push("| --- | --- |");
for (const [label, count] of [...byLabel].sort()) lines.push(`| \`${label}\` | ${count} |`);
lines.push("");
lines.push("## Claims per route");
lines.push("");
lines.push("| Route | Claims |");
lines.push("| --- | --- |");
for (const [method, count] of [...byMethod].sort()) lines.push(`| \`${method}\` | ${count} |`);
lines.push("");
lines.push("## The ledger");
lines.push("");
lines.push("| # | Claim id | Route | Proposition | Label | Source | Locator | Text | Shelf | Verdict |");
lines.push("| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |");
claims.forEach((claim, index) => {
  const method = claim.methodIds?.[0] ?? "—";
  const proposition = (claim.proposition ?? "").replace(/\|/g, "\\|");
  const locator = (claim.locator ?? "—").replace(/\|/g, "\\|");
  lines.push(
    `| ${index + 1} | \`${claim.id}\` | \`${method}\` | ${proposition} | \`${claim.evidenceState}\` | \`${claim.sourceId ?? "—"}\` | ${locator} | ${textState(claim.sourceId)} | ${shelfState(claim.sourceId)} |  |`,
  );
});
lines.push("");
lines.push("## How to fill a verdict");
lines.push("");
lines.push("- `supported` — the source states the proposition, and the locator points at where.");
lines.push("- `partly supported` — the source states part of it, or states it more narrowly; write what it actually says.");
lines.push("- `unsupported` — the source is readable and does not support the proposition.");
lines.push("- `not located in text` — the extraction does not contain it. This is not `unsupported`: the PDF may still carry it, so the row stays open until someone reads the page.");
lines.push("");
lines.push("A verdict is a reading of one source against one sentence. It is not a judgement that the route works, that a material is clean, or that a company's claim is true.");
lines.push("");
lines.push("## Documents no claim cites");
lines.push("");
lines.push(`The shelf holds ${shelf.length} documents. ${citedDocuments.size} of them are cited by one of the ${claims.length} claims, and ${citedAnywhere.size} appear in the published bundle at all — the rest are permits, certificates, press items and papers collected while reading that never carried a claim.`);
lines.push("");
lines.push("That is the completeness check, and it is the one thing a claim ledger cannot do. A ledger tests sentences the site already prints; it cannot see a finding the site leaves out. These are the documents a reviewer sweeps for what should be there and is not. An entry carrying no claim is not evidence of a gap — most of them were never meant to carry one.");
lines.push("");
for (const id of noClaim) lines.push(`- \`${id}\`${sources.get(id)?.title ? ` — ${sources.get(id)!.title}` : ""}`);
lines.push("");
if (uncited.length) {
  lines.push(`Of those, ${uncited.length} are not cited anywhere in the published bundle:`);
  lines.push("");
  for (const id of uncited) lines.push(`- \`${id}\``);
  lines.push("");
}

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, `${lines.join("\n")}\n`, "utf8");
console.log(`LEDGER claims=${claims.length} cited=${citedDocuments.size} noClaim=${noClaim.length} uncited=${uncited.length} uncited=${uncited.length} -> ${path.relative(repoRoot, outputPath)}`);


