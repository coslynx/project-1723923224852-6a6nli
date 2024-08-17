import { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session, token, user }) {
      if (session.user) {
        try {
          const dbUser = await prisma.user.findUnique({
            where: {
              email: session.user.email,
            },
          });
          session.user.id = dbUser?.id;
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      }
      return session;
    },
  },
});