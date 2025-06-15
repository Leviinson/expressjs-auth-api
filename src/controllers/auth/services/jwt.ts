import jwt from "jsonwebtoken";

import { Payload } from "@/middlewares/services/tokenValidation";

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

export { issueJWTokens };
