import { create } from "zustand";
import { LocationData } from "../types/location";

interface LocationStore {
  locations: LocationData[];
  addLocation: (location: LocationData) => void;
  updateLocation: (location: LocationData) => void;
  deleteLocation: (id: string) => void;
  setLocations: (locations: LocationData[]) => void;
  rehydrate: () => void;
}
const isBrowser = typeof window !== "undefined";
export const useLocationStore = create<LocationStore>((set) => ({
  locations: [],
  addLocation: (location) =>
    set((state) => {
      const updated = [...state.locations, location];
      if (isBrowser) {
        localStorage.setItem("locations", JSON.stringify(updated));
      }
      return { locations: updated };
    }),
  updateLocation: (location) =>
    set((state) => {
      const updated = state.locations.map((loc) =>
        loc.id === location.id ? location : loc
      );
      if (isBrowser) {
        localStorage.setItem("locations", JSON.stringify(updated));
      }
      return { locations: updated };
    }),
  deleteLocation: (id) =>
    set((state) => {
      const updated = state.locations.filter((loc) => loc.id !== id);
      if (isBrowser) {
        localStorage.setItem("locations", JSON.stringify(updated));
      }
      return { locations: updated };
    }),
  setLocations: (locations) =>
    set(() => {
      if (isBrowser) {
        localStorage.setItem("locations", JSON.stringify(locations));
      }
      return { locations };
    }),
  rehydrate: () => {
    if (!isBrowser) return;
    const data = localStorage.getItem("locations");
    if (data) {
      set({ locations: JSON.parse(data) });
    }
  },
}));
