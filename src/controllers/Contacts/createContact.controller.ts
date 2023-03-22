import { Request, Response } from "express";
import { IContact } from "../../interfaces/contact.interface";
import { createContactService } from "../../services/Contacts/createContact.service";

export const createContactController = async (req: Request, res: Response) => {
  const contact: IContact = req.body;
  const client: string = String(req.client.id);

  const newContact = await createContactService(contact, client);

  return res.status(201).json(newContact);
};
