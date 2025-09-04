import { prisma } from "../prisma.js";
import {
  createAddressSchema,
  updateAddressSchema,
} from "../validators/addresses.js";

export const listAddressesByContact = async (req, res, next) => {
  try {
    const contactId = Number(req.params.contactId);
    const addresses = await prisma.address.findMany({ where: { contactId } });
    res.json(addresses);
  } catch (e) {
    next(e);
  }
};

export const createAddressForContact = async (req, res, next) => {
  try {
    const contactId = Number(req.params.contactId);
    const data = createAddressSchema.parse(req.body);
    const address = await prisma.address.create({
      data: { ...data, contactId },
    });
    res.status(201).json(address);
  } catch (e) {
    next(e);
  }
};

export const getAddress = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const address = await prisma.address.findUnique({ where: { id } });
    if (!address) return res.status(404).json({ error: "Address not found" });
    res.json(address);
  } catch (e) {
    next(e);
  }
};

export const updateAddress = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const data = updateAddressSchema.parse(req.body);
    const address = await prisma.address.update({ where: { id }, data });
    res.json(address);
  } catch (e) {
    next(e);
  }
};

export const deleteAddress = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    await prisma.address.delete({ where: { id } });
    res.status(204).send();
  } catch (e) {
    next(e);
  }
};
