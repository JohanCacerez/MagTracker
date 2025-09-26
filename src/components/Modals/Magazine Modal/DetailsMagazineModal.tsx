import { AnimatePresence, motion } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai";

import CardDetails from "../../Cards/CardDetails";
import MagazineInfTable from "../../Tables/MagazineInfTable";

export default function DetailsMagazineModal({
  closeSettings,
  magazineId,
}: {
  closeSettings: () => void;
  magazineId: number;
}) {
  console.log(magazineId);
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-secondary-light/30 flex items-center justify-center z-50 overflow-auto"
        onClick={closeSettings}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* BACKDROP */}
        <div
          className="fixed inset-0 bg-secondary-light/30 flex items-center justify-center z-50 overflow-auto"
          onClick={closeSettings}
        >
          {/* MODAL */}
          <div
            className="relative bg-bg p-4 rounded shadow-lg w-[1200px] h-[750px] flex flex-col  items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botón de cerrar */}
            <button
              onClick={closeSettings}
              className="absolute top-3 right-3 text-text hover:text-button-delete transition-colors cursor-pointer"
            >
              <AiOutlineClose size={24} />
            </button>
            <h1 className="text-text font-title pb-8">
              Historial del magazine:{" "}
              <span className="text-2xl font-bold text-primary">
                {magazineId}
              </span>
            </h1>
            <div className="flex w-full justify-around">
              <CardDetails title="Mantenimientos" date="3" paraf="" />
              <CardDetails
                title="Ult. mtto"
                date="9/24/2025"
                paraf="correctivo - Johan"
              />
              <CardDetails title="Prox. mtto" date="1/24/2026" paraf="" />
            </div>
            <div className="mt-8">
              <MagazineInfTable />
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
