import prisma from "@/lib/db";
import { NextRequest } from "next/server";


export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    // const CostCtr = searchParams.get('CostCtr') as string;
    const borrowFormId = searchParams.get('borrowFormId') as string;
    const page = Number(searchParams.get('page')) || 1;
    const pageSize = Number(searchParams.get('pageSize')) || 999999;

    if (borrowFormId) {
      const response = await prisma.borrowItem.findMany({
        where: {
          borrowFormId: Number(borrowFormId)
        },
        skip: (page - 1) * pageSize,
        take: pageSize,
        include: {
          tool: {
            include:{
              supClass : true,
              person : true
            }
          },


        }
      });

      const total = await prisma.borrowItem.count({
        where: {
          borrowFormId: Number(borrowFormId)
        }
      });
      return new Response(JSON.stringify({ data: response, total: total }), { status: 200 });
    }

    const response = await prisma.borrowItem.findMany({
      where: {
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
      include: {
          tool: {
            include:{
              supClass : true,
            }
          }
        }
    });
    const total = await prisma.borrowItem.count({
      where: {
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
    const { borrowFormId, asset } = await request.json();
    const olddata = await prisma.borrowItem.findMany({
      where: {
        borrowFormId : Number(borrowFormId),
        asset: asset
      }
    })

    const assetData = await prisma.toolsData.findUnique({
      where: {
        asset: asset
      }
    })

    if (assetData?.toolsStatus !== "Active") {
      return new Response(JSON.stringify(assetData), { status: 201 });
    }

    if (olddata.length > 0) {
      return new Response(JSON.stringify(olddata), { status: 200 });
    }
    const response = await prisma.borrowItem.create({
      data: {
        borrowFormId: Number(borrowFormId),
        asset: asset,
      }
    });
    return new Response(JSON.stringify(response), { status: 200 });

  } catch (error) {
    console.error("Error creating data:", error);
    return new Response("Failed to create data", { status: 500 });
  }
}



