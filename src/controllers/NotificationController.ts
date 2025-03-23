import { Request, Response } from "express";
import { prisma } from "../../database/prisma";
import { getUTCTime } from "../../utils/getUTCTime";
import { Role } from "@prisma/client";

let todayISO = new Date().toISOString();
let today = getUTCTime(todayISO);

export const notificationGet = async (req: Request, res: Response) => {
  try {
    const requserid = req.params.userid;

    if (requserid != "all") {
      const inventories = await prisma.notifications.findMany({
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

export const notificationPost = async (req: Request, res: Response) => {
  try {
    const requserid = req.params.userid;

    if (!requserid) {
      return res.status(400).json({ error: "User ID is required" });
    }
    else {
      const notificationCreated = await prisma.notifications.create({
        data: {
          userId: requserid,
          sendAt: today,
          message: req.body.message,
          viewed: false
        },
      });
    }
    return res.status(201).json({ message: "Notification sent" });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const notificationDelete = async (req: Request, res: Response) => {
  try {
    const reqnotificationid = req.params.notificationid;

    if (!reqnotificationid) {
      return res.status(400).json({ error: "Notification ID are required" });
    }

    await prisma.notifications.deleteMany({
      where: {
        id: reqnotificationid,
      },
    });

    return res.status(200).json({ message: "Notification deleted" });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const notificationPut = async (req: Request, res: Response) => {
  try {
    const reqnotificationid = req.params.notificationid;

    if (!reqnotificationid) {
      return res.status(400).json({ error: "Notification ID is required" });
    }

    await prisma.notifications.update({
      where: {
        id: reqnotificationid,
      },
      data: {
        message: req.body.name,
        viewedAt: req.body.viewedAt,
        viewed: req.body.viewed,
      },
    });

    res.status(200).json({ message: "Notification updated" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteAllnotifications = async (req: Request, res: Response) => {
  try {
    await prisma.notifications.deleteMany({});

    return res.status(200).json({ message: "All notifications have been deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};
