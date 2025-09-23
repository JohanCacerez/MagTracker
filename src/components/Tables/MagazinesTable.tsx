import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useMagazineStore } from "../../store/magazineStore";
import { useState, useEffect } from "react";
import { MagazineAllData } from "../../types/electron";
import { Tag } from "primereact/tag";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { InputText } from "primereact/inputtext";

export default function MagazineTable() {
  const getAllMagazines = useMagazineStore((state) => state.getAllMagazines);

  const reloadFlag = useMagazineStore((state) => state.reloadFlag);
  const [magazines, setMagazines] = useState<MagazineAllData[]>([]);
  const [filter, setFilter] = useState({
    showNotAudited: false,
    showScrap: false,
    showNextMaintenanceSoon: false,
  });
  const [idFilter, setIdFilter] = useState<string>("");

  useEffect(() => {
    getAllMagazines().then(({ result }) => {
      setMagazines(result);
    });
  }, [getAllMagazines, reloadFlag]);

  // === Templates personalizados ===
  const dateTemplate = (date: string | null) =>
    date ? new Date(date).toLocaleDateString() : "-";

  const lastMaintenanceTemplate = (rowData: MagazineAllData) =>
    dateTemplate(rowData.last_maintenance);

  const nextMaintenanceTemplate = (rowData: MagazineAllData) =>
    dateTemplate(rowData.next_maintenance);

  const auditTemplate = (rowData: MagazineAllData) => (
    <Tag
      value={rowData.audit ? "Sí" : "No"}
      rounded
      icon={rowData.audit ? "pi pi-check" : "pi pi-exclamation-triangle"}
      severity={rowData.audit ? "success" : "danger"}
      className="text-base px-3 py-1 min-w-[50px] text-center gap-2"
    />
  );

  const actionTemplate = (rowData: MagazineAllData) => (
    <div className="flex gap-2">
      <Button
        icon="pi pi-info-circle"
        rounded
        outlined
        severity="info"
        onClick={() => console.log("Editar", rowData.id)}
      />
    </div>
  );

  // === Filtrado de magazines ===
  const filteredMagazines = magazines.filter((mag) => {
    // Filtro por ID
    if (idFilter && !mag.id.toString().includes(idFilter)) return false;

    // Filtro auditado
    if (filter.showNotAudited && mag.audit) return false;

    // Filtro estado scrap
    if (filter.showScrap && mag.status !== "scrap") return false;

    // Filtro próximo mantenimiento (14 días)
    if (filter.showNextMaintenanceSoon && mag.next_maintenance) {
      const nextDate = new Date(mag.next_maintenance);
      const now = new Date();
      const diffDays =
        (nextDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
      if (diffDays > 14) return false;
    }

    return true;
  });

  return (
    <div>
      {/* Controles de filtros */}
      <div className="flex gap-4 mt-8 mb-4 items-center flex-wrap text-text">
        <InputText
          placeholder="Buscar por ID"
          value={idFilter}
          onChange={(e) => setIdFilter(e.target.value)}
        />

        <Checkbox
          inputId="notAudited"
          checked={filter.showNotAudited}
          onChange={(e) => setFilter({ ...filter, showNotAudited: e.checked! })}
        />
        <label htmlFor="notAudited">No auditados</label>

        <Checkbox
          inputId="scrap"
          checked={filter.showScrap}
          onChange={(e) => setFilter({ ...filter, showScrap: e.checked! })}
        />
        <label htmlFor="scrap">Estado scrap</label>

        <Checkbox
          inputId="nextMaintenance"
          checked={filter.showNextMaintenanceSoon}
          onChange={(e) =>
            setFilter({ ...filter, showNextMaintenanceSoon: e.checked! })
          }
        />
        <label htmlFor="nextMaintenance">Próximo mtto (14 días)</label>
      </div>

      {/* Tabla */}
      <DataTable
        value={filteredMagazines}
        paginator
        rows={5}
        stripedRows
        emptyMessage="No hay magazines registrados"
        className="rounded-lg overflow-hidden shadow-md"
        tableClassName="min-w-full"
      >
        <Column
          field="id"
          header="ID"
          headerClassName="px-4"
          bodyClassName="px-4"
        />
        <Column
          field="size"
          header="Size"
          headerClassName="px-4"
          bodyClassName="px-4"
        />
        <Column
          field="status"
          header="Estado"
          headerClassName="px-4"
          bodyClassName="px-4"
        />
        <Column
          field="last_maintenance"
          header="Ult. mtto"
          body={lastMaintenanceTemplate}
          sortable
          headerClassName="px-4"
          bodyClassName="px-4"
        />
        <Column
          field="next_maintenance"
          header="Sig. mtto"
          body={nextMaintenanceTemplate}
          sortable
          headerClassName="px-4"
          bodyClassName="px-4"
        />
        <Column
          field="audit"
          header="Auditado"
          body={auditTemplate}
          headerClassName="px-4"
          bodyClassName="px-4"
        />
        <Column
          header="Detalles"
          body={actionTemplate}
          headerClassName="px-4"
          bodyClassName="px-4"
        />
      </DataTable>
    </div>
  );
}
