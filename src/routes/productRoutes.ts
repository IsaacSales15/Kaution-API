import { Router } from "express";
import { productPost, productGet, productPut, productDelete } from "../controllers/ProductsController";
import { authMiddleware } from "../middlewares/AuthMiddleware";

const router = Router();

router.post("/products/:categoryid", productPost, authMiddleware());

router.get("/products/:categoryid", productGet, authMiddleware());

router.put("/products/:id", productPut, authMiddleware());

router.delete("/products/:id", productDelete, authMiddleware());

export default router;