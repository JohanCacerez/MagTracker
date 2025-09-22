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
  getAllInf: () => Promise<{
    success: boolean;
    message: string;
    data?: {
      total_magazines: number;
      proximos_mtto: number;
      con_mtto: number;
      auditados: number;
      no_auditados: number;
      scrap: number;
    };
  }>;
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
  getAllInf: async () => {
    const result = await window.electronAPI.magazines.getAllInf();
    return result;
  },
}));
