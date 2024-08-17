import { Goal } from "./goal";
import { Activity } from "./activity";
import { User } from "./user";

export interface GoalWithActivities extends Goal {
  activities: Activity[];
}

export interface UserWithGoals extends User {
  goals: GoalWithActivities[];
}

export type FormValues = {
  title: string;
  description: string;
  target: number;
  startDate: string;
  endDate: string;
  userId: string;
};

export type ActivityFormValues = {
  goalId: number;
  type: string;
  duration: number;
  intensity: number;
  caloriesBurned: number;
  date: string;
};