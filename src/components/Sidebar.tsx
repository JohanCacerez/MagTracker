import React from "react";
import { FaCog, FaSignOutAlt } from "react-icons/fa";
import { BiBuilding, BiCar } from "react-icons/bi";
import { HiOutlineChartBar, HiOutlineUserCircle } from "react-icons/hi";

const Sidebar: React.FC = () => {
  return (
    <div className="w-60 h-screen bg-gray-800 text-white flex flex-col p-4">
      {/* Parte superior: Usuario + Opciones */}
      <div>
        {/* Usuario */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <HiOutlineUserCircle size={35} />
            <span className="font-semibold">Nombre Usuario</span>
          </div>
          <button className="bg-gray-700 p-2 rounded-full hover:bg-gray-600 cursor-pointer">
            <FaCog size={18} />
          </button>
        </div>

        {/* Opciones */}
        <div className="flex flex-col space-y-1">
          <button className="flex items-center gap-3 px-4 py-2 hover:bg-gray-700 rounded cursor-pointer">
            <HiOutlineChartBar />
            <span>Dashboard</span>
          </button>
          <hr className="border-gray-700" />

          <button className="flex items-center gap-3 px-4 py-2 hover:bg-gray-700 rounded cursor-pointer">
            <BiBuilding />
            <span>Magazines</span>
          </button>
          <hr className="border-gray-700" />

          <button className="flex items-center gap-3 px-4 py-2 hover:bg-gray-700 rounded cursor-pointer">
            <BiCar />
            <span>Dollies</span>
          </button>
        </div>
      </div>

      {/* Parte inferior: Logout */}
      <div className="mt-auto">
        <hr className="border-gray-700 mb-2" />
        <button className="flex items-center gap-3 w-full px-4 py-2 hover:bg-gray-700 rounded cursor-pointer">
          <FaSignOutAlt />
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
