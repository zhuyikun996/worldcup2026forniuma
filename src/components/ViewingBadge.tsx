import { ViewingRecommendation } from "@/lib/types";

export default function ViewingBadge({ viewing }: { viewing: ViewingRecommendation }) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium border ${viewing.bgColor} ${viewing.color}`}
    >
      {viewing.label}
    </span>
  );
}
