import axios from "axios";
import { InitialDataResponse, SaakhiResponse } from "@/types";

const API_URL = "http://localhost:3000/api";

export const fetchInitialData = async (
  lastReadSaakhiId: string | null,
  likedSaakhis: string[],
  bookmakedSaakhis: string[]
) => {
  const response = await axios.post<InitialDataResponse>(
    `${API_URL}/initial-data`,
    {
      lastReadSaakhiId,
      likedSaakhis,
      bookmakedSaakhis,
    }
  );
  return response.data;
};

export const fetchSaakhiById = async (id: string) => {
  const response = await axios.get<SaakhiResponse>(`${API_URL}/saakhis/${id}`);
  return response.data;
};
