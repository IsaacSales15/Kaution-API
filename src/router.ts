import { Router } from "express";
import { categoryGet, categoryPost, categoryDelete } from "./controllers/category-controllers/CategoryController";
import { createUser, deleteUser, getUsers } from "./controllers/register-controllers/UserController";
import { productPost, productGet } from "./controllers/product-controllers/ProductsController";
import { verify } from "./controllers/register-controllers/VerifyController";

export const router = Router();

//categories
router.get("/category-getAll", categoryGet );
router.post("/:userid/category", categoryPost );
router.delete("/:userid/:idcategory", categoryDelete );

//products
router.post("/:categoryid/product", productPost);
router.get("/user/category/product", productGet);

//user
router.post("/user", createUser);
router.get("/user-getAll", getUsers);
router.delete("/user-delete", deleteUser);

//verify
router.post("/user-verify", verify);

// id user sales = "66b7fdee5d9f43da5d4d3c42"
// id category sales = "66ba0bda30fe4944de6c3ed9"
// id product sales = "66ba0d47e170ab3f97783b6e"