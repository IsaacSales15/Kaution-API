import { Router } from "express";
import { test } from "./controllers/TesteController";

export const router = Router();

router.get("/test", test);