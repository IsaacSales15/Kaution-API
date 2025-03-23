import { Request, Response } from "express";
import { prisma } from "../../database/prisma";
import { hash, compare } from "bcryptjs";
import { sendEmail } from "../../services/EmailService";
import { generateCode } from "../../utils/generateCode";
import jwt from "jsonwebtoken";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, namertag } = req.body;

    if (!name || !email || !password || !namertag) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const userExists = await prisma.user.findUnique({
      where: {
        email: String(email),
      },
    });

    if (userExists) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    const hashPassword = await hash(password, 8);
    const code = generateCode();

    const user = await prisma.user.create({
      data: {
        name: String(name),
        email: String(email),
        namertag: String(namertag),
        password: hashPassword,
        isVerified: false,
        verificationCode: code,
        verificationExpire: new Date(Date.now() + 10 * 60 * 1000),
      },
      select: {
        name: true,
        email: true,
        id: true,
        createdAt: true,
      },
    });

    try {
      await sendEmail(user.email, user.name, code);
    } catch (error) {
      await prisma.user.delete({ where: { id: user.id } }); 
      return res.status(500).json({ success: false, message: "Error sending verification email" });
    }

    return res.status(201).json({
      success: true,
      message: "User created successfully. Please check your email to verify your account.",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    const user = await prisma.user.findUnique({
      where: {
        email: String(email),
      },
    });

    if (!user) {
      return res.status(400).json({ success: false, message: "Email or password is incorrect" });
    }

    if (!user.isVerified) {
      return res.status(400).json({ success: false, message: "User not verified" });
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      return res.status(400).json({ success: false, message: "Email or password is incorrect" });
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

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: { userId: user.id, token },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};
