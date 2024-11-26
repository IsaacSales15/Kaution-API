import nodemailer from "nodemailer";
import { google } from "googleapis";
import dotenv from "dotenv";

dotenv.config();

const OAuth2Client = new google.auth.OAuth2(
  process.env.OAUTH_CLIENTID,
  process.env.OAUTH_CLIENT_SECRET,
  process.env.REDIRECT_URI
);

OAuth2Client.setCredentials({ refresh_token: process.env.OAUTH_REFRESH_TOKEN });

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    type: "OAuth2",
    user: process.env.MAIL_USERNAME,
    clientId: process.env.OAUTH_CLIENTID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN,
    accessToken: OAuth2Client.getAccessToken().then((tokenResponse) => {
      if (tokenResponse && tokenResponse.token) {
        return tokenResponse.token;
      }
      throw new Error("Failed to retrieve access token");
    }),
  },
  tls: {
    rejectUnauthorized: false,
  },
} as nodemailer.TransportOptions);

export const sendEmail = async (email: string, name: string, code: string) => {
  const mailOptions = {
    from: process.env.MAIL_USERNAME,
    to: email,
    subject: "Bem vindo ao Kaution! Use seu codigo de verificação.",
    text: `Olá, ${name}! Seu código: ${code}`,
  };

  return transporter.sendMail(mailOptions);
};

export const sendInvitationEmail = async (
  namertagInviter: string,
  emailReciver: string
) => {
  const mailOptions = {
    from: process.env.MAIL_USERNAME,
    to: emailReciver,
    subject: `Convite de ${namertagInviter} compartilhar um inventário Kaution com você!!!`,
    html:{path: 'src/views/EmailFormat.html'}
  };

  return transporter.sendMail(mailOptions);
};
