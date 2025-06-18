import { fetcher } from '@/services/http-service';
import React, { useEffect, useState } from 'react'
import useSWR from 'swr';
import { pplEx } from '../types/types';
import Error from '@/app/error';
import Loading from '@/app/loading';
import { Box, Button, ColorInput, Fieldset, Grid,  Group,  TextInput } from '@mantine/core';

import { DateInput } from '@mantine/dates';
import { setPPLcolor } from '../services/pplAction';
import { notifications } from '@mantine/notifications';

type Props = {
    id : string
    close: () => void
    PPLMutate: () => void
}

function PPLEdit({id, close, PPLMutate}: Props) {
    const {
    data: PPLData,
    error: PPLError,
    isLoading: PPLLoading,
  } = useSWR<pplEx>(
    id ? `emdtools_v1/getPPLData/${id}` : null,
    fetcher
  );
    const [name, setName] = useState("");
    const [namePlant, setNamePlant] = useState("");
    const [note, setNote] = useState<string>("");
    const [D01, setD01] = useState<string | null>(null);
    const [D02, setD02] = useState<string | null>(null);

    const [color, setColor] = useState('#fff');

  useEffect(() => {
    if (PPLData) {
      setName(PPLData.Workname);
      setNote(String(PPLData.comment));
      setNamePlant(PPLData.pplink.name);
      if(PPLData.color){setColor(PPLData.color)}
      if(PPLData.D01 && PPLData.D02){ 
          setD01((new Date(PPLData.D01).toISOString()).split("T")[0]);
          setD02((new Date(PPLData.D02).toISOString()).split("T")[0]);
        }
    }
  }, [PPLData]);


  const handleColorChange = async (color: string) => {
    const res = await setPPLcolor(id, color);
    if (res.status === 200) {
      notifications.show({
        color: "green",
        message: "แก้ไขข้อมูลสําเร็จ",
      });
      PPLMutate();
      close();
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
      <Box  mx="auto">
        <Fieldset legend="สร้างใบยืมเครื่องมือ" radius="lg" variant="filled">
          <Grid justify="space-between" align="center">

            <Grid.Col span={12}>
              <TextInput
                value={name}
                onChange={(event) => setName(event.currentTarget.value)}
                label="ชื่องาน"
                placeholder="ชื่องาน"
              />
            </Grid.Col>

            <Grid.Col span={12}>
              <TextInput
                value={namePlant}
                onChange={(event) => setNamePlant(event.currentTarget.value)}
                label="สถานที่"
                placeholder="สถานที่"
                disabled
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <DateInput
                firstDayOfWeek={0}
                value={D01}
                onChange={setD01}
                valueFormat="DD-MM-YYYY" // "YYYY-MM-DD"
                label="วันที่เริ่มต้น"
                placeholder="วันที่เริ่มต้น"
                disabled
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
                disabled
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <ColorInput 
              label="สีของแผนงาน"
              value={color} 
              onChange={ (color) => {
                setColor(color);
              }} />
            </Grid.Col>


            {/* <Grid.Col span={12}>
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
            </Grid.Col> */}
          </Grid>
          <Group mt="md" justify="Center">
            <Button
              type="submit"
              variant="outline"
              color="blue"
              onClick={() => {
                handleColorChange(color);
              }}
            >
              บันทึก
            </Button>
          </Group>
        </Fieldset>
      </Box>
    </>
  )
}

export default PPLEdit