import { GoalWithActivities } from "./shared";

export interface Goal extends GoalWithActivities {
  targetUnit: string;
}