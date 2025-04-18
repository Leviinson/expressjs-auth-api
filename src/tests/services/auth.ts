import request from "supertest";

import app from "@/app";
import UserRepo from "@/db/models/repos/user";

async function createUserAndLogin(userDataOverride = {}) {
    const userData = {
        email: "test@gmail.com",
        username: "levinsxn",
        password: "dsaasddsaaa",
        ...userDataOverride,
    };

    const userRepo = new UserRepo();
    const user = await userRepo.create({ ...userData });

    const signInRes = await request(app)
        .post("/auth/signin")
        .send({ username: userData.username, password: userData.password });
    return { response: signInRes, user: user };
}

export default createUserAndLogin;
