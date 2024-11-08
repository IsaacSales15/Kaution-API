import { Request, Response } from "express";
import { prisma } from "../../../database/prisma";
import { hash, compare } from "bcryptjs";
import { sendEmail } from "../../../services/EmailService";
import { generateCode } from "../../../utils/generateCode";
import jwt from "jsonwebtoken";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "Name and email are required" });
    }

    const userExists = await prisma.user.findUnique({
      where: {
        email: String(email),
      },
    });

    if (userExists) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashPassword = await hash(password, 8);
    const code = generateCode();

    const user = await prisma.user.create({
      data: {
        name: String(name),
        email: String(email),
        password: hashPassword,
        isVerified: false,
        verificationCode: code,
        verificationExpire: new Date(Date.now() + 10 * 60 * 1000),
      },
      select: {
        name: true,
        email: true,
        id: true,
        created: true,
      },
    });

    try {
      await sendEmail(user.email, user.name, code);
    } catch (error) {
      console.log("Error: ", error);
      console.log(error);
      return res
        .status(500)
        .json({ error: "User created, but email not sent" });
    }

    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const user = await prisma.user.findUnique({
      where: {
        email: String(email),
      },
    });

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    if (!user.isVerified) {
      return res.status(400).json({ error: "User not verified" });
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      return res.status(400).json({ error: "Invalid password" });
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET as string,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    const responsePayload = {
      userID: user.id,
      token,
      message: "Login successful",
    };

    res.cookie("authToken", token, { httpOnly: true, secure: true });

    return res.status(200).json(responsePayload);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
