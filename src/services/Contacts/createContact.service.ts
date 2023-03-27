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

  const allContacts = await AppDataSource.getRepository(Contact)
    .createQueryBuilder("contact")
    .leftJoinAndSelect("contact.client", "client")
    .where("client.id = :id", { id: client })
    .getMany();

  if (!findClient) {
    throw new AppError("Client not found", 404);
  }
  Reflect.deleteProperty(findClient, "contacts");
  Reflect.deleteProperty(findClient, "password");

  if (isDefault) {
    const newContact = allContacts.forEach(async (contact) => {
      AppDataSource.getRepository(Contact)
        .createQueryBuilder()
        .update(contact)
        .set({ isDefault: false })
        .execute();
      await contactRepository.save(contact);
    });
  }

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
