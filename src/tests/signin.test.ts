import request from "supertest";

import app from "@/app";
import UserRepo from "@/db/models/repos/user";

describe("POST /auth/signin", () => {
    it("must return access and refresh token", async () => {
        const userData = {
            email: "test@gmail.com",
            username: "levinsxn",
            password: "dsaasddsaaa",
        };
        const userRepo = new UserRepo();
        await userRepo.create({ ...userData });

        const signInRes = await request(app)
            .post("/auth/signin")
            .send({ username: userData.username, password: userData.password });

        expect(signInRes.status).toStrictEqual(200);
        expect(signInRes.body).toMatchObject({
            access: expect.any(String),
        });
    });
});
