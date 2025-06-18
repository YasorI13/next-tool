'use client';

import { useState } from 'react';
import { Scanner } from '@yudiel/react-qr-scanner';
import { Box, Text, Loader, Button } from '@mantine/core';
import {http } from "@/services/http-service";


export default function ScanPage() {
  const [result, setResult] = useState<string | null>(null);


  const [loading, setLoading] = useState(false);
  const [scanning, setScanning] = useState(true);
  const [value, setValue] = useState('');

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleScan = async (scannedData: any) => {
    if (scanning && scannedData && scannedData[0]?.rawValue) {
      // console.log(scannedData[0]?.rawValue);
      const  rawValue = scannedData[0].rawValue;
      // console.log(rawValue);
      const scannedValue = rawValue.slice(4, 16); // ตัด 4 หน้า 2 ท้าย
      // console.log("scan" ,scannedValue);
      setResult(scannedValue);
      setScanning(false); // หยุดสแกนชั่วคราว
      setLoading(true);

      try {
        const res = await http(`/emdtools_v1/getToolsData/${scannedValue}`);
        if(res.status === 200) {
          setValue(res.data);
          setLoading(false);
        }
      }
      catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    }
  };

  const handleRescan = () => {
    setResult(null);
    setValue('');
    setScanning(true); // เปิดให้สแกนอีกครั้ง
  };

  return (
    <Box>
      <Text>QR Scanner</Text>
      {scanning && (
        <Scanner
          onScan={handleScan}
          onError={(error) => console.error('Scanner error:', error)}
        />
      )}
      {result && <Text>Scanned: {result}</Text>}
      {loading && <Loader />}
      {value && (
        <Box className='overflow-x-auto'>
          <Button mt="md" onClick={handleRescan}>Scan Again</Button>
          {<pre>{JSON.stringify(value, null, 2)}</pre>}
        </Box>
      )}
    </Box>
  );
}
