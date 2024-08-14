import { Router } from "express";
import { categoryGet, categoryPost, categoryDelete } from "./controllers/category-controllers/CategoryController";
import { createUser, deleteUser, getUsers } from "./controllers/register-controllers/UserController";
import { productPost, productGet, productDelete } from "./controllers/product-controllers/ProductsController";
import { verify } from "./controllers/register-controllers/VerifyController";

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
router.post("/user/:name/:email/:password", createUser);
router.get("/user/user-getAll", getUsers);
router.delete("/user/user-delete/:userId", deleteUser);

//verify
router.post("/user/user-verify", verify);

// id user sales = ""66bac955f3cac728ac01c7e8"
// id category sales = "66ba8cc4e1a19a9af87a23cd"
// id product sales = "66ba8eb10c9bff7b2d2792bd"