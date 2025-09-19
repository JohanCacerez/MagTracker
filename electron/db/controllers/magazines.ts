// electron/controllers/magazines.ts
import { ipcMain } from "electron";
import { addMagazine } from "../../services/magazines";
import { MagazineData } from "../../../src/types/electron";

export function registerMagazineHandlers() {
  ipcMain.handle("magazines:add", (_e, magazine: MagazineData) =>
    addMagazine(magazine)
  );
}
