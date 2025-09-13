import { create } from "zustand";
import { UserData } from "../types/electron";

interface UserState {
  currentUser: UserData | null;
  createUser: (user: UserData) => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
  currentUser: null,

  createUser: async (user) => {
    const result = await window.electronAPI.users.create(user);
    if (!result.success) {
      throw new Error(result.message);
    }
    set({ currentUser: user });
  },
}));
