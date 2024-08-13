import {Request, Response} from "express";
import { prisma } from "../../database/prisma";

export const productGet = async (req: Request, res: Response) => { 
    
    let allProducts = []
    allProducts = await prisma.product.findMany()

    return res.status(200).json({allProducts})
};

export const productPost = async (req: Request, res: Response) => {
    const reqcategoryid = req.params.categoryid

    await prisma.product.create({
        data: {
            categoryId: reqcategoryid,
            name: req.body.name,
            description: req.body.description,
            quantity: req.body.quantity
        }
    })

    return res.status(201).json({message: "Produto criado"});
};

export const productDelete = async (req:Request, res: Response) => {
    const reqcategoryid = req.params.categoryid
    const reqproductid = req.params.productid
    console.log(reqcategoryid, reqproductid)

    await prisma.product.deleteMany({
        where: {
            id: reqproductid,
            categoryId: reqcategoryid
        }
    })

    return res.status(200).json(productGet)
}