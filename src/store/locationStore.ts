import { create } from "zustand";
import { LocationData } from "../types/location";

interface LocationStore {
  locations: LocationData[];
  addLocation: (location: LocationData) => void;
  updateLocation: (location: LocationData) => void;
  setLocations: (locations: LocationData[]) => void;
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
  setLocations: (locations) =>
    set(() => {
      localStorage.setItem("locations", JSON.stringify(locations));
      return { locations };
    }),
}));
