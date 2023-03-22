import { Request, Response } from "express";
import { listAllClientsService } from "../../services/Client/listAllClients.service";

export const listAllClientsController = async (req: Request, res: Response) => {
  const clients = await listAllClientsService();

  return res.json(clients);
};
