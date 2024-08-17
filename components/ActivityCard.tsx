"use client";

import { Activity } from "@/types/activity";
import { useStore } from "@/store";
import { Goal } from "@/types/goal";

interface ActivityCardProps {
  activity: Activity;
}

export const ActivityCard = ({ activity }: ActivityCardProps) => {
  const { goals } = useStore();
  const relatedGoal = goals.find((goal) => goal.id === activity.goalId);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold mb-2">{activity.type}</h3>
      <p className="text-gray-700 mb-2">
        Duration: {activity.duration} minutes
      </p>
      <p className="text-gray-700 mb-2">Intensity: {activity.intensity}</p>
      <p className="text-gray-700 mb-2">
        Calories Burned: {activity.caloriesBurned}
      </p>
      <p className="text-gray-700 mb-2">Date: {activity.date.toLocaleDateString()}</p>
      {relatedGoal && (
        <p className="text-gray-500">
          Related Goal: {relatedGoal.title}
        </p>
      )}
    </div>
  );
};