import { Request, Response } from "express";
import { prisma } from "../../database/prisma";

export const categoryGet = async (req: Request, res: Response) => {
    try {
        const categories = await prisma.category.findMany();

        return res.status(200).json(categories);
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
};

export const categoryPost = async (req: Request, res: Response) => {
    try {
        const requserid = req.params.userid;

        if (!requserid) {
            return res.status(400).json({ error: "User ID is required" });
        }

        await prisma.category.create({
            data: {
                userId: requserid,
                name: req.body.name,
                description: req.body.description,
                img: req.body.img
            }
        });

        return res.status(201).json({ message: "Category created" });
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
};

export const categoryDelete = async (req: Request, res: Response) => {
    try {
        const requserid = req.params.userid;
        const reqcategoryid = req.params.categoryid;

        if (!reqcategoryid || !requserid) {
            return res.status(400).json({ error: "Category ID and user ID are required" });
        }

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
                userId: requserid
            }
        });

        return res.status(200).json({ message: "Category deleted" });
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
};