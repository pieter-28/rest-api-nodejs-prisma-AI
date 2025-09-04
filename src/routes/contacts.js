import { Router } from "express";
import {
  createContactForUser,
  deleteContact,
  getContact,
  listContactsByUser,
  updateContact,
} from "../controllers/contacts.js";

const contactRouter = Router();
contactRouter.get("/users/:userId/contacts", listContactsByUser);
contactRouter.post("/users/:userId/contacts", createContactForUser);
contactRouter.get("/contacts/:id", getContact);
contactRouter.patch("/contacts/:id", updateContact);
contactRouter.delete("/contacts/:id", deleteContact);
export default contactRouter;
