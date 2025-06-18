"use client";

import React from "react";
import { CostCtrlist } from "../types/types";
import {
  ActionIcon,
  Center,
  Paper,
  ScrollAreaAutosize,
  Table,
} from "@mantine/core";
import { useRouter } from "next/navigation";
import {
  IconBodyScan,
  IconDownload,
  IconPlant,
  IconTools,
  IconUsersGroup,
} from "@tabler/icons-react";
import { http } from "@/services/http-service";


function TableCostCtr({ CostCtrlist }: CostCtrlist) {
  const router = useRouter();

  const syncppl = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await http.get(`/it-emd-sync/ppl`);
      if (res.status === 200) {

      }
    } catch (error) {
      console.error(error);
    }
  };
  const syncpplink = async () => {
    const res = await http.get(`/it-emd-sync/pplink`);
    if (res.status === 200) {

    }
  };

  const rows = CostCtrlist.map((element) => (
    <Table.Tr
      key={element.CostCtr}
      bg={element.CostCtr.endsWith("0") ? "#e2facd" : ""}
    >
      <Table.Td
        onClick={() => {
          router.push(`/ppl/${element.CostCtr}`);
        }}
        style={{ cursor: "pointer" }}
      >{element.CostCtr}</Table.Td>
      <Table.Td>{element.ShortText}</Table.Td>
      <Table.Td>{element.Description}</Table.Td>
      <Table.Td>
        <Center>
          <ActionIcon
            onClick={() => {
              router.push(`/toolsList/${element.CostCtr}`);
            }}
          >
            <IconTools />
          </ActionIcon>
          <ActionIcon
            color="red"
            ml="md"
            onClick={() => {
              router.push(`/groupList/${element.CostCtr}`);
            }}
          >
            <IconUsersGroup />
          </ActionIcon>
          <ActionIcon
            color="green"
            ml="md"
            onClick={() => {
              router.push(`/borrow/${element.CostCtr}`);
            }}
          >
            <IconBodyScan />
          </ActionIcon>
        </Center>
      </Table.Td>
    </Table.Tr>
  ));

  const ths = (
    <Table.Tr>
      <Table.Th>CostCtr</Table.Th>
      <Table.Th>ShortText</Table.Th>
      <Table.Th>Description</Table.Th>
      <Table.Th>
        <Center>
          <ActionIcon
            onClick={
              syncppl
            }
          >
            <IconDownload />
          </ActionIcon>
          <ActionIcon
            color="green"
            ml="md"
            onClick={() => {
              syncpplink();
            }}
          >
            <IconPlant />
          </ActionIcon>
        </Center>
      </Table.Th>
    </Table.Tr>
  );

  return (
    <Paper shadow="md" mt={12} p={6}>
      <ScrollAreaAutosize mx="auto">
        <Table highlightOnHover withColumnBorders>
          <Table.Thead>{ths}</Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </ScrollAreaAutosize>
    </Paper>
  );
}

export default TableCostCtr;
