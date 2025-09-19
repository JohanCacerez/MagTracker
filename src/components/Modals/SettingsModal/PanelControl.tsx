import React, { useState } from "react";
import { useUserStore } from "../../../store/userStore";

import { toast, Toaster } from "sonner";

export default function PanelControl() {
  const createUser = useUserStore((state) => state.createUser);
  const deleteUser = useUserStore((state) => state.deleteUser);

  const [id, setId] = useState<number | "">(""); // empieza vacío
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [loading, setLoading] = useState(false);

  const [idDelete, setIdDelete] = useState<number | "">("");

  const handleSubmitDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    if (idDelete === "") {
      toast.error("Por favor, ingresa un ID válido");
      return;
    }
    try {
      await deleteUser(idDelete);
      toast.success("Usuario eliminado con éxito");
      setId("");
    } catch (err: unknown) {
      let msg = "Error al eliminar usuario";
      if (err instanceof Error) {
        msg = err.message;
      }
      toast.error(msg);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (id === "" || !username || !password) {
      toast.info("Por favor, completa todos los campos");
      setLoading(false);
      return;
    }

    try {
      await createUser({
        id,
        username: username.trim(),
        password,
        role,
      });
      toast.success("Usuario creado con éxito");
      setId("");
      setUsername("");
      setPassword("");
    } catch (err: unknown) {
      // mostramos solo el mensaje real del error
      let msg = "Error al crear usuario";
      if (err instanceof Error) {
        msg = err.message;
      }
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-80 p-4">
        <h2 className="text-lg text-text font-title">Registrar usuario</h2>

        <input
          type="number"
          placeholder="ID"
          value={id}
          onChange={(e) =>
            setId(e.target.value === "" ? "" : Number(e.target.value))
          }
          className="p-2 border rounded font-code"
        />

        <input
          type="text"
          placeholder="Nombre"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="p-2 border rounded font-code"
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 border rounded font-code"
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="p-2 border rounded font-code"
        >
          <option value="tec">Tecnico</option>
          <option value="admin">Administrador</option>
        </select>

        <button
          type="submit"
          disabled={loading}
          className=" btn bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? "Creando..." : "Crear Usuario"}
        </button>

        <Toaster position="top-center" richColors />
      </form>
      <form
        onSubmit={handleSubmitDelete}
        className="flex flex-col gap-2 w-80 p-4"
      >
        <h2 className="text-lg font-title">Eliminar Usuario</h2>

        <input
          type="text"
          value={idDelete}
          onChange={(e) =>
            setIdDelete(e.target.value === "" ? "" : Number(e.target.value))
          }
          placeholder="ID del Usuario"
          className="p-2 border rounded font-code"
        />

        <button
          type="submit"
          className="btn bg-red-500 text-white p-2 rounded hover:bg-red-600 cursor-pointer"
        >
          Eliminar Usuario
        </button>
      </form>
    </>
  );
}
