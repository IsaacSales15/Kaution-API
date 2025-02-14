import { Router } from "express";
import { createUser, loginUser } from "../../controllers/register-controllers/user_actions-controllers/UserController";
import { getSingleUser, updateUser, updatePassword, deleteUser } from "../../controllers/register-controllers/user_actions-controllers/UserActionsController";
import { authMiddleware } from "../../middlewares/AuthMiddleware";

const router = Router();

router.post("/users", createUser);
router.post("/user/login", loginUser);

router.get("/user/:id", getSingleUser, authMiddleware);
router.post("/user/:id", updateUser, authMiddleware());
router.post("/user/:id/password", updatePassword, authMiddleware());
router.delete("/user/:id", authMiddleware());

export default router;