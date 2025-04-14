import { Request, Response, NextFunction } from "express";

import isTokenValid from "./services/tokenValidation";

async function requireAuth(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    if (await isTokenValid(req.headers, res)) {
        next();
    } else {
        res.status(401).json({
            message: "Unauthorized or invalid credentials",
        });
    }
}

export default requireAuth;
