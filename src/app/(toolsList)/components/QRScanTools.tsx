"use client";

import { useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";
import { Box, Text, Loader, Center } from "@mantine/core";
import { http } from "@/services/http-service";
import { notifications } from "@mantine/notifications";

type Props = {
  id: string;
  borrowItemMutate: () => void;
};
export default function QRScanTools({ id, borrowItemMutate }: Props) {
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [scanning, setScanning] = useState(true);
  // const [value, setValue] = useState('');

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleScan = async (scannedData: any) => {
    if (scanning && scannedData && scannedData[0]?.rawValue) {
      // console.log(scannedData[0]?.rawValue);
      const rawValue = scannedData[0].rawValue;
      // console.log(rawValue);
      const scannedValue = rawValue.slice(4, 16); // ตัด 4 หน้า 2 ท้าย
      // console.log("scan" ,scannedValue);
      setResult(scannedValue);
      setScanning(false); // หยุดสแกนชั่วคราว
      setLoading(true);

      try {
        const res = await http.post(`/emdtools_v1/getBorrowItemData`, {
          borrowFormId: id,
          asset: scannedValue,
        });
        if (res.status === 200) {
          borrowItemMutate();
          // setValue(res.data);
          setLoading(false);
          setScanning(true); // เปิดให้สแกนอีกครั้ง
          notifications.show({
            title: "ผลการทำงาน",
            message: "เพิ่มรายการสำเร็จ",
            autoClose: 2500,
          });
        } else {
          borrowItemMutate();
          setLoading(false);
          setScanning(true); // เปิดให้สแกนอีกครั้ง
          
          notifications.show({
            title: "ผลการทำงาน",
            message: "ผิดพลาด",
            color: "red",
            autoClose: 2500,
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    }
  };


  return (
    <Box>

      {scanning && (
        <div className="flex justify-center items-center h-screen">
          <Scanner
            onScan={handleScan}
            onError={(error) => console.error("Scanner error:", error)}
          />
        </div>
      )}
      {result && <Text>Scanned: {result}</Text>}
      <Center>

      {loading && <Loader />}
      </Center>

    </Box>
  );
}
