import { Request, Response, NextFunction } from "express";

async function toBeActiveMiddleware(
    _req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    if (res.locals.user.isActive) {
        next();
    } else {
        res.status(401).json({
            status: "error",
            message:
                "User isn't activated. Please, follow a link that we sent to your email.",
        });
    }
}

export default toBeActiveMiddleware;
