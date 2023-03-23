import { z } from "zod";
import { DeepPartial } from "typeorm";
import {
  contactSchema,
  contactToReturnSchema,
  contactUpdateSchema,
  multipleContactsSchema,
} from "../schemas/contact.schema";

export type IContact = z.infer<typeof contactSchema>;
export type IContactUpdate = DeepPartial<IContact>;
export type IUpdateRequest = z.infer<typeof contactUpdateSchema>;
export type IContactToReturn = z.infer<typeof contactToReturnSchema>;
export type IMultipleContacts = z.infer<typeof multipleContactsSchema>;
