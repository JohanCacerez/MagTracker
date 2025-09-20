import { AnimatePresence, motion } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai";
import { useState } from "react";
import { toast, Toaster } from "sonner";
import { useMagazineStore } from "../../../store/magazineStore"; // ajusta la ruta si es necesario
import { useUserStore } from "../../../store/userStore";
import { MaintenanceMagazineData } from "../../../types/electron";

export default function RegisterMaintenanceModal({
  closeSettings,
}: {
  closeSettings: () => void;
}) {
  const maintenanceRegister = useMagazineStore(
    (state) => state.maintenanceRegister
  );
  const currentUserId = useUserStore((state) => state.currentUser?.id);
  // Estados de inputs
  const [id, setId] = useState("");
  const [size, setSize] = useState("");
  const [type, setType] = useState("op"); // Predictivo / Correctivo
  const [stateM, setStateM] = useState("op"); // Producción / Reparado / Scrap
  const [activities, setActivities] = useState("");
  const [pieces, setPieces] = useState("");
  const [comments, setComments] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const magazine: MaintenanceMagazineData = {
      id,
      type,
      state: stateM,
      act: activities,
      pieceRepair: pieces,
      comments,
    };
    if (!currentUserId) {
      toast.error("No se ha identificado al usuario");
      return;
    }

    const result = await maintenanceRegister(magazine, currentUserId);
    if (result.success) {
      toast.success(result.message);
      // Limpiar campos
      setId("");
      setSize("");
      setType("op");
      setStateM("op");
      setActivities("");
      setPieces("");
      setComments("");
    } else {
      toast.error(result.message);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-secondary-light/30 flex items-center justify-center z-50 overflow-auto"
        onClick={closeSettings}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div
          className="fixed inset-0 bg-secondary-light/30 flex items-center justify-center z-50 overflow-auto"
          onClick={closeSettings}
        >
          <div
            className="relative bg-surface p-6 rounded-2xl shadow-lg w-[1000px] h-[600px] flex flex-col justify-center items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeSettings}
              className="absolute top-3 right-3 text-text hover:text-button-delete transition-colors cursor-pointer"
            >
              <AiOutlineClose size={24} />
            </button>

            <h1 className="text-text font-title mb-4">
              Registrar mantenimiento
            </h1>

            <form
              className="flex flex-col gap-6 w-full items-center"
              onSubmit={handleSubmit}
            >
              <div className="flex flex-row gap-8 justify-center w-full">
                {/* Columna izquierda */}
                <div className="flex flex-col gap-4 w-80 border-r pr-8">
                  <input
                    type="text"
                    placeholder="ID"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    className="p-2 border rounded font-code bg-transparent text-primary placeholder-primary"
                  />
                  <input
                    type="text"
                    placeholder="Tamaño"
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                    disabled
                    className="p-2 border rounded font-code bg-gray-100 text-gray-500 placeholder-gray-400 cursor-not-allowed"
                  />
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="p-2 border rounded font-code text-primary"
                  >
                    <option value="op">Predictivo</option>
                    <option value="rep">Correctivo</option>
                  </select>
                  <select
                    value={stateM}
                    onChange={(e) => setStateM(e.target.value)}
                    className="p-2 border rounded font-code text-primary"
                  >
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
                    <textarea
                      value={activities}
                      onChange={(e) => setActivities(e.target.value)}
                      className="p-2 border rounded font-code bg-transparent text-primary placeholder-primary w-full h-24 resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-text mb-1">
                      Piezas cambiadas/reparadas:
                    </label>
                    <textarea
                      value={pieces}
                      onChange={(e) => setPieces(e.target.value)}
                      className="p-2 border rounded font-code bg-transparent text-primary placeholder-primary w-full h-24 resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-text mb-1">
                      Comentarios adicionales:
                    </label>
                    <textarea
                      value={comments}
                      onChange={(e) => setComments(e.target.value)}
                      className="p-2 border rounded font-code bg-transparent text-primary placeholder-primary w-full h-24 resize-none"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="btn bg-button-save text-white px-6 py-2 rounded hover:bg-green-600"
              >
                Registrar mantenimiento
              </button>
            </form>
            <Toaster position="top-center" richColors />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
