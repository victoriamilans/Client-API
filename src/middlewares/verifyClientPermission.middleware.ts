import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import Client from "../entities/client.entity";
import { AppError } from "../errors";

export const verifyClientPermissionMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const clientRepository = AppDataSource.getRepository(Client);
  const verifyClient = await clientRepository.findOneBy({ id: req.params.id });

  if (!verifyClient) {
    throw new AppError("Client not found", 404);
  }

  if (req.params.id !== String(req.client.id)) {
    throw new AppError("Missing permission", 401);
  }

  return next();
};
