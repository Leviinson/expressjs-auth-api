import { render } from "@react-email/render";
import { createTransport } from "nodemailer";

import ConfirmEmail from "@/controllers/auth/templates/confirmEmail";

export default async function sendConfirmationEmail(
    email: string,
    username: string,
    tokenValue: string
): Promise<void> {
    const html = await render(
        <ConfirmEmail
            url="http://localhost:3000/me"
            username={username}
            token={tokenValue}
        />
    );

    const transporter = createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        requireTLS: true,
        secure: false,
        auth: {
            user: "melnykov.vitalii197@gmail.com",
            pass: "lmtzqminxqamachn",
        },
    });

    await transporter.sendMail({
        from: "Aulina's Vocabulary <melnykov.vitalii197@gmail.com>",
        to: email,
        html: html,
        subject: "Email confirmation | Aulina's Vocabulary",
    });
}
