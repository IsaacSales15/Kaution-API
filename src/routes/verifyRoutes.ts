import { Router } from "express";
import { verify } from "../controllers/register-controllers/verify_actions-controllers/VerifyController";
import { resendCode } from "../controllers/verify_actions-controllers/ResendCodeController";

const router = Router();

router.post("/verify", verify);
router.post("/verify/resend", resendCode);

export default router;