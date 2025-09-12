import { create } from "zustand";
import { Magazine } from "../types/electron";

interface State {
  magazines: Magazine[];
  loadMagazines: () => Promise<void>;
  addMagazine: (magazine: Magazine) => Promise<void>;
}

export const useMagazineStore = create<State>((set) => ({
  magazines: [],
  loadMagazines: async () => {
    const mags = await window.electronAPI.magazines.get();
    set({ magazines: mags });
  },
  addMagazine: async (magazine) => {
    await window.electronAPI.magazines.add(magazine);
    const mags = await window.electronAPI.magazines.get();
    set({ magazines: mags });
  },
}));
