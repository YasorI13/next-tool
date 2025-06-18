import React from 'react'
import prisma from "@/lib/db";
import { Text, Title } from '@mantine/core';
import ToolsCerDataEdit from '../../components/ToolsCerDataEdit';
import ToolsImageManager from '../../components/ToolsImageManager';

async function page({params,}: {params: Promise<{ asset : string }>}) {
  const { asset } = await params;

  const tool = await prisma.toolsData.findUnique({where:{asset: asset}});
  if(!tool) return new Response("Failed to fetch data", { status: 500 });

  return (
    <>
      <Text>ครุภัณฑ์และเครื่องมือเครื่องใช้</Text>
      <Title >{`${tool.asset} ${tool.assetDescription}`}</Title>
      <ToolsCerDataEdit id={asset} />
      <ToolsImageManager asset={asset} />
    </>
  )
}

export default page