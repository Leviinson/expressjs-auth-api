import { Request, Response } from "express";

import sequelize from "@/db/models/init";
import UserRepo from "@/db/models/repos/user";

import sendConfirmationEmail from "./services/mailer";
import { createUserWithToken, validateRegisteredUser } from "./services/signUp";

async function signUpController(req: Request, res: Response): Promise<void> {
    const { username, email, password } = req.body;
    const userRepo = new UserRepo();

    const validationData = await validateRegisteredUser(
        username,
        email,
        userRepo
    );

    if (!validationData.isValid) {
        res.status(validationData.code!).json({
            status: validationData.status,
            takenFields: validationData.takenFields,
            message: validationData.messages,
        });
        return;
    }

    const transaction = await sequelize.transaction();
    try {
        const { confirmationTokenValue } = await createUserWithToken(
            username,
            email,
            password
        );
        await sendConfirmationEmail(email, username, confirmationTokenValue);
        await transaction.commit();
        res.status(201).json({
            status: "success",
            message: "Confirmation email successfully sent. Inactive user created.",
        });
    } catch (err) {
        await transaction.rollback();
        throw err;
    }
}

export default signUpController;
