"use client";

import { useState } from "react";
import { useStore } from "@/store";
import { Button } from "@/components/Button";

export const SocialSharing = () => {
  const { user } = useStore();
  const [isSharing, setIsSharing] = useState(false);

  const handleShare = () => {
    setIsSharing(true);
    // Implement logic to share user progress on social media platforms
    // e.g., using a social sharing library or API
    // ...
    setTimeout(() => {
      setIsSharing(false);
    }, 3000); // Simulate sharing time
  };

  return (
    <div className="flex flex-col gap-10">
      <h2 className="text-2xl font-bold">Share Your Progress</h2>
      <Button onClick={handleShare} disabled={isSharing}>
        {isSharing ? "Sharing..." : "Share Now"}
      </Button>
    </div>
  );
};