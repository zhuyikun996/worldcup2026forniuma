"use client";

interface FollowedTeamsBarProps {
  followedTeams: string[];
  onRemove: (teamName: string) => void;
}

export default function FollowedTeamsBar({ followedTeams, onRemove }: FollowedTeamsBarProps) {
  if (followedTeams.length === 0) return null;

  return (
    <div className="flex items-center gap-2 px-4 py-2 overflow-x-auto">
      <span className="text-xs text-foreground/40 shrink-0">关注:</span>
      {followedTeams.map((team) => (
        <span
          key={team}
          className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs border border-neon-purple/30 bg-neon-purple/10 text-neon-purple shrink-0"
        >
          {team}
          <button
            onClick={() => onRemove(team)}
            className="hover:text-white transition-colors"
          >
            ×
          </button>
        </span>
      ))}
    </div>
  );
}
