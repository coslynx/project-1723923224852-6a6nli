import { ACTIVITY_TYPES, GOAL_TARGET_UNITS, DEFAULT_GOAL_TARGET_UNIT, INTENSITY_LEVELS, DEFAULT_INTENSITY_LEVEL } from "@/utils/constants";

export const formatDate = (date: Date) => {
  return date.toLocaleDateString();
};

export const formatDuration = (duration: number) => {
  return `${duration} minutes`;
};

export const formatIntensity = (intensity: number) => {
  return INTENSITY_LEVELS[intensity - 1] || "Unknown";
};

export const formatCaloriesBurned = (caloriesBurned: number) => {
  return `${caloriesBurned} calories`;
};

export const formatGoalTarget = (target: number, targetUnit: string) => {
  return `${target} ${targetUnit}`;
};

export const getGoalProgress = (goal: { startDate: Date; endDate: Date }) => {
  const today = new Date();
  const startDate = new Date(goal.startDate);
  const endDate = new Date(goal.endDate);

  const daysPassed = Math.floor(
    (today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
  );
  const totalDays = Math.floor(
    (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (totalDays > 0) {
    return Math.round((daysPassed / totalDays) * 100);
  }

  return 0;
};

export const validateGoalForm = (values: {
  title: string;
  description: string;
  target: number;
  startDate: string;
  endDate: string;
  targetUnit: string;
}) => {
  const errors: { [key: string]: string } = {};

  if (!values.title) {
    errors.title = "Title is required";
  }

  if (!values.description) {
    errors.description = "Description is required";
  }

  if (!values.target) {
    errors.target = "Target is required";
  }

  if (!values.startDate) {
    errors.startDate = "Start date is required";
  }

  if (!values.endDate) {
    errors.endDate = "End date is required";
  }

  if (!GOAL_TARGET_UNITS.includes(values.targetUnit)) {
    errors.targetUnit = "Invalid target unit";
  }

  return errors;
};

export const validateActivityForm = (values: {
  goalId: number;
  type: string;
  duration: number;
  intensity: number;
  caloriesBurned: number;
  date: string;
}) => {
  const errors: { [key: string]: string } = {};

  if (!values.goalId) {
    errors.goalId = "Goal is required";
  }

  if (!ACTIVITY_TYPES.includes(values.type)) {
    errors.type = "Invalid activity type";
  }

  if (!values.duration) {
    errors.duration = "Duration is required";
  }

  if (!values.intensity) {
    errors.intensity = "Intensity is required";
  }

  if (!values.caloriesBurned) {
    errors.caloriesBurned = "Calories burned is required";
  }

  if (!values.date) {
    errors.date = "Date is required";
  }

  return errors;
};

export const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const formatNumber = (num: number) => {
  return num.toLocaleString();
};

export const isDateValid = (dateStr: string) => {
  const date = new Date(dateStr);
  return !isNaN(date.getTime());
};

export const getDaysBetweenDates = (startDate: Date, endDate: Date) => {
  const oneDay = 24 * 60 * 60 * 1000;
  const diff = Math.abs(endDate.getTime() - startDate.getTime());
  return Math.ceil(diff / oneDay);
};