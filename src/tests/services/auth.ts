import request, { Test } from "supertest";
import TestAgent from "supertest/lib/agent";

import app from "@/app";
import UserRepo from "@/db/models/repos/user";

async function createUserAndLogin(
    userDataOverride = {},
    agent?: TestAgent<Test>
) {
    const userData = {
        email: "test@gmail.com",
        username: "levinsxn",
        password: "dsaasddsaaa",
        ...userDataOverride,
    };

    const userRepo = new UserRepo();
    const user = await userRepo.create({ ...userData });

    const requestAgent = agent ? agent : request(app);
    const signInRes = await requestAgent
        .post("/auth/signin")
        .send({ username: userData.username, password: userData.password });
    return { response: signInRes, user: user };
}

export default createUserAndLogin;
