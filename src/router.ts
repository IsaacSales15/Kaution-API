import { Router } from "express";
import { categoryGet, categoryPost, categoryDelete } from "./controllers/category-controllers/CategoryController";
import { createUser, deleteUser, getUsers } from "./controllers/register-controllers/UserController";
import { productPost, productGet, productDelete } from "./controllers/product-controllers/ProductsController";
import { verify } from "./controllers/register-controllers/VerifyController";

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
router.post("/user/:name/:email/:password", createUser);
router.get("/user/user-getAll", getUsers);
router.delete("/user/user-delete/:userId", deleteUser);

//verify
router.post("/user/user-verify", verify);

// id user anderson = "66bceaad7cd6fe628593cc29"
// id category anderson = "66bd392d32b29699eabb0079"
// id product anderson = "66bd399b95f401fb793ff32e"