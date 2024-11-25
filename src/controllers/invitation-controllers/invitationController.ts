import { Request, Response } from "express";
import { prisma } from "../../database/prisma";
import { getUTCTime } from "../../utils/getUTCTime";

let todayISO = new Date().toISOString();
let today = getUTCTime(todayISO);

export const invitationPost = async (req: Request, res: Response) => {
    try {
        const reqinventoryid = req.body.inventoryid;
        const requserinvitebyid = req.body.invitebyid;
        const requserinviteforid = req.body.inviteid;

        if (!reqinventoryid || !requserinvitebyid || !requserinviteforid) {
            return res.status(400).json({ error: "InventoryID, InviteBy ID and Invite ID is required" });
        }

        await prisma.invitation.create({
            data: {
                inventoryId: reqinventoryid,
                inviteById: requserinvitebyid,
                inviteForId: requserinviteforid,
            }
        });

        return res.status(201).json({ message: "invitation created" });
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
};

export const invitationPut = async (req: Request, res: Response) => {
    try {
        const reqinvitationid = req.params.invitationid;

        if (!reqinvitationid) {
            return res.status(400).json({ error: "Invitation ID is required" });
        }

        await prisma.invitation.update({
            where: {
                id: reqinvitationid
            },
            data: {
                inviteStatus: true,
                acceptAt: today
            }
        });

        return res.status(200).json({ message: "invitation is accepted" });
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
                id: reqinvitationid
            }
        });

        return res.status(200).json({ message: "invitation deleted" });
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
};

export const invitationGet = async (req: Request, res: Response) => 
{
    try {
        const requserid = req.params.userid;

        if (requserid == "all") {
            const data = await prisma.invitation.findMany();
            return res.status(200).json(data);
        }

        const data = await prisma.invitation.findMany({
            where: {
                inviteForId: requserid
            }
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
                id: reqinvitationid
            }
        });

        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
};