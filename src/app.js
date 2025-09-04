// src/app.js
import express from "express";
import userRouter from "./routes/users.js";
import contactRouter from "./routes/contacts.js";
import addressRoute from "./routes/addresses.js";
import { errorHandler } from "./middlewares/error.js";

const app = express();
app.use(express.json());

// health check
app.get("/", (req, res) => res.json({ status: "ok" }));

// routes
app.use("/api", userRouter);
app.use("/api", contactRouter);
app.use("/api", addressRoute);

// error handler middleware
app.use(errorHandler);

export default app;
