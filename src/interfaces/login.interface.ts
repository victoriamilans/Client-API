import { z } from "zod";
import { loginSchema } from "../schemas/login.schema";

export type ILogin = z.infer<typeof loginSchema>;
