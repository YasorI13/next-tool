import React from 'react'
import prisma from "@/lib/db";
import TableCostCtr from '../components/TableCostCtr';
import { CostCtr } from '@prisma/client';

async function page() {
    const CostCtrlist: CostCtr[] = await prisma.costCtr.findMany({
        where: {
            CostCtr: {
                startsWith: "N2020"
            }
        }
    });
  return (
    <>
        <TableCostCtr CostCtrlist={CostCtrlist} />
    </>
  )
}

export default page