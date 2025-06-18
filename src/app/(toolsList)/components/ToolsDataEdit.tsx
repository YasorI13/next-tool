import {
  Box,
  Fieldset,
  Grid,

  NumberInput,
  Textarea,
  TextInput,
} from "@mantine/core";
import React, { useEffect, useState } from "react";

import { fetcher } from "@/services/http-service";
import useSWR from "swr";
import Error from "@/app/error";
import Loading from "@/app/loading";
import { assetCustomList } from "@prisma/client";
import { selectItem, ToolsDataEx } from "../types/types";


type Props = {
  id: string;
  CostCtr: string;
  groupListMutate: () => void;
  close: () => void;
};

function ToolsDataEdit(Props: Props) {
  const {
    data: toolsData,
    error: toolsError,
    isLoading: toolsLoading,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    mutate: toolsMutate,
  } = useSWR(Props.id ? `emdtools_v1/getToolsData/${Props.id}` : null, fetcher);

  const [data, setData] = useState<ToolsDataEx>(toolsData);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (toolsData) {
      setData(toolsData);
    }
  }, [toolsData]);

  const {
    data: groupListData,
    error: groupListError,
    isLoading: groupListLoading,
  } = useSWR(
    Props.CostCtr ? `emdtools_v1/grouplist?CostCtr=${Props.CostCtr}` : null,
    fetcher
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [groubList, setGroubList] = useState<selectItem[]>();


  useEffect(() => {
    if (groupListData) {
      const groub_list = groupListData.data.map((element: assetCustomList) => ({
        value: element.assetCustomListId + "",
        label: element.name + "",
      }));
      setGroubList(groub_list);
      setShow(true);
    }
  }, [groupListData]);



  if (toolsError || groupListError)
    return (
      <div>
        <Error />
      </div>
    );
  if (toolsLoading || !show || groupListLoading || !data)
    return (
      <div>
        <Loading />
      </div>
    );

  return (
    <>
      <Box>
        <Fieldset legend="สร้างกลุ่มเครื่องมือ" radius="lg" variant="filled">
          <Grid justify="center" align="flex-start">
            <Grid.Col span={6}>
              <TextInput
                placeholder="asset"
                label="asset"
                value={data.asset}
                readOnly
              />
            </Grid.Col>

            <Grid.Col span={6}>
              <Textarea
                placeholder="assetDescription"
                label="assetDescription"
                value={data.assetDescription}
                readOnly
              />
            </Grid.Col>

            <Grid.Col span={4}>
              <TextInput
                placeholder="sNo"
                label="sNo"
                value={data.sNo}
                readOnly
              />
            </Grid.Col>

            <Grid.Col span={4}>
              <TextInput
                placeholder="capDate"
                label="capDate"
                value={data.capDate}
                readOnly
              />
            </Grid.Col>

            <Grid.Col span={4}>
              <NumberInput
                placeholder="acquisVal"
                label="acquisVal"
                value={Number(data.acquisVal)}
                readOnly
              />
            </Grid.Col>

            <Grid.Col span={4}>
              <TextInput placeholder="ba" label="ba" value={data.ba} readOnly />
            </Grid.Col>

            <Grid.Col span={4}>
              <TextInput
                placeholder="inventoryNumber"
                label="inventoryNumber"
                value={data.inventoryNumber}
                readOnly
              />
            </Grid.Col>

            <Grid.Col span={4}>
              <TextInput
                placeholder="licensePlate"
                label="licensePlate"
                value={data.licensePlate}
                readOnly
              />
            </Grid.Col>

            <Grid.Col span={4}>
              <TextInput
                placeholder="manufactureOfAsset"
                label="manufactureOfAsset"
                value={data.manufactureOfAsset}
                readOnly
              />
            </Grid.Col>

            <Grid.Col span={4}>
              <TextInput
                placeholder="persNo"
                label="persNo"
                value={data.person.person_thai_thai_firstname + " " + data.person.person_thai_thai_lastname}
                readOnly
              />
            </Grid.Col>

            <Grid.Col span={4}>
              <TextInput
                placeholder="phyLoc"
                label="phyLoc"
                value={data.phyLoc}
                readOnly
              />
            </Grid.Col>

            <Grid.Col span={4}>
              <TextInput
                placeholder="rspCCtrId"
                label="rspCCtrId"
                value={data.rspCCtrId}
                readOnly
              />
            </Grid.Col>

            <Grid.Col span={4}>
              <TextInput
                placeholder="serialNo"
                label="serialNo"
                value={data.serialNo}
                readOnly
              />
            </Grid.Col>

            <Grid.Col span={4}>
              <TextInput
                placeholder="typeName"
                label="typeName"
                value={data.typeName}
                readOnly
              />
            </Grid.Col>

          </Grid>

        </Fieldset>
      </Box>
    </>
  );
}

export default ToolsDataEdit;
