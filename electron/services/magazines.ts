import db from "../db/index";
import { MagazineData } from "../../src/types/electron";

export function addMagazine(magazine: MagazineData) {
  const { id, size, status } = magazine;
  if (!id || !size || !status) {
    return {
      success: false,
      message: "Todos los campos deben llenarse",
    };
  }
  const magazineExists = db
    .prepare("SELECT COUNT(*) as count FROM magazines WHERE id = ?")
    .get(id);

  if (magazineExists.count > 0) {
    return { success: false, message: "El magazine ya existe" };
  }
  try {
    db.prepare("INSERT INTO magazines (id, size, status) VALUES (?, ?, ?)").run(
      id,
      size,
      status
    );

    return { success: true, message: "Magazine agregado correctamente" };
  } catch (error: unknown) {
    return { success: false, message: "Error al agregar magazine: ", error };
  }
}
