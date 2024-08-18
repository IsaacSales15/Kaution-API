import { Router } from "express";
import {
  categoryGet,
  categoryPost,
  categoryDelete,
  categoryPut,
} from "./controllers/category-controllers/CategoryController";
import {
  createUser,
  loginUser,
} from "./controllers/register-controllers/UserController";
import {
  getUsers,
  getSingleUser,
  deleteUser,
  updateUser,
  updatePassword,
} from "./controllers/register-controllers/UserActionsController";
import {
  productPost,
  productGet,
  productDelete,
  productPut,
} from "./controllers/product-controllers/ProductsController";
import { verify } from "./controllers/register-controllers/VerifyController";
import { resendCode } from "./controllers/register-controllers/ResendCodeController";
import { authMiddleware } from "./middlewares/AuthMiddleware";
import cors from "cors";

export const router = Router();

// Enable CORS from all origins
router.use(
  cors({
    origin: "https://kaution-client-side.vercel.app/",
    allowedHeaders: ["*"],
  })
);

//categories
// se o front quiser pegar todas as categorias, ele passa 'all' no parâmetro 'userid'.
router.get("/user/:userid/category", categoryGet);
router.post("/user/:userid/category", categoryPost);
router.delete("/user/category/:categoryid", categoryDelete);
router.put("/user/category/:categoryid", categoryPut);

//products
// se o front quiser pegar todos os produtos, ele passa 'all' no parâmetro 'categoryid'.
router.get("/user/category/:categoryid/product", productGet);
router.post("/user/category/:categoryid/product", productPost);
router.delete("/user/category/:categoryid/product/:productid", productDelete);
router.put("/user/category/:categoryid/product/:productid", productPut);

//user
router.post("/user/user-create", createUser);
router.post("/user/user-login", loginUser);
router.get("/user/user-getAll", getUsers);
router.get("/user/user-profile/:userId", authMiddleware(), getSingleUser);
router.put("/user/user-profile/put-user/:userId", authMiddleware(), updateUser);
router.put(
  "/user/user-profile/put-password/:userId",
  authMiddleware(),
  updatePassword
);
router.delete("/user/user-delete/:userId", deleteUser);

//verify
router.post("/user/user-verify", verify);
router.post("/user/user-verify/resend", resendCode);
