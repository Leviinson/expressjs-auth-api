import request from "supertest";

import app from "@/app";
import sendConfirmationEmail from "@/controllers/auth/services/mailer";
import ConfirmationTokenRepo from "@/db/models/repos/ConfirmationToken";

jest.mock("@/controllers/auth/services/mailer");

describe("POST /auth/signup", () => {
    it("must create confirmation token and send email", async () => {
        const userData = {
            username: "melnykovvv",
            password: "dna9hnz(*&6dsahtdEe7h",
            email: "melnykov.vitalii197@gmail.com",
        };
        const response = await request(app).post("/auth/signup").send(userData);
        const confirmationToken =
            await new ConfirmationTokenRepo().getTokenByUserId(
                response.body.id
            );
        expect(confirmationToken).not.toBeNull();
        expect(response.status).toStrictEqual(201);
        expect(sendConfirmationEmail).toHaveBeenCalledWith(
            userData.email,
            userData.username,
            confirmationToken!.value
        );
    });
});
