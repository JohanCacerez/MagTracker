import { create } from "zustand";
import { MagazineData, MaintenanceMagazineData } from "../types/electron";

interface State {
  addMagazine: (
    magazine: MagazineData
  ) => Promise<{ success: boolean; message: string }>;
  maintenanceRegister: (
    magazine: MaintenanceMagazineData,
    userId: number
  ) => Promise<{ success: boolean; message: string }>;
}

export const useMagazineStore = create<State>(() => ({
  addMagazine: async (magazine) => {
    const result = await window.electronAPI.magazines.add(magazine);
    return result;
  },
  maintenanceRegister: async (magazine, userId) => {
    const result = await window.electronAPI.magazines.maintenance(
      magazine,
      userId
    );
    return result;
  },
}));
