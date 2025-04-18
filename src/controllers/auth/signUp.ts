import { Request, Response } from "express";
import { validationResult } from "express-validator";

import UserRepo from "@/db/models/repos/user";

import sendConfirmationEmail from "./services/mailer";

async function signUpController(req: Request, res: Response): Promise<void> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
    } else {
        const userRepo = new UserRepo();
        const { username, email, password } = req.body;
        await userRepo.create({
            username: username,
            email: email,
            password: password,
        });
        await sendConfirmationEmail(email, username);
        res.status(201).json({ message: "Please, confirm you email." });
    }
}

export default signUpController;
