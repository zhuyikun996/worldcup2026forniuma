"use client";

import { useEffect, useRef } from "react";
import { DaySchedule } from "@/lib/types";
import { formatDateLabel, getTodayBeijing } from "@/lib/time-utils";

interface CalendarStripProps {
  schedules: DaySchedule[];
  selectedDate: string;
  onSelectDate: (date: string) => void;
}

export default function CalendarStrip({ schedules, selectedDate, onSelectDate }: CalendarStripProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const today = getTodayBeijing();

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const selected = el.querySelector(`[data-date="${selectedDate}"]`);
    if (selected) {
      selected.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
  }, [selectedDate]);

  return (
    <div
      ref={scrollRef}
      className="calendar-scroll flex gap-2 overflow-x-auto px-4 py-3 -mx-0"
    >
      {schedules.map((s) => {
        const isToday = s.date === today;
        const isSelected = s.date === selectedDate;

        return (
          <button
            key={s.date}
            data-date={s.date}
            onClick={() => onSelectDate(s.date)}
            className={`shrink-0 flex flex-col items-center px-3 py-2 rounded-lg border transition-all min-w-[60px] ${
              isSelected
                ? "border-neon-blue bg-neon-blue/10 glow-blue"
                : isToday
                ? "border-neon-green/50 bg-neon-green/10"
                : "border-border bg-card hover:bg-card-hover"
            }`}
          >
            <span className={`text-xs ${isSelected ? "text-neon-blue font-bold" : isToday ? "text-neon-green" : "text-foreground/50"}`}>
              {s.weekday}
            </span>
            <span className={`text-lg font-bold ${isSelected ? "text-neon-blue" : isToday ? "text-neon-green" : ""}`}>
              {parseInt(s.date.split("-")[2])}
            </span>
            <span className="text-[10px] text-foreground/30">
              {s.matches.length}场
            </span>
          </button>
        );
      })}
    </div>
  );
}
