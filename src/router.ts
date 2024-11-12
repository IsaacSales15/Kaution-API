import { Router } from "express";
import {inventoryGet,inventoryPost,inventoryDelete,inventoryPut,
} from "./controllers/inventory-controller/InventoryController";
import {categoryGet,categoryPost,categoryDelete,categoryPut,
} from "./controllers/category-controllers/CategoryController";
import {createUser,loginUser,
} from "./controllers/register-controllers/user_actions-controllers/UserController";
import { getUsers,getSingleUser,updateUser,updatePassword,
} from "./controllers/register-controllers/user_actions-controllers/UserActionsController";
import { productPost, productGet, productDelete, productPut,
} from "./controllers/product-controllers/ProductsController";
import { verify } from "./controllers/register-controllers/verify_actions-controllers/VerifyController";
import { resendCode } from "./controllers/register-controllers/verify_actions-controllers/ResendCodeController";
import { authMiddleware } from "./middlewares/AuthMiddleware";
import cors from "cors";

export const router = Router();

router.use(cors());

// inventory
// se o front quiser pegar todas as categorias, ele passa 'all' no parâmetro 'userid'.
router.get("/user/:userid/inventory", inventoryGet);
router.post("/user/:userid/inventory", inventoryPost);
router.delete("/user/inventory/:inventoryid", inventoryDelete);
router.put("/user/inventory/:inventoryid", inventoryPut);


//categories
// se o front quiser pegar todas as categorias, ele passa 'all' no parâmetro 'userid'.
router.get("/user/:userid/category", categoryGet, authMiddleware());
router.post("/user/:userid/category", categoryPost, authMiddleware());
router.delete("/user/category/:categoryid", categoryDelete, authMiddleware());
router.put("/user/category/:categoryid", categoryPut, authMiddleware());

//products
// se o front quiser pegar todos os produtos, ele passa 'all' no parâmetro 'categoryid'.
router.get("/user/category/:categoryid/product", productGet, authMiddleware());
router.post("/user/category/:categoryid/product", productPost, authMiddleware());
router.delete("/user/category/:categoryid/product/:productid", productDelete, authMiddleware());
router.put("/user/category/:categoryid/product/:productid", productPut, authMiddleware());

//user
router.post("/user/user-create", createUser);
router.post("/user/user-login", loginUser);
router.get("/user/user-profile/:userId", authMiddleware(), getSingleUser);
router.put("/user/user-profile/put-user/:userId", authMiddleware(), updateUser);
router.put(
  "/user/user-profile/put-password/:userId",
  authMiddleware(),
  updatePassword
);
// router.delete("/user/user-delete/:userId", deleteUser);

//verify
router.post("/user/user-verify", verify);
router.post("/user/user-verify/resend", resendCode);

//Dev routes
router.get("/user/user-getAll", getUsers);