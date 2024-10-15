//store/locationStore.s
import { create } from "zustand";

interface LocationState {
  location: { latitude: number; longitude: number } | null;
  setLocation: (location: { latitude: number; longitude: number }) => void;
}

export const useLocationStore = create<LocationState>((set) => ({
  location: null,
  setLocation: (location) => set({ location }),
}));
