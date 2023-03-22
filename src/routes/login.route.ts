import { Router } from "express";
import { clientLoginController } from "../controllers/clientLogin.controller";

const loginRoute = Router();

loginRoute.post("", clientLoginController);

export default loginRoute;
