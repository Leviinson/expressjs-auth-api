import { Request, Response, NextFunction } from "express";

import UserRepo from "../db/models/repos/user";

/**
 * This middleware assignes user
 * to the response locals. It assumes, that previous
 * middleware validated accessToken and assigned
 * user ID from decoded token payload to the response
 * locals.
 */
async function loadUser(
    _req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    const userId = res.locals.userId;
    const user = await new UserRepo().getUserById(userId);
    if (user) {
        res.locals.user = user;
        next();
    } else {
        res.status(401).json({ message: "User not found" });
    }
}

export default loadUser;
