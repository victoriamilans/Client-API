import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import Client from "../entities/client.entity";
import { IClient } from "../interfaces/client.interface";

export const listAllClientsService = async (): Promise<IClient[]> => {
  const clientRepository: Repository<Client> =
    AppDataSource.getRepository(Client);

  const allClients = await clientRepository.find();

  return allClients;
};
