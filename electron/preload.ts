import { ipcRenderer, contextBridge } from "electron";
import {
  UserData,
  LoginData,
  MagazineData,
  MaintenanceMagazineData,
} from "../src/types/electron";

contextBridge.exposeInMainWorld("electronAPI", {
  magazines: {
    maintenance: (magazine: MaintenanceMagazineData, idUser: number) =>
      ipcRenderer.invoke("magazine:maintenance", magazine, idUser),
    add: (magazine: MagazineData) =>
      ipcRenderer.invoke("magazines:add", magazine),
    getSize: (id: number) => ipcRenderer.invoke("magazines:getSize", id),
  },
  users: {
    create: (user: UserData) => ipcRenderer.invoke("users:add", user),
    auth: (user: LoginData) => ipcRenderer.invoke("users:auth", user),
    delete: (userId: number) => ipcRenderer.invoke("users:delete", userId),
    changePassword: (
      userId: number,
      oldPassword: string,
      newPassword: string
    ) =>
      ipcRenderer.invoke(
        "users:changePassword",
        userId,
        oldPassword,
        newPassword
      ),
  },
});
