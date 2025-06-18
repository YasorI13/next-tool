import prisma from "@/lib/db";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params

        if (!id) return new Response("Failed to fetch data", { status: 500 });

        const response = await prisma.borrowForm.findUnique({
            where: {
                id: Number(id)
            },
            include: {
                ppl: {
                    include: {
                        pplink: true
                    }
                },
                person: true,
                WorkType: true,
                FormStatus: true
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
        const { inPlan, name, note, location, type, ppl, D01, D02, id_no, CostCtr, mmyyyy } = await request.json();
        if (inPlan) {
            const response = await prisma.borrowForm.update({
                where: {
                    id: Number(id)
                },
                data: {
                    name: name,
                    note: note,
                    ppl_id: Number(ppl),
                    D01: new Date(D01),
                    D02: new Date(D02),
                    workTypeId: Number(type),
                    id_no: id_no,
                    costCtr: CostCtr,
                    mmyyyy
                }
            });
            return new Response(JSON.stringify(response), { status: 200 });
        } else {
            const response = await prisma.borrowForm.update({
                where: {
                    id: Number(id)
                },
                data: {
                    inPlan: false,
                    name: name,
                    note: note,
                    location: location,
                    workTypeId: Number(type),
                    D01: new Date(D01),
                    D02: new Date(D02),
                    id_no: id_no,
                    costCtr: CostCtr,
                }
            });
            return new Response(JSON.stringify(response), { status: 200 });
        }
    } catch (error) {
        console.error("Error updating data:", error);
        return new Response("Failed to update data", { status: 500 });
    }
}


export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params // 'a', 'b', or 'c'
        const response = await prisma.borrowForm.delete({
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

