import { Request, Response } from "express";
import { prisma } from "../../database/prisma";
import { getUTCTime } from "../../utils/getUTCTime";

let todayISO = new Date().toISOString();
let today = getUTCTime(todayISO);

export const invitationPost = async (req: Request, res: Response) => {
    try {
        const reqinventoryid = req.params.inventoryid;
        const requserinviteforid = req.params.inviteid;
        const requserinvitebyid = req.params.invitebyid;

        if (!reqinventoryid || !requserinvitebyid || !requserinviteforid) {
            return res.status(400).json({ error: "InventoryID, InviteBy ID and Invite ID is required" });
        }

        await prisma.invitation.create({
            data: {
                inventoryId: reqinventoryid,
                inviteForId: requserinviteforid,
                inviteById: requserinvitebyid,
                createdAt: today
            }
        });

        return res.status(201).json({ message: "Invitation created" });
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
};

export const invitationUptade = async (req: Request, res: Response) => {
    try {
        const reqinvitationid = req.params.inventoryid;

        if (!reqinvitationid) {
            return res.status(400).json({ error: "Invitation ID is required" });
        }

        await prisma.invitation.update({
            where: {
                id: reqinvitationid,
            },
            data: {
                inviteStatus: true,
            }
        });

        return res.status(201).json({ message: "Invitation is accepted" });
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
};