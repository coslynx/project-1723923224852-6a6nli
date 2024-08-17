import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export { prisma };

export async function fetchGoals(userId: string): Promise<Goal[]> {
  try {
    const goals = await prisma.goal.findMany({
      where: { userId },
      orderBy: { startDate: "asc" },
      include: { activities: true },
    });
    return goals;
  } catch (error) {
    console.error("Error fetching goals:", error);
    throw new Error("Failed to fetch goals");
  }
}

export async function fetchActivities(userId: string): Promise<Activity[]> {
  try {
    const activities = await prisma.activity.findMany({
      where: { goal: { userId } },
      orderBy: { date: "desc" },
      include: { goal: true },
    });
    return activities;
  } catch (error) {
    console.error("Error fetching activities:", error);
    throw new Error("Failed to fetch activities");
  }
}

export async function fetchUser(userId: string): Promise<User | null> {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { goals: { include: { activities: true } } },
    });
    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw new Error("Failed to fetch user");
  }
}