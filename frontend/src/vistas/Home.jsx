import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";
export default function Home() {
  const { authenticacion, allTareas, getAllTareas, handlerDelete, user } =
    useAuth();
  useEffect(() => {
    getAllTareas();
  }, []);
  return (
    <>
      {authenticacion ? (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-0">
          {allTareas && allTareas.length > 0 ? (
            allTareas.map((tarea, key) => {
              return (
                <div
                  className="w-[300px] h-[250px]  flex justify-center items-center flex-col relative border"
                  key={key}
                >
                  <Link to={`/${tarea.id}`}>
                    <h1>{tarea.titulo}</h1>
                    <span>{tarea.tarea}</span>
                  </Link>
                  <button className="" onClick={() => handlerDelete(tarea.id)}>
                    X
                  </button>
                </div>
              );
            })
          ) : (
            <p>No tenes tareas creadas!</p>
          )}
        </section>
      ) : (
        <p>Queres ver tus tareas? logea</p>
      )}
    </>
  );
}
