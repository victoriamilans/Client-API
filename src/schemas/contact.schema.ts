import { z } from "zod";

export const contactSchema = z.object({
  fullName: z.string(),
  email: z.string().email(),
  telephone: z.number(),
  clientId: z.string(),
});

export const contactToReturnSchema = contactSchema.extend({
  id: z.string(),
  createdAt: z.date(),
});

export const multipleContactsSchema = contactSchema.array();

export const contactUpdateSchema = contactSchema.partial();
