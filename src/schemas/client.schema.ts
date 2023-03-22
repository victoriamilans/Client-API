import { z } from "zod";
import { contactToReturnSchema } from "./contact.schema";

export const clientSchema = z.object({
  fullName: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
  phone: z.string(),
});

export const clientToReturnSchema: any = clientSchema
  .extend({
    id: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    deletedAt: z.string().nullable(),
    isActive: z.boolean(),
    contacts: z.array(contactToReturnSchema.omit({ client: true })),
  })
  .omit({ password: true });

export const multipleClientsSchema = clientToReturnSchema.array();

export const clientUpdateSchema = clientSchema
  .partial()
  .omit({ password: true });
