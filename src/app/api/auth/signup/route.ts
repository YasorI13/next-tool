// import bcrypt from 'bcrypt'
// const bcrypt = require('bcryptjs');
import bcrypt from 'bcryptjs'
import { NextRequest,NextResponse } from 'next/server'

import prisma from "@/lib/db";




export async function POST(request: NextRequest) {
  try {
    const { email, password, firstName, lastName, message ,costCtr } = await request.json();
    const hashedPassword = bcrypt.hashSync(password, 10);

    // ตรวจสอบว่า shopMember มีอยู่แล้วหรือไม่
    const existUser = await prisma.member.findUnique({
      where: { email },
    });
    if (existUser) {
      return NextResponse.json(
        { message: 'ไม่สามารถเพิ่มข้อมูลได้ มี user นี้อยู่แล้ว' },
        { status: 400 } // ใช้ 400 หรือ 409 ก็ได้
      );
    }

    // เริ่ม Transaction เพื่อทำให้สร้าง member กับ person พร้อมกัน
    const [newUser, newPerson] = await prisma.$transaction([
      prisma.member.create({
        data: {
          email,
          password: hashedPassword,
          firstName,
          lastName,
          message,
        },
      }),
      prisma.person.create({
        data: {
          id_no: email,
          person_thai_thai_firstname: firstName,
          person_thai_thai_lastname: lastName,
          person_level: '',
          costCtr: costCtr,
          em_stat: "2"
        },
      }),
    ]);

    return NextResponse.json({ message: 'User created', user: newUser, person: newPerson }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'User could not be created' }, { status: 400 });
  }
}