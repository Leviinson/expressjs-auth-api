import { Router } from "express";

import { userProfileController } from "../controllers/user";
import loadUser from "../middlewares/loadUser";
import requireAuth from "../middlewares/requireAuth";

const userRouter = Router();

userRouter.use(requireAuth);
userRouter.use(loadUser);
userRouter.get("/", userProfileController);

export default userRouter;
