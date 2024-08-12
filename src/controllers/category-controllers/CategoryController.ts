import {Request, Response} from "express";
import { prisma } from "../../database/prisma";

export const categoryGet = async (req: Request, res: Response) => { 
    
    let allCategories = []
    allCategories = await prisma.category.findMany()

    return res.status(200).json({allCategories})
}

export const categoryPost = async (req: Request, res: Response) => {
    await prisma.category.create({
        data: {
            userId: req.params.id,
            name: req.body.name
        }
    })

    return res.status(201).json({message: "Categoria criada"});
}

export const categoryDelete = async (req: Request, res: Response) => {
    await prisma.category.deleteMany({
        where: {
            id: req.params.idcategory,
            userId: req.params.userid
        }
    })

    await prisma.product.deleteMany({
        where: {
            categoryId: req.params.idcategory
        }
    })

    return res.status(200).json({message: "Categoria deletada"});
}