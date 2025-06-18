// app/api/sync-pplink/route.ts
import { NextResponse } from 'next/server';
import prisma from "@/lib/db";


type Data = {
  "id": string,
  "D01": string,
  "D02": string,
  "C01": string,
  "C02": string,
  "C03": string,
  "O01": string,
  "O02": string,
  "Psup": string,
  "Pfor": string,
  "Pskl": string,
  "Pers": string,
  "Cst_": string,
  "Bah_": string,
  "Stus": string
  "ty_": string
  "TYP": string,
  "YEAR": string,
  "Pcode": string,
  "Sec": string,
  "Ac_": string,
  "FRid": string,
  "ref_id": string,
  "comment": string,
  "P_type": string,
  "in_type": string
}
export async function GET() {
  const url = 'https://it-emd.egat.co.th/emd_system/buf3/pages/api_Getppl.php';

  try {
    const res = await fetch(url);
    const json = await res.json();

    if (json.status !== 'success') {
      return NextResponse.json({ error: 'Invalid response' }, { status: 500 });
    }

    for (const item of json.data as Data[]) {
      const data = {
        id: Number(item.id),
        D01: new Date(item.D01),
        D02: new Date(item.D02),
        Workname: item.C03,
        carNumber: item.O02,
        TYP: item.TYP,
        Year: item.YEAR,
        comment: null,
      };


      const findpplink_id = await prisma.pplink.findUnique({
        where: {
          SapCode: item.C01,
        }
      })

      const findCostCtr = await prisma.costCtr.findFirst({
        where: {
          ShortText: item.Sec,
        }
      })

      if (!findpplink_id?.id || !findCostCtr?.CostCtr) {
        console.warn('Skipped item with missing SapCode:', item);
        continue;
      }

      const updateData = {
        ...data,
        pplinkId: findpplink_id?.id,
        CostCtr: findCostCtr?.CostCtr, // Change costCtrId to CostCtr
      }

      // upsert เพื่อไม่ให้ซ้ำกันที่ SapCode
      await prisma.ppl.upsert({
        where: { id: updateData.id },
        update: updateData,
        create: updateData,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Sync failed:', error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
