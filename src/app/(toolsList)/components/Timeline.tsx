"use client";
// components/Timeline/Timeline.tsx
import React, { useEffect, useState } from "react";
import { useTimeline } from "../hook/useTimeline";
import { TimelineHeader } from "./TimelineHeader";
import { TimelineBody } from "./TimelineBody";
import { TimelineEvent, toolplanEx, ToolsDataEx } from "../types/types";
import { ActionIcon, Flex, Modal, Paper, Switch } from "@mantine/core";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

import { fetcher } from "@/services/http-service";
import useSWR from "swr";
import Error from "@/app/error";
import Loading from "@/app/loading";
import { useDisclosure } from "@mantine/hooks";
import PPLonToolsEdit from "./PPLonToolsEdit";
import { useRouter } from "next/navigation";

type Props = {
  assetCustomListId: string;
};
export function Timeline({ assetCustomListId }: Props) {
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
  const [PPLData, setPPLData] = useState<TimelineEvent[]>([]);
  const [equipment, setEquipment] = useState<ToolsDataEx[]>([]);

  const [opened, { open, close }] = useDisclosure(false);
  const [step, setStep] = useState(0);
  const [id, setId] = useState(0);

  const router = useRouter();

  const {
    data: toolsData,
    error: toolsError,
    isLoading: toolsLoading,
  } = useSWR<ToolsDataEx[]>(
    assetCustomListId
      ? `emdtools_v1/toolsIngrouplist/${assetCustomListId}`
      : null,
    fetcher
  );

  useEffect(() => {
    if (toolsData) {
      setEquipment(toolsData);
    }
  }, [toolsData]);

  const {
    data: ToolsEventData,
    error: ToolsEventError,
    // isLoading: ToolsEventLoading,
    mutate: ToolsEventMutate,
  } = useSWR(
    assetCustomListId
      ? `emdtools_v1/getEvent-GroupToolsInPPLData/${assetCustomListId}?month=${
          selectedMonth + 1
        }&year=${selectedYear}`
      : null,
    fetcher
  );

  useEffect(() => {
    if (ToolsEventData) {
      // console.log("ToolsData:", ToolsEventData);
      const newEvents = ToolsEventData.map((event: toolplanEx) => ({
        equipment: String(event.asset),
        title: event.ppl?.Workname + " " + event.ppl?.pplink?.name,
        start: new Date(event.D01),
        end: new Date(event.D02),
        color: event?.ppl.color,
        id: event.id,
      }));

      setEvents(newEvents);

      const uniqueBySapcode = [
        ...new Map(
          ToolsEventData.map((event: toolplanEx) => [
            event.ppl?.pplink?.SapCode, // ใช้ Sapcode เป็น key
            event, // เก็บ event ไว้ใน value
          ])
        ).values(),
      ] as toolplanEx[];

      if (uniqueBySapcode.length > 0) {
        const PPLData = uniqueBySapcode.map((event: toolplanEx) => ({
          equipment: event.ppl?.pplink?.SapCode,
          title: event.ppl?.Workname + " " + event.ppl?.pplink?.name,
          start: String(event.D01),
          end: String(event.D02),
          color: event?.ppl.color || undefined,
          id: event.ppl?.id || event.id, // ใช้ id จาก ppl หรือ id ของ toolplan
        }));
        setPPLData(PPLData);
      } else {
        setPPLData([]);
      }
    } else {
      setEvents([]);
      setPPLData([]);
    }
  }, [ToolsEventData]);

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

  const pplink = PPLData.map((event) => (
    <span
      key={event.id}
      title={
        String(event.title) +
        " " +
        String(event.start.split("T")[0]) +
        " ถึง " +
        String(event.end.split("T")[0])
      }
      style={{
        backgroundColor: event.color ? event.color : "",
        borderRadius: "5px", // Fix: added space and quotes
        color: "white",
      }}
      onClick={() => {
        router.push(`/ppl-data/${String(event.id)}?month=${firstDay.getMonth() + 1}&year=${firstDay.getFullYear()}`);
      }}
      className="px-2 py-1 rounded-xl  mr-2 mb-2 bg-red-500"
    >
      {event.equipment}
    </span>
  ));

  if (toolsError || ToolsEventError)
    return (
      <div>
        <Error />
      </div>
    );
  if (toolsLoading)
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
          <PPLonToolsEdit
            id={String(id)}
            close={close}
            PPLMutate={ToolsEventMutate}
          />
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
          className="px-2 py-1 border rounded"
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
        {pplink.length > 0 && (
          <Flex
            mih={50}
            gap="md"
            justify="flex-start"
            align="center"
            direction="row"
            wrap="wrap"
          >
            {pplink}
          </Flex>
        )}
      </Flex>

      <div className="overflow-x-auto">
        <div className="min-w-[1200px]">
          <Paper shadow="md" mb={32} p={12}>
            <TimelineHeader days={days} getDayBackground={getDayBackground} />
            <TimelineBody
              firstDay={firstDay}
              lastDay={lastDay}
              days={days}
              daysInMonth={daysInMonth}
              equipment={equipment}
              events={events}
              getDayBackground={getDayBackground}
              generateTracks={generateTracks}
              checked={checked}
              setStep={setStep}
              open={open}
              setId={setId}
            />
          </Paper>
        </div>
      </div>
    </>
  );
}
