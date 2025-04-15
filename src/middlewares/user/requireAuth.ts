import { Request, Response, NextFunction } from "express";

import isTokenValid from "./services/tokenValidation";

/**
 * This middleware assignes user id
 * to the response locals if access token
 * is valid and passed.
 *
 * If access token wasn't valid or passed - it
 * assignes 401 error (Unauthorized) to the response
 * status code.
 */
async function requireAuth(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    if (await isTokenValid(req.headers, res)) {
        next();
    } else {
        res.status(401).json({
            message: "Unauthorized or broken credentials",
        });
    }
}

export default requireAuth;
