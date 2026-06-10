"use client";

import { TeamInfo } from "@/lib/types";

interface TeamFollowBtnProps {
  team: TeamInfo;
  isFollowed: boolean;
  onToggle: (teamName: string) => void;
}

export default function TeamFollowBtn({ team, isFollowed, onToggle }: TeamFollowBtnProps) {
  if (team.isPlaceholder) return null;

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onToggle(team.name);
      }}
      className="text-sm hover:scale-110 transition-transform"
      title={isFollowed ? `取消关注 ${team.name}` : `关注 ${team.name}`}
    >
      {isFollowed ? "⭐" : "☆"}
    </button>
  );
}
