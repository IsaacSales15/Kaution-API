import { Request, Response } from "express";
import { prisma } from "../../database/prisma";

export const productGet = async (req: Request, res: Response) => {
    try {
        const reqcategoryid = req.params.categoryid;

        if (reqcategoryid != "all") {
            const products = await prisma.product.findMany({
                where: {
                    categoryId: reqcategoryid,
                },
            });
            return res.status(200).json(products);
        }
        else {
            const products = await prisma.product.findMany(); 
            return res.status(200).json(products);
        }

    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    };
};

export const productPost = async (req: Request, res: Response) => {
    try {
        const reqcategoryid = req.params.categoryid;

        if (!reqcategoryid) {
            return res.status(400).json({ error: "Category ID is required" });
        };

        await prisma.product.create({
            data: {
                categoryId: reqcategoryid,
                name: req.body.name,
                description: req.body.description,
                quantity: req.body.quantity
            }
        });

        return res.status(201).json({ message: "Product created" });
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
};

export const productDelete = async (req: Request, res: Response) => {
    try {
        const reqcategoryid = req.params.categoryid;
        const reqproductid = req.params.productid;
        
        if (!reqproductid || !reqcategoryid) {
            return res.status(400).json({ error: "Product ID and category ID are required" });
        };

        await prisma.product.deleteMany({
            where: {
                id: reqproductid,
                categoryId: reqcategoryid
            }
        });

        return res.status(200).json({ message: "Product deleted" });
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
};