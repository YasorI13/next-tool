// components/Timeline/TimelineBody.tsx
import React from "react";
import { pplEx, TimelineEvent } from "../types/types";
import { useRouter } from "next/navigation";
interface TimelineBodyProps {
  firstDay: Date;
  lastDay: Date;
  days: Date[];
  daysInMonth: number;
  equipment: pplEx[];
  events: TimelineEvent[];
  getDayBackground: (date: Date) => string;
  generateTracks: (eventsForOneEquipment: TimelineEvent[]) => TimelineEvent[][];
  checked: boolean;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setId: React.Dispatch<React.SetStateAction<number>>;
  open: () => void;
}

export function PPLTimelineBody({
  days,
  firstDay,
  lastDay,
  equipment,
  events,
  getDayBackground,
  generateTracks,
  checked,
  setStep,
  setId,
  open,
}: TimelineBodyProps) {
  let row = 0;
  const router = useRouter();

  let numberOfEquipment = 1;

  return (
    <>
      {equipment.map((item) => {
        const eventsForThisEquipment = events.filter(
          (e) =>
            e.id === Number(item.id) &&
            ((new Date(e.start) >= firstDay && new Date(e.start) <= lastDay) ||
              (new Date(e.end) >= firstDay && new Date(e.end) <= lastDay) ||
              (firstDay >= new Date(e.start) && firstDay <= new Date(e.end)))
        );
        const tracks = generateTracks(eventsForThisEquipment);

        let OObg = "";
        if (row === 0) {
          OObg = "#fafafa";
          row = 1;
        } else {
          OObg = "#e5e0e0";
          row = 0;
        }

        return (
          <div key={String(item.id)} className="flex items-stretch mb-0.5">
            {/* ด้านซ้าย: ชื่ออุปกรณ์ */}
              <div
                className="flex items-center justify-center px-2 border border-gray-200  border-solid rounded"
                style={{
                  width: "40px",
                  backgroundColor: `${OObg}`,
                }}
              >
                <span
                  title={String(item.pplink.name)}
                  className="font-medium text-sm  truncate w-full whitespace-nowrap overflow-hidden"
                >
                  {numberOfEquipment++}
                </span>
              </div>
              <div
                className="flex items-center justify-center px-2 border border-gray-200  border-solid rounded"
                style={{
                  width: "90px",
                  backgroundColor: `${OObg}`,
                }}
              >
                <span
                  title={String(item.pplink.SapCode)}
                  className="font-medium text-sm  truncate w-full whitespace-nowrap overflow-hidden"
                >
                  {String(item.pplink.SapCode)}
                </span>
              </div>
            <div
              className="flex items-center justify-start px-2 border border-gray-200  border-solid rounded"
              style={{
                width: "300px",
                backgroundColor: `${OObg}`,
              }}
              onClick={() => {
              router.push(`/ppl-data/${String(item.id)}?month=${firstDay.getMonth() + 1}&year=${firstDay.getFullYear()}`);
            }}
            >
              <span
                title={String(item.pplink.name)}
                className="font-medium text-sm  truncate w-full whitespace-nowrap overflow-hidden"
                
              >
                {String(item.pplink.name)}
              </span>
            </div>

            <div
              className="flex items-center justify-center px-2 border border-gray-200  border-solid rounded"
              style={{
                width: "40px",
                backgroundColor: `${OObg}`,
              }}
            >
              <span
                title={String(item.TYP)}
                className="font-medium text-sm  truncate w-full whitespace-nowrap overflow-hidden"
              >
                {String(item.TYP)}
              </span>
            </div>

            {/* ด้านขวา: วาง track ซ้อนกันในแนวตั้ง */}
            <div className="flex-1 flex flex-col">
              {tracks.length === 0 && (
                <div className="relative flex h-8 rounded ">
                  {days.map((date, dayIndex) => {
                    const bg = getDayBackground(date);
                    let Obg = "";
                    if (bg === "bg-green-200") {
                      Obg = OObg;
                    }
                    return (
                      <div
                        key={dayIndex}
                        className={`flex-1 h-full border-l border-gray-200 ${bg} border-solid rounded`}
                        style={{
                          backgroundColor: `${Obg}`,
                          // border: "solid",
                          borderWidth: "1px",
                        }}
                      />
                    );
                  })}
                </div>
              )}

              {tracks.map((track, trackIndex) => (
                <div key={trackIndex} className="relative flex h-8 rounded">
                  {days.map((date, dayIndex) => {
                    const bg = getDayBackground(date);
                    let Obg = "";
                    if (bg === "bg-green-200") {
                      Obg = OObg;
                    }
                    return (
                      <div
                        key={dayIndex}
                        className={`flex-1 h-full border-l border-gray-200 ${bg} border-solid rounded`}
                        style={{
                          backgroundColor: `${Obg}`,
                          // border: "solid",
                          borderWidth: "1px",
                        }}
                      />
                    );
                  })}

                  {/* วาง Event Bars ของ track นี้ */}

                  {checked &&
                    track.map((ev, i) => {
                      const startDate = new Date(ev.start);
                      const endDate = new Date(ev.end);

                      const startDay = startDate.getDate();
                      const endDay = endDate.getDate();

                      const clampedStart =
                        startDate < firstDay ? firstDay : startDate;
                      const clampedEnd = endDate > lastDay ? lastDay : endDate;

                      const startIndex = days.findIndex(
                        (d) => d.toDateString() === clampedStart.toDateString()
                      );
                      const endIndex = days.findIndex(
                        (d) => d.toDateString() === clampedEnd.toDateString()
                      );

                      // fallback ถ้าไม่เจอ (เผื่อกรณีแปลก)
                      const safeStartIndex = startIndex === -1 ? 0 : startIndex;
                      const safeEndIndex =
                        endIndex === -1 ? days.length - 1 : endIndex;

                      const numDaysShown = safeEndIndex - safeStartIndex + 1;

                      const startPercent = (safeStartIndex / days.length) * 100;
                      const widthPercent = (numDaysShown / days.length) * 100;

                      return (
                        <div
                          key={i}
                          className="absolute h-full bg-red-500 rounded flex items-center justify-center text-white text-sm"
                          style={{
                            left: `${startPercent}%`,
                            width: `${widthPercent}%`,
                            backgroundColor: `${ev.color}`,
                          }}
                        >
                          <span
                            className="truncate px-1"
                            onClick={() => {
                              setId(ev.id);
                              setStep(0);
                              open();
                            }}
                          >
                            {ev.title} ({startDay}-{endDay})
                          </span>
                        </div>
                      );
                    })}

                  {!checked &&
                    track.map((ev, i) => {
                      const eventStart = new Date(ev.start);

                      const eventEnd = new Date(ev.end);

                      const clampedStart =
                        eventStart < firstDay ? firstDay : eventStart;
                      const clampedEnd =
                        eventEnd > lastDay ? lastDay : eventEnd;

                      const startIndex = days.findIndex(
                        (d) => d.toDateString() === clampedStart.toDateString()
                      );
                      const endIndex = days.findIndex(
                        (d) => d.toDateString() === clampedEnd.toDateString()
                      );

                      const safeStartIndex = startIndex === -1 ? 0 : startIndex;
                      const safeEndIndex =
                        endIndex === -1 ? days.length - 1 : endIndex;

                      // eslint-disable-next-line @typescript-eslint/no-unused-vars
                      const totalDays =
                        Math.ceil(
                          (eventEnd.getTime() - eventStart.getTime()) /
                            (1000 * 60 * 60 * 24)
                        ) + 1;

                      // eslint-disable-next-line @typescript-eslint/no-unused-vars
                      const firstVisibleIndex = days.findIndex(
                        (d) => d.toDateString() === clampedStart.toDateString()
                      );

                      return (
                        <React.Fragment key={i}>
                          {Array.from(
                            { length: safeEndIndex - safeStartIndex + 1 },
                            (_, offset) => {
                              const currentIndex = safeStartIndex + offset;
                              const leftPercent =
                                (currentIndex / days.length) * 100;
                              const widthPercent = (1 / days.length) * 100;

                              // คำนวณลำดับวันที่ตามจริง (นับตั้งแต่วันเริ่มของ event)
                              const currentDate = days[currentIndex];
                              const dayNumber =
                                Math.ceil(
                                  (currentDate.getTime() -
                                    eventStart.getTime()) /
                                    (1000 * 60 * 60 * 24)
                                ) + 1;

                              return (
                                <div
                                  key={offset}
                                  className="absolute h-full bg-red-500 text-white text-xs flex items-center justify-center border border-white border-solid rounded "
                                  style={{
                                    left: `${leftPercent}%`,
                                    width: `${widthPercent}%`,
                                    backgroundColor: `${ev.color}`,
                                  }}
                                  onClick={() => {
                                    setId(ev.id);
                                    setStep(0);
                                    open();
                                  }}
                                >
                                  {dayNumber}
                                </div>
                              );
                            }
                          )}
                        </React.Fragment>
                      );
                    })}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </>
  );
}
