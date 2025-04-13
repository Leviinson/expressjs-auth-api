import { Router } from "express";

import { userProfileController } from "../controllers/user";

const userRouter = Router();
userRouter.get("/", userProfileController);

export default userRouter;
