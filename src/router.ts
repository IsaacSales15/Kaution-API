import { Router } from "express";
import { categoryGet, categoryPost, categoryDelete } from "./controllers/category-controllers/CategoryController";
import { createUser, loginUser } from "./controllers/register-controllers/UserController";
import { getUsers, getSingleUser, deleteUser } from "./controllers/register-controllers/UserActionsController";
import { productPost, productGet, productDelete } from "./controllers/product-controllers/ProductsController";
import { verify } from "./controllers/register-controllers/VerifyController";
import { resendCode } from "./controllers/register-controllers/ResendCodeController";

export const router = Router();

//categories
router.get("/user/category-getAll", categoryGet );
router.post("/user/:userid/category", categoryPost );
router.delete("/user/:userid/category/:categoryid", categoryDelete );

//products
router.get("/user/category/product-getAll", productGet);
router.post("/user/category/:categoryid/product", productPost);
router.delete("/category/:categoryid/product/:productid", productDelete);

//user
router.post("/user/user-create", createUser);
router.post("/user/user-login", loginUser);
router.get("/user/user-getAll", getUsers);
router.get("/user/user-get/:userId", getSingleUser);
router.delete("/user/user-delete/:userId", deleteUser);

//verify
router.post("/user/user-verify", verify);
router.post("/user/user-verify/resend", resendCode);

// id user sales = ""66bac955f3cac728ac01c7e8"
// id category sales = "66ba8cc4e1a19a9af87a23cd"
// id product sales = "66ba8eb10c9bff7b2d2792bd"