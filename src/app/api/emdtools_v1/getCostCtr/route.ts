import prisma from "@/lib/db";
import { NextRequest } from "next/server";




export async function GET(request:NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const costCtr = searchParams.get('costCtr') as string;
        const haschild = searchParams.get('hachild') as string;
        const hasAll = searchParams.get('hasAll') as string;

        if(costCtr.length !== 7) return new Response("Failed to fetch data", { status: 500 });

        if(haschild === 'true' && costCtr[7] === '0') {
            const response = await prisma.costCtr.findMany({
                where: {
                    CostCtr : {
                        startsWith: hasAll === 'true' ? costCtr.substring(0, 4) : costCtr.substring(0, 6)
                    },
                }
            });

            return new Response(JSON.stringify(response), { status: 200 });
        }
        const response = await prisma.costCtr.findMany({
            where: {
                CostCtr : costCtr
            }
        });

        return new Response(JSON.stringify(response), { status: 200 });
    } catch (error) {
        console.error("Error fetching data:", error);
        return new Response("Failed to fetch data", { status: 500 });
    }
}