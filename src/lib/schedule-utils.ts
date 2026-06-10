import { Match, MatchWithViewing, DaySchedule } from "./types";
import { matches } from "./schedule";
import {
  getBeijingDateStr,
  getBeijingTimeStr,
  getViewingRecommendation,
  formatDateLabel,
  getWeekday,
} from "./time-utils";

function addViewingInfo(match: Match): MatchWithViewing {
  return {
    ...match,
    beijingDate: getBeijingDateStr(match.dateUTC),
    beijingTime: getBeijingTimeStr(match.dateUTC),
    viewing: getViewingRecommendation(match.dateUTC),
  };
}

export function getAllMatchesWithViewing(): MatchWithViewing[] {
  return matches.map(addViewingInfo);
}

export function getDaySchedules(): DaySchedule[] {
  const matchesWithViewing = getAllMatchesWithViewing();
  const dayMap = new Map<string, MatchWithViewing[]>();

  for (const match of matchesWithViewing) {
    const existing = dayMap.get(match.beijingDate) || [];
    existing.push(match);
    dayMap.set(match.beijingDate, existing);
  }

  const schedules: DaySchedule[] = [];
  for (const [date, dayMatches] of dayMap) {
    dayMatches.sort((a, b) => {
      const timeA = getBeijingTimeStr(a.dateUTC);
      const timeB = getBeijingTimeStr(b.dateUTC);
      return timeA.localeCompare(timeB);
    });
    schedules.push({
      date,
      weekday: getWeekday(date),
      matches: dayMatches,
    });
  }

  schedules.sort((a, b) => a.date.localeCompare(b.date));
  return schedules;
}

export function getDaySchedule(date: string): DaySchedule | undefined {
  const schedules = getDaySchedules();
  return schedules.find((s) => s.date === date);
}

export function getTournamentDates(): string[] {
  const schedules = getDaySchedules();
  return schedules.map((s) => s.date);
}

export function filterByFollowedTeams(
  schedule: DaySchedule,
  followedTeams: string[]
): DaySchedule {
  if (followedTeams.length === 0) return schedule;
  return {
    ...schedule,
    matches: schedule.matches.map((m) => ({
      ...m,
      _isFollowed:
        followedTeams.includes(m.team1.name) ||
        followedTeams.includes(m.team2.name),
    })) as (MatchWithViewing & { _isFollowed: boolean })[],
  };
}

export function getFollowedTeamMatches(
  schedules: DaySchedule[],
  followedTeams: string[]
): DaySchedule[] {
  if (followedTeams.length === 0) return [];
  return schedules
    .map((s) => ({
      ...s,
      matches: s.matches.filter(
        (m) =>
          followedTeams.includes(m.team1.name) ||
          followedTeams.includes(m.team2.name)
      ),
    }))
    .filter((s) => s.matches.length > 0);
}

// Get all unique team names from group stage matches
export function getAllTeams(): string[] {
  const teams = new Set<string>();
  for (const match of matches) {
    if (!match.team1.isPlaceholder) teams.add(match.team1.name);
    if (!match.team2.isPlaceholder) teams.add(match.team2.name);
  }
  return Array.from(teams).sort();
}
