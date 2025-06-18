import React, { useEffect, useState } from "react";
import { fetcher, http } from "@/services/http-service";
import useSWR from "swr";
import Loading from "@/app/loading";
import Error from "@/app/error";
import { selectItem, ToolsDataEx2 } from "../types/types";
import { assetCustomList } from "@prisma/client";
import {
  ActionIcon,
  Center,
  Checkbox,
  Grid,
  ScrollArea,
  SegmentedControl,
  Text,
} from "@mantine/core";

import CheckboxCard from "./CheckbokCard";
import {
  IconDeselect,
  IconDeviceFloppy,
  IconListCheck,
} from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";

type Props = {
  id: string;
  CostCtr: string;
  PPLMutate: () => void;
  closeModal: () => void;
};
function PPLAddItems({ id, CostCtr, PPLMutate, closeModal }: Props) {
  const [groupList, setGroupList] = useState<selectItem[]>();
  const [groupId, setGroupId] = useState<string>("");
  const [selectvalue, setSelectValue] = useState<string[]>([]);

  const {
    data: grouplistData,
    error: grouplistError,
    isLoading: grouplistLoading,
  } = useSWR(
    CostCtr ? `emdtools_v1/grouplist?CostCtr=${CostCtr}` : null,
    fetcher
  );
  useEffect(() => {
    if (grouplistData) {
      const groupList = grouplistData.data.map((item: assetCustomList) => ({
        value: String(item.assetCustomListId),
        label: String(item.name),
      }));
      setGroupList(groupList);
      if (groupList.length > 0) {
        setGroupId(groupList[0].value);
      }
    }
  }, [grouplistData]);

  const {
    data: toolsIngrouplistData,
    error: toolsIngrouplistError,
    isLoading: toolsIngrouplistLoading,
  } = useSWR<ToolsDataEx2[]>(
    groupId ? `emdtools_v1/toolsIngrouplist/${groupId}?Active=Active` : null,
    fetcher
  );

  if (grouplistLoading) return <Loading />;
  if (grouplistError || toolsIngrouplistError) return <Error />;

  const cards = toolsIngrouplistData?.map((element: ToolsDataEx2) => (
    <Grid.Col key={element.asset} span={{ base: 12, sm: 6, md: 4, lg: 3 }}>
      <CheckboxCard element={element} />
    </Grid.Col>
  ));

  const handlesubmit = async () => {
    const assetList = selectvalue;
    for (const asset of assetList) {
      try {
        const res = await http.post(`/emdtools_v1/getEvent-ToolsInPPLData`, {
          PPLId: id,
          asset,
        });

        if (res.status === 200) {
          notifications.show({
            title: "ผลการทำงาน",
            message: `เพิ่ม ${asset} สำเร็จ`,
            autoClose: 3000,
          });
        } else {
          notifications.show({
            title: "ผิดพลาด",
            message: `เพิ่ม ${asset} ไม่สำเร็จ`,
            color: "red",
            autoClose: 3000,
          });
        }
      } catch (error) {
        console.error(`Error for asset ${asset}:`, error);
        notifications.show({
          title: "ผิดพลาด",
          message: `เกิดข้อผิดพลาดกับ ${asset}`,
          color: "red",
          autoClose: 3000,
        });
      }
    }
    PPLMutate();
    closeModal();
  };

  return (
    <>
      {groupList && (
        <>
          <Center>
            <ScrollArea type="scroll" scrollbarSize={1} scrollHideDelay={500}>
              <SegmentedControl
                transitionDuration={400}
                transitionTimingFunction="linear"
                color="blue"
                data={groupList}
                value={groupId}
                onChange={(value) => {
                  if (value) {
                    setGroupId(value);
                  }
                }}
                disabled={toolsIngrouplistLoading}
              />
            </ScrollArea>

            {toolsIngrouplistData &&
            toolsIngrouplistData.length > selectvalue.length ? (
              <ActionIcon
                ml={"md"}
                color="green"
                onClick={() => {
                  const data = toolsIngrouplistData?.map(
                    (element: ToolsDataEx2) => element.asset
                  );
                  setSelectValue(data?.length ? data : []);
                }}
              >
                <IconListCheck />
              </ActionIcon>
            ) : (
              <ActionIcon
                ml={"md"}
                color="red"
                onClick={() => {
                  setSelectValue([]);
                }}
              >
                <IconDeselect />
              </ActionIcon>
            )}

            <ActionIcon
              ml={"md"}
              onClick={() => {
                handlesubmit();
              }}
            >
              <IconDeviceFloppy />
            </ActionIcon>
          </Center>

          {toolsIngrouplistData && (
            <>
              <Checkbox.Group value={selectvalue} onChange={setSelectValue}>
                <Grid mt={12}>{cards}</Grid>
              </Checkbox.Group>
              <Text fz="xs" mt="md">
                CurrentValue: {selectvalue.join(", ") || "–"}
              </Text>
            </>
          )}
          {toolsIngrouplistLoading && (
            <>
              <Center>
                <Loading />
              </Center>
            </>
          )}
        </>
      )} 

      {groupList?.length === 0 && (
        <Center mt={20} >
          <Text color="red">ไม่พบข้อมูลกลุ่มเครื่องมือ</Text>
        </Center>
      )}
    </>
  );
}

export default PPLAddItems;
