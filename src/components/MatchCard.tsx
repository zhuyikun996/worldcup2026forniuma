"use client";

import { MatchWithViewing } from "@/lib/types";
import { stageLabels } from "@/lib/schedule";
import ViewingBadge from "./ViewingBadge";
import TeamFollowBtn from "./TeamFollowBtn";

interface MatchCardProps {
  match: MatchWithViewing;
  followedTeams: string[];
  onToggleFollow: (teamName: string) => void;
}

export default function MatchCard({ match, followedTeams, onToggleFollow }: MatchCardProps) {
  const isFollowed =
    followedTeams.includes(match.team1.name) ||
    followedTeams.includes(match.team2.name);

  return (
    <div
      className={`rounded-lg border p-4 transition-all ${
        isFollowed
          ? "border-neon-purple/50 glow-purple bg-card"
          : "border-border bg-card hover:bg-card-hover"
      }`}
    >
      {/* Stage & Group */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-foreground/40">
          {stageLabels[match.stage]}
          {match.group ? ` · ${match.group}组` : ""}
        </span>
        <ViewingBadge viewing={match.viewing} />
      </div>

      {/* Teams */}
      <div className="flex items-center justify-between gap-4 mb-2">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <TeamFollowBtn
            team={match.team1}
            isFollowed={followedTeams.includes(match.team1.name)}
            onToggle={onToggleFollow}
          />
          <span className={`font-semibold truncate ${match.team1.isPlaceholder ? "text-foreground/40" : ""}`}>
            {match.team1.name}
          </span>
        </div>
        <span className="text-xs text-foreground/30 font-mono shrink-0">VS</span>
        <div className="flex items-center gap-2 flex-1 min-w-0 justify-end">
          <span className={`font-semibold truncate ${match.team2.isPlaceholder ? "text-foreground/40" : ""}`}>
            {match.team2.name}
          </span>
          <TeamFollowBtn
            team={match.team2}
            isFollowed={followedTeams.includes(match.team2.name)}
            onToggle={onToggleFollow}
          />
        </div>
      </div>

      {/* Time & Venue */}
      <div className="flex items-center justify-between text-xs text-foreground/40">
        <span>
          🕐 {match.beijingTime} 北京时间
        </span>
        <span>📍 {match.venue}</span>
      </div>

      {/* Viewing advice */}
      <p className="text-xs text-foreground/30 mt-2">{match.viewing.description}</p>
    </div>
  );
}
