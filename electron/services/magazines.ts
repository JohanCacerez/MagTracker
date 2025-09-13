import db from "../db/index";
import { Magazine } from "../../src/types/electron";

export function getMagazines() {
  return db.prepare("SELECT * FROM magazines").all() as Magazine[];
}

export function addMagazine(magazine: Magazine) {
  return db
    .prepare("INSERT INTO magazines (id, size, status) VALUES (?, ?, ?)")
    .run(magazine.id, magazine.size, magazine.status);
}
