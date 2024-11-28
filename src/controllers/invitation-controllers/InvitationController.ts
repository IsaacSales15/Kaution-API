import { Request, Response } from "express";
import { prisma } from "../../database/prisma";
import { getUTCTime } from "../../utils/getUTCTime";
import { sendInvitationEmail } from "../../services/EmailService";
import { generateCode } from "../../utils/generateCode";

let todayISO = new Date().toISOString();
let today = getUTCTime(todayISO);

export const invitationPost = async (req: Request, res: Response) => {
  try {
    const { inventoryid, invitebyid, inviteforid } = req.body;

    if (!inventoryid || !invitebyid || !inviteforid) {
      return res
        .status(400)
        .json({ error: "InventoryID, InviteBy ID and Invite ID is required" });
    }
//////////////////////////////////////////////////////////////////////////////////////////
    const userInviteForExists = await prisma.user.findUnique({
      where: {
        id: String(inviteforid),
      },
    });

    if (!userInviteForExists) {
      return res.status(400).json({ error: "User indicated does not exist" });
    }

    const userInviteByExists = await prisma.user.findUnique({
      where: {
        id: String(invitebyid),
      },
    });

    if (!userInviteByExists) {
      return res.status(400).json({ error: "User indicated does not exist" });
    }
//////////////////////////////////////////////////////////////////////////////////////////
    
    const code = generateCode();

    console.log(userInviteForExists.email, userInviteByExists.namertag);
    await prisma.invitation.create({
      data: {
        inventoryId: inventoryid,
        inviteById: invitebyid,
        inviteForId: inviteforid,
        inviteStatus: false,
        createdAt: today,
        code: code
      },
    });

    try {
      await sendInvitationEmail(
        userInviteByExists.namertag,
        userInviteForExists.email,
        code
      );
    } catch (error) {
      console.log("Error: ", error);
      console.log(error);
      return res.status(500).json({ error: "Email not sent" });
    }
    return res.status(201).json({ message: "invitation created" });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const invitationDelete = async (req: Request, res: Response) => {
  try {
    const reqinvitationid = req.params.invitationid;

    if (!reqinvitationid) {
      return res.status(400).json({ error: "Invitation ID is required" });
    }

    await prisma.invitation.deleteMany({
      where: {
        id: reqinvitationid,
      },
    });

    return res.status(200).json({ message: "invitation deleted" });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteAllinvites = async (req: Request, res: Response) => {
  try {
    const invites = await prisma.invitation.deleteMany();

    return res.status(200).json(invites);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const invitationGet = async (req: Request, res: Response) => {
  try {
    const requserid = req.params.userid;

    if (requserid == "all") {
      const data = await prisma.invitation.findMany();
      return res.status(200).json(data);
    }

    const data = await prisma.invitation.findMany({
      where: {
        inviteForId: requserid,
      },
    });

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const invitationGetById = async (req: Request, res: Response) => {
  try {
    const reqinvitationid = req.params.invitationid;

    if (!reqinvitationid) {
      return res.status(400).json({ error: "Invitation ID is required" });
    }

    const data = await prisma.invitation.findUnique({
      where: {
        id: reqinvitationid,
      },
    });

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};
