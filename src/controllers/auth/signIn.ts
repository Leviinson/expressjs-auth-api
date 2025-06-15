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
        await login(user);
        const { access, refresh } = issueJWTokens(user.id);
        res.cookie("refresh", refresh, {
            httpOnly: true,
            signed: true,
            secure: process.env.NODE_ENV === "production",
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            sameSite: "strict",
        });
        res.status(200).json({
            status: "success",
            message: "Access token successfully issues",
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
