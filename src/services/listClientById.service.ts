import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import Client from "../entities/client.entity";
import { IClient } from "../interfaces/client.interface";

export const listClientByIdService = async (
  clientId: string
): Promise<IClient | null> => {
  const clientRepository: Repository<Client> =
    AppDataSource.getRepository(Client);

  const client = await clientRepository.findOne({
    where: {
      id: clientId,
    },
  });

  return client;
};
