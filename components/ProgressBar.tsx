"use client";

import { useState, useEffect } from "react";
import { useStore } from "@/store";
import { Goal } from "@/types/goal";

interface ProgressBarProps {
  goal: Goal;
}

export const ProgressBar = ({ goal }: ProgressBarProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const today = new Date();
    const startDate = new Date(goal.startDate);
    const endDate = new Date(goal.endDate);

    const daysPassed = Math.floor(
      (today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    const totalDays = Math.floor(
      (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (totalDays > 0) {
      setProgress(Math.round((daysPassed / totalDays) * 100));
    }
  }, [goal]);

  return (
    <div className="w-full bg-gray-200 rounded-full h-4">
      <div
        className="bg-blue-500 rounded-full h-4"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};