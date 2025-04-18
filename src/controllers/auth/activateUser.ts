import { Request, Response } from "express";

import ConfirmationToken from "@/db/models/ConfirmationToken";
import ConfirmationTokenRepo from "@/db/models/repos/ConfirmationToken";

async function confirmationTokenIsExp(confirmationToken: ConfirmationToken) {
    return confirmationToken && confirmationToken.expAt >= new Date()
        ? false
        : true;
}

function parseConfirmationTokenValue(req: Request): string | null {
    return typeof req.query.token === "string" ? req.query.token : null;
}

async function getConfirmationToken(confirmationTokenValue: string) {
    return await new ConfirmationTokenRepo().getTokenByValue({
        tokenValue: confirmationTokenValue,
        includesUser: true,
    });
}

async function activateUser(
    confirmationToken: ConfirmationToken
): Promise<void> {
    confirmationToken.user.isActive = true;
    await confirmationToken.user.save({ fields: ["isActive"] });
}

async function activateUserController(
    req: Request,
    res: Response
): Promise<void> {
    const confirmationTokenValue = parseConfirmationTokenValue(req);

    if (!confirmationTokenValue) {
        res.status(400).json({
            status: "error",
            message: "Invalid token.",
        });
        return;
    }

    const confirmationToken = await getConfirmationToken(
        confirmationTokenValue
    );

    if (!confirmationToken) {
        res.status(404).json({
            status: "error",
            message: "Confirmation token not found.",
        });
        return;
    }

    if (await confirmationTokenIsExp(confirmationToken)) {
        res.status(400).json({
            status: "error",
            message: "Confirmation token is expired.",
        });
        return;
    }

    await activateUser(confirmationToken);
    res.status(200).json({
        status: "success",
        message: "User was successfully activated.",
    });
}

export default activateUserController;
