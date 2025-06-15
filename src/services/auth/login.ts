import { Response } from "express";

import User from "@/db/models/User";

async function login(
    user: User,
    res: Response,
    refreshToken: string
): Promise<void> {
    user.lastLogin = new Date();
    await user.save({ fields: ["lastLogin"] });

    res.cookie("refresh", refreshToken, {
        httpOnly: true,
        signed: true,
        secure: process.env.NODE_ENV === "production",
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        sameSite: "strict",
    });
}

export default login;
