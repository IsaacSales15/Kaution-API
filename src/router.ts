import { Router } from "express";
import {
  AcceptInvitation,
  DeclineInvitation,
} from "./controllers/invitation-controllers/accep_decline-controllers/AccepDeclineController";
import {
  invitationPost,
  invitationGet,
  invitationDelete,
  invitationGetById,
} from "./controllers/invitation-controllers/InvitationController";
import {
  notificationGet,
  notificationPost,
  notificationDelete,
  notificationPut,
  deleteAllnotifications,
} from "./controllers/notification-controllers/NotificationController";
import {
  inventoryGet,
  inventoryPost,
  inventoryDelete,
  inventoryPut,
  deleteAllInventories,
} from "./controllers/inventory-controllers/InventoryController";
import {
  categoryGet,
  categoryPost,
  categoryDelete,
  categoryPut,
} from "./controllers/category-controllers/CategoryController";
import {
  createUser,
  loginUser,
} from "./controllers/register-controllers/user_actions-controllers/UserController";
import {
  getUsers,
  getSingleUser,
  updateUser,
  updatePassword,
  deleteUser,
  deleteAll,
} from "./controllers/register-controllers/user_actions-controllers/UserActionsController";
import {
  productPost,
  productGet,
  productDelete,
  productPut,
} from "./controllers/product-controllers/ProductsController";
import { verify } from "./controllers/register-controllers/verify_actions-controllers/VerifyController";
import { resendCode } from "./controllers/register-controllers/verify_actions-controllers/ResendCodeController";
import { authMiddleware } from "./middlewares/AuthMiddleware";
import cors from "cors";

export const router = Router();

router.use(cors());

// invitation
router.get("/user/:userid/invitation", invitationGet); // se o front quiser pegar todas as convites, ele passa 'all' no parâmetro 'userid'.
router.post("/user/invitation", invitationPost); // req body: inventoryid, invitebyid, invitefor
router.delete("/user/invitation/:invitationid", invitationDelete);

// invitation routes dev
router.get("/user/invitation/:invitationid", invitationGetById); // achar pelo id do convite

router.put("/user/invitation/accept/:invitationid", AcceptInvitation);
router.put("/user/invitation/decline/:invitationid", DeclineInvitation);

// notification
router.get("/user/:userid/notifications", notificationGet);
router.post("/user/:userid/notifications", notificationPost);
router.delete("/user/notifications/:notificationid", notificationDelete);
router.delete("/user/notifications/deleteAll", deleteAllnotifications);
router.put("/user/notifications/:notificationid", notificationPut);

// inventory

router.get("/user/:userid/inventory", inventoryGet); // se o front quiser pegar todas as convites, ele passa 'all' no parâmetro 'userid'.
router.post("/user/:userid/inventory", inventoryPost);
router.delete("/user/inventory/:inventoryid", inventoryDelete);
router.delete("/user/inventories/deleteAll", deleteAllInventories);
router.put("/user/inventory/:inventoryid", inventoryPut);

//categories

router.get("/user/:inventoryid/category", categoryGet, authMiddleware()); // se o front quiser pegar todas as convites, ele passa 'all' no parâmetro 'userid'.
router.post("/user/:inventoryid/category", categoryPost, authMiddleware());
router.delete("/user/category/:categoryid", categoryDelete, authMiddleware());
router.put("/user/category/:categoryid", categoryPut, authMiddleware());

//products

router.get("/user/category/:categoryid/product", productGet, authMiddleware()); // se o front quiser pegar todas as convites, ele passa 'all' no parâmetro 'userid'.
router.post(
  "/user/category/:categoryid/product",
  productPost,
  authMiddleware()
);
router.delete(
  "/user/category/:categoryid/product/:productid",
  productDelete,
  authMiddleware()
);
router.put(
  "/user/category/:categoryid/product/:productid",
  productPut,
  authMiddleware()
);

//user
router.post("/user/create", createUser);
router.post("/user/login", loginUser);
router.get("/user/profile/:userId", authMiddleware(), getSingleUser);
router.put("/user/profile/put-user/:userId", authMiddleware(), updateUser);
router.put(
  "/user/profile/put-password/:userId",
  authMiddleware(),
  updatePassword
);
router.delete("/user/delete/:userId", deleteUser);

//verify
router.post("/user/verify", verify);
router.post("/user/verify/resend", resendCode);

//Dev routes
router.get("/user/getAll", getUsers);
router.delete("/user/deleteAll", deleteAll);
