export const ACTIVITY_TYPES = [
  "Cardio",
  "Strength Training",
  "Yoga",
  "Cycling",
  "Swimming",
  "Hiking",
  "Running",
  "Other",
] as const;

export const GOAL_TARGET_UNITS = [
  "kg",
  "lbs",
  "km",
  "miles",
  "hours",
  "minutes",
  "reps",
  "sets",
] as const;

export const DEFAULT_GOAL_TARGET_UNIT = "kg";

export const INTENSITY_LEVELS = [
  "Easy",
  "Moderate",
  "Hard",
  "Very Hard",
] as const;

export const DEFAULT_INTENSITY_LEVEL = "Moderate";