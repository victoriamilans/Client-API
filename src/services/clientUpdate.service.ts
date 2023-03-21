import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import Client from "../entities/client.entity";
import { IClientUpdate } from "../interfaces/client.interface";

export const clientUpdateService = async (
  clientId: string,
  clientData: IClientUpdate
): Promise<IClientUpdate> => {
  const clientRepository: Repository<Client> =
    AppDataSource.getRepository(Client);

  const clientToUpdate = await clientRepository.findOne({
    where: {
      id: clientId,
    },
  });

  const updatedClient = clientRepository.create({
    ...clientToUpdate,
    ...clientData,
  });

  await clientRepository.save(updatedClient);

  return updatedClient;
};
