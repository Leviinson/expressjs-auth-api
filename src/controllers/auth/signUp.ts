import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { v4 as uuidv4 } from "uuid";

import sequelize from "@/db/models/init";
import ConfirmationTokenRepo from "@/db/models/repos/ConfirmationToken";
import UserRepo from "@/db/models/repos/user";

import sendConfirmationEmail from "./services/mailer";
import { generateExpirationDate } from "./services/signUp";

async function signUpController(req: Request, res: Response): Promise<void> {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
    } else {
        const { username, email, password } = req.body;

        const transaction = await sequelize.transaction();
        try {
            const userRepo = new UserRepo();
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
            await sendConfirmationEmail(
                email,
                username,
                confirmationToken.value
            );
            await transaction.commit();
            res.status(201).json({
                id: user.id,
                message: "Please, confirm you email.",
            });
        } catch (err) {
            await transaction.rollback();
            throw err;
        }
    }
}

export default signUpController;
