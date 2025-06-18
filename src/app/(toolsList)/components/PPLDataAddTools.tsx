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
  id: string; 
  borrowMutate: () => void;
  close: () => void;
};
function PPLDataAddTools(Props: Props) {
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
    }&year=${selectedYear}&SapCode=${Props.SapCode}`,
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

  

  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await http.post(
        `/emdtools_v1/getBorrowData?CostCtr=${Props.CostCtr}`,

      );
      if (res.status === 200) {
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

export default PPLDataAddTools;
