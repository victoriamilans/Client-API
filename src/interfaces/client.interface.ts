import { z } from "zod";
import { DeepPartial } from "typeorm";
import {
  clientSchema,
  clientToReturnSchema,
  clientUpdateSchema,
  multipleClientsSchema,
} from "../schemas/client.schema";

export type IClient = z.infer<typeof clientSchema>;
export type IClientUpdate = DeepPartial<IClient>;
export type IUpdateRequest = z.infer<typeof clientUpdateSchema>;
export type IClientResponse = z.infer<typeof clientToReturnSchema>;
export type IMultipleClients = z.infer<typeof multipleClientsSchema>;
