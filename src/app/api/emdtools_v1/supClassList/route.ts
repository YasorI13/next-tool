import prisma from "@/lib/db";
import { NextRequest } from "next/server";




export async function GET(request:NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;

        const AsstSupNo = searchParams.get('AsstSupNo') as string;
        const CostCtr = searchParams.get('CostCtr') as string;
        
        if(CostCtr) {
            if( CostCtr.length !== 7) return new Response("Failed to fetch data", { status: 500 });
            const response = await prisma.supClass.findMany({
                where: {
                    toolsData: {
                        some: {
                            costCtrId: CostCtr
                        }
                    },
                    AsstSupNo: AsstSupNo ? {
                        contains: AsstSupNo
                    } : undefined
                }
            });

            return new Response(JSON.stringify(response), { status: 200 });
        }

        const response = await prisma.supClass.findMany({
            where: {
                toolsData: {
                    some: {
                        
                    }
                },
                AsstSupNo: AsstSupNo ? {
                    contains: AsstSupNo
                } : undefined
            }
        });

        return new Response(JSON.stringify(response), { status: 200 });
    } catch (error) {
        console.error("Error fetching data:", error);
        return new Response("Failed to fetch data", { status: 500 });
    }
}