import { AppDataSource } from "../../data-source";
import Client from "../../entities/client.entity";
import Contact from "../../entities/contact.entity";
import { AppError } from "../../errors";
import { IContact } from "../../interfaces/contact.interface";
import { contactToReturnSchema } from "../../schemas/contact.schema";

export const createContactService = async (
  { fullName, email, telephone, isDefault }: IContact,
  client: string
) => {
  const contactRepository = AppDataSource.getRepository(Contact);
  const clientRepository = AppDataSource.getRepository(Client);

  const findClient: Client | null = await clientRepository.findOne({
    where: {
      id: client,
    },
  });

  console.log(findClient);

  if (!findClient) {
    throw new AppError("Client not found", 404);
  }

  const newContact = contactRepository.create({
    fullName: fullName,
    email: email,
    telephone: telephone,
    client: findClient,
    isDefault: isDefault,
  });
  await contactRepository.save(newContact);

  return newContact;
};
