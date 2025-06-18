"use client";
import {
  Box,
  Center,
  Chip,
  Fieldset,
  Grid,
  Textarea,
  TextInput,
} from "@mantine/core";
import React, { useEffect, useState } from "react";

import { fetcher } from "@/services/http-service";
import useSWR from "swr";
import Error from "@/app/error";
import Loading from "@/app/loading";
import { ToolsDataEx } from "../types/types";
import { setToolsCer, setToolsCerDate } from "../services/userAction";
import { DatePickerInput } from "@mantine/dates";

type Props = {
  id: string;
};

function ToolsCerDataEdit(Props: Props) {
  const {
    data: toolsData,
    error: toolsError,
    isLoading: toolsLoading,
    mutate: toolsMutate,
  } = useSWR(Props.id ? `emdtools_v1/getToolsData/${Props.id}` : null, fetcher);

  const [data, setData] = useState<ToolsDataEx>(toolsData);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (toolsData) {
      setData(toolsData);
      setShow(true);
    }
  }, [toolsData]);

  if (toolsError)
    return (
      <div>
        <Error />
      </div>
    );
  if (toolsLoading || !show || !data)
    return (
      <div>
        <Loading />
      </div>
    );

  const today = new Date();
  const cerDate = data.CerDate ? new Date(data.CerDate) : null;
  const daysLeft = cerDate
    ? Math.ceil((cerDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
    : null;

  return (
    <>
      <Box>
        <Fieldset radius="lg" variant="filled" mt={12}>
          <Grid justify="flex-start" align="flex-start">
            <Grid.Col span={{ base: 12, sm: 6, md: 4, lg: 3 }}>
              <TextInput
                placeholder="asset"
                label="asset"
                value={data.asset}
                readOnly
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, sm: 6, md: 4, lg: 3 }}>
              <Textarea
                placeholder="assetDescription"
                label="assetDescription"
                value={data.assetDescription}
                readOnly
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, sm: 6, md: 3, lg: 2 }}>
              <TextInput
                placeholder="sNo"
                label="sNo"
                value={data.sNo}
                readOnly
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, sm: 6, md: 3, lg: 2 }}>
              <TextInput
                placeholder="capDate"
                label="capDate"
                value={data.capDate}
                readOnly
              />
            </Grid.Col>

            {/* <Grid.Col span={{ base: 12, sm: 6, md: 3, lg: 2 }}>
              <NumberInput
                placeholder="acquisVal"
                label="acquisVal"
                value={Number(data.acquisVal)}
                readOnly
              />
            </Grid.Col> */}

            <Grid.Col span={{ base: 12, sm: 6, md: 3, lg: 2 }}>
              <TextInput placeholder="ba" label="ba" value={data.ba} readOnly />
            </Grid.Col>

            <Grid.Col span={{ base: 12, sm: 6, md: 3, lg: 2 }}>
              <TextInput
                placeholder="inventoryNumber"
                label="inventoryNumber"
                value={data.inventoryNumber}
                readOnly
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, sm: 6, md: 3, lg: 2 }}>
              <TextInput
                placeholder="licensePlate"
                label="licensePlate"
                value={data.licensePlate}
                readOnly
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, sm: 6, md: 3, lg: 2 }}>
              <TextInput
                placeholder="manufactureOfAsset"
                label="manufactureOfAsset"
                value={data.manufactureOfAsset}
                readOnly
              />
            </Grid.Col>

            {/* <Grid.Col span={{ base: 12, sm: 6, md: 3, lg: 2 }}>
              <TextInput
                placeholder="persNo"
                label="persNo"
                value={data.person.person_thai_thai_firstname + " " + data.person.person_thai_thai_lastname}
                readOnly
              />
            </Grid.Col> */}

            <Grid.Col span={{ base: 12, sm: 6, md: 3, lg: 2 }}>
              <TextInput
                placeholder="phyLoc"
                label="phyLoc"
                value={data.phyLoc}
                readOnly
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, sm: 6, md: 3, lg: 2 }}>
              <TextInput
                placeholder="rspCCtrId"
                label="rspCCtrId"
                value={data.rspCCtrId}
                readOnly
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, sm: 6, md: 3, lg: 2 }}>
              <TextInput
                placeholder="serialNo"
                label="serialNo"
                value={data.serialNo}
                readOnly
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, sm: 6, md: 3, lg: 2 }}>
              <Center
                >
                <Chip
                  checked={data.hasCer}
                  onClick={async () => {
                    const res = await setToolsCer({
                      asset: data.asset,
                      status: !data.hasCer,
                    });
                    if (res.status === 200) {
                      toolsMutate();
                    }
                  }}
                >
                  Tools have Cer.
                </Chip>
              </Center>
            </Grid.Col>
            {data.hasCer && (
              <>
                <Grid.Col span={{ base: 12, sm: 6, md: 3, lg: 2 }}>
                  <DatePickerInput
                    label="Cetificate Last Date"
                    placeholder="Pick date"
                    value={data.CerDate ? new Date(data.CerDate) : null}
                    onChange={async (date) => {
                      const res = await setToolsCerDate({
                        asset: data.asset,
                        date: date ? date : null,
                      });
                      if (res.status === 200) {
                        toolsMutate();
                      }
                    }}
                  />
                </Grid.Col>

                <Grid.Col span={{ base: 12, sm: 6, md: 3, lg: 2 }}>
                  <TextInput
                    placeholder="daysLeft"
                    label="daysLeft"
                    value={
                      daysLeft !== null
                        ? `${daysLeft} วัน`
                        : "ไม่มีข้อมูลการรับรอง"
                    }
                    readOnly
                  />
                </Grid.Col>
              </>
            )}
          </Grid>
        </Fieldset>
      </Box>
    </>
  );
}

export default ToolsCerDataEdit;
