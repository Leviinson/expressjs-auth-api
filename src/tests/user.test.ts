import request from "supertest";

import app from "@/app";
import UserRepo from "@/db/models/repos/user";
import User from "@/db/models/User";

describe("GET /", () => {
    it("(unauthorized): it must redirect to the /auth/sigin", async () => {
        const res = await request(app).get("/me");
        expect(res.status).toBe(401);
    });

    it("(authorized, is not activated): it must display user profile", async () => {
        const userData = {
            email: "test@gmail.com",
            username: "levinsxn",
            password: "dsaasddsaaa",
        };
        const userRepo = new UserRepo();
        await userRepo.create({ ...userData });
        const user: User | null = await userRepo.getUserByUsername(
            userData.username,
            ["username", "password", "email"]
        );

        const signInRes = await request(app)
            .post("/auth/signin")
            .send({ username: userData.username, password: userData.password });
        const accessToken = signInRes.body.access;

        const userProfileRes = await request(app)
            .get("/me")
            .set("Authorization", `Bearer ${accessToken}`);

        expect(userProfileRes.status).toStrictEqual(200);
        expect(userProfileRes.body).toMatchObject({
            username: user!.username,
            email: user!.email,
        });
    });
});
