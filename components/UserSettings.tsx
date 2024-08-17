"use client";

import { useState } from "react";
import { useStore } from "@/store";
import { Button } from "@/components/Button";
import { InputField } from "@/components/InputField";
import { fetchUser } from "@/utils/api";
import { User } from "@/types/user";
import { useRouter } from "next/navigation";

export const UserSettings = () => {
  const { user, setUser, setSession } = useStore();
  const [isUpdating, setIsUpdating] = useState(false);
  const [updatedEmail, setUpdatedEmail] = useState(user?.email || "");
  const [updatedPassword, setUpdatedPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      const res = await fetch(`/api/users/${user?.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: updatedEmail,
          password: updatedPassword,
        }),
      });

      if (res.ok) {
        const updatedUser = await res.json();
        setUser(updatedUser as User);
        setSession({ user: updatedUser as User });
        setIsUpdating(false);
        setError(null);
      } else {
        const errorData = await res.json();
        setError(errorData.error);
        setIsUpdating(false);
      }
    } catch (error: any) {
      console.error("Error updating user:", error);
      setError("Something went wrong. Please try again later.");
      setIsUpdating(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/signout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      setSession(null);
      setUser(null);
      router.push("/");
    } catch (error) {
      console.error("Error logging out:", error);
      setError("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="flex flex-col gap-10">
      <h2 className="text-2xl font-bold">User Settings</h2>
      {user && (
        <form onSubmit={handleUpdate}>
          <InputField
            label="Email"
            type="email"
            value={updatedEmail}
            onChange={(e) => setUpdatedEmail(e.target.value)}
            required
          />
          <InputField
            label="New Password"
            type="password"
            value={updatedPassword}
            onChange={(e) => setUpdatedPassword(e.target.value)}
          />
          <Button type="submit" disabled={isUpdating} className="w-full mt-4">
            {isUpdating ? "Updating..." : "Update Profile"}
          </Button>
          {error && <p className="text-red-500 mb-4">{error}</p>}
        </form>
      )}
      <Button onClick={handleLogout} className="w-full mt-4">
        Logout
      </Button>
    </div>
  );
};