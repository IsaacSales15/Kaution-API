import { Router } from "express";
import { deleteAll, getUsers } from "../../controllers/register-controllers/user_actions-controllers/UserActionsController";
import { deleteAllInventories } from "../../controllers/inventory-controllers/InventoryController";
import { deleteAllnotifications } from "../../controllers/notification-controllers/NotificationController";
import { categoryDeleteAll } from "../../controllers/category-controllers/CategoryController";

const router = Router();

router.get("/dev/users", getUsers);
router.delete("/dev/users", deleteAll);
router.delete("/dev/inventories", deleteAllInventories);
router.delete("/dev/categories", categoryDeleteAll);
router.delete("/dev/notifications", deleteAllnotifications);

export default router;