import request from "supertest";

import app from "@/app";
import sendConfirmationEmail from "@/controllers/auth/services/mailer";
import ConfirmationTokenRepo from "@/db/models/repos/ConfirmationToken";

import { getCSRFToken } from "../services/auth";

jest.mock("@/controllers/auth/services/mailer");

describe("POST /auth/signup", () => {
    it("must create confirmation token and send email", async () => {
        const userData = {
            username: "melnykovvv",
            password: "dna9hnz(*&6dsahtdEe7h",
            email: "melnykov.vitalii197@gmail.com",
        };

        const agent = request.agent(app);
        const csrfToken = await getCSRFToken(agent);
        const response = await agent
            .post("/auth/signup")
            .send({ ...userData, csrftoken: csrfToken });

        const confirmationToken =
            await new ConfirmationTokenRepo().getTokenByUserId({
                userId: response.body.id,
            });
        expect(confirmationToken).not.toBeNull();
        expect(response.status).toStrictEqual(201);
        expect(sendConfirmationEmail).toHaveBeenCalledWith(
            userData.email,
            userData.username,
            confirmationToken!.value
        );
    });
});
