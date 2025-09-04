import { Router } from "express";
import {
  createAddressForContact,
  deleteAddress,
  getAddress,
  listAddressesByContact,
  updateAddress,
} from "../controllers/addresses.js";

const addressRoute = Router();
addressRoute.get("/contacts/:contactId/addresses", listAddressesByContact);
addressRoute.post("/contacts/:contactId/addresses", createAddressForContact);
addressRoute.get("/addresses/:id", getAddress);
addressRoute.patch("/addresses/:id", updateAddress);
addressRoute.delete("/addresses/:id", deleteAddress);

export default addressRoute;
