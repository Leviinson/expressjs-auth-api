import { IncomingHttpHeaders } from "http";

import { Response } from "express";
import jwt from "jsonwebtoken";

type Payload = {
    id: number;
};

/**
 * This util validates passed accessToken
 * decoding JWT token using SECRET_KEY
 * envvar.
 *
 * Also it assignes userId from decoded payload
 * to the reponse locals.
 *
 * It returns boolean value that indicates
 * if accessToken was passed into "Authorization" header
 * with "Bearer" authorization scheme prefix and is valid.
 *
 * @param headers - The incoming HTTP headers.
 * @param res - the HttpResponse object.
 * @returns A boolean indicating if the token was passed and is valid.
 */
async function isTokenValid(
    headers: IncomingHttpHeaders,
    res: Response
): Promise<boolean> {
    const authHeader = headers.authorization;

    if (!(authHeader && authHeader.startsWith("Bearer "))) {
        res.locals.userId = null;
        return false;
    }

    const givenAccessToken: string = authHeader.slice(7);
    try {
        const payload = jwt.verify(
            givenAccessToken,
            process.env.ACCESS_TOKEN_SECRET_KEY!
        ) as Payload;

        res.locals.userId = payload.id;
        return true;
    } catch {
        res.locals.userId = null;
        return false;
    }
}

export { Payload };
export default isTokenValid;
