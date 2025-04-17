import { Request, Response } from "express";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";

import { Payload } from "@/middlewares/auth/services/tokenValidation";
import authenticate from "@/services/auth/authenticate";
import login from "@/services/auth/login";

type accessToken = string;
type refreshToken = string;

type JWTokens = { access: accessToken; refresh: refreshToken };

function issueJWTokens(userId: number): JWTokens {
    const payload: Payload = { id: userId };

    const accessToken = jwt.sign(
        payload,
        process.env.ACCESS_TOKEN_SECRET_KEY!,
        { expiresIn: "15m" }
    );
    const refreshToken = jwt.sign(
        payload,
        process.env.REFRESH_TOKEN_SECRET_KEY!,
        { expiresIn: "7d" }
    );

    return { access: accessToken, refresh: refreshToken };
}

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

export { issueJWTokens };
export default signInController;
