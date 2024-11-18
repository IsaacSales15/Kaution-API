import { Request, Response } from "express";
import { prisma } from "../../database/prisma";
import { getUTCTime } from "../../utils/getUTCTime";
import { Role } from "@prisma/client";

let todayISO = new Date().toISOString();
let today = getUTCTime(todayISO);

export const inventoryGet = async (req: Request, res: Response) => {
  try {
    const requserid = req.params.userid;

    if (requserid != "all") {
      const inventories = await prisma.inventory.findMany({
        where: {
          userId: requserid,
        },
      });
      return res.status(200).json(inventories);
    } else {
      const inventories = await prisma.inventory.findMany();
      return res.status(200).json(inventories);
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const inventoryPost = async (req: Request, res: Response) => {
  try {
    const requserid = req.params.userid;
    const { name } = req.body

    if (!requserid) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const inventoryCreated = await prisma.inventory.create({
      data: {
        userId: requserid,
        name,
        createdAt: today,
        updateAt: today,
      },
    });

    await prisma.inventoryAccess.create({
      data: {
        userId: requserid,
        inventoryId: inventoryCreated.id,
        role: Role.ADM,
      },
    });

    return res.status(201).json({ message: "Inventory created" });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const inventoryDelete = async (req: Request, res: Response) => {
  try {
    const reqinventoryid = req.params.inventoryid;

    if (!reqinventoryid) {
      return res.status(400).json({ error: "Inventory ID are required" });
    }

    await prisma.inventory.deleteMany({
      where: {
        id: reqinventoryid,
      },
    });


    return res.status(200).json({ message: "Inventory deleted" });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const inventoryPut = async (req: Request, res: Response) => {
  try {
    const reqinventoryid = req.params.inventoryid;

    if (!reqinventoryid) {
      return res.status(400).json({ error: "Inventory ID is required" });
    }

    await prisma.inventory.update({
      where: {
        id: reqinventoryid,
      },
      data: {
        name: req.body.name,
        updateAt: today,
      },
    });

    res.status(200).json({ message: "Inventory updated" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteAllInventories = async (req: Request, res: Response) => {
  try {
    await prisma.inventory.deleteMany({});

    return res.status(200).json({ message: "All inventories have been deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};
