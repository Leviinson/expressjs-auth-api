import crypto from "crypto";

import { NextFunction, Response } from "express";

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

function specifyCSRFToken(cookieCSRFToken: string, res: Response, next: NextFunction): void {
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

function validateCSRFToken(cookieCSRFToken: string, bodyCSRFToken: string, next: NextFunction, res: Response): void {
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

export {
    validateCSRFToken,
    specifyCSRFToken
}