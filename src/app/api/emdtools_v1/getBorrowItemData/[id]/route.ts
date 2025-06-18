import prisma from "@/lib/db";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params

        if (!id) return new Response("Failed to fetch data", { status: 500 });

        const response = await prisma.borrowItem.findUnique({
            where: {
                id: Number(id)
            },
            include: {
                borrowForm: true,
                tool: true
            }
        });
        return new Response(JSON.stringify(response), { status: 200 });
    } catch (error) {
        console.error("Error fetching data:", error);
        return new Response("Failed to fetch data", { status: 500 });
    }
}


export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params
        const { borrowFormId, asset, note , status , returnDate } = await request.json();

            const response = await prisma.borrowItem.update({
                where: {
                    id: Number(id)
                },
                data: {
                    borrowFormId: Number(borrowFormId),
                    asset: asset,
                    note: note ? note : null,
                    status: status,
                    returnDate: returnDate ? new Date(returnDate) : null
                }
            });
        return new Response(JSON.stringify(response), { status: 200 });
    } catch (error) {
        console.error("Error updating data:", error);
        return new Response("Failed to update data", { status: 500 });
    }
}


export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params // 'a', 'b', or 'c'
        const response = await prisma.borrowItem.delete({
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

