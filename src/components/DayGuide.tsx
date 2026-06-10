"use client";

import { DaySchedule, MatchWithViewing } from "@/lib/types";
import { formatDateLabel } from "@/lib/time-utils";
import MatchCard from "./MatchCard";

interface DayGuideProps {
  schedule: DaySchedule;
  followedTeams: string[];
  onToggleFollow: (teamName: string) => void;
}

function getViewingSummary(matches: MatchWithViewing[]) {
  const slots: Record<string, { label: string; color: string; count: number }> = {
    prime: { label: "黄金时段", color: "text-green-400", count: 0 },
    nightowl: { label: "熬夜档", color: "text-orange-400", count: 0 },
    deepnight: { label: "凌晨档", color: "text-red-400", count: 0 },
    morning: { label: "早间档", color: "text-yellow-400", count: 0 },
    lunch: { label: "午休档", color: "text-yellow-400", count: 0 },
    work: { label: "打工档", color: "text-red-400/70", count: 0 },
  };
  for (const m of matches) {
    if (slots[m.viewing.slot]) {
      slots[m.viewing.slot].count++;
    }
  }
  return Object.values(slots).filter((s) => s.count > 0);
}

export default function DayGuide({ schedule, followedTeams, onToggleFollow }: DayGuideProps) {
  const summary = getViewingSummary(schedule.matches);

  return (
    <div>
      {/* Date header */}
      <div className="mb-4">
        <h2 className="text-xl font-bold">{formatDateLabel(schedule.date)}</h2>
        <p className="text-sm text-foreground/50 mt-1">
          共 {schedule.matches.length} 场比赛
        </p>
      </div>

      {/* Viewing summary */}
      <div className="flex flex-wrap gap-2 mb-4">
        {summary.map((s) => (
          <span key={s.label} className={`text-xs ${s.color}`}>
            {s.label} {s.count}场
          </span>
        )).reduce((acc: React.ReactNode[], elem, i) => {
          if (i > 0) acc.push(<span key={`sep-${i}`} className="text-foreground/20">|</span>);
          acc.push(elem);
          return acc;
        }, [])}
      </div>

      {/* Match list */}
      <div className="flex flex-col gap-3">
        {schedule.matches.map((match) => (
          <MatchCard
            key={match.id}
            match={match}
            followedTeams={followedTeams}
            onToggleFollow={onToggleFollow}
          />
        ))}
      </div>
    </div>
  );
}
