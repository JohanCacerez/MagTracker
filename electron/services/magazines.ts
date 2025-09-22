import db from "../db/index";
import {
  MagazineData,
  MaintenanceMagazineData,
} from "../../src/types/electron";

export function addMagazine(magazine: MagazineData) {
  const { id, size, status } = magazine;
  if (!id || !size || !status) {
    return { success: false, message: "Todos los campos deben llenarse" };
  }

  const magazineExists = db
    .prepare("SELECT COUNT(*) as count FROM magazines WHERE id = ?")
    .get(id);

  if (magazineExists.count > 0) {
    return { success: false, message: "El magazine ya existe" };
  }

  try {
    const today = new Date().toISOString().split("T")[0];
    const nextYear = new Date();
    nextYear.setFullYear(nextYear.getFullYear() + 1);

    db.prepare(
      "INSERT INTO magazines (id, size, status, last_maintenance, next_maintenance) VALUES (?, ?, ?, ?, ?)"
    ).run(id, size, status, today, nextYear.toISOString().split("T")[0]);

    return { success: true, message: "Magazine agregado correctamente" };
  } catch (err: unknown) {
    let msg = "Error al agregar magazine";
    if (err instanceof Error) msg += `: ${err.message}`;
    return { success: false, message: msg };
  }
}

export function maintenanceRegister(
  magazine: MaintenanceMagazineData,
  userId: number
) {
  const { id, type, state, act, pieceRepair, comments } = magazine;

  if (!id || !type || !state || !act || !pieceRepair || !comments) {
    return { success: false, message: "Todos los campos deben llenarse" };
  }

  const magazineExists = db
    .prepare("SELECT COUNT(*) as count FROM magazines WHERE id = ?")
    .get(id);

  if (magazineExists.count === 0) {
    return { success: false, message: "No se encuentra el magazine" };
  }

  try {
    // Actualizar fechas

    const today = new Date();
    const todayStr = today.toISOString().split("T")[0]; // YYYY-MM-DD
    const nextMaintenance = new Date(today);
    //Cuanto tiempo para el siguiente mtto
    //actualmente es cada 4 meses
    nextMaintenance.setMonth(today.getMonth() + 4);
    // Insertar mantenimiento
    db.prepare(
      "INSERT INTO magazineMaintenance (magazine_id, user_id, maintenance_type, finally_state, activities_completed, replacement_parts, additional_comments, maintenance_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
    ).run(id, userId, type, state, act, pieceRepair, comments, todayStr);

    db.prepare(
      "UPDATE magazines SET last_maintenance = ?, next_maintenance = ?, audit = 0, id_auditer = NULL WHERE id = ?"
    ).run(
      today.toISOString().split("T")[0],
      nextMaintenance.toISOString().split("T")[0],
      id
    );

    return { success: true, message: "Mantenimiento registrado correctamente" };
  } catch (err: unknown) {
    let msg = "Error al registrar mantenimiento";
    if (err instanceof Error) msg += `: ${err.message}`;
    return { success: false, message: msg };
  }
}

export function getSizeMagazine(id: number) {
  if (!id) {
    return { success: false, message: "-" };
  }
  try {
    const magazine = db
      .prepare("SELECT size FROM magazines WHERE id = ?")
      .get(id) as { size: string } | undefined;
    if (!magazine) {
      return { success: false, message: "-" };
    }
    return { success: true, message: "ok", size: magazine.size };
  } catch (err: unknown) {
    let msg = "Error al obtener el tamaño";
    if (err instanceof Error) msg += `: ${err.message}`;
    return { success: false, message: msg };
  }
}
