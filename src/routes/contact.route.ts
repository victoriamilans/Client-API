import { Router } from "express";
import { createContactController } from "../controllers/Contacts/createContact.controller";
import { deleteContactController } from "../controllers/Contacts/deleteContact.controller";
import { listClientContactController } from "../controllers/Contacts/listClientContacts.controller";
import { updateContactController } from "../controllers/Contacts/updateContact.controller";
import { ensureDataIsValidMiddleware } from "../middlewares/validatedSchema.middleware";
import { verifyClientTokenMiddleware } from "../middlewares/verifyClientToken.middleware";
import { contactSchema, contactUpdateSchema } from "../schemas/contact.schema";

const contactRoutes = Router();

contactRoutes.post(
  "",
  ensureDataIsValidMiddleware(contactSchema),
  verifyClientTokenMiddleware,
  createContactController
);

contactRoutes.get("", verifyClientTokenMiddleware, listClientContactController);

contactRoutes.patch(
  "/:id",
  ensureDataIsValidMiddleware(contactUpdateSchema),
  verifyClientTokenMiddleware,
  updateContactController
);

contactRoutes.delete(
  "/:id",
  verifyClientTokenMiddleware,
  deleteContactController
);

export default contactRoutes;
