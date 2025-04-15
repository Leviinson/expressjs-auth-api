import { Route } from "express";
import { body } from "express-validator";

import activateUserController from "@/controllers/auth/activateUser";
import refreshJWToken from "@/controllers/auth/refreshToken";
import signInController from "@/controllers/auth/signIn";
import signUpController from "@/controllers/auth/signUp";

const authRoute = Route();

authRoute.post(
    "/signin",
    body("username").isString().notEmpty().isLength({ min: 5, max: 50 }),
    body("password").isString().isLength({ min: 10 }),
    signInController
);
authRoute.post("/signup", signUpController);
authRoute.post("/activate", activateUserController);
authRoute.post("/refreshToken", refreshJWToken);

export default authRoute;
