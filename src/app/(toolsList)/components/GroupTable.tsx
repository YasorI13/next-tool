"use client";
import {
  ActionIcon,
  Button,
  Center,
  Container,
  Flex,
  Group,
  Modal,
  Pagination,
  Paper,
  Select,
  Table,
  Text,
} from "@mantine/core";
import React, { useState } from "react";
import { fetcher, http } from "@/services/http-service";
import useSWR from "swr";
import Error from "@/app/error";
import Loading from "@/app/loading";
import { useDisclosure } from "@mantine/hooks";
import GroupCre from "./GroupCre";
import GroupEdi from "./GroupEdi";
import { IconAdFilled, IconEdit, IconTrash, IconZoom } from "@tabler/icons-react";
import { assetCustomList } from "@prisma/client";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";
import { addGroupToolsTOuser } from "../services/userAction";
// import { useRouter } from 'next/router';

type Props = {
  CostCtr: string;
};

function GroupTable({ CostCtr }: Props) {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [opened, { open, close }] = useDisclosure(false);
  const [step, setStep] = useState(0);
  const [id, setId] = useState<number | null>(null);

  const {
    data: groupListData,
    error: groupListError,
    isLoading: groupListLoading,
    mutate: groupListMutate,
  } = useSWR(
    CostCtr ? `emdtools_v1/grouplist?CostCtr=${CostCtr}` : null,
    fetcher
  );

  if (groupListError)
    return (
      <div>
        <Error />
      </div>
    );
  if (groupListLoading)
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
        const response = await http.delete("/emdtools_v1/grouplist/" + id);
        if (response.status === 200) {
          groupListMutate();
          notifications.show({
            title: "ผลการทำงาน",
            message: response.data.message,
            autoClose: 2000,
          });
        }
      },
    });

    const addtouser = async (id: number) => {
       const res = await addGroupToolsTOuser(id);
       if (res?.status === 200) {
        window.location.reload();
      }
    }

  const ths = (
    <Table.Tr>
      <Table.Th>assetCustomListId</Table.Th>
      <Table.Th>name</Table.Th>
      <Table.Th>description</Table.Th>
      <Table.Th></Table.Th>
    </Table.Tr>
  );

  const rows = groupListData?.data.map((element: assetCustomList) => (
    <Table.Tr key={element.assetCustomListId}>
      <Table.Td>{element.assetCustomListId}</Table.Td>
      <Table.Td>{element.name}</Table.Td>
      <Table.Td>{element.description}</Table.Td>
      <Table.Td>
        <Center>
          <ActionIcon
          color="green"
            onClick={() => {
              router.push(`/g/${element.assetCustomListId}`);
            }}
          >
            <IconZoom />
          </ActionIcon>

          <ActionIcon
          ml="sm"
          color="dark"
          onClick={() => {
            addtouser(element.assetCustomListId)
            }}
          >
            <IconAdFilled />
          </ActionIcon>

          <ActionIcon
            ml="sm"
            onClick={() => {
              setStep(1);
              setId(element.assetCustomListId);
              open();
            }}
          >
            <IconEdit />
          </ActionIcon>

          <ActionIcon
            color="red"
            ml="sm"
            onClick={() => {
              removeModel(element.assetCustomListId);
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
        centered
        withCloseButton={false}
      >
        {step === 0 && (
          <GroupCre
            groupListMutate={groupListMutate}
            close={close}
            CostCtr={CostCtr}
          />
        )}
        {step === 1 && (
          <GroupEdi
            groupListMutate={groupListMutate}
            close={close}
            id={String(id)}
          />
        )}
      </Modal>
      <Container size={"md"}>

      <Paper shadow="md" mt={12} p={6}>
        <Table highlightOnHover withColumnBorders>
          <Table.Thead>{ths}</Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
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
            total={Math.ceil(groupListData.total / pageSize)}
          />
        </Flex>
        <Group justify="space-between">
          {groupListData.total && <Text>{groupListData.total} รายการ</Text>}
          <Button
            mt={18}
            onClick={() => {
              setStep(0);
              open();
            }}
          >
            เพิ่มข้อมูล
          </Button>
          {groupListData && (
            <Select
              mt={18}
              style={{ width: 75 }}
              data={["10", "15", "20", "30"]}
              onChange={(e) => {
                setPageSize(Number(e));
                groupListMutate();
              }}
              value={String(pageSize)}
            />
          )}
        </Group>
      </Group>
      </Container>
    </div>
  );
}

export default GroupTable;
