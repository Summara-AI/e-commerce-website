/**
 * Routine Builder — maps concerns to existing catalog products only.
 */

export type RoutineConcernId =
  | "dryness-dehydration"
  | "sensitive-skin"
  | "sun-protection"
  | "anti-aging"
  | "pore-minimizer"
  | "deep-cleansing";

export type RoutineGoalId = "hydrate" | "calm" | "protect" | "glow" | "clarify";

export type RoutineTimeId = "morning" | "night" | "both";

export const ROUTINE_BUILDER_PAGE = {
  eyebrow: "Routines",
  title: "Build your Korean routine",
  description:
    "A calm, guided path — answer a few questions and we’ll recommend authentic pieces from our catalogue.",
} as const;

export const ROUTINE_CONCERNS: {
  id: RoutineConcernId;
  label: string;
  description: string;
}[] = [
  {
    id: "dryness-dehydration",
    label: "Dryness & dehydration",
    description: "Comfort, plumpness, lasting moisture",
  },
  {
    id: "sensitive-skin",
    label: "Sensitive skin",
    description: "Calm barrier support, gentle care",
  },
  {
    id: "sun-protection",
    label: "Sun protection",
    description: "Daily SPF and defensive mornings",
  },
  {
    id: "anti-aging",
    label: "Anti-aging",
    description: "Firmness and resilient glow",
  },
  {
    id: "pore-minimizer",
    label: "Pores & texture",
    description: "Clearer-looking, refined finish",
  },
  {
    id: "deep-cleansing",
    label: "Deep cleansing",
    description: "Makeup melt and clean canvas",
  },
];

export const ROUTINE_GOALS: { id: RoutineGoalId; label: string }[] = [
  { id: "hydrate", label: "Hydrate deeply" },
  { id: "calm", label: "Calm & soothe" },
  { id: "protect", label: "Protect daily" },
  { id: "glow", label: "Even, luminous glow" },
  { id: "clarify", label: "Clarify texture" },
];

export const ROUTINE_TIMES: { id: RoutineTimeId; label: string; hint: string }[] = [
  { id: "morning", label: "Morning", hint: "Cleanse → treat → moisturise → SPF" },
  { id: "night", label: "Night", hint: "Cleanse → treat → moisturise → mask (optional)" },
  { id: "both", label: "Morning & night", hint: "A full day of calm layering" },
];
