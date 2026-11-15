import { z } from "zod";

import { Sha256Schema, StableIdSchema } from "./common.ts";

export const RelativePathSchema = z
  .string()
  .min(1)
  .regex(
    /^(?!\/)(?![A-Za-z]:\/)(?!.*\\)(?!\.{1,2}(?:\/|$))(?!.*\/\.{1,2}(?:\/|$))(?!.*\/\/)(?!.*\/$).+$/,
  );

export const ManifestEntrySchema = z.strictObject({
  id: StableIdSchema,
  path: RelativePathSchema,
  sha256: Sha256Schema,
});

export const PublicationManifestSchema = z.strictObject({
  schemaVersion: z.literal(1),
  publicationVersion: z
    .string()
    .regex(/^[a-z0-9]+(?:[.-][a-z0-9]+)*$/),
  records: z.array(ManifestEntrySchema),
  pages: z.array(ManifestEntrySchema),
  assets: z.array(ManifestEntrySchema),
});

export type ManifestEntry = z.infer<typeof ManifestEntrySchema>;
export type PublicationManifest = z.infer<typeof PublicationManifestSchema>;
