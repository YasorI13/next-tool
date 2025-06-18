import React from 'react'
import prisma from "@/lib/db";
import { Text, Title } from '@mantine/core';
import { PPLDataTimeline } from '@/app/(toolsList)/components/PPLDataTimeline';

async function page({params,}: {params: Promise<{ CostCtr : string , id: string }>}) {
  const { CostCtr, id } = await params;

  const CostCtrP = await prisma.costCtr.findUnique({where:{CostCtr: CostCtr}});
  if(!CostCtrP) return new Response("Failed to fetch data", { status: 500 });

  const pplData = await prisma.ppl.findUnique({
    where: {
      id: parseInt(id)
    },
    include: {
      pplink: true,
      costCtr: true
    }
  });
  if(!pplData) return new Response("Failed to fetch data", { status: 500 });

  return (
    <>
      <Text>แผนงาน</Text>
      <Title >({CostCtrP.ShortText})  {pplData.Workname} {pplData.pplink.name}</Title>
      <PPLDataTimeline CostCtr={CostCtr} id={id} />
    </>
  )
}

export default page