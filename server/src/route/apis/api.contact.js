import { Router } from "express";
import contactController from "../../controllers/contact.controller.js";

const contactRouter = Router();

contactRouter.post('/create', contactController.createContact);
contactRouter.get('/', contactController.getContacts);
contactRouter.get('/:id', contactController.readIdContact);

export default contactRouter;
