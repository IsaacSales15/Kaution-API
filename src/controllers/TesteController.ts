import {Request, Response} from "express";

export const test = async (req: Request, res: Response) => {
    return res.status(200).json({message: "Qualquer Coisa"});
}

export const testpost = async (req: Request, res: Response) => {
    return res.status(200).json({message: "Qualquer Coisa"});
}