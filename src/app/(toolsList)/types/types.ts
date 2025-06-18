import { assetCustomList, BorrowForm, BorrowFormStatus, BorrowItem, CostCtr, person, ppl, pplink, SupClass, ToolsData, toolsplan, WorkType } from "@prisma/client";

export interface TimelineEvent {
  id: number;
  title: string;
  start: string;
  end: string;
  equipment: string;
  color?: string;
}

export interface PPLTimelineEvent {
  title: string;
  start: string;
  end: string;
  id: number;
  color?: string;
}

export interface TimelineProps {
  events: TimelineEvent[];
}

export interface assettList {
  asset: string;
}

export interface CostCtrlist {
  CostCtrlist : CostCtr[]
}

export interface assetCustomListEx extends assetCustomList {
  costCtrs: CostCtr
}




export interface ToolsDataEx extends ToolsData {
  assetCustomList: assetCustomList[];
  supClass: SupClass;
  person : person
}

export interface ToolsDataEx2 extends ToolsData {
  supClass: SupClass;
  person : person;
}


// mantine 

  // select
export  interface selectItem {
    value: string;
    label: string;
}





export interface pplEx extends ppl {
  pplink : pplink
}



export interface BorrowFormEx extends BorrowForm {
  ppl : pplEx
  person : person
  WorkType : WorkType
  FormStatus : BorrowFormStatus
}


export interface BorrowItemEx extends BorrowItem {
  tool : ToolsDataEx
  person : person
}



export interface toolplanEx extends toolsplan {
  ToolsData: ToolsData;
  ppl: pplEx;
}





