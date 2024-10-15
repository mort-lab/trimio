import { create } from "zustand";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocationStore } from "./locationStore";

const API_URL = "http://192.168.1.35:3003";

interface Barbershop {
  barbershopId: string;
  barbershopName: string;
  barbershopAddress: string;
  barbershopCity: string;
  barbershopState: string;
  barbershopZipCode: string;
  barbershopLatitude: number;
  barbershopLongitude: number;
  barbershopImages: string[];
  services: any[];
  barberProfiles: any[];
}

interface BarbershopState {
  barbershops: Barbershop[];
  isLoading: boolean;
  error: string | null;
  fetchNearbyBarbershops: (radiusKm?: number) => Promise<void>;
  initializeBarbershops: () => Promise<void>;
}

export const useBarbershopStore = create<BarbershopState>((set) => ({
  barbershops: [],
  isLoading: false,
  error: null,

  fetchNearbyBarbershops: async (radiusKm = 10) => {
    set({ isLoading: true, error: null });
    try {
      const accessToken = await AsyncStorage.getItem("accessToken");
      if (!accessToken) {
        throw new Error("No access token found");
      }

      const { location } = useLocationStore.getState();
      if (!location) {
        throw new Error("No user location found");
      }

      const { latitude, longitude } = location;

      const response = await axios.get(`${API_URL}/barbershops/nearby`, {
        params: {
          latitude,
          longitude,
          radiusKm,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      set({ barbershops: response.data, isLoading: false });
    } catch (error) {
      console.error("Error fetching nearby barbershops:", error);
      set({ error: error.message, isLoading: false });
    }
  },

  initializeBarbershops: async () => {
    try {
      const storedBarbershops = await AsyncStorage.getItem("barbershops");
      if (storedBarbershops) {
        set({ barbershops: JSON.parse(storedBarbershops) });
        console.log("Barbershops initialized with stored data");
      } else {
        console.log("No stored barbershop data found");
      }
    } catch (error) {
      console.error("Error initializing barbershops:", error);
    }
  },
}));
