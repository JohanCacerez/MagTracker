import { create } from "zustand";
import {
  MagazineData,
  MaintenanceMagazineData,
  MagazineAllData,
  MaintenanceDBRow,
} from "../types/electron";

interface State {
  reloadFlag: number; // cada vez que cambie, dispararemos un re-render
  triggerReload: () => void;
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
  getAllMagazines: () => Promise<{
    success: boolean;
    message: string;
    result: MagazineAllData[];
  }>;
  getAllMaintenanceMagazines: () => Promise<{
    success: boolean;
    message: string;
    result: MaintenanceDBRow[];
  }>;
}

export const useMagazineStore = create<State>((set) => ({
  reloadFlag: 0,
  triggerReload: () => set((state) => ({ reloadFlag: state.reloadFlag + 1 })),
  addMagazine: async (magazine) => {
    const result = await window.electronAPI.magazines.add(magazine);
    if (result.success) set((state) => ({ reloadFlag: state.reloadFlag + 1 }));
    return result;
  },
  maintenanceRegister: async (magazine, userId) => {
    const result = await window.electronAPI.magazines.maintenance(
      magazine,
      userId
    );
    if (result.success) set((state) => ({ reloadFlag: state.reloadFlag + 1 }));
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
  getAllMagazines: async () => {
    const result = await window.electronAPI.magazines.getAllMagazines();
    return result;
  },
  getAllMaintenanceMagazines: async () => {
    const result =
      await window.electronAPI.magazines.getAllMaintenanceMagazines();
    return result;
  },
}));
