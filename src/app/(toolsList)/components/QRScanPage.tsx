// app/scan/page.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { Box, Text, Loader } from '@mantine/core';
import { Html5QrcodeScanner } from 'html5-qrcode';

export default function QRScanPage() {
  const [result, setResult] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current && !result) {
      const scanner = new Html5QrcodeScanner('reader', { fps: 10, qrbox: 250 }, false);
      scanner.render(
        (decodedText) => {
          setResult(decodedText);
          scanner.clear();
        },
        (error) => {
          console.warn(error);
        }
      );
    }
  }, [result]);

  useEffect(() => {
    if (result) {
      fetch(`/api/search?pplink=${encodeURIComponent(result)}`)
        .then((res) => res.json())
        .then((data) => setData(data));
    }
  }, [result]);

  return (
    <Box>
      <Text>QR Scanner</Text>
      <div id="reader" ref={ref} />
      {result && <Text>Scanned: {result}</Text>}
      {data ? (
        <Box>
          <Text>Name: {data.name}</Text>
          <Text>SapCode: {data.SapCode}</Text>
          {/* แสดงข้อมูลอื่นเพิ่มเติม */}
        </Box>
      ) : result ? (
        <Loader />
      ) : null}
    </Box>
  );
}
