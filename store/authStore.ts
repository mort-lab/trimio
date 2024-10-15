import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const API_URL = "http://192.168.1.35:3003";
// Make sure this matches your actual IP and port

interface AuthState {
  user: any;
  accessToken: string | null;
  refreshToken: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (
    email: string,
    username: string,
    password: string,
    phone: string
  ) => Promise<void>;
  refreshAccessToken: () => Promise<void>;
  logout: () => Promise<void>;
  initializeAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  refreshToken: null,

  login: async (email, password) => {
    try {
      console.log(`Attempting to login with email: ${email}`);
      console.log(`API URL: ${API_URL}`);

      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });

      console.log("Login response:", response.data);

      const { access_token, refresh_token, user } = response.data;

      set({ user, accessToken: access_token, refreshToken: refresh_token });

      await AsyncStorage.setItem("accessToken", access_token);
      await AsyncStorage.setItem("refreshToken", refresh_token);
      await AsyncStorage.setItem("user", JSON.stringify(user));
    } catch (error) {
      console.error("Login error:", error);
      if (axios.isAxiosError(error)) {
        console.error("Axios error details:", error.response?.data);
        console.error("Axios error status:", error.response?.status);
        console.error("Axios error headers:", error.response?.headers);
      }
      throw error;
    }
  },

  initializeAuth: async () => {
    try {
      const [user, accessToken, refreshToken] = await Promise.all([
        AsyncStorage.getItem("user"),
        AsyncStorage.getItem("accessToken"),
        AsyncStorage.getItem("refreshToken"),
      ]);

      if (user && accessToken && refreshToken) {
        set({ user: JSON.parse(user), accessToken, refreshToken });
        console.log("Auth initialized with stored data");
      } else {
        console.log("No stored auth data found");
      }
    } catch (error) {
      console.error("Error initializing auth:", error);
    }
  },

  register: async (email, username, password, phone) => {
    try {
      console.log(`Attempting to register with email: ${email}`);

      const response = await axios.post(`${API_URL}/auth/register`, {
        email,
        username,
        password,
        phone,
        role: "CLIENT",
      });

      console.log("Register response:", response.data);

      const { access_token, refresh_token, userId } = response.data;

      set({
        user: userId,
        accessToken: access_token,
        refreshToken: refresh_token,
      });

      await AsyncStorage.setItem("accessToken", access_token);
      await AsyncStorage.setItem("refreshToken", refresh_token);
      await AsyncStorage.setItem(
        "user",
        JSON.stringify({ id: userId, email, username })
      );
    } catch (error) {
      console.error("Register error:", error);
      if (axios.isAxiosError(error)) {
        console.error("Axios error details:", error.response?.data);
        console.error("Axios error status:", error.response?.status);
        console.error("Axios error headers:", error.response?.headers);
      }
      throw error;
    }
  },

  refreshAccessToken: async () => {
    try {
      const refreshToken = await AsyncStorage.getItem("refreshToken");

      if (refreshToken) {
        console.log("Attempting to refresh access token");

        const response = await axios.post(`${API_URL}/auth/refresh-token`, {
          refreshToken,
        });

        console.log("Refresh token response:", response.data);

        const { access_token } = response.data;
        set({ accessToken: access_token });
        await AsyncStorage.setItem("accessToken", access_token);
      } else {
        console.log("No refresh token found");
      }
    } catch (error) {
      console.error("Refresh token error:", error);
      if (axios.isAxiosError(error)) {
        console.error("Axios error details:", error.response?.data);
        console.error("Axios error status:", error.response?.status);
        console.error("Axios error headers:", error.response?.headers);
      }
      throw error;
    }
  },

  logout: async () => {
    try {
      console.log("Logging out user");
      set({ user: null, accessToken: null, refreshToken: null });
      await AsyncStorage.removeItem("accessToken");
      await AsyncStorage.removeItem("refreshToken");
      await AsyncStorage.removeItem("user");
      console.log("Logout successful");
    } catch (error) {
      console.error("Logout error:", error);
    }
  },
}));
