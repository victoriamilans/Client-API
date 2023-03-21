import { z } from "zod";

export const clientSchema = z.object({
  id: z.string(),
  fullName: z.string(),
  email: z.string().email(),
  telephone: z.number(),
  registrationDate: z.date(),
});

export const clientsToReturnSchema = clientSchema.array();

export const clientUpdateSchema = clientSchema.partial();
