import { NextFunction, Request, Response } from "express";

import { specifyCSRFToken, validateCSRFToken } from "./services/csrfValidation";

async function csrfMiddleware(req: Request, res: Response, next: NextFunction): Promise<void> {
    const cookieCSRFToken = req.cookies.csrftoken;
    if (req.method == "GET") {
        specifyCSRFToken(cookieCSRFToken, res, next)
    }

    if (req.method == "POST") {
        const bodyCSRFToken = req.body.csrftoken;
        validateCSRFToken(cookieCSRFToken, bodyCSRFToken, next, res);
    }
}

export default csrfMiddleware;
