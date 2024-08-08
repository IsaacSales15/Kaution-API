import { Router } from "express";
import { categoryGet, categoryPost } from "./controllers/CategoryController";
import { createUser, deleteUsers, getUsers } from "./controllers/register-controllers/UserController";
import { productPost, productGet } from "./controllers/ProductsController";

export const router = Router();

//categories
router.get("/category", categoryGet );
router.post("/:id/category", categoryPost );

//products
router.post("/:userid/:categoryid/product", productPost);
router.get("/user/category/product", productGet);

//user
router.post("/user", createUser);
router.get("/users", getUsers);
router.delete("/users", deleteUsers);

// id user kayo = "66b40aae327e98be93c41e93"
// id category kayo = "66b40b3d85c969557d793cd4"