import prisma from "@/lib/db";
import { toolsplan } from "@prisma/client";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest ,{ params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params ;
        const searchParams = request.nextUrl.searchParams;

        const month = searchParams.get('month');
        const year = searchParams.get('year');

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

        const response = await prisma.toolsplan.findUnique({ 
            where: {
                id: Number(id),
                ...dateFilter,
            },
            include: {
                ppl: {
                    include: {
                        pplink: true
                    }
                },
                ToolsData: true,
            }
        });
        return new Response(JSON.stringify(response), { status: 200 });
    } catch (error) {
        console.error("Error fetching data:", error);
        return new Response("Failed to fetch data", { status: 500 });
    }
}


export async function PUT(request: NextRequest ,{ params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params
        const data = await request.json() as toolsplan;
        const response = await prisma.toolsplan.update({ 
            where: {
                id: Number(id)
            }, 
            data : {
                ...data,
                D01: data.D01 ? new Date(data.D01) : undefined,
                D02: data.D02 ? new Date(data.D02) : undefined,
            }
        });
        return new Response(JSON.stringify(response), { status: 200 });
    } catch (error) {
        console.error("Error updating data:", error);
        return new Response("Failed to update data", { status: 500 });
    }
}



export async function DELETE(request: NextRequest ,{ params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params // 'a', 'b', or 'c'
        const response = await prisma.toolsplan.delete({ 
            where: {
                id: Number(id)
            } 
        });
        return new Response(JSON.stringify(response), { status: 200 });
    } catch (error) {
        console.error("Error deleting data:", error);
        return new Response("Failed to delete data", { status: 500 });
    }
}

