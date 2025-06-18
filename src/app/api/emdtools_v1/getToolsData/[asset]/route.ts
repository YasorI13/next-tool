import prisma from "@/lib/db";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest ,{ params }: { params: Promise<{ asset: string }> }) {
    try {
        const { asset } = await params
        const response = await prisma.toolsData.findUnique({ 
            where: {
                asset: asset
            },
            include: {
                assetCustomList: true,
                person: true
            } 
        });
        return new Response(JSON.stringify(response), { status: 200 });
    } catch (error) {
        console.error("Error fetching data:", error);
        return new Response("Failed to fetch data", { status: 500 });
    }
}


export async function PUT(request: NextRequest ,{ params }: { params: Promise<{ asset: string }> }) {
    try {
        const { asset } = await params
        const data = await request.json();
        const response = await prisma.toolsData.update({ 
            where: {
                asset: asset
            }, 
            data
        });
        return new Response(JSON.stringify(response), { status: 200 });
    } catch (error) {
        console.error("Error updating data:", error);
        return new Response("Failed to update data", { status: 500 });
    }
}


export async function DELETE(request: NextRequest ,{ params }: { params: Promise<{ asset: string }> }) {
    try {
        const { asset } = await params // 'a', 'b', or 'c'
        const response = await prisma.toolsData.delete({ 
            where: {
                asset: asset
            } 
        });
        return new Response(JSON.stringify(response), { status: 200 });
    } catch (error) {
        console.error("Error deleting data:", error);
        return new Response("Failed to delete data", { status: 500 });
    }
}

