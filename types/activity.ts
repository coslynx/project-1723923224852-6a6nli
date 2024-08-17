import { Activity } from "./activity";

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

export interface User {
  id: string;
  email: string;
  password?: string;
  picture?: string;
  goals: Goal[];
}