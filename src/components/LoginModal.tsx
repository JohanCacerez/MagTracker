import { createPortal } from "react-dom";
import { useState } from "react";
import { toast, Toaster } from "sonner";
import { useUserStore } from "../store/userStore";

const LoginModal = () => {
  const [form, setForm] = useState({ id: "", password: "" });
  const authUser = useUserStore((state) => state.authUser);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await authUser({
        id: Number(form.id), // 👈 convertir el string del input a number
        password: form.password,
      });
      toast.success("¡Inicio de sesión exitoso!");
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Ocurrió un error desconocido");
      }
    }
  };

  return createPortal(
    <div className="fixed inset-0 bg-secondary-dark/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-[400px] shadow-xl">
        <h2 className="text-xl font-bold mb-4 text-text-inverse">
          Iniciar sesión
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            name="id"
            placeholder="ID de usuario"
            value={form.id}
            onChange={handleChange}
            className="border border-border rounded px-3 py-2"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={form.password}
            onChange={handleChange}
            className="border border-border rounded px-3 py-2"
            required
          />
          <button
            type="submit"
            className="btn bg-secondary hover:bg-secondary-light"
          >
            Entrar
          </button>
        </form>
        <Toaster position="top-right" richColors />
      </div>
    </div>,
    document.body
  );
};

export default LoginModal;
