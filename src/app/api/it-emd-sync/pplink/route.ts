// app/api/sync-pplink/route.ts
import { NextResponse } from 'next/server';
import prisma from "@/lib/db";

export async function GET() {
  const url = 'https://it-emd.egat.co.th/emd_system/buf3/pages/api_pplink.php';

  try {
    const res = await fetch(url);
    const json = await res.json();

    if (json.status !== 'success') {
      return NextResponse.json({ error: 'Invalid response' }, { status: 500 });
    }

    for (const item of json.data) {
      const data = {
        name: item.P01,
        SapCode: item.P02,
        MMSCode: item.P04,
        power: item.P04 && item.P04 !== '-' ? parseInt(item.P04) : null,
        P_type: item.P_type || "PRIV",
        In_type: item.In_type || "in",
      };

      // upsert เพื่อไม่ให้ซ้ำกันที่ SapCode
      await prisma.pplink.upsert({
        where: { SapCode: data.SapCode },
        update: data,
        create: data,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Sync failed:', error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
