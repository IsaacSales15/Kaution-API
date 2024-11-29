import { Request, Response } from "express";
import { prisma } from "../../database/prisma";
import { getUTCTime } from "../../utils/getUTCTime";

let todayISO = new Date().toISOString();
let today = getUTCTime(todayISO);

export const categoryGet = async (req: Request, res: Response) => {
    try {
        const reqinventoryid = req.params.inventoryid;

        if (reqinventoryid != "all") {
            const categories = await prisma.category.findMany({
                where: {
                    inventoryId: reqinventoryid
                }
            });
            return res.status(200).json(categories);
        }
        else {
            const categories = await prisma.category.findMany();
            return res.status(200).json(categories);
        }

    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    };
};

export const categoryPost = async (req: Request, res: Response) => {
    try {
        const reqinventoryid = req.params.inventoryid;
        const requserid = req.params.userid;

        if (!reqinventoryid) {
            return res.status(400).json({ error: "User ID is required" });
        }

        if (!requserid) {
            return res.status(400).json({ error: "User ID is required" });
        }

        const userExists = await prisma.user.findUnique({
            where: {
                id: requserid
            }
        });

        if (!userExists) {
            return res.status(400).json({ error: "User does not exist" });
        }

        const inventoryExists = await prisma.inventory.findUnique({
            where: {
                id: reqinventoryid
            }
        });

        if (!inventoryExists) {
            return res.status(400).json({ error: "Inventory does not exist" });
        }

        const invitationExists = await prisma.invitation.findMany({
            where: {
                inventoryId: reqinventoryid,
                inviteForId: requserid,
                inviteStatus: true
            }
        });

        console.log(invitationExists);


        if (invitationExists || inventoryExists.userId == requserid) {
            await prisma.category.create({
                data: {
                    inventoryId: reqinventoryid,
                    name: req.body.name,
                    description: req.body.description,
                    created: today,
                    updateAt: today
                }
            });
        }

        return res.status(201).json({ message: "Category created" });
    } catch (error) {
        return res.status(500).json({error});
    }
};

export const categoryDelete = async (req: Request, res: Response) => {
    try {
        const reqcategoryid = req.params.categoryid;

        if (!reqcategoryid) {
            return res.status(400).json({ error: "Category ID are required" });
        };

        await prisma.product.deleteMany({
            where: {
                category: {
                    id: reqcategoryid
                }
            }
        });

        await prisma.category.deleteMany({
            where: {
                id: reqcategoryid,
            }
        });

        return res.status(200).json({ message: "Category deleted" });
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
};

export const categoryDeleteAll = async (req: Request, res: Response) => {
    try {
        await prisma.category.deleteMany();
        return res.status(200).json({ message: "All categories deleted" });
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
}

export const categoryPut = async (req: Request, res: Response) => {
    try {
        const reqcategoryid = req.params.categoryid;

        if (!reqcategoryid) {
            return res.status(400).json({ error: "Category ID is required" });
        };

        await prisma.category.update({
            where: {
                id: reqcategoryid
            },
            data: {
                name: req.body.name,
                description: req.body.description,
                updateAt: today
            }
        });

        res.status(200).json({ message: "Category updated" });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    };
};
