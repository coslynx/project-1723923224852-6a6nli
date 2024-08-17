import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/utils/api";
import { Activity } from "@/types/activity";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Activity[]>
) {
  if (req.method === "POST") {
    try {
      const { goalId, type, duration, intensity, caloriesBurned, date } =
        req.body;

      const newActivity = await prisma.activity.create({
        data: {
          goalId,
          type,
          duration,
          intensity,
          caloriesBurned,
          date,
        },
      });

      res.status(201).json(newActivity);
    } catch (error) {
      console.error("Error creating activity:", error);
      res.status(500).json({ error: "Failed to create activity" });
    }
  } else if (req.method === "GET") {
    try {
      const activities = await prisma.activity.findMany({
        orderBy: {
          date: "desc",
        },
      });

      res.status(200).json(activities);
    } catch (error) {
      console.error("Error fetching activities:", error);
      res.status(500).json({ error: "Failed to fetch activities" });
    }
  } else {
    res.status(405).end("Method not allowed");
  }
}