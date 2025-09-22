import SubHeader from "../../components/SubHeader";
import CardInf from "../../components/Cards/CardInf";

export default function MagazineListPage() {
  return (
    <>
      <div className="flex justify-center">
        <h1 className="text-text text-5xl font-title p-4">Magazines</h1>
      </div>

      <section>
        <SubHeader />
        <hr className=" m-8 border-border" />
        <div className=" flex justify-around">
          <CardInf text={"Magazines totales"} count={700} color={"red-500"} />
          <CardInf
            text={"Magazines proximos a mantenimiento"}
            count={50}
            color={"red-500"}
          />
          <CardInf
            text={"Magazines con mantenimiento"}
            count={400}
            color={"red-500"}
          />
          <CardInf
            text={"Magazines sin auditar"}
            count={100}
            color={"red-500"}
          />
          <CardInf text={"Magazines SCRAP"} count={150} color={"red-500"} />
        </div>
      </section>
    </>
  );
}
