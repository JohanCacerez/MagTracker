import { useState } from "react";
import { useUserStore } from "../../../store/userStore";
import { toast, Toaster } from "sonner";

export default function UserSettings() {
  const [form, setForm] = useState({ oldPassword: "", newPassword: "" });
  const changePassword = useUserStore((state) => state.changePassword);
  const currentUser = useUserStore((state) => state.currentUser);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await changePassword(
        Number(currentUser?.id),
        form.oldPassword,
        form.newPassword
      );
      toast.success("¡Contraseña cambiada correctamente!");
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Ocurrió un error desconocido");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 gap-2 flex flex-col w-80">
      <h2 className="text-text font-title">Configuración de usuario</h2>
      <hr className="border-divider mb-2" />
      <h2>Cambiar contraseña</h2>

      <input
        type="password"
        name="oldPassword"
        placeholder="Contraseña actual"
        value={form.oldPassword}
        onChange={handleChange}
        className="p-2 border rounded font-code"
      />
      <input
        type="password"
        name="newPassword"
        placeholder="Nueva contraseña"
        value={form.newPassword}
        onChange={handleChange}
        className="p-2 border rounded font-code"
      />

      <button
        type="submit"
        disabled={!form.oldPassword || !form.newPassword}
        className="btn bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:opacity-50"
      >
        Cambiar contraseña
      </button>

      <Toaster position="top-center" richColors />
    </form>
  );
}
