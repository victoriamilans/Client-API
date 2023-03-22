import { Router } from "express";
import { clientLoginController } from "../controllers/Client/clientLogin.controller";

const loginRoute = Router();

loginRoute.post("", clientLoginController);

export default loginRoute;
