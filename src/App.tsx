import { useEffect, useState } from "react";
import { useMagazineStore } from "./store/magazineStore";

function App() {
  const { magazines, loadMagazines, addMagazine } = useMagazineStore();

  const [id, setId] = useState<number | "">("");
  const [size, setSize] = useState("");
  const [status, setStatus] = useState("producción");

  useEffect(() => {
    loadMagazines();
  }, []);

  const handleAdd = async () => {
    if (!id || !size) return alert("ID y tamaño son obligatorios");
    await addMagazine({ id: Number(id), size, status });
    setId("");
    setSize("");
    setStatus("producción");
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Agregar Magazine</h2>
      <input
        type="number"
        placeholder="ID"
        value={id}
        onChange={(e) => setId(e.target.value === "" ? "" : Number(e.target.value))}
      />
      <input
        type="text"
        placeholder="Tamaño"
        value={size}
        onChange={(e) => setSize(e.target.value)}
      />
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="producción">Producción</option>
        <option value="reparado">Reparado</option>
        <option value="scrap">Scrap</option>
      </select>
      <button onClick={handleAdd}>Agregar</button>

      <h2>Lista de Magazines</h2>
      <ul>
        {magazines.map((m) => (
          <li key={m.id}>
            {m.id} - {m.size} - {m.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
