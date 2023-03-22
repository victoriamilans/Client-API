import { Request, Response } from "express";
import { ILogin } from "../../interfaces/login.interface";
import { clientLoginService } from "../../services/Client/clientLogin.service";

export const clientLoginController = async (req: Request, res: Response) => {
  const login: ILogin = req.body;
  const token = await clientLoginService(login);

  return res.json(token);
};
