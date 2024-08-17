import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/utils/api";
import { User } from "@/types/user";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User | { error: string }>
) {
  if (req.method === "POST") {
    try {
      const { email, password } = req.body;

      const existingUser = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (existingUser) {
        return res.status(409).json({ error: "User already exists" });
      }

      const newUser = await prisma.user.create({
        data: {
          email,
          password,
        },
      });

      res.status(201).json(newUser);
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ error: "Failed to create user" });
    }
  } else if (req.method === "GET") {
    try {
      const { userId } = req.query;

      const user = await prisma.user.findUnique({
        where: {
          id: userId as string,
        },
      });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.status(200).json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ error: "Failed to fetch user" });
    }
  } else {
    res.status(405).end("Method not allowed");
  }
}