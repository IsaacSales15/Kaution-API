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

// export const sendInvitationEmail = async (
//   namertagInviter: string,
//   emailReciver: string,
//   code: string
// ) => {
//   const mailOptions = {
//     from: process.env.MAIL_USERNAME,
//     to: emailReciver,
//     subject: `Convite de ${namertagInviter} compartilhar um inventário Kaution com você!!!`,
//     html: `
//     <html>
//       <body>
//         <div style="font-family: 'Inter', sans-serif; background-color: white; padding: 20px; border-radius: 5px; text-align: center;">
//           <h2>${namertagInviter} está compartilhando um inventário Kaution com você!</h2>
//           <p>Aceite o convite para ter acesso ao inventário.</p>
//           <div style="display: flex; justify-content: space-around; margin-top: 20px;">
//             <a href="http://localhost:3000/accept/${code}" 
//                style="background-color: #29b6f6; padding: 10px 20px; color: white; border-radius: 5px; text-decoration: none;">Aceitar</a>
//             <a href="http://localhost:3000/decline/${code}" 
//                style="background-color: #ff5252; padding: 10px 20px; color: white; border-radius: 5px; text-decoration: none;">Recusar</a>
//           </div>
//         </div>
//       </body>
//     </html>`,
//   };
//   return transporter.sendMail(mailOptions);
// };
