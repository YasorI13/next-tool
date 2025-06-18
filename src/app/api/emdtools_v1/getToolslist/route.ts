import prisma from "@/lib/db";
import { NextRequest } from "next/server";




export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const AsstSupNo = searchParams.getAll('AsstSupNo') as string[];
    const CostCtr = searchParams.get('CostCtr') as string;
    const page = Number(searchParams.get('page')) || 1;
    const pageSize = Number(searchParams.get('pageSize')) || 999999;
    const toolsType = searchParams.get('toolsType') || '0';
    const hasCert = searchParams.get('hasCert');


    if (CostCtr) {

      if (CostCtr.length !== 7) return new Response("Failed to fetch data", { status: 500 });
      const response = await prisma.toolsData.findMany({
        where: {
          costCtrId: CostCtr,
          ...(AsstSupNo.length > 0 && {
            supClassId: {
              in: AsstSupNo
            }
          }),
          ...(toolsType === '1' && {
            acquisVal: {
              gte: 10000
            }
          }),
          ...(toolsType === '2' && {
            acquisVal: {
              lt: 10000
            }
          }),
          ...(hasCert === '1' && {
            hasCer: true
          }),
        },
        skip: (page - 1) * pageSize,
        take: pageSize,
        include: {
          supClass: true,
          assetCustomList: true,
          person: true
        }
      });

      const total = await prisma.toolsData.count({
        where: {
          costCtrId: CostCtr,
          ...(AsstSupNo.length > 0 && {
            supClassId: {
              in: AsstSupNo
            }
          }),
          ...(toolsType === '1' && {
            acquisVal: {
              gte: 10000
            }
          }),
          ...(toolsType === '2' && {
            acquisVal: {
              lt: 10000
            }
          }),
          ...(hasCert === '1' && {
            hasCer: true
          }),
        }
      });

      return new Response(JSON.stringify({ data: response, total: total }), { status: 200 });
    }

    if (AsstSupNo) {

      const response = await prisma.toolsData.findMany({
        where: {
          supClassId: {
            in: AsstSupNo
          },
          ...(toolsType === '1' && {
            acquisVal: {
              gte: 10000
            }
          }),
          ...(toolsType === '2' && {
            acquisVal: {
              lt: 10000
            }
          }),
          ...(hasCert === '1' && {
            hasCer: true
          }),
        },

        skip: (page - 1) * pageSize,
        take: pageSize,

      });

      const total = await prisma.toolsData.count({
        where: {
          supClassId: {
            in: AsstSupNo
          },
          ...(toolsType === '1' && {
            acquisVal: {
              gte: 10000
            }
          }),
          ...(toolsType === '2' && {
            acquisVal: {
              lt: 10000
            }
          }),
          ...(hasCert === '1' && {
            hasCer: true
          }),
        }
      })
      return new Response(JSON.stringify({ data: response, total: total }), { status: 200 });
    }

    const response = await prisma.toolsData.findMany({
      where: {
        ...(toolsType === '1' && {
          acquisVal: {
            gte: 10000
          }
        }),
        ...(toolsType === '2' && {
          acquisVal: {
            lt: 10000
          }
        }),
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
    const total = await prisma.toolsData.count({
      where: {
        ...(toolsType === '1' && {
          acquisVal: {
            gte: 10000
          }
        }),
        ...(toolsType === '2' && {
          acquisVal: {
            lt: 10000
          }
        }),
      }
    });
    return new Response(JSON.stringify({ data: response, total: total }), { status: 200 });

  } catch (error) {
    console.error("Error fetching data:", error);
    return new Response("Failed to fetch data", { status: 500 });
  }
}