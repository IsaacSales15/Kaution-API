import { Response, Request } from "express";
import { prisma } from "../../../database/prisma";
import { sendEmail } from "../../../services/EmailService";
import { generateCode } from "../../../utils/generateCode";

export const resendCode = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const code = generateCode();

    await prisma.authCode.create({
      data: {
        code,
        userId: user.id,
        expire: new Date(Date.now() + 10 * 60 * 1000),
      },
    });

    try {
      await sendEmail(user.email, user.name, code);
      return res.status(200).json({ success: true });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};
