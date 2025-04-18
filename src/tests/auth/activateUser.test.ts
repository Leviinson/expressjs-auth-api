import request from "supertest";
import { v4 as uuidv4 } from "uuid";

import app from "@/app";
import { generateExpirationDate } from "@/controllers/auth/services/signUp";
import ConfirmationTokenRepo from "@/db/models/repos/ConfirmationToken";
import UserRepo from "@/db/models/repos/user";

import createUserAndLogin from "../services/auth";

describe("GET /auth/activate?token=*", () => {
    it("has to activate an inactive user", async () => {
        const { user } = await createUserAndLogin();
        const confirmationToken = await new ConfirmationTokenRepo().create({
            expAt: generateExpirationDate(new Date()),
            userId: user!.id,
            value: uuidv4(),
        });

        const notActivatedUser = await new UserRepo().getUserById(user!.id);
        expect(notActivatedUser!.isActive).toBe(false);

        const userActivationRes = await request(app)
            .get("/auth/activate")
            .query({ token: confirmationToken!.value });
        const activatedUser = await new UserRepo().getUserById(user!.id);

        expect(userActivationRes.status).toStrictEqual(200);
        expect(activatedUser!.isActive).toBe(true);
    });
});
