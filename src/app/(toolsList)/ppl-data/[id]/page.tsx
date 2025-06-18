import React from 'react'
import prisma from "@/lib/db";
import { Text, Title } from '@mantine/core';
import { PPLDataTimeline } from '@/app/(toolsList)/components/PPLDataTimeline';

async function page({params,}: {params: Promise<{ id: string }>}) {
  const { id } = await params;

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
      <Title >({pplData.costCtr.ShortText})  {pplData.Workname} {pplData.pplink.name}</Title>
      <PPLDataTimeline CostCtr={pplData.costCtr.CostCtr} id={id} />
    </>
  )
}

export default page