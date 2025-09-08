import axios from "axios";
import { useAuth } from "@clerk/clerk-react";

export const useApi = () => {
  const { getToken } = useAuth();

  const apiPrivate = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
  });

  apiPrivate.interceptors.request.use(async (config) => {
    const token = await getToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  const apiPublic = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
  });

  return { apiPrivate, apiPublic, token: getToken };
};
