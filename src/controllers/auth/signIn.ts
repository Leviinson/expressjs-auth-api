import { Request, Response } from "express";

import authenticate from "@/services/auth/authenticate";
import login from "@/services/auth/login";

import { issueJWTokens } from "./services/jwt";

async function signInController(req: Request, res: Response): Promise<void> {
    const user = await authenticate({
        username: req.body.username,
        password: req.body.password,
    });

    if (user) {
        const { access, refresh } = issueJWTokens(user.id);
        await login(user, res, refresh);
        res.status(200).json({
            status: "success",
            message: "Access token successfully issued",
            access: access,
        });
    } else {
        res.status(401).json({
            message: "Invalid credentials",
            status: "error",
        });
    }
}

export default signInController;
