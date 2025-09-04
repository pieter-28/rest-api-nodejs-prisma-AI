import { prisma } from "../prisma.js";
import {
  createContactSchema,
  updateContactSchema,
} from "../validators/contacts.js";

export const listContactsByUser = async (req, res, next) => {
  try {
    const userId = Number(req.params.userId);
    const contacts = await prisma.contact.findMany({
      where: { userId },
      include: { addresses: true },
    });
    res.json(contacts);
  } catch (e) {
    next(e);
  }
};

export const createContactForUser = async (req, res, next) => {
  try {
    const userId = Number(req.params.userId);
    const data = createContactSchema.parse(req.body);
    const contact = await prisma.contact.create({ data: { ...data, userId } });
    res.status(201).json(contact);
  } catch (e) {
    next(e);
  }
};

export const getContact = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const contact = await prisma.contact.findUnique({
      where: { id },
      include: { addresses: true, user: true },
    });
    if (!contact) return res.status(404).json({ error: "Contact not found" });
    res.json(contact);
  } catch (e) {
    next(e);
  }
};

export const updateContact = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const data = updateContactSchema.parse(req.body);
    const contact = await prisma.contact.update({ where: { id }, data });
    res.json(contact);
  } catch (e) {
    next(e);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    await prisma.contact.delete({ where: { id } });
    res.status(204).send();
  } catch (e) {
    next(e);
  }
};
