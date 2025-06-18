import prisma from "@/lib/db";

export async function GET() {
    try {
        const response = await prisma.borrowFormStatus.findMany({});
        return new Response(JSON.stringify(response), { status: 200 });
    } catch (error) {
        console.error("Error fetching data:", error);
        return new Response("Failed to fetch data", { status: 500 });
    }
}