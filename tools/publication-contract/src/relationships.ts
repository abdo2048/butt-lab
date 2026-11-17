import type {
  ContentRecord,
} from "./model/index.ts";

export type RelationshipTargetKind = ContentRecord["kind"];

export type Relationship = Readonly<{
  fromId: string;
  field: string;
  toId: string;
  targetKind?: RelationshipTargetKind;
}>;

export type Backlink = Readonly<{ targetId: string; sourceId: string; field: string; }>;

type RelationshipKind = ContentRecord["kind"];

type FieldSpec = Readonly<{
  field: string;
  /** The record kind the target must have. Absent means any listed record. */
  targetKind?: RelationshipTargetKind;
}>;

/**
 * Explicit relationship field map.
 *
 * Only the fields listed here are record relationships. Every other identifier
 * shaped value in a record (source locators, audit aliases, inline method
 * inputs, streams, products, sinks, steps, organizations, contaminant labels,
 * tags, source derivatives and audit references) is inline content and is never
 * resolved against the manifest record map.
 *
 * Each entry also declares the record kind its target must have, so that a
 * relationship pointing at a record of the wrong kind is detectable instead of
 * being accepted silently.
 */
const RELATIONSHIP_FIELDS: Readonly<Record<RelationshipKind, readonly FieldSpec[]>> = {
  material: [
    { field: "methodFamilyIds", targetKind: "method-family" },
    { field: "termIds", targetKind: "term" },
  ],
  "method-family": [
    { field: "assessmentIds", targetKind: "assessment" },
    { field: "claimIds", targetKind: "claim" },
    { field: "gapIds", targetKind: "gap" },
    { field: "hypothesisIds", targetKind: "hypothesis" },
    { field: "sourceIds", targetKind: "source" },
    { field: "termIds", targetKind: "term" },
  ],
  source: [
    { field: "claimIds", targetKind: "claim" },
    { field: "methodIds", targetKind: "method-family" },
  ],
  claim: [
    { field: "counterevidenceClaimIds", targetKind: "claim" },
    { field: "hypothesisIds", targetKind: "hypothesis" },
    { field: "methodIds", targetKind: "method-family" },
    { field: "premiseClaimIds", targetKind: "claim" },
    { field: "sourceId", targetKind: "source" },
  ],
  gap: [
    { field: "affectedRecordIds" },
  ],
  hypothesis: [
    { field: "sourceInputIds" },
    { field: "validationQuestionIds", targetKind: "gap" },
  ],
  term: [
    { field: "claimIds", targetKind: "claim" },
    { field: "methodIds", targetKind: "method-family" },
    { field: "sourceIds", targetKind: "source" },
  ],
  assessment: [
    { field: "conflictingClaimIds", targetKind: "claim" },
    { field: "methodId", targetKind: "method-family" },
    { field: "supportingClaimIds", targetKind: "claim" },
  ],
};

/**
 * Only the AI gap-closing-note branch of a gap record carries source inputs.
 * An unresolved-question gap has no source input relationship at all.
 */
const AI_GAP_SOURCE_INPUT_FIELDS: readonly FieldSpec[] = [{ field: "sourceInputIds" }];

function fieldsFor(record: ContentRecord): readonly FieldSpec[] {
  const kind = (record as unknown as Record<string, unknown>)["kind"];
  if (typeof kind !== "string") {
    return [];
  }
  const fields = (
    RELATIONSHIP_FIELDS as Readonly<Record<string, readonly FieldSpec[]>>
  )[kind];
  if (fields === undefined) {
    return [];
  }
  if (kind === "gap") {
    const contentKind = (record as unknown as Record<string, unknown>)["contentKind"];
    return contentKind === "ai-gap-closing-note"
      ? [...fields, ...AI_GAP_SOURCE_INPUT_FIELDS]
      : fields;
  }
  return fields;
}

function readRelationshipValues(
  record: ContentRecord,
  spec: FieldSpec,
): readonly string[] {
  const container = record as unknown as Record<string, unknown>;
  const raw = container[spec.field];

  if (typeof raw === "string") {
    return raw.length > 0 ? [raw] : [];
  }
  if (Array.isArray(raw)) {
    return raw.filter(
      (value): value is string => typeof value === "string" && value.length > 0,
    );
  }
  return [];
}

function compareText(left: string, right: string): number {
  if (left === right) {
    return 0;
  }
  return left < right ? -1 : 1;
}

function compareRelationships(left: Relationship, right: Relationship): number {
  return (
    compareText(left.fromId, right.fromId) ||
    compareText(left.field, right.field) ||
    compareText(left.toId, right.toId)
  );
}

function compareBacklinks(left: Backlink, right: Backlink): number {
  return (
    compareText(left.targetId, right.targetId) ||
    compareText(left.sourceId, right.sourceId) ||
    compareText(left.field, right.field)
  );
}

export function collectRelationships(
  records: ReadonlyMap<string, ContentRecord>,
): readonly Relationship[] {
  const seen = new Set<string>();
  const relationships: Relationship[] = [];

  for (const record of records.values()) {
    const fromId = record.id;
    for (const spec of fieldsFor(record)) {
      for (const toId of readRelationshipValues(record, spec)) {
        const key = `${fromId} ${spec.field} ${toId}`;
        if (seen.has(key)) {
          continue;
        }
        seen.add(key);
        relationships.push(
          Object.freeze(
            spec.targetKind === undefined
              ? { fromId, field: spec.field, toId }
              : { fromId, field: spec.field, toId, targetKind: spec.targetKind },
          ),
        );
      }
    }
  }

  relationships.sort(compareRelationships);
  return relationships;
}

export function buildBacklinks(
  relationships: readonly Relationship[],
): readonly Backlink[] {
  const backlinks: Backlink[] = relationships.map((relationship) =>
    Object.freeze({
      targetId: relationship.toId,
      sourceId: relationship.fromId,
      field: relationship.field,
    })
  );

  backlinks.sort(compareBacklinks);
  return backlinks;
}
