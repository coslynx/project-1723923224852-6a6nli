"use client";

import { useState } from "react";
import { useStore } from "@/store";
import { Button } from "@/components/Button";
import { InputField } from "@/components/InputField";
import { fetchGoals } from "@/utils/api";
import { Goal } from "@/types/goal";

export const GoalForm = () => {
  const { user, goals, setGoals } = useStore();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [target, setTarget] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const newGoal: Goal = {
        title,
        description,
        target: parseFloat(target),
        startDate,
        endDate,
        userId: user?.id || "",
      };
      const res = await fetch("/api/goals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newGoal),
      });

      if (res.ok) {
        const newGoal = await res.json();
        setGoals([...goals, newGoal]);
        setIsLoading(false);
        setTitle("");
        setDescription("");
        setTarget("");
        setStartDate("");
        setEndDate("");
      } else {
        const errorData = await res.json();
        setError(errorData.error);
        setIsLoading(false);
      }
    } catch (error: any) {
      console.error("Error creating goal:", error);
      setError("Something went wrong. Please try again later.");
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <h2 className="text-xl font-bold">Set Your Goal</h2>
      {user && (
        <>
          <InputField
            label="Goal Title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <InputField
            label="Description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <InputField
            label="Target"
            type="number"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            required
          />
          <InputField
            label="Start Date"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
          <InputField
            label="End Date"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
          <Button type="submit" disabled={isLoading} className="w-full mt-4">
            {isLoading ? "Setting..." : "Set Goal"}
          </Button>
          {error && <p className="text-red-500 mb-4">{error}</p>}
        </>
      )}
    </form>
  );
};