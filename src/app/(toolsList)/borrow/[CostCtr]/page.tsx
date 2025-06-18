import React from 'react'
import prisma from "@/lib/db";
import { Text, Title } from '@mantine/core';
import BorrowTable from '../../components/BorrowTable';

async function page({params,}: {params: Promise<{ CostCtr : string }>}) {
  const { CostCtr } = await params;

  const CostCtrP = await prisma.costCtr.findUnique({where:{CostCtr: CostCtr}});
  if(!CostCtrP) return new Response("Failed to fetch data", { status: 500 });

  return (
    <>
      <Text>รายการยืมเครื่องมือ</Text>
      <Title >{CostCtrP.Description}</Title>
      <BorrowTable  CostCtr={CostCtr}/>
    </>
  )
}

export default page