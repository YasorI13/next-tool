import prisma from "@/lib/db";
import { NextResponse } from "next/server";
import { getServerSession } from 'next-auth/next'
import { options } from "@/app/api/auth/[...nextauth]/options"



export async function GET() {
    try {
      const session = await getServerSession(options);
  
      if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
  
      // ดึง user พร้อม options และ costCtr
      const user = await prisma.person.findUnique({
        where: {
          id_no: String(session.user.email),
        },
        select: {
          id: true,
          person_thai_thai_firstname: true,
          person_thai_thai_lastname: true,
          id_no: true,
          costCtr: true,
          options: true,
        },
      });
  
      if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }
  
      const costCtr = await prisma.costCtr.findUnique({
        where: {
          CostCtr: user.costCtr || '', // fallback กัน null
        },
      });
  
      return NextResponse.json({
        userData: {
          id: user.id,
          name: user.person_thai_thai_firstname + ' ' + user.person_thai_thai_lastname,
          email: user.id_no,
        },
        options: user.options,
        costCtr,
      });
    } catch (error) {
      console.error('Error fetching data:', error);
      return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    }
  }