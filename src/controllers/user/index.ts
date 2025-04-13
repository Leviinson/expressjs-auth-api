import { Request, Response, NextFunction } from "express";

function userProfileController(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const accessToken: string | undefined = req.signedCookies.access_token;
    if (accessToken) {
        console.log(accessToken);
    } else {
        res.cookie("access_token", "asddsa", {
            signed: true,
            maxAge: 1000 * 5,
            httpOnly: true,
        });
    }

    res.render("index", { title: "Express" });
}

export { userProfileController };
