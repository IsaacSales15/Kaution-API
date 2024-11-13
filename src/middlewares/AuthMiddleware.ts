import { verify } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { prisma } from "../database/prisma";

interface DecodedToken {
  userId: string;
}
export function authMiddleware(permissions?: string[]) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const token = authHeader.substring(7);
    try {
      const JWT_SECRET = process.env.JWT_SECRET;
      if (!JWT_SECRET) {
        return res.status(500).json({ error: "Internal server error" });
      }

      const decoded = verify(token, JWT_SECRET) as DecodedToken;
      req.user = { userId: decoded.userId };

      if(permissions){
        const inventoryId = req.params.inventoryId;
        const userRole = await prisma.inventoryAccess.findFirst({
          where: {userId: decoded.userId, inventoryId},
          select: {role: true}
        });

        if(!userRole || !permissions.includes(userRole.role)){
          return res.status(403).json({ error: "Permission denied" });
        }
      }

      next();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  };
}
