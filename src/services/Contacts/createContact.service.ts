import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import Client from "../../entities/client.entity";
import Contact from "../../entities/contact.entity";
import { AppError } from "../../errors";
import { IContact } from "../../interfaces/contact.interface";

export const createContactService = async (
  { fullName, email, phone, isDefault }: IContact,
  client: string
) => {
  const contactRepository: Repository<Contact> =
    AppDataSource.getRepository(Contact);
  const clientRepository: Repository<Client> =
    AppDataSource.getRepository(Client);

  const findClient: Client | null = await clientRepository.findOne({
    where: {
      id: client,
    },
  });

  if (!findClient) {
    throw new AppError("Client not found", 404);
  }
  Reflect.deleteProperty(findClient, "contacts");
  Reflect.deleteProperty(findClient, "password");

  const newContact = contactRepository.create({
    fullName: fullName,
    email: email,
    phone: phone,
    client: findClient,
    isDefault: isDefault,
  });
  await contactRepository.save(newContact);

  return newContact;
};
