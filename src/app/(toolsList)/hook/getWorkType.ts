import { fetcher } from "@/services/http-service";
import useSWR from "swr";

export function useGetWorkType() {
  const { data: workType, isLoading: workTypeLoading } = useSWR(
    `emdtools_v1/getWorkType`,
    fetcher
  );

  return { workType, workTypeLoading };
}