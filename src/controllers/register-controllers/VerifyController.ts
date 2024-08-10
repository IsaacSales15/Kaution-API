import { Request, Response } from "express";
import { prisma } from "../../database/prisma";

export const verify = async (req: Request, res: Response) => {
  try {
    const { email, code } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const isCodeValid = user.verificationCode === code;
    const isCodeExpired = user.verificationExpire > new Date();

    if (!isCodeValid && !isCodeExpired) {
      await prisma.user.update({
        where: {
          email,
        },
        data: {
          isVerified: true,
          verificationCode: null,
          verificationExpire: undefined,
        },
      });
      return res.json({ success: true });
    } else {
      return res.status(400).json({ error: "Invalid code" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};
