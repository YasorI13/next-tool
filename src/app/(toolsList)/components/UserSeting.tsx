"use client";
import React, { useState } from "react";
import { useEffect } from "react";
import { ActionIcon, Card, Flex, Title } from "@mantine/core";
import { IconActivity, IconTrash } from "@tabler/icons-react";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { fetcher } from "@/services/http-service";
import useSWR from "swr";
import Error from "@/app/error";
import Loading from "@/app/loading";
import { removeGroupToolsFromUser } from "../services/userAction";

type toolslist = {
  id: number;
  name: string;
};

function UserSeting() {

  const [toolslist, setToolslist] = useState<toolslist[]>([]);
//   useEffect(() => {
//     if (session?.user?.email) {
//       const fetchPermission = async () => {
//         const res = await http(
//           `${process.env.NEXT_PUBLIC_API_BASE_URL}/emdtools_v1/getPersonOptions`
//         );
//         // console.log(res.data);
//         setToolslist(res.data?.groupTools);
//       };
//       fetchPermission();
//     }
//   }, [session]);

const {
    data: UserData,
    error: UserError,
    isLoading: UserLoading,
    mutate: UserMutate,
  } = useSWR(`/emdtools_v1/getPersonOptions`, fetcher);

  useEffect(() => {
    if (UserData) {
      setToolslist(UserData?.groupTools);
    }
  }, [UserData]);

  if (UserError)
    return (
      <div>
        <Error />
      </div>
    );
  if (UserLoading)
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
          const response = await removeGroupToolsFromUser(id);
          if (response.status === 200) {
            UserMutate();
            notifications.show({
              title: "ผลการทำงาน",
              message: response.message,
              autoClose: 2000,
            });
          }
        },
      });

  return (
    <div>
      <Title>กลุ่มเครื่องมือ</Title>
      <Flex
        direction={{ base: "column", sm: "row" }}
        gap={{ base: "sm", sm: "lg" }}
        justify={{ sm: "Flex-start" }}
        mt={"md"}
      >
        {toolslist.length > 0 &&
          toolslist.map((tool) => {
            return (
              <Card
                shadow="sm"
                padding="md"
                radius="md"
                withBorder
                key={tool.id}
              >
                <Flex justify="flex-start" align="center" direction="row">
                  <IconActivity stroke={1.5} style={{ marginRight: "12px" }} />
                  {tool.name}
                  <ActionIcon
                    color="red"
                    ml="sm"
                    onClick={() => {
                      removeModel(tool.id);
                    }}
                  >
                    <IconTrash />
                  </ActionIcon>
                </Flex>
              </Card>
            );
          })}
      </Flex>
    </div>
  );
}

export default UserSeting;
