import SubHeader from "../../components/SubHeader";
import CardInf from "../../components/Cards/CardInf";
import { useEffect, useState } from "react";

import { useMagazineStore } from "../../store/magazineStore";

export default function MagazineListPage() {
  const getAllInf = useMagazineStore((state) => state.getAllInf);

  const [stats, setStats] = useState<{
    total_magazines?: number;
    proximos_mtto?: number;
    con_mtto?: number;
    auditados?: number;
    no_auditados?: number;
    scrap?: number;
  }>({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllInf();
        if (data.success && data.data) {
          setStats(data.data); // guardamos las estadísticas en el estado
        } else {
          console.error("Error al obtener estadísticas:", data.message);
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error("Error:", error.message);
        } else {
          console.error("Ocurrió un error desconocido");
        }
      }
    };

    fetchData();
  }, [getAllInf]);
  return (
    <>
      <div className="flex justify-center">
        <h1 className="text-text text-5xl font-title p-4">Magazines</h1>
      </div>

      <section>
        <SubHeader />
        <hr className=" m-8 border-border" />
        <div className=" flex justify-around">
          <CardInf
            text={"Magazines totales"}
            count={stats.total_magazines}
            color={"red-500"}
          />
          <CardInf
            text={"Magazines proximos a mantenimiento"}
            count={stats.proximos_mtto}
            color={"red-500"}
          />
          <CardInf
            text={"Magazines con mantenimiento"}
            count={stats.auditados}
            color={"red-500"}
          />
          <CardInf
            text={"Magazines sin auditar"}
            count={stats.no_auditados}
            color={"red-500"}
          />
          <CardInf
            text={"Magazines SCRAP"}
            count={stats.scrap}
            color={"red-500"}
          />
        </div>
      </section>
    </>
  );
}
