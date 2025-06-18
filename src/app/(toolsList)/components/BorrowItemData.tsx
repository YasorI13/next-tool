"use client";
import React, { useState } from "react";

import { fetcher, http } from "@/services/http-service";
import useSWR from "swr";

import {
  ActionIcon,
  Box,
  Button,
  Center,
  Chip,
  Fieldset,
  Group,
  Modal,
  Pagination,
  Paper,
  ScrollAreaAutosize,
  Select,
  Table,
  Text,
} from "@mantine/core";
import Loading from "@/app/loading";
import Error from "@/app/error";
import {
  IconPencilCheck,
  IconQrcode,
  IconTrash,
  IconZoomIn,
} from "@tabler/icons-react";
import { BorrowFormEx, BorrowItemEx } from "../types/types";
import { useDisclosure } from "@mantine/hooks";

import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import AddBorrowItems from "./AddBorrowItems";
import QRScanTools from "./QRScanTools";
import ToolsDataEdit from "./ToolsDataEdit";
import {
  setBorrowItemToAccept,
  setBorrowItemToReturn,
  setBorrowItemTosending,
} from "../services/borrowsTools";
// import { useSession } from "next-auth/react";

type Props = {
  id: string;
  CostCtr: string;
  refreshKey: number;
  borrowFormData: BorrowFormEx;
  handleDataUpdated: () => void;
};

function BorrowItemData({
  id,
  CostCtr,
  refreshKey,
  borrowFormData,
  handleDataUpdated,
}: Props) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [opened, { open, close }] = useDisclosure(false);
  const [step, setStep] = useState(0);
  const [idItem, setIdItem] = useState<string>("");
  // const { data: session, status } = useSession();

  const {
    data: borrowItemData,
    error: borrowItemError,
    isLoading: borrowItemLoading,
    mutate: borrowItemMutate,
  } = useSWR(
    id
      ? `emdtools_v1/getBorrowItemData?borrowFormId=${id}&page=${page}&pageSize=${pageSize}&refreshKey=${refreshKey}`
      : null,
    fetcher
  );

  if (borrowItemLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  if (borrowItemError) {
    return (
      <div>
        <Error />
      </div>
    );
  }

  const handleClick = (id: number) => {
    modals.openConfirmModal({
      title: "ยืนยันการดำเนินการ",
      centered: true,
      children: <p>คุณแน่ใจหรือไม่ว่าต้องการอนุมัติรายการนี้?</p>,
      labels: { confirm: "ยืนยัน", cancel: "ยกเลิก" },
      confirmProps: { color: "green" },
      onConfirm: async () => {
        const res = await setBorrowItemToAccept({ id });
        if (res?.status === 200) {
          notifications.show({
            title: "ผลการทำงาน",
            message: res.message || "ดําเนินการสําเร็จ",
            autoClose: 2000,
          });
          borrowItemMutate();
          handleDataUpdated();
        }
      },
    });
  };

  const handleClick2 = (id: number) => {
    modals.openConfirmModal({
      title: "ยืนยันการดำเนินการรับคืนเครื่องมือ",
      centered: true,
      children: <p>คุณแน่ใจหรือไม่ว่าต้องการอนุมัติรายการนี้?</p>,
      labels: { confirm: "ยืนยัน", cancel: "ยกเลิก" },
      confirmProps: { color: "green" },
      onConfirm: async () => {
        const res = await setBorrowItemToReturn({ id });
        if (res?.status === 200) {
          notifications.show({
            title: "ผลการทำงาน",
            message: res.message || "ดําเนินการสําเร็จ",
            autoClose: 2000,
          });
          borrowItemMutate();
          handleDataUpdated();
        }
      },
    });
  };

  const removeModel = (id: number) =>
    modals.openConfirmModal({
      title: "แน่ใจนะว่าต้องการลบข้อมูลนี้",
      labels: { confirm: "ตกลง", cancel: "ยกเลิก" },
      closeOnConfirm: true,
      onConfirm: async () => {
        const response = await http.delete(
          "/emdtools_v1/getBorrowItemData/" + id
        );
        if (response.status === 200) {
          borrowItemMutate();
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
      <Table.Th>รหัสครุภัณฑ์</Table.Th>
      <Table.Th>ชื่อ</Table.Th>
      <Table.Th>ผู้ถือครอง</Table.Th>
      <Table.Th>กลุ่ม</Table.Th>
      <Table.Th></Table.Th>
    </Table.Tr>
  );

  const rows = borrowItemData?.data.map((element: BorrowItemEx) => (
    <Table.Tr key={element.id}>
      <Table.Td>
        <Chip
          color="green"
          checked={element.status === "approve" || element.status === "return"}
          onClick={async () => {
            if (element.status !== "approve") return;
            const res = await setBorrowItemTosending({ id: element.id });
            if (res?.status === 200) {
              notifications.show({
                title: "ผลการทำงาน",
                message: res.message || "ดําเนินการสําเร็จ",
                autoClose: 2000,
              });
              borrowItemMutate();
              handleDataUpdated();
            }
          }}
        >
          {element.status}
        </Chip>
      </Table.Td>
      <Table.Td>{element.asset}</Table.Td>
      <Table.Td>{element.tool.assetDescription}</Table.Td>
      <Table.Td>
        {element.tool.person.person_thai_thai_firstname +
          " " +
          element.tool.person.person_thai_thai_lastname}
      </Table.Td>
      <Table.Td>{element.tool.supClass.SupClassName}</Table.Td>
      <Table.Td>
        <Center>
          <ActionIcon
            onClick={() => {
              setIdItem(String(element.asset));
              setStep(2);
              open();
            }}
          >
            <IconZoomIn />
          </ActionIcon>
          {borrowFormData?.FormStatusId === 1 && (
            <>
              <ActionIcon
                color="red"
                ml="md"
                onClick={() => {
                  removeModel(element.id);
                }}
              >
                <IconTrash />
              </ActionIcon>
            </>
          )}

          {/* { ((session?.user?.email === element?.tool.personNo) && element.status === "sending" ) && ( */}
          {element.status === "sending" && (
            <>
              <ActionIcon
                color="Green"
                ml="md"
                onClick={() => handleClick(element.id)}
              >
                <IconPencilCheck />
              </ActionIcon>
            </>
          )}

          {/* { ((session?.user?.email === element?.tool.personNo) && element.status === "sending" ) && ( */}
          {element.status === "sendreturn" && (
            <>
              <ActionIcon
                color="Green"
                ml="md"
                onClick={() => handleClick2(element.id)}
              >
                <IconPencilCheck />
              </ActionIcon>
            </>
          )}
        </Center>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        centered
        size="100%"
        withCloseButton={false}
      >
        {step === 0 && (
          <AddBorrowItems
            id={id}
            CostCtr={CostCtr}
            borrowItemMutate={borrowItemMutate}
            closeModal={close}
          />
        )}
        {step === 1 && (
          <QRScanTools id={id} borrowItemMutate={borrowItemMutate} />
        )}
        {step === 2 && (
          <ToolsDataEdit
            id={idItem}
            close={close}
            CostCtr={CostCtr}
            groupListMutate={borrowItemMutate}
          />
        )}
      </Modal>
      <Box w="100%" mx="auto">
        <Fieldset
          legend="รายการเครื่องมือ"
          radius="lg"
          variant="filled"
          bg={"white"}
        >
          <Group justify="space-between">
            <Group justify="space-between">
              <Pagination
                color="red"
                value={page}
                onChange={setPage}
                total={Math.ceil(borrowItemData.total / pageSize)}
              />
              <Select
                style={{ width: 75 }}
                data={["10", "15", "20", "30"]}
                onChange={(e) => {
                  setPageSize(Number(e));
                  borrowItemMutate();
                }}
                value={String(pageSize)}
              />
            </Group>
            <Group justify="space-between">
              <Text mt={10}>ข้อมูลทั้งหมด {borrowItemData.total}</Text>
              {borrowFormData?.FormStatusId === 1 && (
                <>
                  <ActionIcon
                    color="red"
                    size={"lg"}
                    onClick={() => {
                      setStep(1);
                      open();
                    }}
                  >
                    <IconQrcode />
                  </ActionIcon>
                  <Button
                    onClick={() => {
                      setStep(0);
                      open();
                    }}
                  >
                    เพิ่มข้อมูล
                  </Button>
                </>
              )}
            </Group>
          </Group>
          <Paper shadow="md" mt={12} p={6}>
            <ScrollAreaAutosize mx="auto">
              <Table highlightOnHover withColumnBorders>
                <Table.Thead>{ths}</Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
              </Table>
            </ScrollAreaAutosize>
          </Paper>
        </Fieldset>
      </Box>
    </>
  );
}

export default BorrowItemData;
