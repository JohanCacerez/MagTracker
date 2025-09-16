//Magazines
export interface Magazine {
  id: number;
  size: string;
  status: string;
}

// API para magazines
export interface MagazinesAPI {
  get: () => Promise<Magazine[]>;
  add: (magazine: Magazine) => Promise<void>;
}

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
