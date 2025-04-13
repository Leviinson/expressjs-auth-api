import { Request, Response, NextFunction } from "express";

import isAuthenticated from "../services/isUserAuthenticated";

function jwtAuth(req: Request, res: Response, next: NextFunction): void {
    if (isAuthenticated(req.headers)) {
        next();
    } else {
        res.status(401).json({ message: "Unauthorized" });
    }
}

export default jwtAuth;
