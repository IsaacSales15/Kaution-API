import {Request, Response} from "express";
import { prisma } from "../../database/prisma";

export const categoryGet = async (req: Request, res: Response) => { 
    
    let allCategories = []
    allCategories = await prisma.category.findMany()

    return res.status(200).json({allCategories})
};

export const categoryPost = async (req: Request, res: Response) => {
        const requserid = req.params.userid;


    await prisma.category.create({
        data: {
            userId: requserid,
            name: req.body.name,
            description : req.body.description,
        }
    })

    return res.status(201).json({message: "Categoria criada"});
};

export const categoryDelete = async (req: Request, res: Response) => {
    const requserid = req.params.userid
    const reqcategoryid = req.params.categoryid
    console.log(requserid, reqcategoryid)
    
    await prisma.product.deleteMany({
        where: {
            category:{
                id: reqcategoryid
            }
        }
    })

    await prisma.category.deleteMany({
        where: {
            id: reqcategoryid,
            userId: requserid
        }
    })

    return res.status(200).json({message: "Categoria deletada"});
};