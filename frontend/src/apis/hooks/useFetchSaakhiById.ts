import { SaakhiResponse } from "@/types";
import useFetch from "../useFetch";

export const useFetchSaakhiById = (id: string) => {
  return useFetch<SaakhiResponse>(`/saakhi/${id}`);
};
