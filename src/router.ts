import { Router } from "express";
import { categoryGet, categoryPost, categoryDelete } from "./controllers/category-controllers/CategoryController";
import { createUser, loginUser } from "./controllers/register-controllers/UserController";
import { getUsers, getSingleUser, deleteUser } from "./controllers/register-controllers/UserActionsController";
import { productPost, productGet, productDelete } from "./controllers/product-controllers/ProductsController";
import { verify } from "./controllers/register-controllers/VerifyController";
import { resendCode } from "./controllers/register-controllers/ResendCodeController";

export const router = Router();

//categories
router.get("/user/:userid/category", categoryGet );
router.post("/user/:userid/category", categoryPost );
router.delete("/user/:userid/category/:categoryid", categoryDelete );

//products
router.get("/user/category/:categoryid/product", productGet);
router.post("/user/category/:categoryid/product", productPost);
router.delete("/user/category/:categoryid/product/:productid", productDelete);

//user
router.post("/user/user-create", createUser);
router.post("/user/user-login", loginUser);
router.get("/user/user-getAll", getUsers);
router.get("/user/user-get/:userId", getSingleUser);
router.delete("/user/user-delete/:userId", deleteUser);

//verify
router.post("/user/user-verify", verify);
router.post("/user/user-verify/resend", resendCode);

// id user anderson = "66bceaad7cd6fe628593cc29"
// id category anderson = "66bd392d32b29699eabb0079"
// id product anderson = "66bd399b95f401fb793ff32e"