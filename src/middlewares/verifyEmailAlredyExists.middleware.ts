import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import Client from "../entities/client.entity";
import { AppError } from "../errors";

export const verifyEmailAlredyExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const clientRepository: Repository<Client> =
    AppDataSource.getRepository(Client);

  const emailAlredyExists = await clientRepository.findOne({
    where: { email: req.body.email },
  });

  if (emailAlredyExists) {
    throw new AppError("Email alredy exists", 409);
  }

  next();
};
