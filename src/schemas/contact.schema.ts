import { z } from "zod";
import { clientToReturnSchema } from "./client.schema";

export const contactSchema = z.object({
  fullName: z.string(),
  email: z.string().email(),
  phone: z.string(),
  isDefault: z.boolean(),
});

export const contactToReturnSchema = contactSchema.extend({
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  deletedAt: z.string().nullable(),
  client: clientToReturnSchema,
});

export const multipleContactsSchema = contactSchema.array();

export const contactUpdateSchema = contactSchema.partial();
