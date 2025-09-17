import { ipcRenderer, contextBridge } from "electron";
import { UserData, LoginData } from "../src/types/electron";

contextBridge.exposeInMainWorld("electronAPI", {
  magazines: {
    get: () => ipcRenderer.invoke("magazines:get"),
    add: (magazine: { title: string; issue: string; publisher: string }) =>
      ipcRenderer.invoke("magazines:add", magazine),
  },
  users: {
    create: (user: UserData) => ipcRenderer.invoke("users:add", user),
    auth: (user: LoginData) => ipcRenderer.invoke("users:auth", user),
    delete: (userId: number) => ipcRenderer.invoke("users:delete", userId),
  },
});
