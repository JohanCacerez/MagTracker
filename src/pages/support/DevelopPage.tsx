import maintenace from "../../assets/images/maintenance.svg";

export default function DevelopPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen p-8 gap-4">
      <img src={maintenace} alt="Página en mantenimiento" className="w-1/3" />
      <h1 className="font-title text-2xl text-text">
        <span className="text-primary text-5xl">Oops!</span> Sección en
        mantenimiento
      </h1>
      <p className="font-body text-text">
        Esta sección está en desarrollo. Por favor, vuelve más tarde.
      </p>
    </div>
  );
}
