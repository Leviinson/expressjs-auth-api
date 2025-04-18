import { Router } from "express";
import { body, query } from "express-validator";

import activateUserController from "@/controllers/auth/activateUser";
import refreshJWToken from "@/controllers/auth/refreshToken";
import signInController from "@/controllers/auth/signIn";
import signUpController from "@/controllers/auth/signUp";

const authRouter = Router();

authRouter.post(
    "/signin",
    body("username").isString().notEmpty().isLength({ min: 5, max: 50 }),
    body("password").isString().isLength({ min: 10 }),
    signInController
);
authRouter.post(
    "/signup",
    body("username").isString().notEmpty().isLength({ min: 5, max: 50 }),
    body("email").isEmail(),
    body("password").isStrongPassword({ minLength: 10 }),
    signUpController
);
authRouter.get("/activate", query("token").isUUID(4), activateUserController);
authRouter.post("/refreshToken", refreshJWToken);

export default authRouter;
