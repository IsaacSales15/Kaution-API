import { Router } from "express";
import { inventoryPost, inventoryDelete, inventoryGet, inventoryPut } from "../controllers/InventoryController";
import { authMiddleware } from "../middlewares/AuthMiddleware";

const router = Router();

router.post("/inventories/:userid", inventoryPost, authMiddleware());

router.get("/inventories/:userid", inventoryGet, authMiddleware());

router.put("/inventories/:id", inventoryPut, authMiddleware());

router.delete("/inventories/:id", inventoryDelete, authMiddleware());

export default router;