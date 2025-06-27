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

export const useLocationStore = create<LocationStore>((set) => ({
  locations: [],
  addLocation: (location) =>
    set((state) => {
      const updated = [...state.locations, location];
      localStorage.setItem("locations", JSON.stringify(updated));
      return { locations: updated };
    }),
  updateLocation: (location) =>
    set((state) => {
      const updated = state.locations.map((loc) =>
        loc.id === location.id ? location : loc
      );
      localStorage.setItem("locations", JSON.stringify(updated));
      return { locations: updated };
    }),
  deleteLocation: (id) =>
    set((state) => {
      const updated = state.locations.filter((loc) => loc.id !== id);
      localStorage.setItem("locations", JSON.stringify(updated));
      return { locations: updated };
    }),
  setLocations: (locations) =>
    set(() => {
      localStorage.setItem("locations", JSON.stringify(locations));
      return { locations };
    }),
  rehydrate: () => {
    const data = localStorage.getItem("locations");
    if (data) {
      set({ locations: JSON.parse(data) });
    }
  },
}));
