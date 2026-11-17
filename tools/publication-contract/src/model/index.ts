import { z } from "zod";

import { PublicationManifestSchema } from "./manifest.ts";
import { ContentRecordSchema } from "./records.ts";
import { RubricCatalogSchema } from "./rubrics.ts";

export * from "./states.ts";
export * from "./common.ts";
export * from "./records.ts";
export * from "./manifest.ts";
export * from "./rubrics.ts";

export const generatedSchemas = {
  "content-record.schema.json": z.toJSONSchema(ContentRecordSchema, {
    io: "input",
    target: "draft-2020-12",
  }),
  "publication-manifest.schema.json": z.toJSONSchema(
    PublicationManifestSchema,
    { io: "input", target: "draft-2020-12" },
  ),
  "rubric-catalog.schema.json": z.toJSONSchema(RubricCatalogSchema, {
    io: "input",
    target: "draft-2020-12",
  }),
};
