import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/utils/api";
import { Goal } from "@/types/goal";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Goal | { error: string }>
) {
  if (req.method === "POST") {
    try {
      const { title, description, target, startDate, endDate, userId } = req.body;

      const newGoal = await prisma.goal.create({
        data: {
          title,
          description,
          target,
          startDate,
          endDate,
          userId,
        },
      });

      res.status(201).json(newGoal);
    } catch (error) {
      console.error("Error creating goal:", error);
      res.status(500).json({ error: "Failed to create goal" });
    }
  } else if (req.method === "GET") {
    try {
      const goals = await prisma.goal.findMany({
        where: {
          userId: req.query.userId as string,
        },
        orderBy: {
          startDate: "asc",
        },
      });

      res.status(200).json(goals);
    } catch (error) {
      console.error("Error fetching goals:", error);
      res.status(500).json({ error: "Failed to fetch goals" });
    }
  } else if (req.method === "PUT") {
    try {
      const { id, title, description, target, startDate, endDate } = req.body;

      const updatedGoal = await prisma.goal.update({
        where: {
          id: parseInt(id),
        },
        data: {
          title,
          description,
          target,
          startDate,
          endDate,
        },
      });

      res.status(200).json(updatedGoal);
    } catch (error) {
      console.error("Error updating goal:", error);
      res.status(500).json({ error: "Failed to update goal" });
    }
  } else if (req.method === "DELETE") {
    try {
      const { id } = req.query;

      await prisma.goal.delete({
        where: {
          id: parseInt(id as string),
        },
      });

      res.status(204).end();
    } catch (error) {
      console.error("Error deleting goal:", error);
      res.status(500).json({ error: "Failed to delete goal" });
    }
  } else {
    res.status(405).end("Method not allowed");
  }
}