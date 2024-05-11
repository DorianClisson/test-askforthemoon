import { Router } from "express";
import { addUser } from "./addUser";
import { login } from "./login";

export const usersRouter = Router();

usersRouter.post("/login", login);
usersRouter.post("/addUser", addUser);
