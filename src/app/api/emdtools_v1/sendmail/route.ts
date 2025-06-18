import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

interface MailOptions {
    receivers: string[]; // เปลี่ยนชื่อ field เป็น plural เพื่อรองรับหลายคน
    subject: string;
    body: string;
}

import { getServerSession } from 'next-auth/next'
import { options } from "@/app/api/auth/[...nextauth]/options"

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(options)
        if (!session) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
            
        const data = await request.json() as MailOptions;
        // console.log(data);

        // ตั้งค่าการเชื่อมต่อ SMTP
        const transporter = nodemailer.createTransport({
            host: 'appsmtp.egat.co.th',
            port: 25,
            secure: false,
        });

        // แปลงอาร์เรย์ของ email ผู้รับเป็นสตริงที่คั่นด้วยเครื่องหมายจุลภาค
        const recipients = data.receivers.join(',');

        // ตั้งค่าการส่งอีเมล
        const mailOptions = {
            from: process.env.NEXTPUBLIC_EMAIL,  // อีเมลผู้ส่ง
            to: recipients,                     // อีเมลผู้รับ (หลายคน)
            subject: data.subject,              // หัวข้ออีเมล
            // text: data.body,                    // เนื้อหาในรูปแบบ text
            html: data.body, // รองรับ HTML เพื่อความสวยงามของเนื้อหา
        };

        // ส่งอีเมล
        await transporter.sendMail(mailOptions);
        console.log(`Email sent successfully${session.user.email} to: ${recipients}`);
        return NextResponse.json({ message: 'Emails sent successfully!' });
    } catch (error) {
        console.error('Emails could not be sent:', error);
        return NextResponse.json({ error: 'Emails could not be sent' }, { status: 500 });
    }
}
