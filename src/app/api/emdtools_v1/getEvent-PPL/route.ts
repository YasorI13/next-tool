import prisma from "@/lib/db";
import { NextRequest } from "next/server";


export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const CostCtr = searchParams.get('CostCtr') as string;
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

      dateFilter = {
        D01: {
          lte: endOfMonth,
        },
        D02: {
          gte: startOfMonth,
        },
      };
    }

    // สร้าง filter สำหรับ CostCtr ถ้ามี
    const costCtrFilter = CostCtr && CostCtr.length === 7 ? { CostCtr } : {};

    const filter = {
      ...costCtrFilter,
      ...dateFilter,
    };

    const response = await prisma.ppl.findMany({
      where: filter,
      include: {
        pplink: true,
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: {
        pplink: {
          SapCode: 'asc',
        }
      }
    });

    const total = await prisma.ppl.count({
      where: filter,
    });

    return new Response(JSON.stringify({ data: response, total }), { status: 200 });
  } catch (error) {
    console.error('Error fetching data:', error);
    return new Response('Failed to fetch data', { status: 500 });
  }
}




