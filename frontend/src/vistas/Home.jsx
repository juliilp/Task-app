import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import { BsEyeFill } from "react-icons/bs";
import { VscChromeClose } from "react-icons/vsc";
export default function Home() {
  const { authenticacion, allTareas, getAllTareas, handlerDelete, user } =
    useAuth();
  useEffect(() => {
    getAllTareas();
  }, []);
  return (
    <section className="w-full h-screen flex mt-[7vh]">
      {authenticacion ? (
        <div className="">
          {allTareas && allTareas.length > 0 && (
            <h1 className="text-3xl md:text-3xl lg:text-4xl my-8">
              Mis Tareas
            </h1>
          )}
          <div className="w-screen flex flex-col gap-4 justify-center items-center md:grid md:grid-cols-2 md:gap-2 lg:grid-cols-3 2xl:grid-cols-4 justify-self-center place-items-center ">
            {allTareas && allTareas.length > 0 ? (
              allTareas.map((tarea, key) => {
                return (
                  <div
                    className="min-w-[320px] pl-2 py-2 min-h-[200px] bg-[#E34A6F] text-[#eed6ee] gap-6 flex flex-col relative border group font-Roboto rounded-[20px] "
                    key={key}
                  >
                    <h1 className="text-2xl">{tarea.titulo}</h1>
                    <span className="text-sm">{tarea.tarea}</span>
                    <div className="flex gap-2 absolute top-2 right-4">
                      <button
                        className="hover:text-black"
                        onClick={() => handlerDelete(tarea.id)}
                      >
                        <VscChromeClose size={25} />
                      </button>
                      <Link to={`/${tarea.id}`} className="hover:text-black">
                        <BsEyeFill size={25} />
                      </Link>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-center mt-[8vh] text-2xl">
                ¡No tenes tareas creadas!
              </p>
            )}
          </div>
        </div>
      ) : (
        <p className="mt-[8vh] text-center w-full text-2xl ">
          Queres ver tus tareas? logea
        </p>
      )}
    </section>
  );
}
