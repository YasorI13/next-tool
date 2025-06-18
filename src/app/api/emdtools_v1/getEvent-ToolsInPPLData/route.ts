import prisma from "@/lib/db";
import { NextRequest } from "next/server";


export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    // const CostCtr = searchParams.get('CostCtr') as string;
    const PPLId = searchParams.get('PPLId') as string;
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
        ],
      }
    }
    const page = Number(searchParams.get('page')) || 1;
    const pageSize = Number(searchParams.get('pageSize')) || 999999;

    if (PPLId) {
      const response = await prisma.toolsplan.findMany({
        where: {
          ppl_id: Number(PPLId),
          ...dateFilter
        },
        include: {
          ppl: {
            include: {
              pplink: true,
            }
          },
          ToolsData: true,
        },
        skip: (page - 1) * pageSize,
        take: pageSize,
      });

      const total = await prisma.toolsplan.count({
        where: {
          ppl_id: Number(PPLId),
          ...dateFilter
        }
      });

      return new Response(JSON.stringify({ data: response, total: total }), { status: 200 });
    }

    const response = await prisma.toolsplan.findMany({
      where: {
        ...dateFilter
      },
      include: {
          ppl: {
            include: {
              pplink: true,
            }
          },
          ToolsData: true,
        },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
    const total = await prisma.toolsplan.count({
      where: {
        ...dateFilter
      }
    });
    return new Response(JSON.stringify({ data: response, total: total }), { status: 200 });

  } catch (error) {
    console.error("Error fetching data:", error);
    return new Response("Failed to fetch data", { status: 500 });
  }
}


export async function POST(request: NextRequest) {
  try {
    const { PPLId, asset } = await request.json();

    const ppl = await prisma.ppl.findUnique({
      where: {
        id: Number(PPLId)
      }
    })
    if (!ppl) {
      return new Response("PPL not found", { status: 404 });
    }

    const assetD = await prisma.toolsData.findUnique({
      where: {
        asset: asset
      }
    })

    if (!assetD) {
      return new Response(JSON.stringify(assetD), { status: 201 });
    }

    const createdData = await prisma.toolsplan.create({
      data: {
        ppl_id: Number(PPLId),
        asset: asset,
        D01: ppl.D01,
        D02: ppl.D02,
      }
    });

    return new Response(JSON.stringify(createdData), { status: 200});

  } catch (error) {
    console.error("Error creating data:", error);
    return new Response("Failed to create data", { status: 500 });
  }
}



