import { prisma } from "../../../database/prisma";
import { Request, Response } from "express";
import { getUTCTime } from "../../../utils/getUTCTime";

let todayISO = new Date().toISOString();
let today = getUTCTime(todayISO);

export const AcceptInvitation = async (req: Request, res: Response) => {
  try {
    const reqinvitationid = req.params.invitationid;

    if (!reqinvitationid) {
      return res.status(400).json({ error: "Invitation ID is required" });
    }

    await prisma.invitation.update({
      where: {
        id: reqinvitationid,
      },
      data: {
        inviteStatus: true,
        acceptAt: today,
      },
    });

    return res.status(200).json({ message: "invitation is accepted" });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const DeclineInvitation = async (req: Request, res: Response) => {
  try {
    const reqinvitationid = req.params.invitationid;

    if (!reqinvitationid) {
      return res.status(400).json({ error: "Invitation ID is required" });
    }

    await prisma.invitation.update({
      where: {
        id: reqinvitationid,
      },
      data: {
        inviteStatus: false,
        acceptAt: today,
      },
    });

    await prisma.invitation.deleteMany({
      where: {
        id: reqinvitationid,
      },
    });

    return res.status(200).json({ message: "invitation is decline" });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};
