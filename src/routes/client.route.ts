import { Router } from "express";
import { clientUpdateController } from "../controllers/clientUpdate.controller";
import { createClientController } from "../controllers/createClient.controller";
import { deleteClientController } from "../controllers/deleteClient.controller";
import { listAllClientsController } from "../controllers/listAllClients.controller";
import { listClientByIdController } from "../controllers/listClientById.controller";
import { ensureDataIsValidMiddleware } from "../middlewares/validatedSchema.middleware";
import { verifyEmailAlredyExistsMiddleware } from "../middlewares/verifyEmailAlredyExists.middleware";
import { clientSchema, clientUpdateSchema } from "../schemas/client.schema";

const clientRoutes = Router();

clientRoutes.post(
  "",
  verifyEmailAlredyExistsMiddleware,
  ensureDataIsValidMiddleware(clientSchema),
  createClientController
);

clientRoutes.get("", listAllClientsController);

clientRoutes.patch(
  "/:id",
  verifyEmailAlredyExistsMiddleware,
  ensureDataIsValidMiddleware(clientUpdateSchema),
  clientUpdateController
);

clientRoutes.get("/:id", listClientByIdController);

clientRoutes.delete("/:id", deleteClientController);

export default clientRoutes;
