"use client";
// components/Timeline/Timeline.tsx
import React, { useEffect, useState } from "react";
import { useTimeline } from "../hook/useTimeline";
import { pplEx, TimelineEvent } from "../types/types";
import { ActionIcon, Button, Flex, Modal, Paper, Switch } from "@mantine/core";
import {
  IconChevronLeft,
  IconChevronRight,
  IconDownload,
} from "@tabler/icons-react";
import { PPLTimelineHeader } from "./PPLTimelineHeader";
import { PPLTimelineBody } from "./PPLTimelineBody";
import { fetcher, http } from "@/services/http-service";
import useSWR from "swr";
import Error from "@/app/error";
import Loading from "@/app/loading";
import { useDisclosure } from "@mantine/hooks";
import PPLEdit from "./PPLEdit";

type Props = {
  CostCtr: string;
};
export function PPLTimeline({ CostCtr }: Props) {
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
  const [ppl, setPpl] = useState<pplEx[]>([]);
  const [opened, { open, close }] = useDisclosure(false);
  const [step, setStep] = useState(0);
  const [id, setId] = useState(0);

  const {
    data: PPLData,
    error: PPLError,
    isLoading: PPLLoading,
    mutate: PPLMutate,
  } = useSWR(
    CostCtr
      ? `emdtools_v1/getEvent-PPL?CostCtr=${CostCtr}&month=${
          selectedMonth + 1
        }&year=${selectedYear}`
      : null,
    fetcher
  );

  // fetch events ใหม่เมื่อเดือนหรือปีเปลี่ยน
  useEffect(() => {
    if (PPLData) {
      // console.log(PPLData.data);
      const newEvents = PPLData.data.map((event: pplEx) => ({
        equipment: String(event.pplink.SapCode),
        title: event.Workname,
        start: new Date(event.D01),
        end: new Date(event.D02),
        color: event?.color,
        id: event.id,
      }));
      setEvents(newEvents);

      // ใช้ Set เพื่อเก็บค่า SapCode ที่ไม่ซ้ํา
      // const uniqueEvents: pplEx[] = [
      //   ...new Map(
      //     PPLData.data.map((event: pplEx) => [event.pplink.SapCode, event])
      //   ).values(),
      // ].map((event) => event as pplEx);
      // if (uniqueEvents.length > 0) {
      //   setPpl(uniqueEvents);
      // }
      // console.log(uniqueEvents);
      // console.log(PPLData.data);
      setPpl(PPLData.data as pplEx[]);
    } else {
      setEvents([]);
      setPpl([]);
    }
  }, [PPLData]);

  useEffect(() => {
    if(ppl.length > 0) {
      console.log(ppl);
    }
  }, [ppl]);

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

  const syncbuff3 = async () => {
    const res = await http.get(`/it-emd-sync/ppl`);
    if (res.status === 200) {
      PPLMutate();
    }
  };

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
        size="lg"
        centered
        withCloseButton={false}
      >
        {step === 0 && (
          <PPLEdit id={String(id)} close={close} PPLMutate={PPLMutate} />
        )}
        {step === 1 && null}
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
          rightSection={<IconDownload size={14} />}
          onClick={() => {
            syncbuff3();
          }}
        >
          Sync
        </Button>
      </Flex>

      <div className="overflow-x-auto">
        <div className="min-w-[1200px]">
          <Paper shadow="md" mb={32} p={12}>
            <PPLTimelineHeader
              days={days}
              getDayBackground={getDayBackground}
            />
            {PPLData && (
              <PPLTimelineBody
                firstDay={firstDay}
                lastDay={lastDay}
                days={days}
                daysInMonth={daysInMonth}
                equipment={Object.values(ppl)}
                events={events}
                getDayBackground={getDayBackground}
                generateTracks={generateTracks}
                checked={checked}
                setStep={setStep}
                open={open}
                setId={setId}
              />
            )}
          </Paper>
        </div>
      </div>
    </>
  );
}
