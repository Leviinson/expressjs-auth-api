import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

import sequelize from "@/db/models/init";
import ConfirmationTokenRepo from "@/db/models/repos/ConfirmationToken";
import UserRepo from "@/db/models/repos/user";

import sendConfirmationEmail from "./services/mailer";
import { generateExpirationDate } from "./services/signUp";

async function validateRegisteredUser(
    username: string,
    email: string,
    userRepo: UserRepo
) {
    const { isFree, takenFields } = await userRepo.usernameAndEmailAreFree(
        username,
        email
    );

    if (!isFree) {
        return {
            isValid: false,
            code: 409,
            status: "error",
            takenFields: takenFields,
            messages: "User with the same credentials already exists.",
        };
    }
    return {
        isValid: true,
    };
}

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
        const user = await userRepo.create({
            username: username,
            email: email,
            password: password,
        });

        const confirmationToken = await new ConfirmationTokenRepo().create({
            expAt: generateExpirationDate(new Date()),
            userId: user.id,
            value: uuidv4(),
        });

        await sendConfirmationEmail(email, username, confirmationToken.value);
        await transaction.commit();
        res.status(201).json({
            id: user.id,
        });
    } catch (err) {
        await transaction.rollback();
        throw err;
    }
}

export default signUpController;
