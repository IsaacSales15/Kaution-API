import { Router } from "express";
import { categoryGet, categoryPost, categoryDelete } from "./controllers/category-controllers/CategoryController";
import { createUser, deleteUser, getUsers } from "./controllers/register-controllers/UserController";
import { productPost, productGet, productDelete } from "./controllers/product-controllers/ProductsController";
import { verify } from "./controllers/register-controllers/VerifyController";

export const router = Router();

//categories
router.get("/category-getAll", categoryGet );
router.post("/user/:userid/category", categoryPost );
router.delete("/user/:userid/category/:categoryid", categoryDelete );

//products
router.get("/product-getAll", productGet);
router.post("/category/:categoryid/product", productPost);
router.delete("/category/:categoryid/product/:productid", productDelete);

//user
router.post("/user/:name/:email/:password", createUser);
router.get("/user/user-getAll", getUsers);
router.delete("/user/user-delete/:userId", deleteUser);

//verify
router.post("/user/user-verify", verify);

// id user sales = "66b7fdee5d9f43da5d4d3c42"
// id category sales = "66ba8cc4e1a19a9af87a23cd"
// id product sales = "66ba8eb10c9bff7b2d2792bd"