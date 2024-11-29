import { prisma } from "../../../database/prisma";
import { Request, Response } from "express";
import { getUTCTime } from "../../../utils/getUTCTime";

let todayISO = new Date().toISOString();
let today = getUTCTime(todayISO);

export const invitationcodeGet = async (req: Request, res: Response) => {
  try {
    const code = req.params.code;

    if (code == "all") {
      const data = await prisma.invitation.findMany();
      return res.status(200).json(data);
    }

    const data = await prisma.invitation.findMany({
      where: {
        code: code,
      },
    });

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const AcceptInvitation = async (req: Request, res: Response) => {
  try {
    const code = req.params.code;

    if (!code) {
      return res.status(400).json({ error: "Invitation code is required" });
    }

    await prisma.invitation.update({
      where: {
        code: code,
      },
      data: {
        inviteStatus: true,
        acceptAt: today,
      },
    });

    console.log("invitation is accepted");
    return res.status(200).json({ message: "invitation is accepted" });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const DeclineInvitation = async (req: Request, res: Response) => {
  try {
    const code = req.params.code;

    if (!code) {
      return res.status(400).json({ error: "Invitation ID is required" });
    }

    await prisma.invitation.update({
      where: {
        code: code,
      },
      data: {
        inviteStatus: false,
        acceptAt: today,
      },
    });

    await prisma.invitation.deleteMany({
      where: {
        id: code,
      },
    });

    return res.status(200).json({ message: "invitation is decline" });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};
