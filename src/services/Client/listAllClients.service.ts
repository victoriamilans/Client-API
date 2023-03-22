import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import Client from "../../entities/client.entity";
import { IClientResponse } from "../../interfaces/client.interface";
import { multipleClientsSchema } from "../../schemas/client.schema";

export const listAllClientsService = async (payload: any): Promise<any> => {
  const page = payload.page ? parseInt(payload.page.toString()) : 1;
  const limit = payload.limit ? parseInt(payload.limit.toString()) : 5;
  const skip = (page - 1) * limit;

  let [clients, totalResults] = await AppDataSource.getRepository(Client)
    .createQueryBuilder("clients")
    .skip(skip)
    .take(limit)
    .getManyAndCount();

  const totalPages = Math.ceil(totalResults / limit);

  const response = {
    currentPage: page,
    totalResults,
    resultsPerPage: limit,
    nextPage:
      page < totalPages
        ? `http://localhost:3000/movies?page=${page + 1}&limit=${limit}`
        : null,
    previousPage:
      page > 1
        ? `http://localhost:3000/movies?page=${page - 1}&limit=${limit}`
        : null,
    clients,
  };

  return response;
};