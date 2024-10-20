import { SaakhiSummary } from "@/types";
import useFetch from "../useFetch";

export const useFetchAllSaakhiSummaries = (showSaakhiQueue: boolean = true) => {
  return useFetch<SaakhiSummary[]>(
    showSaakhiQueue ? `/saakhi/summaries` : null
  );
};
