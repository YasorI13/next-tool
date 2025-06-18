import {
  Box,
  Button,
  Fieldset,
  Grid,
  Group,
  Textarea,
  TextInput,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import React from "react";

import { http } from "@/services/http-service";

type Props = {
  CostCtr: string;
  groupListMutate: () => void;
  close: () => void;
};
function GroupCre(Props: Props) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await http.post(`/emdtools_v1/grouplist?CostCtr=${Props.CostCtr}`,{
        name: name,
        description: description,
        CostCtr: Props.CostCtr
      });
      if (res.status === 200) {
        Props.groupListMutate();
        Props.close();
         notifications.show({
                  title: "ผลการทำงาน",
                  message: res.data.message,
                  autoClose: 2000,
                });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Box maw={500} mx="auto">
        <Fieldset legend="สร้างกลุ่มเครื่องมือ" radius="lg" variant="filled">
          <Grid justify="space-between" align="center">
            <Grid.Col span={12}>
              <TextInput
                value={name}
                onChange={(event) => setName(event.currentTarget.value)}
                label="ชื่อกลุ่มเครื่องมือ"
                placeholder="ชื่อกลุ่มเครื่องมือ"
                withAsterisk
              />
            </Grid.Col>
            <Grid.Col span={12}>
              <Textarea
                // mt="sm"
                radius="md"
                label="รายละรายละเอียดกลุ่มเครื่องมือ"
                placeholder="รายละรายละเอียดกลุ่มเครื่องมือ"
                autosize
                withAsterisk
                minRows={2}
                value={description}
                onChange={(event) => setDescription(event.currentTarget.value)}
              />
            </Grid.Col>
          </Grid>
          <Group mt="md" justify="Center">
            <Button
              type="submit"
              variant="outline"
              color="blue"
              onClick={handleSubmit}
            >
              บันทึก
            </Button>
          </Group>
        </Fieldset>
      </Box>
    </>
  );
}

export default GroupCre;
