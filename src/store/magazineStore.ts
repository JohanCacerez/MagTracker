import { create } from "zustand";
import { MagazineData } from "../types/electron";

interface State {
  addMagazine: (
    magazine: MagazineData
  ) => Promise<{ success: boolean; message: string }>;
}

export const useMagazineStore = create<State>(() => ({
  addMagazine: async (magazine) => {
    const result = await window.electronAPI.magazines.add(magazine);
    return result;
  },
}));
