import React from "react";
import { NavLink } from "react-router-dom";
import { FaCog, FaSignOutAlt } from "react-icons/fa";
import { BiBuilding, BiCar } from "react-icons/bi";
import { HiOutlineChartBar, HiOutlineUserCircle } from "react-icons/hi";

const Sidebar: React.FC = () => {
  return (
    <div className="w-60 h-screen bg-surface border-r border-border text-text flex flex-col p-4">
      {/* Parte superior: Usuario + Opciones */}
      <div>
        {/* Usuario */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 font-semibold text-text">
            <HiOutlineUserCircle size={35} />
            <span>Nombre Usuario</span>
          </div>
          <NavLink
            to="/settings"
            className="bg-primary p-2 rounded-full text-text hover:bg-primary-light cursor-pointer"
          >
            <FaCog size={18} />
          </NavLink>
        </div>

        {/* Opciones */}
        <div className="flex flex-col space-y-1">
          <button
            className="flex items-center gap-3 px-4 py-2 rounded font-semibold cursor-pointer 
                             text-text hover:bg-primary-light"
          >
            <HiOutlineChartBar />
            <span>Dashboard</span>
          </button>
          <hr className="border-divider" />

          <button
            className="flex items-center gap-3 px-4 py-2 rounded cursor-pointer 
                             text-text hover:bg-primary-light"
          >
            <BiBuilding />
            <span>Magazines</span>
          </button>
          <hr className="border-divider" />

          <button
            className="flex items-center gap-3 px-4 py-2 rounded cursor-pointer 
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
          className="flex items-center gap-3 w-full px-4 py-2 rounded cursor-pointer 
                           text-text hover:bg-primary-dark"
        >
          <FaSignOutAlt />
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
