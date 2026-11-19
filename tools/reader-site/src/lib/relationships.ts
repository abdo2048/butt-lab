import type { BundleData, BundleRecord } from "./types.ts";

/**
 * Structured relationships and backlinks.
 *
 * Both come from the exported bundle. No backlink list is maintained by hand.
 */

export interface RelatedItem {
  id: string;
  kind: string;
  title: string;
  href: string | null;
}

function titleOf(record: BundleRecord): string {
  if (record.kind === "term") return record.preferredLabel;
  return record.title;
}

/** The method family that owns a claim, a gap or an assessment. */
export function ownedBy(bundle: BundleData, id: string): string[] {
  const owners: string[] = [];
  for (const familyId of bundle.byKind["method-family"] ?? []) {
    const family = bundle.records.get(familyId);
    if (!family || family.kind !== "method-family") continue;
    if (
      family.claimIds.includes(id) ||
      family.gapIds.includes(id) ||
      family.assessmentIds.includes(id)
    ) {
      owners.push(family.id);
    }
  }
  return owners;
}

/** Where a record can be read. Records without their own page point at the page that owns them. */
export function hrefFor(bundle: BundleData, id: string): string | null {
  const record = bundle.records.get(id);
  if (!record) return null;

  switch (record.kind) {
    case "method-family":
      return `/methods/${record.id}/`;
    case "source":
      return `/sources/${record.id}/`;
    case "term":
      return `/glossary/#${record.id}`;
    case "hypothesis":
      return `/invention/#${record.id}`;
    case "material":
      return "/start/#what-a-cigarette-butt-actually-is";
    case "claim":
    case "gap":
    case "assessment": {
      const owner = ownedBy(bundle, id)[0];
      return owner ? `/methods/${owner}/` : null;
    }
    default:
      return null;
  }
}

/** The records this record points at. */
export function outgoing(bundle: BundleData, id: string): RelatedItem[] {
  const items: RelatedItem[] = [];
  const seen = new Set<string>();
  for (const relationship of bundle.relationships) {
    if (relationship.fromId !== id) continue;
    if (seen.has(relationship.toId)) continue;
    const record = bundle.records.get(relationship.toId);
    if (!record) continue;
    seen.add(record.id);
    items.push({
      id: record.id,
      kind: record.kind,
      title: titleOf(record),
      href: hrefFor(bundle, record.id),
    });
  }
  return items;
}

/** The records that point at this record. */
export function backlinks(bundle: BundleData, id: string): RelatedItem[] {
  const items: RelatedItem[] = [];
  const seen = new Set<string>();
  for (const backlink of bundle.backlinks) {
    if (backlink.targetId !== id) continue;
    if (seen.has(backlink.sourceId)) continue;
    const record = bundle.records.get(backlink.sourceId);
    if (!record) continue;
    seen.add(record.id);
    items.push({
      id: record.id,
      kind: record.kind,
      title: titleOf(record),
      href: hrefFor(bundle, record.id),
    });
  }
  return items;
}
