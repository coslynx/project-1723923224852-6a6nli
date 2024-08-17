"use client";

import { Goal } from "@/types/goal";
import { useStore } from "@/store";
import { ProgressBar } from "@/components/ProgressBar";

interface GoalCardProps {
  goal: Goal;
}

export const GoalCard = ({ goal }: GoalCardProps) => {
  const { user } = useStore();

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold mb-2">{goal.title}</h3>
      <p className="text-gray-700 mb-2">{goal.description}</p>
      <p className="text-gray-700 mb-2">
        Target: {goal.target} {goal.targetUnit}
      </p>
      <p className="text-gray-700 mb-2">
        Start Date: {goal.startDate.toLocaleDateString()}
      </p>
      <p className="text-gray-700 mb-2">
        End Date: {goal.endDate.toLocaleDateString()}
      </p>
      <ProgressBar goal={goal} />
      {goal.completed && (
        <p className="text-green-500 font-bold mt-2">Completed!</p>
      )}
    </div>
  );
};