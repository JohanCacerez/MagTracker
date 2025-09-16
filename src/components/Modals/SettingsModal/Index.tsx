import React, { useState } from "react";

// Components de cada sección
import UserSettings from "./UserSettings";
import PanelControl from "./PanelControl";
import Reports from "./Reports";
import Database from "./Database";

export default function SettingsModal({
  closeSettings,
}: {
  closeSettings: () => void;
}) {
  const [activeTab, setActiveTab] = useState("UserSettings");

  return (
    // BACKDROP
    <div
      className="fixed inset-0 bg-secondary-light/30 flex items-center justify-center z-50 overflow-auto"
      onClick={closeSettings} // Cierra al hacer click en el fondo
    >
      {/* MODAL */}
      <div
        className="bg-surface p-4 rounded shadow-lg w-[700px] h-[500px] flex"
        onClick={(e) => e.stopPropagation()} // Evita que el click dentro del modal cierre
      >
        {/* SIDEBAR */}
        <div className="w-40 border-r border-divider pr-4 flex flex-col h-full">
          {/* Opciones */}
          <ul className="flex-1 space-y-2">
            <li
              className={`p-2 rounded cursor-pointer ${
                activeTab === "UserSettings"
                  ? "bg-primary text-white"
                  : "hover:bg-primary-light"
              }`}
              onClick={() => setActiveTab("UserSettings")}
            >
              Usuario
            </li>
            <li
              className={`p-2 rounded cursor-pointer ${
                activeTab === "PanelControl"
                  ? "bg-primary text-white"
                  : "hover:bg-primary-light"
              }`}
              onClick={() => setActiveTab("PanelControl")}
            >
              Panel de Control
            </li>
            <li
              className={`p-2 rounded cursor-pointer ${
                activeTab === "Reports"
                  ? "bg-primary text-white"
                  : "hover:bg-primary-light"
              }`}
              onClick={() => setActiveTab("Reports")}
            >
              Reportes
            </li>
            <li
              className={`p-2 rounded cursor-pointer ${
                activeTab === "Database"
                  ? "bg-primary text-white"
                  : "hover:bg-primary-light"
              }`}
              onClick={() => setActiveTab("Database")}
            >
              Exportar DB
            </li>
          </ul>

          {/* Botón cerrar abajo */}
          <div className="mt-auto">
            <hr className="border-divider my-2" />
            <button
              onClick={closeSettings}
              className="w-full px-4 py-2 bg-primary text-text rounded hover:bg-primary-light"
            >
              Cerrar
            </button>
          </div>
        </div>

        {/* CONTENIDO */}
        <div className="flex-1 pl-4 overflow-auto flex flex-col">
          {activeTab === "UserSettings" && <UserSettings />}
          {activeTab === "PanelControl" && <PanelControl />}
          {activeTab === "Reports" && <Reports />}
          {activeTab === "Database" && <Database />}
        </div>
      </div>
    </div>
  );
}
