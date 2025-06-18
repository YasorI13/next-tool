"use client";
import React, { useEffect, useState } from "react";
import { fetcher } from "@/services/http-service";
import useSWR from "swr";
import { BorrowFormEx, selectItem } from "../types/types";
import Loading from "@/app/loading";
import { WorkType } from "@prisma/client";
import { useGetWorkType } from "../hook/getWorkType";
import {
  Blockquote,
  Box,
  Fieldset,
  Grid,
  GridCol,
  Group,
  Modal,
  Select,
  Switch,
  Textarea,
  TextInput,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { IconInfoCircle } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import BorrowStatus from "./BorrowStatus";

type Props = {
  id: string;
  handleDataUpdated: () => void;
};
function BorrowData({ id,handleDataUpdated }: Props) {
  const [inPlan, setInPlan] = useState(true);
  const [name, setName] = useState("");
  const [note, setNote] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [type, setType] = useState<string | null>("");
  const [workTypeData, setWorkTypeData] = useState<selectItem[]>([]);
  const [ppl, setPpl] = useState<string>("");
  const [D01, setD01] = useState<string | null>(null);
  const [D02, setD02] = useState<string | null>(null);
  const { workType, workTypeLoading } = useGetWorkType();
  const [opened, { open, close }] = useDisclosure(false);
  const [step, setStep] = useState(0);
  const icon = <IconInfoCircle />;

  useEffect(() => {
    if (workType) {
      const rows = workType.map((element: WorkType) => ({
        value: String(element.id),
        label: "(" + element.Code + ") " + element.name,
      }));
      setWorkTypeData(rows);
    }
  }, [workType]);

  const { data: borrowFormData, isLoading: borrowFormLoading ,mutate } =
    useSWR<BorrowFormEx>(`emdtools_v1/getBorrowData/${id}`, fetcher);

  useEffect(() => {
    if (borrowFormData) {
      if (borrowFormData) {
        setInPlan(borrowFormData.inPlan);
        setName(String(borrowFormData.name));
        setNote(String(borrowFormData.note));
        setLocation(String(borrowFormData.location));
        setType(String(borrowFormData.workTypeId));
        if (borrowFormData.ppl) {
          setPpl(
            String(
              borrowFormData.ppl.Workname + " " + borrowFormData.ppl.pplink.name
            )
          );
        }
        if (borrowFormData.D01 && borrowFormData.D02) {
          setD01(new Date(borrowFormData.D01).toISOString().split("T")[0]);
          setD02(new Date(borrowFormData.D02).toISOString().split("T")[0]);
        }
      }
    }
  }, [borrowFormData]);

  if (borrowFormLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        centered
        size={"auto"}
        withCloseButton={false}
      >
        {step === 0 && 
        <BorrowStatus  borrowFormData={borrowFormData} handleDataUpdated={handleDataUpdated} close={close} mutate={mutate}/>}
        
      </Modal>
      <Box w="100%" mx="auto">
        <Fieldset
          legend="ใบยืมเครื่องมือ"
          radius="lg"
          variant="filled"
          bg={"white"}
        >
          <Grid>
            <GridCol
              span={{
                sm: 12,
                md: 12,
              }}
            >
              <Group justify="space-between">
                <Switch
                  checked={inPlan}
                  onChange={() => {}}
                  withThumbIndicator={false}
                  label="งานตาม plan (Buff3)"
                />
                {/* <Button variant="default">{borrowFormData?.FormStatus.name}</Button> */}
                <Blockquote color="blue" icon={icon} pt={4} pb={4} mt={12}
                  onClick={ () => {open();setStep(0);}}
                >
                  สถานะ : {borrowFormData?.FormStatus.name}
                </Blockquote>
              </Group>
            </GridCol>

            {inPlan && (
              <>
                <GridCol
                  span={{
                    sm: 12,
                    md: 6,
                  }}
                >
                  <Textarea
                    label="แผนงาน"
                    placeholder="แผนงานจาก buff"
                    value={ppl}
                    onChange={() => {}}
                    withAsterisk
                  />
                </GridCol>
              </>
            )}

            <GridCol
              span={{
                sm: 6,
                md: 2,
              }}
            >
              <DateInput
                firstDayOfWeek={0}
                value={D01}
                onChange={setD01}
                valueFormat="DD-MM-YYYY" // "YYYY-MM-DD"
                label="วันที่เริ่มต้น"
                placeholder="วันที่เริ่มต้น"
                withAsterisk
              />
            </GridCol>

            <GridCol
              span={{
                sm: 6,
                md: 2,
              }}
            >
              <DateInput
                firstDayOfWeek={0}
                value={D02}
                onChange={setD02}
                valueFormat="DD-MM-YYYY" // "YYYY-MM-DD"
                label="วันที่สิ้นสุด"
                placeholder="วันที่สิ้นสุด"
                withAsterisk
              />
            </GridCol>

            {workType && workTypeData.length > 0 && (
              <GridCol
                span={{
                  sm: 6,
                  md: 2,
                }}
              >
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
              </GridCol>
            )}

            <GridCol
              span={{
                sm: 6,
                md: 6,
              }}
            >
              <TextInput
                value={name}
                onChange={(event) => setName(event.currentTarget.value)}
                label="ชื่องาน"
                placeholder="ชื่องาน"
                withAsterisk
              />
            </GridCol>

            {!inPlan && (
              <>
                <GridCol
                  span={{
                    sm: 6,
                    md: 6,
                  }}
                >
                  <TextInput
                    radius="md"
                    label="สถานที่"
                    withAsterisk
                    value={String(location)}
                    onChange={(event) => setLocation(event.currentTarget.value)}
                  />
                </GridCol>
              </>
            )}

            <GridCol
              span={{
                sm: 6,
                md: 6,
              }}
            >
              <Textarea
                // mt="sm"
                radius="md"
                label="รายละรายละเอียดเพิ่มเติม"
                placeholder="รายละรายละเอียดเพิ่มเติม"
                autosize
                withAsterisk
                minRows={1}
                value={String(note)}
                onChange={(event) => setNote(event.currentTarget.value)}
              />
            </GridCol>
          </Grid>
        </Fieldset>
      </Box>
    </>
  );
}

export default BorrowData;
