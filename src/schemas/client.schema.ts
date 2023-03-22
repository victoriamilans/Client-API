import { z } from "zod";

export const clientSchema = z.object({
  fullName: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
  telephone: z.string(),
});

export const clientToReturnSchema = clientSchema
  .extend({
    id: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    deletedAt: z.string().nullable(),
  })
  .omit({ password: true });

export const multipleClientsSchema = clientToReturnSchema.array();

export const clientUpdateSchema = clientSchema
  .partial()
  .omit({ password: true });
