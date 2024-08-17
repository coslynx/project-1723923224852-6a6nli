"use client";

import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth/react/types";
import { useState, useEffect } from "react";
import { useStore } from "@/store";
import { getUser } from "@/utils/auth";

interface AppProps {
  session: Session | null;
}

export default function RootLayout({ children, session }: AppProps) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function fetchUser() {
      if (session) {
        try {
          const fetchedUser = await getUser(session.user.email as string);
          setUser(fetchedUser);
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      }
    }

    fetchUser();
  }, [session]);

  const { setSession, setUser } = useStore();

  useEffect(() => {
    if (session) {
      setSession(session);
    }
  }, [session]);

  useEffect(() => {
    setUser(user);
  }, [user]);

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Fitness Goal Tracker</title>
        <link href="/fonts.css" rel="stylesheet" />
      </head>
      <body className="bg-gray-100">
        <SessionProvider session={session}>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}