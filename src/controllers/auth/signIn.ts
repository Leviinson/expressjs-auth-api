import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import { Payload } from "@/middlewares/user/services/tokenValidation";
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
        process.env.ACCESS_TOKEN_SECRET_KEY!,
        { expiresIn: "7d" }
    );

    return { access: accessToken, refresh: refreshToken };
}

async function signInController(req: Request, res: Response): Promise<void> {
    const user = await authenticate({
        username: req.body.username,
        password: req.body.password,
    });

    if (user) {
        await login(user);
        res.status(200).json(issueJWTokens(user.id));
    } else {
        res.status(401).json({ message: "Invalid credentials" });
    }
}

export { issueJWTokens };
export default signInController;
