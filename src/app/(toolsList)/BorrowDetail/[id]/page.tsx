import React from 'react'
import Error from '@/app/not-found';
import prisma from "@/lib/db";
import BorroowWrapper from '../../components/BorroowWrapper';

async function page({params,}: {params: Promise<{ id : string }>}) {
  const { id } = await params;
  const data = await prisma.borrowForm.findUnique({
    where:{id: Number(id)
    } , 
    include:{ 
      CostCtr: true
    }});
  const CostCtr = data?.CostCtr.CostCtr

  if(!data) return (<Error />);

  return (
    <>
      <BorroowWrapper id={id} CostCtr={String(CostCtr)} />
    </>
  )
}

export default page