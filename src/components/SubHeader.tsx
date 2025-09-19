import { BsFillPlusCircleFill, BsTools } from "react-icons/bs";
import { useState } from "react";

import RegisterMagazineModal from "./Modals/Magazine Modal/RegisterMagazineModal";

export default function SubHeader() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const openSettings = () => setIsSettingsOpen(true);
  const closeSettings = () => setIsSettingsOpen(false);
  return (
    <>
      <div className="flex flex-row justify-between pt-4">
        <h2 className="text-text font-body text-xl">Todos los magazines</h2>
        <div className="flex flex-row gap-8">
          <button onClick={openSettings} className="btn btn-default">
            <BsFillPlusCircleFill />
            AGREGAR
          </button>
          <button className="btn btn-default">
            <BsTools />
            MANTENIMIENTO
          </button>
        </div>
        {isSettingsOpen && (
          <RegisterMagazineModal closeSettings={closeSettings} />
        )}
      </div>
    </>
  );
}
