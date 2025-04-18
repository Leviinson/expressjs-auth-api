import { Request, Response } from "express";

import ConfirmationToken from "@/db/models/ConfirmationToken";
import ConfirmationTokenRepo from "@/db/models/repos/ConfirmationToken";

async function confirmationTokenIsExp(confirmationToken: ConfirmationToken) {
    if (confirmationToken && confirmationToken.expAt >= new Date()) {
        return false;
    }
    return true;
}

async function activateUserController(
    req: Request,
    res: Response
): Promise<void> {
    const confirmationTokenValue =
        typeof req.query.token === "string" ? req.query.token : null;

    if (confirmationTokenValue) {
        const confirmationToken =
            await new ConfirmationTokenRepo().getTokenByValue({
                tokenValue: confirmationTokenValue,
                includesUser: true,
            });
        if (confirmationToken) {
            if (!(await confirmationTokenIsExp(confirmationToken))) {
                confirmationToken.user.isActive = true;
                confirmationToken.user.save({ fields: ["isActive"] });
                res.status(200).json({
                    status: "success",
                    message: "User was successfully activated.",
                });
            } else {
                res.status(404).json({
                    status: "error",
                    message: "Confirmation token not found.",
                });
            }
        } else {
            res.status(400).json({
                status: "error",
                message: "Confirmation token is expired.",
            });
        }
    } else {
        res.status(400).json({
            status: "error",
            message: "Invalid token.",
        });
    }
}

export default activateUserController;
