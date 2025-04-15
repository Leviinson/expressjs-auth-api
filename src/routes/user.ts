import { Route } from "express";

import { userProfileController } from "@/controllers/user";
import loadUser from "@/middlewares/user/loadUser";
import requireAuth from "@/middlewares/user/requireAuth";

const userRoute = Route();

userRoute.use(requireAuth);
userRoute.use(loadUser);
userRoute.get("/", userProfileController);

export default userRoute;
