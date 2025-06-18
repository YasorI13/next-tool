"use server";

import prisma from "@/lib/db";
import { getServerSession } from 'next-auth/next'
import { options } from "@/app/api/auth/[...nextauth]/options"

// import https from 'https';
// import { http } from "@/services/http-service";



export async function setPPLcolor(id: string, color: string) {
  try {
    const session = await getServerSession(options);
    if (!session) {
      return ({ status: 401, message: "กรุณาเข้าสู่ระบบ", });
    }

    const result = await prisma.ppl.update({
      where: {
        id: Number(id),
      },
      data: {
        color: color,
      },
    });

    if (!result) return ({ status: 404, message: "แก้ไขข้อมูลไม่สำเร็จ", });

    return ({ status: 200, message: "แก้ไขข้อมูลสำเร็จ", });



    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    // console.log(error);
    return ({ status: 404, message: "แก้ไขข้อมูลไม่สำเร็จ", });
  }
}