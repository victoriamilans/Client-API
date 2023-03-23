import { Router } from "express";
import { clientUpdateController } from "../controllers/Client/clientUpdate.controller";
import { createClientController } from "../controllers/Client/createClient.controller";
import { deleteClientController } from "../controllers/Client/deleteClient.controller";
import { listAllClientsController } from "../controllers/Client/listAllClients.controller";
import { listClientByIdController } from "../controllers/Client/listClientById.controller";
import { ensureDataIsValidMiddleware } from "../middlewares/validatedSchema.middleware";
import { verifyClientPermissionMiddleware } from "../middlewares/verifyClientPermission.middleware";
import { verifyClientTokenMiddleware } from "../middlewares/verifyClientToken.middleware";
import { verifyEmailAlredyExistsMiddleware } from "../middlewares/verifyEmailAlredyExists.middleware";
import { clientSchema, clientUpdateSchema } from "../schemas/client.schema";

const clientRoutes = Router();

clientRoutes.post(
  "",
  ensureDataIsValidMiddleware(clientSchema),
  verifyEmailAlredyExistsMiddleware,
  createClientController
);

clientRoutes.get("", listAllClientsController);

clientRoutes.patch(
  "/:id",
  verifyClientTokenMiddleware,
  verifyClientPermissionMiddleware,
  ensureDataIsValidMiddleware(clientUpdateSchema),
  verifyEmailAlredyExistsMiddleware,
  clientUpdateController
);

clientRoutes.get("/:id", listClientByIdController);

clientRoutes.delete(
  "/:id",
  verifyClientTokenMiddleware,
  verifyClientPermissionMiddleware,
  deleteClientController
);

export default clientRoutes;
