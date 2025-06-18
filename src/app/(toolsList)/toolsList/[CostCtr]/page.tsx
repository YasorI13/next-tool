import React from 'react'
import prisma from "@/lib/db";
import OptioneSelect from '../../components/OptioneSelect';
import { Text, Title } from '@mantine/core';

async function page({params,}: {params: Promise<{ CostCtr : string }>}) {
  const { CostCtr } = await params;

  const CostCtrP = await prisma.costCtr.findUnique({where:{CostCtr: CostCtr}});
  if(!CostCtrP) return new Response("Failed to fetch data", { status: 500 });

  return (
    <>
      <Text>รายการครุภัณฑ์และเครื่องมือเครื่องใช้ในความรับผิดชอบ</Text>
      <Title >{CostCtrP.ShortText}</Title>
      <OptioneSelect  CostCtr={CostCtr}/>
    </>
  )
}

export default page