import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaCog, FaSignOutAlt } from "react-icons/fa";
import { BiBuilding, BiCar } from "react-icons/bi";
import { HiOutlineChartBar, HiOutlineUserCircle } from "react-icons/hi";
import { useUserStore } from "../store/userStore";

import SettingsModal from "./Modals/SettingsModal/Index";

const Sidebar: React.FC = () => {
  const currentUser = useUserStore((state) => state.currentUser);
  const logout = useUserStore((state) => state.logout);

  // Estado para el modal
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const openSettings = () => setIsSettingsOpen(true);
  const closeSettings = () => setIsSettingsOpen(false);
  return (
    <div className="w-60 h-screen bg-surface border-r border-border text-text flex flex-col p-4">
      {/* Parte superior: Usuario + Opciones */}
      <div>
        {/* Usuario */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 font-semibold text-text">
            <HiOutlineUserCircle size={35} />
            <span>{currentUser?.username || "Usuario"}</span>
          </div>
          <button
            onClick={openSettings}
            className="bg-primary p-2 rounded-full text-text hover:bg-primary-light cursor-pointer"
          >
            <FaCog size={18} />
          </button>
        </div>

        {/* Opciones */}
        <div className="flex flex-col space-y-1">
          <NavLink
            to={"/"}
            className="flex items-center gap-3 px-4 py-2 rounded font-semibold cursor-pointer 
                             text-text hover:bg-primary-light"
          >
            <HiOutlineChartBar />
            <span>Dashboard</span>
          </NavLink>
          <hr className="border-divider" />

          <button
            className="flex items-center gap-3 px-4 py-2 rounded font-semibold cursor-pointer 
                             text-text hover:bg-primary-light"
          >
            <BiBuilding />
            <span>Magazines</span>
          </button>
          <hr className="border-divider" />

          <button
            className="flex items-center gap-3 px-4 py-2 rounded font-semibold cursor-pointer 
                             text-text hover:bg-primary-light"
          >
            <BiCar />
            <span>Dollies</span>
          </button>
        </div>
      </div>

      {/* Parte inferior: Logout */}
      <div className="mt-auto">
        <hr className="border-divider mb-2" />
        <button
          onClick={logout}
          className="flex items-center gap-3 w-full px-4 py-2 rounded font-semibold cursor-pointer 
                           text-text hover:bg-primary-dark"
        >
          <FaSignOutAlt />
          <span>Cerrar Sesión</span>
        </button>
      </div>
      {/* Modal de Settings */}
      {isSettingsOpen && <SettingsModal closeSettings={closeSettings} />}
    </div>
  );
};

export default Sidebar;
