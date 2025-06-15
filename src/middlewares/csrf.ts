import crypto from "crypto";

import { NextFunction, Request, Response } from "express";

function maskCSRFTokenSecret(
    mask: Buffer,
    CSRFTokenSecret: Buffer,
    bytesLength: number
): Buffer {
    const result = Buffer.alloc(bytesLength);
    for (let i = 0; i < result.length; i++) {
        result[i] = mask[i] ^ CSRFTokenSecret[i];
    }
    return result;
}

function generateCsrfToken(): string {
    const bytesLength = 32;
    const CSRFSecret = crypto.randomBytes(bytesLength);
    const mask = crypto.randomBytes(bytesLength);
    const maskedCSRFTokenSecret = maskCSRFTokenSecret(
        mask,
        CSRFSecret,
        bytesLength
    );
    return Buffer.concat([mask, maskedCSRFTokenSecret]).toString("base64url");
}

async function csrfMiddleware(req: Request, res: Response, next: NextFunction) {
    const cookieCSRFToken = req.cookies.csrftoken;
    const reqMethod = req.method;
    if (reqMethod == "GET") {
        if (cookieCSRFToken) {
            return;
        } else {
            res.cookie("csrftoken", generateCsrfToken(), {
                sameSite: "strict",
            });
            next();
            return;
        }
    }

    if (reqMethod == "POST") {
        const bodyCSRFToken = req.body.csrftoken;

        if (cookieCSRFToken && bodyCSRFToken) {
            if (cookieCSRFToken === bodyCSRFToken) {
                next();
                return;
            } else {
                res.status(403).json({
                    status: "error",
                    message: "CSRF token isn't valid.",
                });
                return;
            }
        } else {
            res.status(403).json({
                status: "error",
                message: "CSRF token wasn't passed.",
            });
            return;
        }
    }
}

export default csrfMiddleware;
