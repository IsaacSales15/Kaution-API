import { Request, Response } from "express";
import { prisma } from "../../../database/prisma";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    return res.status(200).json(users);
  } catch (error) {
    console.error("Error in getUsers:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const user = await prisma.user.findUnique({
      where: {
        id: String(userId),
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updateAt: true,
        inventoryAccess: {
          select: {
            role: true,
            inventory: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    return res.status(200).json(user);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    await prisma.authCode.deleteMany({
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
    console.log(error);
    return res.status(500).json(error);
  }
};

export const updatePassword = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { password } = req.body;
    const hashPassword = await prisma.user.update({
      where: {
        id: String(userId),
      },
      data: {
        password: String(password),
      },
      select: {
        updateAt: true,
      },
    });
    return res.status(200).json(hashPassword);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { name } = req.body;
    const user = await prisma.user.update({
      where: {
        id: String(userId),
      },
      data: {
        name: String(name),
      },
      select: {
        name: true,
        id: true,
        updateAt: true,
      },
    });
    return res.status(200).json({ success: true, user });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
