import { Request, Response } from "express";
import { validationResult } from "express-validator";

import authenticate from "@/services/auth/authenticate";
import login from "@/services/auth/login";

import { issueJWTokens } from "./services/jwt";

async function signInController(req: Request, res: Response): Promise<void> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }
    const user = await authenticate({
        username: req.body.username,
        password: req.body.password,
    });

    if (user) {
        await login(user);
        const { access, refresh } = issueJWTokens(user.id);
        res.cookie("refresh", refresh, {
            httpOnly: true,
            signed: true,
            secure: true,
        });
        res.status(200).json({ access: access });
    } else {
        res.status(401).json({ message: "Invalid credentials" });
    }
}

export default signInController;
