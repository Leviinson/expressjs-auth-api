import { Router } from "express";

import { userProfileController } from "@/controllers/user";
import loadUser from "@/middlewares/auth/loadUser";
import requireAuth from "@/middlewares/auth/requireAuth";

const userRouter = Router();

userRouter.use(requireAuth);
userRouter.use(loadUser);
userRouter.get("/", userProfileController);

export default userRouter;
