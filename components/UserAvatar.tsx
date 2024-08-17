"use client";

import { User } from "@/types/user";
import Image from "next/image";

interface UserAvatarProps {
  user: User;
}

export const UserAvatar = ({ user }: UserAvatarProps) => {
  return (
    <div className="relative w-12 h-12 rounded-full overflow-hidden">
      {user.picture ? (
        <Image
          src={user.picture}
          alt="User Avatar"
          fill
          className="object-cover"
        />
      ) : (
        <div className="flex items-center justify-center w-full h-full bg-gray-300 text-gray-500">
          {user.email?.charAt(0).toUpperCase()}
        </div>
      )}
    </div>
  );
};