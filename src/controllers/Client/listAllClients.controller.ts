import { Request, Response } from "express";
import { listAllClientsService } from "../../services/Client/listAllClients.service";

export const listAllClientsController = async (req: Request, res: Response) => {
  const params = req.params;
  const clients = await listAllClientsService(params);

  return res.json(clients);
};
