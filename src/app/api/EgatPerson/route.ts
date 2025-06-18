import { NextRequest,NextResponse } from "next/server";

interface ApiData {
    akey: string;
    aeno: string;
    eno: string;
    action: string;
    type: string;
}

interface ApiInput {
    egat_id : string
}

export async function POST(request:NextRequest){
    const username = (await request.json() as ApiInput); 

    // คุณสามารถรับ username จาก req.body หรือที่อื่น ๆ ตามต้องการ
    const apiUrl = "https://edms.egat.co.th/itpservice/sapdataapi2/sapdataapi2.php";

    const data: ApiData = {
        akey: process.env.akey || '',
        aeno: '596100',
        eno: '00'+ username.egat_id,
        action: 'GetEmployeeByEmpNo',
        type: 'json'
    };

    const formData = new FormData();
    for (const key in data) {
        formData.append(key, data[key as keyof ApiData]);
    }

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            body: formData,
            // credentials: 'include' // if you need to include cookies
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const user = await response.json()
        return NextResponse.json(user);

    } catch (error) {
        console.error('Fetch error:', error);
        return NextResponse.json({ error: 'An error occurred while fetching data' });
    }
}



