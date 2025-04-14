import { IncomingHttpHeaders } from "http";

import { Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface Payload extends JwtPayload {
    id: number;
}

async function isTokenValid(
    headers: IncomingHttpHeaders,
    res: Response
): Promise<boolean> {
    const authHeader = headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer ")) {
        const givenAccessToken: string = authHeader.slice(7);
        try {
            const payload = jwt.verify(
                givenAccessToken,
                process.env.SECRET_KEY!
            ) as Payload;
            res.locals.userId = payload.id;
            return true;
        } catch (err) {
            console.log(err)
            return false;
        }
    }
    return false;
}

export default isTokenValid;
