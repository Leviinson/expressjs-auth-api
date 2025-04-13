import { Request, Response, NextFunction } from "express";

function userProfileController(
    req: Request,
    res: Response,
    next: NextFunction
) {
    res.render("index", { title: "Express" });
}

export { userProfileController };
