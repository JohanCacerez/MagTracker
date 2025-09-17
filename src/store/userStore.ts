import { create } from "zustand";
import { UserData, AuthUserData, LoginData } from "../types/electron";

interface UserState {
  currentUser: AuthUserData | null;
  createUser: (user: UserData) => Promise<void>;
  authUser: (user: LoginData) => Promise<void>;
  logout: () => void;
  deleteUser: (userId: number) => Promise<void>;
}

export const useUserStore = create<UserState>((set, get) => ({
  currentUser: null,

  createUser: async (user) => {
    const result = await window.electronAPI.users.create(user);
    if (!result.success) {
      throw new Error(result.message);
    }
  },
  authUser: async (user) => {
    const result = await window.electronAPI.users.auth(user);
    if (!result.success) {
      throw new Error(result.message);
    }
    set({ currentUser: result.user! }); // el backend siempre devuelve AuthUserData
  },
  deleteUser: async (userId: number) => {
    const currentUserId = get().currentUser?.id;
    if (userId === currentUserId) {
      throw new Error("No puedes eliminar el usuario activo");
    }
    const result = await window.electronAPI.users.delete(userId);
    if (!result.success) {
      throw new Error(result.message);
    }
  },
  logout: () => set({ currentUser: null }),
}));
