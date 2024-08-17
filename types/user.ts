import { User } from './user';

export interface UserWithGoals extends User {
  goals: GoalWithActivities[];
}

export interface GoalWithActivities extends Goal {
  activities: Activity[];
}

export interface Goal {
  id: number;
  userId: string;
  title: string;
  description: string;
  target: number;
  targetUnit: string;
  startDate: Date;
  endDate: Date;
  completed: boolean;
  activities: Activity[];
  user: User;
}

export interface Activity {
  id: number;
  goalId: number;
  type: string;
  duration: number;
  intensity: number;
  caloriesBurned: number;
  date: Date;
  goal: Goal;
}