import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import { issueJWTokens } from "./services/jwt";

async function refreshJWToken(req: Request, res: Response): Promise<void> {
    const refreshToken = req.signedCookies.refresh;
    try {
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET_KEY!);
    } catch {
        res.status(401).json({
            status: "error",
            message: "Invalid refresh token",
        });
        return;
    }
    const { access, refresh } = issueJWTokens(res.locals.userId);
    res.cookie("refresh", refresh, {
        httpOnly: true,
        signed: true,
        secure: process.env.NODE_ENV === "production",
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        sameSite: "strict",
    });
    res.status(200).json({ access: access });
}

export default refreshJWToken;
