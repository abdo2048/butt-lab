import { z } from "zod";

export const StableIdSchema = z
  .string()
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);

export const IsoDateSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);

export const Sha256Schema = z.string().regex(/^[a-f0-9]{64}$/);

export const HttpUrlSchema = z.url().regex(/^https?:\/\//).meta({ format: "uri" });

export const AuditReferenceSchema = z.strictObject({
  label: z.string().min(1),
  url: HttpUrlSchema,
  version: z.string().min(1),
  internalId: z.string().min(1).optional(),
});
