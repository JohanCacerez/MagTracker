import React, { useState } from "react";

// Components de cada sección
import UserSettings from "./UserSettings";
import PanelControl from "./PanelControl";
import Reports from "./Reports";
import Database from "./Database";

import { useUserStore } from "../../../store/userStore";

import { motion, AnimatePresence } from "framer-motion";

export default function SettingsModal({
  closeSettings,
}: {
  closeSettings: () => void;
}) {
  const [activeTab, setActiveTab] = useState("UserSettings");
  const user = useUserStore((state) => state.currentUser);
  const isAdmin = user?.role === "admin";

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-secondary-light/30 flex items-center justify-center z-50 overflow-auto"
        onClick={closeSettings}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        // BACKDROP
        <div
          className="fixed inset-0 bg-secondary-light/30 flex items-center justify-center z-50 overflow-auto"
          onClick={closeSettings}
        >
          {/* MODAL */}
          <div
            className="bg-surface p-4 rounded shadow-lg w-[700px] h-[500px] flex"
            onClick={(e) => e.stopPropagation()}
          >
            {/* SIDEBAR */}
            <div className="w-40 border-r border-divider pr-4 flex flex-col h-full">
              <ul className="flex-1 space-y-2">
                {/* Usuario */}
                <li>
                  <button
                    onClick={() => setActiveTab("UserSettings")}
                    className={`w-full p-2 rounded text-left ${
                      activeTab === "UserSettings"
                        ? "bg-primary text-white"
                        : "hover:bg-primary-light"
                    }`}
                  >
                    Usuario
                  </button>
                </li>

                {/* Reportes */}
                <li>
                  <button
                    onClick={() => setActiveTab("Reports")}
                    className={`w-full p-2 rounded text-left ${
                      activeTab === "Reports"
                        ? "bg-primary text-white"
                        : "hover:bg-primary-light"
                    }`}
                  >
                    Reportes
                  </button>
                </li>

                {/* Panel de Control */}
                <li>
                  <button
                    onClick={() => setActiveTab("PanelControl")}
                    disabled={!isAdmin}
                    className={`w-full p-2 rounded text-left
      ${activeTab === "PanelControl" ? "hover:bg-primary-light text-white" : ""}
      ${isAdmin ? "hover:bg-primary-light" : ""}
      ${!isAdmin ? "text-gray-400 cursor-not-allowed" : ""}
    `}
                  >
                    Panel de Control
                  </button>
                </li>

                {/* Exportar DB */}
                <li>
                  <button
                    onClick={() => setActiveTab("Database")}
                    disabled={!isAdmin}
                    className={`w-full p-2 rounded text-left
      ${activeTab === "Database" ? "hover:bg-primary-light text-white" : ""}
      ${isAdmin ? "hover:bg-primary-light" : ""}
      ${!isAdmin ? "text-gray-400 cursor-not-allowed" : ""}
    `}
                  >
                    Exportar DB
                  </button>
                </li>
              </ul>

              {/* Botón cerrar */}
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
      </motion.div>
    </AnimatePresence>
  );
}
