import axios from "axios";
import { InitialDataResponse, SaakhiResponse } from "@/types";

const API_URL = import.meta.env.VITE_API_URL;

export const fetchInitialData = async (
  lastReadSaakhiId: string | null,
  likedSaakhis: string[],
  bookmarkedSaakhis: string[]
) => {
  const response = await axios.post<InitialDataResponse>(
    `${API_URL}/misc/initial-data`,
    {
      lastReadSaakhiId,
      likedSaakhiIds: likedSaakhis,
      bookmarkedSaakhiIds: bookmarkedSaakhis,
    }
  );
  return response.data;
};

export const fetchSaakhiById = async (id: string) => {
  const response = await axios.get<SaakhiResponse>(`${API_URL}/saakhi/${id}`);
  return response.data;
};
