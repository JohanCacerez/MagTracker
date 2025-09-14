// LoginModal.tsx
import { createPortal } from "react-dom";
import { useState } from "react";

const LoginModal = () => {
  const [form, setForm] = useState({ username: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("login", form);
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
            name="username"
            placeholder="Usuario"
            value={form.username}
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
      </div>
    </div>,
    document.body
  );
};

export default LoginModal;
