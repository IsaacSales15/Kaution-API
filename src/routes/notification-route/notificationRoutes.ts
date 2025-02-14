import { Router } from "express";
import { notificationPost, notificationGet, notificationPut, notificationDelete } from "../../controllers/notification-controllers/NotificationController";
import { authMiddleware } from "../../middlewares/AuthMiddleware";

const router = Router();

router.post("/notifications/:userid", notificationPost, authMiddleware());

router.get("/notifications/:userid", notificationGet, authMiddleware());

router.put("/notifications/:id", notificationPut, authMiddleware());

router.delete("/notifications/:id", notificationDelete, authMiddleware());

export default router;