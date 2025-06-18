"use client";
import {
  ActionIcon,
  Button,
  Center,
  Chip,
  Flex,
  Group,
  Modal,
  Pagination,
  Paper,
  Select,
  Table,
  Text,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import { fetcher, http } from "@/services/http-service";
import useSWR from "swr";
import Error from "@/app/error";
import Loading from "@/app/loading";
import { useDisclosure } from "@mantine/hooks";
import { IconEdit, IconTrash, IconZoom } from "@tabler/icons-react";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";
import BorrowCre from "./BorrowCre";
import { BorrowFormEx, selectItem } from "../types/types";
import BorrowEdit from "./BorrowEdit";
import { BorrowFormStatus } from "@prisma/client";

// import { useRouter } from 'next/router';

type Props = {
  CostCtr: string;
};

function BorrowTable({ CostCtr }: Props) {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [opened, { open, close }] = useDisclosure(false);
  const [step, setStep] = useState(0);
  const [id, setId] = useState("");
  const [borrowStatusId, setBorrowStatusId] = useState<string | null>("");
  const [borrowStatusList, setBorrowStatusList] = useState<selectItem[]>();

  const [show, setShow] = useState(false);

  const {
    data: borrowStatusData,
    error: borrowStatusError,
    // isLoading: borrowStatusLoading,
  } = useSWR(CostCtr ? `emdtools_v1/getBorrowFormStatus` : null, fetcher);

  const {
    data: borrowData,
    error: borrowError,
    // isLoading: borrowLoading,
    mutate: borrowMutate,
  } = useSWR(
    CostCtr
      ? `emdtools_v1/getBorrowData?CostCtr=${CostCtr}&borrowStatusId=${borrowStatusId}`
      : null,
    fetcher
  );

  useEffect(() => {
    if (borrowStatusData) {
      const borrowStatusList = borrowStatusData.map(
        (item: BorrowFormStatus) => ({
          value: item.id + "",
          label: item.name + "",
        })
      );
      setBorrowStatusList(borrowStatusList);
    }
  }, [borrowStatusData]);

  useEffect(() => {
    if (borrowData) {
      console.log(borrowData);
      setShow(true);
    }
  }, [borrowData]);

  if (borrowError || borrowStatusError)
    return (
      <div>
        <Error />
      </div>
    );
  if (!show)
    return (
      <div>
        <Loading />
      </div>
    );

  const removeModel = (id: number) =>
    modals.openConfirmModal({
      title: "แน่ใจนะว่าต้องการลบข้อมูลนี้",
      labels: { confirm: "ตกลง", cancel: "ยกเลิก" },
      closeOnConfirm: true,
      onConfirm: async () => {
        const response = await http.delete("/emdtools_v1/getBorrowData/" + id);
        if (response.status === 200) {
          borrowMutate();
          notifications.show({
            title: "ผลการทำงาน",
            message: response.data.message,
            autoClose: 2000,
          });
        }
      },
    });

  const ths = (
    <Table.Tr>
      <Table.Th>สถานะ</Table.Th>
      <Table.Th>ประเภทงาน</Table.Th>
      <Table.Th>วันที่เริ่ม</Table.Th>
      <Table.Th>วันที่สิ้น</Table.Th>
      <Table.Th>ผู้สร้างเอกสาร</Table.Th>
      <Table.Th>ชื่องาน</Table.Th>
      <Table.Th>location</Table.Th>
      <Table.Th>เวลาที่สร้างเอกสาร</Table.Th>
      <Table.Th>เวลาที่สร้างเอกสาร</Table.Th>
      <Table.Th></Table.Th>
    </Table.Tr>
  );

  const rows = borrowData?.data.map((element: BorrowFormEx) => (
    <Table.Tr key={element.id}>
      <Table.Td>
        <Chip defaultChecked color={element.FormStatus.color ? element.FormStatus.color : "green" }>{element.FormStatus.name}</Chip>
      </Table.Td>
      <Table.Td>{element.WorkType.Code}</Table.Td>
      <Table.Td>{new Date(element.D01).toISOString().split("T")[0]}</Table.Td>
      <Table.Td>{new Date(element.D02).toISOString().split("T")[0]}</Table.Td>
      <Table.Td>
        {element.person.person_thai_thai_firstname +
          " " +
          element.person.person_thai_thai_lastname}
      </Table.Td>
      <Table.Td>{element.name}</Table.Td>
      <Table.Td>
        {element.inPlan ? element.ppl.pplink.name : element.location}
      </Table.Td>
      <Table.Td>{new Date(element.CreateDate).toLocaleString()}</Table.Td>
      <Table.Td>
        <Center>
          <ActionIcon
            color="green"
            onClick={() => {
              router.push(`/BorrowDetail/${element.id}`);
            }}
          >
            <IconZoom />
          </ActionIcon>

          <ActionIcon
            ml="sm"
            color="blue"
            onClick={() => {
              setStep(1);
              setId(String(element.id));
              open();
            }}
          >
            <IconEdit />
          </ActionIcon>

          <ActionIcon
            color="red"
            ml="sm"
            onClick={() => {
              removeModel(element.id);
            }}
          >
            <IconTrash />
          </ActionIcon>
        </Center>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <div>
      <Modal
        opened={opened}
        onClose={close}
        size="auto"
        withCloseButton={false}
      >
        {step === 0 && (
          <BorrowCre
            borrowMutate={borrowMutate}
            close={close}
            CostCtr={CostCtr}
          />
        )}
        {step === 1 && (
          <BorrowEdit
            id={id}
            borrowMutate={borrowMutate}
            close={close}
            CostCtr={CostCtr}
          />
        )}
      </Modal>

      <Group justify="space-between" mt={"md"}>
        <Flex
          gap="xs"
          justify="center"
          align="flex-start"
          direction="row"
          wrap="wrap"
        >
          <Pagination
            color="red"
            value={page}
            onChange={setPage}
            total={Math.ceil(borrowData?.total / pageSize)}
          />
          {borrowData && (
            <Select
              style={{ width: 75 }}
              data={["10", "15", "20", "30"]}
              onChange={(e) => {
                setPageSize(Number(e));
                borrowMutate();
              }}
              value={String(pageSize)}
            />
          )}
        </Flex>

        {borrowStatusList && (
          <>
            <Flex
              gap="xs"
              justify="center"
              align="flex-start"
              direction="row"
              wrap="wrap"
            >
              <Select
                placeholder="คลิก เลือก"
                data={borrowStatusList}
                value={borrowStatusId}
                onChange={(e) => {
                  setBorrowStatusId(e);
                }}
              />
            </Flex>
          </>
        )}
        <Group justify="space-between">
          {borrowData?.total && <Text>{borrowData?.total} รายการ</Text>}
          <Button
            onClick={() => {
              setStep(0);
              open();
            }}
          >
            เพิ่มข้อมูล
          </Button>
        </Group>
      </Group>

      <Paper shadow="md" mt={12} p={6} className="overflow-x-auto">
        <Table highlightOnHover withColumnBorders>
          <Table.Thead>{ths}</Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Paper>
    </div>
  );
}

export default BorrowTable;
