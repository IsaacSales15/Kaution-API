import { Request, Response } from "express";
import { prisma } from "../../database/prisma";
import jwt from "jsonwebtoken";

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
    const isCodeNotExpired =
      user.verificationExpire && user.verificationExpire > new Date();

    if (isCodeValid && isCodeNotExpired) {
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

      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET as string,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );

      res.cookie("authToken", token, { httpOnly: false, secure: true });

      return res.json({ success: true, token });
    } else {
      return res.status(400).json({ error: "Invalid code" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};
