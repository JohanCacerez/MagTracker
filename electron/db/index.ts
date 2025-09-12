// src/electron/db/index.ts o donde tengas tu DB
import { createRequire } from "module";
const require = createRequire(import.meta.url);

// Ahora sí puedes usar CommonJS
const Database = require("better-sqlite3");

// Path de la DB (puedes usar app.getPath('userData') si quieres)
import { app } from "electron";
import path from "path";
const dbPath = path.join(app.getPath("userData"), "database.sqlite");

const db = new Database(dbPath);

// Ejecuta migraciones si no existen tablas
db.exec(`
  CREATE TABLE IF NOT EXISTS magazines (
    id INTEGER PRIMARY KEY,
    size TEXT,
    status TEXT DEFAULT 'available',
    last_maintenance DATE,
    next_maintenance DATE
  );

  CREATE TABLE IF NOT EXISTS magazineMaintenance (
    id INTEGER PRIMARY KEY,
    magazine_id INTEGER,
    user_id INTEGER,
    maintenance_type TEXT,
    finally_state TEXT,
    activities_completed TEXT,
    replacement_parts TEXT,
    additional_comments TEXT,
    maintenance_date DATE,
    FOREIGN KEY (magazine_id) REFERENCES magazines(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
  );

    CREATE TABLE IF NOT EXISTS magazinesHistory (
    id INTEGER PRIMARY KEY,
    magazine_id INTEGER,
    maintenance_id INTEGER,
    date DATE DEFAULT (DATE('now')),
    FOREIGN KEY (magazine_id) REFERENCES magazines(id),
    FOREIGN KEY (maintenance_id) REFERENCES magazineMaintenance(id)
  );

  CREATE TABLE IF NOT EXISTS dollies (
    id INTEGER PRIMARY KEY,
    status TEXT DEFAULT 'available',
    last_maintenance DATE,
    next_maintenance DATE
  );

  CREATE TABLE IF NOT EXISTS dolliesMaintenance (
    id INTEGER PRIMARY KEY,
    dolly_id INTEGER,
    user_id INTEGER,
    maintenance_type TEXT,
    finally_state TEXT,
    activities_completed TEXT,
    replacement_parts TEXT,
    additional_comments TEXT,
    maintenance_date DATE,
    FOREIGN KEY (dolly_id) REFERENCES dollies(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS dolliesHistory (
    id INTEGER PRIMARY KEY,
    dolly_id INTEGER,
    maintenance_id INTEGER,
    date DATE DEFAULT (DATE('now')),
    FOREIGN KEY (dolly_id) REFERENCES dollies(id),
    FOREIGN KEY (maintenance_id) REFERENCES dolliesMaintenance(id)
  );

  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY,
    username TEXT UNIQUE,
    password TEXT,
    role TEXT
  );
`);

export default db;