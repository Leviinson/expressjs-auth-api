import request from "supertest";

import app from "../src/app";
import UserRepo from "../src/db/models/repos/user";

describe("GET /", () => {
    it("(unauthorized): it must redirect to the /auth/sigin", async () => {
        const res = await request(app).get("/");
        expect(res.status).toBe(401);
    });

    it("(authorized, is not activated): it must display user profile", async () => {
        const userData = {
            email: "test@gmail.com",
            username: "levinsxn",
            password: "dsaasddsa",
        };
        const user = await new UserRepo().create({ ...userData });

        const signInRes = await request(app)
            .post("/auth/signin")
            .send({ username: userData.username, password: userData.password });
        const accessToken = signInRes.body.access;

        const userProfileRes = await request(app)
            .get("/")
            .set("Authorization", `Bearer ${accessToken}`);
        expect(userProfileRes.status).toStrictEqual(200);
        expect(userProfileRes.body).toEqual({
            username: user.username,
            email: user.email,
        });

        await user.destroy();
    });
});
