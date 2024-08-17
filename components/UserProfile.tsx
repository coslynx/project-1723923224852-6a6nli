"use client";

import { useState, useEffect } from "react";
import { useStore } from "@/store";
import { User } from "@/types/user";
import { Button } from "@/components/Button";
import { UserAvatar } from "@/components/UserAvatar";
import { fetchUser } from "@/utils/api";
import { useRouter } from "next/navigation";

export const UserProfile = () => {
  const { user, setUser } = useStore();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function fetchUserProfile() {
      setIsLoading(true);
      try {
        const fetchedUser = await fetchUser(user?.id || "");
        setUser(fetchedUser as User);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        // Handle error, e.g., display an error message
      } finally {
        setIsLoading(false);
      }
    }

    if (user) {
      fetchUserProfile();
    }
  }, [user]);

  return (
    <div className="flex flex-col gap-10">
      <h2 className="text-2xl font-bold">Your Profile</h2>
      {user && (
        <div className="flex items-center gap-5">
          <UserAvatar user={user} />
          <div className="flex flex-col">
            <p className="text-lg font-medium">{user.email}</p>
            {/* Add more profile details as needed */}
          </div>
        </div>
      )}
      <Button onClick={() => router.push("/profile")} className="w-full mt-4">
        View Profile Details
      </Button>
      {isLoading && (
        <p className="text-gray-500">Loading profile...</p>
      )}
    </div>
  );
};