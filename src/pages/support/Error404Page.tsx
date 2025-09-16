import NotFound404 from "../../assets/images/404error.svg";

export default function Error404Page() {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen p-8 gap-4">
        <img src={NotFound404} alt="Página no encontrada" className="w-1/3" />
        <h1 className="font-title text-2xl text-text">
          <span className="text-primary text-5xl">Oops!</span> Sección no
          encontrada
        </h1>
        <p className="font-body text-text">
          Parece que te perdiste, esta parte de la app no existe.
        </p>
      </div>
    </>
  );
}
