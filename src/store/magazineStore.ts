import { create } from "zustand";
import { MagazineData } from "../types/electron";

interface State {
  addMagazine: (magazine: MagazineData) => Promise<void>;
}

export const useMagazineStore = create<State>(() => ({
  addMagazine: async (magazine) => {
    await window.electronAPI.magazines.add(magazine);
  },
}));
