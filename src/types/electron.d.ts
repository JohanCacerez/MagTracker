//Usuarios
export interface UserData {
  id: number;
  username: string;
  password: string;
  role: string;
}

export interface LoginData {
  id: number;
  password: string;
}
export interface AuthUserData {
  id: number;
  username: string;
  role: string;
}

export interface UsersAPI {
  create: (user: UserData) => Promise<{ success: boolean; message: string }>;
  auth: (user: LoginData) => Promise<{
    success: boolean;
    message: string;
    user?: AuthUserData;
  }>;
  delete: (userId: number) => Promise<{ success: boolean; message: string }>;
}

// Extiende window
declare global {
  interface Window {
    electronAPI: {
      magazines: MagazinesAPI;
      users: UsersAPI;
    };
  }
}
