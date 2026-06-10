import { ViewingRecommendation, ViewingSlot } from "./types";

export function toBeijingDate(utcDateStr: string): Date {
  const utcDate = new Date(utcDateStr);
  // Convert to Beijing time string and parse back
  const bjStr = utcDate.toLocaleString("sv-SE", { timeZone: "Asia/Shanghai" });
  const timeStr = utcDate.toLocaleString("zh-CN", {
    timeZone: "Asia/Shanghai",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  return new Date(`${bjStr.replace(",", "")}`);
}

export function getBeijingDateStr(utcDateStr: string): string {
  const utcDate = new Date(utcDateStr);
  return utcDate.toLocaleDateString("sv-SE", { timeZone: "Asia/Shanghai" });
}

export function getBeijingTimeStr(utcDateStr: string): string {
  const utcDate = new Date(utcDateStr);
  return utcDate.toLocaleString("zh-CN", {
    timeZone: "Asia/Shanghai",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

export function getBeijingHour(utcDateStr: string): number {
  const utcDate = new Date(utcDateStr);
  const hourStr = utcDate.toLocaleString("en-US", {
    timeZone: "Asia/Shanghai",
    hour: "numeric",
    hour12: false,
  });
  return parseInt(hourStr, 10);
}

export function getViewingSlot(beijingHour: number): ViewingRecommendation {
  if (beijingHour >= 18 || beijingHour === 0) {
    // 18:00-23:59 and 0:00 -> treat as prime time extension
    if (beijingHour === 0) {
      // midnight could be either prime extension or nightowl
      // Let's treat 0:00 as nightowl since it's past 23:00
      return {
        slot: "nightowl",
        label: "熬夜档",
        color: "text-orange-400",
        bgColor: "bg-orange-400/20 border-orange-400/30",
        description: "值得熬夜的好球",
      };
    }
    return {
      slot: "prime",
      label: "黄金时段",
      color: "text-green-400",
      bgColor: "bg-green-400/20 border-green-400/30",
      description: "下班看球，人生赢家",
    };
  }
  if (beijingHour >= 23) {
    return {
      slot: "nightowl",
      label: "熬夜档",
      color: "text-orange-400",
      bgColor: "bg-orange-400/20 border-orange-400/30",
      description: "值得熬夜的好球",
    };
  }
  if (beijingHour >= 1) {
    return {
      slot: "deepnight",
      label: "凌晨档",
      color: "text-red-400",
      bgColor: "bg-red-400/20 border-red-400/30",
      description: "铁粉专属，请备好咖啡",
    };
  }
  // beijingHour === 0 handled above
  if (beijingHour >= 7) {
    return {
      slot: "morning",
      label: "早间档",
      color: "text-yellow-400",
      bgColor: "bg-yellow-400/20 border-yellow-400/30",
      description: "起床看一眼比分",
    };
  }
  // beijingHour 1-6 is deepnight (handled above with >= 1)
  // This shouldn't be reached, but just in case
  return {
    slot: "deepnight",
    label: "凌晨档",
    color: "text-red-400",
    bgColor: "bg-red-400/20 border-red-400/30",
    description: "铁粉专属，请备好咖啡",
  };
}

// More precise version that considers hour + minute
export function getViewingRecommendation(utcDateStr: string): ViewingRecommendation {
  const hour = getBeijingHour(utcDateStr);

  if (hour >= 18 && hour < 23) {
    return {
      slot: "prime",
      label: "黄金时段",
      color: "text-green-400",
      bgColor: "bg-green-400/20 border-green-400/30",
      description: "下班看球，人生赢家",
    };
  }
  if ((hour >= 23) || hour === 0) {
    return {
      slot: "nightowl",
      label: "熬夜档",
      color: "text-orange-400",
      bgColor: "bg-orange-400/20 border-orange-400/30",
      description: "值得熬夜的好球",
    };
  }
  if (hour >= 1 && hour < 7) {
    return {
      slot: "deepnight",
      label: "凌晨档",
      color: "text-red-400",
      bgColor: "bg-red-400/20 border-red-400/30",
      description: "铁粉专属，请备好咖啡",
    };
  }
  if (hour >= 7 && hour < 9) {
    return {
      slot: "morning",
      label: "早间档",
      color: "text-yellow-400",
      bgColor: "bg-yellow-400/20 border-yellow-400/30",
      description: "起床看一眼比分",
    };
  }
  if ((hour >= 9 && hour < 12) || (hour >= 14 && hour < 18)) {
    return {
      slot: "work",
      label: "打工档",
      color: "text-red-400",
      bgColor: "bg-red-400/20 border-red-400/30",
      description: "上班中，只能偷偷刷比分",
    };
  }
  // 12-14
  return {
    slot: "lunch",
    label: "午休档",
    color: "text-yellow-400",
    bgColor: "bg-yellow-400/20 border-yellow-400/30",
    description: "午休时间，边吃边看",
  };
}

export function getWeekday(dateStr: string): string {
  const weekdays = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
  const date = new Date(dateStr);
  return weekdays[date.getDay()];
}

export function formatDateLabel(dateStr: string): string {
  const [year, month, day] = dateStr.split("-");
  const weekday = getWeekday(dateStr);
  return `${parseInt(month)}月${parseInt(day)}日 ${weekday}`;
}

export function getTodayBeijing(): string {
  return new Date().toLocaleDateString("sv-SE", { timeZone: "Asia/Shanghai" });
}
