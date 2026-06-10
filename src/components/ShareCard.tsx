"use client";

import { useRef, useState } from "react";
import { DaySchedule } from "@/lib/types";
import { stageLabels } from "@/lib/schedule";
import { formatDateLabel } from "@/lib/time-utils";

interface ShareCardProps {
  schedule: DaySchedule;
}

export default function ShareCard({ schedule }: ShareCardProps) {
  const [sharing, setSharing] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleShare = async () => {
    if (!cardRef.current) return;
    setSharing(true);

    try {
      const html2canvas = (await import("html2canvas")).default;
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        backgroundColor: "#0A0A0F",
        useCORS: true,
      });

      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, "image/png")
      );

      if (!blob) return;

      const file = new File([blob], `worldcup2026-${schedule.date}.png`, {
        type: "image/png",
      });

      if (navigator.share && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: `2026世界杯 ${formatDateLabel(schedule.date)} 观赛指南`,
          files: [file],
        });
      } else {
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.download = `worldcup2026-${schedule.date}.png`;
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
      }
    } catch (err) {
      console.error("Share failed:", err);
    } finally {
      setSharing(false);
    }
  };

  return (
    <>
      {/* Share button */}
      <button
        onClick={handleShare}
        disabled={sharing}
        className="fixed bottom-6 right-6 z-40 bg-neon-blue text-background font-bold px-4 py-3 rounded-full shadow-lg hover:scale-105 transition-transform disabled:opacity-50"
      >
        {sharing ? "生成中..." : "📤 分享"}
      </button>

      {/* Hidden card for rendering */}
      <div
        ref={cardRef}
        style={{
          position: "fixed",
          left: "-9999px",
          top: 0,
          width: 540,
          padding: 32,
          background: "#0A0A0F",
          color: "#E8E8F0",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ borderBottom: "2px solid #00D4FF", paddingBottom: 16, marginBottom: 16 }}>
          <div style={{ fontSize: 24, fontWeight: "bold", color: "#00D4FF" }}>
            ⚽ 2026世界杯观赛指南
          </div>
          <div style={{ fontSize: 14, color: "#888", marginTop: 4 }}>
            {formatDateLabel(schedule.date)} · {schedule.matches.length}场比赛
          </div>
        </div>

        {schedule.matches.map((match, i) => (
          <div
            key={match.id}
            style={{
              padding: "12px 0",
              borderBottom: i < schedule.matches.length - 1 ? "1px solid #2A2A3E" : "none",
            }}
          >
            <div style={{ fontSize: 12, color: "#666", marginBottom: 4 }}>
              {stageLabels[match.stage]}{match.group ? ` · ${match.group}组` : ""}
            </div>
            <div style={{ fontSize: 16, fontWeight: "bold", marginBottom: 4 }}>
              {match.team1.name} VS {match.team2.name}
            </div>
            <div style={{ fontSize: 12, color: "#888" }}>
              {match.beijingTime} 北京时间 · {match.viewing.label} · {match.venue}
            </div>
          </div>
        ))}

        <div style={{ marginTop: 16, fontSize: 11, color: "#555", textAlign: "center" }}>
          打工人专属 · worldcup2026
        </div>
      </div>
    </>
  );
}
