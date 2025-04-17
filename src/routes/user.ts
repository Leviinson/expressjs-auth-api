import { Router } from "express";

import { userProfileController } from "@/controllers/user";
import loadUserMiddleware from "@/middlewares/auth/loadUser";
import requireAuthMiddleware from "@/middlewares/auth/requireAuth";
import toBeActiveMiddleware from "@/middlewares/auth/toBeActive";

const userRouter = Router();

userRouter.use(requireAuthMiddleware);
userRouter.use(loadUserMiddleware);
userRouter.use(toBeActiveMiddleware);
userRouter.get("/", userProfileController);

export default userRouter;
