import prisma from "@/lib/db";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const CostCtr = searchParams.get('CostCtr') as string;
    const page = Number(searchParams.get('page')) || 1;
    const pageSize = Number(searchParams.get('pageSize')) || 999999;

    if (CostCtr) {
      if (CostCtr.length !== 7) return new Response("Failed to fetch data", { status: 500 });
      const response = await prisma.assetCustomList.findMany({
        where: {
          CostCtr: CostCtr,
        },
        skip: (page - 1) * pageSize,
        take: pageSize,
      });

      const total = await prisma.assetCustomList.count({
        where: {
          CostCtr: CostCtr,
        }
      });

      return new Response(JSON.stringify({ data: response, total: total }), { status: 200 });
    }


    const response = await prisma.assetCustomList.findMany({
      where: {
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
    const total = await prisma.assetCustomList.count({
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
    const data = await request.json();
    const response = await prisma.assetCustomList.create({ data });
    return new Response(JSON.stringify(response), { status: 200 });
  } catch (error) {
    console.error("Error creating data:", error);
    return new Response("Failed to create data", { status: 500 });
  }
}