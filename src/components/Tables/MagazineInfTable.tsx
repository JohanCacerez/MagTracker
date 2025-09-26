import { TreeTable } from "primereact/treetable";
import { Column } from "primereact/column";
import { useState, useEffect } from "react";
import { TreeNode } from "primereact/treenode";
import { useMagazineStore } from "../../store/magazineStore"; // 👈 importa tu store
import { MaintenanceDBRow } from "../../types/electron";

interface Mantenimiento {
  id: string;
  fecha: string;
  tipo: string;
  estado: string;
  responsable: string;
  actividades: { comentario: string }[];
  piezas: { comentario: string }[];
  comentarios: { comentario: string }[];
}

export default function MagazineInfTable() {
  const [nodes, setNodes] = useState<TreeNode[]>([]);
  const getAllMaintenanceMagazines = useMagazineStore(
    (state) => state.getAllMaintenanceMagazines
  );

  useEffect(() => {
    async function fetchData() {
      const res = await getAllMaintenanceMagazines();

      function safeParse<T>(value: string | null, fallback: T): T {
        try {
          return value ? JSON.parse(value) : fallback;
        } catch {
          return fallback;
        }
      }

      if (res.success) {
        const data: Mantenimiento[] = res.result.map(
          (row: MaintenanceDBRow) => {
            const actividades = JSON.parse(row.activities_completed || "[]");
            const piezas = JSON.parse(row.replacement_parts || "[]");
            const comentarios = JSON.parse(row.additional_comments || "[]");

            return {
              id: row.id.toString(),
              fecha: row.maintenance_date,
              tipo: row.maintenance_type,
              estado: row.finally_state,
              responsable: row.user_id?.toString() || "Desconocido", // ⚡ aquí podrías hacer join a users si quieres
              actividades,
              piezas,
              comentarios,
            };
          }
        );

        // Convertir a TreeNode[]
        const treeNodes: TreeNode[] = data.map((mtto) => ({
          key: mtto.id,
          data: {
            fecha: mtto.fecha,
            tipo: mtto.tipo,
            estado: mtto.estado,
            responsable: mtto.responsable,
          },
          children: [
            {
              key: `${mtto.id}-actividades`,
              data: {
                fecha: "Actividades realizadas",
                tipo: "",
                estado: "",
                responsable: "",
              },
              children: mtto.actividades.map((a, i) => ({
                key: `${mtto.id}-actividad-${i}`,
                data: {
                  fecha: a.comentario,
                  tipo: "",
                  estado: "",
                  responsable: "",
                },
              })),
            },
            {
              key: `${mtto.id}-piezas`,
              data: {
                fecha: "Piezas cambiadas/reparadas",
                tipo: "",
                estado: "",
                responsable: "",
              },
              children: mtto.piezas.map((p, i) => ({
                key: `${mtto.id}-pieza-${i}`,
                data: {
                  fecha: p.comentario,
                  tipo: "",
                  estado: "",
                  responsable: "",
                },
              })),
            },
            {
              key: `${mtto.id}-comentarios`,
              data: {
                fecha: "Comentarios adicionales",
                tipo: "",
                estado: "",
                responsable: "",
              },
              children: mtto.comentarios.map((c, i) => ({
                key: `${mtto.id}-comentario-${i}`,
                data: {
                  fecha: c.comentario,
                  tipo: "",
                  estado: "",
                  responsable: "",
                },
              })),
            },
          ],
        }));

        setNodes(treeNodes);
      }
    }

    fetchData();
  }, [getAllMaintenanceMagazines]);

  return (
    <div className="card">
      <h2 className="text-text font-title mb-4">Historial de Mantenimientos</h2>
      <TreeTable value={nodes} tableStyle={{ minWidth: "60rem" }}>
        <Column
          field="fecha"
          header="Fecha"
          expander
          style={{ width: "55%" }}
        />
        <Column field="tipo" header="Tipo de Mtto" style={{ width: "15%" }} />
        <Column field="estado" header="Estado Final" style={{ width: "15%" }} />
        <Column
          field="responsable"
          header="Responsable"
          style={{ width: "15%" }}
        />
      </TreeTable>
    </div>
  );
}
