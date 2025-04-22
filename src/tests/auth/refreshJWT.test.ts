import request from "supertest";

import app from "@/app";

import createUserAndLogin from "../services/auth";

describe("POST /auth/refresh", () => {
    it("has to issue new AccessJWT using RefreshJWT from httpOnly cookies", async () => {
        const agent = request.agent(app);
        const { csrfToken } = await createUserAndLogin(
            { isActive: true },
            agent
        );
        const refreshTokenRes = await agent
            .post("/auth/refresh")
            .send({ csrftoken: csrfToken })
        expect(refreshTokenRes.body).toEqual(
            expect.objectContaining({
                access: expect.any(String),
            })
        );
    });
});
