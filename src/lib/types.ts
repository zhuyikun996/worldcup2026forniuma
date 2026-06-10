export type Stage =
  | "group"
  | "round32"
  | "round16"
  | "quarterfinal"
  | "semifinal"
  | "thirdplace"
  | "final";

export interface TeamInfo {
  name: string;
  code: string;
  isPlaceholder?: boolean;
}

export interface Match {
  id: number;
  stage: Stage;
  dateUTC: string;
  team1: TeamInfo;
  team2: TeamInfo;
  group?: string;
  venue: string;
}

export type ViewingSlot =
  | "prime"
  | "morning"
  | "lunch"
  | "work"
  | "nightowl"
  | "deepnight";

export interface ViewingRecommendation {
  slot: ViewingSlot;
  label: string;
  color: string;
  bgColor: string;
  description: string;
}

export interface MatchWithViewing extends Match {
  beijingTime: string;
  beijingDate: string;
  viewing: ViewingRecommendation;
}

export interface DaySchedule {
  date: string;
  weekday: string;
  matches: MatchWithViewing[];
}

export interface UserPreferences {
  followedTeams: string[];
}
