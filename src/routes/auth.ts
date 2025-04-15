import { Router } from "express";

import activateUserController from "../controllers/auth/activateUser";
import refreshJWToken from "../controllers/auth/refreshToken";
import signInController from "../controllers/auth/signIn";
import signUpController from "../controllers/auth/signUp";

const authRouter = Router();

authRouter.post("/signin", signInController);
authRouter.post("/signup", signUpController);
authRouter.post("/activate", activateUserController);
authRouter.post("/refreshToken", refreshJWToken);

export default authRouter;
