import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import Client from "../entities/client.entity";
import { AppError } from "../errors";
import { IClient } from "../interfaces/client.interface";
import { clientToReturnSchema } from "../schemas/client.schema";

export const createClientService = async (
  userData: IClient
): Promise<IClient> => {
  const clientRepository: Repository<Client> =
    AppDataSource.getRepository(Client);

  const client = clientRepository.create(userData);
  await clientRepository.save(client);
  const newClient = clientToReturnSchema.parse(client);

  return newClient;
};
