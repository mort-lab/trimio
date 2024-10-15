import { useAuthStore } from "../store/authStore";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const fetchWithAuth = async (
  url: string,
  options?: AxiosRequestConfig
) => {
  const { accessToken, refreshAccessToken } = useAuthStore.getState();

  let token = accessToken;

  // Si no hay accessToken válido, intenta obtener uno nuevo
  if (!token) {
    console.log("No access token found, attempting to refresh");
    await refreshAccessToken();
    token = await AsyncStorage.getItem("accessToken");
  }

  try {
    const response = await axios({
      url,
      ...options,
      headers: {
        ...options?.headers,
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (error.response?.status === 401) {
        await refreshAccessToken();
        token = await AsyncStorage.getItem("accessToken");

        return axios({
          url,
          ...options,
          headers: {
            ...options?.headers,
            Authorization: `Bearer ${token}`,
          },
        });
      }
    } else {
      throw error;
    }
  }
};
