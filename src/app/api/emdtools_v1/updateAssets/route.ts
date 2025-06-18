import { NextResponse } from 'next/server';
import prisma from "@/lib/db";
import { EgatAPI } from '@/app/(toolsList)/types/EgatAPItype';

const API_URL = 'https://finapi.egat.co.th:8443/apiman-gateway/AssetDataServiceQAS/SmartStore/1.0';
const API_KEY = '89fd3a0c-16a3-467a-9723-12ddb8893e22'; // ใส่ API Key ของคุณ



export async function GET() {
  try {
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'X-API-Key': API_KEY,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch data' }, { status: response.status });
    }

    const data = await response.json();

    for (const item of data) {

      const person = await prisma.person.findUnique({
        where: {
          id_no: String(item.persNo).slice(2),
        },
      })

      if (!person) {
        const res = await fetch(`https://hrapi.egat.co.th/api/v1/persons?filter[PersonCode]=${item.persNo}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${process.env.EGAT_HR_Bearer}`
          }
        });

        const json = await res.json();

        for (const item of json.data as EgatAPI[]) {
          const data = {
            id_no: item.person_code.slice(2),
            person_thai_prefix_name: item.person_thai_prefix_name,
            person_thai_thai_firstname: item.person_thai_thai_firstname,
            person_thai_thai_lastname: item.person_thai_thai_lastname,
            person_eng_name: item.person_eng_name,
            person_type: item.person_type,
            person_level: item.person_level,
            person_mail_address: item.person_mail_address,
            person_gender: item.person_gender,
            person_employment_date: item.person_employment_date ? (new Date(item.person_employment_date.split(' ')[0] + "T00:00:00.000Z")) : null,
            person_admission_date: item.person_admission_date ? (new Date(item.person_admission_date.split(' ')[0] + "T00:00:00.000Z")) : null,
            person_retirement_date: item.person_retirement_date ? (new Date(item.person_retirement_date.split(' ')[0] + "T00:00:00.000Z")) : null,
            person_position: item.person_position,
            position_key_without_level: item.position_key_without_level,
            person_position_period_year: Number(item.person_position_period_year),
            person_level_period_year: Number(item.person_level_period_year),
            person_is_boss_main_org: Boolean(item.person_is_boss_main_org),
            main_org_code: item.main_org_code,
            costCtr: item.main_org_cost_center_code,
          };

          // upsert เพื่อไม่ให้ซ้ำกันที่ SapCode
          await prisma.person.upsert({
            where: { id_no: data.id_no },
            create: data,
            update: data
          });
        }
      }
      // console.log(item);
      await prisma.toolsData.upsert({
        where: { asset: item.asset },
        update: {
          asset: item.asset,
          sNo: item.sNo,
          capDate: item.capDate,
          assetDescription: item.assetDescription,
          acquisVal: item.acquisVal,
          supClassId: item.subClass,
          rspCCtrId: item.rspCCtr,
          costCtrId: item.costCtr,
          phyLoc: item.phyLoc,
          typeName: item.typeName,
          licensePlate: item.licensePlate,
          manufactureOfAsset: item.manufactureOfAsset,
          serialNo: item.serialNo,
          ba: item.ba,
          inventoryNumber: item.inventoryNumber,
          personNo: String(item.persNo).slice(2),
          useType: item.useType,
        },
        create: {
          asset: item.asset,
          sNo: item.sNo,
          capDate: item.capDate,
          assetDescription: item.assetDescription,
          acquisVal: item.acquisVal,
          supClassId: item.subClass,
          rspCCtrId: item.rspCCtr,
          costCtrId: item.costCtr,
          phyLoc: item.phyLoc,
          typeName: item.typeName,
          licensePlate: item.licensePlate,
          manufactureOfAsset: item.manufactureOfAsset,
          serialNo: item.serialNo,
          ba: item.ba,
          inventoryNumber: item.inventoryNumber,
          personNo: String(item.persNo).slice(2),
          useType: item.useType,
          toolsStatus: "Active"
        },
      });
    }

    return NextResponse.json({ message: 'Data updated successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}


