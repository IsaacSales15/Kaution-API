import { Request, Response } from "express";
import { prisma } from "../../database/prisma";
import { getUTCTime } from "../../utils/getUTCTime";

let todayISO = new Date().toISOString();
let today = getUTCTime(todayISO);

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
    } else {
      const products = await prisma.product.findMany();
      return res.status(200).json(products);
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const productPost = async (req: Request, res: Response) => {
  try {
    const reqcategoryid = req.params.categoryid;

    if (!reqcategoryid) {
      return res.status(400).json({ error: "Category ID is required" });
    }

    const categoryExists = await prisma.category.findUnique({
      where: {
        id: reqcategoryid,
      },
    });

    if (!categoryExists) {
      return res.status(400).json({ error: "Category not exists" });
    }

    await prisma.product.create({
      data: {
        categoryId: reqcategoryid,
        name: req.body.name,
        description: req.body.description,
        quantity: parseInt(req.body.quantity),
      },
    });

    await prisma.category.update({
      where: {
        id: reqcategoryid,
      },
      data: {
        updateAt: today,
      },
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
      return res
        .status(400)
        .json({ error: "Product ID and category ID are required" });
    }

    const categoryExists = await prisma.category.findUnique({
      where: {
        id: reqcategoryid,
      },
    });

    if (!categoryExists) {
      return res.status(400).json({ error: "Category not exists" });
    }

    await prisma.product.deleteMany({
      where: {
        id: reqproductid,
        categoryId: reqcategoryid,
      },
    });

    await prisma.category.update({
      where: {
        id: reqcategoryid,
      },
      data: {
        updateAt: today,
      },
    });

    return res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const productPut = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    console.log(req.params);
    const reqcategoryid = req.params.categoryid;
    const reqproductid = req.params.productid;

    if (!reqproductid || !reqcategoryid) {
      return res
        .status(400)
        .json({ error: "Product ID and category ID are required" });
    }

    const categoryExists = await prisma.category.findUnique({
      where: {
        id: reqcategoryid,
      },
    });

    if (!categoryExists) {
      return res.status(400).json({ error: "Category not exists" });
    }

    await prisma.product.update({
      where: {
        id: reqproductid,
      },
      data: {
        name: req.body.name,
        description: req.body.description,
        quantity: parseInt(req.body.quantity),
      },
    });

    await prisma.category.update({
      where: {
        id: reqcategoryid,
      },
      data: {
        updateAt: today,
      },
    });

    return res.status(200).json({ menssage: "Product updated" });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};
