import { BsFillPlusCircleFill, BsTools } from "react-icons/bs";
import { useState } from "react";

import RegisterMagazineModal from "./Modals/Magazine Modal/RegisterMagazineModal";
import RegisterMaintenanceModal from "./Modals/Magazine Modal/RegisterMaintenanceModal";

export default function SubHeader() {
  const [isAddMagazine, setIsAddMagazine] = useState(false);
  const openAddMagazine = () => setIsAddMagazine(true);
  const closeAddMagazine = () => setIsAddMagazine(false);

  const [isMaintenance, setIsMaintenance] = useState(false);
  const openMaintenance = () => setIsMaintenance(true);
  const closeMaintenance = () => setIsMaintenance(false);
  return (
    <>
      <div className="flex flex-row justify-between pt-4">
        <h2 className="text-text font-body text-xl">Todos los magazines</h2>
        <div className="flex flex-row gap-8">
          <button onClick={openAddMagazine} className="btn btn-default">
            <BsFillPlusCircleFill />
            AGREGAR
          </button>
          <button onClick={openMaintenance} className="btn btn-default">
            <BsTools />
            MANTENIMIENTO
          </button>
        </div>
        {isAddMagazine && (
          <RegisterMagazineModal closeSettings={closeAddMagazine} />
        )}
        {isMaintenance && (
          <RegisterMaintenanceModal closeSettings={closeMaintenance} />
        )}
      </div>
    </>
  );
}
