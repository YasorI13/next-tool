import React from "react";
import prisma from "@/lib/db";
import { Text, Title } from "@mantine/core";
import Error from "@/app/error";
import { Timeline } from "../../components/Timeline";

async function page({
  params,
}: {
  params: Promise<{ assetCustomListId: string }>;
}) {
  const { assetCustomListId } = await params;

  const assetCustomList = await prisma.assetCustomList.findUnique({
    where: {
      assetCustomListId: Number(assetCustomListId),
    },
    include: {
      costCtrs: true,
    }
  });
  
  if (!assetCustomList)
    return (<Error />);

  return (
    <>
      <Text>รายการกลุ่มเครื่องมือ</Text>

      <Title>{`${assetCustomList.costCtrs.ShortText}    ${assetCustomList.name}`} </Title>

      <Timeline assetCustomListId={assetCustomListId}/>
    </>
  );
}

export default page;
