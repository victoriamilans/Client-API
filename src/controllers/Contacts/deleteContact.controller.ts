import { Request, Response } from "express";
import { deleteContactService } from "../../services/Contacts/deleteContact.service";

export const deleteContactController = async (req: Request, res: Response) => {
  const contactId: string = req.params.id;
  await deleteContactService(contactId);

  return res.status(204).json({});
};
