import { Request, Response } from "express";
import { prisma } from "../../database/prisma";
import { hash } from "bcryptjs";
import { sendEmail } from "../../services/EmailService";
import { generateCode } from "../../utils/generateCode";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.params;

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
      console.log("Erro no email: ", error);
      return res
        .status(500)
        .json({ error: "User created, but email not sent" });
    }

    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    return res.status(200).json(users);
  } catch (error) {
    console.error("Error in getUsers:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    await prisma.product.deleteMany({
      where: {
        category: {
          userId: String(userId),
        },
      },
    });

    await prisma.category.deleteMany({
      where: {
        userId: String(userId),
      },
    });

    const users = await prisma.user.deleteMany({
      where: {
        id: String(userId),
      },
    });

    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
};
