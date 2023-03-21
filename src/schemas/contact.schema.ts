import { z } from "zod";

export const contactSchema = z.object({
  id: z.string(),
  fullName: z.string(),
  email: z.string().email(),
  telephone: z.number(),
  registrationDate: z.date(),
  clientId: z.string(),
});

export const contactToReturnSchema = contactSchema.array();

export const contactUpdateSchema = contactSchema.partial();
