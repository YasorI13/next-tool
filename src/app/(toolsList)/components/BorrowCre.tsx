import {
  ActionIcon,
  Box,
  Button,
  Fieldset,
  Flex,
  Grid,
  Group,
  Select,
  Switch,
  Textarea,
  TextInput,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import React, { useEffect, useState } from "react";
import "dayjs/locale/th";

import { fetcher, http } from "@/services/http-service";
import useSWR from "swr";
import { useTimeline } from "../hook/useTimeline";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { pplEx, selectItem } from "../types/types";

import { DateInput } from "@mantine/dates";

import { useSession } from 'next-auth/react';
import { WorkType } from "@prisma/client";
import { useGetWorkType } from "../hook/getWorkType";

type Props = {
  CostCtr: string;
  borrowMutate: () => void;
  close: () => void;
};
function BorrowCre(Props: Props) {
  const [inPlan, setInPlan] = useState(true);
  const [name, setName] = useState("");
  const [note, setNote] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [type, setType] = useState<string | null>("");
  const [workTypeData, setWorkTypeData] = useState<selectItem[]>([]);

  const [pplData, setPplData] = useState<selectItem[]>([]);
  const [ppl, setPpl] = useState<string | null>(null);
  const [D01, setD01] = useState<string | null>(null);
  const [D02, setD02] = useState<string | null>(null);

  const [id_no, setId_no] = useState<string | null>(null);

  const { data: session } = useSession();

  useEffect(() => {
    if (session) {if(session.user.email){setId_no(session.user.email)}}
  }, [session]);

  const { selectedMonth, selectedYear, setSelectedMonth, setSelectedYear } = useTimeline();
  const { workType, workTypeLoading } = useGetWorkType();

  useEffect(() => {
    if (workType) {
      const rows = workType.map((element: WorkType) => ({
        value: String(element.id),
        label: "(" + element.Code + ") " + element.name,
      }));
      setWorkTypeData(rows);
    }
  }, [workType]);

  const { data, isLoading, } = useSWR(
    `emdtools_v1/getPPLData?CostCtr=${Props.CostCtr}&month=${
      selectedMonth + 1
    }&year=${selectedYear}`,
    fetcher
  );

  useEffect(() => {
    if (data) {
      const rows = data.data.map((element: pplEx) => ({
        value: String(element.id),
        label:
          "(" +
          element.TYP +
          ") " +
          element.Workname +
          " " +
          element.pplink.name,
      }));
      setPplData(rows);
    }
  }, [data]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await http.post(
        `/emdtools_v1/getBorrowData?CostCtr=${Props.CostCtr}`,
        {
          inPlan: inPlan,
          name: name,
          note: note,
          location: location,
          type: type,
          ppl: ppl,
          D01: D01,
          D02: D02,
          id_no: id_no,
          CostCtr: Props.CostCtr,
          mmyyyy : `${selectedMonth + 1}-${selectedYear}`,
        }
      );
      if (res.status === 200) {
        Props.borrowMutate();
        Props.close();
        notifications.show({
          title: "ผลการทำงาน",
          message: res.data.message,
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Box maw={500} mx="auto">
        <Fieldset legend="สร้างใบยืมเครื่องมือ" radius="lg" variant="filled">
          <Grid justify="space-between" align="center">
            <Grid.Col span={12}>
              <Switch
                checked={inPlan}
                onChange={(event) => setInPlan(event.currentTarget.checked)}
                withThumbIndicator={false}
                label="งานตาม plan (Buff3)"
              />
            </Grid.Col>
            {inPlan && ( <>
            <Grid.Col span={12}>
              <Flex
                gap="md"
                justify="center"
                align="center"
                direction="row"
                wrap="wrap"
                >
                <ActionIcon
                  variant="default"
                  size="md"
                  radius="md"
                  onClick={handlePreviousMonth}
                  >
                  <IconChevronLeft color="var(--mantine-color-red-text)" />
                </ActionIcon>

                {/* เลือกเดือน */}
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(Number(e.target.value))}
                  className="px-2 py-1 border rounded border-blue-200"
                  style={{ borderColor: "var(--mantine-color-default-border)" }}
                  >
                  {Array.from({ length: 12 }).map((_, i) => (
                    <option value={i} key={i}>
                      {new Date(0, i).toLocaleString("default", {
                        month: "long",
                      })}
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
                  size="md"
                  radius="md"
                  onClick={handleNextMonth}
                  >
                  <IconChevronRight color="var(--mantine-color-red-text)" />
                </ActionIcon>
              </Flex>
            </Grid.Col>

            
              
              <Grid.Col span={12}>
              <Select
                label="เลือกแผนงาน"
                placeholder="เลือกแผนงานจาก buff"
                data={pplData}
                allowDeselect
                disabled={isLoading}
                onChange={async (value) => {
                  setPpl(value);
                  if (data) {
                    const filter = data.data.filter(
                      (item: pplEx) => item.id === Number(value)
                    );
                    if (filter.length > 0) {
                      console.log(filter);
                      setD01(filter[0].D01.toString().slice(0, 10));
                      setD02(filter[0].D02.toString().slice(0, 10));
                      setName(filter[0].Workname);

                    } else {
                      setD01(null);
                      setD02(null);
                    }
                  }
                }}
                value={ppl}
                searchable
                nothingFoundMessage="Nothing found..."
                withAsterisk
                />
            </Grid.Col>
              </>
              )}

            <Grid.Col span={6}>
              <DateInput
                firstDayOfWeek={0}
                value={D01}
                onChange={setD01}
                valueFormat="DD-MM-YYYY" // "YYYY-MM-DD"
                label="วันที่เริ่มต้น"
                placeholder="วันที่เริ่มต้น"
                withAsterisk
                />
            </Grid.Col>

            <Grid.Col span={6}>
              <DateInput
                firstDayOfWeek={0}
                value={D02}
                onChange={setD02}
                valueFormat="DD-MM-YYYY" // "YYYY-MM-DD"
                label="วันที่สิ้นสุด"
                placeholder="วันที่สิ้นสุด"
                withAsterisk
              />
            </Grid.Col>

            <Grid.Col span={12}>
              <TextInput
                value={name}
                onChange={(event) => setName(event.currentTarget.value)}
                label="ชื่องาน"
                placeholder="ชื่องาน"
                withAsterisk
              />
            </Grid.Col>


            {(workType && workTypeData.length > 0)  && (
              <Grid.Col span={6}>
              <Select
                label="เลือกประเภทงาน"
                placeholder="เลือกประเภทงาน"
                data={workTypeData}
                allowDeselect
                disabled={workTypeLoading}
                onChange={async (value) => {
                  setType(value);
                }}
                value={type}
                searchable
                nothingFoundMessage="Nothing found..."
                withAsterisk
                />
            </Grid.Col>
              )}

            {!inPlan && ( <>



            <Grid.Col span={6}>
              <TextInput
                radius="md"
                label="สถานที่"
                withAsterisk
                value={String(location)}
                onChange={(event) => setLocation(event.currentTarget.value)}
                />
            </Grid.Col>

                </>)}
            <Grid.Col span={12}>
              <Textarea
                // mt="sm"
                radius="md"
                label="รายละรายละเอียดเพิ่มเติม"
                placeholder="รายละรายละเอียดเพิ่มเติม"
                autosize
                withAsterisk
                minRows={2}
                value={String(note)}
                onChange={(event) => setNote(event.currentTarget.value)}
              />
            </Grid.Col>
          </Grid>
          <Group mt="md" justify="Center">
            <Button
              type="submit"
              variant="outline"
              color="blue"
              onClick={handleSubmit}
            >
              สร้างเอกสาร
            </Button>
          </Group>
        </Fieldset>
      </Box>
    </>
  );
}

export default BorrowCre;
