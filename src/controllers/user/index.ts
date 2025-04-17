import { Request, Response } from "express";

import serializeUserProfile from "./serializers/serializeUserProfile";

function userProfileController(_req: Request, res: Response) {
    res.json(serializeUserProfile(res.locals.user));
}

export { userProfileController };
