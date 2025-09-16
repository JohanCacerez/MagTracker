import { create } from "zustand";
import { UserData, AuthUserData, LoginData } from "../types/electron";

interface UserState {
  currentUser: AuthUserData | null;
  createUser: (user: UserData) => Promise<void>;
  authUser: (user: LoginData) => Promise<void>;
  logout: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  currentUser: null,

  createUser: async (user) => {
    const result = await window.electronAPI.users.create(user);
    if (!result.success) {
      throw new Error(result.message);
    }
    set({
      currentUser: { id: user.id, username: user.username, role: user.role },
    });
  },
  authUser: async (user) => {
    const result = await window.electronAPI.users.auth(user);
    if (!result.success) {
      throw new Error(result.message);
    }
    set({ currentUser: result.user! }); // el backend siempre devuelve AuthUserData
  },
  logout: () => set({ currentUser: null }),
}));
