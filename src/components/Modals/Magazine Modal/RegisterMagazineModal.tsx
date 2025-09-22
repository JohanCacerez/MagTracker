import { AnimatePresence, motion } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai";

import { useState } from "react";

import { toast, Toaster } from "sonner";

import { useMagazineStore } from "../../../store/magazineStore";

export default function RegisterMagazineModal({
  closeSettings,
}: {
  closeSettings: () => void;
}) {
  const addMagazine = useMagazineStore((state) => state.addMagazine);

  const [id, setId] = useState("");
  const [size, setSize] = useState("");
  const [status, setStatus] = useState("op");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!id || !size || !status) {
      toast.info("Por favor, completa todos los campos");
      return;
    }

    try {
      const result = await addMagazine({ id, size, status });

      if (result.success) {
        toast.success(result.message);
        setId("");
        setSize("");
        setStatus("op");
      } else {
        console.log(result.message);
        toast.error(result.message);
      }
    } catch (err: unknown) {
      toast.error("Error inesperado al crear magazine");
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
        {/* BACKDROP */}
        <div
          className="fixed inset-0 bg-secondary-light/30 flex items-center justify-center z-50 overflow-auto"
          onClick={closeSettings}
        >
          {/* MODAL */}
          <div
            className="relative bg-surface p-4 rounded shadow-lg w-[500px] h-[390px] flex flex-col justify-center items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botón de cerrar */}
            <button
              onClick={closeSettings}
              className="absolute top-3 right-3 text-text hover:text-button-delete transition-colors cursor-pointer"
            >
              <AiOutlineClose size={24} />
            </button>

            <h1 className="text-text font-title">Registrar magazine</h1>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-2 w-80 p-4"
            >
              <input
                type="text"
                value={id}
                onChange={(e) => setId(e.target.value)}
                placeholder="ID"
                className="p-2 border rounded font-code bg-transparent text-primary placeholder-primary"
              />
              <input
                type="text"
                min={0}
                placeholder="Tamaño"
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="p-2 border rounded font-code bg-transparent text-primary placeholder-primary"
              />

              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="p-2 border rounded font-code text-primary"
              >
                <option value="op">Produccion</option>
                <option value="rep">Reparado</option>
                <option value="scrap">Scrap</option>
              </select>

              <button
                type="submit"
                className="btn bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:opacity-50"
              >
                Agregar magazine
              </button>
            </form>
          </div>
          <Toaster position="top-center" richColors />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
