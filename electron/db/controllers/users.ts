import { ipcMain } from "electron";
import { AuthUser, CreateUser, DeleteUser } from "../../services/users";
import { UserData, LoginData } from "../../../src/types/electron";

export function registerUserHandlers() {
  ipcMain.handle("users:add", (_e, user: UserData) => CreateUser(user));
  ipcMain.handle("users:auth", (_e, user: LoginData) =>
    AuthUser(user.id, user.password)
  );
  ipcMain.handle("users:delete", (_e, userId: number) => DeleteUser(userId));
}
