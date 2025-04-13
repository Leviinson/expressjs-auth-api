import { Router } from "express";

import signInController from "../controllers/auth/signIn";
const authRouter = Router();

authRouter.get("/signin", signInController);

export default authRouter;
