import { Router } from "express";
import { test, testpost } from "./controllers/TesteController";

export const router = Router();

router.get("/test", test);
router.post("/test", testpost)