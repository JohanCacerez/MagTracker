// electron/controllers/magazines.ts
import { ipcMain } from "electron";
import {
  addMagazine,
  getInfAllMagazines,
  getSizeMagazine,
  maintenanceRegister,
} from "../../services/magazines";
import {
  MagazineData,
  MaintenanceMagazineData,
} from "../../../src/types/electron";

export function registerMagazineHandlers() {
  ipcMain.handle("magazines:add", (_e, magazine: MagazineData) =>
    addMagazine(magazine)
  );
  ipcMain.handle(
    "magazine:maintenance",
    (_e, magazine: MaintenanceMagazineData, userId: number) =>
      maintenanceRegister(magazine, userId)
  );
  ipcMain.handle("magazines:getSize", (_e, id: number) => getSizeMagazine(id));
  ipcMain.handle("magazines:getAllInf", () => getInfAllMagazines());
}
