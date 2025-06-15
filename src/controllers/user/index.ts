import { Request, Response } from "express";

import serializeUserProfile from "./serializers/serializeUserProfile";

function userProfileController(_req: Request, res: Response) {
    res.json({
        status: "success",
        message: "User was found",
        user: serializeUserProfile(res.locals.user),
    });
}

export { userProfileController };
