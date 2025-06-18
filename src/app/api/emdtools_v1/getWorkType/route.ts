import prisma from "@/lib/db";

export async function GET() {
    try {
        const workType = await prisma.workType.findMany({
        });
        return new Response(JSON.stringify(workType), { status: 200 });
    } catch (error) {
        console.error("Error fetching data:", error);
        return new Response("Failed to fetch data", { status: 500 });
    }
}