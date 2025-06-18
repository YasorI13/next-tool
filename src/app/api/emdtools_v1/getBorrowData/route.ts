import prisma from "@/lib/db";
import { NextRequest } from "next/server";


export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const CostCtr = searchParams.get('CostCtr') as string;
    const page = Number(searchParams.get('page')) || 1;
    const pageSize = Number(searchParams.get('pageSize')) || 999999;
    let borrowStatusId = searchParams.get('borrowStatusId');
    if (!borrowStatusId || borrowStatusId === 'null' || borrowStatusId === 'undefined') {
      borrowStatusId = '';
    }

    if (CostCtr) {
      if (CostCtr.length !== 7) return new Response("Failed to fetch data", { status: 500 });
      const response = await prisma.borrowForm.findMany({
        where: {
          costCtr: CostCtr,
          FormStatusId: borrowStatusId ? Number(borrowStatusId) : {}
        },
        skip: (page - 1) * pageSize,
        take: pageSize,
        include: {
          ppl: {
            include: {
              pplink: true
            }
          },
          person: true,
          WorkType: true,
          FormStatus: true,
        }
      });

      const total = await prisma.borrowForm.count({
        where: {
          costCtr: CostCtr,
          FormStatusId: borrowStatusId ? Number(borrowStatusId) : {}
        }
      });

      return new Response(JSON.stringify({ data: response, total: total }), { status: 200 });
    }


    const response = await prisma.borrowForm.findMany({
      where: {
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
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
    const total = await prisma.borrowForm.count({
      where: {
      }
    });
    return new Response(JSON.stringify({ data: response, total: total }), { status: 200 });

  } catch (error) {
    console.error("Error fetching data:", error);
    return new Response("Failed to fetch data", { status: 500 });
  }
}


export async function POST(request: NextRequest) {
  try {
    const { inPlan, name, note, location, type, ppl, D01, D02, id_no, CostCtr, mmyyyy } = await request.json();

    if (inPlan) {
      const response = await prisma.borrowForm.create({
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
      const response = await prisma.borrowForm.create({
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
    console.error("Error creating data:", error);
    return new Response("Failed to create data", { status: 500 });
  }
}



