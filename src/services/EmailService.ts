import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        type: "OAuth2",
        user: process.env.MAIL_USERNAME,
        clientId: process.env.OAUTH_CLIENTID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN,
    },
    tls: {
        rejectUnauthorized: false
    }
});

export const sendEmail = async (email: string, name: string, code: string) => {
    const mailOptions = {
        from: process.env.MAIL_USERNAME,
        to: email,
        subject: "Bem vindo ao Kaution! Use seu codigo de verificação.",
        text: `Olá, ${name}! Seu código: ${code}`
    }

    return transporter.sendMail(mailOptions);
}