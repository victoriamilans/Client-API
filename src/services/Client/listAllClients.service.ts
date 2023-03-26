import { AppDataSource } from "../../data-source";
import Client from "../../entities/client.entity";
import "dotenv/config";

export const listAllClientsService = async (payload: any): Promise<any> => {
  const nodeEnv: string | undefined = process.env.NODE_ENV;

  const page = payload.page ? parseInt(payload.page.toString()) : 1;
  const limit = payload.limit ? parseInt(payload.limit.toString()) : 6;
  const skip = (page - 1) * limit;

  let [clients, totalResults] = await AppDataSource.getRepository(Client)
    .createQueryBuilder("clients")
    .skip(skip)
    .take(limit)
    .getManyAndCount();

  const totalPages = Math.ceil(totalResults / limit);

  clients.forEach((client) => Reflect.deleteProperty(client, "password"));

  const response = {
    currentPage: page,
    totalResults,
    resultsPerPage: limit,
    nextPage:
      page < totalPages
        ? `http://localhost:3000/clients?page=${page + 1}&limit=${limit}`
        : null,
    previousPage:
      page > 1
        ? `http://localhost:3000/clients?page=${page - 1}&limit=${limit}`
        : null,
    clients,
  };

  if (nodeEnv === "production") {
    const searchParams = new URLSearchParams({
      page: (page + 1).toString(),
      limit: limit.toString(),
    });
    const prodRes = {
      currentPage: page,
      totalResults,
      resultsPerPage: limit,
      nextPage:
        page < totalPages
          ? `https://clientapi-ble6.onrender.com./clients?${searchParams.toString()}`
          : null,
      previousPage:
        page > 1
          ? `https://clientapi-ble6.onrender.com./clients?${searchParams.toString()}`
          : null,
      clients,
    };
    return prodRes;
  }

  return response;
};
