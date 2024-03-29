import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import Client from "../../entities/client.entity";
import { AppError } from "../../errors";
import { IClientResponse } from "../../interfaces/client.interface";
import { clientToReturnSchema } from "../../schemas/client.schema";

export const listClientByIdService = async (
  clientId: string
): Promise<IClientResponse | null> => {
  const clientRepository: Repository<Client> =
    AppDataSource.getRepository(Client);

  const client = await clientRepository.findOne({
    where: {
      id: clientId,
    },
  });

  if (!client) {
    throw new AppError("Client not found", 404);
  }

  const searchedClient = clientToReturnSchema.parse(client);

  return searchedClient;
};
