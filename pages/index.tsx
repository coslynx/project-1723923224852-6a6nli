"use client";

import { useState } from "react";
import { useStore } from "@/store";
import { GoalForm } from "@/components/GoalForm";
import { ActivityForm } from "@/components/ActivityForm";
import { GoalCard } from "@/components/GoalCard";
import { ActivityCard } from "@/components/ActivityCard";
import { NavigationBar } from "@/components/NavigationBar";
import { UserProfile } from "@/components/UserProfile";
import { UserSettings } from "@/components/UserSettings";
import { AuthModal } from "@/components/AuthModal";
import { SocialSharing } from "@/components/SocialSharing";

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const { user, goals, activities } = useStore();

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
              <div className="flex flex-col gap-10">
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
              <div className="flex flex-col gap-10">
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
            </div>
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