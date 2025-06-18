import React from 'react'
import prisma from "@/lib/db";
import { Text, Title } from '@mantine/core';
import { PPLDataTimeline } from '@/app/(toolsList)/components/PPLDataTimeline';

async function page({params,}: {params: Promise<{ CostCtr : string , SapCode: string }>}) {
  const { CostCtr, SapCode } = await params;

  const CostCtrP = await prisma.costCtr.findUnique({where:{CostCtr: CostCtr}});
  if(!CostCtrP) return new Response("Failed to fetch data", { status: 500 });

  const SapCodeP = await prisma.pplink.findUnique({where:{SapCode: SapCode}});
  if(!SapCodeP) return new Response("Failed to fetch data", { status: 500 });

  return (
    <>
      <Text>แผนงาน</Text>
      <Title >({CostCtrP.ShortText})  {SapCodeP.name}</Title>
      <PPLDataTimeline CostCtr={CostCtr} SapCode={SapCode} />
    </>
  )
}

export default page