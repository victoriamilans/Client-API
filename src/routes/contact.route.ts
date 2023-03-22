import { Router } from "express";
import { clientUpdateController } from "../controllers/Client/clientUpdate.controller";
import { createClientController } from "../controllers/Client/createClient.controller";
import { deleteClientController } from "../controllers/Client/deleteClient.controller";
import { listAllClientsController } from "../controllers/Client/listAllClients.controller";
import { listClientByIdController } from "../controllers/Client/listClientById.controller";
import { createContactController } from "../controllers/Contacts/createContact.controller";
import { ensureDataIsValidMiddleware } from "../middlewares/validatedSchema.middleware";
import { verifyClientTokenMiddleware } from "../middlewares/verifyClientToken.middleware";
import { contactSchema } from "../schemas/contact.schema";

const contactRoutes = Router();

contactRoutes.post(
  "",
  ensureDataIsValidMiddleware(contactSchema),
  verifyClientTokenMiddleware,
  createContactController
);

export default contactRoutes;
