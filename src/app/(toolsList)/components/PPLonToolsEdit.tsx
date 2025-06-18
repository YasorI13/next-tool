import { fetcher, http } from "@/services/http-service";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { toolplanEx } from "../types/types";
import Error from "@/app/error";
import Loading from "@/app/loading";
import {
  Box,
  Button,
  Fieldset,
  Grid,
  Group,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";

import { DateInput } from "@mantine/dates";
import { notifications } from "@mantine/notifications";

type Props = {
  id: string;
  close: () => void;
  PPLMutate: () => void;
};

function PPLonToolsEdit({ id, close, PPLMutate }: Props) {
  const {
    data: PPLData,
    error: PPLError,
    isLoading: PPLLoading,
  } = useSWR<toolplanEx>(
    id ? `emdtools_v1/getEvent-ToolsInPPLData/${id}` : null,
    fetcher
  );
  const [name, setName] = useState("");
  const [note, setNote] = useState<string>("");
  const [D01, setD01] = useState<string | null>(null);
  const [D02, setD02] = useState<string | null>(null);
  // const [color, setColor] = useState("#fff");

  const [asset, setAsset] = useState<string>("");
  const [assetDescription, setAssetDescription] = useState<string>("");
  const [namePlant, setNamePlant] = useState("");

  useEffect(() => {
    if (PPLData) {
      setName(PPLData.ppl.Workname);
      setAsset(PPLData.asset);
      setAssetDescription(PPLData.ToolsData.assetDescription);
      setNamePlant(PPLData.ppl.pplink.name);
      setNote(PPLData.comment || "");
      // if (PPLData.ppl.color) {
      //   setColor(PPLData.ppl.color);
      // }
      if (PPLData.D01 && PPLData.D02) {
        setD01(new Date(PPLData.D01).toISOString().split("T")[0]);
        setD02(new Date(PPLData.D02).toISOString().split("T")[0]);
      }
    }
  }, [PPLData]);

  const handleSubmit = async () => {
    if (!D01 || !D02 || !asset) {
      notifications.show({
        color: "red",
        message: "กรุณากรอกข้อมูลให้ครบถ้วน",
      });
      return;
    }

    try {
      const res = await http.put(`emdtools_v1/getEvent-ToolsInPPLData/${id}`, {
        asset: asset,
        comment: note,
        D01: D01,
        D02: D02,
      });
      if (res.status === 200) {
        PPLMutate();
        close();
      }
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      notifications.show({
        color: "red",
        message: "เกิดข้อผิดพลาดในการบันทึกข้อมูล",
      });
      return;
    }
  };

  const handleDelete = async () => {
    if (!id) {
      notifications.show({
        color: "red",
        message: "ไม่พบข้อมูลที่ต้องการลบ",
      });
      return;
    }

    try {
      const res = await http.delete(
        `emdtools_v1/getEvent-ToolsInPPLData/${id}`
      );
      if (res.status === 200) {
        PPLMutate();
        close();
      }
    } catch (error) {
      console.error("Error in handleDelete:", error);
      notifications.show({
        color: "red",
        message: "เกิดข้อผิดพลาดในการลบข้อมูล",
      });
      return;
    }
  };

  if (PPLError)
    return (
      <div>
        <Error />
      </div>
    );
  if (PPLLoading)
    return (
      <div>
        <Loading />
      </div>
    );

  return (
    <>
      <Box
        maw={600}
        // mx="auto"
      >
        <Fieldset legend="สร้างใบยืมเครื่องมือ" radius="lg" variant="filled">
          <Grid justify="space-between" align="center">
            <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
              <Text>งาน : {name}</Text>
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
              <Text>สถานที่ : {namePlant}</Text>
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
              <TextInput
                value={asset}
                label="รหัสเครื่องมือ"
                placeholder="รหัสเครื่องมือ"
                disabled
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
              <TextInput
                value={assetDescription}
                label="ชื่อเครื่องมือ"
                placeholder="ชื่อเครื่องมือ"
                disabled
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 12, lg: 12 }}>
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

            <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
              <DateInput
                firstDayOfWeek={0}
                value={D01}
                onChange={setD01}
                valueFormat="DD-MM-YYYY" // "YYYY-MM-DD"
                label="วันที่เริ่มต้น"
                placeholder="วันที่เริ่มต้น"
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
              <DateInput
                firstDayOfWeek={0}
                value={D02}
                onChange={setD02}
                valueFormat="DD-MM-YYYY" // "YYYY-MM-DD"
                label="วันที่สิ้นสุด"
                placeholder="วันที่สิ้นสุด"
              />
            </Grid.Col>
            {/* <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
              <ColorInput 
              label="สีของแผนงาน"
              value={color} 
              onChange={ (color) => {
                setColor(color);
              }} />
            </Grid.Col> */}
          </Grid>
          <Group mt="md" justify="Center">
            <Button
              type="submit"
              variant="outline"
              color="blue"
              onClick={() => {
                handleSubmit();
              }}
            >
              บันทึก
            </Button>

            <Button
              type="submit"
              variant="outline"
              color="red"
              onClick={() => {
                if (window.confirm("คุณต้องการลบข้อมูลนี้ใช่หรือไม่?")) {
                  handleDelete();
                }
              }}
            >
              ลบ
            </Button>
          </Group>
        </Fieldset>
      </Box>
    </>
  );
}

export default PPLonToolsEdit;
