import { render } from "@react-email/render";
import { createTransport } from "nodemailer";

import ConfirmEmail from "@/controllers/auth/templates/confirmEmail";

export default async function sendConfirmationEmail(
    email: string,
    username: string,
    tokenValue: string
): Promise<void> {
    const html = await render(
        <ConfirmEmail username={username} token={tokenValue} />
    );

    const transporter = createTransport({
        service: process.env.TRANSPORTER_SERVICE,
        host: process.env.TRANSPORTER_HOST,
        port: parseInt(process.env.TRANSPORTER_PORT!),
        requireTLS: true,
        secure: process.env.NODE_ENV === "production",
        auth: {
            user: process.env.TRANSPORTER_USER,
            pass: process.env.TRANSPORTER_PASS,
        },
    });

    await transporter.sendMail({
        from: "Aulina's Vocabulary <melnykov.vitalii197@gmail.com>",
        to: email,
        html: html,
        subject: "Email confirmation | Aulina's Vocabulary",
    });
}
