import {Request, Response} from "express";
import { prisma } from "../database/prisma";

export const productGet = async (req: Request, res: Response) => { 
    
    let allProducts = []
    allProducts = await prisma.product.findMany()

    return res.status(200).json({allProducts})
}

export const productPost = async (req: Request, res: Response) => {
    await prisma.product.create({
        data: {
            categoryId: req.params.categoryid,
            name: req.body.name,
            description: req.body.description,
            quantity: req.body.quantity
        }
    })

    return res.status(201).json({message: "Produto criado"});
}