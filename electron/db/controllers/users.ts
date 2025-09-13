import { ipcMain } from "electron";
import { CreateUser } from "../../services/users";
import { UserData } from "../../../src/types/electron";

export function registerUserHandlers() {
  ipcMain.handle("users:add", (_e, user: UserData) => CreateUser(user));
}
