import { Router } from "express";
import { invitationGet, invitationPost, invitationDelete, invitationGetById, deleteAllinvites } from "../../controllers/invitation-controllers/InvitationController";
import { AcceptInvitation, DeclineInvitation, invitationcodeGet } from "../../controllers/invitation-controllers/accep_decline-controllers/AccepDeclineController";
import { authMiddleware } from "../../middlewares/AuthMiddleware";

const router = Router();

router.post("/user/:userid/invitation", invitationPost, authMiddleware());

router.get("/user/:userid/invitation", invitationGet, authMiddleware());

router.delete("/user/invitation/:invitationid", invitationDelete, authMiddleware());
router.delete("/user/invitation/deleteAll", deleteAllinvites, authMiddleware());

router.get("/user/invitation/:invitationid", invitationGetById);
router.get("/user/invitation/:code", invitationcodeGet);

router.put("/user/invitation/accept/:code", AcceptInvitation, authMiddleware());
router.put("/user/invitation/decline/:code", DeclineInvitation, authMiddleware());

export default router;