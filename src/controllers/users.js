import { prisma } from "../prisma.js";
import { createUserSchema, updateUserSchema } from "../validators/users.js";

export const listUsers = async (req, res, next) => {
  try {
    const users = await prisma.user.findMany({ include: { contacts: true } });
    res.json(users);
  } catch (error) {
    next(error);
  }
};

export const createUser = async (req, res, next) => {
  try {
    const data = createUserSchema.parse(req.body);
    const user = await prisma.user.create({ data });
    res.status(201).json(user);
  } catch (e) {
    next(e);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const user = await prisma.user.findUnique({
      where: { id },
      include: { contacts: true },
    });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (e) {
    next(e);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const data = updateUserSchema.parse(req.body);
    const user = await prisma.user.update({ where: { id }, data });
    res.json(user);
  } catch (e) {
    next(e);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    await prisma.user.delete({ where: { id } });
    res.status(204).send();
  } catch (e) {
    next(e);
  }
};
