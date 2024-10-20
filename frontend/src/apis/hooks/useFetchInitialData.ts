import { InitialDataResponse } from "@/types";
import useFetch from "../useFetch";

export const useFetchInitialData = (
  lastReadSaakhiId: string | null,
  likedSaakhis: string[],
  bookmarkedSaakhis: string[]
) => {
  return useFetch<InitialDataResponse>(`/misc/initial-data`, {
    params: {
      lastReadSaakhiId,
      likedSaakhiIds: likedSaakhis,
      bookmarkedSaakhiIds: bookmarkedSaakhis,
    },
  });
};
