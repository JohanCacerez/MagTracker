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

    const hashedPassword = await bcrypt.hash(UserData.password, 10);

    db.prepare(
      "INSERT INTO users (id, username, password, role) VALUES (?, ?, ?, ?)"
    ).run(UserData.id, UserData.username, hashedPassword, UserData.role);

    return { success: true, message: "Usuario creado con éxito" };
  } catch (error) {
    console.error("Error al crear el usuario:", error);
    return { success: false, message: "Error al crear el usuario" };
  }
}

export async function AuthUser(idUser: number, password: string) {
  try {
    // identificar usuario por id
    const userExist = db
      .prepare("SELECT * FROM users WHERE id = ?")
      .get(idUser);

    // Verificar si el usuario existe y si la contraseña es correcta
    if (!userExist || !(await bcrypt.compare(password, userExist.password))) {
      return { success: false, message: "Usuario o contraseña incorrectos" };
    }

    // Devolver datos del usuario si la autenticación es exitosa
    return {
      success: true,
      message: "Usuario autenticado con éxito",
      user: {
        id: userExist.id,
        username: userExist.username,
        role: userExist.role,
      },
    };
  } catch (error) {
    console.error("Error al autenticar el usuario:", error);
    return { success: false, message: "Error al autenticar el usuario" };
  }
}

export async function DeleteUser(idUser: number) {
  try {
    const userExist = db
      .prepare("SELECT * FROM users WHERE id = ?")
      .get(idUser);
    if (!userExist) {
      return { success: false, message: "El usuario no existe" };
    }
    db.prepare("DELETE FROM users WHERE id = ?").run(idUser);
    return { success: true, message: "Usuario eliminado con éxito" };
  } catch (error) {
    console.error("Error al eliminar el usuario:", error);
    return { success: false, message: "Error al eliminar el usuario" };
  }
}

export async function changePassword(
  idUser: number,
  oldPassword: string,
  newPassword: string
) {
  try {
    const userExist = db
      .prepare("SELECT * FROM users WHERE id = ?")
      .get(idUser);

    if (!userExist) {
      return { success: false, message: "El usuario no existe" };
    }

    // Validar la contraseña actual
    const match = await bcrypt.compare(oldPassword, userExist.password);
    if (!match) {
      return { success: false, message: "Contraseña incorrecta" };
    }

    //minimo 8 caracteres
    if (newPassword.length < 8) {
      return {
        success: false,
        message: "La contraseña debe tener mínimo 8 caracteres",
      };
    }

    // Validar que la nueva no sea igual a la actual
    const isSame = await bcrypt.compare(newPassword, userExist.password);
    if (isSame) {
      return {
        success: false,
        message: "La contraseña nueva debe ser diferente a la actual",
      };
    }

    // Hashear la nueva contraseña y actualizar
    const newPasswordHash = await bcrypt.hash(newPassword, 10);
    db.prepare("UPDATE users SET password = ? WHERE id = ?").run(
      newPasswordHash,
      idUser
    );

    return { success: true, message: "Contraseña actualizada correctamente" };
  } catch (error) {
    console.error("Error al cambiar la contraseña:", error);
    return {
      success: false,
      message: "Error al cambiar la contraseña del usuario",
    };
  }
}
