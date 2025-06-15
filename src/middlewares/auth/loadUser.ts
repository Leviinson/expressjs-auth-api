import { Request, Response, NextFunction } from "express";

import AnonymousUser from "@/db/models/AnonymousUser";
import UserRepo from "@/db/models/repos/user";

/**
 * This middleware assignes user
 * to the response locals. It assumes, that previous
 * middleware validated accessToken and assigned
 * user ID from decoded token payload to the response
 * locals.
 */
async function loadUserMiddleware(
    _req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    const userId: number = res.locals.userId;
    const user = await new UserRepo().getUserById(userId);
    if (user) {
        res.locals.user = user;
        next();
    } else {
        res.locals.user = new AnonymousUser();
        res.status(401).json({ status: "error", message: "User wasn't found" });
    }
}

export default loadUserMiddleware;
