// electron/controllers/magazines.ts
import { ipcMain } from "electron";
import { getMagazines, addMagazine } from "../../services/magazines";
import { Magazine } from "../../types";

export function registerMagazineHandlers() {
  ipcMain.handle("magazines:get", () => getMagazines());
  ipcMain.handle("magazines:add", (_e, magazine: Magazine) => addMagazine(magazine));
}