import { Router } from "express";
import { categoryPost, categoryGet, categoryPut, categoryDelete } from "../controllers/CategoryController";
import { authMiddleware } from "../middlewares/AuthMiddleware";

const router = Router();

router.post("/categories/:userid/:inventoryid", categoryPost, authMiddleware());

router.get("/categories/:inventoryid", categoryGet, authMiddleware());

router.put("/categories/:id", categoryPut, authMiddleware());

router.delete("/categories/:id", categoryDelete, authMiddleware());

export default router;