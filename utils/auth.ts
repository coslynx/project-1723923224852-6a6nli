import { Session } from "next-auth/react/types";
import { prisma } from "@/utils/api";
import { User } from "@/types/user";

export async function getUser(email: string): Promise<User | null> {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      include: { goals: { include: { activities: true } } },
    });
    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}

export async function getSessionUser(session: Session): Promise<User | null> {
  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { goals: { include: { activities: true } } },
    });
    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}