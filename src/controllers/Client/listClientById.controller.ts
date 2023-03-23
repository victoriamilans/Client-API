import { Request, Response } from "express";
import { listClientByIdService } from "../../services/Client/listClientById.service";

export const listClientByIdController = async (req: Request, res: Response) => {
  const clientId: string = req.params.id;

  const client = await listClientByIdService(clientId);

  return res.json(client);
};
