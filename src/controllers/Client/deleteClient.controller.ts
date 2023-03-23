import { Request, Response } from "express";
import { deleteClientService } from "../../services/Client/deleteClient.service";

export const deleteClientController = async (req: Request, res: Response) => {
  const clientId: string = req.params.id;
  await deleteClientService(clientId);

  return res.status(204).json({});
};
