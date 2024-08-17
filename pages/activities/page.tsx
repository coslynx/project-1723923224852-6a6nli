"use client";

import { useState, useEffect } from "react";
import { useStore } from "@/store";
import { ActivityForm } from "@/components/ActivityForm";
import { ActivityCard } from "@/components/ActivityCard";
import { NavigationBar } from "@/components/NavigationBar";
import { fetchActivities } from "@/utils/api";
import { Activity } from "@/types/activity";

export default function Activities() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const { user, session } = useStore();

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
              <ActivityForm />
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
          </>
        ) : (
          <div className="flex flex-col gap-10">
            <h2 className="text-2xl font-bold">Please login to view your activities</h2>
          </div>
        )}
      </div>
    </main>
  );
}