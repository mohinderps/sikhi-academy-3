import api from "./client";
import { AxiosError, AxiosRequestConfig } from "axios";
import useSWR from "swr";

const useFetch = <T>(url: string | null, options: AxiosRequestConfig = {}) => {
  const fetcher = async (url: string) => {
    const response = await api.get(url, options);
    return response.data;
  };

  return useSWR<T, AxiosError>(url, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
};

export default useFetch;
