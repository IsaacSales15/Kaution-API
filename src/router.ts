import { Router } from "express";
import { categoryGet, categoryPost } from "./controllers/CategoryController";
import { userGetTest, userPostTest } from "./controllers/UserController";
import { productPost, productGet } from "./controllers/ProductsController";

export const router = Router();

router.get("/category", categoryGet );
router.post("/:id/category", categoryPost );
router.post("/user", userPostTest);
router.get("/user", userGetTest);
router.post("/:userid/:categoryid/product", productPost);
router.get("/user/category/product", productGet);

// id user kayo = "66b40aae327e98be93c41e93"
// id category kayo = "66b40b3d85c969557d793cd4"