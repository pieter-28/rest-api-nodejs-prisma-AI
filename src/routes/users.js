import { Router } from "express";
import {
  createUser,
  deleteUser,
  getUser,
  listUsers,
  updateUser,
} from "../controllers/users.js";

const userRouter = Router();
userRouter.get("/", listUsers);
userRouter.post("/", createUser);
userRouter.get("/:id", getUser);
userRouter.patch("/:id", updateUser);
userRouter.delete("/:id", deleteUser);

export default userRouter;
