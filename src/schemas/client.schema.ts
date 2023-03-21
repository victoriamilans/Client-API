import { z } from "zod";

export const clientSchema = z.object({
  fullName: z.string(),
  email: z.string().email(),
  telephone: z.number(),
});

export const clientToReturnSchema = clientSchema.extend({
  id: z.string(),
  createdAt: z.string(),
});

export const multipleClientsSchema = clientToReturnSchema.array();

export const clientUpdateSchema = clientSchema.partial();
