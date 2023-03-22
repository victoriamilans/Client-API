import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import Client from "../../entities/client.entity";
import { IClientResponse } from "../../interfaces/client.interface";
import { multipleClientsSchema } from "../../schemas/client.schema";

export const listAllClientsService = async (): Promise<IClientResponse[]> => {
  const clientRepository: Repository<Client> =
    AppDataSource.getRepository(Client);

  const allClients = await clientRepository.find();

  const clients = multipleClientsSchema.parse(allClients);

  return clients;
};
