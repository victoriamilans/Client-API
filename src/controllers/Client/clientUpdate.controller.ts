import { Request, Response } from "express";
import { IClientUpdate } from "../../interfaces/client.interface";
import { clientUpdateService } from "../../services/Client/clientUpdate.service";

export const clientUpdateController = async (req: Request, res: Response) => {
  const userData: IClientUpdate = req.body;
  const clientId: string = req.params.id;

  const client = await clientUpdateService(clientId, userData);

  return res.json(client);
};
