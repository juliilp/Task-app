import { useState } from "react";
import { useAuth } from "../context/AuthProvider";
export default function CrearTareas() {
  const { handlerAgregarTareas, crearTareaError } = useAuth();
  const [datos, setDatos] = useState({
    titulo: "",
    tarea: "",
  });
  const inputHandler = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <section className="flex justify-center items-center w-full h-screen flex-col">
      <h1 className="text-3xl font-semibold mb-4">¡Crea tu Tarea!</h1>
      <form
        className=" w-[90%] max-w-[650px] border py-6 flex flex-col px-4 gap-6"
        onSubmit={(event) => handlerAgregarTareas(event, datos)}
      >
        {crearTareaError && (
          <span className="text-white bg-red-500 w-max p-2 px-6 rounded-sm font-medium">
            {crearTareaError}
          </span>
        )}
        <div className="flex gap-4 flex-col">
          <span>Titulo</span>
          <input
            type="text"
            className="bg-[#F8FAFA] py-2 outline-none  placeholder:pl-2 "
            name="titulo"
            onChange={inputHandler}
            placeholder="Escribí tu titulo..."
          />
        </div>
        <div className="flex gap-4 flex-col ">
          <span>Tarea</span>
          <textarea
            type="text"
            className="bg-[#F8FAFA] py-2 outline-none  placeholder:pl-2 resize-none "
            name="tarea"
            onChange={inputHandler}
            placeholder="Escribí tu tarea..."
          />
        </div>
        <button className="text-white bg-blue-700 hover:bg-blue-800 rounded-lg text-sm w-max  px-5 py-2.5 text-center ">
          Crear Tarea
        </button>
      </form>
    </section>
  );
}
