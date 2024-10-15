import axios from "axios";
import { InitialDataResponse, SaakhiResponse } from "@/types";

const API_URL = import.meta.env.VITE_API_URL;

export const fetchInitialData = async (
  lastReadSaakhiId: string | null,
  likedSaakhis: string[],
  bookmarkedSaakhis: string[]
) => {
  console.log("test");
  const response = await axios.post<InitialDataResponse>(
    `${API_URL}/initial-data`,
    {
      lastReadSaakhiId,
      likedSaakhis,
      bookmarkedSaakhis,
    }
  );
  return response.data;
};

export const fetchSaakhiById = async (id: string) => {
  const response = await axios.get<SaakhiResponse>(`${API_URL}/saakhis/${id}`);
  return response.data;
};
