import prisma from "@/lib/db";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest ,{ params }: { params: Promise<{ assetCustomListId: string }> }) {
    try {
        const { assetCustomListId } = await params
        const searchParams = request.nextUrl.searchParams;
        const Active = searchParams.get('Active') as string;
        const response = await prisma.toolsData.findMany({ 
            where: {
                assetCustomList: {
                  some: {
                    assetCustomListId: Number(assetCustomListId),
                  }
                },
                toolsStatus: Active ? Active : {}
              },
            include: {
                supClass: true,
                person: true
              }
            });
        return new Response(JSON.stringify(response), { status: 200 });
    } catch (error) {
        console.error("Error fetching data:", error);
        return new Response("Failed to fetch data", { status: 500 });
    }
}


