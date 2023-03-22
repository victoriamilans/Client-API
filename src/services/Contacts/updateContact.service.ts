import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import Contact from "../../entities/contact.entity";
import { AppError } from "../../errors";
import { IClientResponse } from "../../interfaces/client.interface";
import { IContactUpdate } from "../../interfaces/contact.interface";

export const updateContactService = async (
  contactData: IContactUpdate,
  contactId: string
): Promise<IClientResponse> => {
  const contactRepository: Repository<Contact> =
    AppDataSource.getRepository(Contact);

  const oldContact = await contactRepository.findOne({
    where: {
      id: contactId,
    },
  });

  if (!oldContact) {
    throw new AppError("Contact not found", 404);
  }

  const newContact = contactRepository.create({
    ...oldContact,
    ...contactData,
  });

  await contactRepository.save(newContact);

  return newContact;
};
