"use client";

import { useState, useEffect } from "react";
import { useStore } from "@/store";
import { NavigationBar } from "@/components/NavigationBar";
import { GoalCard } from "@/components/GoalCard";
import { GoalForm } from "@/components/GoalForm";
import { ActivityCard } from "@/components/ActivityCard";
import { ActivityForm } from "@/components/ActivityForm";
import { fetchGoals } from "@/utils/api";
import { fetchActivities } from "@/utils/api";
import { Goal } from "@/types/goal";
import { Activity } from "@/types/activity";
import { UserProfile } from "@/components/UserProfile";
import { UserSettings } from "@/components/UserSettings";
import { SocialSharing } from "@/components/SocialSharing";

export default function Dashboard() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
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

  useEffect(() => {
    async function fetchUserActivities() {
      if (user) {
        try {
          const fetchedActivities = await fetchActivities(user.id);
          setActivities(fetchedActivities);
        } catch (error) {
          console.error("Error fetching activities:", error);
        }
      }
    }
    fetchUserActivities();
  }, [user]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <NavigationBar />
      <div className="flex flex-col gap-10">
        {user ? (
          <>
            <div className="flex flex-col gap-10">
              <div className="flex gap-10">
                <GoalForm />
                <ActivityForm />
              </div>
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
              <h2 className="text-2xl font-bold">Your Activities</h2>
              {activities.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
                  {activities.map((activity) => (
                    <ActivityCard key={activity.id} activity={activity} />
                  ))}
                </div>
              ) : (
                <p>You haven't logged any activities yet.</p>
              )}
            </div>
            <UserProfile />
            <UserSettings />
            <SocialSharing />
          </>
        ) : (
          <div className="flex flex-col gap-10">
            <h2 className="text-2xl font-bold">Welcome to Fitness Goal Tracker!</h2>
            <p>Start your fitness journey today.</p>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => setShowModal(true)}
            >
              Get Started
            </button>
            <AuthModal show={showModal} onClose={() => setShowModal(false)} />
          </div>
        )}
      </div>
    </main>
  );
}