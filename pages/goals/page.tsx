"use client";

import { useState, useEffect } from "react";
import { useStore } from "@/store";
import { GoalForm } from "@/components/GoalForm";
import { GoalCard } from "@/components/GoalCard";
import { NavigationBar } from "@/components/NavigationBar";
import { getUser } from "@/utils/auth";
import { fetchGoals } from "@/utils/api";
import { Goal } from "@/types/goal";

export default function Goals() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const { user, session } = useStore();

  useEffect(() => {
    async function fetchUserGoals() {
      if (user) {
        try {
          const fetchedGoals = await fetchGoals(user.id);
          setGoals(fetchedGoals);
        } catch (error) {
          console.error("Error fetching goals:", error);
        }
      }
    }
    fetchUserGoals();
  }, [user]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <NavigationBar />
      <div className="flex flex-col gap-10">
        {user ? (
          <>
            <div className="flex flex-col gap-10">
              <GoalForm />
              <h2 className="text-2xl font-bold">Your Goals</h2>
              {goals.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
                  {goals.map((goal) => (
                    <GoalCard key={goal.id} goal={goal} />
                  ))}
                </div>
              ) : (
                <p>You haven't set any goals yet.</p>
              )}
            </div>
          </>
        ) : (
          <div className="flex flex-col gap-10">
            <h2 className="text-2xl font-bold">Please login to view your goals</h2>
          </div>
        )}
      </div>
    </main>
  );
}