import { Request, Response, NextFunction } from "express";

function userProfileController(
    _req: Request,
    res: Response,
    _next: NextFunction
) {
    res.render("index", { title: "Express" });
}

export { userProfileController };
