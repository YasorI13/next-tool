import prisma from "@/lib/db";
import { NextRequest } from "next/server";


export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const CostCtr = searchParams.get('CostCtr') as string;
    const SapCode = searchParams.get('SapCode') as string;
    if (!CostCtr || !SapCode) {
      return new Response('Missing CostCtr or SapCode', { status: 400 });
    }
    const page = Number(searchParams.get('page')) || 1;
    const pageSize = Number(searchParams.get('pageSize')) || 999999;
    const month = searchParams.get('month');
    const year = searchParams.get('year');

    // สร้างช่วงวันของเดือน
    let dateFilter = {};
    
    if (month && year) {
      const monthNum = parseInt(month);
      const yearNum = parseInt(year);

      const startOfMonth = new Date(yearNum, monthNum - 1, 1); // วันแรกของเดือน
      const endOfMonth = new Date(yearNum, monthNum, 0); // วันสุดท้ายของเดือน

      dateFilter =  {
          AND: [
            {
              D01: {
                lte: endOfMonth,
              },
            },
            {
              D02: {
                gte: startOfMonth,
              },
            },
            CostCtr && CostCtr.length === 7 ? { CostCtr } : {},
          ],
        }
    }

    // สร้าง filter สำหรับ CostCtr ถ้ามี

    // const SapCodeFilter = SapCode ? { : SapCode } : {};

    const filter = {
      ...dateFilter,
    };

    const response = await prisma.toolsplan.findMany({
      where: {
        ppl:{
          pplink:{
            SapCode: SapCode,
          },
          ...filter,
        }
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    // const response2 = await prisma.toolplan.findMany({
    //   where: {
    //     pplId: {
    //       not: null, // ต้องมีการเชื่อมกับ ppl
    //     },
    //   },
    //   skip: (page - 1) * pageSize,
    //   take: pageSize,
    // });

    const total = await prisma.toolsplan.count({
      where: {
        ppl:{
          pplink:{
            SapCode: SapCode,
          },
          CostCtr: CostCtr,
        }
      },
    });

    return new Response(JSON.stringify({ data: response, total }), { status: 200 });
  } catch (error) {
    console.error('Error fetching data:', error);
    return new Response('Failed to fetch data', { status: 500 });
  }
}




