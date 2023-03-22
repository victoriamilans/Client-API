import { Request, Response } from "express";
import { listClientContactsService } from "../../services/Contacts/listClientContact.service";

export const listClientContactController = async (
  req: Request,
  res: Response
) => {
  const client: string = String(req.client.id);
  const params = req.query;

  const contacts = await listClientContactsService(client, params);

  return res.json(contacts);
};
