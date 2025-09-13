import { UserData } from "../../src/types/electron";

import { createRequire } from "module";
const require = createRequire(import.meta.url);
const bcrypt = require("bcrypt");
import db from "../db/index";

//Users
// backend - users.ts
export async function CreateUser(UserData: UserData) {
  try {
    const userIdExists = db
      .prepare("SELECT * FROM users WHERE id = ?")
      .get(UserData.id);

    if (userIdExists) {
      return { success: false, message: "El ID ya está en uso" };
    }

    if (!UserData.password || UserData.password.length < 6) {
      return {
        success: false,
        message: "La contraseña debe tener al menos 6 caracteres",
      };
    }

    const hashedPassword = bcrypt.hashSync(UserData.password, 10);

    db.prepare(
      "INSERT INTO users (id, username, password, role) VALUES (?, ?, ?, ?)"
    ).run(UserData.id, UserData.username, hashedPassword, UserData.role);

    return { success: true, message: "Usuario creado con éxito" };
  } catch (error) {
    console.error("Error al crear el usuario:", error);
    return { success: false, message: "Error al crear el usuario" };
  }
}
