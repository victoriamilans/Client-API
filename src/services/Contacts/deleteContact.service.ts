import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import Contact from "../../entities/contact.entity";
import { AppError } from "../../errors";

export const deleteContactService = async (
  contactId: string
): Promise<void> => {
  const contactRepository: Repository<Contact> =
    AppDataSource.getRepository(Contact);

  const contact: any = await contactRepository.findOne({
    where: {
      id: contactId,
    },
  });

  if (!contact) {
    throw new AppError("Contact not found", 404);
  }

  await contactRepository.softRemove(contact);
};
