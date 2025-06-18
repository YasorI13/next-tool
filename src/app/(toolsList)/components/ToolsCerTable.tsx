"use client";
import React, { useEffect, useState } from "react";
import { fetcher } from "@/services/http-service";
import useSWR from "swr";
import { assetCustomList, SupClass } from "@prisma/client";
import Error from "@/app/error";
import Loading from "@/app/loading";
import {
  ActionIcon,
  Center,
  Flex,
  Group,
  Modal,
  MultiSelect,
  Pagination,
  Paper,
  Radio,
  ScrollAreaAutosize,
  Select,
  Table,
  Text,
} from "@mantine/core";
import { useRouter } from 'next/navigation';

import classes from "./OptioneSelect.module.css";
import { IconEdit } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import ToolsDataEdit from "./ToolsDataEdit";
import { selectItem, ToolsDataEx } from "../types/types";

type Props = {
  CostCtr: string;
};
type GroubList = {
  value: string;
  label: string;
};

function ToolsCerTable({ CostCtr }: Props) {
  const [supClass, setSupClass] = useState<string[]>([]);
  const [groubList, setGroubList] = useState<GroubList[]>();
  const [toolsType, setToolsType] = useState("0");
  const [opened, {  close }] = useDisclosure(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [id, setId] = useState<string>("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [step, setStep] = useState(0);
  const router = useRouter();
  const {
    data: supClassData,
    error: supClassError,
    isLoading: supClassLoading,
  } = useSWR(
    CostCtr ? `emdtools_v1/supClassList?CostCtr=${CostCtr}` : null,
    fetcher
  );

  const queryString = supClass
    .map((s) => `AsstSupNo=${encodeURIComponent(s)}`)
    .join("&");

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const {
    data: toolsData,
    error: toolsError,
    isLoading: toolsLoading,
    mutate: toolsMutate,
  } = useSWR(
    CostCtr
      ? `emdtools_v1/getToolslist?toolsType=${toolsType}&page=${page}&pageSize=${pageSize}&CostCtr=${CostCtr}&${queryString}&hasCert=1`
      : null,
    fetcher
  );

  useEffect(() => {
    if (supClassData) {
      const data = supClassData.map((item: SupClass) => ({
        value: item.AsstSupNo,
        label: item.SupClassName,
      }));
      setGroubList(data);
    }
  }, [supClassData]);

  const {
    data: groupList2Data,
    error: groupList2Error,
    isLoading: groupList2Loading,
  } = useSWR(
    CostCtr ? `emdtools_v1/grouplist?CostCtr=${CostCtr}&hasCert=1` : null,
    fetcher
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [groubList2, setGroubList2] = useState<selectItem[]>();

  useEffect(() => {
    if (groupList2Data) {
      const groub_list = groupList2Data.data.map(
        (element: assetCustomList) => ({
          value: element.assetCustomListId + "",
          label: element.name + "",
        })
      );
      setGroubList2(groub_list);
    }
  }, [groupList2Data]);

  if (supClassError || toolsError || groupList2Error)
    return (
      <div>
        <Error />
      </div>
    );
  if (supClassLoading || toolsLoading || groupList2Loading)
    return (
      <div>
        <Loading />
      </div>
    );

  const ths = (
    <Table.Tr>
      <Table.Th></Table.Th>
      <Table.Th>Cer.Date</Table.Th>
      <Table.Th>Cer.Date</Table.Th>
      <Table.Th>asset</Table.Th>
      <Table.Th>Description</Table.Th>
      <Table.Th>persNo</Table.Th>
      <Table.Th>supClassId</Table.Th>
    </Table.Tr>
  );

  const notrows = (
    <Table.Tr>
      <Table.Td colSpan={7}>
        <Center>
          <Text>ไม่พบข้อมูล</Text>
        </Center>
      </Table.Td>
    </Table.Tr>
  );

  // คำนวณและแสดงแถว
  const rows = toolsData?.data.map((element: ToolsDataEx) => {
    const today = new Date();
    const cerDate = element.CerDate ? new Date(element.CerDate) : null;
    const daysLeft = cerDate
      ? Math.ceil((cerDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
      : null;

    return (
      <Table.Tr key={element.asset}>
        <Table.Td>
          <Center>
            <ActionIcon
              onClick={() => {
                router.push(`/toolsdata/${element.asset}`);
              }}
            >
              <IconEdit />
            </ActionIcon>
          </Center>
        </Table.Td>
        <Table.Td>{cerDate?.toISOString().split("T")[0] || "-"}</Table.Td>
        <Table.Td>{daysLeft !== null ? `${daysLeft} วัน` : "-"}</Table.Td>{" "}
        {/* แสดงจำนวนวัน */}
        <Table.Td>{element.asset}</Table.Td>
        <Table.Td>{element.assetDescription}</Table.Td>
        <Table.Td>
          {element.person?.person_thai_thai_firstname +
            " " +
            element.person?.person_thai_thai_lastname}
        </Table.Td>
        <Table.Td>{element.supClass?.SupClassName}</Table.Td>
      </Table.Tr>
    );
  });

  return (
    <div>
      <Modal
        opened={opened}
        onClose={close}
        size="lg"
        centered
        withCloseButton={false}
      >
        {step === 0 && (
          <ToolsDataEdit
            id={id}
            groupListMutate={toolsMutate}
            close={close}
            CostCtr={CostCtr}
          />
        )}
        {step === 1 && null}
      </Modal>
      <Paper shadow="md" mt={12} p={12}>
        <MultiSelect
          classNames={{ pill: classes.pill }}
          label="เลือกกลุ่มของ ของห้องประชุม"
          placeholder="คลิก เลือก"
          data={groubList}
          hidePickedOptions
          value={supClass}
          onChange={(e) => {
            setSupClass(e);
            toolsMutate();
          }}
          comboboxProps={{
            transitionProps: { transition: "pop", duration: 200 },
          }}
        />
        <Radio.Group
          value={toolsType}
          onChange={setToolsType}
          name="เลือกหมวดหมู่"
          label="เลือกหมวดหมู่"
          withAsterisk
        >
          <Group mt="xs">
            <Radio value="1" label="ครุภัณฑ์" />
            <Radio value="2" label="เครื่องมือเครื่องใช้" />
            <Radio value="0" label="ครุภัณฑ์และเครื่องมือเครื่องใช้" />
          </Group>
        </Radio.Group>
      </Paper>

      <Paper shadow="md" mt={12} p={6}>
        <ScrollAreaAutosize mx="auto">
          <Table highlightOnHover withColumnBorders>
            <Table.Thead>{ths}</Table.Thead>
            <Table.Tbody>{rows || notrows}</Table.Tbody>
          </Table>
        </ScrollAreaAutosize>
      </Paper>

      <Group justify="space-between">
        <Flex
          mih={50}
          gap="xs"
          justify="center"
          align="flex-start"
          direction="row"
          wrap="wrap"
        >
          <Pagination
            mt="lg"
            color="red"
            value={page}
            onChange={setPage}
            total={Math.ceil(toolsData.total / pageSize)}
          />
        </Flex>
        <Group justify="space-between">
          {toolsData.total && <Text>{toolsData.total} รายการ</Text>}
          {toolsData && (
            <Select
              mt={18}
              style={{ width: 75 }}
              data={["10", "15", "20", "30"]}
              onChange={(e) => {
                setPageSize(Number(e));
                toolsMutate();
              }}
              value={String(pageSize)}
            />
          )}
        </Group>
      </Group>
    </div>
  );
}

export default ToolsCerTable;
