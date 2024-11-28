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
    html: `
      <div style="font-family: 'Inter', sans-serif; background-color: white; padding: 20px; border-radius: 5px; text-align: center;">
        <p>Olá, <b>${name}</b>! Seu código:</p>
        <h2 style="margin: 10px 0;">${code}</h2>
        <p style="font-size: 0.9em; color: #888;">Por favor, use este código para continuar o processo de verificação.</p>
      </div>
    `,
  };

  return transporter.sendMail(mailOptions);
};

export const sendInvitationEmail = async (
  namertagInviter: string,
  emailReciver: string,
  code: string
) => {
  const mailOptions = {
    from: process.env.MAIL_USERNAME,
    to: emailReciver,
    subject: `Convite de ${namertagInviter} compartilhar um inventário Kaution com você!!!`,
    html: `
      <div style="display: flex; justify-content: center; align-items: center; height: 100vh; width: 100vw;">
        <div style="text-align: center; font-family: 'Inter', sans-serif; background-color: white; padding: 20px; border-radius: 5px;">
          <p>Ola, <b>${namertagInviter}</b> te convida para compartilhar um inventário com você!</p>
          <div style="display: flex; justify-content: center; align-items: center; margin-top: 20px;">
            <a href="http://localhost:3000/user/accept/${code}">
              <button style="background-color: #4f7ed4; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; color: white;">Aceitar convite</button>
            </a>
            <a href="http://localhost:3000/user/decline/${code}">
              <button style="background-color: #4f7ed4; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; margin-left: 10px; color: white;">Recusar convite</button>
            </a>
          </div>
          <p style="margin-top: 20px; font-size: 0.9em; color: #888;">Powered by Kaution</p>
        </div>
      </div>
    `,
  };

  return transporter.sendMail(mailOptions);
};
