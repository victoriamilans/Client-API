import { AppDataSource } from "../../data-source";
import Client from "../../entities/client.entity";
import Contact from "../../entities/contact.entity";

export const listClientContactsService = async (
  clientId: string,
  payload: any
): Promise<any> => {
  const page = payload.page ? parseInt(payload.page.toString()) : 1;
  const limit = payload.limit ? parseInt(payload.limit.toString()) : 6;
  const skip = (page - 1) * limit;
  const nodeEnv: string | undefined = process.env.NODE_ENV;

  const [contacts, totalResults] = await AppDataSource.getRepository(Contact)
    .createQueryBuilder("contacts")
    .leftJoinAndSelect("contacts.client", "client")
    .where("client.id = :id", { id: clientId })
    .orderBy("contacts.isDefault", "DESC")
    .skip(skip)
    .take(limit)
    .getManyAndCount();

  contacts.forEach((contact) => Reflect.deleteProperty(contact, "client"));

  const totalPages = Math.ceil(totalResults / limit);

  const response = {
    currentPage: page,
    totalResults,
    resultsPerPage: limit,
    nextPage:
      page < totalPages
        ? `http://localhost:3000/clientContact?page=${page + 1}&limit=${limit}`
        : null,
    previousPage:
      page > 1
        ? `http://localhost:3000/clientContact?page=${page - 1}&limit=${limit}`
        : null,
    contacts,
  };

  if (nodeEnv === "production") {
    const clientRepository = await AppDataSource.getRepository(Client);
    const prodRes = await clientRepository.find({
      where: { id: clientId },
    });
    return prodRes;
  }

  return response;
};
