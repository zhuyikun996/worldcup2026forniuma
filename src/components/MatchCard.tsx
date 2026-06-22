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

  const isFinished = match.status === "finished";
  const hasScore = match.score1 !== undefined && match.score2 !== undefined;
  const team1Won = hasScore && (match.score1! > match.score2!);
  const team2Won = hasScore && (match.score2! > match.score1!);

  return (
    <div
      className={`rounded-lg border p-4 transition-all ${
        isFollowed
          ? "border-neon-purple/50 glow-purple bg-card"
          : "border-border bg-card hover:bg-card-hover"
      } ${isFinished ? "opacity-90" : ""}`}
    >
      {/* Stage & Group */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-foreground/40">
          {stageLabels[match.stage]}
          {match.group ? ` · ${match.group}组` : ""}
        </span>
        <div className="flex items-center gap-2">
          {isFinished && (
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-foreground/10 text-foreground/50 uppercase tracking-wide">
              已结束
            </span>
          )}
          <ViewingBadge viewing={match.viewing} />
        </div>
      </div>

      {/* Teams */}
      <div className="flex items-center justify-between gap-4 mb-2">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <TeamFollowBtn
            team={match.team1}
            isFollowed={followedTeams.includes(match.team1.name)}
            onToggle={onToggleFollow}
          />
          <span className={`font-semibold truncate ${match.team1.isPlaceholder ? "text-foreground/40" : ""} ${team1Won ? "text-neon-green" : ""}`}>
            {match.team1.name}
          </span>
        </div>

        {hasScore ? (
          <div className="flex items-center gap-2 shrink-0 px-3 py-1 rounded bg-foreground/5">
            <span className={`font-mono font-bold text-lg ${team1Won ? "text-neon-green" : ""}`}>
              {match.score1}
            </span>
            <span className="text-xs text-foreground/30">:</span>
            <span className={`font-mono font-bold text-lg ${team2Won ? "text-neon-green" : ""}`}>
              {match.score2}
            </span>
          </div>
        ) : (
          <span className="text-xs text-foreground/30 font-mono shrink-0">VS</span>
        )}

        <div className="flex items-center gap-2 flex-1 min-w-0 justify-end">
          <span className={`font-semibold truncate ${match.team2.isPlaceholder ? "text-foreground/40" : ""} ${team2Won ? "text-neon-green" : ""}`}>
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
