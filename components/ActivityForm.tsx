"use client";

import { useState } from "react";
import { useStore } from "@/store";
import { Button } from "@/components/Button";
import { InputField } from "@/components/InputField";
import { fetchActivities } from "@/utils/api";
import { Activity } from "@/types/activity";

export const ActivityForm = () => {
  const { user, activities, setActivities } = useStore();
  const [goalId, setGoalId] = useState<number | null>(null);
  const [type, setType] = useState("");
  const [duration, setDuration] = useState("");
  const [intensity, setIntensity] = useState("");
  const [caloriesBurned, setCaloriesBurned] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const newActivity: Activity = {
        goalId: goalId!,
        type,
        duration: parseInt(duration),
        intensity: parseInt(intensity),
        caloriesBurned: parseInt(caloriesBurned),
        date,
      };
      const res = await fetch("/api/activities", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newActivity),
      });

      if (res.ok) {
        const newActivity = await res.json();
        setActivities([...activities, newActivity]);
        setIsLoading(false);
        setType("");
        setDuration("");
        setIntensity("");
        setCaloriesBurned("");
        setDate("");
      } else {
        const errorData = await res.json();
        setError(errorData.error);
        setIsLoading(false);
      }
    } catch (error: any) {
      console.error("Error creating activity:", error);
      setError("Something went wrong. Please try again later.");
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <h2 className="text-xl font-bold">Log Your Activity</h2>
      {user && (
        <>
          <select
            value={goalId || ""}
            onChange={(e) => setGoalId(parseInt(e.target.value))}
            className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select Goal</option>
            {user.goals.map((goal) => (
              <option key={goal.id} value={goal.id}>
                {goal.title}
              </option>
            ))}
          </select>
          <InputField
            label="Activity Type"
            type="text"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          />
          <InputField
            label="Duration (minutes)"
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
          />
          <InputField
            label="Intensity (1-10)"
            type="number"
            value={intensity}
            onChange={(e) => setIntensity(e.target.value)}
            required
          />
          <InputField
            label="Calories Burned"
            type="number"
            value={caloriesBurned}
            onChange={(e) => setCaloriesBurned(e.target.value)}
            required
          />
          <InputField
            label="Date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
          <Button type="submit" disabled={isLoading} className="w-full mt-4">
            {isLoading ? "Logging..." : "Log Activity"}
          </Button>
          {error && <p className="text-red-500 mb-4">{error}</p>}
        </>
      )}
    </form>
  );
};