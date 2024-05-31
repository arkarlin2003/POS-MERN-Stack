import { Router } from "express";
import { login, logout, register } from "../controllers/auth/AuthController.js";
import { authenticate } from "../middlewares/authenticate.js";

const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", authenticate, logout);

export default authRouter;
