// components/Timeline/TimelineHeader.tsx
import React from "react";

interface TimelineHeaderProps {
  days: Date[];
  getDayBackground: (date: Date) => string;
}

export function TimelineHeader({
  days,
  getDayBackground,
}: TimelineHeaderProps) {
  return (
    <div className="flex border-b border-gray-200 mb-0">
      {/* ช่องซ้ายเว้นว่างสำหรับชื่ออุปกรณ์ */}
      <div
          className="flex flex-shrink-0 items-center justify-center border border-gray-200  border-solid rounded"
          style={{
            width: "40px",
          }}
        >
          <span
            title="ลำดับโรงไฟฟ้า"
            className="font-medium text-sm  truncate w-full whitespace-nowrap overflow-hidden"
          >
            No.
          </span>
        </div>
        <div
          className="flex flex-shrink-0 items-center justify-center border border-gray-200  border-solid rounded"
          style={{
            width: "120px",
          }}
        >
          <span
            title="รหัสโรงไฟฟ้า"
            className="font-medium text-sm  truncate w-full whitespace-nowrap overflow-hidden"
          >
            รหัสเครื่องมือ
          </span>
        </div>
        <div
          className="flex flex-shrink-0 items-center justify-center border border-gray-200  border-solid rounded"
          style={{
            width: "200px",
          }}
        >
          <span
            title="รหัสโรงไฟฟ้า"
            className="font-medium text-sm  truncate w-full whitespace-nowrap overflow-hidden"
          >
            ชื่อเครื่องมือ
          </span>
        </div>

      {/* วันที่ */}
      <div className="flex-1 flex">
        {days.map((date, index) => {
          const bg = getDayBackground(date);
          let Obg = "";
          if (bg === "bg-green-200") {
            Obg = "#e5e0e0";
          }
          return (
            <div
              key={index}
              className={`flex-1 text-xs text-gray-600 text-center  py-2 ${bg} border border-gray-200  border-solid rounded`}
              style={{
                backgroundColor: `${Obg}`,
              }}
            >
              <div className="font-medium">
                {date.toLocaleDateString("th-TH", { weekday: "short" })}
              </div>
              <div>{date.getDate()}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
