import { Request, Response } from "express";
import { IContactUpdate } from "../../interfaces/contact.interface";
import { updateContactService } from "../../services/Contacts/updateContact.service";

export const updateContactController = async (req: Request, res: Response) => {
  const contactData: IContactUpdate = req.body;
  const contactId = req.params.id;
  const contact = await updateContactService(contactData, contactId);

  return res.json(contact);
};
