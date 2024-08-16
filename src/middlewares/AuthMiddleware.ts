import { verify } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface DecodedToken {
  userId: string;
}

//Não sei se coloco um sistema de permissões, mas vou deixar aqui caso eu tenha coragem de fazer
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

      return next();

    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  };
}
