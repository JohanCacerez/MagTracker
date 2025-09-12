// src/types/electron.d.ts
export interface Magazine {
  id: number;
  size: string;
  status: string;
}

export interface MagazinesAPI {
  get: () => Promise<Magazine[]>;
  add: (magazine: Magazine) => Promise<void>;
}

// Extiende window
declare global {
  interface Window {
    electronAPI: {
      magazines: MagazinesAPI;
      // aquí puedes agregar dollies, usuarios, etc.
    };
  }
}
