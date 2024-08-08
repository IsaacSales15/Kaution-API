import { Request, Response } from "express";
import { prisma } from "../../database/prisma";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "Name and email are required" });
    }

    const userExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userExists) {
      return res.status(400).json({ error: "User already exists" });
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
      select: {
        name: true,
        email: true,
        id: true,
      },
    });
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
        return res.status(500).json({ error: "Internal server error" });
    }
}

export const deleteUsers = async (req: Request, res: Response) => {
    try {
        const users = await prisma.user.deleteMany();
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
}