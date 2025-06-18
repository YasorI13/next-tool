import prisma from "@/lib/db";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest ,{ params }: { params: Promise<{ assetCustomListId: string }> }) {
    try {
        const { assetCustomListId } = await params
        const response = await prisma.assetCustomList.findUnique({ 
            where: {
                assetCustomListId: Number(assetCustomListId)
            } 
        });
        return new Response(JSON.stringify(response), { status: 200 });
    } catch (error) {
        console.error("Error fetching data:", error);
        return new Response("Failed to fetch data", { status: 500 });
    }
}


export async function PUT(request: NextRequest ,{ params }: { params: Promise<{ assetCustomListId: string }> }) {
    try {
        const { assetCustomListId } = await params
        const data = await request.json();
        const response = await prisma.assetCustomList.update({ 
            where: {
                assetCustomListId: Number(assetCustomListId)
            }, 
            data
        });
        return new Response(JSON.stringify(response), { status: 200 });
    } catch (error) {
        console.error("Error updating data:", error);
        return new Response("Failed to update data", { status: 500 });
    }
}


export async function DELETE(request: NextRequest ,{ params }: { params: Promise<{ assetCustomListId: string }> }) {
    try {
        const { assetCustomListId } = await params // 'a', 'b', or 'c'
        const response = await prisma.assetCustomList.delete({ 
            where: {
                assetCustomListId: Number(assetCustomListId)
            } 
        });
        return new Response(JSON.stringify(response), { status: 200 });
    } catch (error) {
        console.error("Error deleting data:", error);
        return new Response("Failed to delete data", { status: 500 });
    }
}

