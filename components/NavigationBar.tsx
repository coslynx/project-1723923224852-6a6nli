"use client";

import { useStore } from "@/store";
import Link from "next/link";
import { UserAvatar } from "@/components/UserAvatar";
import { useRouter } from "next/navigation";

export const NavigationBar = () => {
  const { user, session, setSession } = useStore();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/signout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      setSession(null);
      router.push("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <nav className="bg-white py-4 shadow-md fixed top-0 left-0 w-full z-10">
      <div className="container mx-auto flex items-center justify-between px-4">
        <Link href="/" className="text-xl font-bold">
          Fitness Goal Tracker
        </Link>
        <div className="flex items-center gap-5">
          {user ? (
            <>
              <UserAvatar user={user} />
              <button
                onClick={handleLogout}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <Link href="/dashboard" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Login/Sign Up
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};