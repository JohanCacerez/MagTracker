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
  getSize: (
    id: number
  ) => Promise<{ success: boolean; message: string; size?: string }>;
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
  getSize: async (id) => {
    const result = await window.electronAPI.magazines.getSize(id);
    return result;
  },
}));
