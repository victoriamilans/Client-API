import { Request, Response } from "express";
import { deleteClientService } from "../services/deleteClient.service";

export const deleteClientController = async (req: Request, res: Response) => {
  const clientId: string = req.params.id;
  const client = deleteClientService(clientId);

  return res.status(204).json({});
};
