"use client";
// components/Timeline/Timeline.tsx
import React, { useEffect, useState } from "react";
import { useTimeline } from "../hook/useTimeline";
import { TimelineEvent, toolplanEx } from "../types/types";
import { ActionIcon, Button, Flex, Modal, Paper, Switch } from "@mantine/core";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { fetcher } from "@/services/http-service";
import useSWR from "swr";
import Error from "@/app/error";
import Loading from "@/app/loading";
import { useDisclosure } from "@mantine/hooks";
import { PPLDataTimelineBody } from "./PPLDataTimelineBody";
import { PPLDataTimelineHeader } from "./PPLDataTimelineHeader";
import PPLAddItems from "./PPLAddItems";
import PPLonToolsEdit from "./PPLonToolsEdit";
import { useSearchParams } from "next/navigation";

type Props = {
  CostCtr: string;
  id: string; // Optional if you want to use it later
};
export function PPLDataTimeline({ CostCtr, id }: Props) {
  // ดึงค่า/ฟังก์ชันจาก useTimeline
  const {
    days,
    firstDay,
    lastDay,
    getDayBackground,
    daysInMonth,
    selectedMonth,
    selectedYear,
    setSelectedMonth,
    setSelectedYear,
    generateTracks,
  } = useTimeline();

  // State ใหม่สำหรับ events และ loading/error
  const [events, setEvents] = useState<TimelineEvent[]>([]);
  const [toolsEvent, setToolsEvent] = useState<toolplanEx[]>([]);
  const [opened, { open, close }] = useDisclosure(false);
  const [step, setStep] = useState(0);
  const [toolsid, setToolsId] = useState(0);
  const searchParams = useSearchParams();

  useEffect(() => {
  const month = searchParams.get("month");
  const year = searchParams.get("year");
    if (month && year) {
      setSelectedMonth(Number(month) - 1); // เดือนใน JavaScript เริ่มที่ 0
      setSelectedYear(Number(year));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);


  const {
    data: PPLData,
    error: PPLError,
    isLoading: PPLLoading,
    mutate: PPLMutate,
  } = useSWR(
    CostCtr
      ? `emdtools_v1/getEvent-ToolsInPPLData?&month=${
          selectedMonth + 1
        }&year=${selectedYear}&PPLId=${id}`
      : null,
    fetcher
  );

  // fetch events ใหม่เมื่อเดือนหรือปีเปลี่ยน
  useEffect(() => {
    if (PPLData && PPLData.data && PPLData.data.length > 0) {
      const newEvents = PPLData.data.map((event: toolplanEx) => ({
        equipment: String(event.asset),
        title: event.ToolsData.assetDescription,
        start: new Date(event.D01),
        end: new Date(event.D02),
        color: event.ppl.color,
        id: event.id,
      }));
      setEvents(newEvents);

      // ถ้าอยากได้อันแรก
      const uniqueEvents: toolplanEx[] = [
        ...new Map(
          PPLData.data.map((event: toolplanEx) => [event.asset, event])
        ).values(),
      ] as toolplanEx[];
      // ถ้าอยากได้อันท้ายสุด
      // const uniqueEvents: toolplanEx[] = [
      //   ...new Map([...PPLData.data].reverse().map((event: toolplanEx) => [event.asset, event])).values(),
      // ];

      if (uniqueEvents.length > 0) {
        setToolsEvent(uniqueEvents);
      }
    } else {
      setEvents([]);
      setToolsEvent([]);
    }
  }, [PPLData]);

  useEffect(() => {
    if (toolsEvent.length > 0) {
      // console.log(toolsEvent);
    }
  }, [toolsEvent]);

  const handlePreviousMonth = () => {
    if (selectedMonth === 0) {
      setSelectedMonth(11);
      setSelectedYear(selectedYear - 1);
    } else {
      setSelectedMonth(selectedMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (selectedMonth === 11) {
      setSelectedMonth(0);
      setSelectedYear(selectedYear + 1);
    } else {
      setSelectedMonth(selectedMonth + 1);
    }
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 7 }, (_, i) => currentYear - 4 + i);

  const [checked, setChecked] = useState(false);

  if (PPLError)
    return (
      <div>
        <Error />
      </div>
    );
  if (PPLLoading)
    return (
      <div>
        <Loading />
      </div>
    );

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        centered
        size={ step === 1 ? "100%" : "auto" }
        withCloseButton={false}
      >
        {step === 0 && (
          <PPLonToolsEdit id={String(toolsid)} close={close} PPLMutate={PPLMutate} />
        )}
        {step === 1 && (
          <PPLAddItems
            CostCtr={CostCtr}
            PPLMutate={PPLMutate}
            closeModal={close}
            id={id}
          />
        )}
      </Modal>
      <Flex
        mih={50}
        gap="md"
        justify="flex-start"
        align="center"
        direction="row"
        wrap="wrap"
      >
        <ActionIcon
          variant="default"
          size="lg"
          radius="md"
          onClick={handlePreviousMonth}
        >
          <IconChevronLeft color="var(--mantine-color-red-text)" />
        </ActionIcon>

        {/* เลือกเดือน */}
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(Number(e.target.value))}
          className="px-2 py-1 border rounded "
          style={{ borderColor: "var(--mantine-color-default-border)" }}
        >
          {Array.from({ length: 12 }).map((_, i) => (
            <option value={i} key={i}>
              {new Date(0, i).toLocaleString("default", { month: "long" })}
            </option>
          ))}
        </select>

        {/* เลือกปี */}
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
          className="px-2 py-1 pr-2.5 border rounded"
          style={{ borderColor: "var(--mantine-color-default-border)" }}
        >
          {years.map((year) => (
            <option value={year} key={year}>
              {year}
            </option>
          ))}
        </select>

        {/* ปุ่มเลื่อนขวา */}

        <ActionIcon
          variant="default"
          size="lg"
          radius="md"
          onClick={handleNextMonth}
        >
          <IconChevronRight color="var(--mantine-color-red-text)" />
        </ActionIcon>

        <Switch
          size="md"
          onLabel="ON"
          offLabel="OFF"
          checked={checked}
          onChange={(event) => setChecked(event.currentTarget.checked)}
        />
        <Button
          variant="subtle"
          onClick={() => {
            setStep(1);
            open();
          }}
        >
          เพิ่มเครื่องมือ
        </Button>
      </Flex>

      <div className="overflow-x-auto">
        <div className="min-w-[1200px]">
          <Paper shadow="md" mb={32} p={12}>
            <PPLDataTimelineHeader
              days={days}
              getDayBackground={getDayBackground}
            />
            {PPLData && (
              <PPLDataTimelineBody
                firstDay={firstDay}
                lastDay={lastDay}
                days={days}
                daysInMonth={daysInMonth}
                equipment={toolsEvent}
                events={events}
                getDayBackground={getDayBackground}
                generateTracks={generateTracks}
                checked={checked}
                setStep={setStep}
                open={open}
                setId={setToolsId}
              />
            )}
          </Paper>
        </div>
      </div>
    </>
  );
}
