import { Request, Response } from "express";
import { prisma } from "../../database/prisma";

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
          created: true,
          uptadeAt: true,
        }
      });
      return res.status(200).json(user);
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
} 
  
  export const deleteUser = async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
  
      await prisma.authCode.deleteMany({
        where: {
          userId: String(userId),
        },
      });
      
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
      console.log(error);
      return res.status(500).json(error);
    }
  };