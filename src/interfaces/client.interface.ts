import { z } from "zod";
import { DeepPartial } from "typeorm";
import {
  clientSchema,
  clientsToReturnSchema,
  clientUpdateSchema,
} from "../schemas/client.schema";

export type IClient = z.infer<typeof clientSchema>;
export type IClientUpdate = DeepPartial<IClient>;
export type IUpdateRequest = z.infer<typeof clientUpdateSchema>;
export type IClientToReturn = z.infer<typeof clientsToReturnSchema>;
