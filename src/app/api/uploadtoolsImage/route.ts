import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import sharp from "sharp";

// ฟังก์ชันสำหรับสร้างชื่อไฟล์สุ่ม 8 ตัวอักษร
function generateRandomFileName() {
  return Math.random().toString(36).substring(2, 10); // สุ่มชื่อไฟล์ 8 ตัวอักษร
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    if (!file) {
      return new NextResponse("No file uploaded", { status: 400 });
    }

    // ตรวจสอบว่าไฟล์ที่อัปโหลดเป็นรูปภาพหรือไม่
    const allowedImageTypes = ["image/jpeg", "image/png", "image/gif" , "image/webp"];
    if (!allowedImageTypes.includes(file.type)) {
      return new NextResponse("Invalid file type. Only images are allowed.", { status: 400 });
    }

    // ตรวจสอบขนาดไฟล์ว่าไม่เกิน 6MB
    const maxSize = 6 * 1024 * 1024; // 6MB ในหน่วยไบต์
    if (file.size > maxSize) {
      return NextResponse.json( {error : "ไฟล์มีขนาดใหญ่เกินไป"}, {status:400 });
    }

    const uploadDir = path.join(process.cwd(), "uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // สร้างชื่อไฟล์ใหม่แบบสุ่มและตรวจสอบว่าไฟล์นามสกุลเดิมคืออะไร
    // สร้างชื่อไฟล์ใหม่แบบสุ่มด้วยนามสกุล .webp
    const randomFileName = `${generateRandomFileName()}.webp`;
    const filePath = path.join(uploadDir, randomFileName);

    // แปลงรูปภาพเป็น .webp ด้วย sharp
    await sharp(buffer)
      .webp({ quality: 80 }) // คุณสามารถปรับคุณภาพของภาพได้
      .toFile(filePath);


    // return NextResponse.json(
    //   { message: "เพิ่มข้อมูลสำเร็จ", data: { path: `/uploads/${randomFileName}` } },
    //   { status: 200 }
    // );
    return NextResponse.json(
      { message: "เพิ่มข้อมูลสำเร็จ", data: { path: `${randomFileName}` } },
      { status: 200 }
    );
  } catch (error) {
    console.error("Upload error:", error);
    return new NextResponse("Error uploading file", { status: 500 });
  }
}
