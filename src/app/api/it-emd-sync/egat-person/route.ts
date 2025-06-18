// app/api/sync-pplink/route.ts
import { NextResponse } from 'next/server';
import prisma from "@/lib/db";



type Data = {
  "person_code"   : string,
  "person_thai_prefix_name": string,
  "person_thai_thai_firstname": string,
  "person_thai_thai_lastname": string,
  "person_eng_name": string,
  "person_type": string,
  "person_level": string,
  "person_mail_address": string,
  "person_gender": string,
  "person_employment_date": string,
  "person_admission_date": string,
  "person_retirement_date": string,
  "person_position": string,
  "position_key_without_level": string,
  "person_position_period_year": string,
  "person_level_period_year": string,
  "person_is_boss_main_org": string,
  "main_org_code": string,
  "main_org_cost_center_code": string,
}
export async function GET() {
  try {
    const res = await fetch(`https://hrapi.egat.co.th/api/v1/persons?filter[MainOrganizationName]=อบฟ.&filter[IsProject]=false`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${process.env.EGAT_HR_Bearer}`
      }
    });

    const json = await res.json();
    if (res.status !== 200) {
      return NextResponse.json({ error: 'Invalid response' }, { status: 500 });
    }

    for (const item of json.data as Data[]) {
      const data = {
        id_no                       : item.person_code.slice(2),
        person_thai_prefix_name     : item.person_thai_prefix_name,
        person_thai_thai_firstname  : item.person_thai_thai_firstname,
        person_thai_thai_lastname   : item.person_thai_thai_lastname,
        person_eng_name             : item.person_eng_name,
        person_type                 : item.person_type,
        person_level                : item.person_level,
        person_mail_address         : item.person_mail_address,
        person_gender               : item.person_gender,
        person_employment_date      : item.person_employment_date ? (new Date(item.person_employment_date.split(' ')[0] + "T00:00:00.000Z")) : null,
        person_admission_date       : item.person_admission_date ? (new Date(item.person_admission_date.split(' ')[0] + "T00:00:00.000Z")) : null,
        person_retirement_date      : item.person_retirement_date ? (new Date(item.person_retirement_date.split(' ')[0] + "T00:00:00.000Z")) : null,
        person_position             : item.person_position,
        position_key_without_level  : item.position_key_without_level,
        person_position_period_year : Number(item.person_position_period_year),
        person_level_period_year    : Number(item.person_level_period_year),
        person_is_boss_main_org     : Boolean(item.person_is_boss_main_org),
        main_org_code               : item.main_org_code,
        costCtr                     : item.main_org_cost_center_code ,
      };

      // upsert เพื่อไม่ให้ซ้ำกันที่ SapCode
      await prisma.person.upsert({
        where: { id_no: data.id_no },
        create: data,
        update: data
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Sync failed:', error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
