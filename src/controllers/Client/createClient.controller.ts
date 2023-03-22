import { Request, Response } from "express";
import { IClient } from "../../interfaces/client.interface";
import { createClientService } from "../../services/Client/createClient.service";

export const createClientController = async (req: Request, res: Response) => {
  const clientData: IClient = req.body;
  const newClient = await createClientService(clientData);
  return res.status(201).json(newClient);
};
