"use client";
import React from 'react'
import { assetCustomListEx, ToolsDataEx2} from '../types/types';
import { fetcher } from "@/services/http-service";
import useSWR from "swr";
import Loading from '@/app/loading';
import Error from '@/app/error';
import { Timeline } from './Timeline';

type Props = {
    assetCustomListId : string;
}

function ToolsCalendarOnGroup({assetCustomListId}: Props) {
  const {
    data: toolsData,
    error: toolsError,
    isLoading: toolsLoading,
  } = useSWR(
    assetCustomListId
      ? `emdtools_v1/toolsIngrouplist/${assetCustomList.assetCustomListId}`
      : null,
    fetcher
  );

  if (toolsError)
    return (
      <div>
        <Error />
      </div>
    );
  if (toolsLoading)
    return (
      <div>
        <Loading />
      </div>
    );

  const equipment = toolsData.map((item : ToolsDataEx2) => item.asset);
  return (
    <div></div>
  )
}

export default ToolsCalendarOnGroup