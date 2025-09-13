import { ipcRenderer, contextBridge } from "electron";

contextBridge.exposeInMainWorld("electronAPI", {
  magazines: {
    get: () => ipcRenderer.invoke("magazines:get"),
    add: (magazine: { title: string; issue: string; publisher: string }) =>
      ipcRenderer.invoke("magazines:add", magazine),
  },
  users: {
    create: (user: {
      id: number;
      username: string;
      password: string;
      role: string;
    }) => ipcRenderer.invoke("users:add", user),
  },
});
