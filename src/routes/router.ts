import { Router } from "express";
import cors from "cors";
import invitationRoutes from "./invitation-route/invitationRoutes"
import categoryRoutes from "./category-route/categoryRoutes";
import inventoryRoutes from "./product-route/productRoutes";
import productRoutes from "./product-route/productRoutes";
import userRoutes from "./userRoutes";
import notificationRoutes from "./notification-route/notificationRoutes";
import verifyRoutes from "./verifyRoutes";
import devRoutes from "./dev-route/devRoutes";

export const router = Router();

router.use(cors());

router.use(invitationRoutes);
router.use(notificationRoutes);
router.use(inventoryRoutes);
router.use(categoryRoutes);
router.use(productRoutes);
router.use(userRoutes);
router.use(verifyRoutes);
router.use(devRoutes);

export default router;