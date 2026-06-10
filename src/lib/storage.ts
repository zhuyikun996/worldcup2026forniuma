import { UserPreferences } from "./types";

const STORAGE_KEY = "worldcup2026_prefs";

export function getPreferences(): UserPreferences {
  if (typeof window === "undefined") return { followedTeams: [] };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : { followedTeams: [] };
  } catch {
    return { followedTeams: [] };
  }
}

export function savePreferences(prefs: UserPreferences): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
}

export function toggleFollowTeam(teamName: string): UserPreferences {
  const prefs = getPreferences();
  const idx = prefs.followedTeams.indexOf(teamName);
  if (idx >= 0) {
    prefs.followedTeams.splice(idx, 1);
  } else {
    prefs.followedTeams.push(teamName);
  }
  savePreferences(prefs);
  return prefs;
}
