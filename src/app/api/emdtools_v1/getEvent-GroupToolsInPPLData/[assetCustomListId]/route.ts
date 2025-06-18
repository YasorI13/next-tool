import prisma from "@/lib/db";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest, { params }: { params: Promise<{ assetCustomListId: string }> }) {
  try {
    const { assetCustomListId } = await params;
    // console.log("assetCustomListId:", assetCustomListId);
    const searchParams = request.nextUrl.searchParams;
    // const Active = searchParams.get('Active') as string;
    const month = searchParams.get('month');
    const year = searchParams.get('year');

    if (!assetCustomListId) {
      return new Response('Missing assetCustomListId', { status: 400 });
    }

    // 1. ดึง asset ที่มีอยู่ใน toolsData ก่อน
    const tools = await prisma.toolsData.findMany({
      where: {
        assetCustomList: {
          some: { assetCustomListId: Number(assetCustomListId) },
        },
        toolsStatus: "Active"
      },
      select: { asset: true }
    });

    const assetList = tools.map((t) => t.asset);

    // console.log("Asset List:", assetList);

    // 2. กรอง date ถ้ามีการส่ง month/year
    let dateFilter = {};
    if (month && year) {
      const monthNum = parseInt(month);
      const yearNum = parseInt(year);
      const startOfMonth = new Date(yearNum, monthNum - 1, 1);
      const endOfMonth = new Date(yearNum, monthNum, 0);
      dateFilter = {
        D01: { lte: endOfMonth },
        D02: { gte: startOfMonth }
      };
    }

    // 3. ดึงเฉพาะ toolsplan ที่ asset อยู่ใน assetList
    const toolsplan = await prisma.toolsplan.findMany({
      where: {
        asset: { in: assetList },
        ...dateFilter,
      },
      include: {
        ppl: { include: { pplink: true } },
        ToolsData: true,
      }
    });

    return new Response(JSON.stringify(toolsplan), { status: 200 });
  } catch (error) {
    console.error("Error fetching data:", error);
    return new Response("Failed to fetch data", { status: 500 });
  }
}



