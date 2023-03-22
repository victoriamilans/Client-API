import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../../data-source";
import Client from "../../entities/client.entity";
import { AppError } from "../../errors";
import { ILogin } from "../../interfaces/login.interface";
import "dotenv/config";

export const clientLoginService = async (payload: ILogin): Promise<object> => {
  const clientRepository = AppDataSource.getRepository(Client);

  const client: Client | null = await clientRepository.findOneBy({
    email: payload.email,
  });

  if (!client) {
    throw new AppError("Invalid credentials", 401);
  }

  const passwordMatch = await compare(payload.password, client.password);

  if (!passwordMatch) {
    throw new AppError("Invalid credentials", 403);
  }

  const token = jwt.sign({}, process.env.SECRET_KEY!, {
    subject: client.id,
  });

  return { token: token };
};
