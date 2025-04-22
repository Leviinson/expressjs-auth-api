import request from "supertest";

import app from "@/app";
import logger from "@/services/log";

import createUserAndLogin from "../services/auth";

describe("GET /", () => {
    it("(unauthorized): it must redirect to the /auth/sigin", async () => {
        const res = await request(app).get("/me");
        expect(res.status).toBe(401);
    });

    it("(authorized, inactiv): it must return 401 error", async () => {
        try {
            const { response, user } = await createUserAndLogin({
                isActive: true,
            });
            expect(response.status).toStrictEqual(200);

            const accessToken = response.body.access;
            user!.isActive = false;
            await user!.save({ fields: ["isActive"] });

            const userProfileRes = await request(app)
                .get("/me")
                .set("Authorization", `Bearer ${accessToken}`);

            expect(userProfileRes.status).toStrictEqual(401);
        } catch (err) {
            logger.error(err);
            throw err;
        }
    });

    it("(authorized, activ): it must return user data", async () => {
        const { response, user } = await createUserAndLogin({ isActive: true });
        expect(response.status).toStrictEqual(200);

        const accessToken = response.body.access;

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
