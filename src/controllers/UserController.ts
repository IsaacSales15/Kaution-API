import {Request, Response} from "express";
import { prisma } from "../database/prisma";

export const userGetTest = async (req: Request, res: Response) => { 
    
    let allUsers = []
    allUsers = await prisma.user.findMany()

    return res.status(200).json({allUsers})
}

export const userPostTest = async (req: Request, res: Response) => {
    await prisma.user.create({
        data: {
            name: req.body.name,
            email: req.body.email
        }
    })
    
    return res.status(201).json({message: "Usuario criado"});
}
