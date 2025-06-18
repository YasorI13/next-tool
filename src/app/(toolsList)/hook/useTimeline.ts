// components/Timeline/useTimeline.ts
import { useMemo, useState } from "react";
import { TimelineEvent } from "../types/types";

export function useTimeline() {
  const holidayDates = ["2025-01-01", "2025-01-12"];

  // เพิ่ม state สำหรับเดือนและปีที่เลือก
  const today = new Date();
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth()); // 0 = ม.ค.
  const [selectedYear, setSelectedYear] = useState(today.getFullYear());

  const firstDay = useMemo(() => new Date(selectedYear, selectedMonth, 1), [selectedYear, selectedMonth]);
  const lastDay = useMemo(() => new Date(selectedYear, selectedMonth + 1, 0), [selectedYear, selectedMonth]);
  const daysInMonth = lastDay.getDate();

  const days = useMemo(() => {
    return Array.from({ length: daysInMonth }, (_, i) => {
      const date = new Date(firstDay);
      date.setDate(i + 1);
      return date;
    });
  }, [daysInMonth, firstDay]);

  function isHoliday(date: Date) {
    const dateString = date.toISOString().split("T")[0];
    return holidayDates.includes(dateString);
  }

  function getDayBackground(date: Date) {
    const dayOfWeek = date.getDay();
    if (isHoliday(date)) return "bg-yellow-300";
    if (dayOfWeek === 6) return "bg-blue-300";
    if (dayOfWeek === 0) return "bg-orange-300";
    return "bg-green-200";
  }

  function isOverlap(e1: TimelineEvent, e2: TimelineEvent) {
    const e1Start = new Date(e1.start).getTime();
    const e1End = new Date(e1.end).getTime();
    const e2Start = new Date(e2.start).getTime();
    const e2End = new Date(e2.end).getTime();
    return e1Start < e2End && e2Start < e1End;
  }

  function generateTracks(eventsForOneEquipment: TimelineEvent[]) {
    const sortedEvents = [...eventsForOneEquipment].sort(
      (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime()
    );

    const tracks: TimelineEvent[][] = [];

    sortedEvents.forEach((ev) => {
      let placed = false;
      for (const track of tracks) {
        const lastEvent = track[track.length - 1];
        if (!isOverlap(lastEvent, ev)) {
          track.push(ev);
          placed = true;
          break;
        }
      }
      if (!placed) {
        tracks.push([ev]);
      }
    });
    return tracks;
  }

  return {
    firstDay,
    lastDay,
    days,
    daysInMonth,
    getDayBackground,
    generateTracks,
    selectedMonth,
    selectedYear,
    setSelectedMonth,
    setSelectedYear,
  };
}
