import { useState } from "react";
import { useAuth } from "../context/AuthProvider";
export default function CrearTareas() {
  const { handlerAgregarTareas } = useAuth();
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
    <section className="flex justify-center items-center w-full h-screen">
      <form
        className="border py-6 flex flex-col px-4 gap-6"
        onSubmit={() => handlerAgregarTareas(datos)}
      >
        <div className="flex gap-4">
          <span>Titulo</span>
          <input
            type="text"
            className="border outline-none "
            name="titulo"
            onChange={inputHandler}
          />
        </div>
        <div className="flex gap-4">
          <span>Tarea</span>
          <input
            type="text"
            className="border outline-none "
            name="tarea"
            onChange={inputHandler}
          />
        </div>
        <button>Crear</button>
      </form>
    </section>
  );
}
