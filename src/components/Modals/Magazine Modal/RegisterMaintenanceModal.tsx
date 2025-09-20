import { AnimatePresence, motion } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai";

export default function RegisterMaintenanceModal({
  closeSettings,
}: {
  closeSettings: () => void;
}) {
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
            className="relative bg-surface p-4 rounded shadow-lg w-[1000px] h-[600px] flex flex-col justify-center items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botón de cerrar */}
            <button
              onClick={closeSettings}
              className="absolute top-3 right-3 text-text hover:text-button-delete transition-colors cursor-pointer"
            >
              <AiOutlineClose size={24} />
            </button>
            <h1 className="text-text font-title mb-4">
              Registrar mantenimiento
            </h1>
            <form className="flex flex-col gap-6 w-full items-center">
              {/* Contenedor de columnas */}
              <div className="flex flex-row gap-8 justify-center w-full">
                {/* Columna izquierda */}
                <div className="flex flex-col gap-4 w-80 border-r pr-8">
                  <input
                    type="text"
                    placeholder="ID"
                    className="p-2 border rounded font-code bg-transparent text-primary placeholder-primary"
                  />
                  <input
                    type="text"
                    placeholder="Tamaño"
                    className="p-2 border rounded font-code bg-transparent text-primary placeholder-primary"
                  />
                  <select className="p-2 border rounded font-code text-primary">
                    <option value="op">Producción</option>
                    <option value="rep">Reparado</option>
                    <option value="scrap">Scrap</option>
                  </select>
                </div>

                {/* Columna derecha */}
                <div className="flex flex-col gap-4 w-96">
                  <div>
                    <label className="block text-text mb-1">
                      Actividades realizadas:
                    </label>
                    <textarea className="p-2 border rounded font-code bg-transparent text-primary placeholder-primary w-full h-24 resize-none" />
                  </div>
                  <div>
                    <label className="block text-text mb-1">
                      Piezas cambiadas/reparadas:
                    </label>
                    <textarea className="p-2 border rounded font-code bg-transparent text-primary placeholder-primary w-full h-24 resize-none" />
                  </div>
                  <div>
                    <label className="block text-text mb-1">
                      Comentarios adicionales:
                    </label>
                    <textarea className="p-2 border rounded font-code bg-transparent text-primary placeholder-primary w-full h-24 resize-none" />
                  </div>
                </div>
              </div>

              {/* Botón de registrar */}
              <button type="submit" className="btn bg-button-save">
                Registrar mantenimiento
              </button>
            </form>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
