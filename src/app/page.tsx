"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import CalendarStrip from "@/components/CalendarStrip";
import DayGuide from "@/components/DayGuide";
import FollowedTeamsBar from "@/components/FollowedTeamsBar";
import ShareCard from "@/components/ShareCard";
import { getDaySchedules } from "@/lib/schedule-utils";
import { getTodayBeijing } from "@/lib/time-utils";
import { getPreferences, toggleFollowTeam, savePreferences } from "@/lib/storage";
import { DaySchedule } from "@/lib/types";

export default function Home() {
  const [schedules, setSchedules] = useState<DaySchedule[]>([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [followedTeams, setFollowedTeams] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const allSchedules = getDaySchedules();
    setSchedules(allSchedules);

    const today = getTodayBeijing();
    const hasTodayMatch = allSchedules.find((s) => s.date === today);
    if (hasTodayMatch) {
      setSelectedDate(today);
    } else {
      const future = allSchedules.find((s) => s.date >= today);
      setSelectedDate(future ? future.date : allSchedules[0]?.date || "");
    }

    const prefs = getPreferences();
    setFollowedTeams(prefs.followedTeams);
    setMounted(true);
  }, []);

  const handleToggleFollow = (teamName: string) => {
    const prefs = toggleFollowTeam(teamName);
    setFollowedTeams([...prefs.followedTeams]);
  };

  const handleRemoveFollow = (teamName: string) => {
    const prefs = getPreferences();
    prefs.followedTeams = prefs.followedTeams.filter((t) => t !== teamName);
    savePreferences(prefs);
    setFollowedTeams([...prefs.followedTeams]);
  };

  if (!mounted) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-neon-blue text-lg">⚽ 加载中...</div>
      </main>
    );
  }

  const currentSchedule = schedules.find((s) => s.date === selectedDate);

  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      {/* Calendar */}
      <div className="border-b border-border">
        <CalendarStrip
          schedules={schedules}
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
        />
      </div>

      {/* Followed teams */}
      <FollowedTeamsBar
        followedTeams={followedTeams}
        onRemove={handleRemoveFollow}
      />

      {/* Day guide */}
      <div className="flex-1 max-w-2xl mx-auto w-full px-4 py-4 pb-24">
        {currentSchedule ? (
          <>
            <DayGuide
              schedule={currentSchedule}
              followedTeams={followedTeams}
              onToggleFollow={handleToggleFollow}
            />
            <ShareCard schedule={currentSchedule} />
          </>
        ) : (
          <div className="text-center py-20">
            <div className="text-4xl mb-4">⚽</div>
            <p className="text-foreground/50">这一天没有比赛</p>
            <p className="text-sm text-foreground/30 mt-2">
              2026世界杯赛程：6月12日 - 7月20日（北京时间）
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
