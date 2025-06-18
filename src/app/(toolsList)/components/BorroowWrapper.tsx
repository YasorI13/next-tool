"use client";
import React, {useState } from 'react'
import BorrowData from './BorrowData';
import BorrowItemData from './BorrowItemData';
import { fetcher } from "@/services/http-service";
import useSWR from "swr";
import { BorrowFormEx } from '../types/types';
import Loading from '@/app/loading';

function BorroowWrapper({ id, CostCtr }: { id: string; CostCtr: string }) {
    const [refreshKey, setRefreshKey] = useState(0);
      const { data: borrowFormData, isLoading: borrowFormLoading } =
    useSWR<BorrowFormEx>(`emdtools_v1/getBorrowData/${id}?refreshKey=${refreshKey}`, fetcher);

  
  const handleDataUpdated = () => {
    setRefreshKey(prev => prev + 1) // เปลี่ยน key เพื่อ trigger re-render
  }

  if (borrowFormLoading || !borrowFormData) return <Loading />
  return (
    <>
      <BorrowData id={id} handleDataUpdated={handleDataUpdated} />
      <BorrowItemData id={id} CostCtr={CostCtr} refreshKey={refreshKey} borrowFormData={borrowFormData} handleDataUpdated={handleDataUpdated} />
    </>
  )
}

export default BorroowWrapper